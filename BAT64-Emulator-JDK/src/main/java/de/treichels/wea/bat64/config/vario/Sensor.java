package de.treichels.wea.bat64.config.vario;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.StringValue;

public class Sensor extends ConfigElement {
	@Element
	public ByteValue Input;
	@Element
	public StringValue Item;
	@Element
	public ByteValue LogFrequency;
	@Element
	public ByteValue SensorType;

	public Sensor(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
