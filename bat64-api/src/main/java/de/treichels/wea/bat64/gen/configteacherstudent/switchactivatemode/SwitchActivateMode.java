
package de.treichels.wea.bat64.gen.configteacherstudent.switchactivatemode;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class SwitchActivateMode
    extends ConfigElement
{

    @Element(name = "Control")
    private ConfigValue<Integer> control;
    @Element(name = "Trigger")
    private ConfigValue<Integer> trigger;

    public ConfigValue<Integer> getControl() {
        return control;
    }

    public void setControl(final ConfigValue<Integer> control) {
        this.control = control;
    }

    public ConfigValue<Integer> getTrigger() {
        return trigger;
    }

    public void setTrigger(final ConfigValue<Integer> trigger) {
        this.trigger = trigger;
    }

}
