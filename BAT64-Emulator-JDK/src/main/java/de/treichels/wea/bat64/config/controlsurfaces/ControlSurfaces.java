package de.treichels.wea.bat64.config.controlsurfaces;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Root;

import de.treichels.wea.bat64.config.NamedConfigList;

@Root
public class ControlSurfaces extends NamedConfigList<ControlSurface> {
	public ControlSurfaces(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo, "ControlSurface");
	}
}
