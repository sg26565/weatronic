


var g_controlIDBeep  = -1;
var g_controlIDVario = -1;
var g_controlIDVoice = -1;
var g_controlIDLight = -1;

var g_mainVolume  = "0px";
var g_voiceVolume = "0px";
var g_varioVolume = "0px";

initPage();

function initPage(){
	$('#Soft_Shutdown').bind('click', function(){shutDown();});



	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Brightness");
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Percent");
	GetTd(getNumPadLimitObj(InitDataPostArgs, "PercentFull"), g_InitEvent);
	GetTd(getGeneralSettingsObject(InitDataPostArgs), g_InitEvent, "get");


	g_isAdditionalControlObjectUsed = true;
	TdPostArgs = getCurrentGeneralSettingsObject(TdPostArgs);
	setInterval(JsonFunction, 250);
}



function getGeneralSettingsObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	volumeBeep = new Object();
	volumeBeep.Hi = "";
	volumeBeep.Center = "";
	volumeBeep.Lo = "";
	volumeBeep.ControlID = g_controlIDBeep;

	volumeVario = new Object();
	volumeVario.Hi = "";
	volumeVario.Center = "";
	volumeVario.Lo = "";
	volumeVario.ControlID = g_controlIDVario;

	volumeVoice = new Object();
	volumeVoice.Hi = "";
	volumeVoice.Center = "";
	volumeVoice.Lo = "";
	volumeVoice.ControlID = g_controlIDVoice;

	brightness = new Object();
	brightness.Hi = "";
	brightness.Center = "";
	brightness.Lo = "";
	brightness.ControlID = g_controlIDLight;

	InitDataPostArgs["get"] = {};
	InitDataPostArgs["get"]["general-settings"] = {};
	InitDataPostArgs["get"]["general-settings"]["GeneralSettingsTRX"] = {};
	InitDataPostArgs["get"]["general-settings"]["GeneralSettingsTRX"]["VolumeBeep"] = volumeBeep;
	InitDataPostArgs["get"]["general-settings"]["GeneralSettingsTRX"]["VolumeVario"] = volumeVario;
	InitDataPostArgs["get"]["general-settings"]["GeneralSoundConfig"] = {};
	InitDataPostArgs["get"]["general-settings"]["GeneralSoundConfig"]["VolumeVoice"] = volumeVoice;
	InitDataPostArgs["get"]["general-settings"]["Brightness"] = brightness;

	return InitDataPostArgs;
}

function getCurrentGeneralSettingsObject(TdPostArgs){
	if(typeof TdPostArgs == "undefined"){
		TdPostArgs = new Object();
	}

	volumeBeep = new Object();
	volumeBeep.Current = "";

	volumeVario = new Object();
	volumeVario.Current = "";

	volumeVoice = new Object();
	volumeVoice.Current = "";

	brightness = new Object();
	brightness.Current = "";

	TdPostArgs["general-settings"] = {};
	TdPostArgs["general-settings"]["GeneralSettingsTRX"] = {};
	TdPostArgs["general-settings"]["GeneralSettingsTRX"]["VolumeBeep"] = volumeBeep;
	TdPostArgs["general-settings"]["GeneralSettingsTRX"]["VolumeVario"] = volumeVario;
	TdPostArgs["general-settings"]["GeneralSoundConfig"] = {};
	TdPostArgs["general-settings"]["GeneralSoundConfig"]["VolumeVoice"] = volumeVoice;
	TdPostArgs["general-settings"]["Brightness"] = brightness;

	return TdPostArgs;
}



