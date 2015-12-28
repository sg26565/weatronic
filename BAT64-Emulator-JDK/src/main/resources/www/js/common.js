


var GUI_VERSION = "6.07";
var GUI_SUBVERSION = 3434;



var DEBUG_LEVEL = 0;	

var CONST_CTRL_Null					= 0;

var CONST_CTRL_VirtualRotaryNumpad  = 1;


var	CONST_CTRL_SwitchFixedOn		= 2;
var	CONST_CTRL_SwitchFixedOff		= 3;


var CONST_CTRL_TeleScreenSlider		= 4;


var CONST_CTRL_ValueFixedBegin		= 32768;
var CONST_CTRL_ValueFixedMiddle		= 34816;
var CONST_CTRL_ValueFixedEnd		= 36863;


var CONST_CTRL_FunctionoutputBegin	= 1792;
var CONST_CTRL_FunctionoutputEnd	= 1888;


var CONST_CTRL_VirtualSwitchBegin	= 1280;
var CONST_CTRL_VirtualSwitchEnd		= 1311;

var CONST_CTRL_VirtualSwitchInverseBegin = 2048;
var CONST_CTRL_VirtualSwitchInverseEnd 	 = 2079;


var CONST_CTRL_FlightmodeBegin		= 2304;
var CONST_CTRL_FlightmodeEnd		= 2319;

var CONST_CTRL_FlightmodeInverseBegin = 2560;
var CONST_CTRL_FlightmodeInverseEnd	  = 2575;


var CONST_CTRL_CONTROLID_RemoteBegin 	= 2816;
var CONST_CTRL_CONTROLID_RemoteEnd 		= 2831;


var CONST_CTRL_StickLeftVert 		= 256;
var CONST_CTRL_StickLeftHori 		= 257;
var CONST_CTRL_StickRightVert 		= 496;
var CONST_CTRL_StickRightHori 		= 497;


var CONST_CTRL_RotaryLeftUp 		= 512;
var CONST_CTRL_RotaryLeftMiddle 	= 513;
var CONST_CTRL_RotaryLeftBottom 	= 514;
var CONST_CTRL_RotaryStickLeft		= 527;
var CONST_CTRL_RotaryRightUp 		= 752;
var CONST_CTRL_RotaryRightMiddle	= 753;
var CONST_CTRL_RotaryRightBottom 	= 754;
var CONST_CTRL_RotaryStickRight		= 767;
var CONST_CTRL_Rotary_ALL			= 536;
	                                                              

var CONST_CTRL_SWLeftFront1 		= 768;
var CONST_CTRL_SWLeftFront2 		= 769;
var CONST_CTRL_SWLeftTop1 			= 770;
var CONST_CTRL_SWLeftTop2 			= 771;
var CONST_CTRL_SWStickLeft			= 783;
var CONST_CTRL_SWRightFront1 		= 1008;
var CONST_CTRL_SWRightFront2 		= 1009;
var CONST_CTRL_SWRightTop1 			= 1010;
var CONST_CTRL_SWRightTop2 			= 1011;
var CONST_CTRL_SWStickRight			= 1023;
	                                                                                                                         

var CONST_CTRL_PotiLeftTop 			= 1024;
var CONST_CTRL_PotiLeftSide 		= 1025;
var CONST_CTRL_PotiStickLeft		= 1039;
var CONST_CTRL_PotiRightTop 		= 1264;
var CONST_CTRL_PotiRightSide 		= 1265;
var CONST_CTRL_PotiStickRight		= 1279;


var CONST_CTRL_StickLeftButton		= 782;
var CONST_CTRL_StickRightButton		= 1022;



var CONST_CTRL_RotaryLeftBottomBottom	= 528;
var CONST_CTRL_RotaryRightBottomBottom	= 529;

var CONST_CTRL_SWCenter1 = 784;
var CONST_CTRL_SWCenter2 = 785;
var CONST_CTRL_SWCenter3 = 786;

var CONST_CTRL_SliderCenter = 1040;



var CONST_TELEMETRY_Tx_Voltage = 7307;
var CONST_TELEMETRY_Tx_TRXStatusWord = 11398;
var CONST_TELEMETRY_Tx_HKStatusWord = 11404;
var CONST_TELEMETRY_MEASValue_Tx_Servo__0 = 4224;
var CONST_TELEMETRY_MEASValue_Rx_Servo__0 = 4352;
var CONST_TELEMETRY_MEASValue_Rx_Servo__63 = 4415;
var CONST_TELEMETRY_MEASValue_Tx_PowerSupply = 33968;


var CONST_HiThreshold = 94;
var	CONST_LoThreshold = -94;
var CONST_CenterUpperThreshold = 6;
var CONST_CenterLowerThreshold = -6;	


var CONST_SCROLLING_StepSmall  =  70;
var CONST_SCROLLING_StepMiddle = 210;
var CONST_SCROLLING_StepBig    = 490;
var CONST_SCROLLING_AnimationSpeed = 20;

var CONST_SCROLLING_Key_g = 103;	
var CONST_SCROLLING_Key_h = 104;	
var CONST_SCROLLING_Key_j = 106;	
var CONST_SCROLLING_Key_b = 98;		
var CONST_SCROLLING_Key_n = 110;	
var CONST_SCROLLING_Key_m =	109;	

var CONST_SCROLLING_Key_e = 101;	
var CONST_SCROLLING_Key_d = 100;	
var CONST_SCROLLING_Key_c = 99; 	
var CONST_SCROLLING_Key_w = 119;	
var CONST_SCROLLING_Key_s = 115;	
var CONST_SCROLLING_Key_x =	120;	


var CONST_MODELICON_DEFAULT_small = "data:image/png;base64,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";




var CONST_BATTERYICON_ALL         = "data:image/png;base64,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";
var CONST_BATTERYICON_CHARGING    = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAVCAYAAADRhGlyAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAObSURBVHja7JhfSNNRFMfv5txvw7m/rD9GQ3yJ8EUW1foDCfYSBYVBREQQWBCEFBjRUxAEQT3WSxA9BD300pOg0T/IEYkbZqVTJmszS7dsTqdz7vfb+l65ys/1m/sn7IYeONz7+90z7uWzc+4556fKZDKkkhKNRlc9p9PpgyaT6alGo3HgMQ5VsSU6mqemph6FQqF2rVa79LKxsbGY7fZAH0A7oJ4S1v8RDamwANjKnP6ZBoPhclVVVQM7m05um0qlojMzM4Nms5nU19eXumVzmet8AZRHAOZ2eN5+lUqleK5YLNZXXV3dVVdXR2BDeJCKA6ytrV2ZLy4unlWr1VuU7CRJIoIg9Oj1+hBsiCysMxsaoAwG0el0p/BszmE3AO98B89LE45EXekDiKJIPY8sLCwcxt23O9eZkGzcgUCgF3fgqhtgw4dwOBwmCEuaPC7By2xKNvPz878B943D4UjS7EsTD96RRCJB7HZ7vi2moaasd315fiNfl6ACG/kDmEwmCaCYcL/R7KdVskHY/kJ4G2CzD49Gdu5pZOUQxp95tphQAFiM/MkFj5cs3ADPOwNIjlw2ALcT6zdpnoFa4H0jwWDwOgDGaUbOI7Se21XGEXu5DmGE7taamhoBgF7QKxFQBIRrizyZsLmZhfM44D2enZ31wVYsYItO6LkyjtjJNUB4lx8hPAGAGdyHKXhki81mO6CUjePx+JexsbEbc3Nz3S6Xq9AtXrIw3lbC8WLQ51xnYQCLwOMCkUjkO+CM45UL8CxK8OB57Ri7UUwTj8dD3G53IVskoHdLPN59BpFfgKzDIJOTkwRgDOiDmwFQL1+Hx31D/9sBeO+Xe+Ai5SG0q8jf9EDvcV8H0kIagIjVaiXocY/AGy1ZnjcAeNdg84p6XhkfP1qhbwu0/Qg9sVb25QYgEgEtYwjAEaPR2CoHCGhfUTxfBcTXFF6ZQkP5GPQWmysJzfJ3oC35QpcbgIBDkFFpp4FST7cXHimwbDsEeFcwflgHeHJANCy3Qy/Iakg6trH3t9cAzGUSWVJ4YTN63R3M84ZGR0cvotPoWUd42dn1GXSEPdPxCSua/69emHYi6IOJxWJpA0Ar5kG/338e4yca1lSampqWlEfh4msMelsdCupDgPljeHj4NEYvYBKn07li19/fvwkwRyGtBayjkiQlfT7fSVEUP1PPW4bn9XpXffLaBJgl8D4n7jkX4B0HxEEKSw6Pd/krwAAGH3xtV7ypNwAAAABJRU5ErkJggg==";
var CONST_BATTERYICON_PLUG        = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAVCAYAAADRhGlyAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADkSURBVHjaYvj//z/DCMLGQLwfSpMjj4GZGEYecKBQHgWMxACkKhgNwNEAHA3AIQ0YQTXJMAcfgJifAv1/gZgdSo/IFPiCQv3vcAXeSAnAsxTqPzXSy8CttNQ/EspATiC+B8QSZOj9CMTyUHrEpsDvQNxKpt5ufIE3UlIgDGwHYg8S1B+Bduv+jrYDISAIiPcRqfY4EPsQCryRFoCgrOwJxJVQNjbwC4ibgNiZUNYdiVkYGYAa1n5A3AHEUkD8DIjrgHg9tN032hMhEuyHlnMHgNhxtC88OpgwGoCjATgKSAMAAQYAhOIhSlUZfUsAAAAASUVORK5CYII=";
var CONST_BATTERYICON_PLUGWARNING = "data:image/png;base64,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";
var CONST_BATTERYICON_WARNING     = "data:image/png;base64,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";



var isBAT = false;
if(navigator.appVersion.indexOf("X11; U; Linux armv7l; c") != -1){
	isBAT = true;
}


var	InitDataPostArgs = new Object();
var	TdPostArgs		 = new Object();
var	FmDataPostArgs	 = new Object();
var EventDataPostArgs = new Object();
EventDataPostArgs.Event = [];



var telemetryIds   = new Array();
var telemetryIds20 = new Array();

telemetryIds   = setTxTRXStatusWord(telemetryIds);
telemetryIds20 = setCurrentPowerSupply(telemetryIds20);


TdPostArgs.Telemetry_Val = telemetryIds;



controlIds = new Array();
controlIds = setRotaryControl(controlIds);

TdPostArgs.Control_Val = controlIds;


var g_isRunOnDC = 0;
var g_isReserve = 0;
var g_dialogBoxTimeoutFunction;
var g_PageRefreshed = false;
var g_isAdditionalControlObjectUsed = false;
var g_CurrentFlightMode = -1;
var g_numpadLimitObj = {};
var g_isPopUp = false;			
var g_isBindingActive = 0;	
var g_isRfConnected = 0;	
var g_isStartupWarningActive = 0;
var g_currentLocation = location.pathname.substring(0, location.pathname.indexOf(".html"));
var g_absoluteServoMonitorPath = "/1.14__ServoMonitor.html?LastURLMonitor=" + location.href;
var g_htmlServoMonitor = ['<div style="width: 100%;" onClick=\'gotoHref("' + g_absoluteServoMonitorPath + '");\' draggable="false">' + 'Servo Monitor' + '</div>',
                          '<div style="width: 100%;" onClick=\'takeScreenshot();\' draggable="false">' + 'Screenshot speichern' + '</div>',
                          '<div style="width: 100%;" onClick=\'gotoHrefHelp();\' draggable="false">' + 'Hilfe' + '</div>'

                          ];

var g_ScrollbarIsInit = false;

var g_FileType = new Array();
	g_FileType["Music"]   = new Array("mp3", "MP3", "wav", "WAV", "wma", "WMA");
	g_FileType["Image"]   = new Array("gif", "GIF", "giff", "GIFF", "jpg", "JPG", "jpeg", "JPEG", "png", "PNG", "tif", "TIF", "tiff", "TIFF", "bmp", "BMP");
	g_FileType["Model"]   = new Array("model");
	g_FileType["Log"]	  = new Array("log");
	g_FileType["Setting"] = new Array("set");

var	g_isPwActive = 0;
var g_isPwChecked = 0;


var g_skipWarnings = 1;

var g_NumpadControl = -1;


$(window).keypress(function (e){onEVENT_KEYPRESS(e);});


$(document).on("onEVENT_CONTROL", function controlEvent(e){onEVENT_CONTROL(e);});
var g_ControlEvent = "onEVENT_CONTROL";

$(document).on("onEVENT_INIT", function controlEvent(e){onEVENT_INIT(e);});
var g_InitEvent = "onEVENT_INIT";

$(document).on("onEVENT_SET", function (e){onEVENT_SET(e);});
var g_SetEvent = "onEVENT_SET";

$(document).on("onEVENT_FM_CHANGED", function (e){onEVENT_FM_CHANGED(e);});
var g_FmEvent = "onEVENT_FM_CHANGED";

$(document).on("onEVENT_LINUX", function (e){onEVENT_LINUX(e);});
var g_LinuxEvent = "onEVENT_LINUX";

$(document).on("onEVENT_MASTER_INIT", function (e){onEVENT_MASTER_INIT(e);});
var g_MasterInitEvent = "onEVENT_MASTER_INIT";

$(function(){
	$('#Option_Button').removeAttr("href");
	$('#Option_Button').bind("click", function(){showPopupList(this, g_htmlServoMonitor, false, false, -1);});
});


$(window).ready(function() {
	
	GetTd({"authentication":{"get":{"isPasswordUsed":-1, "isPasswordChecked":-1}}, "preflightChecklist":{"isChecklistSet": -1, "state": -1, "get":{"runtimeFlags": -1}}}, g_MasterInitEvent, "service");
	GetTd({"get":{"general-settings":{"GeneralSettingsTRX":{"ControlNumPad":-1}}}}, g_MasterInitEvent, "get");
	GetTd({"ServiceInfo":{"DataInconsistent": -1, "IsToAskUser": -1}}, g_MasterInitEvent);
});




function gotoHrefHelp(){
	if(g_currentLocation.indexOf("Help") != -1){
		var pageName2Show = encodeURI($("#Help_Page").html());
		pageName2Show = pageName2Show.replace(/&/g, "%26");
		gotoHref("/HelpContent/0.0__General_Help.html?FromName2Help=" + document.title + "&FromName2Help2Show=" + pageName2Show + "&LastURLHelp=" + g_lastURL);
	}
	else{
		var pageName2Show = encodeURI($("#" + $("#Page_Name_Tag").html()).html());
		pageName2Show = pageName2Show.replace(/&/g, "%26");
		gotoHref("/HelpContent/" + g_currentLocation + "_Help.html?FromName2Help=" + document.title + "&FromName2Help2Show=" + pageName2Show + "&LastURLHelp=" + location.href);
	}
}


function gotoHref(href){
	if(g_currentLocation == "/9.2.0__CurveEdit"){
		g_isOptionButton = true;

		if(g_fromPageType == "SyncIndex"){
			g_gotoLocation = href;
			GetTd({"cmd":0x0257, "param": {"ServoIdx": g_Index}}, g_SetEvent, "command");
		}
		else{
			if(document.getElementById("Navi_Box").style.display == "none"){
				g_gotoLocation = href;
				showDialogbox("saveCurve");
			}
			else{
				g_gotoLocation = href;
				isGotoSave = true;
				submitCurve("set", "save", g_curvePercentages, g_realPoints, g_currentFlightMode);
			}
		}	
	}
	else{
		window.location.href = href;
	}
}


function takeScreenshot(){
	hideHTML('Pop_Up_Blocker');
	$('#Pop_Up_Outer').remove();
	g_isPopUp = false;

	setTimeout(function(){
		if($('#Pop_Up').is(':empty')){
			GetTd({"cmd":0x0314}, "noEvent", "command");
		}
	}, 500);
}



function log(lvl, msg){
	if(lvl <= DEBUG_LEVEL){
		console.log(msg);
	}
}


function notUsed(key, value){
	return value;
}




function Value12Bit2Percent(x){
	return Math.round((x * 100) / 2047);
}






function get_GET_Parameter(){
	var uriGET = window.location.search.substring(1).split('&');

    if(!uriGET.length) return;

    GET_Param = {};

    for(var i  = 0; i < uriGET.length; i++){
        var parts = uriGET[i].split('=');

        if((decodeURI(parts[0]) == "LastURL") && (decodeURI(parts[2]) != "undefined")){
        	 GET_Param[decodeURIComponent(decodeURI(parts[0]))] = decodeURI(parts[1]) + "=" + decodeURIComponent(decodeURI(parts[2]));
        }
        else{
        	 GET_Param[decodeURIComponent(decodeURI(parts[0]))] = decodeURIComponent(decodeURI(parts[1]));
        }
    }

    return GET_Param;
}






function getCurrentFlightMode(TdPostArgs){
	if(typeof TdPostArgs == 'undefined'){
		TdPostArgs = new Object();
	}

	flightMode = new Object();
	flightMode.Index = g_CurrentFlightMode;
	flightMode.Name = "";

	TdPostArgs.Current_FM = flightMode;

	return TdPostArgs;
}


function getCurrentModelName(InitDataPostArgs){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

	InitDataPostArgs.ModelName = "Default Model";

	return InitDataPostArgs;
}


function getPopupObj(InitDataPostArgs, ListName){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

	if(typeof InitDataPostArgs.PopUp == 'undefined'){
		InitDataPostArgs["PopUp"] = {};
	}






	listArray = new Array();

	InitDataPostArgs["PopUp"][ListName] = listArray;

	return InitDataPostArgs;
}


function getNumPadLimitObj(InitDataPostArgs, ClassTag){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

	if(typeof InitDataPostArgs.NumPadLimits == 'undefined'){
		InitDataPostArgs["NumPadLimits"] = {};
	}

	ListItem = new Object();
	ListItem.Max = -1;
	ListItem.Min = -1;
	ListItem.IsSigned = -1;
	ListItem.OutputResolution = -1;

	InitDataPostArgs["NumPadLimits"][ClassTag] = ListItem;

	return InitDataPostArgs;
}






function getRowRD(Index, Name, ListType, sortIndex){
	htmlRDrow = '' +
		'<div id="ContainerOuter_' + sortIndex + '">' +
			'<div id="Container_' + Index + '"     class="list_content_row" style="width: 674px;"></div>' + 
			'<div id="Delete_Button_' + Index + '" class="button_red round_all" style="display: none; margin: 4px 0px 0px 21px; width: 52px; height: 60px;"><a href="#" onClick=\'showDialogbox("delete", "' + ListType + '","' + Name + '","' + Index + '");\' class="delete_button" draggable="false"></a></div>' +




			'<div id="Reorder_Button_Up_' + Index + '"   class="button_blue round_all reorder_up"   style="display: none;"><a href="#" onClick="moveElement(this.parentNode.parentNode.id, 1);" class="raise_button" draggable="false"></a></div>' + 
			'<div id="Reorder_Button_Down_' + Index + '" class="button_blue round_all reorder_down" style="display: none;"><a href="#" onClick="moveElement(this.parentNode.parentNode.id, 0);" class="lower_button" draggable="false"></a></div>' +
			'<div id="Copy_Button_' + Index + '" class="button_blue round_all" style="margin: 4px 0px 0px 21px; width: 52px; height: 60px; display: none;"><a href="#" onclick=\'copyItem(' + Index + ');\' class="copy_button"></a></div>' +
		'</div>';

	return htmlRDrow;
}





function setCurrentPowerSupply(telemetryIds20){
	telemetryPowerSupply = new Object();
	telemetryPowerSupply.ID = CONST_TELEMETRY_MEASValue_Tx_PowerSupply;

	value = new Object();
		value.RemPowerTime = "";
		value.IsRunOnDC = -1;
		value.IsReserve = -1;
		value.Voltage = "";
		value.InputVoltage = "";
		value.MainVoltage = "";
		value.ReserveVoltage = "";
			cell = new Object();
			cell.Status = "";
			cell.Voltage = "";
			cell.VoltageStr = "";
			cell.Capacity = "";
			cell.Temperature = "";
		cells = new Array (cell);
		value.Cells = cells;

	telemetryPowerSupply.Value = value;

	telemetryIds20.push(telemetryPowerSupply);

	return telemetryIds20;
}


function setTxTRXStatusWord(telemetryIds){
	telemetryTxTRXStatusWord = new Object();
	telemetryTxTRXStatusWord.ID = CONST_TELEMETRY_Tx_TRXStatusWord;
	telemetryTxTRXStatusWord.Value = 0;

	telemetryIds.push(telemetryTxTRXStatusWord);

	return telemetryIds;
}














function setRotaryControl(controlIds){
	numpad_Control_Value = new Object();
	numpad_Control_Value.ID = CONST_CTRL_VirtualRotaryNumpad;
	numpad_Control_Value.Value = 0;

	controlIds.push(numpad_Control_Value);

	return controlIds;
}




function shutDown(){
	GetTd({"cmd":0x0215}, "noEvent", "command");
}


function onError(e, text, isLinuxError){
	if(typeof text == "undefined"){
		text = "Error: ";
	}

	if(isLinuxError){
		
		showDialogbox("error", text);
	}
	else{
		try{
			stack = e.stack.split("at ");
			log(1, text + stack[0] + " at " + stack [1] + " at " + stack [2]);
		}
		catch(err){
			log(1, "Error onError: unable to decode stack from another Error!");
		}
		finally{
			log(1, text + e.name + " - " + e.message);
		} 
	}
}


function onEVENT_CONTROL(e){
	try{
	
		for(var i in e.EventData.Control_Val){
			var key   = e.EventData.Control_Val[i].ID;
			var value = e.EventData.Control_Val[i].Value;

			if(key == CONST_CTRL_VirtualRotaryNumpad){
				handleRoteryControl(value);
			}
			else{
				handleEventControl("control", e, key, value);
			}
		}

		
		for(j in e.EventData.Telemetry_Val){
			key      = e.EventData.Telemetry_Val[j].ID;
			value    = e.EventData.Telemetry_Val[j].Value;
			valueStr = e.EventData.Telemetry_Val[j].ValueStr;




			if(key == CONST_TELEMETRY_MEASValue_Tx_PowerSupply){
				handleTxpowerSupply(value);
			}
			else if(key == CONST_TELEMETRY_Tx_TRXStatusWord){
				handleTxTRXStatusWord(value);
			}	
			else{
				handleEventControl("telemetry", e, key, value, valueStr, j);
			}
		}

		if(typeof e.EventData.Current_FM != "undefined"){
			handleEventControl("flightmode", e);
		}

		if(g_isAdditionalControlObjectUsed){
			handleEventControl("AdditionalControlObject", e);
		}
	}catch(err){
		onError(err, "Error Intervaldata: ", false);
	}	
}


function onEVENT_LINUX(e){
	for(var i in e.EventData.Event){
		var type = e.EventData.Event[i].Type;
		var data = e.EventData.Event[i].Data;

		switch(type){
			case 360:	if(g_isRfConnected == 0){
						  	closeDialogboxByTimer(data.ShowTime);
						  	showDialogbox("info", data.Info);
					  	}
					  	else{
						   showDialogbox("rfConnected", data.Warning, data.Info, data.ShowTime);
					  	}
					  	break;
			case 361:	clearTimeout(g_dialogBoxTimeoutFunction); showDialogbox("info", data.Info); break;
			
			case 352:	if((g_currentLocation == "/0.1__HomeScreen") || g_currentLocation == "/0.2__Telemetry"){
							checkLockState();
							
						}
						else{
							if(typeof g_Wizard == "undefined"){
								g_Wizard = false;
							}
							if(g_Wizard == "true"){
								break;
							}
							else{
								
								g_lastURL = "/0.1__HomeScreen.html";
								
								if(g_currentLocation == "/9.2.0__CurveEdit"){
									
									g_gotoLocation = g_lastURL;
									isGotoSave = true;
									g_isOptionButton = false;
					
									if(g_fromPageType == "SyncIndex"){
										GetTd({"cmd":0x0257, "param": {"ServoIdx": g_Index}}, g_SetEvent, "command");
									}
									else{
										if(g_isChanged){
											submitCurve("set", "save", g_curvePercentages, g_realPoints, g_currentFlightMode);
										}
										else{
											window.location.href = g_gotoLocation;
										}
									}
									break;
								}
								else if(g_currentLocation == "/2.3__Calibration"){
									
									if(!g_isCalibrationActive){
										window.location.href = g_lastURL;
									}
									break;
								}
								else if(g_currentLocation == "/2.6__PreFlightTest"){
									
									g_isBackPage = true;
									stoptestOnbackpage();
									break;
								}
								else if(g_currentLocation == "/1.3.2__ServoConfigurationListView"){
									
									 g_isGraphicViewButton = false;
									 setTravel2Limits();
									break;
								}
								else if(g_currentLocation == "/1.3.1__ServoConfigurationGraphicView"){
									
									g_isListViewButton = false;
									showDialogbox("actionWait", 'Die Servo-Funktions Zuordnung wird aktualisiert.');
									GetTd({"ModelWizard":{"cmd":2}}, g_SetEvent, "2");
									break;
								}
								else if(g_currentLocation == "/9.3__ServoSynchronization"){
									
									if(g_isCurrentlyAutoSync){
										window.location.href = g_lastURL;
									}
									break;
								}
								else if(g_currentLocation == "/1.15.1__TeacherStudentSettings"){
									
									if(!g_isCalibrationActive){
										window.location.href = g_lastURL;
									}
									break;
								}
								else if(g_currentLocation == "/1.15.2__TeacherStudentCalibration"){
									
									if(!g_isCalibrationActive){
										window.location.href = g_lastURL;
									}
									break;
								}
								else{
									window.location.href = g_lastURL;
								}
							}	
						}
						break;
			case 4099:	var htmlMessage = "";
						var messageType = 2;
						if(data.step == 30){
							htmlMessage = 'Der Arbeitsspeicher sollte optimiert werden. Möchten Sie dies nun durchführen? Alle ungesicherten Daten werden verworfen.';
						}
						else if(data.step == 20){
							htmlMessage = 'Der Arbeitsspeicher muss optimiert werden. Möchten Sie dies nun durchführen? Alle ungesicherten Daten werden verworfen.';
							messageType = 0;
						}
						else if(data.step == 15){
							htmlMessage = 'Der Arbeitsspeicher wird optimiert. Alle ungesicherten Daten werden verworfen.';
							messageType = 0;
						}
						showDialogbox("optimizeMemory", htmlMessage, messageType);
						break;
		}
	}
}

function onEVENT_MASTER_INIT(e){
	
	if(typeof e.EventData.authentication != "undefined"){
		if(typeof e.EventData.authentication.get != "undefined"){
			if((typeof e.EventData.authentication.get.isPasswordUsed != "undefined") && (typeof e.EventData.authentication.get.isPasswordChecked != "undefined")){
				g_isPwActive = e.EventData.authentication.get.isPasswordUsed;
				g_isPwChecked = e.EventData.authentication.get.isPasswordChecked;

				if((g_isPwActive == 1) && (g_isPwChecked == 0)){
					if((g_currentLocation != "/0.1__HomeScreen") && (g_currentLocation != "/0.2__Telemetry") && (g_currentLocation != "/0.9__PasswordRecovery")){
						checkPassword(false);
					}
				}
				



			}
		}
		else if(typeof e.EventData.authentication.check != "undefined"){
			if(typeof e.EventData.authentication.check.password != "undefined"){
				g_isPwChecked = e.EventData.authentication.check.password;

				if(g_isPwChecked == 0){
					checkPassword(true);
				}



			}
		}
	}

	if(typeof e.EventData.preflightChecklist != "undefined"){
		g_skipWarnings = e.EventData.preflightChecklist.get.runtimeFlags;
		if(e.EventData.preflightChecklist.isChecklistSet == 1){


			if((e.EventData.preflightChecklist.state == 1) && (g_skipWarnings == 0)){
				if(g_currentLocation != "/0.4__StartupChecklist"){
					window.location.href = "/0.4__StartupChecklist.html?isPreview=0&LastURL=" + location.href;
				}
			}
		}	
	}

	if(typeof e.EventData.get != "undefined"){
		if(typeof e.EventData.get.GeneralSettingsTRX != "undefined"){
			g_NumpadControl = e.EventData.get.GeneralSettingsTRX.ControlNumPad;
		}
	}	
	if(typeof e.EventData.ServiceInfo != "undefined"){
		if(e.EventData.ServiceInfo.IsToAskUser != 0){
			var maskTargetdevices = e.EventData.ServiceInfo.DataInconsistent;
			var htmlTargetDevices = 'Die Modelldaten sind inkonsistent mit: ';
			if(maskTargetdevices & 1){
				htmlTargetDevices+= 'Transceiver';
				htmlTargetDevices+= ", ";
			}
			else if(maskTargetdevices & 2){
				htmlTargetDevices+= 'Housekeeper';
				htmlTargetDevices+= ", ";
			}
			else if(maskTargetdevices & 16){
				htmlTargetDevices+= 'Rx Haupt';
				htmlTargetDevices+= ", ";
			}
			else if(maskTargetdevices & 32){
				htmlTargetDevices+= 'Rx Sub1';
				htmlTargetDevices+= ", ";
			}
			else if(maskTargetdevices & 64){
				htmlTargetDevices+= 'Rx Sub2';
				htmlTargetDevices+= ", ";
			}
			htmlTargetDevices = htmlTargetDevices.substring(0, htmlTargetDevices.length-2) + ". ";
			htmlTargetDevices+= 'Wollen Sie Daten mit dem Ziel abgleichen?';
			showDialogbox("DataInconsistent", htmlTargetDevices, maskTargetdevices);
		}
	}
	
}


function handleRoteryControl(value){
	
	if(typeof preControlRoteryValue == 'undefined'){
		preControlRoteryValue = value;
	}
	else{
		if(preControlRoteryValue != value){
			calculatedValue = Math.abs(value - preControlRoteryValue);

			if(calculatedValue != (Math.abs(Math.abs(value) - Math.abs(preControlRoteryValue)))){
				if((Math.abs(preControlRoteryValue) + Math.abs(value)) > 2048){
					log(3, "rotery overflow detected at 2048");
					calculatedValue -= 4096;
				}
				else{
					log(3, "rotery overflow detected at 0");
				}
			}

			if(preControlRoteryValue > value){
				calculatedValue *= -1;
			}

			preControlRoteryValue = value;

			if(numpadOpen){
				changeNumpadValue('control', calculatedValue);
				log(3, "Value raw : " + value + "   calculated:" + calculatedValue);
			}
			else if(location.pathname == "/9.2.0__CurveEdit.html"){
				change_curve(calculatedValue);
			}
		}	
	}
}


function handleTxpowerSupply(value){
	if(typeof htmlObj_Battery == 'undefined'){
		htmlObj_Battery = document.getElementById('Battery_Value');
	}
	try{
		g_isRunOnDC = value.IsRunOnDC;
		g_isReserve = value.IsReserve;
		g_isCharging = true;

		
	
	
	
	
	
	
	

		if(typeof powerState == "undefined"){
			powerState = "-.-"; 
		}

		if(typeof powerPreState == "undefined"){
			powerPreState = "-.-"; 
		}

		var cellStatus1 = 0x1&(parseInt(value.Cells[0].Status, 16));
		var cellStatus2 = 0x1&(parseInt(value.Cells[1].Status, 16));
		var cellStatus3 = 0x1&(parseInt(value.Cells[2].Status, 16));
		var cellStatus4 = 0x1&(parseInt(value.Cells[3].Status, 16));

		if(g_isRunOnDC){
			if(cellStatus1 || cellStatus2 || cellStatus3 || cellStatus4){
				if(g_isCharging){
					powerState = "runOnDc_charging_warning";
				}
				else{
					powerState = "runOnDc_warning";
				}
			}
			else{
				if(g_isCharging){
					powerState = "runOnDc_charging";
				}
				else{
					powerState = "runOnDc";
				}
			}
		}
		else{
			if(cellStatus1 || cellStatus2 || cellStatus3 || cellStatus4 || g_isReserve || (value.ReserveVoltage < 3900)){
				powerState = "warning";
			}
			else{
				powerState = "normal";
			}
		}

		if(powerState != powerPreState){
			var htmlBackgroundUrl = "";
			var htmlInnerText = "";

			switch(powerState){
				case "runOnDc_charging_warning":	htmlBackgroundUrl = "url('" + CONST_BATTERYICON_ALL + "')";			break;
				case "runOnDc_warning":				htmlBackgroundUrl = "url('" + CONST_BATTERYICON_PLUGWARNING + "')"; break;
				case "runOnDc_charging":			htmlBackgroundUrl = "url('" + CONST_BATTERYICON_CHARGING + "')";	break;
				case "runOnDc":						htmlBackgroundUrl = "url('" + CONST_BATTERYICON_PLUG + "')";		break;
				case "warning":						htmlBackgroundUrl = "url('" + CONST_BATTERYICON_WARNING + "')";		break;
			}

			htmlObj_Battery.style.backgroundImage = htmlBackgroundUrl;
			htmlObj_Battery.innerHTML = htmlInnerText;
			powerPreState = powerState;
		}

		if(powerState == "normal"){
			htmlObj_Battery.innerHTML = value.RemPowerTime;
		}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

		
		if(g_currentLocation == "/2.1__BatteryManager"){
			if(typeof reverseCell == "undefined"){
				var reverseCell = -1;
			}

			if(typeof reverseCellPreState == "undefined"){
				var reverseCellPreState = -2;
			}

			for(var batteryCount = 0; batteryCount < value.Cells.length; batteryCount++){
				setHTML("Battery_Capacity_" + (batteryCount + 1), value.Cells[batteryCount].Capacity);
				setHTML("Battery_Voltage_" + (batteryCount + 1), value.Cells[batteryCount].VoltageStr);
				var cellStatus = parseInt(value.Cells[batteryCount].Status, 16);
				var isCellReserve = 0x10&cellStatus;
				var lowBat = false;

				if(isCellReserve){
					reverseCell = batteryCount + 1;
				}

				if(g_isRunOnDC){
					if(value.Cells[batteryCount].Voltage <= 4100){
						lowBat = true;
					}
					else{
						lowBat = false;
					}
				}
				else{
					if(isCellReserve){
						if(value.Cells[batteryCount].Voltage <= 3900){
							lowBat = true;
						}
						else{
							lowBat = false;
						}
					}
					else{ 
						if((value.Cells[batteryCount].Voltage <= 3500) && !g_isReserve){
							lowBat = true;
						}
						else if((value.Cells[batteryCount].Voltage <= 4100) && g_isReserve){
							lowBat = true;
						}
						else{
							lowBat = false;
						}
					}	
				}

				
				
				if(lowBat && !(0x1&cellStatus)){
					$("#Battery_Health_" + (batteryCount + 1)).addClass("battery_status_warning").removeClass("battery_status_okay battery_status_damaged");
				}
				else{
					if(0x1&cellStatus){
						$("#Battery_Health_" + (batteryCount + 1)).addClass("battery_status_damaged").removeClass("battery_status_okay battery_status_warning");
					}
					else{
						$("#Battery_Health_" + (batteryCount + 1)).addClass("battery_status_okay").removeClass("battery_status_damaged battery_status_warning");
					}
				}

				if(!g_isRunOnDC){
					if(g_isReserve){
						if(isCellReserve){
							$("#Battery_" + (batteryCount + 1)).addClass("active_battery");
						}
						else{
							$("#Battery_" + (batteryCount + 1)).removeClass("active_battery");
						}
					}
					else{
						if(isCellReserve){
							$("#Battery_" + (batteryCount + 1)).removeClass("active_battery");
						}
						else{
							$("#Battery_" + (batteryCount + 1)).addClass("active_battery");
						}
					}
				}
				else{
					$("#Battery_1").removeClass("active_battery");
					$("#Battery_2").removeClass("active_battery");
					$("#Battery_3").removeClass("active_battery");
					$("#Battery_4").removeClass("active_battery");
				}
			}




		}

		
		if(typeof batState == 'undefined'){
			batState = "-.-";
		}

		if((!g_isRunOnDC && !g_isReserve) || (g_isRunOnDC && (value.ReserveVoltage > 4100))){
			valueVoltage = value.MainVoltage;
			setClassRed = false;
		}
		else if(!g_isRunOnDC && g_isReserve || (g_isRunOnDC && (value.ReserveVoltage <= 4100))){
			valueVoltage = value.ReserveVoltage;
			setClassRed = true;
		}
		else{
			valueVoltage = "-.-";
			setClassRed = false;
		}

		batState = showBatterySegements(valueVoltage, setClassRed, batState);
	}catch(err){
		onError(err, "Error TX Powersupply: ", false);
	}
}


function handleTX_Voltage(value){







}


function handleTxTRXStatusWord(value){
	g_isBindingActive = 1&value;
	g_isRfConnected   = 4&value;
	g_isStartupWarningActive = 1048576&value;

	if(g_isStartupWarningActive && (g_skipWarnings == 0)){
		if(g_currentLocation != "/0.4__StartupChecklist"){
			window.location.href = "/0.4__StartupChecklist.html?isPreview=0&LastURL=" + location.href;
		}
	}
}


function onEVENT_KEYPRESS(e){
	var char = e.charCode;

	if((char == 98) || (char == 110)|| (char == 109) || (char == 103) || (char == 104) || (char == 106)){
		ScrollTo(char);
	}

	if((char == 80) || (char == 112)){
		GetTd(EventDataPostArgs, g_LinuxEvent, "event");
		
	}

	if(char == 45){
		if(isBAT){
			event.cancelBubble = true;
			event.returnValue = false;
		}
	}
	
}

