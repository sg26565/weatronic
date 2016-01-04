package de.treichels.wea.bat64.config.flightmode;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.config.Group;

public class FlightModes extends Group {
	@XmlElement(name = "FlightMode__00")
	public FlightMode item0;
	@XmlElement(name = "FlightMode__01")
	public FlightMode item1;
	@XmlElement(name = "FlightMode__02")
	public FlightMode item2;
	@XmlElement(name = "FlightMode__03")
	public FlightMode item3;
	@XmlElement(name = "FlightMode__04")
	public FlightMode item4;
	@XmlElement(name = "FlightMode__05")
	public FlightMode item5;
	@XmlElement(name = "FlightMode__06")
	public FlightMode item6;
	@XmlElement(name = "FlightMode__07")
	public FlightMode item7;
	@XmlElement(name = "FlightMode__08")
	public FlightMode item8;
	@XmlElement(name = "FlightMode__09")
	public FlightMode item9;
}
