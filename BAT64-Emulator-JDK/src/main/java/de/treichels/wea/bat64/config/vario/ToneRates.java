package de.treichels.wea.bat64.config.vario;

import java.util.List;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.adapters.ListAdapter;
import de.treichels.wea.bat64.config.value.ShortValue;

public class ToneRates extends ConfigList {
	private static class ShortListAdapter extends ListAdapter<ShortValue> {
		protected ShortListAdapter() {
			super(ShortValue.class, "_%02d");
		}
	}

	@XmlAnyElement
	@XmlJavaTypeAdapter(ShortListAdapter.class)
	public List<ShortValue> list;
}
