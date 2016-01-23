
package de.treichels.wea.bat64.gen.btconfig.protocoldetail;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.gen.btconfig.protocoldetail.skynavigator.SkyNavigator;
import de.treichels.wea.bat64.xml.Element;

public class ProtocolDetail
    extends ConfigGroup
{

    @Element(name = "SkyNavigator")
    private SkyNavigator skyNavigator;

    public SkyNavigator getSkyNavigator() {
        return skyNavigator;
    }

    public void setSkyNavigator(final SkyNavigator skyNavigator) {
        this.skyNavigator = skyNavigator;
    }

}
