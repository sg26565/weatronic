































var g_GET_Parameter = get_GET_Parameter();
var g_PageId = parseInt((g_GET_Parameter.PageId), 10);
var g_ControlId = parseInt((g_GET_Parameter.ControlId), 10);
var g_ControlTrigger = convertTrigger2Percent(g_GET_Parameter.ControlTrigger);
var g_ControlNode        = g_GET_Parameter.ControlNode;
var g_ControlNodeTrigger = g_GET_Parameter.ControlNodeTrigger;
var g_lastURL            = g_GET_Parameter.LastURL;
var g_controlObj = JSON.parse(g_GET_Parameter.ControlPath);
var g_FromName           = g_GET_Parameter.FromName;
var g_FromNameSub        = g_GET_Parameter.FromNameSub;
var g_isAdditionalValue	 = g_GET_Parameter.isAdditionalValue;
var g_AdditionalNode     = g_GET_Parameter.AdditionalNode;


var g_ReturnValue = 0;
var g_isChanged = false;
var g_rollBackValue = g_ControlId;
var g_rollBackValueTrigger = g_ControlTrigger;
var g_controlValue = 65536;
var g_isControlInverse = false;

var modeLinear = true;
var g_PageContent = 0;
var g_InitObjects = {};

var g_TriggerState = [];

var dropDownArray = new Array();
dropDownArray[0] = new Array(0,1,2,4);
dropDownArray[1] = new Array(0,1,2);
dropDownArray[2] = new Array(0,2);
dropDownArray[3] = new Array(0,1,2,6);
dropDownArray[4] = new Array(0,2,6);
dropDownArray[5] = new Array(0);
dropDownArray[6] = new Array(0);
dropDownArray[7] = new Array(0,1);

dropDownArray[10] = new Array(0,1,3,5);
dropDownArray[11] = new Array(0,1,3);
dropDownArray[12] = new Array(0,1,3,5,7);



if(typeof g_lastURL != "undefined"){
	$('#Navi_Button').removeAttr("href");
	$('#Navi_Button').bind("click", function(){window.location.href = g_lastURL;});
}

if(typeof g_isAdditionalValue == "undefined"){
	g_isAdditionalValue = false;
}
else{
	g_isAdditionalValue = Boolean(g_isAdditionalValue);
}

$('#Additional_Button_Option_label').bind("click", function(){bindRotaryEncoder();});
$('#Additional_Button_RotaryAll_Label').bind("click", function(){checkIsChanged(CONST_CTRL_Rotary_ALL);});

$('#Save_Button').bind("click", function(){setChanges(true);});
$('#Cancel_Button').bind("click", function(){setChanges(false);});


$('#Drop_Down_Content').bind("click", function(){DropDown();});
$('#Drop_Down_Arrow').bind("click", function(){DropDown();});
$('#Touch_Overlay').bind("click", function(event){GetClickPosition(event);});


$('#Option_0').bind("click", function(){changeSiteContent(0);});
$('#Option_1').bind("click", function(){changeSiteContent(1);});
$('#Option_2').bind("click", function(){changeSiteContent(2);});
$('#Option_3').bind("click", function(){changeSiteContent(3);});
$('#Option_4').bind("click", function(){changeSiteContent(4);});
$('#Option_5').bind("click", function(){changeSiteContent(5);});
$('#Option_6').bind("click", function(){changeSiteContent(6);});
$('#Option_7').bind("click", function(){changeSiteContent(7);});


$('#Plus100_Button').bind("click", function(){setFixedValue(2047);});
$('#Zero_Button').bind("click", function(){setFixedValue(0);});
$('#Minus100_Button').bind("click", function(){setFixedValue(-2047);});


$('#Fixed_Switch_Button_On').bind("click", function(){setFixedSwitch(2);});
$('#Fixed_Switch_Button_Off').bind("click", function(){setFixedSwitch(3);});


$('#Control_Inverse').bind('click', function(){setControlInverse();});


$('#Fix_Value_Value').bind("click", function(){showNumpad("Fix_Value_Value", "Control");});


initPage();

function initPage(){
	checkHTMLHeader('From_Name');
	setHTML("From_Name", g_FromName);


	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Control");
	InitDataPostArgs = getFlightModeObject(InitDataPostArgs);
	GetTd(getFunctionObject(InitDataPostArgs), g_InitEvent);



	controlTrimmerLeftTop = new Object();
	controlTrimmerLeftTop.ID = CONST_CTRL_RotaryLeftUp;
	controlTrimmerLeftTop.Value = 0;

	controlTrimmerLeftCenter = new Object();
	controlTrimmerLeftCenter.ID = CONST_CTRL_RotaryLeftMiddle;
	controlTrimmerLeftCenter.Value = 0;

	controlTrimmerLeftBottom = new Object();
	controlTrimmerLeftBottom.ID = CONST_CTRL_RotaryLeftBottom;
	controlTrimmerLeftBottom.Value = 0;

	controlTrimmerLeftBottomBottom = new Object();
	controlTrimmerLeftBottomBottom.ID = CONST_CTRL_RotaryLeftBottomBottom;
	controlTrimmerLeftBottomBottom.Value = 0;

	controlTrimmerLeftStick = new Object();
	controlTrimmerLeftStick.ID = CONST_CTRL_RotaryStickLeft;
	controlTrimmerLeftStick.Value = 0;

	controlTrimmerRightTop = new Object();
	controlTrimmerRightTop.ID = CONST_CTRL_RotaryRightUp;
	controlTrimmerRightTop.Value = 0;

	controlTrimmerRightCenter = new Object();
	controlTrimmerRightCenter.ID = CONST_CTRL_RotaryRightMiddle;
	controlTrimmerRightCenter.Value = 0;

	controlTrimmerRightBottom = new Object();
	controlTrimmerRightBottom.ID = CONST_CTRL_RotaryRightBottom;
	controlTrimmerRightBottom.Value = 0;

	controlTrimmerRightBottomBottom = new Object();
	controlTrimmerRightBottomBottom.ID = CONST_CTRL_RotaryRightBottomBottom;
	controlTrimmerRightBottomBottom.Value = 0;

	controlTrimmerRightStick = new Object();
	controlTrimmerRightStick.ID = CONST_CTRL_RotaryStickRight;
	controlTrimmerRightStick.Value = 0;

	controlStickVertLeft = new Object();
	controlStickVertLeft.ID = CONST_CTRL_StickLeftVert;
	controlStickVertLeft.Value = 0;

	controlStickVertRight = new Object();
	controlStickVertRight.ID = CONST_CTRL_StickRightVert;
	controlStickVertRight.Value = 0;

	controlStickHoriLeft = new Object();
	controlStickHoriLeft.ID = CONST_CTRL_StickLeftHori;
	controlStickHoriLeft.Value = 0;

	controlStickHoriRight = new Object();
	controlStickHoriRight.ID = CONST_CTRL_StickRightHori;
	controlStickHoriRight.Value = 0;

	controlPotiTopLeft = new Object();
	controlPotiTopLeft.ID = CONST_CTRL_PotiLeftTop;
	controlPotiTopLeft.Value = 0;

	controlPotiTopRight = new Object();
	controlPotiTopRight.ID = CONST_CTRL_PotiRightTop;
	controlPotiTopRight.Value = 0;

	controlPotiSideLeft = new Object();
	controlPotiSideLeft.ID = CONST_CTRL_PotiLeftSide;
	controlPotiSideLeft.Value = 0;

	controlPotiSideRight = new Object();
	controlPotiSideRight.ID = CONST_CTRL_PotiRightSide;
	controlPotiSideRight.Value = 0;

	controlPotiStickLeft = new Object();
	controlPotiStickLeft.ID = CONST_CTRL_PotiStickLeft;
	controlPotiStickLeft.Value = 0;

	controlPotiStickRight = new Object();
	controlPotiStickRight.ID = CONST_CTRL_PotiStickRight;
	controlPotiStickRight.Value = 0;

	controlSliderCenter = new Object();
	controlSliderCenter.ID = CONST_CTRL_SliderCenter;
	controlSliderCenter.Value = 0;

	controlSwitchTopLeftsideLeft = new Object();
	controlSwitchTopLeftsideLeft.ID = CONST_CTRL_SWLeftTop2;
	controlSwitchTopLeftsideLeft.Value = 0;

	controlSwitchTopLeftsideRechts = new Object();
	controlSwitchTopLeftsideRechts.ID = CONST_CTRL_SWLeftTop1;
	controlSwitchTopLeftsideRechts.Value = 0;

	controlSwitchTopRightsideLeft = new Object();
	controlSwitchTopRightsideLeft.ID = CONST_CTRL_SWRightTop1;
	controlSwitchTopRightsideLeft.Value = 0;

	controlSwitchTopRightsideRight = new Object();
	controlSwitchTopRightsideRight.ID = CONST_CTRL_SWRightTop2;
	controlSwitchTopRightsideRight.Value = 0;

	controlSwitchFrontLeftsideTop = new Object();
	controlSwitchFrontLeftsideTop.ID = CONST_CTRL_SWLeftFront1;
	controlSwitchFrontLeftsideTop.Value = 0;

	controlSwitchFrontLeftsideBottom = new Object();
	controlSwitchFrontLeftsideBottom.ID = CONST_CTRL_SWLeftFront2;
	controlSwitchFrontLeftsideBottom.Value = 0;

	controlSwitchFrontRightsideTop = new Object();
	controlSwitchFrontRightsideTop.ID = CONST_CTRL_SWRightFront1;
	controlSwitchFrontRightsideTop.Value = 0;

	controlSwitchFrontRightsideBottom = new Object();
	controlSwitchFrontRightsideBottom.ID = CONST_CTRL_SWRightFront2;
	controlSwitchFrontRightsideBottom.Value = 0;

	controlSwitchStickLeft = new Object();
	controlSwitchStickLeft.ID = CONST_CTRL_SWStickLeft;
	controlSwitchStickLeft.Value = 0;

	controlSwitchStickRight = new Object();
	controlSwitchStickRight.ID = CONST_CTRL_SWStickRight;
	controlSwitchStickRight.Value = 0;

	controlSwitchCenter1 = new Object();
	controlSwitchCenter1.ID = CONST_CTRL_SWCenter1;
	controlSwitchCenter1.Value = 0;

	controlSwitchCenter2 = new Object();
	controlSwitchCenter2.ID = CONST_CTRL_SWCenter2;
	controlSwitchCenter2.Value = 0;

	controlSwitchCenter3 = new Object();
	controlSwitchCenter3.ID = CONST_CTRL_SWCenter3;
	controlSwitchCenter3.Value = 0;

	controlButtonSwitchStickLeft = new Object();
	controlButtonSwitchStickLeft.ID = CONST_CTRL_StickLeftButton;
	controlButtonSwitchStickLeft.Value = 0;

	controlButtonSwitchStickRight = new Object();
	controlButtonSwitchStickRight.ID = CONST_CTRL_StickRightButton;
	controlButtonSwitchStickRight.Value = 0;

	
	if(g_PageId != 5){
		controlIds.push(
			controlSwitchTopLeftsideLeft,
			controlSwitchTopLeftsideRechts,
			controlSwitchTopRightsideLeft,
			controlSwitchTopRightsideRight,
			controlSwitchFrontLeftsideTop,
			controlSwitchFrontLeftsideBottom,
			controlSwitchFrontRightsideTop,
			controlSwitchFrontRightsideBottom,
			controlSwitchStickLeft,
			controlSwitchStickRight,
			controlSwitchCenter1,
			controlSwitchCenter2,
			controlSwitchCenter3,
			controlButtonSwitchStickLeft,
			controlButtonSwitchStickRight
		);
	}
	

	if(g_PageId < 10){
		controlIds.push(
			controlTrimmerLeftTop,
			controlTrimmerLeftCenter,
			controlTrimmerLeftBottom,
			controlTrimmerLeftBottomBottom,
			controlTrimmerLeftStick,
			controlTrimmerRightTop,
			controlTrimmerRightCenter,
			controlTrimmerRightBottom,
			controlTrimmerRightBottomBottom,
			controlTrimmerRightStick
		);

		if((g_PageId != 5) && (g_PageId != 6)){
			controlIds.push(
				controlStickVertLeft,
				controlStickVertRight,
				controlStickHoriLeft,
				controlStickHoriRight,
				controlPotiTopLeft,
				controlPotiTopRight,
				controlPotiSideLeft,
				controlPotiSideRight,
				controlPotiStickLeft,
				controlPotiStickRight,
				controlSliderCenter
			);
		}
	}

	if((g_PageId == 3) || (g_PageId == 4) || (g_PageId == 12)){
		for(var i = 0; i < 12; i++) {
			controlRemote = new Object();
			controlRemote.ID = CONST_CTRL_CONTROLID_RemoteBegin + i;
			controlRemote.Value = 0;

			controlIds.push(controlRemote);
		}
	}


	setInterval(JsonFunction, 250);
}



function getFunctionObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	InitDataPostArgs.SortIndeces = {};
	InitDataPostArgs.SortIndeces.Functions = [];

	Item = new Object();
	Item.Index = 0;

	Item.Name = "";
	Item.ControlID = 0;

	functionItems = new Array(Item);

	Function = new Object();
	Function.Items = "ALL_USED";

	Function.Item = functionItems;

	InitDataPostArgs.Function = Function;

	return InitDataPostArgs;
}


function getFlightModeObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	Item = new Object();
	Item.Index = 0;
	Item.Name = "";
	Item.FadeIn = "";
		NoFadeInFuncIdxs = new Object();
		NoFadeInFuncIdxs.Index = 0;
		NoFadeInFuncIdxs.Name = "";
		noFadeInFuncIdxs = new Array(NoFadeInFuncIdxs);
	Item.NoFadeInFuncIdxs = noFadeInFuncIdxs;
	Item.NoFadeInFunctionsStr = "";

	flightModeItems = new Array(Item);

	FlightMode = new Object();
	FlightMode.Items = "ALL_USED";

	FlightMode.Item = flightModeItems;
	FlightMode.ItemCount = 0;

	InitDataPostArgs.FlightMode = FlightMode;

	return InitDataPostArgs;
}


function getVirtualSwitchObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	Item = new Object();
	Item.Index = 0;
	Item.Name = "";

	isLogicalOperationOR = new Object();
	isLogicalOperationOR.Index = -1;
	isLogicalOperationOR.Name = "";
	Item.IsLogicalOperationOR = isLogicalOperationOR;

	control1 = new Object();
	control1.Control = -1;

	Item.Control__1 = control1;

	control2 = new Object();
	control2.Control = -1;

	Item.Control__2 = control2;

	vSwitchItems = new Array(Item);

	InitDataPostArgsExtended["get"] = {};
	InitDataPostArgsExtended["get"]["model-settings"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["VSwitch"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["VSwitch"]["Item"] = vSwitchItems;
	InitDataPostArgsExtended["get"]["model-settings"]["VSwitch"]["Items"] = "ALL";

	return InitDataPostArgsExtended;
}


function onEVENT_INIT(e){
	try{
		g_numpadLimitObj = e.EventData.NumPadLimits;
		g_InitObjects.fo = e.EventData;
		g_InitObjects.fm = e.EventData.FlightMode;

		GetTd(getVirtualSwitchObject(), g_SetEvent, "get");
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}

var start = new Array();
var controlValue = new Array();
var controlTime = new Array(); 
var onStartup = true;
var controlValueThreshold = 682; 
var controlTimeThreshold = 1000; 


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "control"){
		if(onStartup){
			for(var j = 0; j < controlIds.length; j++){
				start[j] = true;
				onStartup = false;
			}
		}

		for(var i = 0; i < controlIds.length; i++){
			if(key == controlIds[i].ID){
				if((g_PageContent == 0) || (g_PageContent == 6) || (g_PageContent == 7)){
					if(((g_PageContent == 6) || (g_PageContent == 7)) && (CONST_CTRL_CONTROLID_RemoteBegin <= key) && (key <= CONST_CTRL_CONTROLID_RemoteEnd)){ 
						checkForNew_CONTROL_ASSIGNMENT(i, key, value);
					}
					else if((g_PageContent == 0) && (CONST_CTRL_CONTROLID_RemoteBegin > key) || (key > CONST_CTRL_CONTROLID_RemoteEnd)){
						checkForNew_CONTROL_ASSIGNMENT(i, key, value);
					}	
				}
				break;
			}

			if(key == g_ControlId){
				g_controlValue = value;
			}
		}
	}
}


