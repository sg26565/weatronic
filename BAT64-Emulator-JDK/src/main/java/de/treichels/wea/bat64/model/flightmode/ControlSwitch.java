package de.treichels.wea.bat64.model.flightmode;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.value.ByteValue;
import de.treichels.wea.bat64.model.value.TravelValue;

public class ControlSwitch extends ConfigElement {
	public ByteValue Control;
	public TravelValue Trigger;

	public ControlSwitch() {
		super(12);
	}
}
