
package de.treichels.wea.bat64.gen.sequencers.servos.pairs;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class Pairs
    extends ConfigGroup
{

    @Element(name = "End")
    private ConfigValue<Integer> end;
    @Element(name = "EndValue")
    private ConfigValue<Integer> endValue;
    @Element(name = "Start")
    private ConfigValue<Integer> start;
    @Element(name = "StartValue")
    private ConfigValue<Integer> startValue;

    public ConfigValue<Integer> getEnd() {
        return end;
    }

    public void setEnd(final ConfigValue<Integer> end) {
        this.end = end;
    }

    public ConfigValue<Integer> getEndValue() {
        return endValue;
    }

    public void setEndValue(final ConfigValue<Integer> endValue) {
        this.endValue = endValue;
    }

    public ConfigValue<Integer> getStart() {
        return start;
    }

    public void setStart(final ConfigValue<Integer> start) {
        this.start = start;
    }

    public ConfigValue<Integer> getStartValue() {
        return startValue;
    }

    public void setStartValue(final ConfigValue<Integer> startValue) {
        this.startValue = startValue;
    }

}
