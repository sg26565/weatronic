
package de.treichels.wea.bat64.gen.configlvario.sound.climbrates;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class ClimbRates
    extends ConfigGroup
{

    @Element(name = "Frequency")
    private ConfigValue<Integer> frequency;
    @Element(name = "Rate")
    private ConfigValue<Integer> rate;

    public ConfigValue<Integer> getFrequency() {
        return frequency;
    }

    public void setFrequency(final ConfigValue<Integer> frequency) {
        this.frequency = frequency;
    }

    public ConfigValue<Integer> getRate() {
        return rate;
    }

    public void setRate(final ConfigValue<Integer> rate) {
        this.rate = rate;
    }

}
