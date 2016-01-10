package de.treichels.wea.bat64.config.function;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.PercentValue;

public class FlexConfig extends ConfigElement {
	public PercentValue Center;
	public PercentValue Hi;
	public PercentValue Lo;

	public FlexConfig() {
		super(51);
	}
}