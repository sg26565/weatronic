package de.treichels.wea.bat64.config.vario;

import java.util.List;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.adapters.ListAdapter;

public class SensorList extends ConfigList {
	private static class SensorListAdapter extends ListAdapter<Sensor> {
		protected SensorListAdapter() {
			super(Sensor.class, "_%02d");
		}
	}

	@XmlAnyElement
	@XmlJavaTypeAdapter(SensorListAdapter.class)
	public List<Sensor> list;
}
