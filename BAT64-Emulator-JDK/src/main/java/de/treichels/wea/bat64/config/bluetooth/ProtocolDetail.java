package de.treichels.wea.bat64.config.bluetooth;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class ProtocolDetail extends ConfigElement {
	@Element
	public SkyNavigator SkyNavigator;

	public ProtocolDetail(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
