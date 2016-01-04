package de.treichels.wea.bat64.config.mixer;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class Mixers extends ConfigElement {
	@Element(name = "Mixer__00")
	public Mixer item0;
	@Element(name = "Mixer__01")
	public Mixer item1;
	@Element(name = "Mixer__02")
	public Mixer item2;
	@Element(name = "Mixer__03")
	public Mixer item3;
	@Element(name = "Mixer__04")
	public Mixer item4;
	@Element(name = "Mixer__05")
	public Mixer item5;
	@Element(name = "Mixer__06")
	public Mixer item6;
	@Element(name = "Mixer__07")
	public Mixer item7;
	@Element(name = "Mixer__08")
	public Mixer item8;
	@Element(name = "Mixer__09")
	public Mixer item9;

	public Mixers(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
