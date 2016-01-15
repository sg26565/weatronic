package de.treichels.wea.bat64;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.stream.XMLStreamException;

import com.sun.codemodel.JClassAlreadyExistsException;
import com.sun.codemodel.JCodeModel;
import com.sun.codemodel.JDefinedClass;
import com.sun.codemodel.JExpr;
import com.sun.codemodel.JFieldVar;
import com.sun.codemodel.JMethod;
import com.sun.codemodel.JMod;
import com.sun.codemodel.JPackage;
import com.sun.codemodel.JType;
import com.sun.codemodel.JVar;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.xml.Element;
import de.treichels.wea.bat64.xml.ListElement;
import de.treichels.wea.bat64.xml.XmlElement;
import de.treichels.wea.bat64.xml.XmlReader;

public class SourceCodeGenerator {
	private static final String BASE_PACKAGE_NAME = "de.treichels.wea.bat64.gen";
	private static final String GETTER_PREFIX = "get";
	private static final String OUTPUT_DIR = "src/main/gen";
	private static final String SETTER_PREFIX = "set";
	private static final String SUPER = "super";

	public static String className(final String name) {
		if ("elevators".equalsIgnoreCase(name)) {
			return "SurfaceConfig";
		}

		if ("flexdifferential".equalsIgnoreCase(name)) {
			return "FlexSetup";
		}

		final StringBuilder sb = new StringBuilder();
		sb.append(name.substring(0, 1).toUpperCase()).append(name.substring(1));
		return clean(sb.toString());
	}

	private static String clean(final String name) {
		return name.replace("__", "").replaceAll("[0-9]*$", "");
	}

	public static String fieldName(final String name) {
		if ("switch".equalsIgnoreCase(name)) {
			return "controlSwitch";
		}

		if (name == null || name.length() == 0) {
			return "item";
		}

		final StringBuilder sb = new StringBuilder();
		sb.append(name.substring(0, 1).toLowerCase()).append(name.substring(1));

		return sb.toString().replace("__", "");
	}

	public static XmlElement getFirstChild(final XmlElement element) {
		if (element.isEmpty()) {
			return null;
		}

		return element.values().iterator().next();
	}

	public static void main(final String[] args)
			throws ClassNotFoundException, XMLStreamException, IOException, JClassAlreadyExistsException {
		final SourceCodeGenerator generator = new SourceCodeGenerator();
		final File file = new File("F4U-1D Corsair.model");
		generator.generate(file);
	}

	public static String methodName(final String prefix, final String name) {
		final StringBuilder sb = new StringBuilder();
		sb.append(prefix).append(name.substring(0, 1).toUpperCase()).append(name.substring(1));
		return sb.toString();
	}

	public static String packageName(final String name) {
		return clean(name.toLowerCase());
	}

	private final JPackage basePackage;
	private final Map<Integer, JDefinedClass> classes = new HashMap<Integer, JDefinedClass>();
	private final Pattern groupPattern;
	private final Pattern listPattern;

	private final JCodeModel model;

	private final File outputDir;

	public SourceCodeGenerator() throws JClassAlreadyExistsException {
		model = new JCodeModel();
		basePackage = model._package(BASE_PACKAGE_NAME);
		outputDir = new File(OUTPUT_DIR);
		outputDir.mkdirs();
		groupPattern = Pattern.compile("(.*)__[0-9][0-9]");
		listPattern = Pattern.compile("_[0-9][0-9]");
	}

	public void generate(final File file)
			throws XMLStreamException, IOException, JClassAlreadyExistsException, ClassNotFoundException {
		final XmlReader reader = new XmlReader();
		final XmlElement root = reader.read(file);

		generateClass(root, basePackage);

		model.build(outputDir);
	}

