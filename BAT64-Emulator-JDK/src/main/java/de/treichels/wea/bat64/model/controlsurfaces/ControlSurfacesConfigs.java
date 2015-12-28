package de.treichels.wea.bat64.model.controlsurfaces;

import de.treichels.wea.bat64.model.ConfigElement;

public class ControlSurfacesConfigs extends ConfigElement {
	public ControlSurfacesConfig Elevators;
	public ControlSurfacesConfig Rudders;
	public ControlSurfacesConfig Wings;

	public ControlSurfacesConfigs() {
		super(11);
	}
}
