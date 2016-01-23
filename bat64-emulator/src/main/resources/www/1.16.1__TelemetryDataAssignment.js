


var g_GET_Parameter = get_GET_Parameter();
var g_pageType      = g_GET_Parameter.PageType;

var g_pageState          = g_GET_Parameter.PageState;
var g_TelemetryPageState = g_GET_Parameter.TelemetryPageState;
var g_TemplateIndex      = g_GET_Parameter.TemplateIndex;
var g_FieldIndex         = g_GET_Parameter.FieldIndex;

var g_ModeIndex = g_GET_Parameter.ModeIndex;
var g_Item      = g_GET_Parameter.Item;

initPage();

function initPage(){
	if((typeof g_pageState != "undefined") && (typeof g_TelemetryPageState != "undefined")){
		$('#Navi_Button').removeAttr("href");
		$('#Navi_Button').bind("click", function(){
			
			submitSET("noTag__0xFF", 0xFFFF);
		});
	}
	if(typeof g_ModeIndex != "undefined"){
		$('#Navi_Button').removeAttr("href");
		$('#Navi_Button').bind("click", function(){
			if(g_pageType == "Announcement"){
				window.location.href = "1.7.1__VoiceAndSoundsSpeech.html?SetupModeIndex=" + g_ModeIndex;
			}

			if(g_pageType == "Alerts"){
				window.location.href = "1.7.2__VoiceAndSoundsAlerts.html?SetupModeIndex=" + g_ModeIndex;
			}
			
			if(g_pageType == "StartupWarnings"){
				window.location.href = "1.18.0__StartupWarnings.html?StartupWarningsIndex=" + g_ModeIndex;
			}

		});
		
		if(g_pageType == "StartupWarnings"){
			hideHTML('Button_Category__15');
			hideHTML('Category__15');
			hideHTML('Button_Category__19');
			hideHTML('Category__19');
		}
	}


	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_Tx");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_Rx Main");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_Function");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_Servo");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_Vario");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_GPS");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_Timer");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_Timer last lap");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_Mux-Box-1");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_Mux-Box-2");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_Mux-Box-3");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_Mux-Box-4");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_Rx Sub1");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_Rx Sub2");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_Sequencer");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_External-1");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_External-2");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_External-3");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TelemetryScreen_External-4");
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);


	setInterval(JsonFunction, 250);
}



function onEVENT_INIT(e){
	try{
		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);

		
		g_popupList_Indices["Category__1"] = -1; 
		$('#Category__1').bind("click", function(){showPopupList(this,e.EventData.PopUp.TelemetryScreen_Tx, false, true, g_popupList_Indices);});

		g_popupList_Indices["Category__2"] = -1; 
		$('#Category__2').bind("click", function(){showPopupList(this,e.EventData.PopUp["TelemetryScreen_Rx Main"], false, true, g_popupList_Indices);});

		g_popupList_Indices["Category__3"] = -1; 
		$('#Category__3').bind("click", function(){showPopupList(this,e.EventData.PopUp.TelemetryScreen_Function, false, true, g_popupList_Indices);});

		g_popupList_Indices["Category__4"] = -1; 
		$('#Category__4').bind("click", function(){showPopupList(this,e.EventData.PopUp.TelemetryScreen_Servo, false, true, g_popupList_Indices);});

		g_popupList_Indices["Category__5"] = -1; 
		$('#Category__5').bind("click", function(){showPopupList(this,e.EventData.PopUp.TelemetryScreen_Vario, false, true, g_popupList_Indices);});

		g_popupList_Indices["Category__6"] = -1; 
		$('#Category__6').bind("click", function(){showPopupList(this,e.EventData.PopUp.TelemetryScreen_GPS, false, true, g_popupList_Indices);});

		g_popupList_Indices["Category__7"] = -1; 
		$('#Category__7').bind("click", function(){showPopupList(this,e.EventData.PopUp["TelemetryScreen_Mux-Box-1"], false, true, g_popupList_Indices);});

		g_popupList_Indices["Category__8"] = -1; 
		$('#Category__8').bind("click", function(){showPopupList(this,e.EventData.PopUp["TelemetryScreen_Mux-Box-2"], false, true, g_popupList_Indices);});

		g_popupList_Indices["Category__9"] = -1; 
		$('#Category__9').bind("click", function(){showPopupList(this,e.EventData.PopUp["TelemetryScreen_Mux-Box-3"], false, true, g_popupList_Indices);});

		g_popupList_Indices["Category__10"] = -1; 
		$('#Category__10').bind("click", function(){showPopupList(this,e.EventData.PopUp["TelemetryScreen_Mux-Box-4"], false, true, g_popupList_Indices);});

		g_popupList_Indices["Category__15"] = -1; 
		$('#Category__15').bind("click", function(){showPopupList(this,e.EventData.PopUp["TelemetryScreen_Timer"], false, true, g_popupList_Indices);});

		g_popupList_Indices["Category__16"] = -1; 
		$('#Category__16').bind("click", function(){showPopupList(this,e.EventData.PopUp["TelemetryScreen_Timer last lap"], false, true, g_popupList_Indices);});

		g_popupList_Indices["Category__17"] = -1; 
		$('#Category__17').bind("click", function(){showPopupList(this,e.EventData.PopUp["TelemetryScreen_Rx Sub1"], false, true, g_popupList_Indices);});

		g_popupList_Indices["Category__18"] = -1; 
		$('#Category__18').bind("click", function(){showPopupList(this,e.EventData.PopUp["TelemetryScreen_Rx Sub2"], false, true, g_popupList_Indices);});

		g_popupList_Indices["Category__19"] = -1; 
		$('#Category__19').bind("click", function(){showPopupList(this,e.EventData.PopUp["TelemetryScreen_Sequencer"], false, true, g_popupList_Indices);});
		











	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "set"){
			if(g_pageType == "ScreenAdjustment"){
				window.location.href = "1.16.0__ScreenAdjustment.html?PageState=" + g_pageState + "&TelemetryPageState=" + g_TelemetryPageState;
			}

			if(g_pageType == "Announcement"){
				window.location.href = "1.7.1__VoiceAndSoundsSpeech.html?SetupModeIndex=" + g_ModeIndex;
			}

			if(g_pageType == "Alerts"){
				window.location.href = "1.7.2__VoiceAndSoundsAlerts.html?SetupModeIndex=" + g_ModeIndex;
			}
			
			if(g_pageType == "StartupWarnings"){
				window.location.href = "1.18.0__StartupWarnings.html?StartupWarningsIndex=" + g_ModeIndex;
			}
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}


