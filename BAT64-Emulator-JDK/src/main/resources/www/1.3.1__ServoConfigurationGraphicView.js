



var g_GET_Parameter = get_GET_Parameter();
var g_lastURL 		= g_GET_Parameter.LastURL;
var g_Wizard 		= g_GET_Parameter.Wizard;
	
var g_List_Count = 0;			
var g_List_Indices = [];		
var toggleStateARD = "normal";	

var g_List_PopupListObj = [];
var g_Surface4PopupList = -1;
var g_Surface4PlugList  = [];

var g_currentGroupIndex;
var g_VoltageTagObj = {};
var g_List4TravelSettingsInit = {};
var g_List4TravelSettings = {};

var g_Surface2FunctionCheckedState = [];
var g_isListViewButton = false;
var g_isServoSyncButton = false;

var g_isElevator = true;
var g_isRudder 	 = true;

var g_isZoomed 	   = false;
var g_ZoomedSector = "none";

var g_ModelType     = "";
var g_ModelTail     = "";
var g_ModelWing     = -1;
var g_ModelElevator = -1;
var g_ModelRudder   = -1;

var g_SwashPlateType   = -1;
var g_SwashPlates      = -1;
var g_SwashPlateServos = {};
g_SwashPlateServos.SwashPlate1 = {};
g_SwashPlateServos.SwashPlate2 = {};

var g_activePlate = 1;


initPage();
	
function initPage(){
	if(g_Wizard){
		showDialogbox("wizard", "wizardStep5", "", 4);
		hideHTML('Toggle_Buttons');
		hideHTML('Navi_Box');
		hideHTML('Option_Box');
		showHTML('Wizard_Box');
		$('#Forward_Button').bind("click", function(){g_isListViewButton = false; showDialogbox("actionWait", 'Die Servos werden mit den Funktionen verknüpft.'); GetTd({"ModelWizard":{"cmd":2}}, g_SetEvent, "2");});
	}

	
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Control");
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Servo");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "ServoFrameRate");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "YesNo");
	
	InitDataPostArgs = getModelConfigObject(InitDataPostArgs);
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);


	setInterval(JsonFunction, 250);
}



function getModelConfigObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

  	ModelConfig = new Object();

  	funcPreselect = new Object();
  		funcPreselect.Index = -1;
  		funcPreselect.Name = "";
  	ModelConfig.FuncPreselect = funcPreselect;

  		type = new Object();
  		type.Index = -1;
  		type.Name = "";
  	ModelConfig.Type = type;

  	
  	modelTypeDependent = new Object();
  		tailType = new Object();
  		tailType.Index = -1;
  		tailType.Name = "";
  	modelTypeDependent.TailType = tailType;

  	 
		typeSwashPlates = new Object();
		typeSwashPlates.Index = -1;
		typeSwashPlates.Name = "";
	modelTypeDependent.TypeSwashPlate = typeSwashPlates;
		countSwashs = new Object();
		countSwashs.Index = -1;
		countSwashs.Name = "";
	modelTypeDependent.CountSwash = countSwashs;
	swashPlate = new Object();
		swashPlate.Angle = new Array();
		swashPlate.Index = -1;
	modelTypeDependent.SwashPlates = new Array(swashPlate);

  	ModelConfig.ModelTypeDependent = modelTypeDependent;

	InitDataPostArgs.ModelConfig = ModelConfig;

	return InitDataPostArgs;
}


function getControlSurfacesConfigObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	controlSurfacesConfig = new Object();

	if(g_ModelType == "Plane" || g_ModelType == "Glider"){
		controlSurfacesConfig.Wings = {};

		if(g_isElevator){
			controlSurfacesConfig.Elevators = {};
		}

		if(g_isRudder){
			controlSurfacesConfig.Rudders = {};
		}
	}
	else if(g_ModelType == "Helicopter"){
		if(g_SwashPlateType > 2){
			controlSurfacesConfig.SwashPlate__00 = {};

			if(g_SwashPlates == 2){
				controlSurfacesConfig.SwashPlate__01 = {};
			}
			else{
				controlSurfacesConfig.TailRotor = {};
			}
		}
		else{
			controlSurfacesConfig.Flybarless = {};
		}
	}

	InitDataPostArgsExtended["get"] = {};
	InitDataPostArgsExtended["get"]["model-settings"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["ControlSurfacesConfig"] = controlSurfacesConfig;

	return InitDataPostArgsExtended;	
}


function getControlSurfaceObject(CurrentDataPostArgs, surface){
	if(typeof CurrentDataPostArgs == "undefined"){
		CurrentDataPostArgs = new Object();
	}

	controlSurface = new Object();
	controlSurface.Index = surface;
	controlSurface.Servos = [];

	notUsedServos = new Object();
	notUsedServos.Index = surface;
	notUsedServos.Name = "";
	controlSurface.NotUsedServos = notUsedServos;

	CurrentDataPostArgs["get"] = {};
	CurrentDataPostArgs["get"]["model-settings"] = {};
	CurrentDataPostArgs["get"]["model-settings"]["ControlSurface"] = controlSurface;

	return CurrentDataPostArgs;	
}


function getServoVoltagePopupObj(ServoIdx){
	if(typeof ServovoltageDataPostArgs == 'undefined'){
		ServovoltageDataPostArgs = new Object();
	}

	if(typeof ServovoltageDataPostArgs.PopUp == 'undefined'){
		ServovoltageDataPostArgs["PopUp"] = {};
	}

	ServovoltageDataPostArgs["PopUp"]["ServoVoltage"] = {};
	ServovoltageDataPostArgs["PopUp"]["ServoVoltage"]["ServoIdx"] = ServoIdx;
	ServovoltageDataPostArgs["PopUp"]["ServoVoltage"]["Items"] = [];

	return ServovoltageDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		
		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);

		g_numpadLimitObj = e.EventData.NumPadLimits;
		g_List_PopupListObj["ServoFrameRate"] = e.EventData.PopUp.ServoFrameRate;
		g_List_PopupListObj["YesNo"]          = e.EventData.PopUp.YesNo;

		g_ModelType = e.EventData.ModelConfig.Type.Name;

		switch(g_ModelType){
			case "Free":		setCSS('Graphic_View_Button', 'background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG8SURBVHjaYvz//z/DcAUs6iGN9LSPH4g/0ssyJjp6TBqIHwKx3HD0nB805ryHo+cs0ehh5Tl1NHrY5Tlkelh5TgiNHlae40Sjh5Xn6A6GtedYiFTHg1TKiSJVxIpIeUgCrbCQhophA8htvhdA/BSJ/xQqBgKvgfgRlP0IygeBa0D8nVTPaQFxFBC7AjEzEBvTIYAl0AKBVDvPAvFfIN4NxMugHsfwXAIQzwRitiGW+mCBYQbEpUCcDsQLkPMcqEk0fwh6DB2wQf3hDfOcEFRgOAGQf4RAnsuBFhLDCYD8kwPKc1+g6fQCtER6QSMLkUtIRhrZoQItnEAFIz/Ic310Cs3v0NbJdxracQeKj9C7En+KRg+rFsoLNHrUc0PFc6PJcqh67jUaPaw89xGNHvXcqOcGgefeDWfP/UJqho0my6HkOboDenruy3BOln/R8t5oshxsngP1glcD8Qdo7xsZM2AR+wBVrzXYPQca7zwDxCEMkIlGYgA/VP0ZqP5B6TnQKNoiBvInOjih+oUGo+fqGHAPn4NAEwNkYKgJjxoJqDmDznPhBDxWD2XXE/BgOLUcxDic16EM66oAIMAANj5cET6GzQEAAAAASUVORK5CYII=)'); break;
			case "Glider":											
			case "Plane": 		g_ModelTail = e.EventData.ModelConfig.ModelTypeDependent.TailType.Index;
								switch(g_ModelTail){
									case 2: g_isRudder   = false; 	break;
									case 3: g_isElevator = false;	break;
								}
								setCSS('Graphic_View_Button', 'background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG8SURBVHjaYvz//z/DcAUs6iGN9LSPH4g/0ssyJjp6TBqIHwKx3HD0nB805ryHo+cs0ehh5Tl1NHrY5Tlkelh5TgiNHlae40Sjh5Xn6A6GtedYiFTHg1TKiSJVxIpIeUgCrbCQhophA8htvhdA/BSJ/xQqBgKvgfgRlP0IygeBa0D8nVTPaQFxFBC7AjEzEBvTIYAl0AKBVDvPAvFfIN4NxMugHsfwXAIQzwRitiGW+mCBYQbEpUCcDsQLkPMcqEk0fwh6DB2wQf3hDfOcEFRgOAGQf4RAnsuBFhLDCYD8kwPKc1+g6fQCtER6QSMLkUtIRhrZoQItnEAFIz/Ic310Cs3v0NbJdxracQeKj9C7En+KRg+rFsoLNHrUc0PFc6PJcqh67jUaPaw89xGNHvXcqOcGgefeDWfP/UJqho0my6HkOboDenruy3BOln/R8t5oshxsngP1glcD8Qdo7xsZM2AR+wBVrzXYPQca7zwDxCEMkIlGYgA/VP0ZqP5B6TnQKNoiBvInOjih+oUGo+fqGHAPn4NAEwNkYKgJjxoJqDmDznPhBDxWD2XXE/BgOLUcxDic16EM66oAIMAANj5cET6GzQEAAAAASUVORK5CYII=)');
								break;	
			case "Helicopter":	g_SwashPlateType = e.EventData.ModelConfig.ModelTypeDependent.TypeSwashPlate.Index;
								g_SwashPlates    = e.EventData.ModelConfig.ModelTypeDependent.CountSwash.Index;
								if(g_SwashPlateType > 2){
									g_SwashPlateServos.SwashPlate1 = e.EventData.ModelConfig.ModelTypeDependent.SwashPlates[0].Angle;
									if(g_SwashPlates == 2){
										g_SwashPlateServos.SwashPlate2 = e.EventData.ModelConfig.ModelTypeDependent.SwashPlates[1].Angle;
									}
								}
								else{
									$('.content_width_list').css({'background': 'rgba(255, 255, 255, .0)'});
								}
								setCSS('Graphic_View_Button', 'background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAQXSURBVHja3JppSBVRFMfntQiFZZshfUiJFkQMLCK1LMk0y5QoiqI9bZNWQaI+hOSHoL5UFKVZtFIfWjBtQygpxFZbiEiDrDCtTC20skhe/4P/B8Mw895o782b14Uf82a8c+/855577zlndDidTuVfyuh5eWarhoE54Axoc12suZin+Kr0UKwrh8BhsMeqDq0StxzM5e/1YLYVnfbqpilG8oFLQIWJW7I15xtBqYl+gnDIEeuF+V6yauQWgG3gBpjioe5YMEFzLRGMNNFPIdgNVltplns5f4I5Aglu6k4EDs01GZFoD6N2nNbRBHZYJg4m8gOIqRWAfhQ42aB6rMH1JDfCinBYCZrBDPT1xPIFBZ2uw+Eo6E+B8TrVIg1uDzcQJu1lqoQ9tnRB0ZQ1NLsscA3MBJX8W28w1OC+YRpR8qKPsJ0WaQfCHtlhK5AJfwyEgJsqkxsIQg3uGQGGUJi85PNsxyXsgV+2AoOSxZclc6UYTAd/aLJ6RV7EYPAFnAXzwVeQBmH3/bbPuSmZPIrAy+CCm7piyuEYtVxuLSIyA8Iq/bqJuyniqK4C38AWsMFDfVltI8BnkNrdVdFq92urSR9ShNWBZG8L86U4BzdfM6UYwp775CG8GPIMpyuWDOLAqC408xaUgzJwB2Lr7CJO3Kh9FNTHC8/0E9wFmyHylb/NMhVM85Iwhe2kgHQ7zLkQH83bCDuIq6Af6M3SREfA7/vcdS4mYxi3pTAECu1CG/XgHl23h6BaIg+7bOLfQRUpYDKosgumlQ0xxd62a1/tc9spTMyrwaDOJ3DbFXFj1Y2xu7ie4BzYBFrpPO8yqHuQq+wJhkVlEDjVruKkrdNgodKZl8wAT+kQ65UXDHjFyT7FCKEEAhPtJq4HH3ARw5Z0ehxS3hnc81H1e4XSmayVlMUVb42gN8SJH3kSLAaNNMVydTZCZ6v4rZ6LGD0nWKrKyYjABDuIkzmzhOY3C2hzHm0UrfUl3xvkZAoZ4IqJTvKbOHQuwpZxVUwDejmPDp15V8/YTy/ptBaHIno+pegj3lJx6DBYlVdspjB3OY8qzXmDu/YhUHIp0v4ACoy1cuRymUpooTBPOY83mvNnnjqAwEyavCSZ8qz0UGRlDGKexEyWShuf1ZjsR9KGEva89Hew6q7EaEwznu7Zf/F9rla1HbSDD1Z0apW4VtV2UKu3DQSSuDDVb/kSNJ5+p6vPOG7WLtMOAQ47J4jU5QBFRTPW0/te0MgRFB+zGXMvJ1DEVXERMVuqQRQEdgSCWfbtYv1B3bjHskhcW9rpYr0G42ii6jnl5CIjWWb5TteOUWsNlAVF8iqSA0liRB4F9vNv+TyXT1gSu/1SOv9xQAmUkcvnJt3B/U3YybTCVaXz05balbvli4f4K8AAdIQwXafaaxQAAAAASUVORK5CYII=)');
								break;
		}

		
		if(typeof g_lastURL != "undefined"){
			$('#List_View_Button').removeAttr("href");
			$('#List_View_Button').bind("click", function(){
				g_isListViewButton = true;
				showDialogbox("actionWait", 'Die Servo-Funktions Zuordnung wird aktualisiert.');
				GetTd({"ModelWizard":{"cmd":2}}, g_SetEvent, "2");
				
			});
			$('#Navi_Button_Outer').removeAttr("href");
			$('#Navi_Button_Outer').bind("click", function(){
				g_isListViewButton = false;
				showDialogbox("actionWait", 'Die Servo-Funktions Zuordnung wird aktualisiert.');
				GetTd({"ModelWizard":{"cmd":2}}, g_SetEvent, "2");
			});
		}

		if(g_ModelType != "Helicopter"){
			$('#Zoom_Box_1').bind("click", function(){toggleZooming("left");});
			$('#Zoom_Box_2').bind("click", function(){toggleZooming("right");});
			$('#Zoom_Box_3').bind("click", function(){toggleZooming("bottom");});

			setModelIMG(g_ModelType, g_ModelTail, false);
		}
		else{
			hideHTML('Plane_Layout');
			showHTML('Heli_Layout');

			$('#Heli_Clickbox_1').bind("click", function(){togglePlate(1);});
			$('#Heli_Clickbox_2').bind("click", function(){togglePlate(2);});

			setHeliIMG();
		}

		
		InitDataPostArgsExtended = new Object();
		GetTd(getControlSurfacesConfigObject(InitDataPostArgsExtended), g_SetEvent, "get");
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "get"){
			handleGET(e.EventData);
		}

		if(e.cmd == "set"){
			handleSET(e.EventData);
		}

		if(e.cmd == "add"){
			handleADD(e.EventData);
		}

		if((e.cmd == "remove") && (toggleStateARD == "delete")){
			for(var i = 0; i < g_List_Count; i++){
				$("#ContainerOuter_" + g_List_Indices[i]).remove(); 
			}

			g_List_Count = 0;
			g_List_Indices = [];
			GetTd(getControlSurfaceObject(CurrentDataPostArgs, g_Surface4PopupList), g_SetEvent, "get");

			if(g_List_Count == 0){
				toggleARD("normal");
			}
		}

		if(e.cmd == "2"){
			if(g_Wizard){
				showDialogbox("actionWait", 'Der Servoweg wird entsprechend der Limits und der Mitte angepasst.'); GetTd({"ModelWizard":{"cmd":4, "Servos":"ALL"}}, g_SetEvent, "4");
			}
			else{
				servoString = "";
				servoIdxArray = [];
				servoIdxObj = {};
				var countArray = 0;

				for(var key in g_List4TravelSettings){
					servoIdx4Travel = key.split("__");
					servoIdx4Travel = servoIdx4Travel[1].split("_");
					servoIdx4Travel = parseInt(servoIdx4Travel[0]);
					servoIdxObj[servoIdx4Travel] = g_List4TravelSettingsInit['Servo__' + servoIdx4Travel + '_Name'];
				}

				for(var key in servoIdxObj){
					servoString += servoIdxObj[key] + ", ";
					servoIdxArray[countArray] = parseInt(key);
					countArray++;
				}

				if(countArray != 0){	
					servoString = servoString.substring(0, servoString.length-2);
					showDialogbox("setTravel", servoString);
				}
				else{
					if(g_isListViewButton){
						window.location.href = "1.3.2__ServoConfigurationListView.html?LastURL=" + g_lastURL;
					}
					else if(g_isServoSyncButton){
						 gotoServoSync(true);
					}
					else{
						window.location.href = g_lastURL;
					}		
				}
			}
		}

		if(e.cmd == "4"){
			if(g_Wizard){
				window.location.href = "1.3.2__ServoConfigurationListView.html?Wizard=true";
			}
			else if(g_isServoSyncButton){
				 gotoServoSync(true);
			}	 
			else{
				setTravelGoto(false);	
			}
		}

		if(typeof e.EventData.PopUp != "undefined"){
			if(typeof e.EventData.PopUp.ServoVoltage != "undefined"){
				showPopupList(g_VoltageTagObj["Servo__" + e.EventData.PopUp.ServoVoltage.ServoIdx + "_Voltage"], e.EventData.PopUp.ServoVoltage.Items, false, true, g_popupList_Indices);
			}
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}	
}


function handleTest(completeTagId, value){
	tagIdArray = completeTagId.split("__");
	tagIdArray = tagIdArray[1].split("_");
	Index = parseInt(tagIdArray[0]);

	if(numpadIsTestActive){
		GetTd({"cmd":0x0256, "param": {"ServoIdx": Index, "Pos": parseFloat(value)}}, "noEvent", "command");
		
	}	
	else{
		
	}	
}


function gotoServoSync(isTravelSet){
	if(isTravelSet){
		window.location.href = "9.3__ServoSynchronization.html?GroupIndex=" + g_currentGroupIndex + "&LastURL=1.3.1__ServoConfigurationGraphicView.html";
	}
	else{
		if(g_Wizard){
			window.location.href = "9.3__ServoSynchronization.html?Wizard=" + g_Wizard + "&GroupIndex=" + g_currentGroupIndex + "&LastURL=1.3.1__ServoConfigurationGraphicView.html?Wizard=true";
		}
		else{
			g_isServoSyncButton = true;
			showDialogbox("actionWait", 'Die Servos werden mit den Funktionen verknüpft.');
			GetTd({"ModelWizard":{"cmd":2}}, g_SetEvent, "2");
			
		}
	}
}


