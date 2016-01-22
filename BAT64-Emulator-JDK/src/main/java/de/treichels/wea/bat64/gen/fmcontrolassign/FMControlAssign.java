
package de.treichels.wea.bat64.gen.fmcontrolassign;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigGroupList;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.gen.configteacherstudent.switchactivatemode.SwitchActivateMode;
import de.treichels.wea.bat64.xml.Element;

public class FMControlAssign
    extends ConfigElement
{

    @Element(name = "ControlSwitchs")
    private ConfigGroupList<SwitchActivateMode> controlSwitchs;
    @Element(name = "FlightModeLUT")
    private ConfigList<Integer> flightModeLUT;

    public ConfigGroupList<SwitchActivateMode> getControlSwitchs() {
        return controlSwitchs;
    }

    public void setControlSwitchs(final ConfigGroupList<SwitchActivateMode> controlSwitchs) {
        this.controlSwitchs = controlSwitchs;
    }

    public ConfigList<Integer> getFlightModeLUT() {
        return flightModeLUT;
    }

    public void setFlightModeLUT(final ConfigList<Integer> flightModeLUT) {
        this.flightModeLUT = flightModeLUT;
    }

}
