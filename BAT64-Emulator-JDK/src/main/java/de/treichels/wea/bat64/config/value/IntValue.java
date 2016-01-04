package de.treichels.wea.bat64.config.value;

import org.simpleframework.xml.Attribute;

public class IntValue extends Value<Integer> {
	public IntValue(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
