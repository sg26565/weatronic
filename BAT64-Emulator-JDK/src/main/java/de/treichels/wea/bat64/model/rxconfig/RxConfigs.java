package de.treichels.wea.bat64.model.rxconfig;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.model.Group;

public class RxConfigs extends Group {
	@XmlElement(name = "RxConfig__00")
	public RxConfig main;
	@XmlElement(name = "RxConfig__01")
	public RxConfig sub1;
	@XmlElement(name = "RxConfig__02")
	public RxConfig sub2;
}
