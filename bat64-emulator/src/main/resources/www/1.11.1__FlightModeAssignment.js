




var g_isInit = false;
var g_currentState = [];
var g_CurrentFlightModeObj = {};
g_CurrentFlightModeObj.Index = g_CurrentFlightMode;
g_CurrentFlightModeObj.Name = "";
var g_TriggerState = [];
var g_List_Count = 8;


initPage();

function initPage(){

	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	GetTd(getFlightModeObject(InitDataPostArgs), g_InitEvent);



	TdPostArgs = getCurrentFlightMode(TdPostArgs);



	g_isAdditionalControlObjectUsed = true;
	TdPostArgs = getCurrentFlightModeObject(TdPostArgs);


	setInterval(JsonFunction, 250);

	drawCombinationTree([0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0], 0);
}



function getFlightModeObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	FlightMode = new Object();
	FlightMode.Items = "ALL_USED";

	Item = new Object();
	Item.Index = 0;
	Item.Name = "";
	flightModeItems = new Array(Item);
	FlightMode.Item = flightModeItems;

	Controls = new Object();
	Controls.Control = 0;
	Controls.Trigger = 0;
	controls = new Array(Controls);
	FlightMode.Controls = controls;

	FlightMode.ItemCount = 0;

	InitDataPostArgs.FlightMode = FlightMode;

	return InitDataPostArgs;
}


function getCurrentFlightModeObject(TdPostArgs){
	if(typeof TdPostArgs == "undefined"){
		TdPostArgs = new Object();
	}

	FlightMode = new Object();

	Current = new Object();
	Current.State = [];
	Current.Combination = [];
	Current.MasterAStr = "";
	Current.MasterAIdx = -1;
	Current.MasterBStr = "";
	Current.MasterBIdx = -1;
	Current.MasterCStr = "";
	Current.MasterCIdx = -1;
	Current.MasterDStr = "";
	Current.MasterDIdx = -1;
	Current.MasterEStr = "";
	Current.MasterEIdx = -1;
	Current.CombinationStr = "";
	Current.CombinationIdx = 0;

	FlightMode.Current = Current;

	TdPostArgs.FlightMode = FlightMode;

	return TdPostArgs;
}



