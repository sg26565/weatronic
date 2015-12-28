package de.treichels.wea.bat64.config.curve;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.IntValue;
import de.treichels.wea.bat64.config.value.StringValue;

public class Curve extends ConfigElement {
	public StringValue CurveValue;
	public IntValue RealPoints;

	public Curve() {
		super(13);
	}
}