function onEVENT_MOUSE_DOWN(e){
	 if( e.button == 2 ) { 
	      
		 
	 }     
}




var intervalSlotcount = 0;

function JsonFunction(){
	if((intervalSlotcount % 20) == 0){
		var telemetryIdsTemp = telemetryIds.concat(telemetryIds20);
		TdPostArgs.Telemetry_Val = telemetryIdsTemp;
	}
	else{
		TdPostArgs.Telemetry_Val = telemetryIds;
	}

	GetTd(TdPostArgs, g_ControlEvent);	
	intervalSlotcount++;

	if(intervalSlotcount >= 100){
		intervalSlotcount = 0;
	}
}


function GetTd(postArgs, event, cmd){
	if(typeof postArgs == "undefined"){
		return;
	}

	if(typeof event == "undefined"){
		event = "noEvent";
	}

	if(typeof cmd == "undefined"){
		cmd = "noCommand";
		url = "/cgi/get_json";
	}
	else if(cmd == "event"){
		url = "/cgi/event";
	}
	else if(cmd == "command"){
		url = "/cgi/command";

	}
	else if(cmd == "service"){
		url = "/cgi/service";
	}
	else if(cmd == "serviceHTTPS"){
		url = "https://" + window.location.hostname + "/cgi/service";
	}
	else if(cmd.substr(0,14) == "fileManagement"){
		url = "/cgi/filemanagement";
	}
	else{
		url = "/cgi/set_json";
	}

	log(3, "JSON string to send :" + JSON.stringify(postArgs));

	isRqFinished = false;

	$.ajax({
		type: "post",
		async : true,
		url: url,
		data: JSON.stringify(postArgs),
		dataType: "json",
		success: function(TdJson){
			
			log(2, "success -> " + event + " :   " + JSON.stringify(TdJson));

			if((TdJson != "\n\"\"") && (TdJson != " \n[]")){
			 	var SetParam = {};
				$.event.trigger({
					type : event,
					cmd : cmd,
					EventData : TdJson
				});

				if(TdJson != null){
					delete TdJson;
					TdJson = null;
				}
			}
		},
		error: function (xhr, status, error){
			log(1, JSON.stringify(xhr));
			
		}


	});
}






function showBatterySegements(value, setClassRed, batState){
	

	if(typeof isClassRed == "undefined"){
		isClassRed = "-.-";
	}

	if(setClassRed && (isClassRed != "yes")){
		$('#Battery_80').addClass("red");
		$('#Battery_60').addClass("red");
		$('#Battery_40').addClass("red");
		$('#Battery_20').addClass("red");
		$('#Battery_0').addClass("red");
		isClassRed = "yes";
	}
	else if(!setClassRed && (isClassRed != "no")){
		$('#Battery_80').removeClass("red");
		$('#Battery_60').removeClass("red");
		$('#Battery_40').removeClass("red");
		$('#Battery_20').removeClass("red");
		$('#Battery_0').removeClass("red");
		isClassRed = "no";
	}

	if(value > 4000){
		if(batState != ">4000"){
			$('#Battery_0').removeClass("blink");
			showHTML('Battery_80');
			showHTML('Battery_60');
			showHTML('Battery_40');
			showHTML('Battery_20');
			showHTML('Battery_0');
		}

		return ">4000";
	}
	else if(value > 3800){
		if(batState != ">3800"){
			$('#Battery_0').removeClass("blink");
			hideHTML('Battery_80');
			showHTML('Battery_60');
			showHTML('Battery_40');
			showHTML('Battery_20');
			showHTML('Battery_0');
		}

		return ">3800";
	}
	else if(value > 3600){
		if(batState != ">3600"){
			$('#Battery_0').removeClass("blink");
			hideHTML('Battery_80');
			hideHTML('Battery_60');
			showHTML('Battery_40');
			showHTML('Battery_20');
			showHTML('Battery_0');
		}	

		return ">3600";
	}
	else if(value > 3500){
		if(batState != ">3500"){
			$('#Battery_0').removeClass("blink");
			hideHTML('Battery_80');
			hideHTML('Battery_60');
			hideHTML('Battery_40');
			showHTML('Battery_20');
			showHTML('Battery_0');
		}

		return ">3500";
	}
	else if(value > 3400){
		if(batState != ">3400"){
			$('#Battery_0').removeClass("blink");
			hideHTML('Battery_80');
			hideHTML('Battery_60');
			hideHTML('Battery_40');
			hideHTML('Battery_20');
			showHTML('Battery_0');
		}	

		return ">3400";
	}
	else if(value <= 3400 ){
		if(batState != "<3400"){
			$('#Battery_0').addClass("blink");
			hideHTML('Battery_80');
			hideHTML('Battery_60');
			hideHTML('Battery_40');
			hideHTML('Battery_20');
			showHTML('Battery_0');
		}

		return "<3400";
	}
}







