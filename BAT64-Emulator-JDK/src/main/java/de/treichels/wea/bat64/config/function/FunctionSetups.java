package de.treichels.wea.bat64.config.function;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class FunctionSetups extends ConfigElement {
	@Element(name = "Setup__00")
	public FunctionSetup item0;
	@Element(name = "Setup__01")
	public FunctionSetup item1;
	@Element(name = "Setup__02")
	public FunctionSetup item2;
	@Element(name = "Setup__03")
	public FunctionSetup item3;
	@Element(name = "Setup__04")
	public FunctionSetup item4;
	@Element(name = "Setup__05")
	public FunctionSetup item5;
	@Element(name = "Setup__06")
	public FunctionSetup item6;
	@Element(name = "Setup__07")
	public FunctionSetup item7;
	@Element(name = "Setup__08")
	public FunctionSetup item8;
	@Element(name = "Setup__09")
	public FunctionSetup item9;

	public FunctionSetups(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
