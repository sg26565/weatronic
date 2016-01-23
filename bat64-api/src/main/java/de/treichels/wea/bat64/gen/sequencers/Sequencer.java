
package de.treichels.wea.bat64.gen.sequencers;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.configteacherstudent.switchactivatemode.SwitchActivateMode;
import de.treichels.wea.bat64.gen.sequencers.failsafe.Failsafe;
import de.treichels.wea.bat64.gen.sequencers.servos.Servos;
import de.treichels.wea.bat64.xml.Element;

public class Sequencer
    extends ConfigElement
{

    @Element(name = "DelayDown")
    private ConfigValue<Integer> delayDown;
    @Element(name = "DelayUp")
    private ConfigValue<Integer> delayUp;
    @Element(name = "Failsafe")
    private Failsafe failsafe;
    @Element(name = "Flags")
    private ConfigValue<Integer> flags;
    @Element(name = "Name")
    private ConfigValue<String> name;
    @Element(name = "Servos")
    private ConfigList<Servos> servos;
    @Element(name = "Switch")
    private SwitchActivateMode controlSwitch;

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

    public Failsafe getFailsafe() {
        return failsafe;
    }

    public void setFailsafe(final Failsafe failsafe) {
        this.failsafe = failsafe;
    }

    public ConfigValue<Integer> getFlags() {
        return flags;
    }

    public void setFlags(final ConfigValue<Integer> flags) {
        this.flags = flags;
    }

    public ConfigValue<String> getName() {
        return name;
    }

    public void setName(final ConfigValue<String> name) {
        this.name = name;
    }

    public ConfigList<Servos> getServos() {
        return servos;
    }

    public void setServos(final ConfigList<Servos> servos) {
        this.servos = servos;
    }

    public SwitchActivateMode getControlSwitch() {
        return controlSwitch;
    }

    public void setControlSwitch(final SwitchActivateMode controlSwitch) {
        this.controlSwitch = controlSwitch;
    }

}
