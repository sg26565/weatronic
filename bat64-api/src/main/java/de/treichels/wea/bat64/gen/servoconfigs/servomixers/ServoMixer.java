
package de.treichels.wea.bat64.gen.servoconfigs.servomixers;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.xml.Element;

public class ServoMixer
    extends ConfigElement
{

    @Element(name = "RxCurveIdx")
    private ConfigValue<Integer> rxCurveIdx;
    @Element(name = "SourceType")
    private ConfigValue<Integer> sourceType;
    @Element(name = "FunctionIndex")
    private ConfigValue<Integer> functionIndex;
    @Element(name = "GyroIndex")
    private ConfigValue<Integer> gyroIndex;
    @Element(name = "MaxTravel")
    private ConfigValue<Integer> maxTravel;
    @Element(name = "MinTravel")
    private ConfigValue<Integer> minTravel;

    public ConfigValue<Integer> getRxCurveIdx() {
        return rxCurveIdx;
    }

    public void setRxCurveIdx(final ConfigValue<Integer> rxCurveIdx) {
        this.rxCurveIdx = rxCurveIdx;
    }

    public ConfigValue<Integer> getSourceType() {
        return sourceType;
    }

    public void setSourceType(final ConfigValue<Integer> sourceType) {
        this.sourceType = sourceType;
    }

    public ConfigValue<Integer> getFunctionIndex() {
        return functionIndex;
    }

    public void setFunctionIndex(final ConfigValue<Integer> functionIndex) {
        this.functionIndex = functionIndex;
    }

    public ConfigValue<Integer> getGyroIndex() {
        return gyroIndex;
    }

    public void setGyroIndex(final ConfigValue<Integer> gyroIndex) {
        this.gyroIndex = gyroIndex;
    }

    public ConfigValue<Integer> getMaxTravel() {
        return maxTravel;
    }

    public void setMaxTravel(final ConfigValue<Integer> maxTravel) {
        this.maxTravel = maxTravel;
    }

    public ConfigValue<Integer> getMinTravel() {
        return minTravel;
    }

    public void setMinTravel(final ConfigValue<Integer> minTravel) {
        this.minTravel = minTravel;
    }

}
