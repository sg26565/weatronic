package de.treichels.wea.bat64.config.adapters;

import javax.xml.bind.annotation.adapters.XmlAdapter;

import de.treichels.wea.bat64.config.value.IntValue;

public class IntAdapter extends XmlAdapter<IntValue, Long> {
	@Override
	public IntValue marshal(final Long v) throws Exception {
		final IntValue result = new IntValue();
		result.value = v;
		return result;
	}

	@Override
	public Long unmarshal(final IntValue v) throws Exception {
		return v.value;
	}
}