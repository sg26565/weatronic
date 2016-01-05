package de.treichels.wea.bat64.config;

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

import de.treichels.wea.bat64.config.bluetooth.BluetoothConfig;
import de.treichels.wea.bat64.config.receiver.BindingConfig;
import de.treichels.wea.bat64.config.vario.ConfigLinkVario;

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

				System.out.println(root.BindingConfig.receivers.items.get(0).Serial);

				final ByteArrayOutputStream baos = new ByteArrayOutputStream();
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
	// public ControlSurfaces ControlSurfaces;
	// public ControlSurfacesConfigs ControlSurfacesConfig;
	// public Curves Curves;
	// public FMControlAssign FMControlAssign;
	// public FlightModes FlightModes;
	// public StringValue FreeServoGroupsUser;
	// public Functions Functions;
	// public EmptyValue Gyros;
	// public HomeScreenAdjustment HomeScreenAdjustment;
	// public Limiters Limiters;
	// public Mixers Mixers;
	// public ModelConfig ModelConfig;
	// public RotarySetup RotarySetup;
	// public RotaryValueInfoSingles RotaryValueInfoSingles;
	// public RxConfigs RxConfigs;
	// public RxCurves RxCurves;
	// public Sequencers Sequencers;
}
