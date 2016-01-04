package de.treichels.wea.bat64.config.flightmode;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.StringValue;

public class FMControlAssign extends ConfigElement {
	public ControlSwitches ControlSwitchs;
	public StringValue FlightModeLUT;

	public FMControlAssign(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
