package de.treichels.wea.bat64.config.limiter;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ShortValue;
import de.treichels.wea.bat64.config.value.StringValue;

public class Limiter extends ConfigElement {
	public Aboves Aboves;
	public Belows Belows;
	public ShortValue ControlAbove;
	public ShortValue ControlBelow;
	public ShortValue FuncIdx;
	public StringValue Name;

	public Limiter() {
		super(27);
	}
}