function onEVENT_INIT(e){
	try{
		if(e.cmd=="get"){
			setHTML('General_Volume_High_Value',   e.EventData.get.GeneralSettingsTRX.VolumeBeep.Hi);
			setHTML('General_Volume_Center_Value', e.EventData.get.GeneralSettingsTRX.VolumeBeep.Center);
			setHTML('General_Volume_Low_Value',    e.EventData.get.GeneralSettingsTRX.VolumeBeep.Lo);

			setHTML('Vario_Offset_High_Value',   e.EventData.get.GeneralSettingsTRX.VolumeVario.Hi);
			setHTML('Vario_Offset_Center_Value', e.EventData.get.GeneralSettingsTRX.VolumeVario.Center);
			setHTML('Vario_Offset_Low_Value',    e.EventData.get.GeneralSettingsTRX.VolumeVario.Lo);

			setHTML('Voice_Offset_High_Value',   e.EventData.get.GeneralSoundConfig.VolumeVoice.Hi);
			setHTML('Voice_Offset_Center_Value', e.EventData.get.GeneralSoundConfig.VolumeVoice.Center);
			setHTML('Voice_Offset_Low_Value',    e.EventData.get.GeneralSoundConfig.VolumeVoice.Lo);

			setHTML('Display_Brightness_High_Value',   e.EventData.get.Brightness.Hi);
			setHTML('Display_Brightness_Center_Value', e.EventData.get.Brightness.Center);
			setHTML('Display_Brightness_Low_Value',    e.EventData.get.Brightness.Lo);

			g_controlIDBeep  = e.EventData.get.GeneralSettingsTRX.VolumeBeep.ControlID;
			g_controlIDVario = e.EventData.get.GeneralSettingsTRX.VolumeVario.ControlID;
			g_controlIDVoice = e.EventData.get.GeneralSoundConfig.VolumeVoice.ControlID;
			g_controlIDLight = e.EventData.get.Brightness.ControlID;

			control2image('General_Volume_Control', g_controlIDBeep);
			control2image('Vario_Offset_Control', g_controlIDVario);
			control2image('Voice_Offset_Control', g_controlIDVoice);
			control2image('Display_Brightness_Control', g_controlIDLight);

			
			$('#General_Volume_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
					"?LastURL=" + location.href +
					"&ControlPath=" + getControlAssignmentPathBeepVario("ControlID", g_controlIDBeep, "VolumeBeep") +
					"&ControlId=" + g_controlIDBeep +
					"&ControlNode=ControlID" +
					"&PageId=1" +
					"&FromName=" + 'Hauptlautstärke';
			});

			$('#Vario_Offset_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
					"?LastURL=" + location.href +
					"&ControlPath=" + getControlAssignmentPathBeepVario("ControlID", g_controlIDVario, "VolumeVario") +
					"&ControlId=" + g_controlIDVario +
					"&ControlNode=ControlID" +
					"&PageId=1" +
					"&FromName=" + 'Vario-Offset';
			});

			$('#Voice_Offset_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
					"?LastURL=" + location.href +
					"&ControlPath=" + getControlAssignmentPathVoice("ControlID", g_controlIDVario, "VolumeVoice") +
					"&ControlId=" + g_controlIDVoice +
					"&ControlNode=ControlID" +
					"&PageId=1" +
					"&FromName=" + 'Sprach-Offset';
			});

			$('#Display_Brightness_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
					"?LastURL=" + location.href +
					"&ControlPath=" + getControlAssignmentPathLight("ControlID", g_controlIDLight, "Brightness") +
					"&ControlId=" + g_controlIDLight +
					"&ControlNode=ControlID" +
					"&PageId=1" +
					"&FromName=Brightness";
			});

			$('#General_Volume_High_Value').bind("click", function(){showNumpad("General_Volume_High_Value", "Percent");});
			$('#General_Volume_Center_Value').bind("click", function(){showNumpad("General_Volume_Center_Value", "Percent");});
			$('#General_Volume_Low_Value').bind("click", function(){showNumpad("General_Volume_Low_Value", "Percent");});

			$('#Vario_Offset_High_Value').bind("click", function(){showNumpad("Vario_Offset_High_Value", "PercentFull");});
			$('#Vario_Offset_Center_Value').bind("click", function(){showNumpad("Vario_Offset_Center_Value", "PercentFull");});
			$('#Vario_Offset_Low_Value').bind("click", function(){showNumpad("Vario_Offset_Low_Value", "PercentFull");});

			$('#Voice_Offset_High_Value').bind("click", function(){showNumpad("Voice_Offset_High_Value", "PercentFull");});
			$('#Voice_Offset_Center_Value').bind("click", function(){showNumpad("Voice_Offset_Center_Value", "PercentFull");});
			$('#Voice_Offset_Low_Value').bind("click", function(){showNumpad("Voice_Offset_Low_Value", "PercentFull");});

			$('#Display_Brightness_High_Value').bind("click", function(){showNumpad("Display_Brightness_High_Value", "Brightness");});
			$('#Display_Brightness_Center_Value').bind("click", function(){showNumpad("Display_Brightness_Center_Value", "Brightness");});
			$('#Display_Brightness_Low_Value').bind("click", function(){showNumpad("Display_Brightness_Low_Value", "Brightness");});

			controlBeep = new Object();
			controlBeep.ID = g_controlIDBeep;
			controlBeep.Value = 0;

			controlVario = new Object();
			controlVario.ID = g_controlIDVario;
			controlVario.Value = 0;

			controlVoice = new Object();
			controlVoice.ID = g_controlIDVoice;
			controlVoice.Value = 0;

			controlLight = new Object();
			controlLight.ID = g_controlIDLight;
			controlLight.Value = 0;

			controlIds.push(controlBeep, controlVario, controlVoice, controlLight);
		}
		else{
			g_numpadLimitObj = e.EventData.NumPadLimits;
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "control"){
		if((key == g_controlIDBeep) || (key == g_controlIDVario) || (key == g_controlIDVoice) || (key == g_controlIDLight)){
			var val = Value12Bit2Percent(value);

			if(key == g_controlIDBeep){
				tagID = 'General_Volume_';

				if(typeof BeepState == 'undefined'){
					BeepState = "Invalid";
				}

				BeepState = setControlAssignments(tagID, val, BeepState);
			}

			if(key == g_controlIDVario){
				tagID = 'Vario_Offset_';

				if(typeof VarioState == 'undefined'){
					VarioState = "Invalid";
				}

				VarioState = setControlAssignments(tagID, val, VarioState);
			}

			if(key == g_controlIDVoice){
				tagID = 'Voice_Offset_';

				if(typeof VoiceState == 'undefined'){
					VoiceState = "Invalid";
				}

				VoiceState = setControlAssignments(tagID, val, VoiceState);
			}

			if(key == g_controlIDLight){
				tagID = 'Display_Brightness_';

				if(typeof LightState == 'undefined'){
					LightState = "Invalid";
				}

				LightState = setControlAssignments(tagID, val, LightState);
			}
		}
	}

	if(cmd == "AdditionalControlObject"){
		
		if(typeof htmlObj_BeepEmptyValue == 'undefined'){
			htmlObj_BeepEmptyValue = document.getElementById('General_Volume_Empty_Value');
		}

		g_mainVolume = e["EventData"]["general-settings"]["GeneralSettingsTRX"]["VolumeBeep"]["Current"];
		htmlObj_BeepEmptyValue.innerHTML = g_mainVolume;

		if(typeof htmlObj_VarioEmptyValue == 'undefined'){
			htmlObj_VarioEmptyValue = document.getElementById('Vario_Offset_Empty_Value');
		}

		g_varioVolume = e["EventData"]["general-settings"]["GeneralSettingsTRX"]["VolumeVario"]["Current"];
		htmlObj_VarioEmptyValue.innerHTML = g_varioVolume;

		if(typeof htmlObj_VoiceEmptyValue == 'undefined'){
			htmlObj_VoiceEmptyValue = document.getElementById('Voice_Offset_Empty_Value');
		}

		g_voiceVolume = e["EventData"]["general-settings"]["GeneralSoundConfig"]["VolumeVoice"]["Current"];
		htmlObj_VoiceEmptyValue.innerHTML = g_voiceVolume;

		if(typeof htmlObj_LightEmptyValue == 'undefined'){
			htmlObj_LightEmptyValue = document.getElementById('Display_Brightness_Empty_Value');
		}

		htmlObj_LightEmptyValue.innerHTML = e["EventData"]["general-settings"]["Brightness"]["Current"];

		setCSS('General_Volume_Bar', 'width', g_mainVolume);
		setCSS('Vario_Offset_Bar', 'width', calculateVolume(g_mainVolume, g_varioVolume) + "%");
		setCSS('Voice_Offset_Bar', 'width', calculateVolume(g_mainVolume, g_voiceVolume) + "%");
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "get"){
			handleGET(e);
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}


