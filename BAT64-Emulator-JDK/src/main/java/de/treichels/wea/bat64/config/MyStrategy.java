package de.treichels.wea.bat64.config;

import java.lang.reflect.Constructor;
import java.util.Map;

import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;
import org.simpleframework.xml.strategy.Strategy;
import org.simpleframework.xml.strategy.TreeStrategy;
import org.simpleframework.xml.strategy.Type;
import org.simpleframework.xml.strategy.Value;
import org.simpleframework.xml.stream.InputNode;
import org.simpleframework.xml.stream.NodeMap;
import org.simpleframework.xml.stream.OutputNode;

public class MyStrategy implements Strategy {
	private static class MyValue implements Value {
		private NamedConfigList<? extends ConfigElement> value;
		private final Class<?> type;

		// public MyValue(final Class<?> type) {
		// this(null, type);
		// }

		public MyValue(final NamedConfigList<? extends ConfigElement> value) {
			this(value, value.getClass());
		}

		public MyValue(final NamedConfigList<? extends ConfigElement> value, final Class<?> type) {
			this.value = value;
			this.type = type;
		}

		@Override
		public int getLength() {
			return 0;
		}

		@Override
		public Class<?> getType() {
			return type;
		}

		@Override
		public Object getValue() {
			return value;
		}

		@Override
		public boolean isReference() {
			return false;
		}

		@SuppressWarnings("unchecked")
		@Override
		public void setValue(final Object value) {
			this.value = (NamedConfigList<? extends ConfigElement>) value;
		}

	}

	private final Strategy parentStrategy;

	public MyStrategy() {
		this(new TreeStrategy());
	}

	public MyStrategy(final Strategy parentStrategy) {
		this.parentStrategy = parentStrategy;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public Value read(final Type type, final NodeMap<InputNode> nodeMap, final Map map) throws Exception {
		if (NamedConfigList.class.isAssignableFrom(type.getType())) {
			final InputNode node = nodeMap.getNode();
			final int containerTypeinfo = Integer.parseInt(node.getAttribute(ConfigElement.TYPEINFO).getValue());
			final Class<? extends NamedConfigList> containerClass = type.getType();
			final Constructor<? extends NamedConfigList> ctor = containerClass.getConstructor(Integer.TYPE);
			final NamedConfigList container = ctor.newInstance(containerTypeinfo);
			final Serializer serializer = new Persister();

			InputNode child = node.getNext();
			while (child != null) {
				final String childName = child.getName();
				final String baseName = childName.substring(0, childName.length() - 4);
				final int clildTypeinfo = Integer.parseInt(child.getAttribute(ConfigElement.TYPEINFO).getValue());

				// try to resolve child class by typeinfo
				Class<? extends ConfigElement> childClass = ConfigElement.getClassFor(clildTypeinfo);
				if (childClass == null) {
					// try to resolve child class by node name
					childClass = ConfigElement.getClassFor(baseName);
				}

				if (childClass == null) {
					System.err.printf("no class found for child %s(typeinfo = %d) and container %s(typeinfo = %d)\n",
							childName, clildTypeinfo, node.getName(), containerTypeinfo);
				}

				final ConfigElement v = serializer.read(childClass, child);
				container.values.add(v);
				child = node.getNext();
			}

			return new MyValue(container);
		} else {
			return parentStrategy.read(type, nodeMap, map);
		}
	}

	@Override
	public boolean write(final Type type, final Object value, final NodeMap<OutputNode> node, final Map map)
			throws Exception {
		return parentStrategy.write(type, value, node, map);
	}
}
