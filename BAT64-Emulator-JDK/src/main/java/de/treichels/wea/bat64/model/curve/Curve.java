package de.treichels.wea.bat64.model.curve;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.value.IntValue;
import de.treichels.wea.bat64.model.value.StringValue;

public class Curve extends ConfigElement {
	public StringValue CurveValue;
	public IntValue RealPoints;

	public Curve() {
		super(13);
	}
}