function handleGET(TdJson){

}


function calculateVolume(main, offset){
	var caculateValue = parseFloat(splitUnitFromValue(g_mainVolume).value) + parseFloat(splitUnitFromValue(offset).value);

	if(caculateValue < 0){
		caculateValue = 0;
	}
	else if(caculateValue > 100){
		caculateValue = 100;
	}

	return caculateValue;
}


function getControlAssignmentPathBeepVario(controlNode, value, ListType){
	cmd = "set";
	TreeName = "general-settings";
	str = encodeURI('{"' + cmd + '":{"' + TreeName + '":{"GeneralSettingsTRX":{"' + ListType + '":{"' + controlNode + '":"' + value + '"}}}}}');

	return str;
}


function getControlAssignmentPathVoice(controlNode, value, ListType){
	cmd = "set";
	TreeName = "general-settings";
	str = encodeURI('{"' + cmd + '":{"' + TreeName + '":{"GeneralSoundConfig":{"' + ListType + '":{"' + controlNode + '":"' + value + '"}}}}}');

	return str;
}


function getControlAssignmentPathLight(controlNode, value, ListType){
	cmd = "set";
	TreeName = "general-settings";
	str = encodeURI('{"' + cmd + '":{"' + TreeName + '":{"' + ListType + '":{"' + controlNode + '":"' + value + '"}}}}');

	return str;
}


function getAttrObj(tagId, value){
	Attribute = new Object();

	if(tagId[2] == "High"){
		Attribute["Hi"] = value;

		return 	Attribute;
	}

	if(tagId[2] == "Center"){
		Attribute["Center"] = value;

		return Attribute;
	}

	if(tagId[2] == "Low"){
		Attribute["Lo"] = value;

		return Attribute;
	}

	return Attribute;
}


function submitSET(tagId, value){
	var xmlObj = new Object();
	tagId = tagId.split("_");

	ModelName = "general-settings";
	cmd = "set";

	Attr = new Object();
	Attr = getAttrObj(tagId, value);

	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};

	if((tagId[0] == "General") || (tagId[0] == "Vario")){
		xmlObj[cmd][ModelName]["GeneralSettingsTRX"] = {};

		if(tagId[0] == "General"){
			type = "VolumeBeep";
		}

		if(tagId[0] == "Vario"){
			type = "VolumeVario";
		}

		xmlObj[cmd][ModelName]["GeneralSettingsTRX"][type] = Attr;
	}
	else if(tagId[0] == "Voice"){
		xmlObj[cmd][ModelName]["GeneralSoundConfig"] = {};
		xmlObj[cmd][ModelName]["GeneralSoundConfig"]["VolumeVoice"] = Attr;
	}
	else{
		xmlObj[cmd][ModelName]["Brightness"] = Attr;
	}

	GetTd(xmlObj, g_SetEvent, cmd);
}













