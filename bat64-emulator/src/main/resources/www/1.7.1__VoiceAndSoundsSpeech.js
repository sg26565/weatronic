


var g_GET_Parameter = get_GET_Parameter();
var g_ModeIndex = parseInt((g_GET_Parameter.SetupModeIndex), 10);
var g_VoiceAndSoundSpeechIndex 	= g_GET_Parameter.VoiceAndSoundSpeechIndex;
var g_scrollIndex = 0;

var g_List_Count = 0;			
var g_List_Indices = [];		
var toggleStateARD = "normal";	

var g_List_PopupListObj = [];
var g_toggleSpeakStatus = [];

initPage();

function initPage(){
	
	initScrollbars('List_Container');
	



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








	announcement.AudioItem = audioItem;




	
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
			
			
			
			$('#Add_Button').bind("click", function(){AddItem(1);});
			$('#Reorder_Button').bind("click", function(){toggleReorder();});
			$('#Delete_Button').bind("click", function(){toggleDelete();});
			$('#Navi_Button').removeAttr("href");
			$('#Navi_Button').bind("click", function(){toggleARD('1.7.0__VoiceAndSounds.html?VoiceAndSoundIndex=' + g_ModeIndex);});



		}
		else{
			setHTML("Sound_Mode_Name", e.EventData.get.SoundMode.Name);
			var i = 0;
			var htmlOuterContainer = "";
			
			g_List_Indices = new Array ();
			g_List_Count = e.EventData.get.SoundMode.Announcements.length;
									
			for(i = 0; i < g_List_Count; i++){
				g_List_Indices[i] = e.EventData.get.SoundMode.Announcements[i].Index;
				htmlOuterContainer += getRowRD(g_List_Indices[i], e.EventData.get.SoundMode.Announcements[i].AudioItem.TelemetryIDInfo.Name, 'Sprachansage', g_List_Indices[i]);
				
				if(g_List_Indices[i] == g_VoiceAndSoundSpeechIndex){
					g_scrollIndex = i;
				}
			}	
			
			
			setHTML("scrollContainerInnerVertical", htmlOuterContainer);

			for(i = 0; i < g_List_Count; i++){
				Index          	= e.EventData.get.SoundMode.Announcements[i].Index;
				Item		   	= e.EventData.get.SoundMode.Announcements[i].AudioItem.TelemetryIDInfo.Name;

				telemetryID	   	= e.EventData.get.SoundMode.Announcements[i].AudioItem.TelemetryIDInfo.ID;


							
				
				setHTML("Container_" + Index, getRowOfAnnouncementList(Index, Item, telemetryID));
				




				
				telemetryObj = new Object();
				telemetryObj.ID = telemetryID;
				telemetryObj.Value = 0;
				telemetryObj.ValueStr = "";
				 	
				telemetryIds.push(telemetryObj);
				






				
			}
			if(typeof g_VoiceAndSoundSpeechIndex != "undefined"){
				 ScrollToRefresh(70, g_scrollIndex);
			}
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "telemetry"){
		setHTML(key,valueStr);
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


function getRowOfAnnouncementList(Index, Item, telemetryID){
	classSetupNoEdit = "";

	if(telemetryID == 65535){
		classSetupNoEdit = "no_edit";
	}
	
	var htmlInnerContainer = '' +
								'<div  id="Announcement__' + Index + '_ID" class="list_voicesoundssetup_item" onClick=\'window.location.href="1.16.1__TelemetryDataAssignment.html?PageType=Announcement&ModeIndex=' + g_ModeIndex + '&Item=' + Index + '"\'>' + Item + '</div>' +






								'<div id="' + telemetryID + '" class="list_voicesoundssetup_live">-.-</div>' +

								'<div class="list_voicesoundssetup_setup ' + classSetupNoEdit + '">' +
								'<a href="1.7.1.1__VoiceAndSoundsSpeechSetup.html?SetupIndices=' + g_ModeIndex + '___' + Index + '" draggable="false">' +
									
									'<img width="55" height="50" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAyCAYAAAD4FkP1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk5ODdDOUEwMTBDMjExRTJCOEZFRjg1RERBQjE5MTAyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk5ODdDOUExMTBDMjExRTJCOEZFRjg1RERBQjE5MTAyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTk4N0M5OUUxMEMyMTFFMkI4RkVGODVEREFCMTkxMDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4N0M5OUYxMEMyMTFFMkI4RkVGODVEREFCMTkxMDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6JCBspAAALeklEQVR42sxaCVCT2R0n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" alt="" draggable="false">' +
								'</a>' +
							'</div>';
	
	return htmlInnerContainer;
}



function getSavePath(modeIndex, itemIndex){
	cmd = "set";
	ModelName = "model-settings";
	path = "www";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"SoundMode":{"Announcements":{"Object":{"AudioItem":{"AudioFile":"' + path + '"}},"Index":' + modeIndex + '}, "Index":' + itemIndex + '}}}}'); 

	return str;
}











		







































