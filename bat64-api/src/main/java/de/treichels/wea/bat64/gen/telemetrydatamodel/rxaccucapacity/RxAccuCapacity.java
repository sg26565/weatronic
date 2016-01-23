
package de.treichels.wea.bat64.gen.telemetrydatamodel.rxaccucapacity;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class RxAccuCapacity
    extends ConfigGroup
{

    @Element(name = "LVario")
    private ConfigValue<Integer> lVario;
    @Element(name = "Mux__01")
    private ConfigValue<Integer> mux01;
    @Element(name = "Mux__02")
    private ConfigValue<Integer> mux02;
    @Element(name = "Mux__03")
    private ConfigValue<Integer> mux03;
    @Element(name = "Mux__04")
    private ConfigValue<Integer> mux04;

    public ConfigValue<Integer> getLVario() {
        return lVario;
    }

    public void setLVario(final ConfigValue<Integer> lVario) {
        this.lVario = lVario;
    }

    public ConfigValue<Integer> getMux01() {
        return mux01;
    }

    public void setMux01(final ConfigValue<Integer> mux01) {
        this.mux01 = mux01;
    }

    public ConfigValue<Integer> getMux02() {
        return mux02;
    }

    public void setMux02(final ConfigValue<Integer> mux02) {
        this.mux02 = mux02;
    }

    public ConfigValue<Integer> getMux03() {
        return mux03;
    }

    public void setMux03(final ConfigValue<Integer> mux03) {
        this.mux03 = mux03;
    }

    public ConfigValue<Integer> getMux04() {
        return mux04;
    }

    public void setMux04(final ConfigValue<Integer> mux04) {
        this.mux04 = mux04;
    }

}
