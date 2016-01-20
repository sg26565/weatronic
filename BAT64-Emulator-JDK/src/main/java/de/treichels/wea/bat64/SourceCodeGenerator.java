package de.treichels.wea.bat64;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.stream.XMLStreamException;

import com.sun.codemodel.JClass;
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
import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigGroupList;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;
import de.treichels.wea.bat64.xml.XmlElement;
import de.treichels.wea.bat64.xml.XmlReader;

public class SourceCodeGenerator {
	private static final String BASE_PACKAGE_NAME = "de.treichels.wea.bat64.gen";
	private static final String GETTER_PREFIX = "get";
	private static final String OUTPUT_DIR = "src/main/gen";
	private static final String SETTER_PREFIX = "set";

	public static String className(final String name) {
		String result;

		if ("elevators".equalsIgnoreCase(name)) {
			result = "Config";
		} else if ("flexdifferential".equalsIgnoreCase(name)) {
			result = "FlexSetup";
		} else {
			final StringBuilder sb = new StringBuilder();
			sb.append(name.substring(0, 1).toUpperCase()).append(name.substring(1));

			result = clean(sb.toString());
			if (result == null || result.length() == 0) {
				result = "Item";
			}
		}

		return result;
	}

	private static String clean(final String name) {
		return name.replaceAll("_", "").replaceAll("[0-9]*$", "");
	}

	public static String fieldName(final String name) {
		String result;

		if ("switch".equalsIgnoreCase(name)) {
			result = "controlSwitch";
		} else {
			final StringBuilder sb = new StringBuilder();
			sb.append(name.substring(0, 1).toLowerCase()).append(name.substring(1));

			result = sb.toString().replaceAll("_", "");
			if (name == null || name.length() == 0) {
				result = "item";
			}
		}

		return result;
	}

	public static XmlElement getFirstChild(final XmlElement element) {
		if (element.isEmpty()) {
			return null;
		}

		return element.values().iterator().next();
	}

	public static void main(final String[] args) throws ClassNotFoundException, XMLStreamException, IOException, JClassAlreadyExistsException {
		final SourceCodeGenerator generator = new SourceCodeGenerator();
		final File file = new File("Full2.model");
		generator.generate(file);
	}

	public static String methodName(final String prefix, final String name) {
		final String fieldName = fieldName(name);
		final StringBuilder sb = new StringBuilder();
		sb.append(prefix).append(fieldName.substring(0, 1).toUpperCase()).append(fieldName.substring(1));
		return sb.toString();
	}

