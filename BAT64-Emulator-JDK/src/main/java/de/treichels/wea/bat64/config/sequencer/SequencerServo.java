package de.treichels.wea.bat64.config.sequencer;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.IntValue;

public class SequencerServo extends ConfigElement {
	public IntValue Flags;

	public SequencerServo() {
		super(41);
	}
}
