package de.treichels.wea.bat64.model.function;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.value.PercentValue;

public class FlexConfig extends ConfigElement {
	public PercentValue Center;
	public PercentValue Hi;
	public PercentValue Lo;

	public FlexConfig() {
		super(51);
	}
}
