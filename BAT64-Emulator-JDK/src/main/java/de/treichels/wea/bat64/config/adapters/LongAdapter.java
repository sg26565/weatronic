package de.treichels.wea.bat64.config.adapters;

import javax.xml.bind.annotation.adapters.XmlAdapter;

import de.treichels.wea.bat64.config.value.LongValue;

public class LongAdapter extends XmlAdapter<LongValue, Long> {
	@Override
	public LongValue marshal(final Long v) throws Exception {
		final LongValue result = new LongValue();
		result.value = v;
		return result;
	}

	@Override
	public Long unmarshal(final LongValue v) throws Exception {
		return v.value;
	}
}