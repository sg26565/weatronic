package de.treichels.wea.bat64.model.value;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlValue;

public class ByteValue {
	@XmlAttribute
	public final int typeinfo = 52;

	@XmlValue
	public int value;
}
