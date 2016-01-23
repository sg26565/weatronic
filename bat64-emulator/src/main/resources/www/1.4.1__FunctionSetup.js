



var g_GET_Parameter = get_GET_Parameter();
var g_FunctionIndex = parseInt((g_GET_Parameter.FunctionIndex), 10);
var g_FunctionListView = g_GET_Parameter.FunctionView;


var g_FailSafe = '';
var g_preFlightMode = -1;
var g_currentFlightMode = -1;


initPage();

function initPage(){
	PATH_POINT_X_MIN =   0;
	PATH_POINT_X_MAX = 344;
	path_points_count = 33;
	path_points_distance = (PATH_POINT_X_MAX - PATH_POINT_X_MIN) / (path_points_count - 1);

	path_points = new Array;

	var curve_coords = [344,333,323,312,301,290,280,269,258,247,237,226,215,204,194,183,172,161,151,140,129,118,108,97,86,75,65,54,43,32,22,11,0];

	for(var i = 0; i < path_points_count; i++){
		var path_x = Math.floor((path_points_distance * i) + PATH_POINT_X_MIN);
		path_points.push(new C_CurvePoint(i, path_x, curve_coords[i]));
	}



	$('#Navi_Button').removeAttr("href");
	$('#Navi_Button').bind("click", function(){
		if(g_FunctionListView == "ListSetup"){
			window.location.href = "1.4.0.0__FunctionsSetupView.html?FunctionIndex=" + g_FunctionIndex;
		}
		else{
			window.location.href = "1.4.0__Functions.html?FunctionIndex=" + g_FunctionIndex;
		}
	});

	
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Control");
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Control_Positiv");
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "FadeDuration");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "FailsafeMode");
	
	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	GetTd(getFunctionObject(InitDataPostArgs, g_FunctionIndex), g_InitEvent);



	TdPostArgs = getCurrentFlightMode(TdPostArgs);



	g_isAdditionalControlObjectUsed = true;
	TdPostArgs = getCurrentFunctionObject(TdPostArgs, g_FunctionIndex);


	setInterval(JsonFunction, 250);
}



function getFunctionObject(InitDataPostArgs, FunctionIndex){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

	Item = new Object();
	Item.Index = -1;
	Item.Name = "";
	Item.ControlID = -1;
	Item.ControlRateID = -1;
	Item.ControlExpoID = -1;
	Item.ControlDifferentialID = -1;

	

	
		FailSafePos = new Object();
			mode = new Object();
			mode.Index = -1;
			mode.Name = "";
		FailSafePos.Mode = mode;
		
		FailSafePos.ValueStr = "";
	Item.FailSafePos = FailSafePos;

	

	Item.Setup = Item.Setup = getFunctionSetupObject();

	functionItems = new Array(Item);

	Function = new Object();
	Function.Items = "" + FunctionIndex;

	Function.Item = functionItems;

	InitDataPostArgs.Function = Function;

	return InitDataPostArgs;
}


function getCurrentFunctionObject(TdPostArgs, FunctionIndex){
	Current = new Object();
	Current.FunctionStr = "";
	Current.ControlStr = "";
	Current.FlexRateStr = "";
	Current.FlexExpoStr = "";
	Current.FlexDifferentialStr = "";

	
	Current.CurvePath = [];
	Current.CrossX = 250;
	Current.CrossY = 100;
	Current.FailSafeY = 0;

	

	Function = new Object();
	Function.Current = Current;
	Function.Items = "" + FunctionIndex;

	TdPostArgs.Function = Function;

	return TdPostArgs;
}


function getFunctionFlightModeObject(FmDataPostArgs, FunctionIndex){
	if(typeof FmDataPostArgs == "undefined"){
		FmDataPostArgs = new Object();
	}

	Item = new Object();
	Item.Index = 0;

	Item.Setup = getFunctionSetupObject();

	functionItems = new Array(Item);

	Function = new Object();
	Function.Items = "" + FunctionIndex;

	Function.Item = functionItems;

	FmDataPostArgs.Function = Function;

	return FmDataPostArgs;
}


