package de.treichels.wea.bat64.config.rotary;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.PercentValue;
import de.treichels.wea.bat64.config.value.ShortValue;

public class RotarySetupSingle extends ConfigElement {
	public ByteValue Flags;
	public ShortValue ID;
	public PercentValue Preset;
	public ShortValue Steps;

	public RotarySetupSingle() {
		super(42);
	}
}
