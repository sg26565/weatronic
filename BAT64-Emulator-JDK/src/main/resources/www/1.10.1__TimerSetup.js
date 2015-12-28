






var g_TimerIndex = parseInt((get_GET_Parameter().TimerIndex),10);
var g_TriggerState = [];
var g_List_PopupListObj = [];
initPage();

function initPage(){
	$('#Navi_Button').removeAttr("href");
	$('#Navi_Button').bind("click", function(){
		window.location.href = "1.10.0__Timers.html?TimerIndex=" + g_TimerIndex;
	});
	

	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Control_Positiv");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "AlarmTypes");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TimerAlarmDuration");
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);
	InitDataPostArgsExtended = new Object();
	GetTd(getTimersObject(InitDataPostArgsExtended, g_TimerIndex), g_SetEvent, "get");



	g_isAdditionalControlObjectUsed = true;
	TdPostArgs = getCurrentTimersObject(TdPostArgs, g_TimerIndex);


	setInterval(JsonFunction, 250);
}



function getTimersObject(InitDataPostArgsExtended, TimerIndex){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	Item = new Object();
	Item.Index = TimerIndex;
	Item.Name = "";
	Item.TelemetryIdValue = -1;
	Item.AlarmTypes = [];

		alarmDuration = new Object();
		alarmDuration.Index = -1;
		alarmDuration.Name = "";
	Item.AlarmDuration = alarmDuration;

		switchStart = new Object();
		switchStart.Control = -1;
		switchStart.Trigger = -1.1;
	Item.SwitchStart = switchStart;

		switchStop = new Object();
		switchStop.Control = -1;
		switchStop.Trigger = -1.1;
	Item.SwitchStop = switchStop;

		switchReset = new Object();
		switchReset.Control = -1;
		switchReset.Trigger = -1.1;
	Item.SwitchReset = switchReset;

		switchLap = new Object();
		switchLap.Control = -1;
		switchLap.Trigger = -1.1;
	Item.SwitchLap = switchLap;

	Item.ValueStart = -1.1;
	Item.ValueStop = -1.1;
	Item.TelemetryIdLastLap = 0;

	timerItems = new Array(Item);

	InitDataPostArgsExtended["get"] = {};
	InitDataPostArgsExtended["get"]["model-settings"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["Timer"] = Item;

	return InitDataPostArgsExtended;
}


function getCurrentTimersObject(TdPostArgs, TimerIndex){
	if(typeof TdPostArgs == "undefined"){
		TdPostArgs = new Object();
	}

	timer = new Object();
	timer.Items = "" + TimerIndex;
		current = new Object();
		current.State = [];
	timer.Current = current;

	TdPostArgs.Timer = timer;

	return TdPostArgs;
}


function onEVENT_INIT(e){
	try{
		setHeaderMaxWidth('Timer_Name', 'Model_Name');

		$('#Reset_Control_Action').bind("click", function(e){resetTimer(e);});
		g_numpadLimitObj = e.EventData.NumPadLimits;
		g_List_PopupListObj["Alarm_Type_Value"] = e.EventData.PopUp.AlarmTypes;
		g_List_PopupListObj["TimerAlarmDuration"] = e.EventData.PopUp.TimerAlarmDuration;

		setHTML('Model_Name', e.EventData.ModelName);

		initScrollbars('List_Container');
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "telemetry"){
		setHTML('Current_Value_Value', valueStr);
	}

	if(cmd == "AdditionalControlObject"){
		stateStart = e.EventData.Timer.Current.State[0];
		stateStop  = e.EventData.Timer.Current.State[1];
		stateReset = e.EventData.Timer.Current.State[2];
		statelap   = e.EventData.Timer.Current.State[3];

		
		if(typeof preStateStart == "undefined"){
			preStateStart = -1;
		}

		if(preStateStart != stateStart){
			state2image("Start_Control_State", stateStart);
			preStateStart = stateStart;
		}

		
		if(typeof preStateStop == "undefined"){
			preStateStop = -1;
		}

		if(preStateStop != stateStop){
			state2image("Stop_Control_State", stateStop);
			preStateStop = stateStop;
		}

		
		if(typeof preStateReset == "undefined"){
			preStateReset = -1;
		}

		if(preStateReset != stateReset){
			state2image("Reset_Control_State", stateReset);
			preStateReset = stateReset;
		}

		
		if(typeof preStateLap == "undefined"){
			preStateLap = -1;
		}

	
	
	
	
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "get"){
			handleGET(e.EventData.get);
		}

		if(e.cmd == "set"){
			
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}


function handleGET(TdJson){
	Timer_TelemetryValueId = TdJson.Timer.TelemetryIdValue;

	setHTML('Timer_Name', TdJson.Timer.Name);
	setHTML('Start_Time_Value', checkTimeFormat(TdJson.Timer.ValueStart));
	setHTML('Alarm_End_Value',  checkTimeFormat(TdJson.Timer.ValueStop));
	setHTML('Alarm_Duration_Value', TdJson.Timer.AlarmDuration.Name);

	Timer_TelemetryValueId = TdJson.Timer.TelemetryIdValue;

	telemetryObj = new Object();
	telemetryObj.ID = Timer_TelemetryValueId;
	telemetryObj.ValueStr = "";
	telemetryObj.Value = -1;

	telemetryIds.push(telemetryObj);

	controlSwitchStart = TdJson.Timer.SwitchStart.Control;
	controlSwitchStop  = TdJson.Timer.SwitchStop.Control;
	controlSwitchReset = TdJson.Timer.SwitchReset.Control;

	control2image('Start_Control_Control', controlSwitchStart);
	control2image('Stop_Control_Control', controlSwitchStop);
	control2image('Reset_Control_Control', controlSwitchReset);

	triggerSwitchStart = TdJson.Timer.SwitchStart.Trigger;
	triggerSwitchStop  = TdJson.Timer.SwitchStop.Trigger;
	triggerSwitchReset = TdJson.Timer.SwitchReset.Trigger;

	setTriggerState("Start_Control_Trigger", triggerSwitchStart);
	setTriggerState("Stop_Control_Trigger", triggerSwitchStop);
	setTriggerState("Reset_Control_Trigger", triggerSwitchReset);

	$('#Start_Time_Value').bind("click", function(){showNumpadTimer("Start_Time_Value");});
	$('#Alarm_End_Value').bind("click", function(){showNumpadTimer("Alarm_End_Value");});

	alarmType = TdJson.Timer.AlarmTypes;
	alarmTypeStr = '';

	if(alarmType.length != 0){
		indexArray = new Array();

		for(var i = 0; i < alarmType.length; i++){
			alarmTypeStr +=  alarmType[i].Name + ', ';
		}

		alarmTypeStr = alarmTypeStr.substring(0, alarmTypeStr.length-2);
	}

	setHTML('Alarm_Type_Value', alarmTypeStr);
	g_popupList_Indices["Alarm_Type_Value"] = alarmType;
	$('#Alarm_Type_Value').bind("click", function(){showPopupList(this,g_List_PopupListObj["Alarm_Type_Value"],true,true, g_popupList_Indices);});

	g_popupList_Indices["Alarm_Duration_Value"] = TdJson.Timer.AlarmDuration.Index;
	$('#Alarm_Duration_Value').bind("click", function(){showPopupList(this,g_List_PopupListObj["TimerAlarmDuration"],false,true, g_popupList_Indices);});

	
	$('#Start_Control_Value').bind("click", function() {window.location.href = "9.1.0__ControlAssignment.html" +
		"?LastURL=" + location.href +
		"&ControlPath=" + getControlAssignmentPath("Start", controlSwitchStart, triggerSwitchStart, g_TimerIndex) +
		"&ControlId=" + controlSwitchStart +
		"&ControlTrigger=" + triggerSwitchStart +
		"&ControlNode=Control" +
		"&ControlNodeTrigger=Trigger" +
		"&PageId=10" +
		"&FromName=" + TdJson.Timer.Name +
		"&FromNameSub=" + 'Start';
	});

	$('#Stop_Control_Value').bind("click", function() {window.location.href = "9.1.0__ControlAssignment.html" +
		"?LastURL=" + location.href +
		"&ControlPath=" + getControlAssignmentPath("Stop", controlSwitchStop, triggerSwitchStop, g_TimerIndex) +
		"&ControlId=" + controlSwitchStop +
		"&ControlTrigger=" + triggerSwitchStop +
		"&ControlNode=Control" +
		"&ControlNodeTrigger=Trigger" +
		"&PageId=10" +
		"&FromName=" + TdJson.Timer.Name +
		"&FromNameSub=" + 'Stop';
	});

	$('#Reset_Control_Value').bind("click", function() {window.location.href = "9.1.0__ControlAssignment.html" +
		"?LastURL=" + location.href +
		"&ControlPath=" + getControlAssignmentPath("Reset", controlSwitchReset, triggerSwitchReset, g_TimerIndex) +
		"&ControlId=" + controlSwitchReset +
		"&ControlTrigger=" + triggerSwitchReset +
		"&ControlNode=Control" +
		"&ControlNodeTrigger=Trigger" +
		"&PageId=10" +
		"&FromName=" +  TdJson.Timer.Name +
		"&FromNameSub=" + 'Reset';
	});
}


function getControlAssignmentPath(switchType, control, trigger, Index){
	cmd = "set";
	ModelName = "model-settings";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"Timer":{"Switch' + switchType + '":{"Control":' + control + ',"Trigger":' + trigger +'},"Index":' + Index + '}}}}');

	return str;
}


