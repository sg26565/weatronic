



var g_MixerIndex = parseInt((get_GET_Parameter().MixerIndex), 10);


var g_List_PopupListAllFunctionsObj = new Object();
var g_List_PopupListFromObj = new Object();
var g_List_PopupListToObj = new Object();
var g_preFlightMode = -1;
var g_currentFlightMode = -1;


initPage();

function initPage(){
	
	$('#Navi_Button').removeAttr("href");
	$('#Navi_Button').bind("click", function(){
		window.location.href = "1.8.0__FunctionMixers.html?MixerIndex=" + g_MixerIndex;
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
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "FadeDuration");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "YesNo");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "IncludeExclude");
	
	GetTd(getMixerObject(InitDataPostArgs, g_MixerIndex), g_InitEvent);



	TdPostArgs = getCurrentFlightMode(TdPostArgs);



	g_isAdditionalControlObjectUsed = true;
	TdPostArgs = getCurrentMixerObject(TdPostArgs, g_MixerIndex);


	setInterval(JsonFunction, 250);
}



function getMixerObject(InitDataPostArgs, MixerIndex){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

	Item = new Object();
	Item.Index = -1;
	Item.Name = "";
	Item.ControlID = -1;
	Item.FromFunctionIdx = -1;
	Item.FromFunctionName = "";
	Item.ToFunctionIdx = -1;
	Item.ToFunctionName = "";
		isTrimIncluded = new Object();
		isTrimIncluded.Index = -1;
		isTrimIncluded.Name = "";
	Item.IsTrimIncluded = isTrimIncluded;
		inheritForNext = new Object();
		inheritForNext.Index = -1;
		inheritForNext.Name = "";
	Item.InheritForNext = inheritForNext;

	Item.Setup = getMixerSetupObject();

	mixerItems = new Array(Item);

	Mixer = new Object();
	Mixer.Items = "" + MixerIndex;

	Mixer.Item = mixerItems;

	InitDataPostArgs.Mixer = Mixer;

	
	ItemFunc = new Object();
	ItemFunc.Index = 0;
	ItemFunc.Name = "";

	funcItems = new Array(ItemFunc);

	Function = new Object();
	Function.Items =  "ALL_USED";

	Function.Item = funcItems;

	InitDataPostArgs.Function = Function;

	return InitDataPostArgs;
}


function getCurrentMixerObject(TdPostArgs, MixerIndex){
	Current = new Object();
	Current.GainStr = "";

	
	Current.CurvePath = [];
	Current.CrossX = 250;
	Current.CrossY = 100;

	Mixer = new Object();
	Mixer.Current = Current;
	Mixer.Items = "" + MixerIndex;

	TdPostArgs.Mixer = Mixer;

	return TdPostArgs;
}


function getFunctionFlightModeObject(FmDataPostArgs, MixerIndex){
	if(typeof FmDataPostArgs == "undefined")
		FmDataPostArgs = new Object();

	Item = new Object();
	Item.Index = 0;

	

	Item.Setup = getMixerSetupObject();

	mixerItems = new Array(Item);

	Mixer = new Object();
	Mixer.Items = "" + MixerIndex;

	Mixer.Item = mixerItems;

	FmDataPostArgs.Mixer = Mixer;

	return FmDataPostArgs;
}


function getMixerSetupObject(){
	
	Setup = new Object();

	Setup.DelayUpStr = "";
	Setup.DelayDnStr = "";

	Gain = new Object();
		Gain.Hi = "";
		Gain.Center = "";
		Gain.Lo = "";
	Setup.GainStr = Gain;

	return Setup;
}



