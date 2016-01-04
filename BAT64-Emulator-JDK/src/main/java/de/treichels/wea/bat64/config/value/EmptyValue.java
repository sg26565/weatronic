package de.treichels.wea.bat64.config.value;

import org.simpleframework.xml.Attribute;

public class EmptyValue extends Value<Void> {
	public EmptyValue(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
