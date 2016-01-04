package de.treichels.wea.bat64.config.function;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class Functions extends ConfigElement {
	@Element(name = "Function__00")
	public Function item0;
	@Element(name = "Function__01")
	public Function item1;
	@Element(name = "Function__02")
	public Function item2;
	@Element(name = "Function__03")
	public Function item3;
	@Element(name = "Function__04")
	public Function item4;
	@Element(name = "Function__05")
	public Function item5;
	@Element(name = "Function__06")
	public Function item6;
	@Element(name = "Function__07")
	public Function item7;
	@Element(name = "Function__08")
	public Function item8;
	@Element(name = "Function__09")
	public Function item9;

	public Functions(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
