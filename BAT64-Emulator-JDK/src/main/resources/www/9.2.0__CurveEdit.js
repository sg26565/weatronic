



var g_GET_Parameter = get_GET_Parameter();
var g_Index         = parseInt((g_GET_Parameter.Index), 10);
var g_Index_Servo   = parseInt((g_GET_Parameter.ServoIndex), 10);
var g_fromPageType  = g_GET_Parameter.PageType;
var g_lastURL       = g_GET_Parameter.LastURL;
var g_FunctionListView = g_GET_Parameter.FunctionView;

if(typeof g_GET_Parameter.LastSyncURL != "undefined"){
	 g_lastURL = getLastSyncURL();
}

if(typeof g_FunctionListView != "undefined"){
	 g_lastURL += "&FunctionView=" + g_FunctionListView;
}

var g_Wizard = g_GET_Parameter.Wizard;
var g_gotoLocation = g_lastURL;
var isGotoSave = false;


var g_curvePercentages = [];
var g_realPoints = [];
var g_rollBackValue = new Array();
var g_MaxValue;
var g_MinValue;
var g_isChanged = true;
var g_currentFlightMode = -1;
var g_global = -1;
var g_isGlobalSetPerformed = true;
var g_isCanvasInit        = false;
var g_currentCurveData    = "";
var g_isOptionButton      = false;
var g_isSelectAllButton   = false;

var g_selectedIndex      = 16;
var g_preselectedIndex   = 16;
var g_isPointSelected    = 0;
var g_isPointPreselected = 0;
var g_Selections         = 0;

if(g_fromPageType == "ServoIndex"){
	var g_PercentMin = -200;
	var g_PercentMax = 200;
}
else{
	var g_PercentMin = -100;
	var g_PercentMax = 100;
}

var g_PointMin = 0;
var g_PointMax = 32;

var g_syncZoom = 4;			
var g_zoomedSector = "all";


initPage();

function initPage(){
	
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "ServoRealGroupUserUsed");
	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	InitDataPostArgs = getModelConfigObject(InitDataPostArgs);

	if(g_fromPageType == "FunctionIndex"){
		GetTd(getFunctionObject(InitDataPostArgs, g_Index), g_InitEvent);
	}

	if(g_fromPageType == "MixerIndex"){
		GetTd(getMixerObject(InitDataPostArgs, g_Index), g_InitEvent);
	}

	if(g_fromPageType == "ServoIndex"){
		InitDataPostArgs = getFunctionObject(InitDataPostArgs, g_Index);
		GetTd(getServoObject(InitDataPostArgs, g_Index_Servo), g_InitEvent);
	}

	if(g_fromPageType == "SyncIndex"){
		GetTd(getServoObject(InitDataPostArgs, "ALL_USED"), g_InitEvent);
	}
	

	
	TdPostArgs = getCurrentFlightMode(TdPostArgs);
	

	
	g_isAdditionalControlObjectUsed = true;
	TdPostArgs = getCurrentCurveObject(TdPostArgs, g_Index, g_fromPageType, g_Index_Servo);
	

	var g_currentCurveData = setInterval(JsonFunction, 250);
}



function getFunctionObject(InitDataPostArgs, FunctionIndex){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

	Item = new Object();
	Item.Index = 0;
	
	Item.Name = "";
	

	Setup = new Object();
	Setup.CurveIdx = 0;
	Item.Setup = Setup;

	functionItems = new Array(Item);

	Function = new Object();
	Function.Items = "" + FunctionIndex;

	Function.Item = functionItems;

	InitDataPostArgs.Function = Function;

	return InitDataPostArgs;
}


function getMixerObject(InitDataPostArgs, MixerIndex){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

	Item = new Object();
	Item.Index = 0;
	
	Item.Name = "";
	Item.FromFunctionName = "";
	Item.ToFunctionName = "";
	

	Setup = new Object();
	Setup.CurveIdx = 0;
	Item.Setup = Setup;

	mixerItems = new Array(Item);

	Mixer = new Object();
	Mixer.Items = "" + MixerIndex;

	Mixer.Item = mixerItems;

	InitDataPostArgs.Mixer = Mixer;

	return InitDataPostArgs;
}


function getServoObject(InitDataPostArgs, ServoIndex){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	Item = new Object();
	Item.Index = -1;
	Item.Plug = "";
	Item.NormalName = "";
	Item.MaxValue = 0;
	Item.MinValue = 0;
	Item.Center = 0;

	ServoAssignment = new Object();
	ServoAssignment.Items = "" + ServoIndex;

	servoItems = new Array(Item);
	ServoAssignment.Item = servoItems;

	InitDataPostArgs.Servos = ServoAssignment;

	return InitDataPostArgs;	
}


function getCurrentCurveObject(TdPostArgs, Index, Type, ServoIndex){
	Current = new Object();
	Current.XStr = "";
	Current.YStr = "";

	
	Current.CrossX = 250;
	Current.CrossY = 100;
	Current.IsGlobal = -1;

	CurveEdit = new Object();
	CurveEdit.Current = Current;

	if(Type == "ServoIndex"){
		CurveEdit[Type] = ServoIndex;
		CurveEdit.FunctionIndex = Index;
	}
	else{
		CurveEdit[Type] = Index;
	}

	TdPostArgs.CurveEdit = CurveEdit;

	return TdPostArgs;
}


function getModelConfigObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

  	ModelConfig = new Object();

  	outputResolution = new Object();
	  	outputResolution.Index = -1;
	  	outputResolution.name = "";
  	ModelConfig.OutputResolution = outputResolution;

	InitDataPostArgs.ModelConfig = ModelConfig;

	return InitDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		setHeaderMaxWidth('Model_Name', 'Flight_Mode');
		
		if(typeof g_lastURL != "undefined"){
			if(g_Wizard ==  "true"){
				
				hideHTML('Navi_Box');
				hideHTML('Option_Box');
				showHTML('Wizard_Box');
				setCSS('Save_Button_Outter', 'width', '122px');
				setCSS('Cancel_Button_Outter', 'width', '122px');

				$('#Backward_Button').removeAttr("href");
				$('#Backward_Button').bind("click", function(){
					g_gotoLocation = g_lastURL;
					isGotoSave = true;
					g_isOptionButton = false;

					if(g_fromPageType == "SyncIndex"){
						GetTd({"cmd":0x0257, "param": {"ServoIdx": g_Index}}, g_SetEvent, "command");
					}
					else{

							submitCurve("set", "save", g_curvePercentages, g_realPoints, g_currentFlightMode);




					}
				});
			}
			else{
				$('#Navi_Button').removeAttr("href");
				$('#Navi_Button').bind("click", function(){
					g_gotoLocation = g_lastURL;
					isGotoSave = true;
					g_isOptionButton = false;
	
					if(g_fromPageType == "SyncIndex"){
						GetTd({"cmd":0x0257, "param": {"ServoIdx": g_Index}}, g_SetEvent, "command");
					}
					else{

							submitCurve("set", "save", g_curvePercentages, g_realPoints, g_currentFlightMode);




					}	
				});
			}	
		}

		$('#Save_Button').bind("click", function(){setChanges(true, g_currentFlightMode, g_global);});
		$('#Cancel_Button').bind("click", function(){setChanges(false, g_currentFlightMode, g_global);});
		

		setHTML('Model_Name', e.EventData.ModelName);
		g_Resolution = e.EventData.ModelConfig.OutputResolution.Index;

		if(g_fromPageType == "FunctionIndex"){
			setHTML('Function_Name', e.EventData.Function.Item[0].Name);
			setHTML('Label_Y_Axis_Canvas', 'Live Daten / ' + e.EventData.Function.Item[0].Name);
			setHTML('Label_X_Axis_Canvas', 'Live Daten / Geber');
		}

		if(g_fromPageType == "MixerIndex"){
			setHTML('Function_Name', e.EventData.Mixer.Item[0].Name);
			setHTML('Label_Y_Axis_Canvas', 'Gemischt auf/ '  + e.EventData.Mixer.Item[0].ToFunctionName);
			setHTML('Label_X_Axis_Canvas', 'Live Daten / ' + e.EventData.Mixer.Item[0].FromFunctionName);
		}

		if(g_fromPageType == "ServoIndex"){
			telemetryServo = new Object();
			telemetryServo.ID = g_Index_Servo;
			telemetryServo.Value = 0;
			telemetryServo.ValueStr = "";

			TdPostArgs.Telemetry_Val = telemetryIds;
			g_MaxValue = Value12Bit2Percent(e.EventData.Servos.Item[0].MaxValue * 2);
			g_MinValue = Value12Bit2Percent(e.EventData.Servos.Item[0].MinValue * 2);

			setHTML('Control_Name', e.EventData.Function.Item[0].Name);
			setHTML('Function_Name', e.EventData.Servos.Item[0].NormalName);
			setHTML('Label_Y_Axis_Canvas', 'Live Daten / ' + e.EventData.Servos.Item[0].NormalName);
			setHTML('Label_X_Axis_Canvas', 'Live Daten / ' + e.EventData.Function.Item[0].Name);
			setHTML('Label_Y_Axis_MaxValue', "+200%");
			setHTML('Label_Y_Axis_MinValue', "-200%");

			hideHTML('Button_Global');
			hideHTML('Button_No_Global');

			setCSS('Button_Presets', 'width', '110px');
		}

		if(g_fromPageType == "SyncIndex"){
			GroupIndex = g_GET_Parameter.GroupIndex;
			g_lastURL = g_lastURL + "&GroupIndex=" + GroupIndex;
			popupListServoGroup = e.EventData.PopUp.ServoRealGroupUserUsed;

			showHTML('CurveEdit_RxCurrent');

			telemetryRxCurrent = new Object();
			telemetryRxCurrent.ID = 7175;
			telemetryRxCurrent.Value = 0;
			telemetryRxCurrent.ValueStr = "";

			telemetryIds.push(telemetryRxCurrent);
			TdPostArgs.Telemetry_Val = telemetryIds;

			for(var i = 0; i < popupListServoGroup.length; i++){
				if(popupListServoGroup[i].Index == GroupIndex){
					setHTML("Sync_Group", "Group " + popupListServoGroup[i].Name);
				}
			}

			items = e.EventData.Servos.Item;

			for(var i = 0; i < items.length; i++){
				if(items[i].Index == g_Index){
					g_MaxValue = Value12Bit2Percent(items[i].MaxValue * 2);
					g_MinValue = Value12Bit2Percent(items[i].MinValue * 2);
					g_Center   = Value12Bit2Percent(items[i].Center * 2);

					setHTML('Control_Name', items[i].NormalName);
					setHTML('Label_X_Axis_Canvas', items[i].NormalName);
				}
				else if(items[i].Index == g_Index_Servo){
					setHTML('Function_Name', items[i].NormalName);
					setHTML('Label_Y_Axis_Canvas', items[i].NormalName);
				}
			}

			hideHTML("Flight_Mode");
			showHTML("Sync_Group");

			setHTML('Label_X_Axis_MaxValue', "+200%");
			setHTML('Label_X_Axis_MinValue', "-200%");
			setHTML('Label_Y_Axis_MaxValue', "+" + 100/g_syncZoom + "%");
			setHTML('Label_Y_Axis_MinValue', "-" + 100/g_syncZoom + "%");

			$(".cell_function").css('width', 'auto');

			hideHTML("Button_Hori");
			hideHTML("Button_Vert");
			showHTML("Button_Prev");
			showHTML("Button_Next");

			hideHTML("Button_Add");
			hideHTML("Button_Select");
			setCSS("Button_All", "border-radius", "0px 0px 5px 5px");
			setCSS("Button_All", "width", "334px");			
			setCSS("Button_All_Label", "width", "334px");	
			

			hideHTML("PresetsAndGlobal");

			activate("Button_Plus");
			activate("Button_Minus");

			setHTML('Button_All_Label', 'Alle');
		}
		
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	if(cmd == "telemetry"){
		if(key == 7175){
			setHTML('Rx_Current_Value', valueStr);
		}
	}

	if(cmd == "AdditionalControlObject"){
		
		if(g_fromPageType != "SyncIndex"){
			if(typeof htmlObj_FuncValue == 'undefined'){
				htmlObj_FuncValue = document.getElementById('Function_Value');
			}

			htmlObj_FuncValue.innerHTML = e.EventData.CurveEdit.Current.YStr;	
		
			if(typeof htmlObj_ControlValue == 'undefined'){
				htmlObj_ControlValue = document.getElementById('Control_Value');
			}

			htmlObj_ControlValue.innerHTML = e.EventData.CurveEdit.Current.XStr;
		}

		
		setGlobal(e.EventData.CurveEdit.Current.IsGlobal);

		if(typeof canavasStartup == "undefined"){
			canavasStartup = false;
		}

		if(!g_isCanvasInit && (g_currentFlightMode != -1) && !canavasStartup && (typeof g_Resolution != "undefined")){
			canavasStartup = true;
			submitCurve("get");
		}

		if(g_isCanvasInit && g_fromPageType != "SyncIndex"){
			updateCrosshair('x', e.EventData.CurveEdit.Current.CrossX);
			updateCrosshair('y', e.EventData.CurveEdit.Current.CrossY);
		}
	}

	
	if(cmd == "flightmode"){
		g_currentFlightMode = e.EventData.Current_FM.Index;

		if(typeof htmlObj_FlightMode == "undefined"){
			htmlObj_FlightMode = document.getElementById('Flight_Mode');
		}

		if(typeof preFlightMode == "undefined"){
			preFlightMode = g_currentFlightMode;
			htmlObj_FlightMode.innerHTML = e.EventData.Current_FM.Name;
		}

		if((preFlightMode != g_currentFlightMode) && (g_currentFlightMode != -1)){
			htmlObj_FlightMode.innerHTML = e.EventData.Current_FM.Name;

			if(!e.EventData.CurveEdit.Current.IsGlobal){
				if(g_isChanged){
					g_isCanvasInit = false;
					setChanges(false, preFlightMode, g_global);
				}
				else{
					canvas.remove();
					submitCurve("get");

					g_selectedIndex = 16;
					g_isPointSelected = 0;
					g_Selections = 0;

					showHTML('Axes_Canvas');
					showHTML('Label_Axis_CenterValue');
					showHTML('Label_Y_Axis_MaxValue');
					showHTML('Label_X_Axis_MaxValue');
					showHTML('Label_Y_Axis_MinValue');
					showHTML('Label_X_Axis_MinValue');

					if(g_fromPageType == "SyncIndex"){
						activate('Button_Prev');
						activate('Button_Next');
						setHTML('Button_All_Label', 'Alle');
					}
				}
			}

			preFlightMode = g_currentFlightMode;
		}
	}	
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "get"){
			if(g_fromPageType == "FunctionIndex"){
				handleGET(e.EventData.get.Function.Setup.Curve);
			}
			else if(g_fromPageType == "MixerIndex"){
				handleGET(e.EventData.get.Mixer.Setup.Curve);
			}
			else if(g_fromPageType == "ServoIndex"){
				handleGET(e.EventData.get.Function.Servo.RxCurve);
			}
			else if(g_fromPageType == "SyncIndex"){
				handleGET(e.EventData.get.ServoSync.SlaveCurve.RxCurve);
			}
		}
		else if(e.cmd == "set"){
			if(g_fromPageType == "FunctionIndex"){
				if(e.EventData.set.Function.Setup.Curve.state == "preset"){
					handlePreset(e.EventData.set.Function.Setup.Curve);
				}
				else if(e.EventData.set.Function.Setup.Curve.state == "save"){
					if(isGotoSave){
						
						window.location.href = g_gotoLocation;
					}
					else{
						g_isGlobalSetPerformed = true;
					}
				}
			}
			else if(g_fromPageType == "MixerIndex"){
				if(e.EventData.set.Mixer.Setup.Curve.state == "preset"){
					handlePreset(e.EventData.set.Mixer.Setup.Curve);
				}
				else if(e.EventData.set.Mixer.Setup.Curve.state == "save"){
					if(isGotoSave){
						
						window.location.href = g_gotoLocation;
					}
					else{
						g_isGlobalSetPerformed = true;
					}
				}
			}
			else if(g_fromPageType == "ServoIndex"){
				if(e.EventData.set.Function.Servo.RxCurve.state == "preset"){
					handlePreset(e.EventData.set.Function.Servo.RxCurve);
				}
				else if(e.EventData.set.Function.Servo.RxCurve.state == "save"){
					if(isGotoSave){
						
						window.location.href = g_gotoLocation;
					}
					else{
						g_isGlobalSetPerformed = true;
					}
				}
			}
			else if(g_fromPageType == "SyncIndex"){
				if(e.EventData.set.ServoSync.SlaveCurve.RxCurve.state == "preset"){
					handlePreset(e.EventData.set.ServoSync.SlaveCurve.RxCurve);
				}
				else if(e.EventData.set.ServoSync.SlaveCurve.RxCurve.state == "save"){
					if(isGotoSave){
						
						window.location.href = g_gotoLocation;
					}
					else{
						g_isGlobalSetPerformed = true;
					}
				}
			}
		}
		else if(e.cmd == "command"){
			if(g_isSelectAllButton){
				g_isSelectAllButton = false;
			}
			else{
				if(g_isOptionButton){
					if(document.getElementById("Navi_Box").style.display == "none"){
						showDialogbox("saveCurve");
					}
					else{
						isGotoSave = true;
						submitCurve("set", "save", g_curvePercentages, g_realPoints, g_currentFlightMode);
					}
				}
				else{

						submitCurve("set", "save", g_curvePercentages, g_realPoints, g_currentFlightMode);




				}
			}	
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}	
}


