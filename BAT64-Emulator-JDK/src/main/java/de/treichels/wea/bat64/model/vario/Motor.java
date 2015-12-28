package de.treichels.wea.bat64.model.vario;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.model.Group;
import de.treichels.wea.bat64.model.List;
import de.treichels.wea.bat64.model.value.ByteValue;
import de.treichels.wea.bat64.model.value.StringValue;

public class Motor extends Group {
	public StringValue Input;
	@XmlElement(type = List.class)
	public List<StringValue> Item;
	public List<StringValue> LogFrequency;
	public ByteValue SensorType;
}
