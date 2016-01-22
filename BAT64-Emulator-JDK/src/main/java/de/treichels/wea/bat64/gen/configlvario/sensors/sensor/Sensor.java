
package de.treichels.wea.bat64.gen.configlvario.sensors.sensor;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class Sensor
    extends ConfigGroup
{

    @Element(name = "Input")
    private ConfigValue<Integer> input;
    @Element(name = "Item")
    private ConfigValue<String> item;
    @Element(name = "LogFrequency")
    private ConfigValue<Integer> logFrequency;
    @Element(name = "SensorType")
    private ConfigValue<Integer> sensorType;

    public ConfigValue<Integer> getInput() {
        return input;
    }

    public void setInput(final ConfigValue<Integer> input) {
        this.input = input;
    }

    public ConfigValue<String> getItem() {
        return item;
    }

    public void setItem(final ConfigValue<String> item) {
        this.item = item;
    }

    public ConfigValue<Integer> getLogFrequency() {
        return logFrequency;
    }

    public void setLogFrequency(final ConfigValue<Integer> logFrequency) {
        this.logFrequency = logFrequency;
    }

    public ConfigValue<Integer> getSensorType() {
        return sensorType;
    }

    public void setSensorType(final ConfigValue<Integer> sensorType) {
        this.sensorType = sensorType;
    }

}
