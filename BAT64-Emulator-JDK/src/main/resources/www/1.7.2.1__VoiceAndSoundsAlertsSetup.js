


var g_GET_Parameter = get_GET_Parameter();
var g_ModeIndices = g_GET_Parameter.SetupIndices.split("___");
var g_ModeIndex = parseInt(g_ModeIndices[0], 10);
var g_ItemIndex = parseInt(g_ModeIndices[1], 10);

var g_List_PopupListObj = {};
var g_toggleSpeakStatus = {};
var g_toggleSpeakUnitkStatus = {};
var g_toggleSpeakValueStatus = {};
var g_telemetryItemId = -1;
var g_classTag = "";

initPage();

function initPage(){


	InitDataPostArgs = getPopupObj(InitDataPostArgs, "AlertRepetionCount");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "AudioFileChoice");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "AudioAlarms");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "CompareOperation");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "CompareOperation_LGT");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "CompareOperation_Eq");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "CompareOperation_LGT_Eq");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "CompareOperation_Eq_Log");
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);

	InitDataPostArgsExtended = new Object();
	GetTd(getAlertObject(InitDataPostArgsExtended, g_ModeIndex), g_InitEvent, "get");


	setInterval(JsonFunction, 250);
}



function getAlertObject(InitDataPostArgsExtended, index){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	cmd = "get";
	ModelName = "model-settings";
	ListType = "SoundMode";

	alert = new Object();
	alert.Index = -1;
		audioItem = new Object();
			telemetryIdInfo = new Object();
			telemetryIdInfo.ID = -1;
			telemetryIdInfo.Name = "";
			telemetryIdInfo.Category = "";
		audioItem.TelemetryIDInfo = telemetryIdInfo;
			audiFile= new Object();
			audiFile.Index = -1;
			audiFile.Name = "";
		audioItem.AudioFile = audiFile;
			isTDNameToSpeak = new Object();
			isTDNameToSpeak.Index = -1;
			isTDNameToSpeak.Name = "";
		audioItem.IsTDNameToSpeak = isTDNameToSpeak;
			isUnitSpoken = new Object();
			isUnitSpoken.Index = -1;
			isUnitSpoken.Name = "";
		audioItem.IsUnitSpoken = isUnitSpoken;
			isValueSpoken = new Object();
			isValueSpoken.Index = -1;
			isValueSpoken.Name = "";
		audioItem.IsValueSpoken = isValueSpoken;
	alert.AudioItem = audioItem;
		repetionCount = new Object();
		repetionCount.Index = -1;
		repetionCount.Name = "";
	alert.RepetionCount = repetionCount;
		alarm = new Object();
		alarm.Index = -1;
		alarm.Name = "";
	alert.Threshold = new Object();
		alert.Threshold.Value = "";
		alert.Threshold.NumpadLimits = {
			ClassTag : "",
			Min : 0.0,
			Max : 0.0,
			IsSigned : 0,
			OutputResolution : 0,
			OperatorType : -1
		};
	alarms = new Array (alarm);
	alert.Alarms = alarms;
		operator = new Object();
		operator.Index = -1;
		operator.Name = "";
	alert.Operator = operator;

	alerts = new Array(alert);

	InitDataPostArgsExtended[cmd] = {};
	InitDataPostArgsExtended[cmd][ModelName] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType]["Items"] = "Single";
	InitDataPostArgsExtended[cmd][ModelName][ListType]["Index"] = index;
	InitDataPostArgsExtended[cmd][ModelName][ListType]["Name"] = "";
	InitDataPostArgsExtended[cmd][ModelName][ListType]["Alerts"] = alerts;

	return InitDataPostArgsExtended;
}


