
package de.treichels.wea.bat64.gen.startupwarnings.warnings;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class Warnings
    extends ConfigGroup
{

    @Element(name = "Category")
    private ConfigValue<Integer> category;
    @Element(name = "CheckListLink")
    private ConfigValue<Integer> checkListLink;
    @Element(name = "Flags")
    private ConfigValue<Integer> flags;
    @Element(name = "ID")
    private ConfigValue<Integer> iD;
    @Element(name = "Operator")
    private ConfigValue<Integer> operator;
    @Element(name = "Threshold")
    private ConfigValue<Integer> threshold;
    @Element(name = "Title")
    private ConfigValue<String> title;

    public ConfigValue<Integer> getCategory() {
        return category;
    }

    public void setCategory(final ConfigValue<Integer> category) {
        this.category = category;
    }

    public ConfigValue<Integer> getCheckListLink() {
        return checkListLink;
    }

    public void setCheckListLink(final ConfigValue<Integer> checkListLink) {
        this.checkListLink = checkListLink;
    }

    public ConfigValue<Integer> getFlags() {
        return flags;
    }

    public void setFlags(final ConfigValue<Integer> flags) {
        this.flags = flags;
    }

    public ConfigValue<Integer> getID() {
        return iD;
    }

    public void setID(final ConfigValue<Integer> iD) {
        this.iD = iD;
    }

    public ConfigValue<Integer> getOperator() {
        return operator;
    }

    public void setOperator(final ConfigValue<Integer> operator) {
        this.operator = operator;
    }

    public ConfigValue<Integer> getThreshold() {
        return threshold;
    }

    public void setThreshold(final ConfigValue<Integer> threshold) {
        this.threshold = threshold;
    }

    public ConfigValue<String> getTitle() {
        return title;
    }

    public void setTitle(final ConfigValue<String> title) {
        this.title = title;
    }

}
