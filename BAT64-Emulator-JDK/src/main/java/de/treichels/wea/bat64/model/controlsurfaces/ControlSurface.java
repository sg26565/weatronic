package de.treichels.wea.bat64.model.controlsurfaces;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.value.ShortValue;
import de.treichels.wea.bat64.model.value.StringValue;

public class ControlSurface extends ConfigElement {
	public ShortValue ServoGroup;
	public StringValue Servos;

	public ControlSurface() {
		super(9);
	}
}
