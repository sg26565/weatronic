package de.treichels.wea.bat64.config;

import java.util.ArrayList;
import java.util.List;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.convert.Convert;
import org.simpleframework.xml.convert.Converter;
import org.simpleframework.xml.core.Persister;
import org.simpleframework.xml.stream.InputNode;
import org.simpleframework.xml.stream.OutputNode;

@Root
@Convert(ConfigList.ListConverter.class)
public class ConfigList<T extends ConfigElement> extends ConfigElement {
	public static class ListConverter<T extends ConfigElement> implements Converter<ConfigList<T>> {
		@Override
		public ConfigList<T> read(final InputNode node) throws Exception {
			final int containerTypeinfo = Integer.parseInt(node.getAttribute(TYPEINFO).getValue());
			final String containerName = node.getName();
			final ConfigList<T> container = new ConfigList<T>(containerTypeinfo);
			final Serializer serializer = new Persister();

			InputNode child = node.getNext();
			while (child != null) {
				final int clildTypeinfo = Integer.parseInt(child.getAttribute(TYPEINFO).getValue());

				// try to resolve child class by typeinfo
				Class<? extends ConfigElement> childClass = ConfigElement.getClassFor(clildTypeinfo);
				if (childClass == null) {
					// try to resolve child class by parent node name
					childClass = ConfigElement.getClassFor(containerName);
				}

				if (childClass == null) {
					System.err.printf("no class found for typeinfo %d and parent node %s (%d)\n", clildTypeinfo,
							containerName, containerTypeinfo);
				}

				@SuppressWarnings("unchecked")
				final T v = (T) serializer.read(childClass, child);
				container.values.add(v);
				child = node.getNext();
			}

			return container;
		}

		@Override
		public void write(final OutputNode node, final ConfigList<T> value) throws Exception {
			final Serializer serializer = new Persister();

			node.setAttribute(TYPEINFO, Integer.toString(value.typeinfo));

			int index = 0;
			for (final T v : value.values) {
				final OutputNode listElement = node.getChild(String.format("_%02d", index++));
				listElement.setAttribute("typinfo", Integer.toString(v.typeinfo));
				listElement.setValue("goo");
				serializer.write(v, listElement);
			}
		}
	}

	@ElementList
	public List<T> values = new ArrayList<T>();

	public ConfigList(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
