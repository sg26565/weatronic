
package de.treichels.wea.bat64.gen.rotarysetup.rotarysetupsingle;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class RotarySetupSingle
    extends ConfigElement
{

    @Element(name = "Flags")
    private ConfigValue<Integer> flags;
    @Element(name = "ID")
    private ConfigValue<Integer> iD;
    @Element(name = "Preset")
    private ConfigValue<Integer> preset;
    @Element(name = "Steps")
    private ConfigValue<Integer> steps;

    public ConfigValue<Integer> getFlags() {
        return flags;
    }

    public void setFlags(final ConfigValue<Integer> flags) {
        this.flags = flags;
    }

    public ConfigValue<Integer> getID() {
        return iD;
    }

    public void setID(final ConfigValue<Integer> iD) {
        this.iD = iD;
    }

    public ConfigValue<Integer> getPreset() {
        return preset;
    }

    public void setPreset(final ConfigValue<Integer> preset) {
        this.preset = preset;
    }

    public ConfigValue<Integer> getSteps() {
        return steps;
    }

    public void setSteps(final ConfigValue<Integer> steps) {
        this.steps = steps;
    }

}
