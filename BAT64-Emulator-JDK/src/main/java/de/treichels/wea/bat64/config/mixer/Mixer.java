package de.treichels.wea.bat64.config.mixer;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.IntValue;
import de.treichels.wea.bat64.config.value.ShortValue;
import de.treichels.wea.bat64.config.value.StringValue;

public class Mixer extends ConfigElement {
	public ShortValue Control;
	public IntValue Flags;
	public ShortValue FromFunction;
	public ShortValue GlobalCurveIdx;
	public ByteValue InheritForNext;
	public StringValue Name;
	public MixerSetups Setups;
	public ShortValue ToFunction;
	public ByteValue Trim;

	public Mixer(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
