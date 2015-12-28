package de.treichels.wea.bat64.config.function;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ShortValue;

public class Servo extends ConfigElement {
	public ShortValue ServoIdx;
	public ShortValue ServoMixerIdx;

	public Servo() {
		super(18);
	}
}
