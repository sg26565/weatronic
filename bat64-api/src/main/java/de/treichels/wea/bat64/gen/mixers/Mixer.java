
package de.treichels.wea.bat64.gen.mixers;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigGroupList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.mixers.setups.Setup;
import de.treichels.wea.bat64.xml.Element;

public class Mixer
    extends ConfigElement
{

    @Element(name = "Control")
    private ConfigValue<Integer> control;
    @Element(name = "Flags")
    private ConfigValue<Integer> flags;
    @Element(name = "FromFunction")
    private ConfigValue<Integer> fromFunction;
    @Element(name = "GlobalCurveIdx")
    private ConfigValue<Integer> globalCurveIdx;
    @Element(name = "ID")
    private ConfigValue<Integer> iD;
    @Element(name = "InheritForNext")
    private ConfigValue<Integer> inheritForNext;
    @Element(name = "Name")
    private ConfigValue<String> name;
    @Element(name = "Setups")
    private ConfigGroupList<Setup> setups;
    @Element(name = "ToFunction")
    private ConfigValue<Integer> toFunction;
    @Element(name = "Trim")
    private ConfigValue<Integer> trim;

    public ConfigValue<Integer> getControl() {
        return control;
    }

    public void setControl(final ConfigValue<Integer> control) {
        this.control = control;
    }

    public ConfigValue<Integer> getFlags() {
        return flags;
    }

    public void setFlags(final ConfigValue<Integer> flags) {
        this.flags = flags;
    }

    public ConfigValue<Integer> getFromFunction() {
        return fromFunction;
    }

    public void setFromFunction(final ConfigValue<Integer> fromFunction) {
        this.fromFunction = fromFunction;
    }

    public ConfigValue<Integer> getGlobalCurveIdx() {
        return globalCurveIdx;
    }

    public void setGlobalCurveIdx(final ConfigValue<Integer> globalCurveIdx) {
        this.globalCurveIdx = globalCurveIdx;
    }

    public ConfigValue<Integer> getID() {
        return iD;
    }

    public void setID(final ConfigValue<Integer> iD) {
        this.iD = iD;
    }

    public ConfigValue<Integer> getInheritForNext() {
        return inheritForNext;
    }

    public void setInheritForNext(final ConfigValue<Integer> inheritForNext) {
        this.inheritForNext = inheritForNext;
    }

    public ConfigValue<String> getName() {
        return name;
    }

    public void setName(final ConfigValue<String> name) {
        this.name = name;
    }

    public ConfigGroupList<Setup> getSetups() {
        return setups;
    }

    public void setSetups(final ConfigGroupList<Setup> setups) {
        this.setups = setups;
    }

    public ConfigValue<Integer> getToFunction() {
        return toFunction;
    }

    public void setToFunction(final ConfigValue<Integer> toFunction) {
        this.toFunction = toFunction;
    }

    public ConfigValue<Integer> getTrim() {
        return trim;
    }

    public void setTrim(final ConfigValue<Integer> trim) {
        this.trim = trim;
    }

}
