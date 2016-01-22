
package de.treichels.wea.bat64.gen.functions.servos;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class Servo
    extends ConfigElement
{

    @Element(name = "ServoIdx")
    private ConfigValue<Integer> servoIdx;
    @Element(name = "ServoMixerIdx")
    private ConfigValue<Integer> servoMixerIdx;

    public ConfigValue<Integer> getServoIdx() {
        return servoIdx;
    }

    public void setServoIdx(final ConfigValue<Integer> servoIdx) {
        this.servoIdx = servoIdx;
    }

    public ConfigValue<Integer> getServoMixerIdx() {
        return servoMixerIdx;
    }

    public void setServoMixerIdx(final ConfigValue<Integer> servoMixerIdx) {
        this.servoMixerIdx = servoMixerIdx;
    }

}
