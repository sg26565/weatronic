package de.treichels.wea.bat64.model.function;

import de.treichels.wea.bat64.model.Group;
import de.treichels.wea.bat64.model.value.ByteValue;
import de.treichels.wea.bat64.model.value.PercentValue;
import de.treichels.wea.bat64.model.value.ShortValue;

public class Trim extends Group {
	public ShortValue Control;
	public ByteValue Mode;
	public PercentValue Range;
	public ByteValue Reverse;
}
