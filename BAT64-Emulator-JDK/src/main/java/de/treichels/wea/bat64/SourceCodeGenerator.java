package de.treichels.wea.bat64;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.SortedSet;
import java.util.TreeSet;
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

		final SortedSet<Integer> keys = new TreeSet<Integer>();
		keys.addAll(classes.keySet());
		for (final int key : keys) {
			final JDefinedClass definedClass = classes.get(key);
			System.out.printf("%2d: %s\n", key, definedClass.fullName());
		}
	}

	private void generateClass(final XmlElement element, final JPackage elementPackage)
			throws JClassAlreadyExistsException, ClassNotFoundException {
		final String elementName = element.getName();
		final int elementTypeinfo = element.getTypeinfo();
		final String elementClassName;

		final Matcher listMatcher = listPattern.matcher(elementName);
		final Matcher groupMatcher = groupPattern.matcher(elementName);
		if (listMatcher.matches()) {
			elementClassName = element.getParent().getName();
		} else if (groupMatcher.matches()) {
			elementClassName = groupMatcher.group(1);
		} else {
			elementClassName = className(elementName);
		}

		final JDefinedClass elementClass = getDefinedClass(elementClassName, elementTypeinfo, elementPackage);

		System.out.printf("\nElement: %s (%d) => %s\n", elementName, elementTypeinfo, elementClass.fullName());

		// if class name does not match element name, then an already existing
		// class was used
		if (!elementClass.name().equalsIgnoreCase(elementClassName)) {
			return;
		}

		for (final XmlElement childElement : element.values()) {
			generateField(childElement, elementClass, elementPackage);
		}
	}

	private void generateField(final XmlElement childElement, final JDefinedClass parentClass,
			final JPackage parentPackage) throws JClassAlreadyExistsException, ClassNotFoundException {
		final String childName = childElement.getName();
		final int childTypeinfo = childElement.getTypeinfo();
		final String childClassName = className(childName);
		final String childPackageName = packageName(childClassName);
		final JPackage childPackage = parentPackage.subPackage(childPackageName);
		final JType childType = getType(childClassName, childTypeinfo, childPackage, childElement);
		final String fieldName = fieldName(childName);

		System.out.printf("\tChild: %s (%d) => %s %s\n", childName, childTypeinfo, childType.fullName(), fieldName);

		if (!parentClass.fields().containsKey(fieldName)) {
			// field & element annotation
			final JFieldVar field = parentClass.field(JMod.PRIVATE, childType, fieldName);
			field.annotate(Element.class).param("name", childName).param("typeinfo", childTypeinfo);

			// listelement annotation
			switch (childTypeinfo) {
			case 6:
				// list
				final XmlElement listElement = getFirstChild(childElement);
				final int listElementTypeinfo = listElement.getTypeinfo();
				final JType listElementType = getType(childClassName, listElementTypeinfo, childPackage, listElement);
				field.annotate(ListElement.class).param("type", listElementType).param("typeinfo", listElementTypeinfo);
				System.out.printf("\t\tListElement: %s (%d)\n", listElementType.fullName(), listElementTypeinfo);
				break;

			case 32:
				// group
				final XmlElement groupElement = getFirstChild(childElement);

				if (groupElement != null) {
					final String groupElementName = groupElement.getName();

					if (groupPattern.matcher(groupElementName).matches()) {
						final int groupElementTypeinfo = groupElement.getTypeinfo();
						final String groupElementClassName = className(groupElementName);
						final JType groupElementType = getType(groupElementClassName, groupElementTypeinfo,
								childPackage, groupElement);
						field.annotate(ListElement.class).param("name", groupElementClassName)
								.param("type", groupElementType).param("typeinfo", groupElement.getTypeinfo());
						System.out.printf("\t\tGroupElement: %s %s (%d)\n", groupElementType.fullName(),
								groupElementClassName, groupElementTypeinfo);
					} else {
						System.out.println("\t\tGroup is not a list.");
					}
				} else {
					System.out.println("\t\tGroup is empty, nothing known about it.");
				}
				break;
			}

			// getter method
			final String getMethodName = methodName(GETTER_PREFIX, fieldName);
			final JMethod getterMethod = parentClass.method(JMod.PUBLIC, childType, getMethodName);
			getterMethod.body()._return(field);

			// setter method
			final String setMethodName = methodName(SETTER_PREFIX, fieldName);
			final JMethod setterMethod = parentClass.method(JMod.PUBLIC, model.VOID, setMethodName);
			final JVar setterParam = setterMethod.param(JMod.FINAL, childType, fieldName);
			setterMethod.body().assign(JExpr._this().ref(field), setterParam);
		}

		if (childType.isPrimitive()) {
			return;
		}

		// generate classes references by fields
		switch (childTypeinfo) {
		case 47:
			// String
			return;

		case 6:
			// list
			final XmlElement listElement = getFirstChild(childElement);
			final int typeinfo = listElement.getTypeinfo();
			final JType listElementType = getListElementType(childElement, childPackage);
			if (!(typeinfo == 47 || typeinfo == 6 || typeinfo == 32 || listElementType.isPrimitive())) {
				generateClass(listElement, childPackage);
			}
			break;

		case 32:
			// group
			final XmlElement groupElement = getFirstChild(childElement);
			final JType groupElementType = getGroupElementType(childElement, childPackage);
			if (groupElementType == null) {
				generateClass(childElement, childPackage);
			} else if (groupElementType.isPrimitive() || groupElement.getTypeinfo() == 47) {
				return;
			} else {
				generateClass(groupElement, childPackage);
			}
			break;

		default:
			generateClass(childElement, childPackage);
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
