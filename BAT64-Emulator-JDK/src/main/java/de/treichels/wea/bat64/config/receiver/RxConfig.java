package de.treichels.wea.bat64.config.receiver;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.IntValue;
import de.treichels.wea.bat64.config.value.ShortValue;
import de.treichels.wea.bat64.config.value.TravelValue;

public class RxConfig extends ConfigElement {
	public ByteValue AutoPowerOff;
	public TravelValue BackChannelWarning;
	public TravelValue BattWarning__0;
	public TravelValue BattWarning__1;
	public TravelValue BatteryTestVoltage__0;
	public TravelValue BatteryTestVoltage__1;
	public TravelValue FailSafeTimeout;
	public IntValue Flags;
	public ByteValue IsServopulseSynchron;
	public ByteValue IsSumSignalOffWhileFS;
	public TravelValue RangeWarning;
	public ShortValue Role;
	public ByteValue SumSignalOutput;
	public TravelValue TemperatureWarning;
	public ShortValue Type;

	public RxConfig() {
		super(36);
	}
}
