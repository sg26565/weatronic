package de.treichels.wea.bat64.xml;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

import de.treichels.wea.bat64.SourceCodeGenerator;
import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigGroupList;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;

public class Unmarshaller {
	private static <T> void setValue(final ConfigValue<T> instance, final Class<T> valueType, final String text) throws Exception {
		// get constructor that accepts a String argument
		final Constructor<T> valueCtor = valueType.getConstructor(String.class);

		// create field value
		final T fieldValue = valueCtor.newInstance(text);

		// set value
		instance.setValue(fieldValue);
	}

	public static void unmarshal(final XmlElement source, final ConfigElement target) throws Exception {
		System.out.printf("\nElement %s (%d)\n", source.getName(), source.getTypeinfo());
		System.out.flush();
		final Class<?> targetClass = target.getClass();

		for (final Field field : target.getClass().getDeclaredFields()) {
			final Element annotation = field.getAnnotation(Element.class);
			if (annotation != null) {
				final String fieldName = annotation.name();
				final XmlElement fieldElement = source.get(fieldName);
				if (fieldElement == null) {
					continue;
				}
				final int fieldTypeinfo = fieldElement.getTypeinfo();
				final Class<?> fieldType = field.getType();
				final String fieldText = fieldElement.getText();
				field.setAccessible(true);

				System.out.printf("\n\tElement(name=\"%s\", typeinfo=%d, text=\"%s\", type=%s)\n", fieldName, fieldTypeinfo, fieldText, fieldType.getName());
				System.out.flush();

				// create new instance of ConfigValue subtype
				final ConfigElement fieldInstance = (ConfigElement) fieldType.newInstance();
				fieldInstance.setTypeinfo(source.getTypeinfo());
				final String setMethodName = SourceCodeGenerator.methodName("set", field.getName());
				final Method setMethod = targetClass.getDeclaredMethod(setMethodName, fieldType);
				setMethod.invoke(target, fieldInstance);

				if (fieldInstance instanceof ConfigValue) {
					// get type of value field
					final ParameterizedType parameterizedType = (ParameterizedType) field.getGenericType();
					final Class<?> valueType = (Class<?>) parameterizedType.getActualTypeArguments()[0];
					System.out.printf("\t%s %s = new %s<%s>()\n", fieldType.getSimpleName(), field.getName(), fieldType.getSimpleName(),
					        valueType.getSimpleName());

					if (fieldText != null) {
						System.out.printf("\t%s.setValue(new %s(\"%s\"))\n", field.getName(), valueType.getSimpleName(), fieldText);
						setValue((ConfigValue) fieldInstance, valueType, fieldText);
					}
				} else if (fieldInstance instanceof ConfigGroupList) {
					final ParameterizedType parameterizedType = (ParameterizedType) field.getGenericType();
					final Class<?> listElementType = (Class<?>) parameterizedType.getActualTypeArguments()[0];
					System.out.printf("\t%s %s = new %s<%s>()\n", fieldType.getSimpleName(), field.getName(), fieldType.getSimpleName(),
					        listElementType.getName());

					for (final XmlElement listElement : fieldElement.values()) {
						final String listElementName = listElement.getName();
						final int length = listElementName.length();
						final String prefix = listElementName.substring(0, length - 4);
						final int listIndex = Integer.parseInt(listElementName.substring(length - 2));

						System.out.printf("\n\t%s = new %s()\n", listElementName, listElementType.getSimpleName());
						final ConfigElement listInstance = (ConfigElement) listElementType.newInstance();

						System.out.printf("\t%s.setListIndex(%d)\n", listElementName, listIndex);
						listInstance.setListIndex(listIndex);

						System.out.printf("\t%s.add(%s)\n", fieldName, listElementName);
						final ConfigGroupList configGroupList = (ConfigGroupList) fieldInstance;
						configGroupList.add(listInstance);

						System.out.printf("\t%s.setPrefix(%s)\n", fieldName, prefix);
						configGroupList.setPrefix(prefix);

						if (listInstance instanceof ConfigValue) {
							final String listElementText = listElement.getText();
							System.out.printf("\t%s.setValue(new %s(\"%s\"))\n", listElementName, listElementType.getSimpleName(), listElementText);
							setValue((ConfigValue) listInstance, listElementType, listElementText);
						} else {
							unmarshal(listElement, listInstance);
						}
					}

				} else if (fieldInstance instanceof ConfigList) {
					// get type of list elements
					final ParameterizedType parameterizedType = (ParameterizedType) field.getGenericType();
					final Type listElementType = parameterizedType.getActualTypeArguments()[0];
					System.out.printf("\t%s %s = new %s<%s>()\n", fieldType.getSimpleName(), field.getName(), fieldType.getSimpleName(),
					        listElementType.getTypeName());

					if (fieldTypeinfo == 47) {
						if (fieldText != null) {
							for (final String s : fieldText.split(",")) {
								final String s1 = s.trim();
								System.out.printf("\t%s.add(%s)\n", field.getName(), s1);
								((ConfigList<Integer>) fieldInstance).add(new Integer(s1));
							}
						}
					} else {
						final Class<?> listElementClass;
						if (listElementType instanceof Class) {
							listElementClass = (Class<?>) listElementType;
						} else if (listElementType instanceof ParameterizedType) {
							final String rawType = ((ParameterizedType) listElementType).getRawType().getTypeName();
							listElementClass = Class.forName(rawType);
						} else {
							throw new RuntimeException(String.format("unexpected type for listElmentType: %s", listElementType.getClass().getName()));
						}
						for (final XmlElement listElement : fieldElement.values()) {
							final String listElementName = listElement.getName();
							final int listIndex = Integer.parseInt(listElementName.substring(1, 3));

							System.out.printf("\n\t%s = new %s()\n", listElementName, listElementClass.getSimpleName());
							final ConfigElement listInstance = (ConfigElement) listElementClass.newInstance();

							System.out.printf("\t%s.setListIndex(%d)\n", listElementName, listIndex);
							listInstance.setListIndex(listIndex);

							System.out.printf("\t%s.add(%s)\n", fieldName, listElementName);
							final ConfigList configList = (ConfigList) fieldInstance;
							configList.add(listInstance);

							if (listInstance instanceof ConfigValue) {
								final String listElementText = listElement.getText();
								final Class<?> valueType = (Class<?>) ((ParameterizedType) listElementType).getActualTypeArguments()[0];
								System.out.printf("\t%s.setValue(new %s(\"%s\"))\n", listElementName, valueType.getSimpleName(), listElementText);
								setValue((ConfigValue) listInstance, valueType, listElementText);
							} else {
								unmarshal(listElement, listInstance);
							}
						}
					}
				} else if (ConfigGroup.class.isAssignableFrom(fieldType)) {
					System.out.printf("\t%s %s = new %s()\n", fieldType.getSimpleName(), field.getName(), fieldType.getSimpleName());
					unmarshal(fieldElement, fieldInstance);
				} else if (ConfigElement.class.isAssignableFrom(fieldType)) {
					System.out.printf("\t%s %s = new %s()\n", fieldType.getSimpleName(), field.getName(), fieldType.getSimpleName());
					unmarshal(fieldElement, fieldInstance);
				} else {
					throw new RuntimeException(String.format("unknown field type: %s", fieldType.getName()));
				}
			}
		}
	}
}