package de.treichels.wea.bat64.model.function;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.value.PercentValue;
import de.treichels.wea.bat64.model.value.ShortValue;

public class FunctionSetup extends ConfigElement {
	public ShortValue CurveIdx;
	public Duration Duration;
	public PercentValue FMO;
	public FlexConfig FlexDifferential;
	public FlexConfig FlexExpo;
	public FlexConfig FlexRate;

	public FunctionSetup() {
		super(19);
	}
}
