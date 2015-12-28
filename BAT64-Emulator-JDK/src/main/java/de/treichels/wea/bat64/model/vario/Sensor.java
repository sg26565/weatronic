package de.treichels.wea.bat64.model.vario;

import de.treichels.wea.bat64.model.Group;
import de.treichels.wea.bat64.model.value.ByteValue;
import de.treichels.wea.bat64.model.value.StringValue;

public class Sensor extends Group {
	public ByteValue Input;
	public StringValue Item;
	public ByteValue LogFrequency;
	public ByteValue SensorType;
}
