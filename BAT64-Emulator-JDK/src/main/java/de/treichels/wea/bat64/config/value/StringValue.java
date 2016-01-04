package de.treichels.wea.bat64.config.value;

import org.simpleframework.xml.Attribute;

public class StringValue extends Value<String> {
	public StringValue(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
