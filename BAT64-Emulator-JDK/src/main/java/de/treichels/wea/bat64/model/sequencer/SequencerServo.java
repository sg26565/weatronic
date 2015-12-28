package de.treichels.wea.bat64.model.sequencer;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.value.IntValue;

public class SequencerServo extends ConfigElement {
	public IntValue Flags;

	public SequencerServo() {
		super(41);
	}
}
