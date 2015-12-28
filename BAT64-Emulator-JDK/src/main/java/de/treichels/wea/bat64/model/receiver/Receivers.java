package de.treichels.wea.bat64.model.receiver;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.model.Group;

public class Receivers extends Group {
	@XmlElement(name = "Rx__00")
	public Receiver main;
	@XmlElement(name = "Rx__01")
	public Receiver sub1;
	@XmlElement(name = "Rx__02")
	public Receiver sub2;
}
