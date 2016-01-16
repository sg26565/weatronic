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
	public void load(final XmlElement element) throws InstantiationException, IllegalAccessException {
		// assert getTypeinfo() == element.getTypeinfo();
		System.out.printf("\nElement %s (%d)\n", element.getName(), element.getTypeinfo());
		System.out.flush();

		for (final Field field : getClass().getDeclaredFields()) {
			final Element annotation = field.getAnnotation(Element.class);
			if (annotation != null) {
				final String name = annotation.name();
				final int typeinfo = annotation.typeinfo();
				System.out.printf("\n\t@Element(name=\"%s\", typeinfo=%d)\n", name, typeinfo);
				System.out.flush();

				final XmlElement childElement = element.get(name);
				assert childElement != null;
				assert childElement.getName().equals(name);
				// assert childElement.getTypeinfo() == typeinfo;

				final Class<?> type = field.getType();
				final String text = childElement.getText();
				field.setAccessible(true);

				if (type.equals(String.class)) {
					System.out.printf("\tString %s = \"%s\"\n", field.getName(), text);
					field.set(this, text);
				} else if (type.equals(Byte.TYPE)) {
					System.out.printf("\tbyte %s = %s\n", field.getName(), text);
					field.set(this, Byte.parseByte(text));
				} else if (type.equals(Short.TYPE)) {
					System.out.printf("\tshort %s = %s\n", field.getName(), text);
					field.set(this, Short.parseShort(text));
				} else if (type.equals(Integer.TYPE)) {
					System.out.printf("\tint %s = %s\n", field.getName(), text);
					field.set(this, Integer.parseInt(text));
				} else if (type.equals(Long.TYPE)) {
					System.out.printf("\tlong %s = %s\n", field.getName(), text);
					field.set(this, Long.parseLong(text));
				} else if (type.equals(List.class)) {
					@SuppressWarnings("rawtypes")
					final List list = new ArrayList();
					field.set(this, list);

					if (typeinfo == 47) {
						System.out.printf("\tList<String> %s = new ArrayList()\n", field.getName());
						final StringTokenizer tokenizer = new StringTokenizer(text, ",");
						while (tokenizer.hasMoreTokens()) {
							final String value = tokenizer.nextToken().trim();
							System.out.printf("\tadd(new Integer(\"%s\"))\n", value);
							list.add(new Integer(value));
						}
					} else {
						final ListElement annotation2 = field.getAnnotation(ListElement.class);
						final Class<?> listElementClass = annotation2.type();
						System.out.printf(
								"\t@ListElement(name=\"%s\", typeinfo=%d, type=%s)\n\tList<%s> %s = new ArrayList()\n",
								annotation2.name(), annotation2.typeinfo(), listElementClass.getName(),
								listElementClass.getName(), field.getName());
						for (final XmlElement listElement : childElement.values()) {
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
							} else {
								final ConfigElement newInstance = (ConfigElement) listElementClass.newInstance();
								list.add(newInstance);
								System.out.printf("\tadd(new %s())\n", listElementClass.getName());
								newInstance.load(listElement);
							}
						}
					}
				} else {
					final ConfigElement instance = (ConfigElement) type.newInstance();
					field.set(this, instance);
					System.out.printf("\t%s %s = new %s()\n", type.getName(), field.getName(), type.getName());
					instance.load(childElement);
				}
			}
		}
	}

	public void store(final XmlElement element) {

	}
}