function submitSET(tagId, value){
	if(!isNaN(value)){
		category = tagId.split('__')[1];

		var xmlObj = new Object();

		ModelName = "model-settings";
		cmd = "set";

		xmlObj = {};
		xmlObj[cmd] = {};
		xmlObj[cmd][ModelName] = {};

		if(g_pageType == "ScreenAdjustment"){
			if(g_pageState == "homescreen"){
				
				ListType = "HomeScreenAdjustment";
			}
			else{
				Index = parseInt(g_TelemetryPageState);
				ListType = "TelemetryScreenAdjustment";
			}

			xmlObj[cmd][ModelName][ListType] = {};

			if(g_pageState != "homescreen"){
				xmlObj[cmd][ModelName][ListType]["Index"] = Index;
			}

			xmlObj[cmd][ModelName][ListType]["TelemetryIds"] = {};

			telemetryIdsObj = new Object();
			telemetryIdsObj.Index = parseInt(value);
			telemetryIdsObj.Category = parseInt(category);
			telemetryIdsObj.Pos = parseInt(g_FieldIndex);
			telemetryIdsArray = new Array(telemetryIdsObj);

			xmlObj[cmd][ModelName][ListType]["TelemetryIds"] = telemetryIdsArray;
		}
		else if((g_pageType == "Announcement") || (g_pageType == "Alerts")){
			if(g_pageType == "Announcement"){
				voiceAndSound = "Announcements";
			}
			else if(g_pageType == "Alerts"){
				voiceAndSound = "Alerts";
			}

			ListType = "SoundMode";
			xmlObj[cmd][ModelName][ListType] = {};
			xmlObj[cmd][ModelName][ListType]["Index"] = parseInt(g_ModeIndex);
			xmlObj[cmd][ModelName][ListType][voiceAndSound] = {};
			xmlObj[cmd][ModelName][ListType][voiceAndSound]["Index"] = parseInt(g_Item);
			xmlObj[cmd][ModelName][ListType][voiceAndSound]["Object"] = {};
			xmlObj[cmd][ModelName][ListType][voiceAndSound]["Object"]["AudioItem"] = {};
			xmlObj[cmd][ModelName][ListType][voiceAndSound]["Object"]["AudioItem"]["TelemetryIDInfo"] = {};
			xmlObj[cmd][ModelName][ListType][voiceAndSound]["Object"]["AudioItem"]["TelemetryIDInfo"]["ID"] = parseInt(value);
			xmlObj[cmd][ModelName][ListType][voiceAndSound]["Object"]["AudioItem"]["TelemetryIDInfo"]["Category"] = parseInt(category);
		}
		else if(g_pageType == "StartupWarnings"){
			
			ListType = "StartupWarnings";
			xmlObj[cmd][ModelName][ListType] = {};
			xmlObj[cmd][ModelName][ListType]["Warnings"] = {};
			xmlObj[cmd][ModelName][ListType]["Warnings"]["Index"] = parseInt(g_ModeIndex);
			xmlObj[cmd][ModelName][ListType]["Warnings"]["Object"] = {};
			xmlObj[cmd][ModelName][ListType]["Warnings"]["Object"]["ID"] = parseInt(value);
			xmlObj[cmd][ModelName][ListType]["Warnings"]["Object"]["Category"] = parseInt(category);
		}
		
		GetTd(xmlObj, g_SetEvent, cmd);
	}
}
