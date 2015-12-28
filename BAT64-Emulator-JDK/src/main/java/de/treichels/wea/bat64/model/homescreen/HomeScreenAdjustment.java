package de.treichels.wea.bat64.model.homescreen;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.List;
import de.treichels.wea.bat64.model.value.ByteValue;

public class HomeScreenAdjustment extends ConfigElement {
	public List<TeleMetryId> TelemetryIds;
	public ByteValue Template;

	public HomeScreenAdjustment() {
		super(48);
	}
}
