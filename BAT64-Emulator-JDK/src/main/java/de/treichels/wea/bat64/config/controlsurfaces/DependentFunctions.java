package de.treichels.wea.bat64.config.controlsurfaces;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class DependentFunctions extends ConfigElement {
	@Element(name = "DependentFunction__00")
	public DependentFunction item0;
	@Element(name = "DependentFunction__01")
	public DependentFunction item1;
	@Element(name = "DependentFunction__02")
	public DependentFunction item2;
	@Element(name = "DependentFunction__03")
	public DependentFunction item3;
	@Element(name = "DependentFunction__04")
	public DependentFunction item4;
	@Element(name = "DependentFunction__05")
	public DependentFunction item5;
	@Element(name = "DependentFunction__06")
	public DependentFunction item6;
	@Element(name = "DependentFunction__07")
	public DependentFunction item7;
	@Element(name = "DependentFunction__08")
	public DependentFunction item8;
	@Element(name = "DependentFunction__09")
	public DependentFunction item9;

	public DependentFunctions(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
