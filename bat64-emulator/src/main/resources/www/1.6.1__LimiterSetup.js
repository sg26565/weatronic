



var g_LimiterIndex = parseInt((get_GET_Parameter().LimiterIndex), 10);


var g_telemetryIds = new Array();
var g_Function_Control = -1;
var g_preFlightMode = -1;
var g_currentFlightMode = -1;


initPage();

function initPage(){
	
	$('#Navi_Button').removeAttr("href");
	$('#Navi_Button').bind("click", function(){
		window.location.href = "1.6.0__Limiters.html?LimiterIndex=" + g_LimiterIndex;
	});
	
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


	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Control");

	GetTd(getLimiterObject(InitDataPostArgs, g_LimiterIndex), g_InitEvent);



	TdPostArgs = getCurrentFlightMode(TdPostArgs);



	g_isAdditionalControlObjectUsed = true;
	TdPostArgs = getCurrentLimiterObject(TdPostArgs, g_LimiterIndex);


	setInterval(JsonFunction, 250);
}



function getLimiterObject(InitDataPostArgs, LimiterIndex){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

	
	Item = new Object();
	Item.Index = 0;
	Item.Name = "";
	Item.FunctionIdx = 0;
	Item.FunctionName = "";

	Item.ControlAboveID = 0;
	Item.ControlBelowID = 0;

	limiterItems = new Array(getLimiterSetupObject(Item));

	Limiter = new Object();
	Limiter.Items = '' + LimiterIndex;

	Limiter.Item = limiterItems;

	InitDataPostArgs.Limiter = Limiter;

	
	ItemFunc = new Object();
	ItemFunc.Index = 0;
	ItemFunc.Name = "";

	funcItems = new Array(ItemFunc);

	Function = new Object();
	Function.Items = "ALL_USED";

	Function.Item = funcItems;

	InitDataPostArgs.Function = Function;

	return InitDataPostArgs;
}


function getCurrentLimiterObject(TdPostArgs, LimiterIndex){
	Current = new Object();
	Current.ControlID = 0;
	Current.FunctionStr = "";
	Current.ControlStr = "";
	Current.ControlAboveStr = "";
	Current.ControlBelowStr = "";

	
	Current.CurvePath = [];
	Current.CrossX = 250;
	Current.CrossY = 100;

	

	Limiter = new Object;
	Limiter.Current = Current;

	Limiter.Items = "" + LimiterIndex;

	TdPostArgs.Limiter = Limiter;

	return TdPostArgs;
}


function getLimiterFlightModeObject(FmDataPostArgs, LimiterIndex){
	if(typeof FmDataPostArgs == 'undefined'){
		FmDataPostArgs = new Object();
	}

	
	Item = new Object();
	Item.Index = 0;

	limiterItems = new Array(getLimiterSetupObject(Item));

	Limiter = new Object();
	Limiter.Items = '' + LimiterIndex;

	Limiter.Item = limiterItems;

	FmDataPostArgs.Limiter = Limiter;

	return FmDataPostArgs;
}


function getLimiterSetupObject(Item){
	
	Above = new Object();
		Above.Hi = "";
		Above.Center = "";
		Above.Lo = "";
	Item.AboveStr = Above;

	
	Below = new Object();
		Below.Hi = "";
		Below.Center = "";
		Below.Lo = "";
	Item.BelowStr = Below;

	return Item;
}


