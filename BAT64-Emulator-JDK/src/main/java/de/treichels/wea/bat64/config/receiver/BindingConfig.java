package de.treichels.wea.bat64.config.receiver;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.ShortValue;

public class BindingConfig extends ConfigElement {
	public ShortValue ConnectionID;
	public ByteValue RadioBand;
	public Receivers Rxs;

	public BindingConfig() {
		super(7);
	}
}
