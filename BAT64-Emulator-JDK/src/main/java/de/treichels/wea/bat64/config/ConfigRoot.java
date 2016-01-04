package de.treichels.wea.bat64.config;

import java.io.File;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Default;
import org.simpleframework.xml.Root;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;
import org.simpleframework.xml.stream.Format;
import org.simpleframework.xml.stream.Style;
import org.simpleframework.xml.stream.Verbosity;

import de.treichels.wea.bat64.config.receiver.BindingConfig;

@Root(name = "root", strict = false)
@Default
public class ConfigRoot extends ConfigElement {
	public static void main(final String[] args) throws Exception {
		// final Serializer serializer = new Persister(new
		// AnnotationStrategy());
		// final Serializer serializer = new Persister(new MyStrategy());
		final String prolog = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
		final Style style = new MyStyle();
		final Format format = new Format(3, prolog, style, Verbosity.HIGH);
		final Serializer serializer = new Persister(format);
		for (final String arg : args) {
			final File file = new File(arg);

			if (file.exists()) {
				final ConfigRoot root = serializer.read(ConfigRoot.class, file);

				System.out.println(root.BindingConfig.Rxs.values);

				serializer.write(root, System.out);
			}
		}
	}

	// public BluetoothConfig BTConfig;
	public BindingConfig BindingConfig;
	// public ConfigLinkVario ConfigLVario;
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

	public ConfigRoot(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
