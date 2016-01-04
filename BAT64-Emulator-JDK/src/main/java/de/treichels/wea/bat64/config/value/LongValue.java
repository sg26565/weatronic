package de.treichels.wea.bat64.config.value;

import org.simpleframework.xml.Attribute;

public class LongValue extends Value<Long> {
	public LongValue(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
