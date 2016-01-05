package de.treichels.wea.bat64.config.value;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlValue;

/**
 * -2047 ... 0 ... 2047
 *
 * @author oli
 */
public class TravelValue {
	@XmlAttribute
	public final int typeinfo = 45;

	@XmlValue
	public short value;

}
