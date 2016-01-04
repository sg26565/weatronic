package de.treichels.wea.bat64.config.vario;

import de.treichels.wea.bat64.config.Group;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.StringValue;

public class Sensor extends Group {
	public ByteValue Input;
	public StringValue Item;
	public ByteValue LogFrequency;
	public ByteValue SensorType;
}
