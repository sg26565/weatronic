package de.treichels.wea.bat64.config.controlsurfaces;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ShortValue;

public class DependentFunction extends ConfigElement {
	public ShortValue Index;
	public ShortValue UsedSurfaces;

	public DependentFunction(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