function control2image(id, control_id, control_trigger){
	var control_image = new String;

	switch(control_id){
		case CONST_CTRL_SwitchFixedOn:							control_image = "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"; break;
		case CONST_CTRL_SwitchFixedOff:						control_image = "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"; break;

		
		case CONST_CTRL_StickLeftVert:					control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHgUExURVx6mZmZmf///9fX19fX19fX19fX15mZmdfX19fX19fX19fX15mZmdfX15mZmdfX15mZmdfX19fX15mZmZmZmdfX15mZmdfX18HBwdfX19fX15mZmdfX19fX19fX19fX15mZmdfX19PT09fX19fX19PT09fX1wAAAAIDBAMAAAYBAQkBAQoNEA8CAhUCAhwlLx0nMR4DAyArNiUxPSYyPyc0QSk3RC0FBTAFBUFWbEIICEJYbkNZcEUICEZGRkZddUhISExMTE5OTlEJCVJtiVNvi1RwjFZWVlcKCllZWVx6mV17mV17mmJ+nGN/nWWBnWiDn2mEoGqBmXJycnKKpHR0dHaOpnePp3x8fHyKmX4ODn5+foCAgIEPD4OYrYQPD4WPmYWZrYaaroqdsI6OjpMREZYREZkREZmZmZmouJqampqpuJubm5ycnJ6enp+fn6GhoaSkpKUTE6Wlpa4UFK6urq64w6+vr7CwsLC5w7EUFLGxsbG7xLO8xbQUFLS9xbW1tbe3t7u7u7+/v8AWFsHBwcLCwsPDw8PIzcTJzsbKzsjIyMrKysrN0MvLy87OztDQ0NDS09PT09TU1NXV1dbW1tfX194ZGeEaGuQaGuobG/AbG/McHPYcHPkcHP8dHXSd5sAAAAAndFJOUwAAAAMMGx4kJC0zOTxIS1RdXWZpdXiZmay0t8DS3uHk5+3x8/b3/O0f4rkAAALjSURBVFjDzdb3X9NAFADwtAruvRduyqxUy54VFIwotMWNogj2KtqKBSkOQEQRBazanlBG/lWTuzTNaptczs/H90te0uT7SXPv7h5jt9sLIY5fAHwX0yGWjyGYPUDGYHgVatUga4A1rRpizatGWALVAEui5maJ1JwsmYrZIG1VYDOj8CWhCoNZUPiKVM0aUxZUNGT1F+rRUfHL7+gLS2pt+dvyWo2aOQypbcUT3ERxG2XV3cdxXJ+brlrVwQnRUUVRhf6aNaSu1fghNXXAucThWHIO0FLflcxwqZgpGdOfuKbVa8+4dATaKanRyw6HA5H80TNKR41F+IdElc8iMRrqYhgoVBBetK7GQkClglDMqpqIAI0KIgmL6jTQUcG0tJKhmyZ9132TJtR4GDNNLqS6mvBpKC5XP6DsjXF1FistjatIXW1swRdm5WoPynqMq1Fk9LpWxDmw4upFV6JytRNlncZVdD9bOShNrcFKNqVJKssqU5TkVsuWJXW5jJpatC6p60X/+bu604tW4BIFFdfAA2dSRJPOu9oakKmm6tVTh9lknQdf+GKpsuIhkXUi1enRm1umZ4GhdeC92RkLE8M66rBqzRr3sb7xf7e+LvR7vf0LQvY5x14wr9kL5jPtBXNdwqfo+grhR0Bv33qCS+wR/PE8d0846jG4x97E6g1hjHOq7QGD/UAm9TwAhzXPjBntXaQvsKj8AmcA2L63UNtn/cneZ4nqNzxac0Jnr1ZtO86qn7pVLfaE1X6YReUrq7sbV9YnjWrbUqDpX1uR2krWv2LVln9c02vf59GHhL22qNo2HlWpVytGuJGKK9ZU24ZDqrW7ofR1aQNrUbUxB1Q7QvPFZta6yuw6B8ni51Mvy6rUnSmV2XaaCE3cEf6SSt0tqczmAlOcuKQ/ZnXU/WmVyT9BoN7TUw/KVCbvJKV3PSZXma3mhyxxW0c9pVCZPQQ1oKOCTQqVOUJWXmp1n1LNIyvbv0/n2RGSufX/AAAAAElFTkSuQmCC"; break;
		case CONST_CTRL_StickLeftHori:					control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJJUExURVx6mZmZmf///9fX19fX19fX19fX15mZmdfX19fX19fX19fX15mZmdfX15mZmdfX15mZmdfX19fX15mZmZmZmdfX15mZmdfX18HBwdfX19fX15mZmdfX19fX19fX19fX15mZmdfX19PT09fX19fX19PT09fX1wAAAAMAAAUHCQYBAQYJCwkBAQkJCQ4TFw8CAhAWGxICAhUCAhgDAxsDAx0nMR4DAx4oMiIsOCQvOyYyPycEBCg1Qyo4Ri0FBTMGBjYGBjkGBj8HB0BVakIICENZcERacUZGRkdHR0gICEhISEpKSksJCUxMTE1NTU9pg1EJCVFRUVZWVlZxjlhYWFlZWVoKClx6mV17mV17mmALC2BgYGJ+nGNjY2N/nWVlZWWBnWhoaGiDn2mEoGqBmW1tbXJycnKKpHR0dHaOpnd3d3ePp3gODnp6ensODnyKmX5+foKCgoOYrYQPD4WPmYWZrYaGhoaarocPD4qdsIuLi40QEI6OjpAQEJCQkJWVlZYREZkREZmZmZmouJqampqpuJubm5wSEpycnJ6enp+fn6GhoaISEqSkpKWlpasTE64UFK6urq64w6+vr7CwsLC5w7GxsbG7xLKysrO8xbS9xbW1tbcVFbe3t7u7u729vb6+vr+/v8AWFsDAwMHBwcMWFsPIzcTJzsXFxcbKzsjIyMkXF8rKysrN0MvLy87OztDQ0NDS09IYGNPT09TU1NbW1tfX19gZGdsZGd4ZGeEaGucaGuobG+0bG/AbG/McHPYcHPkcHP8dHcZJD2gAAAAndFJOUwAAAAMMGx4kJC0zOTxIS1RdXWZpdXiZmay0t8DS3uHk5+3x8/b3/O0f4rkAAALsSURBVFjD7dfpVxJRGAfgGUvb932zXcwoQmkj2zfTspUmW00oy/aVdu2SlZTYomVmgW1aAdEyt9KAmr8sZmMdmDuX4UPn9Pt0OXCeM1ze994XIisrKw/y+QrAB2FZT4VSD1MHJA0RUmGiaqMQWMUqEqtcRWExVAQWR5VnsVRZFk/lWZvaKssmR+FdTBXaUqDwHq6aMs/TUKnoxLzzrfl2BtTk+a+mUwP/oBqqJAyV7mrl9rS1i1ZNpV12ADgVALuLVkf1OdheEVQAHD41VK8dxKjA7k1f9TWAOBU0+NJTH2976AAJKnA0m57gq1cKbupu8NCJxbM1sxbVCGx5nfYijHRam2WXpQ1VPVz0lhHUTYV3/EzgvqGUV+cEPhoOhdVn3OoRmrpneTcjqOWrfjFsAhtLBZXpWVEsqtWcWo2iukw7f4ccnYaNvofhEzBwrzUBhvmz27iZVys4tQJBrc2/xMjlav5qKupICy+5hZRq17Uz8mnXr1WkljQxKHkwX9mzalHYJq2yZ4X2kuOy6MmF65TtK4Ru04ZguAZ03QLkLwzXQHCLcTsVr8rX674lP8R63brSz6HBNWVivf5ctlSk0CuLTU2oEITeKiu6/oX5Xrdgvdhbr/RHKIwuEIpWPAfOFM/TzDWeFs6BHecKrkX28KmSjmUb7ICzUeLMauw4+DpaaLFQlpbMna8eq9ls9bCrNzJ3gTvhLnAnuws6K9kPVb6D8AVQ7966wJfYWfjplvxMSDuj7lhnijt2P6/uhS+RpmLEeSCZOhOAsfizS3gHvLE7MA2AgcPzcNX3/K/VyU728So5aDrunOWxVlXxldWRoJL9ctWdX3mVzJmYCZXsPT4TKtlrTCZUkhiVEZUYMgNzeP982UxRcepgUSUGTMVC6WPsV4pTh4ZVom+u0qplc56SUEdGVCJnEoZ6SkodHaUS2ZNVetYJ0SrRX/lPRh+VUKfEqMQwjBqQUEGfGJUYl/5/Q1YdEatm45XtXwms7kJFMnkNAAAAAElFTkSuQmCC"; break;
		case CONST_CTRL_StickRightVert:					control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHUUExURVx6mZmZmf///9fX15mZmdfX19fX15mZmdfX19fX15mZmdfX19fX15mZmdfX19fX19fX19fX19fX15mZmdfX19fX19fX19fX19fX19fX15mZmdfX17W1tdfX15mZmdfX17m5uZmZmdfX15mZmZ6enpmZmdfX19fX15mZmdfX15mZmdfX1wAAAAIDBAMAAAYBAQkBAQoNEA8CAhUCAhwlLx0nMR4DAyArNiUxPSYyPyc0QSk3RC0FBTAFBUFWbEIICEJYbkNZcEUICEZGRkZddUhISExMTE5OTlEJCVJtiVNvi1RwjFZWVlcKCllZWVx6mV17mV17mmJ+nGN/nWWBnWiDn2mEoGqBmXJycnKKpHR0dHx8fHyKmX4ODn5+foCAgIEPD4QPD4WPmYWZrYaaroqdsI6OjpMREZYREZkREZmZmZmouJqampqpuJ6enp+fn6CgoKSkpKUTE6Wlpa4UFK6urq64w6+vr7CwsLC5w7EUFLGxsbG7xLO8xbQUFLS9xbW1tbu7u729vb6+vr+/v8AWFsLCwsPDw8TJzsbKzsrKysrN0MvLy83NzdDQ0NDS09XV1dbW1tfX194ZGeEaGuQaGuobG/AbG/McHPYcHPkcHP8dHRgBBb4AAAAsdFJOUwAAAAMJCQwSEiQwP1RXYGNseH6Hh4qNmau3wMDBydLS2tvb4eTn7fP29vn84P1PsAAAAttJREFUWMPN2Odb00AYAPCkuHDj3ntbZqRa9qygYEShBRciCPZaWrBgiwNERRBqbSOUkX/W5JKOyyXNug++X3K55+nvSS/v3fs+oYBmcIVjnBViXL6ZBN8y84ccDgdlVYUoG8DVIzZUFCWkKlAyqhIlomIoCRVHSagBDDWuBrlCLIoaVycKvK2AAjWuxjgTYVCdiCaRn8EX1HSnCV71VYMPI2INVR+rGkirnWWz/GxZJ2HVPcTz/JCbrFrbzYvRXUtQ5frrN6G6Wd/PEVNHmVVeilVm1LyqvlU/lS/wmVgojxJSH73jc+HvIqTG7judTkgKV880GTUREaZlVRhFEiTUeBggKgjH7auJEFCoIJSwq6YiAFNBJGVGnfM99s3lTilxMA9UVDBvQv0CrQ/5ajIsMa0uqLpapdtQ0rg6AK2BfHVRUtpbNqC60dIuTSwaV3ug1ZOvxqAx6FqX98C6axCvFUqVRdaQZdFhdqpmLLu1xmpYrCJYVCvXsupaJTG1dCurbpX+58/qzh1a/nv6Kl5KFaqUA6+YtIymmef6OaCbWXK+eholNt3okSZ+2toFyZDMMlBlPOb31md8xxI4B7gZH+ubUZxZkyrqZOEz64c4WhnxekdWCJ6v4CvHLfWK/7Z3SasWLGO1YFmvJwz+5oalfBomV7fEdX8qqU+0a+y0x1yNNaZ2+c31AyAY118BLlq4dzl/BVzQelu/tFWhz/qr3Wed3HEOnEHU71Jm9fVpZxaMZ3VyT1iH9YTHi2ilarx/7YBqB9a/ltC0dZV1vxTQ18pe++Ze2pb6sHqKn6p+gKrX9tD2VLa54n1FM3peXyqm7aps2902tAqc3UVJ6kWFyrLet384a3FiOyWrlzFViJQl9ChFZdSrauobY5+F0DhI5dRbauoL8+rt/VRO3QkIPesBKk/dDcis6zEqX92nqppGTxch6mFgLV/RuF5MIeopImoJhajbbijUf8thlmy0RePWAAAAAElFTkSuQmCC"; break;
		case CONST_CTRL_StickRightHori:					control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJDUExURVx6mZmZmf///9fX15mZmdfX19fX15mZmdfX19fX15mZmdfX19fX15mZmdfX19fX19fX19fX19fX15mZmdfX19fX19fX19fX19fX19fX15mZmdfX17W1tdfX15mZmdfX17m5uZmZmdfX15mZmZ6enpmZmdfX19fX15mZmdfX15mZmdfX1wAAAAMAAAUHCQYBAQYJCwkBAQkJCQ4TFw8CAhAWGxICAhUCAhgDAxsDAx4DAx4oMiIsOCQvOyYyPycEBCg1Qyk3RCo4Ri0FBTMGBjYGBjkGBj8HB0BVakIICERERERacUZGRkdHR0gICEhISEpKSksJCUxMTE1NTVEJCVFRUVFsh1ZWVldzkFhYWFlZWVoKClx6mV17mV17ml5eXmALC2J+nGNjY2N/nWVlZWWBnWhoaGiDn2mEoGqBmW1tbXJycnKKpHR0dHd3d3gODnp6ensODnyKmX5+foKCgoQPD4WPmYWZrYaGhoaarocPD4qdsIuLi40QEI6OjpAQEJCQkJWVlZYREZkREZmZmZmouJqampqpuJwSEp2dnZ6enp+fn6CgoKISEqSkpKWlpasTE64UFK6urq64w6+vr7CwsLC5w7GxsbG7xLKysrO8xbS9xbW1tbcVFbm5ubu7u729vb6+vr+/v8AWFsDAwMMWFsTJzsXFxcbKzsjIyMkXF8rKysrN0MvLy83NzdDQ0NDS09IYGNXV1dbW1tfX19gZGdsZGd4ZGeEaGucaGuobG+0bG/AbG/McHPYcHPkcHP8dHVRBwvgAAAAsdFJOUwAAAAMJCQwSEiQwP1RXYGNseH6Hh4qNmau3wMDBydLS2tvb4eTn7fP29vn84P1PsAAAAuhJREFUWMPt2PlbEkEYB/ABu+y2+77vIKMIJcvu00rLTtrsNKHM7kw7TBuwxMBKLTMLrLRSomIrDaj904I9YA9gZ5epn/r+tLsPfJ55Zt95Z54FMGnI1KknIqlnb1zQwz0fo9VqgVqVRgm7VB2XhipEMakiFI8qRrGoEhSHKkVxqHYJiq46yFSsEEVXG1O8LbsIRVdbSAVBVBubvwr+RvAjryIO5r/6d1SFNfBvVPlNAKca6G6j57StO4BNDXidENIqhE5vAI/qd0fXG6tC6PbjUH1OKFCh05e+6m+AIhU2+NNTmw89cUOJCt0tlmfoarvtmK09vprI29n3jfcY6NLa5bplaypYtrjOcBNVfUFbT2Pq+dx3FKvuy3kQpEKPzIWMuiL00XwOUS2nrXJO3bC5j2LV4m0/qWhCewtZlerfchxNLaHVEkY9mH/0V8Qx6qIx9VNMQmb6XheiqN8nLK8Sq0R8DuOtib7crq+m5HJHX6tMLTB2UPLpMD1UpOY1USh5vFPZWA0obJNB2ViJgryLsujl3U6EGuCrxOH8PeFYDRj7WCiYE6uB8H7LB8WVRRAb133n6vXA1iCNhncUcfX6Y9MpVauAqIgUAru2inJrvlDf6lbv4tbWG9MFxLX1XLRiyVp9NdcHrq1fpVuZf5XtA0euZ99F7i6tNsLWyn/gPeNxJehZrs6zb1P0rM7oVW+V1VrVi7G/wpck2VUa/X1pV7K9oEeyF/TInQkdn8hKpp4q8e1bEL4mTzPqyRR7rIe3x3rk91g0Vel5ADp88jMgl5nz4Kxkb+u9WnXyoBlwmkD1MpVVVpa8suQyMUMjVtM/v2ZpNNjVxcM1+NUFwzT41TmZGvzq9CGAUWeLVIKw3vqs8tw+aSBg1bkSNZKAKnQ8AJw6P5F6A+2zkDCjQVxdkki9olxdOhLE1cEQ01hHAZ46FOKZ1wmAr45IqCpGp2YI1LFQXb0KszATCNQpWNQsIFAHLBKpfwBlqb8esEVGXgAAAABJRU5ErkJggg=="; break;

		
		case CONST_CTRL_RotaryLeftUp:						control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE7UExURVx6mZmZmdfX1////9fX19fX19fX19fX19fX19fX19fX19fX16+vr9fX19fX19fX19fX19fX19fX19fX19PT09fX19fX19fX19fX19fX19fX17a2ttfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX16amptfX19fX19fX19fX19fX19fX15ycnAAAACYyPy08TFNvi1lZWVx6mV17mmN/nWpqam1tbX4ODoEPD5mZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaWlpaampqenp6ioqLCwsLGxsbKysrOzs7W1tby8vL6+vsLCwsPDw8XFxcjIyMvLy8zMzM3NzdDQ0NPT09TU1NbW1tfX1/8dHd4WZWsAAAA8dFJOUwAAAAAGCQwPGBseJzMzNjxFSEtXXmBjZnJ7foCBhIeNk5mcn6KlqKu0t8PGzM/S2Nvh5Ofo7fDz9vn8/oi2bBEAAAIASURBVFjD1ddpV9NAFIDhCkgKCLLHBcUimwiKRcGlyqCQXFkCBQShNFYLufn/v8BpSduETibJ5HqOvB9y8mHynDQzyZxmOv9FmVumdiiX7R/UdX0yl8vNLfLeoJea2t0/NjG9uIJhJVd7R569wogSqpr+EmOUSM3m1hCJVe3pe8TE6h1pdx+8Q6RWx/My5U+lll1qFE8dWBJiv88Oi8V9aC+Omp0R32FlG0KKVrsehk38MSirw8uhT3NXVc3OSuYIFNXxVSRX+xbkqzKpmuF1TXxAcvX+68bFG7UCJ6qqNtW6mEwd8X+QidTeeTF28ySRqq8hudrzIvSHq6ujq0iu3nvrILn6+NMxUqvazAn8pFaH8ngE57Sq9pyPtuBCoLYXVx2qb3bfweZHVvD6vP41lfqo8Qr+4seC62V++ZZGfXI9+Cqomqyc5ks44I26DKiRaIQ6JVQNZqdS80I1mpWrH8VqJCtXsU01zThsQtVkLA6bSGV89st+1t6y06vlTb6kfKzNDJZeva7FMsMtUKkt1nAJ1Sbrkqo+VqzuKKktVqweqKl89mXqmZLaRN3ChldAvfqxraBuGa5Ulf/fCr/X5l5DqPq2k1uiqvTfqnwlKaiOfVp/pqe2Q6Y6JQugrgJYJYdGrRZr74qnAhSrFGrFgoAKViW9Wt2DGyrsVWOofwGdVoIChvGRaQAAAABJRU5ErkJggg=="; break;
		case CONST_CTRL_RotaryLeftMiddle:					control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG5UExURVx6mZmZmf///9fX19fX19fX19fX15mZmdfX19fX19fX19fX15mZmdfX15mZmdfX15mZmdfX19fX15mZmZmZmdfX15mZmdfX18HBwdfX19fX15mZmdfX19fX19fX19fX15mZmdfX19PT09fX19fX19PT09fX1wAAAAQEBAUFBQYBARgDAxsDAygoKCg1QysrKzA/TzkGBjwHB0NKUFNTU1ZWVlx6mV17mV17ml5eXl5ncWJ+nGMLC2NjY2Ntd2N/nWWBnWYMDGiDn2mEoGqBmW1tbW9vb3KKpHaOpnePp3yKmYGBgYOYrYSEhIWPmYWZrYaaromJiYqdsJKitJOktZamtpent5kREZmZmZmouJqampqpuJubm5wSEpycnJ6enp+fn6GhoaSkpKWlpaysrK64w6+vr7CwsLC5w7G7xLKysrO8xbS9xbW1tbe3t7rByLu7u7zCyb29vb7Ey7+/v8HBwcLCwsMWFsPDw8PIzcTJzsXFxcYXF8bKzsfLz8jIyMrKysrN0MvLy8wXF87Ozs7Q088YGNDQ0NDS09PT09TU1NTV1tXV1dbW1tfX1+QaGucaGvkcHP8dHbljg3MAAAAndFJOUwAAAAMMGx4kJC0zOTxIS1RdXWZpdXiZmay0t8DS3uHk5+3x8/b3/O0f4rkAAALDSURBVFjDzdf5XxJBFADwxdLu+77s1kQ7KNygMA8wuywp0ydmkJiYWZl2mJoHHXSwo+xf3J4wu8zC7Ax8Pr2fZt4OX4adtzOLUFNT04D0+A2wbDSHRSWGUekAxxAUFRWrQyIF61qlYt2rNCyDSsGyqAZ7wwL1cqsaeyl0DcsEQ0FuVWGv+HIXsERTznebW0W3mtfkRqzfKK81R/O952zquPezbFPlRe+42XvBprYOyoqKh9IfbDUvv2FSgyGZFPkV+5N65l7t9eWIas53v8wGgUqol7/J5Ph5kUN1nOtVnrmiYCdR7QwiHhX5Rwg1MOJHfOqYd5FQr2OcKoq2rNvU9ZYoYetyp6JuX65JWpjUdq/JBUnZB7oRv6qsmD8BoKkACT9ppRjUTJv6rBgqQFumEmo6ARYVEml+NRMHmwrxDK8qJaFIhaTEqU4DQYVp9ZKW0QZNRa5Hplyo2QRRjWdx9bXWekmvzplOrH9Wmu2Pmd05XO3RWj30aspE9eyyyaZwNaC1AvSqaMSAYQyZCVwtpLAcjbpkjF+qqPrXHB/4/+f61Bg/UBGVqgYw1W29Pnn3432hXj9xVVY2TvFsuX4KqPaBV26fWCSNEtRR2541EREjE9XbX1f7wuG+VbX1scxZsFJ0Fqw4nQXzHeqgji8IvYWy51bSoiadz61Heok9QN9jZVUkzWBn7IyEHNV2Xb2prnFZVXEL7wNOf5BKqecBDiP3Yb8DaesdOAOwfW8Dq/pVX6159c3ernp2nGVUlcrq6tIr60OR6tlSb/2QiAflFxWrnrrj1VA9G49WQ/VsOFQN1SMcqIoq7DqH2OLX47Ao2tSdpipsO82ESnfVn2RTd+dVYXO926pV46FIUPcXVKHuBIN6j6QexFSh9mSF5noMV4Wt7pdMukNQT1lUYQ9DDRBU2GRRhSNs5WVX91nVWray/Qe0eekoOZFUQgAAAABJRU5ErkJggg=="; break;
		case CONST_CTRL_RotaryLeftBottom:					control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHFUExURVx6mZmZmf///9fX19fX19fX19fX15mZmdfX19fX19fX19fX15mZmdfX15mZmdfX15mZmdfX19fX15mZmZmZmdfX15mZmdfX18HBwdfX19fX15mZmdfX19fX19fX19fX15mZmdfX19PT09fX19fX19PT09fX1wAAAAUFBQYBARgDAxsDAygoKC4uLjYGBjkGBjwHB01RVVFRUVNTU1ZWVllZWVx6mV17mV17ml5eXmBgYGJ+nGMLC2N/nWVlZWWBnWYMDGhtc2iDn2kMDGmEoGqBmW1tbW9vb3KKpHaOpnePp3yKmYGBgYOYrYWPmYWZrYaGhoaaromJiYqdsIuLi5KitJOktZYREZamtpent5kREZmZmZmouJqampqpuJubm5wSEpycnJ6enp+fn6GhoaSkpKWlpaysrK64w6+vr7CwsLC5w7GxsbKysrO8xbS9xbW1tbe3t7rByLu7u7zCyb29vb6+vr7Ey7+/v8HBwcLCwsMWFsPDw8PIzcTJzsXFxcYXF8bKzsfLz8jIyMkXF8rKysrN0MvLy87Ozs7Q088YGNDQ0NDS09PT09TU1NTV1tXV1dbW1tfX1+QaGucaGvkcHP8dHRtaN7kAAAAndFJOUwAAAAMMGx4kJC0zOTxIS1RdXWZpdXiZmay0t8DS3uHk5+3x8/b3/O0f4rkAAAK6SURBVFjD7dfpc9JAFADwBG297/uqdymoFLVG8CoWqFVRadVq+6AqKFq01qutR+3douJB1sLfazZHN4EAmyXM6IzvC0uy85uwebvvwTkcjmakxA+AWXU4IEgxgCoHlA1OUlGpGhMoWMsqFWtdpWEZVAqWRa3OMqlVWTZVYWN2q5gtj6JHjCqKVUDRY1a1YryqQRX0YbjzM/2gDmr5+K/WkgP/jBo9ESUbl0EVJ4fkNR2aFMlFv2fO42dXxdEkgKwCJEdV98WZC/lCPtA2yKhmU3ivqCpAKosv3nHdK+Dod/UwqZkkGFRIZhC64v5UUGLK3cmgZhNQpEIi6/f8Lmix2Oq3rIopKFHhkrSkJPKBiFX1LZiocKrF6XTKpPTZ4h8Onw0PW1BzSVM1kUNIVaVJL+V7z+jVcc2J946JY71x7eu4Xu2S1S56Na2hytVZjU3rVZ+s+uhV7aDqU0ZqJZdPLqLqDjMyoFFn1Pkztqq/tPm+v/9Z76vz+2xRqXLAtPTQ5evdN1/fkXz9WFNm5RIUe8vyLqA6B05a3bFIfGKingsazqzg5bAQfm7D+epdJOerl5yvC92hUPcCHn2oUgvmS2rBPEKd7ikVnTtGasFEO57U/hmh18BUt3pc/TL60BUldeuWkmI30Jd49Z5QHNHV2BG1xg62BaQaGzz9VFdjLyrqefyOmfuB1m9eYz9QTj0KsJO6d4kcjxh7l6UVyBhX4BDA2s3NlpsqVZ1W3tYE7uyLVX7dYUZVyqyODiWz3peo/Kome/tXReUb99ZD5ZfvrofKL9tRD5XnttVF5TYcYWzev98OCUKRul5TuTUHmVDxGv5JRerGJZVb2WQ1a3HcFEzUrUTlGvcxqNfN1O06lWvYb9Oz7tGr3Grrr0y8aqIeMKjcJoYcMFFhhUHldtX+3xCrW4xqA1va/gGi1SOnDKemCQAAAABJRU5ErkJggg=="; break;
		case CONST_CTRL_RotaryLeftBottomBottom:				control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGtUExURVx6mZmZmf///9fX19fX19fX19fX15mZmdfX19fX19fX19fX15mZmdfX15mZmdfX15mZmdfX19fX15mZmZmZmdfX15mZmdfX18HBwdfX19fX15mZmdfX19fX19fX19fX15mZmdfX19PT09fX19fX19PT09fX1wAAAAUFBQYBARgDAxsDAygoKCsrKzkGBjwHB1JSUlNTU1ZWVlx6mV17mV17ml5eXmJ+nGMLC2N/nWVlZWWBnWYMDGiDn2mEoGqBmW1tbW9vb3KKpHaOpnePp3yKmYGBgYOYrYSEhIWPmYWZrYaaromJiYqdsIuLi5KitJOktZamtpent5kREZmZmZmouJqampqpuJubm5wSEpycnJ6enp+fn6GhoaSkpKWlpaysrK64w6+vr7CwsLC5w7G7xLKysrO8xbS9xbW1tbe3t7rByLu7u7zCyb6+vr7Ey7+/v8HBwcLCwsMWFsPDw8PIzcTJzsXFxcYXF8bKzsfLz8jIyMrKysrN0MvLy8wXF87Ozs7Q088YGNDQ0NDS09PT09TU1NTV1tXV1dbW1tfX1+QaGucaGvkcHP8dHepjae8AAAAndFJOUwAAAAMMGx4kJC0zOTxIS1RdXWZpdXiZmay0t8DS3uHk5+3x8/b3/O0f4rkAAALLSURBVFjD7djpU9NAFADwpAre931fCBS0ArEVOVrAW6oivBaxlSJFREXwQEBOtajNQvM3m6NpN+km2WzCjM74Pu2mm99kdt++TcoFAoFapMVPgMVic1CQYxDZB1gGJ6uoUk0IFKxrlYp1r9KwDCoFy6I6s0yqI8umamzCb1VhrVH0nFFFCRsUvWBVbeONB1XAw/DLr+yzTVCt47/qJQf+QVXOJAZVnBtX53R8TvRNFafSAKoKkJ4S/VFzGWWvFFWATM4PdSUNBhXSK97VXApMKqRyXlUxAxUqZESP6iQQVJgs7Th10ETsemzChZpPE9VUHldfq62X9OqM7iT7psXpvqTencHVHrXVQ69mdVS7uqizWVwNq60wvaoXqv6ikcAqV0nFilm5QaMuFMcv+Kr+1seH//5nfVoc3++LSpUDxKOHLl+fvPv+vpyvnzxlVj5Fsbdc7wKqOvDK7Y5F4jBBHTbVrLGYEBvbvPq63BuN9i4rrY8OZ8FSxVmwZHUWzLYrg9q/IPTW8e0t12ZQ26zPrYdait1D35KOaqS1CTtjm1ojlupNTb2hrLGD2h0q1GPvA/WFULdb9TLAceMNjxvWpTqsXyetN8SdZmDFOAMXAXYfrMXGjwY/SyZVmg+OktWv2mrNKm/2ZpXfc6k8vmVAklU85P5Ai2VmdXZqmfWhQuV3nC2vlEQK0orZ7AJN5atPa937oQJRLYTuMqj81pNq9+qqRI4fV1hUfssx22e9xvSsPM8dUee1g6h2MM2ronL7auQLzUOEHBhqtgXXHkUFwaTu1VVu1wWERoLzhHwdsUPF20rWmtT9JZXbLmdYvHHDpG40xm0/6x8IBPVwWeWqzyDUJdcB7Fa5DnTZ/1lwh6QexVSu6pyyYvjaRKxXyu5ZT+Eqt1NeMmMWOeaUeIugnjeo3AH3X19rBBW2GVTuhPdvQ0U9ZFSrapjUP6bhnRFZ5L8FAAAAAElFTkSuQmCC"; break;
		case CONST_CTRL_RotaryStickLeft:				control_image = "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"; break;
		case CONST_CTRL_RotaryRightUp:					control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE+UExURVx6mZmZmdfX1////9fX19fX19fX19fX19fX19fX18TExNfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX162trdfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX16mpqdfX19fX19fX19XV1dfX19fX19fX17Ozs9fX19fX19fX1wAAACYyPy08TFNvi1lZWVx6mWB9m2pqam1tbX4ODoEPD5mZmZqampycnJ6enp+fn6CgoKKioqSkpKWlpa+vr7CwsLKysrOzs7y8vL29vb6+vr+/v8HBwcPDw8TExMXFxcjIyMrKysvLy8zMzNDQ0NPT09XV1dbW1tfX1/8dHZW2YZcAAABAdFJOUwAAAAADDA8VGBsdHiEkKjAzP0VIS1FXWl1gY2Z1eH6Eh42QlpmfoKWorrG0t7rAzM/S297k5Ofq6+3w8/b2+fwVg2s4AAAB/UlEQVRYw9XX/VfSUBjAcUpADQpMUYPKFMzX1NJ8oTfMlY4HGTpfUVohxbP//x/wbgwYuzDG7r2n+v60jXM+h3Pv3b1ngSERBf4nFRt9XjdbymTmUqnpeOyh/2wq3fqbTOrpY95qo73lF2NB7qpRNh0XoJLeJkSoiGsxESrifOSBa3a13OxH1ejOhf00E/KqAl1RVdXLX93c7aR/1axQ6T5t40wqqD3GYfUJi3rca3i/pMP+Veg9bTuTIlTElagIFT88DwpQETdiASMG9ZtRx4Uxa7MhASri5oQIFXFxZHCVxqiLbFKESt61UREqZqdEqIhLj0So+PG1CPUKtob5qz+hsJvgrv4GuMOF8IAqneOnAmiI78eZ1YP9nJVEbhW4NZ5mQmzq96953SpHbktwYz5+F2XbCStS3qaewLV1Co+y7a8t1lBPmyousqmaJHdTMcKitlCn+oxBbaNO9aV/tYnm85T6yrfaQiUyZRxU7UizoxWyEiR2VZIlzYaSBXZYYVdzuizZUStmVZdplIOq06h3teCqdqLe1ZKb6kC9q+duKlkJftTS2R967yc1R8DBOlWPH1tOVZePOKrtc4Xnf+1x6PxTap/+jtr/wOKp1rULc0wvtDo3tV5WAEwVQCnX+ag11XjfLJV8ONd4qFUFOlRQquxqrQgOFYo1V/Uee0mRVeWDBGQAAAAASUVORK5CYII="; break;
		case CONST_CTRL_RotaryRightMiddle:				control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGwUExURVx6mZmZmf///9fX15mZmdfX19fX15mZmdfX19fX15mZmdfX19fX15mZmdfX19fX19fX19fX19fX15mZmdfX19fX19fX19fX19fX19fX15mZmdfX17W1tdfX15mZmdfX17m5uZmZmdfX15mZmZ6enpmZmdfX19fX15mZmdfX15mZmdfX1wAAAAQEBAUFBQYBARgDAxsDAygoKCg1QysrKzA/TzkGBjwHB0NKUFNTU1ZWVlx6mV17mV17ml5eXl5ncWFrdWJ+nGMLC2NjY2N/nWWBnWYMDGiDn2mEoGqBmW1tbW9vb3KKpHyKmYGBgYSEhIWPmYWZrYaaromJiYqdsIuLi5KitJOktZamtpent5kREZmZmZmouJqampqpuJwSEp6enp+fn6CgoKSkpKWlpaysrK64w6+vr7CwsLC5w7G7xLKysrO8xbS9xbW1tbrByLu7u7zCyb29vb6+vr7Ey7+/v8LCwsMWFsPDw8TJzsXFxcYXF8bKzsfLz8jIyMrKysrN0MvLy8wXF83Nzc7Q088YGNDQ0NDS09TV1tXV1dbW1tfX1+QaGucaGvkcHP8dHSMQGxUAAAAsdFJOUwAAAAMJCQwSEiQwP1RXYGNseH6Hh4qNmau3wMDBydLS2tvb4eTn7fP29vn84P1PsAAAAr5JREFUWMPN2PlX0zAcAPB0eOGN933fIgOP6aibCgIbogioCGGwsSEgojhROeSYx3QNrP+yXdeuSZvSLonv+f0pSZPPy0u+SfYGoGugjWNY1mLYqKRh1mzfFwgEAKuqo/KQUz3AoZKoINWGilHtKKPaTaAP7CibGm2JYrV7LbdsKJP6JFRswIgbxdAdEvWvJipDXjauqfUYUa+uNT5EbOqo2W08+FW1qepicJxNnTC7NQ+qmoqHVh9sZlFHxwuVnVJpQeyfQ/U47ag7VKSqxdAzDvX2d5Uev27+i7ne5ZkrirZT1XaudUUoPELJgZEw4lPHgouUfB2rSqVcVn1N6zZ1vakP8aqoU7sHlIUp/aaaWlAaiqFOxK9qOxZOQairEKbC5E4xq/nW0nkzVAhb8yLUXAoSKkzl+NV8EtpUmMzzqkoGOlSYUapRp+P349N6STdKhRlIUeFMFeo7feQbXC2kqGqy4F/t0kd24epc5cnpn1Vm+xNmdc6/GtGtCK5OmOiy3mM5YX8raKpMrKEsk0WrSR4wWoZkrBO3umS0LAlV/5gtkf9/rq+NlgE/KpkDFJUpBzwzy8rXVx9+frTy9QvXKSgkuc/WW+eJFXAPoMm4HJ+03Vlpipre+M76XCqt9sZivasC71f4HqH5tlL/tnm3t2DF8RaseLwFMPED9ZTzqcf93coQasbz3Sqt++Oy+shVRUoWe2OzChKjaq71e4Dy1bkCOe8V8IrTF+AZt936xqoe3XIKniDUT+XM6uhwzyyvOFwj2VWfI2U8yE91kiRcvbpTEq9e2iGJV8/VSuLVk9tAWT1rU2U59uI3Yosjm4GhnneoWihM6EEATPUiTX3u728hMvYCS71GU59Wr17fDSx1KxQ01z0AU7dDMet6CODqLqpaNXq8hlD3Q7Z8JeNyLSDUY0LUOkCom67Y1L8QO7yM/4SLrQAAAABJRU5ErkJggg=="; break;
		case CONST_CTRL_RotaryRightBottom:				control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG8UExURVx6mZmZmf///9fX15mZmdfX19fX15mZmdfX19fX15mZmdfX19fX15mZmdfX19fX19fX19fX19fX15mZmdfX19fX19fX19fX19fX19fX15mZmdfX17W1tdfX15mZmdfX17m5uZmZmdfX15mZmZ6enpmZmdfX19fX15mZmdfX15mZmdfX1wAAAAUFBQYBARgDAxsDAygoKC4uLjYGBjkGBjwHB0xQVVFRUVNTU1ZWVllZWVx6mV17mV17ml5eXmBgYGJ+nGMLC2NjY2N/nWWBnWYMDGhtc2iDn2kMDGmEoGqBmW1tbW9vb3KKpHyKmYGBgYSEhIWPmYWZrYaGhoaaromJiYqdsIuLi5KitJOktZYREZamtpent5kREZmZmZmouJqampqpuJwSEp6enp+fn6CgoKSkpKWlpaysrK64w6+vr7CwsLC5w7GxsbG7xLKysrO8xbS9xbW1tbrByLu7u7zCyb29vb6+vr7Ey7+/v8LCwsMWFsPDw8TJzsXFxcYXF8bKzsfLz8jIyMkXF8rKysrN0MvLy83Nzc7Q088YGNDQ0NDS09TV1tXV1dbW1tfX1+QaGucaGvkcHP8dHe/5YvIAAAAsdFJOUwAAAAMJCQwSEiQwP1RXYGNseH6Hh4qNmau3wMDBydLS2tvb4eTn7fP29vn84P1PsAAAArlJREFUWMPt2Olz0kAUAPAN9ap3ve/7loJKUWsEr2KBWqulVavtgwotStVaD6ja+0BFSSz8wyYhIdkkQLJZHT/4vpBkdn+T2bx9bwcENYOvH8OsEMPyzShklefbXC4XIlUllI0b1R0OVBylpOpQOqoepaIaUBqqEaWhxg2odTXB12Nx1Lo6UudrxXWodXWMtxEW1ZFMEZvGaqOxavFl/qt/RrWZA39HVbdq7FKMvhr0LfqC6nNuZlxa0/EZjlx9fe1WqVwKtWdkM5cCkFSAVI4jVB97npbFGPL0iw8LaXG/ySpAukCk3vN+KVdi1tvF8/kUYCqk8gRq0PerrMRKW7CQBJ0KyYJt9YGwpGqUQrfBoEKas6NORK9HJ4KtbrdbIoXf1itgosIHG+pbaeZL4UpWeb6YMlWTRetqtzSzW6tOVVvOwCQ3OZBQbqesqwFJDWjVMQVdkEYsJMx6hV5lqxVJU5q0qlKoBuVRcbPKRazOy6Pmqao/lVGBf/9dn8mjBq2opo3EcQ40zCw1X5+8//ZRzdfPjnZBMel4b72RZl6mXAf4V1E2ejeM1azwDRN1tH7N+iReLfdFIn3Lan31r6j11U9SX+Edz093iOM7pqu9oMs7K6OLF4ResGToBUuNzoSJr3xvJZ961b7V7xmS0OeeGFHfEtf9TkW9qemxmfaQ0GPDV1/IPTar6bHZxj22hiqcB9q++4nPA5DIm6yAGD0Xe6weXQ6fgCO1vtYcrlqPvWsOwQFMzVUyq7NTk1k2Y3cTo1edn19bGIa6enYjQ189tYGhrx5rZuirB9ehinpUp7Js5NEPwnP7ntVIVo8bVCE4InQnQop60kx9aO1vITy2IlU9Z6bet6+e34xUdS1QetctSKOuBzrrugtp1U2mqm10fxOmbgeyfMXjdDPC1H1U1BaEqavO6NTfAX72frDudMYAAAAASUVORK5CYII="; break;
		case CONST_CTRL_RotaryRightBottomBottom:		control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGhUExURVx6mZmZmf///9fX15mZmdfX19fX15mZmdfX19fX15mZmdfX19fX15mZmdfX19fX19fX19fX19fX15mZmdfX19fX19fX19fX19fX19fX15mZmdfX17W1tdfX15mZmdfX17m5uZmZmdfX15mZmZ6enpmZmdfX19fX15mZmdfX15mZmdfX1wAAAAUFBQYBARgDAxsDAygoKCsrKzkGBjwHB1JSUlNTU1ZWVlx6mV17mV17ml5eXmJ+nGMLC2N/nWVlZWWBnWYMDGiDn2mEoGqBmW1tbW9vb3KKpHyKmYGBgYSEhIWPmYWZrYaaromJiYqdsIuLi5KitJOktZamtpent5kREZmZmZmouJqampqpuJwSEp6enp+fn6CgoKSkpKWlpaysrK64w6+vr7CwsLC5w7G7xLKysrO8xbS9xbW1tbrByLu7u7zCyb29vb6+vr7Ey7+/v8LCwsMWFsPDw8TJzsXFxcYXF8bKzsfLz8jIyMrKysrN0MvLy8wXF83Nzc7Q088YGNDQ0NDS09TV1tXV1dbW1tfX1+QaGucaGvkcHP8dHQMJlO4AAAAsdFJOUwAAAAMJCQwSEiQwP1RXYGNseH6Hh4qNmau3wMDBydLS2tvb4eTn7fP29vn84P1PsAAAAsNJREFUWMPt2Olb0zAYAPB0eOGN933fwkAnUDcnxwaIAipCNtjYcCCi6FA55PKYroH1r7btWpuk6bVGHz/4fmrS9vfkSd686QagbSDnGBOVGNMbOfje6D8UCoVAraqGiimreiSASqKcVArlo9IoF9WC8lCtKA81ZUG9q2nkxJKod3XCYbVSFOpdnUI+wqM6USgTr4l4uKseB/Nf/TOqzxz4O6r7IcBTlZZmtDmdWZK4qVIxC6GmQpgtSnzUUl7db7oKYb7EQ93IQkKF2Y3gaikDKRVmSkFVKQ8tKsxLftTZ5P3krLmb1Is5yFDhnA/1tfbmS1wtZ5lqpuxd7dPe7MPVhd9HzvC8ND+cNpoL3tWoZkVxdcpAV7UnVtOss4JWRWIOsaJkXBiFakTvSbEqV83qit6zwlX9afRE//2xvtB7RryozIMkcA64ZpaZr8/ffntn5uvHQLugnAm8t15ZdyyHOoCmk2JymqpZOYaac65ZH9Sr9cFEYnCdY32FbxBa7FSf71y0OwvWLGfBmts3YforGqjm04D9udVBqB2u55Y67w+r6gNbNRZvxc7Y1niMh9obqTRh3wNNlUiv6wxsuM3As+ZNuRFrN8qbzUPEE+evwAt2q/WZrRbCn2RKlZfDBazj5I5z8AyhFquZ1d1tm1nto7Ki4qG0R9vNB47XCbTq+mEWi8usMFesQRB8q48jFaZaifRr92/uFWpQ736R2fH9jnr72h5B4DnWe+pYL9ULNako1sVUu9R5PbsLVNWLlCqKiac/HNm2cUYOjLcpd05sB7p62aIqITmpk+FlRr5OInQUAEO9ylKfOP54H2rZotStFmVvHQSmeoulPnL+S6BHqQNYU6kDPej2fmCqO6H/saorFqNbBwCm7oa+51WNfrp1DODqPqbq+/fV6TpCPQz95isrrtcDQj3FRW0AhLrtBqX+AkSSYdjUI3s4AAAAAElFTkSuQmCC"; break;
		case CONST_CTRL_RotaryStickRight:				control_image = "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"; break;
		case CONST_CTRL_Rotary_ALL:														control_image =	"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"; break;

		
		case CONST_CTRL_SWLeftFront1:						control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEpUExURVx6mZmZmdfX1////9fX19fX19fX19fX19fX19fX19fX19fX16+vr9fX19fX19fX19fX19fX19fX19fX19PT09fX19fX19fX19fX19fX19fX17a2ttfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX16amptfX19fX19fX19fX19fX19fX15ycnAAAAFlZWVx6mV17mmN/nZmZmZmouJqampqpuJubm5ycnJ2dnZ6enp+fn6CgoKGhoaWlpaampqenp6ioqLCwsLGxsbKysrOzs7W1tby8vL6+vsLCwsXFxcjIyMvLy8zMzM3NzdDQ0NPT09TU1NbW1tfX1/8dHbzpm6wAAAA8dFJOUwAAAAAGCQwPGBseJzMzNjxFSEtXXmBjZnJ7foCBhIeNk5mcn6KlqKu0t8PGzM/S2Nvh5Ofo7fDz9vn8/oi2bBEAAAHTSURBVFjD7dfXUsJAFIBhVDSIFQuxKypWbNgVoweDGsWGiIgiOb7/Q5hAcIikbDbHC2f8rzLD7jcku1mGQNtvFPhjait3oZ5+URSnY7HYYkJrC4341I6e4Yn5xDba5V0ND86so0seVUFcRYY8qaHYPiKxKkwdIHpWWxxrH9lFpFajSSflvaRXLNRjU3vXLLG3/G02ew3NsaihuPU3LGXAJnc1OGq38PfArQ5s2j7NS141tOCwRsCpRveQXO1acd6VXtWAVnDisDr3JKV3QqP2bRhzU596Ke1K0vOjCrPfc+nUwYYDmUoNL2GDYaEaF55UsfYukaqdy8b9UapD3/ueTu3eUZFcHT++R2pViD/CE7UaSeIdPNOqwpw2WoGXZtXiHGBVI9Ufu3MomqeeWh9WjOpY/RV8NU8986NO1gZXTKp7zmqvMeqDVJ21UmXZp5q0UGVJkv2pR82qrK+H7EvFZjUtMbCeVSbWu8rCcqgMLI/qznKpriyfWmPT1KrO2qN4wali2gHFG17VsbwPVWrM9EnlIfMLqvP/rX+Vdw/8QVXbSRyqWsxVn2muqJKpakEBqKoASkGlUctZ/V0xVIBsmUItKWBSQSn5V8tX8EOFqzKD+gXtkyreNgGnxwAAAABJRU5ErkJggg=="; break;
		case CONST_CTRL_SWLeftFront2:						control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEjUExURVx6mZmZmdfX1////9fX19fX19fX19fX19fX19fX19fX19fX16+vr9fX19fX19fX19fX19fX19fX19fX19PT09fX19fX19fX19fX19fX19fX17a2ttfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX16amptfX19fX19fX19fX19fX19fX15ycnAAAAFlZWVx6mZmZmZmouJqampqpuJubm5ycnJ2dnZ6enp+fn6CgoKGhoaWlpaampqenp6ioqLCwsLGxsbKysrOzs7W1tby8vL6+vsLCwsXFxcjIyMvLy8zMzM3NzdDQ0NPT09TU1NbW1tfX1/8dHUV/ceoAAAA8dFJOUwAAAAAGCQwPGBseJzMzNjxFSEtXXmBjZnJ7foCBhIeNk5mcn6KlqKu0t8PGzM/S2Nvh5Ofo7fDz9vn8/oi2bBEAAAHJSURBVFjD7dfXUsJAFIBhrIkNu7FgwV6wYVfIwViisSNiNJrj+z+FSYARTGGzOV4w43+VGXa/IdndMMRa/qJYg6nN3Ik9fZIkTSeTyaWU1TaW41Pbe4YT86kd9Cu82jk4s4F1CqkK0hoyFEoVkweIxKowdYgYWm0KrG10D5FaHUkHKe+6XbFQiU2Nr3tib/kbTbsCdyyquOD9DfUz8Km+2jrmt/B3wK0ObPk+zQteVVwMWCPgVEf2kVztWg3elWHVmFVr4gjJ1d7NymTZruaCVxVmfyaTqYM7mM3YZenUzmVrSubLLuOpli9CqZJzlmjVjpXS7ZGqQ5V9T6h275pIrk6c3CG1Kiw8wBO12p/GW3imVYU5a7QKLx6qO1a13/mxO4UipTpeOYKvhOpkafBntfrzHuB8E8bLoz6qVYaC1VkvVVEiqmkPVZFlJZp67FYVez2USCq61ZzMwIZWmdjwKgvLoTKwPGp9lkuty/KpJTZHrdqsP4rnnCrmAlC85lUDy0dQ5epqPvm8P/sDNfj/1r/KuwcaULV2EodqFh+dZ/pYNMlUs6ACOCqAWjBpVEOzz0pZBdAMClVXoUYFVY+uGpfwS4VLg0H9BhOMDrfmWLI3AAAAAElFTkSuQmCC"; break;
		case CONST_CTRL_SWLeftTop1:							control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEpUExURVx6mZmZmdfX1////9fX19fX19fX19fX19fX19fX19fX19fX16+vr9fX19fX19fX19fX19fX19fX19fX19PT09fX19fX19fX19fX19fX19fX17a2ttfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX16amptfX19fX19fX19fX19fX19fX15ycnAAAAFlZWVx6mV17mmN/nZmZmZmouJqampqpuJubm5ycnJ2dnZ6enp+fn6CgoKGhoaWlpaampqenp6ioqLCwsLGxsbKysrOzs7W1tby8vL6+vsLCwsXFxcjIyMvLy8zMzM3NzdDQ0NPT09TU1NbW1tfX1/8dHbzpm6wAAAA8dFJOUwAAAAAGCQwPGBseJzMzNjxFSEtXXmBjZnJ7foCBhIeNk5mcn6KlqKu0t8PGzM/S2Nvh5Ofo7fDz9vn8/oi2bBEAAAHQSURBVFjD7dfXUsJAFIBhrEEUFVFiV1TsFRUsED0Y1CiKFRFFc3z/hzBBGAmkbDbHC2b8b5iB3W9CdrMMvo6/yNdiajt3/uCgKIoz0Wh0aV1rB6vxqd3BkcmF9V20yr0aCM9uokMuVUFcQ4Zcqf5oEpFYFaYPEF2rbbZ1je4jUquRuJ3yXtIrFmqxqf0bptjb000udwXNsaj+mPkVlrJgkbPaOWa18HngVoe2Le/mBa/qX7RZI+BUIwkkV3tX7XelW9Wn1Tl5aETSKb20J3VgqzZZ0tNeU196KQ+qMPc7mUwN1x/IRGpguR4zUavvuFLFJJKrPSsNX5xCHU4gudq3pyK5OnGcR2pViN3DI7UaiuMtPNOqwrw2WoEXE7X5HGBVQ5UfuzMoGtUT88OKUR2vPYKvxqmnXtSpn8GfBtU5e7W/OuqDVJ0zU2XZoxo3UWVJkr2pR82qrK+H7EnFZjUjMbCuVSbWvcrCcqgMLI/qzHKpjiyf+sNmqFWdtUbxnFPFjA2K17yqbU8eVKk+wyefd9k/UO3/b/2rvHugBVVtJ3GoavGhck8fiiqZqhYUgIoKoBRUGrWc05+VqgqQK1OoJQUMKigl72r5EhpUuCwzqN/WpyreOz7VDwAAAABJRU5ErkJggg=="; break;
		case CONST_CTRL_SWLeftTop2:							control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEpUExURVx6mZmZmdfX1////9fX19fX19fX19fX19fX19fX19fX19fX16+vr9fX19fX19fX19fX19fX19fX19fX19PT09fX19fX19fX19fX19fX19fX17a2ttfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX16amptfX19fX19fX19fX19fX19fX15ycnAAAAFlZWVx6mV17mmN/nZmZmZmouJqampqpuJubm5ycnJ2dnZ6enp+fn6CgoKGhoaWlpaampqenp6ioqLCwsLGxsbKysrOzs7W1tby8vL6+vsLCwsXFxcjIyMvLy8zMzM3NzdDQ0NPT09TU1NbW1tfX1/8dHbzpm6wAAAA8dFJOUwAAAAAGCQwPGBseJzMzNjxFSEtXXmBjZnJ7foCBhIeNk5mcn6KlqKu0t8PGzM/S2Nvh5Ofo7fDz9vn8/oi2bBEAAAHPSURBVFjD7ddnU8IwGMBxnK2oOFDr1roHLlRwQPXBOqp1ISKilT5+/w8hRTitHSRpeMGd/1e9I/1dL0nTI9TWiEJNprYyJ/b2S5I0I8vycqzcDlZjUzt7hycXYrvoFb0ajs5uYp0oVUFaR4KoVFFOInJWhekDRGq1xbeO0X1E3upI3E95L1oV8rXI1MiGK/aWu9X1a3BGooqL7k9YPAeP6qvtY14Lfw/M6uC252xesqriks8aAaM6kkDuavea/66kVUPl2icPkbvat1W7WbGyXbCqwtzPzdzU6O8D2aGmU1ZpSjW84v6ItYvUp1WKTpWSyF3tWvWcTnZ1KIHc1Z49E7mrE8f3yFsVFh/hibc6EMc7eOarCvPl4Rq8uKiOiNWBysfuDAp29SSQOl57sV/t6mkQdep7dMmmekd2DkSqoz8IVbIza85NVdWAatxFVRVFDaYeOVXVWis1kIpONaMQsNQqEUuvkrAMKgHLotZnmdS6LJv6zWZ4qxbrjeIFo4oZHxRvWFXfcgFU5Xe2X0oP5w1Q/f9v/ause6AJ1fJOYlDNQrYyp9mCyU018xpARQXQ8iYf1dCtd6WqAugGD7WogU0FrRhcNa7gjwpXBoH6BS6FKt6L0uvXAAAAAElFTkSuQmCC"; break;
		case CONST_CTRL_SWStickLeft:					control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGhUExURVx6mZmZmf///9fX19fX19fX19fX15mZmdfX19fX19fX19fX15mZmdfX15mZmdfX15mZmdfX19fX15mZmZmZmdfX15mZmdfX18HBwdfX19fX15mZmdfX19fX19fX19fX15mZmdfX19PT09fX19fX19PT09fX1wAAAAMAAAkBAQ8CAhUCAhgDAxoiKxsDAzY2NjZIWjg4ODo6Oj8/P0BVakZGRkhISFx6mV17mV17mmJ+nGNjY2N/nWWBnWdnZ2iDn2mEoGqBmW5ubnKKpHV1dXaOpnd3d3ePp3l5eXyKmYOYrYWFhYWPmYWZrYaarocPD4eHh4oQEIqdsJamtpent5mZmZmouJqampqpuJubm5ycnJ6enp8SEp+fn6GhoaISEqSkpKUTE6Wlpa64w7CwsLC5w7EUFLG7xLKysrO8xbS9xbW1tbcVFbe3t7u7u70VFb29vb6+vr+/v8HBwcLCwsMWFsPDw8PIzcTJzsXFxcbKzsfLz8jIyMrKysrN0MvLy87OztDQ0NDS09IYGNPT09TU1NTV1tXV1dbW1tfX1/8dHRAhhkEAAAAndFJOUwAAAAMMGx4kJC0zOTxIS1RdXWZpdXiZmay0t8DS3uHk5+3x8/b3/O0f4rkAAAKiSURBVFjD7dfpU9NAFADwTRW87/vCm3J4IFdEBFrwQKulKFtRqGItiIgcKggirRW12fzVZl+2IW2TJtlsZnTG96Hzesxvks3b97YoFArVEz1+YvyNpaOyFqOkemDbQJpKKtWk7IL1rLpivatuWA7VBcujOrNcqiPLp+psUrRKWXuUvOBUSbIKSl7yqlXjvQ9VNkfJN78yzwNQ7eO/6qcG/kFVqyQOVVmdhjWdXlWEqcpiCmNQMU4tKmLUfJruFbn9artMk3RehJpLwQ5saZ5tboEslfOv5seA6m3aUDeaeiEfy/tVFbh93N84r6rqfGM/vEsrPtU5YAYbplQaUw2D8H7O2HHwo5nozeiMB7UAi5poHVf1GG9NwBoUzOo7yN64V5fh0jqH1GIMdcIny2Z1ALIB92oGjERbOBzWSO21Da4VZ8xqF2Rd7tVioxohoLJJrmuGampmm4kbdY2pa0LV30xld/tXX+tTpo4IUfUaiJlqIFZZA5ajx7leO4aNeh3ugE8++6qsAvSW2I1XDH19PVa5tzzvAtYH7hl94I5FH3jrdccSZYL1rCUNXWI9a6KsZ01G5egkT3/thv7a7dBfs/FIJJ6l2SeHWbDOZsGV2WtsFqzbzYKVHroUPV8I+YDFza3Heok9JN+fOZ8JlQXTjF2oMmNv6+ot+ozFnQfs1MsYH+c/uxgrkCtdgQsY7z5Yz6t+1Z/WCj3Zl6vSnou856xsvK9Pr6yPFaq0o07s+VVXpdrTQajS1pNBqNKWY0GoEjoSiIr2XeI8vP94EpHlMnVvUUW7znOhyn16S2XqfkNF2+u8Vi2NR7KFenhTRbVnONQHVupRk4pqzgq61lNmFe30/siUuxbquRIVHeCoAQsVbytR0Qn//w2peqhUreEr2z8Hu7OURM+izQAAAABJRU5ErkJggg=="; break;
		case CONST_CTRL_SWRightFront1:					control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEvUExURVx6mZmZmdfX1////9fX19fX19fX19fX19fX19fX18TExNfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX162trdfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX16mpqdfX19fX19fX19XV1dfX19fX19fX17Ozs9fX19fX19fX1wAAAFlZWVx6mWB9m5mZmZmouJqampqpuJycnJ6enp+fn6CgoKKioqSkpKWlpa+vr7CwsLKysrOzs7y8vL29vb6+vr+/v8HBwcPDw8TExMXFxcjIyMrKysvLy8zMzNDQ0NPT09XV1dbW1tfX1/8dHaIWSXkAAABAdFJOUwAAAAADDA8VGBsdHiEkKjAzP0VIS1FXWl1gY2Z1eH6Eh42QlpmfoKWorrG0t7rAzM/S297k5Ofq6+3w8/b2+fwVg2s4AAABzElEQVRYw+3XaU/CMBjAcVTAC8ULD/Bm3gfeB16Iz5gMnaLigQLK4/f/DNK5JbCOCWtrYuL/TcmW/ELatcs8bSLy/CUVvzuN6S1J0mwkMtoXbHVflUoXW5MiAz281e8Olyf6vdxVUjzaJ0CttBkSoSKuB0WoiHPdLY5VqzmzlwKp6MCeTPkaVYEurWna3Zuduxd2r+qlnu2XbZBJBa3OPKz2sqiX9ab3LOp3r0L9ZdsfFqEirgREqHg07uWmnidI5/rvjaCHxKAmSZUx8UlKGKs24xOgIm4PiVARFzuaV03MRjWvxMMi1Mpe6xShYnxEhIq41CVCxeN5Eeo97LTzV18hdRDirr4DFHHB36RKnwOWWynII+4OulPp3WakwhMZJB+belF7KwOP+rgVYDpfLV3Bg/EW7uSoXpsqLrKqimKjYjebqiSTio06xqQqZL0UWp1kUXU0KdPqNINai3JSLSgf1YpyUSmUh0qjPFSZQhtXU+jEyuhOzTisliyjS/XW3eniqGZuPuhT2uxntcE/86+KUZt8Bn5HbfI1yKiW81l9TrP5Mje1nFMBdBVAzZX5qCWN7DdDrXw4l3ioBRVqVFAL7GopDRYV0iVH9Qt4CkSNvBIuJAAAAABJRU5ErkJggg=="; break;
		case CONST_CTRL_SWRightFront2:					control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEsUExURVx6mZmZmdfX1////9fX19fX19fX19fX19fX19fX18TExNfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX162trdfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX16mpqdfX19fX19fX19XV1dfX19fX19fX17Ozs9fX19fX19fX1wAAAFlZWVx6mZmZmZmouJqampqpuJycnJ6enp+fn6CgoKKioqSkpKWlpa+vr7CwsLKysrOzs7y8vL29vb6+vr+/v8HBwcPDw8TExMXFxcjIyMrKysvLy8zMzNDQ0NPT09XV1dbW1tfX1/8dHXtN94cAAABAdFJOUwAAAAADDA8VGBsdHiEkKjAzP0VIS1FXWl1gY2Z1eH6Eh42QlpmfoKWorrG0t7rAzM/S297k5Ofq6+3w8/b2+fwVg2s4AAAByElEQVRYw+3XaVOCQBjAcSutzMouO7Q7O+yy+7DLeIDEotMOSymfvv93iMWYEVdJ2d1mmun/Bt7wG2YfWAZfm4h8f0nFcqdJq0Q8PhuLjfaFW71XodIl1+KxgR7earnD5Yl+P3eVlJrrE6CabUZEqIjrYREq4nyoxbVKNWf3UiAVXdiTqUCjKtBldF2/e6vl7kW9q1bKc+2xDTKpoNdZh9VeFvWi3vKezbV7V6H+2PaHRaiIK90iVDwa9wtQETfCPhKDKpEcJ2RqMwEBKuL2EF/1PE06x6XO5lX6Fu2T9Ccpbe69URGq+a4FRaiYGhGhIia6RKh4vCBCvYedDv7qKygHEe7qO0ARF9ubVKmqVFQgj7g7yFnV4Ikc4gGuahYereNWN8tOaO8Ddpfw8P0VDrLtr46ubBWXWFVVraFiiE1VJUmtoY4xqSoZpUqrkyyqhUoyrU4zqE6Uk1qF8lGrUS4qhfJQaZSHKlNo46qCbqyM3tSsy7RkGT2qN952F1c1e/3huEyq7Ge1wZv5V8WoTT4Dv6M2+RlkVEv5W2tNb/MlbmoppwFYKoCWK/FRDZ28b9+q+eNs8FALGjhU0ArsqpGBKhUyhqv6BeRhNqSBVLToAAAAAElFTkSuQmCC"; break; 
		case CONST_CTRL_SWRightTop1:					control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEvUExURVx6mZmZmdfX1////9fX19fX19fX19fX19fX19fX18TExNfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX162trdfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX16mpqdfX19fX19fX19XV1dfX19fX19fX17Ozs9fX19fX19fX1wAAAFlZWVx6mWB9m5mZmZmouJqampqpuJycnJ6enp+fn6CgoKKioqSkpKWlpa+vr7CwsLKysrOzs7y8vL29vb6+vr+/v8HBwcPDw8TExMXFxcjIyMrKysvLy8zMzNDQ0NPT09XV1dbW1tfX1/8dHaIWSXkAAABAdFJOUwAAAAADDA8VGBsdHiEkKjAzP0VIS1FXWl1gY2Z1eH6Eh42QlpmfoKWorrG0t7rAzM/S297k5Ofq6+3w8/b2+fwVg2s4AAABzElEQVRYw+3XZ0/CQBjAcVTAAQqKE9zgwIV74IL6lErROnGggPL4/T+DXKEJtKXS3p2Jif83bdLkF3JP7xpcXTxy/SUVa50l1OKx2HwkMh4MdDqvQTWWWI9FhvpZq7WOVqYG3cxVUjIa5KBW2xrhoSJuBHioiAu+Dssa1bzWa5FUsmBPZzztqmAsqyjK/buZux92rqplXszHFqJSQWmxDmsDNOplq+U9j3qdq9B6bAejPFTEVT8PFY8n3bRqOkVKN7ubARfJuZr6IqWqdwJJm9qch4OKuDPMQ0Vc7rGvaoaJqt0kwzzU6l7r5aFicoyHihjv46HiySIP9QF2u9mrb5A5HGGufgCUcMlrTzU5B3TbIQMFxL2QLdUk3SMZnskl5qFTL5of5eBJvW77qc5XXVfwWP8K9zJUrzUVl2lVSTJR0UenSoIgmagTVKpE5iUZ1WkaVUUF0ajOUqjNKCNVh7JR9SgT1YCyUI0oC1U0oO2rGbRiRXSm5iymJYroUL11drpYqrmbT+MprfWz2uaP+Vf5qDbfgd9RbX4GKdVK4U5d07tChZlaycsAqgog5yts1LJC9ltdrf5xLrNQizI0qSAX6dVyFnQqZMuW6jeNoESNgcDhoQAAAABJRU5ErkJggg=="; break;
		case CONST_CTRL_SWRightTop2:					control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEvUExURVx6mZmZmdfX1////9fX19fX19fX19fX19fX19fX18TExNfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX162trdfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX16mpqdfX19fX19fX19XV1dfX19fX19fX17Ozs9fX19fX19fX1wAAAFlZWVx6mWB9m5mZmZmouJqampqpuJycnJ6enp+fn6CgoKKioqSkpKWlpa+vr7CwsLKysrOzs7y8vL29vb6+vr+/v8HBwcPDw8TExMXFxcjIyMrKysvLy8zMzNDQ0NPT09XV1dbW1tfX1/8dHaIWSXkAAABAdFJOUwAAAAADDA8VGBsdHiEkKjAzP0VIS1FXWl1gY2Z1eH6Eh42QlpmfoKWorrG0t7rAzM/S297k5Ofq6+3w8/b2+fwVg2s4AAAByElEQVRYw+3X2U7CQBSAYVRwAwXFFdxBBTfcF9wAT6kUraLiggLK8f2fQaZKQplSaGfGxMT/pr360szpTFNHl4gcf0nF785iWtFweCEYnPB5O+1Xp9LF1sPB4QHe6ndHK9NDTu4qKR7yCVCrbY2KUBE3vCJUxEV3h2n1ar7WS5FUMmFPZ13tqkCXUVX17s3I3Q/YV7XSz8Zj8zOpoDZZh7VBFvWy2fKeh7rtq9B8bAdjIlTEVY8IFY+nnAJUxE2vg8Sgpki6GzK1eZcAFXFnxIaaTJCSzVXESK9lNfFJShiqtZt4QIRa3Wt9IlSMj4tQEaP9IlQ8WRKh3sNuD3/1FdKHo9zVd4ASLndbVOkatkMaCoh7fs6qAk/kEnaxqRd6NQuP2nXbY+EcaNkVPPx8hfvYzldd1zUVI6yqLBuo6GZT5VRKNlAnmVSZzEum1RkWVUNTEq3OMah6lJPagPJRG1EuKoXyUGmUhypRaPtqGs1YCe2pWZNpSRLaVG/tnS6mavbmgz6la7VW23yYf1WMavEd+B3V4meQUa0Uctqa5goVbmolrwBoKoCSr/BRyyrZbz9q9ce5zEMtKqBTQSmyq+UMNKiQKZuqXzhMRI3N10tiAAAAAElFTkSuQmCC"; break;
		case CONST_CTRL_SWStickRight:				control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGSUExURVx6mZmZmf///9fX15mZmdfX19fX15mZmdfX19fX15mZmdfX19fX15mZmdfX19fX19fX19fX19fX15mZmdfX19fX19fX19fX19fX19fX15mZmdfX17W1tdfX15mZmdfX17m5uZmZmdfX15mZmZ6enpmZmdfX19fX15mZmdfX15mZmdfX1wAAAAMAAAkBAQ8CAhUCAhgDAxoiKxsDAzY2NjZIWjg4ODo6Oj8/P0BVakZGRkhISFx6mV17mV17mmJ+nGNjY2N/nWWBnWdnZ2iDn2mEoGqBmW5ubnKKpHV1dXd3d3l5eXyKmYWFhYWPmYWZrYaarocPD4eHh4oQEIqdsJamtpent5mZmZmouJqampqpuJ6enp8SEp+fn6CgoKISEqSkpKUTE6Wlpa64w6+vr7CwsLC5w7EUFLG7xLKysrO8xbS9xbW1tbcVFbu7u70VFb29vb6+vr+/v8LCwsMWFsPDw8TJzsXFxcbKzsfLz8rKysrN0MvLy83NzdDQ0NDS09IYGNTV1tXV1dbW1tfX1/8dHaosCxkAAAAsdFJOUwAAAAMJCQwSEiQwP1RXYGNseH6Hh4qNmau3wMDBydLS2tvb4eTn7fP29vn84P1PsAAAAp5JREFUWMPt2OlT00AUAPBN8cIb7/u+LYcHckVEoAXFChRlW6BYq4CIQKscArVik/zfJi8bmk3a7CZZHT/4PnQ2melvkte37+0U4ZqheseErMcEucjivHX/WCQSQUFVQOWUWz0RQqVRQaoDFaM6USGqCxWhulERasqF8qtp1YulUX512uPXSjlQfnVG9RGc6vTHMvU12R5slfNh/qt/RvVZA39HZQ8BkaqyPg85nV9XhKlKIYMxqBhnCooYtZQz9pvc8bBDNha5kgi1mIFd3Nqy2NIKq0wxvFqaBKqveVvbbu6D9WQprKrA6+OBpmVN05abBuAqp/hRF+JP4wuV3WQsloAZapzTjJhrHILrJR/qZ7A+2NUyJDXZNqWZMdWWhByU+dVBsAbt6io8WteoZsVoF9xZ5Ve7weq2qzNgJNuj0ahO6p/tSfescKoylUNbU7IWVqMaV0E1J6yzcwVWN4i6IVT9RVSSpX/6Wd8SdZxHrTpI3DWQsNVAgl0DzMoy67VzbKdexzrhzrdQu6AMvSXx5B1B3z9O+N1bn9w7lvSBlzt94IXvPqDOxuX4rKNnZUnPWtHRFdKzst4966ux2hqJxUa2GP21B/prD1d/xV9Uda3XeNvetVqzYJPMggeLj8gs2GSdCdM/1GGznobFzS0j789N9ZnHjM3bZmyePWP5VL/nAZwusjPAiss38JVav9b3oOrZPZfwBUotmJXV31+7slhxuk5yquHPrw2SJFy9e1ASr946IIlXr9VL4tWL+5CpXnWoshx78zPguf3MbkTU6y5VDyUQehIhS71ZTX3N97cQHUdRRb1XTX3lX71/GFXUvVjQsx5BNnU/FpPXU8iuHqqq+kbP11HqcRysXum4XY8o9ZwQtQFR6q47DvU35LBph8OQBK0AAAAASUVORK5CYII="; break;
		
		case CONST_CTRL_SWCenter1:						control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC6UExURQAAAFlZWVx6mV17mV17mmJ+nGN/nWWBnWiDn2mEoGqBmXKKpHaOpnePp3yKmYOYrYWPmYWZrYaaroqdsJmZmZqampubm5ycnJ6enp+fn6CgoKGhoaSkpKWlpaampq64w6+vr7CwsLC5w7G7xLO8xbS9xbW1tbe3t7u7u729vb6+vr+/v8HBwcLCwsPDw8PIzcTJzsbKzsrKysrN0MvLy83Nzc7OztDQ0NDS09TU1NXV1dbW1tfX1/8dHTU/cXsAAAHkSURBVFjD7Zd7V4IwFMBxWQqW+bgWlFhomo8yHxTG6Pt/rXizIYzE0bEO969xd/c7Y7uvCRYtkE9iFKGkxr5vc0F7GdT7XNS7DOokF1WLUxGivj+1m8N3+mhSDITiVB5SUm2qVYT8KnU/CA+yEnABVCwoc8yZiueKAKAaXKmGCmBTQdE5UnUFPCrIBjeqIUNABRVzomIVIipMvZhAfqSNpTNpnAmNrMKVUyCpsknOPbmjhwwoYRWsNBWKCkuS2nBHjQwqYRWsXAJN1Uhq1R1V7VFFcKSSSI2swpVaQEW+kNRIJXw5IuxN0lYWRUBuJiyCWv1Dey2GmuQDkT3LBxKoWsyzXpM9iyUJnhXzVzq2ckeBKUN6Hhj9KGJH+xFL54F+LGcNJSQNM7NLghXuR9T0/LrtiGJn64xeBr3Bglax86uyScucq5rza7U3y3p29zAJVau0LLzxawGjbrU957m2Pnpe9/seqNrsuqXMGDX2wkOcB7dg32qoSq+xM4XdD+SiOv0AsyKFJ6D7J6Bnn0B2R7QOr2YSu631EVTbjep1z40WKqhzWsWglr32f3sX7Lqin/jF7o7XuwBfIULwsVQ/TFskFLWSH+8HU5sUtcmJynmvwblecj3X0AdI6sm9DUvqSVK/ASvjpBZnypfsAAAAAElFTkSuQmCC"; break;
		case CONST_CTRL_SWCenter2:						control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC6UExURQAAAFlZWVx6mV17mV17mmJ+nGN/nWWBnWiDn2mEoGqBmXKKpHaOpnePp3yKmYOYrYWPmYWZrYaaroqdsJmZmZqampubm5ycnJ6enp+fn6CgoKGhoaSkpKWlpaampq64w6+vr7CwsLC5w7G7xLO8xbS9xbW1tbe3t7u7u729vb6+vr+/v8HBwcLCwsPDw8PIzcTJzsbKzsrKysrN0MvLy83Nzc7OztDQ0NDS09TU1NXV1dbW1tfX1/8dHTU/cXsAAAHgSURBVFjD7Zd7V4IwFMBxWQqW+bgWlFhomo8yH5TG6Pt/rXgNNgSWODvW4f41rne/M+/ua5LNCuSTGEUqqLHv21zQDod6n4t6x6GOclGNOBUh5vvTuNn/pI8Ww0AoThUhBdWh2seQX6XuJuFeVhI+AhVL2hQLpuKpJgHoG6HUjQ7gUEEzBVJNDXwqqBth1I0KhAo6FkTFOkRUGPs5gYJMGypnypALjazCnWOgqapF//bkrR44UMqK7LQ0hgpzmlrzVjUOlbIiO+fAUg2aWvZWZRpRklwp0SrKiuw0CBUFQlMjVaiTvlyROFYEdiRq+Q+d9TjUpBig7DNiIIFqxCLrlRNZCZIQWbF4ZXMrdxZYKqTXgcGPMnawm7FsHejGalZfQUqfW10SrHA3oqbX13VLlltrd/XS6/RmrCq7vmqrtMq5qLh/rfJm28/eGUahapFWhVdBL8joW00/eK7tj44//b4TVTO7b2mTjB574SPOyS04txqq0nvsRMueB3JR3XkgsyOFHjADD5h8D/AnomV4NaPYbS0PoDphVK36YTTTQZ+yqgxqMWv/t3fBti0HhV9ub0W9C/AVogQfSg3StEFDUSP58b43tc5Q64Kogs9K/Hop1K9hDNDUk3sbFtSTpH4DKoSkFh8nuJYAAAAASUVORK5CYII="; break;
		case CONST_CTRL_SWCenter3:						control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC6UExURQAAAFlZWVx6mV17mV17mmJ+nGN/nWWBnWiDn2mEoGqBmXKKpHaOpnePp3yKmYOYrYWPmYWZrYaaroqdsJmZmZqampubm5ycnJ6enp+fn6CgoKGhoaSkpKWlpaampq64w6+vr7CwsLC5w7G7xLO8xbS9xbW1tbe3t7u7u729vb6+vr+/v8HBwcLCwsPDw8PIzcTJzsbKzsrKysrN0MvLy83Nzc7OztDQ0NDS09TU1NXV1dbW1tfX1/8dHTU/cXsAAAHgSURBVFjD7Zd5V4JAEMBxsxQs8xgLSio0zaPMg8JY+v5fK66FXeRQXHrWY/4axtnfW3fnWsFiBfJJhCKU1Mj3bS5oL4N6n4t6l0Ed56JqUSpCzPeXdnP4Tp9MhoFQlMpDSqpNtYqQX6XuJuFBXgIugIoFZYY5U/FMEQBUgyvVUAFsKig6R6qugEcF2eBGNWQgVFAxJypWIaTCxMsJ5GfaSDqTRpnQ0CtYOQGaKpv0b8+u9pgBpbzISlNhqLCgqQ1Xa2RQKS+ycgEsVaOpVVerxrIqgiMV1ous1AgV+UJTQ5O1owjfjgjxXgRWELX6h/ZaDDUuBij/lBiIoWqRyHrbN7JCiYmsSLyyuZU7C0wZkuvAcK+MHe5mLFsH+pGaNZCQNMisLjFeuB9Sk+vrpiOKnY2jvT70HuasKb2+KuukyrmsOX+t9m5ZL+4exoFpmVSF134vSOlbbS94rq3Pnjf9fhBTO71vKdOUHnvhIc7JLdi3GpiSe+xUSZ8HclGdeSC1IwUnoPsnoGefQPZEtAquZhy5rdURVDuM6nUvjOYqqDPWlEItZ+3/9i7YdkW/8IvdLa93Ab5ClOBjqX6atmgoasU/3g+mNhlqkxOV817JuV5yPdcgBmjqyb0NS+pJUn8AKSWkFn78m5YAAAAASUVORK5CYII="; break;
		
		case CONST_CTRL_PotiLeftTop:						control_image = "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"; break;
		case CONST_CTRL_PotiLeftSide:						control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEmUExURQAAAAMDAwYBAQkBARUCAiAgICYmJisrKy0FBS85RD8HB0gICEsJCUxMTE4JCVEJCVQKClcKCllZWVx6mV17mV17ml5eXl9fX2J+nGN/nWVlZWWBnWiDn2mEoGpqamqBmXINDXKKpHaOpnd3d3ePp3yKmX5+foOYrYWPmYWZrYaGhoaarocPD4qdsJCQkJmZmZqampubm5ycnJ6enp+fn6CgoKGhoaSkpKUTE6Wlpaampq64w6+vr7CwsLC5w7G7xLO8xbS9xbW1tbcVFbe3t7u7u70VFb29vb6+vr+/v8HBwcLCwsPDw8PIzcTJzsbKzskXF8rKysrN0MvLy83Nzc7Ozs/Pz9DQ0NDS09IYGNTU1NXV1dbW1tfX1/AbG/kcHPwdHf8dHYRrioEAAAJuSURBVFjD7dd7V9MwFADw8JCnCDQOdDAGIpN3pq2OgkWYAkURBtMNXAP0+38J2zQtSfqisXp2PMtf3W37O1lyk5sCzDck1wQF9FTh9zsptJqifpBS36eodSnVEFUIud+/jLfZe/qxwxkQimoerac6Kv4b7Z+qC8MLj3g5vFR91YqKrg9+HlyXVy2gmWF3e6BhNwa2JVXL1ABCelsI1/qPbds+7q9JqW0dIUdFWpMLmxM7ttt2JkwJtakhT0Uq19vipu21zWJ2ta0iX0U6O7amAoBjAqBk76ulowcVHXlrAtKVRtTUyTosPy8fYu7NI8Sqaoe9d0DUvRT0gDy/x6odjVPRGauOjjvq+GiKukSeX2LVM8SrBnOv8pRM1lQlWS2Q5wusavgqpI25N3RD1Jshtv8xF3zMx6LUvnui3vfJq4WwCmi+glz72rVqRA6wamIhCamGkFnfYmYrW2YJ+cqtLTazsq2Cjopi94HKs0etgk/hFcvvAzW+HiiTDjqppO0u+2VY3hf2rNqDqorVINizrjZKpY0r9+rrbnX3lA8l76/aJY5Rz+fcvzb3HeMvpA/1IHQeVwsuaS0Q61Yr2LVba17yvME/q97p9wemobXkuqWdiDV2eZHm6+LyS4944c+CM6tBKL7GnmgR54GWMn3nmHfTSktKdc8DUdGZsVv7dmwG42AEmnQEmukjEH8iKo40RtwCexFMTV2YrQsJFc8+mcVeGs3Pe2l0qiPd5EMJau+s/b99F1xvlejGX9q6zuu7wHoNmWb9qUqX6SqLwtXoj/fM6gqnruSk5txXf1xf5TquQQ6watd9G/bUrlR/Azr1CEgKY0hSAAAAAElFTkSuQmCC"; break;
		case CONST_CTRL_PotiRightSide:						control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEmUExURQAAAAMDAwYBAQkBARUCAiAgICYmJisrKy0FBS85RD8HB0gICEsJCUxMTE4JCVEJCVQKClcKCllZWVx6mV17mV17ml5eXl9fX2J+nGN/nWVlZWWBnWiDn2mEoGpqamqBmXINDXKKpHaOpnd3d3ePp3yKmX5+foOYrYWPmYWZrYaGhoaarocPD4qdsJCQkJmZmZqampubm5ycnJ6enp+fn6CgoKGhoaSkpKUTE6Wlpaampq64w6+vr7CwsLC5w7G7xLO8xbS9xbW1tbcVFbe3t7u7u70VFb29vb6+vr+/v8HBwcLCwsPDw8PIzcTJzsbKzskXF8rKysrN0MvLy83Nzc7Ozs/Pz9DQ0NDS09IYGNTU1NXV1dbW1tfX1/AbG/kcHPwdHf8dHYRrioEAAAJwSURBVFjD7dd7V9MwFADw8BB5iEjjQAdjIDIeAzJcdRQsjylQlMfYdAPXAP3+X4I2fSzJ0pbGqhzP8ld2e/o7WXJzkwLMNiTXOAX0VO73Bym0FKN+klI/xqhVKVXnVQiZ37/0reQj/dxmDAh5NY3WU20V/4n2V9XuTShqc8/nQlRTXl0b/DK4JnpgAtUwJdXNgZpVG9jsNg0VIKS1pNRK/7FlWcf9FS7e0hCyVaQ2JFRjfNty2va4wcQbKnJVVG4lV7PrltvWs8xIy8hXkWYmH6sCgG0CoNBjNTXUUdGRuyegt9MO86/zh/FZ6aiYefMI0Wq5TT87IL3dGPSAqLu02lYZFZ3R6gLpLcSoI2O2OjZCq2eIVXVazZBeJhotvCCL9apAvan7KvQarXZCOLwzdEPUmyEq5mPyat89Ue/7RGpGVgVevoJUx/oPVFEOUGr0HuBVncus74kzS7RaXL6ye+tRu0CUWe0yCq8D+4/ZsYWX3buArQMVrmbt5WF+L664KBM2OqGw50Clo4bX13oxlyvWnd63ndLOKRvq1CxRfVWvws6Cixnnr82cY/yVjKEahC5CVHzlnQUR59aqm2LL+GfJvf3+8EOrzaBqNwXnlnoScca+dYk3/irYq+qHFue9fJ1f5M/YEzX6PhChNpXJO9u8m+THSu4DkXeXYAYa3gw0ghnAeGr01rodnUp+I7oMlqbKrdalc8wO14azMvesenF21k2jUw1pBhvC08+mQ2pE7679v30XXG/kvOMht3Gd1neB+R5Szfxd1dumKzQKV8Qf74nVJUZdSklNeaz+vL5LdV6DHKDVJ/dt2FOfpPoAZu4ISO2OeAcAAAAASUVORK5CYII="; break;
		case CONST_CTRL_SliderCenter:					control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE+UExURQAAAAMDAwYBAQwBARgDAyAgICYyPykpKS0FBTAwMDlBSEIICEgICEsJCUxMTE4JCU5OTlEJCVQKClZWV1lZWVoKClx6mV17mV17ml5eXl9fX2BgYGJ+nGN/nWVlZWWBnWhoaGiDn2mEoGqBmWwMDHJycnKKpHgODnx8fIOYrYSEhIWZrYaGhoaaromJiY0QEJAQEJCQkJOTk5mZmZqampubm5ycnJ6enp+fn6CgoKGhoaISEqSkpKUTE6Wlpaampqenp664w6+vr7CwsLC5w7G7xLO8xbS9xbW1tba2tre3t7m5uboVFbu7u70VFb29vb6+vr+/v8HBwcLCwsPDw8PIzcTJzsYXF8bKzskXF8rKysrN0MvLy8wXF83Nzc7OztDQ0NDS09TU1NXV1dbW1tfX1/AbG/kcHPwdHf8dHdU9xFsAAAJNSURBVFjD7Zd7V9MwFMALKIKAAs46REU2niKo3MGKjiIU2JDXQGAwps6tEfL9vwBZs3ZJtjbSB0cPu/8subv5ndvkPhIF8QL+RKAobaowX/YFTUmon31RVyTUnC+qIVJVlZtXjKXbe7pR5RiqKlLDkDaVUFEUcqfU5iS8lZViRkA1FS1vhkw185oCoJdDpZZ1AEIFrRQitaQBpUK6HBq1nAabCroZEtXUoUGFfZoTaj3TsskXyawU2rByVu4DS01X2f+2rdG6BMpY2SurGkeFE5Y6ZY2mJFTGyl55AjzVYKlxaxSXUBkre6VhU9W6sNSGCskGvM6GRUSN/0e+RkNtFQOMvWcjaaIaQmR9DyWyhHjlc8t3FlTT4F4Htv4qY7eaM5avAxmhZm0m1eSmtLq0sDIzDap7fb2cTyTmL2uj47XU2hGv8q6vWtGtcp6N1T5t7BShb5YPOUd15laFi/Ve4NG35mjwzKJfKXr7/Wmr5rz7lnbo0WNfU8Qr+xTIqToq9x57qHnfB3xRa/cBz47k7ECpvgMl+Q7Ib0TnztHkhNM6D0AlYTQ+TsPoSAc9z6s8qO27toy6O7orqiozlYDUr4MfYuRnobdDIdLRu0AmsYlYsHfBYucXrKDfj/sL15jIdaH/GTlh/HwkyLvgfdcexsTHAezIMJniq743/qlvH1zg1vKn56Vv6qM97CYXDwP4+iMCX9G7rgNrX5+Gua8IfepcrcVA91CBMgtD3cFjAKHMk480XhVLaLxOx4K+OHdGdppa02TxX3rH3iPqDZvgkQLoF5XYAAAAAElFTkSuQmCC"; break;
		case CONST_CTRL_PotiRightTop:						control_image = "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"; break;
		case CONST_CTRL_PotiStickLeft:					control_image = "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"; break;
		case CONST_CTRL_PotiStickRight:					control_image = "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"; break;
		
		
		case CONST_CTRL_StickLeftButton:				control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGYUExURVx6mZmZmf///9fX19fX19fX19fX15mZmdfX19fX19fX19fX15mZmdfX15mZmdfX15mZmdfX19fX15mZmZmZmdfX15mZmdfX18HBwdfX19fX15mZmdfX19fX19fX19fX15mZmdfX19PT09fX19fX19PT09fX1wAAAAMAAAkBAQ8CAhUCAiQEBC0FBS08TC49TDNDVTkGBj8/P1lZWVpaWlx6mV17mV17ml5hZF9fX2J+nGN/nWWBnWhoaGiDn2mEoGqBmW5ubnKKpHaOpnePp3yKmX5+foOYrYWPmYWZrYaaroqdsJKitJOktZYREZamtpent5mZmZmouJqampqpuJubm5ycnJ6enp+fn6GhoaSkpKWlpa64w7CwsLC5w7EUFLG7xLKysrO8xbS9xbW1tbe3t7oVFbrByLu7u7zCyb29vb6+vr+/v8HBwcLCwsPDw8PIzcTJzsXFxcbKzsfLz8jIyMkXF8rKysrN0MvLy87Ozs7Q09DQ0NDS09IYGNPT09TU1NTV1tXV1dbW1tfX19sZGeobG/8dHRG6e0kAAAAndFJOUwAAAAMMGx4kJC0zOTxIS1RdXWZpdXiZmay0t8DS3uHk5+3x8/b3/O0f4rkAAAKRSURBVFjD7dfpW9MwGADwdAre4n2LN0U80GEdKrIJOhUFyYauMociHggqgiBM57VE+m/bJs3Wlh5p2j6PH3w/JVv3e7L2zfumIJVKdWAaPyFcModjih5j2D+gZwBdxWvVgsLBhla52PAqDyugcrAiajArpAayYiplC3GrBuuN4ieCKi74oPipqOobryKoijVs3/yqPE5A9Y7/apQciKr2yLLcE7sqa5om+2xcARUtTBJ1cgHFpqJZFUKiQqjOonjUWhnm0zJR5XQelmtxqFV9oekRjcZIWl9uNbpaK+k/yXe+Iejzzrw+K9WiqqhMasXNrh86+uXsLTIro4jqtFmCrpxf1f6cu2bOphs7jlw0lbuamwqh1lVW2S5eXr1wiU1Kdav6koye8atzzCkO93b1DhfZdM6qDpDRAL9aYSj9dImxFauaIaMMv8oK1Sju1utAt9nJqdZQLcWsOeBRF806sBir+ptVl8y/v9ZH5n0djUXlygHX1sOXrw/ffnvXzNePkTKrXmIO+aX73gq9Cxp1wK7a68CLsDsWo3EXddxRsyZySm4ifH21q971dWUomx1aMUYfAnrBsupQ1WWvXjDfZ1zU9wnj15Cjb1lVn751n6bYXfy1GHwmRDNqQ1VnfHrsDapeN54x33mAXB9wHvBSz0B4QOBQ5bwDVfsdOAnh1l0doupn+rTmjZO9U5W2nRJU9czq76eZ9X6NKm1qj/f8SlWp9UgSqrT+UBKqtG5/EqoE9iaigrbTgq8E3x9kFcWhbmcq2HJCCEW3jb/kUHc0VLCxPWzWGnFPcVH3NFXQelRAveOm7rOooOVYTGs9bFXB5vCPDA26qMdtKtgpkAMuKtxgU8HB6G+chrrbrraIpe1f28FZWmOJtrYAAAAASUVORK5CYII=";	break;
		case CONST_CTRL_StickRightButton: 			control_image = "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";	break;
		//case :		control_image = "owQ0U0QjYxQTA2OUUxMUUzQjFDMThBMThCNTkwQzFGQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQ0U0QjYxOTA2OUUxMUUzQjFDMThBMThCNTkwQzFGQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNzVENDk2NTlBMDZFMzExODVCNEQ0OUFEM0IzMTY5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQkE1RUY5MjkwMDVFMzExQjAwQjk5MjAyMEZBMDRGOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph2cU/sAAAQZSURBVHja7JzfSxRRFMfP7K7rb0yTxdY2kX4aJtGPF4mVhKQfQhIGKii9LSYL0Wv4IvkPhGb7EJEJFgRRGPjYbuBbICpKEvm0sriaO6jr753OGWdt1dV1d2dzR88XjnPnzq8zn3vn3Hvn7ihIkgQsdaVjBAyVoTJUFkNlqAyVxVAZ6tGQ4HA4mALX1KMD1Y8mKebX0P0nxG+1oP7ZJZ3sSojfakH1ahSqN5mhihqFKiYzVH78GSpD1RxUQwICvjfCvuHmb4R9HiOofO5o/Oaayo8/Q43onKhRqGKyQU1kP/XGLumk9fsgGqpwuoRmDJN/Bu1lyPpntMdov8Lsu3IAfscF9TKaXkkXohUoaWMYIH2CIOhQKbQSCASOS5JkinD+oX36kYf2Psp73OwRoF9T6NdMyDb9+vp6MP1cKZjhkALyoLmVNO04SAmbzXYRF81oXQ6HY3Q3qATlNtotgoQXP40gTkaMHTpdIC0tbUlJS9nZ2YJSABse6/WQnp6+5ZjU1FQwGo1RUUlJkcsHVldXozpuZWUFlpeXQ7NMi4uLphCQsubm5mjxiMD5/X4BK8KeYbGiogJqh4bgldncMDAw4CovL3+D2f3BwjBkZmaW44X71tbWcpXSBMwDhCXfDKUpz2AwbAKiJQFTYnLG/2pVqEASrODTCAQeC0BO0xL5AP1EamFhAZxOJ3yzWKDA48lr6u6uwV1qrFarD/27h9sHDBaL5TVm5mZkZMggCR4LoL29HXp7e/fcpxaZnUJe93t6qKIda2hoeDs2NnZWwD9bRiHt71wRL/is0XrooZaUlICEtXE/msBaXOX1wp3mZigtLRW4WqqgYqyt300muNDZCWIgkMNQ1ehPBgJQNzMDTS0tVFPFHY8/a0NtbW17xtRgaBjGHkk1PvrVNhvY7XZwuVwCQ40j3vYvLcHD6Wl42toK9fX18jaCuuPx54YqMotzVyqgY2IInszOwguMo5WVlQkZph4pnb92Ezp0OriLcLcDZagxKif/BFyvqtt1O8dUlUUxlX/2kwAx1ARBFRmDahKDUN3MQjV5glAHmYVq+hGE+oFZqKZPwX7qV7QJtOJ4zkYvcN1uN0xNTcH8/LwmCGRlZYHJZILCwkL5RXycIoZfKKEvKyuTioqKKAQ0xtoboLfiIyMj4PF45CkMrYh8ncWhpiiKkJ+fT1NCsZ6K5mceYB/192aXClecuLArG6OuoaOjo7Jjmm2y0Xe6hxi/KCdmdoXh1n4qZnbhohrtZzRnHB8fB5/Pp/lgSPdA9xKliFW1wu7fMDXc1ylWq7UWNmZXaWb0ariz0WQYxdDJyclD1dKYzWY5xm6fBd7WwlO47EeYH8OO/fmTH/Ul8H+m4LE/Q2WoLIbKUBkqi6EyVIbKYqjJo78CDACwp391Vgy4ugAAAABJRU5ErkJggg==";										break;
		//case :		control_image = "owRDgyQTYxQTA2OUUxMUUzODhBOEY5MDIzRkRBRjAxNSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRDgyQTYxOTA2OUUxMUUzODhBOEY5MDIzRkRBRjAxNSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNzVENDk2NTlBMDZFMzExODVCNEQ0OUFEM0IzMTY5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQkE1RUY5MjkwMDVFMzExQjAwQjk5MjAyMEZBMDRGOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrpvLwYAAAQcSURBVHja7JxfSFNRHMd/d9P5H6lkhGYSK9AwCXqL2FtRJIRhkIgS+CBme+k1fJF86F0LnxNmIIRiIPUQLgjpD1iaI7F6ySXOP7uoc07d7fe73js2u7Z/d7jrfl84nrO7e8/O+Zzf+Z1/m4IkScDSVyZGwFAZKkNlMVSGylBZDJWhZoeE/v5+psCWmj1Q/RgkJfgNVP+0lFsvqCsHpDNdaSm3XlC9BoXqzWSookGhipkMlbs/Q2WohoOakwaH741xr9b5jRDnM4LOeSdSbrZU7v4MNWbhRINCFTMNajrnqVcOSGdsuQ9joNLSBQwWjetnMTyNeD2M4T6GOY17g4dQ7pSgXsRgVtIVGE4qaYsGkFFBEEyoXHoRCoVOSJJkjZH/1zjLcRzDYIJ1DM8IsFyLWK7liPfMu7u7avqx0jBTEQ20gGFeSdONk4lAJSjXMVwlSPjhNgRxKqbvMJlC+fn5ASUtlZSUCEoD7JXYbIaCgoKoZ/Ly8sBisSREJTdXbh/Y3t5O6LlgMAhbW1uRl6ybm5vWCJCy1tbWKLpH4Px+v4CGYIqj7h7k9Bvz+oAv32AYUxtDGBgYuIwfPLqzs3NMaU0oKioChCVXhtJ0LScnJwyIYgJ2lEXgsQHkNMXIB+grUhsbG3LjBgIBOa1+bQr5+NBgbuK198L4+Lgbr1UXFhbKIAkeK34RbAKMFk7GN+d2u88J+CdqFdLz3BUzo0ct9qwAlgwLl8sl8HFKMvOwpT/w8fWgHKdznppV+v7pLTz4MQlfXCMwMTHx72bD/u7Piq2amhqQKithCP1o68oKdPX0QENDQ7j786h0gLq7u8HpdP73nkYc3E/jwH6rqwtWEG5bW5u2pfJAFW2N8egXzgCueb1wo6MDamtr2VL10Bm01ndWK1T39YEYCpUyVD02PkIhuLu8DK2dnWSpIg9USfpU1TVM4eqqHrt+fXs7OBwOeaBiqCn42zFcSd1ZWoKHOFA1NTXx5D8VEcDe9XXZQp/09oaBqiKfShu1pYwqfjU3N4PTZIJhhGmz2aIWW+qU6hvG5xmVPost7P7V1P0nmYVu+qyu/V8wC930UvWpr2hRQHPYVHKjzdr5+XlYXFyEdXTiRlBxcTFYcdJeUVEhb8SnKGI4QglzXV2dVFVVRS6gBZLctaKN2unpaVhYWJCPMIwiKuvq6iqIoghlZWV0RJJsVnQ+cxv96U+1+9Pcahwjh/JmwhY6MzMjF8yoorJTHZL8RTkxcygMASItEy8+w6ieRrBEcpydnQWfz2d4Z0h1oLokOtoTM4VdWJq/TrHb7Y2wd7pKJ6OXtHKjwzDyoR6P50iNNOXl5bKP3X8KvG+EJ3c5hjCHtG7gn/ykQQL/Zwr9xWt/hspQGSqLoTJUhspiqAyVobKS1V8BBgAxm7GJd6WA/AAAAABJRU5ErkJggg==";									break;
		//case :		control_image = "owQUEwRDgxQzA2OUUxMUUzODE3REI3QkM5MDdEM0Q5RiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQUEwRDgxQjA2OUUxMUUzODE3REI3QkM5MDdEM0Q5RiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNzVENDk2NTlBMDZFMzExODVCNEQ0OUFEM0IzMTY5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQkE1RUY5MjkwMDVFMzExQjAwQjk5MjAyMEZBMDRGOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsL2faUAAAQwSURBVHja7JxLSBtRFIbPJDG+KdoYUy2I2NdGkT5RSkqFFmmzKlJ1YemqguLOnYsWbNd2USMu3FgXLRXEYom0ICjSRaEgra9aaRdWCRGr4yPxEZ2eO05sTCdNxkwwk5wfjnNnkrk597v3nntmJpETBAFI6kpHCAgqQSWoJIJKUAkqiaAS1MQQ19nZSRRopCYOVDeaIJlbQ+2Pit9qQf0dpBzriorfakFd1CjUxViGymsUKh/LUGn6E1SCqjmohigE/MUQ75V7fsOFeQ6nct1K/KaRStOfpn9I53iNQuXr6+sVVyB370QLeer1IOWY9fs4Fio5FaMZZY6fQbP77fejNaDNyrx3+xj8jghqKZpeKuejWaSyUQbIAMdxOlQS29nb2zspCII5RP1fwvQjG+2VwjYeZATolwv9WvJ7Tb+7u+srP8WpzDrmq6+DRkdHkxwOh7WsrKzXZrN9x/AwpgQqg1KJdotBwg8vQhCnQ65yOt1eSkrKplQWMjMzOakD9j3W6yE1NfXQOcnJyWA0GhVRSUoS+wd2dnYUnbe9vQ1bW1v+h8wej8fsB1LU2toa2zxE23W73RwOBN309DRMTEzAY3xv7+rq/cD4ie1dQE6/sK5PuPsBbdDXGVxPT085fvCA1+vNknoT0tPTAWGJjWFldsxgMBwAYlsGLF7V19cHrS0t0J2dDVVpacDNzcHQ0BCwr0htbGyInbu5uSmWfV+bQj4rOGDu4rGP3PDw8BQeu5CGJzOQDF4iq6urC3ra2qDfZIKr0oxiUIOpuroampubAUc4G3yzU1NTZzn8c+gq5NnLkZAf3FJnjUugdrsdHB0d8D4nBwrDHFwMODI82B8ZGeESe1gGxNXu9naYtljAEmFoo2dUknCRhQeNjVCztATOgIUs4pQqXqd2OGpoaBCT4msYBgYwBBRLWcf/YmptbW3Ukv+4ApuVlQXlra3wBherSly8mfzjpuKRmsgLlf/oy83NBRuGg+cI+NzFG0G5yLGgmBpEFRUVcOfRE3hRVArnL988lmv/uNQJ0ym4crtG8Xn/5KmkyMTyVJr+URBBjRJUnjCoJt4HdZ5YqCanD+oYsVBNn31QXxML1dTny1Pfof1EK4ykNnazdn5+HlwuF6yvr2uCQEZGBpjNZsjPzxdvxEcoxvAtK+hLSkqEgoICFgLqjpoNeL1eGB8fB6fTKT7C0IqYr8vLy8DzPJjwOl+nO3IyxG5r3cMc9cdBSoU7w7hpkl5UPEInJydFxzS7ZKPvrA1H/EU5Y9YkMTycp+LBDtzY0L4pqXFmZgZWVlY0HwxZG1hbFIqxskns/l6myn3Dwmq1VsH+01X2ZPSSXG0ej0eMoQsLC3G10uTl5YkxNvApcMAKz8LlIMLslb32p5/8qC+O/jMFXfsTVIJKIqgElaCSCCpBJagkgho7+iPAANUWhz0INCmLAAAAAElFTkSuQmCC";			break;
		//case :		control_image = "owQjJGRkFENTA2OUUxMUUzOUM5MUZFRERFNUQ2MjNFNCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQjJGRkFENDA2OUUxMUUzOUM5MUZFRERFNUQ2MjNFNCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNzVENDk2NTlBMDZFMzExODVCNEQ0OUFEM0IzMTY5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQkE1RUY5MjkwMDVFMzExQjAwQjk5MjAyMEZBMDRGOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpNZqJoAAAQrSURBVHja7JzPTxNBFMfftqX8PoBQGmpCiJqICcTERBNieiAxIcjJcJAQjGeQv4CEC3rGCxAOXLAHjCYEUiPBg7YH0/gjQUUqBPWAYAMiNEApBbq+t2yxlIV2+yN06fsmj5nd7k5nPjM7M2+miyCKIrCSKx0jYKgMlaGyGCpDZagshspQM0PCwMAAU+CWmjlQfWiibD4NlT8l+U4W1L/HxNNdKcl3sqAuaxTqcjpD9WoUqjedofLjz1AZquagGlLQ4S9HuVZp/0aI8R4hyWmryTe3VH78GWrUzHk1CtWbblBTOU+9eUw8bfN9GgOVkqrRjArnL6L1hR2PorWhzSlcGziFfCcE9SqaXo5b0Mxy3KgAxC4Igg6VRQfBYPCcKIqmKOl/jjEfxWjDKst4MCPAfC1hvlbCPtPv7e2F4g/livkSVkEetAU5ThdOqoFKUOrRbhEk/PILCOJ81L5Dpwvm5OT45bhYWFgoyBWwn2O9HnJzcw/dk52dDUajURWVrCypfmBnZ0fVfYFAALa3t8NPmba2tkxhICWtr69TcJ/A+Xw+ARuCLoayLyKnX5jWOzx8hTYeqgzBZrPV4hfbd3d3i+TahPz8fEBYUmEoTucMBsMBIAoJ2FkWgccKkOIUIh+gn0htbm5Klev3+6V46GdTyGcNG8xtPPdWcDgcbjx3OS8vTwJJ8Fixi2ATYGzh1Pjm3G73JQH/HPJCHj1xRk2os9WaEcDiYeF0OgXeTjlpvvXnN7yfGJbC05innjm5XC745ByDB98nYebDa1X3Hnn8WQAjIyPQ3dkJQ8XF0IRjjTA/D8gppnvp8edRKUKDg4Ng6+mBNyYTXA+b+lVVVSle39zcDF1dXSe31EweqPr6+uBlfz9MlJZCZYyzoMhWzC01wgEY6u2Fb2YzmBOcg/NAJQu9QbjX3g53V1bAE+FxJez7Z8ocVEltbW3S6s0N7Abs2AVUy+4xPeLHifrUVK1SnSmwRUVFUNvdDc9KSqAevUxSrKM/Qz2h9ZWVlUEjdgePEbBSa4zWp3oZ41HV1dXBqN0OroYGaGlpidkJC02pvmJ4hTEmRTM4pbpMLXWSWSRNH0OP/1NmkTwPNzRQvUD7iVaZSGq0WLuwsABLS0uwsbGhCQIFBQVgQnfUYrFIC/EJihiOUURfU1MjVlRUUBfQGq8zQAu1U1NT4PF4pC0MrYjyurq6Cl6vF0pw+qTTxe0LkbdwB/vTHwceFR44MOiQP1TdQqenp6WMaVWUdypDnG+UE7MOmeFhNxVP9mPQSCOYmhRnZ2dhbW1N850hlYHKona0J2Yyu/+LLEpvp1it1ibY312lndFrSqnRZhj1oYuLi2dqpCkvL5f62Mhd4IgRnrrLcYT5XOkCfuUnBRL4P1MkX7z0x1AZKkNlMVSGylBZDJWhMlRWvPonwAB5m52fwA36MQAAAABJRU5ErkJggg==";				break;
		//case :		control_image = "owQkJERTUwOTA2OUUxMUUzOTkxNEY3QzY5QUFBNDdCMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQkJERTUwODA2OUUxMUUzOTkxNEY3QzY5QUFBNDdCMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNzVENDk2NTlBMDZFMzExODVCNEQ0OUFEM0IzMTY5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQkE1RUY5MjkwMDVFMzExQjAwQjk5MjAyMEZBMDRGOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnCfAo8AAAQySURBVHja7JxfSFNRHMd/d875n4jGIE1EStOHRPrzEsNISFoNwrBQSAl8ECdC9hrSk28+hRY+FSXIQIhigdDTFiQIgeSfkUi+NBlOp/PP/Lvdfud2tza7c//ucnf+vnC8557dnXvO55zzO79zz50cz/NAklcqQkBQCSpBJRFUgkpQSQSVoJ4McUNDQ0SBeurJgerFwIvBq6D6p6TcckF1R4inu1JSbrmguhQK1ZXOUD0KhepJZ6g0/AkqQVUcVHUKDL4ryrVS+zdcjN/hZM47nnJTT6Xhn2nDv6OjI6kMxGcH7ghuipKgetKtp6bST9VHiKdtuY9jopLSJQwaifQLGF6GnH/AYMIwL3Ht3jGUW1JcjEO81mKxVIyPjzcZDAabXq/fFz/ShAB5LKZNchynQmWzE7/ff4bneV06jHUs1xKWayUkKcvn81WK8Tdiw0yFNJATg0OM+1jdYu6pCI1BuY3hFoOENz+PIM6FXri+vg7PfT54PTPzUKvVQlVVFWAB/bm5uTuCHVGp+KKiItZItcESZ2VBXl5e2A1zcnJAo9HEBSM7W2gf2N/fj+t7e3t7sLu7G5qk297e1iHIsOs2NjZA7BQ+r9fLYUeIahaxvovI6RfmNYGnnzGMBRqDGx4evo43thwcHJwWWxMKCgoAYQmVYXGWVl9fD3xpKYx6vdDmdkNvXx80NjZCpoqBxwYQ4uyIfIC9IrW1tSU07s7OjhAPvDalVqvXsMPcxbSvnNVqtWNaVX5+PvT394PZbI7sWSNUpgnsAfeWl+FRTw+0t7fDSRaDzQBjD2edb95ut1dw+Ce4Cqmurg6Ci6YFzKzB5QJDZyeYTKaMBNb3zhb1mmetdWHnNpuNS9ilKler4YtOB28HBwM2iZSsn+ry+6F5ZQXauroAJygiGclPbWlpAW5kJKpNnUJDbcShb8TVWKYOfamhHbPrFmpTj1LA3o6hUX6Ak9TT3l6hEUjwj01Vx2qcKy/fgIGF7/BkdRVeoB1lLlamK5GJKq5l6sWrN2FApYI7CPckAP0va/9T2rNwraGZiMlpU0mx21R67Sed/FTS0VA9hEE2eQJQHcRCNjkDUCeJhWz6FoBqJhay6X3AT/2EYQFDeTK5sYe1DocDlpaWYHNzUxEECgsLQafTQUlJifAgPkkxhh9ZJKumpoYvKytjJqA1UW+APaidnp4Gp9MpbGEoRaysq7js9ng8wLaIVKqEnSG2P3MffdSfQZcKT6x46BY/jLuHzs7OCgVT7JSNZWd1SPAX5YxZt8gw3E/FxFd4MGL4EU+Oc3NzsLa2pnhjyOrA6hKnGCujyO7vMlXq1yl1dXVN8Gd3le2MXpHKjW2GMRu6uLiYUTNNcXGxYGMP7wIfmuGZuRxDmKOSa3/6yY/84ug/U9Dan6ASVBJBJagElURQCSpBJRHU9NFvAQYAyJuooRhq0a8AAAAASUVORK5CYII=";		break;
		//case :		control_image = "owQzUxMjY4MTA2OUUxMUUzQkRGRDgzQjYxMERGNjk1RCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQzUxMjY4MDA2OUUxMUUzQkRGRDgzQjYxMERGNjk1RCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNzVENDk2NTlBMDZFMzExODVCNEQ0OUFEM0IzMTY5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQkE1RUY5MjkwMDVFMzExQjAwQjk5MjAyMEZBMDRGOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkxyMmgAAAQlSURBVHja7JxfSFNRHMd/d5vzP1HJCM0kVqBBEgQ9ROytCBLCMEhECXwQVr70Gr5IPvTmgxa+ljADIRQDqYdwgUh/wNIcitVLW+J0bqhzTt3t97ve2Wb7d7c73NXfF36ec+/uPTvnc/78zrlnV0EURWCpKx0jYKgMlaGyGCpDZagshspQj4aEvr4+psAt9ehA9aOJsvk1VP6s5FstqJ448VxXVvKtFlS3RqG6cxmqT6NQfbkMlbs/Q2WomoNqyMKA705ybaz9GyHFewSV01aSb26p3P0ZatLM+TQK1ZdrULM5T70WJ56z+T4IRxVLF9GMMc6fQ3sWcTyEZkWbj3Ft8ADynRHUS2h6OV6BdkqOG2MAGREEQYfKo4NQKHRSFEVTkvS/pZiPE2gDCsu4NyPAfC1ivpYjPtPv7OyE40/kipmKqKAFNKccpwsnlUAlKDfRrhMk/HIzgjiddOzQ6UIFBQUBOS6WlpYKcgXs5livh8LCwqh78vPzwWg0KqKSlyfVD2xtbSm6LxgMwubmZuQp08bGhikCpKTV1VUK7hM4v98vYEPQpVB2F3L6jWl9xMN3aKPhyhD6+/uv4hePbG9vH5drE4qLiwFhSYWhOJ0zGAx7gCgkYIdZBB4rQIpTiHyAfiK1vr4uVW4gEJDi4Z9NIR8vNphbeG5cGBsbc+C56qKiIgkkwWOlLoJNgLGFU+Obdzgc5wX8E7UK6XppT5rQ42bLkQCWDgu73S6kPKXyLf2BT28HpJCl0jx19vN7ePhjEr7ah2FiYoLJJdB/3T+eampqQKyshEEcO1o8Hujo6oL6+nomuE/U/aO8UmdnJ9hstoQ3NaBDO4PO7HZHB3gQbmtrK5NMNPknoNQak+kKzjPHTSa40d0tzQOtVis7KjXW/mextX5AsC96e8OTZ1amUN2hENxbXoaWBw8AV1JMMl73b2xsBCHBmBoeGqZwRVHndkNdW9uh7fqZzMcVe/9RXD3cXVqCR+ioqBJYkP7knwD2rK1JLfRpTw8DTdL96UHtsWQXNjU1gU2ngyGEaTabmVychWe4+3/H8ALzUEWz2P2rqftPMgvV9CU8pXrFLFTT6/CY+gbtF83nM0mNHtY6nU5YXFyENXRoWlBJSQmYcAFTUVEhPYjPUMRwmCL62tpasaqqioaA5nQXA/Sgdnp6GhYWFqQtDK2I8rqysgI+nw/KyspoiyTdpGh/5g6Opz/3VlR4MIZBu/yh4hY6MzMjZUyzLhvzTmVI841yYtYuM4xepuLJ5xjUkQdTkuLc3Bx4vV7ND4ZUBiqLUm9PzGR2/1ZUsd5OsVgsDbC7u0o7o5djpUabYTSGulyuQ+VpysvLpTF2/y7wPg9Pw+UowhyMuUzlV37Ul8D/mUJ98XtUDJWhMlQWQ2WoDJXFUBkqQ2Wlq78CDAD5yKjbr8mr+wAAAABJRU5ErkJggg==";						break;
		//case :		control_image = "owOTg0MTk1MTA2OUUxMUUzQTREQTg5Q0I4ODREQzEwNSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowOTg0MTk1MDA2OUUxMUUzQTREQTg5Q0I4ODREQzEwNSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNzVENDk2NTlBMDZFMzExODVCNEQ0OUFEM0IzMTY5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQkE1RUY5MjkwMDVFMzExQjAwQjk5MjAyMEZBMDRGOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph2V7lQAAAQSSURBVHja7JzPSxtBFMffJjHGXxRt/FFzEGlrS8Eg/Qm2WOqhSOupeFDB0l4qjeQvKEhBeu+hKuKlWEHaCq1iqbQnc/AgFISKtiLtwUaC4o+gxhhNtu8tG5ukm2qSTc0m7wuPnZ3sjjOfmXkzs7OrIIoisNSVjhEwVIbKUFkMlaEyVBZDZaiZIaGvr48pcEvNHKgeNFE2j4bKn5R8qwV1LUo41ZWUfKsFdUWjUFdSGapbo1DdqQyVuz9DZaiag2pIgsNfOeRapf0b4Yj3CCqnHUu+uaVy90+37t/e3p5QAvKzg7Uo0xQtQXWnWktN5jz1RpRwyub7OAYqJVWjGRXiz6D1hJyPoNnQFhSu9R1DvhWlNDJeQHuM1os2K3fxGjzo5d8taGVy2BgC5IEcNy0Igg6VRSeBQOCkKIolqdDXMV/LmK/VkCi93++vksMv5Yr5GlJBLjSnHPZT2Y4MFaERlIbJycmHU1NT120uV/Gw1Qqtra3/9h06XcBkMnnlcE5BQUFYJen1esjJyQm7Jzs7G4xGY0wwsrKk+oG9vb2Y7vP5fLC7uxsWt7OzAwgyLG5zczMY9Hs8HgEbwqFuEcu7hJX0C9OawtPPaOPByhAGBwdr8Q+PORyOwjcDAzBQVARNubkgLC7C6Ogo5OXlUQ2DwWA4AERHApbOIvBUAcGK2N/fB3pFant7W6pcr9crhYOvTSGfDWwwdzFuUpiYmJgbGho6/76/H0bMZrgqtyKCGk0tLS3Q2dkJLJBgE2Bs4dT4Fubm5s4Kdrtd/NjbC5+Ki6HScLRxi4DjzWkP7Nkrx6HXPGmrCzvHHi8YBrq74VtZGZSleXf+n9Ld7+iA5tVVcEU4b1YC81SbzSZNBK/19MAYuoBqeaQ9zKdmgiK7dkyTfwJbWFgItV1d8BYHqwaTSfoxE/xmUlpqaOsrLS2FRnQHzxFw1cWbUR11vDWYCQPVX2v/+vp6uPPoKbw4XQPnLt/iJqfW2v+E+RRcud3MZBJZDqPf5C8pVBTNU/m1n2TMUxlBcqC6GYNqcgehOpmFanIFoU4zC9X0JQj1NbNQTe+C89QPaD/RKhNJjR7WOp1OWF5ehq2tLU0QyM/Ph5KSErBYLNKD+ARFDEcpoLdarWJFRQW5gLZ4ZwP0oHZmZgZcLpe0haEVUV7X19fB7XaD2WymLZJ4k6JHfPdwjvrjYEqFJxN4sMs/xtxCZ2dnpYxpdsjGvFMZ4vyinJjZZYbh81SMpN3TRrTvsaQ4Pz8PGxsbmneGVAYqS4wiVo0yuz/LVKWvU+rq6prw0IBGW9OXlFKjzTDyoUtLS2k10pSXl0s+NnIXOGKEJ3c5jjCHFdf+/MmP+hL4P1Pw2p+hMlQWQ2WoDJXFUBkqQ2Ux1NTRbwEGABwNhB3/QvmBAAAAAElFTkSuQmCC";													break;
		//case :		control_image = "owQTEyNzhCNzA2OUUxMUUzOERBQjlDRENFQjZGQTBEMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQTEyNzhCNjA2OUUxMUUzOERBQjlDRENFQjZGQTBEMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNzVENDk2NTlBMDZFMzExODVCNEQ0OUFEM0IzMTY5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQkE1RUY5MjkwMDVFMzExQjAwQjk5MjAyMEZBMDRGOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Phwz8QAAAAQhSURBVHja7JzPSxtBFMffJjH+Pmg1ihZE2oIWlEKhBSkehIJYT8VDRSw9a/MXCF5sz/ai4sGLzcHSgigpFXtozaFIf4BtrVax7cFqg9bqosb4c/veuhuiXUl2s6lZ877wnNlfk5nPzLyZ2UkUJEkClrmyMQKGylAZKouhMlSGymKoDDU5JPT29jIFbqnJAzWAJikWsFD545Jvs6D+OSGe6IpLvs2CumxRqMuJDFW0KFQxkaFy92eoDNVyUB1xcPjLEe7V2r8RonxGMDltPfnmlsrdn6FGzJxoUahiokGN5zz1xgnxhM33aQxUWqpAc2qcv4jWHXY8hNaCNqdx784p5DsmqFfQ7Eq8GK1QiTs1gHgFQbChUujg4ODgnCRJrgjpf4oyH7loAzrLGJoRYL6WMF8rYdfs+/v7avyBUjGfwyrIj7agxOnGCT1QCUot2k2ChB9+AUGcj+g7bLaDtLS0oBKXsrOzBaUCDnNst0N6evqRZ1JTU8HpdOqikpIi1w/s7u7qem5nZwe2t7fDT7m2trZcYSBlra+vU3CPwAUCAQEbgi2Ksi8ip5+Y1ls8fIk2olaG4PF4qvCDvXt7ezlKbUJmZiYgLLkwFKdzDocjBIhCAnaWReCxAuQ4hcgH6CtSm5ubcuUGg0E5rn5tCvmsYYO5hefeCGNjY9N4riwjI0MGSfBY0YtgE2Bs4dT45qanpy8J+OfIKuThY1/EhNqaq5MCmBEWPp9P+Md3iL9/wbvRATlkmTBPHR8fh4++Ybj/bQJm3r9iOgYV6v6Dg4PQ0dYG/bm50ID+VZifB7zGhHSKur88KvX19YGnsxNeu1xwLWy6U15ervlgY2MjtLe3M8GTWqrb7ZZe9PTAaH4+lEY58idLKzY6UDn6u7rga2EhFJ7xeed/HajutrbCnZUV8B9bZbBiWPu3tLTIbyyud3eDF11AhbIkpC5+ksinJoOMzsdlJ0pgc3JyoKqjA57m5UEtrqxIPPqDcahq6ysoKIB6dAePEHCytMZ4Tf5DL2prampgyOuF8bo6aGpqYjr6JaqT/y8YXmYepmgGp1Rl1FInmIVp+qB2/yfMwjQNqgPVc7QfaKWxpEYvaxcWFmBpaQk2NjYsQSArKwtcuDQvLi6WX8THKGI4TBF7ZWWlVFJSQi6gGQzurtKL2snJSfD7/fIWhlVEeV1dXQVRFCEPp5I2m+HNZVo53UZ/+l3t/rReHcPArVzU3UKnpqbkjFl2yMa8UxkM/qKcmLkVhqEplfoioAeDehrB9KQ4OzsLa2trlneGVAYqi97Rnpgp7ELS/HVKdXV1AxzurtLO6FWt1GgzjHzo4uLimRppioqKZB97fBf42AhP7nIEYT7TuoF/8hMHCfyfKeKzTGUxVIbKUFkMlaEyVBZDZagMlWVEfwUYAAMkl58vYs53AAAAAElFTkSuQmCC";								break;

		//case :			control_image = "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";							break;
		//case :			control_image = "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";					break;
		//case :			control_image = "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";																								break;
		//case :			control_image = "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";					break;
		//case :			control_image = "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";													break;
		//case :			control_image = "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";						break;
		//case :			control_image = "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";																						break;
		//case :			control_image = "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";			break;

		case CONST_CTRL_Null:
		default:				control_image = "iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACfUExURQAAAP////////////////////////////////////////////////////////////////////////////////////b29u3t7eXl5cfHx8HBwbu7u7a2trGxsaysrKioqJ2dnZmZmZKSko6OjouLi4iIiIWFhYKCgnp6en9/f3h4eICAgFBQUExMTE9PT0tLS3JycnR0dHV1dX5+fn9/f/4ng8gAAAA1dFJOUwABAgMFBgcICQoLDA0PEBIUFRcYGRobHB0gISIjJCUmJygqKywtLi8wMDEzREVFRlNUVVhZ0uG/8AAAAjNJREFUWMPtmNtygjAQhlPrqVWrtQSth6JSi+IBrb7/s5UsCElYCklDZzrTvciEJf+XuEk2GEJ4q/WonvVqJM/uuhbVNat7h0PbQ6Hd62yxZOaumXk+Mw/qLvgXs4nQfthGmI2B2LnjF9tSlAwaEvO+L/+kjxLUrSzq3/PQTjag2xJUPxveTsKsPyPh16NS+lyPZh5fTbrUcJWFq6EVz3zUJm2pQpW0wxah1DiVUiL60rIcFdf+U6um8qZKlbXVUanhvRWtV8cxSmU4whKpY5AKOKBiWE1qRCM0B6tHjVmE5mC1qDcSoTlYHWrCIWmIjVAdmlKR1aUXAYfy1KytS0C9b3YBs1Gm+4lXDJ1y2zSyUQFVyX6VathIwRhUX4hUe+7ug707t7WosjqmTsLlGQRB+EE20aBm1BH1jUUa/OImK0fNqoE69Tm/P1WkImpGtT3B79nJWVZAhVaIGqhzX/D78+QUDj04NHoBrRA1UF142p0u5x3UXCVqoj4laqAeA2bn6/X6CbWjREU+JbgXiBqoB3i6hP4L1A5KVERd4VjjyJyvP4krr65wDdhbwb+1laiIusK9Ff+9zMsD49VmNRZKqTsHzwNhf0nWmWaGxKbjXSjlH5FRc/n1GBzR/LoJSRuhxPKroC5xFhSPVeeEGbu+OxbKstS/dHKbpj6a/xqwHghpWiqjKdH0Ba5fCrBJ8gArZlvxnU7LJNVq3i5eHgxGoJXeEfWNzdQTf51lmZr+6L7wCwfbRaKdlCU9AAAAAElFTkSuQmCC";
	}

	if((CONST_CTRL_ValueFixedBegin <= control_id) && (control_id <= CONST_CTRL_ValueFixedEnd)){ 
		setHTML_Attribute(id, "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAYAAADcUiVtAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAOPSURBVHja7JtRiqNAEEB1DxDICQI5wYAnGDAXWMheYMDF/c6gZL8dlM33BAN7gQRygQhzAQO5QDxCAnMBtyrdWV2xW02bcZOpgpqGdHeiz+qqrmpHT9NUI2lXvhACgkpQCSoJQSWoBJWEoBJUgkpCUAkqQSUhqAT1LgXrqSpaEAvUAz3gV0s0BnX4+Lz0QF8Fc/DzAR/3CLqUfP9rxW0/8Wsom4vf+6jEpCWoE9C9ZVmp4zjp4XBIZRLH8Wkcjudzz+Lg52Xi+z6O9fm45RIvXaAWg+NJoMaxYO6Sg+0aqmcYRrrf79OmgnPwYdSBGoYhjg3PljqUQIVlkvYZnIcSoJ4lmWuyeaYKEyWfquv61+FwON1sNhq0H+m13hJNm7uCzn5m0naxC/qmvmDeCjSCBsBEXQYqGywIrrTfRTj4uYA/iaATnbXJmrx7mVgcepnwhzTvLPqDlcKqN0yQi388SU5IkgunH4+a9uxKBoSZtWIAfIC1NHUkQNH6wUrfutxSCYEe4XZHoxGClyqMiRQtYwZLdrUSdA7ZFoM3mu0IrBSf6oJbf9f71L5o2a/gNqMowuvUK3QEula8h5NvPQo6HQZ3CmpZgjEBm/8MVnr8b6EqLutLgtZLUBG0QkF/xKw0AqAzyqgKxhbgsxR0jlnQElppG8HpHqG+I5jvDSctmKUuwErXtwLVr0hVz+lkr6XfmyGgRd2tw5Ws9GpQIaWslXlA9mSXbNCVglYgCVrFZY++GK5jd1dVKp6FtZmK7WRBK7+FCv42VPqrlVNsa/hS3rwT1Jqps18xwMqa3t1BvcJ+FnN7w6hyO1mm5d8MVNd1K1NU1CAI5i1GX0xFfjkNtiZA1cZK2y1ZqlsjTf3Rol/DOmmjqJcruJBPLREsWttN17LJsi0TrHVCUBsEJ3TY3yrcALoNADsgqJk8gcWNx5JN/kqSaZ3rgllDUKVWumWbUWzqlAdbC1q3DtWTbaFyxyM7APpS85TgU0Md1DnEg+Y3/wjPtKJIErQsFrS8zwzVER2PFKz0n4KLWx20pqpB61ahYinGdiTBKWFAi4d46y2vZJVmDy0FLRWoSZIkH0YRDxNzsUZ43pQrPYnYBYEkN+bWj0Hr8nN3hTdTqt57uqRYUfddqoFkHL7xUrWZn/BxwuK5yhsqOv3D751VqQgqCUElqASVhKASVIJKQlAJKkElIagElaCSENRryR8BBgC8pG65iATSpAAAAABJRU5ErkJggg==");
	}
	else if((CONST_CTRL_FunctionoutputBegin <= control_id) && (control_id <= CONST_CTRL_FunctionoutputEnd)){ 
		setHTML_Attribute(id, "src", "data:image/png;base64,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");
	}
	else if(((CONST_CTRL_VirtualSwitchBegin <= control_id) && (control_id <= CONST_CTRL_VirtualSwitchEnd)) || ((CONST_CTRL_VirtualSwitchInverseBegin <= control_id) && (control_id <= CONST_CTRL_VirtualSwitchInverseEnd))){	
		setHTML_Attribute(id, "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAYAAADcUiVtAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAP5SURBVHja7JtvatswGMbt0c8Fn2DgEwx8gg73AgWfYJCQ7x3uBTIc2OcM+wgeO4EDu4ADu0B6BAd6AU9PJCeOI8mKFzdV9z4gRPErJ/5Vfv+pdeu6dkiX1QdCQFAJKkElEVSCSlBJBJWgElQSQSWoBJVEUAkqQTWQ67pzNio2aslYSuy74yPsFOtzNu4kawI2YjYKxbr95wu7WKwZhyqa1JccTFWF20pGyAa7Hnbsu0oSxfqcr89btnf4OQiCOo7juiiKWqckSXZ2GFjD1j5e+vlr/m0vDrUsFVASDiXpgapcH/P1sbB79H2/zvO8HqLNZoN7bWyBqtxpBYdSaKB6nmItRsDXs8l5AFCAGaoxoY4RqNZrxYXgaJKbqC5uceP95MzSNHUY2P8m+q9WigseJ+ohSJwLdX2YmDsMQqY3G/1vRgh8WwYNu1UKKORkwgOnQVCVn//09OQsFgvldRak+M7fYtM7P6yA2tqt0kf3jqZT5mE/VN/zPIXfWQMobD6z8SIxuWXXZy2PktkEVelXw6PpSPCQnor26jBNVB8qYAsv4/yWmAD0wtaKSulXA/7USLy9c1797X7Cm7uV2iFwsRQL0esXG3PszKs41TFSinOKAJOkv8lvD+x8bbpUVdUuwUfKhHz2tZ9/TKh53pPEd6Aqk/6I20ct26Kvempy0clkgrXs1s6X9wAVcVZbbnagKne2x+3b7mKX/GNHmqgsyzqKol3hgbU2Q4WPlEKqOKSqBVVpW3LbUrLJ5qjfz6mqsLvxyxD+1j6ofX7V57D8ffpo5k+7emQR/6z6H7ubFQ6459JWqEq/2vGTpnYy7TpVAIXX3FRWdalM/WpnByqDlMSfqoRAVCLqv7sulalfbflKZWdK409VQl66hEtI07QXrHADoVVQdX61CVZ4taNh/lSnT2ykgKYLZGhad/u7b7X1Z1RdNR0rUZ721fvn6g8b09Vq9fX+/t4xKGutO/jr6wMoy9Pno2mQvj9zvSrUm2vt1Fa3WtqZ6jSlZYpaKVkmlpxkBgycr2pmC9jP1kFlPmbtui5aICcdqEC4AE/flZICZcobWFmWJbImC3YiTgjUr9B6qHu5TkOlE6yKQnP2ZHDI15VR7d9XBCBLAHsbA5XWBTj9/dNRNJ1O0UP8hpMKW3cqXtS6Mtylzamr5mv/004VbUE7y9QO2PnEAOjm0Bd40EDNh5z3I2dt1f231kMVYJeBSOplMIUf7W0sN/V+89cmOsAACRvR+ju59xjP6b72/6aK42nU6TNJWpqJE84Xw5J01kokIk26m4n5p8z9XfwZ6R9+7Tn4I6gkgkpQCSqJoBJUgkoiqASVoJIIKkElqCSCelX9FWAAG5zHhDwzjGIAAAAASUVORK5CYII=");
	}
	else if(((CONST_CTRL_FlightmodeBegin <= control_id) && (control_id <= CONST_CTRL_FlightmodeEnd)) || ((CONST_CTRL_FlightmodeInverseBegin <= control_id) && (control_id <= CONST_CTRL_FlightmodeInverseEnd))){	
		setHTML_Attribute(id, "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAAA9CAMAAADrjNVfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACZUExURQAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABERESIAACIiIjMAADMzM0QAAERERFVVVWYAAGZmZncAAHd3d4gAAIiIiJkAAJmZmaqqqrsAALu7u8wAAMzMzN0AAN3d3e4AAO7u7v8AAP///5pH8WoAAAAXdFJOUwAADhEfIjAzQVJjZnR3hYiWmaq7zN3umNUNWAAAAVtJREFUWMPt1+FugjAQAOCOOZXZIggdrDomMFHZBOn7P9xCKaUkM9Kty8zS+9dL+HLhrrSAu98IYFSjGtWof6OCK3EL6sJ5CtsI0KJ53GULVwIhZpnJaBXibVrVbbynWwjAbEObSByBzknZZHbLsaqzPtVSnDAAKGPqOZp26urAMiUeqdrPVX1BpXuPo3ZM1VT/WF9UKeHF+oWaOlsP0froSyovFr5SNRWlzKpe+BCEvi2pNLYbFZeK6vKNqbknz2uvFn5TakIVVS9naoq+VmkMgSVK1aaWGDjySo9KExidv612zQpda6iWeLBQUvtIkVAz9j73bck/U3OvV0XvaUH0qX3zNxpVFIs9RvS9V9TtfzIl2mYgQ3b7od25D0TbvGYIuE3DDtFEr8rOmtUcaFZ5GNWoiio/Da+p9xHLfATjVItfqSxZFcn+ntVmgsd/etM0/wVGNapRb1D9BIFbq/KH++P3AAAAAElFTkSuQmCC");
	}
	else if((CONST_CTRL_CONTROLID_RemoteBegin <= control_id) && (control_id <= CONST_CTRL_CONTROLID_RemoteEnd)){ 
		setHTML_Attribute(id, "src", "data:image/png;base64,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");
	}
	else{
		setHTML_Attribute(id, "src", "data:image/png;base64," + control_image);
	}
}