function onEVENT_INIT(e){
	try{
		setHeaderMaxWidth2();

		if(typeof e.EventData.get == "undefined"){
			setHTML('Model_Name', e.EventData.ModelName);

			$('#Navi_Button').removeAttr("href");
			$('#Navi_Button').bind("click", function(){window.location.href = '1.7.2__VoiceAndSoundsAlerts.html?SetupModeIndex=' + g_ModeIndex + '&VoiceAndSoundAlertIndex=' + g_ItemIndex;});

			g_List_PopupListObj["AlertRepetionCount"] = e.EventData.PopUp.AlertRepetionCount;
			g_List_PopupListObj["AudioFileChoice"] = e.EventData.PopUp.AudioFileChoice;
			g_List_PopupListObj["AudioAlarms"] = e.EventData.PopUp.AudioAlarms;
			g_List_PopupListObj["CompareOperation"] = e.EventData.PopUp.CompareOperation;
			g_List_PopupListObj["CompareOperation_LGT"] = e.EventData.PopUp.CompareOperation_LGT;
			g_List_PopupListObj["CompareOperation_Eq"] = e.EventData.PopUp.CompareOperation_Eq;
			g_List_PopupListObj["CompareOperation_LGT_Eq"] = e.EventData.PopUp.CompareOperation_LGT_Eq;
			g_List_PopupListObj["CompareOperation_Eq_Log"] = e.EventData.PopUp.CompareOperation_Eq_Log;
		}
		else{
			setHTML("Sound_Mode_Name", e.EventData.get.SoundMode.Name);
			var i = 0;
			

			g_List_Indices = new Array ();
			g_List_Count = e.EventData.get.SoundMode.Alerts.length;

			var arrayIndex = 0;

			for(i = 0; i < g_List_Count; i++){
				if(g_ItemIndex == e.EventData.get.SoundMode.Alerts[i].Index){
					arrayIndex = i;
				}
			}

			Index         		= e.EventData.get.SoundMode.Alerts[arrayIndex].Index;
			Category			= e.EventData.get.SoundMode.Alerts[arrayIndex].AudioItem.TelemetryIDInfo.Category;
			setHTML("VoiceSoundsSetup_Item", e.EventData.get.SoundMode.Alerts[arrayIndex].AudioItem.TelemetryIDInfo.Name);
			setHTML("VoiceSoundsSetup_File", e.EventData.get.SoundMode.Alerts[arrayIndex].AudioItem.AudioFile.Name);
			setHTML("VoiceSoundsSetup_Operator", e.EventData.get.SoundMode.Alerts[arrayIndex].Operator.Name);
			isSpeak        		= e.EventData.get.SoundMode.Alerts[arrayIndex].AudioItem.IsTDNameToSpeak.Index;
			Threshold		   	= e.EventData.get.SoundMode.Alerts[arrayIndex].Threshold;
			g_classTag			= Threshold.NumpadLimits.ClassTag;
			if(Category == 15){
				setHTML("VoiceSoundsSetup_Threshold", checkTimeFormat(Threshold.Value));
			}
			else{
				setHTML("VoiceSoundsSetup_Threshold", Threshold.Value);
			}
			setHTML("VoiceSoundsSetup_Repeat", e.EventData.get.SoundMode.Alerts[arrayIndex].RepetionCount.Name);
			Alarms		   		= e.EventData.get.SoundMode.Alerts[arrayIndex].Alarms;
			g_telemetryItemId	= e.EventData.get.SoundMode.Alerts[arrayIndex].AudioItem.TelemetryIDInfo.ID;
			isSpeakUnit 		= e.EventData.get.SoundMode.Alerts[arrayIndex].AudioItem.IsUnitSpoken.Index;
			isSpeakValue 		= e.EventData.get.SoundMode.Alerts[arrayIndex].AudioItem.IsValueSpoken.Index;

			
			if(typeof Threshold.NumpadLimits != "undefined"){
				g_numpadLimitObj[g_classTag] = Threshold.NumpadLimits;
				if((g_classTag == "Latitude") || (g_classTag == "Longitude")){
					setAdvancedLimits(g_classTag);
				}
				
			}

			var alarmTypeStr = '';

			if(Alarms.length != 0){
				for(var j = 0; j < Alarms.length; j++){
					alarmTypeStr +=  Alarms[j].Name + ', ';
				}

				alarmTypeStr = alarmTypeStr.substring(0, alarmTypeStr.length-2);
				setHTML("VoiceSoundsSetup_Alarm", alarmTypeStr);
			}

			g_toggleSpeakStatus = isSpeak;

			if(isSpeak == 1){
				toggleSpeakStatus(true);
			}

			g_toggleSpeakUnitkStatus = isSpeakUnit;

			if(isSpeakUnit == 1){
				toggleSpeakUnitStatus(true);
			}

			g_toggleSpeakValueStatus = isSpeakValue;

			if(isSpeakValue == 1){
				toggleSpeakValueStatus(true);
			}

			
			$('#VoiceSoundsSetup_Speak').bind("click", function(){toggleSpeakStatus(false, Index, "VoiceSoundsSetup_Speak");});
			$('#VoiceSoundsSetup_SpeakUnit').bind("click", function(){toggleSpeakUnitStatus(false, Index, "VoiceSoundsSetup_SpeakUnit");});
			$('#VoiceSoundsSetup_SpeakValue').bind("click", function(){toggleSpeakValueStatus(false, Index, "VoiceSoundsSetup_SpeakValue");});

			if(Category == 15){
				$('#VoiceSoundsSetup_Threshold').bind("click", function(){showNumpadTimer("VoiceSoundsSetup_Threshold");});
			}
			else{
				$('#VoiceSoundsSetup_Threshold').bind("click", function(){
																			if((g_classTag == "Latitude") || (g_classTag == "Longitude")){
																				var strTemp = getHTML("VoiceSoundsSetup_Threshold");
																				setHTML("VoiceSoundsSetup_Threshold", strTemp.substring(0,strTemp.length-1));
																			}
																			showNumpad("VoiceSoundsSetup_Threshold", g_classTag);
																		});
			}

			g_popupList_Indices["VoiceSoundsSetup_Repeat"] = e.EventData.get.SoundMode.Alerts[arrayIndex].RepetionCount.Index;
			$('#VoiceSoundsSetup_Repeat').bind("click", function(){showPopupList(this, g_List_PopupListObj["AlertRepetionCount"], false, true, g_popupList_Indices);});

			g_popupList_Indices["VoiceSoundsSetup_File"] = e.EventData.get.SoundMode.Alerts[arrayIndex].AudioItem.AudioFile.Index;
			$('#VoiceSoundsSetup_File').bind("click", function(){showPopupList(this, g_List_PopupListObj["AudioFileChoice"], false, true, g_popupList_Indices);});

			g_popupList_Indices["VoiceSoundsSetup_Alarm"] = Alarms;
			$('#VoiceSoundsSetup_Alarm').bind("click", function(){showPopupList(this, g_List_PopupListObj["AudioAlarms"], true, true, g_popupList_Indices);});

			
			g_popupList_Indices["VoiceSoundsSetup_Operator"] = e.EventData.get.SoundMode.Alerts[arrayIndex].Operator.Index;
			switch (Threshold.NumpadLimits.OperatorType){
			case 0: $('#VoiceSoundsSetup_Operator').bind("click", function(){showPopupList(this, g_List_PopupListObj["CompareOperation"], false, true, g_popupList_Indices);}); break;
			case 1: $('#VoiceSoundsSetup_Operator').bind("click", function(){showPopupList(this, g_List_PopupListObj["CompareOperation_LGT"], false, true, g_popupList_Indices);}); break;
			case 2: $('#VoiceSoundsSetup_Operator').bind("click", function(){showPopupList(this, g_List_PopupListObj["CompareOperation_Eq"], false, true, g_popupList_Indices);}); break;
			case 3: $('#VoiceSoundsSetup_Operator').bind("click", function(){showPopupList(this, g_List_PopupListObj["CompareOperation_LGT_Eq"], false, true, g_popupList_Indices);}); break;
			case 4: $('#VoiceSoundsSetup_Operator').bind("click", function(){showPopupList(this, g_List_PopupListObj["CompareOperation_Eq_Log"], false, true, g_popupList_Indices);}); break;
			default: $('#VoiceSoundsSetup_Operator').bind("click", function(){showPopupList(this, g_List_PopupListObj["CompareOperation_LGT"], false, true, g_popupList_Indices);}); break;
		}
			

			telemetryObj = new Object();
			telemetryObj.ID = g_telemetryItemId;
			telemetryObj.Value = 0;
			telemetryObj.ValueStr = "";

			telemetryIds.push(telemetryObj);

			initScrollbars('List_Container');
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "telemetry"){
		if(key == g_telemetryItemId){
			setHTML("VoiceSoundsSetup_Item_Value", valueStr);
		}
	}
}


function onEVENT_SET(e){
	try{

	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}


function getSavePath(modeIndex, itemIndex){
	cmd = "set";
	ModelName = "model-settings";
	path = "www";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"SoundMode":{"Alerts":{"Object":{"AudioItem":{"AudioFile":"' + path + '"}},"Index":' + modeIndex + '}, "Index":' + itemIndex + '}}}}');

	return str;
}


