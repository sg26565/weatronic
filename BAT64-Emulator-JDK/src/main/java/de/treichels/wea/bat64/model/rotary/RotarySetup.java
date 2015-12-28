package de.treichels.wea.bat64.model.rotary;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.model.ConfigElement;

public class RotarySetup extends ConfigElement {
	@XmlElement(name = "RotarySetupSingle__512")
	public RotarySetupSingle item512;
	@XmlElement(name = "RotarySetupSingle__513")
	public RotarySetupSingle item513;
	@XmlElement(name = "RotarySetupSingle__514")
	public RotarySetupSingle item514;
	@XmlElement(name = "RotarySetupSingle__527")
	public RotarySetupSingle item527;
	@XmlElement(name = "RotarySetupSingle__528")
	public RotarySetupSingle item528;
	@XmlElement(name = "RotarySetupSingle__529")
	public RotarySetupSingle item529;
	@XmlElement(name = "RotarySetupSingle__752")
	public RotarySetupSingle item752;
	@XmlElement(name = "RotarySetupSingle__753")
	public RotarySetupSingle item753;
	@XmlElement(name = "RotarySetupSingle__754")
	public RotarySetupSingle item754;
	@XmlElement(name = "RotarySetupSingle__767")
	public RotarySetupSingle item767;

	public RotarySetup() {
		super(35);
	}
}