function getAttrObj(tagId, value){
	Attribute = new Object();

	if(tagId == "Alarm_Duration_Value"){
		Attribute["AlarmDuration"] = value;

		return Attribute;
	}

	if(tagId == "Alarm_End_Value"){
		value = value.split(":");
		value = parseInt(value[0] * 3600) + parseInt(value[1] * 60) + parseInt(value[2]);
		Attribute["ValueStop"] = parseFloat(value);

		return Attribute;
	}

	if(tagId == "Start_Time_Value"){
		value = value.split(":");
		value = parseInt(value[0] * 3600) + parseInt(value[1] * 60) + parseInt(value[2]);
		Attribute["ValueStart"] = parseFloat(value);

		return Attribute;
	}

	if(tagId == "Alarm_Type_Value"){
		var StrArray = value.split(", ");
		var TmpArray = [];

		for(var v in StrArray){
			TmpArray.push(parseInt(StrArray[v]));
		}

		Attribute["AlarmTypes"] = TmpArray;

		return Attribute;
	}

	return Attribute;
}


function getPathObj(cmd, ModelName){
	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};

	return xmlObj;
}


function submitSET(tagId, value){
	tagIdArray = tagId.split("__");
	cmd = "set";
	ModelName = "model-settings";
	ListType = "Timer";

	Attr = new Object();
	Attr = getAttrObj(tagId, value);

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType] = Attr;
	xmlObj[cmd][ModelName][ListType]["Index"] = g_TimerIndex;

	GetTd(xmlObj, g_SetEvent, cmd);
}



