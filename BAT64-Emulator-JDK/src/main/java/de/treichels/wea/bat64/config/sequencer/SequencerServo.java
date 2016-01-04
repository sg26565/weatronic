package de.treichels.wea.bat64.config.sequencer;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.IntValue;

public class SequencerServo extends ConfigElement {
	public IntValue Flags;

	public SequencerServo(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
