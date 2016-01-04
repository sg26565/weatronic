package de.treichels.wea.bat64.config.flightmode;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.TravelValue;

public class ControlSwitch extends ConfigElement {
	public ByteValue Control;
	public TravelValue Trigger;

	public ControlSwitch() {
		super(12);
	}
}
