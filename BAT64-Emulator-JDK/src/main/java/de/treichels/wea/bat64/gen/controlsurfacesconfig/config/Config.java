
package de.treichels.wea.bat64.gen.controlsurfacesconfig.config;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigGroupList;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.gen.controlsurfacesconfig.config.dependentfunctions.DependentFunction;
import de.treichels.wea.bat64.xml.Element;

public class Config
    extends ConfigElement
{

    @Element(name = "ControlSurfaces")
    private ConfigList<Integer> controlSurfaces;
    @Element(name = "DependentFunctions")
    private ConfigGroupList<DependentFunction> dependentFunctions;

    public ConfigList<Integer> getControlSurfaces() {
        return controlSurfaces;
    }

    public void setControlSurfaces(final ConfigList<Integer> controlSurfaces) {
        this.controlSurfaces = controlSurfaces;
    }

    public ConfigGroupList<DependentFunction> getDependentFunctions() {
        return dependentFunctions;
    }

    public void setDependentFunctions(final ConfigGroupList<DependentFunction> dependentFunctions) {
        this.dependentFunctions = dependentFunctions;
    }

}