function onEVENT_INIT(e){
	try{
		setHeaderMaxWidth('Limiter_Name', 'Flight_Mode');
		g_numpadLimitObj = e.EventData.NumPadLimits;

		
		g_LimiterSetup_Control_Above = e.EventData.Limiter.Item[0].ControlAboveID;
		g_LimiterSetup_Control_Below = e.EventData.Limiter.Item[0].ControlBelowID;

		g_LimiterIndex = e.EventData.Limiter.Item[0].Index;
		g_popupList_Indices["Limiter_Function_Name"] = e.EventData.Limiter.Item[0].FunctionIdx;

		controlAbove = new Object();
		controlAbove.ID = g_LimiterSetup_Control_Above;
		controlAbove.Value = 0;

		controlBelow = new Object();
		controlBelow.ID = g_LimiterSetup_Control_Below;
		controlBelow.Value = 0;

		controlIds.push(controlAbove,controlBelow);

		TdPostArgs.Control_Val = controlIds;

		
		setHTML('Limiter_Name', e.EventData.Limiter.Item[0].Name);

		setHTML('Function_Name', e.EventData.Limiter.Item[0].FunctionName);
		setHTML('Function_Name_Canvas', e.EventData.Limiter.Item[0].FunctionName);

		setHTML('Limiter_Function_Name', e.EventData.Limiter.Item[0].FunctionName);

		setHTML4FlightMode(e);

		control2image('Limit_Above_Control', controlAbove.ID);
		control2image('Limit_Below_Control', controlBelow.ID);

		
		
		$('#Limit_Above_High_Value').bind("click", function(){showNumpad("Limit_Above_High_Value", "Control");});
		$('#Limit_Above_Center_Value').bind("click", function(){showNumpad("Limit_Above_Center_Value", "Control");});
		$('#Limit_Above_Low_Value').bind("click", function(){showNumpad("Limit_Above_Low_Value", "Control");});

		$('#Limit_Below_High_Value').bind("click", function(){showNumpad("Limit_Below_High_Value", "Control");});
		$('#Limit_Below_Center_Value').bind("click", function(){showNumpad("Limit_Below_Center_Value", "Control");});
		$('#Limit_Below_Low_Value').bind("click", function(){showNumpad("Limit_Below_Low_Value", "Control");});

		
		$('#Limiter_Function_Name').bind("click", function(){showPopupList(this, e.EventData.Function.Item, false, true, g_popupList_Indices);});

		
		

		$('#Limit_Above_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
				"?LastURL=" + location.href +
				"&ControlPath=" + getControlAssignmentPathLimit("ControlAbove", controlAbove.ID, g_LimiterIndex) +
				"&ControlId=" + controlAbove.ID +
				"&ControlNode=ControlAbove" +
				"&PageId=0" +
				"&FromName=" + e.EventData.Limiter.Item[0].Name +
				"&FromNameSub=" + 'Begrenzung von Oben';
		});
		$('#Limit_Below_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
				"?LastURL=" + location.href +
				"&ControlPath=" + getControlAssignmentPathLimit("ControlBelow", controlBelow.ID, g_LimiterIndex) +
				"&ControlId=" + controlBelow.ID +
				"&ControlNode=ControlBelow" +
				"&PageId=0" +
				"&FromName=" + e.EventData.Limiter.Item[0].Name +
				"&FromNameSub=" + 'Begrenzung von Unten';
		});
		
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "control"){
		if((key == g_LimiterSetup_Control_Above) || (key == g_LimiterSetup_Control_Below)){
			var val = Value12Bit2Percent(value);

			if(key == g_LimiterSetup_Control_Above){
				tagID = 'Limit_Above_';

				if(typeof AboveState == 'undefined'){
						AboveState = "Invalid";
				}

				AboveState = setControlAssignments(tagID, val, AboveState);
			}

			if(key == g_LimiterSetup_Control_Below){
				tagID = 'Limit_Below_';

				if(typeof BelowState == 'undefined'){
					BelowState = "Invalid";
				}

				BelowState = setControlAssignments(tagID, val, BelowState);
			}
		}
	}

	if(cmd == "AdditionalControlObject"){
		
		if(typeof htmlObj_FuncValue == 'undefined'){
			htmlObj_FuncValue = document.getElementById('Function_Value');
		}

		htmlObj_FuncValue.innerHTML = e.EventData.Limiter.Current.FunctionStr;

		if(typeof htmlObj_ControlValue == 'undefined'){
			htmlObj_ControlValue = document.getElementById('Control_Value');
		}

		htmlObj_ControlValue.innerHTML = e.EventData.Limiter.Current.ControlStr;

		if(typeof htmlObj_AboveValue == 'undefined'){
			htmlObj_AboveValue = document.getElementById('Limit_Above_Empty_Value');
		}

		htmlObj_AboveValue.innerHTML = e.EventData.Limiter.Current.ControlAboveStr;

		if(typeof htmlObj_BelowValue == 'undefined'){
			htmlObj_BelowValue = document.getElementById('Limit_Below_Empty_Value');
		}

		htmlObj_BelowValue.innerHTML = e.EventData.Limiter.Current.ControlBelowStr;

		if(typeof preControlID == "undefined"){
			preControlID = -1;
		}

		g_Function_Control = e.EventData.Limiter.Current.ControlID;

		if(g_Function_Control != preControlID){
			control2image('Control_IMG', g_Function_Control);
			preControlID = g_Function_Control;
		}

		updateCrosshair('x', e.EventData.Limiter.Current.CrossX);
		updateCrosshair('y', e.EventData.Limiter.Current.CrossY);
		updateCurve(e.EventData.Limiter.Current.CurvePath);
		updateLimiterAbove(e.EventData.Limiter.Current.ControlAboveStr);
		updateLimiterBelow(e.EventData.Limiter.Current.ControlAboveStr, e.EventData.Limiter.Current.ControlBelowStr);
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
			GetTd(getLimiterFlightModeObject(FmDataPostArgs, g_LimiterIndex), g_FmEvent);
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
		if(e.cmd == "add"){
			createAddItem(e.EventData);
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}


function bindFunctionControl(e){
	if(g_Function_Control != -1){
		window.location.href = "9.1.0__ControlAssignment.html" +
			"?LastURL=" + location.href +
			"&ControlPath=" + getControlAssignmentPathFunction("Control", g_Function_Control, g_popupList_Indices["Limiter_Function_Name"]) +
			"&ControlId=" + g_Function_Control +
			"&ControlNode=Control" +
			"&PageId=3" +
			"&FromName=" + e.EventData.Limiter.Item[0].FunctionName;
	}
}


function setHTML4FlightMode(e){
	if(numpadOpen){
		handleNoneClosedNumpad();
	}

	g_preFlightMode = g_currentFlightMode;
	setHTML('Limit_Above_High_Value', e.EventData.Limiter.Item[0].AboveStr.Hi);
	setHTML('Limit_Above_Center_Value', e.EventData.Limiter.Item[0].AboveStr.Center);
	setHTML('Limit_Above_Low_Value', e.EventData.Limiter.Item[0].AboveStr.Lo);

	setHTML('Limit_Below_High_Value', e.EventData.Limiter.Item[0].BelowStr.Hi);
	setHTML('Limit_Below_Center_Value', e.EventData.Limiter.Item[0].BelowStr.Center);
	setHTML('Limit_Below_Low_Value', e.EventData.Limiter.Item[0].BelowStr.Lo);
}


function getControlAssignmentPathLimit(controlNode, value, Index){
	cmd = "set";
	ModelName = "model-settings";
	ListType = "Limiter";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"' + ListType + '":{"' + controlNode + '":"' + value + '","Index":' + Index + '}}}}');

	return str;
}