function getFunctionSetupObject(){
	
	Setup = new Object();
	Setup.CurveIdx = 0;

		
		FlexRate = new Object();
		FlexRate.Hi = "";
		FlexRate.Center = "";
		FlexRate.Lo = "";
	Setup.FlexRateStr = FlexRate;

		
		FlexExpo = new Object();
		FlexExpo.Hi = "";
		FlexExpo.Center = "";
		FlexExpo.Lo = "";
	Setup.FlexExpoStr = FlexExpo;

		
		FlexDiff = new Object();
		FlexDiff.Hi = "";
		FlexDiff.Center = "";
		FlexDiff.Lo = "";
	Setup.FlexDifferentialStr = FlexDiff;

		
		Duration = new Object();
		Duration.FromLeftStr = "";
		Duration.FromRightStr = "";
	Setup.Duration = Duration;

	return Setup;
}


function onEVENT_INIT(e){
	try{
		setHeaderMaxWidth('Model_Name', 'Flight_Mode');
		g_numpadLimitObj = e.EventData.NumPadLimits;

		
		g_Function_Control = e.EventData.Function.Item[0].ControlID;
		g_FunctionSetup_Control_FlexRate = e.EventData.Function.Item[0].ControlRateID;
		g_FunctionSetup_Control_FlexExpo = e.EventData.Function.Item[0].ControlExpoID;
		g_FunctionSetup_Control_FlexDiff = e.EventData.Function.Item[0].ControlDifferentialID;

		controlFlexRate = new Object();
		controlFlexRate.ID = g_FunctionSetup_Control_FlexRate;
		controlFlexRate.Value = 0;

		controlFlexExpo = new Object();
		controlFlexExpo.ID = g_FunctionSetup_Control_FlexExpo;
		controlFlexExpo.Value = 0;

		controlFlexDiff = new Object();
		controlFlexDiff.ID = g_FunctionSetup_Control_FlexDiff;
		controlFlexDiff.Value = 0;

		controlIds.push(controlFlexRate, controlFlexExpo, controlFlexDiff);

		TdPostArgs.Control_Val = controlIds;

		
		setHTML('Model_Name', e.EventData.ModelName);

		setHTML('Function_Name', e.EventData.Function.Item[0].Name);
		setHTML('Function_Name_Canvas', e.EventData.Function.Item[0].Name);

		setHTML('Fail_Safe_Mode', e.EventData.Function.Item[0].FailSafePos.Mode.Name);
		setHTML('Fail_Safe_Value_Value', e.EventData.Function.Item[0].FailSafePos.ValueStr);

		setHTML4FlightMode(e);

		control2image('Control_IMG', g_Function_Control);

		control2image('Flex_Rate_Control', controlFlexRate.ID);
		control2image('Flex_Expo_Control', controlFlexExpo.ID);
		control2image('Flex_Diff_Control', controlFlexDiff.ID);

		g_FailSafe = e.EventData.Function.Item[0].FailSafePos.Mode.Index;
		checkFailSafePosState(g_FailSafe);

		
		
		$('#Curve_Edit_Button').bind("click", function(){window.location.href = "9.2.0__CurveEdit.html?Index=" + g_FunctionIndex + "&LastURL="+ location.href + "&PageType=FunctionIndex";});

		
		$('#Flex_Rate_High_Value').bind("click", function(){showNumpad("Flex_Rate_High_Value", "Control_Positiv");});
		$('#Flex_Rate_Center_Value').bind("click", function(){showNumpad("Flex_Rate_Center_Value", "Control_Positiv");});
		$('#Flex_Rate_Low_Value').bind("click", function(){showNumpad("Flex_Rate_Low_Value", "Control_Positiv");});

		$('#Flex_Expo_High_Value').bind("click", function(){showNumpad("Flex_Expo_High_Value", "Control");});
		$('#Flex_Expo_Center_Value').bind("click", function(){showNumpad("Flex_Expo_Center_Value", "Control");});
		$('#Flex_Expo_Low_Value').bind("click", function(){showNumpad("Flex_Expo_Low_Value", "Control");});

		$('#Flex_Diff_High_Value').bind("click", function(){showNumpad("Flex_Diff_High_Value", "Control");});
		$('#Flex_Diff_Center_Value').bind("click", function(){showNumpad("Flex_Diff_Center_Value", "Control");});
		$('#Flex_Diff_Low_Value').bind("click", function(){showNumpad("Flex_Diff_Low_Value", "Control");});

		$('#Fail_Safe_Value_Value').bind("click", function(){showNumpad("Fail_Safe_Value_Value", "Control");});

		$('#Duration_From').bind("click", function(){showNumpad("Duration_From", "FadeDuration");});
		$('#Duration_To').bind("click", function(){showNumpad("Duration_To", "FadeDuration");});

		
		g_popupList_Indices["Fail_Safe_Mode"] = e.EventData.Function.Item[0].FailSafePos.Mode.Index;
		$('#Fail_Safe_Mode').bind("click", function(){showPopupList(this, e.EventData.PopUp.FailsafeMode, false, true, g_popupList_Indices);});

		
		$('#Control_IMG').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
				"?LastURL=" + location.href +
				"&ControlPath=" + getControlAssignmentPathRate("Control", g_Function_Control, g_FunctionIndex) +
				"&ControlId=" + g_Function_Control +
				"&ControlNode=Control" +
				"&PageId=3" +
				"&FromName=" + e.EventData.Function.Item[0].Name;
		});

		$('#Flex_Rate_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
				"?LastURL=" + location.href +
				"&ControlPath=" + getControlAssignmentPathRate("ControlRate", controlFlexRate.ID, g_FunctionIndex) +
				"&ControlId=" + controlFlexRate.ID +
				"&ControlNode=ControlRate" +
				"&PageId=2" +
				"&FromName=" + e.EventData.Function.Item[0].Name +
				"&FromNameSub=" + 'Flex Rate';
		});

		$('#Flex_Expo_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
				"?LastURL=" + location.href +
				"&ControlPath=" + getControlAssignmentPathRate("ControlExpo", controlFlexExpo.ID, g_FunctionIndex) +
				"&ControlId=" + controlFlexExpo.ID +
				"&ControlNode=ControlExpo" +
				"&PageId=2" +
				"&FromName=" + e.EventData.Function.Item[0].Name +
				"&FromNameSub=" + 'Flex Expo';
		});

		$('#Flex_Diff_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
				"?LastURL=" + location.href +
				"&ControlPath=" + getControlAssignmentPathRate("ControlDifferential", controlFlexDiff.ID, g_FunctionIndex) +
				"&ControlId=" + controlFlexDiff.ID +
				"&ControlNode=ControlDifferential" +
				"&PageId=0" +
				"&FromName=" + e.EventData.Function.Item[0].Name +
				"&FromNameSub=" + 'Differenzierung';
		});
		
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "control"){
		
		if((key == g_FunctionSetup_Control_FlexRate) || (key == g_FunctionSetup_Control_FlexExpo) || (key == g_FunctionSetup_Control_FlexDiff)){
			var val = Value12Bit2Percent(value);

			if(key == g_FunctionSetup_Control_FlexRate){
				tagID = 'Flex_Rate_';

				if(typeof RateState == 'undefined'){
					RateState = "Invalid";
				}

				RateState = setControlAssignments(tagID, val, RateState);
			}

			if(key == g_FunctionSetup_Control_FlexExpo){
				tagID = 'Flex_Expo_';

				if(typeof ExpoState == 'undefined'){
					ExpoState = "Invalid";
				}

				ExpoState = setControlAssignments(tagID, val, ExpoState);
			}

			if(key == g_FunctionSetup_Control_FlexDiff){
				tagID = 'Flex_Diff_';

				if(typeof DiffState == 'undefined'){
					DiffState = "Invalid";
				}

				DiffState = setControlAssignments(tagID, val, DiffState);
			}
		}
	}

	if(cmd == "AdditionalControlObject"){
		
		if(typeof htmlObj_FuncValue == 'undefined'){
			htmlObj_FuncValue = document.getElementById('Function_Value');
		}

		htmlObj_FuncValue.innerHTML = e.EventData.Function.Current.FunctionStr;

		if(typeof htmlObj_ControlValue == 'undefined'){
			htmlObj_ControlValue = document.getElementById('Control_Value');
		}

		htmlObj_ControlValue.innerHTML = e.EventData.Function.Current.ControlStr;

		if(typeof htmlObj_FlexRateValue == 'undefined'){
			htmlObj_FlexRateValue = document.getElementById('Flex_Rate_Empty_Value');
		}

		htmlObj_FlexRateValue.innerHTML = e.EventData.Function.Current.FlexRateStr;

		if(typeof htmlObj_FlexExpoValue == 'undefined'){
			htmlObj_FlexExpoValue = document.getElementById('Flex_Expo_Empty_Value');
		}

		htmlObj_FlexExpoValue.innerHTML = e.EventData.Function.Current.FlexExpoStr;

		if(typeof htmlObj_FlexDiffValue == 'undefined'){
			htmlObj_FlexDiffValue = document.getElementById('Flex_Diff_Empty_Value');
		}

		htmlObj_FlexDiffValue.innerHTML = e.EventData.Function.Current.FlexDifferentialStr;

	
	
	
	

		updateCrosshair('x', e.EventData.Function.Current.CrossX);
		updateCrosshair('y', e.EventData.Function.Current.CrossY);
		updateCurve(e.EventData.Function.Current.CurvePath);

		if(g_FailSafe != "Hold"){
			updateFailSafe(e.EventData.Function.Current.FailSafeY);
		}

		
	
	
	
	

	




	}

	
	if(cmd == "flightmode"){
		if(typeof htmlObj_FlightMode == "undefined"){
			htmlObj_FlightMode = document.getElementById('Flight_Mode');
		}

		if(typeof preFlightMode == "undefined"){
			g_currentFlightMode = e.EventData.Current_FM.Index;
			preFlightMode = g_currentFlightMode;
			g_preFlightMode = preFlightMode;
			htmlObj_FlightMode.innerHTML = e.EventData.Current_FM.Name;
		}

		if(preFlightMode != e.EventData.Current_FM.Index){
			htmlObj_FlightMode.innerHTML = e.EventData.Current_FM.Name;
			g_currentFlightMode = e.EventData.Current_FM.Index;
			preFlightMode = g_currentFlightMode;
			GetTd(getFunctionFlightModeObject(FmDataPostArgs, g_FunctionIndex), g_FmEvent);
		}
	}
}


