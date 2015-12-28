package de.treichels.wea.bat64.model.mixer;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.function.FlexConfig;
import de.treichels.wea.bat64.model.value.PercentValue;
import de.treichels.wea.bat64.model.value.ShortValue;

public class MixerSetup extends ConfigElement {
	public ShortValue CurveIdx;
	public PercentValue DelayDown;
	public PercentValue DelayUp;
	public FlexConfig Gain;

	public MixerSetup() {
		super(30);
	}
}
