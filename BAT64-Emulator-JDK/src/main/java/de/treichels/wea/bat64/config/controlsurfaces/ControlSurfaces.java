package de.treichels.wea.bat64.config.controlsurfaces;

import java.util.List;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.adapters.ListAdapter;

public class ControlSurfaces extends ConfigGroup {
	private static class ControlSurfaceListAdapter extends ListAdapter<ControlSurface> {
		protected ControlSurfaceListAdapter() {
			super(ControlSurface.class, "ControlSurface__%02d");
		}
	}

	@XmlAnyElement
	@XmlJavaTypeAdapter(ControlSurfaceListAdapter.class)
	public List<ControlSurface> list;
}
