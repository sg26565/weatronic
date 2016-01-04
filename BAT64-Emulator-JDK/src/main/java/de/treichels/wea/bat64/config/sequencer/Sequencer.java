package de.treichels.wea.bat64.config.sequencer;

import org.simpleframework.xml.Attribute;

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
	public ConfigList<SequencerServo> Servos;

	public Sequencer(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