function state2image(id, state){
	if(state == 1){
		
		setHTML_Attribute(id, "src", "data:image/png;base64,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");
	}
	else{
		
		setHTML_Attribute(id, "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAA3CAYAAABeklfeAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAT3SURBVHja7Fp7iFRVHD6ji5qo62pbaT62EltUtDQfoZYPFAtRsxTEB2r/REbkY8UXqRFWZqv4flG0QSUqFYiS70wtfIGWsZAlRroqqZurLprb9P3Yb+js5c7cc+/MnTtw7w8+5sy9vzPn3O+c83vdicXjcaVLeXm5CkAeBYYCBcAfwD7gRrYnUVxcXOd7ngpWGgAfAq9b5nILeBtYHuTkgibnS+Alm+tNgFKgObAwqMnVC5CYF5IQo8t8oCiM5Ewx0KkPTAgjOU8Y6nUMIzlVhnq3wkjO94Z6R8NIziEDnQvA1jCSs8Dh/nVgLHA3bOSMAZ5Lcq8CWA10A46FLQhsxKjYKveBHsAZlSMSxM4pAdrbXF+XS8QEQY4kmHNsrl8DFqsck2yTsxRobHN9IQkKLTl9gHE2138GNqgclHpZHGcVELO5N53GOLTkTASesbn+NbBX5ahk0pX3Akbz+OQDA4FKoCnwvo2+BHezPIzTkOUO+X0p3bUEqoHfmWp8BVzNFXIkNlkB9LMclUq25wGP2PSTKt9vLsaR8sU0/t7DNvdl/EnASmANsAT4K50Hi6VZQ55OD6STfBroCfwDPA78wtXW5TLwJHDTcBwhYzvQ13K9khF1PnXqW8aQYtqPpg9jrSGnY3MkXinViNnCyXcnMSIf2RCT6GtKTCGT1L5aCWORqq3zSEG+E+MnIWcq8Cv1ZLce4BHM6s4ZBuyk97kNjAe+segMTmJsTwC9gX8Nj9JB7cgeZjJa4WAq3tPsWRUX7JzbnePF5jRgXBKjCx4B7Oe9B4BXgAGq9lWLVWQl3tSI6e9Q15E0YwdxD1hP45tK7jNFkZ35Dh3CBi6W7wZZjF47tks1YrrRUzyWou8XwA9sv0zjWaQdQ6uIB/rA46l4F3iepAxiFeCQmx/wYnPG87Nam/hDwG4HYkR/tiUzb82J+yFxbTyRyZnYOdcd+uTzc7em+xYJcrIfieNUpBEpR/Bbnwg6xUy/KwPRUQ76LZzIKTAcWLfcow1t1XBgE/tW0R508jnQPUly8lw8W9quXHdzbQz7tNPaN1wuhle5EnRudclQ77LWbqzFLX5K0yDI0V+27TDQF3uzS9tpD7J9zmdyOmQytxrr0Edym6cYxzRjPLFM1b62LUzR71O6ZsVYKCFHfCSmufq/kH9c2deuXZHj9J5IvJK8HWjC3Goxj5UEg9sYytuVJt5gW/rNYPtvw13nVUoYmIpsVi7fgXk5Vh9rRm4uUwHFBE+8wnw+sKzU5/RQkgDeoZ5k8G3ZXs30I1V5ooBo5nKevbl4CaP8WTYi5Grugq2c/C4+/HeMe5akGEuIeZXfzyep8+giduknklPD1GOtwRy7MlpP7JoZBmlHxgzyNj5owhXvZ/7SOUnw9yITzmnacRpp4KkuMrKt4e+s4aK0T6IvR3YBU5RWvLaOOzir9ZwYV75E1a0NSz3nLI9La1YICy1ufwSDM1MRJ1GmlT9quFPP8MgIKV2AIaru2w2xM69R33U9J5aBP0wO4VZ3cpk1TDxnKm9lTElsPwGeNtCtYM2ozM0Afvxhco+qreUOp4t+lts+jynCWeqUpRnTyI7swfxIKgMDtTwvUao4yQXY6MXGZPJYmRy7uI9uOsawoQVt15+s+XgWx2MVSeZzq4iciJxIInIiciJyInIiciJyInIiciJyInIiichxK/8JMAD5YBAkJJ3urwAAAABJRU5ErkJggg==");
	}
}