function toggleSpeakStatus(isInit, Index, tagId){
	$('#Announcement__IsTDNameToSpeak_IMG').toggle();

	if(!isInit){
		g_toggleSpeakStatus ^= 1;
		submitSET(tagId, g_toggleSpeakStatus);
	}
}


function toggleSpeakUnitStatus(isInit, Index, tagId){
	$('#Announcement__IsTDUnitToSpeak_IMG').toggle();

	if(!isInit){
		g_toggleSpeakUnitkStatus ^= 1;
		submitSET(tagId, g_toggleSpeakUnitkStatus);
	}
}


function toggleSpeakValueStatus(isInit, Index, tagId){
	$('#Announcement__IsTDValueToSpeak_IMG').toggle();

	if(!isInit){
		g_toggleSpeakValueStatus ^= 1;
		submitSET(tagId, g_toggleSpeakValueStatus);
	}
}


function checkTimeFormat(timeString){
	var timeAsArray = timeString.split(":");
	var timeHoursCount = timeAsArray[0].length;

	switch (timeHoursCount){
		case 2: timeString = "00" + timeString; break;
		case 4: timeString = timeString + ":00"; break;
	}

	return timeString;
}

function setAdvancedLimits(limitName){
	switch(limitName){
		case "Latitude": 								
		case "Longitude": 	var splitLimitsMax = splitUnitFromValue(g_numpadLimitObj[limitName]["Max"]);
							g_numpadLimitObj[limitName]["Max"] = parseInt(splitLimitsMax.value);
							g_numpadLimitObj[limitName]["Max_Unit"] = splitLimitsMax.unit;
							var splitLimitsMin = splitUnitFromValue(g_numpadLimitObj[limitName]["Min"]);
							g_numpadLimitObj[limitName]["Min"] = parseInt(splitLimitsMin.value) * -1;
							g_numpadLimitObj[limitName]["Min_Unit"] = splitLimitsMin.unit;
							break;
	}
}
function setAdvancedThreshold(value){
	var tempVal = value;
	if (tempVal < 0){
		tempVal*= -1;
		tempVal = tempVal.toFixed(4);
		tempVal+= splitUnitFromValue(g_numpadLimitObj[g_classTag]["Min_Unit"]).unit;
	}
	else{
		tempVal+= splitUnitFromValue(g_numpadLimitObj[g_classTag]["Max_Unit"]).unit;
	}
		
	setHTML('VoiceSoundsSetup_Threshold', tempVal)
	
}

