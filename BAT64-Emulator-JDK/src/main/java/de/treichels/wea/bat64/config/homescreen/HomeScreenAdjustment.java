package de.treichels.wea.bat64.config.homescreen;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.value.ByteValue;

public class HomeScreenAdjustment extends ConfigElement {
	public ConfigList<TeleMetryId> TelemetryIds;
	public ByteValue Template;

	public HomeScreenAdjustment(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