function onEVENT_INIT(e){
	try{
		setHeaderMaxWidth('Mixer_Name', 'Flight_Mode');
		g_numpadLimitObj = e.EventData.NumPadLimits;

		
		g_MixerSetup_Control = e.EventData.Mixer.Item[0].ControlID;

		controlMixer = new Object();
		controlMixer.ID = g_MixerSetup_Control;
		controlMixer.Value = 0;

		controlIds.push(controlMixer);

		TdPostArgs.Control_Val = controlIds;

		
		setHTML('Mixer_Name', e.EventData.Mixer.Item[0].Name);

		setHTML('Mixer_From_Name', e.EventData.Mixer.Item[0].FromFunctionName);
		setHTML('Mixer_To_Name', e.EventData.Mixer.Item[0].ToFunctionName);
		setHTML('Mixer_From_Name_Canvas', e.EventData.Mixer.Item[0].FromFunctionName);
		setHTML('Mixer_To_Name_Canvas', e.EventData.Mixer.Item[0].ToFunctionName);
		setHTML('Mixer_Trim_Value', e.EventData.Mixer.Item[0].IsTrimIncluded.Name);
		setHTML('Mixer_Inherit_Value', e.EventData.Mixer.Item[0].InheritForNext.Name);
		setHTML4FlightMode(e);

		control2image('Mixer_Control_IMG', controlMixer.ID);

		
		
		$('#Curve_Edit_Button').bind("click", function(){window.location.href = "9.2.0__CurveEdit.html?Index=" + g_MixerIndex + "&LastURL="+ location.href + "&PageType=MixerIndex";});

		
		$('#Mixer_Control_High_Value').bind("click", function(){showNumpad("Mixer_Control_High_Value", "Control");});
		$('#Mixer_Control_Center_Value').bind("click", function(){showNumpad("Mixer_Control_Center_Value", "Control");});
		$('#Mixer_Control_Low_Value').bind("click", function(){showNumpad("Mixer_Control_Low_Value", "Control");});
		$('#Mixer_Delay_Up').bind("click", function(){showNumpad("Mixer_Delay_Up", "FadeDuration");});
		$('#Mixer_Delay_Down').bind("click", function(){showNumpad("Mixer_Delay_Down", "FadeDuration");});

		
		g_popupList_Indices["Mixer_Trim_Value"] = e.EventData.Mixer.Item[0].IsTrimIncluded.Index;
		$('#Mixer_Trim_Value').bind("click", function(){showPopupList(this, e.EventData.PopUp.IncludeExclude, false, true, g_popupList_Indices);});

		g_popupList_Indices["Mixer_Inherit_Value"] = e.EventData.Mixer.Item[0].InheritForNext.Index;
		$('#Mixer_Inherit_Value').bind("click", function(){showPopupList(this, e.EventData.PopUp.YesNo, false, true, g_popupList_Indices);});

		g_List_PopupListAllFunctionsObj = e.EventData.Function.Item;
		g_popupList_Indices["Mixer_From_Name"] = e.EventData.Mixer.Item[0].FromFunctionIdx;
		g_popupList_Indices["Mixer_To_Name"] = e.EventData.Mixer.Item[0].ToFunctionIdx;
		g_List_PopupListFromObj = setPopupListObj(g_List_PopupListAllFunctionsObj, g_popupList_Indices["Mixer_To_Name"]);
		g_List_PopupListToObj = setPopupListObj(g_List_PopupListAllFunctionsObj, g_popupList_Indices["Mixer_From_Name"]);
		$('#Mixer_From_Name').bind("click", function(){showPopupList(this, g_List_PopupListFromObj, false, true, g_popupList_Indices);});
		$('#Mixer_To_Name').bind("click", function(){showPopupList(this, g_List_PopupListToObj, false, true, g_popupList_Indices);});

		
		$('#Mixer_Control_IMG').bind("click", function() {window.location.href = "9.1.0__ControlAssignment.html" +
			"?LastURL=" + location.href +
			"&ControlPath=" + getControlAssignmentPathRate("Control", g_MixerSetup_Control, g_MixerIndex) +
			"&ControlId=" + g_MixerSetup_Control +
			"&ControlNode=Control" +
			"&PageId=1" +
			"&FromName=" + e.EventData.Mixer.Item[0].Name;
		});
		
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "control"){
		if(key == g_MixerSetup_Control){
			var val = Value12Bit2Percent(value);
			tagID = 'Mixer_Control_';

			if(typeof MixerControlState == 'undefined'){
				MixerControlState = "Invalid";
			}

			MixerControlState = setControlAssignments(tagID, val, MixerControlState);
		}
	}

	if(cmd == "AdditionalControlObject"){
		
		if(typeof htmlObj_GainValue == 'undefined'){
			htmlObj_GainValue = document.getElementById('Mixer_Control_Empty_Value');
		}

		htmlObj_GainValue.innerHTML = e.EventData.Mixer.Current.GainStr;

		updateCrosshair('x', e.EventData.Mixer.Current.CrossX);
		updateCrosshair('y', e.EventData.Mixer.Current.CrossY);
		updateCurve(e.EventData.Mixer.Current.CurvePath);
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
			GetTd(getFunctionFlightModeObject(FmDataPostArgs, g_MixerIndex), g_FmEvent);
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


function setPopupListObj(obj, Index){
	var newObj = JSON.parse(JSON.stringify(obj));

	for(var i = 0; i < newObj.length; i++){
		if(Index == newObj[i].Index){
			newObj.splice(i, 1);
			break;
		}
	}

	return newObj;
}


function setHTML4FlightMode(e){
	if(numpadOpen){
		handleNoneClosedNumpad();
	}

	g_preFlightMode = g_currentFlightMode;

	setHTML('Mixer_Delay_Up', e.EventData.Mixer.Item[0].Setup.DelayUpStr);
	setHTML('Mixer_Delay_Down', e.EventData.Mixer.Item[0].Setup.DelayDnStr);
	setHTML('Mixer_Control_High_Value', e.EventData.Mixer.Item[0].Setup.GainStr.Hi);
	setHTML('Mixer_Control_Center_Value',e.EventData.Mixer.Item[0].Setup.GainStr.Center);
	setHTML('Mixer_Control_Low_Value', e.EventData.Mixer.Item[0].Setup.GainStr.Lo);
}


function getControlAssignmentPathRate(controlNode, value, Index){
	cmd = "set";
	ModelName = "model-settings";
	ListType = "Mixer";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"' + ListType + '":{"' + controlNode + '":"' + value + '","Index":' + Index + '}}}}');

	return str;
}


