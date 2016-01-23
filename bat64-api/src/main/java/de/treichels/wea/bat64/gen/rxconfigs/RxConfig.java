
package de.treichels.wea.bat64.gen.rxconfigs;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class RxConfig
    extends ConfigElement
{

    @Element(name = "AutoPowerOff")
    private ConfigValue<Integer> autoPowerOff;
    @Element(name = "BackChannelWarning")
    private ConfigValue<Integer> backChannelWarning;
    @Element(name = "BattWarning__0")
    private ConfigValue<Integer> battWarning0;
    @Element(name = "BattWarning__1")
    private ConfigValue<Integer> battWarning1;
    @Element(name = "BatteryTestVoltage__0")
    private ConfigValue<Integer> batteryTestVoltage0;
    @Element(name = "BatteryTestVoltage__1")
    private ConfigValue<Integer> batteryTestVoltage1;
    @Element(name = "FailSafeTimeout")
    private ConfigValue<Integer> failSafeTimeout;
    @Element(name = "Flags")
    private ConfigValue<Integer> flags;
    @Element(name = "IsServopulseSynchron")
    private ConfigValue<Integer> isServopulseSynchron;
    @Element(name = "IsSumSignalOffWhileFS")
    private ConfigValue<Integer> isSumSignalOffWhileFS;
    @Element(name = "RangeWarning")
    private ConfigValue<Integer> rangeWarning;
    @Element(name = "Role")
    private ConfigValue<Integer> role;
    @Element(name = "SumSignalOutput")
    private ConfigValue<Integer> sumSignalOutput;
    @Element(name = "TemperatureWarning")
    private ConfigValue<Integer> temperatureWarning;
    @Element(name = "Type")
    private ConfigValue<Integer> type;

    public ConfigValue<Integer> getAutoPowerOff() {
        return autoPowerOff;
    }

    public void setAutoPowerOff(final ConfigValue<Integer> autoPowerOff) {
        this.autoPowerOff = autoPowerOff;
    }

    public ConfigValue<Integer> getBackChannelWarning() {
        return backChannelWarning;
    }

    public void setBackChannelWarning(final ConfigValue<Integer> backChannelWarning) {
        this.backChannelWarning = backChannelWarning;
    }

    public ConfigValue<Integer> getBattWarning0() {
        return battWarning0;
    }

    public void setBattWarning0(final ConfigValue<Integer> battWarning0) {
        this.battWarning0 = battWarning0;
    }

    public ConfigValue<Integer> getBattWarning1() {
        return battWarning1;
    }

    public void setBattWarning1(final ConfigValue<Integer> battWarning1) {
        this.battWarning1 = battWarning1;
    }

    public ConfigValue<Integer> getBatteryTestVoltage0() {
        return batteryTestVoltage0;
    }

    public void setBatteryTestVoltage0(final ConfigValue<Integer> batteryTestVoltage0) {
        this.batteryTestVoltage0 = batteryTestVoltage0;
    }

    public ConfigValue<Integer> getBatteryTestVoltage1() {
        return batteryTestVoltage1;
    }

    public void setBatteryTestVoltage1(final ConfigValue<Integer> batteryTestVoltage1) {
        this.batteryTestVoltage1 = batteryTestVoltage1;
    }

    public ConfigValue<Integer> getFailSafeTimeout() {
        return failSafeTimeout;
    }

    public void setFailSafeTimeout(final ConfigValue<Integer> failSafeTimeout) {
        this.failSafeTimeout = failSafeTimeout;
    }

    public ConfigValue<Integer> getFlags() {
        return flags;
    }

    public void setFlags(final ConfigValue<Integer> flags) {
        this.flags = flags;
    }

    public ConfigValue<Integer> getIsServopulseSynchron() {
        return isServopulseSynchron;
    }

    public void setIsServopulseSynchron(final ConfigValue<Integer> isServopulseSynchron) {
        this.isServopulseSynchron = isServopulseSynchron;
    }

    public ConfigValue<Integer> getIsSumSignalOffWhileFS() {
        return isSumSignalOffWhileFS;
    }

    public void setIsSumSignalOffWhileFS(final ConfigValue<Integer> isSumSignalOffWhileFS) {
        this.isSumSignalOffWhileFS = isSumSignalOffWhileFS;
    }

    public ConfigValue<Integer> getRangeWarning() {
        return rangeWarning;
    }

    public void setRangeWarning(final ConfigValue<Integer> rangeWarning) {
        this.rangeWarning = rangeWarning;
    }

    public ConfigValue<Integer> getRole() {
        return role;
    }

    public void setRole(final ConfigValue<Integer> role) {
        this.role = role;
    }

    public ConfigValue<Integer> getSumSignalOutput() {
        return sumSignalOutput;
    }

    public void setSumSignalOutput(final ConfigValue<Integer> sumSignalOutput) {
        this.sumSignalOutput = sumSignalOutput;
    }

    public ConfigValue<Integer> getTemperatureWarning() {
        return temperatureWarning;
    }

    public void setTemperatureWarning(final ConfigValue<Integer> temperatureWarning) {
        this.temperatureWarning = temperatureWarning;
    }

    public ConfigValue<Integer> getType() {
        return type;
    }

    public void setType(final ConfigValue<Integer> type) {
        this.type = type;
    }

}
