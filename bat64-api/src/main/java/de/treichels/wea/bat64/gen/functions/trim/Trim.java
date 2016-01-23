
package de.treichels.wea.bat64.gen.functions.trim;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class Trim
    extends ConfigElement
{

    @Element(name = "Control")
    private ConfigValue<Integer> control;
    @Element(name = "Mode")
    private ConfigValue<Integer> mode;
    @Element(name = "Range")
    private ConfigValue<Integer> range;
    @Element(name = "Reverse")
    private ConfigValue<Integer> reverse;

    public ConfigValue<Integer> getControl() {
        return control;
    }

    public void setControl(final ConfigValue<Integer> control) {
        this.control = control;
    }

    public ConfigValue<Integer> getMode() {
        return mode;
    }

    public void setMode(final ConfigValue<Integer> mode) {
        this.mode = mode;
    }

    public ConfigValue<Integer> getRange() {
        return range;
    }

    public void setRange(final ConfigValue<Integer> range) {
        this.range = range;
    }

    public ConfigValue<Integer> getReverse() {
        return reverse;
    }

    public void setReverse(final ConfigValue<Integer> reverse) {
        this.reverse = reverse;
    }

}
