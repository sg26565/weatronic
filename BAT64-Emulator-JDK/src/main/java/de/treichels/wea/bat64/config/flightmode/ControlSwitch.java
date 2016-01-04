package de.treichels.wea.bat64.config.flightmode;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.TravelValue;

public class ControlSwitch extends ConfigElement {
	public ByteValue Control;
	public TravelValue Trigger;

	public ControlSwitch(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
