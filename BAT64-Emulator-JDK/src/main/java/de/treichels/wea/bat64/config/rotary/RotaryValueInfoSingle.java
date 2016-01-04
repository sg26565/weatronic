package de.treichels.wea.bat64.config.rotary;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.value.PercentValue;
import de.treichels.wea.bat64.config.value.ShortValue;

public class RotaryValueInfoSingle extends ConfigElement {
	public ShortValue ID;
	public ConfigList<ConfigList<PercentValue>> Values;

	public RotaryValueInfoSingle(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
