
package de.treichels.wea.bat64.gen.sequencers.servos;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.sequencers.servos.pairs.Pairs;
import de.treichels.wea.bat64.xml.Element;

public class Servos
    extends ConfigElement
{

    @Element(name = "Flags")
    private ConfigValue<Integer> flags;
    @Element(name = "Pairs")
    private ConfigList<Pairs> pairs;
    @Element(name = "ServoIndex")
    private ConfigValue<Integer> servoIndex;

    public ConfigValue<Integer> getFlags() {
        return flags;
    }

    public void setFlags(final ConfigValue<Integer> flags) {
        this.flags = flags;
    }

    public ConfigList<Pairs> getPairs() {
        return pairs;
    }

    public void setPairs(final ConfigList<Pairs> pairs) {
        this.pairs = pairs;
    }

    public ConfigValue<Integer> getServoIndex() {
        return servoIndex;
    }

    public void setServoIndex(final ConfigValue<Integer> servoIndex) {
        this.servoIndex = servoIndex;
    }

}