function onEVENT_FM_CHANGED(e){
	try{
		setHTML4FlightMode(e);
	}catch(err){
		onError(err, "Error Flight Mode-data: ", false);
	}
}


function onEVENT_SET(e){
	try{

	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}


function checkFailSafePosState(value){
	if(value == 1){
		hideHTML('Fail_Safe_Canvas');
		hideHTML('Fail_Safe_Label_Canvas');
		hideHTML('Fail_Safe_Value_Value');
		showHTML('Fail_Safe_Hold_Value');
	}
	else{
		showHTML('Fail_Safe_Canvas');
		showHTML('Fail_Safe_Label_Canvas');
		showHTML('Fail_Safe_Value_Value');
		hideHTML('Fail_Safe_Hold_Value');
	}

	g_FailSafe = value;
}


function setHTML4FlightMode(e){
	if(numpadOpen){
		handleNoneClosedNumpad();
	}

	g_preFlightMode = g_currentFlightMode;

	setHTML('Flex_Rate_High_Value', e.EventData.Function.Item[0].Setup.FlexRateStr.Hi);
	setHTML('Flex_Rate_Center_Value', e.EventData.Function.Item[0].Setup.FlexRateStr.Center);
	setHTML('Flex_Rate_Low_Value', e.EventData.Function.Item[0].Setup.FlexRateStr.Lo);

	setHTML('Flex_Expo_High_Value', e.EventData.Function.Item[0].Setup.FlexExpoStr.Hi);
	setHTML('Flex_Expo_Center_Value', e.EventData.Function.Item[0].Setup.FlexExpoStr.Center);
	setHTML('Flex_Expo_Low_Value', e.EventData.Function.Item[0].Setup.FlexExpoStr.Lo);

	setHTML('Flex_Diff_High_Value', e.EventData.Function.Item[0].Setup.FlexDifferentialStr.Hi);
	setHTML('Flex_Diff_Center_Value', e.EventData.Function.Item[0].Setup.FlexDifferentialStr.Center);
	setHTML('Flex_Diff_Low_Value', e.EventData.Function.Item[0].Setup.FlexDifferentialStr.Lo);

	
	setHTML('Duration_From', e.EventData.Function.Item[0].Setup.Duration.FromLeftStr);
	setHTML('Duration_To', e.EventData.Function.Item[0].Setup.Duration.FromRightStr);
}


function getControlAssignmentPathRate(controlNode, value, Index){
	cmd = "set";
	ModelName = "model-settings";
	ListType = "Function";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"' + ListType + '":{"' + controlNode + '":"' + value + '","Index":' + Index + '}}}}');

	return str;
}


