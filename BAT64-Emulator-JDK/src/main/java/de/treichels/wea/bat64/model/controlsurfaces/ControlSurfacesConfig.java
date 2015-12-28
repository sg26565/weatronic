package de.treichels.wea.bat64.model.controlsurfaces;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.value.StringValue;

public class ControlSurfacesConfig extends ConfigElement {
	public StringValue ControlSurfaces;
	public DependentFunctions DependentFunctions;

	public ControlSurfacesConfig() {
		super(10);
	}
}
