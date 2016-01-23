



initPage();

function initPage(){
		

	GetTd(getGeneralSettingsObject(InitDataPostArgs), g_InitEvent, "get");


	setInterval(JsonFunction, 250);
	
}



function getGeneralSettingsObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	InitDataPostArgs["get"] = {};
	InitDataPostArgs["get"]["general-settings"] = {};
	InitDataPostArgs["get"]["general-settings"]["GeneralSettingsTRX"] = {};
	InitDataPostArgs["get"]["general-settings"]["GeneralSettingsTRX"]["ControlNumPad"] = -1;
	InitDataPostArgs["get"]["general-settings"]["GeneralSettingsTRX"]["ControlTelemetrySlide"] = -1;

	return InitDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		var numpadControl = e.EventData.get.GeneralSettingsTRX.ControlNumPad;
		var telemetrySreenSwitch = e.EventData.get.GeneralSettingsTRX.ControlTelemetrySlide;
		
		control2image('Rotary_Numpad_Control', numpadControl);
		control2image('Telemetry_Screen_Control', telemetrySreenSwitch);
		
		
		$('#Rotary_Numpad_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
				"?LastURL=" + location.href +
				"&ControlPath=" + getControlAssignmentPathBeepVario("ControlNumPad", numpadControl) +
				"&ControlId=" + numpadControl +
				"&ControlNode=ControlNumPad" +
				"&PageId=5" +
				"&FromName=" + 'Endlosdrehgeber zur Einstellung von Werten';
		});

		$('#Telemetry_Screen_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
				"?LastURL=" + location.href +
				"&ControlPath=" + getControlAssignmentPathBeepVario("ControlTelemetrySlide", telemetrySreenSwitch) +
				"&ControlId=" + telemetrySreenSwitch +
				"&ControlNode=ControlTelemetrySlide" +
				"&PageId=6" +
				"&FromName=" + 'Geber zum Blättern der Telemetrieseiten';
		});
		
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function getControlAssignmentPathBeepVario(controlNode, value){
	cmd = "set";
	TreeName = "general-settings";
	str = encodeURI('{"' + cmd + '":{"' + TreeName + '":{"GeneralSettingsTRX":{"' + controlNode + '":"' + value + '"}}}}');

	return str;
}
