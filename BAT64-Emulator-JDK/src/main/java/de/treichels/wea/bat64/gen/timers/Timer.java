
package de.treichels.wea.bat64.gen.timers;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.configteacherstudent.switchactivatemode.SwitchActivateMode;
import de.treichels.wea.bat64.xml.Element;

public class Timer
    extends ConfigElement
{

    @Element(name = "AlarmDuration")
    private ConfigValue<Integer> alarmDuration;
    @Element(name = "AlarmTypes")
    private ConfigValue<Integer> alarmTypes;
    @Element(name = "Alarms")
    private ConfigValue<Integer> alarms;
    @Element(name = "Name")
    private ConfigValue<String> name;
    @Element(name = "SwitchLap")
    private SwitchActivateMode switchLap;
    @Element(name = "SwitchReset")
    private SwitchActivateMode switchReset;
    @Element(name = "SwitchStart")
    private SwitchActivateMode switchStart;
    @Element(name = "SwitchStop")
    private SwitchActivateMode switchStop;
    @Element(name = "TelemetryIdLastLap")
    private ConfigValue<Integer> telemetryIdLastLap;
    @Element(name = "TelemetryIdValue")
    private ConfigValue<Integer> telemetryIdValue;
    @Element(name = "ValueCurrent")
    private ConfigValue<Integer> valueCurrent;
    @Element(name = "ValueStart")
    private ConfigValue<Integer> valueStart;
    @Element(name = "ValueStop")
    private ConfigValue<Integer> valueStop;

    public ConfigValue<Integer> getAlarmDuration() {
        return alarmDuration;
    }

    public void setAlarmDuration(final ConfigValue<Integer> alarmDuration) {
        this.alarmDuration = alarmDuration;
    }

    public ConfigValue<Integer> getAlarmTypes() {
        return alarmTypes;
    }

    public void setAlarmTypes(final ConfigValue<Integer> alarmTypes) {
        this.alarmTypes = alarmTypes;
    }

    public ConfigValue<Integer> getAlarms() {
        return alarms;
    }

    public void setAlarms(final ConfigValue<Integer> alarms) {
        this.alarms = alarms;
    }

    public ConfigValue<String> getName() {
        return name;
    }

    public void setName(final ConfigValue<String> name) {
        this.name = name;
    }

    public SwitchActivateMode getSwitchLap() {
        return switchLap;
    }

    public void setSwitchLap(final SwitchActivateMode switchLap) {
        this.switchLap = switchLap;
    }

    public SwitchActivateMode getSwitchReset() {
        return switchReset;
    }

    public void setSwitchReset(final SwitchActivateMode switchReset) {
        this.switchReset = switchReset;
    }

    public SwitchActivateMode getSwitchStart() {
        return switchStart;
    }

    public void setSwitchStart(final SwitchActivateMode switchStart) {
        this.switchStart = switchStart;
    }

    public SwitchActivateMode getSwitchStop() {
        return switchStop;
    }

    public void setSwitchStop(final SwitchActivateMode switchStop) {
        this.switchStop = switchStop;
    }

    public ConfigValue<Integer> getTelemetryIdLastLap() {
        return telemetryIdLastLap;
    }

    public void setTelemetryIdLastLap(final ConfigValue<Integer> telemetryIdLastLap) {
        this.telemetryIdLastLap = telemetryIdLastLap;
    }

    public ConfigValue<Integer> getTelemetryIdValue() {
        return telemetryIdValue;
    }

    public void setTelemetryIdValue(final ConfigValue<Integer> telemetryIdValue) {
        this.telemetryIdValue = telemetryIdValue;
    }

    public ConfigValue<Integer> getValueCurrent() {
        return valueCurrent;
    }

    public void setValueCurrent(final ConfigValue<Integer> valueCurrent) {
        this.valueCurrent = valueCurrent;
    }

    public ConfigValue<Integer> getValueStart() {
        return valueStart;
    }

    public void setValueStart(final ConfigValue<Integer> valueStart) {
        this.valueStart = valueStart;
    }

    public ConfigValue<Integer> getValueStop() {
        return valueStop;
    }

    public void setValueStop(final ConfigValue<Integer> valueStop) {
        this.valueStop = valueStop;
    }

}
