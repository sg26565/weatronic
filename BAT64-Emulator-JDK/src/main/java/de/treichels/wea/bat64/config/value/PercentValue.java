package de.treichels.wea.bat64.config.value;

import org.simpleframework.xml.Attribute;

/**
 * -1000 ... 0 ... +1000
 *
 * @author oli
 *
 */
public class PercentValue extends Value<Short> {
	public PercentValue(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