function getAttrObj(tagId, value, index){
	Attribute = new Object();

	if(tagId == "VoiceSoundsSetup_Repeat"){
		Attribute["RepetionCount"] = value;

		return Attribute;
	}

	if(tagId == "VoiceSoundsSetup_Speak"){
		Attribute["AudioItem"] = {};
		Attribute["AudioItem"]["IsTDNameToSpeak"] = value;

		return Attribute;
	}

	if(tagId == "VoiceSoundsSetup_SpeakUnit"){
		Attribute["AudioItem"] = {};
		Attribute["AudioItem"]["IsUnitSpoken"] = {};
		Attribute["AudioItem"]["IsUnitSpoken"] = value;

		return Attribute;
	}

	if(tagId == "VoiceSoundsSetup_SpeakValue"){
		Attribute["AudioItem"] = {};
		Attribute["AudioItem"]["IsValueSpoken"] = {};
		Attribute["AudioItem"]["IsValueSpoken"] = value;

		return Attribute;
	}

	if(tagId == "VoiceSoundsSetup_File"){
		if(value == 1){
			temp = getSavePath(index, g_ModeIndex);
			window.location.href = "9.4.0__FileManager.html?IsManager=0&ManagementType=soundManagement&SavePathObj=" + temp + "&SearchKeyNode=AudioFile&LastURL=" + location.href;
		}
		else{
			Attribute["AudioItem"] = {};
			Attribute["AudioItem"]["AudioFile"] = "";
		}

		return Attribute;
	}

	if(tagId == "VoiceSoundsSetup_Operator"){
		Attribute["Operator"] = value;

		return Attribute;
	}

	if(tagId == "VoiceSoundsSetup_Threshold"){
		Attribute["Threshold"] = value;
		if((g_classTag == "Latitude") || (g_classTag == "Longitude")){
			setAdvancedThreshold(value);
		}
		
		return Attribute;
	}

	if(tagId == "VoiceSoundsSetup_Alarm"){
		var StrArray = value.split(", ");
		var TmpArray = [];

		for(var v in StrArray){
			TmpArray.push(parseInt(StrArray[v]));
		}

		Attribute["Alarms"] = TmpArray;

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
	cmd = "set";
	ModelName = "model-settings";
	Index = g_ItemIndex;
	ListType = "SoundMode";

	Attr = new Object();
	Attr = getAttrObj(tagId, value, Index);

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType]["Index"] = parseInt(g_ModeIndex);
	xmlObj[cmd][ModelName][ListType]["Alerts"] = {};
	xmlObj[cmd][ModelName][ListType]["Alerts"]["Object"] = Attr;
	xmlObj[cmd][ModelName][ListType]["Alerts"]["Index"] = Index;

	GetTd(xmlObj, g_SetEvent, cmd);
}




