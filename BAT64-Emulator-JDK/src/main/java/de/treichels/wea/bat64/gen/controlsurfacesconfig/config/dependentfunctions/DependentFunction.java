
package de.treichels.wea.bat64.gen.controlsurfacesconfig.config.dependentfunctions;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class DependentFunction
    extends ConfigGroup
{

    @Element(name = "Index")
    private ConfigValue<Integer> index;
    @Element(name = "UsedSurfaces")
    private ConfigValue<Integer> usedSurfaces;

    public ConfigValue<Integer> getIndex() {
        return index;
    }

    public void setIndex(final ConfigValue<Integer> index) {
        this.index = index;
    }

    public ConfigValue<Integer> getUsedSurfaces() {
        return usedSurfaces;
    }

    public void setUsedSurfaces(final ConfigValue<Integer> usedSurfaces) {
        this.usedSurfaces = usedSurfaces;
    }

}
