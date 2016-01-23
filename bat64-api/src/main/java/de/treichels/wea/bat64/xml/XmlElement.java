package de.treichels.wea.bat64.xml;

import java.util.Collection;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

public class XmlElement implements Map<String, XmlElement> {
	private final Map<String, XmlElement> children = new TreeMap<String, XmlElement>();
	private final String name;
	private final XmlElement parent;
	private String text = null;
	private final int typeinfo;

	public XmlElement(final String name, final int typeinfo, final XmlElement parent) {
		this.name = name;
		this.typeinfo = typeinfo;
		this.parent = parent;
	}

	@Override
	public void clear() {
		children.clear();
	}

	@Override
	public boolean containsKey(final Object key) {
		return children.containsKey(key);
	}

	@Override
	public boolean containsValue(final Object value) {
		return children.containsValue(value);
	}

	public String dumpHierachy() {
		final StringBuilder sb = new StringBuilder(name);
		if (parent != null) {
			sb.append(".").append(parent.dumpHierachy());
		}
		return sb.toString();
	}

	@Override
	public Set<java.util.Map.Entry<String, XmlElement>> entrySet() {
		return children.entrySet();
	}

	@Override
	public boolean equals(final Object obj) {
		if (this == obj) {
			return true;
		}

		if (obj == null) {
			return false;
		}

		if (getClass() != obj.getClass()) {
			return false;
		}

		final XmlElement other = (XmlElement) obj;

		if (!name.equals(other.name)) {
			return false;
		}
		if (typeinfo != other.typeinfo) {
			return false;
		}

		if (text == null) {
			if (other.text != null) {
				return false;
			}
		} else if (text.contains(",")) {
			if (!text.replaceAll(" ", "").equals(other.text.replaceAll(" ", ""))) {
				return false;
			}
		} else if (!text.equals(other.text)) {
			return false;
		}

		if (children.size() != other.children.size()) {
			return false;
		}

		final Iterator<java.util.Map.Entry<String, XmlElement>> thisIterator = children.entrySet().iterator();
		final Iterator<java.util.Map.Entry<String, XmlElement>> otherIterator = other.children.entrySet().iterator();
		while (thisIterator.hasNext()) {
			final Entry<String, XmlElement> thisEntry = thisIterator.next();
			final String thisKey = thisEntry.getKey();
			final XmlElement thisChild = thisEntry.getValue();
			final Entry<String, XmlElement> otherEntry = otherIterator.next();
			final String otherKey = otherEntry.getKey();
			final XmlElement otherChild = otherEntry.getValue();

			if (!thisKey.equals(otherKey)) {
				return false;
			}

			if (!thisChild.equals(otherChild)) {
				return false;
			}
		}

		return true;
	}

	@Override
	public XmlElement get(final Object key) {
		return children.get(key);
	}

	public String getName() {
		return name;
	}

	public XmlElement getParent() {
		return parent;
	}

	public String getText() {
		return text;
	}

	public int getTypeinfo() {
		return typeinfo;
	}

	public boolean hasText() {
		return text != null;
	}

	@Override
	public boolean isEmpty() {
		return children.isEmpty();
	}

	@Override
	public Set<String> keySet() {
		return children.keySet();
	}

	@Override
	public XmlElement put(final String key, final XmlElement value) {
		return children.put(key, value);
	}

	@Override
	public void putAll(final Map<? extends String, ? extends XmlElement> m) {
		children.putAll(m);
	}

	@Override
	public XmlElement remove(final Object key) {
		return children.remove(key);
	}

	public void setText(final String text) {
		this.text = text;
	}

	@Override
	public int size() {
		return children.size();
	}

	@Override
	public Collection<XmlElement> values() {
		return children.values();
	}
}