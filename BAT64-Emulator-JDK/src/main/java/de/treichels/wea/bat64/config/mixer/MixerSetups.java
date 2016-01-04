package de.treichels.wea.bat64.config.mixer;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;

public class MixerSetups extends ConfigElement {
	@Element(name = "Setup__00")
	public MixerSetup item0;
	@Element(name = "Setup__01")
	public MixerSetup item1;
	@Element(name = "Setup__02")
	public MixerSetup item2;
	@Element(name = "Setup__03")
	public MixerSetup item3;
	@Element(name = "Setup__04")
	public MixerSetup item4;
	@Element(name = "Setup__05")
	public MixerSetup item5;
	@Element(name = "Setup__06")
	public MixerSetup item6;
	@Element(name = "Setup__07")
	public MixerSetup item7;
	@Element(name = "Setup__08")
	public MixerSetup item8;
	@Element(name = "Setup__09")
	public MixerSetup item9;

	public MixerSetups(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
