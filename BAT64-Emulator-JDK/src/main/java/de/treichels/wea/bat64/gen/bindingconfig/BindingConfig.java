
package de.treichels.wea.bat64.gen.bindingconfig;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigGroupList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.bindingconfig.rxs.Rx;
import de.treichels.wea.bat64.xml.Element;

public class BindingConfig
    extends ConfigElement
{

    @Element(name = "ConnectionID")
    private ConfigValue<Integer> connectionID;
    @Element(name = "RadioBand")
    private ConfigValue<Integer> radioBand;
    @Element(name = "Rxs")
    private ConfigGroupList<Rx> rxs;

    public ConfigValue<Integer> getConnectionID() {
        return connectionID;
    }

    public void setConnectionID(final ConfigValue<Integer> connectionID) {
        this.connectionID = connectionID;
    }

    public ConfigValue<Integer> getRadioBand() {
        return radioBand;
    }

    public void setRadioBand(final ConfigValue<Integer> radioBand) {
        this.radioBand = radioBand;
    }

    public ConfigGroupList<Rx> getRxs() {
        return rxs;
    }

    public void setRxs(final ConfigGroupList<Rx> rxs) {
        this.rxs = rxs;
    }

}
