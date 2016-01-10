package de.treichels.wea.bat64.config.receiver;

import javax.xml.bind.annotation.XmlRootElement;

import de.treichels.wea.bat64.config.ConfigGroup;

@XmlRootElement
public class Receiver extends ConfigGroup {
	public Integer DeviceType;
	public Integer FWVersion;
	public Long Serial;
}
