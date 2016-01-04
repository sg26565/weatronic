package de.treichels.wea.bat64.config.receiver;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.ShortValue;

public class BindingConfig extends ConfigElement {
	@Element
	public ShortValue ConnectionID;
	@Element
	public ByteValue RadioBand;
	@Element
	public Receivers Rxs;

	public BindingConfig(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
