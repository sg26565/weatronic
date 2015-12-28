package de.treichels.wea.bat64.model.value;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlValue;

public class StringValue {
	@XmlAttribute
	public final int typeinfo = 47;

	@XmlValue
	public String value;
}