function trigger2image(id, state){


	$('#' + id).addClass(g_TriggerState[id][0]);
}


function setTriggerState(tagId, trigger){
	var triggerArray = new Array();

	switch(trigger){
		case	 -204:	triggerArray[0] = "icon_trigger_center";
						triggerArray[1] = "icon_trigger_center";
						break;
		case 	  512:  triggerArray[0] = "icon_trigger_p25_white";
						triggerArray[1] = "icon_trigger_p25_blue";
						break;
		case 	 -512:  triggerArray[0] = "icon_trigger_m25_white";
						triggerArray[1] = "icon_trigger_m25_blue";
						break;
		case 	 1536:  triggerArray[0] = "icon_trigger_p75_white";
						triggerArray[1] = "icon_trigger_p75_blue";
						break;
		case 	-1536:  triggerArray[0] = "icon_trigger_m75_white";
						triggerArray[1] = "icon_trigger_m75_blue";
						break;
		default:		triggerArray[0] = "icon_trigger_empty";
						triggerArray[1] = "icon_trigger_empty";
	}

	g_TriggerState[tagId] = triggerArray;

	trigger2image(tagId, 0);
}


function resetTimer(e){
	GetTd({"cmd":0x0402, "param": {"Timer": g_TimerIndex}}, "noEvent", "command");
}

















