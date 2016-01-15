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