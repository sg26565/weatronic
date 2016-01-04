package de.treichels.wea.bat64.config.model;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.ShortValue;

public class ModelTypeDependent extends ConfigElement {
	public ShortValue Elevator;
	public ShortValue Rudder;
	public ByteValue TailType;
	public ShortValue Wing;

	public ModelTypeDependent(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