function checkTimeFormat(timeString){
	var timeAsArray = timeString.split(":");
	var timeHoursCount = timeAsArray[0].length;

	switch(timeHoursCount){
		case 2: timeString = "00" + timeString; break;
		case 4: timeString = timeString + ":00"; break;
	}

	return timeString;
}



var numpadTimerTargetTagId = "";
var numpadTimerValue = 0;

var numpadTimerPreValue = numpadTimerValue;




function showNumpadTimer(tagId){
	if(numpadOpen && !($('#meindiv').is(':empty'))){
		handleNoneClosedNumpad();
	}

	g_isPopUp = true;

	showHTML('Pop_Up_Blocker');

	numpadTimerTargetTagId = tagId;
	numpadTimerValue = getHTML(numpadTimerTargetTagId);

	numpadTimerPreValue = numpadTimerValue;
	$('#Pop_Up').css({'top': '80px', 'padding-left': '11px'});
	var htmlNumpadOutter = "<div id=\"Pop_Up_Outer\"></div>";
	$('#Pop_Up').append(htmlNumpadOutter);
	$('#Pop_Up_Outer').html(getHtmlNumpadPadTimer(numpadTimerTargetTagId));
	setPositionNumpadTimer(numpadTimerTargetTagId, numpadIsTestUsed);
	setNoEdit();
}


function getHtmlNumpadPadTimer(tagId){
	var htmlNumpadPad = '' +
	'<div id="flat-numipt">' +
		'<div id="PopupArrowUp" style="margin-top: -20px; padding-left: 0px; display: none;"><div class="popup_icon_arrowUp"></div></div>' +
		'<div id="graybtn" style="height: 62px; width: 760px;">' +
		  '<ul>' +
		    '<li id="NumpadNum1" class="NumpadNum" onclick="changenumpadTimerValue(\'1\');">1</li>' +
		    '<li id="NumpadNum2" class="NumpadNum" onclick="changenumpadTimerValue(\'2\');">2</li>' +
		    '<li id="NumpadNum3" class="NumpadNum" onclick="changenumpadTimerValue(\'3\');">3</li>' +
		    '<li id="NumpadNum4" class="NumpadNum" onclick="changenumpadTimerValue(\'4\');">4</li>' +
		    '<li id="NumpadNum5" class="NumpadNum" onclick="changenumpadTimerValue(\'5\');">5</li>' +
		    '<li id="NumpadNum6" class="NumpadNum" onclick="changenumpadTimerValue(\'6\');">6</li>' +
		    '<li id="NumpadNum7" class="NumpadNum" onclick="changenumpadTimerValue(\'7\');">7</li>' +
		    '<li id="NumpadNum8" class="NumpadNum" onclick="changenumpadTimerValue(\'8\');">8</li>' +
		    '<li id="NumpadNum9" class="NumpadNum" onclick="changenumpadTimerValue(\'9\');">9</li>' +
		    '<li id="NumpadNum0" class="NumpadNum" onclick="changenumpadTimerValue(\'0\');">0</li>' +
		  '</ul>' +
		'</div>' +
		'<div id="tray" style="height: 124px; width: 760px;">' +
		  '<div class="clear"></div>' +
		  '<div id="gray">' +
		    '<ul>' +
		      '<li id="BackspaceButton" style="width: 251px;" onclick="changenumpadTimerValue(\'del\');"><div class="popup_icon_delete" style=" margin-left: 105px;"></div></li>' +
		 	  '<li id="ResetValButton" style="width: 252px;" onclick="resetnumpadTimerValue();"><div class="popup_icon_reset" style=" margin-left: 105px;"></div></li>' +
		      '<li id="CheckButton" style="width: 251px;" onclick="closeNumpadTimer();"><div class="popup_icon_ok" style=" margin-left: 105px;"></div></li>' +
		    '</ul>' +
		  '</div>' +
		  '<div id="blue"> </div>' +
		'</div>' +
		'<div id="PopupArrowDown" style="margin-top: 6px; padding-left: 0px; position: absolute; display: none;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAANCAYAAABcrsXuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MjhGRUZFNDg2MzExRTJCNTYxODhBMDEzMUJDMzVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU1MjhGRUZGNDg2MzExRTJCNTYxODhBMDEzMUJDMzVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTUyOEZFRkM0ODYzMTFFMkI1NjE4OEEwMTMxQkMzNUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTUyOEZFRkQ0ODYzMTFFMkI1NjE4OEEwMTMxQkMzNUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5lMsq2AAAAZUlEQVR42rSUSQrAIBAEu3x4XpPP+KqYixBCjNu0MOCtxl7kOPMl80n3YGaQ6sUFqC+RCcRTLhlAvD1RMIgv4xUIopUuBYH4i7ACQPR6ok0QI2Xc2ZTRxq9qzsy3smLuVCiKAAMAa2gDHN9KacgAAAAASUVORK5CYII=" alt="" draggable="false" /></div>' +
	'</div>';

	return htmlNumpadPad;
}