function handlePreset(TdJson){
	

	subHandler(TdJson);

	for(var i = 0; i < path_pointsX.length; i++){
		path_pointsY[i] = g_curvePercentages[i];
		path_pointsR[i] = g_realPoints[i];
	}

	path_pointsR[32] = 1;

	drawPath2();
}


function handleGET(TdJson){
	subHandler(TdJson);

	g_rollBackValue["CurveValue"] = g_curvePercentages.slice(0);
	g_rollBackValue["RealPointsValue"] = g_realPoints.slice(0);
	canvasInit(g_curvePercentages, g_realPoints, g_currentFlightMode);
}


function subHandler(TdJson){
	g_curvePercentages = TdJson.CurveValue;
	g_realPoints       = TdJson.RealPoints;
}


function submitCurve(cmd, state, CurveValue, RealPoints, flightMode, global){
	var xmlObj = new Object();
	ModelName = "model-settings";

	if(cmd == "get"){
		state = "";
		CurveValue = [];
		RealPoints = [];
	}

	if(g_fromPageType == "FunctionIndex"){
		ListType1 = "Function";
		ListType2 = "Setup";
		Curve = "Curve";
	}
	else if(g_fromPageType == "MixerIndex"){
		ListType1 = "Mixer";
		ListType2 = "Setup";
		Curve = "Curve";
	}
	else if(g_fromPageType == "ServoIndex"){
		ListType1 = "Function";
		ListType2 = "Servo";
		Curve = "RxCurve";
	}
	else if(g_fromPageType == "SyncIndex"){
		ListType1 = "ServoSync";
		ListType2 = "SlaveCurve";
		Curve = "RxCurve";
	}

	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};
	xmlObj[cmd][ModelName][ListType1] = {};

	if(g_fromPageType != "SyncIndex"){
		xmlObj[cmd][ModelName][ListType1]["Index"] = g_Index;
		xmlObj[cmd][ModelName][ListType1]["FMI"] = flightMode;
	}	

	if(g_fromPageType != "ServoIndex" && g_fromPageType != "SyncIndex"){
		xmlObj[cmd][ModelName][ListType1]["UseGlobalCurve"] = global;
	}

	xmlObj[cmd][ModelName][ListType1][ListType2] = {};
	xmlObj[cmd][ModelName][ListType1][ListType2][Curve] = {};
	xmlObj[cmd][ModelName][ListType1][ListType2][Curve]["state"] = state;
	xmlObj[cmd][ModelName][ListType1][ListType2][Curve]["CurveValue"] = CurveValue;
	xmlObj[cmd][ModelName][ListType1][ListType2][Curve]["RealPoints"] = RealPoints;
	xmlObj[cmd][ModelName][ListType1][ListType2][Curve]["preset"] = g_PresetIndex;

	if(g_fromPageType == "ServoIndex"){
		xmlObj[cmd][ModelName][ListType1][ListType2]["Index"] = g_Index_Servo;
	}

	if(g_fromPageType == "SyncIndex"){
		xmlObj[cmd][ModelName][ListType1][ListType2]["ServoIdx"] = g_Index_Servo;
	}

	if((state == "edit") || (state == "preset")){
		if(g_Wizard == "true"){
			hideHTML('Wizard_Box');
		}
		else{
			hideHTML('Navi_Box');
		}

		showHTML('Save_Cancel_Box');
		g_isChanged = true;
	}

	GetTd(xmlObj, g_SetEvent, cmd);
}























function getLastSyncURL(){
	var uriGET = undefined;

	try{
		uriGET = window.location.search.substring(1).split("LastSyncURL=")[1];
		if(typeof uriGET == 'undefined') return;
	}catch(err){
		onError(err, "Error getLastSyncURL() at CurveEdit : ", false);
	}	

  return uriGET;
}


function servoMove2SelectedPoint(isAllSelected){
	if(isAllSelected){
		
		
		GetTd({"cmd":0x0257, "param": {"ServoIdx": g_Index}}, g_SetEvent, "command");
	}
	else{
		var positionForServo = roundPercent(path_pointsX[g_selectedIndex] - 201 + ((g_selectedIndex - 16) * (3/16)), "0.1");

		if(positionForServo > g_MaxValue){
			positionForServo = g_MaxValue;
		}
		else if(positionForServo < g_MinValue){
			positionForServo = g_MinValue;
		}

		GetTd({"cmd":0x0256, "param": {"ServoIdx": g_Index, "Pos": parseFloat(positionForServo)}}, "noEvent", "command");
		
	}
}


function setChanges(isSave, flightMode, global){
	if(isSave){
		g_rollBackValue["CurveValue"] = g_curvePercentages.slice(0);
		g_rollBackValue["RealPointsValue"] = g_realPoints.slice(0);
		submitCurve("set", "save", g_curvePercentages, g_realPoints, flightMode, global);
	}
	else{
		g_curvePercentages = g_rollBackValue["CurveValue"].slice(0);
		g_realPoints = g_rollBackValue["RealPointsValue"].slice(0);
		submitCurve("set", "save", g_curvePercentages, g_realPoints, flightMode, global);
		canvas.remove();
		submitCurve("get");

		g_selectedIndex = 16;
		g_isPointSelected = 0;
		g_Selections = 0;

		showHTML('Axes_Canvas');
		showHTML('Label_Axis_CenterValue');
		showHTML('Label_Y_Axis_MaxValue');
		showHTML('Label_X_Axis_MaxValue');
		showHTML('Label_Y_Axis_MinValue');
		showHTML('Label_X_Axis_MinValue');

		if(g_fromPageType == "SyncIndex"){
			activate('Button_Prev');
			activate('Button_Next');
			setHTML('Button_All_Label', 'Alle');
		}
	}

	if(g_Wizard == "true"){
		showHTML('Wizard_Box');
	}
	else{
		showHTML('Navi_Box');
	}

	hideHTML('Save_Cancel_Box');
	g_isChanged = false;
}






