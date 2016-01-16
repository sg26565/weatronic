package de.treichels.wea.bat64.xml;

import java.util.Collection;
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
		if (children == null) {
			if (other.children != null) {
				return false;
			}
		} else if (!children.equals(other.children)) {
			return false;
		}
		if (name == null) {
			if (other.name != null) {
				return false;
			}
		} else if (!name.equals(other.name)) {
			return false;
		}
		if (text == null) {
			if (other.text != null) {
				return false;
			}
		} else if (!text.equals(other.text)) {
			return false;
		}
		if (typeinfo != other.typeinfo) {
			return false;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (children == null ? 0 : children.hashCode());
		result = prime * result + (name == null ? 0 : name.hashCode());
		result = prime * result + (text == null ? 0 : text.hashCode());
		result = prime * result + typeinfo;
		return result;
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