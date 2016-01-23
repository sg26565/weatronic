


var g_TriggerState = [];
var g_mode = -1;
var g_preModeObj = {};
g_preModeObj.Index = -1;
g_preModeObj.Name = "";
var g_MEASValue_TeacherStudentStatusByte = 3276;

initPage();

function initPage(){
	$('#Additional_Button').bind('click', function(){gotoSettings(0);});
	$('#Teacher_Student_Calibration_Button_Label').bind('click', function(){gotoSettings(1);});
	

	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TeacherStudentRole");
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);
	
	InitDataPostArgsExtended = new Object();
	GetTd(getteacherStudentObject(InitDataPostArgsExtended), g_InitEvent, "get");



	g_isAdditionalControlObjectUsed = true;
	TdPostArgs = getteacherStudentCurrentObject(TdPostArgs);

	
	telemetryteacherStatus = new Object();
	telemetryteacherStatus.ID = g_MEASValue_TeacherStudentStatusByte;
	telemetryteacherStatus.Value = 0;
	telemetryteacherStatus.ValueStr = "";

	telemetryIds.push(telemetryteacherStatus);
	
	setInterval(JsonFunction, 250);
}


function getteacherStudentObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}
	
	cmd = "get";
	ModelName = "model-settings";
	ListType = "ConfigTeacherStudent";

	configTeacherStudents = new Object();
	
		switchActivateMode = new Object();
		switchActivateMode.Control = -1;
		switchActivateMode.Trigger = -1;
	configTeacherStudents.SwitchActivateMode = switchActivateMode;
	
		role = new Object();
		role.Index = -1;
		role.Name = "";
	configTeacherStudents.Role = role;
	
	InitDataPostArgsExtended[cmd] = {};
	InitDataPostArgsExtended[cmd][ModelName] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType] = configTeacherStudents;
	
	return InitDataPostArgsExtended;
}

function getteacherStudentCurrentObject(TdPostArgs){
	if(typeof TdPostArgs == "undefined"){
		TdPostArgs = new Object();
	}
	
	cmd = "get";
	ModelName = "model-settings";
	ListType = "ConfigTeacherStudent";
	
	configTeacherStudents = new Object();
	
			currents = new Object();
			currents.State = -1;
	
		configTeacherStudents.Current = currents;
	
	TdPostArgs.ConfigTeacherStudent = configTeacherStudents;
	
	return TdPostArgs;
}


function onEVENT_INIT(e){
	try{
		if(typeof e.EventData.get == "undefined"){
			checkHTMLHeader('Model_Name');
			setHTML('Model_Name', e.EventData.ModelName);
			
			$('#Teacher_Student_Mode').bind("click", function(){showPopupList(this, e.EventData.PopUp.TeacherStudentRole, false, true, g_popupList_Indices);});
		}
		else{
			g_mode = e.EventData.get.ConfigTeacherStudent.Role.Index;
			g_preModeObj.Index = g_mode;
			g_preModeObj.Name = e.EventData.get.ConfigTeacherStudent.Role.Name;
			setHTML('Teacher_Student_Mode', g_preModeObj.Name);
			g_popupList_Indices["Teacher_Student_Mode"] =  g_mode;
			
			setModeDependencies();
			
			TeacherControl = e.EventData.get.ConfigTeacherStudent.SwitchActivateMode.Control;
			TeacherTrigger =  triggerPercent2Uint8(e.EventData.get.ConfigTeacherStudent.SwitchActivateMode.Trigger);
			
			control2image("Student_Control_Control", TeacherControl);
			setTriggerState("Student_Control_Trigger", TeacherTrigger);
			
			
			$('#Student_Control_Value').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
				"?LastURL=" + location.href +
				"&ControlPath=" + getControlAssignmentPathRate("Control", TeacherControl, "Trigger", TeacherTrigger) +
				"&ControlId=" + TeacherControl +
				"&ControlTrigger=" + TeacherTrigger +
				"&ControlNode=Control" +
				"&ControlNodeTrigger=Trigger" +
				"&PageId=10" +
				"&FromName=" + 'Lehrer';
			});
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	if(cmd == "telemetry"){
		if(key == g_MEASValue_TeacherStudentStatusByte){
			
			
			
			
			

			signalStatus = 1&value;
			signalType = 12&value; 
			signalChannel = value >> 4;
		
			if(typeof preTeacherStatus == "undefined"){
				preTeacherStatus = -1;
			}
			if(typeof preTeacherType == "undefined"){
				preTeacherType = -1;
			}
			if(typeof preTeacherChannel == "undefined"){
				preTeacherChannel = -1;
			}
			
			if((preTeacherStatus != signalStatus) || (preTeacherType != signalType) || (preTeacherChannel != signalChannel)){
				jquerySignalObj = $("#Teacher_Student_Signal");
				if((signalStatus == 0) || (signalType == 0)){
					jquerySignalObj.html("No Signal Detected").addClass("background_signal_status_no").removeClass("background_signal_status_normal");
					preTeacherType = signalType;
					preTeacherChannel = signalChannel;
				}
				else if(signalType == 4){
					jquerySignalObj.html("PPM " + signalChannel + " Signal Detected").addClass("background_signal_status_normal").removeClass("background_signal_status_no");
					preTeacherType = signalType;
					preTeacherChannel = signalChannel;
				}
				else if(signalType == 8){
					jquerySignalObj.html("BAT-Link Signal Detected").addClass("background_signal_status_normal").removeClass("background_signal_status_no");
					preTeacherType = signalType;
					preTeacherChannel = signalChannel;
				}
			}
			
		}
	}
	if(cmd == "AdditionalControlObject"){
		
		if(typeof preStateTeacher == "undefined"){
			preStateTeacher = -1;
		}
		
		if((g_mode == 2) || (g_mode == 5)){
			if(preStateTeacher != e.EventData.ConfigTeacherStudent.Current.State){
				state2image("Student_Control_State", e.EventData.ConfigTeacherStudent.Current.State);
				preStateTeacher = e.EventData.ConfigTeacherStudent.Current.State;
			}
		}	
	}
}


