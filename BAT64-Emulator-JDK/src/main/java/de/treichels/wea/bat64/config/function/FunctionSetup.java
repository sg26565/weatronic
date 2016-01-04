package de.treichels.wea.bat64.config.function;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.PercentValue;
import de.treichels.wea.bat64.config.value.ShortValue;

public class FunctionSetup extends ConfigElement {
	public ShortValue CurveIdx;
	public Duration Duration;
	public PercentValue FMO;
	public FlexConfig FlexDifferential;
	public FlexConfig FlexExpo;
	public FlexConfig FlexRate;

	public FunctionSetup(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
