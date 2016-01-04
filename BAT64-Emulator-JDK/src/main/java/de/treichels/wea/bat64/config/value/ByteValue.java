package de.treichels.wea.bat64.config.value;

import org.simpleframework.xml.Attribute;

public class ByteValue extends Value<Byte> {
	public ByteValue(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
