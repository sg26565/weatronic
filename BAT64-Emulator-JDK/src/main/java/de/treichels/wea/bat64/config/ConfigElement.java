package de.treichels.wea.bat64.config;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import de.treichels.wea.bat64.xml.Element;
import de.treichels.wea.bat64.xml.ListElement;
import de.treichels.wea.bat64.xml.XmlElement;

public abstract class ConfigElement {
	private final int typeinfo;

	public ConfigElement(final int typeinfo) {
		this.typeinfo = typeinfo;
	}

	public int getTypeinfo() {
		return typeinfo;
	}

	@SuppressWarnings("unchecked")
	public void load(final XmlElement parent) throws InstantiationException, IllegalAccessException {
		System.out.printf("\nElement %s (%d)\n", parent.getName(), parent.getTypeinfo());
		System.out.flush();

		for (final Field field : getClass().getDeclaredFields()) {
			final Element annotation = field.getAnnotation(Element.class);
			if (annotation != null) {
				final String fieldName = annotation.name();
				final int fieldTypeinfo = annotation.typeinfo();
				final XmlElement fieldElement = parent.get(fieldName);
				final Class<?> fieldType = field.getType();
				final String fieldText = fieldElement.getText();
				field.setAccessible(true);

				System.out.printf("\n\t@Element(name=\"%s\", typeinfo=%d)\n", fieldName, fieldTypeinfo);
				System.out.flush();

				if (fieldType.equals(String.class)) {
					System.out.printf("\tString %s = \"%s\"\n", field.getName(), fieldText);
					field.set(this, fieldText);
				} else if (fieldType.equals(Byte.TYPE)) {
					System.out.printf("\tbyte %s = %s\n", field.getName(), fieldText);
					field.set(this, Byte.parseByte(fieldText));
				} else if (fieldType.equals(Short.TYPE)) {
					System.out.printf("\tshort %s = %s\n", field.getName(), fieldText);
					field.set(this, Short.parseShort(fieldText));
				} else if (fieldType.equals(Integer.TYPE)) {
					System.out.printf("\tint %s = %s\n", field.getName(), fieldText);
					field.set(this, Integer.parseInt(fieldText));
				} else if (fieldType.equals(Long.TYPE)) {
					System.out.printf("\tlong %s = %s\n", field.getName(), fieldText);
					field.set(this, Long.parseLong(fieldText));
				} else if (fieldType.equals(List.class)) {
					@SuppressWarnings("rawtypes")
					final List list = new ArrayList();
					field.set(this, list);

					if (fieldTypeinfo == 47) {
						// comma separated list of integers stored as string
						System.out.printf("\tList<String> %s = new ArrayList()\n", field.getName());
						final StringTokenizer tokenizer = new StringTokenizer(fieldText, ",");
						while (tokenizer.hasMoreTokens()) {
							final String value = tokenizer.nextToken().trim();
							System.out.printf("\tadd(new Integer(\"%s\"))\n", value);
							list.add(new Integer(value));
						}
					} else {
						final ListElement annotation2 = field.getAnnotation(ListElement.class);
						final String listElementName = annotation2.name();
						final int listElementTypeinfo = annotation2.typeinfo();
						final Class<?> listElementClass = annotation2.type();

						System.out.printf(
								"\t@ListElement(name=\"%s\", typeinfo=%d, type=%s)\n\tList<%s> %s = new ArrayList()\n",
								listElementName, listElementTypeinfo, listElementClass.getName(),
								listElementClass.getName(), field.getName());
						for (final XmlElement listElement : fieldElement.values()) {
							final String listElementText = listElement.getText();
							if (listElementClass.equals(String.class)) {
								System.out.printf("\tadd(\"%s\")\n", listElementText);
								list.add(listElementText);
							} else if (listElementClass.equals(Byte.class)) {
								System.out.printf("\tadd(new Byte(\"%s\"))\n", listElementText);
								list.add(new Byte(listElementText));
							} else if (listElementClass.equals(Short.class)) {
								System.out.printf("\tadd(new Short(\"%s\"))\n", listElementText);
								list.add(new Short(listElementText));
							} else if (listElementClass.equals(Integer.class)) {
								System.out.printf("\tadd(new Integer(\"%s\"))\n", listElementText);
								list.add(new Integer(listElementText));
							} else if (listElementClass.equals(Long.class)) {
								System.out.printf("\tadd(new Long(\"%s\"))\n", listElementText);
								list.add(new Long(listElementText));
							} else if (listElementClass.equals(List.class)) {
								// TODO - list in list
								System.err.println("Warning! List in List not yet implemented.");
							} else if (ConfigElement.class.isAssignableFrom(listElementClass)) {
								final ConfigElement newInstance = (ConfigElement) listElementClass.newInstance();
								list.add(newInstance);
								System.out.printf("\tadd(new %s())\n", listElementClass.getName());
								newInstance.load(listElement);
							} else {
								throw new RuntimeException(
										String.format("unknown list element type: %s", listElementClass.getName()));
							}
						}
					}
				} else if (ConfigElement.class.isAssignableFrom(fieldType)) {
					final ConfigElement instance = (ConfigElement) fieldType.newInstance();
					field.set(this, instance);
					System.out.printf("\t%s %s = new %s()\n", fieldType.getName(), field.getName(),
							fieldType.getName());
					instance.load(fieldElement);
				} else {
					throw new RuntimeException(String.format("unknown field type: %s", fieldType.getName()));
				}
			}
		}
	}

