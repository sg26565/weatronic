
package de.treichels.wea.bat64.gen.btconfig.protocoldetail.skynavigator;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class SkyNavigator
    extends ConfigGroup
{

    @Element(name = "Functions")
    private ConfigList<Integer> functions;
    @Element(name = "TxRate")
    private ConfigValue<Integer> txRate;

    public ConfigList<Integer> getFunctions() {
        return functions;
    }

    public void setFunctions(final ConfigList<Integer> functions) {
        this.functions = functions;
    }

    public ConfigValue<Integer> getTxRate() {
        return txRate;
    }

    public void setTxRate(final ConfigValue<Integer> txRate) {
        this.txRate = txRate;
    }

}
