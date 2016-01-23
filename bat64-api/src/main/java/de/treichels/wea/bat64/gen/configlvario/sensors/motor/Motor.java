
package de.treichels.wea.bat64.gen.configlvario.sensors.motor;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class Motor
    extends ConfigGroup
{

    @Element(name = "Input")
    private ConfigValue<String> input;
    @Element(name = "Item")
    private ConfigList<ConfigValue<String>> item;
    @Element(name = "LogFrequency")
    private ConfigList<ConfigValue<Integer>> logFrequency;
    @Element(name = "SensorType")
    private ConfigValue<Integer> sensorType;

    public ConfigValue<String> getInput() {
        return input;
    }

    public void setInput(final ConfigValue<String> input) {
        this.input = input;
    }

    public ConfigList<ConfigValue<String>> getItem() {
        return item;
    }

    public void setItem(final ConfigList<ConfigValue<String>> item) {
        this.item = item;
    }

    public ConfigList<ConfigValue<Integer>> getLogFrequency() {
        return logFrequency;
    }

    public void setLogFrequency(final ConfigList<ConfigValue<Integer>> logFrequency) {
        this.logFrequency = logFrequency;
    }

    public ConfigValue<Integer> getSensorType() {
        return sensorType;
    }

    public void setSensorType(final ConfigValue<Integer> sensorType) {
        this.sensorType = sensorType;
    }

}
