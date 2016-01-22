
package de.treichels.wea.bat64.gen.curves;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class Curve
    extends ConfigElement
{

    @Element(name = "CurveValue")
    private ConfigList<Integer> curveValue;
    @Element(name = "RealPoints")
    private ConfigValue<Integer> realPoints;

    public ConfigList<Integer> getCurveValue() {
        return curveValue;
    }

    public void setCurveValue(final ConfigList<Integer> curveValue) {
        this.curveValue = curveValue;
    }

    public ConfigValue<Integer> getRealPoints() {
        return realPoints;
    }

    public void setRealPoints(final ConfigValue<Integer> realPoints) {
        this.realPoints = realPoints;
    }

}
