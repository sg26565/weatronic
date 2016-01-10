package de.treichels.wea.bat64.config.model;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.ShortValue;

public class ModelTypeDependent extends ConfigGroup {
	public ShortValue Elevator;
	public ShortValue Rudder;
	public ByteValue TailType;
	public ShortValue Wing;
}
