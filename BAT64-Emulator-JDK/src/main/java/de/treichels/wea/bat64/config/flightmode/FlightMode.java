package de.treichels.wea.bat64.config.flightmode;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.StringValue;
import de.treichels.wea.bat64.config.value.TravelValue;

public class FlightMode extends ConfigElement {
	public TravelValue FadeIn;
	public StringValue Name;
	public StringValue NoFadeInFuncIdxs;

	public FlightMode(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
