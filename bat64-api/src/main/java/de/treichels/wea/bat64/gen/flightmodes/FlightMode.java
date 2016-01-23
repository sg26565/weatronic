
package de.treichels.wea.bat64.gen.flightmodes;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class FlightMode
    extends ConfigElement
{

    @Element(name = "FadeIn")
    private ConfigValue<Integer> fadeIn;
    @Element(name = "Name")
    private ConfigValue<String> name;
    @Element(name = "NoFadeInFuncIdxs")
    private ConfigList<Integer> noFadeInFuncIdxs;

    public ConfigValue<Integer> getFadeIn() {
        return fadeIn;
    }

    public void setFadeIn(final ConfigValue<Integer> fadeIn) {
        this.fadeIn = fadeIn;
    }

    public ConfigValue<String> getName() {
        return name;
    }

    public void setName(final ConfigValue<String> name) {
        this.name = name;
    }

    public ConfigList<Integer> getNoFadeInFuncIdxs() {
        return noFadeInFuncIdxs;
    }

    public void setNoFadeInFuncIdxs(final ConfigList<Integer> noFadeInFuncIdxs) {
        this.noFadeInFuncIdxs = noFadeInFuncIdxs;
    }

}
