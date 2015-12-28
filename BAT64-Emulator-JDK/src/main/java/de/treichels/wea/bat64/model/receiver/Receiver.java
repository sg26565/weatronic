package de.treichels.wea.bat64.model.receiver;

import de.treichels.wea.bat64.model.Group;
import de.treichels.wea.bat64.model.value.LongValue;
import de.treichels.wea.bat64.model.value.ShortValue;

public class Receiver extends Group {
	public ShortValue DeviceType;
	public ShortValue FWVersion;
	public LongValue Serial;
}
