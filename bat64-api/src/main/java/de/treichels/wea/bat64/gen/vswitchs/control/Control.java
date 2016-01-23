
package de.treichels.wea.bat64.gen.vswitchs.control;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class Control
    extends ConfigGroup
{

    @Element(name = "Control")
    private ConfigValue<Integer> control;
    @Element(name = "IsInverted")
    private ConfigValue<Integer> isInverted;
    @Element(name = "Value")
    private ConfigValue<Integer> value;

    public ConfigValue<Integer> getControl() {
        return control;
    }

    public void setControl(final ConfigValue<Integer> control) {
        this.control = control;
    }

    public ConfigValue<Integer> getIsInverted() {
        return isInverted;
    }

    public void setIsInverted(final ConfigValue<Integer> isInverted) {
        this.isInverted = isInverted;
    }

    public ConfigValue<Integer> getValue() {
        return value;
    }

    public void setValue(final ConfigValue<Integer> value) {
        this.value = value;
    }

}
