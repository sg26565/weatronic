
package de.treichels.wea.bat64.gen.functions.failsafepos;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class FailSafePos
    extends ConfigGroup
{

    @Element(name = "Mode")
    private ConfigValue<Integer> mode;
    @Element(name = "Value")
    private ConfigValue<Integer> value;

    public ConfigValue<Integer> getMode() {
        return mode;
    }

    public void setMode(final ConfigValue<Integer> mode) {
        this.mode = mode;
    }

    public ConfigValue<Integer> getValue() {
        return value;
    }

    public void setValue(final ConfigValue<Integer> value) {
        this.value = value;
    }

}
