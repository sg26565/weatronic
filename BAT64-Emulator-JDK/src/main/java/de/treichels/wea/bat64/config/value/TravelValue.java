package de.treichels.wea.bat64.config.value;

import org.simpleframework.xml.Attribute;

/**
 * -2047 ... 0 ... 2047
 *
 * @author oli
 */
public class TravelValue extends Value<Short> {
	public TravelValue(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