function setGlobal(isGlobal){
	if(g_isGlobalSetPerformed){
		if(typeof preIsGlobal == "undefined"){
			preIsGlobal = -1;
		}

		if((isGlobal != preIsGlobal) && (isGlobal != -1) && (g_fromPageType != "SyncIndex")){
			if(isGlobal){
				$('#Button_Global').removeClass("button_blue");
				$('#Button_Global').addClass("button_white");
				$('#Button_No_Global').addClass("button_blue");
				$('#Button_No_Global').removeClass("button_white");

				$('#Button_Global_Img').removeClass("icon_global_white");
				$('#Button_Global_Img').addClass("icon_global_blue");
				$('#Button_No_Global_Img').removeClass("icon_nglobal_blue");
				$('#Button_No_Global_Img').addClass("icon_nglobal_white");
			}
			else{
				$('#Button_No_Global').removeClass("button_blue");
				$('#Button_No_Global').addClass("button_white");
				$('#Button_Global').addClass("button_blue");
				$('#Button_Global').removeClass("button_white");

				$('#Button_No_Global_Img').removeClass("icon_nglobal_white");
				$('#Button_No_Global_Img').addClass("icon_nglobal_blue");
				$('#Button_Global_Img').removeClass("icon_global_blue");
				$('#Button_Global_Img').addClass("icon_global_white");
			}

			if(preIsGlobal != -1){
				g_global = isGlobal;
				
				g_isGlobalSetPerformed = false;
				setChanges(false, g_currentFlightMode, isGlobal);
			}

			preIsGlobal = isGlobal;
		}
	}
}


var g_PresetIndex = -1;

