
package de.treichels.wea.bat64.gen.homescreenadjustment.telemetryids;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class TelemetryIds
    extends ConfigGroup
{

    @Element(name = "Category")
    private ConfigValue<Integer> category;
    @Element(name = "Index")
    private ConfigValue<Integer> index;
    @Element(name = "Pos")
    private ConfigValue<Integer> pos;

    public ConfigValue<Integer> getCategory() {
        return category;
    }

    public void setCategory(final ConfigValue<Integer> category) {
        this.category = category;
    }

    public ConfigValue<Integer> getIndex() {
        return index;
    }

    public void setIndex(final ConfigValue<Integer> index) {
        this.index = index;
    }

    public ConfigValue<Integer> getPos() {
        return pos;
    }

    public void setPos(final ConfigValue<Integer> pos) {
        this.pos = pos;
    }

}
