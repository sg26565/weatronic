package de.treichels.wea.bat64.config.controlsurfaces;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.StringValue;

public class ControlSurfacesConfig extends ConfigElement {
	public StringValue ControlSurfaces;
	public DependentFunctions DependentFunctions;

	public ControlSurfacesConfig() {
		super(10);
	}
}