function showPopupPresetList(tagObj){
	tagId = $(tagObj).attr('id');
	$('#Pop_Up_Presets').css({'padding-left': '500px', 'top': '53px'});

	var htmlValue = $(tagObj).html();
	var htmlPopupListRow = '';	

	if(g_fromPageType == "ServoIndex"){
		var IMG_src = new Array(
			"data:image/png;base64,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", //PresetCurve_Servo_1.png
			"data:image/png;base64,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", 
			"data:image/png;base64,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", 
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAT4SURBVHja7JxdTFt1GMbPoYe1HeOj+8LCgPExcXMCErMLs3Cz4QXqlXEuftx4sYyYXXhlYsK8WLwz8cILE5aYqIkas8VEHS7GLQuZH0vcwszmmHMbTgtCIN0H46OU1vdtnxOPHetqC22hz5M8OaUcQvnl+b/v/384/2NGo1GDWlwVEQGhEiqhUoRKqIRKZSorhXPKxE+Lm8SuAmY1L/5dfEx8O9mJZgqT/xfFEfFVHHOlfeLeHI/qRhw/yXT414uv5RhoPigCDvWLUVOLEX0qzqGYjYrdn1ApQiVUQqUIlVAJlYrJ8vWMJz0heGg9KSXIyWwhPkwqhz+hEipFqIRKqBShEiqhUoRKqIRKESqhEipFqEuhjeKa4KH1lclOssgpZZgdv4yEd18ana9+zO/aLGCPyHuHxWFCTU8d3UfvvPLZwGw1vva/3uGtPNhZEgZYDv//qbr+a3NdDqAxvXd6euvVifk98nJdukndlyd/YLY+h4Ztldgj3jw4Fm5KPCEcMYrOD4dLG9e5auTLiXSg9uYJ0KX6HCYAVoh9OrzFjypQcX1blXUPJ6vIiLRWWXfk5Z+sqf9Kk1gCkDqENY3bAHKN+Jb4uvjkjtriur1t7l1SAjbaP9z9pPeypPTzxJQWGlQd0l5xuXitWGtkM2D60cVHxD+IL4tHxfoPft00UfH+c6V/CMjdA8Ph6ic2WZe2VVra/T8uxCmV3kpeijRqyvR+/a3iWgDWNA6JT+FoQ5xMmCr9LT7S4rf6xS/I6zd8PeMKfcGbKawVmEa7Nq5FArcjjRtwjtbAH5FGhXUTnhU/aKvOmMK3ga7kyf8qpFGHta50tgBkHcAGxL+JT6BGTiChdxeauC+GrGWaxtWAqA2mStyCJqPDWzuy7vn6TnwRQ/omhnUqaSwIqCbSqCAbMYwfQW1sMOI7EkeRxi9QG4MAqbUx6/u/rDxOoz3dqUACH0caq5E6rY3fAOaYozaGcv3hrTxKYzEAlmFIN2LKo53ahQZ0GmkMAGAQtTGvdiNaOU7jGkcaN2EVU49aGUIavzXiG213ij/MlzTmC1S7NpahK9uduhlAV2PyrU3mGIBOoPFMYuiPLYdOamUpjT6krxbTnQY0nCkjvon2OOaNdqdWkHPZ6NTLAap9YcJexWzAkG7FmtqD7nxB/Kv4L0eDubtcIS4FVAtpLEciG5DGh8U1SJ+mUffIX8GQDmJIh4wVqKRQZV3bKYddgPOT+JwjjTbESswZm3GeieXfz2gsw45OPb1S0pgWVAHa/W7/9P6+wdktkYix/aV2T8erOzwn5VtnURvtTl2OGngD4IcwGb8FF9yzAqz7AH3mnVNT+98+MdWCt7znApMVpW7zoedb3fo8lRmkcQANJuBYxcwYBf4Ui/slteujszP3PNai98y0W6Bqc/nAAdHu1NQDoBbNR2K18T+aCsUayxBqKx9nmWQeuZCO72l130h8c2+bW5tOP4Gml9S+t54q8Zum8VrfYKgpGjXmXm73jBzY6T0q3ztDbGlA9fWMh6RZHT7YWRIQv4ml4/cEmuGUSsDqVfEvBW67HL8iqsxrKkWohEqoFKESKqFSiwpVL5a4iComl5HCxaNUoOqtMno13yxwoCY4XE97ReXQ10b8mdRdOS4X+p/WZ3P4+/Ua8RXwyAyqLFf1bpBPOfLZqAiVUClCJVRCpQg1i/pHgAEAp89BbEhTDgUAAAAASUVORK5CYII=", //PresetCurve_Servo_4.png
			"data:image/png;base64,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", 
			"data:image/png;base64,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", 
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAW+SURBVHja7JxrbBRVFMfvTHe72y72IaRalCDlYYNYHqlRtGqNVuJiSbFFEIgQMU2N0fiBxMRYNGnUmJD4yWiKD6JA8ZUohUJ9goq2BaoxPgryCNZagoTaQpftdnfH/2HumnXpc3bZmd09J/lnOrOzmdvf3Mc55967iqZpgi22pjIChspQGSobQ2WoDJUtWrON4Z4saDE0A0pLYVYB6Ci0C+ob6UZlDM7/SigIHZNHs6waqje5VU+Xx23RNv9p0HGTgVrBgpLDtFj0qXZZ9dl0DnYeqHj0Z6hsDJWhMlQ2hspQGSrbRbPl1p4Z8YaeuklmlzEfug26FToL7Ye6TSjHAugWaBaVAdw+G46PzeIvvaS7L7iitrl/asfpwMTCvLQ1dYtcpflZ6nZ89m0cy1H1Zpt36bZ271WqKhzuQsdGwHwdYF8bsqZauRUN+LWq+97oLTrZE8ikC7+c8ucf7PRntz6Z43fYlBZc8sehHPPfPuCtWN94/vrQBZShKBDUagC2C6c7EglqQfNhX04IaMjofHeHb0rFHMdSnP4BhecuFXmuSAXlUUTcF3lvpGlhny9p+ME7JfIGgC5YX5rpTjSoznMD2pADaZqq0D/5lBg6e6ZEQBnNlCFeTPhLSA8Ex5ectzLUw+WzHZ6XvvT4u3qD/5VzcpbqK51upww8JawHh/luJNTwmhsJThnmGPKOCpfNdVS0d/mvDX/Ag3Md1Er2JBJU+scys5zKXzvXZd/w9K7+wc5/ArY8l9r38uIJx69wKB/EcaBqqVmYcX4wICq3tHvzFUXY3YXpRzeUuV7FZ01DFj7n2b9Hc6mex6ExzkBzIOqvVlONhTqhImivdKmOmPCib5auHU2pvEhAMfr7E8WlckF3QfdA30PkPlFzf5TGBxPL1SpVDpg7EimimgCVyhpKDn6DBJpQ82NWgkqu051QJXlOEPWbCTnhaJXm75Bh4HKI4ubN0K8iQSccbRYBWgKtgvqh96Df4hQtJWXzp5c6B1ohfc6t0I8j+J8MdRSzSzdplfz7XagNGhAJbmZBpbDvRmid0FN7H0KHIJ9IArOZBHSWHOXzIEqfUcbpgkgSU0143kyhL3qbLB17cqg9IolMjfOzplIuAiqGdkOfyxFfMFRj8Tyl66pk7EyD0qdilHWeDHXkZ1wDLYNuh/ZBzVCvGFu+M2kHquooEySzhb6ukxYOZ8tByohVW4BZd6yg1hts8hOhJRLsJzKePxUF0HoLQC03q/kT0Csl0LUySvoYOi1SwC4XVGribtmH7pSuE808BhmqsRpKu1lKZTx/TCZI/hQptGcg1hEV9Z2LIJo+/hn6SOhTISm1CSOWUJ1CXxbzgKyhtC3miEjBXS2xgkpZ+zughyGaSXxf6BN2KbmrJRZ9ql2GneTcU9Z+C9QhUnibULQ1NV3o0yCUIPHL8DPhk8xm1lSqoTdBj0AZQs+J/pTqQKOpqTYZelbKAWoTdEAkQdbeLKj0HcraPyR90u0SqJdxGmv+oZ3E5NhTsplWanzDQI1DDQGlUZ6y9puhr6BzjNEYVLrvOqEvx5kn9CWE+xiogT61p25SGQ53y0EpV/alWyXUXsY3TqgA+tgrX1+oaeoYmGlTFWVtsVMsn+c4KIGeZXTjhAqg92/c66l54QtPUehay8lB4fVrV68pdhYwVGN9qvudQ95LftbirTYvzdMvZGzGoKqB4KW7NnwBTRHW33tlWah75EaB/9nK+U6aX/qOsRkbqJqeu9dFmwYeb+rwzdA0Mbh6gbP7iZIMSjq3MjYDUHNrz/gwWG3aUObqgp4RetJ5PwON0qWinRcUhgIupfYaGdXli/3ZGCpDZahsDJWhMlQ2Q1BpdjSNUV20NDGG2eKxQD0BUbpPSXGgiuRwwnBEFWa0FJJ+k9ptcndBK5jLTXw+rQn7XfKIDirCVdrs0MAtnwcqhspQ2RgqQ2WobAw1jvavAAMAw2t7v6y8vDQAAAAASUVORK5CYII=", 
			"data:image/png;base64,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", //PresetCurve_Servo_8.png
			"data:image/png;base64,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", 
			"", 
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAATiSURBVHja7JxbbBRVGMfP7E7ZXRfaKoZSGi6F1geDKw0KpbVQa0oQ2qQJl0ATEuOlqfpkwouaKC+8mRASowYSMD74JBK1UiiB1i0tBQIhJdyi0tAADUTTArGt3e2O32G/iePY6W7b3Z1Z5v9P/pmdS3fP+e13vnPmnOkqmqYJKLXyAAGgAiqgWitIXknOBa7kpKCjQvMHVLdKTeIamUs3kUvIXhezGif/Rv6Z/HCmObWRHCP/zlu71ETeb3OrXsbbb2fa/IvJN20G6gTFmENxKnJqDoc+FOeQg44KvT+gQoAKqIAKASqgAioEqOlSolmqWvJr5IXkHvJFF7NaTX5ZxCdV2sm/TAfqu3vDI82t18dKxzVteWOZr/KtVYEjdPw7FwLd8nnXyObDl/+e5/MqOQ3LZ+1tXhM4QMe/nArUus86hpv3nBwO8X7g4u1ovtejNLzxkv+myyK2al/n8ObdbcOl+oGz/ZEyYvH2O6v9VyeKWKucuvGbC6P/m+I6dG60iDavuCxKKw+df1zv/+jr86NLJKepdFSe8ZhQzAcVRQRo8xw5zyVAZT2LvYriM5+IxjSPVUu3gnps24u+fvPBxjL/HyK+vPIRf0t5TzDMjVzP2TvKfH+aL9i+wi/5HJtKTj366fpgIUXm+63XxkpiQkR2rvQPNJX7D9O5Nk4B1eQN/ManRYJ1myxRLtdN1muU3CFHPbuqn6qJxLRt3/eOFcxSFXVLyHfjg7WBr+jciYneZLI1KtXwbcn1qS6Zo03fZhW5gvw0+ac0w03nGpUOs548SO4md5If8Hm54FlJXkWWufQTK6CJoOrazcAmayrryOVkP4/hZIGGsgBqPgfGqxyZPdybP5jkb+qZybQH/8lIFuBHLkwVpwUZvWeSKKCdOVMGwhoRX3M6ZYrMtN5RTRVuCznMTamOo7eb08KQA2Dmc9kq+HVLOlKWmoaCywIe5W++ipP+Ok4LXTZFbh7nRNnMfdy5yvI9suPefyZ6xHBP2zhaMPfm7Zn4bDUDFdMjt5srWMmpoSWNkZtn+JxBHgZmLAWpGWyCQwyyk9OBBFzDOTicogrLPLmWPcatIuOdZSahmkcLYQPYch7OTBeuDlMf1p2ys3O0A6o5csOGgbfVaEFOaCzk7R2L3jwTNyCOh2o1Wqg1jBZ6Jeie/sj63rvRJaEFakH5opw2juoQ9+Yq392krTfPRqhWowXZnN/8uPWvOV90j8zla555ryKweM/rwe0i/qxou3DgvIMT16j0yN1/9d64MAB9LLl/6U5UTkse5OscN5GTbKQ22VC2+b0D0dkTnbhyLxpcUaTuoJcDNpRrIFVQ7XiCed7zBd4ijyLmxrR/J8xpX3uhUL0l4utD920oV322NX/jasP9UKF6fFd1oE/1xJ/illu5L4/bBDTrOiop8zzkDx/WBLWtIX/t3YexxQtyPbdKnvWe4HGuANSJozLRZK58HPwIgewg6/Opg8Lh8jgoKifToMECUF0oQAVUQAVUyFlQFWBMHVRlGkMjQE3hOBNQIUAFVECFABVQARUCVEAFVAhQARVQIUAFVECFABVQn2CoEeHuX/g1yss8Zgy1j7xUYNVUYQ59CS9M4r+o9d+kLnV5upDPyP4qUvSb1BA6KkDNNsn/Jgwm4obmj0gFVECFANXR+keAAQCyA0yW1kukpAAAAABJRU5ErkJggg==",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAVkSURBVHja7JxrbBRVFMfvzE67s2xbqhDqtkEotsYYXFuxpVCKtVqi1SYkIClVE0Rt6uODJnxRovKFbybExAhBA8YPmhgrwUdbSoTa0gcQidYIGpWGxlIgmhYI3XUfM567e0bH6T663Z3OLnv+yT+38+jmzm/Pvffce3dXUFWVkVIrkRAQVIJKUKPLCV4FLiBcs5NAAxU1f4KarZJmcQ/vSx8Dl4FtWcwqCP4N/DX4WrJ9aitYAf+OpVVqA++3uFXfgeXHyTb/UvB5i4GmgxTkUJqKPjUHQ58U5pBDAxWN/gSVRFAJKkElEVSCSlBJBNUsxVulagQ/BF4KHgafyWJWq8FVLLyochz87VygvrCnz9Pe9bOvPKiqK1sr7bXPVjsOwfnPshDo5ncHPJs6fvx7id0m5GxcmbunfY3jfTi/NxGoj7/dO92++5tpNx47zvwRKLSJwsZt98vnsyxi697pn960q2e6XDtxcsxfCSyee361fDZSxEbrU5s++s47Y4nr4ClvCRTrsixKaw+eDj33//Thae9yzimRgUoMKkwwnhQE5oDiTvDCLAHKn7PUJgh244WAoorRWno0qN1b7rWPGU+2Vsp/svD2yuv4Li28iWE24XPmba20/2W8oaVC5ny6E+lTO9/a4HRBZL7Udc5XpjDmf3qVPNFWI3fAtR7sAurBj+ALn2Bx9m0yRAX4bPy5vOBenvXsqF/Q4FfULZ+P+IpyJUHa7Lb/8up6xz64djTSi8Tao5J07xbfnxrgfbTh3awDrwXfAv7SZLhm7lFpMJvBk+BBcD/4Kl7nG5614Gow70vfjAY0HlRNuxBYrKbyALgGLGMOxys0ZcjvlCRz3WSgRqtDIQbGgxiZwziaX43xWs3IZM7J/2zEK/AFVqYOuwUevUMcOOR3TTy/EwWmWpTr/ptj6urQjfVew8J7TscMkWnqjCpRuF+B+7ApPfXBSY/rje4b+doNFuS6M3JMXod8u+iCgXgcDj8xo8syY+7PK9gJPrd3yJNrvHjglLd4HnPdiDnmviEvj84fsJ4pHwPMXFAJ+gIzt7ahC+egHfME1R6pNXr8SoCZuO1uJtTBlgr7JePJ7dWyHwq3yXmulmfeta1K9hkvPnmffAlHeEtWqZLRwM6HnYtFkYXyOyhVnus+UyV3Yv/Lu4AG7IP7dNlCMuKj+Xo0h/npK3UL8jx+tVlfh5drHR2G9DClSkVKFUv6/E4x5LqFOrBaOhMLbqyUSoOppXXHcACailOHuWheUqqY/aouEo2aMmQLzQhlUAdEEx9slmI5boC5Ls4EJFYdMq75J5ot9GOe24iTCT6JGOGgh8f8G0YuBpa7i6WimttzejCq3Zi0Szi74f9/PR3muukAVdN1hHsCo4835+07u27kvzfoWYT33PriWsey3Y86W1j4s6LH03HdIR33qLTI3X/2cpDpgIbEj78fD/BlyQNm5ZnzFaltFtTttpGJQF6kCz9dDjgrSqSt8OeEBfWaSBVUKz7BvOTuIlsJzNcXKep/C+Z8/n6PS7rAwvtDVyyoV3OmNX/9bsMVt0s6sqPeMSqJ4U9x85If8/MWAc24gSo0izUcH36twak+4ZYbL15TlhUXiBfKFtuO4qoYI6iRozLezIPnmIcAZC9YS/4nWZpLTKOojKVJnRlBzUIRVIJKUAkqKb2gCoQxdVCFOaRGBDWFeSZBJRFUgkpQSQSVoBJUEkElqASVRFAJKkElEVSCSlBJBJWg3sRQ+Vd0bIQqJBvySBrqKHgFo11TATmMxr1xFl/50X6TujzLuwv+GdlfWYp+k5pEAxVBzTTxbxM643Gj5k+RSlAJKomgprX+EWAAnbeaDBXj5FAAAAAASUVORK5CYII=",
			"data:image/png;base64,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"
		);
	}
	else{
		var IMG_src = new Array(
			"data:image/png;base64,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", 
			"data:image/png;base64,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", 
			"data:image/png;base64,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", //PresetCurve_Function_3.png
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAVoSURBVHja7J1dbJNlFMefts/krdsYk+nsymBzaAAdg82B27DqBEXExHiBRsMFiUEWr7jyhunF4p2JicagkHiBCUFEE4zMGb8GAqI4QEQqKp9CAS1WATfG+uH/8J7FstEx2659+/b8k3/aNVvW/nbOc87zvs/zzBGLxZQovXIKAoEqUAWqKG1yTFj1h1BIQaGOMolUSf8clR5FeI/Hw6PwVNiVx6wi8K/wltL24PmUoEKL4SjcxY/Z0nJ4TZazuoZ5rE81/avhI1kGagVFmUN1OsbUAg59kcmhQAqVVH+BKhKoAlWgigSqQBWoIoEqUAWqQBUJVIEqUEUCVaAKVJFAFagCVSRQBapAFQlUgZpLugWuDHWUlY/0TVo4jRqmb//p8Hz/2Yi31uOqAthNeG0tHBaoycnX9v6FpRv29Xv5a89Kn7v8xQWFYQYr6f8/NXnrkYGFcUCv6PXtfdMPn4sswdOJyUbqcot8wGy8j6qDZ8LD1qSGo8r5fSBcXDPRVYkvzyUDdY1FgGbyfRjwrfD9s7x6zrBodKpoXYW+gKe/SfpfXzdQdMLz4efosWlKQXBpg/F3/De1NbsPIUo3Do1SKVRXizaJVMB3UXQqcxn6GXgzfPK1x4uqn51r+PYFwt67J2n/jHJN1f8daakSRybtMLsDfgS+B/4R3gDvhwNwH/z1TI/+DH4Sz18obQ+epR++1uY0necwb4anww/Asyki4TfgvfAphhm/d/93+NggUGn+/xNthKAZ0Qy4Bb6dAg5eB++BT8CXUvkF+QTVydX8TnieMjfbUfHZAvcwzKGRKVBHKEDUoNfwmNkIn1bmZrvvGGZvOmDmA1T6bDdxAWqF58JB+F14F4+f/6QTpp2hFnBkToOb4TqY9pJu5DHz6FjBtCNUJ7dG07gAUVWnCx4fw99ymo8pTDtBdXKa3wY/DNfDNH38itP8OHxRZXBvrbYBzGqeAbVwK0SRuZMjM6MwcxmqKy4yW7gAUSv0CfyNMvfkZwVmLkJ18JhJrVETpzlpK6f5YU77rG+h1zmS5hN4FrQMbuBisx3eQdNGru6WOY9AWxzm+Lg0v5er9xdchI7xjMhyhztoi8Is5gLUzKke42b9Lfhn+C9l4ZMytMVgljBMuvw2hxv5Hk7zJu43LX/siLYIzCKGOY+reSGD3MZpHuKZUU6c46ItAHMyR2YrF6Ru+EtlHgITUjl4IE42oDo4EqsYJo2bdJPtAEfmIWXe98nZ04V0hmEWMcx6rug3KvPWxQ4uQHTwYM6fLKQzGJlTeLykcZOuIu3mxp1g/gkP2OXKjs4ATC9X8gWwh1N8Lc+ACGZY2Ux6jGBSWtPKjUZu2qkA/QS/DR9U5sVi257Ilm6obq7mDZzmxRyR7zHUgMqD09h0miLT4Mik27z3KfMGGxWgD2A/F6DLKk+kU4Tp5jGzVpnHgdIVJLqWuYkjM5hPMFOBOgizglsjH6c8VfGOuDFzQOWpRoQa6iijiv0gp/YuTulJnObUZ9IKY7pdsZphnrJjNU8bVABte3Vb34pOf//UGNL7mXqjdVmj4efi4+E5+XoGHciTNHeNJgN1AqCLX+nuXfHy570zB1/rOXmxpMRwVD5RO44g0hKZH5S5tqhfZeAOpQVEwx5d2z2abKQuWtdzadjq4dU7+yKASulNi7vqMvyhaFXJY1mESn31L/BHyUJ1RqJX/jJX6Xx/jJbHdJe2B1cpUUIlWkndtaRu3ImhLz41y6DXugRbcpHa+dJDhR6HQz2/+cDlSqdTxZ6ebRxf6XO/iSj9VLBdZ/BN9G8+UKwI+CJuqWg86RSg1+Q0+pYKAKkgfcgWpWFMFQlUgWp7/SvAAGuYTzyuWz0yAAAAAElFTkSuQmCC", //PresetCurve_Function_4.png
			"data:image/png;base64,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", //PresetCurve_Function_5.png
			"data:image/png;base64,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", //PresetCurve_Function_6.png
			"data:image/png;base64,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", 
			"data:image/png;base64,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", //PresetCurve_Function_8.png
			"data:image/png;base64,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", 
			"data:image/png;base64,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",
			"data:image/png;base64,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",
			"data:image/png;base64,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"
		);
	}

	htmlPopupListContent = '';
	count = 0;

	for(var i = 0; i < 4; i++){		
		htmlPopupListColumn = '';

		for(var j = 0; j < 3; j++){
			if(g_PresetIndex == count){
				clickedClass = 'popup-list-clicked';
			}
			else{
				clickedClass = '';
			}

			if((g_fromPageType == "ServoIndex") && count == 9){
				count++; 
			}

			htmlPopupListColumn += '<li id="Preset__' + count + '" class="function-list-name ' + clickedClass + '" style="width: 91px; height: 91px; padding: 7px 0px 0px 7px;" onclick=\'closePopupPresetList("Preset__' + count + '", true);\'><img src="' + IMG_src[count] + '" height="85" width="85" alt="" draggable="false"/></li>';
			count++;
		}

		htmlPopupListContent += '<div><ul>' + htmlPopupListColumn + '</ul></div>';
	}

	htmlPopupListFooter = '<div id="poplist-footer" style="clear: both; width: 100%;" onClick="closePopupPresetList(\'' + tagId + '\', false);">' +
							 '<div id="popuplist-close-cancel"></div>' +
						  '</div>';

	var htmlPopupList = '' +
		'<div id="popup-wrapper">' +
			'<div id="popup-outer">' + 
				'<div id="PopUp_List_Container" class="popup-list-outer" style="height: ' + (j * 100) + 'px; width: ' + (i * 100) + 'px; overflow: hidden;">' +
					'<div id="scrollContainerPopUpInnerVertical" style="position: relative; top: 0px;">' +
						'<div id="PopupList" class="popup-list-inner">' +
							htmlPopupListContent + 
						'</div>' +
					'</div>' +
				'</div>' +
				htmlPopupListFooter + 
			'</div>' +
			'<div id="PopupArrowLeft"  style="margin-top: 0px; margin-left: 0px; display: none;"><img width="16" height="25" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAZCAYAAAA4/K6pAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNzlCQzA1MUREMTExMUUyQjQ0REVGOUExMUE1NUJBMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNzlCQzA1MkREMTExMUUyQjQ0REVGOUExMUE1NUJBMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM3OUJDMDRGREQxMTExRTJCNDRERUY5QTExQTU1QkEzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM3OUJDMDUwREQxMTExRTJCNDRERUY5QTExQTU1QkEzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+H9VfTQAAAJBJREFUOE+d01sKgCAURVFtUE2muQTNpck0KmODhpiPc+/+sZ+zwMB43k8wlq5jj/k7bPlUS/n8sgC/MalAd0wKMBzTCpiOaQYsxzQCpDH1AHlMLWAaUw2Yx1QA15gA3GMC+B6Gp3IFN1L/RBdSA2RGWoBMSA8gGRkBJCEzgJbICqApogA0RFSAuogFoAYJ4QWKeRAvsXw0vgAAAABJRU5ErkJggg==" alt="" draggable="false" /></div>' +
			'<div id="PopupArrowRight" style="margin-top: 0px; margin-left: 0px; display: none;"><img width="16" height="25" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAZCAYAAAA4/K6pAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDFDNEE3ODRERDI2MTFFMkI2OEI4QUIyMUFDRjFEMDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDFDNEE3ODVERDI2MTFFMkI2OEI4QUIyMUFDRjFEMDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MUM0QTc4MkREMjYxMUUyQjY4QjhBQjIxQUNGMUQwOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MUM0QTc4M0REMjYxMUUyQjY4QjhBQjIxQUNGMUQwOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnH/20IAAAB1SURBVHjapNXRDYAgDEVRXhd3GpdxqWc00cQIpOXyB4RDKC3Idnvath9XR63QojNmCpSQmMyZAikkEpuYAlMkCgE3BbpIFfghK8AHWQVehAA3QgERQOQIIkEUuUaRRBJJZZFiEilnkQcl9ToHWTwCSv/CKcAAS0QSHax/mhEAAAAASUVORK5CYII=" alt="" draggable="false" /></div>' +
		'</div>';

	var htmlPopupOuter = "<div id=\"Pop_Up_Presets_Outer\"></div>";

	$('#Pop_Up_Presets').append(htmlPopupOuter);
	$('#Pop_Up_Presets_Outer').html(htmlPopupList);

	setPositionPresetPopupList(tagObj);
}


