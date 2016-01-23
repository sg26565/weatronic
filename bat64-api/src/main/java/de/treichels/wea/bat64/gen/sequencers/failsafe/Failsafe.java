
package de.treichels.wea.bat64.gen.sequencers.failsafe;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class Failsafe
    extends ConfigGroup
{

    @Element(name = "Mode")
    private ConfigValue<Integer> mode;
    @Element(name = "Position")
    private ConfigValue<Integer> position;

    public ConfigValue<Integer> getMode() {
        return mode;
    }

    public void setMode(final ConfigValue<Integer> mode) {
        this.mode = mode;
    }

    public ConfigValue<Integer> getPosition() {
        return position;
    }

    public void setPosition(final ConfigValue<Integer> position) {
        this.position = position;
    }

}