function setTravelGoto(isConfirm){
	if(g_isListViewButton){
		window.location.href = "1.3.2__ServoConfigurationListView.html?LastURL=" + g_lastURL;
	}
	else if(g_isServoSyncButton){
		 gotoServoSync(true);
	}	
	else{
		window.location.href = g_lastURL;
	}
}


function setDependingLimits(tagId){
	tagIdArray = tagId.split("__");
	tagIdArray = tagIdArray[1].split("_");
	Index = parseInt(tagIdArray[0]);
	tagId = tagIdArray[1];

	if(tagId == "MaxValue"){
		numpadMinValue = parseFloat(splitUnitFromValue(getHTML("Servo__" + Index + "_Center")).value);
	}
	else if(tagId == "MinValue"){
		numpadMaxValue = parseFloat(splitUnitFromValue(getHTML("Servo__" + Index + "_Center")).value);
	}
	else if(tagId == "Center"){
		numpadMaxValue = parseFloat(splitUnitFromValue(getHTML("Servo__" + Index + "_MaxValue")).value);
		numpadMinValue = parseFloat(splitUnitFromValue(getHTML("Servo__" + Index + "_MinValue")).value);
	}
}


function getServoVoltagePopupList(tagObj){
	tagId = $(tagObj).attr('id');
	ServoIdx = parseInt(tagId.split("__")[1].split("_")[0]);
	g_VoltageTagObj["Servo__" + ServoIdx + "_Voltage"] = tagObj;

	GetTd(getServoVoltagePopupObj(ServoIdx), g_SetEvent);
}


function showServoList(tagId, surface, sector){
	if(!g_isZoomed && g_ModelType != "Helicopter"){
		toggleZooming(sector);
	}

	servoListTargetTagId = tagId;
	g_Surface4PopupList  = surface;

	$('#Pop_Up_Servo_List').css({'top': '80px', 'padding-left': '11px'});
	var htmlServoListOutter = "<div id=\"Servo_List_Outter\"></div>";
	$('#Pop_Up_Servo_List').append(htmlServoListOutter);
	$('#Servo_List_Outter').html(getHtmlServoList(servoListTargetTagId));

	






	
	
	$('#Add_Button').bind("click", function(){AddItem(surface);});
	
	$('#Delete_Button').bind("click", function(){toggleDelete();});
	$('#Navi_Button').bind("click", function(){toggleARD();});
	

	initScrollbars('List_Container');
	
	CurrentDataPostArgs = new Object;
	GetTd(getControlSurfaceObject(CurrentDataPostArgs, surface), g_SetEvent, "get");

	var popUpContent = $('#Pop_Up_Servo_List').height();

	if(popUpContent > 0 && g_ModelType != "Helicopter"){
		hideHTML('Zoom_Box_1');
		hideHTML('Zoom_Box_2');
		hideHTML('Zoom_Box_3');
	}
	else if(popUpContent > 0 && g_SwashPlateType > 2){
		hideHTML('Heli_Clickbox_1');
		hideHTML('Heli_Clickbox_2');

		var clickedHeight = document.getElementById(tagId).style.marginTop;
		var plateOffset = getPlateOffset(clickedHeight);

		setCSS('Heli_Plate', 'margin-top', plateOffset);
	}
	else{
		console.log(g_SwashPlateType);
	}

	setPositionServoList(servoListTargetTagId, false);
}


function getHtmlServoList(tagId){
	var htmlServoList = '' +
	'<div id="ServoList_Inner" class="popup_servo_List">' +
		'<div id="ServoListPopupArrowUp" style="margin-top: -20px; height: 16px; padding-left: 0px; display: none;"><img width="25" height="16" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAQAgMAAACeiDw4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mzc5QkMwNTFERDExMTFFMkI0NERFRjlBMTFBNTVCQTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mzc5QkMwNTJERDExMTFFMkI0NERFRjlBMTFBNTVCQTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzlCQzA0RkREMTExMUUyQjQ0REVGOUExMUE1NUJBMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNzlCQzA1MEREMTExMUUyQjQ0REVGOUExMUE1NUJBMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph/VX00AAAAJUExURX6kyf///36kyUqZ7rsAAAACdFJOUwAAdpPNOAAAAEBJREFUCNddijERwDAQw3w/BkpRhET5FErGnFA2b2/RokGSpE+mVjx2/BCDhwIPA3YyJHuo9nL20LkH6wyvmbd/6jMjHzEhB2sAAAAASUVORK5CYII=" alt="" draggable="false" /></div>' +
		'<div class="content_width_list" style="height: 240px; z-index: 2050; position: inherit;">' +
			'<!--<div class="list_content">-->' +
				'<div class="list_header">' +
					'<div class="list_servo_plug">' + 'Pos.' + '</div>' +
					'<div class="list_servo_name">' + 'Servo' + '</div>' +
					'<div class="list_servo_group" style="margin-left: -2px;">' + 'Gruppe' + '</div>' +
					'<div class="list_servo_cr"    style="margin-left: 7px;">' + 'Mitte' + '</div>' +
					'<div style="margin-left: 32px;">-</div>' + 
					'<div class="list_servo_limit">' + 'Limit' + '</div>' +
					'<div style="margin-top: 3px;">+</div>' +
					'<div class="list_servo_info"  style="margin-left: 68px; width: 52px;">' + 'Info' + '</div>' +
				'</div>' +
				'<div id="List_Container" class="list_content scrollContainerOuterVertical" style="max-height: 140px;">' +
					'<div id="scrollContainerInnerVertical" class="inner_list_content">' +
					'</div>' +
				'</div>' +
			'<!--</div>-->' +
		'</div>' +
		'<aside id="ARD_Buttons" class="ard_buttons">' +
			'<div class="button_blue round_top" style="width: 60px; height: 60px;"><a id="Add_Button" class="add_button" draggable="false"></a></div>' +
			'<div id="Hidden_Info_Box" class="button_blue round_top" style="visibility: hidden; margin-top: -62px; width: 0px; height: 60px;"></div>' +
			'<div class="button_blue round_bottom" style="width: 60px; height: 60px;"><a id="Delete_Button" class="trash_button" draggable="false"></a></div>' +
			'<div class="button_blue round_all" style="margin-top: 4px; width: 60px; height: 60px; display: none;"><a id="Reorder_Button" class="reorder_button" draggable="false"></a></div>' +
		'</aside>' +
		'<!--<div id="ServoListPopupArrowDown" style="margin-top: 70px; padding-left: 0px; height: 16px; position: absolute; display: none;"><img width="25" height="13" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAANAQMAAABmYFetAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MjhGRUZFNDg2MzExRTJCNTYxODhBMDEzMUJDMzVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU1MjhGRUZGNDg2MzExRTJCNTYxODhBMDEzMUJDMzVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTUyOEZFRkM0ODYzMTFFMkI1NjE4OEEwMTMxQkMzNUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTUyOEZFRkQ0ODYzMTFFMkI1NjE4OEEwMTMxQkMzNUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5lMsq2AAAABlBMVEV+pMl+pMlsEQsHAAAAAXRSTlMAQObYZgAAADdJREFUCB0FwbERgCAQALD4NG7NuRmj4AacFQXyJFfyqJmiSdFtMSwxTbEMsXWRGipFvor/w80BDtAVa7HtmyMAAAAASUVORK5CYII=" alt="" draggable="false" /></div>-->' +
		'<footer style="position: inherit; z-index: 2100;">' +
			'<div class="black_bar" style="margin-top: -7px; margin-left: 0px;"></div>' +
			'<div id="Additional_Button_Box" class="left_button_box" style="margin: 175px 0px 0px 0px;">' +
				'<div class="button_blue round_all" style="height: 60px;"><a id="Additional_Button" onClick=\'gotoServoSync(false)\' draggable="false">' + 'Synchronisation' + '</a></div>' +
			'</div>' +
			'<div class="right_button_box" style="margin-left: 570px;">' +
				'<div id="Navi_Box">' +
					'<div class="button_blue round_all" style="width: 180px; height: 60px;"><a id="Navi_Button" class="back_button" draggable="false"></a></div>' +
				'</div>' +
			'</div>' +
		'</footer>' +
	'</div>';

	return htmlServoList;  
}


function getServoListContent(e){
	
	var ItemCount = e.length;
	
	g_List_Indices = [];

	htmlRow = "";
	var i = 0;

	for(i = 0; i < ItemCount; i++){
		Index    = e[i].Index;
		Name     = e[i].Name;
		htmlRow += getRowRD (Index, 'Servo', Name, Index);
	}

	$("#scrollContainerInnerVertical").html(htmlRow);

	for(i = 0; i < ItemCount; i++){
		Index    = e[i].Index;
		Plug     = e[i].Plug;
		Name     = e[i].Name;
		Group    = e[i].Group.Name;
		MaxValue = e[i].MaxValue;
		MinValue = e[i].MinValue;
		Voltage  = e[i].Voltage.Name;
		isSlave  = e[i].IsSlave.Index;
		isGizmo  = e[i].IsGizmo;

		g_currentGroupIndex = e[i].Group.Index;





			centerReverse = e[i].Centre;


		
		FrameRate = e[i].FrameRate.Name;

		g_List_Indices[i] = Index;
		g_Surface4PlugList[Index] = Plug;

		
		setHTML('Container_' + Index, getServoListRow(Index, Plug, Name, Group, MinValue, MaxValue, centerReverse, Voltage, FrameRate, isSlave, isGizmo));

		g_popupList_Indices["Servo__" + Index + "_FrameRate"] = e[i].FrameRate.Index;
		$("#Servo__" + Index + "_FrameRate").bind("click", function(){showPopupList(this, g_List_PopupListObj["ServoFrameRate"], false, true, g_popupList_Indices);});

		g_popupList_Indices["Servo__" + Index + "_Voltage"] = e[i].Voltage.Index;
		$("#Servo__" + Index + "_Voltage").bind("click", function(){getServoVoltagePopupList(this);});





	}


	ScrollDownRefresh();

	g_List_Count = g_List_Indices.length;
}


function getServoListRow(Index, Plug, Name, Group, MinValue, MaxValue, centerReverse, Voltage, FrameRate, isSlave){
	if(isSlave){
		htmlCenterReverse = '<div id="Servo__' + Index + '_Reverse" class="list_servo_cr no_edit_servo_graphic">' + centerReverse + '</div>';
		styleCenterReverse = 'no_edit_servo_graphic';
	}
	else{
		htmlCenterReverse = '<div id="Servo__' + Index + '_Center" class="list_servo_cr" onClick=\'showNumpad("Servo__' + Index + '_Center", "Servo", false, true);\'>' + centerReverse + '</div>';
		styleCenterReverse = "";
		g_List4TravelSettingsInit['Servo__' + Index + '_MinValue'] = splitUnitFromValue(MinValue).value;
		g_List4TravelSettingsInit['Servo__' + Index + '_MaxValue'] = splitUnitFromValue(MaxValue).value;
		g_List4TravelSettingsInit['Servo__' + Index + '_Center']   = splitUnitFromValue(centerReverse).value;
		g_List4TravelSettingsInit['Servo__' + Index + '_Name']   = Name;
	}

	if(isGizmo){
		classVoltage = "";
	}
	else{
		classVoltage = "no_edit";
		Voltage = "--";
	}

	htmlServoListContentRow = '' +
		'<div id="Servo__' + Index + '_Plug"  class="list_servo_plug no_edit_servo_graphic">' + Plug + '</div>' +
		'<div id="Servo__' + Index + '_Name"  class="list_servo_name" onClick=\'showKeypad("Servo__' + Index + '_Name");\'>' + Name + '</div>' +
		'<div id="Servo__' + Index + '_Group" class="list_servo_group no_edit_servo_graphic">' + Group + '</div>' +
		
		htmlCenterReverse +
		'<div id="Servo__' + Index + '_MinValue" class="list_servo_limit ' + styleCenterReverse + '" onClick=\'showNumpad("Servo__' + Index + '_MinValue", "Servo", true, true);\'>' + MinValue + '</div>' +
		'<div id="Servo__' + Index + '_MaxValue" class="list_servo_limit ' + styleCenterReverse + '" onClick=\'showNumpad("Servo__' + Index + '_MaxValue", "Servo", true, true);\'>' + MaxValue + '</div>' +
		'<div id="Servo__' + Index + '_FrameRate" class="list_servo_info">' + FrameRate + '</div>' +
		'<div id="Servo__' + Index + '_Voltage" class="list_servo_info ' + classVoltage +'">' + Voltage + '</div>';

	return htmlServoListContentRow;
}


function setPositionServoList(tagId, isDynamic){
	var widthContainer = $('#' + tagId).outerWidth();
	var heightContainer = $('#' + tagId).outerHeight();
	var numpadHeight = 140;
	var numpadTop = 0;
	var documentWidthOffset = $('body').offset().left + 30; 

	var offsetContainer = $('#' + tagId).offset();

	if((offsetContainer.top > 240) && isDynamic){
		numpadTop = offsetContainer.top - numpadHeight;
		$('#ServoListPopupArrowDown').show();
		$('#ServoListPopupArrowDown').css({'padding-left': (offsetContainer.left + (widthContainer / 2) - documentWidthOffset) + 'px'})
	}
	else{
		if(isDynamic){
			numpadTop = offsetContainer.top + heightContainer;
		}
		else{
			numpadTop = offsetContainer.top + heightContainer + 14;
		}

		$('#ServoListPopupArrowUp').show();
		$('#ServoListPopupArrowUp').css({'padding-left': (offsetContainer.left + (widthContainer / 2) - documentWidthOffset) + 'px'});
	}

	$('#Pop_Up_Servo_List').css({'top': numpadTop + 'px'});
}


function handleADD(TdJson){
	if(typeof TdJson.add.ServoConfig != "undefined"){
		createAddItem(TdJson);
	}


















}


function handleSET(TdJson){
	if(typeof TdJson.set.ServoConfig != "undefined"){
		if(typeof TdJson.set.ServoConfig.Voltage != "undefined"){
			CurrentDataPostArgs = new Object;
			GetTd(getControlSurfaceObject(CurrentDataPostArgs, g_Surface4PopupList), g_SetEvent, "get");
		}
	}

















}


function handleGET(TdJson){
	surfaces = TdJson.get.ControlSurfacesConfig;

	if(typeof surfaces != "undefined" && g_ModelType != "Helicopter"){		
		g_ModelWing = surfaces.Wings.ControlSurfaces;

		setModelWings(g_ModelType, g_ModelTail, g_ModelWing);

		if(g_isRudder){
			g_ModelRudder = surfaces.Rudders.ControlSurfaces;
			setModelRudder(g_ModelType, g_ModelTail, g_ModelRudder);
		}

		if(g_isElevator){
			g_ModelElevator = surfaces.Elevators.ControlSurfaces;
			setModelElevator(g_ModelType, g_ModelTail, g_ModelElevator);
		}

		if((g_ModelWing == null) || (g_ModelWing.length == 1) || (g_ModelWing.length == 2 && g_ModelType == "Plane") || (g_ModelWing.length == 2 && g_ModelTail == 3)){
			hideHTML('Aileron_Matrix');
			hideHTML('Flap_Matrix');
		}
		else{
			setFunctionMatrix(g_ModelType, g_ModelTail, surfaces.Wings);
			showHTML('Aileron_Matrix');
			showHTML('Flap_Matrix');
		}

		showHTML('Zoom_Box_1');
		showHTML('Zoom_Box_2');
		showHTML('Zoom_Box_3');
	}
	else if(typeof surfaces != "undefined" && g_ModelType == "Helicopter"){
		if(g_SwashPlateType < 3){
			createFunctionRows(surfaces.Flybarless);
		}
		else{
			if(g_SwashPlates == 2){
				setModelHeli(g_SwashPlateType, g_SwashPlates, surfaces.SwashPlate__00.ControlSurfaces, surfaces.SwashPlate__01.ControlSurfaces);
			}
			else{
				setModelHeli(g_SwashPlateType, g_SwashPlates, surfaces.SwashPlate__00.ControlSurfaces, surfaces.TailRotor.ControlSurfaces);
			}
		}
	}

	surfaces = TdJson.get.ControlSurface;

	if(typeof surfaces != "undefined"){
		g_List_PopupListObj["NotUsedServos"] = surfaces.NotUsedServos;
		getServoListContent(surfaces.Servos);
	}
}


function getControlAssignmentPath(value, Index){
	cmd = "set";
	ModelName = "DefaultModel";
	ListType = "Function";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"' + ListType + '":{"Control":"' + value + '","Index":' + Index + '}}}}');

	return str;
}


function getAttrObj(tagId, value, completeTagId){
	Attribute = new Object();

	if(tagId == "Name"){
		Attribute["Name"] = value;

		return Attribute;
	}

	if(tagId == "Group"){
		Attribute["Group"] = value;

		return Attribute;
	}

	if(tagId == "Center"){
		Attribute["Centre"] = value;

		if(g_List4TravelSettingsInit[completeTagId] != value){
			g_List4TravelSettings[completeTagId] = value;
		}
		else{
			delete g_List4TravelSettings[completeTagId];
		}

		return Attribute;
	}

	if(tagId == "Reverse"){
		Attribute["IsReverse"] = value;
		

		return Attribute;
	}

	if(tagId == "MinValue"){
		Attribute["MinValue"] = value;

		if(numpadIsTestActive){
			handleTest(completeTagId, value);

			return false;
		}

		if(g_List4TravelSettingsInit[completeTagId] != value){
			g_List4TravelSettings[completeTagId] = value;
		}
		else{
			delete g_List4TravelSettings[completeTagId];
		}

		return Attribute;
	}

	if(tagId == "MaxValue"){
		Attribute["MaxValue"] = value;

		if(numpadIsTestActive){
			handleTest(completeTagId, value);

			return false;
		}

		if(g_List4TravelSettingsInit[completeTagId] != value){
			g_List4TravelSettings[completeTagId] = value;
		}
		else{
			delete g_List4TravelSettings[completeTagId];
		}

		return Attribute;
	}

	if(tagId == "FrameRate"){
		Attribute["FrameRate"] = value;

		return Attribute;
	}

	if(tagId == "Voltage"){
		Attribute["Voltage"] = value;

		return Attribute;
	}

	return Attribute;
}


function getPathObj(cmd, ModelName){
	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};

	return xmlObj;
}


