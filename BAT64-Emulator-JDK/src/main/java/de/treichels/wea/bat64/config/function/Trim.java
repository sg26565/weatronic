package de.treichels.wea.bat64.config.function;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.PercentValue;
import de.treichels.wea.bat64.config.value.ShortValue;

public class Trim extends ConfigGroup {
	public ShortValue Control;
	public ByteValue Mode;
	public PercentValue Range;
	public ByteValue Reverse;
}
