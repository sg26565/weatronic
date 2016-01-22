
package de.treichels.wea.bat64.gen.controlsurfaces;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class ControlSurface
    extends ConfigElement
{

    @Element(name = "ServoGroup")
    private ConfigValue<Integer> servoGroup;
    @Element(name = "Servos")
    private ConfigList<Integer> servos;

    public ConfigValue<Integer> getServoGroup() {
        return servoGroup;
    }

    public void setServoGroup(final ConfigValue<Integer> servoGroup) {
        this.servoGroup = servoGroup;
    }

    public ConfigList<Integer> getServos() {
        return servos;
    }

    public void setServos(final ConfigList<Integer> servos) {
        this.servos = servos;
    }

}
