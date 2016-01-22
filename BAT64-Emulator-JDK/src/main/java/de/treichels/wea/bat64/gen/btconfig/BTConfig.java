
package de.treichels.wea.bat64.gen.btconfig;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.btconfig.protocoldetail.ProtocolDetail;
import de.treichels.wea.bat64.xml.Element;

public class BTConfig
    extends ConfigElement
{

    @Element(name = "BTName")
    private ConfigValue<String> bTName;
    @Element(name = "IsActive")
    private ConfigValue<Integer> isActive;
    @Element(name = "PIN")
    private ConfigValue<String> pIN;
    @Element(name = "Protocol")
    private ConfigValue<Integer> protocol;
    @Element(name = "ProtocolDetail")
    private ProtocolDetail protocolDetail;
    @Element(name = "TxPower")
    private ConfigValue<Integer> txPower;

    public ConfigValue<String> getBTName() {
        return bTName;
    }

    public void setBTName(final ConfigValue<String> bTName) {
        this.bTName = bTName;
    }

    public ConfigValue<Integer> getIsActive() {
        return isActive;
    }

    public void setIsActive(final ConfigValue<Integer> isActive) {
        this.isActive = isActive;
    }

    public ConfigValue<String> getPIN() {
        return pIN;
    }

    public void setPIN(final ConfigValue<String> pIN) {
        this.pIN = pIN;
    }

    public ConfigValue<Integer> getProtocol() {
        return protocol;
    }

    public void setProtocol(final ConfigValue<Integer> protocol) {
        this.protocol = protocol;
    }

    public ProtocolDetail getProtocolDetail() {
        return protocolDetail;
    }

    public void setProtocolDetail(final ProtocolDetail protocolDetail) {
        this.protocolDetail = protocolDetail;
    }

    public ConfigValue<Integer> getTxPower() {
        return txPower;
    }

    public void setTxPower(final ConfigValue<Integer> txPower) {
        this.txPower = txPower;
    }

}
