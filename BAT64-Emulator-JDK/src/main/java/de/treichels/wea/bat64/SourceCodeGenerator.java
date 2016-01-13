package de.treichels.wea.bat64;

import java.io.File;
import java.io.IOException;

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

import de.treichels.wea.bat64.xml.XmlElement;
import de.treichels.wea.bat64.xml.XmlReader;

public class SourceCodeGenerator {
	private static final String BASE = "de.treichels.wea.bat64.gen";

	public static void main(final String[] args)
			throws ClassNotFoundException, XMLStreamException, IOException, JClassAlreadyExistsException {
		final SourceCodeGenerator generator = new SourceCodeGenerator();
		final File file = new File("F4U-1D Corsair.model");
		generator.generate(file);
	}

	private final JCodeModel model = new JCodeModel();
	private final JPackage basePackage = model._package(BASE);
	private JDefinedClass baseClass;

	public void generate(final File file)
			throws XMLStreamException, IOException, JClassAlreadyExistsException, ClassNotFoundException {
		final XmlReader reader = new XmlReader();
		final XmlElement root = reader.read(file);
		final File outputDir = new File("src/main/gen");
		outputDir.mkdirs();

		generateBase();

		basePackage._class(root.getName());
		generate(root);

		model.build(outputDir);
	}

	private void generate(final XmlElement element) throws JClassAlreadyExistsException, ClassNotFoundException {
		final JDefinedClass elementClass = basePackage._getClass(element.getName());
		elementClass._extends(baseClass);
		elementClass.constructor(JMod.PUBLIC).body().invoke("super").arg(JExpr.lit(element.getTypeinfo()));

		if (element.hasText()) {
			property(elementClass, model._ref(String.class), "value", false);
		}

		for (final XmlElement childElement : element.values()) {
			final String childName = childElement.getName();

			if (basePackage._getClass(childName) == null) {
				final JDefinedClass childClass = basePackage._class(childName);
				property(elementClass, childClass, childName, false);

				generate(childElement);
			}
		}

	}

	private void generateBase() throws JClassAlreadyExistsException {
		baseClass = basePackage._class(JMod.ABSTRACT, "ConfigElement");

		final JFieldVar field = baseClass.field(JMod.PRIVATE | JMod.FINAL, model.INT, "typeinfo");

		final JMethod getterMethod = baseClass.method(JMod.PUBLIC, model.INT, "getTypeinfo");
		getterMethod.body()._return(field);

		final JMethod constructor = baseClass.constructor(JMod.PROTECTED);
		final JVar cparam = constructor.param(JMod.FINAL, model.INT, "typeinfo");
		constructor.body().assign(JExpr._this().ref(field), cparam);
	}

	private String getterName(final String name) {
		return propertyMethodName("get", name);
	}

	private void property(final JDefinedClass elementClass, final JType propertyType, final String propertyName,
			final boolean readonly) {
		final int modifier = readonly ? JMod.PRIVATE | JMod.FINAL : JMod.PRIVATE;
		final JFieldVar field = elementClass.field(modifier, propertyType, propertyName);

		final JMethod getterMethod = elementClass.method(JMod.PUBLIC, propertyType, getterName(propertyName));
		getterMethod.body()._return(field);

		if (!readonly) {
			final JMethod setterMethod = elementClass.method(JMod.PUBLIC, model.VOID, setterName(propertyName));
			final JVar setterParam = setterMethod.param(JMod.FINAL, propertyType, propertyName);
			setterMethod.body().assign(JExpr._this().ref(field), setterParam);
		}
	}

	private String propertyMethodName(final String prefix, final String name) {
		final StringBuilder sb = new StringBuilder();
		sb.append(prefix).append(name.substring(0, 1).toUpperCase()).append(name.substring(1));
		return sb.toString();
	}

	private String setterName(final String name) {
		return propertyMethodName("set", name);
	}
}
