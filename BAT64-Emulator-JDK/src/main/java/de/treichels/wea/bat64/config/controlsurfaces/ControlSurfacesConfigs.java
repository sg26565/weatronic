package de.treichels.wea.bat64.config.controlsurfaces;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;

public class ControlSurfacesConfigs extends ConfigElement {
	public ControlSurfacesConfig Elevators;
	public ControlSurfacesConfig Rudders;
	public ControlSurfacesConfig Wings;

	public ControlSurfacesConfigs(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
