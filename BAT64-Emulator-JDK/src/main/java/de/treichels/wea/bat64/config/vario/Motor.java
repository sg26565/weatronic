package de.treichels.wea.bat64.config.vario;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.config.Group;
import de.treichels.wea.bat64.config.List;

public class Motor extends Group {
	public String Input;
	@XmlElement(type = List.class)
	public List<String> Item;
	@XmlElement(type = List.class)
	public List<String> LogFrequency;
	public Short SensorType;
}
