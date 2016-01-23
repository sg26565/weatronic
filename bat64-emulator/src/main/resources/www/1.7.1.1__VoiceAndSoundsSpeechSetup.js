


var g_GET_Parameter = get_GET_Parameter();
var g_ModeIndices = g_GET_Parameter.SetupIndices.split("___");
var g_ModeIndex = parseInt(g_ModeIndices[0], 10);
var g_ItemIndex = parseInt(g_ModeIndices[1], 10);


var g_List_PopupListObj = {};
var g_toggleSpeakStatus = {};
var g_toggleSpeakUnitkStatus = {};
var g_toggleSpeakValueStatus = {};
var g_telemetryItemId = -1;

initPage();

function initPage(){

	InitDataPostArgs = getPopupObj(InitDataPostArgs, "AnnouncementRepetionRate");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "AudioFileChoice");
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);

	InitDataPostArgsExtended = new Object();
	GetTd(getAnnouncementObject(InitDataPostArgsExtended, g_ModeIndex), g_InitEvent, "get");


	setInterval(JsonFunction, 250);
}



function getAnnouncementObject(InitDataPostArgsExtended, index){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	cmd = "get";
	ModelName = "model-settings";
	ListType = "SoundMode";

	announcement = new Object();
	announcement.Index = -1;
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
	announcement.AudioItem = audioItem;
		repetionRate = new Object();
		repetionRate.Index = -1;
		repetionRate.Name = "";
	announcement.RepetionRate = repetionRate;

	announcements = new Array(announcement);

	InitDataPostArgsExtended[cmd] = {};
	InitDataPostArgsExtended[cmd][ModelName] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType]["Items"] = "Single";
	InitDataPostArgsExtended[cmd][ModelName][ListType]["Index"] = index;
	InitDataPostArgsExtended[cmd][ModelName][ListType]["Name"] = "";
	InitDataPostArgsExtended[cmd][ModelName][ListType]["Announcements"] = announcements;

	return InitDataPostArgsExtended;
}