var numpadTimerTargetTagId = "";
var numpadTimerValue = 0;

var numpadTimerPreValue = numpadTimerValue;



function showNumpadTimer(tagId){
	if(numpadOpen && !($('#meindiv').is(':empty'))){
		handleNoneClosedNumpad();
	}

	g_isPopUp = true;

	showHTML('Pop_Up_Blocker');

	numpadTimerTargetTagId = tagId;
	numpadTimerValue = getHTML(numpadTimerTargetTagId);

	numpadTimerPreValue = numpadTimerValue;
	$('#Pop_Up').css({'top': '80px', 'padding-left': '11px'});
	var htmlNumpadOutter = "<div id=\"Pop_Up_Outer\"></div>";
	$('#Pop_Up').append(htmlNumpadOutter);
	$('#Pop_Up_Outer').html(getHtmlNumpadPadTimer(numpadTimerTargetTagId));
	setPositionNumpadTimer(numpadTimerTargetTagId, numpadIsTestUsed);
	setNoEdit();
}


function getHtmlNumpadPadTimer(tagId){
	var htmlNumpadPad = '' +
	'<div id="flat-numipt">' +
		'<div id="PopupArrowUp" style="margin-top: -20px; padding-left: 0px; display: none;"><div class="popup_icon_arrowUp"></div></div>' +
		'<div id="graybtn" style="height: 62px; width: 760px">' +
		  '<ul>' +
		    '<li id="NumpadNum1" class="NumpadNum" onclick="changenumpadTimerValue(\'1\');">1</li>' +
		    '<li id="NumpadNum2" class="NumpadNum" onclick="changenumpadTimerValue(\'2\');">2</li>' +
		    '<li id="NumpadNum3" class="NumpadNum" onclick="changenumpadTimerValue(\'3\');">3</li>' +
		    '<li id="NumpadNum4" class="NumpadNum" onclick="changenumpadTimerValue(\'4\');">4</li>' +
		    '<li id="NumpadNum5" class="NumpadNum" onclick="changenumpadTimerValue(\'5\');">5</li>' +
		    '<li id="NumpadNum6" class="NumpadNum" onclick="changenumpadTimerValue(\'6\');">6</li>' +
		    '<li id="NumpadNum7" class="NumpadNum" onclick="changenumpadTimerValue(\'7\');">7</li>' +
		    '<li id="NumpadNum8" class="NumpadNum" onclick="changenumpadTimerValue(\'8\');">8</li>' +
		    '<li id="NumpadNum9" class="NumpadNum" onclick="changenumpadTimerValue(\'9\');">9</li>' +
		    '<li id="NumpadNum0" class="NumpadNum" onclick="changenumpadTimerValue(\'0\');">0</li>' +
		  '</ul>' +
		'</div>' +
		'<div id="tray" style="height: 124px; width: 760px;">' +
		  '<div class="clear"></div>' +
		  '<div id="gray">' +
		    '<ul>' +
		      '<li id="BackspaceButton" style="width: 251px;" onclick="changenumpadTimerValue(\'del\');"><div class="popup_icon_delete" style=" margin-left: 105px;"></div></li>' +
		 	  '<li id="ResetValButton" style="width: 252px;" onclick="resetnumpadTimerValue();"><div class="popup_icon_reset" style=" margin-left: 105px;"></div></li>' +
		      '<li id="CheckButton" style="width: 251px;" onclick="closeNumpadTimer();"><div class="popup_icon_ok" style=" margin-left: 105px;"></div></li>' +
		    '</ul>' +
		  '</div>' +
		  '<div id="blue"> </div>' +
		'</div>' +
		'<div id="PopupArrowDown" style="margin-top: 6px; padding-left: 0px; position: absolute; display: none;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAANCAYAAABcrsXuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MjhGRUZFNDg2MzExRTJCNTYxODhBMDEzMUJDMzVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU1MjhGRUZGNDg2MzExRTJCNTYxODhBMDEzMUJDMzVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTUyOEZFRkM0ODYzMTFFMkI1NjE4OEEwMTMxQkMzNUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTUyOEZFRkQ0ODYzMTFFMkI1NjE4OEEwMTMxQkMzNUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5lMsq2AAAAZUlEQVR42rSUSQrAIBAEu3x4XpPP+KqYixBCjNu0MOCtxl7kOPMl80n3YGaQ6sUFqC+RCcRTLhlAvD1RMIgv4xUIopUuBYH4i7ACQPR6ok0QI2Xc2ZTRxq9qzsy3smLuVCiKAAMAa2gDHN9KacgAAAAASUVORK5CYII=" alt="" draggable="false" /></div>' +
	'</div>';

	return htmlNumpadPad;
}


