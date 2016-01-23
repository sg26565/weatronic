
package de.treichels.wea.bat64.gen.functions.setups.flexdifferential;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class FlexSetup
    extends ConfigElement
{

    @Element(name = "Center")
    private ConfigValue<Integer> center;
    @Element(name = "Hi")
    private ConfigValue<Integer> hi;
    @Element(name = "Lo")
    private ConfigValue<Integer> lo;

    public ConfigValue<Integer> getCenter() {
        return center;
    }

    public void setCenter(final ConfigValue<Integer> center) {
        this.center = center;
    }

    public ConfigValue<Integer> getHi() {
        return hi;
    }

    public void setHi(final ConfigValue<Integer> hi) {
        this.hi = hi;
    }

    public ConfigValue<Integer> getLo() {
        return lo;
    }

    public void setLo(final ConfigValue<Integer> lo) {
        this.lo = lo;
    }

}
