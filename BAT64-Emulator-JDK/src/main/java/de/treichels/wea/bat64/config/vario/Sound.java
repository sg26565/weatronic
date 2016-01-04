package de.treichels.wea.bat64.config.vario;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.value.ShortValue;

public class Sound extends ConfigElement {
	@Element
	public ConfigList<ClimbRate> ClimbRates;
	@Element
	public ConfigList<ShortValue> ToneRates;

	public Sound(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