function getAttrObj(tagId, value){
	Attribute = new Object();

	if((tagId == "Fail_Safe_Mode") || (tagId == "Fail_Safe_Value_Value")){
		Attribute["FailSafePos"] = {};

		if(tagId == "Fail_Safe_Mode"){
			checkFailSafePosState(value);
			Attribute["FailSafePos"]["Mode"] = value;

			return Attribute;
		}

		if(tagId == "Fail_Safe_Value_Value"){
			Attribute["FailSafePos"]["Value"] = value;

			return Attribute;
		}
	}
	else{
		Attribute["Setup"] = {};

		if((tagId == "Flex_Rate_Center_Value") || (tagId == "Flex_Rate_High_Value") || (tagId == "Flex_Rate_Low_Value")){
			Attribute["Setup"]["FlexRate"] = {};

			if(tagId == "Flex_Rate_Center_Value"){
				Attribute["Setup"]["FlexRate"]["Center"] = value;

				return Attribute;
			}

			if(tagId == "Flex_Rate_High_Value"){
				Attribute["Setup"]["FlexRate"]["Hi"] = value;

				return 	Attribute;
			}

			if(tagId == "Flex_Rate_Low_Value"){
				Attribute["Setup"]["FlexRate"]["Lo"] = value;

				return Attribute;
			}
		}

		if((tagId == "Flex_Expo_Center_Value") || (tagId == "Flex_Expo_High_Value") || (tagId == "Flex_Expo_Low_Value")){
			Attribute["Setup"]["FlexExpo"] = {};

			if(tagId == "Flex_Expo_Center_Value"){
				Attribute["Setup"]["FlexExpo"]["Center"] = value;

				return Attribute;
			}

			if(tagId == "Flex_Expo_High_Value"){
				Attribute["Setup"]["FlexExpo"]["Hi"] = value;

				return 	Attribute;
			}

			if(tagId == "Flex_Expo_Low_Value"){
				Attribute["Setup"]["FlexExpo"]["Lo"] = value;

				return Attribute;
			}
		}

		if((tagId == "Flex_Diff_Center_Value") || (tagId == "Flex_Diff_High_Value") || (tagId == "Flex_Diff_Low_Value")){
			Attribute["Setup"]["FlexDifferential"] = {};

			if(tagId == "Flex_Diff_Center_Value"){
				Attribute["Setup"]["FlexDifferential"]["Center"] = value;

				return Attribute;
			}

			if(tagId == "Flex_Diff_High_Value"){
				Attribute["Setup"]["FlexDifferential"]["Hi"] = value;

				return Attribute;
			}

			if(tagId == "Flex_Diff_Low_Value"){
				Attribute["Setup"]["FlexDifferential"]["Lo"] = value;

				return Attribute;
			}
		}
		else{
			Attribute["Setup"]["Duration"] = {};

			if(tagId == "Duration_From"){
				Attribute["Setup"]["Duration"]["FromLeft"] = value;

				return Attribute;
			}

			if(tagId == "Duration_To"){
				Attribute["Setup"]["Duration"]["FromRight"] = value;

				return Attribute;
			}
		}
	}

	return Attribute;
}


