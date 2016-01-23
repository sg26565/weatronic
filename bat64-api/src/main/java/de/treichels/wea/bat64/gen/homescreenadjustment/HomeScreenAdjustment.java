
package de.treichels.wea.bat64.gen.homescreenadjustment;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.homescreenadjustment.telemetryids.TelemetryIds;
import de.treichels.wea.bat64.xml.Element;

public class HomeScreenAdjustment
    extends ConfigElement
{

    @Element(name = "TelemetryIds")
    private ConfigList<TelemetryIds> telemetryIds;
    @Element(name = "Template")
    private ConfigValue<Integer> template;
    @Element(name = "TemplateFile")
    private ConfigValue<String> templateFile;

    public ConfigList<TelemetryIds> getTelemetryIds() {
        return telemetryIds;
    }

    public void setTelemetryIds(final ConfigList<TelemetryIds> telemetryIds) {
        this.telemetryIds = telemetryIds;
    }

    public ConfigValue<Integer> getTemplate() {
        return template;
    }

    public void setTemplate(final ConfigValue<Integer> template) {
        this.template = template;
    }

    public ConfigValue<String> getTemplateFile() {
        return templateFile;
    }

    public void setTemplateFile(final ConfigValue<String> templateFile) {
        this.templateFile = templateFile;
    }

}
