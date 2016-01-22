
package de.treichels.wea.bat64.gen.servoconfigs.plug;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class Plug
    extends ConfigElement
{

    @Element(name = "Connector")
    private ConfigValue<Integer> connector;
    @Element(name = "RxID")
    private ConfigValue<Integer> rxID;

    public ConfigValue<Integer> getConnector() {
        return connector;
    }

    public void setConnector(final ConfigValue<Integer> connector) {
        this.connector = connector;
    }

    public ConfigValue<Integer> getRxID() {
        return rxID;
    }

    public void setRxID(final ConfigValue<Integer> rxID) {
        this.rxID = rxID;
    }

}
