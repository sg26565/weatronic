
package de.treichels.wea.bat64.gen.servosyncgroups;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class ServoSyncGroup
    extends ConfigElement
{

    @Element(name = "Accuracy")
    private ConfigValue<Integer> accuracy;
    @Element(name = "Group")
    private ConfigValue<Integer> group;
    @Element(name = "MaxCurrent")
    private ConfigValue<Integer> maxCurrent;
    @Element(name = "Mode")
    private ConfigValue<Integer> mode;
    @Element(name = "TravelLimit")
    private ConfigValue<Integer> travelLimit;

    public ConfigValue<Integer> getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(final ConfigValue<Integer> accuracy) {
        this.accuracy = accuracy;
    }

    public ConfigValue<Integer> getGroup() {
        return group;
    }

    public void setGroup(final ConfigValue<Integer> group) {
        this.group = group;
    }

    public ConfigValue<Integer> getMaxCurrent() {
        return maxCurrent;
    }

    public void setMaxCurrent(final ConfigValue<Integer> maxCurrent) {
        this.maxCurrent = maxCurrent;
    }

    public ConfigValue<Integer> getMode() {
        return mode;
    }

    public void setMode(final ConfigValue<Integer> mode) {
        this.mode = mode;
    }

    public ConfigValue<Integer> getTravelLimit() {
        return travelLimit;
    }

    public void setTravelLimit(final ConfigValue<Integer> travelLimit) {
        this.travelLimit = travelLimit;
    }

}
