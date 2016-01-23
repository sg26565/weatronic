
package de.treichels.wea.bat64.gen;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.ConfigGroupList;
import de.treichels.wea.bat64.config.ConfigList;
import de.treichels.wea.bat64.config.ConfigValue;
import de.treichels.wea.bat64.gen.bindingconfig.BindingConfig;
import de.treichels.wea.bat64.gen.btconfig.BTConfig;
import de.treichels.wea.bat64.gen.configlvario.ConfigLVario;
import de.treichels.wea.bat64.gen.configteacherstudent.ConfigTeacherStudent;
import de.treichels.wea.bat64.gen.controlsurfaces.ControlSurface;
import de.treichels.wea.bat64.gen.controlsurfacesconfig.ControlSurfacesConfig;
import de.treichels.wea.bat64.gen.curves.Curve;
import de.treichels.wea.bat64.gen.flightmodes.FlightMode;
import de.treichels.wea.bat64.gen.fmcontrolassign.FMControlAssign;
import de.treichels.wea.bat64.gen.functions.Function;
import de.treichels.wea.bat64.gen.gyros.Gyros;
import de.treichels.wea.bat64.gen.gyrosetups.GyroSetups;
import de.treichels.wea.bat64.gen.homescreenadjustment.HomeScreenAdjustment;
import de.treichels.wea.bat64.gen.limiters.Limiter;
import de.treichels.wea.bat64.gen.mixers.Mixer;
import de.treichels.wea.bat64.gen.modelconfig.ModelConfig;
import de.treichels.wea.bat64.gen.rotarysetup.RotarySetup;
import de.treichels.wea.bat64.gen.rotaryvalueinfosingles.RotaryValueInfoSingle;
import de.treichels.wea.bat64.gen.rxconfigs.RxConfig;
import de.treichels.wea.bat64.gen.sequencers.Sequencer;
import de.treichels.wea.bat64.gen.serviceinfo.ServiceInfo;
import de.treichels.wea.bat64.gen.servoconfigs.ServoConfig;
import de.treichels.wea.bat64.gen.servosync.ServoSync;
import de.treichels.wea.bat64.gen.servosyncgroups.ServoSyncGroup;
import de.treichels.wea.bat64.gen.sortindeces.SortIndeces;
import de.treichels.wea.bat64.gen.soundmodes.SoundMode;
import de.treichels.wea.bat64.gen.startupwarnings.StartupWarnings;
import de.treichels.wea.bat64.gen.telemetrydatamodel.TelemetryDataModel;
import de.treichels.wea.bat64.gen.timers.Timer;
import de.treichels.wea.bat64.gen.vswitchs.VSwitch;
import de.treichels.wea.bat64.xml.Element;

