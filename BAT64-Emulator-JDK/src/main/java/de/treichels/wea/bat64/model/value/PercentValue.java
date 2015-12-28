package de.treichels.wea.bat64.model.value;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlValue;

/**
 * -1000 ... 0 ... +1000
 *
 * @author oli
 *
 */
public class PercentValue {
	@XmlAttribute
	public final int typeinfo = 44;

	@XmlValue
	public long value;
}
