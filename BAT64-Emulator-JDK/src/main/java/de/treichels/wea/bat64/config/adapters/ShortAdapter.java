package de.treichels.wea.bat64.config.adapters;

import javax.xml.bind.annotation.adapters.XmlAdapter;

import de.treichels.wea.bat64.config.value.ShortValue;

public class ShortAdapter extends XmlAdapter<ShortValue, Integer> {
	@Override
	public ShortValue marshal(final Integer v) throws Exception {
		final ShortValue result = new ShortValue();
		result.value = v;
		return result;
	}

	@Override
	public Integer unmarshal(final ShortValue v) throws Exception {
		return v.value;
	}
}