public class Root
    extends ConfigGroup
{

    @Element(name = "BTConfig")
    private BTConfig bTConfig;
    @Element(name = "BindingConfig")
    private BindingConfig bindingConfig;
    @Element(name = "ConfigLVario")
    private ConfigLVario configLVario;
    @Element(name = "ConfigTeacherStudent")
    private ConfigTeacherStudent configTeacherStudent;
    @Element(name = "ControlSurfaces")
    private ConfigGroupList<ControlSurface> controlSurfaces;
    @Element(name = "ControlSurfacesConfig")
    private ControlSurfacesConfig controlSurfacesConfig;
    @Element(name = "Curves")
    private ConfigGroupList<Curve> curves;
    @Element(name = "FMControlAssign")
    private FMControlAssign fMControlAssign;
    @Element(name = "FlightModes")
    private ConfigGroupList<FlightMode> flightModes;
    @Element(name = "FreeServoGroupsUser")
    private ConfigList<Integer> freeServoGroupsUser;
    @Element(name = "Functions")
    private ConfigGroupList<Function> functions;
    @Element(name = "GyroSetups")
    private GyroSetups gyroSetups;
    @Element(name = "Gyros")
    private Gyros gyros;
    @Element(name = "HomeScreenAdjustment")
    private HomeScreenAdjustment homeScreenAdjustment;
    @Element(name = "Limiters")
    private ConfigGroupList<Limiter> limiters;
    @Element(name = "Mixers")
    private ConfigGroupList<Mixer> mixers;
    @Element(name = "ModelConfig")
    private ModelConfig modelConfig;
    @Element(name = "RotarySetup")
    private RotarySetup rotarySetup;
    @Element(name = "RotaryValueInfoSingles")
    private ConfigGroupList<RotaryValueInfoSingle> rotaryValueInfoSingles;
    @Element(name = "RxConfigs")
    private ConfigGroupList<RxConfig> rxConfigs;
    @Element(name = "RxCurves")
    private ConfigGroupList<Curve> rxCurves;
    @Element(name = "Sequencers")
    private ConfigGroupList<Sequencer> sequencers;
    @Element(name = "ServiceInfo")
    private ServiceInfo serviceInfo;
    @Element(name = "ServoConfigs")
    private ConfigGroupList<ServoConfig> servoConfigs;
    @Element(name = "ServoSync")
    private ServoSync servoSync;
    @Element(name = "ServoSyncGroups")
    private ConfigGroupList<ServoSyncGroup> servoSyncGroups;
    @Element(name = "SortIndeces")
    private SortIndeces sortIndeces;
    @Element(name = "SoundModes")
    private ConfigGroupList<SoundMode> soundModes;
    @Element(name = "StartupWarnings")
    private StartupWarnings startupWarnings;
    @Element(name = "TelemetryDataModel")
    private TelemetryDataModel telemetryDataModel;
    @Element(name = "TelemetryScreenAdjustments")
    private ConfigGroupList<HomeScreenAdjustment> telemetryScreenAdjustments;
    @Element(name = "Timers")
    private ConfigGroupList<Timer> timers;
    @Element(name = "VSwitchs")
    private ConfigGroupList<VSwitch> vSwitchs;
    @Element(name = "Version")
    private ConfigValue<Integer> version;

    public BTConfig getBTConfig() {
        return bTConfig;
    }

    public void setBTConfig(final BTConfig bTConfig) {
        this.bTConfig = bTConfig;
    }

    public BindingConfig getBindingConfig() {
        return bindingConfig;
    }

    public void setBindingConfig(final BindingConfig bindingConfig) {
        this.bindingConfig = bindingConfig;
    }

    public ConfigLVario getConfigLVario() {
        return configLVario;
    }

    public void setConfigLVario(final ConfigLVario configLVario) {
        this.configLVario = configLVario;
    }

    public ConfigTeacherStudent getConfigTeacherStudent() {
        return configTeacherStudent;
    }

    public void setConfigTeacherStudent(final ConfigTeacherStudent configTeacherStudent) {
        this.configTeacherStudent = configTeacherStudent;
    }

    public ConfigGroupList<ControlSurface> getControlSurfaces() {
        return controlSurfaces;
    }

    public void setControlSurfaces(final ConfigGroupList<ControlSurface> controlSurfaces) {
        this.controlSurfaces = controlSurfaces;
    }

    public ControlSurfacesConfig getControlSurfacesConfig() {
        return controlSurfacesConfig;
    }

    public void setControlSurfacesConfig(final ControlSurfacesConfig controlSurfacesConfig) {
        this.controlSurfacesConfig = controlSurfacesConfig;
    }

    public ConfigGroupList<Curve> getCurves() {
        return curves;
    }

    public void setCurves(final ConfigGroupList<Curve> curves) {
        this.curves = curves;
    }

    public FMControlAssign getFMControlAssign() {
        return fMControlAssign;
    }

    public void setFMControlAssign(final FMControlAssign fMControlAssign) {
        this.fMControlAssign = fMControlAssign;
    }

    public ConfigGroupList<FlightMode> getFlightModes() {
        return flightModes;
    }

    public void setFlightModes(final ConfigGroupList<FlightMode> flightModes) {
        this.flightModes = flightModes;
    }

    public ConfigList<Integer> getFreeServoGroupsUser() {
        return freeServoGroupsUser;
    }

    public void setFreeServoGroupsUser(final ConfigList<Integer> freeServoGroupsUser) {
        this.freeServoGroupsUser = freeServoGroupsUser;
    }

    public ConfigGroupList<Function> getFunctions() {
        return functions;
    }

    public void setFunctions(final ConfigGroupList<Function> functions) {
        this.functions = functions;
    }

    public GyroSetups getGyroSetups() {
        return gyroSetups;
    }

    public void setGyroSetups(final GyroSetups gyroSetups) {
        this.gyroSetups = gyroSetups;
    }

    public Gyros getGyros() {
        return gyros;
    }

    public void setGyros(final Gyros gyros) {
        this.gyros = gyros;
    }

    public HomeScreenAdjustment getHomeScreenAdjustment() {
        return homeScreenAdjustment;
    }

    public void setHomeScreenAdjustment(final HomeScreenAdjustment homeScreenAdjustment) {
        this.homeScreenAdjustment = homeScreenAdjustment;
    }

    public ConfigGroupList<Limiter> getLimiters() {
        return limiters;
    }

    public void setLimiters(final ConfigGroupList<Limiter> limiters) {
        this.limiters = limiters;
    }

    public ConfigGroupList<Mixer> getMixers() {
        return mixers;
    }

    public void setMixers(final ConfigGroupList<Mixer> mixers) {
        this.mixers = mixers;
    }

    public ModelConfig getModelConfig() {
        return modelConfig;
    }

    public void setModelConfig(final ModelConfig modelConfig) {
        this.modelConfig = modelConfig;
    }

    public RotarySetup getRotarySetup() {
        return rotarySetup;
    }

    public void setRotarySetup(final RotarySetup rotarySetup) {
        this.rotarySetup = rotarySetup;
    }

    public ConfigGroupList<RotaryValueInfoSingle> getRotaryValueInfoSingles() {
        return rotaryValueInfoSingles;
    }

    public void setRotaryValueInfoSingles(final ConfigGroupList<RotaryValueInfoSingle> rotaryValueInfoSingles) {
        this.rotaryValueInfoSingles = rotaryValueInfoSingles;
    }

    public ConfigGroupList<RxConfig> getRxConfigs() {
        return rxConfigs;
    }

    public void setRxConfigs(final ConfigGroupList<RxConfig> rxConfigs) {
        this.rxConfigs = rxConfigs;
    }

    public ConfigGroupList<Curve> getRxCurves() {
        return rxCurves;
    }

    public void setRxCurves(final ConfigGroupList<Curve> rxCurves) {
        this.rxCurves = rxCurves;
    }

    public ConfigGroupList<Sequencer> getSequencers() {
        return sequencers;
    }

    public void setSequencers(final ConfigGroupList<Sequencer> sequencers) {
        this.sequencers = sequencers;
    }

    public ServiceInfo getServiceInfo() {
        return serviceInfo;
    }

    public void setServiceInfo(final ServiceInfo serviceInfo) {
        this.serviceInfo = serviceInfo;
    }

    public ConfigGroupList<ServoConfig> getServoConfigs() {
        return servoConfigs;
    }

    public void setServoConfigs(final ConfigGroupList<ServoConfig> servoConfigs) {
        this.servoConfigs = servoConfigs;
    }

    public ServoSync getServoSync() {
        return servoSync;
    }

    public void setServoSync(final ServoSync servoSync) {
        this.servoSync = servoSync;
    }

    public ConfigGroupList<ServoSyncGroup> getServoSyncGroups() {
        return servoSyncGroups;
    }

    public void setServoSyncGroups(final ConfigGroupList<ServoSyncGroup> servoSyncGroups) {
        this.servoSyncGroups = servoSyncGroups;
    }

    public SortIndeces getSortIndeces() {
        return sortIndeces;
    }

    public void setSortIndeces(final SortIndeces sortIndeces) {
        this.sortIndeces = sortIndeces;
    }

    public ConfigGroupList<SoundMode> getSoundModes() {
        return soundModes;
    }

    public void setSoundModes(final ConfigGroupList<SoundMode> soundModes) {
        this.soundModes = soundModes;
    }

    public StartupWarnings getStartupWarnings() {
        return startupWarnings;
    }

    public void setStartupWarnings(final StartupWarnings startupWarnings) {
        this.startupWarnings = startupWarnings;
    }

    public TelemetryDataModel getTelemetryDataModel() {
        return telemetryDataModel;
    }

    public void setTelemetryDataModel(final TelemetryDataModel telemetryDataModel) {
        this.telemetryDataModel = telemetryDataModel;
    }

    public ConfigGroupList<HomeScreenAdjustment> getTelemetryScreenAdjustments() {
        return telemetryScreenAdjustments;
    }

    public void setTelemetryScreenAdjustments(final ConfigGroupList<HomeScreenAdjustment> telemetryScreenAdjustments) {
        this.telemetryScreenAdjustments = telemetryScreenAdjustments;
    }

    public ConfigGroupList<Timer> getTimers() {
        return timers;
    }

    public void setTimers(final ConfigGroupList<Timer> timers) {
        this.timers = timers;
    }

    public ConfigGroupList<VSwitch> getVSwitchs() {
        return vSwitchs;
    }

    public void setVSwitchs(final ConfigGroupList<VSwitch> vSwitchs) {
        this.vSwitchs = vSwitchs;
    }

    public ConfigValue<Integer> getVersion() {
        return version;
    }

    public void setVersion(final ConfigValue<Integer> version) {
        this.version = version;
    }

}
