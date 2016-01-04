package de.treichels.wea.bat64.config.function;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class Servos extends ConfigElement {
	@Element(name = "Servo__00")
	public Servo item0;
	@Element(name = "Servo__01")
	public Servo item1;
	@Element(name = "Servo__02")
	public Servo item2;
	@Element(name = "Servo__03")
	public Servo item3;
	@Element(name = "Servo__04")
	public Servo item4;
	@Element(name = "Servo__05")
	public Servo item5;
	@Element(name = "Servo__06")
	public Servo item6;
	@Element(name = "Servo__07")
	public Servo item7;
	@Element(name = "Servo__08")
	public Servo item8;
	@Element(name = "Servo__09")
	public Servo item9;

	public Servos(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
