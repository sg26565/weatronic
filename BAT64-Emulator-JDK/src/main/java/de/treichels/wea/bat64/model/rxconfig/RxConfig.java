package de.treichels.wea.bat64.model.rxconfig;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.value.ByteValue;
import de.treichels.wea.bat64.model.value.IntValue;
import de.treichels.wea.bat64.model.value.ShortValue;
import de.treichels.wea.bat64.model.value.TravelValue;

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
