package de.treichels.wea.bat64.config.homescreen;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.IntValue;

public class TeleMetryId extends ConfigElement {
	public ByteValue Gategory;
	public IntValue Index;
	public ByteValue Pos;

	public TeleMetryId(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
