



var g_FunctionIndex = parseInt((get_GET_Parameter().FunctionIndex), 10);


var g_TrimMode = 5;





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
		window.location.href = "1.4.0__Functions.html?FunctionIndex=" + g_FunctionIndex;
	});
	

	
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Control_Positiv");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "YesNo");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TrimMode");
	
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

		
		Trim = new Object();
		Trim.ControlID = -1;
		Trim.RangeStr = "";
			mode = new Object();
			mode.Index = -1;
			mode.Name = "";
		Trim.Mode = mode;
			IsReverse = new Object();
			IsReverse.Index = -1;
			IsReverse.Name = "";
		Trim.IsReverse = IsReverse;
	Item.Trim = Trim;

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

	
	Current.CurvePath = [];
	Current.CrossX = 0;
	Current.CrossY = 0;

	Trim = new Object();
	Trim.ControlStr = "";
	Trim.CurvePathLeftX = [];
	Trim.CurvePathLeftY = [];
	Trim.CurvePathRightX = [];
	Trim.CurvePathRightY = [];
	Trim.CurvePathCenterX = [];
	Trim.CurvePathCenterY = [];
	Trim.CurvePathOffsetX = [];
	Trim.CurvePathOffsetY = [];
	Current.Trim = Trim;

	

	Function = new Object();
	Function.Current = Current;
	Function.Items = "" + FunctionIndex;

	TdPostArgs.Function = Function;

	return TdPostArgs;
}



