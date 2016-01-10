package de.treichels.wea.bat64.config.rotary;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.value.ShortValue;

public class RotaryValueInfoSingle extends ConfigElement {
	public ShortValue ID;
	public ConfigList Values;

	public RotaryValueInfoSingle() {
		super(70);
	}
}
