
package de.treichels.wea.bat64.gen.modelconfig.modeltypedependent;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class ModelTypeDependent
    extends ConfigGroup
{

    @Element(name = "Elevator")
    private ConfigValue<Integer> elevator;
    @Element(name = "Rudder")
    private ConfigValue<Integer> rudder;
    @Element(name = "TailType")
    private ConfigValue<Integer> tailType;
    @Element(name = "Wing")
    private ConfigValue<Integer> wing;

    public ConfigValue<Integer> getElevator() {
        return elevator;
    }

    public void setElevator(final ConfigValue<Integer> elevator) {
        this.elevator = elevator;
    }

    public ConfigValue<Integer> getRudder() {
        return rudder;
    }

    public void setRudder(final ConfigValue<Integer> rudder) {
        this.rudder = rudder;
    }

    public ConfigValue<Integer> getTailType() {
        return tailType;
    }

    public void setTailType(final ConfigValue<Integer> tailType) {
        this.tailType = tailType;
    }

    public ConfigValue<Integer> getWing() {
        return wing;
    }

    public void setWing(final ConfigValue<Integer> wing) {
        this.wing = wing;
    }

}
