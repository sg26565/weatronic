package de.treichels.wea.bat64.model.flightmode;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.value.StringValue;
import de.treichels.wea.bat64.model.value.TravelValue;

public class FlightMode extends ConfigElement {
	public TravelValue FadeIn;
	public StringValue Name;
	public StringValue NoFadeInFuncIdxs;

	public FlightMode() {
		super(14);
	}
}
