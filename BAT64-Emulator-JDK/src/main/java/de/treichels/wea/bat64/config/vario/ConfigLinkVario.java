package de.treichels.wea.bat64.config.vario;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class ConfigLinkVario extends ConfigElement {
	@Element
	public Sensors Sensors;
	@Element
	public Sound Sound;

	public ConfigLinkVario(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
