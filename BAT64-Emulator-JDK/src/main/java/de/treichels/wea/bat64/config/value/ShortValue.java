package de.treichels.wea.bat64.config.value;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlValue;

public class ShortValue {
	@XmlAttribute
	public final int typeinfo = 53;

	@XmlValue
	public int value;
}
