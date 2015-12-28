package de.treichels.wea.bat64.model.receiver;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.value.ByteValue;
import de.treichels.wea.bat64.model.value.ShortValue;

public class BindingConfig extends ConfigElement {
	public ShortValue ConnectionID;
	public ByteValue RadioBand;
	public Receivers Rxs;

	public BindingConfig() {
		super(7);
	}
}
