
package de.treichels.wea.bat64.gen.configlvario;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.gen.configlvario.sensors.Sensors;
import de.treichels.wea.bat64.gen.configlvario.sound.Sound;
import de.treichels.wea.bat64.xml.Element;

public class ConfigLVario
    extends ConfigElement
{

    @Element(name = "Sensors")
    private Sensors sensors;
    @Element(name = "Sound")
    private Sound sound;

    public Sensors getSensors() {
        return sensors;
    }

    public void setSensors(final Sensors sensors) {
        this.sensors = sensors;
    }

    public Sound getSound() {
        return sound;
    }

    public void setSound(final Sound sound) {
        this.sound = sound;
    }

}