function submitSET(tagId, value){
	var xmlObj = new Object();
	
	

	
	ModelName = "model-settings";
	cmd = "set";
	ListType = "Function";
	Attr = new Object();
	Attr = getAttrObj(tagId, value);

	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType] = Attr;
	xmlObj[cmd][ModelName][ListType]["Index"] = g_FunctionIndex;

	if(g_preFlightMode != g_currentFlightMode){
		xmlObj[cmd][ModelName][ListType]["FMI"] = g_preFlightMode;
	}
	else{
		xmlObj[cmd][ModelName][ListType]["FMI"] = g_currentFlightMode;
	}

	GetTd(xmlObj, g_SetEvent, cmd);
}


function updateCrosshair(direction, value){
	if(direction != undefined){
		var ch = document.getElementById("Crosshair_Canvas_" + direction.toUpperCase());
		var xh = ch.getContext("2d");

		if(isNaN(value) == true)
			value = 172;

		xh.clearRect(0, 0, ch.width, ch.height);

		xh.strokeStyle = "#1488ff";
		xh.fillStyle = "#1488ff";
		xh.lineWidth = 2;

		xh.beginPath();

		if(direction.toUpperCase() == "X"){
			xh.moveTo(value,   0);
			xh.lineTo(value, 344);
			xh.fillRect((value - 3), 0, 6, 18);
		}
		else{
			xh.moveTo(  0, value);
			xh.lineTo(344, value);
			xh.fillRect(0, (value - 3), 18, 6);
		}

		xh.stroke();
	}
}


