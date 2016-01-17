package de.treichels.wea.bat64.xml;

import java.lang.reflect.Field;
import java.util.List;

import de.treichels.wea.bat64.config.ConfigElement;

public class Marshaller {
	public static void marshal(final ConfigElement source, final XmlElement target) throws IllegalArgumentException, IllegalAccessException {
		System.out.printf("\nElement %s (%d)\n", target.getName(), target.getTypeinfo());
		System.out.flush();

		for (final Field field : source.getClass().getDeclaredFields()) {
			final Element annotation = field.getAnnotation(Element.class);
			if (annotation != null) {
				final String fieldName = annotation.name();
				final int fieldTypeinfo = source.getTypeinfo();
				final XmlElement fieldElement = new XmlElement(fieldName, fieldTypeinfo, target);
				target.put(fieldName, fieldElement);
				final Class<?> fieldType = field.getType();
				field.setAccessible(true);

				System.out.printf("\n\tfield %s (%d) %s %s\n", fieldName, fieldTypeinfo, fieldType.getName(), field.get(source));
				System.out.flush();

				if (fieldType.equals(String.class)) {
					final String text = (String) field.get(source);
					System.out.printf("\tsetText(\"%s\")\n", text);
					fieldElement.setText(text);
				} else if (fieldType.equals(Byte.TYPE)) {
					final String text = Byte.toString(field.getByte(source));
					System.out.printf("\tsetText(\"%s\")\n", text);
					fieldElement.setText(text);
				} else if (fieldType.equals(Short.TYPE)) {
					final String text = Short.toString(field.getShort(source));
					System.out.printf("\tsetText(\"%s\")\n", text);
					fieldElement.setText(text);
				} else if (fieldType.equals(Integer.TYPE)) {
					final String text = Integer.toString(field.getInt(source));
					System.out.printf("\tsetText(\"%s\")\n", text);
					fieldElement.setText(text);
				} else if (fieldType.equals(Long.TYPE)) {
					final String text = Long.toString(field.getLong(source));
					System.out.printf("\tsetText(\"%s\")\n", text);
					fieldElement.setText(text);
				} else if (fieldType.equals(List.class)) {
					if (fieldTypeinfo == 47) {
						// comma separated list of integers stored as string
						final StringBuilder sb = new StringBuilder();
						@SuppressWarnings("unchecked")
						final List<Integer> list = (List<Integer>) field.get(source);
						for (final Integer i : list) {
							if (sb.length() > 0) {
								sb.append(',');
							}
							sb.append(i.toString());
						}
						System.out.printf("\tsetText(\"%s\")\n", sb.toString());
						fieldElement.setText(sb.toString());
					} else {
						final String listElementName = "foo2"; // annotation2.name();
						final int listElementTypeinfo = 42; // annotation2.typeinfo();
						final Class<?> listElementClass = Object.class; // annotation2.type();
						final List<?> list = (List<?>) field.get(source);

						System.out.printf("\tLisElement(name=\"%s\", typeinfo=%d, type=%s)\n", listElementName, listElementTypeinfo,
						        listElementClass.getName());

						final String nameFormat = fieldTypeinfo == 6 ? "%s_%02d" : "%s__%02d";

						int index = 0;
						for (final Object o : list) {
							final String name = String.format(nameFormat, listElementName, index++);
							final XmlElement listElement = new XmlElement(name, listElementTypeinfo, fieldElement);
							fieldElement.put(name, listElement);
							System.out.printf("\t\tList element %s (%d)\n", name, listElementTypeinfo);

							if (listElementClass.equals(String.class)) {
								final String text = (String) o;
								System.out.printf("\t\tsetText(\"%s\")\n", text);
								listElement.setText(text);
							} else if (listElementClass.equals(Byte.class)) {
								final String text = ((Byte) o).toString();
								System.out.printf("\t\tsetText(\"%s\")\n", text);
								listElement.setText(text);
							} else if (listElementClass.equals(Short.class)) {
								final String text = ((Short) o).toString();
								System.out.printf("\t\tsetText(\"%s\")\n", text);
								listElement.setText(text);
							} else if (listElementClass.equals(Integer.class)) {
								final String text = ((Integer) o).toString();
								System.out.printf("\t\tsetText(\"%s\")\n", text);
								listElement.setText(text);
							} else if (listElementClass.equals(Long.class)) {
								final String text = ((Long) o).toString();
								System.out.printf("\t\tsetText(\"%s\")\n", text);
								listElement.setText(text);
							} else if (listElementClass.equals(List.class)) {
								// TODO - list in list
								System.err.println("Warning! List in List not yet implemented.");
							} else if (ConfigElement.class.isAssignableFrom(listElementClass)) {
								final ConfigElement instance = (ConfigElement) o;
								marshal(instance, listElement);
							} else {
								throw new RuntimeException(String.format("unknown list element type: %s", fieldType.getName()));
							}
						}
					}
				} else if (ConfigElement.class.isAssignableFrom(fieldType)) {
					final ConfigElement child = (ConfigElement) field.get(source);
					marshal(child, fieldElement);
				} else {
					throw new RuntimeException(String.format("unknown field type: %s", fieldType.getName()));
				}
			}
		}
	}

}
