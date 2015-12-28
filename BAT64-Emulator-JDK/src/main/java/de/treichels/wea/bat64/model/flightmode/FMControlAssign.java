package de.treichels.wea.bat64.model.flightmode;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.value.StringValue;

public class FMControlAssign extends ConfigElement {
	public ControlSwitches ControlSwitchs;
	public StringValue FlightModeLUT;

	public FMControlAssign() {
		super(15);
	}
}