function onEVENT_SET(e){
	try{
		
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}	
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

function triggerPercent2Uint8(trigger){
	switch(trigger){
		case "-10%": case "-10.0%": trigger = -204;	break;
		case "+25%": case "+25.0%": trigger =  512;	break;
		case "-25%": case "-25.0%": trigger = -512;	break;
		case "+75%": case "+75.0%":	trigger = 1536;	break;
		case "-75%": case "-75.0%":	trigger = -1536;break;
		default:					trigger = 0;
	}

	return trigger;
}

function gotoSettings(where){
	if(where == 0){
		window.location.href = "1.15.1__TeacherStudentSettings.html?mode=" + g_mode;
	}
	else{
		window.location.href = "1.15.2__TeacherStudentCalibration.html?mode=" + g_mode;
	}
	
}

function setModeDependencies(){
	if(g_mode > 0){
		showHTML('Additional_Button_Box');
		if((g_mode == 2) || (g_mode == 5)){
			showHTML('Teacher_Student_Signal_Outer');
			showHTML('Teacher_Student_Control_Outer');








		}
		else{
			hideHTML('Teacher_Student_Signal_Outer');
			hideHTML('Teacher_Student_Control_Outer');
		}
	}
	else{
		hideHTML('Additional_Button_Box');
		hideHTML('Teacher_Student_Signal_Outer');
		hideHTML('Teacher_Student_Control_Outer');
	}
}

function getControlAssignmentPathRate(controlNode, value, triggerNode, trigger){
	cmd = "set";
	ModelName = "model-settings";
	ListType = "ConfigTeacherStudent";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"' + ListType + '":{"SwitchActivateMode":{"' + controlNode + '":"' + value + '","' + triggerNode + '":' + trigger + '}}}}}');
	return str;
}

function submitSET(tagId, value){
	if((tagId == "Teacher_Student_Mode") && ((value == 3) || (value == 4))){
		showDialogbox("student", 'The HF will be shutdown in "Student" or "Operator" mode!', tagId, value);
	}
	else{
		submitSubSET(tagId, value);
	}
}

function submitSubSET(tagId, value){
	var xmlObj = new Object();
	
	ModelName = "model-settings";
	cmd = "set";
	ListType = "ConfigTeacherStudent";
	
	var Attr = "";
	if(tagId == "Teacher_Student_Mode"){
		g_preModeObj.Index = value;
		g_preModeObj.Name = getHTML(tagId);
		Attr = {};
		Attr["Role"] = value;
		g_mode = value;
		setModeDependencies();
	}
	
	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType] = Attr;

	GetTd(xmlObj, g_SetEvent, cmd);
}

function submitReSET(tagId){
	setHTML(tagId, g_preModeObj.Name);
	g_popupList_Indices["Teacher_Student_Mode"] = g_preModeObj.Index;
}
