
package de.treichels.wea.bat64.gen.functions;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigGroupList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.functions.failsafepos.FailSafePos;
import de.treichels.wea.bat64.gen.functions.servos.Servo;
import de.treichels.wea.bat64.gen.functions.setups.Setup;
import de.treichels.wea.bat64.gen.functions.trim.Trim;
import de.treichels.wea.bat64.xml.Element;

public class Function
    extends ConfigElement
{

    @Element(name = "Control")
    private ConfigValue<Integer> control;
    @Element(name = "ControlDifferential")
    private ConfigValue<Integer> controlDifferential;
    @Element(name = "ControlExpo")
    private ConfigValue<Integer> controlExpo;
    @Element(name = "ControlRate")
    private ConfigValue<Integer> controlRate;
    @Element(name = "FailSafePos")
    private FailSafePos failSafePos;
    @Element(name = "Flags")
    private ConfigValue<Integer> flags;
    @Element(name = "GlobalCurveIdx")
    private ConfigValue<Integer> globalCurveIdx;
    @Element(name = "GyroIdx")
    private ConfigValue<Integer> gyroIdx;
    @Element(name = "ID")
    private ConfigValue<Integer> iD;
    @Element(name = "Name")
    private ConfigValue<String> name;
    @Element(name = "Servos")
    private ConfigGroupList<Servo> servos;
    @Element(name = "Setups")
    private ConfigGroupList<Setup> setups;
    @Element(name = "Trim")
    private Trim trim;

    public ConfigValue<Integer> getControl() {
        return control;
    }

    public void setControl(final ConfigValue<Integer> control) {
        this.control = control;
    }

    public ConfigValue<Integer> getControlDifferential() {
        return controlDifferential;
    }

    public void setControlDifferential(final ConfigValue<Integer> controlDifferential) {
        this.controlDifferential = controlDifferential;
    }

    public ConfigValue<Integer> getControlExpo() {
        return controlExpo;
    }

    public void setControlExpo(final ConfigValue<Integer> controlExpo) {
        this.controlExpo = controlExpo;
    }

    public ConfigValue<Integer> getControlRate() {
        return controlRate;
    }

    public void setControlRate(final ConfigValue<Integer> controlRate) {
        this.controlRate = controlRate;
    }

    public FailSafePos getFailSafePos() {
        return failSafePos;
    }

    public void setFailSafePos(final FailSafePos failSafePos) {
        this.failSafePos = failSafePos;
    }

    public ConfigValue<Integer> getFlags() {
        return flags;
    }

    public void setFlags(final ConfigValue<Integer> flags) {
        this.flags = flags;
    }

    public ConfigValue<Integer> getGlobalCurveIdx() {
        return globalCurveIdx;
    }

    public void setGlobalCurveIdx(final ConfigValue<Integer> globalCurveIdx) {
        this.globalCurveIdx = globalCurveIdx;
    }

    public ConfigValue<Integer> getGyroIdx() {
        return gyroIdx;
    }

    public void setGyroIdx(final ConfigValue<Integer> gyroIdx) {
        this.gyroIdx = gyroIdx;
    }

    public ConfigValue<Integer> getID() {
        return iD;
    }

    public void setID(final ConfigValue<Integer> iD) {
        this.iD = iD;
    }

    public ConfigValue<String> getName() {
        return name;
    }

    public void setName(final ConfigValue<String> name) {
        this.name = name;
    }

    public ConfigGroupList<Servo> getServos() {
        return servos;
    }

    public void setServos(final ConfigGroupList<Servo> servos) {
        this.servos = servos;
    }

    public ConfigGroupList<Setup> getSetups() {
        return setups;
    }

    public void setSetups(final ConfigGroupList<Setup> setups) {
        this.setups = setups;
    }

    public Trim getTrim() {
        return trim;
    }

    public void setTrim(final Trim trim) {
        this.trim = trim;
    }

}
