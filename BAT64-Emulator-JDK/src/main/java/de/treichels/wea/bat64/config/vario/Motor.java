package de.treichels.wea.bat64.config.vario;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.config.Group;
import de.treichels.wea.bat64.config.List;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.StringValue;

public class Motor extends Group {
	public StringValue Input;
	@XmlElement(type = List.class)
	public List<StringValue> Item;
	public List<StringValue> LogFrequency;
	public ByteValue SensorType;
}
