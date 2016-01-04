package de.treichels.wea.bat64.config.bluetooth;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.StringValue;

public class SkyNavigator extends ConfigElement {
	@Element
	public StringValue Functions;

	public SkyNavigator(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
