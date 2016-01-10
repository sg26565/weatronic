package de.treichels.wea.bat64.config.sequencer;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.value.IntValue;
import de.treichels.wea.bat64.config.value.StringValue;
import de.treichels.wea.bat64.config.value.TravelValue;

public class Sequencer extends ConfigElement {
	public TravelValue DelayDown;
	public TravelValue DelayUp;
	public FailSafe Failsafe;
	public IntValue Flags;
	public StringValue Name;
	public ConfigList Servos;

	public Sequencer() {
		super(40);
	}
}
