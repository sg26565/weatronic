package de.treichels.wea.bat64.config.model;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.StringValue;

public class ModelConfig extends ConfigElement {
	public StringValue Category;
	public ByteValue FuncPreselect;
	public StringValue Image;
	public StringValue InfoText;
	public StringValue ModelName;
	public ModelTypeDependent ModelTypeDependent;
	public ByteValue OutputResolution;
	public ByteValue Type;

	public ModelConfig(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
