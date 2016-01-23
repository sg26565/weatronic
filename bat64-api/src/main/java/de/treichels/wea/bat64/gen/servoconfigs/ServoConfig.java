
package de.treichels.wea.bat64.gen.servoconfigs;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigGroupList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.servoconfigs.plug.Plug;
import de.treichels.wea.bat64.gen.servoconfigs.servomixers.ServoMixer;
import de.treichels.wea.bat64.xml.Element;

public class ServoConfig
    extends ConfigElement
{

    @Element(name = "Centre")
    private ConfigValue<Integer> centre;
    @Element(name = "Flags")
    private ConfigValue<Integer> flags;
    @Element(name = "FrameRate")
    private ConfigValue<Integer> frameRate;
    @Element(name = "Group")
    private ConfigValue<Integer> group;
    @Element(name = "MaxValue")
    private ConfigValue<Integer> maxValue;
    @Element(name = "MinValue")
    private ConfigValue<Integer> minValue;
    @Element(name = "Name")
    private ConfigValue<String> name;
    @Element(name = "Plug")
    private Plug plug;
    @Element(name = "ServoMixers")
    private ConfigGroupList<ServoMixer> servoMixers;
    @Element(name = "ServoType")
    private ConfigValue<Integer> servoType;
    @Element(name = "Voltage")
    private ConfigValue<Integer> voltage;

    public ConfigValue<Integer> getCentre() {
        return centre;
    }

    public void setCentre(final ConfigValue<Integer> centre) {
        this.centre = centre;
    }

    public ConfigValue<Integer> getFlags() {
        return flags;
    }

    public void setFlags(final ConfigValue<Integer> flags) {
        this.flags = flags;
    }

    public ConfigValue<Integer> getFrameRate() {
        return frameRate;
    }

    public void setFrameRate(final ConfigValue<Integer> frameRate) {
        this.frameRate = frameRate;
    }

    public ConfigValue<Integer> getGroup() {
        return group;
    }

    public void setGroup(final ConfigValue<Integer> group) {
        this.group = group;
    }

    public ConfigValue<Integer> getMaxValue() {
        return maxValue;
    }

    public void setMaxValue(final ConfigValue<Integer> maxValue) {
        this.maxValue = maxValue;
    }

    public ConfigValue<Integer> getMinValue() {
        return minValue;
    }

    public void setMinValue(final ConfigValue<Integer> minValue) {
        this.minValue = minValue;
    }

    public ConfigValue<String> getName() {
        return name;
    }

    public void setName(final ConfigValue<String> name) {
        this.name = name;
    }

    public Plug getPlug() {
        return plug;
    }

    public void setPlug(final Plug plug) {
        this.plug = plug;
    }

    public ConfigGroupList<ServoMixer> getServoMixers() {
        return servoMixers;
    }

    public void setServoMixers(final ConfigGroupList<ServoMixer> servoMixers) {
        this.servoMixers = servoMixers;
    }

    public ConfigValue<Integer> getServoType() {
        return servoType;
    }

    public void setServoType(final ConfigValue<Integer> servoType) {
        this.servoType = servoType;
    }

    public ConfigValue<Integer> getVoltage() {
        return voltage;
    }

    public void setVoltage(final ConfigValue<Integer> voltage) {
        this.voltage = voltage;
    }

}