function setPositionNumpadTimer(tagId){
	var widthContainer = $('#' + tagId).outerWidth();
	var heightContainer = $('#' + tagId).outerHeight();
	var numpadHeight = 140;
	var numpadTop = 0;
	var documentWidthOffset = $('body').offset().left + 30; 

	var offsetContainer = $('#' + tagId).offset();

	if(offsetContainer.top > 240){
		numpadTop = offsetContainer.top - numpadHeight;
		$('#PopupArrowDown').show();
		$('#PopupArrowDown').css({'padding-left': (offsetContainer.left + (widthContainer/2) - documentWidthOffset) + 'px'});
	}
	else{
		numpadTop = offsetContainer.top + heightContainer;
		$('#PopupArrowUp').show();
		$('#PopupArrowUp').css({'padding-left': (offsetContainer.left + (widthContainer/2) - documentWidthOffset) + 'px'});
	}

	$('#Pop_Up').css({'top': numpadTop + 'px'});
}


function closeNumpadTimer(){
	while(numpadTimerValue.length < 10){
		changenumpadTimerValue("0");
	}

	hideHTML('Pop_Up_Blocker');

	$('#' + numpadTimerTargetTagId).html(numpadTimerValue);
	submitSET(numpadTimerTargetTagId, numpadTimerValue);
	
	$('#Pop_Up_Outer').remove();
	g_isPopUp = false;
}


function changenumpadTimerValue(key){
	switch(key){
		case 'del':		if(numpadTimerValue.substr(numpadTimerValue.length-1, 1) == ":"){
							numpadTimerValue = numpadTimerValue.substr(0, numpadTimerValue.length -2);
						}else{
							numpadTimerValue = numpadTimerValue.substr(0, numpadTimerValue.length -1);
						}
						break;
		default:		strLength = numpadTimerValue.length;
						
						if(strLength < 3){

								numpadTimerValue += key;

						}else
						if((strLength == (3+2)) || (strLength == (6+2))){
							if(key < (6+2)){
								numpadTimerValue += key;
							}
						}
						else if (strLength < (8+2)){
							if(strLength < (6+2)){
								numpadTimerValue += key + ":" ;
							}
							else{
								numpadTimerValue += key;
							}
						}
						break;
	}

	$('#'+ numpadTimerTargetTagId).html(numpadTimerValue);
	setNoEdit();
}


function setNoEdit(){
	for(var i = 0; i < 10; i++){
		$('li#NumpadNum' + i).removeClass("no_edit");
	}

	strLength = numpadTimerValue.length;





	if((strLength == (3+2)) || (strLength == (6+2))){
		for(var i = 6; i < 10; i++){
			$('li#NumpadNum' + i).addClass("no_edit");
		}
	}
}


function resetnumpadTimerValue(){
	numpadTimerValue = numpadTimerPreValue;
	$('#' + numpadTimerTargetTagId).html(numpadTimerValue);
	setNoEdit();
}



function setHeaderMaxWidth2(){
	var pageNameWidth = document.getElementById('HeaderSpecial').offsetWidth;
	var subDivWidth = (506 - pageNameWidth)/2;
	setCSS('Sound_Mode_Name', 'maxWidth', subDivWidth + 'px');
	setCSS('Model_Name', 'maxWidth', subDivWidth + 'px');
}
