package de.treichels.wea.bat64.config.curve;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class Curves extends ConfigElement {
	@Element(name = "Curve__00")
	public Curve item0;
	@Element(name = "Curve__01")
	public Curve item1;
	@Element(name = "Curve__02")
	public Curve item2;
	@Element(name = "Curve__03")
	public Curve item3;
	@Element(name = "Curve__04")
	public Curve item4;
	@Element(name = "Curve__05")
	public Curve item5;
	@Element(name = "Curve__06")
	public Curve item6;
	@Element(name = "Curve__07")
	public Curve item7;
	@Element(name = "Curve__08")
	public Curve item8;
	@Element(name = "Curve__09")
	public Curve item9;

	public Curves(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