function onEVENT_INIT(e){
	try{
		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);

		controlMasterA = e.EventData.FlightMode.Controls[0].Control;
		controlMasterB = e.EventData.FlightMode.Controls[1].Control;
		controlMasterC = e.EventData.FlightMode.Controls[2].Control;
		controlMasterD = e.EventData.FlightMode.Controls[3].Control;
		controlMasterE = e.EventData.FlightMode.Controls[4].Control;

		controlCombi1  = e.EventData.FlightMode.Controls[5].Control;
		controlCombi2  = e.EventData.FlightMode.Controls[6].Control;
		controlCombi3  = e.EventData.FlightMode.Controls[7].Control;

		control2image("Master_A_Control", controlMasterA);
		control2image("Master_B_Control", controlMasterB);
		control2image("Master_C_Control", controlMasterC);
		control2image("Master_D_Control", controlMasterD);
		control2image("Master_E_Control", controlMasterE);
		control2image("Combi_1_Control",  controlCombi1);
		control2image("Combi_2_Control",  controlCombi2);
		control2image("Combi_3_Control",  controlCombi3);

		triggerMasterA = e.EventData.FlightMode.Controls[0].Trigger;
		triggerMasterB = e.EventData.FlightMode.Controls[1].Trigger;
		triggerMasterC = e.EventData.FlightMode.Controls[2].Trigger;
		triggerMasterD = e.EventData.FlightMode.Controls[3].Trigger;
		triggerMasterE = e.EventData.FlightMode.Controls[4].Trigger;
		triggerCombi1  = e.EventData.FlightMode.Controls[5].Trigger;
		triggerCombi2  = e.EventData.FlightMode.Controls[6].Trigger;
		triggerCombi3  = e.EventData.FlightMode.Controls[7].Trigger;

		setTriggerState("Master_A_Trigger", triggerMasterA);
		setTriggerState("Master_B_Trigger", triggerMasterB);
		setTriggerState("Master_C_Trigger", triggerMasterC);
		setTriggerState("Master_D_Trigger", triggerMasterD);
		setTriggerState("Master_E_Trigger", triggerMasterE);
		setTriggerState("Combi_1_Trigger",  triggerCombi1);
		setTriggerState("Combi_2_Trigger",  triggerCombi2);
		setTriggerState("Combi_3_Trigger",  triggerCombi3);

		
		$("#Master_A_Name").bind("click", function(){showPopupList(this, e.EventData.FlightMode.Item, false, true, g_popupList_Indices);});
		$("#Master_B_Name").bind("click", function(){showPopupList(this, e.EventData.FlightMode.Item, false, true, g_popupList_Indices);});
		$("#Master_C_Name").bind("click", function(){showPopupList(this, e.EventData.FlightMode.Item, false, true, g_popupList_Indices);});
		$("#Master_D_Name").bind("click", function(){showPopupList(this, e.EventData.FlightMode.Item, false, true, g_popupList_Indices);});
		$("#Master_E_Name").bind("click", function(){showPopupList(this, e.EventData.FlightMode.Item, false, true, g_popupList_Indices);});
		$("#Combination_Name").bind("click", function(){showPopupList(this, e.EventData.FlightMode.Item, false, true, g_popupList_Indices);});

		
		$('#Master_A_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
			"?LastURL=" + location.href +
			"&ControlPath=" + getControlAssignmentPath(controlMasterA, triggerMasterA, 0) +
			"&ControlId=" + controlMasterA +
			"&ControlTrigger=" + triggerMasterA +
			"&ControlNode=Control" +
			"&ControlNodeTrigger=Trigger" +
			"&PageId=11" +
			"&FromName=" + 'Schalterzuweisung' +
			"&FromNameSub=" + 'Master A';
		});

		$('#Master_B_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
			"?LastURL=" + location.href +
			"&ControlPath=" + getControlAssignmentPath(controlMasterB, triggerMasterB, 1) +
			"&ControlId=" + controlMasterB +
			"&ControlTrigger=" + triggerMasterB +
			"&ControlNode=Control" +
			"&ControlNodeTrigger=Trigger" +
			"&PageId=11" +
			"&FromName=" + 'Schalterzuweisung' +
			"&FromNameSub=" + 'Master B';
		});

		$('#Master_C_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
			"?LastURL=" + location.href +
			"&ControlPath=" + getControlAssignmentPath(controlMasterC, triggerMasterC, 2) +
			"&ControlId=" + controlMasterC +
			"&ControlTrigger=" + triggerMasterC +
			"&ControlNode=Control" +
			"&ControlNodeTrigger=Trigger" +
			"&PageId=11" +
			"&FromName=" + 'Schalterzuweisung' +
			"&FromNameSub=" + 'Master C';
		});

		$('#Master_D_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
			"?LastURL=" + location.href +
			"&ControlPath=" + getControlAssignmentPath(controlMasterD, triggerMasterD, 3) +
			"&ControlId=" + controlMasterD +
			"&ControlTrigger=" + triggerMasterD +
			"&ControlNode=Control" +
			"&ControlNodeTrigger=Trigger" +
			"&PageId=11" +
			"&FromName=" + 'Schalterzuweisung' +
			"&FromNameSub=" + 'Master D';
		});

		$('#Master_E_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
			"?LastURL=" + location.href +
			"&ControlPath=" + getControlAssignmentPath(controlMasterE, triggerMasterE, 4) +
			"&ControlId=" + controlMasterE +
			"&ControlTrigger=" + triggerMasterE +
			"&ControlNode=Control" +
			"&ControlNodeTrigger=Trigger" +
			"&PageId=11" +
			"&FromName=" + 'Schalterzuweisung' +
			"&FromNameSub=" + 'Master E';
		});

		$('#Combi_1_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
			"?LastURL=" + location.href +
			"&ControlPath=" + getControlAssignmentPath(controlCombi1, triggerCombi1, 5) +
			"&ControlId=" + controlCombi1 +
			"&ControlTrigger=" + triggerCombi1 +
			"&ControlNode=Control" +
			"&ControlNodeTrigger=Trigger" +
			"&PageId=11" +
			"&FromName=" + 'Schalterzuweisung' +
			"&FromNameSub=" + 'Kombi 1';
		});

		$('#Combi_2_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
			"?LastURL=" + location.href +
			"&ControlPath=" + getControlAssignmentPath(controlCombi2, triggerCombi2, 6) +
			"&ControlId=" + controlCombi2 +
			"&ControlTrigger=" + triggerCombi2 +
			"&ControlNode=Control" +
			"&ControlNodeTrigger=Trigger" +
			"&PageId=11" +
			"&FromName=" + 'Schalterzuweisung' +
			"&FromNameSub=" + 'Kombi 2';
		});

		$('#Combi_3_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
			"?LastURL=" + location.href +
			"&ControlPath=" + getControlAssignmentPath(controlCombi3, triggerCombi3, 7) +
			"&ControlId=" + controlCombi3 +
			"&ControlTrigger=" + triggerCombi3 +
			"&ControlNode=Control" +
			"&ControlNodeTrigger=Trigger" +
			"&PageId=11" +
			"&FromName=" + 'Schalterzuweisung' +
			"&FromNameSub=" + 'Kombi 3';
		});

		initScrollbars('List_Container');
		g_isInit = true;
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	if(typeof oldState == "undefined" && typeof newState == "undefined" && typeof triggerState == "undefined"){
		oldState = -1,
		newState = -1;
		triggerState = -1;
	}
	
	g_currentState = e.EventData.FlightMode.Current.State;

	if(typeof preStateMasterA == "undefined"){
		preStateMasterA = -1;
	}

	if(typeof preStateMasterB == "undefined"){
		preStateMasterB = -1;
	}

	if(typeof preStateMasterC == "undefined"){
		preStateMasterC = -1;
	}

	if(typeof preStateMasterD == "undefined"){
		preStateMasterD = -1;
	}

	if(typeof preStateMasterE == "undefined"){
		preStateMasterE = -1;
	}

	if(typeof preStateCombi1 == "undefined"){
		preStateCombi1 = -1;
	}

	if(typeof preStateCombi2 == "undefined"){
		preStateCombi2 = -1;
	}

	if(typeof preStateCombi3 == "undefined"){
		preStateCombi3 = -1;
	}

	if(g_isInit && ((preStateMasterA != g_currentState[0]) || (preStateMasterB != g_currentState[1]) || (preStateMasterC != g_currentState[2]) || (preStateMasterD != g_currentState[3]) || (preStateMasterE != g_currentState[4]) || (preStateCombi1 != g_currentState[5]) || (preStateCombi2 != g_currentState[6]) || (preStateCombi3 != g_currentState[7]))){
		oldState = newState;
		currentFM = e.EventData.Current_FM.Index;
		
		$('#' + g_CurrentFlightModeObj.Name).removeClass('active_fm');

		if(g_currentState[0] == 1){
			g_CurrentFlightModeObj.Name = 'Master_A_Row';
			newState = 0;
		}
		else if(g_currentState[1] == 1){
			g_CurrentFlightModeObj.Name = 'Master_B_Row';
			newState = 1;
		}
		else if(g_currentState[2] == 1){
			g_CurrentFlightModeObj.Name = 'Master_C_Row';
			newState = 2;
		}
		else if(g_currentState[3] == 1){
			g_CurrentFlightModeObj.Name = 'Master_D_Row';
			newState = 3;
		}
		else if(g_currentState[4] == 1){
			g_CurrentFlightModeObj.Name = 'Master_E_Row';
			newState = 4;
		}
		else{
			g_CurrentFlightModeObj.Name = 'Combi_Row';
			newState = 5;
		}

		$('#' + g_CurrentFlightModeObj.Name).addClass('active_fm');
		
		
		if(preStateMasterA != g_currentState[0]){
			state2image("Master_A_State", g_currentState[0]);
			trigger2image("Master_A_Trigger", g_currentState[0]);

			preStateMasterA = g_currentState[0];
			triggerState = 0;
		}

		
		if(preStateMasterB != g_currentState[1]){
			state2image("Master_B_State", g_currentState[1]);
			trigger2image("Master_B_Trigger", g_currentState[1]);

			preStateMasterB = g_currentState[1];
			triggerState = 1;
		}

		
		if(preStateMasterC != g_currentState[2]){
			state2image("Master_C_State", g_currentState[2]);
			trigger2image("Master_C_Trigger", g_currentState[2]);

			preStateMasterC = g_currentState[2];
			triggerState = 2;
		}

		
		if(preStateMasterD != g_currentState[3]){
			state2image("Master_D_State", g_currentState[3]);
			trigger2image("Master_D_Trigger", g_currentState[3]);

			preStateMasterD = g_currentState[3];
			triggerState = 3;
		}

		
		if(preStateMasterE != g_currentState[4]){
			state2image("Master_E_State", g_currentState[4]);
			trigger2image("Master_E_Trigger", g_currentState[4]);

			preStateMasterE = g_currentState[4];
			triggerState = 4;
		}

		
		if(preStateCombi1 != g_currentState[5]){
			state2image("Combi_1_State", g_currentState[5]);
			trigger2image("Combi_1_Trigger", g_currentState[5]);

			preStateCombi1 = g_currentState[5];
			triggerState = 5;
		}

		
		if(preStateCombi2 != g_currentState[6]){
			state2image("Combi_2_State", g_currentState[6]);
			trigger2image("Combi_2_Trigger", g_currentState[6]);

			preStateCombi2 = g_currentState[6];
			triggerState = 5;
		}

		
		if(preStateCombi3 != g_currentState[7]){
			state2image("Combi_3_State", g_currentState[7]);
			trigger2image("Combi_3_Trigger", g_currentState[7]);

			preStateCombi3 = g_currentState[7];
			triggerState = 5;
		}

		g_currentCombination = e.EventData.FlightMode.Current.Combination;

		
		g_currentState = e.EventData.FlightMode.Current.State;

		if(oldState == -1){
			updateCombinationTree(0, 5, 0);
		}
		else{
			updateCombinationTree(oldState, newState, triggerState);
		}
	}

	setHTML("Master_A_Name", e.EventData.FlightMode.Current.MasterAStr);
	g_popupList_Indices["Master_A_Name"] = e.EventData.FlightMode.Current.MasterAIdx;
	setHTML("Master_B_Name", e.EventData.FlightMode.Current.MasterBStr);
	g_popupList_Indices["Master_B_Name"] = e.EventData.FlightMode.Current.MasterBIdx;
	setHTML("Master_C_Name", e.EventData.FlightMode.Current.MasterCStr);
	g_popupList_Indices["Master_C_Name"] = e.EventData.FlightMode.Current.MasterCIdx;
	setHTML("Master_D_Name", e.EventData.FlightMode.Current.MasterDStr);
	g_popupList_Indices["Master_D_Name"] = e.EventData.FlightMode.Current.MasterDIdx;
	setHTML("Master_E_Name", e.EventData.FlightMode.Current.MasterEStr);
	g_popupList_Indices["Master_E_Name"] = e.EventData.FlightMode.Current.MasterEIdx;
	setHTML("Combination_Name", e.EventData.FlightMode.Current.CombinationStr);
	g_popupList_Indices["Combination_Name"] = e.EventData.FlightMode.Current.CombinationIdx;
}