function submitSET(tagId, value){
	ModelName = "model-settings";

	if(tagId == "Hidden_Info_Box"){
		if(!isNaN(value)){
			submitARD("add", parseInt(value));
		}	
	}
	else{
		ListType = "ServoConfig";

		completeTagId = tagId;
		tagIdArray = tagId.split("__");
		cmd = "set";
		tagIdArray = tagIdArray[1].split("_");
		Index = tagIdArray[0];
		tagId = tagIdArray[1];

		Attr = new Object();
		Attr = getAttrObj(tagId, value, completeTagId);

		xmlObj = getPathObj(cmd, ModelName);
		xmlObj[cmd][ModelName][ListType] = {};
		xmlObj[cmd][ModelName][ListType] = Attr;
		xmlObj[cmd][ModelName][ListType]["Index"] = parseInt(Index);

		if(Attr != false){
			GetTd(xmlObj, g_SetEvent, cmd);
		}
	}
}


function submitARD(cmd, num){
	ModelName = "model-settings";
	ListType  = "ControlSurface";

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType]["ServoIdx"] = num;
	xmlObj[cmd][ModelName][ListType]["Index"]    = g_Surface4PopupList;

	GetTd(xmlObj, g_SetEvent, cmd);

	if(cmd == "remove"){
		setServoString2Surface(cmd, g_Surface4PopupList, num);
	}	
}


function submitAddFunction2Surface(tagId){
	var tagIndices = tagId.split('__')[1];
	var tagIndices = tagIndices.split('_');
	var functionIndex = tagIndices[0];
	var surfaceIndex  = tagIndices[1];
	var cmd = "";

	if(g_Surface2FunctionCheckedState[functionIndex][surfaceIndex]){
		$("#" + tagId).removeClass("checked");
		$("#" + tagId).addClass("unchecked");
		cmd = "remove";
	}
	else{
		$("#" + tagId).removeClass("unchecked");
		$("#" + tagId).addClass("checked");
		cmd = "add";
	}

	g_Surface2FunctionCheckedState[functionIndex][surfaceIndex] ^= 1;

	ModelName = "model-settings";

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName]["ControlSurfacesConfig"] = {};
	xmlObj[cmd][ModelName]["ControlSurfacesConfig"]["Wings"] = {};
	xmlObj[cmd][ModelName]["ControlSurfacesConfig"]["Wings"]["DependentFunction"] = {};
	xmlObj[cmd][ModelName]["ControlSurfacesConfig"]["Wings"]["DependentFunction"]["Index"] = parseInt(functionIndex);
	xmlObj[cmd][ModelName]["ControlSurfacesConfig"]["Wings"]["DependentFunction"]["ControlSurfaceIdx"] = parseInt(surfaceIndex);

	GetTd(xmlObj, g_SetEvent, cmd);
}


function AddItem(surface){
	showPopupList($('#Hidden_Info_Box'), g_List_PopupListObj["NotUsedServos"], false, true, g_popupList_Indices);
}


function toggleDelete(){
	hideHTML("ARD_Buttons");
	setCSS("List_Container", "width", "778px");
	setCSS("scrollContainerInnerVertical", "width", "778px");

	for(var i = 0; i < g_List_Count; i++){
		showHTML("Delete_Button_" + g_List_Indices[i]);
	}

	toggleStateARD = "delete";
}


function deleteItem(index){
	submitARD("remove", index);
}


function toggleReorder(){
	hideHTML("ARD_Buttons");
	setCSS("List_Container", "width", "778px");
	setCSS("scrollContainerInnerVertical", "width", "778px");

	for(var i = 1; i < g_List_Count; i++){
		showHTML("Reorder_Button_" + g_List_Indices[i]);
	}

	toggleStateARD = "reorder";
}


function raiseElement(Index){
	location.reload();
}


function toggleARD(){
	if(toggleStateARD == "normal"){
		$('#Servo_List_Outter').remove(); 
		$('#Pop_Up_Outer').remove();

		
		if(g_ModelType != "Helicopter"){
			if(g_ZoomedSector == "none"){
				showHTML('Zoom_Box_1');
				showHTML('Zoom_Box_2');
				showHTML('Zoom_Box_3');
			}
			else if(g_ZoomedSector == "left"){
				showHTML('Zoom_Box_1');
			}
			else if(g_ZoomedSector == "right"){
				showHTML('Zoom_Box_2');
			}
			else if(g_ZoomedSector == "bottom"){
				showHTML('Zoom_Box_3');
			}
		}
		else{
			if(g_SwashPlateType > 2){
				setCSS('Heli_Plate', 'margin-top', '0px');
				showHTML('Heli_Clickbox_1');
				showHTML('Heli_Clickbox_2');
			}
			else{
				setCSS('outerList', 'margin-top', '3px');
				setCSS('innerList', 'margin-top', '0px');
			}
		}
	}
	else if(toggleStateARD == "delete"){
		for(var i = 0; i < g_List_Count; i++){
			hideHTML("Delete_Button_" + g_List_Indices[i]);
		}

		setCSS("List_Container", "width", "674px");
		setCSS("scrollContainerInnerVertical", "width", "674px");
		showHTML("ARD_Buttons");
		toggleStateARD = "normal";	
	}
	else if(toggleStateARD == "reorder"){
		for(var i = 1; i < g_List_Count; i++){
			$("#Reorder_Button_" + g_List_Indices[i]).hide();
		}

		setCSS("List_Container", "width", "674px");
		setCSS("scrollContainerInnerVertical", "width", "674px");
		showHTML("ARD_Buttons");
		toggleStateARD = "normal";		
	}
}


function createAddItem(TdJson){
	log(2, "success ADD: " + JSON.stringify(TdJson));

	Index     = TdJson.add.ServoConfig.Index;
	Name      = TdJson.add.ServoConfig.Name;
	Plug      = TdJson.add.ServoConfig.Plug;
	Group     = TdJson.add.ServoConfig.Group.Name;
	MaxValue  = TdJson.add.ServoConfig.MaxValue;
	MinValue  = TdJson.add.ServoConfig.MinValue;
	Center    = TdJson.add.ServoConfig.Centre;
	Voltage   = TdJson.add.ServoConfig.Voltage.Name;
	FrameRate = TdJson.add.ServoConfig.FrameRate.Name;
	isSlave   = TdJson.add.ServoConfig.IsSlave.Index;
	isGizmo   = TdJson.add.ServoConfig.IsGizmo;

	g_currentGroupIndex = TdJson.add.ServoConfig.Group.Index;

	g_Surface4PlugList[Index] = Plug;
	setServoString2Surface("add", g_Surface4PopupList, Plug);

	for(var i = 0; i < g_List_PopupListObj["NotUsedServos"].length; i++){
		if(Index == g_List_PopupListObj["NotUsedServos"][i].Index){
			g_List_PopupListObj["NotUsedServos"].splice(i, 1);
			break;
		}
	}

	g_List_Indices.push(Index);
	g_List_Count = g_List_Indices.length;

	$('#scrollContainerInnerVertical').append(getRowRD (Index, 'Servo', Name, Index));
	setHTML('Container_' + Index, getServoListRow(Index, Plug, Name, Group, MinValue, MaxValue, Center, Voltage, FrameRate, isSlave,isGizmo));

	g_popupList_Indices["Servo__" + Index + "_FrameRate"] = TdJson.add.ServoConfig.FrameRate.Index;
	$("#Servo__" + Index + "_FrameRate").bind("click", function(){showPopupList(this, g_List_PopupListObj["ServoFrameRate"], false, true, g_popupList_Indices);});

	g_popupList_Indices["Servo__" + Index + "_Voltage"] = TdJson.add.ServoConfig.Voltage.Index;
	$("#Servo__" + Index + "_Voltage").bind("click", function(){getServoVoltagePopupList(this);});

	ScrollDownRefresh();
}


function setServoString2Surface(cmd, surface, value){
	
	if($('#Surface_' + surface).is(':empty')){
		surfaceServoArray = new Array();
	}
	else{
		surfaceServoArray = getHTML("Surface_" + surface).split(",");
	}

	if(cmd == "add"){
		surfaceServoArray.push(value);
	}

	if(cmd == "remove"){
		var newSurfaceServoArray = [];
		var j = 0;

		for(var i = 0; i < surfaceServoArray.length; i++){
			if(surfaceServoArray[i] != g_Surface4PlugList[value]){
				newSurfaceServoArray[j] = surfaceServoArray[i];
				j++;
			}
		}

		surfaceServoArray = newSurfaceServoArray;
	}

	setHTML("Surface_" + surface, surfaceServoArray);
}


function setModelIMG(model_type, model_tail, sector){
	var img_src = "";

	if(g_isZoomed){
		var img_width  = 1404;
		var img_height = 850;
	}
	else{
		var img_width  = 674;
		var img_height = 408;
	}

	if(model_tail == 1){
		switch(model_type){
			case "Plane":	img_src = "data:image/png;base64,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"; break;
			case "Glider":	img_src = "data:image/png;base64,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VOmNb3xj26OPPvqd6AtmT6PX7bvf/W5vHMIeOXJkIDJ+/PjxkZdffjn+38Hwta99rWd8fHz6H9ng4OD4f//v/703/WUxe5n+RzhVs6ze4+a7DHVuz3d9sfcDQF5OagtLOOk91/en70UA8vyduJjvxcIinluo87hCzf2V5du2bSsfPHiwEhYfOHCgffv27XGrhHDo0KEN8bIkMN66dWvrxo0bWxq90X7913/9/g996ENfiK6eCjOhb0804qKq+Jw+DnzHQ6rSV4ZGbj4Q7KzkYkedC3ynq3tfeeWVH9+5c+cDK/Feo6OjE3F4G4e4Tz31VO/ExMTUs88+OxBX2UbvO/L8888P9fb2xpW1faE6oE3+MU3Oc71emLsct2tPShcb+C4mMAaALJ/EFuqcgE6PG2+8sSs6Vmj90pe+dGpwcHCyzmsu5XvW9yQAefuOXMz353yPWUzQW28s9Pxivedu27YtrjReVyqVCq9//es3xMuuvvrqda2traXt27e3bd68ubWzs7Np165dHSux8V544YXnL7300o9EV0+GmdD3TDTic/2kyjf+K9xKla8Mjdx8MNhZycWOOhf4xr10yqOjo18sl8tvXOrrHDt2bLi7u3v0e9/7Xl/cPuGpp57qe+WVV4bjEDcOc6Pbg+HsEHehkZxATp5j2blGqHlu7fWFnlPvpLTe9YWW+SAAIA8ns5UTyI0bNza/613v2hWdHO6MTgx37N+/f/vOnTu3RMcH885RcerUqZ6XX375TPR9f+zJJ5889uijjx7/8pe/fDr1vVvvcsr3JQA5+76s+s6c5/s0hHOHvfVu1w1uw8IBcLHO9fSkaMU6z619XGhqairddtttG5NweNOmTS2XXnpp+549ezq6urqao2OBddFjikvdaD/7sz/7sfvuu+9/hLnAN67yjQPfdJXv9PGADI3cfBjYWcnFjjqT+E4Hvt/+9rcPXXPNNV+t97ju7u7T0cncwDPPPNP77LPPDp84cWLyscce6zt58uTE448/PpA6WZuqczI3eR73TS6wbL4TxqWGwrWPrb1+rkrf+e5z8gpAXk5ep8dll13WHp2UvfaHf/iHb3rNa15zdXTCd8GT0kTHDaf/+q//+psPPvjgN/74j//45TA3SUvtqP3+BYDMf3fWWV7vst5zCosc9QLchR57rstQZ/lCj6m6b926daVbbrllw969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"; break;
		}
	}
	else if(model_tail == 2){
		switch(model_type){
			case "Plane":	img_src = "data:image/png;base64,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bwj/CmAhtga+zmUJsbWyV3cbtzDX63ryhJFefYKtgOOz4XN7v17AAABgFD5T8xQAABAbRsDrGD6XuQW7hs9t3Kpzndur96euczeBr+ny2H7ny5d3XPfGG2888KEPfeh1559//pWnnnrqr7A79c+BAwfGFxcXq85rms/nN8Jeh0wms6XCN5VKjcmVvYS9Ozc1NXXqJZdc8p/s5SMf+UjumWee+f8eeOCBRz72sY/9pFAoVIQ+7JWDYOFyuRD6CmEh3HsCO+Gu2+Rwukpat97Czno57SkMZZ26qfrV9fLVVRsLQYUvAAAQBL4AAAwjo8vLu6noVQNdq8v78FtPt1YMXpOzufXaFaL7YFdXyStfv+Pw5ptvPuPWW2+97mUve9lls7OzF7LrhWNmZia5uLjovF71TCazGvY6LC8vb5m0LZVKJWnn0D9jY2N7Lrjgguvt5ZZbbik8//zzj/2g4XOf+9xPn3766XXhHv461bFy719dda/zoqnBr65lg+VyPV1A61wvIfQhrSk9rjO++AW2QQJa+TpBK3d71dsXAABEGIEvAADw4tV6QT7u16PXa5I03X2bym3lnz2bYvuBb0K5fEtLhz/8wz985dvf/vbXvexlL7tmZmbmJewC4TvllFPGjhw5Ilqvu1haWgo98G08plrha01MTIypgS/Bb3+kUqmpc8455yp7ed/73leen5//2cMPP2z3/H3kJz/5SV7oq31rwr3Xr66q1y3w9TtfruR1m6RN10JCDX514bF82rle3WVsrnuM2wS3AADEGIEvAADR120PXSPg7YNMvtbtRGu6frxegbAc5grh3wJC13pBflzXydU0l7ePf/WrX3311VdffcW55577HyYmJk5jlxus6enphHTSmp+fD72HbyaTKQklGEwmk2OmaTJpW8gSicTYWWed9e/f/e5324to7A+P/eIXv3j0i1/84kP33nvvstis6BWis9JXHkN0Ia/aXkFt/yC3UdCd71axq1YIO5cLZX3k6+oqfg3hPpGcPJZaAd4HhHJdKn0BABhhBL4AAMSTLkxVdTPRmldrBkN4B8FeFbu6x3ULfNWWDLr7ay52y4CvfvWrlzVcefDgwatTqdRedono2L9//0TrtWsGd8eOHSuGvQ4nTpywH7OjMtSZUI6gd7DOOOOMf2cv11133QfT6fQvn3jiiUfuuuuuH9x9993H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"; break;
			case "Glider":	img_src = "data:image/png;base64,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VOmNb3xj26OPPvqd6AtmT6PX7bvf/W5vHMIeOXJkIDJ+/PjxkZdffjn+38Hwta99rWd8fHz6H9ng4OD4f//v/703/WUxe5n+RzhVs6ze4+a7DHVuz3d9sfcDQF5OagtLOOk91/en70UA8vyduJjvxcIinluo87hCzf2V5du2bSsfPHiwEhYfOHCgffv27XGrhHDo0KEN8bIkMN66dWvrxo0bWxq90X7913/9/g996ENfiK6eCjOhb0804qKq+Jw+DnzHQ6rSV4ZGbj4Q7KzkYkedC3ynq3tfeeWVH9+5c+cDK/Feo6OjE3F4G4e4Tz31VO/ExMTUs88+OxBX2UbvO/L8888P9fb2xpW1faE6oE3+MU3Oc71emLsct2tPShcb+C4mMAaALJ/EFuqcgE6PG2+8sSs6Vmj90pe+dGpwcHCyzmsu5XvW9yQAefuOXMz353yPWUzQW28s9Pxivedu27YtrjReVyqVCq9//es3xMuuvvrqda2traXt27e3bd68ubWzs7Np165dHSux8V544YXnL7300o9EV0+GmdD3TDTic/2kyjf+K9xKla8Mjdx8MNhZycWOOhf4xr10yqOjo18sl8tvXOrrHDt2bLi7u3v0e9/7Xl/cPuGpp57qe+WVV4bjEDcOc6Pbg+HsEHehkZxATp5j2blGqHlu7fWFnlPvpLTe9YWW+SAAIA8ns5UTyI0bNza/613v2hWdHO6MTgx37N+/f/vOnTu3RMcH885RcerUqZ6XX375TPR9f+zJJ5889uijjx7/8pe/fDr1vVvvcsr3JQA5+76s+s6c5/s0hHOHvfVu1w1uw8IBcLHO9fSkaMU6z619XGhqairddtttG5NweNOmTS2XXnpp+549ezq6urqao2OBddFjikvdaD/7sz/7sfvuu+9/hLnAN67yjQPfdJXv9PGADI3cfBjYWcnFjjqT+E4Hvt/+9rcPXXPNNV+t97ju7u7T0cncwDPPPNP77LPPDp84cWLyscce6zt58uTE448/PpA6WZuqczI3eR73TS6wbL4TxqWGwrWPrb1+rkrf+e5z8gpAXk5ep8dll13WHp2UvfaHf/iHb3rNa15zdXTCd8GT0kTHDaf/+q//+psPPvjgN/74j//45TA3SUvtqP3+BYDMf3fWWV7vst5zCosc9QLchR57rstQZ/lCj6m6b926daVbbrllw969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"; break;
		}
	}
	else if(model_tail == 3){
		img_src = "data:image/png;base64,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";
	}

	setHTML('Model_Graphic', '<img id="Model_Graphic_IMG" width="' + img_width + '" height="' + img_height + '" src="' + img_src + '" alt="" draggable="false" />');

	if(g_isZoomed){
		if(model_tail == 3){
			switch(sector){
				case "left": 	setCSS('Model_Graphic_IMG', 'margin', '-442px 0px 0px -120px');	break;
				case "right":	setCSS('Model_Graphic_IMG', 'margin', '-442px 0px 0px -602px');	break;
				case "bottom":	setCSS('Model_Graphic_IMG', 'margin', '-620px 0px 0px -362px');	break;
			}
		}
		else{
			if(model_type == "Plane"){
				switch(sector){
					case "left": 	setCSS('Model_Graphic_IMG', 'margin', '-271px 0px 0px -120px');	break;
					case "right":	setCSS('Model_Graphic_IMG', 'margin', '-271px 0px 0px -602px');	break;
					case "bottom":	if(model_tail == 2){
										setCSS('Model_Graphic_IMG', 'margin', '-590px 0px 0px -362px');
									}
									else{
										setCSS('Model_Graphic_IMG', 'margin', '-678px 0px 0px -362px');
									}
									break;
				}
			}
			else if(model_type == "Glider"){
				switch(sector){
					case "left": 	setCSS('Model_Graphic_IMG', 'margin', '-137px 0px 0px -120px');	break;
					case "right":	setCSS('Model_Graphic_IMG', 'margin', '-137px 0px 0px -602px');	break;
					case "bottom":	if(model_tail == 2){
										setCSS('Model_Graphic_IMG', 'margin', '-519px 0px 0px -362px');
									}
									else{
										setCSS('Model_Graphic_IMG', 'margin', '-607px 0px 0px -362px');
									}
									break;
				}
			}
		}
	}
	else{
		setCSS('Model_Graphic_IMG', 'margin', '0px 0px 0px 0px');
	}
}


