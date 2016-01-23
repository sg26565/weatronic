
package de.treichels.wea.bat64.gen.functions.setups.duration;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class Duration
    extends ConfigGroup
{

    @Element(name = "FromLeft")
    private ConfigValue<Integer> fromLeft;
    @Element(name = "FromRight")
    private ConfigValue<Integer> fromRight;

    public ConfigValue<Integer> getFromLeft() {
        return fromLeft;
    }

    public void setFromLeft(final ConfigValue<Integer> fromLeft) {
        this.fromLeft = fromLeft;
    }

    public ConfigValue<Integer> getFromRight() {
        return fromRight;
    }

    public void setFromRight(final ConfigValue<Integer> fromRight) {
        this.fromRight = fromRight;
    }

}
