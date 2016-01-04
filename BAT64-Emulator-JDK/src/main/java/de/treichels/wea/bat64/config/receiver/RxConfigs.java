package de.treichels.wea.bat64.config.receiver;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class RxConfigs extends ConfigElement {
	@Element(name = "RxConfig__00")
	public RxConfig main;
	@Element(name = "RxConfig__01")
	public RxConfig sub1;
	@Element(name = "RxConfig__02")
	public RxConfig sub2;

	public RxConfigs(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
