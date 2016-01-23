



var g_GET_Parameter = get_GET_Parameter();
var g_GyroIndex = parseInt((g_GET_Parameter.GyroIndex), 10);
var g_FunctionIndex = parseInt((g_GET_Parameter.FunctionIndex), 10);

var g_List_PopupListObj = {};

initPage();

function initPage(){
	
	$('#Navi_Button').removeAttr("href");
	$('#Navi_Button').bind("click", function(){
		window.location.href = "1.4.6.1__GyroSetup.html?GyroIndex=" + g_GyroIndex;
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
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "FailsafeMode");
	
	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	GetTd(getFunctionObject(InitDataPostArgs, g_FunctionIndex), g_InitEvent);
	
	InitDataPostArgsExtended = {};
	GetTd(getGyroObject(InitDataPostArgsExtended, g_GyroIndex), g_InitEvent, "get");


	setInterval(JsonFunction, 250);
}



function getGyroObject(InitDataPostArgsExtended, Index){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	cmd = "get";
	ModelName = "model-settings";
	ListType = "GyroSetup";
	
	Item = new Object();
	Item.Index = Index;
	Item.Name = "";
	
		functionObj = new Object();
		functionObj.Index = -1;
		functionObj.Name = "";
	Item.Function = functionObj;
	
		failSafePos = new Object();
			failSafeMode = new Object();
			failSafeMode.Index = -1;
			failSafeMode.Name = "";
		failSafePos.Mode = failSafeMode;
		failSafePos.Value = -1;
	Item.FailSafePos = failSafePos;
	
	Item.KP_Low = -1;
	Item.KP_High = -1;
	Item.KI_Low = -1;
	Item.KI_High = -1;
	Item.KD_Low = -1;
	Item.KD_High = -1;
	
	Item.AccGainInClock = "";
	
	InitDataPostArgsExtended[cmd] = {};
	InitDataPostArgsExtended[cmd][ModelName] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType]["Items"] = "Single";
	InitDataPostArgsExtended[cmd][ModelName][ListType] = Item;

	return InitDataPostArgsExtended;	
}


function getFunctionObject(InitDataPostArgs, FunctionIndex){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

	
	ItemFunc = new Object();
	ItemFunc.Index = 0;
	ItemFunc.Name = "";
	ItemFunc.ControlID = -1;

	funcItems = new Array(ItemFunc);

	Function = new Object();
	Function.Items = "" + FunctionIndex;

	Function.Item = funcItems;

	InitDataPostArgs.Function = Function;

	return InitDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		if(typeof e.EventData.get == "undefined"){
			setHeaderMaxWidth('Model_Name', 'Flight_Mode');
			
			g_numpadLimitObj = e.EventData.NumPadLimits;
			
			
			setHTML('Model_Name', e.EventData.ModelName);
			
			setHTML('Function_Name', e.EventData.Function.Item[0].Name);
			setHTML('Function_Name_Canvas', e.EventData.Function.Item[0].Name);
			
			control2image('Control_IMG', e.EventData.Function.Item[0].ControlID);
			
			$('#Fail_Safe_Value_Value').bind("click", function(){showNumpad("Fail_Safe_Value_Value", "Control");});
			
			g_List_PopupListObj["Fail_Safe_Mode"] = e.EventData.PopUp.FailsafeMode;
			
		}
		else{
			setHTML("Fail_Safe_Mode", e.EventData.get.GyroSetup.FailSafePos.Mode.Name);
			setHTML("Fail_Safe_Value_Value", e.EventData.get.GyroSetup.FailSafePos.Value);
			setHTML("GyroSetup_Preset_Value", "--");
			setHTML("GyroSetup_PL_Value",  e.EventData.get.GyroSetup.KP_Low);
			setHTML("GyroSetup_IL_Value",  e.EventData.get.GyroSetup.KI_Low);
			setHTML("GyroSetup_DL_Value",  e.EventData.get.GyroSetup.KD_Low);
			setHTML("GyroSetup_PH_Value",  e.EventData.get.GyroSetup.KP_High);
			setHTML("GyroSetup_IH_Value",  e.EventData.get.GyroSetup.KI_High);
			setHTML("GyroSetup_DH_Value",  e.EventData.get.GyroSetup.KD_High);
			
			setHTML("GyroSetup_Setup_Value", e.EventData.get.GyroSetup.AccGainInClock);
			
			g_FailSafe = e.EventData.get.GyroSetup.FailSafePos.Mode.Index;
			g_popupList_Indices["Fail_Safe_Mode"] = g_FailSafe
			$('#Fail_Safe_Mode').bind("click", function(){showPopupList(this, g_List_PopupListObj["Fail_Safe_Mode"], false, true, g_popupList_Indices);});
			checkFailSafePosState(g_FailSafe);
			
			$('#GyroSetup_PL_Value').bind("click", function(){showNumpad("GyroSetup_PL_Value", "Control");});
			$('#GyroSetup_IL_Value').bind("click", function(){showNumpad("GyroSetup_IL_Value", "Control");});
			$('#GyroSetup_DL_Value').bind("click", function(){showNumpad("GyroSetup_DL_Value", "Control");});
			$('#GyroSetup_PH_Value').bind("click", function(){showNumpad("GyroSetup_PH_Value", "Control");});
			$('#GyroSetup_IH_Value').bind("click", function(){showNumpad("GyroSetup_IH_Value", "Control");});
			$('#GyroSetup_DH_Value').bind("click", function(){showNumpad("GyroSetup_DH_Value", "Control");});
			$('#GyroSetup_Setup_Value').bind("click", function(){showNumpad("GyroSetup_Setup_Value", "Control");});
			
			initScrollbars('List_Container');
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){

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
	else if(tagId == ""){
		Attribute[""] = value;
		
		return Attribute;
	}
	else if(tagId == "GyroSetup_PL_Value"){
		Attribute["KP_Low"] = value;
		
		return Attribute;
	}
	else if(tagId == "GyroSetup_IL_Value"){
		Attribute["KI_Low"] = value;
		
		return Attribute;
	}
	else if(tagId == "GyroSetup_DL_Value"){
		Attribute["KD_Low"] = value;
		
		return Attribute;
	}
	else if(tagId == "GyroSetup_PH_Value"){
		Attribute["KP_High"] = value;
		
		return Attribute;
	}
	else if(tagId == "GyroSetup_IH_Value"){
		Attribute["KI_High"] = value;
		
		return Attribute;
	}
	else if(tagId == "GyroSetup_DH_Value"){
		Attribute["KD_High"] = value;
		
		return Attribute;
	}
	else if(tagId == "GyroSetup_Setup_Value"){
		Attribute["AccGainInClock"] = value;
		
		return Attribute;
	}

	return Attribute;
}


function submitSET(tagId, value){
	var xmlObj = new Object();
	
	cmd = "set";
	ModelName = "model-settings";
	ListType = "GyroSetup";
	
	Attr = new Object();
	Attr = getAttrObj(tagId, value);

	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType] = Attr;
	xmlObj[cmd][ModelName][ListType]["Index"] = g_GyroIndex;

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
