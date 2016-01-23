
package de.treichels.wea.bat64.gen.rotaryvalueinfosingles;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class RotaryValueInfoSingle
    extends ConfigElement
{

    @Element(name = "ID")
    private ConfigValue<Integer> iD;
    @Element(name = "Values")
    private ConfigList<ConfigList<ConfigValue<Integer>>> values;

    public ConfigValue<Integer> getID() {
        return iD;
    }

    public void setID(final ConfigValue<Integer> iD) {
        this.iD = iD;
    }

    public ConfigList<ConfigList<ConfigValue<Integer>>> getValues() {
        return values;
    }

    public void setValues(final ConfigList<ConfigList<ConfigValue<Integer>>> values) {
        this.values = values;
    }

}
