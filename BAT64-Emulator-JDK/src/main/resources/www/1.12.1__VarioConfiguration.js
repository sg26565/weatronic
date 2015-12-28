



var g_content = "SoundConfig";
var g_List_PopupListObj = [];

initPage();

function initPage(){
	initScrollbars('List_Container');
	$('#Soft_Shutdown').bind('click', function(){shutDown();});


	$('#Vario_Config_Sound_Label').bind('click', function(){toggleContent("SoundConfig");});
	$('#Vario_Config_Sensors_Label').bind('click', function(){toggleContent("Sensors");});


	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "LVFrequency");
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "LVClimbrate");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "LogRate");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "LVToneDutyCycle");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "LVSensorSpeed");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "LVSensorMotor");
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);
	GetTd(getVarioObject(), g_SetEvent, "get");



	
	g_telemetry_LVClimbrate = 5510;
	telemtryLVClimbrate = new Object();
 	telemtryLVClimbrate.ID = g_telemetry_LVClimbrate;
 	telemtryLVClimbrate.Value = 0;
 	telemtryLVClimbrate.ValueStr = "";

	
	g_telemetry_LVAltitude = 9604;
	telemtryLVAltitude = new Object();
 	telemtryLVAltitude.ID = g_telemetry_LVAltitude;
 	telemtryLVAltitude.Value = 0;
 	telemtryLVAltitude.ValueStr = "";

	telemetryIds.push(telemtryLVClimbrate, telemtryLVAltitude);


	setInterval(JsonFunction, 250);
}



function getVarioObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	sound = new Object();

	toneRates = new Object();
	toneRates.Index = -1;
	toneRates.Name = "";
	toneRatesList = new Array(toneRates);
	sound.ToneRates = toneRatesList;

	climbRates = new Object();
	climbRates.Rate = "";
	climbRates.Frequency = "";
	climbRatesList = new Array(climbRates);
	sound.ClimbRates = climbRatesList;

	sensors = new Object ();

	input = new Object();
	input.Index = -1;
	input.Name = "";

	logFrequency = new Object();
	logFrequency.Index = -1;
	logFrequency.Name = "";

	sensorType = new Object();
	sensorType.Index = -1;
	sensorType.Name = "";

	sensor = new Object();

	sensor.Input = input;
	sensor.Item = "";
	sensor.LogFrequency = logFrequency;
	sensor.SensorType = sensorType;
	sensorList = new Array(sensor);
	sensors.Sensor = sensorList;

	motor = new Object();
	motor.Input = "";
	motor.Item = new Array();
	logFrequencyList = new Array (logFrequency);
	motor.LogFrequency = logFrequencyList;
	motor.SensorType = sensorType;
	sensors.Motor = motor;

	InitDataPostArgsExtended["get"] = {};
	InitDataPostArgsExtended["get"]["model-settings"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["ConfigLVario"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["ConfigLVario"]["Sound"] = sound;
	InitDataPostArgsExtended["get"]["model-settings"]["ConfigLVario"]["Sensors"] = sensors;

	return InitDataPostArgsExtended;
}



function onEVENT_INIT(e){
	try{
		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);
		g_numpadLimitObj = e.EventData.NumPadLimits;
		g_List_PopupListObj["LogRate"] = e.EventData.PopUp.LogRate;
		g_List_PopupListObj["LVToneDutyCycle"] = e.EventData.PopUp.LVToneDutyCycle;
		g_List_PopupListObj["LVSensorSpeed"]   = e.EventData.PopUp.LVSensorSpeed;
		g_List_PopupListObj["LVSensorMotor"]   = e.EventData.PopUp.LVSensorMotor;
		var sensor = new Array();

		for(var i = 1; i < sensor.length; i++){

		}

		$('#Vario__0_Rate').bind("click", function(){showNumpad("Vario__0_Rate", "LVClimbrate");});
		$('#Vario__1_Rate').bind("click", function(){showNumpad("Vario__1_Rate", "LVClimbrate");});
		$('#Vario__2_Rate').bind("click", function(){showNumpad("Vario__2_Rate", "LVClimbrate");});
		$('#Vario__3_Rate').bind("click", function(){showNumpad("Vario__3_Rate", "LVClimbrate");});

		$('#Vario__0_Frequency').bind("click", function(){showNumpad("Vario__0_Frequency", "LVFrequency");});
		$('#Vario__1_Frequency').bind("click", function(){showNumpad("Vario__1_Frequency", "LVFrequency");});
		$('#Vario__2_Frequency').bind("click", function(){showNumpad("Vario__2_Frequency", "LVFrequency");});
		$('#Vario__3_Frequency').bind("click", function(){showNumpad("Vario__3_Frequency", "LVFrequency");});

		toggleContent(g_content);
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "telemetry"){
		if(key == g_telemetry_LVClimbrate){
			setHTML("Vario_Climbrate_Value", valueStr);
		}

		if(key == g_telemetry_LVAltitude){
			setHTML("Vario_Height_Value", valueStr);
		}
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "get"){
			handleGET(e.EventData.get);
		}




	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}



