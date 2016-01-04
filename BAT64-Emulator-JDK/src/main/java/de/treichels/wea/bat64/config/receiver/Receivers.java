package de.treichels.wea.bat64.config.receiver;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.NamedConfigList;

public class Receivers extends NamedConfigList<Receiver> {
	// TODO
	// @Element(name = "Rx__00")
	// public Receiver main;
	// @Element(name = "Rx__01")
	// public Receiver sub1;
	// @Element(name = "Rx__02")
	// public Receiver sub2;

	public Receivers(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo, "Rx");
	}
}
