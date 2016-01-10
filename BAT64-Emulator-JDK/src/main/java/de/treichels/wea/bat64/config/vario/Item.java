package de.treichels.wea.bat64.config.vario;

import java.util.List;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.adapters.ListAdapter;
import de.treichels.wea.bat64.config.value.StringValue;

public class Item extends ConfigList {
	private static class StringListAdapter extends ListAdapter<StringValue> {
		protected StringListAdapter() {
			super(StringValue.class, "_%02d");
		}
	}

	@XmlAnyElement
	@XmlJavaTypeAdapter(StringListAdapter.class)
	public List<StringValue> list;
}
