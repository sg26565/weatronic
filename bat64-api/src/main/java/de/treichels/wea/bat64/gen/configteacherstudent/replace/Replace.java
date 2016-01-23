
package de.treichels.wea.bat64.gen.configteacherstudent.replace;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class Replace
    extends ConfigGroup
{

    @Element(name = "Control")
    private ConfigList<ConfigValue<Integer>> control;
    @Element(name = "MaskIsInverted")
    private ConfigValue<Integer> maskIsInverted;

    public ConfigList<ConfigValue<Integer>> getControl() {
        return control;
    }

    public void setControl(final ConfigList<ConfigValue<Integer>> control) {
        this.control = control;
    }

    public ConfigValue<Integer> getMaskIsInverted() {
        return maskIsInverted;
    }

    public void setMaskIsInverted(final ConfigValue<Integer> maskIsInverted) {
        this.maskIsInverted = maskIsInverted;
    }

}