function setPositionNumpadTimer(tagId){
	var widthContainer = $('#' + tagId).outerWidth();
	var heightContainer = $('#' + tagId).outerHeight();
	var numpadHeight = 140;
	var numpadTop = 0;
	var documentWidthOffset = $('body').offset().left + 30; 

	var offsetContainer = $('#' + tagId).offset();

	if(offsetContainer.top > 240){
		numpadTop = offsetContainer.top - numpadHeight;
		$('#PopupArrowDown').show();
		$('#PopupArrowDown').css({'padding-left': (offsetContainer.left + (widthContainer/2) - documentWidthOffset) + 'px'});
	}
	else{
		numpadTop = offsetContainer.top + heightContainer;
		$('#PopupArrowUp').show();
		$('#PopupArrowUp').css({'padding-left': (offsetContainer.left + (widthContainer/2) - documentWidthOffset) + 'px'});
	}

	$('#Pop_Up').css({'top': numpadTop + 'px'});
}


function closeNumpadTimer(){
	while(numpadTimerValue.length < 10){
		changenumpadTimerValue("0");
	}

	hideHTML('Pop_Up_Blocker');

	$('#' + numpadTimerTargetTagId).html(numpadTimerValue);
	submitSET(numpadTimerTargetTagId, numpadTimerValue);
	
	$('#Pop_Up_Outer').remove();
	g_isPopUp = false;
}


function changenumpadTimerValue(key){
	switch(key){
		case 'del':		if(numpadTimerValue.substr(numpadTimerValue.length-1, 1) == ":"){
							numpadTimerValue = numpadTimerValue.substr(0, numpadTimerValue.length -2);
						}else{
							numpadTimerValue = numpadTimerValue.substr(0, numpadTimerValue.length -1);
						}
						break;
		default:		strLength = numpadTimerValue.length;
						
						if(strLength < 3){

								numpadTimerValue += key;

						}else
						if((strLength == (3+2)) || (strLength == (6+2))){
							if(key < (6+2)){
								numpadTimerValue += key;
							}
						}
						else if (strLength < (8+2)){
							if(strLength < (6+2)){
								numpadTimerValue += key + ":" ;
							}
							else{
								numpadTimerValue += key;
							}
						}
						break;
	}

	$('#'+ numpadTimerTargetTagId).html(numpadTimerValue);
	setNoEdit();
}


function setNoEdit(){
	for(var i = 0; i < 10; i++){
		$('li#NumpadNum' + i).removeClass("no_edit");
	}

	strLength = numpadTimerValue.length;





	if((strLength == (3+2)) || (strLength == (6+2))){
		for(var i = 6; i < 10; i++){
			$('li#NumpadNum' + i).addClass("no_edit");
		}
	}
}


function resetnumpadTimerValue(){
	numpadTimerValue = numpadTimerPreValue;
	$('#' + numpadTimerTargetTagId).html(numpadTimerValue);
	setNoEdit();
}

