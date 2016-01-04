package de.treichels.wea.bat64.config.receiver;

import de.treichels.wea.bat64.config.Group;
import de.treichels.wea.bat64.config.value.LongValue;
import de.treichels.wea.bat64.config.value.ShortValue;

public class Receiver extends Group {
	public ShortValue DeviceType;
	public ShortValue FWVersion;
	public LongValue Serial;
}
