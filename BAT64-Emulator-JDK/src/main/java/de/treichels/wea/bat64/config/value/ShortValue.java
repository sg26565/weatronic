package de.treichels.wea.bat64.config.value;

import org.simpleframework.xml.Attribute;

public class ShortValue extends Value<Short> {
	public ShortValue(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
