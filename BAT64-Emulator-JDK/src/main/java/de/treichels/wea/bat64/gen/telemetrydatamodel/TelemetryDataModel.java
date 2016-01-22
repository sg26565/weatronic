
package de.treichels.wea.bat64.gen.telemetrydatamodel;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.gen.telemetrydatamodel.rxaccucapacity.RxAccuCapacity;
import de.treichels.wea.bat64.xml.Element;

public class TelemetryDataModel
    extends ConfigElement
{

    @Element(name = "RxAccuCapacity")
    private RxAccuCapacity rxAccuCapacity;

    public RxAccuCapacity getRxAccuCapacity() {
        return rxAccuCapacity;
    }

    public void setRxAccuCapacity(final RxAccuCapacity rxAccuCapacity) {
        this.rxAccuCapacity = rxAccuCapacity;
    }

}
