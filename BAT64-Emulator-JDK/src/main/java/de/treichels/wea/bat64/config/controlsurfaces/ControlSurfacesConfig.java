package de.treichels.wea.bat64.config.controlsurfaces;

import de.treichels.wea.bat64.config.ConfigElement;

public class ControlSurfacesConfig extends ConfigElement {
	public String ControlSurfaces;
	public DependentFunctions DependentFunctions;

	public ControlSurfacesConfig() {
		super(10);
	}
}