function setControlAssignments(tagID, val, state){
	
	if(val < CONST_LoThreshold){
		if(state != "Low"){
			hideHTML(tagID + 'Empty_Value');
			hideHTML(tagID + 'High_Value');
			hideHTML(tagID + 'Center_Value');
			showHTML(tagID + 'Low_Value');

			hideHTML(tagID + 'Empty_IMG');
			hideHTML(tagID + 'High_IMG');
			hideHTML(tagID + 'Center_IMG');
			showHTML(tagID + 'Low_IMG');

			if(numpadOpen){
				handleNoneClosedNumpad();
			}
		}

		return "Low";
	}
	
	else if((val > CONST_CenterLowerThreshold) && (val < CONST_CenterUpperThreshold)){
		if(state != "Center"){
			hideHTML(tagID + 'Empty_Value');
			hideHTML(tagID + 'High_Value');
			showHTML(tagID + 'Center_Value');
			hideHTML(tagID + 'Low_Value');

			hideHTML(tagID + 'Empty_IMG');
			hideHTML(tagID + 'High_IMG');
			showHTML(tagID + 'Center_IMG');
			hideHTML(tagID + 'Low_IMG');

			if(numpadOpen){
				handleNoneClosedNumpad();
			}
		}

		return "Center";
	}
	
	else if(val > CONST_HiThreshold){
		if(state != "High"){
			hideHTML(tagID + 'Empty_Value');
			showHTML(tagID + 'High_Value');
			hideHTML(tagID + 'Center_Value');
			hideHTML(tagID + 'Low_Value');

			hideHTML(tagID + 'Empty_IMG');
			showHTML(tagID + 'High_IMG');
			hideHTML(tagID + 'Center_IMG');
			hideHTML(tagID + 'Low_IMG');

			if(numpadOpen){
				handleNoneClosedNumpad();
			}
		}

		return "High";
	}
	
	else{
		if((state == "Center") || (state == "High") || (state == "Low")){
			showHTML(tagID + 'Empty_Value');
			hideHTML(tagID + 'High_Value');
			hideHTML(tagID + 'Center_Value');
			hideHTML(tagID + 'Low_Value');

			showHTML(tagID + 'Empty_IMG');
			hideHTML(tagID + 'High_IMG');
			hideHTML(tagID + 'Center_IMG');
			hideHTML(tagID + 'Low_IMG');

			if(numpadOpen){
				handleNoneClosedNumpad();
			}
		}

		return "Empty";
	}	
}




