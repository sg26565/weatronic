package de.treichels.wea.bat64.config.controlsurfaces;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ShortValue;
import de.treichels.wea.bat64.config.value.StringValue;

public class ControlSurface extends ConfigElement {
	@Element
	public ShortValue ServoGroup;
	@Element
	public StringValue Servos;

	public ControlSurface(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
