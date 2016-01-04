package de.treichels.wea.bat64.config.flightmode;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class FlightModes extends ConfigElement {
	@Element(name = "FlightMode__00")
	public FlightMode item0;
	@Element(name = "FlightMode__01")
	public FlightMode item1;
	@Element(name = "FlightMode__02")
	public FlightMode item2;
	@Element(name = "FlightMode__03")
	public FlightMode item3;
	@Element(name = "FlightMode__04")
	public FlightMode item4;
	@Element(name = "FlightMode__05")
	public FlightMode item5;
	@Element(name = "FlightMode__06")
	public FlightMode item6;
	@Element(name = "FlightMode__07")
	public FlightMode item7;
	@Element(name = "FlightMode__08")
	public FlightMode item8;
	@Element(name = "FlightMode__09")
	public FlightMode item9;

	public FlightModes(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