function onEVENT_SET(e){
	try{

	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}


function getControlAssignmentPath(control, trigger, Index){
	cmd = "set";
	ModelName = "model-settings";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"FMControlAssign":{"ControlSwitch":{"Control":' + control + ',"Trigger":' + trigger + ',"Index":' + Index + '}}}}}');

	return str;
}


function getPathObj(cmd, ModelName){
	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};

	return xmlObj;
}


function submitSET(tagId, value){
	cmd = "set";
	ModelName = "model-settings";
	Type = "FlightMode";

	if(tagId == "Master_A_Name"){
		g_currentState[0] = 1;
		g_currentState[1] = 0;
		g_currentState[2] = 0;
		g_currentState[3] = 0;
		g_currentState[4] = 0;
	}
	else if(tagId == "Master_B_Name"){
		g_currentState[0] = 0;
		g_currentState[1] = 1;
		g_currentState[2] = 0;
		g_currentState[3] = 0;
		g_currentState[4] = 0;
	}
	else if(tagId == "Master_C_Name"){
		g_currentState[0] = 0;
		g_currentState[1] = 0;
		g_currentState[2] = 1;
		g_currentState[3] = 0;
		g_currentState[4] = 0;
	}
	else if(tagId == "Master_D_Name"){
		g_currentState[0] = 0;
		g_currentState[1] = 0;
		g_currentState[2] = 0;
		g_currentState[3] = 1;
		g_currentState[4] = 0;
	}
	else if(tagId == "Master_E_Name"){
		g_currentState[0] = 0;
		g_currentState[1] = 0;
		g_currentState[2] = 0;
		g_currentState[3] = 0;
		g_currentState[4] = 1;
	}
	else if(tagId == "Combination_Name"){
		g_currentState[0] = 0;
		g_currentState[1] = 0;
		g_currentState[2] = 0;
		g_currentState[3] = 0;
		g_currentState[4] = 0;
	}

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName] = {};
	xmlObj[cmd][ModelName]["FMControlAssign"] = {};
	xmlObj[cmd][ModelName]["FMControlAssign"][Type] = {};
	xmlObj[cmd][ModelName]["FMControlAssign"][Type]["Index"] = parseInt(value);
	xmlObj[cmd][ModelName]["FMControlAssign"][Type]["State"] = g_currentState;

	GetTd(xmlObj, g_SetEvent, cmd);
}