function shiftWings(model_type, model_tail, sector, model_wings_Array){
	if(model_wings_Array != null){
		var model_wings = model_wings_Array.length;

		if(model_tail == 3){
			model_type = "Delta";
		}

		var isOdd = model_wings % 2;
		var margin_left = 0;

		var shown_wing_start  = 0,
			hidden_wing_start = 0;
		var shown_wing_end  = model_wings,
			hidden_wing_end = model_wings;

		if(g_isZoomed){
			if(sector == "left" || sector == "right"){
				showHTML('Model_Wings');
			}

			switch(model_type){
				case "Delta":	wing_width = 485; break;
				case "Glider":	wing_width = 456; break;
				case "Plane":	wing_width = 469; break;
			}

			if(isOdd == 0){
				var zoomed_element_width = Math.floor(wing_width / (model_wings / 2)) - 3;
			}
			else{
				var zoomed_element_width = Math.floor(((2 * wing_width) + 35) / model_wings) - 3;
			}

			if(model_type == "Plane" && isOdd != 0){
				zoomed_element_width = Math.floor(((2 * wing_width) + 36) / model_wings) - 3;
			}

			if(model_type == "Delta"){
				if(model_wings == 1){
					zoomed_element_width = 623;
				}
				else if(model_wings == 3){
					zoomed_element_width = 309;
				}
			}
			else if(model_type == "Glider"){
				if(model_wings == 1){
					zoomed_element_width = 565;
				}
				else if(model_wings == 3){
					zoomed_element_width = 269;
				}
			}
			else if(model_type == "Plane"){
				if(model_wings == 1){
					zoomed_element_width = 623;
				}
				else if(model_wings == 3){
					zoomed_element_width = 308;
				}
			}		

			if(sector == "left"){
				if(isOdd == 0){
					shown_wing_end = model_wings / 2;
				}
				else if(isOdd == 1){
					shown_wing_end = Math.floor(model_wings / 2) + 1;
				}

				shown_wing_start = 0;
				hidden_wing_start = shown_wing_end;
				hidden_wing_end = model_wings;
			}

			if(sector == "right"){
				if(isOdd == 0){
					shown_wing_start = model_wings / 2;
				}
				else if(isOdd == 1){
					shown_wing_start = Math.floor(model_wings / 2);
				}

				shown_wing_end = model_wings;
				hidden_wing_start = 0;
				hidden_wing_end = shown_wing_start;
			}

			for(var w = shown_wing_start; w < shown_wing_end; w++){
				setCSS('Surface_' + model_wings_Array[w].Index, 'font-size', '26px');
				setCSS('Surface_' + model_wings_Array[w].Index, 'height', '33px');
				setCSS('Surface_' + model_wings_Array[w].Index, 'line-height', '33px');

				switch(model_type){
					case "Delta":	setCSS('Surface_' + model_wings_Array[w].Index, 'margin-top',  '44px'); break;
					case "Glider":	setCSS('Surface_' + model_wings_Array[w].Index, 'margin-top', '112px'); break;
					case "Plane":	setCSS('Surface_' + model_wings_Array[w].Index, 'margin-top', '112px'); break;
				}

				setCSS('Surface_' + w, 'width', zoomed_element_width + 'px');

				if(w == shown_wing_start){
					if(model_type == "Delta"){
						if(sector == "left"){
							switch(model_wings){
								case 1: 	margin_left = 50;	break;
								case 2: 	margin_left = 53;	break;
								case 3: 	margin_left = 50;	break;
								case 4: 	margin_left = 53;	break;
								case 5: 	margin_left = 70;	break;
								case 6: 	margin_left = 53;	break;
								case 7: 	margin_left = 76;	break;
								case 8: 	margin_left = 52;	break;
								case 9:		margin_left = 76;	break;
								case 10:	margin_left = 50;	break;
							}
						}
						else if(sector == "right"){
							switch(model_wings){
								case 1: 	margin_left =   1;	break;
								case 2: 	margin_left = 139;	break;
								case 3: 	margin_left =   2;	break;
								case 4: 	margin_left = 139;	break;
								case 5: 	margin_left =   0;	break;
								case 6: 	margin_left = 139;	break;
								case 7: 	margin_left =  25;	break;
								case 8: 	margin_left = 138;	break;
								case 9:		margin_left =  42;	break;
								case 10:	margin_left = 138;	break;
							}
						}
					}
					else if(model_type == "Glider"){
						if(sector == "left"){
							switch(model_wings){
								case 1: 	margin_left = 107;	break;
								case 2: 	margin_left = 106;	break;
								case 3: 	margin_left = 130;	break;
								case 4: 	margin_left = 106;	break;
								case 5: 	margin_left = 104;	break;
								case 6: 	margin_left = 105;	break;
								case 7: 	margin_left = 103;	break;
								case 8: 	margin_left = 104;	break;
								case 9:		margin_left = 102;	break;
								case 10:	margin_left = 104;	break;
							}
						}
						else if(sector == "right"){
							switch(model_wings){
								case 1: 	margin_left =   0;	break;
								case 2: 	margin_left = 113;	break;
								case 3: 	margin_left =   0;	break;
								case 4: 	margin_left = 112;	break;
								case 5: 	margin_left =   2;	break;
								case 6: 	margin_left = 112;	break;
								case 7: 	margin_left =  29;	break;
								case 8: 	margin_left = 112;	break;
								case 9:		margin_left =  44;	break;
								case 10:	margin_left = 112;	break;
							}
						}
					}
					else if(model_type == "Plane"){
						if(sector == "left"){
							switch(model_wings){
								case 1: 	margin_left = 50;	break;
								case 2: 	margin_left = 62;	break;
								case 3: 	margin_left = 52;	break;
								case 4: 	margin_left = 62;	break;
								case 5: 	margin_left = 91;	break;
								case 6: 	margin_left = 62;	break;
								case 7: 	margin_left = 90;	break;
								case 8: 	margin_left = 61;	break;
								case 9:		margin_left = 89;	break;
								case 10:	margin_left = 62;	break;
							}
						}
						else if(sector == "right"){
							switch(model_wings){
								case 1: 	margin_left = 1;	break;
								case 2: 	margin_left = 146;	break;
								case 3: 	margin_left = 0;	break;
								case 4: 	margin_left = 146;	break;
								case 5: 	margin_left = 0;	break;
								case 6: 	margin_left = 145;	break;
								case 7: 	margin_left = 28;	break;
								case 8: 	margin_left = 145;	break;
								case 9:		margin_left = 44;	break;
								case 10:	margin_left = 146;	break;
							}
						}
					}

					setCSS('Surface_' + model_wings_Array[w].Index, 'marginLeft', margin_left + 'px');
				}
			}

			for(var w = hidden_wing_start; w < hidden_wing_end; w++){
				hideHTML('Surface_' + model_wings_Array[w].Index);
			}
		}
		else{
			switch(model_type){
				case "Delta":	wing_width = 230; break;
				case "Glider":	wing_width = 214; break;
				case "Plane":	wing_width = 220; break;
			}

			if(isOdd == 0){
				var zoomed_element_width = Math.floor(wing_width / (model_wings / 2)) - 3;
			}
			else{
				var zoomed_element_width = Math.floor(((2 * wing_width) + 35) / model_wings) - 3;
			}

			if(model_type == "Plane" && isOdd != 0){
				zoomed_element_width = Math.floor(((2 * wing_width) + 36) / model_wings) - 3;
			}

			for(var w = 0; w < model_wings; w++){
				showHTML('Surface_' + model_wings_Array[w].Index);
				setCSS('Surface_' + model_wings_Array[w].Index, 'font-size', '16px');
				setCSS('Surface_' + model_wings_Array[w].Index, 'height', '20px');
				setCSS('Surface_' + model_wings_Array[w].Index, 'line-height', '20px');

				switch(model_type){
					case "Delta":	setCSS('Surface_' + model_wings_Array[w].Index, 'margin-top', '229px'); break;
					case "Glider":	setCSS('Surface_' + model_wings_Array[w].Index, 'margin-top', '115px'); break;
					case "Plane":	setCSS('Surface_' + model_wings_Array[w].Index, 'margin-top', '179px'); break;
				}

				setCSS('Surface_' + model_wings_Array[w].Index, 'width', zoomed_element_width + 'px');

				if(w == shown_wing_start){
					if(model_type == "Delta"){
						switch(model_wings){
							case 1: 	margin_left = 89;	break;
							case 2: 	margin_left = 85;	break;
							case 3: 	margin_left = 88;	break;
							case 4: 	margin_left = 85;	break;
							case 5: 	margin_left = 86;	break;
							case 6: 	margin_left = 85;	break;
							case 7: 	margin_left = 88;	break;
							case 8: 	margin_left = 85;	break;
							case 9:		margin_left = 85;	break;
							case 10:	margin_left = 82;	break;
						}
					}
					else if(model_type == "Glider"){
						switch(model_wings){
							case 1: 	margin_left = 104;	break;
							case 2: 	margin_left = 108;	break;
							case 3: 	margin_left = 104;	break;
							case 4: 	margin_left = 108;	break;
							case 5: 	margin_left = 104;	break;
							case 6: 	margin_left = 108;	break;
							case 7: 	margin_left = 102;	break;
							case 8: 	margin_left = 108;	break;
							case 9:		margin_left = 102;	break;
							case 10:	margin_left = 108;	break;
						}
					}
					else if(model_type == "Plane"){
						switch(model_wings){
							case 1: 	margin_left = 98;	break;
							case 2: 	margin_left = 90;	break;
							case 3: 	margin_left = 98;	break;
							case 4: 	margin_left = 90;	break;
							case 5: 	margin_left = 98;	break;
							case 6: 	margin_left = 90;	break;
							case 7: 	margin_left = 98;	break;
							case 8: 	margin_left = 90;	break;
							case 9:		margin_left = 98;	break;
							case 10:	margin_left = 90;	break;
						}
					}

					setCSS('Surface_' + model_wings_Array[w].Index, 'marginLeft', margin_left + 'px');
				}
				else if(w == Math.floor(model_wings / 2)){
					if(model_type == "Delta"){
						switch(model_wings){
							case 1: 	margin_left = 0;	break;
							case 2: 	margin_left = 43;	break;
							case 3: 	margin_left = 2;	break;
							case 4: 	margin_left = 41;	break;
							case 5: 	margin_left = 2;	break;
							case 6: 	margin_left = 43;	break;
							case 7: 	margin_left = 2;	break;
							case 8: 	margin_left = 41;	break;
							case 9:		margin_left = 2;	break;
							case 10:	margin_left = 41;	break;
						}
					}
					else if(model_type == "Glider"){
						switch(model_wings){
							case 1: 	margin_left = 0;	break;
							case 2: 	margin_left = 28;	break;
							case 3: 	margin_left = 2;	break;
							case 4: 	margin_left = 26;	break;
							case 5: 	margin_left = 2;	break;
							case 6: 	margin_left = 26;	break;
							case 7: 	margin_left = 2;	break;
							case 8: 	margin_left = 26;	break;
							case 9:		margin_left = 2;	break;
							case 10:	margin_left = 28;	break;
						}
					}
					else if(model_type == "Plane"){
						switch(model_wings){
							case 1: 	margin_left = 0;	break;
							case 2: 	margin_left = 53;	break;
							case 3: 	margin_left = 2;	break;
							case 4: 	margin_left = 51;	break;
							case 5: 	margin_left = 2;	break;
							case 6: 	margin_left = 49;	break;
							case 7: 	margin_left = 2;	break;
							case 8: 	margin_left = 47;	break;
							case 9:		margin_left = 2;	break;
							case 10:	margin_left = 45;	break;
						}
					}

					setCSS('Surface_' + model_wings_Array[w].Index, 'marginLeft', margin_left + 'px');
				}
			}
		}
	}
}


function shiftElevators(model_type, model_tail, sector, model_elevator_Array){
	if(model_elevator_Array != null){
		var model_elevator = model_elevator_Array.length;

		if(g_isZoomed){		
			if(model_tail != 3 && sector == "bottom"){
				showHTML('Model_Elevator');
			}

			if(model_type == "Glider"){
				if(model_tail == 1){
					for(var e = 0; e < model_elevator; e++){				
						setCSS('Surface_' + model_elevator_Array[e].Index, 'font-size', '26px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'height', '40px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'line-height', '40px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-top', '36px');

						if(model_elevator > 1){
							if(e == 0){
								setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '219px');
							}
							else{
								setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '377px');
							}

							setCSS('Surface_' + model_elevator_Array[e].Index, 'width', '76px');
						}
						else if(model_elevator > 0){
							setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '214px');
							setCSS('Surface_' + model_elevator_Array[e].Index, 'width', '242px');
						}
					}
				}
				else if(model_tail == 2){
					for(var e = 0; e < model_elevator; e++){
						setCSS('Surface_' + model_elevator_Array[e].Index, 'background-size', '108px 52px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'font-size', '26px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'height', '52px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'line-height', '52px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-top', '95px');

						if(e == 0){
							setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '207px');
						}
						else{
							setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '358px');
						}

						setCSS('Surface_' + model_elevator_Array[e].Index, 'width', '108px');
					}
				}
			}
			else if(model_type == "Plane"){
				if(model_tail == 1){
					for(var e = 0; e < model_elevator; e++){
						setCSS('Surface_' + model_elevator_Array[e].Index, 'font-size', '26px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'height', '40px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'line-height', '40px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-top', '37px');

						if(model_elevator > 1){
							if(e == 0){
								setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '161px');
							}
							else{
								setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '380px');
							}

							setCSS('Surface_' + model_elevator_Array[e].Index, 'width', '131px');
						}
						else if(model_elevator > 0){
							setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '214px');
							setCSS('Surface_' + model_elevator_Array[e].Index, 'width', '242px');
						}
					}
				}
				else if(model_tail == 2){
					for(var e = 0; e < model_elevator; e++){
						setCSS('Surface_' + model_elevator_Array[e].Index, 'background-size', '108px 52px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'font-size', '26px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'height', '52px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'line-height', '52px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-top', '95px');

						if(e == 0){
							setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '202px');
						}
						else{
							setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '365px');
						}

						setCSS('Surface_' + model_elevator_Array[e].Index, 'width', '108px');
					}
				}
			}
		}
		else{
			if(model_type == "Glider"){
				if(model_tail == 1){
					for(var e = 0; e < model_elevator; e++){				
						setCSS('Surface_' + model_elevator_Array[e].Index, 'font-size', '16px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'height', '20px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'line-height', '20px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-top', '308px');

						if(model_elevator > 1){
							if(e == 0){
								setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '264px');
							}
							else{
								setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '355px');
							}

							setCSS('Surface_' + model_elevator_Array[e].Index, 'width', '50px');
						}
						else if(model_elevator > 0){
							setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '276px');
							setCSS('Surface_' + model_elevator_Array[e].Index, 'width', '116px');
						}
					}
				}
				else if(model_tail == 2){
					for(var e = 0; e < model_elevator; e++){
						setCSS('Surface_' + model_elevator_Array[e].Index, 'background-size', '52px 25px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'font-size', '16px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'height', '25px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'line-height', '25px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-top', '295px');

						if(e == 0){
							setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '274px');
						}
						else{
							setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '345px');
						}

						setCSS('Surface_' + model_elevator_Array[e].Index, 'width', '52px');
					}
				}
			}
			else if(model_type == "Plane"){
				if(model_tail == 1){
					for(var e = 0; e < model_elevator; e++){				
						setCSS('Surface_' + model_elevator_Array[e].Index, 'font-size', '16px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'height', '20px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'line-height', '20px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-top', '342px');

						if(model_elevator > 1){
							if(e == 0){
								setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '248px');
							}
							else{
								setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '358px');
							}

							setCSS('Surface_' + model_elevator_Array[e].Index, 'width', '63px');
						}
						else if(model_elevator > 0){
							setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '276px');
							setCSS('Surface_' + model_elevator_Array[e].Index, 'width', '116px');
						}
					}
				}
				else if(model_tail == 2){
					for(var e = 0; e < model_elevator; e++){
						setCSS('Surface_' + model_elevator_Array[e].Index, 'background-size', '52px 25px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'font-size', '16px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'height', '25px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'line-height', '25px');
						setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-top', '329px');

						if(e == 0){
							setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '270px');
						}
						else{
							setCSS('Surface_' + model_elevator_Array[e].Index, 'margin-left', '349px');
						}

						setCSS('Surface_' + model_elevator_Array[e].Index, 'width', '52px');
					}
				}
			}
		}
	}
}


