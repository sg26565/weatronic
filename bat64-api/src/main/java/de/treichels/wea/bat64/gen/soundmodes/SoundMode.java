
package de.treichels.wea.bat64.gen.soundmodes;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.configteacherstudent.switchactivatemode.SwitchActivateMode;
import de.treichels.wea.bat64.gen.soundmodes.alerts.Alerts;
import de.treichels.wea.bat64.gen.soundmodes.announcements.Announcements;
import de.treichels.wea.bat64.xml.Element;

public class SoundMode
    extends ConfigElement
{

    @Element(name = "Alerts")
    private ConfigList<Alerts> alerts;
    @Element(name = "Announcements")
    private ConfigList<Announcements> announcements;
    @Element(name = "AudioFile")
    private ConfigValue<String> audioFile;
    @Element(name = "IsLinkVarioActive")
    private ConfigValue<Integer> isLinkVarioActive;
    @Element(name = "Name")
    private ConfigValue<String> name;
    @Element(name = "Switch")
    private SwitchActivateMode controlSwitch;

    public ConfigList<Alerts> getAlerts() {
        return alerts;
    }

    public void setAlerts(final ConfigList<Alerts> alerts) {
        this.alerts = alerts;
    }

    public ConfigList<Announcements> getAnnouncements() {
        return announcements;
    }

    public void setAnnouncements(final ConfigList<Announcements> announcements) {
        this.announcements = announcements;
    }

    public ConfigValue<String> getAudioFile() {
        return audioFile;
    }

    public void setAudioFile(final ConfigValue<String> audioFile) {
        this.audioFile = audioFile;
    }

    public ConfigValue<Integer> getIsLinkVarioActive() {
        return isLinkVarioActive;
    }

    public void setIsLinkVarioActive(final ConfigValue<Integer> isLinkVarioActive) {
        this.isLinkVarioActive = isLinkVarioActive;
    }

    public ConfigValue<String> getName() {
        return name;
    }

    public void setName(final ConfigValue<String> name) {
        this.name = name;
    }

    public SwitchActivateMode getControlSwitch() {
        return controlSwitch;
    }

    public void setControlSwitch(final SwitchActivateMode controlSwitch) {
        this.controlSwitch = controlSwitch;
    }

}
