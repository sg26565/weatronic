package de.treichels.wea.bat64.config.homescreen;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.List;
import de.treichels.wea.bat64.config.value.ByteValue;

public class HomeScreenAdjustment extends ConfigElement {
	public List<TeleMetryId> TelemetryIds;
	public ByteValue Template;

	public HomeScreenAdjustment() {
		super(48);
	}
}
