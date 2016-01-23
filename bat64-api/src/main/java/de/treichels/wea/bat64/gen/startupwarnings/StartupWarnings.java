
package de.treichels.wea.bat64.gen.startupwarnings;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.startupwarnings.warnings.Warnings;
import de.treichels.wea.bat64.xml.Element;

public class StartupWarnings
    extends ConfigElement
{

    @Element(name = "CheckMask")
    private ConfigValue<Integer> checkMask;
    @Element(name = "Flags")
    private ConfigValue<Integer> flags;
    @Element(name = "PreflightcheckItems")
    private ConfigValue<String> preflightcheckItems;
    @Element(name = "Warnings")
    private ConfigList<Warnings> warnings;

    public ConfigValue<Integer> getCheckMask() {
        return checkMask;
    }

    public void setCheckMask(final ConfigValue<Integer> checkMask) {
        this.checkMask = checkMask;
    }

    public ConfigValue<Integer> getFlags() {
        return flags;
    }

    public void setFlags(final ConfigValue<Integer> flags) {
        this.flags = flags;
    }

    public ConfigValue<String> getPreflightcheckItems() {
        return preflightcheckItems;
    }

    public void setPreflightcheckItems(final ConfigValue<String> preflightcheckItems) {
        this.preflightcheckItems = preflightcheckItems;
    }

    public ConfigList<Warnings> getWarnings() {
        return warnings;
    }

    public void setWarnings(final ConfigList<Warnings> warnings) {
        this.warnings = warnings;
    }

}