function handleGET(TdJson){
	climbRates = TdJson.ConfigLVario.Sound.ClimbRates;

	for(var i = 0; i < climbRates.length; i++){
		setHTML("Vario__" + i + "_Rate", climbRates[i].Rate);
		setHTML("Vario__" + i + "_Frequency", climbRates[i].Frequency);
	}

	toneRates = TdJson.ConfigLVario.Sound.ToneRates;

	for(var i = 0; i < toneRates.length; i++){
		setHTML("Vario__" + i + "_ToneRate", toneRates[i].Name);

		g_popupList_Indices["Vario__" + i + "ToneRate"] = toneRates[i].Index;
		$("#Vario__" + i + "_ToneRate").bind("click", function(){showPopupList(this, g_List_PopupListObj["LVToneDutyCycle"], false, true, g_popupList_Indices);});
	}

	sensors = TdJson.ConfigLVario.Sensors;

	setHTML('VarioConfiguration__m0_Input', sensors.Motor.Input);
	setHTML('VarioConfiguration__m1_Input', sensors.Motor.Input);
	setHTML('VarioConfiguration__m2_Input', sensors.Motor.Input);
	setHTML('VarioConfiguration__m0_Item', sensors.Motor.Item[0]);
	setHTML('VarioConfiguration__m1_Item', sensors.Motor.Item[1]);
	setHTML('VarioConfiguration__m2_Item', sensors.Motor.Item[2]);
	setHTML('VarioConfiguration__m_Sensor', sensors.Motor.SensorType.Name);
	setHTML('VarioConfiguration__m0_Logging', sensors.Motor.LogFrequency[0].Name);
	setHTML('VarioConfiguration__m1_Logging', sensors.Motor.LogFrequency[1].Name);
	setHTML('VarioConfiguration__m2_Logging', sensors.Motor.LogFrequency[2].Name);

	g_popupList_Indices["VarioConfiguration__m_Sensor"] = sensors.Motor.SensorType.Index;
	$("#VarioConfiguration__m_Sensor").bind("click", function(){showPopupList(this, g_List_PopupListObj["LVSensorMotor"], false, true, g_popupList_Indices);});

	g_popupList_Indices["VarioConfiguration__m1_Logging"] = sensors.Motor.LogFrequency[0].Index;
	$("#VarioConfiguration__m0_Logging").bind("click", function(){showPopupList(this, g_List_PopupListObj["LogRate"], false, true, g_popupList_Indices);});
	g_popupList_Indices["VarioConfiguration__m2_Logging"] = sensors.Motor.LogFrequency[1].Index;
	$("#VarioConfiguration__m1_Logging").bind("click", function(){showPopupList(this, g_List_PopupListObj["LogRate"], false, true, g_popupList_Indices);});
	g_popupList_Indices["VarioConfiguration__m3_Logging"] = sensors.Motor.LogFrequency[2].Index;
	$("#VarioConfiguration__m2_Logging").bind("click", function(){showPopupList(this, g_List_PopupListObj["LogRate"], false, true, g_popupList_Indices);});

	for(var i = 0; i < sensors.Sensor.length; i++){
		setHTML('VarioConfiguration__' + sensors.Sensor[i].Input.Index  + '_Input', sensors.Sensor[i].Input.Name);
		setHTML('VarioConfiguration__' + sensors.Sensor[i].Input.Index  + '_Item', sensors.Sensor[i].Item);
		setHTML('VarioConfiguration__' + sensors.Sensor[i].Input.Index  + '_Sensor', sensors.Sensor[i].SensorType.Name);
		setHTML('VarioConfiguration__' + sensors.Sensor[i].Input.Index  + '_Logging',  sensors.Sensor[i].LogFrequency.Name);

		g_popupList_Indices["VarioConfiguration__" + sensors.Sensor[i].Input.Index  + "_Logging"] = sensors.Sensor[i].LogFrequency.Index;
		$("#VarioConfiguration__" + sensors.Sensor[i].Input.Index  + "_Logging").bind("click", function(){showPopupList(this, g_List_PopupListObj["LogRate"], false, true, g_popupList_Indices);});

		if( sensors.Sensor[i].Input.Index == 1){
			g_popupList_Indices["VarioConfiguration__1_Sensor"] = sensors.Sensor[i].SensorType.Index;
			$("#VarioConfiguration__1_Sensor").bind("click", function(){showPopupList(this, g_List_PopupListObj["LVSensorSpeed"], false, true, g_popupList_Indices);});
		}
	}
}


