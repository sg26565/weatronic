package de.treichels.wea.bat64.config.limiter;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.function.FlexConfig;

public class Aboves extends ConfigElement {
	@Element(name = "Above__00")
	public FlexConfig item0;

	public Aboves(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
