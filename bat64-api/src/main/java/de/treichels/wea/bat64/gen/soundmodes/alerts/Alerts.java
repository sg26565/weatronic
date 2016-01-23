
package de.treichels.wea.bat64.gen.soundmodes.alerts;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.soundmodes.alerts.audioitem.AudioItem;
import de.treichels.wea.bat64.xml.Element;

public class Alerts
    extends ConfigElement
{

    @Element(name = "Alarms")
    private ConfigValue<Integer> alarms;
    @Element(name = "AudioItem")
    private AudioItem audioItem;
    @Element(name = "Operator")
    private ConfigValue<Integer> operator;
    @Element(name = "RepetionCount")
    private ConfigValue<Integer> repetionCount;
    @Element(name = "Threshold")
    private ConfigValue<Integer> threshold;

    public ConfigValue<Integer> getAlarms() {
        return alarms;
    }

    public void setAlarms(final ConfigValue<Integer> alarms) {
        this.alarms = alarms;
    }

    public AudioItem getAudioItem() {
        return audioItem;
    }

    public void setAudioItem(final AudioItem audioItem) {
        this.audioItem = audioItem;
    }

    public ConfigValue<Integer> getOperator() {
        return operator;
    }

    public void setOperator(final ConfigValue<Integer> operator) {
        this.operator = operator;
    }

    public ConfigValue<Integer> getRepetionCount() {
        return repetionCount;
    }

    public void setRepetionCount(final ConfigValue<Integer> repetionCount) {
        this.repetionCount = repetionCount;
    }

    public ConfigValue<Integer> getThreshold() {
        return threshold;
    }

    public void setThreshold(final ConfigValue<Integer> threshold) {
        this.threshold = threshold;
    }

}
