
package de.treichels.wea.bat64.gen.mixers.setups;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.functions.setups.flexdifferential.FlexSetup;
import de.treichels.wea.bat64.xml.Element;

public class Setup
    extends ConfigElement
{

    @Element(name = "CurveIdx")
    private ConfigValue<Integer> curveIdx;
    @Element(name = "DelayDown")
    private ConfigValue<Integer> delayDown;
    @Element(name = "DelayUp")
    private ConfigValue<Integer> delayUp;
    @Element(name = "Gain")
    private FlexSetup gain;

    public ConfigValue<Integer> getCurveIdx() {
        return curveIdx;
    }

    public void setCurveIdx(final ConfigValue<Integer> curveIdx) {
        this.curveIdx = curveIdx;
    }

    public ConfigValue<Integer> getDelayDown() {
        return delayDown;
    }

    public void setDelayDown(final ConfigValue<Integer> delayDown) {
        this.delayDown = delayDown;
    }

    public ConfigValue<Integer> getDelayUp() {
        return delayUp;
    }

    public void setDelayUp(final ConfigValue<Integer> delayUp) {
        this.delayUp = delayUp;
    }

    public FlexSetup getGain() {
        return gain;
    }

    public void setGain(final FlexSetup gain) {
        this.gain = gain;
    }

}