function setPositionPresetPopupList (tagObj){
	var containerWidth  = $(tagObj).outerWidth();
	var containerHeight = $(tagObj).outerHeight();
	var containerOffset = $(tagObj).offset();
	var popupListWidth  = $('#popup-outer').outerWidth();
	var popupListHeight = $('#popup-outer').outerHeight();
	var popuoListTop  = 0;
	var popupListLeft = 0;
	var popupListMaxHeight = 410; 
	var documentOffsetWidth = $('body').offset().left;
	var documentWidth = $('body').outerWidth();
	var arrowTop = 0;
	var offsetContainerHeight = 8; 

	
	if((containerOffset.top + (containerHeight/2)) < 240){
		popupListTop = 53;
		arrowTop = popupListHeight + 63;
		
		if((containerOffset.top + (containerHeight / 2)) > (popupListHeight + popupListTop - offsetContainerHeight)){
			
			arrowTop += ((containerOffset.top + containerHeight/2) - (popupListHeight/2 + popupListTop));
			popupListTop += ((containerOffset.top + containerHeight/2) - (popupListHeight/2 + popupListTop));
		}
	}
	else{
		popupListTop = 53 + popupListMaxHeight - popupListHeight;
		arrowTop = popupListMaxHeight + 63;
		
		if((containerOffset.top + (containerHeight / 2) - offsetContainerHeight) < (popupListTop)){
			
			arrowTop -= (popupListTop - containerOffset.top - containerHeight/2 + popupListHeight/2);
			popupListTop -= (popupListTop - containerOffset.top - containerHeight/2 + popupListHeight/2);
		}
	}
	 
	popupListTop += 4;
	arrowTop += 4;

	
	if((containerOffset.left - documentOffsetWidth + (containerWidth/2)) > 400){
		popupListLeft = containerOffset.left - popupListWidth - documentOffsetWidth;

		if((documentOffsetWidth) > (containerOffset.left - popupListWidth)){
			
			popupListLeft += documentOffsetWidth - containerOffset.left - popupListWidth;
		}

		$('#PopupArrowRight').show();
		$('#PopupArrowRight').css({'margin-left': (popupListWidth-5) + 'px', 'margin-top': (containerOffset.top + (containerHeight/2) - arrowTop) + 'px'});
	}
	else{
		popupListLeft = containerOffset.left + containerWidth - documentOffsetWidth;

		if((documentOffsetWidth + documentWidth) < (containerOffset.left + containerWidth + popupListWidth)){
			
			popupListLeft -= (containerOffset.left + containerWidth + popupListWidth) - (documentOffsetWidth + documentWidth);
		}

		$('#PopupArrowLeft').show();
		$('#PopupArrowLeft').css({'margin-left': '-11px', 'margin-top': (containerOffset.top + (containerHeight/2) - arrowTop) + 'px'});
	}

	$('#Pop_Up_Presets').css({'padding-left': popupListLeft + 'px', 'top': popupListTop + 'px'});
}


function closePopupPresetList(tagId, isSave){
	if(isSave){
		g_PresetIndex = parseInt((tagId.split("__"))[1]);

		submitCurve("set", "preset");
	}

	$('#Pop_Up_Presets_Outer').remove();
}



function canvasInit(g_curvePercentages, g_realPoints, g_currentFlightMode){
	g_realPoints[0] = 1;
	submitCurve("set", "new", g_curvePercentages, g_realPoints, g_currentFlightMode);
	g_realPoints[32] = 1;

	
	zoom_X = 0;
	zoom_Y = 0;
	zoom = 100;
	zoom_sector = "all";
	zoom_factor = Math.pow(2, ((zoom / 100) - 1));	

	black     = "#000",
	blue      = "#1488ff",
	dark_grey = "#555",
	light_red = "#ff1d1d";

	PATH_POINT_X_MIN =   4;
	PATH_POINT_X_MAX = 398;
	path_points_count = 33;
	path_points_distance = (PATH_POINT_X_MAX - PATH_POINT_X_MIN) / (path_points_count - 1);

	path_pointsX = [];
	path_pointsY = [];
	path_pointsR = [];
	path_pointsS = [];

	switch(g_Resolution){
		case 3:		resolution = 1;		break;
		case 2:		resolution = 0.5;	break;
		default:	resolution = 0.1;
	}

	for(var i = 0; i < path_points_count; i++){
		path_x = Math.floor((path_points_distance * i) + PATH_POINT_X_MIN);

		path_pointsX[i] = path_x;
		path_pointsY[i] = g_curvePercentages[i];
		path_pointsR[i] = g_realPoints[i];
		path_pointsS[i] = 0;
	}

	if(g_fromPageType == "SyncIndex"){
		detectStartPoint();

		g_PointMax = getPointByTouch(Servo2x(g_MaxValue), true);
		g_PointMin = getPointByTouch(Servo2x(g_MinValue), true);

		if((roundPercent(path_pointsX[g_PointMax] - 201 + ((g_selectedIndex - 16) * (3/16)), "0.1")) < g_MaxValue){
			g_PointMax++;
		}

		if((roundPercent(path_pointsX[g_PointMin] - 201 + ((g_selectedIndex - 16) * (3/16)), "0.1")) > g_MinValue){
			g_PointMin--;
		}

		for(var i = 0; i < path_points_count; i++){
			if((i <= g_PointMin || i >= g_PointMax) && (path_pointsR[i] == 1)){
				path_pointsR[i] = 0;
			}
		}

		path_pointsR[0] = 1;
		path_pointsR[32] = 1;

		g_isPointSelected = 1;
		g_Selections = 1;
	}

	drawStaticCurveEdit();

	if(g_fromPageType == "SyncIndex" && path_pointsR[g_selectedIndex] == 1){
		buttons[g_selectedIndex].attr({fill: selected_button, stroke: selected_button});
	}

	var x_Servo = roundPercent(path_pointsX[g_selectedIndex] - 201 + ((g_selectedIndex - 16) * (3/16)), resolution);
	setHTML('Control_Value', checkPlusSign(x_Servo, x_Servo));

	

	var newValue = roundPercent(path_pointsY[g_selectedIndex], resolution);
	

	var y_Servo = roundPercent((parseFloat(x_Servo) + parseFloat(newValue)), resolution);
	setHTML('Function_Value', checkPlusSign(y_Servo, y_Servo));

	if(g_fromPageType == "SyncIndex"){
		drawPath3();
		setTimeout(function(){servoMove2SelectedPoint(false);}, 2000);
	}

	g_isCanvasInit = true;
}


