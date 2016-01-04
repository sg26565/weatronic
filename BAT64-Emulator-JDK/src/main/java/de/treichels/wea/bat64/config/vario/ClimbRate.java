package de.treichels.wea.bat64.config.vario;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.PercentValue;
import de.treichels.wea.bat64.config.value.ShortValue;

public class ClimbRate extends ConfigElement {
	@Element
	public ShortValue Frequency;
	@Element
	public PercentValue Rate;

	public ClimbRate(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