function state2image(id, state){
	switch(state){
		case 0:		setHTML_Attribute(id, "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAA3CAYAAABeklfeAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAT3SURBVHja7Fp7iFRVHD6ji5qo62pbaT62EltUtDQfoZYPFAtRsxTEB2r/REbkY8UXqRFWZqv4flG0QSUqFYiS70wtfIGWsZAlRroqqZurLprb9P3Yb+js5c7cc+/MnTtw7w8+5sy9vzPn3O+c83vdicXjcaVLeXm5CkAeBYYCBcAfwD7gRrYnUVxcXOd7ngpWGgAfAq9b5nILeBtYHuTkgibnS+Alm+tNgFKgObAwqMnVC5CYF5IQo8t8oCiM5Ewx0KkPTAgjOU8Y6nUMIzlVhnq3wkjO94Z6R8NIziEDnQvA1jCSs8Dh/nVgLHA3bOSMAZ5Lcq8CWA10A46FLQhsxKjYKveBHsAZlSMSxM4pAdrbXF+XS8QEQY4kmHNsrl8DFqsck2yTsxRobHN9IQkKLTl9gHE2138GNqgclHpZHGcVELO5N53GOLTkTASesbn+NbBX5ahk0pX3Akbz+OQDA4FKoCnwvo2+BHezPIzTkOUO+X0p3bUEqoHfmWp8BVzNFXIkNlkB9LMclUq25wGP2PSTKt9vLsaR8sU0/t7DNvdl/EnASmANsAT4K50Hi6VZQ55OD6STfBroCfwDPA78wtXW5TLwJHDTcBwhYzvQ13K9khF1PnXqW8aQYtqPpg9jrSGnY3MkXinViNnCyXcnMSIf2RCT6GtKTCGT1L5aCWORqq3zSEG+E+MnIWcq8Cv1ZLce4BHM6s4ZBuyk97kNjAe+segMTmJsTwC9gX8Nj9JB7cgeZjJa4WAq3tPsWRUX7JzbnePF5jRgXBKjCx4B7Oe9B4BXgAGq9lWLVWQl3tSI6e9Q15E0YwdxD1hP45tK7jNFkZ35Dh3CBi6W7wZZjF47tks1YrrRUzyWou8XwA9sv0zjWaQdQ6uIB/rA46l4F3iepAxiFeCQmx/wYnPG87Nam/hDwG4HYkR/tiUzb82J+yFxbTyRyZnYOdcd+uTzc7em+xYJcrIfieNUpBEpR/Bbnwg6xUy/KwPRUQ76LZzIKTAcWLfcow1t1XBgE/tW0R508jnQPUly8lw8W9quXHdzbQz7tNPaN1wuhle5EnRudclQ77LWbqzFLX5K0yDI0V+27TDQF3uzS9tpD7J9zmdyOmQytxrr0Edym6cYxzRjPLFM1b62LUzR71O6ZsVYKCFHfCSmufq/kH9c2deuXZHj9J5IvJK8HWjC3Goxj5UEg9sYytuVJt5gW/rNYPtvw13nVUoYmIpsVi7fgXk5Vh9rRm4uUwHFBE+8wnw+sKzU5/RQkgDeoZ5k8G3ZXs30I1V5ooBo5nKevbl4CaP8WTYi5Grugq2c/C4+/HeMe5akGEuIeZXfzyep8+giduknklPD1GOtwRy7MlpP7JoZBmlHxgzyNj5owhXvZ/7SOUnw9yITzmnacRpp4KkuMrKt4e+s4aK0T6IvR3YBU5RWvLaOOzir9ZwYV75E1a0NSz3nLI9La1YICy1ufwSDM1MRJ1GmlT9quFPP8MgIKV2AIaru2w2xM69R33U9J5aBP0wO4VZ3cpk1TDxnKm9lTElsPwGeNtCtYM2ozM0Afvxhco+qreUOp4t+lts+jynCWeqUpRnTyI7swfxIKgMDtTwvUao4yQXY6MXGZPJYmRy7uI9uOsawoQVt15+s+XgWx2MVSeZzq4iciJxIInIiciJyInIiciJyInIiciJyInIiichxK/8JMAD5YBAkJJ3urwAAAABJRU5ErkJggg=="); break;
		case 1:		setHTML_Attribute(id, "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAA3CAYAAABeklfeAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAYbSURBVHja7JgLUJRVFMf3gYC4bIoIiIEMakCgaaZkRgQV0WQ0Rgw2tjT4ypQ0s6KaKXFqpjANHZ/5gnAKdbOZsCYhiZBMM8sKEHwxGvEUcYTlseDu9j/M2eab1YVlF4hm7pn5z3f3e927v+/ce+45cpPJJBN2e1MIBAKOgCPgCDgCjoAj4Ag4Ao4wAUfAEXAEHAFHwPlfmZPliYqKiv4A7g2NgpqhamggKmpyaBz30wLVQJ2OvDA4OLhnOH21kJAQWXl5+XA0l0AJULjFe29AhdCn0Fe4325Q6IeAPA29AEVBd0gu34ROQQehnVC7w/Qty6R2eE4S9AHka8O9v0ELAOgPO8Dcg8Ne6F4bbicvegvKdsRzHIGjhHZAiyTn2qDvoLM8pXygyVAk30+mhzQApO0DGPLIfZALnzJARVAJVAepobuhxyA3yaO7oaV8/6BOq80SMAQlfe3atZn79+8n1x/BMGgNaM3KylKHh4e/jfbz/Adz8If1AJRrA5g4ul8C99Dp06ff1Wg0N7gfZ/7zrfPmzTOuWbMmGe03GRKNrwtaNpjT6jnoc27X19bWzomOjm7iL2jNmsrKyuIUCsUmXrSvk1e9+mtwtbUHPp5eQVO1lBddI2xFaGjoYbQ9euinuaCgYJSvry/dN5bPzZeMd0CnFS2+lTxl2hsbG2MiIiKukUf4P7rMJ/Cp1AUuaq9wucLJ3djVUdfWcOnInzuTtc2Xz9AC2ZyUlNSlUqmU7BXthYWFemsdRUVFucC7qD+ZTqczZGdnD6MPoA6YNnzKkswEN68JsYphrj4m480WfXPDz5WH0/f+dXQbTTN9cXHxaE9Pz3weL50L7G2R7g84FJU+4XYaBk9rgXraywdnec+MXy+XK9wsHwCky2ezVyytKtxV72gE8Yta7B2i2bRD6Tw8wPKayWRsqzv1xerfNyeepA8B+It4YSZ7kaOYQ3ASehnf69AMqGPr1q1BW7Zs8bgzcoFX2MKdh+QKpcraQ4YOXcn1Cz/tcxTOqEkPaJSuqsnWrpuMBl3pniXxfxftbUhJSWlavnz5OZx2hX6BPuoFjrY3OLbuQ/LgNQtxHBO54eIqN+8JSUNlZ9tWfym7aPXEDDSvwnv24Pi4jdFK3l/pw0Wo21NcRvrMHErbfoxnBjdVPM5Bz6105vCKxVc1lOBQMJDsxVr+Czhe5lzG0NVeM5TgSMbTyePsn8ST9x89mTs/N529R9VaXZ43ctKs3qaWkRZLx72ie9Hv8aO21lTkS7z7Pknu1ScvsieUU35Du1DZlStXwmNjYzud3T2VkRmVmU6u7lajSGvd+V3HXgva5iich9afWzbC567F1q7f7GgpKVoVmNzZ0mjIy8tz8ff3P8mXMimv60sot2daZZkb48ePT3NycmqigZzZ9GwKjkW3xlaTAWB2F6eGbZfkRfZKRu+h99F7Lbvq0l0r4nEYaFwA8/7txj3Q6UMBFM3td3gjSFt8WWjy9skeQRH3K13c1J26a9U1xz8rvnxkY3eKMHXq1NacnJw5nA+RaZE+VPaQPgRyGaQ7YZ07d+5hjK97sQ2IfWWc7+z5Ec6q0eMM+rbmpnPFJ8syXyoxLw0I4Roc3+Pf30OPDFZWPpHLD+aosC4mJmZjVVWVmrfrt0S29PR0eVxc3C7O0Ml+hB4GHEMPcCja/AA9yKeO5ebmLkpNTTWZtxEW1u7n59eSn5+/Eu03JOsOrY/nB7Nk8SRlyJIyAnX+4YEDBwrS0tI6OYzqtVrt2LCwsGfQXi2BeQGaDY+7akNWPgaH49AkPkWL6obS0tIvExISarl/A/p0TkxMJO9IhYIk5ZF46JvBrueQzWJAY6WRFKriL2YuY0qN/mg8wNicZwGQN/cz+zaRtZq9yE9S1pBxskkf5YS9xS5HC+zU8RQoQ1K/pQFSUhhmAaYBWkXTqi9guBRbz9NxJb/n31SL+wmQgKFxbOQi2wlH/pzDZVKqIfPX9eCpFsUeM5pqOHSJa8jf4l69o6Ec/dA0eoL7CeHaDr33EnQU+pr77bP1Oq2E9d+0EnAEHGECjoAj4Ag4Ao6AI+AIOAKOMAFHwBFwBsD+EWAA3LlcXJInXFYAAAAASUVORK5CYII=");  break;
	}
}


function trigger2image(id, state){


	$('#' + id).addClass(g_TriggerState[id][0]);
}


function setTriggerState(tagId, trigger){
	var triggerArray = new Array();

	switch(trigger){
		case  -204:	triggerArray[0] = "icon_trigger_center";
					triggerArray[1] = "icon_trigger_center";
					break;
		case   512: triggerArray[0] = "icon_trigger_p25_white";
					triggerArray[1] = "icon_trigger_p25_blue";
					break;
		case  -512: triggerArray[0] = "icon_trigger_m25_white";
					triggerArray[1] = "icon_trigger_m25_blue";
					break;
		case  1536: triggerArray[0] = "icon_trigger_p75_white";
					triggerArray[1] = "icon_trigger_p75_blue";
					break;
		case -1536: triggerArray[0] = "icon_trigger_m75_white";
					triggerArray[1] = "icon_trigger_m75_blue";
					break;
		default:	triggerArray[0] = "icon_trigger_empty";
					triggerArray[1] = "icon_trigger_empty";
	}

	g_TriggerState[tagId] = triggerArray;
}