function onEVENT_INIT(e){
	try{
		setHeaderMaxWidth2();

		if(typeof e.EventData.get == "undefined"){
			setHTML('Model_Name', e.EventData.ModelName);

			$('#Navi_Button').removeAttr("href");
			$('#Navi_Button').bind("click", function(){window.location.href = '1.7.1__VoiceAndSoundsSpeech.html?SetupModeIndex=' + g_ModeIndex + '&VoiceAndSoundSpeechIndex=' + g_ItemIndex;});

			g_List_PopupListObj["AnnouncementRepetionRate"] = e.EventData.PopUp.AnnouncementRepetionRate;
			g_List_PopupListObj["AudioFileChoice"] = e.EventData.PopUp.AudioFileChoice;
		}
		else{
			setHTML("Sound_Mode_Name", e.EventData.get.SoundMode.Name);
			var i = 0;
			

			g_List_Indices = new Array ();
			g_List_Count = e.EventData.get.SoundMode.Announcements.length;

			var arrayIndex = 0;

			for(i = 0; i < g_List_Count; i++){
				if(g_ItemIndex == e.EventData.get.SoundMode.Announcements[i].Index){
					arrayIndex = i;
				}
			}

			Index   = e.EventData.get.SoundMode.Announcements[arrayIndex].Index;
			setHTML('VoiceSoundsSetup_Item', e.EventData.get.SoundMode.Announcements[arrayIndex].AudioItem.TelemetryIDInfo.Name);
			setHTML('VoiceSoundsSetup_File', e.EventData.get.SoundMode.Announcements[arrayIndex].AudioItem.AudioFile.Name);
			isSpeak = e.EventData.get.SoundMode.Announcements[arrayIndex].AudioItem.IsTDNameToSpeak.Index;
			setHTML('VoiceSoundsSetup_Announcement', e.EventData.get.SoundMode.Announcements[arrayIndex].RepetionRate.Name);
			isSpeakUnit = e.EventData.get.SoundMode.Announcements[arrayIndex].AudioItem.IsUnitSpoken.Index;
			isValueUnit = e.EventData.get.SoundMode.Announcements[arrayIndex].AudioItem.IsValueSpoken.Index;
			g_telemetryItemId = e.EventData.get.SoundMode.Announcements[arrayIndex].AudioItem.TelemetryIDInfo.ID;

			g_toggleSpeakStatus = isSpeak;

			if(isSpeak == 1){
				toggleSpeakStatus(true);
			}

			g_toggleSpeakUnitkStatus = isSpeakUnit;

			if(isSpeakUnit == 1){
				toggleSpeakUnitStatus(true);
			}

			g_toggleSpeakValueStatus = isValueUnit;

			if(isValueUnit == 1){
				toggleSpeakValueStatus(true);
			}

			telemetryObj = new Object();
			telemetryObj.ID = g_telemetryItemId;
			telemetryObj.Value = 0;
			telemetryObj.ValueStr = "";

			telemetryIds.push(telemetryObj);

			
			$('#VoiceSoundsSetup_Speak').bind("click", function(){toggleSpeakStatus(false, Index, "VoiceSoundsSetup_Speak");});
			$('#VoiceSoundsSetup_SpeakUnit').bind("click", function(){toggleSpeakUnitStatus(false, Index, "VoiceSoundsSetup_SpeakUnit");});
			$('#VoiceSoundsSetup_SpeakValue').bind("click", function(){toggleSpeakValueStatus(false, Index, "VoiceSoundsSetup_SpeakValue");});

			g_popupList_Indices["VoiceSoundsSetup_Announcement"] = e.EventData.get.SoundMode.Announcements[arrayIndex].RepetionRate.Index;
			$('#VoiceSoundsSetup_Announcement').bind("click", function(){showPopupList(this, g_List_PopupListObj["AnnouncementRepetionRate"], false, true, g_popupList_Indices);});

			g_popupList_Indices["VoiceSoundsSetup_File"] = e.EventData.get.SoundMode.Announcements[arrayIndex].AudioItem.AudioFile.Index;
			$('#VoiceSoundsSetup_File').bind("click", function(){showPopupList(this, g_List_PopupListObj["AudioFileChoice"], false, true, g_popupList_Indices);});
			
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
	path="www";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"SoundMode":{"Announcements":{"Object":{"AudioItem":{"AudioFile":"' + path + '"}},"Index":' + modeIndex + '}, "Index":' + itemIndex + '}}}}');

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


function getAttrObj(tagId, value, index){
	Attribute = new Object();

	if(tagId == "VoiceSoundsSetup_Announcement"){
		Attribute["RepetionRate"] = {};
		Attribute["RepetionRate"] = value;

		return Attribute;
	}

	if(tagId == "VoiceSoundsSetup_Speak"){
		Attribute["AudioItem"] = {};
		Attribute["AudioItem"]["IsTDNameToSpeak"] = {};
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
			Attribute["AudioItem"]["AudioFile"] = {};
			Attribute["AudioItem"]["AudioFile"] = "";
		}

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
	xmlObj[cmd][ModelName][ListType]["Announcements"] = {};
	xmlObj[cmd][ModelName][ListType]["Announcements"]["Object"] = Attr;
	xmlObj[cmd][ModelName][ListType]["Announcements"]["Index"] = Index;

	GetTd(xmlObj, g_SetEvent, cmd);
}


function setHeaderMaxWidth2(){
	var pageNameWidth = document.getElementById('HeaderSpecial').offsetWidth;
	var subDivWidth = (506 - pageNameWidth)/2;
	setCSS('Sound_Mode_Name', 'maxWidth', subDivWidth + 'px');
	setCSS('Model_Name', 'maxWidth', subDivWidth + 'px');
}
