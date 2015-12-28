package de.treichels.wea.bat64.model.modelconfig;

import de.treichels.wea.bat64.model.Group;
import de.treichels.wea.bat64.model.value.ByteValue;
import de.treichels.wea.bat64.model.value.ShortValue;

public class ModelTypeDependent extends Group {
	public ShortValue Elevator;
	public ShortValue Rudder;
	public ByteValue TailType;
	public ShortValue Wing;
}
