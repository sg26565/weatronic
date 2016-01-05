package de.treichels.wea.bat64.config.adapters;

import javax.xml.bind.annotation.adapters.XmlAdapter;

import de.treichels.wea.bat64.config.value.StringValue;

public class StringAdaper extends XmlAdapter<StringValue, String> {
	@Override
	public StringValue marshal(final String v) throws Exception {
		final StringValue result = new StringValue();
		result.value = v;
		return result;
	}

	@Override
	public String unmarshal(final StringValue v) throws Exception {
		return v.value;
	}
}
