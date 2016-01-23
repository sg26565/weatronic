
package de.treichels.wea.bat64.gen.sortindeces;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class SortIndeces
    extends ConfigElement
{

    @Element(name = "FlightModes")
    private ConfigList<Integer> flightModes;
    @Element(name = "Functions")
    private ConfigList<Integer> functions;
    @Element(name = "GyroSetups")
    private ConfigValue<String> gyroSetups;
    @Element(name = "Limiters")
    private ConfigList<Integer> limiters;
    @Element(name = "Mixers")
    private ConfigList<Integer> mixers;
    @Element(name = "Sequencers")
    private ConfigList<Integer> sequencers;
    @Element(name = "SoundModes")
    private ConfigList<Integer> soundModes;
    @Element(name = "Timers")
    private ConfigList<Integer> timers;
    @Element(name = "VSwitchs")
    private ConfigList<Integer> vSwitchs;

    public ConfigList<Integer> getFlightModes() {
        return flightModes;
    }

    public void setFlightModes(final ConfigList<Integer> flightModes) {
        this.flightModes = flightModes;
    }

    public ConfigList<Integer> getFunctions() {
        return functions;
    }

    public void setFunctions(final ConfigList<Integer> functions) {
        this.functions = functions;
    }

    public ConfigValue<String> getGyroSetups() {
        return gyroSetups;
    }

    public void setGyroSetups(final ConfigValue<String> gyroSetups) {
        this.gyroSetups = gyroSetups;
    }

    public ConfigList<Integer> getLimiters() {
        return limiters;
    }

    public void setLimiters(final ConfigList<Integer> limiters) {
        this.limiters = limiters;
    }

    public ConfigList<Integer> getMixers() {
        return mixers;
    }

    public void setMixers(final ConfigList<Integer> mixers) {
        this.mixers = mixers;
    }

    public ConfigList<Integer> getSequencers() {
        return sequencers;
    }

    public void setSequencers(final ConfigList<Integer> sequencers) {
        this.sequencers = sequencers;
    }

    public ConfigList<Integer> getSoundModes() {
        return soundModes;
    }

    public void setSoundModes(final ConfigList<Integer> soundModes) {
        this.soundModes = soundModes;
    }

    public ConfigList<Integer> getTimers() {
        return timers;
    }

    public void setTimers(final ConfigList<Integer> timers) {
        this.timers = timers;
    }

    public ConfigList<Integer> getVSwitchs() {
        return vSwitchs;
    }

    public void setVSwitchs(final ConfigList<Integer> vSwitchs) {
        this.vSwitchs = vSwitchs;
    }

}
