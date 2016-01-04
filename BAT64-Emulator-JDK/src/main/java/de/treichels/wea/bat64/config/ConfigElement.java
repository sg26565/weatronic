package de.treichels.wea.bat64.config;

import java.util.SortedMap;
import java.util.TreeMap;

import org.simpleframework.xml.Attribute;

import de.treichels.wea.bat64.config.bluetooth.BluetoothConfig;
import de.treichels.wea.bat64.config.controlsurfaces.ControlSurface;
import de.treichels.wea.bat64.config.controlsurfaces.ControlSurfacesConfig;
import de.treichels.wea.bat64.config.controlsurfaces.ControlSurfacesConfigs;
import de.treichels.wea.bat64.config.curve.Curve;
import de.treichels.wea.bat64.config.flightmode.ControlSwitch;
import de.treichels.wea.bat64.config.flightmode.FMControlAssign;
import de.treichels.wea.bat64.config.flightmode.FlightMode;
import de.treichels.wea.bat64.config.function.FlexConfig;
import de.treichels.wea.bat64.config.function.Function;
import de.treichels.wea.bat64.config.function.FunctionSetup;
import de.treichels.wea.bat64.config.function.Servo;
import de.treichels.wea.bat64.config.homescreen.HomeScreenAdjustment;
import de.treichels.wea.bat64.config.limiter.Limiter;
import de.treichels.wea.bat64.config.mixer.Mixer;
import de.treichels.wea.bat64.config.mixer.MixerSetup;
import de.treichels.wea.bat64.config.model.ModelConfig;
import de.treichels.wea.bat64.config.receiver.BindingConfig;
import de.treichels.wea.bat64.config.receiver.Receiver;
import de.treichels.wea.bat64.config.receiver.Receivers;
import de.treichels.wea.bat64.config.receiver.RxConfig;
import de.treichels.wea.bat64.config.rotary.RotarySetup;
import de.treichels.wea.bat64.config.rotary.RotarySetupSingle;
import de.treichels.wea.bat64.config.rotary.RotaryValueInfoSingle;
import de.treichels.wea.bat64.config.sequencer.Sequencer;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.EmptyValue;
import de.treichels.wea.bat64.config.value.IntValue;
import de.treichels.wea.bat64.config.value.LongValue;
import de.treichels.wea.bat64.config.value.PercentValue;
import de.treichels.wea.bat64.config.value.ShortValue;
import de.treichels.wea.bat64.config.value.StringValue;
import de.treichels.wea.bat64.config.vario.ClimbRate;
import de.treichels.wea.bat64.config.vario.ConfigLinkVario;
import de.treichels.wea.bat64.config.vario.Sensor;

public abstract class ConfigElement {
	public static SortedMap<Integer, Class<? extends ConfigElement>> TYPE_INFO_CACHE = new TreeMap<Integer, Class<? extends ConfigElement>>();
	public static SortedMap<String, Class<? extends ConfigElement>> CONTAINER_NAME_CACHE = new TreeMap<String, Class<? extends ConfigElement>>();

	static {
		TYPE_INFO_CACHE.put(0, EmptyValue.class);
		TYPE_INFO_CACHE.put(6, ConfigList.class);
		TYPE_INFO_CACHE.put(7, BindingConfig.class);
		TYPE_INFO_CACHE.put(9, ControlSurface.class);
		TYPE_INFO_CACHE.put(10, ControlSurfacesConfig.class);
		TYPE_INFO_CACHE.put(11, ControlSurfacesConfigs.class);
		TYPE_INFO_CACHE.put(12, ControlSwitch.class);
		TYPE_INFO_CACHE.put(13, Curve.class);
		TYPE_INFO_CACHE.put(14, FlightMode.class);
		TYPE_INFO_CACHE.put(15, FMControlAssign.class);
		TYPE_INFO_CACHE.put(17, Function.class);
		TYPE_INFO_CACHE.put(18, Servo.class);
		TYPE_INFO_CACHE.put(19, FunctionSetup.class);
		TYPE_INFO_CACHE.put(27, Limiter.class);
		TYPE_INFO_CACHE.put(29, Mixer.class);
		TYPE_INFO_CACHE.put(30, MixerSetup.class);
		TYPE_INFO_CACHE.put(31, ModelConfig.class);
		TYPE_INFO_CACHE.put(35, RotarySetup.class);
		TYPE_INFO_CACHE.put(36, RxConfig.class);
		TYPE_INFO_CACHE.put(40, Sequencer.class);
		TYPE_INFO_CACHE.put(42, RotarySetupSingle.class);
		TYPE_INFO_CACHE.put(44, PercentValue.class);
		TYPE_INFO_CACHE.put(47, StringValue.class);
		TYPE_INFO_CACHE.put(48, HomeScreenAdjustment.class);
		TYPE_INFO_CACHE.put(51, FlexConfig.class);
		TYPE_INFO_CACHE.put(52, ByteValue.class);
		TYPE_INFO_CACHE.put(53, ShortValue.class);
		TYPE_INFO_CACHE.put(54, IntValue.class);
		TYPE_INFO_CACHE.put(55, LongValue.class);
		TYPE_INFO_CACHE.put(70, RotaryValueInfoSingle.class);
		TYPE_INFO_CACHE.put(72, ConfigLinkVario.class);
		TYPE_INFO_CACHE.put(83, BluetoothConfig.class);

		CONTAINER_NAME_CACHE.put("Rxs", Receivers.class);
		CONTAINER_NAME_CACHE.put("Rx", Receiver.class);
		CONTAINER_NAME_CACHE.put("Sensor", Sensor.class);
		CONTAINER_NAME_CACHE.put("ClimbRates", ClimbRate.class);
	}

	public static final String TYPEINFO = "typeinfo";

	public static Class<? extends ConfigElement> getClassFor(final int typeinfo) {
		return TYPE_INFO_CACHE.get(typeinfo);
	}

	public static Class<? extends ConfigElement> getClassFor(final String container) {
		return CONTAINER_NAME_CACHE.get(container);
	}

	@Attribute
	public final int typeinfo;

	public ConfigElement(final int typeinfo) {
		this.typeinfo = typeinfo;

		if (typeinfo != 32) {
			final Class<?> expected = TYPE_INFO_CACHE.get(typeinfo);
			if (expected == null) {
				System.err.printf("no type info for %d\n", typeinfo);
			} else if (!expected.equals(getClass())) {
				System.err.printf("expected class %s does not match actual class %s\n", expected, getClass());
			}
		}
	}
}
