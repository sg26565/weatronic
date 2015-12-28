package de.treichels.wea.bat64.config.function;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.IntValue;
import de.treichels.wea.bat64.config.value.ShortValue;
import de.treichels.wea.bat64.config.value.StringValue;

public class Function extends ConfigElement {
	public ShortValue Control;
	public ShortValue ControlDifferential;
	public ShortValue ControlExpo;
	public ShortValue ControlRate;
	public FailSafePos FailSafePos;
	public IntValue Flags;
	public ShortValue GlobalCurveIdx;
	public ShortValue GyroIdx;
	public ShortValue ID;
	public StringValue Name;
	public Servos Servos;
	public FunctionSetups Setups;
	public Trim Trim;

	public Function() {
		super(17);
	}
}
