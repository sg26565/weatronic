package de.treichels.wea.bat64.config.flightmode;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.config.ConfigGroup;

public class ControlSwitches extends ConfigGroup {
	@XmlElement(name = "ControlSwitch__00")
	public ControlSwitch item0;
	@XmlElement(name = "ControlSwitch__01")
	public ControlSwitch item1;
	@XmlElement(name = "ControlSwitch__02")
	public ControlSwitch item2;
	@XmlElement(name = "ControlSwitch__03")
	public ControlSwitch item3;
	@XmlElement(name = "ControlSwitch__04")
	public ControlSwitch item4;
	@XmlElement(name = "ControlSwitch__05")
	public ControlSwitch item5;
	@XmlElement(name = "ControlSwitch__06")
	public ControlSwitch item6;
	@XmlElement(name = "ControlSwitch__07")
	public ControlSwitch item7;
	@XmlElement(name = "ControlSwitch__08")
	public ControlSwitch item8;
	@XmlElement(name = "ControlSwitch__09")
	public ControlSwitch item9;
}
