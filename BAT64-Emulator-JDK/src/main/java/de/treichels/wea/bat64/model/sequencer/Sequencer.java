package de.treichels.wea.bat64.model.sequencer;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.List;
import de.treichels.wea.bat64.model.value.IntValue;
import de.treichels.wea.bat64.model.value.StringValue;
import de.treichels.wea.bat64.model.value.TravelValue;

public class Sequencer extends ConfigElement {
	public TravelValue DelayDown;
	public TravelValue DelayUp;
	public FailSafe Failsafe;
	public IntValue Flags;
	public StringValue Name;
	public List<SequencerServo> Servos;

	public Sequencer() {
		super(40);
	}
}