function getAttrObj(index, tagId, value, completeTagId){
	Attribute = new Object();

	if(tagId == "ToneRate"){
		Attribute["ToneRates"] = {};
		Attribute["ToneRates"]["Index"] = parseInt(index);
		Attribute["ToneRates"]["Object"] = {};
		Attribute["ToneRates"]["Object"] = value;
	}
	else if(tagId == "Frequency" || tagId == "Rate"){
		Attribute["ClimbRates"] = {};
		Attribute["ClimbRates"]["Index"] = parseInt(index);
		Attribute["ClimbRates"]["Object"] = {};
		Attribute["ClimbRates"]["Object"][tagId] = value;
	}
	else if(completeTagId == "VarioConfiguration__m_Sensor"){
		Attribute["Motor"] = {};
		Attribute["Motor"]["SensorType"] = value;
	}
	else if(completeTagId == "VarioConfiguration__1_Sensor"){
		Attribute["Sensor"] = {};
		Attribute["Sensor"]["Index"] = parseInt(index);
		Attribute["Sensor"]["Object"] = {};
		Attribute["Sensor"]["Object"]["SensorType"] = value;
	}
	else if(tagId ==  "Logging"){
		if(index == "m0" || index == "m1" || index == "m2"){
			Attribute["Motor"] = {};
			Attribute["Motor"]["LogFrequency"] = {};
			Attribute["Motor"]["LogFrequency"]["Index"] = parseInt(index.substring(1,2));
			Attribute["Motor"]["LogFrequency"]["Object"] = value;
		}
		else{
			Attribute["Sensor"] = {};
			Attribute["Sensor"]["Index"] = parseInt(index);
			Attribute["Sensor"]["Object"] = {};
			Attribute["Sensor"]["Object"]["LogFrequency"] = value;
		}
	}

	return Attribute;
}


function submitSET(tagId, value){
	ModelName = "model-settings";

	ListType = "ConfigLVario";

	completeTagId = tagId;
	tagIdArray = tagId.split("__");
	cmd = "set";

	if(tagIdArray[0] == "Vario"){
		VarioConfig = "Sound";
	}
	else{
		VarioConfig = "Sensors";
	}

	tagIdArray = tagIdArray[1].split("_");
	Index = tagIdArray[0];
	tagId = tagIdArray[1];

	Attr = new Object();
	Attr = getAttrObj(Index, tagId, value, completeTagId);

	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType][VarioConfig] = {};
	xmlObj[cmd][ModelName][ListType][VarioConfig] = Attr;

	GetTd(xmlObj, g_SetEvent, cmd);
}


function toggleContent(content){
	hideHTML('Vario_Configuration_' + g_content);
	hideHTML('Vario_Configuraton_' + g_content + '_Header');
	showHTML('Vario_Configuration_' + content);
	showHTML('Vario_Configuraton_' + content + '_Header');

	$('#Button_' + g_content).removeClass("button_white").addClass("button_blue");
	$('#Button_' + content).removeClass("button_blue").addClass("button_white");

	g_content = content;
	ScrollRefresh();
}
