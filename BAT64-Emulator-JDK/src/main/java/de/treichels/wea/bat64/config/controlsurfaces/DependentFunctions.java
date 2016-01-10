package de.treichels.wea.bat64.config.controlsurfaces;

import java.util.List;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.adapters.ListAdapter;

public class DependentFunctions extends ConfigGroup {
	private static class DependentFunctionListAdapter extends ListAdapter<DependentFunction> {
		protected DependentFunctionListAdapter() {
			super(DependentFunction.class, "DependentFunction__%02d");
		}
	}

	@XmlAnyElement
	@XmlJavaTypeAdapter(DependentFunctionListAdapter.class)
	public List<DependentFunction> list;
}
