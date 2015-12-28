package de.treichels.wea.bat64.model.rotary;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.value.ByteValue;
import de.treichels.wea.bat64.model.value.PercentValue;
import de.treichels.wea.bat64.model.value.ShortValue;

public class RotarySetupSingle extends ConfigElement {
	public ByteValue Flags;
	public ShortValue ID;
	public PercentValue Preset;
	public ShortValue Steps;

	public RotarySetupSingle() {
		super(42);
	}
}
