package de.treichels.wea.bat64.config.sequencer;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;

public class FailSafe extends ConfigElement {
	public ByteValue Mode;
	public ByteValue Position;

	public FailSafe(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
