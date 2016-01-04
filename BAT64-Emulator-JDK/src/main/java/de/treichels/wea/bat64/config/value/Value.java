package de.treichels.wea.bat64.config.value;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Text;

import de.treichels.wea.bat64.config.ConfigElement;

public abstract class Value<T> extends ConfigElement {
	@Text(required = false)
	public String value;

	public Value(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