function drawCombinationTree(states, combinations, active_fm){
	var blue  = "#1488ff",
		grey  = "#aaa",
		white = "#fff";

	MasterW = 240;
	CombiW  = MasterW;
    MasterH = 61;
    CombiH  = 185;

    node_radius  = 2;
    combi_radius = 7;

    treeA = Raphael("Canvas_A", MasterW, MasterH);
    treeB = Raphael("Canvas_B", MasterW, MasterH);
    treeC = Raphael("Canvas_C", MasterW, MasterH);
    treeD = Raphael("Canvas_D", MasterW, MasterH);
    treeE = Raphael("Canvas_E", MasterW, MasterH);
    treeCombi = Raphael("Canvas_Combi", CombiW, CombiH);

    
    nodeA = treeA.circle(120, 13, node_radius).attr({fill: white, "stroke-width": 0});		
    nodeB = treeB.circle(120, 13, node_radius).attr({fill: grey, "stroke-width": 0});		
    nodeC = treeC.circle(120, 13, node_radius).attr({fill: grey, "stroke-width": 0});		
    nodeD = treeD.circle(120, 13, node_radius).attr({fill: grey, "stroke-width": 0});		
    nodeE = treeE.circle(120, 13, node_radius).attr({fill: grey, "stroke-width": 0});		

    node1 = treeCombi.circle(120, 13, node_radius).attr({fill: grey, "stroke-width": 0});	
    node2 = treeCombi.circle( 60, 31, node_radius).attr({fill: grey, "stroke-width": 0});	
    node3 = treeCombi.circle(180, 31, node_radius).attr({fill: grey, "stroke-width": 0});	
    node4 = treeCombi.circle( 30, 93, node_radius).attr({fill: grey, "stroke-width": 0});	
    node5 = treeCombi.circle( 90, 93, node_radius).attr({fill: grey, "stroke-width": 0});	
    node6 = treeCombi.circle(150, 93, node_radius).attr({fill: grey, "stroke-width": 0});	
    node7 = treeCombi.circle(210, 93, node_radius).attr({fill: grey, "stroke-width": 0});	
    

    
    circleA = treeA.circle(82, 31, combi_radius).attr({stroke: grey, "stroke-width": "3px"});
    circleB = treeB.circle(82, 31, combi_radius).attr({stroke: grey, "stroke-width": "3px"});
    circleC = treeC.circle(82, 31, combi_radius).attr({stroke: grey, "stroke-width": "3px"});
    circleD = treeD.circle(82, 31, combi_radius).attr({stroke: grey, "stroke-width": "3px"});
    circleE = treeE.circle(82, 31, combi_radius).attr({stroke: grey, "stroke-width": "3px"});

    circle1 = treeCombi.circle( 15, 155, combi_radius).attr({stroke: grey, "stroke-width": "3px"});
    circle2 = treeCombi.circle( 45, 155, combi_radius).attr({stroke: grey, "stroke-width": "3px"});
	circle3 = treeCombi.circle( 75, 155, combi_radius).attr({stroke: grey, "stroke-width": "3px"});
	circle4 = treeCombi.circle(105, 155, combi_radius).attr({stroke: grey, "stroke-width": "3px"});
	circle5 = treeCombi.circle(135, 155, combi_radius).attr({stroke: grey, "stroke-width": "3px"});
	circle6 = treeCombi.circle(165, 155, combi_radius).attr({stroke: grey, "stroke-width": "3px"});
	circle7 = treeCombi.circle(195, 155, combi_radius).attr({stroke: grey, "stroke-width": "3px"});
	circle8 = treeCombi.circle(225, 155, combi_radius).attr({stroke: grey, "stroke-width": "3px"});
	

	
	lineA1 = treeA.path("M91 26L117 14.5").attr({fill: grey,       stroke: grey, "stroke-width": "2px"});	
	lineA2 = treeA.path("M120 17L120 61").attr({fill: grey,        stroke: grey, "stroke-width": "2px"});	
	lineB1 = treeB.path("M120  0L120  9").attr({fill: grey,        stroke: grey, "stroke-width": "2px"});	

	lineB2 = treeB.path("M91 26L117 14.5").attr({fill: grey,       stroke: grey, "stroke-width": "2px"});	
	lineB3 = treeB.path("M120 17L120 61").attr({fill: grey,        stroke: grey, "stroke-width": "2px"});	
	lineC1 = treeC.path("M120  0L120  9").attr({fill: grey,        stroke: grey, "stroke-width": "2px"});	

	lineC2 = treeC.path("M91 26L117 14.5").attr({fill: grey,       stroke: grey, "stroke-width": "2px"});	
	lineC3 = treeC.path("M120 17L120 61").attr({fill: grey,        stroke: grey, "stroke-width": "2px"});	
	lineD1 = treeD.path("M120  0L120  9").attr({fill: grey,        stroke: grey, "stroke-width": "2px"});	

	lineD2 = treeD.path("M91 26L117 14.5").attr({fill: grey,       stroke: grey, "stroke-width": "2px"});	
	lineD3 = treeD.path("M120 17L120 61").attr({fill: grey,        stroke: grey, "stroke-width": "2px"});	
	lineE1 = treeE.path("M120  0L120  9").attr({fill: grey,        stroke: grey, "stroke-width": "2px"});	

	lineE2 = treeE.path("M91 26L117 14.5").attr({fill: grey,       stroke: grey, "stroke-width": "2px"});	
	lineE3 = treeE.path("M120 17L120 61").attr({fill: grey,        stroke: grey, "stroke-width": "2px"});	
	line0 = treeCombi.path("M120 0L120 9").attr({fill: grey,       stroke: grey, "stroke-width": "2px"});	

	line1 = treeCombi.path("M63  30L117 14").attr({fill: grey,     stroke: grey, "stroke-width": "2px"});	
	line2 = treeCombi.path("M177 30L123 14").attr({fill: grey,     stroke: grey, "stroke-width": "2px"});	
	line3 = treeCombi.path("M31 90L58.5 34").attr({fill: grey,     stroke: grey, "stroke-width": "2px"});	
	line4 = treeCombi.path("M89 90L61.5 34").attr({fill: grey,     stroke: grey, "stroke-width": "2px"});	
	line5 = treeCombi.path("M151 90L178.5 34").attr({fill: grey,   stroke: grey, "stroke-width": "2px"});	
	line6 = treeCombi.path("M209 90L181.5 34").attr({fill: grey,   stroke: grey, "stroke-width": "2px"});	
	line7 = treeCombi.path("M17 144.5L29 96").attr({fill: grey,    stroke: grey, "stroke-width": "2px"});	
	line8 = treeCombi.path("M44 144.5L31 96").attr({fill: grey,    stroke: grey, "stroke-width": "2px"});	
	line9 = treeCombi.path("M77 144.5L89 96").attr({fill: grey,    stroke: grey, "stroke-width": "2px"});	
	line10 = treeCombi.path("M104 144.5L91 96").attr({fill: grey,  stroke: grey, "stroke-width": "2px"});	
	line11 = treeCombi.path("M137 144.5L149 96").attr({fill: grey, stroke: grey, "stroke-width": "2px"});	
	line12 = treeCombi.path("M164 144.5L151 96").attr({fill: grey, stroke: grey, "stroke-width": "2px"});	
	line13 = treeCombi.path("M197 144.5L209 96").attr({fill: grey, stroke: grey, "stroke-width": "2px"});	
	line14 = treeCombi.path("M224 144.5L211 96").attr({fill: grey, stroke: grey, "stroke-width": "2px"});	
	
}


function updateCombinationTree(fromState, toState, sameState){
	if(fromState != toState){
		for(var i = fromState; i <= toState; i++){
			updateCombinationRow(i);
		}

		if(toState < fromState){
			for(var i = toState; i < 8; i++){
				updateCombinationRow(i);
			}
		}
	}
	else{
		updateCombinationRow(sameState);
	}
}


