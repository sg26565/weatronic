
package de.treichels.wea.bat64.gen.vswitchs;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.vswitchs.control.Control;
import de.treichels.wea.bat64.xml.Element;

public class VSwitch
    extends ConfigElement
{

    @Element(name = "Control__1")
    private Control control1;
    @Element(name = "Control__2")
    private Control control2;
    @Element(name = "IsLogicalOperationOR")
    private ConfigValue<Integer> isLogicalOperationOR;
    @Element(name = "Name")
    private ConfigValue<String> name;

    public Control getControl1() {
        return control1;
    }

    public void setControl1(final Control control1) {
        this.control1 = control1;
    }

    public Control getControl2() {
        return control2;
    }

    public void setControl2(final Control control2) {
        this.control2 = control2;
    }

    public ConfigValue<Integer> getIsLogicalOperationOR() {
        return isLogicalOperationOR;
    }

    public void setIsLogicalOperationOR(final ConfigValue<Integer> isLogicalOperationOR) {
        this.isLogicalOperationOR = isLogicalOperationOR;
    }

    public ConfigValue<String> getName() {
        return name;
    }

    public void setName(final ConfigValue<String> name) {
        this.name = name;
    }

}
