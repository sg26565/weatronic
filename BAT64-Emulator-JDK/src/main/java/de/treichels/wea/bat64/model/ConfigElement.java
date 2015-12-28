package de.treichels.wea.bat64.model;

import java.util.SortedMap;
import java.util.TreeMap;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlTransient;

public abstract class ConfigElement {
	@XmlTransient
	public static SortedMap<Integer, Class<? extends ConfigElement>> TYPE_CACHE = new TreeMap<Integer, Class<? extends ConfigElement>>();

	@XmlAttribute
	public final int typeinfo;

	public ConfigElement(final int typeinfo) {
		if (typeinfo != 32) {
			final Class<?> thisClass = getClass();
			final Class<?> otherClass = TYPE_CACHE.get(typeinfo);

			if (otherClass != null && !thisClass.equals(otherClass)) {
				throw new RuntimeException(String.format("cannot add %s, typeinfo %d is already in use by %s!",
						getClass(), typeinfo, otherClass.getName()));
			} else {
				TYPE_CACHE.put(typeinfo, getClass());
			}
		}

		this.typeinfo = typeinfo;
	}
}
