
package de.treichels.wea.bat64.gen.configlvario.sound;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.configlvario.sound.climbrates.ClimbRates;
import de.treichels.wea.bat64.xml.Element;

public class Sound
    extends ConfigGroup
{

    @Element(name = "ClimbRates")
    private ConfigList<ClimbRates> climbRates;
    @Element(name = "ToneRates")
    private ConfigList<ConfigValue<Integer>> toneRates;

    public ConfigList<ClimbRates> getClimbRates() {
        return climbRates;
    }

    public void setClimbRates(final ConfigList<ClimbRates> climbRates) {
        this.climbRates = climbRates;
    }

    public ConfigList<ConfigValue<Integer>> getToneRates() {
        return toneRates;
    }

    public void setToneRates(final ConfigList<ConfigValue<Integer>> toneRates) {
        this.toneRates = toneRates;
    }

}
