package de.treichels.wea.bat64.model.limiter;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.model.Group;
import de.treichels.wea.bat64.model.function.FlexConfig;

public class Aboves extends Group {
	@XmlElement(name = "Above__00")
	public FlexConfig item0;
}