function setHTML(tagId, value){
	try{
		document.getElementById(tagId).innerHTML = value;
	}catch(err){
		onError(err, "Error setHTML: ", false);
	}	
}


function getHTML(tagId){
	try{
		return document.getElementById(tagId).innerHTML;
	}catch(err){
		onError(err, "Error getHTML: ", false);
	}	
}


function hideHTML(tagId){
	try{
		document.getElementById(tagId).style.display = "none";
	}catch(err){
		onError(err, "Error hideHTML: ", false);
	}	
}


function showHTML(tagId){
	try{
		document.getElementById(tagId).style.display = "inline";
	}catch(err){
		onError(err, "Error showHTML: ", false);
	}	
}


function setHTML_Attribute(tagId, attr, value){
	try{
		document.getElementById(tagId).setAttribute(attr, value);
	}catch(err){
		onError(err, "Error setHTML_Attribute: ", false);
	}	
}


function setCSS(tagId, property, value){
	try{
		document.getElementById(tagId).style[property] = value;
	}catch(err){
		onError(err, "Error setCSS: ", false);
	}	
}





function getPopUpBlockerHTML(isNumpad){
	if(isNumpad){
		var html = "" +
		'<div id="PopUpBlocker_top"    class="bgMesh"></div>' +
		'<div id="PopUpBlocker_left"   class="bgMesh"></div>' +
		'<div id="PopUpBlocker_target"></div>' +
		'<div id="PopUpBlocker_right"  class="bgMesh"></div>' +
		'<div id="PopUpBlocker_bottom" class="bgMesh"></div>';
	}
	else{
		var html = '<div id="PopUpBlocker_top" class="bgMesh" style="width: 100%; height: 100%;"></div>';
	}

	return html;
}










var inputStringArray = [];
var g_popupList_Indices = [];

function showPopupList(tagObj, inputValue, isMultiple, isIndexUsed, Indices){ 
	if(numpadOpen && !($('#meindiv').is(':empty'))){
		handleNoneClosedNumpad();
	}

	g_isPopUp = true;

	setHTML('Pop_Up_Blocker', getPopUpBlockerHTML(false));
	showHTML('Pop_Up_Blocker');

	initScrollValues();

	tagId = $(tagObj).attr('id');
	$('#Pop_Up').css({'padding-left': '500px', 'top': '53px'});
	inputStringArray = inputValue;
	Indices = Indices[tagId];
	var htmlValue = $(tagObj).html();
	var htmlPopupListRow = '';	
	var scrollToIndex = -1;

	for(i in inputStringArray){
		clickedClass = '';

		if(isIndexUsed){
			if(isMultiple){
				for(var j = 0; j < Indices.length; j++){


					if(inputStringArray[i].Index == parseInt(Indices[j].Index)){
						if(typeof isFirstIndex == "undefined"){
							isFirstIndex = false;
						}

						if(!isFirstIndex){
							scrollToIndex = parseInt(Indices[j].Index);
							isFirstIndex = true;
						}

						clickedClass = 'popup-list-clicked';
					}	
				}
			}
			else{
				if(inputStringArray[i].Index == Indices){
					scrollToIndex = Indices;
					clickedClass = 'popup-list-clicked';
				}	
			}

			htmlPopupListRow += '<li id="Index_' + inputStringArray[i].Index + '" class="function-list-name ' + clickedClass + '" style="width: auto; min-width: 180px; max-width: 300px; white-space: nowrap;">' + inputStringArray[i].Name + '</li>';
		}
		else{
			if(inputStringArray[i] == htmlValue){
				clickedClass = 'popup-list-clicked';
			}	
			else{
				clickedClass = '';
			}	

			htmlPopupListRow += '<li id="' + tagId + '_' + i + '" class="function-list-name ' + clickedClass + '" style="width: auto; min-width: 180px; max-width: 300px; white-space: nowrap;">' + inputStringArray[i] + '</li>';
		}	
	}

	var Footer = 0;

	if((inputValue.length == 0) || (tagId == "Option_Button")){
		Footer = 1;
	}

	var htmlPopupListFooter = '';

	if(Footer == 0){
		htmlPopupListFooter += '<div id="poplist-footer-save" style="clear: both;" onclick="closePopupList(\'' + tagId + '\',' + isIndexUsed + ',' + isMultiple + ',true);">' +
								   '<div id="popuplist-close-save"></div>' +
							   '</div>' +
							   '<div id="poplist-footer-cancel" onclick="closePopupList(\'' + tagId + '\',' + isIndexUsed + ',' + isMultiple + ',false);">' +
								   '<div id="popuplist-close-cancel"></div>' +
							   '</div>';
	}
	else if(Footer == 1){
		htmlPopupListFooter += '<div id="poplist-footer" style="clear: both; width: 100%;" onclick="closePopupList(\'' + tagId + '\',' + isIndexUsed + ',' + isMultiple + ',false);">' +
							       '<div id="popuplist-close-cancel"></div>' +
							   '</div>';
	} 

	var htmlPopupList = '' +
		'<div id="popup-wrapper">' +
			'<div id="popup-outer">' +
				'<div id="PopUp_List_Container" class="popup-list-outer scrollContainerPopUpOuterVertical" style="height: auto; width: auto; max-height: 320px; overflow: hidden;">' +
					'<div id="scrollContainerPopUpInnerVertical" style="position: relative; top: 0px;">' +
						'<div class="popup-list-inner">' +
							'<ul id="PopupList" onClick="listElementClicked(event, ' + isMultiple + ');">' +
								htmlPopupListRow + 
							'</ul>' +
						'</div>' +
					'</div>' +
				'</div>' +
				htmlPopupListFooter + 
			'</div>' +
			'<div id="PopupArrowLeft"  style="margin-top: 0px; margin-left: 0px; display: none;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAZCAYAAAA4/K6pAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNzlCQzA1MUREMTExMUUyQjQ0REVGOUExMUE1NUJBMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNzlCQzA1MkREMTExMUUyQjQ0REVGOUExMUE1NUJBMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM3OUJDMDRGREQxMTExRTJCNDRERUY5QTExQTU1QkEzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM3OUJDMDUwREQxMTExRTJCNDRERUY5QTExQTU1QkEzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+H9VfTQAAAJBJREFUOE+d01sKgCAURVFtUE2muQTNpck0KmODhpiPc+/+sZ+zwMB43k8wlq5jj/k7bPlUS/n8sgC/MalAd0wKMBzTCpiOaQYsxzQCpDH1AHlMLWAaUw2Yx1QA15gA3GMC+B6Gp3IFN1L/RBdSA2RGWoBMSA8gGRkBJCEzgJbICqApogA0RFSAuogFoAYJ4QWKeRAvsXw0vgAAAABJRU5ErkJggg==" alt="" draggable="false" /></div>' +
			'<div id="PopupArrowRight" style="margin-top: 0px; margin-left: 0px; display: none;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAZCAYAAAA4/K6pAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDFDNEE3ODRERDI2MTFFMkI2OEI4QUIyMUFDRjFEMDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDFDNEE3ODVERDI2MTFFMkI2OEI4QUIyMUFDRjFEMDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MUM0QTc4MkREMjYxMUUyQjY4QjhBQjIxQUNGMUQwOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MUM0QTc4M0REMjYxMUUyQjY4QjhBQjIxQUNGMUQwOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnH/20IAAAB1SURBVHjapNXRDYAgDEVRXhd3GpdxqWc00cQIpOXyB4RDKC3Idnvath9XR63QojNmCpSQmMyZAikkEpuYAlMkCgE3BbpIFfghK8AHWQVehAA3QgERQOQIIkEUuUaRRBJJZZFiEilnkQcl9ToHWTwCSv/CKcAAS0QSHax/mhEAAAAASUVORK5CYII=" alt="" draggable="false" /></div>' +
		'</div>';

	var htmlPopupOuter = "<div id=\"Pop_Up_Outer\"></div>";
	$('#Pop_Up').append(htmlPopupOuter);
	$('#Pop_Up_Outer').html(htmlPopupList);

	if(Footer == 0){
		var popupInnerListWidth = $('#PopupList').outerWidth() - 26; 
		newpopupListFooterWidth = (( popupInnerListWidth - 180) * (0.28 / 120)) + 49.03;
		setCSS('poplist-footer-cancel', 'width', newpopupListFooterWidth + '%');
		setCSS('poplist-footer-save',   'width', newpopupListFooterWidth + '%');
	}

	setPositionPopupList(tagObj);

	initScrollbars('PopUp_List_Container');

	if(scrollToIndex != -1){
		
	}
}


function listElementClicked(e, isMultiple){
	if(isMultiple){
		if($('#' + e.target.id).hasClass('popup-list-clicked')){
			$('#' + e.target.id).removeClass('popup-list-clicked');
		}	
		else{
			$('#' + e.target.id).addClass('popup-list-clicked');
		}	
	}
	else{
		$('#PopupList').find('.popup-list-clicked').removeClass('popup-list-clicked');
		$('#' + e.target.id).addClass('popup-list-clicked');
	}
}


function setPositionPopupList (tagObj){
	var containerWidth  = $(tagObj).outerWidth();
	var containerHeight = $(tagObj).outerHeight();
	var containerOffset = $(tagObj).offset();
	var popupListWidth  = $('#popup-outer').outerWidth();
	var popupListHeight = $('#popup-outer').outerHeight();
	var popuoListTop  = 0;
	var popupListLeft = 0;
	var popupListMaxHeight = 320 + 90;
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

	
	if((containerOffset.left - documentOffsetWidth + (containerWidth/2)) > 400){
		popupListLeft = containerOffset.left - popupListWidth - documentOffsetWidth;

		if((documentOffsetWidth) > (containerOffset.left - popupListWidth)){
			
			popupListLeft += documentOffsetWidth - containerOffset.left - popupListWidth;
		}

		$('#PopupArrowRight').show();
		$('#PopupArrowRight').css({'margin-left': (popupListWidth - 5) + 'px', 'margin-top': (containerOffset.top + (containerHeight/2) - arrowTop) + 'px'});
	}
	else{
		popupListLeft = containerOffset.left + containerWidth - documentOffsetWidth;

		if((documentOffsetWidth + documentWidth) < (containerOffset.left + containerWidth + popupListWidth)){
			
			popupListLeft-= (containerOffset.left + containerWidth + popupListWidth) - (documentOffsetWidth + documentWidth);
		}

		$('#PopupArrowLeft').show();
		$('#PopupArrowLeft').css({'margin-left': '-11px', 'margin-top': (containerOffset.top + (containerHeight/2) - arrowTop) + 'px'});
	}

	$('#Pop_Up').css({'padding-left': popupListLeft + 'px', 'top': popupListTop + 'px'});
}