function getControlAssignmentPathFunction(controlNode, value, Index){
	cmd = "set";
	ModelName = "model-settings";
	ListType = "Function";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"' + ListType + '":{"' + controlNode + '":"' + value + '","Index":' + Index + '}}}}');

	return str;
}


function getAttrObj(tagId, value){
	Attribute = new Object();

	if (tagId == "Limiter_Function_Name"){
		Attribute["FuncIdx"] = value;
		FunctionName = getHTML('Limiter_Function_Name');
		setHTML('Function_Name_Canvas', FunctionName);
		setHTML('Function_Name', FunctionName);

		return Attribute;
	}
	else{
		if((tagId == "Limit_Above_Center_Value") || (tagId == "Limit_Above_High_Value") || (tagId == "Limit_Above_Low_Value")){
			Attribute["Above"] = {};
			if(tagId == "Limit_Above_Center_Value"){
				Attribute["Above"]["Center"] = value;

				return Attribute;
			}

			if(tagId == "Limit_Above_High_Value"){
				Attribute["Above"]["Hi"] = value;

				return 	Attribute;
			}

			if(tagId == "Limit_Above_Low_Value"){
				Attribute["Above"]["Lo"] = value;

				return Attribute;
			}
		}

		if((tagId == "Limit_Below_Center_Value") || (tagId == "Limit_Below_High_Value") || (tagId == "Limit_Below_Low_Value")){
			Attribute["Below"] = {};

			if(tagId == "Limit_Below_Center_Value"){
				Attribute["Below"]["Center"] = value;

				return Attribute;
			}

			if(tagId == "Limit_Below_High_Value"){
				Attribute["Below"]["Hi"] = value;

				return Attribute;
			}

			if(tagId == "Limit_Below_Low_Value"){
				Attribute["Below"]["Lo"] = value;

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
	ListType = "Limiter";
	Attr = new Object();
	Attr = getAttrObj(tagId, value);

	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType] = Attr;
	xmlObj[cmd][ModelName][ListType]["Index"] = g_LimiterIndex;

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


function updateLimiterAbove(percentAbove){
	newHeightAbove = (100 - parseFloat(percentAbove)) / 2;

	if((typeof newHeightAbove == "undefined") || (newHeightAbove != 0.0)){
		showHTML("Limiter_Above_Zone");
		setCSS("Limiter_Above_Zone","height",(newHeightAbove + "%"));
	}
	else{
		hideHTML('Limiter_Above_Zone');
	}
}


function updateLimiterBelow(percentAbove, percentBelow){
	newHeightAbove = (100 - parseFloat(percentAbove)) / 2;
	newTopBelow = (100 - parseFloat(percentBelow)) / 2;

	newHeightBelow = 100 - newTopBelow;
	newTopBelow = newTopBelow - newHeightAbove;

	if((typeof newHeightBelow == "undefined") || (newHeightBelow != 0.0)){
		showHTML("Limiter_Below_Zone");
		setCSS("Limiter_Below_Zone", "marginTop", (newTopBelow + "%"));
		setCSS("Limiter_Below_Zone", "height", (newHeightBelow + "%"));
	}
	else{
		hideHTML('Limiter_Below_Zone');
	}
}


function C_CurvePoint(Index, CrdX, CrdY){
	this.Index = Index;
	this.CrdX  = CrdX;
	this.CrdY  = CrdY;
}
