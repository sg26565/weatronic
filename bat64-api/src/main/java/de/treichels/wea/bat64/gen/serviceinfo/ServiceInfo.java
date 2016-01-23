
package de.treichels.wea.bat64.gen.serviceinfo;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class ServiceInfo
    extends ConfigElement
{

    @Element(name = "DataInconsistent")
    private ConfigValue<Integer> dataInconsistent;

    public ConfigValue<Integer> getDataInconsistent() {
        return dataInconsistent;
    }

    public void setDataInconsistent(final ConfigValue<Integer> dataInconsistent) {
        this.dataInconsistent = dataInconsistent;
    }

}
