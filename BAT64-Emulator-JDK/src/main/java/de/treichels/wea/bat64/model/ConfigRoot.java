package de.treichels.wea.bat64.model;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map.Entry;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlRootElement;

import de.treichels.wea.bat64.model.bluetooth.BluetoothConfig;
import de.treichels.wea.bat64.model.controlsurfaces.ControlSurfaces;
import de.treichels.wea.bat64.model.controlsurfaces.ControlSurfacesConfigs;
import de.treichels.wea.bat64.model.curve.Curves;
import de.treichels.wea.bat64.model.flightmode.FMControlAssign;
import de.treichels.wea.bat64.model.flightmode.FlightModes;
import de.treichels.wea.bat64.model.function.Functions;
import de.treichels.wea.bat64.model.homescreen.HomeScreenAdjustment;
import de.treichels.wea.bat64.model.limiter.Limiters;
import de.treichels.wea.bat64.model.mixer.Mixers;
import de.treichels.wea.bat64.model.modelconfig.ModelConfig;
import de.treichels.wea.bat64.model.receiver.BindingConfig;
import de.treichels.wea.bat64.model.rotary.RotarySetup;
import de.treichels.wea.bat64.model.rotary.RotaryValueInfoSingles;
import de.treichels.wea.bat64.model.rxconfig.RxConfigs;
import de.treichels.wea.bat64.model.rxconfig.RxCurves;
import de.treichels.wea.bat64.model.sequencer.Sequencers;
import de.treichels.wea.bat64.model.value.EmptyValue;
import de.treichels.wea.bat64.model.value.StringValue;
import de.treichels.wea.bat64.model.vario.ConfigLinkVario;

@XmlRootElement(name = "root")
public class ConfigRoot extends Group {
	public static void main(final String[] args) throws JAXBException, FileNotFoundException, IOException {
		final JAXBContext ctx = JAXBContext.newInstance(ConfigRoot.class);
		final Unmarshaller unmarshaller = ctx.createUnmarshaller();
		final Marshaller marshaller = ctx.createMarshaller();
		marshaller.setProperty("jaxb.formatted.output", true);

		for (final String arg : args) {
			final File file = new File(arg);

			if (file.exists()) {
				ConfigRoot root;

				try (InputStream is = new FileInputStream(file)) {
					root = (ConfigRoot) unmarshaller.unmarshal(is);
				}

				final ByteArrayOutputStream baos = new ByteArrayOutputStream();
				// System.out.println(root.ConfigLVario.Sensors.Motor.Item.item0.value);

				marshaller.marshal(root, baos);

				System.out.println(baos.toString());

				for (final Entry<Integer, Class<? extends ConfigElement>> entry : ConfigElement.TYPE_CACHE.entrySet()) {
					System.out.printf("%d: %s\n", entry.getKey(), entry.getValue().getName());
				}
			}
		}
	}

	public BluetoothConfig BTConfig;
	public BindingConfig BindingConfig;
	public ConfigLinkVario ConfigLVario;
	public ControlSurfaces ControlSurfaces;
	public ControlSurfacesConfigs ControlSurfacesConfig;
	public Curves Curves;
	public FMControlAssign FMControlAssign;
	public FlightModes FlightModes;
	public StringValue FreeServoGroupsUser;
	public Functions Functions;
	public EmptyValue Gyros;
	public HomeScreenAdjustment HomeScreenAdjustment;
	public Limiters Limiters;
	public Mixers Mixers;
	public ModelConfig ModelConfig;
	public RotarySetup RotarySetup;
	public RotaryValueInfoSingles RotaryValueInfoSingles;
	public RxConfigs RxConfigs;
	public RxCurves RxCurves;
	public Sequencers Sequencers;
}
