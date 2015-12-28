package de.treichels.wea.bat64.config.controlsurfaces;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ShortValue;
import de.treichels.wea.bat64.config.value.StringValue;

public class ControlSurface extends ConfigElement {
	public ShortValue ServoGroup;
	public StringValue Servos;

	public ControlSurface() {
		super(9);
	}
}
