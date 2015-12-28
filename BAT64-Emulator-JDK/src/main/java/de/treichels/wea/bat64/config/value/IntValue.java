package de.treichels.wea.bat64.config.value;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlValue;

public class IntValue {
	@XmlAttribute
	public final int typeinfo = 54;

	@XmlValue
	public int value;
}
