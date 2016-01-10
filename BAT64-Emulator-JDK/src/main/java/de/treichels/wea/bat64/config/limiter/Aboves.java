package de.treichels.wea.bat64.config.limiter;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.function.FlexConfig;

public class Aboves extends ConfigGroup {
	@XmlElement(name = "Above__00")
	public FlexConfig item0;
}
