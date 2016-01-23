
package de.treichels.wea.bat64.gen.bindingconfig.rxs;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class Rx
    extends ConfigGroup
{

    @Element(name = "DeviceType")
    private ConfigValue<Integer> deviceType;
    @Element(name = "FWVersion")
    private ConfigValue<Integer> fWVersion;
    @Element(name = "Serial")
    private ConfigValue<Long> serial;

    public ConfigValue<Integer> getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(final ConfigValue<Integer> deviceType) {
        this.deviceType = deviceType;
    }

    public ConfigValue<Integer> getFWVersion() {
        return fWVersion;
    }

    public void setFWVersion(final ConfigValue<Integer> fWVersion) {
        this.fWVersion = fWVersion;
    }

    public ConfigValue<Long> getSerial() {
        return serial;
    }

    public void setSerial(final ConfigValue<Long> serial) {
        this.serial = serial;
    }

}
