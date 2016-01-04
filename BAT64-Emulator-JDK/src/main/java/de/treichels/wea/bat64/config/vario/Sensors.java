package de.treichels.wea.bat64.config.vario;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;

public class Sensors extends ConfigElement {
	@Element
	public Motor Motor;
	@Element
	public ConfigList<Sensor> Sensor;

	public Sensors(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
