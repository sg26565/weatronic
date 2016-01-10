package de.treichels.wea.bat64.config.vario;

import de.treichels.wea.bat64.config.ConfigElement;

public class ConfigLinkVario extends ConfigElement {
	public SensorGroup Sensors;
	public Sound Sound;

	public ConfigLinkVario() {
		super(72);
	}
}
