


var g_controlIDVoice = -1;
var g_controlIDLight = -1;
initPage();

function initPage(){
	$('#Soft_Shutdown').bind('click', function(){shutDown();});








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
	volumeBeep.ControlID = g_controlIDVoice;

	brightness = new Object();
	brightness.Hi = "";
	brightness.Center = "";
	brightness.Lo = "";
	brightness.ControlID = g_controlIDLight;

	InitDataPostArgs["get"] = {};
	InitDataPostArgs["get"]["general-settings"] = {};
	InitDataPostArgs["get"]["general-settings"]["GeneralSettingsHK"] = {};
	InitDataPostArgs["get"]["general-settings"]["GeneralSettingsHK"]["VolumeBeep"] = volumeBeep;
	InitDataPostArgs["get"]["general-settings"]["Brightness"] = brightness;

	return InitDataPostArgs;
}

function getCurrentGeneralSettingsObject(TdPostArgs){
	if(typeof TdPostArgs == "undefined"){
		TdPostArgs = new Object();
	}

	volumeBeep = new Object();
	volumeBeep.Current = "";

	brightness = new Object();
	brightness.Current = "";

	TdPostArgs["general-settings"] = {};
	TdPostArgs["general-settings"]["GeneralSettingsHK"] = {};
	TdPostArgs["general-settings"]["GeneralSettingsHK"]["VolumeBeep"] = volumeBeep;
	TdPostArgs["general-settings"]["Brightness"] = brightness;

	return TdPostArgs;
}



function onEVENT_INIT(e){
	try{
		if(e.cmd=="get"){
			setHTML('Voice_High_Value', e.EventData.get.GeneralSettingsHK.VolumeBeep.Hi);
			setHTML('Voice_Center_Value', e.EventData.get.GeneralSettingsHK.VolumeBeep.Center);
			setHTML('Voice_Low_Value', e.EventData.get.GeneralSettingsHK.VolumeBeep.Lo);

			setHTML('Light_High_Value', e.EventData.get.Brightness.Hi);
			setHTML('Light_Center_Value', e.EventData.get.Brightness.Center);
			setHTML('Light_Low_Value', e.EventData.get.Brightness.Lo);

			g_controlIDVoice = e.EventData.get.GeneralSettingsHK.VolumeBeep.ControlID;
			g_controlIDLight = e.EventData.get.Brightness.ControlID;

			control2image('Voice_Control', g_controlIDVoice);
			control2image('Light_Control', g_controlIDLight);

			
			$('#Voice_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
					"?LastURL=" + location.href +
					"&ControlPath=" + getControlAssignmentPathVoice("ControlID", g_controlIDVoice, "VolumeBeep") +
					"&ControlId=" + g_controlIDVoice +
					"&ControlNode=ControlID" +
					"&PageId=1" +
					"&FromName=Volume";
			});

			
			$('#Light_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
					"?LastURL=" + location.href +
					"&ControlPath=" + getControlAssignmentPathLight("ControlID", g_controlIDLight, "Brightness") +
					"&ControlId=" + g_controlIDLight +
					"&ControlNode=ControlID" +
					"&PageId=1" +
					"&FromName=Brightness";
			});

			$('#Voice_High_Value').bind("click", function(){showNumpad("Voice_High_Value", "Control_Positiv");});
			$('#Voice_Center_Value').bind("click", function(){showNumpad("Voice_Center_Value", "Control_Positiv");});
			$('#Voice_Low_Value').bind("click", function(){showNumpad("Voice_Low_Value", "Control_Positiv");});

			$('#Light_High_Value').bind("click", function(){showNumpad("Light_High_Value", "Control_Positiv");});
			$('#Light_Center_Value').bind("click", function(){showNumpad("Light_Center_Value", "Control_Positiv");});
			$('#Light_Low_Value').bind("click", function(){showNumpad("Light_Low_Value", "Control_Positiv");});

			controlVoice = new Object();
			controlVoice.ID = g_controlIDVoice;
			controlVoice.Value = 0;

			controlLight = new Object();
			controlLight.ID = g_controlIDLight;
			controlLight.Value = 0;

			controlIds.push(controlVoice, controlLight);
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
		if((key == g_controlIDVoice) || (key == g_controlIDLight)){
			var val = Value12Bit2Percent(value);

			if(key == g_controlIDVoice){
				tagID = 'Voice_';

				if(typeof VoiceState == 'undefined'){
					VoiceState = "Invalid";
				}

				VoiceState = setControlAssignments(tagID, val, VoiceState);
			}

			if(key == g_controlIDLight){
				tagID = 'Light_';

				if(typeof LightState == 'undefined'){
					LightState = "Invalid";
				}

				LightState = setControlAssignments(tagID, val, LightState);
			}
		}
	}
	if(cmd == "AdditionalControlObject"){
		
		if(typeof htmlObj_VoiceEmptyValue == 'undefined'){
			htmlObj_VoiceEmptyValue = document.getElementById('Voice_Empty_Value');
		}

		htmlObj_VoiceEmptyValue.innerHTML = e["EventData"]["general-settings"]["GeneralSettingsHK"]["VolumeBeep"]["Current"];

		if(typeof htmlObj_LightEmptyValue == 'undefined'){
			htmlObj_LightEmptyValue = document.getElementById('Light_Empty_Value');
		}

		htmlObj_LightEmptyValue.innerHTML = e["EventData"]["general-settings"]["Brightness"]["Current"];

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


function getControlAssignmentPathVoice(controlNode, value, ListType){
	cmd = "set";
	TreeName = "general-settings";
	str = encodeURI('{"' + cmd + '":{"' + TreeName + '":{"GeneralSettingsHK":{"' + ListType + '":{"' + controlNode + '":"' + value + '"}}}}}');

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

	if(tagId[1] == "High"){
		Attribute["Hi"] = value;

		return 	Attribute;
	}

	if(tagId[1] == "Center"){
		Attribute["Center"] = value;

		return Attribute;
	}

	if(tagId[1] == "Low"){
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

	if(tagId[0] == "Voice"){
		xmlObj[cmd][ModelName]["GeneralSettingsHK"] = {};
		xmlObj[cmd][ModelName]["GeneralSettingsHK"]["VolumeBeep"] = Attr;
	}
	else{
		xmlObj[cmd][ModelName]["Brightness"] = Attr;
	}

	GetTd(xmlObj, g_SetEvent, cmd);
}
