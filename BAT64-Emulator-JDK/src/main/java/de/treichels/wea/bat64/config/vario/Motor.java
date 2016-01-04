package de.treichels.wea.bat64.config.vario;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.StringValue;

public class Motor extends ConfigElement {
	@Element
	public StringValue Input;
	@Element
	public ConfigList<StringValue> Item;
	@Element
	public ConfigList<StringValue> LogFrequency;
	@Element
	public ByteValue SensorType;

	public Motor(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
