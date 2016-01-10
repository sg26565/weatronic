package de.treichels.wea.bat64.config.vario;

import java.util.List;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.adapters.ListAdapter;

public class ClimbRates extends ConfigList {
	private static class ClimbRateListAdapter extends ListAdapter<ClimbRate> {
		protected ClimbRateListAdapter() {
			super(ClimbRate.class, "_%02d");
		}
	}

	@XmlAnyElement
	@XmlJavaTypeAdapter(ClimbRateListAdapter.class)
	public List<ClimbRate> list;
}
