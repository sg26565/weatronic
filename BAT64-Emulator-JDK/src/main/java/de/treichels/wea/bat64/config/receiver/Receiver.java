package de.treichels.wea.bat64.config.receiver;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.LongValue;
import de.treichels.wea.bat64.config.value.ShortValue;

public class Receiver extends ConfigElement {
	@Element
	public ShortValue DeviceType;
	@Element
	public ShortValue FWVersion;
	@Element
	public LongValue Serial;

	public Receiver(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