function getPathObj(cmd, ModelName){
	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};

	return xmlObj;
}


























function submitARD(cmd, num){
	ModelName = "model-settings";
	ListType = "SoundMode";

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType]["Index"] = g_ModeIndex;
	xmlObj[cmd][ModelName][ListType]["Announcement"] = num;

	GetTd(xmlObj, g_SetEvent, cmd);
}


function AddItem(count){
	submitARD("add", count);
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
	$("#ContainerOuter_" + index).remove();
		
	submitARD("remove", index);
	
	newIndices = [];
	var j = 0;
	
	for(var i = 0; i < g_List_Count; i++){
		if(g_List_Indices[i] != index){
			newIndices[j] = g_List_Indices[i];
			j++;
		}
	}

	g_List_Count--;
	g_List_Indices = newIndices;

	if(g_List_Count == 0){
		toggleARD("normal");
	}

	ScrollDownRefresh();
}


function toggleReorder(){
	hideHTML("ARD_Buttons");
	setCSS("List_Container", "width", "778px");
	setCSS("scrollContainerInnerVertical", "width", "778px");

	for(var i = 1; i < g_List_Count; i++)
		showHTML("Reorder_Button_" + g_List_Indices[i]);

	toggleStateARD = "reorder";
}


function raiseElement(Index){
	location.reload();
}


function toggleARD(link){
	if(toggleStateARD == "normal"){
		window.location.href = link;
	}
	else if(toggleStateARD == "delete"){
		for(var i = 0; i < g_List_Count; i++)
			hideHTML("Delete_Button_" + g_List_Indices[i]);

		setCSS("List_Container", "width", "674px");
		setCSS("scrollContainerInnerVertical", "width", "674px");
		showHTML("ARD_Buttons");
		toggleStateARD = "normal";	
	}
	else if(toggleStateARD == "reorder"){
		for(var i = 1; i < g_List_Count; i++)
			$("#Reorder_Button_" + g_List_Indices[i]).hide();

		setCSS("List_Container", "width", "674px");
		setCSS("scrollContainerInnerVertical", "width", "674px");
		showHTML("ARD_Buttons");
		toggleStateARD = "normal";		
	}
}


function createAddItem(TdJson){
	log(2, "success ADD: " + JSON.stringify(TdJson));
	
	var Index          	= TdJson.add.Announcement.Index;




















	window.location.href="1.16.1__TelemetryDataAssignment.html?PageType=Announcement&ModeIndex=" + g_ModeIndex + "&Item=" + Index;
}


function setHeaderMaxWidth2(){
	var pageNameWidth = document.getElementById('HeaderSpecial').offsetWidth;
	var subDivWidth = (506 - pageNameWidth)/2;
	setCSS('Sound_Mode_Name', 'maxWidth', subDivWidth + 'px');
	setCSS('Model_Name', 'maxWidth', subDivWidth + 'px');
}