	public void store(final XmlElement parent) throws IllegalArgumentException, IllegalAccessException {
		System.out.printf("\nElement %s (%d)\n", parent.getName(), parent.getTypeinfo());
		System.out.flush();

		for (final Field field : getClass().getDeclaredFields()) {
			final Element annotation = field.getAnnotation(Element.class);
			if (annotation != null) {
				final String fieldName = annotation.name();
				final int fieldTypeinfo = annotation.typeinfo();
				final XmlElement fieldElement = new XmlElement(fieldName, fieldTypeinfo, parent);
				parent.put(fieldName, fieldElement);
				final Class<?> fieldType = field.getType();
				field.setAccessible(true);

				System.out.printf("\n\tfield %s (%d) %s %s\n", fieldName, fieldTypeinfo, fieldType.getName(),
						field.get(this));
				System.out.flush();

				if (fieldType.equals(String.class)) {
					final String text = (String) field.get(this);
					System.out.printf("\tsetText(\"%s\")\n", text);
					fieldElement.setText(text);
				} else if (fieldType.equals(Byte.TYPE)) {
					final String text = Byte.toString(field.getByte(this));
					System.out.printf("\tsetText(\"%s\")\n", text);
					fieldElement.setText(text);
				} else if (fieldType.equals(Short.TYPE)) {
					final String text = Short.toString(field.getShort(this));
					System.out.printf("\tsetText(\"%s\")\n", text);
					fieldElement.setText(text);
				} else if (fieldType.equals(Integer.TYPE)) {
					final String text = Integer.toString(field.getInt(this));
					System.out.printf("\tsetText(\"%s\")\n", text);
					fieldElement.setText(text);
				} else if (fieldType.equals(Long.TYPE)) {
					final String text = Long.toString(field.getLong(this));
					System.out.printf("\tsetText(\"%s\")\n", text);
					fieldElement.setText(text);
				} else if (fieldType.equals(List.class)) {
					if (fieldTypeinfo == 47) {
						// comma separated list of integers stored as string
						final StringBuilder sb = new StringBuilder();
						@SuppressWarnings("unchecked")
						final List<Integer> list = (List<Integer>) field.get(this);
						for (final Integer i : list) {
							if (sb.length() > 0) {
								sb.append(',');
							}
							sb.append(i.toString());
						}
						System.out.printf("\tsetText(\"%s\")\n", sb.toString());
						fieldElement.setText(sb.toString());
					} else {
						final ListElement annotation2 = field.getAnnotation(ListElement.class);
						final String listElementName = annotation2.name();
						final int listElementTypeinfo = annotation2.typeinfo();
						final Class<?> listElementClass = annotation2.type();
						final List<?> list = (List<?>) field.get(this);

						System.out.printf("\tLisElement(name=\"%s\", typeinfo=%d, type=%s)\n", listElementName,
								listElementTypeinfo, listElementClass.getName());

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
								instance.store(listElement);
							} else {
								throw new RuntimeException(
										String.format("unknown list element type: %s", fieldType.getName()));
							}
						}
					}
				} else if (ConfigElement.class.isAssignableFrom(fieldType)) {
					final ConfigElement child = (ConfigElement) field.get(this);
					child.store(fieldElement);
				} else {
					throw new RuntimeException(String.format("unknown field type: %s", fieldType.getName()));
				}
			}
		}
	}
}
