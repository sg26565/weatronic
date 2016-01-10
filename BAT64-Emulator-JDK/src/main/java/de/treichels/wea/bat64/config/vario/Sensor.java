package de.treichels.wea.bat64.config.vario;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.StringValue;

public class Sensor extends ConfigGroup {
	public ByteValue Input;
	public StringValue Item;
	public ByteValue LogFrequency;
	public ByteValue SensorType;
}
