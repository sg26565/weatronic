
package de.treichels.wea.bat64.gen.functions.setups;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.functions.setups.duration.Duration;
import de.treichels.wea.bat64.gen.functions.setups.flexdifferential.FlexSetup;
import de.treichels.wea.bat64.xml.Element;

public class Setup
    extends ConfigElement
{

    @Element(name = "CurveIdx")
    private ConfigValue<Integer> curveIdx;
    @Element(name = "Duration")
    private Duration duration;
    @Element(name = "FMO")
    private ConfigValue<Integer> fMO;
    @Element(name = "FlexDifferential")
    private FlexSetup flexDifferential;
    @Element(name = "FlexExpo")
    private FlexSetup flexExpo;
    @Element(name = "FlexRate")
    private FlexSetup flexRate;

    public ConfigValue<Integer> getCurveIdx() {
        return curveIdx;
    }

    public void setCurveIdx(final ConfigValue<Integer> curveIdx) {
        this.curveIdx = curveIdx;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(final Duration duration) {
        this.duration = duration;
    }

    public ConfigValue<Integer> getFMO() {
        return fMO;
    }

    public void setFMO(final ConfigValue<Integer> fMO) {
        this.fMO = fMO;
    }

    public FlexSetup getFlexDifferential() {
        return flexDifferential;
    }

    public void setFlexDifferential(final FlexSetup flexDifferential) {
        this.flexDifferential = flexDifferential;
    }

    public FlexSetup getFlexExpo() {
        return flexExpo;
    }

    public void setFlexExpo(final FlexSetup flexExpo) {
        this.flexExpo = flexExpo;
    }

    public FlexSetup getFlexRate() {
        return flexRate;
    }

    public void setFlexRate(final FlexSetup flexRate) {
        this.flexRate = flexRate;
    }

}