function updateCombinationRow(rowNumber){
	var blue  = "#1488ff",
		grey  = "#aaa",
		white = "#fff";
	
	var line_width_thin  = "2px",
		line_width_thick = "5px";

	if(rowNumber == 0){			
		if((g_currentState[rowNumber] == 1)){
			circleA.attr({stroke: blue});

			if(g_currentCombination[12] == 1){
				circleA.attr({fill: blue});
			}

			lineA1.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			lineA2.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thick});
			lineB1.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thick});
		}
		else if(g_currentState[0] == 0 && g_currentState[1] == 0 && g_currentState[2] == 0 && g_currentState[3] == 0 && g_currentState[4] == 0 && g_currentState[5] == 0 && g_currentState[6] == 0 && g_currentState[7] == 0){
			circleA.attr({stroke: grey});

			if(g_currentCombination[12] == 1){
				circleA.attr({fill: grey});
			}

			lineA1.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thin});
			lineA2.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			lineB1.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
		}
		else if(g_currentState[rowNumber + 1] == 1 || g_currentState[rowNumber + 2] == 1 || g_currentState[rowNumber + 3] == 1 || g_currentState[rowNumber + 4] == 1 || g_currentState[rowNumber + 5] == 1 || g_currentState[rowNumber + 6] == 1 || g_currentState[rowNumber + 7] == 1){
			circleA.attr({stroke: grey});

			if(g_currentCombination[12] == 1){
				circleA.attr({fill: grey});
			}

			lineA1.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thin});
			lineA2.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			lineB1.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
		}
		else{
			circleA.attr({stroke: grey});

			if(g_currentCombination[12] == 1){
				circleA.attr({fill: grey});
			}

			lineA1.attr({fill: grey, stroke: grey,  "stroke-width": line_width_thin});
			lineA2.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
			lineB1.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
		}
	}
	else if(rowNumber == 1){	
		if((g_currentState[rowNumber] == 1) && (g_currentState[rowNumber - 1] != 1)){
			circleB.attr({stroke: blue});

			if(g_currentCombination[11] == 1){
				circleB.attr({fill: blue});
			}

			nodeB.attr({fill: white});

			lineB2.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			lineB3.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thick});
			lineC1.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thick});
		}
		else if(g_currentState[0] == 0 && g_currentState[1] == 0 && g_currentState[2] == 0 && g_currentState[3] == 0 && g_currentState[4] == 0 && g_currentState[5] == 0 && g_currentState[6] == 0 && g_currentState[7] == 0){
			circleB.attr({stroke: grey});

			if(g_currentCombination[11] == 1){
				circleB.attr({fill: grey});
			}

			nodeB.attr({fill: white});

			lineB2.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thin});
			lineB3.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			lineC1.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
		}
		else if((g_currentState[rowNumber + 1] == 1 || g_currentState[rowNumber + 2] == 1 || g_currentState[rowNumber + 3] == 1 || g_currentState[rowNumber + 4] == 1 || g_currentState[rowNumber + 5] == 1 || g_currentState[rowNumber + 5] == 1) && (g_currentState[rowNumber - 1] != 1)){
			circleB.attr({stroke: grey});

			if(g_currentCombination[11] == 1){
				circleB.attr({fill: grey});
			}

			nodeB.attr({fill: white});

			lineB2.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thin});
			lineB3.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			lineC1.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
		}
		else{
			circleB.attr({stroke: grey});

			if(g_currentCombination[11] == 1){
				circleB.attr({fill: grey});
			}

			nodeB.attr({fill: grey});

			lineB2.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			lineB3.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
			lineC1.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
		}
	}
	else if(rowNumber == 2){	
		if((g_currentState[rowNumber] == 1) && (g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1)){
			circleC.attr({stroke: blue});

			if(g_currentCombination[10] == 1){
				circleC.attr({fill: blue});
			}

			nodeC.attr({fill: white});

			lineC2.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			lineC3.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thick});
			lineD1.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thick});
		}
		else if(g_currentState[0] == 0 && g_currentState[1] == 0 && g_currentState[2] == 0 && g_currentState[3] == 0 && g_currentState[4] == 0 && g_currentState[5] == 0 && g_currentState[6] == 0 && g_currentState[7] == 0){
			circleC.attr({stroke: grey});

			if(g_currentCombination[10] == 1){
				circleC.attr({fill: grey});
			}

			nodeC.attr({fill: white});

			lineC2.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thin});
			lineC3.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			lineD1.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
		}
		else if((g_currentState[rowNumber + 1] == 1 || g_currentState[rowNumber + 2] == 1 || g_currentState[rowNumber + 3] == 1 || g_currentState[rowNumber + 4] == 1 || g_currentState[rowNumber + 5] == 1) && (g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1)){
			circleC.attr({stroke: grey});

			if(g_currentCombination[10] == 1){
				circleC.attr({fill: grey});
			}

			nodeC.attr({fill: white});

			lineC2.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thin});
			lineC3.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			lineD1.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
		}
		else{
			circleC.attr({stroke: grey});

			if(g_currentCombination[10] == 1){
				circleC.attr({fill: grey});
			}

			nodeC.attr({fill: grey});

			lineC2.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			lineC3.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
			lineD1.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
		}
	}
	else if(rowNumber == 3){	
		if((g_currentState[rowNumber] == 1) && (g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1)){
			circleD.attr({stroke: blue});

			if(g_currentCombination[9] == 1){
				circleD.attr({fill: blue});
			}

			nodeD.attr({fill: white});

			lineD2.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			lineD3.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thick});
			lineE1.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thick});
		}
		else if(g_currentState[0] == 0 && g_currentState[1] == 0 && g_currentState[2] == 0 && g_currentState[3] == 0 && g_currentState[4] == 0 && g_currentState[5] == 0 && g_currentState[6] == 0 && g_currentState[7] == 0){
			circleD.attr({stroke: grey});

			if(g_currentCombination[9] == 1){
				circleD.attr({fill: grey});
			}

			nodeD.attr({fill: white});

			lineD2.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thin});
			lineD3.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			lineE1.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
		}
		else if((g_currentState[rowNumber + 1] == 1 || g_currentState[rowNumber + 2] == 1 || g_currentState[rowNumber + 3] == 1 || g_currentState[rowNumber + 4] == 1) && (g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1)){
			circleD.attr({stroke: grey});

			if(g_currentCombination[9] == 1){
				circleD.attr({fill: grey});
			}

			nodeD.attr({fill: white});

			lineD2.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thin});
			lineD3.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			lineE1.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
		}
		else{
			circleD.attr({stroke: grey});

			if(g_currentCombination[9] == 1){
				circleD.attr({fill: grey});
			}

			nodeD.attr({fill: grey});

			lineD2.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			lineD3.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
			lineE1.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
		}
	}
	else if(rowNumber == 4){	
		if((g_currentState[rowNumber] == 1) && (g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1)){
			circleE.attr({stroke: blue});

			if(g_currentCombination[8] == 1){
				circleE.attr({fill: blue});
			}

			nodeE.attr({fill: white});

			lineE2.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			lineE3.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thick});
			line0.attr({fill: grey,   stroke: grey,  "stroke-width": line_width_thick});
		}
		else if(g_currentState[0] == 0 && g_currentState[1] == 0 && g_currentState[2] == 0 && g_currentState[3] == 0 && g_currentState[4] == 0 && g_currentState[5] == 0 && g_currentState[6] == 0 && g_currentState[7] == 0){
			circleE.attr({stroke: grey});

			if(g_currentCombination[8] == 1){
				circleE.attr({fill: grey});
			}

			nodeE.attr({fill: white});

			lineE2.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thin});
			lineE3.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			line0.attr({fill: white,  stroke: white, "stroke-width": line_width_thick});
		}
		else if((g_currentState[rowNumber + 1] == 1 || g_currentState[rowNumber + 2] == 1 || g_currentState[rowNumber + 3] == 1) && (g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1)){
			circleE.attr({stroke: grey});

			if(g_currentCombination[8] == 1){
				circleE.attr({fill: grey});
			}

			nodeE.attr({fill: white});

			lineE2.attr({fill: grey,  stroke: grey,  "stroke-width": line_width_thin});
			lineE3.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
			line0.attr({fill: white,  stroke: white, "stroke-width": line_width_thick});
		}
		else{
			circleE.attr({stroke: grey});

			if(g_currentCombination[8] == 1){
				circleE.attr({fill: grey});
			}

			nodeE.attr({fill: grey});

			lineE2.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			lineE3.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
			line0.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thick});
		}
	}
	else if(rowNumber == 5){
		if(g_currentState[0] == 0 && g_currentState[1] == 0 && g_currentState[2] == 0 && g_currentState[3] == 0 && g_currentState[4] == 0 && g_currentState[5] == 0 && g_currentState[6] == 0 && g_currentState[7] == 0){
			line0.attr({fill: white,  stroke: white, "stroke-width": line_width_thick});
			node1.attr({fill: white});
		}
		else{
			if((g_currentState[rowNumber] == 1 || g_currentState[rowNumber + 1] == 1 || g_currentState[rowNumber + 2] == 1) && (g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1)){
				node1.attr({fill: white});
			}
			else{
				node1.attr({fill: grey});
			}
		}
		
		if(g_currentState[5] == 1){
			if(g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1){
				line1.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
				node2.attr({fill: white});
			}
			else{
				line1.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
				node2.attr({fill: grey});
			}
			
			line2.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			node3.attr({fill: grey});
		}
		else{
			line1.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			node2.attr({fill: grey});

			if(g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1){
				line2.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
				node3.attr({fill: white});
			}
			else{
				line2.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
				node3.attr({fill: grey});
			}
		}
		
		if(g_currentState[5] == 1 && g_currentState[6] == 1){
			if(g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1){
				line3.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
				node4.attr({fill: white});
			}
			else{
				line3.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
				node4.attr({fill: grey});
			}
			
			line4.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			node5.attr({fill: grey});
			line5.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			node6.attr({fill: grey});
			line6.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			node7.attr({fill: grey});
		}
		else if(g_currentState[5] == 1 && g_currentState[6] == 0){
			if(g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1){
				line4.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
				node5.attr({fill: white});
			}
			else{
				line4.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
				node5.attr({fill: grey});
			}

			line3.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			node4.attr({fill: grey});
			line5.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			node6.attr({fill: grey});
			line6.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			node7.attr({fill: grey});
		}
		else if(g_currentState[5] == 0 && g_currentState[6] == 1){
			if(g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1){
				line5.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
				node6.attr({fill: white});
			}
			else{
				line5.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
				node6.attr({fill: grey});
			}

			line3.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			node4.attr({fill: grey});
			line4.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			node5.attr({fill: grey});
			line6.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			node7.attr({fill: grey});
		}
		else{
			if(g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1){
				line6.attr({fill: white, stroke: white, "stroke-width": line_width_thick});
				node7.attr({fill: white});
			}
			else{
				line6.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});
				node7.attr({fill: grey});
			}

			line3.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			node4.attr({fill: grey});
			line4.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			node5.attr({fill: grey});
			line5.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			node6.attr({fill: grey});
		}

		if(g_currentState[5] == 1 && g_currentState[6] == 1 && g_currentState[7] == 1){
			if(g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1){
				line7.attr({fill: white, stroke: white, "stroke-width": line_width_thick});

				circle1.attr({stroke: blue});	

				if(g_currentCombination[7] == 1){
					circle1.attr({fill: blue});
				}
			}
			else{
				line7.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});

				circle1.attr({stroke: grey});	

				if(g_currentCombination[7] == 1){
					circle1.attr({fill: grey});
				}
			}

			line8.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line9.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line10.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line11.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line12.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line13.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line14.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});

			circle2.attr({stroke: grey});
			circle3.attr({stroke: grey});
			circle4.attr({stroke: grey});
			circle5.attr({stroke: grey});
			circle6.attr({stroke: grey});
			circle7.attr({stroke: grey});
			circle8.attr({stroke: grey});

			if(g_currentCombination[6] == 1){
				circle2.attr({fill: grey});
			}

			if(g_currentCombination[5] == 1){
				circle3.attr({fill: grey});
			}

			if(g_currentCombination[4] == 1){
				circle4.attr({fill: grey});
			}

			if(g_currentCombination[3] == 1){
				circle5.attr({fill: grey});
			}

			if(g_currentCombination[2] == 1){
				circle6.attr({fill: grey});
			}

			if(g_currentCombination[1] == 1){
				circle7.attr({fill: grey});
			}

			if(g_currentCombination[0] == 1){
				circle8.attr({fill: grey});
			}
		}
		else if(g_currentState[5] == 1 && g_currentState[6] == 1 && g_currentState[7] == 0){
			if(g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1){
				line8.attr({fill: white, stroke: white, "stroke-width": line_width_thick});

				circle2.attr({stroke: blue});	

				if(g_currentCombination[6] == 1){
					circle2.attr({fill: blue});
				}
			}
			else{
				line8.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});

				circle2.attr({stroke: grey});	

				if(g_currentCombination[6] == 1){
					circle2.attr({fill: grey});
				}
			}
			
			line7.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line9.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line10.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line11.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line12.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line13.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line14.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			
			circle1.attr({stroke: grey});
			circle3.attr({stroke: grey});
			circle4.attr({stroke: grey});
			circle5.attr({stroke: grey});
			circle6.attr({stroke: grey});
			circle7.attr({stroke: grey});
			circle8.attr({stroke: grey});

			if(g_currentCombination[7] == 1){
				circle1.attr({fill: grey});
			}

			if(g_currentCombination[5] == 1){
				circle3.attr({fill: grey});
			}

			if(g_currentCombination[4] == 1){
				circle4.attr({fill: grey});
			}

			if(g_currentCombination[3] == 1){
				circle5.attr({fill: grey});
			}

			if(g_currentCombination[2] == 1){
				circle6.attr({fill: grey});
			}

			if(g_currentCombination[1] == 1){
				circle7.attr({fill: grey});
			}

			if(g_currentCombination[0] == 1){
				circle8.attr({fill: grey});
			}
		}
		else if(g_currentState[5] == 1 && g_currentState[6] == 0 && g_currentState[7] == 1){
			if(g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1){
				line9.attr({fill: white, stroke: white, "stroke-width": line_width_thick});

				circle3.attr({stroke: blue});	

				if(g_currentCombination[5] == 1){
					circle3.attr({fill: blue});
				}
			}
			else{
				line9.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});

				circle3.attr({stroke: grey});	

				if(g_currentCombination[5] == 1){
					circle3.attr({fill: grey});
				}
			}

			line7.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line8.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line10.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line11.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line12.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line13.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line14.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			
			circle1.attr({stroke: grey});
			circle2.attr({stroke: grey});
			circle4.attr({stroke: grey});
			circle5.attr({stroke: grey});
			circle6.attr({stroke: grey});
			circle7.attr({stroke: grey});
			circle8.attr({stroke: grey});

			if(g_currentCombination[7] == 1){
				circle1.attr({fill: grey});
			}

			if(g_currentCombination[6] == 1){
				circle2.attr({fill: grey});
			}

			if(g_currentCombination[4] == 1){
				circle4.attr({fill: grey});
			}

			if(g_currentCombination[3] == 1){
				circle5.attr({fill: grey});
			}

			if(g_currentCombination[2] == 1){
				circle6.attr({fill: grey});
			}

			if(g_currentCombination[1] == 1){
				circle7.attr({fill: grey});
			}

			if(g_currentCombination[0] == 1){
				circle8.attr({fill: grey});
			}
		}
		else if(g_currentState[5] == 1 && g_currentState[6] == 0 && g_currentState[7] == 0){
			if(g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1){
				line10.attr({fill: white, stroke: white, "stroke-width": line_width_thick});

				circle4.attr({stroke: blue});	

				if(g_currentCombination[4] == 1){
					circle4.attr({fill: blue});
				}
			}
			else{
				line10.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});

				circle4.attr({stroke: grey});	

				if(g_currentCombination[4] == 1){
					circle4.attr({fill: grey});
				}
			}
			
			line7.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line8.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line9.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line11.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line12.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line13.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line14.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});

			circle1.attr({stroke: grey});
			circle2.attr({stroke: grey});
			circle3.attr({stroke: grey});
			circle5.attr({stroke: grey});
			circle6.attr({stroke: grey});
			circle7.attr({stroke: grey});
			circle8.attr({stroke: grey});

			if(g_currentCombination[7] == 1){
				circle1.attr({fill: grey});
			}

			if(g_currentCombination[6] == 1){
				circle2.attr({fill: grey});
			}

			if(g_currentCombination[5] == 1){
				circle3.attr({fill: grey});
			}

			if(g_currentCombination[3] == 1){
				circle5.attr({fill: grey});
			}

			if(g_currentCombination[2] == 1){
				circle6.attr({fill: grey});
			}

			if(g_currentCombination[1] == 1){
				circle7.attr({fill: grey});
			}

			if(g_currentCombination[0] == 1){
				circle8.attr({fill: grey});
			}
		}
		else if(g_currentState[5] == 0 && g_currentState[6] == 1 && g_currentState[7] == 1){
			if(g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1){
				line11.attr({fill: white, stroke: white, "stroke-width": line_width_thick});

				circle5.attr({stroke: blue});	

				if(g_currentCombination[3] == 1){
					circle5.attr({fill: blue});
				}
			}
			else{
				line11.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});

				circle5.attr({stroke: grey});	

				if(g_currentCombination[3] == 1){
					circle5.attr({fill: grey});
				}
			}
			
			line7.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line8.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line9.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line10.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line12.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line13.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line14.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			
			circle1.attr({stroke: grey});
			circle2.attr({stroke: grey});
			circle3.attr({stroke: grey});
			circle4.attr({stroke: grey});
			circle6.attr({stroke: grey});
			circle7.attr({stroke: grey});
			circle8.attr({stroke: grey});

			if(g_currentCombination[7] == 1){
				circle1.attr({fill: grey});
			}

			if(g_currentCombination[6] == 1){
				circle2.attr({fill: grey});
			}

			if(g_currentCombination[5] == 1){
				circle3.attr({fill: grey});
			}

			if(g_currentCombination[4] == 1){
				circle4.attr({fill: grey});
			}

			if(g_currentCombination[2] == 1){
				circle6.attr({fill: grey});
			}

			if(g_currentCombination[1] == 1){
				circle7.attr({fill: grey});
			}

			if(g_currentCombination[0] == 1){
				circle8.attr({fill: grey});
			}
		}
		else if(g_currentState[5] == 0 && g_currentState[6] == 1 && g_currentState[7] == 0){
			if(g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1){
				line12.attr({fill: white, stroke: white, "stroke-width": line_width_thick});

				circle6.attr({stroke: blue});	

				if(g_currentCombination[2] == 1){
					circle6.attr({fill: blue});
				}
			}
			else{
				line12.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});

				circle6.attr({stroke: grey});	

				if(g_currentCombination[2] == 1){
					circle6.attr({fill: grey});
				}
			}

			line7.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line8.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line9.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line10.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line11.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line13.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line14.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});

			circle1.attr({stroke: grey});
			circle2.attr({stroke: grey});
			circle3.attr({stroke: grey});
			circle4.attr({stroke: grey});
			circle5.attr({stroke: grey});
			circle7.attr({stroke: grey});
			circle8.attr({stroke: grey});

			if(g_currentCombination[7] == 1){
				circle1.attr({fill: grey});
			}

			if(g_currentCombination[6] == 1){
				circle2.attr({fill: grey});
			}

			if(g_currentCombination[5] == 1){
				circle3.attr({fill: grey});
			}

			if(g_currentCombination[4] == 1){
				circle4.attr({fill: grey});
			}

			if(g_currentCombination[3] == 1){
				circle5.attr({fill: grey});
			}

			if(g_currentCombination[1] == 1){
				circle7.attr({fill: grey});
			}

			if(g_currentCombination[0] == 1){
				circle8.attr({fill: grey});
			}
		}
		else if(g_currentState[5] == 0 && g_currentState[6] == 0 && g_currentState[7] == 1){
			if(g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1){
				line13.attr({fill: white, stroke: white, "stroke-width": line_width_thick});

				circle7.attr({stroke: blue});	

				if(g_currentCombination[1] == 1){
					circle7.attr({fill: blue});
				}
			}
			else{
				line13.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});

				circle7.attr({stroke: grey});	

				if(g_currentCombination[1] == 1){
					circle7.attr({fill: grey});
				}
			}

			line7.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line8.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line9.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line10.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line11.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line12.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line14.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});

			circle1.attr({stroke: grey});
			circle2.attr({stroke: grey});
			circle3.attr({stroke: grey});
			circle4.attr({stroke: grey});
			circle5.attr({stroke: grey});
			circle6.attr({stroke: grey});
			circle8.attr({stroke: grey});

			if(g_currentCombination[7] == 1){
				circle1.attr({fill: grey});
			}

			if(g_currentCombination[6] == 1){
				circle2.attr({fill: grey});
			}

			if(g_currentCombination[5] == 1){
				circle3.attr({fill: grey});
			}

			if(g_currentCombination[4] == 1){
				circle4.attr({fill: grey});
			}

			if(g_currentCombination[3] == 1){
				circle5.attr({fill: grey});
			}

			if(g_currentCombination[2] == 1){
				circle6.attr({fill: grey});
			}

			if(g_currentCombination[0] == 1){
				circle8.attr({fill: grey});
			}
		}
		else{
			if(g_currentState[rowNumber - 1] != 1 && g_currentState[rowNumber - 2] != 1 && g_currentState[rowNumber - 3] != 1 && g_currentState[rowNumber - 4] != 1 && g_currentState[rowNumber - 5] != 1){
				line14.attr({fill: white, stroke: white, "stroke-width": line_width_thick});

				circle8.attr({stroke: blue});	

				if(g_currentCombination[0] == 1){
					circle8.attr({fill: blue});
				}
			}
			else{
				line14.attr({fill: grey, stroke: grey, "stroke-width": line_width_thick});

				circle8.attr({stroke: grey});	

				if(g_currentCombination[0] == 1){
					circle8.attr({fill: grey});
				}
			}

			line7.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line8.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line9.attr({fill: grey,  stroke: grey, "stroke-width": line_width_thin});
			line10.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line11.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line12.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});
			line13.attr({fill: grey, stroke: grey, "stroke-width": line_width_thin});

			circle1.attr({stroke: grey});
			circle2.attr({stroke: grey});
			circle3.attr({stroke: grey});
			circle4.attr({stroke: grey});
			circle5.attr({stroke: grey});
			circle6.attr({stroke: grey});
			circle7.attr({stroke: grey});

			if(g_currentCombination[7] == 1){
				circle1.attr({fill: grey});
			}

			if(g_currentCombination[6] == 1){
				circle2.attr({fill: grey});
			}

			if(g_currentCombination[5] == 1){
				circle3.attr({fill: grey});
			}

			if(g_currentCombination[4] == 1){
				circle4.attr({fill: grey});
			}

			if(g_currentCombination[3] == 1){
				circle5.attr({fill: grey});
			}

			if(g_currentCombination[2] == 1){
				circle6.attr({fill: grey});
			}

			if(g_currentCombination[1] == 1){
				circle7.attr({fill: grey});
			}
		}
	}
}