function onEVENT_INIT(e){
	try{
		setHeaderMaxWidth('Model_Name', 'Flight_Mode');

		g_numpadLimitObj = e.EventData.NumPadLimits;

		
		g_Function_Control = e.EventData.Function.Item[0].ControlID;
		g_Trim_Control = e.EventData.Function.Item[0].Trim.ControlID;

		
		setHTML('Model_Name', e.EventData.ModelName);

		setHTML('Function_Name', e.EventData.Function.Item[0].Name);
		setHTML('Function_Name_Canvas', e.EventData.Function.Item[0].Name);

		setHTML('Trim_Range_Value', e.EventData.Function.Item[0].Trim.RangeStr);

		g_TrimMode = e.EventData.Function.Item[0].Trim.Mode.Index;
		setHTML('Trim_Mode_Value', e.EventData.Function.Item[0].Trim.Mode.Name);
		setHTML('Trim_Reverse_Value', e.EventData.Function.Item[0].Trim.IsReverse.Name);

		control2image('Control_IMG', g_Function_Control);
		control2image('Trim_Control_IMG', g_Trim_Control);

		
		
		$('#Trim_Range_Value').bind("click", function(){showNumpad("Trim_Range_Value", "Control_Positiv");});

		
		g_popupList_Indices["Trim_Mode_Value"] = g_TrimMode;
		$('#Trim_Mode_Value').bind("click", function(){showPopupList(this, e.EventData.PopUp.TrimMode, false, true, g_popupList_Indices);});

		g_popupList_Indices["Trim_Reverse_Value"] = e.EventData.Function.Item[0].Trim.IsReverse.Index;
		$('#Trim_Reverse_Value').bind("click", function(){showPopupList(this, e.EventData.PopUp.YesNo, false, true, g_popupList_Indices);});

		



		
		$('#Control_IMG').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
			"?LastURL=" + location.href +
			"&ControlPath=" + getControlAssignmentPathFunction("Control", g_Function_Control, g_FunctionIndex) +
			"&ControlId=" + g_Function_Control +
			"&ControlNode=Control" +
			"&PageId=3" +
			"&FromName=" + e.EventData.Function.Item[0].Name;
		});

		$('#Trim_Control').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html?FunctionIndex=" + g_FunctionIndex +
			"&LastURL=" + location.href +
			"&ControlPath=" + getControlAssignmentPathTrim("Control", g_Trim_Control, g_FunctionIndex) +
			"&ControlId=" + g_Trim_Control +
			"&ControlNode=Control" +
			"&PageId=4" +
			"&FromName=" + e.EventData.Function.Item[0].Name +
			"&FromNameSub=" + 'Trimmgeber';
		});
		
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	if(cmd == "AdditionalControlObject"){
		
		if(typeof htmlObj_FuncValue == 'undefined'){
			htmlObj_FuncValue = document.getElementById('Function_Value');
		}

		htmlObj_FuncValue.innerHTML = e.EventData.Function.Current.FunctionStr;

		if(typeof htmlObj_ControlValue == 'undefined'){
			htmlObj_ControlValue = document.getElementById('Control_Value');
		}

		htmlObj_ControlValue.innerHTML = e.EventData.Function.Current.ControlStr;

		if(typeof htmlObj_ControlTrimValue == 'undefined'){
			htmlObj_ControlTrimValue = document.getElementById('Actual_Trim_Value');
		}

		htmlObj_ControlTrimValue.innerHTML = e.EventData.Function.Current.Trim.ControlStr;

		updateCrosshair('x', e.EventData.Function.Current.CrossX);
		updateCrosshair('y', e.EventData.Function.Current.CrossY);
		updateCurve(e.EventData.Function.Current.CurvePath);

		path_offsetX = e.EventData.Function.Current.Trim.CurvePathOffsetX;
		path_offsetY = e.EventData.Function.Current.Trim.CurvePathOffsetY;

		path_leftX = e.EventData.Function.Current.Trim.CurvePathLeftX;
		path_leftY = e.EventData.Function.Current.Trim.CurvePathLeftY;

		path_centerX = e.EventData.Function.Current.Trim.CurvePathCenterX;
		path_centerY = e.EventData.Function.Current.Trim.CurvePathCenterY;

		path_rightX = e.EventData.Function.Current.Trim.CurvePathRightX;
		path_rightY = e.EventData.Function.Current.Trim.CurvePathRightY;

		
		if(g_TrimMode == "0"){
			updateTrimOffset(path_offsetX, path_offsetY);
		}
		
		else if(g_TrimMode == "1"){
			updateTrimLeft(path_leftX, path_leftY);
		}
		
		else if(g_TrimMode == "2"){
			updateTrimCenter(path_centerX, path_centerY);
		}
		
		else if(g_TrimMode == "3"){
			updateTrimRight(path_rightX, path_rightY);
		}
		
		else if(g_TrimMode == "4"){
			updateTrimPositionDepending(path_leftX, path_leftY, path_centerX, path_centerY, path_rightX, path_rightY, e.EventData.Function.Current.CrossX);
		}
		
		else{
			refreshTrim();
		}
	}

	if(cmd == "flightmode"){
		
		if(typeof jquery_FlightMode == "undefined"){
			jquery_FlightMode = $('#Flight_Mode');
		}

		jquery_FlightMode.html(e.EventData.Current_FM.Name);
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


function getControlAssignmentPathTrim(controlNode, value, Index){
	cmd = "set";
	ModelName = "model-settings";
	ListType = "Function";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"' + ListType + '":{"Trim":{"' + controlNode + '":' + value + '},"Index":' + Index + '}}}}');

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
	Attribute["Trim"] = {};

	if(tagId == "Trim_Range_Value"){
		Attribute["Trim"]["Range"] = value;

		return Attribute;
	}

	if(tagId == "Trim_Mode_Value"){
		Attribute["Trim"]["Mode"] = value;
		g_TrimMode = value;

		return Attribute;
	}

	if(tagId == "Trim_Reverse_Value"){
		Attribute["Trim"]["Reverse"] = value;

		return Attribute;
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


function updateTrimOffset(path_offsetX, path_offsetY){
	standardTrimFunction(path_offsetX, path_offsetY);
}


function updateTrimLeft(path_leftX, path_leftY){
	standardTrimFunction(path_leftX, path_leftY);
}


function updateTrimCenter(path_centerX, path_centerY){
	standardTrimFunction(path_centerX, path_centerY);
}


function updateTrimRight(path_rightX, path_rightY){
	standardTrimFunction(path_rightX, path_rightY);
}


function standardTrimFunction(pathX, pathY){
	var t = document.getElementById("Trim_Canvas");
	var trim = t.getContext("2d");

	trim.clearRect(0, 0, t.width, t.height);

	trim.strokeStyle = "#1488ff";
	trim.lineWidth = 1;
	trim.globalAlpha = 0.5;

	trim.beginPath();

	for(var i = 0; i < pathX.length; i++)
		trim.lineTo(pathX[i], pathY[i]);

	trim.closePath();
	trim.stroke();

	trim.fillStyle = "#1488ff";
	trim.globalAlpha = 0.1;
	trim.fill();
}


function updateTrimPositionDepending(path_leftX, path_leftY, path_centerX, path_centerY, path_rightX, path_rightY, crossX){
	var t = document.getElementById("Trim_Canvas");
	var trim = t.getContext("2d");

	trim.clearRect(0, 0, t.width, t.height);

	if(crossX < 87){
		
		trim.strokeStyle = "#1488ff";
		trim.lineWidth = 1;
		trim.globalAlpha = 0.5;

		trim.beginPath();

		for(var i = 0; i < path_leftX.length; i++)
			trim.lineTo(path_leftX[i], path_leftY[i]);

		trim.closePath();
		trim.stroke();

		trim.fillStyle = "#1488ff";
		trim.globalAlpha = 0.25;
		trim.fill();
		
		
		trim.strokeStyle = "#ccc";
		trim.lineWidth = 1;
		trim.globalAlpha = 0.3;

		trim.beginPath();

		for(var i = 0; i < path_centerX.length; i++)
			trim.lineTo(path_centerX[i], path_centerY[i]);

		trim.closePath();
		trim.stroke();

		trim.fillStyle = "#ccc";
		trim.globalAlpha = 0.1;
		trim.fill();
		
		
		trim.strokeStyle = "#ccc";
		trim.lineWidth = 1;
		trim.globalAlpha = 0.3;

		trim.beginPath();

		for(var i = 0; i < path_rightX.length; i++)
			trim.lineTo(path_rightX[i], path_rightY[i]);

		trim.closePath();
		trim.stroke();

		trim.fillStyle = "#ccc";
		trim.globalAlpha = 0.1;
		trim.fill();
		
	}
	else if(crossX < 258){
		trim.strokeStyle = "#ccc";
		trim.lineWidth = 1;
		trim.globalAlpha = 0.3;

		trim.beginPath();

		for(var i = 0; i < path_leftX.length; i++)
			trim.lineTo(path_leftX[i], path_leftY[i]);

		trim.closePath();
		trim.stroke();

		trim.fillStyle = "#ccc";
		trim.globalAlpha = 0.1;
		trim.fill();
		
		
		trim.strokeStyle = "#1488ff";
		trim.lineWidth = 1;
		trim.globalAlpha = 0.5;

		trim.beginPath();

		for(var i = 0; i < path_centerX.length; i++)
			trim.lineTo(path_centerX[i], path_centerY[i]);

		trim.closePath();
		trim.stroke();

		trim.fillStyle = "#1488ff";
		trim.globalAlpha = 0.25;
		trim.fill();
		
		
		trim.strokeStyle = "#ccc";
		trim.lineWidth = 1;
		trim.globalAlpha = 0.3;

		trim.beginPath();

		for(var i = 0; i < path_rightX.length; i++)
			trim.lineTo(path_rightX[i], path_rightY[i]);

		trim.closePath();
		trim.stroke();

		trim.fillStyle = "#ccc";
		trim.globalAlpha = 0.1;
		trim.fill();
		
	}
	else{
		trim.strokeStyle = "#ccc";
		trim.lineWidth = 1;
		trim.globalAlpha = 0.3;

		trim.beginPath();

		for(var i = 0; i < path_leftX.length; i++)
			trim.lineTo(path_leftX[i], path_leftY[i]);

		trim.closePath();
		trim.stroke();

		trim.fillStyle = "#ccc";
		trim.globalAlpha = 0.1;
		trim.fill();
		
		
		trim.strokeStyle = "#ccc";
		trim.lineWidth = 1;
		trim.globalAlpha = 0.3;

		trim.beginPath();

		for(var i = 0; i < path_centerX.length; i++)
			trim.lineTo(path_centerX[i], path_centerY[i]);

		trim.closePath();
		trim.stroke();

		trim.fillStyle = "#ccc";
		trim.globalAlpha = 0.1;
		trim.fill();
		
		
		trim.strokeStyle = "#1488ff";
		trim.lineWidth = 1;
		trim.globalAlpha = 0.5;

		trim.beginPath();

		for(var i = 0; i < path_rightX.length; i++)
			trim.lineTo(path_rightX[i], path_rightY[i]);

		trim.closePath();
		trim.stroke();

		trim.fillStyle = "#1488ff";
		trim.globalAlpha = 0.25;
		trim.fill();
		
	}
}


function refreshTrim(){
	var t = document.getElementById("Trim_Canvas");
	var trim = t.getContext("2d");

	trim.clearRect(0, 0, t.width, t.height);
}


function C_CurvePoint(Index, CrdX, CrdY){
	this.Index = Index;
	this.CrdX  = CrdX;
	this.CrdY  = CrdY;
}
