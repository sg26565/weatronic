package de.treichels.wea.bat64.config.mixer;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.function.FlexConfig;
import de.treichels.wea.bat64.config.value.PercentValue;
import de.treichels.wea.bat64.config.value.ShortValue;

public class MixerSetup extends ConfigElement {
	public ShortValue CurveIdx;
	public PercentValue DelayDown;
	public PercentValue DelayUp;
	public FlexConfig Gain;

	public MixerSetup(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
