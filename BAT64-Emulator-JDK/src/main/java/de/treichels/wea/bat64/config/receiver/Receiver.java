package de.treichels.wea.bat64.config.receiver;

import javax.xml.bind.annotation.XmlRootElement;

import de.treichels.wea.bat64.config.Group;

@XmlRootElement
public class Receiver extends Group {
	public Integer DeviceType;
	public Integer FWVersion;
	public Long Serial;
}
