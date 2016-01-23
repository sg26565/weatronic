
package de.treichels.wea.bat64.gen.configlvario.sensors;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.gen.configlvario.sensors.motor.Motor;
import de.treichels.wea.bat64.gen.configlvario.sensors.sensor.Sensor;
import de.treichels.wea.bat64.xml.Element;

public class Sensors
    extends ConfigGroup
{

    @Element(name = "Motor")
    private Motor motor;
    @Element(name = "Sensor")
    private ConfigList<Sensor> sensor;

    public Motor getMotor() {
        return motor;
    }

    public void setMotor(final Motor motor) {
        this.motor = motor;
    }

    public ConfigList<Sensor> getSensor() {
        return sensor;
    }

    public void setSensor(final ConfigList<Sensor> sensor) {
        this.sensor = sensor;
    }

}