function closePopupList(tagId, isIndexUsed, isMultiple, isSave){
	if(isSave){
		outputStringTemp = "";
		outputString = "";
		outputIndicesString = "";
		outputIndicesStringTemp = "";
		indexList = [];

		var i = 0;
		$('#PopupList .popup-list-clicked').each(function() {
			outputStringTemp = $(this).html();
			outputString += outputStringTemp + ", ";
			indexListObj = new Object();
			indexListObj.Name = outputStringTemp;

			if(isIndexUsed){
				str = $(this).attr('id');
				outputIndicesStringTemp = str.split('_')[1];
				outputIndicesString += outputIndicesStringTemp + ", ";
				indexListObj.Index = parseInt(outputIndicesStringTemp);
			}

			indexList[i] = (indexListObj);
			i++;
		});
		$('#' + tagId).html(outputString.substring(0, outputString.length - 2));

		if(isIndexUsed){
			outputIndicesString = outputIndicesString.substring(0, outputIndicesString.length - 2);

			if(isMultiple){
				hideHTML('Pop_Up_Blocker');
				$('#Pop_Up_Outer').remove();
				g_isPopUp = false;
				submitSET(tagId, outputIndicesString);
			}	
			else{
				hideHTML('Pop_Up_Blocker');
				$('#Pop_Up_Outer').remove();
				g_isPopUp = false;
				submitSET(tagId, parseFloat(outputIndicesString));
			}	
		}
		else{
			hideHTML('Pop_Up_Blocker');
			$('#Pop_Up_Outer').remove();
			g_isPopUp = false;
			submitSET(tagId, outputString);
		}

		if(isMultiple){
			g_popupList_Indices[tagId]= indexList;
		}	
		else{
			g_popupList_Indices[tagId] = outputIndicesString;
		}	
	}
	else{
		hideHTML('Pop_Up_Blocker');
		$('#Pop_Up_Outer').remove();
		g_isPopUp = false;
	}
}



var keypad_selectionStart = 0;
var keypad_selectionEnd = 0;
var keypad_cursorposition = keypad_selectionStart;
var keypad_isPassword = false;

var keypad_isPwPopUp = false;


