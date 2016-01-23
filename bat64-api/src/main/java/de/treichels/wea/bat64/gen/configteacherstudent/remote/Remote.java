
package de.treichels.wea.bat64.gen.configteacherstudent.remote;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class Remote
    extends ConfigGroup
{

    @Element(name = "Control")
    private ConfigList<ConfigValue<Integer>> control;

    public ConfigList<ConfigValue<Integer>> getControl() {
        return control;
    }

    public void setControl(final ConfigList<ConfigValue<Integer>> control) {
        this.control = control;
    }

}
