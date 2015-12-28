package de.treichels.wea.bat64.model.value;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlValue;

public class LongValue {
	@XmlAttribute
	public final int typeinfo = 55;

	@XmlValue
	public long value;
}
