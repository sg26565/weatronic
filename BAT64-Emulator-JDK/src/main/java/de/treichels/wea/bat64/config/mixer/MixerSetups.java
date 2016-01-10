package de.treichels.wea.bat64.config.mixer;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.config.ConfigGroup;

public class MixerSetups extends ConfigGroup {
	@XmlElement(name = "Setup__00")
	public MixerSetup item0;
	@XmlElement(name = "Setup__01")
	public MixerSetup item1;
	@XmlElement(name = "Setup__02")
	public MixerSetup item2;
	@XmlElement(name = "Setup__03")
	public MixerSetup item3;
	@XmlElement(name = "Setup__04")
	public MixerSetup item4;
	@XmlElement(name = "Setup__05")
	public MixerSetup item5;
	@XmlElement(name = "Setup__06")
	public MixerSetup item6;
	@XmlElement(name = "Setup__07")
	public MixerSetup item7;
	@XmlElement(name = "Setup__08")
	public MixerSetup item8;
	@XmlElement(name = "Setup__09")
	public MixerSetup item9;
}
