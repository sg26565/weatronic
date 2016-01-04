package de.treichels.wea.bat64.config.flightmode;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class ControlSwitches extends ConfigElement {
	@Element(name = "ControlSwitch__00")
	public ControlSwitch item0;
	@Element(name = "ControlSwitch__01")
	public ControlSwitch item1;
	@Element(name = "ControlSwitch__02")
	public ControlSwitch item2;
	@Element(name = "ControlSwitch__03")
	public ControlSwitch item3;
	@Element(name = "ControlSwitch__04")
	public ControlSwitch item4;
	@Element(name = "ControlSwitch__05")
	public ControlSwitch item5;
	@Element(name = "ControlSwitch__06")
	public ControlSwitch item6;
	@Element(name = "ControlSwitch__07")
	public ControlSwitch item7;
	@Element(name = "ControlSwitch__08")
	public ControlSwitch item8;
	@Element(name = "ControlSwitch__09")
	public ControlSwitch item9;

	public ControlSwitches(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