function showKeypad(tagId, isPasswordShown){
	if(numpadOpen && !($('#meindiv').is(':empty'))){
		handleNoneClosedNumpad();
	}

	g_isPopUp = true;
	setHTML('Pop_Up_Blocker', getPopUpBlockerHTML(false));
	showHTML('Pop_Up_Blocker');

	if(typeof isPasswordShown != "undefined"){
		keypad_isPassword = true;
	}
	else{
		isPasswordShown = true;
	}

	var inputType = "text";

	if(!isPasswordShown){
		inputType = "password";
	}

	setCSS("Pop_Up", "paddingLeft", "0px");
	setCSS("Pop_Up", "top", "0px");

	if(keypad_isPassword){
		inputString = $('#' + tagId).val();
	}
	else{
		inputString = $('#' + tagId).html();
	}

	

	if(isBAT){
		var htmlKeypad = '' +
		'<div id="flat-keyboard">' +
			'<div id="keytop"><input type="' + inputType + '" id="keypad_textfield" maxlength="30" value=""><div id="keypad_delete_all" onClick=\'keyDeleteAll();\'></div></div>' +
			'<div id="keyboard">' +
				'<div id="gray">' +
					'<ul onClick=\'keyPressed(event);\'>'+
						'<li id="key_Q">Q</li>' +
						'<li id="key_W">W</li>' +
						'<li id="key_E">E</li>' +
						'<li id="key_R">R</li>' +
						'<li id="key_T">T</li>' +
						'<li id="key_Y">Y</li>' +
						'<li id="key_U">U</li>' +
						'<li id="key_I">I</li>' +
						'<li id="key_O">O</li>' +
						'<li id="key_P">P</li>' +
						'<li style="margin-left: 38px;" id="key_A">A</li>' +
						'<li id="key_S">S</li>' +
						'<li id="key_D">D</li>' +
						'<li id="key_F">F</li>' +
						'<li id="key_G">G</li>' +
						'<li id="key_H">H</li>' +
						'<li id="key_J">J</li>' +
						'<li id="key_K">K</li>' +
						'<li style="margin-right: 36px;" id="key_L">L</li>' +
					'</ul>' +
				'</div>' +
				'<div id="blue">' +
					'<ul>' +
						'<li id="key_case" onClick=\'keyCase();\'><img id="capsLockIndicator" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkQ2MjU1NjM2NDk1MTFFMjgzM0RBNzg1NDMyQUI5NEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkQ2MjU1NjQ2NDk1MTFFMjgzM0RBNzg1NDMyQUI5NEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyRDYyNTU2MTY0OTUxMUUyODMzREE3ODU0MzJBQjk0RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyRDYyNTU2MjY0OTUxMUUyODMzREE3ODU0MzJBQjk0RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlTSZb8AAAESSURBVHjaYnz27BkDESAciNuB+C8QZwPxLkIamIgw1AeIFwCxIhCrAPFKILai1GB3IF4NxBxIYgJAvAmILcg12BGIV6EZCgPCUMONSDXYDGooHx6LRYF4LRCrE2uwKdQ1IkSEvwIQb8VmOLrBWtAwFWcgHihDXS6Py2BVqKHyDKQDbSBeAcQS6AbLQw3VYiAfWECToijMYDEgXg7E+gyUAzsgXgTE/IzAnHcAyLBnoC5YD3LxKwbqg9cgF7MCGdJoElOA2JsYA4DYElqGIINHLEDiNxA/QJP4TKTL/gDxXVJyHhORBjMCMQslBpAMRg0eNXjUYDIMZiQhS5Nk8F9aGVwMxJcIGPoFiKOgJRwGAAgwAOHMLUqq+uczAAAAAElFTkSuQmCC" alt="" draggable="false" /></li>' +
					'</ul>' +
				'</div>' +
				'<div id="gray">' +
					'<ul onClick=\'keyPressed(event);\'>' +
						'<li id="key_Z">Z</li>' +
						'<li id="key_X">X</li>' +
						'<li id="key_C">C</li>' +
						'<li id="key_V">V</li>' +
						'<li id="key_B">B</li>' +
						'<li id="key_N">N</li>' +
						'<li id="key_M">M</li>' +
					'</ul>' +
				'</div>' +
				'<div id="blue" style="float: none;">' +
					'<ul>' +
						'<li onClick=\'keyPressedDelete();\' id="key_delete"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAUCAYAAAAHpoRMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MDcyNTg3Mjk1NjRFMjExODMzREU3RkVGNjRGMTBGMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowNDJCODg1NDY0OTYxMUUyQUE3MkZCN0M0MzE5RkUzRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNDJCODg1MzY0OTYxMUUyQUE3MkZCN0M0MzE5RkUzRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgwNzI1ODcyOTU2NEUyMTE4MzNERTdGRUY2NEYxMEYwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgwNzI1ODcyOTU2NEUyMTE4MzNERTdGRUY2NEYxMEYwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kms0+QAAAMBJREFUeNrMluEOgzAIhNvG9+b2sn0N5xZ/GCzuQNaNpIkpKX6hd2jtvRciZFsoX472LyAMzDSQTzBTQa5gvCCPfUXz71iSQKDOe/JmZyJXsx6eoTqgQVa2M1GN4PDiomrAU7/ucyZDrLjQBVW/JboGhh7o+i+YmujOSu6ZMGBsF3AVc31DN90FGtlXvEDLQPmSAAKVp+q3aEuN2SEDa0tkzkQ7ZM0VNn+aMx6r/uSrneWytP+ZqUCN1MQUoKcAAwBn9TnAENTOqwAAAABJRU5ErkJggg==" alt="" draggable="false" /></li>' +
						'<li id="key_toggle" onClick=\'toggleLetters2Numbers();\'>?123</li>' +
					'</ul>' +
				'</div>' +
				'<div id="gray">' +
					'<ul>' +
						'<li id="key_space" onClick=\'keyPressed(event);\' style="width: 184px;"><img id="key_space_img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAbCAYAAAApvkyGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZDRTI1QTkzNjU5MzExRTJCODBFRTI3MzI4NTFCNTAzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZDRTI1QTk0NjU5MzExRTJCODBFRTI3MzI4NTFCNTAzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkNFMjVBOTE2NTkzMTFFMkI4MEVFMjczMjg1MUI1MDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkNFMjVBOTI2NTkzMTFFMkI4MEVFMjczMjg1MUI1MDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6x5ePLAAAAXUlEQVR42uzWMQ6AIBAEQE78/4/1bKkoTBTE2YqG5CbcJkRmlpWzlcUDCAgICAjYyX7jTvsziJfmPJpzfRr4qU3TwT92cETOUcC0ooDzdTC8ICAgICAgIOAUuQQYAJ/JBz0OY7VCAAAAAElFTkSuQmCC" alt="" draggable="false" /></li>' +
						'<li id="key_left"  onClick=\'setFocusPosition("left");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAaCAYAAACkVDyJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU1OUJGMjMzNjU5NTExRTJCODQyRUVCNzEwNDc4NUJBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU1OUJGMjM0NjU5NTExRTJCODQyRUVCNzEwNDc4NUJBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTU5QkYyMzE2NTk1MTFFMkI4NDJFRUI3MTA0Nzg1QkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTU5QkYyMzI2NTk1MTFFMkI4NDJFRUI3MTA0Nzg1QkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7BgMvAAAABH0lEQVR42mL8//8/Az0BEwOdwfC3kOX58+fEqBMD4lVA/AqIo4H4Ny19KA/EG4DYHohDgViaIh8SkFcF4tVArE+PONSC+kyfHonGFIi3QS2lbqLBImYGxJuAWByHnilA/JnEFM4IxH+BuBjdQkdoahTBo9mbAg9qIbvSHRpnIjTMhnowH/pAUyMHPUqacHpZBrOwnV6WwSz8S+/COxuIP9DTwl3QpP6WntXTMWhKfU1j+74gZ/wTQOwBxGuBWAGPJpCj/kBLD1JKGhCOYnz27Bm6pDoQbwViZRyaVYD4LhE1DTbwB1t5eBMap1dxaIKl6j9kYJwFMMzSE/Rs0zwE4kAgPkTPRtQLIA4B4h20rA+xpcoIIJ4PZT+ixEKAAAMAj8BBH6I9ZekAAAAASUVORK5CYII=" alt="" draggable="false" /></li>' +  
						'<li id="key_right" onClick=\'setFocusPosition("right");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAaCAYAAACkVDyJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYwMDIwNEUzNjU5NTExRTI4NEUyODQ0MkYwNDhCRkU3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYwMDIwNEU0NjU5NTExRTI4NEUyODQ0MkYwNDhCRkU3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjAwMjA0RTE2NTk1MTFFMjg0RTI4NDQyRjA0OEJGRTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjAwMjA0RTI2NTk1MTFFMjg0RTI4NDQyRjA0OEJGRTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4oiaX1AAABJ0lEQVR42mL8//8/Az0BEwOdwfC3kOX58+eU6GcF4qVALAbEYUD8itY+lAbiUCC2B+INQCxPzyC1BOKNQKxKzzjUh/pUi56JBmTZNiA2xZpogFgKiHuBmBmISSkF/gExLw45UFxuBmI/ID6FLMH47Nmzi0Baj0a54A009e5HDlI9GmY7EWicutMz4/NBLfWhZ0nDAcSrgTicnkUbyNJ2epelf+lp4Qcgzmahk2VvoXnyGMiHX2hs2WtoCj0GK2kCgHgZtJQhpaT5D9UvikfNAyAOBuJzyEXbXmg1Qyr4A8TKQHwHh/xdIPYG4pvoZSlMM1mpDof4VajPbtKjtjiBzWfoPqQWOAQqTYD4BT3qwx1AHILPMmr48BEQz4Km1EQg/khIA0CAAQBa2Tm1gSmEkAAAAABJRU5ErkJggg==" alt="" draggable="false" /></li>' +
						'<li id="key_dot"   onClick=\'keyPressed(event);\'>.</li>' +
					'</ul>' +
				'</div>' +
				'<div id="blue">' +
					'<ul>' +
						'<li id="key_cancel"  style="width: 115px;" class="" onClick=\'closeKeypad(false, "' + tagId + '");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAjCAYAAADizJiTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5MzZGRjRERTlCMEExMUUyODk1Njg0NkIwNjI4NjhFQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MzZGRjRERDlCMEExMUUyODk1Njg0NkIwNjI4NjhFQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQkE3RDFEQUYyOUFFMjExQkY4NkRDQzBDNkQwODQ3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgP6w2kAAAEOSURBVHjazNjhCoMwDATgOn3uSvbekiEIG0PW3OXaLiDbD3d+DNKmLu5eGlWvz2fRFpZ7Qn9c1d9VG/ciF5wbDVNiqVwkTIGlc9GwDDaVy4Qx2HTu46u3VqBr7aNzW91tQO4a7XpzrKron/Tr2VAzKbAyZGt5ymClyBaUxcqRESiDlSOj0F5YQ9ZhZMG2WUgUqsIasasVZr+20UgWymJp5N0WGq1j0G/Cg7NiW5SMiCORKexoJI2dgaSws5AwVo008TxLn0Kj66Qc23Myl2K7Hh+U2K7HByU2cwo93xntgft28L2V9BTKDBipXCY0MwXRuWhoalTL5CKhCiSduwUa4e57tuDcJfDG+S/qJcAAD2lfl8d7hcoAAAAASUVORK5CYII=" alt="" draggable="false" /></li>' +
						'<li id="key_confirm" style="width: 113px;" class="" onClick=\'closeKeypad(true, "' + tagId + '");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAjCAYAAADizJiTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQUIxRDZCQTlCMEExMUUyQTcxMEEzNzJDMzE5ODFDMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQUIxRDZCOTlCMEExMUUyQTcxMEEzNzJDMzE5ODFDMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQkE3RDFEQUYyOUFFMjExQkY4NkRDQzBDNkQwODQ3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psw8DHIAAADdSURBVHja7NjrCoMwDAXg6fbcGWcv3lHYj9GbaTpPMvBAQaHgh61NcEsp3f4heyCLfEYzj0BIfN2/qhl56Z2HpDpSzouIbGKjIivsHmRP9nL33KOaN5kDz6U3IdlQM5IJXUKyoMtIBvQnyCOotCqEB3IElVE5YyN7UFXtZSJbUHXtZSJL6FTtZSJLKJQPEjaytfQW7OnI3sc0g6UgR8eTFktBHh34iILUlFBEQGprPbyRM00JPJGz3RO8kJY2Dx5Iaz8KNnKlcQYTmYf139Ozc31atuu34wUNnrcAAwCJ1ARaCuqr5QAAAABJRU5ErkJggg==" alt="" draggable="false" /></li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
		'</div>';
	}
	else{
		var htmlKeypad = '' +
		'<div id="flat-keyboard">' +
			'<div id="keytop"><input type="' + inputType + '" id="keypad_textfield" maxlength="30" value=""></div>' +
			'<div id="keyboard" style="height: 60px;">' +





				'<div id="blue" style=" clear: both;">' +
					'<ul>' +
						'<li id="key_cancel"  style="width: 378px;" class="" onClick=\'closeKeypad(false, "' + tagId + '");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAjCAYAAADizJiTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5MzZGRjRERTlCMEExMUUyODk1Njg0NkIwNjI4NjhFQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MzZGRjRERDlCMEExMUUyODk1Njg0NkIwNjI4NjhFQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQkE3RDFEQUYyOUFFMjExQkY4NkRDQzBDNkQwODQ3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgP6w2kAAAEOSURBVHjazNjhCoMwDATgOn3uSvbekiEIG0PW3OXaLiDbD3d+DNKmLu5eGlWvz2fRFpZ7Qn9c1d9VG/ciF5wbDVNiqVwkTIGlc9GwDDaVy4Qx2HTu46u3VqBr7aNzW91tQO4a7XpzrKron/Tr2VAzKbAyZGt5ymClyBaUxcqRESiDlSOj0F5YQ9ZhZMG2WUgUqsIasasVZr+20UgWymJp5N0WGq1j0G/Cg7NiW5SMiCORKexoJI2dgaSws5AwVo008TxLn0Kj66Qc23Myl2K7Hh+U2K7HByU2cwo93xntgft28L2V9BTKDBipXCY0MwXRuWhoalTL5CKhCiSduwUa4e57tuDcJfDG+S/qJcAAD2lfl8d7hcoAAAAASUVORK5CYII=" alt="" draggable="false" /></li>' +
						'<li id="key_confirm" style="width: 377px;" class="" onClick=\'closeKeypad(true, "' + tagId + '");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAjCAYAAADizJiTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQUIxRDZCQTlCMEExMUUyQTcxMEEzNzJDMzE5ODFDMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQUIxRDZCOTlCMEExMUUyQTcxMEEzNzJDMzE5ODFDMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQkE3RDFEQUYyOUFFMjExQkY4NkRDQzBDNkQwODQ3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psw8DHIAAADdSURBVHja7NjrCoMwDAXg6fbcGWcv3lHYj9GbaTpPMvBAQaHgh61NcEsp3f4heyCLfEYzj0BIfN2/qhl56Z2HpDpSzouIbGKjIivsHmRP9nL33KOaN5kDz6U3IdlQM5IJXUKyoMtIBvQnyCOotCqEB3IElVE5YyN7UFXtZSJbUHXtZSJL6FTtZSJLKJQPEjaytfQW7OnI3sc0g6UgR8eTFktBHh34iILUlFBEQGprPbyRM00JPJGz3RO8kJY2Dx5Iaz8KNnKlcQYTmYf139Ozc31atuu34wUNnrcAAwCJ1ARaCuqr5QAAAABJRU5ErkJggg==" alt="" draggable="false" /></li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	var htmlKeypadOutter = document.createElement('div');

	htmlKeypadOutter.setAttribute("id", "Pop_Up_Outer");
	Pop_Up.appendChild(htmlKeypadOutter);
	setHTML("Pop_Up_Outer", htmlKeypad);
	$("#keypad_textfield").val(inputString);
	

	setCSS("Pop_Up_Outer", "paddingLeft", "12px");
	setCSS("Pop_Up_Outer", "paddingTop", "80px");
	setCSS("Pop_Up_Outer", "z-index", "10001");
	setCSS("Pop_Up_Outer", "position", "absolute");

	keyState = 0;
	shift = 1;
	capsLock = 0;
	setFocusPosition("set2End");

	$('#keypad_textfield').bind("click", function(){
		getFocusPosision("click");
	});
	$('#keypad_textfield').bind("input", function(){
		getFocusPosision("input");
	});
}

var inputString = "";
var keyState = 0;
var shift = 1;
var capsLock = 0;

var keys = new Array();

keys[0]= new Object();
keys[0]["key_Q"]= "Q";
keys[0]["key_W"]= "W";
keys[0]["key_E"]= "E";
keys[0]["key_R"]= "R";
keys[0]["key_T"]= "T";
keys[0]["key_Y"]= "Y";
keys[0]["key_U"]= "U";
keys[0]["key_I"]= "I";
keys[0]["key_O"]= "O";
keys[0]["key_P"]= "P";
keys[0]["key_A"]= "A";
keys[0]["key_S"]= "S";
keys[0]["key_D"]= "D";
keys[0]["key_F"]= "F";
keys[0]["key_G"]= "G";
keys[0]["key_H"]= "H";
keys[0]["key_J"]= "J";
keys[0]["key_K"]= "K";
keys[0]["key_L"]= "L";
keys[0]["key_Z"]= "Z";
keys[0]["key_X"]= "X";
keys[0]["key_C"]= "C";
keys[0]["key_V"]= "V";
keys[0]["key_B"]= "B";
keys[0]["key_N"]= "N";
keys[0]["key_M"]= "M";
keys[0]["key_toggle"]= "?123";
keys[0]["key_dot"]= ".";

keys[1]= new Object();
keys[1]["key_dot"]= ",";

keys[2]= new Object();
keys[2]["key_Q"]= "1";
keys[2]["key_W"]= "2";
keys[2]["key_E"]= "3";
keys[2]["key_R"]= "4";
keys[2]["key_T"]= "5";
keys[2]["key_Y"]= "6";
keys[2]["key_U"]= "7";
keys[2]["key_I"]= "8";
keys[2]["key_O"]= "9";
keys[2]["key_P"]= "0";
keys[2]["key_A"]= "!";
keys[2]["key_S"]= "@";
keys[2]["key_D"]= "#";
keys[2]["key_F"]= "$";
keys[2]["key_G"]= "%";
keys[2]["key_H"]= "~";	
keys[2]["key_J"]= "*";
keys[2]["key_K"]= "?";
keys[2]["key_L"]= "/";
keys[2]["key_Z"]= "_";
keys[2]["key_X"]= "|";	
keys[2]["key_C"]= "\\";
keys[2]["key_V"]= "(";
keys[2]["key_B"]= ")";
keys[2]["key_N"]= "-";
keys[2]["key_M"]= "+";
keys[2]["key_toggle"]= "ABC";
keys[2]["key_dot"]= ".";


function closeKeypad(isConfirm, tagId){
	if(isConfirm){
		if(keypad_isPassword){
			$('#' + tagId).val(inputString);
		}
		else{
			$('#' + tagId).html(inputString);
		}

		if(!keypad_isPwPopUp){
			
			submitSET(tagId, inputString);
		}
		else{
			keypad_isPwPopUp = false;
		}
	}
	else{
		
	}

	inputString = "";

	hideHTML('Pop_Up_Blocker');
	$('#Pop_Up_Outer').remove();
	
	g_isPopUp = false;
}


function keyPressed(e){
	if(inputString.length <= 30){
		if((e.target.id == 'key_space') || (e.target.id == 'key_space_img')){
			inputChar = " ";
		}	
		else{
			inputChar = e.target.innerHTML;
		}

		inputString = [inputString.slice(0, keypad_cursorposition), inputChar, inputString.slice(keypad_cursorposition)].join('');
		keypad_cursorposition++;
	}

	


	if(!capsLock && !keyState){
		toogleLettersUpperlower();
	}

	setFocusPosition("set2Current");
}


function keyPressedDelete(){
	if(keypad_cursorposition > 0){
		
		inputString = [inputString.slice(0, keypad_cursorposition-1), inputString.slice(keypad_cursorposition)].join('');
		
		
		keypad_cursorposition--;
	}

	setFocusPosition("set2Current");
}

function keyDeleteAll(){
	inputString = "";
	$("#keypad_textfield").val(inputString);
	setFocusPosition("set2End");
}

function keyCase(){
	if(shift && capsLock){
		shift = 0;
		capsLock = 0;
	}

	if(keyState){
		shift = 1;
	}	

	if(shift && !keyState){
		capsLock = 1;
	}	

	if(!capsLock){
		toogleLettersUpperlower();
	}

	if(capsLock){
		setHTML_Attribute('capsLockIndicator', "src", 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADzSURBVHja7JVNCwFRFIZvzFZWM8kCGylLRbKTYmPvt/kFyh+wtmFLsSJslK+SLGzkeE+xme69c68Zu3nr2Zw6z5xuzTmCiISCFriTPnOQlfWrpA44klkGMkdCqEPCLElZMQox2YpDJRbH4lj8g/hp8Uu/ZEXnI89JFotjKE6Bgq+25xXXp+gz5GndPzyxxxOnwSjCaSfA+258F4wjkM5A3n+aMmAaQroERdXN468tfpDuQDnomJbA2kJ6AFXTK83yrYH0DGo255+pgJNGegNNVb9OzNTBRSJ9gI6uN0jMNMDVJ+0G9ZmImTZYgQ3omfS8BRgAbI31wV3qepoAAAAASUVORK5CYII=');
	}
	else{
		setHTML_Attribute('capsLockIndicator', "src", 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAESSURBVHjaYvr//z8DETgciO8B8W0gdiNGDzGG+gDx9/8I8B6IrQjpY2LAD9yBeDUQcyCJCQDxJiC2wKcRn8GOQLwKzVAYEIYabkSqwWZQQ/nwWCwKxGuBWJ1Yg02hrhFhIAwUgHgrNsPRDdaChqk4A/FAGepyeVwGq0INlWcgHWgD8QoglkA3WB5qqBYD+QCUSlZCwx5ssBgQLwdifQbKgR0QLwJifkZgYj4AZNgzUBesB7n4FQP1wWuQi1mBDGk0iSlA7E2MAUBsCcR/0cQfsQCJ30D8AE3iM5Eu+wPEd0nJeUxEGswIxCyUGEAyGDV41OBRg8kwmJGELE2SwX9pZXAxEF8iYOgXII6ClnAYACDAAAhwsFV1lW3cAAAAAElFTkSuQmCC');
	}
}


function toogleLettersUpperlower(){
	if(keyState != 2){
		keyState^= 1;

		for(var key in keys[0]){
			str = $('#' + key).html();

			if(key == 'key_dot'){
				$('#' + key).text(keys[keyState][key]);
			}
			else{
				if(keyState == 0){
					$('#' + key).text(str.toUpperCase());
				}	

				if(keyState == 1){
					$('#' + key).text(str.toLowerCase());
				}	
			}
		}

		
	}
}


function toggleLetters2Numbers(){
	if(keyState == 2){
		keyState = 0;
		shift = 1;
		capsLock = 0;
	}
	else{
		keyState = 2;
	}

	for(var key in keys[keyState]){
		$('#' + key).text(keys[keyState][key]);
	}

	$("#keypad_textfield").focus();
}


function setFocusPosition(cmd){
	var inputfield = $('#keypad_textfield');
	var strLength = inputfield.val().length;

	if(isBAT){
		if(cmd == "set2End"){
			keypad_cursorposition = strLength;
		}

		if(cmd == "left"){
			if(keypad_cursorposition != 0){
				keypad_cursorposition--;
			}
		}

		if(cmd == "right"){
			if(keypad_cursorposition < strLength){
				keypad_cursorposition++;
			}
		}

		inputfield.focus();
		$("#keypad_textfield").val(inputString);
		inputfield[0].setSelectionRange(keypad_cursorposition, keypad_cursorposition);
		





	}
	else{
		inputString = inputfield.val();

		if(cmd == "set2End"){
			inputfield.focus();
			keypad_cursorposition = strLength;
			inputfield[0].setSelectionRange(keypad_cursorposition, keypad_cursorposition);
		}
	}
}

var inputCount = 0;

function getFocusPosision(eventType){
	
	
	
	
	
	
	
	
		
	setFocusPosition("set2current");
}




var numpadOpen = false;
var numpadSysTime = 0;
var numpadTargetTagId = "";
var numpadValue = 0;
var numpadTestValue = 0;
var numpadUnit = "";
var numpadPreValue = numpadValue;
var numpadIsTestUsed = false;
var numpadIsTestActive = false;
var numpadIsHTMLNumpadFirst = false;


var numpadMaxValue = 100;
var numpadMinValue = -100;
var numpadResolutionVal = 0.1; 	
var numpadResolutionInt = 1;	
var numpadIsSigned = 1;

function showNumpad(tagId, tagLimit, isTestUsed, isLimitFunction){
	if(numpadOpen && !($('#meindiv').is(':empty'))){
		handleNoneClosedNumpad();
	}

	if(typeof isTestUsed != "undefined"){
		numpadIsTestUsed = isTestUsed;
	}

	g_isPopUp = true;
	numpadOpen = true;

	setHTML('Pop_Up_Blocker', getPopUpBlockerHTML(true));
	showHTML('Pop_Up_Blocker');

	if(typeof g_numpadLimitObj[tagLimit] != "undefined"){
		if(g_numpadLimitObj[tagLimit]["IsSigned"] != -1){
			numpadMaxValue = parseInt(splitUnitFromValue(g_numpadLimitObj[tagLimit]["Max"]).value);
			numpadMinValue = parseInt(splitUnitFromValue(g_numpadLimitObj[tagLimit]["Min"]).value);

			
			
			
			switch(g_numpadLimitObj[tagLimit]["OutputResolution"]){
				case 6: 	numpadResolutionInt = 4;	numpadResolutionVal = 0.0001;	break;
				case 5: 	numpadResolutionInt = 3;	numpadResolutionVal = 0.001;	break;
				case 4: 	numpadResolutionInt	= 2;	numpadResolutionVal = 0.01;		break;
				case 3: 	numpadResolutionInt = 0;	numpadResolutionVal = 1; 		break;
				case 2: 	numpadResolutionInt = 1;	numpadResolutionVal = 0.5; 		break;
				case 1: ;
				case 0: ;
				default:	numpadResolutionInt = 1; 	numpadResolutionVal = 0.1;
			}

			numpadIsSigned = g_numpadLimitObj[tagLimit]["IsSigned"];
		}
	}

	if(typeof isLimitFunction != "undefined"){
		setDependingLimits(tagId);
	}

	numpadTargetTagId = tagId;
	numpadStr = getHTML(numpadTargetTagId);
	numpadStr = splitUnitFromValue(numpadStr);
	
	numpadValue = numpadStr.value;

	if(numpadValue.substring(0, 1) == "+"){
		numpadValue = numpadValue.substring(1, numpadValue.length);
	}	

	numpadUnit = numpadStr.unit;
	numpadPreValue = numpadValue;
	numpadTestValue = numpadValue;
	$('#Pop_Up').css({'top': '80px', 'padding-left': '11px'});
	var htmlNumpadOutter = "<div id=\"Pop_Up_Outer\"></div>";
	$('#Pop_Up').append(htmlNumpadOutter);
	$('#Pop_Up_Outer').html(getHtmlNumpadSlider(numpadTargetTagId));
	numpadSlider();
	control2image("Numpad_Control_IMG", g_NumpadControl);
	setPositionNumpad(numpadTargetTagId, numpadIsTestUsed);
}


function getHtmlNumpadSlider(numpadTargetTagId){
	htmlButtonMoveUp = 	 '<div id="Button_Start_Up" class="button_servo_move_stop button_servo_move_stop_top" onClick="numpadHandleTest(\'Up\', true);"><a draggable="false">Test</a></div>' +
						 '<div id="Button_Stop_Up"  class="button_servo_move_stop button_servo_move_stop_top" onClick="numpadHandleTest(\'Up\', false);"><a draggable="false">Stop</a></div>';
	htmlButtonMoveDown = '<div id="Button_Start_Down" class="button_servo_move_stop button_servo_move_stop_bottom" onClick="numpadHandleTest(\'Down\', true);"><a draggable="false">Test</a></div>' +
						 '<div id="Button_Stop_Down"  class="button_servo_move_stop button_servo_move_stop_bottom" onClick="numpadHandleTest(\'Down\', false);"><a draggable="false">Stop</a></div>';

	var htmlNumpadSlider = '' +
	'<div id="flat-numipt" style="position: absolute;">' +
		htmlButtonMoveUp +
		'<div id="PopupArrowUp" style="margin-top: -20px; padding-left: 0px; display: none;"><div class="popup_icon_arrowUp"></div></div>' +
		'<div id="tray" style="height: 62px;">' +
			'<div style="font-size: 16px; margin-left: 26px; padding-top: 16px; text-align: center; height: 46px; width: 705px;">' +
			
				
				'<div id="Slider_Track" style="width: 705px; height: 30px;">' +
					
					'<img width="705" height="30" draggable="false" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAsEAAAAeCAYAAADNRsOnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUMxRTlBREFDRTQ5MTFFMkIzMTNGOUQ0QzM4REZFNkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUMxRTlBREJDRTQ5MTFFMkIzMTNGOUQ0QzM4REZFNkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxQzFFOUFEOENFNDkxMUUyQjMxM0Y5RDRDMzhERkU2RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxQzFFOUFEOUNFNDkxMUUyQjMxM0Y5RDRDMzhERkU2RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pn1sK4cAAAD1SURBVHja7NzRCYMwFEDRWFxAXMsVnKF0ktIZXCFriSOkaZtAcQA/knPgIf6+r0sIGVJKAQAAenKzAgAARDAAAIhgAAAQwQAAIIIBAEAEAwCACAYAABEMAAAiGAAArjLGGG0BAIBuLMviJBgAgP6M5bvmeeWZrAQAgAYdee55ts9PPQl+CmAAABo2leYN/xE82wsAAI2bzxEMAADdqBG8WwUAAI3bzxH8CL/LwgAA0KKjNO9XfR1iKwMAAM1zJxgAgO4MKSVbAACgK06CAQAQwQAAIIIBAEAEAwCACAYAABEMAAAiGAAARDAAAIhgAAC4zFuAAQB1uxOBDaUmdQAAAABJRU5ErkJggg==" />' +
					'<div style="width: 705px; text-align: left; margin-top: -33px; margin-left: -22px;">' +
						
						'<img id="Slider_Thumb" width="51" height="30" style="cursor: pointer; left: 0%; position: relative;" draggable="false" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAeCAYAAACBkybCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNTQ0M0ExNzI1OUFFMjExQUEzQzg4NzhGM0U2OTRFQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQUFDRDlENjlBM0YxMUUyQUFCMkIwMjQzQUVEMjFBMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQUFDRDlENTlBM0YxMUUyQUFCMkIwMjQzQUVEMjFBMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNTQ0M0ExNzI1OUFFMjExQUEzQzg4NzhGM0U2OTRFQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNTQ0M0ExNzI1OUFFMjExQUEzQzg4NzhGM0U2OTRFQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmVq2oQAAAMbSURBVHja3FhLT1NBFP7uowWxUpGHCK6MiV2aQGLihsQd7owJO2NMjP/AnWs3/AHjT3DlUjdKYKWJKxIfC1+QCDZgaWnpfc2MZy7nlmkDsbcQuXCS787t6Uw73/3OnDtnLExMFTB+/Qks5x6ACWTVlFpH5L3A19fzaJSb5AkIEUEwpIOrs09hu4/pwzlk2SyrACd3A4OXCygvvyePoykyYrouEbmv7+7evoWx0WEEoYSQMnNc1ssbePVmCcgNzNHHZ4SGpmh0kS5dRvTd6MgQNms72Kp7CCJJqqqM0XFYIfs8XccIW4kiHGa2m3T1gxAVIvNn24uVyRyXdhvhNuS1E6+fFhkRRUQoQBgGXf/ihfIiJgoK4uw4PqlrPft7sCEm0GDohGDbe8mC1JAiFfTEZmZm8HBu9lD+bmGYTlYFQj8hzzFokBFERohUKBaLKJVKmJ6ePpS/Wxh2htDHRFwmY7l7ykTEfhddL0nHQT6fj2GOS+vvwTSJnEHEbifTkrO3PzloXFp/l2YnBMw3kbuXpbWUUYyeyBwwLq0/zWu0o0WLjCQykp6W7PFPDhqX1n8YYic1zPY1I8zkflkjRZiJI/EfCZlElVOhjDp5CeAfZJQ4LcrsqnJCs1kHGWNv1q2t1RR838fbd8tt49L6jy4/Tz2KN/t3bl7Bt9V1KgMamd33r1T5/fjh+TxdfxG+c1smVNtS8y4Esmtu27LraOlbJStUvQ1t1Jp0K2Nk0QLJqojQ04+eYZaQykWw/RJ9xQdLH38bG9IMW231CxdmoXE6ExNzsPVzFYOTw3Byk6RQf2ZJCN9DdeUzfiwsUPjo+r9KqBC2udr0tXYlrqkvES4ShglFwgDXDHbn7vR/npYlK5qV2GESmwQdSmuEDSZV1yvK4041I8YCrubyBpnjNMlzarISFZ7vDs8/So6afM2KVYBxUNBnKGMdIxFlKJPMtcZHTXX2hQmZpjHZkIn0G/W1lQFlFD/9wIikOiNRRrjcIRkQcEezvkYGlAFnrYgfuMeKJG0rzKJ94tIxDgqQgQSQzE90kIqM9Kz+CjAAtX2rUJZSrY8AAAAASUVORK5CYII="/>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div id="tray" style="height: 124px;">' +
				'<div class="clear"></div>' +
				'<div id="gray">' +
					'<ul>' +
						'<li id="DecrementButton" style="width: 124px;" onClick="changeNumpadValue(\'dec\');"><div class="popup_icon_minus"></div></li>' +
					    '<li id="IncrementButton" style="width: 125px;" onClick="changeNumpadValue(\'inc\');"><div class="popup_icon_plus"></div></li>' +
					    
					    
					    '<li style="width: 125px;"><img id="Numpad_Control_IMG" class="popup_icon_rotaries"></img></li>' +
						
					    '<li id="SwitchToNumButton" style="width: 125px; font-size: 24px;" onClick="toggleNumpad(false);">123...</li>' +
					    '<li id="ResetValButton" style="width: 125px;" onClick="resetNumpadValue();"><div class="popup_icon_reset"></div></li>' +
					    '<li id="CheckButton" class="numipt_popup-close" style="width: 124px;" onClick="closeNumpad(false);"><div class="popup_icon_ok"></div></li>' +
					'</ul>' +
				'</div>' +
				'<div id="blue"></div>' +
			'</div>' +
		'</div>' +
		'<div id="PopupArrowDown" style="margin-top: 68px; padding-left: 0px; position: absolute; display: none;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAANCAYAAABcrsXuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MjhGRUZFNDg2MzExRTJCNTYxODhBMDEzMUJDMzVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU1MjhGRUZGNDg2MzExRTJCNTYxODhBMDEzMUJDMzVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTUyOEZFRkM0ODYzMTFFMkI1NjE4OEEwMTMxQkMzNUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTUyOEZFRkQ0ODYzMTFFMkI1NjE4OEEwMTMxQkMzNUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5lMsq2AAAAZUlEQVR42rSUSQrAIBAEu3x4XpPP+KqYixBCjNu0MOCtxl7kOPMl80n3YGaQ6sUFqC+RCcRTLhlAvD1RMIgv4xUIopUuBYH4i7ACQPR6ok0QI2Xc2ZTRxq9qzsy3smLuVCiKAAMAa2gDHN9KacgAAAAASUVORK5CYII=" alt="" draggable="false" /></div>' +
		htmlButtonMoveDown +
	'</div>';

	return htmlNumpadSlider;
}


function getHtmlNumpadPad(tagId){
	if(numpadResolutionInt == 0){

		classDot = "no_edit";
	}	
	else{
		classDot = "";
	}	

	var htmlNumpadPad = '' +
		'<div id="flat-numipt">' +
			'<div id="PopupArrowUp" style="margin-top: -20px; padding-left: 0px; display: none;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAQCAYAAADj5tSrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mzc5QkMwNTFERDExMTFFMkI0NERFRjlBMTFBNTVCQTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mzc5QkMwNTJERDExMTFFMkI0NERFRjlBMTFBNTVCQTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzlCQzA0RkREMTExMUUyQjQ0REVGOUExMUE1NUJBMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNzlCQzA1MEREMTExMUUyQjQ0REVGOUExMUE1NUJBMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph/VX00AAABpSURBVHja3NRLCsAgDATQZg7e0/QyPdXUlVj6ScckmwoiUSYPQbR12xdxsE1TApgAxjUdoVOHEYr7MsLguYsweFMX4eSj+IyowGsOicBjHsnAbR8UAJd+KAJOEAqBDhlZbbTf9DfIIcAAYpMj5/WxV2sAAAAASUVORK5CYII=" alt="" draggable="false" /></div>' +
			'<div id="graybtn" style="height: 62px;">' +
				'<ul>' +
					'<li class="NumpadNum" onClick="changeNumpadValue(\'1\');">1</li>' +
					'<li class="NumpadNum" onClick="changeNumpadValue(\'2\');">2</li>' +
					'<li class="NumpadNum" onClick="changeNumpadValue(\'3\');">3</li>' +
					'<li class="NumpadNum" onClick="changeNumpadValue(\'4\');">4</li>' +
					'<li class="NumpadNum" onClick="changeNumpadValue(\'5\');">5</li>' +
					'<li class="NumpadNum" onClick="changeNumpadValue(\'6\');">6</li>' +
					'<li class="NumpadNum" onClick="changeNumpadValue(\'7\');">7</li>' +
					'<li class="NumpadNum" onClick="changeNumpadValue(\'8\');">8</li>' +
					'<li class="NumpadNum" onClick="changeNumpadValue(\'9\');">9</li>' +
					'<li class="NumpadNum" onClick="changeNumpadValue(\'0\');">0</li>' +
				'</ul>' +
			'</div>' +
			'<div id="tray" style="height: 124px;">' +
				'<div class="clear"></div>' +
				'<div id="gray">' +
					'<ul>' +
						


						'<li id="MinusButton" style="width: 124px; font-size: 35px;" onClick="changeNumpadValue(\'toggle\');">+/<span style="margin-top: -5px;">-</span></li>' +  
						'<li id="DotButton" class="' + classDot + '" style="width: 125px;" onClick="changeNumpadValue(\'.\');">.</li>' +
						'<li id="BackspaceButton" style="width: 125px;" onClick="changeNumpadValue(\'del\');"><div class="popup_icon_delete"></div></li>' +
						'<li id="SwitchToSliderButton" style="width: 125px;" onClick="toggleNumpad(true);"><div class="popup_icon_slidebar"></div></li>' +
						'<li id="ResetValButton" style="width: 125px;" onClick="resetNumpadValue();"><div class="popup_icon_reset"></div></li>' +
						'<li id="CheckButton" style="width: 124px;" onClick="closeNumpad(true);"><div class="popup_icon_ok"></div></li>' +
					'</ul>' +
				'</div>' +
				'<div id="blue"> </div>' +
			'</div>' +
			'<div id="PopupArrowDown" style="margin-top: 6px; padding-left: 0px; position: absolute; display: none;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAANCAYAAABcrsXuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MjhGRUZFNDg2MzExRTJCNTYxODhBMDEzMUJDMzVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU1MjhGRUZGNDg2MzExRTJCNTYxODhBMDEzMUJDMzVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTUyOEZFRkM0ODYzMTFFMkI1NjE4OEEwMTMxQkMzNUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTUyOEZFRkQ0ODYzMTFFMkI1NjE4OEEwMTMxQkMzNUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5lMsq2AAAAZUlEQVR42rSUSQrAIBAEu3x4XpPP+KqYixBCjNu0MOCtxl7kOPMl80n3YGaQ6sUFqC+RCcRTLhlAvD1RMIgv4xUIopUuBYH4i7ACQPR6ok0QI2Xc2ZTRxq9qzsy3smLuVCiKAAMAa2gDHN9KacgAAAAASUVORK5CYII=" alt="" draggable="false" /></div>' +
		'</div>';

	return htmlNumpadPad;  
}


function setPositionNumpad(tagId, numpadIsTestUsed){
	var widthContainer  = $('#' + tagId).outerWidth();
	var heightContainer = $('#' + tagId).outerHeight();
	var numpadHeight = 140;
	var numpadTop = 0;
	var documentWidthOffset = $('body').offset().left + 30; 

	var offsetContainer = $('#' + tagId).offset();

	
	$('#PopUpBlocker_top').css({'height': offsetContainer.top + 'px'});
	$('#PopUpBlocker_left').css({'height': heightContainer + 'px', 'width': (offsetContainer.left - documentWidthOffset + 30) + 'px'});
	$('#PopUpBlocker_target').css({'height': heightContainer + 'px', 'width': widthContainer + 'px'});
	$('#PopUpBlocker_right').css({'height': heightContainer + 'px', 'width': (796 - (offsetContainer.left + widthContainer - documentWidthOffset + 30)) + 'px'});
	$('#PopUpBlocker_bottom').css({'height': (476 - (offsetContainer.top + heightContainer)) + 'px'});
	

	
	
	if(offsetContainer.top > 240){
		numpadTop = offsetContainer.top - numpadHeight;
		$('#PopupArrowDown').show();

		if(numpadIsTestUsed){
			if(numpadIsTestActive){
				$('#Button_Stop_Down').show();
			}
			else{
				$('#Button_Start_Down').show();
			}
		}

		$('#PopupArrowDown').css({'padding-left': (offsetContainer.left + (widthContainer/2) - documentWidthOffset) + 'px'});
	}
	else{
		numpadTop = offsetContainer.top + heightContainer;
		$('#PopupArrowUp').show();

		if(numpadIsTestUsed){
			if(numpadIsTestActive){
				$('#Button_Stop_Up').show();
			}
			else{
				$('#Button_Start_Up').show();
			}	
		}

		$('#PopupArrowUp').css({'padding-left': (offsetContainer.left + (widthContainer/2) - documentWidthOffset) + 'px'});
	}

	$('#Pop_Up').css({'top': numpadTop + 'px'});
}


function numpadSlider(){
	setSliderThumb();

	var handlerMousemove = function(event){onSliderEvent(event, false);};

	var handlerBind = function(){
		$("#Slider_Track").bind("mousemove", handlerMousemove);
	};

	var handlerUnbind = function(event){
		$("#Slider_Track").unbind("mousemove", handlerMousemove);
	};

	$("#Slider_Track").bind("mousedown", handlerBind);
	$("#Slider_Track").bind("mouseup", function (event){onSliderEvent(event,true);});
	$(document).bind("mouseup", handlerUnbind);

	
	
	
	
}


function setSliderThumb(){
	sliderVal = (parseFloat(numpadValue) - numpadMinValue)*100/(numpadMaxValue - numpadMinValue);
	$('#Slider_Thumb').css("left", sliderVal + "%");
}


function onSliderEvent(e, isMouseUp){
	var offset = numpadMaxValue - numpadMinValue;
	var offsetTrack = $('#Slider_Track').offset().left;

	pixelVal = e.pageX - offsetTrack;

  	if(pixelVal < 0){
  		pixelVal = 0;
  	}	

  	if(pixelVal > 705){
  		pixelVal = 705;
  	}	

  	sliderVal = pixelVal*100/705;
	$('#Slider_Thumb').css("left", sliderVal + "%");

  	
	numpadValue = (numpadMinValue + offset*sliderVal/100);

	if(numpadResolutionVal == 0.5){
		numpadValue = (Math.round(parseFloat(numpadValue) * 2))/2;
	}

  	getToFixed(); 

	outputValue = checkSignPlus(numpadValue);
	$('#' + numpadTargetTagId).html(outputValue + numpadUnit);

	if(isMouseUp){
		submitSET(numpadTargetTagId, parseFloat(numpadValue));

		return;
	}

	var zeit = new Date();
	var ms = zeit.getMilliseconds();

	if((zeit - numpadSysTime) > 500){
		submitSET(numpadTargetTagId, parseFloat(numpadValue));
		numpadSysTime = zeit;
	}
}


function toggleNumpad(isPad){
	$('#flat-numipt').remove();

	if(isPad){
		isHTMLNumpadFirst = false;
		numpadValue = checkNumpadLimits(numpadValue);
		checkNumpadValue(numpadTargetTagId);
		
		submitSET(numpadTargetTagId,  parseFloat(numpadValue));
		$('#Pop_Up_Outer').html(getHtmlNumpadSlider(numpadTargetTagId));
		numpadSlider();
		control2image("Numpad_Control_IMG", g_NumpadControl);
		setPositionNumpad(numpadTargetTagId, numpadIsTestUsed);
	}
	else{
		isHTMLNumpadFirst = true;
		$('#Pop_Up_Outer').html(getHtmlNumpadPad(numpadTargetTagId));
		setPositionNumpad(numpadTargetTagId, numpadIsTestUsed);
	}
}


function closeNumpad(isPad){
	numpadValue = checkNumpadLimits(numpadValue);

	if(numpadIsTestUsed){
		if(numpadIsTestActive){
			var tagIdArrayTest = numpadTargetTagId.split("__");
			tagIdArrayTest = tagIdArrayTest[1].split("_");
			IndexTest = parseInt(tagIdArrayTest[0]);

			GetTd({"cmd":0x0257, "param": {"ServoIdx": IndexTest}}, "noEvent", "command");
			numpadIsTestActive = false;
			submitSET(numpadTargetTagId, parseFloat(numpadValue));
		}
	}

	if(isPad){
		checkNumpadValue(numpadTargetTagId);
		submitSET(numpadTargetTagId,  parseFloat(numpadValue));
	}

	hideHTML('Pop_Up_Blocker');

	
	$('#Pop_Up_Outer').remove();

	numpadOpen = false;
	g_isPopUp = false;
}


function handleNoneClosedNumpad(){
	
	setHTML(numpadTargetTagId, numpadValue);
	
	closeNumpad(true);
}


function changeNumpadValue(key, ControlValue){
	switch(key){
		case 'control': numpadValue = parseFloat(numpadValue) + ControlValue*numpadResolutionVal;
						getToFixed();
						numpadValue = checkNumpadLimits(numpadValue);
		 				break;
		case 'dec': 	numpadValue = parseFloat(numpadValue) - numpadResolutionVal;
						getToFixed();
						numpadValue = checkNumpadLimits(numpadValue);
						break;
		case 'inc':		numpadValue = parseFloat(numpadValue) + numpadResolutionVal;
						getToFixed();
						numpadValue = checkNumpadLimits(numpadValue);
						break;
		case 'toggle':	if(numpadValue.substr(0, 1) == "-"){
							numpadValue = numpadValue.substr(1, numpadValue.length);
						}
						else{
							numpadValue = "-" + numpadValue;
						}
						break;			
		case '.':		if(numpadValue.indexOf('.') == -1){
							numpadValue += '.';
						}
						break;
		case 'del':		if((numpadValue.length != 1) || (numpadValue.substr(0, 1) != "-")){
							numpadValue = numpadValue.substr(0, numpadValue.length -1);
						}
						isHTMLNumpadFirst = false;
						break;
		default:		if(isHTMLNumpadFirst){
							if(numpadValue.substr(0, 1) == "-"){
								numpadValue = "-";
							}
							else{
								numpadValue = "";
							}

							isHTMLNumpadFirst = false;
						}
						numpadValue += key;
						dotPos = numpadValue.indexOf('.');
						
						if(dotPos != -1){
							numpadValue = numpadValue.substr(0, dotPos + numpadResolutionInt + 1);

							if(numpadResolutionVal == 0.5){
								if(numpadValue.length > dotPos + 1){
									numpadValue = (Math.round(parseFloat(numpadValue) * 2))/2;
									getToFixed();
								}
							}
						}
						
						if((numpadValue.substr(0, 1) == '0') && (numpadValue.length > 1) && (dotPos == -1)){
							numpadValue = numpadValue.substr(1, numpadValue.length);
						}
						else if((numpadValue.substr(0, 1) == '-') && (numpadValue.substr(1, 1) == '0') && (numpadValue.length > 2) && (dotPos == -1)){
							numpadValue = "-" + numpadValue.substr(2, numpadValue.length);
						}
						break;	
	}

	outputValue = checkSignPlus(numpadValue);
	$('#' + numpadTargetTagId).html(outputValue + numpadUnit);

	if((key == 'dec') || (key == 'inc') || (key == 'control')){ 
		
		submitSET(numpadTargetTagId, parseFloat(numpadValue));
		setSliderThumb();
	}
}

function resetNumpadValue(){
	isHTMLNumpadFirst = true;
	numpadValue = numpadPreValue;
	submitSET(numpadTargetTagId, parseFloat(numpadValue));
	checkNumpadValue(numpadTargetTagId);
	setSliderThumb();
}


function checkNumpadValue(tagId){
	numpadValue += '';

	if(numpadValue.indexOf('.') == numpadValue.length){
		numpadValue += 0;
	}

	if((numpadValue == '') || (numpadValue == '-')){
		numpadValue = "0";
	}

	
	getToFixed();
	outputValue = checkSignPlus(numpadValue);
	$('#'+ tagId).html(outputValue + numpadUnit);
}

function checkSignPlus(numpadValue){
	if(numpadIsSigned && (numpadValue.substr(0, 1) != "-")){
		outputValue = "+" + numpadValue;
	}
	else{
		outputValue = numpadValue;
	}

	return outputValue;
}

function checkNumpadLimits(numpadValue){
	if(parseFloat(numpadValue) > numpadMaxValue){
		numpadValue = numpadMaxValue + "";
	}
	else if (parseFloat(numpadValue) < numpadMinValue){
		numpadValue = numpadMinValue + "";
	}

	return numpadValue;
}

function getToFixed(){
	numpadValue = parseFloat(numpadValue).toFixed(numpadResolutionInt);
}

function splitUnitFromValue(str){
	result = new Object();
	result.value = str;
	result.unit = "";

	for(var i = 0; i < str.length; i++){
		subStr = str.substring(i, i + 1);

		if((isNaN(subStr)) && (subStr != ".")  && (subStr != "-") && (subStr != "+")){
			result.value = str.substring(0, i);
			result.unit = str.substring(i, str.length);
			break;
		}
	}

	return result; 
}


function numpadHandleTest(buttonPosition, isTestActive){
	if(numpadIsTestUsed){
		numpadIsTestActive = isTestActive;

		if(numpadIsTestActive){
			$('#Button_Start_' + buttonPosition).hide();
			$('#Button_Stop_' + buttonPosition).show();
		}
		else{
			var tagIdArrayTest = numpadTargetTagId.split("__");
			tagIdArrayTest = tagIdArrayTest[1].split("_");
			IndexTest = parseInt(tagIdArrayTest[0]);

			GetTd({"cmd":0x0257, "param": {"ServoIdx": IndexTest}}, "noEvent", "command");

			$('#Button_Stop_' + buttonPosition).hide();
			$('#Button_Start_' + buttonPosition).show();
			submitSET(numpadTargetTagId, parseFloat(numpadValue));
		}

		handleTest(numpadTargetTagId, numpadValue);
	}
}




	
	
	var wizardStep1 = 'Willkommen zum Assistenten "Setup Wizard". Bitte wählen Sie zuerst die Modellart.';
	var wizardStep2 = 'Passen Sie nun die Einstellungen entsprechend Ihrem Modell an. Bitte beachten Sie das die Steuerflächenanzahl und die Leitwerksart später nicht mehr verändert werden kann.';
	var wizardStep3 = 'Wählen Sie Ihren Mode.';
	var wizardStep4 = 'Stellen Sie nun die Parameter für den Empfänger ein und machen Sie wenn möglich bereits ein "Binding". Dieses Menü ist später voll anpassbar.';
	var wizardStep5 = 'Verknüpfen Sie nun alle Steuerflächen mit Servosteckplätzen. Bitte stellen sie auch die Mitten und absoluten Limits der einzelnen Servos ein.';
	var wizardStep6 = 'Im vorletzten Schritt sollten Sie die Mitten und absoluten Limits aller restlichen Servos festlegen.';
	var wizardStep7 = 'Der Assistent hat nun die Funktionen für Ihr Modell angelegt. Sie können die Funktionsliste erweitern und alle Geber, Trimmungen und Servowege ihrem Modell anpassen.';

	
function showDialogbox(type, listType, name, index){
	if(numpadOpen && !($('#meindiv').is(':empty'))){
		handleNoneClosedNumpad();
	}
	else{
		hideHTML('Pop_Up_Blocker');
		$('#Pop_Up_Outer').remove();
		$('#Dialog_Outter').remove();
	}

	setCSS("Pop_Up", "paddingLeft", "0px");
	setCSS("Pop_Up", "top", "0px");
	

	
	if((type == "delete") || (type == "deleteModel") || (type == "deleteTravelCurve")){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%;">' + 'Sie löschen nun' + ' ' + listType +  
							 	'<span style="font-weight: 700; white-space: nowrap;"> \"' + name  + '\"</span>? ' +
							 	'Sie können diese Änderung nicht rückgängig machen!' +
							'</div>' +
						 '</div>';
		header = 0;
		footer = 0;
	}
	else if(type == "deleteFileDir"){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%;">' +
								'<div style="overflow: hidden; text-overflow: ellipsis; max-height:170px;">' +
									'<span>' + 'Sie löschen nun' + ' ' + listType + '</span>' +  
									'<span style="font-weight: 700;"> \"' + name  + '\"</span><span>?</span> ' +
								'</div>' +	
							 	'<div style="width: 100%; text-align: center">' + 'Sie können diese Änderung nicht rückgängig machen!' + '</div>' +
							'</div>' +
						 '</div>';
		header = 0;
		footer = 0;
	}
	else if(type == "removePreFlightLink"){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%; text-align: center;">' + listType +
							'</div>' +
						'</div>';
		header = 0;
		footer = 0;
	}
	else if(type == "changeRxType"){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%; text-align: center;">' + 'Wenn Sie den Empfängertyp ändern wird die Servokonfiguration zurückgesetzt. Sie können dies nicht rückgängig machen!' +
							'</div>' +
						 '</div>';
		header = 0;
		footer = 0;
	}
	else if(type == "saveCurve"){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%; text-align: center;">' + 'Möchten Sie die Änderungen für die Kurve übernehmen?' +
							'</div>' +
						'</div>';
		header = 0;
		footer = 0;
	}
	else if(type == "setTravel"){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%; text-align: center;">' + 
								'Wollen Sie den Servoweg für ' +
								'<b>' + listType + '</b>' +
								' in Bezug auf die Mitte und die Limits automatisch berechnen lassen?' +
							'</div>' +
						'</div>';
		header = 2;
		footer = 0;
	}
	else if((type == "modelNameExistsAdd") || (type == "modelNameExistsConfig")){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%; text-align: center;">' + 'Der Modellname ist bereits vorhanden. Bitte wählen Sie einen anderen.' +
							'</div>' +
						 '</div>';
		header = 0;
		footer = 1;
	}
	else if(type == "StrickControlInfo"){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%; text-align: center;">' + listType +
							'</div>' +
						 '</div>';
		header = 2;
		footer = 1;
	}
	else if(type == "info"){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%; text-align: center;">' + listType +
							'</div>' +
						 '</div>';
		header = 2;
		footer = 1;
	}
	else if(type == "error"){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%; text-align: center;">' + listType +
							'</div>' +
						 '</div>';
		header = 4;
		footer = 1;
	}
	else if(type == "actionWait"){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%; text-align: center;">' + listType +
							'</div>' +
						 '</div>';
		header = 3;
		footer = -1;
	}
	else if(type == "progress"){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text" style="min-width: 430px;">' +
							'<div style="width: 100%; text-align: center;">' + listType +
							'</div>' +
							'<div style="width: 98.5%; height: 50px; margin-top: 25px; border: solid 4px #fff; border-radius: 5px;">'+
								'<div id="Dialog_Box_Progressbar" style="width: 0%; height: 100%; background: rgba(96, 153, 240, .7);"></div>' +
							 '</div>' +
						 '</div>';
		header = 5;
		footer = 4;
	}
	else if(type == "binding"){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%; text-align: center;">' + listType +
							'</div>' +
						 '</div>';
		header = 3;
		footer = 3;
	}
	else if((type == "password") || (type == "unlockPassword")){
		var jsClickEvent = "";

		if(isBAT){
			jsClickEvent = 'onClick=\'keypad_isPwPopUp= true; showKeypad("Dialog_Password_Input", true); setCSS("Dialog_Outter", "z-index", "9999");\'';
		}

		var forgotPassword = "";

		if(type == "password"){
			forgotPassword = 	'<div style="width: 100%; text-align: center; font-size: 20px;"><a style="color:#ddd;" href="0.9__PasswordRecovery.html">' + 'Passwort vergessen?' + '</a></div>'; 
		}
			
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%; text-align: center;">' +
								'<div style="width: 100%; text-align: center;">' + listType + '</div></br>' +
								'<div id="Dialog_Password"><input type="password" id="Dialog_Password_Input" maxlength="30" value="" ' + jsClickEvent + '></div></br>' +
								forgotPassword +
							'</div>' +
						 '</div>';
		header = 6;
		footer = 7;
	}
	else if(type == "changePassword"){
		var jsClickEventNew = "";
		var jsClickEventConfirm = "";

		if(isBAT){
			jsClickEventNew = 	  'onClick=\'keypad_isPwPopUp= true; showKeypad("Dialog_NewPassword_Input", true); setCSS("Dialog_Outter", "z-index", "9999");\'';
			jsClickEventConfirm = 'onClick=\'keypad_isPwPopUp= true; showKeypad("Dialog_ConfirmPassword_Input", true); setCSS("Dialog_Outter", "z-index", "9999");\'';
		}
		var confirmFailed = "";
		if(listType == "fail"){
			confirmFailed = "failed";
		}
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%; text-align: center;">' +
								'<div style="width: 100%; text-align: left; padding-left: 60px;">' + 'Neues Passwort' + '</div></br>' +
								'<div id="Dialog_Password"><input type="password" id="Dialog_NewPassword_Input" maxlength="30" value="' + index +'" ' + jsClickEventNew + '></div></br>' +
								'<div style="width: 100%; text-align: left; padding: 15px 0 0 60px;">' + 'Passwort bestätigen' + '&#160;<span style="color: #f00">' + confirmFailed + '</span></div></br>' +
								'<div id="Dialog_Password"><input type="password" id="Dialog_ConfirmPassword_Input" maxlength="30" value="' + name + '" ' + jsClickEventConfirm + '></div>' +
							'</div>' +
						 '</div>';
		header = 6;
		footer = 8;
	}
	else if((type == "rfConnected") || (type == "changeModelRfConnected") || (type == "addModelRfConnected")){
		if(type == "rfConnected"){
			htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
								'<div style="width: 100%;">' + listType +
								'</div>' +
							 '</div>';
		}
		else{
			htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
								'<div style="width: 100%;">' + 'Die Verbindung zum Empfänger besteht noch!' +
								'</div>' +
							 '</div>';
		}

		header = 0;
		footer = 2;
		htmlFooterButtonTextOk     = 'Ignorieren';
		htmlFooterButtonTextCancel = 'Abbrechen';
	}
	else if(type == "wizard"){
		switch (listType){
			case "wizardStep1": wizzardText = wizardStep1; break;
			case "wizardStep2": wizzardText = wizardStep2; break;
			case "wizardStep3": wizzardText = wizardStep3; break;
			case "wizardStep4": wizzardText = wizardStep4; break;
			case "wizardStep5": wizzardText = wizardStep5; break;
			case "wizardStep6": wizzardText = wizardStep6; break;
			case "wizardStep7": wizzardText = wizardStep7; break;
		}

		htmlDialogText = '<div id="Dialogbox_Text" style= "margin: 15px 10px 25px 10px;">' +
							'<div style="width: 100%;">' + wizzardText + '</div>' +
						 '</div>';
		header = 1;
		footer = 1;
	}
	else if(type == "updateRx"){
		switch (listType){
			case "updateRx1": header = 2; footer = 5; break;
			case "updateRx2": header = 2; footer = 0; break;
			case "updateRx3": header = 5; footer = -1; break;
			case "updateRx4": header = 2; footer = -1; break;
			case "updateRx5": header = 2; footer = 1; break;
			case "updateRxError": header = 4; footer = 1; break;
		}

		if(listType != "updateRx3"){
			htmlDialogText = '<div id="Dialogbox_Text" style= "margin: 15px 10px 25px 10px;">' +
								'<div style="width: 100%;">' + name + '</div>' +
							 '</div>';
		}
		else{
			htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text" style="min-width: 430px;">' +
								'<div style="width: 100%; text-align: center;">' + name +
								'</div>' +	
								'<div style="width: 98.5%; height: 50px; margin-top: 25px; border: solid 4px #fff; border-radius: 5px;">'+
									'<div id="Dialog_Box_Progressbar" style="width: 0%; height: 100%; background: rgba(96, 153, 240, .7);"></div>' +
								 '</div>' +
								 '<div id="Dialog_Box_Progressbar_Value" style="font-weight: bold; width: 100%; text-align: center; margin-top: -43px;">0%</div>' +
							 '</div>';
		}
		
		name = "";
	}
	else if((type == "student") || (type == "newPreFlightList") || (type == "exitPreFlightListCheck") || (type == "DataInconsistent")){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%; text-align: center;">' + listType +
							'</div>' +
						 '</div>';
		header = 0;
		footer = 0;
	}
	else if(type == "optimizeMemory"){
		htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text">' +
							'<div style="width: 100%; text-align: center;">' + listType +
							'</div>' +
						 '</div>';
		header = name;
		footer = 0;
	}
	else{
		header = -1;
		footer = -1;
		htmlDialogText = "";
	}

	
	if(header == 0){
		htmlDialogHeader = 	'<div class="dialogbox-header">' +
								'<div class="icon_warning"></div>' +
								'<div>' + 'Achtung!' + '</div>' +
							'</div>';
	}
	else if(header == 1){
		if(index == 0){
			htmlDialogHeaderWizard = '';
		}
		else{
			htmlDialogHeaderWizard = '<div style="float: right; margin-right: 10px;">' + 'Schritt' + ' ' + index + ' ' + 'von 6' + '</div>';
		}

		htmlDialogHeader = 	'<div class="dialogbox-header">' +
								'<div>' +
									'<div class="icon_wizard"></div>' +
									'<div>' + 'Setup Wizard' + '</div>' +
								'</div>' +
								htmlDialogHeaderWizard +
							'</div>';
	}
	else if(header == 2){
		htmlDialogHeader = 	'<div class="dialogbox-header">' +
								'<div class="icon_info"></div>' +
								'<div>' + 'Info' + '</div>' +
							'</div>';
	}
	else if(header == 3){
		htmlDialogHeader = '<div class="dialogbox-header" style="margin-right: 20px;">' +
								'<img width="96" height="96" style="margin: -29px 15px 0px 10px;" align="middle" draggable="false" alt="Warning" src="data:image/gif;base64,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" />' +
								'Bitte warten' + '</div>';
	}
	else if(header == 4){
		htmlDialogHeader = 	'<div class="dialogbox-header">' +
								'<div class="icon_error"></div>' +
								'<div>' + 'Fehler' + '</div>' +
							'</div>';
	}
	else if(header == 5){
		htmlDialogHeader = 	'<div class="dialogbox-header" style="margin-right: 20px;">' +
								'<img width="96" height="96" style="margin: -29px 15px 0px 10px;" align="middle" draggable="false" alt="Warning" src="data:image/gif;base64,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" />' +
								'Fortschritt' + '</div>';
	}
	else if(header == 6){
		htmlDialogHeader = 	'<div class="dialogbox-header" style="margin-right: 20px;">' +
								'<img width="26" height="33" style="margin: -24px 15px 0px 10px;" align="middle" draggable="false" alt="Warning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAhCAYAAADH97ugAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU3REU4MkM2OThDODExRTJBQUVBOERBM0Y2Njg0QUJGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU3REU4MkM3OThDODExRTJBQUVBOERBM0Y2Njg0QUJGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTdERTgyQzQ5OEM4MTFFMkFBRUE4REEzRjY2ODRBQkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTdERTgyQzU5OEM4MTFFMkFBRUE4REEzRjY2ODRBQkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5EbCmWAAAA+ElEQVR42mL8//8/Az0AE5Hq1IG4F4jPAPEfKD4DFVMnygSQjwjgIiD+9h83+AZVg9ccfJJsQLz9P/FgO1QPyRZNQDPoABD7AbE0FPtBxZBBL6kW6QLxHyQD2vE4qB1JHUiPFikWTUDzCTMei0Byhwn5CpfmG0gabYhIMPZI6q9iU8OIIx/9BGI2KFsAiD8SSLz8QPwByv4I1YMCcFmELMhIZF7Dq4eJgU5g1CKKLbIH4pPQCP2PJZKJwdj0nISaDU91z4FYgkaeeQHEkjCLaF0pMY6mulGLRi0atWjUIhpY9JSGdjxFtigFWm/Qoi5KwdfcojoACDAAj7w4hyCx4k4AAAAASUVORK5CYII=" />' +
								'Passwort' + '</div>';
	}
	else{
		htmlDialogHeader = '';
	}

	
	if(footer == 0){
		htmlDialogFooter = 	'<div style="background: #000; border-radius: 10px 10px 0px 0px; padding: 4px; clear: left; float: right;">' +
								'<div id="Footer_Left" class="dialogbox-footer round_left" style="clear: both;" onClick=\'closeDialogbox(true, "' + type +'","' + index + '","' + name + '");\'>' +
									'<div class="dialogbox-close-save round_left"></div>' +
								'</div>' +
								'<div class="dialogbox-footer round_right" onClick=\'closeDialogbox(false, "' + type +'","' + index + '","' + name + '");\'>' +
									'<div class="dialogbox-close-cancel round_right"></div>' +
								'</div>' +
							'<div>';
	}						
	else if(footer == 1){
		htmlDialogFooter = 	'<div style="background: #000; border-radius: 10px 10px 0px 0px; padding: 4px; clear: left; float: right;">' +
								'<div class="dialogbox-footer round_top" onClick=\'closeDialogbox(true, "' + type + '");\'>' +
									'<div class="dialogbox-close-save"></div>' +
								'</div>' +
							'<div>';
	}
	else if(footer == 2){
		htmlDialogFooter = 	'<div style="background: #000; border-radius: 10px 10px 0px 0px; padding: 4px; clear: left; float: right;">' +
								'<div id="Footer_Left" class="dialogbox-footer round_left" style="clear: both;" onClick=\'closeDialogbox(true, "' + type +'","' + index + '","' + name + '");\'>' +
									'<div class="dialogbox-close-save round_left" style="background-image: none; line-height: 68px;">' + htmlFooterButtonTextOk + '</div>' +
								'</div>' +
								'<div class="dialogbox-footer round_right" onClick=\'closeDialogbox(false, "' + type +'");\'>' +
									'<div class="dialogbox-close-cancel round_right" style="background-image: none; line-height: 68px;">' + htmlFooterButtonTextCancel + '</div>' +
								'</div>' +
							'<div>';
	}
	else if(footer == 3){
		htmlDialogFooter = 	'<div style="background: #000; border-radius: 10px 10px 0px 0px; padding: 4px; clear: left; float: right;">' +
								'<div style="width: 200px;" class="dialogbox-footer round_top" onClick=\'closeDialogbox(true, "' + type + '");\'>' +
									'<div style="width: 100%; text-align: center; line-height: 70px;">' + 'Binding anhalten' + '</div>' +
								'</div>' +
							'<div>';
	}
	else if(footer == 4){
		htmlDialogFooter = 	'<div style="background: #000; border-radius: 10px 10px 0px 0px; padding: 4px; clear: left; float: right;">' +
								'<div class="dialogbox-footer round_top" onClick=\'closeDialogbox(true, "' + type + '");\'>' +
									'<div style="width: 100%; text-align: center; line-height: 70px;">' + 'Abbrechen' + '</div>' +
								'</div>' +
							'<div>';
	}
	else if(footer == 5){
		htmlDialogFooter = 	'<div style="background: #000; border-radius: 10px 10px 0px 0px; padding: 4px; clear: left; float: right;">' +
								'<div id="Footer_Left" class="dialogbox-footer round_left" style="clear: both;" onClick=\'closeDialogbox(false, "' + type +'");\'>' +
									'<div class="dialogbox-close-cancel round_right"></div>' +
								'</div>' +
								'<div class="dialogbox-footer round_right" onClick=\'closeDialogbox(true, "' + type +'","' + index + '","' + name + '");\'>' +
									'<div class="dialogbox-close-next round_left"></div>' +
								'</div>' +
							'<div>';
	}
	else if(footer == 6){
		htmlDialogFooter = 	'<div style="background: #000; border-radius: 10px 10px 0px 0px; padding: 4px; clear: left; float: right;">' +
								'<div class="dialogbox-footer round_top" onClick=\'closeDialogbox(false, "' + type + '");\'>' +
									'<div class="dialogbox-close-cancel round_right"></div>' +
								'</div>' +
							'<div>';
	}
	else if(footer == 7){
		htmlDialogFooter = 	'<div style="background: #000; border-radius: 10px 10px 0px 0px; padding: 4px; clear: left; float: right;">' +
								'<div id="Footer_Left" class="dialogbox-footer round_left" style="clear: both;" onClick=\'closeDialogbox(true, "' + type +'","' + index + '", document.getElementById("Dialog_Password_Input").value);\'>' +
									'<div class="dialogbox-close-save round_left"></div>' +
								'</div>' +
								'<div class="dialogbox-footer round_right" onClick=\'closeDialogbox(false, "' + type +'");\'>' +
									'<div class="dialogbox-close-cancel round_right"></div>' +
								'</div>' +
							'<div>';
	}
	else if(footer == 8){
		htmlDialogFooter = 	'<div style="background: #000; border-radius: 10px 10px 0px 0px; padding: 4px; clear: left; float: right;">' +
								'<div id="Footer_Left" class="dialogbox-footer round_left" style="clear: both;" onClick=\'closeDialogbox(true, "' + type +'", document.getElementById("Dialog_NewPassword_Input").value, document.getElementById("Dialog_ConfirmPassword_Input").value);\'>' +
									'<div class="dialogbox-close-save round_left"></div>' +
								'</div>' +
								'<div class="dialogbox-footer round_right" onClick=\'closeDialogbox(false, "' + type +'");\'>' +
									'<div class="dialogbox-close-cancel round_right"></div>' +
								'</div>' +
							'<div>';
	}
	else{
		htmlDialogFooter = '';
								
									
								
							
	}

	var htmlDialog = '' +
		'<div id="Dialog_Inner" class="dialogbox">' +
			htmlDialogHeader +
			htmlDialogText +
			htmlDialogFooter +
		'</div>';

	var htmlDialogOutter = document.createElement('div');
	htmlDialogOutter.setAttribute("id", "Dialog_Outter");
	Pop_Up.appendChild(htmlDialogOutter);
	setHTML("Dialog_Outter", htmlDialog);

	setCSS("Dialog_Outter", "z-index", "99999");




	var widthContainer  = $('#Dialog_Outter').outerWidth();
	var heightContainer = $('#Dialog_Outter').outerHeight();

	setCSS("Dialog_Inner", "marginLeft", 796/2 - widthContainer/2 + "px");
	setCSS("Dialog_Inner", "top", 476/2 - heightContainer/2 + "px");

	$('#Dialog_Outter').addClass("dialogbox-outter");
}


function closeDialogbox(isConfirm, type, Index, name){
	$('#Dialog_Outter').remove();

	if(!isNaN(Index)){
		Index = parseInt(Index, 10);
	}

	if(isConfirm){
		
		switch(type){
			case "removePreFlightLink":		
			case "delete":
			case "deleteFileDir":			deleteItem(Index); break;
			case "deleteModel":				submitSET(Index, name); break;
			case "deleteTravelCurve":		resetServoCurve(Index); break;
			case "wizard":					if(typeof g_isWizzardPop != "undefined") g_isWizzardPop = false; break;
			case "changeRxType":			showPopupList($('#Receiver_Type'), g_popupList_Type, false, true, g_popupList_Indices); break;
			case "modelNameExistsAdd":		showKeypad('KeyPad_Temp'); break;
			case "modelNameExistsConfig":	showKeypad('Model_Name_List'); break;
			case "rfConnected":				GetTd({"cmd":0x0214}, "noEvent", "command"); closeDialogboxByTimer(Index); showDialogbox("info", name); break;
			case "changeModelRfConnected": 	submitSET(Index, name); break;
			case "addModelRfConnected": 	showKeypad('KeyPad_Temp'); break;
			case "binding":					binding(false); break;
			case "saveCurve":				 isGotoSave= true; submitCurve("set", "save", g_curvePercentages, g_realPoints, g_currentFlightMode, g_global); break;
			case "progress":				GetTd({"cmd":0x0316, "param": {"Group": parseInt(g_currentGroupIndex)}}, g_SetEvent, "command"); break;
			case "setTravel":				showDialogbox("actionWait", 'Der Servoweg wird entsprechend der Limits und der Mitte angepasst.'); GetTd({"ModelWizard":{"cmd":4, "Servos":servoIdxArray}}, g_SetEvent, "4"); break;
			case "StrickControlInfo":		window.location.href = "2.10.0__ControlConfiguration.html"; break;
			case "updateRx":				updateRxDialog(Index); break;
			case "password":				if(g_currentLocation == "/2.4.0__UserSettings"){
												GetTd({"authentication":{"check":{"password":"" + name + ""}}}, g_SetEvent, "service"); break;
											}
											else{
												GetTd({"authentication":{"check":{"password":"" + name + ""}}}, g_MasterInitEvent, "service"); break;
											}
			case "changePassword":			if(Index == name){
												GetTd({"authentication":{"set":{"password":"" + name + ""}}}, g_SetEvent, "service");
											}
											else{
												showDialogbox("changePassword", "fail", name, Index);
											}
											break;
			case "unlockPassword":			handleUnlock(name);break;								
			case "student":					submitSubSET(name, Index); break;
			case "newPreFlightList":		showKeypad(name); break;
			case "exitPreFlightListCheck":	gotoLastPage(1); break;
			case "DataInconsistent":		GetTd({"cmd":0x042C, "param":{"Permitted": 1, "DataIncosistent": parseInt(name, 10)}}, "noEvent", "command"); break;
			case "optimizeMemory":			GetTd({"cmd":0x042D}, "noEvent", "command");
		}
	}
	else{
		switch(type){
			case "saveCurve":				g_curvePercentages = g_rollBackValue["CurveValue"].slice(0);
											g_realPoints = g_rollBackValue["RealPointsValue"].slice(0);
											
											isGotoSave = true;
											submitCurve("set", "save", g_curvePercentages, g_realPoints, g_currentFlightMode, g_global);
											break;
			case "setTravel":				setTravelGoto(isConfirm); break;
			case "updateRx":				updateRxDialog(-1); break;
			case "password":				if((g_currentLocation != "/2.4.0__UserSettings")){
												window.location.href = "/0.1__HomeScreen.html";
											}
			 								break;
			case "student":					submitReSET(name); break;
			case "DataInconsistent":		GetTd({"cmd":0x042C, "param":{"Permitted": 0, "DataIncosistent": parseInt(name, 10)}}, "noEvent", "command"); break;
		}
		
	}
}


function closeDialogboxByTimer(counterValue){
	g_dialogBoxTimeoutFunction = setTimeout(function(){$('#Dialog_Outter').remove();}, counterValue);
}

function checkPassword(isPWincorrect){
	var htmlTypeIn = 'Passwort eingeben';

	if(isPWincorrect){
		htmlTypeIn = 'Falsches Passwort. Bitte versuchen Sie es noch einmal!';
	}

	showDialogbox('password', htmlTypeIn);
}

function checkAuthentication(){
	
}







(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);

(function(c){var b={init:function(e){var f={set_width:false,set_height:false,horizontalScroll:false,scrollInertia:0,mouseWheel:true,mouseWheelPixels:"auto",autoDraggerLength:true,autoHideScrollbar:false,scrollButtons:{enable:false,scrollType:"continuous",scrollSpeed:"auto",scrollAmount:40},advanced:{updateOnBrowserResize:true,updateOnContentResize:true,autoExpandHorizontalScroll:false,autoScrollOnFocus:true,normalizeMouseWheelDelta:false},contentTouchScroll:true,callbacks:{onScrollStart:function(){},onScroll:function(){},onTotalScroll:function(){},onTotalScrollBack:function(){},onTotalScrollOffset:0,onTotalScrollBackOffset:0,whileScrolling:function(){}},theme:"light"},e=c.extend(true,f,e);return this.each(function(){var m=c(this);if(e.set_width){m.css("width",e.set_width)}if(e.set_height){m.css("height",e.set_height)}if(!c(document).data("mCustomScrollbar-index")){c(document).data("mCustomScrollbar-index","1")}else{var t=parseInt(c(document).data("mCustomScrollbar-index"));c(document).data("mCustomScrollbar-index",t+1)}m.wrapInner("<div class='mCustomScrollBox mCS-"+e.theme+"' id='mCSB_"+c(document).data("mCustomScrollbar-index")+"' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_"+c(document).data("mCustomScrollbar-index"));var g=m.children(".mCustomScrollBox");if(e.horizontalScroll){g.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");var k=g.children(".mCSB_h_wrapper");k.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({width:k.children().outerWidth(),position:"relative"}).unwrap()}else{g.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />")}var o=g.children(".mCSB_container");if(c.support.touch){o.addClass("mCS_touch")}o.after("<div id='scrollTool_"+c(document).data("mCustomScrollbar-index")+"' class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div id='Dragger_"+c(document).data("mCustomScrollbar-index")+"' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");var l=g.children(".mCSB_scrollTools"),h=l.children(".mCSB_draggerContainer"),q=h.children(".mCSB_dragger");if(e.horizontalScroll){q.data("minDraggerWidth",q.width())}else{q.data("minDraggerHeight",q.height())}if(e.scrollButtons.enable){if(e.horizontalScroll){l.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>")}else{l.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")}}g.bind("scroll",function(){if(!m.is(".mCS_disabled")){g.scrollTop(0).scrollLeft(0)}});m.data({mCS_Init:true,mCustomScrollbarIndex:c(document).data("mCustomScrollbar-index"),horizontalScroll:e.horizontalScroll,scrollInertia:e.scrollInertia,scrollEasing:"linear",mouseWheel:e.mouseWheel,mouseWheelPixels:e.mouseWheelPixels,autoDraggerLength:e.autoDraggerLength,autoHideScrollbar:e.autoHideScrollbar,scrollButtons_enable:e.scrollButtons.enable,scrollButtons_scrollType:e.scrollButtons.scrollType,scrollButtons_scrollSpeed:e.scrollButtons.scrollSpeed,scrollButtons_scrollAmount:e.scrollButtons.scrollAmount,autoExpandHorizontalScroll:e.advanced.autoExpandHorizontalScroll,autoScrollOnFocus:e.advanced.autoScrollOnFocus,normalizeMouseWheelDelta:e.advanced.normalizeMouseWheelDelta,contentTouchScroll:e.contentTouchScroll,onScrollStart_Callback:e.callbacks.onScrollStart,onScroll_Callback:e.callbacks.onScroll,onTotalScroll_Callback:e.callbacks.onTotalScroll,onTotalScrollBack_Callback:e.callbacks.onTotalScrollBack,onTotalScroll_Offset:e.callbacks.onTotalScrollOffset,onTotalScrollBack_Offset:e.callbacks.onTotalScrollBackOffset,whileScrolling_Callback:e.callbacks.whileScrolling,bindEvent_scrollbar_drag:false,bindEvent_content_touch:false,bindEvent_scrollbar_click:false,bindEvent_mousewheel:false,bindEvent_buttonsContinuous_y:false,bindEvent_buttonsContinuous_x:false,bindEvent_buttonsPixels_y:false,bindEvent_buttonsPixels_x:false,bindEvent_focusin:false,bindEvent_autoHideScrollbar:false,mCSB_buttonScrollRight:false,mCSB_buttonScrollLeft:false,mCSB_buttonScrollDown:false,mCSB_buttonScrollUp:false});if(e.horizontalScroll){if(m.css("max-width")!=="none"){if(!e.advanced.updateOnContentResize){e.advanced.updateOnContentResize=false}}}else{if(m.css("max-height")!=="none"){var s=false,r=parseInt(m.css("max-height"));if(m.css("max-height").indexOf("%")>=0){s=r,r=m.parent().height()*s/100}m.css("overflow","hidden");g.css("max-height",r)}}m.mCustomScrollbar("update");if(e.advanced.updateOnBrowserResize){var i,j=c(window).width(),u=c(window).height();c(window).bind("resize."+m.data("mCustomScrollbarIndex"),function(){if(i){clearTimeout(i)}i=setTimeout(function(){if(!m.is(".mCS_disabled")&&!m.is(".mCS_destroyed")){var w=c(window).width(),v=c(window).height();if(j!==w||u!==v){if(m.css("max-height")!=="none"&&s){g.css("max-height",m.parent().height()*s/100)}m.mCustomScrollbar("update");j=w;u=v}}},150)})}if(e.advanced.updateOnContentResize){var p;if(e.horizontalScroll){var n=o.outerWidth()}else{var n=o.outerHeight()}p=setInterval(function(){if(e.horizontalScroll){if(e.advanced.autoExpandHorizontalScroll){o.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:o.outerWidth(),position:"relative"}).unwrap()}var v=o.outerWidth()}else{var v=o.outerHeight()}if(v!=n){m.mCustomScrollbar("update");n=v}},300)}})},update:function(){var n=c(this),k=n.children(".mCustomScrollBox"),q=k.children(".mCSB_container");q.removeClass("mCS_no_scrollbar");n.removeClass("mCS_disabled mCS_destroyed");k.scrollTop(0).scrollLeft(0);var y=k.children(".mCSB_scrollTools"),o=y.children(".mCSB_draggerContainer"),m=o.children(".mCSB_dragger");if(n.data("horizontalScroll")){var A=y.children(".mCSB_buttonLeft"),t=y.children(".mCSB_buttonRight"),f=k.width();if(n.data("autoExpandHorizontalScroll")){q.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:q.outerWidth(),position:"relative"}).unwrap()}var z=q.outerWidth()}else{var w=y.children(".mCSB_buttonUp"),g=y.children(".mCSB_buttonDown"),r=k.height(),i=q.outerHeight()}if(i>r&&!n.data("horizontalScroll")){y.css("display","block");var s=o.height();if(n.data("autoDraggerLength")){var u=Math.round(r/i*s),l=m.data("minDraggerHeight");if(u<=l){m.css({height:l})}else{if(u>=s-10){var p=s-10;m.css({height:p})}else{m.css({height:u})}}m.children(".mCSB_dragger_bar").css({"line-height":m.height()+"px"})}var B=m.height(),x=(i-r)/(s-B);n.data("scrollAmount",x).mCustomScrollbar("scrolling",k,q,o,m,w,g,A,t);var D=Math.abs(q.position().top);n.mCustomScrollbar("scrollTo",D,{scrollInertia:0,trigger:"internal"})}else{if(z>f&&n.data("horizontalScroll")){y.css("display","block");var h=o.width();if(n.data("autoDraggerLength")){var j=Math.round(f/z*h),C=m.data("minDraggerWidth");if(j<=C){m.css({width:C})}else{if(j>=h-10){var e=h-10;m.css({width:e})}else{m.css({width:j})}}}var v=m.width(),x=(z-f)/(h-v);n.data("scrollAmount",x).mCustomScrollbar("scrolling",k,q,o,m,w,g,A,t);var D=Math.abs(q.position().left);n.mCustomScrollbar("scrollTo",D,{scrollInertia:0,trigger:"internal"})}else{k.unbind("mousewheel focusin");if(n.data("horizontalScroll")){m.add(q).css("left",0)}else{m.add(q).css("top",0)}y.css("display","none");q.addClass("mCS_no_scrollbar");n.data({bindEvent_mousewheel:false,bindEvent_focusin:false})}}},scrolling:function(h,p,m,j,w,e,A,v){var k=c(this);if(!k.data("bindEvent_scrollbar_drag")){var n,o;if(c.support.msPointer){j.bind("MSPointerDown",function(H){H.preventDefault();k.data({on_drag:true});j.addClass("mCSB_dragger_onDrag");var G=c(this),J=G.offset(),F=H.originalEvent.pageX-J.left,I=H.originalEvent.pageY-J.top;if(F<G.width()&&F>0&&I<G.height()&&I>0){n=I;o=F}});c(document).bind("MSPointerMove."+k.data("mCustomScrollbarIndex"),function(H){H.preventDefault();if(k.data("on_drag")){var G=j,J=G.offset(),F=H.originalEvent.pageX-J.left,I=H.originalEvent.pageY-J.top;D(n,o,I,F)}}).bind("MSPointerUp."+k.data("mCustomScrollbarIndex"),function(x){k.data({on_drag:false});j.removeClass("mCSB_dragger_onDrag")})}else{j.bind("mousedown touchstart",function(H){H.preventDefault();H.stopImmediatePropagation();var G=c(this),K=G.offset(),F,J;if(H.type==="touchstart"){var I=H.originalEvent.touches[0]||H.originalEvent.changedTouches[0];F=I.pageX-K.left;J=I.pageY-K.top}else{k.data({on_drag:true});j.addClass("mCSB_dragger_onDrag");F=H.pageX-K.left;J=H.pageY-K.top}if(F<G.width()&&F>0&&J<G.height()&&J>0){n=J;o=F}}).bind("touchmove",function(H){H.preventDefault();H.stopImmediatePropagation();var K=H.originalEvent.touches[0]||H.originalEvent.changedTouches[0],G=c(this),J=G.offset(),F=K.pageX-J.left,I=K.pageY-J.top;D(n,o,I,F)});c(document).bind("mousemove."+k.data("mCustomScrollbarIndex"),function(H){if(k.data("on_drag")){var G=j,J=G.offset(),F=H.pageX-J.left,I=H.pageY-J.top;D(n,o,I,F)}}).bind("mouseup."+k.data("mCustomScrollbarIndex"),function(x){k.data({on_drag:false});j.removeClass("mCSB_dragger_onDrag")})}k.data({bindEvent_scrollbar_drag:true})}function D(G,H,I,F){if(k.data("horizontalScroll")){k.mCustomScrollbar("scrollTo",(j.position().left-(H))+F,{moveDragger:true,trigger:"internal"})}else{k.mCustomScrollbar("scrollTo",(j.position().top-(G))+I,{moveDragger:true,trigger:"internal"})}}if(c.support.touch&&k.data("contentTouchScroll")){if(!k.data("bindEvent_content_touch")){var l,B,r,s,u,C,E;p.bind("touchstart",function(x){x.stopImmediatePropagation();l=x.originalEvent.touches[0]||x.originalEvent.changedTouches[0];B=c(this);r=B.offset();u=l.pageX-r.left;s=l.pageY-r.top;C=s;E=u});p.bind("touchmove",function(x){x.preventDefault();x.stopImmediatePropagation();l=x.originalEvent.touches[0]||x.originalEvent.changedTouches[0];B=c(this).parent();r=B.offset();u=l.pageX-r.left;s=l.pageY-r.top;if(k.data("horizontalScroll")){k.mCustomScrollbar("scrollTo",E-u,{trigger:"internal"})}else{k.mCustomScrollbar("scrollTo",C-s,{trigger:"internal"})}})}}if(!k.data("bindEvent_scrollbar_click")){m.bind("click",function(F){var x=(F.pageY-m.offset().top)*k.data("scrollAmount"),y=c(F.target);if(k.data("horizontalScroll")){x=(F.pageX-m.offset().left)*k.data("scrollAmount")}if(y.hasClass("mCSB_draggerContainer")||y.hasClass("mCSB_draggerRail")){k.mCustomScrollbar("scrollTo",x,{trigger:"internal",scrollEasing:"draggerRailEase"})}});k.data({bindEvent_scrollbar_click:true})}if(k.data("mouseWheel")){if(!k.data("bindEvent_mousewheel")){h.bind("mousewheel",function(H,J){var G,F=k.data("mouseWheelPixels"),x=Math.abs(p.position().top),I=j.position().top,y=m.height()-j.height();if(k.data("normalizeMouseWheelDelta")){if(J<0){J=-1}else{J=1}}if(F==="auto"){F=100+Math.round(k.data("scrollAmount")/2)}if(k.data("horizontalScroll")){I=j.position().left;y=m.width()-j.width();x=Math.abs(p.position().left)}if((J>0&&I!==0)||(J<0&&I!==y)){H.preventDefault();H.stopImmediatePropagation()}G=x-(J*F);k.mCustomScrollbar("scrollTo",G,{trigger:"internal"})});k.data({bindEvent_mousewheel:true})}}if(k.data("scrollButtons_enable")){if(k.data("scrollButtons_scrollType")==="pixels"){if(k.data("horizontalScroll")){v.add(A).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend",i,g);k.data({bindEvent_buttonsContinuous_x:false});if(!k.data("bindEvent_buttonsPixels_x")){v.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().left)+k.data("scrollButtons_scrollAmount"))});A.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().left)-k.data("scrollButtons_scrollAmount"))});k.data({bindEvent_buttonsPixels_x:true})}}else{e.add(w).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend",i,g);k.data({bindEvent_buttonsContinuous_y:false});if(!k.data("bindEvent_buttonsPixels_y")){e.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().top)+k.data("scrollButtons_scrollAmount"))});w.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().top)-k.data("scrollButtons_scrollAmount"))});k.data({bindEvent_buttonsPixels_y:true})}}function q(x){if(!j.data("preventAction")){j.data("preventAction",true);k.mCustomScrollbar("scrollTo",x,{trigger:"internal"})}}}else{if(k.data("horizontalScroll")){v.add(A).unbind("click");k.data({bindEvent_buttonsPixels_x:false});if(!k.data("bindEvent_buttonsContinuous_x")){v.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollRight:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().left)+x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var i=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollRight"))};v.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",i);A.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollLeft:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().left)-x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var g=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollLeft"))};A.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",g);k.data({bindEvent_buttonsContinuous_x:true})}}else{e.add(w).unbind("click");k.data({bindEvent_buttonsPixels_y:false});if(!k.data("bindEvent_buttonsContinuous_y")){e.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollDown:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().top)+x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var t=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollDown"))};e.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",t);w.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollUp:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().top)-x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var f=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollUp"))};w.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",f);k.data({bindEvent_buttonsContinuous_y:true})}}function z(){var x=k.data("scrollButtons_scrollSpeed");if(k.data("scrollButtons_scrollSpeed")==="auto"){x=Math.round((k.data("scrollInertia")+100)/40)}return x}}}if(k.data("autoScrollOnFocus")){if(!k.data("bindEvent_focusin")){h.bind("focusin",function(){h.scrollTop(0).scrollLeft(0);var x=c(document.activeElement);if(x.is("input,textarea,select,button,a[tabindex],area,object")){var G=p.position().top,y=x.position().top,F=h.height()-x.outerHeight();if(k.data("horizontalScroll")){G=p.position().left;y=x.position().left;F=h.width()-x.outerWidth()}if(G+y<0||G+y>F){k.mCustomScrollbar("scrollTo",y,{trigger:"internal"})}}});k.data({bindEvent_focusin:true})}}if(k.data("autoHideScrollbar")){if(!k.data("bindEvent_autoHideScrollbar")){h.bind("mouseenter",function(x){h.addClass("mCS-mouse-over");d.showScrollbar.call(h.children(".mCSB_scrollTools"))}).bind("mouseleave touchend",function(x){h.removeClass("mCS-mouse-over");if(x.type==="mouseleave"){d.hideScrollbar.call(h.children(".mCSB_scrollTools"))}});k.data({bindEvent_autoHideScrollbar:true})}}},scrollTo:function(n,u){var r=c(this),k={moveDragger:false,trigger:"external",callbacks:true,scrollInertia:r.data("scrollInertia"),scrollEasing:r.data("scrollEasing")},u=c.extend(k,u),j,i=r.children(".mCustomScrollBox"),s=i.children(".mCSB_container"),q=i.children(".mCSB_scrollTools"),h=q.children(".mCSB_draggerContainer"),t=h.children(".mCSB_dragger"),g=draggerSpeed=u.scrollInertia,m,f,l,e;if(!s.hasClass("mCS_no_scrollbar")){r.data({mCS_trigger:u.trigger});if(r.data("mCS_Init")){u.callbacks=false}if(n||n===0){if(typeof(n)==="number"){if(u.moveDragger){j=n;if(r.data("horizontalScroll")){n=t.position().left*r.data("scrollAmount")}else{n=t.position().top*r.data("scrollAmount")}draggerSpeed=0}else{j=n/r.data("scrollAmount")}}else{if(typeof(n)==="string"){var p;if(n==="top"){p=0}else{if(n==="bottom"&&!r.data("horizontalScroll")){p=s.outerHeight()-i.height()}else{if(n==="left"){p=0}else{if(n==="right"&&r.data("horizontalScroll")){p=s.outerWidth()-i.width()}else{if(n==="first"){p=r.find(".mCSB_container").find(":first")}else{if(n==="last"){p=r.find(".mCSB_container").find(":last")}else{p=r.find(n)}}}}}}if(p.length===1){if(r.data("horizontalScroll")){n=p.position().left}else{n=p.position().top}j=n/r.data("scrollAmount")}else{j=n=p}}}if(r.data("horizontalScroll")){if(r.data("onTotalScrollBack_Offset")){f=-r.data("onTotalScrollBack_Offset")}if(r.data("onTotalScroll_Offset")){e=i.width()-s.outerWidth()+r.data("onTotalScroll_Offset")}if(j<0){j=n=0;clearInterval(r.data("mCSB_buttonScrollLeft"));if(!f){m=true}}else{if(j>=h.width()-t.width()){j=h.width()-t.width();n=i.width()-s.outerWidth();clearInterval(r.data("mCSB_buttonScrollRight"));if(!e){l=true}}else{n=-n}}d.mTweenAxis.call(this,t[0],"left",Math.round(j),draggerSpeed,u.scrollEasing);d.mTweenAxis.call(this,s[0],"left",Math.round(n),g,u.scrollEasing,{onStart:function(){if(u.callbacks&&!r.data("mCS_tweenRunning")){o("onScrollStart")}if(r.data("autoHideScrollbar")){d.showScrollbar.call(q)}},onUpdate:function(){if(u.callbacks){o("whileScrolling")}},onComplete:function(){if(u.callbacks){o("onScroll");if(m||(f&&s.position().left>=f)){o("onTotalScrollBack")}if(l||(e&&s.position().left<=e)){o("onTotalScroll")}}t.data("preventAction",false);r.data("mCS_tweenRunning",false);if(r.data("autoHideScrollbar")){if(!i.hasClass("mCS-mouse-over")){d.hideScrollbar.call(q)}}}})}else{if(r.data("onTotalScrollBack_Offset")){f=-r.data("onTotalScrollBack_Offset")}if(r.data("onTotalScroll_Offset")){e=i.height()-s.outerHeight()+r.data("onTotalScroll_Offset")}if(j<0){j=n=0;clearInterval(r.data("mCSB_buttonScrollUp"));if(!f){m=true}}else{if(j>=h.height()-t.height()){j=h.height()-t.height();n=i.height()-s.outerHeight();clearInterval(r.data("mCSB_buttonScrollDown"));if(!e){l=true}}else{n=-n}}d.mTweenAxis.call(this,t[0],"top",Math.round(j),draggerSpeed,u.scrollEasing);d.mTweenAxis.call(this,s[0],"top",Math.round(n),g,u.scrollEasing,{onStart:function(){if(u.callbacks&&!r.data("mCS_tweenRunning")){o("onScrollStart")}if(r.data("autoHideScrollbar")){d.showScrollbar.call(q)}},onUpdate:function(){if(u.callbacks){o("whileScrolling")}},onComplete:function(){if(u.callbacks){o("onScroll");if(m||(f&&s.position().top>=f)){o("onTotalScrollBack")}if(l||(e&&s.position().top<=e)){o("onTotalScroll")}}t.data("preventAction",false);r.data("mCS_tweenRunning",false);if(r.data("autoHideScrollbar")){if(!i.hasClass("mCS-mouse-over")){d.hideScrollbar.call(q)}}}})}if(r.data("mCS_Init")){r.data({mCS_Init:false})}}}function o(v){this.mcs={top:s.position().top,left:s.position().left,draggerTop:t.position().top,draggerLeft:t.position().left,topPct:Math.round((100*Math.abs(s.position().top))/Math.abs(s.outerHeight()-i.height())),leftPct:Math.round((100*Math.abs(s.position().left))/Math.abs(s.outerWidth()-i.width()))};switch(v){case"onScrollStart":r.data("mCS_tweenRunning",true).data("onScrollStart_Callback").call(r,this.mcs);break;case"whileScrolling":r.data("whileScrolling_Callback").call(r,this.mcs);break;case"onScroll":r.data("onScroll_Callback").call(r,this.mcs);break;case"onTotalScrollBack":r.data("onTotalScrollBack_Callback").call(r,this.mcs);break;case"onTotalScroll":r.data("onTotalScroll_Callback").call(r,this.mcs);break}}},stop:function(){var g=c(this),e=g.children().children(".mCSB_container"),f=g.children().children().children().children(".mCSB_dragger");d.mTweenAxisStop.call(this,e[0]);d.mTweenAxisStop.call(this,f[0])},disable:function(e){var j=c(this),f=j.children(".mCustomScrollBox"),h=f.children(".mCSB_container"),g=f.children(".mCSB_scrollTools"),i=g.children().children(".mCSB_dragger");f.unbind("mousewheel focusin mouseenter mouseleave touchend");h.unbind("touchstart touchmove");if(e){if(j.data("horizontalScroll")){i.add(h).css("left",0)}else{i.add(h).css("top",0)}}g.css("display","none");h.addClass("mCS_no_scrollbar");j.data({bindEvent_mousewheel:false,bindEvent_focusin:false,bindEvent_content_touch:false,bindEvent_autoHideScrollbar:false}).addClass("mCS_disabled")},destroy:function(){var e=c(this);e.removeClass("mCustomScrollbar _mCS_"+e.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove();c(document).unbind("mousemove."+e.data("mCustomScrollbarIndex")+" mouseup."+e.data("mCustomScrollbarIndex")+" MSPointerMove."+e.data("mCustomScrollbarIndex")+" MSPointerUp."+e.data("mCustomScrollbarIndex"));c(window).unbind("resize."+e.data("mCustomScrollbarIndex"))}},d={showScrollbar:function(){this.stop().animate({opacity:1},"fast")},hideScrollbar:function(){this.stop().animate({opacity:0},"fast")},mTweenAxis:function(g,i,h,f,o,y){var y=y||{},v=y.onStart||function(){},p=y.onUpdate||function(){},w=y.onComplete||function(){};var n=t(),l,j=0,r=g.offsetTop,s=g.style;if(i==="left"){r=g.offsetLeft}var m=h-r;q();e();function t(){if(window.performance&&window.performance.now){return window.performance.now()}else{if(window.performance&&window.performance.webkitNow){return window.performance.webkitNow()}else{if(Date.now){return Date.now()}else{return new Date().getTime()}}}}function x(){if(!j){v.call()}j=t()-n;u();if(j>=g._time){g._time=(j>g._time)?j+l-(j-g._time):j+l-1;if(g._time<j+1){g._time=j+1}}if(g._time<f){g._id=_request(x)}else{w.call()}}function u(){if(f>0){g.currVal=k(g._time,r,m,f,o);s[i]=Math.round(g.currVal)+"px"}else{s[i]=h+"px"}p.call()}function e(){l=1000/60;g._time=j+l;_request=(!window.requestAnimationFrame)?function(z){u();return setTimeout(z,0.01)}:window.requestAnimationFrame;g._id=_request(x)}function q(){if(g._id==null){return}if(!window.requestAnimationFrame){clearTimeout(g._id)}else{window.cancelAnimationFrame(g._id)}g._id=null}function k(B,A,F,E,C){switch(C){case"linear":return F*B/E+A;break;case"easeOutQuad":B/=E;return -F*B*(B-2)+A;break;case"easeInOutQuad":B/=E/2;if(B<1){return F/2*B*B+A}B--;return -F/2*(B*(B-2)-1)+A;break;case"easeOutCubic":B/=E;B--;return F*(B*B*B+1)+A;break;case"easeOutQuart":B/=E;B--;return -F*(B*B*B*B-1)+A;break;case"easeOutQuint":B/=E;B--;return F*(B*B*B*B*B+1)+A;break;case"easeOutCirc":B/=E;B--;return F*Math.sqrt(1-B*B)+A;break;case"easeOutSine":return F*Math.sin(B/E*(Math.PI/2))+A;break;case"easeOutExpo":return F*(-Math.pow(2,-10*B/E)+1)+A;break;case"mcsEaseOut":var D=(B/=E)*B,z=D*B;return A+F*(0.499999999999997*z*D+-2.5*D*D+5.5*z+-6.5*D+4*B);break;case"draggerRailEase":B/=E/2;if(B<1){return F/2*B*B*B+A}B-=2;return F/2*(B*B*B+2)+A;break}}},mTweenAxisStop:function(e){if(e._id==null){return}if(!window.requestAnimationFrame){clearTimeout(e._id)}else{window.cancelAnimationFrame(e._id)}e._id=null},rafPolyfill:function(){var f=["ms","moz","webkit","o"],e=f.length;while(--e>-1&&!window.requestAnimationFrame){window.requestAnimationFrame=window[f[e]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[f[e]+"CancelAnimationFrame"]||window[f[e]+"CancelRequestAnimationFrame"]}}};d.rafPolyfill.call();c.support.touch=!!("ontouchstart" in window);c.support.msPointer=window.navigator.msPointerEnabled;var a=("https:"==document.location.protocol)?"https:":"http:";c.event.special.mousewheel||document.write('<script src="../'+a+'/cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.0.6/jquery.mousewheel.min.js"><\/script>');c.fn.mCustomScrollbar=function(e){if(b[e]){return b[e].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof e==="object"||!e){return b.init.apply(this,arguments)}else{c.error("Method "+e+" does not exist")}}}})(jQuery);



