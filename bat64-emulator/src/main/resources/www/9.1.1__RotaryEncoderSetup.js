


var g_GET_Parameter = get_GET_Parameter();
var g_PageId = parseInt((g_GET_Parameter.PageId), 10);			
var g_RotaryControl = parseInt((g_GET_Parameter.ControlId), 10);
var g_ControlTrigger = g_GET_Parameter.ControlTrigger;
var g_ControlNode = g_GET_Parameter.ControlNode;
var g_ControlNodeTrigger = g_GET_Parameter.ControlNodeTrigger;
var g_lastURL = g_GET_Parameter.LastURL;
var g_controlObj = JSON.parse(g_GET_Parameter.ControlPath);
var g_FromName = g_GET_Parameter.FromName;
var g_FromNameSub = g_GET_Parameter.FromNameSub;

initPage();

function initPage(){

	
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Control");
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "RotaryStep");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "YesNo");
	
	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	GetTd(getRoteryEncoderObject(InitDataPostArgs, g_RotaryControl), g_InitEvent);



	roteryControl = new Object();
	roteryControl.ID = g_RotaryControl;
	roteryControl.Value = 0;
	
	controlIds.push(roteryControl);	

	

	TdPostArgs = getCurrentFlightMode(TdPostArgs);


	setInterval(JsonFunction, 250);
}

	

function getRoteryEncoderObject(InitDataPostArgs, Control){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

	RotarySetup = new Object();
	RotarySetup.Control = Control;
	RotarySetup.Steps = "";
	RotarySetup.PresetStr = "";
	RotarySetup.PresetValue = -1;
		isFlightModeDependent = new Object();
		isFlightModeDependent.Index = -1;
		isFlightModeDependent.Name = "";
	RotarySetup.IsFlightModeDependent = isFlightModeDependent;
		isBeep = new Object();
		isBeep.Index = -1;
		isBeep.Name = "";
	RotarySetup.IsBeep = isBeep;
		isVibration = new Object();
		isVibration.Index = -1;
		isVibration.Name = "";
	RotarySetup.IsVibration = isVibration;

	InitDataPostArgs.RotarySetup = RotarySetup;

	return InitDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		setHeaderMaxWidth('Model_Name', 'Flight_Mode');

		g_numpadLimitObj = e.EventData.NumPadLimits;

		setHTML('Model_Name', e.EventData.ModelName);

		setHTML('Rotary_Steps', e.EventData.RotarySetup.Steps);
		setHTML('Rotary_Steps_Percent', RotarySteps2Percent(e.EventData.RotarySetup.Steps));
		setHTML('Rotary_Preset', e.EventData.RotarySetup.PresetStr);
		setHTML('Rotary_FM_Depended', e.EventData.RotarySetup.IsFlightModeDependent.Name);
		setHTML('Feedback_Beep', e.EventData.RotarySetup.IsBeep.Name);
		setHTML('Feedback_Vibration', e.EventData.RotarySetup.IsVibration.Name);

		control2image('Control_IMG', g_RotaryControl);

		
		if(typeof g_lastURL != "undefined"){
			$('#Navi_Button').removeAttr("href");
			$('#Navi_Button').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html?" + window.location.search.substring(1);});
		}

		
		g_popupList_Indices["Rotary_FM_Depended"] = e.EventData.RotarySetup.IsFlightModeDependent.Index;
		$('#Rotary_FM_Depended').bind("click", function(){showPopupList(this,e.EventData.PopUp.YesNo,false,true, g_popupList_Indices);});

		g_popupList_Indices["Feedback_Beep"] = e.EventData.RotarySetup.IsBeep.Index;
		$('#Feedback_Beep').bind("click", function(){showPopupList(this,e.EventData.PopUp.YesNo,false,true, g_popupList_Indices);});

		g_popupList_Indices["Feedback_Vibration"] = e.EventData.RotarySetup.IsVibration.Index;
		$('#Feedback_Vibration').bind("click", function(){showPopupList(this,e.EventData.PopUp.YesNo,false,true, g_popupList_Indices);});

		
		$('#Rotary_Steps').bind("click", function(){showNumpad("Rotary_Steps", "RotaryStep");});
		$('#Rotary_Preset').bind("click", function(){showNumpad("Rotary_Preset", "Control");});
		
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "control"){
		if(key == g_RotaryControl){
			value = Value12Bit2Percent(value);
			graficWidth = (Math.abs(value)/2);
			graficMargin = 50 - graficWidth;

			if(!(value < 0)){
				graficMargin = 50;
				value = "+" + value;
			}


			setCSS(('Rotary_Graph'), 'width', (graficWidth + "%"));
			setCSS(('Rotary_Graph'), 'marginLeft', (graficMargin + "%"));
			setHTML(('Rotary_Value'), (value + "%"));
		}
	}

	
	if(cmd == "flightmode"){	
		if(typeof htmlObj_FlightMode == "undefined"){
			htmlObj_FlightMode = document.getElementById('Flight_Mode');
		}

		htmlObj_FlightMode.innerHTML = e.EventData.Current_FM.Name;
	}	
}


function onEVENT_SET(e){
	try{
		
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}	
}











function getAttrObj(tagId, value){
	Attribute = new Object();

	if(tagId == "Rotary_Steps"){
		Attribute["Steps"] = value;
		setHTML('Rotary_Steps_Percent', RotarySteps2Percent(value));

		return Attribute;
	}
	else if(tagId == "Rotary_Preset"){
		Attribute["Preset"] = value;

		return Attribute;
	}
	else if(tagId == "Rotary_FM_Depended"){
		Attribute["IsFlightModeDependent"] = value;

		return Attribute;
	}
	else if(tagId == "Feedback_Beep"){
		Attribute["IsBeep"] = value;

		return Attribute;
	}
	else if(tagId == "Feedback_Vibration"){
		Attribute["IsVibration"] = value;

		return Attribute;
	}

	return Attribute;
}


function submitSET(tagId, value){
	
	
	

	ModelName = "model-settings";
	cmd = "set";
	ListType = "RotarySetup";
	Attr = new Object();
	Attr = getAttrObj(tagId, value);

	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType] = Attr;
	xmlObj[cmd][ModelName][ListType]["Control"] = g_RotaryControl;

	GetTd(xmlObj, g_SetEvent, cmd);
}


function Value12Bit2Percent(x){
	return Math.round(x*100/2048);
}


function RotarySteps2Percent(x){
	return Math.round(200/x);
}
