
package de.treichels.wea.bat64.gen.modelconfig;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.modelconfig.modeltypedependent.ModelTypeDependent;
import de.treichels.wea.bat64.xml.Element;

public class ModelConfig
    extends ConfigElement
{

    @Element(name = "Category")
    private ConfigValue<String> category;
    @Element(name = "FilePath_PreflightCheckList")
    private ConfigValue<String> filePathPreflightCheckList;
    @Element(name = "FuncPreselect")
    private ConfigValue<Integer> funcPreselect;
    @Element(name = "Image")
    private ConfigValue<String> image;
    @Element(name = "InfoText")
    private ConfigValue<String> infoText;
    @Element(name = "ModelName")
    private ConfigValue<String> modelName;
    @Element(name = "ModelTypeDependent")
    private ModelTypeDependent modelTypeDependent;
    @Element(name = "OutputResolution")
    private ConfigValue<Integer> outputResolution;
    @Element(name = "Type")
    private ConfigValue<Integer> type;

    public ConfigValue<String> getCategory() {
        return category;
    }

    public void setCategory(final ConfigValue<String> category) {
        this.category = category;
    }

    public ConfigValue<String> getFilePathPreflightCheckList() {
        return filePathPreflightCheckList;
    }

    public void setFilePathPreflightCheckList(final ConfigValue<String> filePathPreflightCheckList) {
        this.filePathPreflightCheckList = filePathPreflightCheckList;
    }

    public ConfigValue<Integer> getFuncPreselect() {
        return funcPreselect;
    }

    public void setFuncPreselect(final ConfigValue<Integer> funcPreselect) {
        this.funcPreselect = funcPreselect;
    }

    public ConfigValue<String> getImage() {
        return image;
    }

    public void setImage(final ConfigValue<String> image) {
        this.image = image;
    }

    public ConfigValue<String> getInfoText() {
        return infoText;
    }

    public void setInfoText(final ConfigValue<String> infoText) {
        this.infoText = infoText;
    }

    public ConfigValue<String> getModelName() {
        return modelName;
    }

    public void setModelName(final ConfigValue<String> modelName) {
        this.modelName = modelName;
    }

    public ModelTypeDependent getModelTypeDependent() {
        return modelTypeDependent;
    }

    public void setModelTypeDependent(final ModelTypeDependent modelTypeDependent) {
        this.modelTypeDependent = modelTypeDependent;
    }

    public ConfigValue<Integer> getOutputResolution() {
        return outputResolution;
    }

    public void setOutputResolution(final ConfigValue<Integer> outputResolution) {
        this.outputResolution = outputResolution;
    }

    public ConfigValue<Integer> getType() {
        return type;
    }

    public void setType(final ConfigValue<Integer> type) {
        this.type = type;
    }

}