function updateFailSafe(value){
	var f = document.getElementById("Fail_Safe_Canvas");
	var fs = f.getContext("2d");

	fs.clearRect(0, 0, f.width, f.height);

	fs.strokeStyle = "#f00";
	fs.fillStyle = "#f00";
	fs.lineWidth = 2;

	if(isNaN(value) == false){
		fs.beginPath();
		fs.moveTo(  0, value);
		fs.lineTo(344, value);
		fs.fillRect(326, (value - 3), 18, 6);
		fs.stroke();
	}
}


function updateCurve(curve_values){
	for(var i = 0; i < path_points_count; i++)
		path_points[i].CrdY = curve_values[i];

	var c = document.getElementById("Curve_Canvas");
	var curve = c.getContext("2d");

	curve.clearRect(0, 0, c.width, c.height);

	curve.strokeStyle = "#1488ff";
	curve.lineWidth = 2;

	curve.beginPath();
	curve.moveTo(path_points[0].CrdX, path_points[0].CrdY);

	for(var i = 1; i < 33; i++)
		curve.lineTo(path_points[i].CrdX, path_points[i].CrdY);

	curve.lineJoin = 'miter';
	curve.stroke();
}


function C_CurvePoint(Index, CrdX, CrdY){
	this.Index = Index;
	this.CrdX  = CrdX;
	this.CrdY  = CrdY;
}
