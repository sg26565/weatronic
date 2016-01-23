
package de.treichels.wea.bat64.gen.configteacherstudent;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.configteacherstudent.remote.Remote;
import de.treichels.wea.bat64.gen.configteacherstudent.replace.Replace;
import de.treichels.wea.bat64.gen.configteacherstudent.switchactivatemode.SwitchActivateMode;
import de.treichels.wea.bat64.xml.Element;

public class ConfigTeacherStudent
    extends ConfigElement
{

    @Element(name = "Flags")
    private ConfigValue<Integer> flags;
    @Element(name = "Protocol")
    private ConfigValue<Integer> protocol;
    @Element(name = "Remote")
    private Remote remote;
    @Element(name = "Replace")
    private Replace replace;
    @Element(name = "Role")
    private ConfigValue<Integer> role;
    @Element(name = "SwitchActivateMode")
    private SwitchActivateMode switchActivateMode;

    public ConfigValue<Integer> getFlags() {
        return flags;
    }

    public void setFlags(final ConfigValue<Integer> flags) {
        this.flags = flags;
    }

    public ConfigValue<Integer> getProtocol() {
        return protocol;
    }

    public void setProtocol(final ConfigValue<Integer> protocol) {
        this.protocol = protocol;
    }

    public Remote getRemote() {
        return remote;
    }

    public void setRemote(final Remote remote) {
        this.remote = remote;
    }

    public Replace getReplace() {
        return replace;
    }

    public void setReplace(final Replace replace) {
        this.replace = replace;
    }

    public ConfigValue<Integer> getRole() {
        return role;
    }

    public void setRole(final ConfigValue<Integer> role) {
        this.role = role;
    }

    public SwitchActivateMode getSwitchActivateMode() {
        return switchActivateMode;
    }

    public void setSwitchActivateMode(final SwitchActivateMode switchActivateMode) {
        this.switchActivateMode = switchActivateMode;
    }

}
