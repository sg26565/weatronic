package de.treichels.wea.bat64.config.function;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.PercentValue;
import de.treichels.wea.bat64.config.value.ShortValue;

public class Trim extends ConfigElement {
	public ShortValue Control;
	public ByteValue Mode;
	public PercentValue Range;
	public ByteValue Reverse;

	public Trim(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