	private void generateClass(final XmlElement element, final JPackage elementPackage)
			throws JClassAlreadyExistsException, ClassNotFoundException {
		final String elementName = element.getName();
		final String className;
		final int elementTypeinfo = element.getTypeinfo();

		if (listPattern.matcher(elementName).matches()) {
			className = element.getParent().getName();
		} else {
			final Matcher matcher = groupPattern.matcher(elementName);
			if (matcher.matches()) {
				className = matcher.group(1);
			} else {
				className = className(elementName);
			}
		}

		System.out.printf("\nElement: %s (%d) => %s\n", elementName, elementTypeinfo, className);

		final JDefinedClass elementClass = getDefinedClass(className, elementTypeinfo, elementPackage);

		// if class name does not match element name, then an already existing
		// class was used
		if (elementClass.name().equalsIgnoreCase(className)) {
			for (final XmlElement childElement : element.values()) {
				final String childName = childElement.getName();
				final int childTypeinfo = childElement.getTypeinfo();
				System.out.printf("\tChild: %s (%d)\n", childName, childTypeinfo);

				final String childClassName = className(childName);
				final String childPackageName = packageName(childClassName);
				final JPackage childPackage = elementPackage.subPackage(childPackageName);
				final JType childType = getType(childClassName, childTypeinfo, childPackage, childElement);
				final String fieldName = fieldName(childName);

				if (!elementClass.fields().containsKey(fieldName)) {
					final JFieldVar field = elementClass.field(JMod.PRIVATE, childType, fieldName);
					field.annotate(Element.class).param("name", childName).param("typeinfo", childTypeinfo);
					if (childTypeinfo == 6) {
						final XmlElement listElement = getFirstChild(childElement);
						field.annotate(ListElement.class)
								.param("type",
										getType(childClassName, listElement.getTypeinfo(), childPackage, listElement))
								.param("typeinfo", listElement.getTypeinfo());
					} else if (childTypeinfo == 32) {
						final XmlElement listElement = getFirstChild(childElement);
						if (listElement != null) {
							final String listElementName = listElement.getName();
							if (listElementName.endsWith("__00")) {
								final String listElementClassName = listElement.getName().substring(0,
										listElementName.length() - 4);
								field.annotate(ListElement.class).param("name", listElementClassName)
										.param("type", getType(listElementClassName, listElement.getTypeinfo(),
												childPackage, listElement))
										.param("typeinfo", listElement.getTypeinfo());
							}
						}
					}

					final String getMethodName = methodName(GETTER_PREFIX, fieldName);
					final JMethod getterMethod = elementClass.method(JMod.PUBLIC, childType, getMethodName);
					getterMethod.body()._return(field);

					final String setMethodName = methodName(SETTER_PREFIX, fieldName);
					final JMethod setterMethod = elementClass.method(JMod.PUBLIC, model.VOID, setMethodName);
					final JVar setterParam = setterMethod.param(JMod.FINAL, childType, fieldName);
					setterMethod.body().assign(JExpr._this().ref(field), setterParam);
				}

				if (childTypeinfo == 47 || childType.isPrimitive()) {
					continue;
				}

				if (childTypeinfo == 6) {
					final XmlElement firtChild = getFirstChild(childElement);
					final int firstChildTypeinfo = firtChild.getTypeinfo();
					final JType listElementType = getListElementType(childElement, childPackage);
					if (!(firstChildTypeinfo == 47 || firstChildTypeinfo == 6 || firstChildTypeinfo == 32
							|| listElementType.isPrimitive())) {
						generateClass(firtChild, childPackage);
					}
				} else if (childTypeinfo == 32) {
					final XmlElement firtChild = getFirstChild(childElement);
					final JType groupElementType = getGroupElementType(childElement, childPackage);
					if (groupElementType == null) {
						generateClass(childElement, childPackage);
					} else if (groupElementType.isPrimitive() || firtChild.getTypeinfo() == 47) {
						continue;
					} else {
						generateClass(firtChild, childPackage);
					}
				} else {
					generateClass(childElement, childPackage);
				}
			}
		}
	}

	private JDefinedClass getDefinedClass(final String name, final int typeinfo, final JPackage elementPackage)
			throws JClassAlreadyExistsException {
		final String className = className(name);

		JDefinedClass result = classes.get(typeinfo);

		if (result == null) {
			result = elementPackage._getClass(className);
		}

		if (result == null) {
			result = elementPackage._class(className);
			result.constructor(JMod.PUBLIC).body().invoke(SUPER).arg(JExpr.lit(typeinfo));
			result._extends(ConfigElement.class);
		}

		if (typeinfo != 6 && typeinfo != 32) {
			classes.put(typeinfo, result);
		}

		return result;
	}

	private JType getGroupElementType(final XmlElement element, final JPackage elementPackage)
			throws JClassAlreadyExistsException {
		final XmlElement childElement = getFirstChild(element);
		if (childElement == null) {
			// group is empty
			return null;
		} else {
			String childName = childElement.getName();
			final Matcher matcher = groupPattern.matcher(childName);
			if (matcher.matches()) {
				childName = matcher.group(1);
				return getType(childName, childElement.getTypeinfo(), elementPackage, childElement);
			}

			// group is not a list
			return null;
		}
	}

	private JType getListElementType(final XmlElement element, final JPackage elementPackage)
			throws JClassAlreadyExistsException {
		final XmlElement childElement = getFirstChild(element);
		return getType(element.getName(), childElement.getTypeinfo(), elementPackage, childElement);
	}

	private JType getType(final String elementName, final int typeinfo, final JPackage elementPackage,
			final XmlElement element) throws JClassAlreadyExistsException {
		switch (typeinfo) {
		case 6: {
			final JType childType = getListElementType(element, elementPackage);
			return model.ref(List.class).narrow(childType);
		}
		case 47:
			final String text = element.getText();
			if (text != null && text.contains(",")) {
				return model.ref(List.class).narrow(Integer.class);
			} else {
				return model.ref(String.class);
			}
		case 52:
		case 53:
		case 44:
		case 45:
		case 54:
			return model._ref(Integer.TYPE);

		case 55:
			return model._ref(Long.TYPE);

		case 32: {
			final JType childType = getGroupElementType(element, elementPackage);
			if (childType == null) {
				return getDefinedClass(elementName, typeinfo, elementPackage);
			} else {
				return model.ref(List.class).narrow(childType);
			}
		}

		default:
			return getDefinedClass(elementName, typeinfo, elementPackage);
		}

	}
}
