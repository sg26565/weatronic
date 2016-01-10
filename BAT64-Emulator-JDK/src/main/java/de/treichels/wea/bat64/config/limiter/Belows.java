package de.treichels.wea.bat64.config.limiter;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.function.FlexConfig;

public class Belows extends ConfigGroup {
	@XmlElement(name = "Below__00")
	public FlexConfig item0;
}
