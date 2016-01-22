
package de.treichels.wea.bat64.gen.limiters;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigGroupList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.functions.setups.flexdifferential.FlexSetup;
import de.treichels.wea.bat64.xml.Element;

public class Limiter
    extends ConfigElement
{

    @Element(name = "Aboves")
    private ConfigGroupList<FlexSetup> aboves;
    @Element(name = "Belows")
    private ConfigGroupList<FlexSetup> belows;
    @Element(name = "ControlAbove")
    private ConfigValue<Integer> controlAbove;
    @Element(name = "ControlBelow")
    private ConfigValue<Integer> controlBelow;
    @Element(name = "FuncIdx")
    private ConfigValue<Integer> funcIdx;
    @Element(name = "Name")
    private ConfigValue<String> name;

    public ConfigGroupList<FlexSetup> getAboves() {
        return aboves;
    }

    public void setAboves(final ConfigGroupList<FlexSetup> aboves) {
        this.aboves = aboves;
    }

    public ConfigGroupList<FlexSetup> getBelows() {
        return belows;
    }

    public void setBelows(final ConfigGroupList<FlexSetup> belows) {
        this.belows = belows;
    }

    public ConfigValue<Integer> getControlAbove() {
        return controlAbove;
    }

    public void setControlAbove(final ConfigValue<Integer> controlAbove) {
        this.controlAbove = controlAbove;
    }

    public ConfigValue<Integer> getControlBelow() {
        return controlBelow;
    }

    public void setControlBelow(final ConfigValue<Integer> controlBelow) {
        this.controlBelow = controlBelow;
    }

    public ConfigValue<Integer> getFuncIdx() {
        return funcIdx;
    }

    public void setFuncIdx(final ConfigValue<Integer> funcIdx) {
        this.funcIdx = funcIdx;
    }

    public ConfigValue<String> getName() {
        return name;
    }

    public void setName(final ConfigValue<String> name) {
        this.name = name;
    }

}