function getAttrObj(tagId, value){
	Attribute = new Object();

	if((tagId == "Mixer_Trim_Value") || (tagId == "Mixer_From_Name") || (tagId == "Mixer_To_Name") || (tagId == "Mixer_Inherit_Value")){
		if(tagId == "Mixer_Trim_Value"){
			Attribute["Trim"] = value;

			return Attribute;
		}

		if(tagId == "Mixer_From_Name"){
			value = parseInt(value);
			Attribute["FromFunction"] = value;
			setHTML('Mixer_From_Name_Canvas', getHTML('Mixer_From_Name'));
			g_List_PopupListToObj = setPopupListObj(g_List_PopupListAllFunctionsObj, value);

			return Attribute;
		}

		if(tagId == "Mixer_To_Name"){
			value = parseInt(value);
			Attribute["ToFunction"] = value;
			setHTML('Mixer_To_Name_Canvas', getHTML('Mixer_To_Name'));
			g_List_PopupListFromObj = setPopupListObj(g_List_PopupListAllFunctionsObj, value);

			return Attribute;
		}

		if(tagId == "Mixer_Inherit_Value"){
			Attribute["InheritForNext"] = value;

			return Attribute;
		}
	}
	else{
		Attribute["Setup"]= {};
		if((tagId == "Mixer_Control_Center_Value") || (tagId == "Mixer_Control_High_Value") || (tagId == "Mixer_Control_Low_Value")){
			Attribute["Setup"]["Gain"] = {};

			if(tagId == "Mixer_Control_Center_Value"){
				Attribute["Setup"]["Gain"]["Center"] = value;

				return Attribute;
			}

			if(tagId == "Mixer_Control_High_Value"){
				Attribute["Setup"]["Gain"]["Hi"] = value;

				return 	Attribute;
			}

			if(tagId == "Mixer_Control_Low_Value"){
				Attribute["Setup"]["Gain"]["Lo"] = value;

				return Attribute;
			}
		}
		else{
			if(tagId == "Mixer_Delay_Up"){
				Attribute["Setup"]["DelayUp"] = value;

				return Attribute;
			}

			if(tagId == "Mixer_Delay_Down"){
				Attribute["Setup"]["DelayDown"] = value;

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
	ListType = "Mixer";
	Attr = new Object();
	Attr = getAttrObj(tagId, value);

	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType] = Attr;
	xmlObj[cmd][ModelName][ListType]["Index"] = g_MixerIndex;

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
