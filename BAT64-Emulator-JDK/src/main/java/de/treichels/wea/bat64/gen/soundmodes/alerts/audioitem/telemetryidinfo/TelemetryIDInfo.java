
package de.treichels.wea.bat64.gen.soundmodes.alerts.audioitem.telemetryidinfo;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class TelemetryIDInfo
    extends ConfigElement
{

    @Element(name = "Category")
    private ConfigValue<Integer> category;
    @Element(name = "ID")
    private ConfigValue<Integer> iD;

    public ConfigValue<Integer> getCategory() {
        return category;
    }

    public void setCategory(final ConfigValue<Integer> category) {
        this.category = category;
    }

    public ConfigValue<Integer> getID() {
        return iD;
    }

    public void setID(final ConfigValue<Integer> iD) {
        this.iD = iD;
    }

}
