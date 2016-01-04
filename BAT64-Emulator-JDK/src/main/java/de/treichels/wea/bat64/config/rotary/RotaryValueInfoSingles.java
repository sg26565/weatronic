package de.treichels.wea.bat64.config.rotary;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class RotaryValueInfoSingles extends ConfigElement {
	@Element(name = "RotaryValueInfoSingle__00")
	public RotaryValueInfoSingle item0;
	@Element(name = "RotaryValueInfoSingle__01")
	public RotaryValueInfoSingle item1;
	@Element(name = "RotaryValueInfoSingle__02")
	public RotaryValueInfoSingle item2;
	@Element(name = "RotaryValueInfoSingle__03")
	public RotaryValueInfoSingle item3;
	@Element(name = "RotaryValueInfoSingle__04")
	public RotaryValueInfoSingle item4;
	@Element(name = "RotaryValueInfoSingle__05")
	public RotaryValueInfoSingle item5;
	@Element(name = "RotaryValueInfoSingle__06")
	public RotaryValueInfoSingle item6;
	@Element(name = "RotaryValueInfoSingle__07")
	public RotaryValueInfoSingle item7;
	@Element(name = "RotaryValueInfoSingle__08")
	public RotaryValueInfoSingle item8;
	@Element(name = "RotaryValueInfoSingle__09")
	public RotaryValueInfoSingle item9;

	public RotaryValueInfoSingles(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