function checkForNew_CONTROL_ASSIGNMENT(controlID, key, val){
	if(start[controlID]){
		controlValue[controlID] = val;
		start[controlID] = false;
		var zeit = new Date();
		controlTime[controlID] = zeit.getTime();
	}
	else{
		if(Math.abs(val - controlValue[controlID]) > controlValueThreshold){
			g_ReturnValue = Value12Bit2Percent(val);

			if(modeLinear){
				log(3, "Wert von " + key + " mehr als 30% geaendert");
				checkIsChanged(key, 0);
			}
			else{
				var zeit = new Date();

				





















				
				if(val > 1536){
					if((zeit.getTime() - controlTime[controlID]) < controlTimeThreshold){
						log(3, "Wert von " + key + " auf -25% geaendert --> unten und pfeil oben");
						trigger = -25.0;
					}
					else{
						log(3, "Wert von " + key + " auf +75% geaendert --> oben und pfeil oben");
						trigger = 75.0;
					}
				}
				else if(val < -1536){
					if((zeit.getTime() - controlTime[controlID]) < controlTimeThreshold){
						log(3, "Wert von " + key + " auf +25% geaendert --> oben und pfeil unten");
						trigger = 25.0;
					}
					else{
						log(3, "Wert von " + key + " auf -75% geaendert --> unten und pfeil unten");
						trigger = -75.0;
					}
				}
				else if((val > -512) && (val < 512)){
					log(3, "Wert von " + key + " auf 0% geaendert --> unten und pfeil unten");
					trigger = -10.0;
				}

				log(3, "Zeit: " + (zeit.getTime() - controlTime[controlID]));
				controlTime[controlID] = zeit.getTime();

				checkIsChanged(key, trigger);
			}

			controlValue[controlID] = val;
		}
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "get"){
			g_InitObjects.vs = e.EventData.get;

			
			if(typeof g_FromNameSub != "undefined"){
				setHeaderMaxWidth('From_Name', 'Sub_From_Name');
				setHTML("Sub_From_Name", g_FromNameSub);
				showHTML("Sub_From");
			}

			if((g_PageId == 5) || (g_PageId == 6)){
				showHTML('Drop_Down_Menu_Label');
			}
			else{
				showHTML('Drop_Down_Menu');
			}
			
			if(g_PageId != 0){
				hideHTML("Option_4");
			}

			if(g_PageId == 2){
				hideHTML("Option_1");
			}

			if((g_PageId != 3) && (g_PageId != 4)){
				hideHTML('Option_6');
			}

			if(g_PageId > 9){
				modeLinear = false;
				hideHTML("Option_2");
				showHTML("Option_3");
				hideHTML('Option_6');

				if(g_PageId == 11){
					hideHTML('Option_5');
				}

				if(g_PageId != 12){
					hideHTML('Option_7');
				}
				
				setCSS("Control_Assignment_BG_IMG", "backgroundImage", "url(data:image/png;base64,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)"); //BAT64_SwitchAssignment_BG.png
				
				

				hideHTML('Control_Assignment_Label');
				showHTML('Switch_Assignment_Label');
				document.title = "9.1.0__SwitchAssignment";
				setHTML('Page_Name_Tag', 'Switch_Assignment_Label');
			}
			else if(g_PageId == 5){
				
				showHTML('Additional_Button_Box_RotaryAll');
				setCSS("Control_Assignment_BG_IMG", "backgroundImage", "url('data:image/png;base64,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')");
			}
			else if(g_PageId == 6){
				setCSS("Control_Assignment_BG_IMG", "backgroundImage", "url('data:image/png;base64,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')");
				
			}

			
			if(((CONST_CTRL_FlightmodeBegin <= g_ControlId) && (g_ControlId <= CONST_CTRL_FlightmodeEnd)) || ((CONST_CTRL_FlightmodeInverseBegin <= g_ControlId) && (g_ControlId <= CONST_CTRL_FlightmodeInverseEnd))){
				changeSiteContent(5);
			}
			else if(((CONST_CTRL_VirtualSwitchBegin <= g_ControlId) && (g_ControlId <= CONST_CTRL_VirtualSwitchEnd)) || ((CONST_CTRL_VirtualSwitchInverseBegin <= g_ControlId) && (g_ControlId <= CONST_CTRL_VirtualSwitchInverseEnd))){
				changeSiteContent(1);
			}
			else if((CONST_CTRL_ValueFixedBegin <= g_ControlId) && (g_ControlId <= CONST_CTRL_ValueFixedEnd)){
				if(g_ControlId < CONST_CTRL_ValueFixedMiddle){
					g_controlValue = g_ControlId - CONST_CTRL_ValueFixedBegin;
				}
				else{
					g_controlValue = g_ControlId - CONST_CTRL_ValueFixedEnd - 1;
				}

				changeSiteContent(2);
			}
			else if((g_ControlId == CONST_CTRL_SwitchFixedOn) || (g_ControlId == CONST_CTRL_SwitchFixedOff)){
				changeSiteContent(3);
			}
			else if((CONST_CTRL_FunctionoutputBegin <= g_ControlId) && (g_ControlId <= CONST_CTRL_FunctionoutputEnd)){
				changeSiteContent(4);
			}
			else if((CONST_CTRL_CONTROLID_RemoteBegin <= g_ControlId) && (g_ControlId <= CONST_CTRL_CONTROLID_RemoteEnd)){
				if(g_PageId == 12){
					changeSiteContent(7);
				}
				else{
					changeSiteContent(6);
				}
			}
			else{
				changeSiteContent(0);
				ShowControlOverlayIcon(g_ControlId, g_ControlTrigger);
			}
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}




function getInnerFunctionOutputContainer(){
	var htmlFunctionOutputInnerContainer = '' +
		'<div id="Function_Output_Inner" class="">' +
			'<div class="list_header" style="width: 758px;">' +
				'<div class="list_function_output_name">' + 'Funktion' + '</div>' +
				'<div class="list_function_output_control">' + 'Geber' + '</div>' +
			'</div>' +
			'<div id="List_Container" class="list_content scrollContainerOuterVertical" style="max-height: 280px; width: 760px;">' +
				'<div id="scrollContainerInnerVertical" class="inner_list_content"></div>' +
			'</div>' +
		'</div>';

	return htmlFunctionOutputInnerContainer;
}


function getRowOfFunctionOutputInnerList(Index, FunctionName, FunctionControl){
	var classCurrent = "";

	if(Index == (g_ControlId - CONST_CTRL_FunctionoutputBegin)){
		classCurrent = "current_list_row";
	}
	else{
		classCurrent = "";
	}

	var htmlInnerContainer = '' +
		'<div id="ContainerOuter_' + Index + '" class="' + classCurrent + '">' +
			'<div id="Container_' + Index + '" class="list_content_row" style="width: 760px;" onClick=\'submitSET("FunctionOutput",' + Index + ');\'>' +
				'<!-- Function Name -->' +
				'<div class="list_function_output_name no_edit">' + FunctionName + '</div>' +
				'<!-- Function Control -->' +
				'<div class="list_function_output_control no_edit">' +
					'<img width="85" height="61" id="Functions_Output_Control_' + Index + '" src="" alt="" draggable="false" /><script type="text/javascript">control2image("Functions_Output_Control_' + Index + '", ' + FunctionControl + ');</script>' +
				'</div>' +
			'</div>' +
		'</div>';

	return htmlInnerContainer;
}




function getInnerVirtualSwitchContainer(){
	var htmlFunctionOutputInnerContainer = '' +
		'<div id="Virtual_Switch_Inner" class="">' +
			'<div class="list_header" style="width: 758px;">' +
				'<div class="list_virtual_switch_name">' + 'Virtueller Schalter' + '</div>' +
				'<div class="list_virtual_switch_control">' + 'Geber' + '</div>' +
				'<div class="list_virtual_switch_logic">' + 'Logik' + '</div>' +
				'<div class="list_virtual_switch_control">' + 'Geber' + '</div>' +
			'</div>' +
			'<div id="List_Container" class="list_content scrollContainerOuterVertical" style="max-height: 210px; width: 760px;">' +
				'<div id="scrollContainerInnerVertical" class="inner_list_content"></div>' +
			'</div>' +
		'</div>';

	return htmlFunctionOutputInnerContainer;
}


function getRowOfVirtualSwitchInnerList(Index, VSwitchName, VswitchControl1, VswitchControl2, VswitchLogic, VirtualSwitchControlOffset){
	var classCurrent = "";

	if(Index == (g_ControlId - VirtualSwitchControlOffset)){
		classCurrent = "current_list_row";
	}
	else{
		classCurrent = "";
	}

	var htmlInnerContainer = '' +
		'<div id="ContainerOuter_' + Index + '" class="' + classCurrent + '">' +
			'<div id="Container_' + Index + '" class="list_content_row" style="width: 760px;" onClick=\'submitSET("VirtualSwitch",' + Index + ');\'>' +
				'<!-- VSwitch Name -->' +
				'<div class="list_virtual_switch_name no_edit">' + VSwitchName + '</div>' +
				'<!-- VSwitch Control -->' +
				'<div class="list_virtual_switch_control no_edit">' +
					'<img width="85" height="61" id="Virtual_Switch_Control1_' + Index + '" src="" alt="" draggable="false" /><script type="text/javascript">control2image("Virtual_Switch_Control1_' + Index + '", ' + VswitchControl1 + ');</script>' +
				'</div>' +
				'<!-- VSwitch Logic -->' +
				'<div class="list_virtual_switch_logic no_edit">' + VswitchLogic + '</div>' +
				'<!-- VSwitch Control -->' +
				'<div class="list_virtual_switch_control no_edit">' +
					'<img width="85" height="61" id="Virtual_Switch_Control2_' + Index + '" src="" alt="" draggable="false" /><script type="text/javascript">control2image("Virtual_Switch_Control2_' + Index + '", ' + VswitchControl2 + ');</script>' +
				'</div>' +
			'</div>' +
		'</div>';

	return htmlInnerContainer;
}




function getInnerFlightModeContainer(){
	var htmlFunctionOutputInnerContainer = '' +
		'<div id="FlightMode_Inner" class="">' +
			'<div class="list_header" style="width: 758px;">' +
				'<div class="list_flightmode_name">' + 'Name' + '</div>' +
				'<div class="list_flightmode_fadein">' + 'Zeit' + '</div>' +
				'<div class="list_flightmode_functions">' + 'Funktionen ohne Überblendzeit' + '</div>' +
			'</div>' +
			'<div id="List_Container" class="list_content scrollContainerOuterVertical" style="max-height: 210px; width: 760px;">' +
				'<div id="scrollContainerInnerVertical" class="inner_list_content"></div>' +
			'</div>' +
		'</div>';

	return htmlFunctionOutputInnerContainer;
}


function getRowOfFlightModeInnerList(Index, Name, FadeIn, NoFadeInFunctionsStr, FlightModeControlOffset){
	var classCurrent = "";

	if(Index == (g_ControlId - FlightModeControlOffset)){
		classCurrent = "current_list_row";
	}

	var htmlInnerContainer = '' +
		'<div id="ContainerOuter_' + Index + '" class="' + classCurrent + '">' +
			'<div id="Container_' + Index + '" class="list_content_row" style="width: 760px;" onClick=\'submitSET("FlightMode",' + Index + ');\'>' +
				'<!-- FlightMode Name -->' +
				'<div id="FlightMode__' + Index + '_Name" class="list_flightmode_name no_edit">' + Name + '</div>' +

				'<!-- FlightMode FadeIn -->' +
				'<div id="FlightMode__' + Index + '_FadeIn" class="list_flightmode_fadein no_edit">' + FadeIn + '</div>' +

				'<!-- FlightMode Functions with no FadeIn -->' +
				'<div id="FlightMode__' + Index + '_Functions" class="list_flightmode_functions no_edit">' + NoFadeInFunctionsStr + '</div>' +
			'</div>' +
		'</div>';

	return htmlInnerContainer;
}




function getInnerRemoteControlSwitchContainer(){
	var htmlFunctionOutputInnerContainer = '' +
		'<div id="Remote_Inner" class="">' +
			'<div class="list_header" style="width: 758px;">' +
				'<div class="list_remote_name">' + 'Name' + '</div>' +
				'<div class="list_remote_control">' + 'Geber' + '</div>' +
			'</div>' +
			'<div id="List_Container" class="list_content scrollContainerOuterVertical" style="max-height: 210px; width: 760px;">' +
				'<div id="scrollContainerInnerVertical" class="inner_list_content"></div>' +
			'</div>' +
		'</div>';

	return htmlFunctionOutputInnerContainer;
}


function getRowOfRemoteControlSwitchInnerList(Index, Name, isControl){
	var classCurrent = "";
	var remoteClickEvent = "";
	var trigger ="";
	var controlStyle = 'style="margin-top: 4px;"';

	if(Index == (g_ControlId - CONST_CTRL_CONTROLID_RemoteBegin)){
		classCurrent = "current_list_row";
	}

	if(isControl){
		remoteClickEvent = '<div class="list_remote_control" onClick=\'submitSET("RemoteControl",' + Index + ');\'>';
		controlStyle = 'style="margin: 4px 0 0 147px;"';
	}
	else{
		trigger = '<span id="Remote_Control_Trigger_' + Index + '" style="margin: 8px 6px 0 139px; display: block; float: left"></span>';
		remoteClickEvent = '<div class="list_remote_control no_edit">';
	}

	var htmlInnerContainer = '' +
		'<div id="ContainerOuter_' + Index + '" class="' + classCurrent + '">' +
			'<div id="Container_' + Index + '" class="list_content_row" style="width: 760px;">' +
			
				'<!-- Remote Name -->' +
				'<div id="RemoteControl__' + Index + '_Name" class="list_remote_name no_edit">' + Name + ' ' + (Index + 1) + '</div>' +

				'<!-- Remote Control/ Control -->' +
					remoteClickEvent +
					trigger +
					'<img id="Remote_Control_Control_' + Index + '" ' + controlStyle + ' "src="data:image/png;base64,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" width="85" height="61" alt="" draggable="false"/>' +
				'</div>' +

			'</div>' +
		'</div>';

	return htmlInnerContainer;
}

function bindRotaryEncoder(){
	window.location.href = "9.1.1__RotaryEncoderSetup.html" +
						   "?LastURL=" + g_lastURL +
						   "&ControlPath=" + encodeURI(JSON.stringify(g_controlObj)) +
						   "&ControlId=" + g_ControlId +
						   "&ControlTrigger=" + g_ControlTrigger +
						   "&ControlNode=" + g_ControlNode +
						   "&ControlNodeTrigger=" + g_ControlNodeTrigger +
						   "&PageId=" + g_PageId +
						   "&FromName=" + g_FromName +
						   "&FromNameSub=" + g_FromNameSub;
}


function showOptionButton(key){

	if((key == CONST_CTRL_RotaryLeftUp) || (key == CONST_CTRL_RotaryLeftMiddle) || (key == CONST_CTRL_RotaryLeftBottom) || (key == CONST_CTRL_RotaryStickLeft) ||
		(key == CONST_CTRL_RotaryRightUp) || (key == CONST_CTRL_RotaryRightMiddle) || (key == CONST_CTRL_RotaryRightBottom) || (key == CONST_CTRL_RotaryStickRight) ||
		(key == CONST_CTRL_RotaryLeftBottomBottom) || (key == CONST_CTRL_RotaryRightBottomBottom)) {

		if((g_PageId != 5) && (g_PageId != 6)){
			
			showHTML('Additional_Button_Box');
		}
	}
	else{
		if((g_PageId != 5) && (g_PageId != 6)){
			
			hideHTML('Additional_Button_Box');
		}
	}
}


function DropDown(){
	$('#Drop_Down_Options').toggle();
	var state = $('#Drop_Down_Options').css('opacity');

	if(state == 0){
		setHTML('Drop_Down_Arrow', '<div class=\"icon_drop_down_arrow_up\"></div>');
	}
	else{
		setHTML('Drop_Down_Arrow', '<div class=\"icon_drop_down_arrow_down\"></div>');
	}
}


function GetClickPosition(event, x, y){
	var posx = event.pageX - $(document).scrollLeft() - $('#Touch_Overlay').offset().left;
	var posy = event.pageY - $(document).scrollTop() - $('#Touch_Overlay').offset().top;

	log(3, 'X: ' + posx + '\nY: ' + posy + '\n-------');

	controlId = GetControlIDFromPosition(posx, posy);

	if(g_PageId < 10){
		if(g_PageId == 5){
			if((controlId == CONST_CTRL_RotaryLeftUp) || (controlId == CONST_CTRL_RotaryLeftMiddle) || (controlId == CONST_CTRL_RotaryLeftBottom) || (controlId == CONST_CTRL_RotaryStickLeft) || 
			   (controlId == CONST_CTRL_RotaryRightUp) || (controlId == CONST_CTRL_RotaryRightMiddle) || (controlId == CONST_CTRL_RotaryRightBottom) || (controlId == CONST_CTRL_RotaryStickRight) ||
			   (controlId == CONST_CTRL_RotaryLeftBottomBottom) || (controlId == CONST_CTRL_RotaryRightBottomBottom) || (controlId == 0)){
				checkIsChanged(controlId);
			}
		}
		else if(g_PageId == 6){
			if((controlId == CONST_CTRL_RotaryLeftUp) || (controlId == CONST_CTRL_RotaryLeftMiddle) || (controlId == CONST_CTRL_RotaryLeftBottom) || (controlId == CONST_CTRL_RotaryStickLeft) || 
			   (controlId == CONST_CTRL_RotaryRightUp) || (controlId == CONST_CTRL_RotaryRightMiddle) || (controlId == CONST_CTRL_RotaryRightBottom) || (controlId == CONST_CTRL_RotaryStickRight) ||
			   (controlId == CONST_CTRL_SWLeftFront1) || (controlId == CONST_CTRL_SWLeftFront2) || (controlId == CONST_CTRL_SWLeftTop1) || (controlId == CONST_CTRL_SWLeftTop2) ||
			   (controlId == CONST_CTRL_SWStickLeft) || (controlId == CONST_CTRL_SWRightFront1) || (controlId == CONST_CTRL_SWRightFront2) || (controlId == CONST_CTRL_SWRightTop1) ||
			   (controlId == CONST_CTRL_SWRightTop2) || (controlId == CONST_CTRL_SWStickRight) || (controlId == CONST_CTRL_RotaryLeftBottomBottom) || (controlId == CONST_CTRL_RotaryRightBottomBottom) ||
			   (controlId == CONST_CTRL_SWCenter1) || (controlId == CONST_CTRL_SWCenter2) || (controlId == CONST_CTRL_SWCenter3) || (controlId == 0)){
				checkIsChanged(controlId);
			}
		}
		else{
			checkIsChanged(controlId);
		}
	}
}


function GetControlIDFromPosition(click_x, click_y){
	var control_id = new String;

	if((click_x >= 218 && click_x < 230) && (click_y >=  68 && click_y <  96))		
		control_id = CONST_CTRL_SWLeftFront2;
	else if((click_x >= 242 && click_x < 254) && (click_y >=  60 && click_y <  88))	
		control_id = CONST_CTRL_SWLeftFront1;
	else if((click_x >= 266 && click_x < 278) && (click_y >=  60 && click_y <  88))	
		control_id = CONST_CTRL_SWLeftTop1;
	else if((click_x >= 290 && click_x < 302) && (click_y >=  68 && click_y <  96))	
		control_id = CONST_CTRL_SWLeftTop2;
	else if((click_x >= 350 && click_x < 362) && (click_y >= 168 && click_y < 196))	
		control_id = CONST_CTRL_SWCenter1;
	else if((click_x >= 374 && click_x < 386) && (click_y >= 168 && click_y < 196))	
		control_id = CONST_CTRL_SWCenter2;
	else if((click_x >= 398 && click_x < 410) && (click_y >= 168 && click_y < 196))	
		control_id = CONST_CTRL_SWCenter3;
	else if((click_x >= 458 && click_x < 470) && (click_y >=  68 && click_y <  96))	
		control_id = CONST_CTRL_SWRightTop2;
	else if((click_x >= 482 && click_x < 494) && (click_y >=  60 && click_y <  88))	
		control_id = CONST_CTRL_SWRightTop1;
	else if((click_x >= 506 && click_x < 518) && (click_y >=  60 && click_y <  88))	
		control_id = CONST_CTRL_SWRightFront1;
	else if((click_x >= 530 && click_x < 542) && (click_y >=  68 && click_y <  96))	
		control_id = CONST_CTRL_SWRightFront2;
	else if((click_x >= 215 && click_x < 246) && (click_y >= 101 && click_y < 132))	
		control_id = CONST_CTRL_RotaryLeftUp;
	else if((click_x >= 238 && click_x < 274) && (click_y >= 136 && click_y < 148))	
		control_id = CONST_CTRL_RotaryLeftMiddle;
	else if((click_x >= 298 && click_x < 310) && (click_y >= 172 && click_y < 208))	
		control_id = CONST_CTRL_RotaryLeftBottom;
	else if((click_x >= 238 && click_x < 274) && (click_y >= 233 && click_y < 244))	
		control_id = CONST_CTRL_RotaryLeftBottomBottom;
	else if((click_x >= 515 && click_x < 546) && (click_y >= 101 && click_y < 132))	
		control_id = CONST_CTRL_RotaryRightUp;
	else if((click_x >= 486 && click_x < 522) && (click_y >= 136 && click_y < 148))	
		control_id = CONST_CTRL_RotaryRightMiddle;
	else if((click_x >= 450 && click_x < 462) && (click_y >= 172 && click_y < 208))	
		control_id = CONST_CTRL_RotaryRightBottom;
	else if((click_x >= 486 && click_x < 522) && (click_y >= 233 && click_y < 244))	
		control_id = CONST_CTRL_RotaryRightBottomBottom;
	else if((click_x >= 323 && click_x < 338) && (click_y >= 153 && click_y < 232))	
		control_id = CONST_CTRL_PotiLeftSide;
	else if((click_x >= 343 && click_x < 422) && (click_y >= 249 && click_y < 264))	
		control_id = CONST_CTRL_SliderCenter;
	else if((click_x >= 423 && click_x < 438) && (click_y >= 153 && click_y < 232))	
		control_id = CONST_CTRL_PotiRightSide;
	else if((click_x >= 347 && click_x < 366) && (click_y >= 213 && click_y < 232))	
		control_id = CONST_CTRL_PotiLeftTop;
	else if((click_x >= 395 && click_x < 414) && (click_y >= 213 && click_y < 232))	
		control_id = CONST_CTRL_PotiRightTop;
	else if(((click_x >= 222 && click_x < 248) || (click_x >= 264 && click_x < 290)) && (click_y >= 184 && click_y < 196))	
		control_id = CONST_CTRL_StickLeftHori;
	else if((click_x >= 250 && click_x < 262) && ((click_y >= 156 && click_y < 181) || (click_y >= 198 && click_y < 224)))	
		control_id = CONST_CTRL_StickLeftVert;
	else if(((click_x >= 470 && click_x < 496) || (click_x >= 512 && click_x < 538)) && (click_y >= 184 && click_y < 196))	
		control_id = CONST_CTRL_StickRightHori;
	else if((click_x >= 498 && click_x < 510) && ((click_y >= 156 && click_y < 181) || (click_y >= 198 && click_y < 224)))	
		control_id = CONST_CTRL_StickRightVert;
	else{
		control_id = 0;
		
	}

	log(3, 'Control: ' + control_id + '\n-------');

	return control_id;
}


function ShowControlOverlayIcon(ControlID, trigger){
	var CONST_CONTROL_ICON_Switch       = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAiCAYAAABStIn6AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABYSURBVHjaYmCAgCggPgzE/0nEID1R////hxvyn0IMMoMsl2C4jBHKAIP/srIMpADGx4/hbCYGKoFRg0YNGjVo1KBRg0YNGjWIlgZRrRFB1WYNVRpaAAEGAME0asEvusH1AAAAAElFTkSuQmCC";
	var CONST_CONTROL_ICON_SmallSwitch  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABJSURBVHjaYmCAgCggPgzE/0nEh6F64Yb8pxCDDTtMBYMOM0IZYPBfVpaBFMD4+DGczcRAJTBq0KhBw9MgqmVaqhYjVCnYAAIMACZ8ZKedY8qSAAAAAElFTkSuQmCC";
	var CONST_CONTROL_ICON_Poti         = "data:image/png;base64,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";
	var CONST_CONTROL_ICON_Slider_UD    = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAABGCAYAAADb7SQ4AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKZSURBVHja7Jq9TgJBEMd3L1IYbMACCyxMrKxExFj4HFhpTCAafQDegQRaK4kGO30MLfxAsdHKxMLKRgujFhTrzOUW99b72L09MDH7Tya5O875s/vjWHZGSpJpDmLNOz5njD2RMagJwaRogjnRCV1VA0x5VEdlXBGNNrJZNyTzyiiMe9xgIZNh78WiG3gsGPfSNh5ynaSU3c/MMDY76wYe4zVd3tpcD/P5oSkPvKbLmypwveInwJR08/nAGzdfX8nxx4d4aQUMrsMSUwWuZTwAluSyUCBTNPhPvmAUyy8v5GEw4JduwHg5LLETw9U1BYbkdHo61FS8Z/LnnjKltKlrjFwb/GQ/l3NHHCe8B+8V1ADzqupUK3MNkwpvasI1TCq8HROuJrwdU65JedO0uOrypmlx1eWNU11Lg6sm75oj/JIw5qrBe416Iz5QSQALQuTr9PlZ9b3UccQdj/G4hGt2xxE+1XX84TZCQ8xdB9OKyupEvPVVe6rBIDK3Q/5I1tgaW2NrbI2tsTW2xtbYGlvjdI23Ic7I76psIsFWlElxBrEtVwRuIUpj2i32YXuz5HgjLY1xlks48glxY451D6x/JFXUjGAdBOshfGPuiFvTvbc3sVaRmjAn5ha3rJxxH2KRlw16hYJYs0i7+HIHjEv8U70b8e6MFDCLu+LjdAGxzl85Ah5SbSqRMMeRP886jPZCfo5PINr8ZMeQd8DMtcH0RH6ORQ2f6aS8w7jGfWXumPIO4xpnfG3CO4qryiKRiHccV9/Xa0wuZd4qXHWWRWXeKlx15Wt4dQMaXt0EDS9VtUhEi2/K3+Jrpd3UvCVCU/OzWHRDamr2R97G3cpm3ZCmePVfNa5/8dblqtNNDdM88f9zwqNugm8BBgDKcx2QU28vewAAAABJRU5ErkJggg==";
	var CONST_CONTROL_ICON_Slider_LR    = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAeCAYAAACR82geAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKOSURBVHja5Jk9T8JQFIbvLTIQWDAmsnTTmDhJpIkk/AoxumKYNHGCnwGTiY66StBfwUBoDU4mRiddJCG6QBw0qecg4PXSln7RL09yAtxq78vLfXrObQlxJ8qQF+NXv8KWBlVVNZM6FCNBnkNuM2OKKoqSl47QlxcZXnLM0C3kEeiQ5/7z87PmsOBATxGyw5mCkQOhZQ9NKXOmkLGmDhwr2j2vXWNqkM3JhwSl5GJ5mT1e8nDBTOdCDaiFiSaYU/PCGEREgaxMBjaWloiyukpKyST7dwUPjZnOhRpQC2piogLmKJDSooyZQWckJJMhm/E4CUqgFtTE/VCW0RKcoIOZopQELVKMPrtoCS6hE8hwghadg06Tn+g0ndZdJTCZr0ZAedYcH0BfcvL+Ti6HQ/7QHvQs11ZWTKjQcYQWpTUzxoQaHdtoUapASnooWUYnrGEGLSGK6LiBFo6uQT6y6NysrASqN1lk3H9+kt1+nzx8fbHD68JM5xiwhs2nhrAwU5Vi5P9FTKeP+YMSOogocVfuyAYihCghUjxKT5B1lrnc66vWFTtygd8RvytnSh0q0xN7Sd6HvOLL9RmU60TEKtMHlOtj7XJ9AKY0tLYEO+TnjtyWHbSCuiUwgc4dwTt+qtrW63zxQDaqaBmgk2VNMdorVXFZsZ3i4dvbKHEZhhGdif7BX/2ITtXq7toyWixKsKw9uTDBnKoRSoboiGLb7s3wUKOli44oZkemOLhRFUq0DNERxaqZc1i554tlLD9ehr+/SK/H7zN8b9hQE7eiUXMeTGmYPY/VpwRm0Wp56EXLDXScGmOIFou3l5eSyRsn6LgdWLW6WBCYlH3QIXMaumNt85tCnWfXbkXkHup/CzAA+AaqY3rtcmUAAAAASUVORK5CYII=";
	var CONST_CONTROL_ICON_Rotary_DiagL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAINSURBVHja3NrdbcIwEAdwO+UZJmATnlqxAFV5YIMu0YouwQZ9aNUOQCVeyCRkAlgg9YEtTJpPyP3P7kknSgqcf7EhtkGpUyxMbk3mjLm1dW6OPM8b06FyYH4gYNqeyYnCxkM+Hm+ufvZu1/iQgY8yxdgkr/u9ejsc3F2queE8cwmiewooipS7ZiKA+rxpGIYAq0DNEaMk+Y8oNpg0igUWAqp3WCio3mF3Wv85pISiV9jLcKiWo5F/aKaz7Ct6WEg4lk/FEHBs1zFpHOvMQxLHPleUwkFm9xK41jC6+FLGghtcM6MoNLATzr2ejzOzk0d4jxVR9HcMPZd0nPtFg0u6TGhtRoFLOqDmNoPDaa2nJpd0WwmrQbkICmcw9Ng1vRTd2vtHWNoBdQy7xhLHWcSscHhmji8ItvIb2IQKBVdEFZ77TLB3v4FtUNK4MpS7RtqY+Evee3XaoaWhuWkAXRbKMtqPf6ppYKcoOUHf7iJuoaUo879zm64pXLYVjsC5XqzqKRYYCKdqht8FrNfZPeA9V4liX7Zw49qgeh+K3MPSXyFU1OSHceBa1MOsoPselkFtDUjhIHseEjgITAIHg6FxUBgSB4ehcCIwGxffnZV8txYfrG7pES0MgYLDUCgoDImCwdAoCMygpmgUqscmaBT7eszrsTX4wzdFLFt+1HmHCRUrZDHYD6rpN8G/AgwAR14bm0HtaoAAAAAASUVORK5CYII=";
	var CONST_CONTROL_ICON_Rotary_Hori  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAqCAYAAAAUJM0rAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAT6SURBVHja7FpdbBRVFD67Wxa2AQosbUnM+kA0JiZYY4OGWhIhKjYSBZ4EDVriS4mALyQWngETX6xGSDSGYCxiiCi4sWiUn7SUBAMBGp8gPlCNoeWvQHZpaRm/M5w7e2ec3e5fuzNTv+TLdu5sZ+9+c+653zk7ESofngUXgP+QN7AEXAsa4F+lXixUzD8ZiUTmAv39G/CyB4zKUBpsw3v2VUohzIk/e702dFrmdEHOF3zNcIkT4jv2pSYSIybCVUqkJQ6RVHSVNKdwCRNagZf91rqLRqkxaukVw/nGCmn1mvpj66xZFNHEwpw+m1Sh8IHL8HJUHS+aNo1+qa2FOraVHKuQUM2WYrEYfTp3rn5uI+a+bbKEWgwm1cEjkQh1QaSacJi8iLaZM01q2AFumGihGsADYDUf1EIcjiQWy8vgqOLo0sB5ddVECvUVuPBhEgpREiI9iWXndfBtPBCPm3lUw/fgsokQ6kfwqRwf7GmoG/tYVZU+nJRUUjahvgBXWmEFkRyh7AtwquB8WpvJp9WSShrKIdRO8F11sKumhtZVV5NfwRGVtO/QC/PxWOMJtRlsVwdb4Es+mD2b/A5OGZw6InZD+nWu/6nKcY630A51wFH08Zw5hcynu5hSYdJcqXisjTdvqqE3wSvgtkIiapVsoSaWz5hBe+fNo6CB/ZVjhbTLKspLqBWydVphmpw/n6KhEAURLjm3Q7oOObsHz/OSUeOc+Hrr6/VdIpAYMQxquXaNjt27pw+/BP7qFlHPgIeUSKo0CbpIDF4th5DcF9nN82HdY4W10uQgWMcHNeI3HOYs0FDfeUGmHLN5LLX0emWLNNXtQk7iBD4VcWZkhF4YGKC0Yaghbvo1sXzr2CKp0uQ7iPSKD113ucAph5fgwVSKRCpu514K6/0blyp7SsKlj9XMQp1XR+fv36f/8RB9di36WKgedfT53bvUPjQ05UX68PZt2gMtNPRwWhoE4+Bz5sjwMNVjnS72UQulnPgWuaktU9YwdoN71V7YBT5O0m86CuP1NIR6wgdNuXLveKthPEczQ9yvesvNmVs2gdsQJ+rqfNWcKwWXR0ep6epVGnzwQA39IR5qzK3WawP/5D/YR6wcHDQvEHSwOC34rppIKbBVieQWUSS2/YQ4U3oU+YrrvXx+QFgKo8Y5zivoxoponj593DrvZYh00j7v5eDx8boHv5PW9r0yNmaqPZRRO1BovXHDKdJqp0jZhCJ546u6p1hz/bqpfpDAVmh/KqUPvQf+4PbeXFXvT1LemD+bcwuC1e+Mx/Odx1IjkeiZ7C8f6u/v1quNbGDPyH5Jwy4w60/u4/VQvlF1IIPVD4Ih5Zu+6dYtfaiTsrSA8xWK8YmobbnWjjt3fF2aONLIGeWVShWKRO1OdfA+7oZjbfsCf/93YxoQS0TlEopE9d/03cLROvU02Be+DtfNYgk4pNaA58otFONF8KLyHxzCfT7oOLA0b2CuZ1GiaGgBT+V7jWIa4q0SsmYIcyhrd8mT2IQi90g6rQ+9A/5cyDWKEeqchKyRZd17Ch9h43G0TLaDBT9fWtRPLPBHpyR0rZ2Ey4C03ZCmK6SN5d04itrtNmA35r6zKH9WpFDK3K0l7TlOW+5MJCryJIc87Nrrcuo05tQk76nIHeRnFIZlKRpSeb9d4RW3T5uPIcI1eCUd8AP5jeQdcGRtldeS8a8AAwD65Jxh+LSXBAAAAABJRU5ErkJggg==";
	var CONST_CONTROL_ICON_Rotary_Vert  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAABKCAYAAADNN8YBAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAVSSURBVHja7FpdbBRVFD7713a7ZZvdZXcVQ/RBMGmiRIlolYrxD1GomEIRFGM0RlGiD8ZEY6I+iQ8aoyYqRUP8QQ0lkCJYLaIYGoikvGhSJdEHrBoK20Lptttd2h2/M53bvTvdbWe2s1NI5iRf6L1zZ+43595z7rDn85C1tg54GogDSaCfLjJbBBwBFB3emjVGyvz5eYDdDPQUICnwDVAhjbefKOwuYEiQ8gDvh0LKY4GAnuzvwA2zQhTWJJOpcbmU9mhUwTUVW2pr9WQTwG22EoU9K5O4zONRfonHJ0gKtEYiSgVeQEd4tV1cX5cnvsbrVU7OmzeJpMChWEwJu916sk+andRjcvynwPOisayykjpiMYJHi95wlddLTdXV1D4yQv3ZrOheBbiAQ0YndplIPx8C9aJjDSbfEQ4TltbQA5jkyjNn6GgmI3fvAB6xyqM3Aq3AdaLjxTlzaBtIelwuw0vhx9gNgQCdGB2l7gsXRDc/cznQBfTOhCinn++BmBj8XihErwSDJW1uH8g2YyXS+LsznRbdHJ0rgaPAP6UsPUfnHtkjX0ci1Oj3WxKRLckkPXP2LI1JCUUj/K0ZohyVLaLBwdI2dy4tqaiwNH18hwBbm0hQUlHk7g3AV0aWntPP26JxNaL2ICL7Wp/P8jzHz16FFdqfStFAjmyTdtodmcqjHwFPiUY9PLgvGiXkwbIm5n/HxmgFMsJvuSBj26p9iU0i+hNwu5x+PkNk+01E9kyMl5+3AW8HyfZpOXdi6b8AGsXVzTU1tB0kfTaRZON8vB7pi/PtsVyuXQgsAHYzk6XAYXEFXz8q0dm0N8+fp5cHBuSuBq9GVLWXkB95Xx7PPz2K2mKTWcDoc++uqlKDiwlrtnSSR0v4kjJsrp6eUp3cwOHcqZ25F6sxt045Wtiza+StUGzFLfLo8WmGswN3af9SKWGtWETU1NxuukTMIeoQdYg6RB2iDlGHqEPUIeoQdYg6RB2iDlGHqEPUIXrJEfXq2nWA36a5F09zPQV064k203itM2yjk7oMjGFNyiZgp/jpr68Ukjb94sxkI15tuVWSdT5fWcs1Zn7zTymKKO4ytzomGhUXo263WkqsLVMBrCseN+bCbJYeSCTkrjC7j2tNo6KHS4kd0eiUYoFy2t9aFa87v4rnYtdxgXez6OEy3029vWpd3W7juW/B3DqSm1SmUsd64MsJX2P52+FZqyvKxezndFpd7oGcnIONlWk79UTZ7gP2iwYH1m7s2XurqspKctfwMD3c30+ZXIWZ/1hB46KGgicTF/WXAcMi8vgtPx8aKhvJdwcHaW1fn0ySU2WDTJKocL3+JHBAe6Mgb+A9qRQFsRXqKystJfnCuXP0Wq6MyPYH8CBwTD+2WGj/x9sGWAJczh0dIyM0iLdebsE2YO89iqVuyV+pg5onC+pKjGR3XoJ7RGNjIEAfh0KGZUR6S2rb6cf8uvx24PGp7jOSLLmWfyVwPTd+ReroymRU0ZXZev4p5Mg7T5/Wa5+2AM9Nd6/RrN4GVAO3cuNP5NgD8AiTNXrk8j0NIKnLz6xKe8PI/WaOnx9oXJSibgPWgbQhyBpBdrojlz14B0ieys+RG4Fthj9oSthmvJc+EY0rcNTywVBMxbMXL/MQ0k8qXzJ0PxXRN1lmhbSj8KiqatQrHbeGQqr4VRrLucgeDakkdGVNXVaQwF5VcIpNkHw1GNRLMf+icZ0f2UpUI8vBlSBJOvwBvPjEZOkwi60WzUQ67Cpx6eWvdvYSyykWFLmlFfc0z/Ar3zIrJm9/x6oJrP5/BwsAWZPCehHWgpyw6sH/CzAAokkEkYFIM58AAAAASUVORK5CYII=";
	var CONST_CONTROL_ICON_Rotary_DiagR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAILSURBVHja1NrBbcIwFAZgJ+IME7AJJyQWaEUPYQKWaEWX6A5UZQHUXppJYAK4I9evsqmTJiFp/f5nW7KcIBTni2X7xbFSuFSY/GmyZsx0/UJrrbK/3KGeTgf9Pzse30xxB3yIq5y7BoNagFGU1iNAJTN3sJlM1ON4zPkQr3XmAFjpDp5OJ/V8PkOajB1m+uPeFDs0DtFihLtH43JUb0bjYDA0DgpD4uAwFE4EZtOlcqJ1+jAzkW5NsXTnNGnT5J00DIGCw1AoKAyJgsHQKAhMAsUOk0KxwkKjaAIfMomPUkFRdOJfD95i3Ki+4VeeEmoILk8ItRsSOPt9bG4XXmiN4iM2lH0jqCzluf809TnXYnRj7yZvbLmNETXklYdghX9jNi374NCoK07rW7iSYOuWYbQTJ4XqwnnphZa4tdfMTfpXkx9q1xVFqcPh5wFnWX35fEfoX7CWpvVxsqgazOIWbuAzqP33b02wDpwSRzXABoVU7oY9XGWAEUOFCILbPiLEjuoVedRxKaB6R/c+JAVU5+AROgVF9Rg8IGseyJaCwSRQ7DApFCtMEsUGk0axwGJABYfFggoOa/jGdVFCKSisIbZc2hfStGEx4VhGxRhwbPOYNI418pDEsceKLbh58rAW3Iy7TnrRLF1F3n4/7lQiKikU7z7dev53H6M9v7eyj4NsRA7REn1gXwIMAHwRNbEWiH7sAAAAAElFTkSuQmCC";
	var CONST_CONTROL_ICON_Stick_LR     = "data:image/png;base64,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";
	var CONST_CONTROL_ICON_Stick_UD     = "data:image/png;base64,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";
	var CONST_CONTROL_ICON_StickSwitch  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAA6CAYAAADcKStOAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAN0SURBVHja7NpdSBRRFADgM+P6h7v+rD8UIWEQPUmgFEYqZf8QREEQSFDoixAE4T70EvScRBFkD0FQ9BArimVoliXpSxRED0EQPaRvooL4L8R0znqPzC4zO/fu3Fl92ANHubPs7rdnZmfuuTsA/qMY8xZmv/gfVnmyZVmOafhEHcJ8ibk/ZXvMqq3tkXqFqSnHzaZP1KADiuKeMT3d7ecTmz5QQ5i7E/vSMKC/qgrOFhVpw5kZokYxaxg1iKiLxcVacaqwJoEqZ9QQYk4JjM7KqcCOpqJGq6uhLRmhDWcqoIYxIzQIC1RzYaHz+UMDTgbWijnGqDLThNGaGleULpwpgaLdV8ioYazUkYICuTOvD1w62HFRqQQqiqgxBZRfnOGBMhhFx1SjIsoeq3iZuTQ7CyNra8lXCMvqka3YScyPjKqmSuEx5QeVtnKG0S1TMUK95wGj6vPzQVfIVs5esTN21K68PBjXjFKpnGFDjaSiDoRCEFR4Vc4U175efmRPFlAylaOKfcNsZNQEouoCRklULkIwiz/B82hUGhXGL4auqjrgziVVTCXokkTVdYvJ9XVomZnJ1BqhY6wL8xfsnKAvwBLti6+YBwWwGbPO44mNQRxqVGT6EiJqgDbwQbKB+VBk2j2IOZHBG09ic9KSrWYk0MjBcrAcLAfLwXKwHRL2mR71Z/U7CdYg5vyHA3yfZuy8LeeW2+DZDU97+nhXBo2SCdpbbZhxbkZCjCpAuUoPGWAXRZ3SE6rjF8bdLSuDO6WlWS/XBjYjF1KakTz88xfzKo3GsYEowsp5rX0FjKLoMsWyQD9vub2wAPcXF7cTlWhG7IsqbzDP8+BBeTncjES2A9XjtNrzDvM0Dx5VVMCNcDjrKCcYxQfMEzx4jLgujTgZlBuM4hPmMR48jUaho6Qka6h0MIrPmFu94DPEXfOBU0F5XcRbxTkuEZ3z8/BieVkvKs0vdF6ziyax6AL/MK9ngMsEJTvt6cT8bse9WlkJFCUL+0EeO659bg76PHB+UCoTRcb93MJh5QZWVwNBqc5gCdcOYi2N3vwKVu51Ck4HKpOpNeN+M+Iy4t4KnC6U13ksXdCsN465j+dy8cpK6F1aUke5rI/5uYugQcxK9ro8LlcpF5jfINwf2Fz5tqf0D6Zu913oCLrCx2DzVocYaLoh5L8AAwANJuoidFYl6AAAAABJRU5ErkJggg==";

	if((ControlID != "INVALID") && (ControlID != "0") && (ControlID != "65535")){
		switch(ControlID){
			case CONST_CTRL_SWLeftFront1:				width =  "18"; height =  "34"; left_img = "239"; top_img =  "57"; control_overlay_img = CONST_CONTROL_ICON_Switch; 		break; 
			case CONST_CTRL_SWLeftFront2:				width =  "18"; height =  "34"; left_img = "215"; top_img =  "65"; control_overlay_img = CONST_CONTROL_ICON_Switch; 		break; 
			case CONST_CTRL_SWRightFront1:				width =  "18"; height =  "34"; left_img = "503"; top_img =  "57"; control_overlay_img = CONST_CONTROL_ICON_Switch; 		break; 
			case CONST_CTRL_SWRightFront2:				width =  "18"; height =  "34"; left_img = "527"; top_img =  "65"; control_overlay_img = CONST_CONTROL_ICON_Switch; 		break; 
			case CONST_CTRL_SWLeftTop1:					width =  "18"; height =  "34"; left_img = "263"; top_img =  "57"; control_overlay_img = CONST_CONTROL_ICON_Switch; 		break; 
			case CONST_CTRL_SWLeftTop2:					width =  "18"; height =  "34"; left_img = "287"; top_img =  "65"; control_overlay_img = CONST_CONTROL_ICON_Switch; 		break; 
			case CONST_CTRL_SWRightTop1:				width =  "18"; height =  "34"; left_img = "479"; top_img =  "57"; control_overlay_img = CONST_CONTROL_ICON_Switch; 		break; 
			case CONST_CTRL_SWRightTop2:				width =  "18"; height =  "34"; left_img = "455"; top_img =  "65"; control_overlay_img = CONST_CONTROL_ICON_Switch; 		break; 
			case CONST_CTRL_SWCenter1:					width =  "18"; height =  "18"; left_img = "347"; top_img = "181"; control_overlay_img = CONST_CONTROL_ICON_SmallSwitch; 	break; 
			case CONST_CTRL_SWCenter2:					width =  "18"; height =  "18"; left_img = "371"; top_img = "181"; control_overlay_img = CONST_CONTROL_ICON_SmallSwitch;	break; 
			case CONST_CTRL_SWCenter3:					width =  "18"; height =  "18"; left_img = "395"; top_img = "181"; control_overlay_img = CONST_CONTROL_ICON_SmallSwitch; 	break; 

			case CONST_CTRL_PotiLeftSide:				width =  "30"; height =  "70"; left_img = "315"; top_img = "157"; control_overlay_img = CONST_CONTROL_ICON_Slider_UD;	break; 
			case CONST_CTRL_PotiRightSide:				width =  "30"; height =  "70"; left_img = "415"; top_img = "157"; control_overlay_img = CONST_CONTROL_ICON_Slider_UD;	break; 
			case CONST_CTRL_PotiLeftTop:				width = "100"; height =  "62"; left_img = "306"; top_img = "173"; control_overlay_img = CONST_CONTROL_ICON_Poti;			break; 
			case CONST_CTRL_PotiRightTop:				width = "100"; height =  "62"; left_img = "354"; top_img = "173"; control_overlay_img = CONST_CONTROL_ICON_Poti;			break; 
			case CONST_CTRL_SliderCenter:				width =  "70"; height =  "30"; left_img = "347"; top_img = "241"; control_overlay_img = CONST_CONTROL_ICON_Slider_LR;	break; 

			case CONST_CTRL_RotaryLeftUp:				width =  "54"; height =  "54"; left_img = "204"; top_img =  "90"; control_overlay_img = CONST_CONTROL_ICON_Rotary_DiagL; break; 
			case CONST_CTRL_RotaryLeftMiddle:			width =  "74"; height =  "42"; left_img = "219"; top_img = "122"; control_overlay_img = CONST_CONTROL_ICON_Rotary_Hori; 	break; 
			case CONST_CTRL_RotaryLeftBottom:			width =  "42"; height =  "74"; left_img = "283"; top_img = "154"; control_overlay_img = CONST_CONTROL_ICON_Rotary_Vert; 	break; 
			case CONST_CTRL_RotaryLeftBottomBottom:		width =  "74"; height =  "42"; left_img = "221"; top_img = "221"; control_overlay_img = CONST_CONTROL_ICON_Rotary_Hori; 	break; 
			case CONST_CTRL_RotaryRightUp:				width =  "54"; height =  "54"; left_img = "506"; top_img =  "90"; control_overlay_img = CONST_CONTROL_ICON_Rotary_DiagR; break; 
			case CONST_CTRL_RotaryRightMiddle:			width =  "74"; height =  "42"; left_img = "467"; top_img = "122"; control_overlay_img = CONST_CONTROL_ICON_Rotary_Hori; 	break; 
			case CONST_CTRL_RotaryRightBottom:			width =  "42"; height =  "74"; left_img = "435"; top_img = "154"; control_overlay_img = CONST_CONTROL_ICON_Rotary_Vert; 	break; 
			case CONST_CTRL_RotaryRightBottomBottom:	width =  "74"; height =  "42"; left_img = "467"; top_img = "221"; control_overlay_img = CONST_CONTROL_ICON_Rotary_Hori; 	break; 
			case CONST_CTRL_Rotary_ALL:					width = "760"; height = "352"; left_img =   "0"; top_img =   "0"; control_overlay_img = "data:image/png;base64,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"; break;

			case CONST_CTRL_StickLeftHori:				width =  "98"; height =  "42"; left_img = "207"; top_img = "169"; control_overlay_img = CONST_CONTROL_ICON_Stick_LR; 	break; 
			case CONST_CTRL_StickLeftVert:				width =  "42"; height =  "98"; left_img = "235"; top_img = "141"; control_overlay_img = CONST_CONTROL_ICON_Stick_UD; 	break; 
			case CONST_CTRL_StickRightHori:				width =  "98"; height =  "42"; left_img = "455"; top_img = "169"; control_overlay_img = CONST_CONTROL_ICON_Stick_LR; 	break; 
			case CONST_CTRL_StickRightVert:				width =  "42"; height =  "98"; left_img = "483"; top_img = "141"; control_overlay_img = CONST_CONTROL_ICON_Stick_UD; 	break; 

			case CONST_CTRL_PotiStickLeft:				width = "100"; height =  "62"; left_img = "206"; top_img = "141"; control_overlay_img = CONST_CONTROL_ICON_Poti; 		break;	
			case CONST_CTRL_PotiStickRight:				width = "100"; height =  "62"; left_img = "454"; top_img = "141"; control_overlay_img = CONST_CONTROL_ICON_Poti; 		break;	
			case CONST_CTRL_RotaryStickLeft:			width = "100"; height =  "62"; left_img = "206"; top_img = "141"; control_overlay_img = CONST_CONTROL_ICON_Poti; 		break;	
			case CONST_CTRL_RotaryStickRight:			width = "100"; height =  "62"; left_img = "454"; top_img = "141"; control_overlay_img = CONST_CONTROL_ICON_Poti;			break;	
			case CONST_CTRL_SWStickLeft:				width =  "38"; height =  "58"; left_img = "237"; top_img = "161"; control_overlay_img = CONST_CONTROL_ICON_StickSwitch; 	break; 
			case CONST_CTRL_SWStickRight:				width =  "38"; height =  "58"; left_img = "485"; top_img = "161"; control_overlay_img = CONST_CONTROL_ICON_StickSwitch; 	break; 
			case CONST_CTRL_StickLeftButton:			width =  "75"; height =  "47"; left_img = "218"; top_img = "152"; control_overlay_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAvCAMAAACc9ceUAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEFUExURQAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAYBAQkBAQ8CAhICAhUCAhgDAxsDAx4DAyEEBCQEBC0FBTMGBjkGBkIICEsJCU4JCVcKCloKCmYMDGkMDGwMDG8NDXgODoQPD4cPD5YREaUTE6gTE7oVFb0VFcYXF8kXF9IYGNsZGeEaGuQaGucaGuobG/AbG/YcHPkcHPwdHf8dHd0IkuIAAAAqdFJOUwAACA4QERMUFhcZHR4hIyYtMDM8SEtaaWyZnJ+lqKuusbS3usPP2OHk8Ltat84AAAFTSURBVEjH7dbbVoJAFAbg3cEsyaTzychyKv0rooNUmlnZOcsy5f0fpQsYEEJbM9Ad/+WG9a0Fs/deQyNDQxvwskV/vDz88QSOrnlOMS1jEY8K0+KpYtGtJ1bAyszZ8Vt2LStmbbqN0G/xbItYGRyfO7lyrVteOkNWwJqE8WENSseEKvKNGszOAKp7CSb0v8YYqr1wq45dRewclT3chFJ3KOdE+2sWeAihHoF58V5dwv7zL+rlAMsyfb8KvRWgWjrW5GYoj8qXj2qfIC87j0VcdPuobxMF6dme2kHdo3o1sJT8nsiV0XStBkozUXbOAvDkUPeAGml/0QoO33hjeetLzqJ1GG3Lsl6dxopk2WP+bjiNFc1KMdQ+K9AoBouUEnQUR2OxKK1BS1M8FtF4sCB6ByBSGfxhKpHUfYIoSAFM2gICOwdIrMRKrMT6NyvO/SW4V38AZ17t/XBA7wMAAAAASUVORK5CYII="; break;
			case CONST_CTRL_StickRightButton:			width =  "75"; height =  "47"; left_img = "466"; top_img = "152"; control_overlay_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAvCAMAAACc9ceUAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEFUExURQAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAYBAQkBAQ8CAhICAhUCAhgDAxsDAx4DAyEEBCQEBC0FBTMGBjkGBkIICEsJCU4JCVcKCloKCmYMDGkMDGwMDG8NDXgODoQPD4cPD5YREaUTE6gTE7oVFb0VFcYXF8kXF9IYGNsZGeEaGuQaGucaGuobG/AbG/YcHPkcHPwdHf8dHd0IkuIAAAAqdFJOUwAACA4QERMUFhcZHR4hIyYtMDM8SEtaaWyZnJ+lqKuusbS3usPP2OHk8Ltat84AAAFTSURBVEjH7dbbVoJAFAbg3cEsyaTzychyKv0rooNUmlnZOcsy5f0fpQsYEEJbM9Ad/+WG9a0Fs/deQyNDQxvwskV/vDz88QSOrnlOMS1jEY8K0+KpYtGtJ1bAyszZ8Vt2LStmbbqN0G/xbItYGRyfO7lyrVteOkNWwJqE8WENSseEKvKNGszOAKp7CSb0v8YYqr1wq45dRewclT3chFJ3KOdE+2sWeAihHoF58V5dwv7zL+rlAMsyfb8KvRWgWjrW5GYoj8qXj2qfIC87j0VcdPuobxMF6dme2kHdo3o1sJT8nsiV0XStBkozUXbOAvDkUPeAGml/0QoO33hjeetLzqJ1GG3Lsl6dxopk2WP+bjiNFc1KMdQ+K9AoBouUEnQUR2OxKK1BS1M8FtF4sCB6ByBSGfxhKpHUfYIoSAFM2gICOwdIrMRKrMT6NyvO/SW4V38AZ17t/XBA7wMAAAAASUVORK5CYII="; break;
			default:									width =    ""; height =    ""; left_img =    ""; top_img =    ""; control_overlay_img = "";
		}

		setHTML('Control_Overlay', '<div style=\"width: ' + width + 'px; height: ' + height + 'px; left: ' + left_img + 'px; top: ' + top_img + 'px; position: absolute;\"><img src=\"' + control_overlay_img + '\" width=\"' + width + '\" height=\"' + height + '\" alt=\"\" draggable=\"false\" /></div>');

		if(g_PageId > 9){
			showSwitchTrigger(ControlID, trigger);
		}
	}
	else{
		setHTML('Control_Overlay', '');
		setHTML('Trigger_Overlay', '');
	}

	showOptionButton(ControlID);
}


function showSwitchTrigger(ControlID, ControlTrigger){
	var width  = "17",
		height = "53";

	switch(ControlID){
		case CONST_CTRL_SWLeftFront1:		left_img = "314"; top_img =  "56"; break;
		case CONST_CTRL_SWLeftFront2:		left_img = "314"; top_img =  "56"; break;
		case CONST_CTRL_SWRightFront1:		left_img = "430"; top_img =  "56"; break;
		case CONST_CTRL_SWRightFront2:		left_img = "430"; top_img =  "56"; break;
		case CONST_CTRL_SWLeftTop1:			left_img = "314"; top_img =  "56"; break;
		case CONST_CTRL_SWLeftTop2:			left_img = "314"; top_img =  "56"; break;
		case CONST_CTRL_SWRightTop1:		left_img = "430"; top_img =  "56"; break;
		case CONST_CTRL_SWRightTop2:		left_img = "430"; top_img =  "56"; break;
		case CONST_CTRL_SWStickLeft:		left_img = "138"; top_img = "164"; break;
		case CONST_CTRL_SWStickRight:		left_img = "605"; top_img = "164"; break;
		case CONST_CTRL_StickLeftButton:	left_img = "138"; top_img = "164"; break;
		case CONST_CTRL_StickRightButton:	left_img = "605"; top_img = "164"; break;
		case CONST_CTRL_SWCenter1:			left_img = "348"; top_img = "101"; break;
		case CONST_CTRL_SWCenter2:			left_img = "372"; top_img = "101"; break;
		case CONST_CTRL_SWCenter3:			left_img = "396"; top_img = "101"; break;
		default:							left_img =   "0"; top_img =   "0";
	}

	switch(ControlTrigger){
		case -10:	trigger_overlay_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAA1CAYAAACnUADaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACmSURBVHjaYrx+/bo9AwNDFxCbMZAOTgFxGSPQkOdAhgQD+eAFC5IBjGQY8B+knwVZRENDg2jdN27cgLOZGKgARg0ZNWTUEPIAqDz5PyhcglyeMJJRnvxHN4RBtJPhF7GGHPZnYMPmEhBgHU0no4YMf0PQk/1vig15XY7IVIRz8aAvlMhsKY0mtlFDRg0ZFoY8RcrWpGIQeAoyJAXUBSO36wbSDxBgAKRjMfzsnt8sAAAAAElFTkSuQmCC"; break;
		case -75:	trigger_overlay_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAA1CAYAAACnUADaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACgSURBVHjaYrx+/bo9AwNDFxCbMZAOTgFxGQuQWAHEEgzkAZDFK1iQDGAkw5D/IP0syCIaGhpE675x4waczcRABTBqyKghI9AQFlyZilxD/g8a75BbKI2mk1FDRg0ZViXbMCiUUApq240av4jVfdj/BhvW0h4IWEfTyaghI6yRAwS/KTYEOVOR6p2nSNmaVAwCT0GGpADxCzKDA6QvBSDAADylKd/ZinWvAAAAAElFTkSuQmCC"; break;
		case -25:	trigger_overlay_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAA1CAYAAACnUADaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACUSURBVHjaYrx+/bo9AwNDFxCbMZAOTgFxGSPQkOdAhgQD+eAFC5IBjGQY8B+knwVZxHajxi9idR/2v8EGY7OgybGS4x8mBiqAUUNGDaGbIejJ/jc5hoCKgv8U5mIUl/wfNGFCFe+MFkqjhowaMlooDXihNJrYRg0ZNWQ4GPIUKVuTikHgKciQFFAXjNyuG0g/QIABAGzeMziu2D0wAAAAAElFTkSuQmCC"; break;
		case  25:	trigger_overlay_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAA1CAYAAACnUADaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAChSURBVHjaYrx+/bo9AwNDFxCbMZAOTgFxGSPQkOdAhgQD+eAFC5IBjGQY8B+knwVZRENDg2jdN27cgLOZGKgARg0ZNWQEGsKCK1ORa8j/QeMdcgsl1DCx3ajxi1jdh/1vsGENWCBgHU1so4aMsPIECH6TYwioffKfmrl4tFAaLZRGDRktlAa8UAJ55ymSAKkYBJ6CDEkBdcHI7bqB9AMEGAAoeDjELV8OtgAAAABJRU5ErkJggg=="; break;
		case  75:	trigger_overlay_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAA1CAYAAACnUADaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACTSURBVHjaYrx+/bo9AwNDFxCbMZAOTgFxGSPQkOdAhgQD+eAFC5IBjGQY8B+knwVZxHajxi9idR/2v8EGY7OgybGS4x8mBiqAUUNGDaGbIejJ/jc5hoCKgv8U5mIUl/wfNGFCtndGE9uoIaOGDKficbRQGk0no4aMGjIoDHmKlK1JxSDwFGRICqgLRm7XDaQfIMAAhMYpr2LAkEAAAAAASUVORK5CYII="; break;
		default:	trigger_overlay_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAA1CAYAAACnUADaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACBSURBVHjaYrx+/bo9AwNDFxCbMZAOTgFxGSPQkOdAhgQD+eAFyJD/UA6jhoYGSbpv3LgB1svEQAUwasioIaOGkAdQcjEZ+sF6WdAFBsw7yC4h2zuj6WTUkFFDhroho4XSaDoZNWTUkEFnyFOkbE0qBoGnIENSQF0wcrtuIP0AAQYA1Ewq+pM3Z9kAAAAASUVORK5CYII=";
	}

	setHTML('Trigger_Overlay', '<div style=\"width: ' + width + 'px; height: ' + height + 'px; left: ' + left_img + 'px; top: ' + top_img + 'px; position: absolute;\"><img src=\"' + trigger_overlay_img + '\" width=\"' + width + '\" height=\"' + height + '\" alt=\"\" draggable=\"false\" /></div>');
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


function setControlObj(jsonObj, searchKey, value){
	for(var key in jsonObj){
		if(key == searchKey){
			jsonObj[key] = value;

			return jsonObj;
		}

		if(key == 0){
			return;
		}

		setControlObj(jsonObj[key], searchKey, value);
	}

	return jsonObj;
}


function setControl(value, trigger){
	xmlObj = setControlObj(g_controlObj, g_ControlNode, value);

	if(g_PageId > 9){
		xmlObj = setControlObj(xmlObj, g_ControlNodeTrigger, trigger);
	}

	if(g_isAdditionalValue){
		xmlObj = setControlObj(xmlObj, g_AdditionalNode, g_ReturnValue);
	}

	GetTd(xmlObj, g_SetEvent, "set");
}


function checkIsChanged(key, trigger){

		if(g_PageContent < 10){
			ShowControlOverlayIcon(key, trigger);
		}

		setControl(key, trigger);
		g_ControlId = key;
		g_ControlTrigger = trigger;



}


function setChanges(isSave){
















}


function submitSET(tagId, value){
	if(tagId == "Fix_Value_Value"){
		fixedControlId = Math.round((value * 2047) / 100);
		g_ReturnValue = value;

		if(fixedControlId > -1){
			fixedControlId += CONST_CTRL_ValueFixedBegin;
		}
		else{
			fixedControlId += CONST_CTRL_ValueFixedEnd + 1;
		}

		checkIsChanged(fixedControlId, 0);
	}

	if(tagId == "Fixed_Switch"){
		checkIsChanged(value, 0);
	}

	if(tagId == "FunctionOutput"){
		$("#ContainerOuter_" + (g_ControlId - CONST_CTRL_FunctionoutputBegin)).removeClass("current_list_row");
		$("#ContainerOuter_" + value).addClass("current_list_row");

		g_ReturnValue = 0;
		value += CONST_CTRL_FunctionoutputBegin;
		checkIsChanged(value, 0);
	}

	if(tagId == "VirtualSwitch"){
		var listValue = value;

		if(g_isControlInverse){
			value += CONST_CTRL_VirtualSwitchInverseBegin;
			$("#ContainerOuter_" + (g_ControlId - CONST_CTRL_VirtualSwitchInverseBegin)).removeClass("current_list_row");
		}
		else {
			value += CONST_CTRL_VirtualSwitchBegin;
			$("#ContainerOuter_" + (g_ControlId - CONST_CTRL_VirtualSwitchBegin)).removeClass("current_list_row");
		}

		$("#ContainerOuter_" + listValue).addClass("current_list_row");
		g_ReturnValue = 0;

		checkIsChanged(value, 0);
	}

	if(tagId == "FlightMode"){
		var listValue = value;

		if(g_isControlInverse){
			value += CONST_CTRL_FlightmodeInverseBegin;
			$("#ContainerOuter_" + (g_ControlId - CONST_CTRL_FlightmodeInverseBegin)).removeClass("current_list_row");
		}
		else {
			value += CONST_CTRL_FlightmodeBegin;
			$("#ContainerOuter_" + (g_ControlId - CONST_CTRL_FlightmodeBegin)).removeClass("current_list_row");
		}

		$("#ContainerOuter_" + listValue).addClass("current_list_row");
		g_ReturnValue = 0;

		checkIsChanged(value, 0);
	}
	
	if(tagId == "RemoteControl"){
		var listValue = value;
		value += CONST_CTRL_CONTROLID_RemoteBegin;

		$("#ContainerOuter_" + (g_ControlId - CONST_CTRL_CONTROLID_RemoteBegin)).removeClass("current_list_row");
		$("#ContainerOuter_" + listValue).addClass("current_list_row");
		g_ReturnValue = 0;

		checkIsChanged(value, 0);
	}
	
}


function changeSiteContent(ToContent){
	hideHTML('Control_Assignment');
	hideHTML('Virtual_Switch');
	hideHTML('Fixed_Value');
	hideHTML('Fixed_Switch');
	hideHTML('Function_Output');
	hideHTML('Flightmode_Control');
	hideHTML('Remote_Control_Switch');
	hideHTML('Additional_Button_Box_Inverse');
	hideHTML('Additional_Button_Box');
	$('#Function_Output_Inner').remove();
	$('#Virtual_Switch_Inner').remove();
	$('#FlightMode_Inner').remove();

	g_PageContent = ToContent;

	switch(ToContent){
		case 0:		setHTML('Drop_Down_Content', 'Bewegen Sie einen Geber oder wählen Sie aus der Liste');
					showHTML('Control_Assignment');
					showOptionButton(g_ControlId);
					break;
		case 1:		setHTML('Drop_Down_Content', 'Virtueller Schalter oder wählen Sie eine Option aus der Liste');
					showHTML('Virtual_Switch');
					showHTML('Additional_Button_Box_Inverse');
					setVirtualSwitch();
					break;
		case 2:		setHTML('Drop_Down_Content', 'Festwert oder wählen Sie eine Option aus der Liste');
					showHTML('Fixed_Value');
					setFixedValue(g_controlValue);
					break;
		case 3:		setHTML('Drop_Down_Content', 'Fixschalter oder wählen Sie eine Option aus der Liste');
					showHTML('Fixed_Switch');
					setFixedSwitchButton(g_ControlId);
					break;
		case 4:		setHTML('Drop_Down_Content', 'Funktionsausgang oder wählen Sie eine Option aus der Liste');
					showHTML('Function_Output');
					setFunctionOutput();
					break;
		case 5:		setHTML('Drop_Down_Content', 'Flugphasen Schalter oder wählen Sie eine Option aus der Liste');
					showHTML('Flightmode_Control');
					showHTML('Additional_Button_Box_Inverse');
					setFlightMode();
					break;
		case 6:		setHTML('Drop_Down_Content', 'Externer Geber oder wählen Sie eine Option aus der Liste');
					showHTML('Remote_Control_Switch');
					setRemoteControlSwitch(true);
					break;
		case 7:		setHTML('Drop_Down_Content', 'Externer Schalter oder wählen Sie eine Option aus der Liste');
					showHTML('Remote_Control_Switch');
					setRemoteControlSwitch(false);
					break;
		default:	g_PageContent = 0;
					showHTML('Control_Assignment');
	}

	changeDropDownOptions();
	hideHTML('Drop_Down_Options');
}


function changeDropDownOptions(){
	for(var i = 0; i < 8; i++){
		hideHTML('Option_' + i);
	}

	if(g_PageId > 9){
		setHTML('Option_0', '<div class="icon_control_switch"></div>' + 'Geberauswahl durch Schalten');
	}
	else{
		setHTML('Option_0', '<div class="icon_control_select"></div>' + 'Geberauswahl durch Schalten oder Berühren');
	}

	for(var i = 0; i < dropDownArray[g_PageId].length; i++){
		if(g_PageContent != dropDownArray[g_PageId][i]){
			showHTML('Option_' + dropDownArray[g_PageId][i]);
		}
	}

































































































}


function setControlInverse(){
	if(g_isControlInverse){
		g_isControlInverse = false;
		hideHTML('Control_Inverse_Img');

		if((g_PageContent == 1) && ((CONST_CTRL_VirtualSwitchInverseBegin <= g_ControlId) && (g_ControlId <= CONST_CTRL_VirtualSwitchInverseEnd))){
			submitSET("VirtualSwitch", g_ControlId - CONST_CTRL_VirtualSwitchInverseBegin);
		}
		else if((g_PageContent == 5) && ((CONST_CTRL_FlightmodeInverseBegin <= g_ControlId) && (g_ControlId <= CONST_CTRL_FlightmodeInverseEnd))){
			submitSET("FlightMode", g_ControlId - CONST_CTRL_FlightmodeInverseBegin);
		}
	}
	else{
		g_isControlInverse = true;
		showHTML('Control_Inverse_Img');

		if((g_PageContent == 1) && ((CONST_CTRL_VirtualSwitchBegin <= g_ControlId) && (g_ControlId <= CONST_CTRL_VirtualSwitchEnd))){
			submitSET("VirtualSwitch", g_ControlId - CONST_CTRL_VirtualSwitchBegin);
		}
		else if((g_PageContent == 5) && ((CONST_CTRL_FlightmodeBegin <= g_ControlId) && (g_ControlId <= CONST_CTRL_FlightmodeEnd))){
			submitSET("FlightMode", g_ControlId - CONST_CTRL_FlightmodeBegin);
		}
	}
}


function setFixedValue(value){
	if(value == 65536){
		value = 0;
	}
	else{
		value = Value12Bit2Percent(value);
	}

	submitSET("Fix_Value_Value", value);

	if(value > -1){
		value = "+" + value;
	}

	setHTML("Fix_Value_Value",  value + "%");
}


function setFixedSwitch(value){
	setFixedSwitchButton(value);

	submitSET("Fixed_Switch", value);
}


function setFixedSwitchButton(value){
	if(value == 2){
		$('#Fixed_Switch_Button_On').removeClass('button_blue');
		$('#Fixed_Switch_Button_On').addClass('button_white');
		$('#Fixed_Switch_Button_Off').removeClass('button_white');
		$('#Fixed_Switch_Button_Off').addClass('button_blue');
		g_ReturnValue = 2047;
	}
	else if(value == 3){
		$('#Fixed_Switch_Button_On').removeClass('button_white');
		$('#Fixed_Switch_Button_On').addClass('button_blue');
		$('#Fixed_Switch_Button_Off').removeClass('button_blue');
		$('#Fixed_Switch_Button_Off').addClass('button_white');
		g_ReturnValue = -2047;
	}
	else{
		$('#Fixed_Switch_Button_On').removeClass('button_white');
		$('#Fixed_Switch_Button_On').addClass('button_blue');
		$('#Fixed_Switch_Button_Off').removeClass('button_white');
		$('#Fixed_Switch_Button_Off').addClass('button_blue');
		g_ReturnValue = 0;
	}
}


function setFunctionOutput(){
	setHTML('Function_Output', getInnerFunctionOutputContainer());

	var htmlListContainer = "";
	g_List_Indices = g_InitObjects.fo.SortIndeces.Functions;
	g_List_Count = g_List_Indices.length;

	for(var i = 0; i < g_List_Count; i++){
		Index           = g_InitObjects.fo.Function.Item[i].Index;
		FunctionName    = g_InitObjects.fo.Function.Item[i].Name;
		FunctionControl = g_InitObjects.fo.Function.Item[i].ControlID;

		htmlListContainer += getRowOfFunctionOutputInnerList(Index, FunctionName, FunctionControl);
	}

	$("#scrollContainerInnerVertical").html(htmlListContainer);

	initScrollbars('List_Container');
}


function setVirtualSwitch(){
	setHTML('Virtual_Switch', getInnerVirtualSwitchContainer());
	var htmlListContainer = "";
	var VirtualSwitchControlOffset = CONST_CTRL_VirtualSwitchBegin;
	g_isControlInverse = false;
	hideHTML('Control_Inverse_Img');

	if(((CONST_CTRL_VirtualSwitchInverseBegin <= g_ControlId) && (g_ControlId <= CONST_CTRL_VirtualSwitchInverseEnd))){
		g_isControlInverse = true;
		VirtualSwitchControlOffset = CONST_CTRL_VirtualSwitchInverseBegin;
		showHTML('Control_Inverse_Img');
	}

	g_List_Count = g_InitObjects.vs.VSwitch.Item.length;

	for(var i = 0; i < g_List_Count; i++){
		Index = g_InitObjects.vs.VSwitch.Item[i].Index;
		VSwitchName     = g_InitObjects.vs.VSwitch.Item[i].Name;
		VswitchControl1 = g_InitObjects.vs.VSwitch.Item[i].Control__1.Control;
		VswitchControl2 = g_InitObjects.vs.VSwitch.Item[i].Control__2.Control;
		VswitchLogic    = g_InitObjects.vs.VSwitch.Item[i].IsLogicalOperationOR.Name;

		htmlListContainer += getRowOfVirtualSwitchInnerList(Index, VSwitchName, VswitchControl1, VswitchControl2, VswitchLogic, VirtualSwitchControlOffset);
	}

	$("#scrollContainerInnerVertical").html(htmlListContainer);

	initScrollbars('List_Container');
}


function setFlightMode(){
	setHTML('Flightmode_Control', getInnerFlightModeContainer());
	var htmlListContainer = "";
	var FlightModeControlOffset = CONST_CTRL_FlightmodeBegin;
	g_isControlInverse = false;
	hideHTML('Control_Inverse_Img');

	if(((CONST_CTRL_FlightmodeInverseBegin <= g_ControlId) && (g_ControlId <= CONST_CTRL_FlightmodeInverseEnd))){
		g_isControlInverse = true;
		FlightModeControlOffset = CONST_CTRL_FlightmodeInverseBegin;
		showHTML('Control_Inverse_Img');
	}

	g_List_Count = g_InitObjects.fm.ItemCount;

	for(var i = 0; i < g_List_Count; i++){
		Index  = g_InitObjects.fm.Item[i].Index;
		Name   = g_InitObjects.fm.Item[i].Name;
		FadeIn = g_InitObjects.fm.Item[i].FadeIn;
		NoFadeInFunctionsStr = g_InitObjects.fm.Item[i].NoFadeInFunctionsStr;

		htmlListContainer += getRowOfFlightModeInnerList(Index, Name, FadeIn, NoFadeInFunctionsStr, FlightModeControlOffset);
	}

	$("#scrollContainerInnerVertical").html(htmlListContainer);

	initScrollbars('List_Container');
}


function setRemoteControlSwitch(isControl){
	setHTML('Remote_Control_Switch', getInnerRemoteControlSwitchContainer());

	var htmlListContainer = "";

	for(var i = 0; i < 12; i++){
		htmlListContainer += getRowOfRemoteControlSwitchInnerList(i, "Remote Input", isControl);
	}

	$("#scrollContainerInnerVertical").html(htmlListContainer);

	for(i = 0; i < 12; i++){
		control2image('Remote_Control_Control_' + i, CONST_CTRL_CONTROLID_RemoteBegin + i);

		if(!isControl){
			if(i == (g_ControlId - CONST_CTRL_CONTROLID_RemoteBegin)){
				setTriggerState("Remote_Control_Trigger_" + i, g_ControlTrigger);
			}
			else{
				setTriggerState("Remote_Control_Trigger_" + i, 0);
			}
		}
	}

	initScrollbars('List_Container');
}


function convertTrigger2Percent(trigger){
	switch(trigger){
		case  "-204": return -10.0;
		case   "512": return  25.0;
		case  "-512": return -25.0;
		case  "1536": return  75.0;
		case "-1536": return -75.0;
		default:	  return   0;
	}
}
