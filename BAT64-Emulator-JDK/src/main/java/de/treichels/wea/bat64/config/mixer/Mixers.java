package de.treichels.wea.bat64.config.mixer;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.config.ConfigGroup;

public class Mixers extends ConfigGroup {
	@XmlElement(name = "Mixer__00")
	public Mixer item0;
	@XmlElement(name = "Mixer__01")
	public Mixer item1;
	@XmlElement(name = "Mixer__02")
	public Mixer item2;
	@XmlElement(name = "Mixer__03")
	public Mixer item3;
	@XmlElement(name = "Mixer__04")
	public Mixer item4;
	@XmlElement(name = "Mixer__05")
	public Mixer item5;
	@XmlElement(name = "Mixer__06")
	public Mixer item6;
	@XmlElement(name = "Mixer__07")
	public Mixer item7;
	@XmlElement(name = "Mixer__08")
	public Mixer item8;
	@XmlElement(name = "Mixer__09")
	public Mixer item9;
}
