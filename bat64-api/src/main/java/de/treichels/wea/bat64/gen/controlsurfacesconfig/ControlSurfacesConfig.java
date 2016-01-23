
package de.treichels.wea.bat64.gen.controlsurfacesconfig;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.gen.controlsurfacesconfig.config.Config;
import de.treichels.wea.bat64.xml.Element;

public class ControlSurfacesConfig
    extends ConfigElement
{

    @Element(name = "Elevators")
    private Config elevators;
    @Element(name = "Rudders")
    private Config rudders;
    @Element(name = "Wings")
    private Config wings;

    public Config getElevators() {
        return elevators;
    }

    public void setElevators(final Config elevators) {
        this.elevators = elevators;
    }

    public Config getRudders() {
        return rudders;
    }

    public void setRudders(final Config rudders) {
        this.rudders = rudders;
    }

    public Config getWings() {
        return wings;
    }

    public void setWings(final Config wings) {
        this.wings = wings;
    }

}
