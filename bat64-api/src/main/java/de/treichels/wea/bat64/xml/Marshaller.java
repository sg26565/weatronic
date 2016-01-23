package de.treichels.wea.bat64.xml;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import de.treichels.wea.bat64.SourceCodeGenerator;
import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigGroupList;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;

public class Marshaller {
	private static Logger log = LogManager.getLogger(Marshaller.class);

	private static void getChildElements(final ConfigElement instance, final XmlElement element) throws Exception {
		for (final Field field : instance.getClass().getDeclaredFields()) {
			final Class<? extends ConfigElement> instanceType = instance.getClass();
			final Element annotation = field.getAnnotation(Element.class);
			if (annotation != null) {
				final String elementName = annotation.name();
				final String getMethodName = SourceCodeGenerator.methodName("get", elementName);
				final Method getMethod = instanceType.getMethod(getMethodName);
				final ConfigElement fieldInstance = (ConfigElement) getMethod.invoke(instance);
				if (fieldInstance != null) {
					final int fieldTypeinfo = fieldInstance.getTypeinfo();
					final XmlElement fieldElement = new XmlElement(elementName, fieldTypeinfo, element);
					element.put(elementName, fieldElement);
					marshal(fieldInstance, fieldElement);
				}
			}
		}
	}

	private static void getConfigGroupList(final ConfigGroupList<? extends ConfigElement> configGroupList, final XmlElement element) throws Exception {
		final String prefix = configGroupList.getPrefix();
		for (final ConfigElement listElementInstance : configGroupList) {
			final int listElementIndex = listElementInstance.getListIndex();
			final String listElementName = String.format("%s__%02d", prefix, listElementIndex);
			final int listElementTypeinfo = listElementInstance.getTypeinfo();
			final XmlElement listElement = new XmlElement(listElementName, listElementTypeinfo, element);
			element.put(listElementName, listElement);
			marshal(listElementInstance, listElement);
		}
	}

	private static void getConfigList(final ConfigList<? extends ConfigElement> configList, final XmlElement element) throws Exception {
		for (final ConfigElement listElementInstance : configList) {
			final int listElementIndex = listElementInstance.getListIndex();
			final String listElementName = String.format("_%02d", listElementIndex);
			final int listElementTypeinfo = listElementInstance.getTypeinfo();
			final XmlElement listElement = new XmlElement(listElementName, listElementTypeinfo, element);
			element.put(listElementName, listElement);
			marshal(listElementInstance, listElement);
		}
	}

	private static <T> void getConfigValue(final ConfigValue<T> configValue, final XmlElement element) {
		final T value = configValue.getValue();
		if (value == null) {
			element.setText(null);
		} else {
			final String text = value.toString();
			log.debug(String.format("setText(\"%s\")", text));
			element.setText(text);
		}
	}

	private static void getStringConfigList(final ConfigList<Integer> configList, final XmlElement element) {
		if (configList.isEmpty()) {
			element.setText(null);
		} else {
			final StringBuilder sb = new StringBuilder();
			for (final int i : configList) {
				if (sb.length() != 0) {
					sb.append(',');
				}

				sb.append(i);
			}
			element.setText(sb.toString());
		}
	}

	@SuppressWarnings("unchecked")
	public static void marshal(final ConfigElement instance, final XmlElement element) throws Exception {
		log.debug(String.format("Element %s %s (%d)", instance.getClass().getName(), element.getName(), element.getTypeinfo()));

		if (instance instanceof ConfigValue) {
			getConfigValue((ConfigValue<?>) instance, element);
		} else if (instance instanceof ConfigGroupList) {
			getConfigGroupList((ConfigGroupList<? extends ConfigElement>) instance, element);
		} else if (instance instanceof ConfigList) {
			if (instance.getTypeinfo() == 47) {
				getStringConfigList((ConfigList<Integer>) instance, element);
			} else {
				getConfigList((ConfigList<? extends ConfigElement>) instance, element);
			}
		} else {
			getChildElements(instance, element);
		}
	}
}
