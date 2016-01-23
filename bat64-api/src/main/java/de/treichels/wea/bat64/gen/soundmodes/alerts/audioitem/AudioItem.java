
package de.treichels.wea.bat64.gen.soundmodes.alerts.audioitem;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.soundmodes.alerts.audioitem.telemetryidinfo.TelemetryIDInfo;
import de.treichels.wea.bat64.xml.Element;

public class AudioItem
    extends ConfigElement
{

    @Element(name = "AudioFile")
    private ConfigValue<String> audioFile;
    @Element(name = "Flags")
    private ConfigValue<Integer> flags;
    @Element(name = "TelemetryIDInfo")
    private TelemetryIDInfo telemetryIDInfo;

    public ConfigValue<String> getAudioFile() {
        return audioFile;
    }

    public void setAudioFile(final ConfigValue<String> audioFile) {
        this.audioFile = audioFile;
    }

    public ConfigValue<Integer> getFlags() {
        return flags;
    }

    public void setFlags(final ConfigValue<Integer> flags) {
        this.flags = flags;
    }

    public TelemetryIDInfo getTelemetryIDInfo() {
        return telemetryIDInfo;
    }

    public void setTelemetryIDInfo(final TelemetryIDInfo telemetryIDInfo) {
        this.telemetryIDInfo = telemetryIDInfo;
    }

}
