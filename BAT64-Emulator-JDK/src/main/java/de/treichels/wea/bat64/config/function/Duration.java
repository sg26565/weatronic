package de.treichels.wea.bat64.config.function;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.PercentValue;

public class Duration extends ConfigElement {
	public PercentValue FromLeft;
	public PercentValue FromRight;

	public Duration(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
