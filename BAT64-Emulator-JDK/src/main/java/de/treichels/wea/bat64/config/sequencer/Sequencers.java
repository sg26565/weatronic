package de.treichels.wea.bat64.config.sequencer;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class Sequencers extends ConfigElement {
	@Element(name = "Sequencer__00")
	public Sequencer item0;
	@Element(name = "Sequencer__01")
	public Sequencer item1;
	@Element(name = "Sequencer__02")
	public Sequencer item2;
	@Element(name = "Sequencer__03")
	public Sequencer item3;
	@Element(name = "Sequencer__04")
	public Sequencer item4;
	@Element(name = "Sequencer__05")
	public Sequencer item5;
	@Element(name = "Sequencer__06")
	public Sequencer item6;
	@Element(name = "Sequencer__07")
	public Sequencer item7;
	@Element(name = "Sequencer__08")
	public Sequencer item8;
	@Element(name = "Sequencer__09")
	public Sequencer item9;

	public Sequencers(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}

}
