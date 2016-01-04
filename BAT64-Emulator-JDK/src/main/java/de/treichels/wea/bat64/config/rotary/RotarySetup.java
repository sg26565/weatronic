package de.treichels.wea.bat64.config.rotary;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class RotarySetup extends ConfigElement {
	@Element(name = "RotarySetupSingle__512")
	public RotarySetupSingle item512;
	@Element(name = "RotarySetupSingle__513")
	public RotarySetupSingle item513;
	@Element(name = "RotarySetupSingle__514")
	public RotarySetupSingle item514;
	@Element(name = "RotarySetupSingle__527")
	public RotarySetupSingle item527;
	@Element(name = "RotarySetupSingle__528")
	public RotarySetupSingle item528;
	@Element(name = "RotarySetupSingle__529")
	public RotarySetupSingle item529;
	@Element(name = "RotarySetupSingle__752")
	public RotarySetupSingle item752;
	@Element(name = "RotarySetupSingle__753")
	public RotarySetupSingle item753;
	@Element(name = "RotarySetupSingle__754")
	public RotarySetupSingle item754;
	@Element(name = "RotarySetupSingle__767")
	public RotarySetupSingle item767;

	public RotarySetup(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