	public static String packageName(final String name) {
		if ("switch".equalsIgnoreCase(name)) {
			return "controlswitch";
		} else if ("elevators".equalsIgnoreCase(name)) {
			return "config";
		} else if ("rudders".equalsIgnoreCase(name)) {
			return "config";
		} else if ("wings".equalsIgnoreCase(name)) {
			return "config";
		}

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

	public void generate(final File file) throws XMLStreamException, IOException, JClassAlreadyExistsException, ClassNotFoundException {
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

	private void generateChildClass(final XmlElement childElement, final JPackage childPackage) throws JClassAlreadyExistsException, ClassNotFoundException {
		switch (childElement.getTypeinfo()) {
		case 6:
			for (final XmlElement listElement : childElement.values()) {
				generateChildClass(listElement, childPackage);
			}
			break;

		case 32:
			final JClass groupListElementType = getGroupElementType(childElement, childPackage);
			if (groupListElementType == null) {
				// normal group
				generateClass(childElement, childPackage);
			} else {
				for (final XmlElement listElement : childElement.values()) {
					generateChildClass(listElement, childPackage);
				}
			}
			break;

		case 43:
		case 44:
		case 45:
		case 47:
		case 52:
		case 53:
		case 54:
		case 55:
			break;

		default:
			generateClass(childElement, childPackage);
		}
	}

	private void generateClass(final XmlElement element, final JPackage elementPackage) throws JClassAlreadyExistsException, ClassNotFoundException {
		final String elementName = element.getName();
		final int elementTypeinfo = element.getTypeinfo();

		String className = elementName;
		while (listPattern.matcher(className).matches()) {
			className = element.getParent().getName();
		}

		final JDefinedClass elementType = getDefinedClass(className(className), elementTypeinfo, elementPackage);

		System.out.printf("Element: %s (%d) => %s\n", elementName, elementTypeinfo, elementType.fullName());
		System.out.flush();

		for (final XmlElement childElement : element.values()) {
			final JPackage childPackage = generateField(childElement, elementType, elementPackage);
			generateChildClass(childElement, childPackage);
		}
	}

	private JPackage generateField(final XmlElement childElement, final JDefinedClass parentClass, final JPackage parentPackage)
	        throws JClassAlreadyExistsException, ClassNotFoundException {
		final String childName = childElement.getName();
		final int childTypeinfo = childElement.getTypeinfo();

		final JPackage childPackage;
		if (childTypeinfo == 44 || childTypeinfo == 45 || childTypeinfo == 47 || childTypeinfo == 52 || childTypeinfo == 53 || childTypeinfo == 54
		        || childTypeinfo == 55) {
			childPackage = parentPackage;
		} else {
			childPackage = parentPackage.subPackage(packageName(childName));
		}

		final JType childType = getType(childName, childElement, childPackage);
		final String fieldName = fieldName(childName);

		System.out.printf("\tChild: %s (%d) => %s %s\n", childName, childTypeinfo, childType.fullName(), fieldName);
		System.out.flush();

		if (!parentClass.fields().containsKey(fieldName)) {
			// field & element annotation
			final JFieldVar field = parentClass.field(JMod.PRIVATE, childType, fieldName);
			field.annotate(Element.class).param("name", childName);

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

		return childPackage;
	}

	private JDefinedClass getDefinedClass(final String name, final int typeinfo, final JPackage elementPackage) throws JClassAlreadyExistsException {
		final String className = className(name);

		// lookup by typeinfo
		JDefinedClass result = classes.get(typeinfo);

		if (result == null) {
			// lookup by name
			result = elementPackage._getClass(className);
		}

		if (result == null) {
			// generate new
			result = elementPackage._class(className);

			if (typeinfo == 32) {
				result._extends(ConfigGroup.class);
			} else {
				result._extends(ConfigElement.class);
			}

			if (typeinfo != 0 && typeinfo != 6 && typeinfo != 32) {
				classes.put(typeinfo, result);
			}
		}

		return result;
	}

	private JClass getGroupElementType(final XmlElement element, final JPackage elementPackage) throws JClassAlreadyExistsException {
		final XmlElement childElement = getFirstChild(element);
		if (childElement == null) {
			// group is empty
			return null;
		}

		String childName = childElement.getName();
		final Matcher matcher = groupPattern.matcher(childName);
		if (matcher.matches()) {
			childName = matcher.group(1);
			return getType(childName, childElement, elementPackage);
		}

		// group is not a list
		return null;
	}

	private JClass getListElementType(final XmlElement element, final JPackage elementPackage) throws JClassAlreadyExistsException {
		final XmlElement childElement = getFirstChild(element);
		if (childElement == null) {
			// list is empty
			return null;
		}
		return getType(element.getName(), childElement, elementPackage);
	}

	private JClass getType(final String elementName, final XmlElement element, final JPackage elementPackage) throws JClassAlreadyExistsException {
		final int typeinfo = element.getTypeinfo();
		switch (typeinfo) {
		case 6:
			final JType listElementType = getListElementType(element, elementPackage);
			if (listElementType != null) {
				return model.ref(ConfigList.class).narrow(listElementType);
			}
			return model.ref(ConfigList.class).narrow(model.wildcard());

		case 32:
			final JType groupElementType = getGroupElementType(element, elementPackage);
			if (groupElementType != null) {
				return model.ref(ConfigGroupList.class).narrow(groupElementType);
			}
			return getDefinedClass(elementName, typeinfo, elementPackage);

		case 47:
			final String text = element.getText();
			if (text != null && text.contains(",")) {
				return model.ref(ConfigList.class).narrow(Integer.class);
			}
			return model.ref(ConfigValue.class).narrow(String.class);

		case 52:
		case 43:
		case 44:
		case 45:
		case 53:
		case 54:
			return model.ref(ConfigValue.class).narrow(Integer.class);

		case 55:
			return model.ref(ConfigValue.class).narrow(Long.class);

		default:
			return getDefinedClass(elementName, typeinfo, elementPackage);
		}
	}
}
