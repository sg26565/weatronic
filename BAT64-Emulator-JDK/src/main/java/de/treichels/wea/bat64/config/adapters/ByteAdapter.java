package de.treichels.wea.bat64.config.adapters;

import javax.xml.bind.annotation.adapters.XmlAdapter;

import de.treichels.wea.bat64.config.value.ByteValue;

public class ByteAdapter extends XmlAdapter<ByteValue, Short> {
	@Override
	public ByteValue marshal(final Short v) throws Exception {
		final ByteValue result = new ByteValue();
		result.value = v;
		return result;
	}

	@Override
	public Short unmarshal(final ByteValue v) throws Exception {
		return v.value;
	}
}