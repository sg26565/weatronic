package de.treichels.wea.bat64.config.receiver;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.config.ConfigElement;

public class BindingConfig extends ConfigElement {
	public Integer ConnectionID;
	public Short RadioBand;
	@XmlElement(name = "Rxs")
	public Receivers receivers;

	public BindingConfig() {
		super(7);
	}
}