function shiftRudders(model_type, model_tail, sector, model_rudder_Array){
	if(model_rudder_Array != null){
		var model_rudder = model_rudder_Array.length;

		if(model_tail == 3){
			model_type = "Delta";
		}

		if(g_isZoomed){		
			if(model_type == "Delta" || sector == "bottom"){
				showHTML('Model_Rudder');
			}

			if(model_type == "Delta"){
				for(var r = 0; r < model_rudder; r++){
					setCSS('R' + (r + 1) + '_IMG', 'background-size', '20px 90px');
					setCSS('R' + (r + 1) + '_IMG', 'height', '90px');
					setCSS('R' + (r + 1) + '_IMG', 'width', '20px');
					setCSS('R' + (r + 1) + '_Box', 'background-size', '115px 50px');
					setCSS('R' + (r + 1) + '_Box', 'height', '50px');
					setCSS('R' + (r + 1) + '_Box', 'width', '115px');

					setCSS('Surface_' + model_rudder_Array[r].Index, 'font-size', '26px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'height', '50px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'line-height', '50px');

					if(model_rudder > 1 && model_rudder == (r + 1)){
						setCSS('Surface_' + model_rudder_Array[r].Index, 'margin-left', '4px');
					}
					else{
						setCSS('Surface_' + model_rudder_Array[r].Index, 'margin-left', '34px');
					}

					setCSS('Surface_' + model_rudder_Array[r].Index, 'width', '76px');
				}

				if(sector == "left"){
					if(model_rudder == 3){
						hideHTML('R2_Box');
						hideHTML('R3_IMG');
						hideHTML('R3_Box');

						setCSS('R1_IMG', 'margin-top',   '77px');
						setCSS('R1_IMG', 'margin-left',  '48px');
						setCSS('R2_IMG', 'margin-top',  '255px');
						setCSS('R2_IMG', 'margin-left', '569px');

						setCSS('R1_Box', 'margin-top',   '94px');
						setCSS('R1_Box', 'margin-left',  '68px');
					}
					else if(model_rudder == 2){
						hideHTML('R2_IMG');
						hideHTML('R2_Box');

						setCSS('R1_IMG', 'margin-top',   '77px');
						setCSS('R1_IMG', 'margin-left',  '48px');

						setCSS('R1_Box', 'margin-top',   '94px');
						setCSS('R1_Box', 'margin-left',  '68px');
					}
					else if(model_rudder == 1){
						hideHTML('R1_Box');

						setCSS('R1_IMG', 'margin-top',  '255px');
						setCSS('R1_IMG', 'margin-left', '569px');
					}
				}
				else if(sector == "right"){
					if(model_rudder == 3){
						hideHTML('R1_IMG');
						hideHTML('R1_Box');
						hideHTML('R2_Box');

						setCSS('R2_IMG', 'margin-top',  '255px');
						setCSS('R2_IMG', 'margin-left',  '87px');
						setCSS('R3_IMG', 'margin-top',   '77px');
						setCSS('R3_IMG', 'margin-left', '608px');

						setCSS('R3_Box', 'margin-top',   '94px');
						setCSS('R3_Box', 'margin-left', '494px');
					}
					else if(model_rudder == 2){
						hideHTML('R1_IMG');
						hideHTML('R1_Box');

						setCSS('R2_IMG', 'margin-top',   '77px');
						setCSS('R2_IMG', 'margin-left', '608px');

						setCSS('R2_Box', 'margin-top',   '94px');
						setCSS('R2_Box', 'margin-left', '494px');
					}
					else if(model_rudder == 1){
						hideHTML('R1_Box');

						setCSS('R1_IMG', 'margin-top',  '255px');
						setCSS('R1_IMG', 'margin-left',  '87px');
					}
				}
				else if(sector == "bottom"){
					if(model_rudder == 3){
						hideHTML('R1_IMG');
						hideHTML('R1_Box');
						hideHTML('R3_IMG');
						hideHTML('R3_Box');

						setCSS('R2_IMG', 'margin-top',   '77px');
						setCSS('R2_IMG', 'margin-left', '327px');

						setCSS('R2_Box', 'margin-top',   '97px');
						setCSS('R2_Box', 'margin-left', '347px');
					}
					else if(model_rudder == 2){
						hideHTML('R1_IMG');
						hideHTML('R1_Box');
						hideHTML('R2_IMG');
						hideHTML('R2_Box');
					}
					else if(model_rudder == 1){
						setCSS('R1_IMG', 'margin-top',   '77px');
						setCSS('R1_IMG', 'margin-left', '327px');

						setCSS('R1_Box', 'margin-top',   '97px');
						setCSS('R1_Box', 'margin-left', '347px');
					}
				}
			}
			else if(model_type == "Glider" && sector == "bottom"){
				for(var r = 0; r < model_rudder; r++){
					setCSS('R' + (r + 1) + '_IMG', 'background-size', '21px 90px');
					setCSS('R' + (r + 1) + '_IMG', 'height', '90px');
					setCSS('R' + (r + 1) + '_IMG', 'width', '21px');
					setCSS('R' + (r + 1) + '_Box', 'background-size', '115px 50px');
					setCSS('R' + (r + 1) + '_Box', 'height', '50px');
					setCSS('R' + (r + 1) + '_Box', 'width', '115px');

					setCSS('Surface_' + model_rudder_Array[r].Index, 'font-size', '26px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'height', '50px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'line-height', '50px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'margin-left', '34px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'width', '76px');
				}

				if(model_rudder == 3){
					setCSS('R1_IMG', 'margin-top',   '76px');
					setCSS('R1_IMG', 'margin-left', '158px');
					setCSS('R2_IMG', 'margin-top',   '46px');
					setCSS('R2_IMG', 'margin-left', '325px');
					setCSS('R3_IMG', 'margin-top',   '76px');
					setCSS('R3_IMG', 'margin-left', '496px');

					setCSS('R1_Box', 'margin-top',   '96px');
					setCSS('R1_Box', 'margin-left', '177px');
					setCSS('R2_Box', 'margin-top',   '96px');
					setCSS('R2_Box', 'margin-left', '342px');
					setCSS('R3_Box', 'margin-top',   '96px');
					setCSS('R3_Box', 'margin-left', '515px');
				}
				else if(model_rudder == 2){
					setCSS('R1_IMG', 'margin-top',   '76px');
					setCSS('R1_IMG', 'margin-left', '158px');
					setCSS('R2_IMG', 'margin-top',   '76px');
					setCSS('R2_IMG', 'margin-left', '496px');

					setCSS('R1_Box', 'margin-top',   '96px');
					setCSS('R1_Box', 'margin-left', '177px');
					setCSS('R2_Box', 'margin-top',   '96px');
					setCSS('R2_Box', 'margin-left', '515px');
				}
				else if(model_rudder == 1){
					setCSS('R1_IMG', 'margin-top',   '46px');
					setCSS('R1_IMG', 'margin-left', '325px');
					setCSS('R1_Box', 'margin-top',   '96px');
					setCSS('R1_Box', 'margin-left', '342px');
				}
			}
			else if(model_type == "Plane"){
				for(var r = 0; r < model_rudder; r++){
					setCSS('R' + (r + 1) + '_IMG', 'background-size', '27px 90px');
					setCSS('R' + (r + 1) + '_IMG', 'height', '90px');
					setCSS('R' + (r + 1) + '_IMG', 'width', '27px');
					setCSS('R' + (r + 1) + '_Box', 'background-size', '115px 50px');
					setCSS('R' + (r + 1) + '_Box', 'height', '50px');
					setCSS('R' + (r + 1) + '_Box', 'width', '115px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'font-size', '26px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'height', '50px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'line-height', '50px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'margin-left', '34px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'width', '76px');
				}

				if(model_rudder == 3){
					setCSS('R1_IMG', 'margin-top',   '77px');
					setCSS('R1_IMG', 'margin-left', '138px');
					setCSS('R2_IMG', 'margin-top',   '48px');
					setCSS('R2_IMG', 'margin-left', '323px');
					setCSS('R3_IMG', 'margin-top',   '77px');
					setCSS('R3_IMG', 'margin-left', '509px');

					setCSS('R1_Box', 'margin-top',   '97px');
					setCSS('R1_Box', 'margin-left', '163px');
					setCSS('R2_Box', 'margin-top',   '97px');
					setCSS('R2_Box', 'margin-left', '346px');
					setCSS('R3_Box', 'margin-top',   '97px');
					setCSS('R3_Box', 'margin-left', '535px');
				}
				else if(model_rudder == 2){
					setCSS('R1_IMG', 'margin-top',   '77px');
					setCSS('R1_IMG', 'margin-left', '138px');
					setCSS('R2_IMG', 'margin-top',   '77px');
					setCSS('R2_IMG', 'margin-left', '509px');

					setCSS('R1_Box', 'margin-top',   '97px');
					setCSS('R1_Box', 'margin-left', '163px');
					setCSS('R2_Box', 'margin-top',   '97px');
					setCSS('R2_Box', 'margin-left', '535px');
				}
				else if(model_rudder == 1){
					setCSS('R1_IMG', 'margin-top',   '48px');
					setCSS('R1_IMG', 'margin-left', '323px');

					setCSS('R1_Box', 'margin-top',   '97px');
					setCSS('R1_Box', 'margin-left', '346px');
				}
			}
		}
		else{		
			if(model_type == "Delta"){
				for(var r = 0; r < model_rudder; r++){
					setCSS('R' + (r + 1) + '_IMG', 'background-size', '9px 43px');
					setCSS('R' + (r + 1) + '_IMG', 'height', '43px');
					setCSS('R' + (r + 1) + '_IMG', 'width', '9px');
					setCSS('R' + (r + 1) + '_Box', 'background-size', '55px 24px');
					setCSS('R' + (r + 1) + '_Box', 'height', '24px');
					setCSS('R' + (r + 1) + '_Box', 'width', '55px');

					setCSS('Surface_' + model_rudder_Array[r].Index, 'font-size', '16px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'height', '24px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'line-height', '24px');

					if(model_rudder > 1 && model_rudder == (r + 1)){
						setCSS('Surface_' + model_rudder_Array[r].Index, 'margin-left', '2px');
					}
					else{
						setCSS('Surface_' + model_rudder_Array[r].Index, 'margin-left', '16px');
					}

					setCSS('Surface_' + model_rudder_Array[r].Index, 'width', '37px');

					showHTML('R' + (r + 1) + '_IMG');
					showHTML('R' + (r + 1) + '_Box');
				}
				
				if(model_rudder == 3){
					setCSS('R1_IMG', 'margin-top',  '250px');
					setCSS('R1_IMG', 'margin-left', '80px');
					setCSS('R2_IMG', 'margin-top',  '335px');
					setCSS('R2_IMG', 'margin-left', '331px');
					setCSS('R3_IMG', 'margin-top',  '250px');
					setCSS('R3_IMG', 'margin-left', '582px');

					setCSS('R1_Box', 'margin-top',  '260px');
					setCSS('R1_Box', 'margin-left', '90px');
					setCSS('R2_Box', 'margin-top',  '345px');
					setCSS('R2_Box', 'margin-left', '341px');
					setCSS('R3_Box', 'margin-top',  '260px');
					setCSS('R3_Box', 'margin-left', '526px');
				}
				else if(model_rudder == 2){
					setCSS('R1_IMG', 'margin-top',  '250px');
					setCSS('R1_IMG', 'margin-left', '80px');
					setCSS('R2_IMG', 'margin-top',  '250px');
					setCSS('R2_IMG', 'margin-left', '582px');

					setCSS('R1_Box', 'margin-top',  '260px');
					setCSS('R1_Box', 'margin-left', '90px');
					setCSS('R2_Box', 'margin-top',  '260px');
					setCSS('R2_Box', 'margin-left', '526px');
				}
				else if(model_rudder == 1){
					setCSS('R1_IMG', 'margin-top',  '335px');
					setCSS('R1_IMG', 'margin-left', '331px');

					setCSS('R1_Box', 'margin-top',  '345px');
					setCSS('R1_Box', 'margin-left', '341px');
				}
	
			}
			else if(model_type == "Glider"){
				for(var r = 0; r < model_rudder; r++){
					setCSS('R' + (r + 1) + '_IMG', 'background-size', '10px 43px');
					setCSS('R' + (r + 1) + '_IMG', 'height', '43px');
					setCSS('R' + (r + 1) + '_IMG', 'width', '10px');
					setCSS('R' + (r + 1) + '_Box', 'background-size', '55px 24px');
					setCSS('R' + (r + 1) + '_Box', 'height', '24px');
					setCSS('R' + (r + 1) + '_Box', 'width', '55px');

					setCSS('Surface_' + model_rudder_Array[r].Index, 'font-size', '16px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'height', '24px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'line-height', '24px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'margin-left', '16px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'width', '37px');
				}

				if(model_rudder == 3){
					setCSS('R1_IMG', 'margin-top',  '329px');
					setCSS('R1_IMG', 'margin-left', '249px');
					setCSS('R2_IMG', 'margin-top',  '314px');
					setCSS('R2_IMG', 'margin-left', '330px');
					setCSS('R3_IMG', 'margin-top',  '329px');
					setCSS('R3_IMG', 'margin-left', '412px');

					setCSS('R1_Box', 'margin-top',  '340px');
					setCSS('R1_Box', 'margin-left', '260px');
					setCSS('R2_Box', 'margin-top',  '340px');
					setCSS('R2_Box', 'margin-left', '341px');
					setCSS('R3_Box', 'margin-top',  '340px');
					setCSS('R3_Box', 'margin-left', '423px');
				}
				else if(model_rudder == 2){
					setCSS('R1_IMG', 'margin-top',  '329px');
					setCSS('R1_IMG', 'margin-left', '249px');
					setCSS('R2_IMG', 'margin-top',  '329px');
					setCSS('R2_IMG', 'margin-left', '412px');

					setCSS('R1_Box', 'margin-top',  '340px');
					setCSS('R1_Box', 'margin-left', '2603px');
					setCSS('R2_Box', 'margin-top',  '340px');
					setCSS('R2_Box', 'margin-left', '423px');
				}
				else if(model_rudder == 1){
					setCSS('R1_IMG', 'margin-top',  '314px');
					setCSS('R1_IMG', 'margin-left', '330px');

					setCSS('R1_Box', 'margin-top',  '340px');
					setCSS('R1_Box', 'margin-left', '341px');
				}
			}
			else if(model_type == "Plane"){
				for(var r = 0; r < model_rudder; r++){
					setCSS('R' + (r + 1) + '_IMG', 'background-size', '13px 43px');
					setCSS('R' + (r + 1) + '_IMG', 'height', '43px');
					setCSS('R' + (r + 1) + '_IMG', 'width', '13px');
					setCSS('R' + (r + 1) + '_Box', 'background-size', '55px 24px');
					setCSS('R' + (r + 1) + '_Box', 'height', '24px');
					setCSS('R' + (r + 1) + '_Box', 'width', '55px');

					setCSS('Surface_' + model_rudder_Array[r].Index, 'font-size', '16px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'height', '24px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'line-height', '24px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'margin-left', '16px');
					setCSS('Surface_' + model_rudder_Array[r].Index, 'width', '37px');
				}

				if(model_rudder == 3){
					setCSS('R1_IMG', 'margin-top',  '363px');
					setCSS('R1_IMG', 'margin-left', '240px');
					setCSS('R2_IMG', 'margin-top',  '349px');
					setCSS('R2_IMG', 'margin-left', '329px');
					setCSS('R3_IMG', 'margin-top',  '363px');
					setCSS('R3_IMG', 'margin-left', '418px');

					setCSS('R1_Box', 'margin-top',  '376px');
					setCSS('R1_Box', 'margin-left', '253px');
					setCSS('R2_Box', 'margin-top',  '376px');
					setCSS('R2_Box', 'margin-left', '341px');
					setCSS('R3_Box', 'margin-top',  '376px');
					setCSS('R3_Box', 'margin-left', '431px');
				}
				else if(model_rudder == 2){
					setCSS('R1_IMG', 'margin-top',  '363px');
					setCSS('R1_IMG', 'margin-left', '240px');
					setCSS('R2_IMG', 'margin-top',  '363px');
					setCSS('R2_IMG', 'margin-left', '418px');

					setCSS('R1_Box', 'margin-top',  '376px');
					setCSS('R1_Box', 'margin-left', '253px');
					setCSS('R2_Box', 'margin-top',  '376px');
					setCSS('R2_Box', 'margin-left', '431px');
				}
				else if(model_rudder == 1){
					setCSS('R1_IMG', 'margin-top',  '349px');
					setCSS('R1_IMG', 'margin-left', '329px');

					setCSS('R1_Box', 'margin-top',  '376px');
					setCSS('R1_Box', 'margin-left', '341px');
				}
			}
		}
	}
}


function setModelWings(model_type, model_tail, model_wings_Array){
	var model_wings = 0;

	if(model_wings_Array != null){
		model_wings = model_wings_Array.length;
	}

	var isOdd = model_wings % 2;
	var goTo = "left";

	var WingsHTML = getHTML('Flap_Container');

	var buffer_lw = 0;

	WingsHTML += '<div id="Model_Wings">';

	if(model_tail == 3){
		var wing_width = 230;

		if(isOdd == 0){									
			element_width = Math.floor(wing_width / (model_wings / 2)) - 3;

			for(var lw = 0; lw < (model_wings / 2); lw++){
				if(lw == 0){
					if(model_wings == 10){
						WingsHTML += '<div id="Surface_' + model_wings_Array[lw].Index + '" class="wing_flaps left_delta" style="margin-left: 82px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[lw].Index + '", ' +  model_wings_Array[lw].Index + ', "' + goTo + '");\'>' + model_wings_Array[lw].Servos + '</div>';
					}
					else{
						WingsHTML += '<div id="Surface_' + model_wings_Array[lw].Index + '" class="wing_flaps left_delta" style="margin-left: 85px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[lw].Index + '", ' +  model_wings_Array[lw].Index + ', "' + goTo + '");\'>' + model_wings_Array[lw].Servos + '</div>';
					}
				}
				else{
					if((model_wings / 2) > 1){
						WingsHTML += '<div id="Surface_' + model_wings_Array[lw].Index + '" class="wing_flaps left_delta" style="margin-left: 2px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[lw].Index + '", ' +  model_wings_Array[lw].Index + ', "' + goTo + '");\'>' + model_wings_Array[lw].Servos + '</div>';
					}
					else{
						WingsHTML += '<div id="Surface_' + model_wings_Array[lw].Index + '" class="wing_flaps left_delta" style="width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[lw].Index + '", ' +  model_wings_Array[lw].Index + ', "' + goTo + '");\'>' + model_wings_Array[lw].Servos + '</div>';
					}
				}

				buffer_lw = lw;
			}

			buffer_lw++;
			goTo = "right";

			for(var rw = buffer_lw; rw < model_wings; rw++){
				if(rw == buffer_lw){
					var offset_right = 43 - (((model_wings - 2) / 2) * 2);

					if(model_wings == 6 || model_wings == 8){
						offset_right += 4;
					}
					else if(model_wings == 10){
						offset_right += 6;
					}

					WingsHTML += '<div id="Surface_' + model_wings_Array[rw].Index + '" class="wing_flaps right_delta" style="margin-left: ' + offset_right + 'px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[rw].Index + '", ' +  model_wings_Array[rw].Index + ', "' + goTo + '");\'>' + model_wings_Array[rw].Servos + '</div>';
				}
				else{
					if((model_wings / 2) > 1){
						WingsHTML += '<div id="Surface_' + model_wings_Array[rw].Index + '" class="wing_flaps right_delta" style="margin-left: 2px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[rw].Index + '", ' +  model_wings_Array[rw].Index + ', "' + goTo + '");\'>' + model_wings_Array[rw].Servos + '</div>';
					}
					else{
						WingsHTML += '<div id="Surface_' + model_wings_Array[rw].Index + '" class="wing_flaps right_delta" style="width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[rw].Index + '", ' +  model_wings_Array[rw].Index + ', "' + goTo + '");\'>' + model_wings_Array[rw].Servos + '</div>';
					}
				}
			}
		}
		else{											
			element_width = Math.floor(((2 * wing_width) + 36) / model_wings) - 3;

			for(var w = 0; w < model_wings; w++){
				if(w > Math.floor(model_wings / 2)){
					goTo = "right";
				}

				if(w == 0){
					if(model_wings == 5){
						WingsHTML += '<div id="Surface_' + model_wings_Array[w].Index + '" class="wing_flaps left_delta" style="margin-left: 86px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[w].Index + '", ' +  model_wings_Array[w].Index + ', "' + goTo + '");\'>' + model_wings_Array[w].Servos + '</div>';
					}
					else if(model_wings == 9){
						WingsHTML += '<div id="Surface_' + model_wings_Array[w].Index + '" class="wing_flaps left_delta" style="margin-left: 85px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[w].Index + '", ' +  model_wings_Array[w].Index + ', "' + goTo + '");\'>' + model_wings_Array[w].Servos + '</div>';
					}
					else{
						WingsHTML += '<div id="Surface_' + model_wings_Array[w].Index + '" class="wing_flaps left_delta" style="margin-left: 88px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[w].Index + '", ' +  model_wings_Array[w].Index + ', "' + goTo + '");\'>' + model_wings_Array[w].Servos + '</div>';
					}
				}
				else{
					WingsHTML += '<div id="Surface_' + model_wings_Array[w].Index + '" class="wing_flaps left_delta" style="margin-left: 2px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[w].Index + '", ' +  model_wings_Array[w].Index + ', "' + goTo + '");\'>' + model_wings_Array[w].Servos + '</div>';
				}
			}
		}
	}
	else{
		if(model_type == "Plane"){
			var wing_width = 220;

			if(isOdd == 0){
				element_width = Math.floor(wing_width / (model_wings / 2)) - 3;

				for(var lw = 0; lw < (model_wings / 2); lw++){
					if(lw == 0){
						WingsHTML += '<div id="Surface_' + model_wings_Array[lw].Index + '" class="wing_flaps left_plane" style="margin-left: 90px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[lw].Index + '", ' +  model_wings_Array[lw].Index + ', "' + goTo + '");\'>' + model_wings_Array[lw].Servos + '</div>';
					}
					else{
						if((model_wings / 2) > 1){
							WingsHTML += '<div id="Surface_' + model_wings_Array[lw].Index + '" class="wing_flaps left_plane" style="margin-left: 2px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[lw].Index + '", ' +  model_wings_Array[lw].Index + ', "' + goTo + '");\'>' + model_wings_Array[lw].Servos + '</div>';
						}
						else{
							WingsHTML += '<div id="Surface_' + model_wings_Array[lw].Index + '" class="wing_flaps left_plane" style="width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[lw].Index + '", ' +  model_wings_Array[lw].Index + ', "' + goTo + '");\'>' + model_wings_Array[lw].Servos + '</div>';
						}
					}

					buffer_lw = lw;
				}

				buffer_lw++;
				goTo = "right";

				for(var rw = buffer_lw; rw < model_wings; rw++){
					if(rw == buffer_lw){
						var offset_right = 53 - (((model_wings - 2) / 2) * 2);
						WingsHTML += '<div id="Surface_' + model_wings_Array[rw].Index + '" class="wing_flaps right_plane" style="margin-left: ' + offset_right + 'px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[rw].Index + '", ' +  model_wings_Array[rw].Index + ', "' + goTo + '");\'>' + model_wings_Array[rw].Servos + '</div>';
					}
					else{
						if((model_wings / 2) > 1){
							WingsHTML += '<div id="Surface_' + model_wings_Array[rw].Index + '" class="wing_flaps right_plane" style="margin-left: 2px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[rw].Index + '", ' +  model_wings_Array[rw].Index + ', "' + goTo + '");\'>' + model_wings_Array[rw].Servos + '</div>';
						}
						else{
							WingsHTML += '<div id="Surface_' + model_wings_Array[rw].Index + '" class="wing_flaps right_plane" style="width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[rw].Index + '", ' +  model_wings_Array[rw].Index + ', "' + goTo + '");\'>' + model_wings_Array[rw].Servos + '</div>';
						}
					}
				}
			}
			else{
				element_width = Math.floor(((2 * wing_width) + 36) / model_wings) - 3;

				for(var w = 0; w < model_wings; w++){
					if(w > Math.floor(model_wings / 2)){
						goTo = "right";
					}

					if(w == 0){
						WingsHTML += '<div id="Surface_' + model_wings_Array[w].Index + '" class="wing_flaps left_plane" style="margin-left: 98px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[w].Index + '", ' +  model_wings_Array[w].Index + ', "' + goTo + '");\'>' + model_wings_Array[w].Servos + '</div>';
					}
					else{
						WingsHTML += '<div id="Surface_' + model_wings_Array[w].Index + '" class="wing_flaps left_plane" style="margin-left: 2px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[w].Index + '", ' +  model_wings_Array[w].Index + ', "' + goTo + '");\'>' + model_wings_Array[w].Servos + '</div>';
					}
				}
			}
		}
		else if(model_type == "Glider"){
			var wing_width = 214;

			if(isOdd == 0){
				element_width = Math.floor(wing_width / (model_wings / 2)) - 3;

				for(var lw = 0; lw < (model_wings / 2); lw++){
					if(lw == 0){
						WingsHTML += '<div id="Surface_' + model_wings_Array[lw].Index + '" class="wing_flaps left_glider" style="margin-left: 108px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[lw].Index + '", ' +  model_wings_Array[lw].Index + ', "' + goTo + '");\'>' + model_wings_Array[lw].Servos + '</div>';
					}
					else{
						if((model_wings / 2) > 1){
							WingsHTML += '<div id="Surface_' + model_wings_Array[lw].Index + '" class="wing_flaps left_glider" style="margin-left: 2px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[lw].Index + '", ' +  model_wings_Array[lw].Index + ', "' + goTo + '");\'>' + model_wings_Array[lw].Servos + '</div>';
						}
						else{
							WingsHTML += '<div id="Surface_' + model_wings_Array[lw].Index + '" class="wing_flaps left_glider" style="width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[lw].Index + '", ' +  model_wings_Array[lw].Index + ', "' + goTo + '");\'>' + model_wings_Array[lw].Servos + '</div>';
						}
					}

					buffer_lw = lw;
				}

				buffer_lw++;
				goTo = "right";

				for(var rw = buffer_lw; rw < model_wings; rw++){
					if(rw == buffer_lw){
						var offset_right = 28 - (((model_wings - 2) / 2) * 2);

						if(model_wings == 6){
							offset_right += 2;
						}
						else if(model_wings == 8){
							offset_right += 4;
						}
						else if(model_wings == 10){
							offset_right += 8;
						}

						WingsHTML += '<div id="Surface_' + model_wings_Array[rw].Index + '" class="wing_flaps right_glider" style="margin-left: ' + offset_right + 'px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[rw].Index + '", ' +  model_wings_Array[rw].Index + ', "' + goTo + '");\'>' + model_wings_Array[rw].Servos + '</div>';
					}
					else{
						if((model_wings / 2) > 1){
							WingsHTML += '<div id="Surface_' + model_wings_Array[rw].Index + '" class="wing_flaps right_glider" style="margin-left: 2px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[rw].Index + '", ' +  model_wings_Array[rw].Index + ', "' + goTo + '");\'>' + model_wings_Array[rw].Servos + '</div>';
						}
						else{
							WingsHTML += '<div id="Surface_' + model_wings_Array[rw].Index + '" class="wing_flaps right_glider" style="width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[rw].Index + '", ' +  model_wings_Array[rw].Index + ', "' + goTo + '");\'>' + model_wings_Array[rw].Servos + '</div>';
						}
					}
				}
			}
			else{
				element_width = Math.floor(((2 * wing_width) + 35) / model_wings) - 3;

				for(var w = 0; w < model_wings; w++){
					if(w > Math.floor(model_wings / 2)){
						goTo = "right";
					}

					if(w == 0){
						if(model_wings == 7 || model_wings == 9){
							WingsHTML += '<div id="Surface_' + model_wings_Array[w].Index + '" class="wing_flaps left_glider" style="margin-left: 102px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[w].Index + '", ' +  model_wings_Array[w].Index + ', "' + goTo + '");\'>' + model_wings_Array[w].Servos + '</div>';
						}
						else{
							WingsHTML += '<div id="Surface_' + model_wings_Array[w].Index + '" class="wing_flaps left_glider" style="margin-left: 104px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[w].Index + '", ' +  model_wings_Array[w].Index + ', "' + goTo + '");\'>' + model_wings_Array[w].Servos + '</div>';
						}
					}
					else{
						WingsHTML += '<div id="Surface_' + model_wings_Array[w].Index + '" class="wing_flaps left_glider" style="margin-left: 2px; width: ' + element_width + 'px;" onClick=\'showServoList("Surface_' + model_wings_Array[w].Index + '", ' +  model_wings_Array[w].Index + ', "' + goTo + '");\'>' + model_wings_Array[w].Servos + '</div>';
					}
				}
			}
		}
	}

	WingsHTML += '</div>';

	setHTML('Flap_Container', WingsHTML);
}


function setModelElevator(model_type, model_tail, model_elevator_Array){
	var model_elevator = 0;

	if(model_elevator_Array != null){
		model_elevator = model_elevator_Array.length;
	}

	var goTo = "bottom";

	if(model_tail != 3){
		var low_model_type = model_type.toLowerCase();
		var WingsHTML = getHTML('Flap_Container');

		WingsHTML += '<div id="Model_Elevator">';

		if(model_tail == 1){			
			switch(model_elevator){
				case 1:	WingsHTML += '<div id="Surface_' + model_elevator_Array[0].Index + '" class="wing_flaps mono_elevator_' + low_model_type + '" onClick=\'showServoList("Surface_' + model_elevator_Array[0].Index + '", ' +  model_elevator_Array[0].Index + ', "' + goTo + '");\'>' + model_elevator_Array[0].Servos + '</div>';
						break;
				case 2:	WingsHTML += '<div id="Surface_' + model_elevator_Array[0].Index + '" class="wing_flaps left_elevator_' + low_model_type + '" onClick=\'showServoList("Surface_' + model_elevator_Array[0].Index + '", ' +  model_elevator_Array[0].Index + ', "' + goTo + '");\'>' + model_elevator_Array[0].Servos + '</div>';
						WingsHTML += '<div id="Surface_' + model_elevator_Array[1].Index + '" class="wing_flaps right_elevator_' + low_model_type + '" onClick=\'showServoList("Surface_' + model_elevator_Array[1].Index + '", ' +  model_elevator_Array[1].Index + ', "' + goTo + '");\'>' + model_elevator_Array[1].Servos + '</div>';
						break;
			}
		}
		else if(model_tail == 2){
			WingsHTML += '<div id="Surface_' + model_elevator_Array[0].Index + '" class="left_velevator_' + low_model_type + '" onClick=\'showServoList("Surface_' + model_elevator_Array[0].Index + '", ' +  model_elevator_Array[0].Index + ', "' + goTo + '");\'>' + model_elevator_Array[0].Servos + '</div>';
			WingsHTML += '<div id="Surface_' + model_elevator_Array[1].Index + '" class="right_velevator_' + low_model_type + '" onClick=\'showServoList("Surface_' + model_elevator_Array[1].Index + '", ' +  model_elevator_Array[1].Index + ', "' + goTo + '");\'>' + model_elevator_Array[1].Servos + '</div>';
		}

		WingsHTML += '</div>';

		setHTML('Flap_Container', WingsHTML);
	}
}


function setModelRudder(model_type, model_tail, model_rudder_Array){
	var model_rudder = 0;

	if(model_rudder_Array != null){
		model_rudder = model_rudder_Array.length;
	}

	var goTo = "bottom";

	var WingsHTML = getHTML('Flap_Container');

	if(model_tail == 3){
		model_type = "Delta";
	}

	var low_model_type = model_type.toLowerCase();

	WingsHTML += '<div id="Model_Rudder">';

	if(model_rudder == 1){		
		if(model_type == "Delta"){
			goTo = "bottom";
		}

		WingsHTML += '	<div id="R1_IMG" class="center_rudder_' + low_model_type + '"></div>';
		WingsHTML += '	<div id="R1_Box" class="center_arrow_rudder_' + low_model_type + '"><div id="Surface_' + model_rudder_Array[0].Index + '" onClick=\'showServoList("Surface_' + model_rudder_Array[0].Index + '", ' +  model_rudder_Array[0].Index + ', "' + goTo + '");\'>' + model_rudder_Array[0].Servos + '</div></div>';
	}
	else if(model_rudder == 2){
		WingsHTML += '	<div id="R1_IMG" class="left_rudder_' + low_model_type + '"></div>';
		WingsHTML += '	<div id="R2_IMG" class="right_rudder_' + low_model_type + '"></div>';

		if(model_type == "Delta"){
			goTo = "left";
		}

		WingsHTML += '	<div id="R1_Box" class="left_arrow_rudder_' + low_model_type + '"><div id="Surface_' + model_rudder_Array[0].Index + '" onClick=\'showServoList("Surface_' + model_rudder_Array[0].Index + '", ' +  model_rudder_Array[0].Index + ', "' + goTo + '");\'>' + model_rudder_Array[0].Servos + '</div></div>';

		if(model_type == "Delta"){
			goTo = "right";
		}

		WingsHTML += '	<div id="R2_Box" class="right_arrow_rudder_' + low_model_type + '"><div id="Surface_' + model_rudder_Array[1].Index + '" onClick=\'showServoList("Surface_' + model_rudder_Array[1].Index + '", ' +  model_rudder_Array[1].Index + ', "' + goTo + '");\'>' + model_rudder_Array[1].Servos + '</div></div>';
	}
	else if(model_rudder == 3){
		WingsHTML += '	<div id="R1_IMG" class="left_rudder_' + low_model_type + '"></div>';
		WingsHTML += '	<div id="R2_IMG" class="center_rudder_' + low_model_type + '"></div>';
		WingsHTML += '	<div id="R3_IMG" class="right_rudder_' + low_model_type + '"></div>';

		if(model_type == "Delta"){
			goTo = "left";
		}

		WingsHTML += '	<div id="R1_Box" class="left_arrow_rudder_' + low_model_type + '"><div id="Surface_' + model_rudder_Array[0].Index + '" onClick=\'showServoList("Surface_' + model_rudder_Array[0].Index + '", ' +  model_rudder_Array[0].Index + ', "' + goTo + '");\'>' + model_rudder_Array[0].Servos + '</div></div>';

		if(model_type == "Delta"){
			goTo = "bottom";
		}

		WingsHTML += '	<div id="R2_Box" class="center_arrow_rudder_' + low_model_type + '"><div id="Surface_' + model_rudder_Array[1].Index + '" onClick=\'showServoList("Surface_' + model_rudder_Array[1].Index + '", ' +  model_rudder_Array[1].Index + ', "' + goTo + '");\'>' + model_rudder_Array[1].Servos + '</div></div>';

		if(model_type == "Delta"){
			goTo = "right";
		}

		WingsHTML += '	<div id="R3_Box" class="right_arrow_rudder_' + low_model_type + '"><div id="Surface_' + model_rudder_Array[2].Index + '" onClick=\'showServoList("Surface_' + model_rudder_Array[2].Index + '", ' +  model_rudder_Array[2].Index + ', "' + goTo + '");\'>' + model_rudder_Array[2].Servos + '</div></div>';
	}

	WingsHTML += '</div>';

	setHTML('Flap_Container', WingsHTML);
}


function setFunctionMatrix(model_type, model_tail, model_wings_Array){
	var model_wings = model_wings_Array.ControlSurfaces.length;












	searchIdMatrixbox1 = 1;

	if(model_tail == 3){
		searchIdMatrixbox2 = 5;
	}
	else{
		searchIdMatrixbox2 = 2;
	}

	for(var i = 0; i < model_wings_Array.DependentFunctions.length; i++){
		if(model_wings_Array.DependentFunctions[i].ID == searchIdMatrixbox1){
			functionIndexAileron = model_wings_Array.DependentFunctions[i].Index;
			functionNameAileron  = model_wings_Array.DependentFunctions[i].Name;
		}

		if(model_wings_Array.DependentFunctions[i].ID == searchIdMatrixbox2){
			functionIndexFlap    = model_wings_Array.DependentFunctions[i].Index;
			functionNameFlap     = model_wings_Array.DependentFunctions[i].Name;
		}
	}

	g_Surface2FunctionCheckedState[functionIndexAileron] = [];
	g_Surface2FunctionCheckedState[functionIndexFlap] = [];

	var isOdd = model_wings % 2;

	if(model_tail == 3){
		model_type = "Delta";
	}

	var low_model_type = model_type.toLowerCase();

	$("#Aileron_Matrix").addClass(low_model_type);
	$("#Flap_Matrix").addClass(low_model_type);

	var Aileron_HTML = getHTML('Aileron_Matrix');

	if(model_type == "Plane"){
		Aileron_HTML += '<div id="Aileron_Label_' + model_type + '" class="matrix_label_top" style="float: right;">';
	}
	else{
		Aileron_HTML += '<div id="Aileron_Label_' + model_type + '" class="matrix_label_bottom" style="float: right;">';
	}

	Aileron_HTML += '<div>' + functionNameAileron + '</div></div>';

	setHTML('Aileron_Matrix', Aileron_HTML);

	var Flap_HTML = getHTML('Flap_Matrix');

	if(model_type == "Plane"){
		Flap_HTML += '<div id="Flap_Label_' + model_type + '" class="matrix_label_bottom">';
	}
	else{
		Flap_HTML += '<div id="Flap_Label_' + model_type + '" class="matrix_label_top">';
	}

	Flap_HTML += '<div>' + functionNameFlap + '</div></div>';

	setHTML('Flap_Matrix', Flap_HTML);

	var Ailerons_HTML = getHTML('Ailerons');
	var Flaps_HTML = getHTML('Flaps');

	for(var a = 1; a < (model_wings + 1); a++){
		var controlsurfaceIndex = model_wings_Array.ControlSurfaces[a - 1].Index;

		if(typeof model_wings_Array.DependentFunctions[0].ControlSurfaces != "undefined"){
			isIncludedAileron = model_wings_Array.DependentFunctions[0].ControlSurfaces.indexOf(controlsurfaceIndex);
		}
		else{
			isIncludedAileron = -1;
		}

		if(isIncludedAileron != -1){
			var aileron_state = 'checked';
			g_Surface2FunctionCheckedState[functionIndexAileron][controlsurfaceIndex] = 1;
		}	
		else{
			var aileron_state = 'unchecked';
			g_Surface2FunctionCheckedState[functionIndexAileron][controlsurfaceIndex] = 0;
		}

		if(typeof model_wings_Array.DependentFunctions[1].ControlSurfaces != "undefined"){
			isIncludedFlap = model_wings_Array.DependentFunctions[1].ControlSurfaces.indexOf(controlsurfaceIndex);
		}
		else{
			isIncludedFlap = -1;
		}

		if(isIncludedFlap != -1){										
			var flap_state = 'checked';
			g_Surface2FunctionCheckedState[functionIndexFlap][controlsurfaceIndex] = 1;
		}	
		else{
			var flap_state = 'unchecked';
			g_Surface2FunctionCheckedState[functionIndexFlap][controlsurfaceIndex] = 0;
		}	

		var styling = '';
		var margin_left = 0;

		if(isOdd == 1){															
			if(a == (Math.floor(model_wings / 2) + 1)){
				styling = 'style="display: none;"';
			}
			else if(a == (Math.floor(model_wings / 2) + 2)){
				if(model_type == "Glider"){
					switch(model_wings){
						case 3: margin_left = 155; break;
						case 5: margin_left =  93; break;
						case 7: margin_left =  67; break;
						case 9: margin_left =  51; break;
					}
				}
				else if(model_type == "Plane"){
					switch(model_wings){
						case 3: margin_left = 159; break;
						case 5: margin_left =  96; break;
						case 7: margin_left =  69; break;
						case 9: margin_left =  53; break;
					}
				}
				else if(model_type == "Delta"){
					switch(model_wings){
						case 3: margin_left = 222; break;	
						case 5: margin_left = 123; break;	
						case 7: margin_left =  80; break;	
						case 9: margin_left =  57; break;	
					}
				}

				styling = 'style="margin-left: ' + margin_left + 'px;"';
			}
		}
		else{																	
			if(a == (Math.floor(model_wings / 2) + 1)){
				if(model_type == "Glider"){
					switch(model_wings){
						case  2: margin_left = -14; break;
						case  4: margin_left =  28; break;
						case  6: margin_left =  23; break;
						case  8: margin_left =  23; break;
						case 10: margin_left =  26; break;
					}
				}
				else if(model_type == "Plane"){
					switch(model_wings){
						case  2: margin_left =  46; break;
						case  4: margin_left =  50; break;
						case  6: margin_left =  45; break;
						case  8: margin_left =  43; break;
						case 10: margin_left =  42; break;
					}
				}
				else if(model_type == "Delta"){
					switch(model_wings){
						case  2: margin_left = 137; break;
						case  4: margin_left =  75; break;
						case  6: margin_left =  56; break;
						case  8: margin_left =  46; break;
						case 10: margin_left =  41; break;
					}
				}

				styling = 'style="margin-left: ' + margin_left + 'px;"';
			}
		}

		Ailerons_HTML += '<div id="Aileron__' + functionIndexAileron + '_' + controlsurfaceIndex + '" class="' + low_model_type + ' checkbox_' + model_wings + ' ' + aileron_state + '" ' + styling + ' onClick=\'submitAddFunction2Surface("Aileron__' + functionIndexAileron + '_' + controlsurfaceIndex + '");\'></div>';

		if(isOdd == 1){
			styling = '';
		}

		Flaps_HTML += '<div id="Flap__' + functionIndexFlap + '_' + controlsurfaceIndex + '" class="' + low_model_type + ' checkbox_' + model_wings + ' ' + flap_state + '" ' + styling + ' onClick=\'submitAddFunction2Surface("Flap__' + functionIndexFlap + '_' + controlsurfaceIndex + '");\'></div>';
	}

	setHTML('Ailerons', Ailerons_HTML);
	setHTML('Flaps', Flaps_HTML);
}



function toggleZooming(sector){
	g_isZoomed = !g_isZoomed;
	g_ZoomedSector = sector;
	var sector_number = 0;

	switch(sector){
		case "left": 	sector_number = 1; break;
		case "right":	sector_number = 2; break;
		case "bottom":	sector_number = 3; break;
	}

	if(g_isZoomed){
		hideHTML('Aileron_Matrix');
		hideHTML('Flap_Matrix');
		hideHTML('Model_Wings');

		if(g_isElevator){
			hideHTML('Model_Elevator');
		}

		if(g_isRudder){
			hideHTML('Model_Rudder');
		}

		
		$('#Zoom_Box_' + sector_number).removeClass('zoom_in').addClass('zoom_out');

		for(var sn = 1; sn < 4; sn++){
			if(sn != sector_number){
				hideHTML('Zoom_Box_' + sn);
			}
		}

		if(g_Wizard){
			$('.right_button_box').hide();
		}
	}
	else{
		g_ZoomedSector = "none"; 

		if(g_ModelWing != null){
			if((g_ModelWing.length > 1 && g_ModelType == "Glider" && g_ModelTail != 3) || (g_ModelWing.length > 2 && g_ModelTail == 3) || (g_ModelWing.length > 2 && g_ModelType == "Plane" && g_ModelTail != 3)){
				showHTML('Aileron_Matrix');
				showHTML('Flap_Matrix');
			}
		}

		showHTML('Model_Wings');

		if(g_isElevator){
			showHTML('Model_Elevator');
		}

		if(g_isRudder){
			showHTML('Model_Rudder');
		}

		for(var sn = 1; sn < 4; sn++){
			
			$('#Zoom_Box_' + sn).removeClass('zoom_out').addClass('zoom_in');

			if(sn != sector_number){
				showHTML('Zoom_Box_' + sn);
			}
		}

		if(g_Wizard){
			$('.right_button_box').show();
		}
	}

	setModelIMG(g_ModelType, g_ModelTail, sector);

	if(g_ModelWing != null){
		shiftWings(g_ModelType, g_ModelTail, sector, g_ModelWing);
	}

	if(g_ModelRudder != null){
		shiftRudders(g_ModelType, g_ModelTail, sector, g_ModelRudder);
	}

	if(g_ModelElevator != null){
		shiftElevators(g_ModelType, g_ModelTail, sector, g_ModelElevator);
	}
}


if(isBAT){
	$(window).keypress(function (e){
		var c = e.charCode;
		var popUpContent = $('#Pop_Up_Servo_List').height();

		
		if((c == CONST_SCROLLING_Key_e) || (c == CONST_SCROLLING_Key_d) || (c == CONST_SCROLLING_Key_c)){
			if(g_isZoomed && popUpContent == 0 && g_ModelType != "Helicopter"){
				toggleZooming('left');
				toggleZooming('right');
			}
		}
		
		if((c == CONST_SCROLLING_Key_w) || (c == CONST_SCROLLING_Key_s)|| (c == CONST_SCROLLING_Key_x)){
			if(g_isZoomed && popUpContent == 0 && g_ModelType != "Helicopter"){
				toggleZooming('right');
				toggleZooming('left');
			}
		}
		
		if((c == CONST_SCROLLING_Key_b) || (c == CONST_SCROLLING_Key_n)|| (c == CONST_SCROLLING_Key_m)){
			if(g_isZoomed && popUpContent == 0 && g_ModelType != "Helicopter"){
				if(g_ZoomedSector == "right"){
					toggleZooming('right');
				}
				else if(g_ZoomedSector == "left"){
					toggleZooming('left');
				}

				toggleZooming('bottom');
			}
			else if(popUpContent == 0 && g_ModelType == "Helicopter" && g_SwashPlateType > 2){
				togglePlate(2);
			}
		}
		
		if((c == CONST_SCROLLING_Key_g) || (c == CONST_SCROLLING_Key_h)|| (c == CONST_SCROLLING_Key_j)){
			if(popUpContent == 0 && g_ModelType == "Helicopter" && g_SwashPlateType > 2){
				togglePlate(1);
			}
		}
	});
}



black = "#000";
blue  = "#829cc6";
blue2 = "#7ea4c9";
white = "#fff";

function setHeliIMG(){
	var heliImage = "";

	if(g_SwashPlates == 2){
		heliImage = "data:image/png;base64,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";
	}
	else{
		heliImage = "data:image/png;base64,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 ";
	}

	setCSS('Heli_Graphic', 'background-image', 'url(' + heliImage + ')');
	
	if(g_SwashPlateType > 2){
		drawSwashPlates();
	}
}


function createFunctionRows(surfaceObject){
	var functionName = "",
		functionImage = "";
	var rowHTML = 	'<div id="outerList" class="content_width_list2">' +
						'<div class="list_header">' +
							'<div id="Function_Name_Label"  class="list_function_name">Function</div>' +
							'<div class="list_function_image">&nbsp;</div>' +
							'<div id="Function_Servo_Label" class="list_function_servo">Servo</div>' +
						'</div>' +
						'<div id="List_FunctionContainer" class="list_content">' +
							'<div id="innerList" class="inner_list_content">';

	
	var surfaceArray       = surfaceObject.ControlSurfaces;
	var dependentFunctions = surfaceObject.DependentFunctions;

	for(var i = 0; i < 4; i++){
		switch(dependentFunctions[i].ID){
			case 7:		functionImage = "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";	break;
			case 8:		functionImage = "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";	break;
			case 9:		functionImage = "BVqSURBVHja7V0HmFRV0u3XPYHJDJMYMsqSFBbJGZQsKJlfMh9BMhKFgUUyIjkuechB0o9kwV2SgLggSlJBkrAiOTgIIlBb53Y9bIbuYQYZ6W7u/b4DM91vOrz3zq26VafqWojIoqGh4TnQJ0FDQ5P2KT9IykYAIx+jCWOcYbF8HmoYV4MN4xT/3jzxwfpCa2jSPh/SBjH+zmjBmMrYFWa1Xivp50fvh4TQvPBwqhUQgBdaw8ioSauhSft8SOvPKMBoxZjO2MfW9GYJf3/qzERdEBFB38bG0t0sWYiyZqWJadOSr8XyLR9XPrmk1ePFHpq0z4a0wYwijNaMfzL+E2Wz/VqWidqViTqfiXrEgagK+DlbNloZGUkxNtttscaatHpo0qYyaX0YbzEWMQ4wURMqs7vbKzSUljEZjzJRb2fO/AdR8bMjmLS7YmIov68vXuwfia7N3xivM2oxajPqMGoyajCqM96W5/B/NTm2lEwesPR5GbnldbKL+x3FCBO3HR6BVVMgycFOkCVQzlkkIwMjKyOHnNs8jPyMwoySjHKMKnJP1HK4XjXkOtUR4Lk35Tpo0v7FpM3Nd/02uL4j2M3dGBVFpzJkoHtiRR9aVCAxYYXMZzJmpBpp0uDF5jHSmoTlQa+//jrVqlWLateuTXXq1KGaNWtSjRo1qHr16vT222+r5/B/tWrV1LGlSpWiIkWKUIECBShv3ryUO3duwutkz56dMvL7RPHnCwsLo6CgIPLnz2y1WvG+ixkfM5YxljLmMqYwxjCGMwYy+jJ6M3owOolH0UhuyqqMsjJZINCWi/Gy3NzmRBHCSCOTHI6pKzdvXYcJB+8/h1FUlgr15Bj8X4LhJxMNvJp0jFhGFsZLjJyMVxiFGKUZlYQkDWWZ0pHRXb5DH8YHjGGM0YxJjHjGEvkMy+Tn+b48mQYGBqpzFsmTcAa+tln5muXIkUOd2zx58lD+/PmpcOHCVLJkSSpXrhxVqVKF3nrrLXVtzOsF4DrhGgJ47s0331TXAcT9k/dgFpmUcR4ya9Img7SMbRWYAHvYYjI77GR1RVIX6M4uNIJUMmtj+PGg4OBgimDXOoZfG6TLwq+Lm+W1115TN0nFihXVxQepGzVqRK1bt6YuXbpQv379aOjQofTRRx/RmDFjaNKkSTRjxgyaO3cuLViwgBYuXEjz5s2j+fPn0+LFi+njjz+mZcuW0dKlS9UxU6ZMUX83fPhwGjhwIPXt25d69+5NPXr0oE6dOqn3wfvhpqxatSqVLVtWTRb58uWjXLly0csvv6xubnOiCOHvl4YnJh8fH3VM3bp11c2L/zHh4DG8/5w5c9T3LV++PNWrV08dg/9LlChBOB+YaHBO0qVLR7HsxeB8vPTSS5QzZ0565ZVXqFChQlS6dGmqVKmSIknDhg2pVatW1LFjR+revbv6Dn369KEPPviAhg0bRqNHj1bnJj4+npYsWaI+A4CfcW7M87Vo0SL1+8yZM2ny5Mk0duxYdW7xGv3796euXbtSmzZtqEmTJuozY1LFZ8BnKViwoJpAs/F9kSlTJkqfPr2aAELZG5NJ0/qU9x6s/EScA0zKOA+Z+V6C1dekTfrEGViL8j/HcvINGccXAi6xS3fYhbWdFB6OFzslVsscfmJVIhgxYrWyyETxmrhjFcXNqi2WDxawC6MfYyjjI7GYsCYzTMsBEuHGwUUGyRxvdliBxo0bqxsd5B8xYgSNGzeOpk+frsi+Zs0a2rp1K3355Zd04MAB2r9/P33zzTd07Ngx+umnn+jq1at08+ZNBfx8+fJlOn/+PJ09e5bOnDlDzsa1a9ce/vz99987PebcuXPqNfAeFy9epCtXrqj3+OWXX9Tf4z1++OEHOnjwoPpM+Gz79u2jHTt20Lp169TkhIlrwoQJinAgLia4Zs2aKaJVrlz54eQDC4pJBxMOyIVzhknDMAxcp8mMsXJuYa37M7oy2kg6r44sXyqJ1S8oS5VsjEyM9OJqhz4tYeXe++fEiRPp1q1b9Ntvv9Hdu3dp9uzZeGK2Ju2TA0I+4pZN8DGM80X54o5nEsLtTZbF5ZtjNRMo1ma7ya/RMjXXLQ5rtBC5cTKLO+voVmK91VhcSpB/BPLKEglfKOmprYwvsY5n7IcFxM0NjwA3OywfXHS467CksMrt2rVT1m7Pnj2UkJBAN27cUADh8Nivv/6qbkBYtQsXLihC4nkcCyLHxcVRhw4dqGnTpsrdLFOmjLJimHRgxWDB0vISJY19qbFfPts+xg7GOlkGzMB1EsJ9IBNcMyFaZQc3P4+491FCrkCZRA03ue+aYzmUeGCyxbXTpE1+FDdYZtgVzOKEJjw7nwBxn2Rx+flDbJ1L840vayw/Tws2yFozVDyCrLLGLCCBsWriBbTDuhIuMtxmuLcAiA4PAGSdNm0aXmwRXGSsH/E8jpW1XxyjA6OpBHbKiBXLJVYsvcQE0nh1vpONBM7hF1988Qhh4dVER0fjgGhN2pSnXhBBPFqNZ/zTySEtW+MEXuuA5Px3K+XG9+qbTlz9WAG+72y4dlgriusZIZHaWDk2iLRAwTx/vVu0aPGYlV25cqW6f3Qg6ulI2y6t1Xp9IVsLl4R1jCjLz33YveS//Vyiqy/ajTgHQajx48fjl/GanC7PU3osAU6fPv0YaREEw5pakzblpEXaYUc9tpqX2Ho+tqbl3+8DZu7WgbizmeQhVutpcbFfSNIiYo3AWTL/BhY6xovOQToJZBlJHDNi0KBBTgN5WNOD1Jq0KSdtW7aytxe7srJMzrPsMo/m2XJOunSUYJI3WzbazuuRvD4+DySf+KKRdibSKXCRJUJrPMG9HoK1MADPxgu+f1WksWAt5fvXdHJMCaR1EJxLPFavXo0DVmtxRcpJG46kfI2AADrnLHIsgoslsKiG8SDcan0ALfJ/eIbE42fYMle1Rz4neztpRWGUT5RFmZGvRE4UaQtEnSWl5S8EtSZOdXTu3FmlkpBq8rcH8Pw9+FwEIqX0ySefKAJu2rRJRcT58UGJjpuPXLGz0bx5cxzQXJM25aRFyuDEiLAw5yoo/v0qE/Mde8AJaYiRjG+R30WK6GiGDNQ2OBjPrUXwxZsJC4URBBVQFiFXDBHEnTt31A2IXGoAT3wgI6KkIkDYy9jJ2Ix0jzkOHz6M5w4zPhSlU1tGA0ldIYLt4wHnIwYew+7dux9+L+ShIQoRdRbUYvWLFStGv//++2OEvX79uoq0I3CnSZty0vbO4+tL26CMcqEzXh4ZSRFW6x1JxJuR5jmhhnEF0ebyfKP6GcYmyNK8mLT5If07fvy4ysvC3UOO1hy3b99WIgw8f+TIESWS2Lt3L+3cuZM2b95MP//888NjIZ6AounDDz9USqe2bdtSgwYNlEgEuWKQXoQPMW5+Tpris0JxBhKaA+ospL34+X/zcGpl165dqyZ6rT1OOWmRhF9R23SNnZD2HqO93ZLukRpbc6QTjex8H8PYxmjrCRYiha5wEdEUFxGsg0opNQdUQlBGQWIoa1+IKvK5s5sMjwFyzPXr1z/8HidOnFAqLlejZcuW+OOWmrQpJ+0bjGPDTNfYiZXF2rWwvZpnvKzVEo+0InNL4w1rWvkeveAKQxpYtGhR9T8AlRQUT3/VgPQRNz5cckyuWMo8x/Nicyh8CJd8dA5Z4xcV4ch6qMggy0xqXLp0SRUzYGLUpE05aRuHWq2/LGb3VxUMOFE9zY2IoDDDuC7qIK8sv3KMhmIt2q1bNzp58iS5y4DrvWLFCqUzFo8HFUChSXwPq0w+oQ6ledkltWdWIyFFV19aBnWUSqKhMjnPksopxCk+Y+y22WwPCx/Cw8PVehRre0womNhQLIFKIRRiIL3jLFrsuPZFxDnEXnDSTZM2ZaR9P7ePz4Nt0dGPu8b8O1I77exSvB1ywb2WtMg1QgBgRkPddUDvjGBPqF3UAl31NNEnQ1v9b5AaEw+0zDjGLM1DRQ1cWJNgqOipX7++iuCiyAKVRKiwglBk1qxZqnIK687PPvtMBZu+/vprpaVG8QMi4Oaa3lmQKbkDxRqomEKpoyZt8kiLNdvsKnxxT/JFdUbaH/jxivbUxDRvLHQWvTQa1zWHbnjXrl3kKQM3PCqYoHtGJRCqmBD0AakRBPvuu++UAsksYsBa+d69e271HeBBoJgC2mxN2uSRFgXfW9qwJb1n5mMTkXZ3TAz93c+PJC3hFaSVskSkuWahbA1pGtR2Jhay65H6A4ooCUitx5pYk/bJpC2OMrChzoJQ0hNqKVufKKv1gqx9PJ60iHZDuYO1IVxABExQ7+pYF6vHnxv3799Xlh3nFakxZ8P0BMyBqDMK7iVvHaBJ65q0VfwM4+T08PDHXWMRWQyzR/i+YhTzZNKK3ncKOmaguFyPlI8HDx6oXOyPP/6oFF3IPaM7BnTXPXv2VLXHFSpUUN1JIDxBwAqPORv4e3g3aE7gKLZA3TICXnyt3kFWQpP2cdI2iLRaf17mTG8spO1tj+7tTG4Qyh1JKx7FPLSfwY2nx+OWEYRBtPyrr76iTz/9VEkz0fkDUXSovhC4QpQYbWekRvgbqLwYC6TDSE/JLlQQKSeaFATDq4G4xNlAtw00J4B7jMCWObZv367a9CAo6A7EdTfSNk5vs11ahXSPC9J2sZN2s6x/PY60KDhHoTr6Sr1oA0EetLZBwArRX7igqEhCfyj0y4ICCw3d0KIG0eVgu4AGXtWn0iQPnT+6iYCmvORjM6WkRhhEfuONN5xOlii0QMEFiiigWYZ22Ry9evVSnUTQmECT9lHSdszh45OwJSrKKWlRhtfGPquulu4KHkVaNAqDq4XIqrcOFCpAoYX1OdI17du3V03rihcvrnKoSPcE2HeC2C3BnjnSH6qTaJ3LSYsa5HGDU+k6rEXqKPFAbyzTmqI6CFYZ3pADmbOSdo8fI22vV3197+50lqP1cNJKQzLVVcKbx7vvvkvSR2qWCCPaS3vY4qJWinzegR008EOrVmfpJjSmQ58rh7jDQCFsQR2Ick7aVllstmvrXLjH9/4g7SqzlYwnkJbHqyiDgyDfmwc6GuJ7ekg+fC7WyYkHWr6iLFQropJP2obRNtvFFUmsaTva1zkbpemZW5NWJHvNoAZC/2NvHhBR+Nnz53k8hLTF4K6jQ6Xj8ITyPHcjbY0gwzgzJ4nocU97IGq7uJtuSVpxAftDsodewOht7M0DUV50ekTu3BMI63CdxqEPteOAFBLN69ELW5M2eaStaLVYjk9JIk87wK5v3SstP92OtEg1QH6IbvnuJPBPrQGtL4rKEY/wJMLKtcqJyh7UDCOFhO8B6/ukNj2atI+SFv13D49Km9YlaeOZ0GFW6xmzaZs7kRb5QdwAqNt8UQa2NUluAzk3JW6YdOcoL4KdHO5MWHckrdrPB/2eHumw6KA9RtO2PPZa2m7uRFp01Edy3rFzhLcP5Fc9JfDkTXA30qLzxALsfHfWRZXPt/x4eXuVzzg3I+37PLyeqKg7hUIIuVfZPziTJpKup+2Xjy3p5876Q/HvlzNlosb2hm7/n9xc7V/0+UNQLwrrk1SxtScNFC2gzQxSI1AsYWMxaTeDQOA7mkCatOZoltZqTVjqqnMFu8zodWyzWE5IOZs7rWkhqRuBfWwHDx5Mhw4d8qiA0tGjR2n58uUEjwFVR9IIbb9ICDvJxmIxmjiatIlJq9qnjnQWjJIeURuxo5y9O2Ccm6Z8sGP8YGiMITRHJHnLli1KJucuUsNTp06pLhBow4L9Z7EPruRZl8PVl+sQq0miSZsc0sJara3PLvB5Z90Y2dJeYBe5jt1F/kSqNxxHbtllfbRst/g8v5Ov7LyOfVe3QNeKtAJalKJiBQopKHDQ4QEEcoaNGzcqoT0qU7Ax1KpVq5zC3Mja3LQZQnz0PYZKCW1RzX1w0UoFLV4C7ecP/ZYGyU7vKMDw06TQpH3avsd9H/Y9dtHcbUJ4OBkWy0+yCbRFdofDFpBfZLLZ7v6NLbGfYSx2p+56IkQvJl03RsgG1Uukl9JaZ0AfJWy9iFpP2QlwlQssk8Zni9BCVoT42EN2Igq50W/JQfiOssZATQBN2me6wwDWrKNc7TDw6D60C8RSxAcZxvWmQUG0ktfDTe0aZY9uVo71PRRVaDYuhdi2p3yd4Txo6tSp+GWqvvE1aVODtKpheVI75oG4w+xlVBcZ/y3o6/tgMlvf6/zcDUY9u/s3xxM2RpYqGJSnFUv0+DQ0Sfuz+6VC/IBuDnr7S03a1CStkgNmZxd3k7MyPbG2B9Knp4ZMTuzbcxibb4HM7E7u+6OZ+QAP6BFVEzlPpIpEDngELr7Um+5HyuW9997D41shPJF0y1bp/ZsYm6WYwhEb8Dfx8fE0cuRIcx27RsrnMKkV1UTQpH1WpIWk8VA3qKNcbMJ1h/8/kyEDXZGosvk4qoTQAUM6HLg7aV/lobo4oMIEe+6gCyM6O2B/HQxEehFI2rZtmxI24Gf0/k0M9EhC4MoRGzZsUH9jiuER3ELgC4XqCFa5SwsVDe8gLbZ7GJuHre12VwEpJxtK4/fh9hvxgBRee8LaVW1fgc200OlhyJAhqusD/o+Li6MBAwYoS5wUEI0eNWqUU8DCogMDcsfmY3CXkYqSli7BmgyatM+CtBZpynWsdVAQ3XC2tnUivEB3i3ftQagNZs3tU7zv8xr5pdPDEOn6MERy0QNkzZsUEI0e5QIjpQPDYIfHxkgqKtLyAg9N2mdL2mhIGhFkKuPvT4djY52vbRNZ3dPsLsuG0jNkYyZPIq0emrQeSVoUDTSGpQwzjIT/CwykDdHRdAuWNinCCmn/xcfm9PG5I3upWjRp9dCkTf3SvGm+hnENOdiZ6dLRZXPd+iTCSjBqdkQERBXn+XVqecOueRoa7kxayBGXFvbzoylMViVhRPApuYSVINQge2eLr0U+qEmroUmbiqQtbbVYDlXn9ejGqCi64dCt4hEkQdrLTPRGf5TtZdSk1dCkTeW2H4bF0iPAMI5nsdnuY7vLf7DVXBsZST9myGDfRQ9WF9bXxQ7xB2Jjqbi9UmWEt2wqraHh7mvaNCKoRyuZhYyD6W22W9UCAiguJERpir9jYt4xCezoOvPPG9hCZ7VrdDto0mpo0v71KZ+0Io5A5c5MtsIHYqzW22X9/akHE3hxRAQdZQL/7mCB43ktHGS1nhOxgiathibtcxBXmCOQUYjRVrabOBhiGHdKMYG7MoGxYRcI3NneE3mb7AWjSauhSfscSes4gsSFhnJoOuPzaKv1Wlley2a3d7OIFwmkJq2GJq2bkDYxgVHQ3QL5XSkor+YNCXQNDbcnrYaGRvLwP7y/n+97BwSkAAAAAElFTkSuQmCC";	break;
			case 10:	functionImage = "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";	break;
		}

		functionName = dependentFunctions[i].Name;

		rowHTML += 	'<div id="FunctionContainer_' + dependentFunctions[i].ID + '" class="list_content_row">' +
						'<div id="Function__' + dependentFunctions[i].ID + '_Name" class="list_function_name Name no_edit" onClick=\'showKeypad("Function__' + dependentFunctions[i].ID + '_Name");\'>' + functionName + '</div>' +
						'<div id="Function__' + dependentFunctions[i].ID + '_IMG"  class="list_function_image no_edit"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAAA9CAYAAABBc+6gAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAA' + functionImage + '" width="237" height="61" alt="" draggable="false"/></div>' +
						'<div id="Surface_' + dependentFunctions[i].ControlSurfaces[0] + '" class="list_function_servo Servos" onClick=\'scrollInnerList(' + i + '); showServoList("Surface_' + dependentFunctions[i].ControlSurfaces[0] + '", ' + dependentFunctions[i].ControlSurfaces[0] + ', false);\'>' + surfaceArray[i].Servos + '</div>' +
					'</div>'; 
	}
	

	rowHTML += 			'</div>' +
					'</div>' +
				'</div>';








	setHTML('Heli_Plate', rowHTML);
}


function scrollInnerList(rowNumber){
	var newScrollHeight = 0;

	if(rowNumber > 0){
		switch(rowNumber){
			case 1:		newScrollHeight = -27;	break;
			case 2:		newScrollHeight = -97;	break;
			case 3:		newScrollHeight = -167;	break;
			default:	newScrollHeight = 0;
		}

		setCSS('innerList', 'margin-top', newScrollHeight + 'px');
	}
	


}

l_canvas = Raphael("Heli_Graphic", 147, 408);
function drawSwashPlates(){
	if(g_SwashPlates != 1 || (g_SwashPlates == 1 && g_activePlate == 1)){
		r_canvas = Raphael("Heli_Plate", 527, 408);

		var r_center = [263, 204];
		var BIG_RADIUS = 102;
		var SMALL_RADIUS = 34;

		rz = r_canvas.circle(r_center[0], r_center[1], 22).attr({fill: white, stroke: "none"});
		r  = r_canvas.circle(r_center[0], r_center[1], BIG_RADIUS).attr({stroke: white, "stroke-width": "12px"});
		rz.g = rz.glow({color: black, offsetx: 2, offsety: 3, width:  2, opacity: 0.4, fill: true});
		r.g  =  r.glow({color: black, offsetx: 2, offsety: 3, width: 16, opacity: 0.78});
	}
	else{
		r_canvas = Raphael("Heli_Plate", 527, 408);
	}

	if(g_SwashPlates == 2){
		var l1_center = [73, 76];
		var l2_center = [73, 313];

		l1 = l_canvas.circle(l1_center[0], l1_center[1], SMALL_RADIUS).attr({"stroke": white, "stroke-width": "5px"});
		l2 = l_canvas.circle(l2_center[0], l2_center[1], SMALL_RADIUS).attr({"stroke": white, "stroke-width": "5px", "stroke-opacity": "0.33"});

		setCSS('Heli_Clickbox_1', 'margin', '-388px 0px 0px 21px');
		setCSS('Heli_Clickbox_2', 'margin', '-150px 0px 0px 22px');

		drawMiniPlate(l1_center, 1);
		drawMiniPlate(l2_center, 2);
	}
	else{
		var l1_center = [82, 139];
		

		l1 = l_canvas.circle(l1_center[0], l1_center[1], SMALL_RADIUS).attr({"stroke": white, "stroke-width": "5px"});
		lbt = l_canvas.rect(63, 339, 7, 28).attr({"stroke": black, "stroke-width": "1px", "fill": blue2, "opacity": "0.5"});
		lbc = l_canvas.rect(63, 367, 14, 6).attr({"stroke": black, "stroke-width": "1px", "fill": blue2, "opacity": "0.5"});
		lbb = l_canvas.rect(63, 373, 7, 28).attr({"stroke": black, "stroke-width": "1px", "fill": blue2, "opacity": "0.5"});

		

		setCSS('Heli_Clickbox_1', 'margin', '-325px 0px 0px 30px');
		setCSS('Heli_Clickbox_2', 'margin', '-93px 0px 0px 31px');

		drawMiniPlate(l1_center, 1);
	}

	setCSS('Heli_Clickbox_1', 'border-width', '2px');
}


buttons = l_canvas.set();
function drawMiniPlate(centerPosition, swashPlateNumber){
	var sumAngle = -90;

	var SMALL_RADIUS = 34;
	var BUTTON_RADIUS = 8;

	var angleObject = new Object;

	if(swashPlateNumber == 1){
		angleObject = g_SwashPlateServos.SwashPlate1;
	}
	else{
		angleObject = g_SwashPlateServos.SwashPlate2;
	}

	for(var i = 0; i < g_SwashPlateType; i++){
		var deg = parseInt(angleObject[i].Value);

		sumAngle += deg;

		var button_x = toCoords(centerPosition, SMALL_RADIUS, sumAngle, "x");
		var button_y = toCoords(centerPosition, SMALL_RADIUS, sumAngle, "y");

		if(swashPlateNumber == g_activePlate){
			buttons.push(l_canvas.circle(button_x, button_y, BUTTON_RADIUS).attr({fill: blue2, stroke: black, "stroke-width": "1px", opacity: 1}));
		}
		else{
			buttons.push(l_canvas.circle(button_x, button_y, BUTTON_RADIUS).attr({fill: blue2, stroke: black, "stroke-width": "1px", opacity: 0.33}));
		}
	}
}


function setModelHeli(g_SwashPlateType, g_SwashPlates, model_swash_00_Array, model_swash_01_Array){
	var BIG_RADIUS = 102;
	var centerPosition = [263, 204];
	var plateID = 0;
	var sumAngle = -90;

	var angleObject = new Object;

	if(g_SwashPlateType > 2){
		var plateBoxes = getHTML('Heli_Plate');

		if(g_activePlate == 1){
			plateBoxes += '<div id="Heli_Surface_1" class="plate_layer"></div>';
			plateBoxes += '<div id="Heli_Surface_2" class="plate_layer" style="display: none;"></div>';
		}
		else{
			plateBoxes += '<div id="Heli_Surface_1" class="plate_layer" style="display: none;"></div>';
			plateBoxes += '<div id="Heli_Surface_2" class="plate_layer"></div>';
		}
	}

	setHTML('Heli_Plate', plateBoxes);

	for(var i = 1; i <= g_SwashPlates; i++){
		if(i == 1){
			angleObject = g_SwashPlateServos.SwashPlate1;
		}
		else{
			angleObject = g_SwashPlateServos.SwashPlate2;
		}

		var innerPlate = "";
		sumAngle = -90;

		for(var j = 0; j < g_SwashPlateType; j++){
			plateID = j + ((i - 1) * g_SwashPlateType);

			var deg = parseInt(angleObject[j].Value);

			sumAngle += deg;

			var surface_x = toCoords(centerPosition, BIG_RADIUS, sumAngle, "x");
			var surface_y = toCoords(centerPosition, BIG_RADIUS, sumAngle, "y");

			if(i == 1){
				innerPlate += '<div id="Surface_' + plateID + '" class="heli_surface" style="margin: ' + (surface_y - 17) + 'px 0px 0px ' + (surface_x - 37) + 'px;" onClick=\'showServoList("Surface_' + plateID + '", ' + plateID + ', false);\'>' + model_swash_00_Array[j].Servos + '</div>';
			}
			else{
				innerPlate += '<div id="Surface_' + plateID + '" class="heli_surface" style="margin: ' + (surface_y - 17) + 'px 0px 0px ' + (surface_x - 37) + 'px;" onClick=\'showServoList("Surface_' + plateID + '", ' + plateID + ', false);\'>' + model_swash_01_Array[j].Servos + '</div>';
			}
		}

		setHTML('Heli_Surface_' + i, innerPlate);
	}
	
	if(g_SwashPlates == 1){
		plateID++;
	
		var innerTail = "";
		innerTail = '<div class="heli_tail_surface"><div id="Surface_' + plateID + '" class="heli_tail_sub_surface" onClick=\'showServoList("Surface_' + plateID + '", ' + plateID + ', false);\'>' + model_swash_01_Array[0].Servos + '</div></div>';

		setHTML('Tail_Rotor', innerTail);
	}
}


function togglePlate(number){
	if(g_activePlate != number){
		if(g_activePlate == 1){
			l1.attr({"stroke-opacity": "0.33"});
			if(g_SwashPlates == 2){
				l2.attr({"stroke-opacity": "1"});
			}
			else{
				lbt.attr({"opacity": "1"});
				lbc.attr({"opacity": "1"});
				lbb.attr({"opacity": "1"});
			}

			setCSS('Heli_Clickbox_1', 'border-width', '1px');
			setCSS('Heli_Clickbox_2', 'border-width', '2px');

			if(g_SwashPlates == 1){
				setCSS('Heli_Clickbox_1', 'margin', '-324px 0px 0px 31px');
				setCSS('Heli_Clickbox_2', 'margin', '-94px 0px 0px 30px');
			}
			else{
				setCSS('Heli_Clickbox_1', 'margin', '-387px 0px 0px 22px');
				setCSS('Heli_Clickbox_2', 'margin', '-151px 0px 0px 21px');
			}

			for(var i = 0; i < g_SwashPlateType; i++){
				buttons[i].attr({opacity: 0.33});
			}

			if(g_SwashPlates > 1){
				for(var i = g_SwashPlateType; i < (2 * g_SwashPlateType); i++){
					buttons[i].attr({opacity: 1});
				}
			}

			g_activePlate = 2;
			
			if(g_SwashPlates == 1){
				hideHTML('Heli_Plate');
				showHTML('Tail_Rotor');
			}
			else{
				hideHTML('Heli_Surface_1');
				showHTML('Heli_Surface_2');
			}
		}
		else if(g_activePlate == 2){
			l1.attr({"stroke-opacity": "1"});
			if(g_SwashPlates == 2){
				l2.attr({"stroke-opacity": "0.33"});
			}
			else{
				lbt.attr({"opacity": "0.5"});
				lbc.attr({"opacity": "0.5"});
				lbb.attr({"opacity": "0.5"});
			}

			setCSS('Heli_Clickbox_1', 'border-width', '2px');
			setCSS('Heli_Clickbox_2', 'border-width', '1px');

			if(g_SwashPlates == 1){
				setCSS('Heli_Clickbox_1', 'margin', '-325px 0px 0px 30px');
				setCSS('Heli_Clickbox_2', 'margin', '-93px 0px 0px 31px');
			}
			else{
				setCSS('Heli_Clickbox_1', 'margin', '-388px 0px 0px 21px');
				setCSS('Heli_Clickbox_2', 'margin', '-150px 0px 0px 22px');
			}

			for(var i = 0; i < g_SwashPlateType; i++){
				buttons[i].attr({opacity: 1});
			}

			if(g_SwashPlates > 1){
				for(var i = g_SwashPlateType; i < (2 * g_SwashPlateType); i++){
					buttons[i].attr({opacity: 0.33});
				}
			}

			g_activePlate = 1;
			
			if(g_SwashPlates == 1){
				hideHTML('Tail_Rotor');
				showHTML('Heli_Plate');
			}
			else{
				showHTML('Heli_Surface_1');
				hideHTML('Heli_Surface_2');
			}
		}
	}
}


function toCoords(center, radius, angle, direction){
	var radians = (angle / 180) * Math.PI;
	var x = center[0] + Math.cos(radians) * radius,
		y = center[1] + Math.sin(radians) * radius;

	if(direction == "x"){
		return x;
	}
	else{
		return y;
	}
}


function getPlateOffset(clickedHeight){
	clickedHeight = clickedHeight.split("px");
	var value = 113 - clickedHeight[0];
	var valueStr = value + "px";

	return valueStr;
}
