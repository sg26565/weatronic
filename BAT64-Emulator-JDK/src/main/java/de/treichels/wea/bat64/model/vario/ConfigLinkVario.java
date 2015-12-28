package de.treichels.wea.bat64.model.vario;

import de.treichels.wea.bat64.model.ConfigElement;

public class ConfigLinkVario extends ConfigElement {
	public Sensors Sensors;
	public Sound Sound;

	public ConfigLinkVario() {
		super(72);
	}
}
