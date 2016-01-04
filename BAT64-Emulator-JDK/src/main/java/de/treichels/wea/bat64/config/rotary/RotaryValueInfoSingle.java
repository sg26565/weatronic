package de.treichels.wea.bat64.config.rotary;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.List;
import de.treichels.wea.bat64.config.value.PercentValue;
import de.treichels.wea.bat64.config.value.ShortValue;

public class RotaryValueInfoSingle extends ConfigElement {
	public ShortValue ID;
	public List<List<PercentValue>> Values;

	public RotaryValueInfoSingle() {
		super(70);
	}
}