function detectStartPoint(){
	var xMinValue = Servo2x(g_MinValue);
	var xMaxValue = Servo2x(g_MaxValue);
	var realPointCountbetweenLimits = 0;
	var startPoint = 16;

	for(var i = 0; i < path_points_count; i++){
		if(path_pointsX[i] >= xMinValue && path_pointsX[i] <= xMaxValue && path_pointsR[i] == 1){
			realPointCountbetweenLimits++;
		}
	}

	if(realPointCountbetweenLimits > 0){
		startPoint = getPointByTouch(((xMaxValue - xMinValue) / 2) + xMinValue, true);
	}
	else{
		startPoint = getPointByTouch(Servo2x(g_Center), false);
	}

	path_pointsR[startPoint] = 1;
	path_pointsS[startPoint] = 1;

	g_selectedIndex = startPoint;
}


function deactivate(ele){
	ele = document.getElementById('' + ele + '');

    if(!this.hasClass(ele)){
    	ele.className += " inactive";
    }
}


function activate(ele){
	ele = document.getElementById('' + ele + '');

    if(hasClass(ele)){
        var reg = new RegExp('(\\s|^)inactive(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}


function hasClass(ele){
    return ele.className.match(new RegExp('(\\s|^)inactive(\\s|$)'));
}


function drawStaticCurveEdit(){
	W = 402;																								
	H = W;																									

	canvas = Raphael("Curve_Edit_Canvas", W, H);															

	selected_button	= light_red;																			
	limit_line		= light_red;
	cross_hair 		= blue;
	path_color		= blue;
	big_buttons 	= black;
	small_buttons	= dark_grey;

	zoom_factor = Math.pow(2, ((zoom / 100) - 1));															

	vB = canvas.setViewBox(zoom_X, zoom_Y, (W / zoom_factor), (H / zoom_factor), false);					

	blankets = canvas.set();																				
	buttons  = canvas.set();																				

	if(g_fromPageType == "ServoIndex"){
		servoLimitMax = canvas.rect(0, percent2y(g_MaxValue), 402, 2).attr({fill: limit_line, "stroke-width": 0, opacity: 0.75});
		servoLimitMin = canvas.rect(0, percent2y(g_MinValue), 402, 2).attr({fill: limit_line, "stroke-width": 0, opacity: 0.75});
	}
	else if(g_fromPageType == "SyncIndex"){
		servoLimitMax = canvas.rect(Servo2x(g_MaxValue), 0, 2, 402).attr({fill: limit_line, "stroke-width": 0, opacity: 0.75});
		servoLimitMin = canvas.rect(Servo2x(g_MinValue), 0, 2, 402).attr({fill: limit_line, "stroke-width": 0, opacity: 0.75});
	}

	if(g_fromPageType != "SyncIndex"){
		crosshair_y = canvas.rect(0, 200, 402, 2).attr({fill: cross_hair, "stroke-width": 0, opacity: 1});
		crosshair_y_gnubbel = canvas.rect(0, 198, 18, 6).attr({fill: cross_hair, "stroke-width": 0, opacity: 1});

		crosshair_x = canvas.rect(200, 0, 2, 402).attr({fill: cross_hair, "stroke-width": 0, opacity: 1});
		crosshair_x_gnubbel = canvas.rect(198, 0, 6, 18).attr({fill: cross_hair, "stroke-width": 0, opacity: 1});
	}

	fix_button_radius  = 4;																					
	part_button_radius = 2;																					
	w_f = fix_button_radius * 2;																			
	w_p = part_button_radius * 2;																			

	dragBox = canvas.rect(0, 0, W, H).attr({fill: black, opacity: 0});										

	dragBox.click(
		function (event, x, y){
			posx = event.pageX - $(document).scrollLeft() - $('#Curve_Edit_Canvas').offset().left;			
			posy = event.pageY - $(document).scrollTop()  - $('#Curve_Edit_Canvas').offset().top;			
			var MaxSelections = 0;

			for(i = 0; i < path_pointsX.length; i++){
				if(path_pointsR[i] == 1){
					MaxSelections++;
				}
			}

			if(zoom == 100 && g_isPointSelected > 0){
				var newValue = roundPercent(yValue2Percent(posy, 0), resolution);

				if(g_Selections == 1 || g_Selections == MaxSelections){
					if(g_Selections > 1){
						valueDiff = (path_pointsY[16] - newValue);

						for(i = 0; i < path_pointsX.length; i++){
							path_pointsY[i] = Math.round((path_pointsY[i] - valueDiff) * 10) / 10;

							if(path_pointsY[i] > g_PercentMax){
								path_pointsY[i] = g_PercentMax;
							}
							else if(path_pointsY[i] < g_PercentMin){
								path_pointsY[i] = g_PercentMin;
							}

							buttons[i].attr({cy: percent2y(path_pointsY[i])});
						}

						setHTML('Point', '0');
						setHTML('Point_Value', checkPlusSign(newValue, newValue));
					}
					else if(g_Selections == 1){
						path_pointsY[g_selectedIndex] = newValue;
						buttons[g_selectedIndex].attr({cy: percent2y(path_pointsY[g_selectedIndex])});

						setHTML('Point', (g_selectedIndex - 16));
						setHTML('Point_Value', checkPlusSign(newValue, newValue));
					}

					drawPath2();

					updateCurveValues();
				}
			}
			





























			else if(zoom == 100 && g_isPointSelected == 0){
				var touchPoint = getPointByTouch(posx, true);

				g_Selections = 1;
				path_pointsS[touchPoint] = 1;
				buttons[touchPoint].attr({fill: selected_button, stroke: "none"});

				g_selectedIndex = touchPoint;
				g_isPointSelected = 1;
				
				setHTML('Point', (g_selectedIndex - 16));
				setHTML('Point_Value', checkPlusSign(path_pointsY[touchPoint], path_pointsY[touchPoint]));
			}

			if(g_fromPageType == "SyncIndex"){
				var x_Servo = roundPercent(path_pointsX[g_selectedIndex] - 201 + ((g_selectedIndex - 16) * (3/16)), resolution);

				newValue = roundPercent(path_pointsY[g_selectedIndex], resolution);
				setHTML('Point_Value', checkPlusSign(newValue, newValue));

				var y_Servo = roundPercent((parseFloat(x_Servo) + parseFloat(newValue)), resolution);
				setHTML('Function_Value', checkPlusSign(y_Servo, y_Servo));
			}
		}
	);
	
	



















	path = canvas.path().attr({stroke: path_color, "stroke-width": 2});
	drawDynamicCurveEdit(zoom_X, zoom_Y);
}



































































function mirror_curve(direction){																			
	if(direction == "horizontal"){																			
		var new_Y = [],
			new_R = [],
			new_S = [];

		var z = 0;

		for(var j = (path_pointsX.length - 1); j >= 0; j--){
			new_Y[z] = path_pointsY[j];
			new_R[z] = path_pointsR[j];
			new_S[z] = path_pointsS[j];
			z++;
		}

		for(var i = 0; i < path_pointsX.length; i++){
			path_pointsY[i] = new_Y[i];
			path_pointsR[i] = new_R[i];
			path_pointsS[i] = new_S[i];

			g_realPoints[i] = path_pointsR[i];
		}
	}
	else{																									
		for(var i = 0; i < path_pointsX.length; i++){
			path_pointsY[i] = (-1) * path_pointsY[i];
		}
	}

	drawPath2();
	updateCurveValues();
	canvas.remove();
	drawStaticCurveEdit();
	g_Selections = 0;

	for(var i = 0; i < path_pointsX.length; i++){
		if(path_pointsS[i] == 1){
			g_Selections++;
		}
	}

	if(g_Selections == 0){
		setHTML('Point', "");
		setHTML('Point_Value', "");
	}
	else if(g_Selections == 1){
		for(var i = 0; i < path_pointsX.length; i++){
			if(path_pointsS[i] == 1){
				setHTML('Point', i - 16);
				setHTML('Point_Value', checkPlusSign(path_pointsY[i], (Math.round(path_pointsY[i] * 10)/10)));
			}
		}
	}
	else{
		setHTML('Point', "0");
		setHTML('Point_Value', checkPlusSign(path_pointsY[16], (Math.round(path_pointsY[16] * 10)/10)));
	}
}


function drawDynamicCurveEdit(zoom_X, zoom_Y){
	values = [];
	len = path_pointsX.length;

	for(var i = len; i--;){
		values[i] = path_pointsX[i];
	}

	X = [];
	Y = [];

	for(i = 0, ii = len - 1; i < ii; i++){
		var xy  = transXY(i    , values[i]),
		  	xy1 = transXY(i + 1, values[i + 1]),
			f;

		X[i] = xy[0];
		Y[i] = xy[1];

		(f = function (i, xy){
			if(path_pointsS[i] == 1){
				if(path_pointsR[i] == 0){
					buttons.push(canvas.circle(xy[0], xy[1], part_button_radius).attr({fill: small_buttons, stroke: "none"}));
					blankets.push(canvas.circle(xy[0], xy[1], w_p).attr({stroke: "none", fill: "#fff", opacity: 0}));
				}
				else if(path_pointsR[i] == 1){
					buttons.push(canvas.circle(xy[0], xy[1], fix_button_radius).attr({fill: selected_button, stroke: "none"}));
					blankets.push(canvas.circle(xy[0], xy[1], w_f).attr({stroke: "none", fill: "#fff", opacity: 0}));
				}
				else if(path_pointsR[i] == 2){
					buttons.push(canvas.circle(xy[0], xy[1], fix_button_radius).attr({fill: selected_button, stroke: "none"}));
					blankets.push(canvas.circle(xy[0], xy[1], w_f).attr({stroke: "none", fill: "#fff", opacity: 0}));
				}
				else if(path_pointsR[i] == 3){
					buttons.push(canvas.circle(xy[0], xy[1], fix_button_radius).attr({fill: small_buttons, stroke: "none"}));
					blankets.push(canvas.circle(xy[0], xy[1], w_f).attr({stroke: "none", fill: "#fff", opacity: 0}));
				}
			}
			else{
				if(path_pointsR[i] == 0){
					buttons.push(canvas.circle(xy[0], xy[1], part_button_radius).attr({fill: dark_grey, stroke: "none"}));
					blankets.push(canvas.circle(xy[0], xy[1], w_p).attr({stroke: "none", fill: "#fff", opacity: 0}));
				}
				else if(path_pointsR[i] == 1 || path_pointsR[i] == 2){
					buttons.push(canvas.circle(xy[0], xy[1], fix_button_radius).attr({fill: big_buttons, stroke: "none"}));
					blankets.push(canvas.circle(xy[0], xy[1], w_f).attr({stroke: "none", fill: "#fff", opacity: 0}));
				}
				else if(path_pointsR[i] == 3){
					buttons.push(canvas.circle(xy[0], xy[1], fix_button_radius).attr({fill: small_buttons, stroke: "none"}));
					blankets.push(canvas.circle(xy[0], xy[1], w_f).attr({stroke: "none", fill: "#fff", opacity: 0}));
				}
			}
		})(i, xy);

		if(i == ii - 1){
			f(i + 1, xy1);
		}
	}

	xy = transXY(ii, values[ii]);
	X.push(xy[0]);
	Y.push(xy[1]);

	drawPath1();
}


function updateCurveValues(){
	var s_realPoints = [];

	for(var i = 0; i < path_pointsX.length; i++){
		var newValue = parseFloat(path_pointsY[i]);
		g_curvePercentages[i] = newValue;

		if(i < 32){
			s_realPoints[i] = g_realPoints[i];
		}
	}

	submitCurve("set", "edit", g_curvePercentages, s_realPoints);
}


function preselect_curve(where){
	buttons[g_selectedIndex].attr({fill: big_buttons, stroke: "none"});

	if(where == "prev"){
		path_pointsS[g_selectedIndex] = 0;

		while(g_selectedIndex >= 0){
			g_selectedIndex--;
			path_pointsS[g_selectedIndex] = 0;

			if(path_pointsR[g_selectedIndex] == 1){
				break;
			}
		}

		path_pointsS[g_selectedIndex] = 1;

		if(g_selectedIndex < 32){
			activate('Button_Next');
		}

		if(g_selectedIndex == 0){
			deactivate('Button_Prev');
		}
	}
	else if(where = "next"){
		path_pointsS[g_selectedIndex] = 0;

		while(g_selectedIndex < 33){
			g_selectedIndex++;
			path_pointsS[g_selectedIndex] = 0;

			if(path_pointsR[g_selectedIndex] == 1){
				break;
			}
		}

		path_pointsS[g_selectedIndex] = 1;

		if(g_selectedIndex > 0){
			activate('Button_Prev');
		}

		if(g_selectedIndex == 32){
			deactivate('Button_Next');
		}
	}

	var x_Servo = roundPercent(path_pointsX[g_selectedIndex] - 201 + ((g_selectedIndex - 16) * (3/16)), resolution);
	setHTML('Control_Value', checkPlusSign(x_Servo, x_Servo));

	setHTML('Point', (g_selectedIndex - 16));

	var newValue = roundPercent(path_pointsY[g_selectedIndex], resolution);
	setHTML('Point_Value', checkPlusSign(newValue, newValue));

	var y_Servo = roundPercent((parseFloat(x_Servo) + parseFloat(newValue)), resolution);
	setHTML('Function_Value', checkPlusSign(y_Servo, y_Servo));

	if(g_selectedIndex == 0){
		deactivate('Button_Prev');
	}
	else if(g_selectedIndex == 32){
		deactivate('Button_Next');
	}

	buttons[g_selectedIndex].attr({fill: selected_button, stroke: "none"});

	servoMove2SelectedPoint(false);
}


function select_curve(count){	
	if(count == 'all'){
		if(g_isPointSelected == 0 || (g_isPointSelected == 1 && g_Selections == 1 && g_fromPageType == "SyncIndex")){
			
			g_Selections = 0;

			for(i = 0; i < path_pointsX.length; i++){
				if(path_pointsR[i] > 0){
					g_Selections++;
					path_pointsS[i] = 1;
					buttons[i].attr({fill: selected_button, stroke: "none"});
				}
				else{
					path_pointsS[i] = 0;
					buttons[i].attr({fill: dark_grey, stroke: "none"});
				}
			}

			g_isPointSelected = 1;
			g_selectedIndex = 16;

			setHTML('Point', "0");
			setHTML('Point_Value', checkPlusSign(roundPercent(path_pointsY[g_selectedIndex], resolution), roundPercent(path_pointsY[g_selectedIndex], resolution)));

			if(g_fromPageType == "SyncIndex"){
				detectStartPoint();

				deactivate('Button_Prev');
				deactivate('Button_Next');

				setHTML('Button_All_Label', 'Einzeln');

				var x_Servo = roundPercent(path_pointsX[g_selectedIndex] - 201 + ((g_selectedIndex - 16) * (3/16)), resolution);
				setHTML('Control_Value', checkPlusSign(x_Servo, x_Servo));

				setHTML('Point', (g_selectedIndex - 16));

				var newValue = roundPercent(path_pointsY[g_selectedIndex], resolution);
				setHTML('Point_Value', checkPlusSign(newValue, newValue));

				var y_Servo = roundPercent((parseFloat(x_Servo) + parseFloat(newValue)), resolution);
				setHTML('Function_Value', checkPlusSign(y_Servo, y_Servo));

				g_isSelectAllButton = true;
				servoMove2SelectedPoint(true);
			}
		}
		else{
			
			for(i = 0; i < path_pointsX.length; i++){
				if(path_pointsS[i] == 1){
					path_pointsS[i] = 0;
					buttons[i].attr({fill: big_buttons, stroke: "none"});
				}
				else{
					path_pointsS[i] = 0;
				}
			}

			g_selectedIndex = 16;
			g_isPointSelected = 0;
			g_Selections = 0;

			setHTML('Point', "");
			setHTML('Point_Value', "");

			if(g_fromPageType == "SyncIndex"){
				detectStartPoint();

				g_isPointSelected = 1;
				g_Selections = 1;

				path_pointsS[g_selectedIndex] = 1;
				buttons[g_selectedIndex].attr({fill: selected_button, stroke: "none"});

				if(g_selectedIndex > 0){
					activate('Button_Prev');
				}

				if(g_selectedIndex < 32){
					activate('Button_Next');
				}

				setHTML('Button_All_Label', 'Alle');

				var x_Servo = roundPercent(path_pointsX[g_selectedIndex] - 201 + ((g_selectedIndex - 16) * (3/16)), resolution);
				setHTML('Control_Value', checkPlusSign(x_Servo, x_Servo));

				setHTML('Point', (g_selectedIndex - 16));

				var newValue = roundPercent(path_pointsY[g_selectedIndex], resolution);
				setHTML('Point_Value', checkPlusSign(newValue, newValue));

				var y_Servo = roundPercent((parseFloat(x_Servo) + parseFloat(newValue)), resolution);
				setHTML('Function_Value', checkPlusSign(y_Servo, y_Servo));

				servoMove2SelectedPoint(false);
			}
		}
	}
	else{
		if(path_pointsS[g_preselectedIndex] == 0){
			g_Selections++;
			path_pointsS[g_preselectedIndex] = 1;
			buttons[g_preselectedIndex].attr({fill: selected_button, stroke: "none"});
		}
		else{
			g_Selections--;
			path_pointsS[g_preselectedIndex] = 0;
				
			if(path_pointsR[g_preselectedIndex] == 0){
				buttons[g_preselectedIndex].attr({fill: dark_grey, stroke: selected_button});
			}
			else{
				buttons[g_preselectedIndex].attr({fill: big_buttons, stroke: selected_button});
			}
		}

		if(g_Selections > 0){
			g_isPointSelected = 1;
		}
		else{
			g_isPointSelected = 0;
		}

		if(g_Selections == 0){
			g_selectedIndex = 16;
			g_isPointSelected = 0;

			setHTML('Point', "");
			setHTML('Point_Value', "");

			if(g_fromPageType == "SyncIndex"){
				setHTML('Button_All_Label', 'Alle');

				deactivate('Button_Plus');
				deactivate('Button_Minus');
			}
		}
		else if(g_Selections == 1){
			for(var i = 0; i < path_pointsX.length; i++){
				if(path_pointsS[i] == 1){
					g_selectedIndex = i;
				}
			}
			
			setHTML('Point', (g_selectedIndex - 16));

			var newValue = roundPercent(path_pointsY[g_selectedIndex], resolution);
			setHTML('Point_Value', checkPlusSign(newValue, newValue));

			activate('Button_Plus');
			activate('Button_Minus');
		}
		else{
			g_selectedIndex = g_preselectedIndex;
			
			setHTML('Point', g_selectedIndex - 16);
			setHTML('Point_Value', checkPlusSign(path_pointsY[g_selectedIndex], roundPercent(path_pointsY[g_selectedIndex], resolution)));

			activate('Button_Plus');
			activate('Button_Minus');
		}

		if(g_fromPageType == "SyncIndex"){
			if(path_pointsS[g_preselectedIndex] == 1){
				setHTML('Button_All_Label', 'Keine');
				
			}
			else{
				
			}
		}
	}
}


function updateCrosshair(direction, value){ 																
	c_width  = 402;
	c_height = 402;

	if(direction == "x"){	
		crosshair_x.attr({x: value});
		crosshair_x_gnubbel.attr({x: value - 2});

		var PL_Index = getXPointLeft(value);
		var PR_Index = getXPointRight(value);

		var nearestPoint = getNearestPoint(value, PL_Index, PR_Index);

		for(var i = 0; i <= (path_pointsX.length - 1); i++){
			if(i == nearestPoint){
				if(path_pointsR[i] == 0){
					buttons[i].attr({fill: dark_grey, stroke: selected_button});
				}
				else{
					if(path_pointsS[i] == 0)
						buttons[i].attr({fill: big_buttons, stroke: selected_button});
					else if(path_pointsS[i] == 1)
						buttons[i].attr({fill: selected_button, stroke: selected_button});
				}
			}
			else{
				if(path_pointsR[i] == 0){
					buttons[i].attr({fill: dark_grey, stroke: "none"});
				}
				else{
					if(path_pointsS[i] == 0)
						buttons[i].attr({fill: big_buttons, stroke: "none"});
					else if(path_pointsS[i] == 1)
						buttons[i].attr({fill: selected_button, stroke: selected_button});
				}
			}
		}

		g_isPointPreselected = 1;
		g_preselectedIndex = nearestPoint;

		updateButtons(nearestPoint);
	}
	else{
		crosshair_y.attr({y: value});
		crosshair_y_gnubbel.attr({y: value - 2});
	}
}


function updateButtons(nearestPoint){
	if(path_pointsR[nearestPoint] == 0){
		if(path_pointsS[nearestPoint] == 0){
			activate('Button_Add');
			deactivate('Button_Select');

			setHTML('Button_Add_Label',    'Hinzufüg.');
			setHTML('Button_Select_Label', 'Anwählen');
		}
	}
	else if(path_pointsR[nearestPoint] == 1){
		if(path_pointsS[nearestPoint] == 0){
			deactivate('Button_Add');
			activate('Button_Select');

			setHTML('Button_Add_Label',    'Hinzufüg.');
			setHTML('Button_Select_Label', 'Anwählen');
		}
		else{
			if(nearestPoint != 0 && nearestPoint != 32){
				activate('Button_Add');
			}
			else{
				deactivate('Button_Add');
			}

			activate('Button_Select');

			setHTML('Button_Add_Label',    'Löschen');
			setHTML('Button_Select_Label', 'Abwählen');
		}
	}

	if(g_Selections > 0){
		activate('Button_Plus');
		activate('Button_Minus');

		setHTML('Button_All_Label', 'Keine');
	}
	else{
		deactivate('Button_Plus');
		deactivate('Button_Minus');

		setHTML('Button_All_Label', 'Alle');
	}
}


function change_curve(step){
	if(g_Selections > 0){
		var oldValue = 0.0;
		var newValue = 0.0;
		var MaxPercent = g_PercentMax;
		var MinPercent = g_PercentMin;

		if(g_fromPageType == "SyncIndex"){
			MaxPercent = 100/g_syncZoom;
			MinPercent = -100/g_syncZoom;
		}

		for(var i = 0; i < path_pointsX.length; i++){
			if(path_pointsS[i] == 1){
				oldValue = path_pointsY[i];
				newValue = oldValue + (step * resolution);

				roundedNewValue = roundPercent(newValue, resolution);

				if(roundedNewValue < MinPercent){
					roundedNewValue = MinPercent + ".0";
				}
				else if(roundedNewValue > MaxPercent){
					roundedNewValue = MaxPercent + ".0";
				}

				path_pointsY[i] = parseFloat(roundedNewValue);
				buttons[i].attr({cy: percent2y(path_pointsY[i])});
			}
		}

		drawPath2();
		updateCurveValues();

		var x_Servo = roundPercent(path_pointsX[g_selectedIndex] - 201 + ((g_selectedIndex - 16) * (3/16)), resolution);

		newValue = roundPercent(path_pointsY[g_selectedIndex], resolution);
		setHTML('Point_Value', checkPlusSign(newValue, newValue));

		var y_Servo = roundPercent((parseFloat(x_Servo) + parseFloat(newValue)), resolution);
		setHTML('Function_Value', checkPlusSign(y_Servo, y_Servo));
	}
}


function add_curve(){
	if(path_pointsR[g_preselectedIndex] == 0){
		path_pointsR[g_preselectedIndex] = 1;
		path_pointsS[g_preselectedIndex] = 1;

		g_realPoints[g_preselectedIndex] = 1;

		g_isPointSelected = 1;
		g_isPointPreselected = 0;
		g_Selections++;

		buttons[g_preselectedIndex].attr({fill: selected_button, stroke: "none", r: fix_button_radius});

		g_selectedIndex = g_preselectedIndex;
	}
	else{
		path_pointsR[g_preselectedIndex] = 0;
		path_pointsS[g_preselectedIndex] = 0;

		g_realPoints[g_preselectedIndex] = 0;

		g_isPointSelected = 0;
		g_isPointPreselected = 1;
		g_Selections--;

		buttons[g_preselectedIndex].attr({fill: dark_grey, stroke: selected_button, r: part_button_radius});

		drawPath2();

		if(g_Selections == 0){
			g_selectedIndex = 16;
			g_isPointSelected = 0;

			setHTML('Point', "");
			setHTML('Point_Value', "");
		}
		else if(g_Selections == 1){
			for(var i = 0; i < path_pointsX.length; i++){
				if(path_pointsS[i] == 1){
					g_selectedIndex = i;
				}
			}
		}
		else{
			g_selectedIndex = g_preselectedIndex;
		}
	}

	updateCurveValues();

	if(g_Selections > 0){
		setHTML('Point', g_selectedIndex - 16);
		setHTML('Point_Value', checkPlusSign(roundPercent(path_pointsY[g_selectedIndex], resolution), roundPercent(path_pointsY[g_selectedIndex], resolution)));
	}
}


function getYCoords(px1, px2, py1, py2, px_offset){															
	m = ((py2 - py1) / (px2 - px1));
	ppCoords = (m * (px_offset - px1)) + py1;

	return ppCoords;
}


function getXPointLeft(x_value){																			
	var gefunden = 0;

	for(var ii = 0; ii < path_pointsX.length; ii++){
		if(path_pointsX[ii] == x_value){
			if(ii == 32){
				pre_index = 31;
			}
			else{
				pre_index = ii;
			}

			gefunden++;
		}
	}

	if(gefunden == 0){
		for(var xv = x_value; xv > PATH_POINT_X_MIN; xv--){
			if(gefunden == 0){
				for(var i = 0; i < path_pointsX.length; i++){
					if(path_pointsX[i] == xv){
						pre_index = i;
						gefunden++;
					}
				}
			}
		}
	}

	if(gefunden == 0){
		pre_index = 0;
	}

	return pre_index;
}


function getXPointRight(x_value){																			
	var gefunden = 0;

	for(var ii = 0; ii < path_pointsX.length; ii++){
		if(path_pointsX[ii] == x_value){
			if(ii == 0){
				post_index = 1;
			}
			else if(ii == 32){
				post_index = 32;
			}
			else{
				post_index = ii + 1;
			}

			gefunden++;
		}
	}

	if(gefunden == 0){
		for(var xv = x_value; xv < PATH_POINT_X_MAX; xv++){
			if(gefunden == 0){
				for(var i = 0; i < path_pointsX.length; i++){
					if(path_pointsX[i] == xv){
						post_index = i;
						gefunden++;
					}
				}
			}
		}
	}

	if(gefunden == 0){
		post_index = 32;
	}

	return post_index;
}


function getNearestPoint(x_value, point_left, point_right){
	var leftern_value  = path_pointsX[point_left];
	var rightern_value = path_pointsX[point_right];
	var diff_left  = Math.abs(leftern_value - x_value);
	var diff_right = Math.abs(rightern_value - x_value);

	if(diff_left < diff_right){
		currentPoint = point_left;
	}
	else{
		currentPoint = point_right;
	}

	return currentPoint;
}


function transXY(x, y){
	return [
	  	path_pointsX[x],
	 	percent2y(path_pointsY[x])
	];
}


function drawPath1(){
	p = [];

	for(var j = 1, jj = path_points_count; j < jj; j++){
		if(path_pointsR[j] > 0){
			p.push(path_pointsX[j], percent2y(path_pointsY[j]));
		}
	}

	p = ["M", path_pointsX[0], percent2y(path_pointsY[0]), "L"].concat(p);

	return path.attr({path: p});
}


function drawPath2(){
	drawPath1();
	drawPath3();
}


function drawPath3(){
	for(var i = 0; i < path_points_count; i++){
		if(path_pointsR[i] == 0){
			fixed_left  = getPartPointsLeft(i);
			fixed_right = getPartPointsRight(i);

			x1 = path_pointsX[fixed_left - 1],
			y1 = percent2y(path_pointsY[fixed_left - 1]),
			x2 = path_pointsX[fixed_right + 1],
			y2 = percent2y(path_pointsY[fixed_right + 1]);

			yCoords = Math.round(getYCoords(x1, x2, y1, y2, (i * path_points_distance) + PATH_POINT_X_MIN));

			path_pointsY[i] = yValue2Percent(yCoords, 0);

			
			buttons[i].attr({cy: yCoords, r: part_button_radius});
		}
		else if(path_pointsR[i] == 1){
			yCoords = percent2y(path_pointsY[i]);

			if(path_pointsS[i] == 1){
				var bobbleColor = selected_button;
			}
			else{
				var bobbleColor = big_buttons;
			}

			
			buttons[i].attr({cy: yCoords, r: fix_button_radius});
		}

		blankets[i].attr({cy: yCoords});
	}
}


function getPartPointsLeft(index){
	var gefunden = 0;

	for(var i = index - 1; i >= 0; i--){
		if(gefunden == 0){
			if(path_pointsR[i] > 0){
				pre_index = i;
				gefunden++;
			}
		}
	}

	return pre_index + 1;
}


function getPartPointsRight(index){
	var gefunden = 0;

	for(var i = index + 1; i <= path_pointsX.length; i++){
		if(gefunden == 0){
			if(path_pointsR[i] > 0){
				post_index = i;
				gefunden++;
			}
		}
	}

	return post_index - 1;
}


function getPointByTouch(xCoord, isRealPoint){
	var pointIndex = 32;
	var touch = new Object();
	var compareArray = new Array();
	var sortedIndices = new Array();

	if(isRealPoint){
		compareState = 1;
	}
	else{
		compareState = 0;
	}

	touch = {};
	touch.Index = {};
	touch.Diff = {};
	touch.State = {};

	compareArray = [];

	for(var i = 0; i <= (path_pointsX.length - 1); i++){
		touch.Index[i] = i;
		touch.Diff[i]  = Math.abs(path_pointsX[i] - xCoord);
		touch.State[i] = path_pointsR[i];

		compareArray[i] = touch.Diff[i];
	}

	compareArray.sort(sortNumber);

	for(var i = 0; i <= (path_pointsX.length - 1); i++){
		for(var j = 0; j <= (path_pointsX.length - 1); j++){
			if(touch.Diff[j] == compareArray[i] && touch.State[j] == compareState){
				pointIndex = touch.Index[j];

				return pointIndex;
			}
		}
	}	
}


function sortNumber(a, b){
    return a - b;
}


function percent2y(percent){
	var MaxPercent = g_PercentMax;

	if(g_fromPageType == "SyncIndex"){
		MaxPercent = 100/g_syncZoom;
	}

	yCrd = ((((percent / MaxPercent) * (-201))) + 201);

	return yCrd;
}


function Servo2x(percent){
	xCrd = percent + 201 + (percent / 100);

	return xCrd;
}


function yValue2Percent(y, rounded){
	var MaxPercent = g_PercentMax;

	if(g_fromPageType == "SyncIndex"){
		MaxPercent = 100/g_syncZoom;
	}

	if(rounded == 1){
		var percent = Math.round(((y - 201) * (-1) / 201) * MaxPercent);
	}
	else if(rounded == 1.5){
		var percent = (Math.round(((y - 201) * (-1) / 201) * MaxPercent * 10) / 10).toString();

		var percent_null = percent.search(/\.+/);
		var percent_minus = percent.search(/\-+/);

		if(percent_null == -1){
			percent = percent + ".0";
		}

		var percent_int = percent.substr(0, percent.lastIndexOf("."));
		var percent_float = percent.substr(percent.lastIndexOf(".") + 1, 1);

		if(percent_float < 3){
			percent_float = "0";
		}
		else if(percent_float > 7){
			if(percent_minus == -1){
				percent_int = parseInt(percent_int) + 1;
			}
			else{
				percent_int = parseInt(percent_int) - 1;
			}

			percent_float = "0";
		}
		else{
			percent_float = "5";
		}

		percent = percent_int + "." + percent_float;
	}
	else if(rounded == 2){
		var percent = Math.round(((y - 201) * (-1) / 201) * MaxPercent * 10) / 10;
	}
	else{
		var percent = (((y - 201) * (-1) / 201) * MaxPercent);
	}

	return percent;
}















function roundPercent(value, decis){
	if(decis == "0.1"){
		var rounded = value.toFixed(1);
	}
	else if(decis == "0.5"){
		value = value.toString();

		var percent_null  = value.search(/\.+/);
		var percent_minus = value.search(/\-+/);

		if(percent_null == -1){
			value = value + ".0";
		}

		var percent_int   = value.substr(0, value.lastIndexOf("."));
		var percent_float = value.substr(value.lastIndexOf(".") + 1, 1);

		if(percent_float < 3){
			percent_float = "0";
		}
		else if(percent_float > 7){
			if(percent_minus == -1){
				percent_int = parseInt(percent_int) + 1;
			}
			else{
				percent_int = parseInt(percent_int) - 1;
			}

			percent_float = "0";
		}
		else{
			percent_float = "5";
		}

		if(percent_int <= g_PercentMin || percent_int >= g_PercentMax){
			percent = percent_int;
		}
		else{
			percent = percent_int + "." + percent_float;
		}

		var rounded = percent;
	}
	else if(decis == "1.0" || decis == "1"){
		var rounded = Math.floor(value);
	}

	return rounded;
}


function toggle_zoom_curve(state){
	if(state == 1){
		zoom = 200;
	}
	else{
		zoom = 100;
	}

	refreshCurveEdit();
}


function refreshCurveEdit(){
	canvas.remove();

	drawStaticCurveEdit();
}


function checkPlusSign(arg, value){
	if(arg >= 0){
		value = "+" + value;
	}

	value += "%";

	return value;
}
