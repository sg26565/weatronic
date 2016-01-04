package de.treichels.wea.bat64.config.function;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.PercentValue;

public class FailSafePos extends ConfigElement {
	public ByteValue Mode;
	public PercentValue Value;

	public FailSafePos(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