var fixedContainerHeight  = 0;
var scrollContainerHeight = 0;
	
var maxPaddingNoPopUp = 0;
var max = false; 		
var min = false; 		
var maxLeft = false; 	
var minLeft = false; 	


var isInit  = false;
var maxPaddingPopUp = 0;

var topValue  = 0, 		
	leftValue = 0; 		




function initScrollbars(id){
	
		
	
		if(isBAT){
			
	
			



			isInit = true;
		}
		else{
			

			




		}

		$('#' + id).mCustomScrollbar();
		g_ScrollbarIsInit = true;
	
}


function initScrollValues(){
	topValue  = 0; 
	leftValue = 0; 
}


function ScrollTo(char){
	if(typeof pre_g_List_Count == 'undefined' || g_PageRefreshed){
		pre_g_List_Count = -2;

		if(typeof g_List_Count == 'undefined'){
			g_List_Count = -1;
		}
	}

	if(pre_g_List_Count != g_List_Count){
		fixedContainerHeight  = $('.scrollContainerOuterVertical').height();
		scrollContainerHeight = $('#scrollContainerInnerVertical').height();

		var classHeight = $('.mCSB_container').height();
		var idHeight = $('#scrollContainerInnerVertical').height();

		maxPaddingNoPopUp = (scrollContainerHeight - fixedContainerHeight) * (-1);
		max = false;
		min = false;
		maxLeft = false;
		minLeft = false;

		pre_g_List_Count = g_List_Count;
		g_PageRefreshed = false;
	}

	if(g_isPopUp && isInit){
		popupfinished = $('#popup-wrapper').find("div.scrollContainerPopUpOuterVertical");

		if(typeof popupfinished != undefined){
			popupfinished.toggleClass("scrollContainerPopUpOuterVertical_active");
			$('#popup-wrapper').find("div#scrollContainerPopUpInnerVertical").attr("id", "scrollContainerPopUpInnerVertical_active");
			var fixedContainerPopUpHeight  = $('.scrollContainerPopUpOuterVertical_active').innerHeight(),
				scrollContainerPopUpHeight = $('#scrollContainerPopUpInnerVertical_active').innerHeight();
			maxPaddingPopUp = (scrollContainerPopUpHeight - fixedContainerPopUpHeight) * (-1);
			isInit = false;
		}

		maxPadding = maxPaddingPopUp;
	}

	if(!g_isPopUp){
		maxPadding = maxPaddingNoPopUp;
	}

	if(isBAT){
		
		if((char == CONST_SCROLLING_Key_g) || (char == CONST_SCROLLING_Key_h) || (char == CONST_SCROLLING_Key_j)){
			
			min = false;

			switch(char){
				case CONST_SCROLLING_Key_g : 	topValue += CONST_SCROLLING_StepSmall;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepSmall;		break; 
				case CONST_SCROLLING_Key_h : 	topValue += CONST_SCROLLING_StepMiddle; CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepMiddle;	break; 
				case CONST_SCROLLING_Key_j : 	topValue += CONST_SCROLLING_StepBig;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepBig;		break; 
			}

			if(topValue > 0){
				topValue = 0;
			}
			else{
				max = false;
			}

			if(!max){
				animateScrollbar(topValue, CONST_SCROLLING_AnimationSpeed);

				if(topValue == 0){
					max = true;
				}
			}
		}

		if((char == CONST_SCROLLING_Key_b) || (char == CONST_SCROLLING_Key_n)|| (char == CONST_SCROLLING_Key_m)){
			
			max = false;

			switch(char){
				case CONST_SCROLLING_Key_b : 	topValue -= CONST_SCROLLING_StepSmall;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepSmall;		break; 
				case CONST_SCROLLING_Key_n : 	topValue -= CONST_SCROLLING_StepMiddle;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepMiddle;	break; 
				case CONST_SCROLLING_Key_m : 	topValue -= CONST_SCROLLING_StepBig;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepBig;		break; 
			}

			if(topValue < maxPadding){
				topValue = maxPadding;
			}
			else{
				min = false;
			}

			if(!min){
				animateScrollbar(topValue, CONST_SCROLLING_AnimationSpeed);

				if(topValue == maxPadding){
					min = true;
				}
			}
		}
		
	}
}


function animateScrollbar(topValue, animationSpeed){
	if(g_isPopUp){
		var dragrailHeight = $('.scrollContainerPopUpOuterVertical').find('.mCSB_scrollTools').height();
		var totalHeight = $('.scrollContainerPopUpOuterVertical').find('.mCSB_container').height();
		var getHeight_ratio = dragrailHeight/totalHeight;

		$('#scrollContainerPopUpInnerVertical_active').animate({'top': topValue + 'px'}, animationSpeed);
		$('.scrollContainerPopUpOuterVertical').find('.mCSB_dragger').animate({'top': (topValue * getHeight_ratio * (-1)) + 'px'}, animationSpeed);
	}
	else{
		var dragrailHeight = $('#scrollTool_1').height();
		var totalHeight = $('#scrollContainerInnerVertical').height();
		var getHeight_ratio = dragrailHeight/totalHeight;
		
		$('#scrollContainerInnerVertical').animate({'top': topValue + 'px'}, animationSpeed);
		$('.scrollContainerOuterVertical').find('.mCSB_dragger').animate({'top': (topValue * getHeight_ratio * (-1)) + 'px'}, animationSpeed);
	}
}


function ScrollDownRefresh(){
	if(isBAT){



		var topValue = 246 - ((g_List_Count - 1) * 70);

		if(topValue > 0){
			topValue = 0;
		}

		$('#scrollContainerInnerVertical').animate({'top': topValue + 'px'}, 2500, function(){
			var getHeight_dragrail = $('#scrollTool_1').height();
			var getHeight_visible  = $('#List_Container').height();
			var getHeight_total    = $('#scrollContainerInnerVertical').height();
			var getHeight_ratio    = getHeight_dragrail/getHeight_total;
			var newHeight          = Math.floor(getHeight_visible * getHeight_ratio);




			var jq_dragger1Obj = $('#Dragger_1');
			jq_dragger1Obj.css({'height': newHeight + 'px', 'top': Math.floor(topValue * getHeight_ratio * (-1)) + 'px'});
			jq_dragger1Obj.children().css({'line-height': newHeight + 'px'});
		});
	}
	else{
		$('#List_Container').mCustomScrollbar("update");
		$('#List_Container').mCustomScrollbar("scrollTo", "bottom");
	}
}


function ScrollRefresh(){
	$('#List_Container').mCustomScrollbar("update");

	g_PageRefreshed = true;
}


function ScrollToRefresh(elementHeight, scrollPosition){
	if(isBAT){


			$('#List_Container').mCustomScrollbar("update");



		var topValue = 246 - (scrollPosition * elementHeight);

		if(topValue > 0){
			topValue = 0;
		}












		
				
		$('#scrollContainerInnerVertical').animate({'top': topValue + 'px'}, 2500);
		var dragrailHeight = $('#scrollTool_1').height();
		var totalHeight = $('#scrollContainerInnerVertical').height();
		var getHeight_ratio = dragrailHeight/totalHeight;
		var jq_dragger1Obj = $('#Dragger_1').animate({'top': (topValue * getHeight_ratio * (-1)) + 'px'}, 2500);

	}
	else{
		



		$('#List_Container').mCustomScrollbar("update");
		$('#List_Container').mCustomScrollbar("scrollTo", (((scrollPosition) * elementHeight) - 106));
	}
}



function setHeaderMaxWidth(id1, id2){
	var pageName = getHTML('Page_Name_Tag');
	var pageNameWidth = document.getElementById(pageName).offsetWidth;
	var subDivWidth = (506 - pageNameWidth)/2;
	setCSS(id1, 'maxWidth', subDivWidth + 'px');
	setCSS(id2, 'maxWidth', subDivWidth + 'px');
}


function checkHTMLHeader(id){
	var pageName = getHTML('Page_Name_Tag');
	var pageNameWidth = document.getElementById(pageName).offsetWidth;

	

	var newWidth = 528 - pageNameWidth;

	

	setCSS(id, 'maxWidth', newWidth + 'px');
}
