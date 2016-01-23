



var g_GyroIndex = parseInt((get_GET_Parameter().GyroIndex), 10);

var g_List_PopupListObj = {};

initPage();

function initPage(){
	
	$('#Navi_Button').removeAttr("href");
	$('#Navi_Button').bind("click", function(){
		window.location.href = "1.4.6.0__Gyros.html?GyroIndex=" + g_GyroIndex;
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


	

	InitDataPostArgs = getPopupObj(InitDataPostArgs, "GyroAxis");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "YesNo");
	
	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	GetTd(getFunctionListObject(InitDataPostArgs), g_InitEvent);
	
	InitDataPostArgsExtended = {};
	GetTd(getGyroObject(InitDataPostArgsExtended, g_GyroIndex), g_InitEvent, "get");


	
	g_isAdditionalControlObjectUsed = true;
	TdPostArgs = getCurrentGyroObject(TdPostArgs, g_GyroIndex);

	
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
	
		gyroAxis = new Object();
		gyroAxis.Index = -1;
		gyroAxis.Name = "";
	Item.GyroAxis = gyroAxis;
	
		gyroMode = new Object();
		gyroMode.Index = -1;
		gyroMode.Name = "";
	Item.GyroMode = gyroMode;
		
	Item.Control = -1;

		functionObj = new Object();
		functionObj.Index = -1;
		functionObj.Name = "";
	Item.Function = functionObj;
	
		isReverse = new Object();
		isReverse.Index = -1;
		isReverse.Name = "";
	Item.IsReverse = isReverse;	
	
	InitDataPostArgsExtended[cmd] = {};
	InitDataPostArgsExtended[cmd][ModelName] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType]["Items"] = "Single";
	InitDataPostArgsExtended[cmd][ModelName][ListType] = Item;

	return InitDataPostArgsExtended;	
}



function getFunctionListObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

	
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

function getCurrentGyroObject(TdPostArgs, GyroIndex){
	Current = new Object();
	Current.FunctionStr = "";
	Current.ControlStr = "";

	
	Current.CurvePath = [];
	Current.CrossX = 250;
	Current.CrossY = 100;
	

	

	GyroSetup = new Object();
	GyroSetup.Current = Current;
	GyroSetup.Index = "" + GyroIndex;

	TdPostArgs.GyroSetup = GyroSetup;

	return TdPostArgs;
}



function onEVENT_INIT(e){
	try{
		if(typeof e.EventData.get == "undefined"){
			setHeaderMaxWidth('Model_Name', 'Flight_Mode');
	
			
			setHTML('Model_Name', e.EventData.ModelName);
	
			g_List_PopupListObj["FunctionList"] = e.EventData.Function.Item;
			g_List_PopupListObj["GyroSetupAxis"] = e.EventData.PopUp.GyroAxis;
			g_List_PopupListObj["GyroReverse"] = e.EventData.PopUp.YesNo;
		}
		else{
			setHTML("GyroSetup_Function_Name", e.EventData.get.GyroSetup.Function.Name);
			setHTML("GyroSetup_Axis_Value", e.EventData.get.GyroSetup.GyroAxis.Name);
			setHTML("GyroSetup_Reverse_Value", e.EventData.get.GyroSetup.IsReverse.Name);
			
			var GyroSensitivity_Control = e.EventData.get.GyroSetup.Control;
			control2image('Control_IMG', GyroSensitivity_Control);
			
			if(e.EventData.get.GyroSetup.GyroMode.Index == 2){
				$('#Heading_Lock_Label').bind("click", function(){
					window.location.href = "1.4.6.2__GyroSetupHeadingLock.html?GyroIndex=" + g_GyroIndex + "&FunctionIndex=" + e.EventData.get.GyroSetup.Function.Index;
				});
				showHTML('Additional_Button_Box');
			}
			
			
			
			$('#Curve_Edit_Button').bind("click", function(){window.location.href = "9.2.0__CurveEdit.html?Index=" + g_GyroIndex + "&LastURL="+ location.href + "&PageType=GyroSens";});
			
			
			$('#Control_IMG').bind("click", function(){window.location.href = "9.1.0__ControlAssignment.html" +
					"?LastURL=" + location.href +
					"&ControlPath=" + getControlAssignmentPath(GyroSensitivity_Control, g_GyroIndex) +
					"&ControlId=" + GyroSensitivity_Control +
					"&ControlNode=Control" +
					"&PageId=0" +
					"&FromName=" + 'Sensitivität' +
					"&FromNameSub=" + e.EventData.get.GyroSetup.Function.Name;
			});
			
			
			g_popupList_Indices["GyroSetup_Function_Name"] = e.EventData.get.GyroSetup.Function.Index;
			$('#GyroSetup_Function_Name').bind("click", function(){showPopupList(this, g_List_PopupListObj["FunctionList"], false, true, g_popupList_Indices);});
			
			g_popupList_Indices["GyroSetup_Axis_Value"] = e.EventData.get.GyroSetup.GyroAxis.Index;
			$('#GyroSetup_Axis_Value').bind("click", function(){showPopupList(this, g_List_PopupListObj["GyroSetupAxis"], false, true, g_popupList_Indices);});
			
			g_popupList_Indices["GyroSetup_Reverse_Value"] = e.EventData.get.GyroSetup.IsReverse.Index;
			$('#GyroSetup_Reverse_Value').bind("click", function(){showPopupList(this, g_List_PopupListObj["GyroReverse"], false, true, g_popupList_Indices);});
		}
		
		initScrollbars('List_Container');
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	if(cmd == "AdditionalControlObject"){
		
		if(typeof htmlObj_FuncValue == 'undefined'){
			htmlObj_FuncValue = document.getElementById('Function_Value');
		}

		htmlObj_FuncValue.innerHTML = e.EventData.GyroSetup.Current.FunctionStr;

		if(typeof htmlObj_ControlValue == 'undefined'){
			htmlObj_ControlValue = document.getElementById('Control_Value');
		}

		htmlObj_ControlValue.innerHTML = e.EventData.GyroSetup.Current.ControlStr;


		updateCrosshair('x', e.EventData.GyroSetup.Current.CrossX);
		updateCrosshair('y', e.EventData.GyroSetup.Current.CrossY);
		updateCurve(e.EventData.GyroSetup.Current.CurvePath);




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



function getControlAssignmentPath(control, Index){
	cmd = "set";
	ModelName = "model-settings";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"GyroSetup":{"Control":' + control + ',"Index":' + Index + '}}}}');

	return str;
}



function getAttrObj(tagId, value){
	Attribute = new Object();
	
	if(tagId == "GyroSetup_Function_Name"){
		Attribute["Function"] = value;

		return Attribute;
	}

	if(tagId == "GyroSetup_Axis_Value"){
		Attribute["GyroAxis"] = value;
		g_TrimMode = value;

		return Attribute;
	}

	if(tagId == "GyroSetup_Reverse_Value"){
		Attribute["IsReverse"] = value;

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
