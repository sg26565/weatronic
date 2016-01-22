
package de.treichels.wea.bat64.gen.soundmodes.announcements;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.soundmodes.alerts.audioitem.AudioItem;
import de.treichels.wea.bat64.xml.Element;

public class Announcements
    extends ConfigElement
{

    @Element(name = "AudioItem")
    private AudioItem audioItem;
    @Element(name = "RepetionRate")
    private ConfigValue<Integer> repetionRate;

    public AudioItem getAudioItem() {
        return audioItem;
    }

    public void setAudioItem(final AudioItem audioItem) {
        this.audioItem = audioItem;
    }

    public ConfigValue<Integer> getRepetionRate() {
        return repetionRate;
    }

    public void setRepetionRate(final ConfigValue<Integer> repetionRate) {
        this.repetionRate = repetionRate;
    }

}
