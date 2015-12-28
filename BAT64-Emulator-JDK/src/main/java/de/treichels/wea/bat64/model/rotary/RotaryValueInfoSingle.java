package de.treichels.wea.bat64.model.rotary;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.List;
import de.treichels.wea.bat64.model.value.PercentValue;
import de.treichels.wea.bat64.model.value.ShortValue;

public class RotaryValueInfoSingle extends ConfigElement {
	public ShortValue ID;
	public List<List<PercentValue>> Values;

	public RotaryValueInfoSingle() {
		super(70);
	}
}
