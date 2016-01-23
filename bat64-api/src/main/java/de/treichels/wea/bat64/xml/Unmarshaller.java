package de.treichels.wea.bat64.xml;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import de.treichels.wea.bat64.SourceCodeGenerator;
import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigGroupList;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;

public class Unmarshaller {
	private static Logger log = LogManager.getLogger(Unmarshaller.class);

	private static void setChildElements(final XmlElement element, final ConfigElement instance)
	        throws NoSuchMethodException, InstantiationException, IllegalAccessException, InvocationTargetException, Exception {
		final Class<? extends ConfigElement> instanceType = instance.getClass();
		for (final Field field : instanceType.getDeclaredFields()) {
			final Element annotation = field.getAnnotation(Element.class);
			if (annotation != null) {
				final String elementName = annotation.name();
				final XmlElement fieldElement = element.get(elementName);
				if (fieldElement == null) {
					continue;
				}

				@SuppressWarnings("unchecked")
				final Class<? extends ConfigElement> fieldType = (Class<? extends ConfigElement>) field.getType();
				final String setMethodName = SourceCodeGenerator.methodName("set", elementName);
				final Method setMethod = instanceType.getMethod(setMethodName, fieldType);
				final ConfigElement fieldInstance = fieldType.newInstance();
				setMethod.invoke(instance, fieldInstance);
				final Type childParameterType = field.getGenericType();
				unmarshal(fieldElement, fieldInstance, childParameterType);
			}
		}
	}

	@SuppressWarnings("unchecked")
	private static void setConfigGroupList(final XmlElement element, final ConfigGroupList<ConfigElement> configGroupList, final ParameterizedType type)
	        throws Exception {
		final String elementName = element.getName();
		final Type parameterType = type.getActualTypeArguments()[0];
		final Class<ConfigElement> listItemType;
		if (parameterType instanceof Class) {
			listItemType = (Class<ConfigElement>) parameterType;
		} else if (parameterType instanceof ParameterizedType) {
			listItemType = (Class<ConfigElement>) ((ParameterizedType) parameterType).getRawType();
		} else {
			throw new RuntimeException("unexpected type of parameterType: " + parameterType.getClass().getName());
		}

		for (final XmlElement listElement : element.values()) {
			final String listElementName = listElement.getName();
			final int length = listElementName.length();
			final String prefix = listElementName.substring(0, length - 4);
			final int listIndex = Integer.parseInt(listElementName.substring(length - 2));

			log.debug(String.format("%s = new %s()", listElementName, listItemType.getSimpleName()));
			final ConfigElement listInstance = listItemType.newInstance();

			log.debug(String.format("%s.setListIndex(%d)", listElementName, listIndex));
			listInstance.setListIndex(listIndex);

			log.debug(String.format("%s.add(%s)", elementName, listElementName));
			configGroupList.add(listInstance);

			log.debug(String.format("%s.setPrefix(\"%s\")", elementName, prefix));
			configGroupList.setPrefix(prefix);

			unmarshal(listElement, listInstance, parameterType);
		}
	}

	@SuppressWarnings("unchecked")
	private static void setConfigList(final XmlElement element, final ConfigList<ConfigElement> configList, final ParameterizedType type) throws Exception {
		final String elementName = element.getName();
		final Type parameterType = type.getActualTypeArguments()[0];
		final Class<ConfigElement> listItemType;
		if (parameterType instanceof Class) {
			listItemType = (Class<ConfigElement>) parameterType;
		} else if (parameterType instanceof ParameterizedType) {
			listItemType = (Class<ConfigElement>) ((ParameterizedType) parameterType).getRawType();
		} else {
			throw new RuntimeException("unexpected type of parameterType: " + parameterType.getClass().getName());
		}

		for (final XmlElement listElement : element.values()) {
			final String listElementName = listElement.getName();
			final int listIndex = Integer.parseInt(listElementName.substring(1));

			log.debug(String.format("%s = new %s()", listElementName, listItemType.getSimpleName()));
			final ConfigElement listInstance = listItemType.newInstance();

			log.debug(String.format("%s.setListIndex(%d)", listElementName, listIndex));
			listInstance.setListIndex(listIndex);

			log.debug(String.format("%s.add(%s)", elementName, listElementName));
			configList.add(listInstance);

			unmarshal(listElement, listInstance, parameterType);
		}
	}

	private static void setConfigList(final XmlElement element, final ConfigList<Integer> configList) {
		final String elementText = element.getText();
		if (elementText != null) {
			for (final String s : elementText.split(",")) {
				final Integer value = new Integer(s.trim());
				log.debug(String.format("%s.add(%d)", element.getName(), value));
				configList.add(value);
			}
		}
	}

	private static <T> void setConfigValue(final XmlElement element, final ConfigValue<T> configValue, final ParameterizedType type) throws Exception {
		final String elementText = element.getText();
		@SuppressWarnings("unchecked")
		final Class<T> valueType = (Class<T>) type.getActualTypeArguments()[0];
		if (elementText == null) {
			configValue.setValue(null);
		} else {
			log.debug(String.format("%s.setValue(new %s(\"%s\"))", element.getName(), valueType.getSimpleName(), elementText));

			final Constructor<T> valueCtor = valueType.getConstructor(String.class);
			final T value = valueCtor.newInstance(elementText);
			configValue.setValue(value);
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void unmarshal(final XmlElement element, final ConfigElement instance, final Type type) throws Exception {
		final String elementName = element.getName();
		final int elementTypeinfo = element.getTypeinfo();

		log.debug(String.format("Element %s %s (%d)", instance.getClass().getName(), elementName, elementTypeinfo));

		instance.setTypeinfo(elementTypeinfo);

		if (instance instanceof ConfigValue) {
			setConfigValue(element, (ConfigValue) instance, (ParameterizedType) type);
		} else if (instance instanceof ConfigGroupList) {
			setConfigGroupList(element, (ConfigGroupList<ConfigElement>) instance, (ParameterizedType) type);
		} else if (instance instanceof ConfigList) {
			if (elementTypeinfo == 47) {
				setConfigList(element, (ConfigList<Integer>) instance);
			} else {
				setConfigList(element, (ConfigList<ConfigElement>) instance, (ParameterizedType) type);
			}
		} else {
			setChildElements(element, instance);
		}
	}
}