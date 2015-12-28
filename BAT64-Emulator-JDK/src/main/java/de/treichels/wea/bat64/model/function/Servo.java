package de.treichels.wea.bat64.model.function;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.value.ShortValue;

public class Servo extends ConfigElement {
	public ShortValue ServoIdx;
	public ShortValue ServoMixerIdx;

	public Servo() {
		super(18);
	}
}
