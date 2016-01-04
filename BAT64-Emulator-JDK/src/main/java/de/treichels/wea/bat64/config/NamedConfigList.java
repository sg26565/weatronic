package de.treichels.wea.bat64.config;

import java.lang.reflect.Constructor;
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
@Convert(NamedConfigList.ListConverter.class)
public class NamedConfigList<T extends ConfigElement> extends ConfigElement {
	public static class ListConverter<T extends ConfigElement> implements Converter<NamedConfigList<T>> {
		@Override
		public NamedConfigList<T> read(final InputNode node) throws Exception {
			final int containerTypeinfo = Integer.parseInt(node.getAttribute(ConfigElement.TYPEINFO).getValue());
			final String containerName = node.getName();

			@SuppressWarnings("unchecked")
			final Class<? extends NamedConfigList<T>> containerClass = (Class<? extends NamedConfigList<T>>) ConfigElement
					.getClassFor(containerName);
			assert containerClass != null;
			final Constructor<? extends NamedConfigList<T>> ctor = containerClass.getConstructor(Integer.TYPE);
			final NamedConfigList<T> container = ctor.newInstance(containerTypeinfo);

			final Serializer serializer = new Persister();

			InputNode child = node.getNext();
			final String childName = child.getName();
			assert childName.endsWith("__00");

			final String baseName = childName.substring(0, childName.length() - 4);

			while (child != null) {
				final int clildTypeinfo = Integer.parseInt(child.getAttribute(ConfigElement.TYPEINFO).getValue());

				// try to resolve child class by typeinfo
				Class<? extends ConfigElement> childClass = ConfigElement.getClassFor(clildTypeinfo);
				if (childClass == null) {
					// try to resolve child class by parent node name
					childClass = ConfigElement.getClassFor(baseName);
				}

				if (childClass == null) {
					System.err.printf("no class found for typeinfo %d and parent node %s (%d)\n", clildTypeinfo,
							containerName, containerTypeinfo);
				}

				assert childClass != null;

				@SuppressWarnings("unchecked")
				final T v = (T) serializer.read(childClass, child);
				container.values.add(v);
				child = node.getNext();
			}

			return container;
		}

		@Override
		public void write(final OutputNode node, final NamedConfigList<T> value) throws Exception {
			final Serializer serializer = new Persister();

			node.setAttribute(ConfigElement.TYPEINFO, Integer.toString(value.typeinfo));

			int index = 0;
			for (final T v : value.values) {
				serializer.write(v, node);

				final String childName = v.getClass().getSimpleName().toLowerCase();
				final OutputNode childNode = node.getChild(childName);
				childNode.setName(String.format("%s_%02d", value.name, index++));
			}
		}
	}

	@ElementList(inline = true, entry = "NamedConfigListEntry")
	public List<T> values = new ArrayList<T>();

	private final String name;

	public NamedConfigList(@Attribute(name = TYPEINFO) final int typeinfo, final String name) {
		super(typeinfo);
		this.name = name;
	}
}
