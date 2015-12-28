



var g_GET_Parameter = get_GET_Parameter();
var g_VoiceAndSoundIndex = g_GET_Parameter.VoiceAndSoundIndex;
var g_scrollIndex = 0;

var g_List_Count = 0;			
var g_List_Indices = {};		
var toggleStateARD = "normal";	

var g_List_PopupListObj = {};

var g_TriggerState = [];
initPage();

function initPage(){

	initScrollbars('List_Container');
	

	InitDataPostArgs = getPopupObj(InitDataPostArgs, "SoundModeLVarioActivity");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "AudioFileChoice");
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);

	InitDataPostArgsExtended = new Object();
	GetTd(getSoundConfigObject(InitDataPostArgsExtended), g_InitEvent, "get");


	g_isAdditionalControlObjectUsed = true;
	TdPostArgs = getCurrentSoundModeObject(TdPostArgs);
	setInterval(JsonFunction, 250);
}



function getSoundConfigObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	cmd = "get";
	ModelName = "model-settings";
	ListType = "SoundMode";

	Item = new Object();
	Item.Index = -1;
	Item.Name = "";
		islinkVario = new Object();
		islinkVario.Index = -1;
		islinkVario.Name = "";
	Item.IsLinkVarioActive = islinkVario;
		audiFile= new Object();
		audiFile.Index = -1;
		audiFile.Name = "";
	Item.AudioFile = audiFile;
		control = new Object();
		control.Control = -1;
		control.Trigger = -1;
	Item.Switch = control;

	modeItem = new Array(Item);

	InitDataPostArgsExtended[cmd] = {};
	InitDataPostArgsExtended[cmd][ModelName] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType]["Items"] = "ALL";
	InitDataPostArgsExtended[cmd][ModelName][ListType]["Item"] = modeItem;
	InitDataPostArgsExtended[cmd][ModelName]["SortIndeces"] = {};
	InitDataPostArgsExtended[cmd][ModelName]["SortIndeces"]["SoundModes"] = [];

	return InitDataPostArgsExtended;
}


function getCurrentSoundModeObject(TdPostArgs){
	if(typeof TdPostArgs == "undefined"){
		TdPostArgs = new Object();
	}

	soundMode = new Object();
		current = new Object();
		current.State = [];
	soundMode.Current = current;

	TdPostArgs.SoundMode = soundMode;

	return TdPostArgs;
}



function onEVENT_INIT(e){
	try{
		if(typeof e.EventData.get == "undefined"){
			checkHTMLHeader('Model_Name');
			setHTML('Model_Name', e.EventData.ModelName);

			
			
			$('#Add_Button').bind("click", function(){AddItem(1);});
			$('#Reorder_Button').bind("click", function(){toggleReorder();});
			$('#Delete_Button').bind("click", function(){toggleDelete();});
			$('#Navi_Button').removeAttr("href");
			$('#Navi_Button').bind("click", function(){toggleARD('1.0.0__ModelSettings.html');});

			g_List_PopupListObj["SoundModeLVarioActivity"] = e.EventData.PopUp.SoundModeLVarioActivity;
			g_List_PopupListObj["AudioFileChoice"] = e.EventData.PopUp.AudioFileChoice;
		}
		else{
			var i = 0;
			var htmlOuterContainer = "";

			g_List_Indices = e.EventData.get.SortIndeces.SoundModes;
			g_List_Count = g_List_Indices.length;

			for(i = 0; i < g_List_Count; i++){
				var Name = "";
				var Index = g_List_Indices[i];
				for(var j = 0; j < g_List_Count; j++){
					if(Index == e.EventData.get.SoundMode.Item[j].Index){
						Name = e.EventData.get.SoundMode.Item[j].Name;
						break;
					}
				}
				htmlOuterContainer += getRowRD(Index, Name, 'Modus', i);
				
				if(Index == g_VoiceAndSoundIndex){
					g_scrollIndex = i;
				}
			}

			
			setHTML("scrollContainerInnerVertical", htmlOuterContainer);

			for(i = 0; i < g_List_Count; i++){
				Index       = e.EventData.get.SoundMode.Item[i].Index;
				Mode		= e.EventData.get.SoundMode.Item[i].Name;
				File        = e.EventData.get.SoundMode.Item[i].AudioFile.Name;
				ModeControl	= e.EventData.get.SoundMode.Item[i].Switch.Control;
				ModeTrigger = triggerPercent2Uint8(e.EventData.get.SoundMode.Item[i].Switch.Trigger);
				isVario     = e.EventData.get.SoundMode.Item[i].IsLinkVarioActive.Name;

				
				setHTML("Container_" + Index, getRowOfModesList(Index, Mode, File, isVario, ModeControl, ModeTrigger, getControlAssignmentPath(ModeControl, ModeTrigger, Index)));

				control2image("VoiceSounds_Control_" + Index, ModeControl);
				setTriggerState("VoiceSounds_Trigger_" + Index, ModeTrigger);
				trigger2image("VoiceSounds_Trigger_" + Index, 0);

				
				g_popupList_Indices["VoiceSounds__" + Index + "_IsLinkVarioActive"] = e.EventData.get.SoundMode.Item[i].IsLinkVarioActive.Index;
				$('#VoiceSounds__' + Index + '_IsLinkVarioActive').bind("click", function(){showPopupList(this, g_List_PopupListObj["SoundModeLVarioActivity"], false, true, g_popupList_Indices);});

				g_popupList_Indices["VoiceSounds__" + Index + "_AudioFile"] = e.EventData.get.SoundMode.Item[i].AudioFile.Index;
				$('#VoiceSounds__' + Index + '_AudioFile').bind("click", function(){showPopupList(this, g_List_PopupListObj["AudioFileChoice"], false, true, g_popupList_Indices);});
				
			}

			
			if(typeof g_VoiceAndSoundIndex != "undefined"){
				 ScrollToRefresh(70, g_scrollIndex);
			}
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	if(cmd == "AdditionalControlObject"){
		for(var i = 0; i < g_List_Count; i++){
			if(e.EventData.SoundMode.Current.State[g_List_Indices[i]] == 1){
				$('#Container_' + g_List_Indices[i]).addClass("active_modi");
			}
			else{
					$('#Container_' + g_List_Indices[i]).removeClass("active_modi");
			}
			
		}
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


function getSavePath(modeIndex){
	cmd = "set";
	ModelName = "model-settings";
	path = "www";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"SoundMode":{"AudioFile":"' + path + '","Index":' + modeIndex + '}}}}');

	return str;
}

function gotoControlAssignment(Index, ModeControl, ModeTrigger, ModeControlObj){
	window.location.href="9.1.0__ControlAssignment.html?PageId=10&FromName=" + encodeURIComponent('Sprache & Töne') + "&FromNameSub=" + document.getElementById("VoiceSounds__" + Index + "_Mode").innerHTML + "&ControlId=" + ModeControl + "&ControlTrigger=" + ModeTrigger + "&ControlNode=Control&ControlNodeTrigger=Trigger&ControlPath=" + ModeControlObj + "&LastURL=1.7.0__VoiceAndSounds.html?VoiceAndSoundIndex=" + Index;
}

function getControlAssignmentPath(control, trigger, Index){
	cmd = "set";
	ModelName = "model-settings";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"SoundMode":{"Switch":{"Control":' + control + ',"Trigger":' + trigger +'},"Index":' + Index + '}}}}');

	return str;
}


function trigger2image(id, state){


	$('#' + id).addClass(g_TriggerState[id][0]);
}


function setTriggerState(tagId, trigger){
	var triggerArray = new Array();

	switch(trigger){
		case	 -204:		triggerArray[0] = "icon_trigger_center";
							triggerArray[1] = "icon_trigger_center";
							break;
		case 	  512:  	triggerArray[0] = "icon_trigger_p25_white";
							triggerArray[1] = "icon_trigger_p25_blue";
							break;
		case 	 -512:  	triggerArray[0] = "icon_trigger_m25_white";
							triggerArray[1] = "icon_trigger_m25_blue";
							break;
		case 	  1536:		triggerArray[0] = "icon_trigger_p75_white";
							triggerArray[1] = "icon_trigger_p75_blue";
							break;
		case 	 -1536:		triggerArray[0] = "icon_trigger_m75_white";
							triggerArray[1] = "icon_trigger_m75_blue";
							break;
		default:			triggerArray[0] = "icon_trigger_empty";
							triggerArray[1] = "icon_trigger_empty";
	}

	g_TriggerState[tagId] = triggerArray;
}

function triggerPercent2Uint8(trigger){
	switch(trigger){
		case "-10%": case "-10.0%": trigger = -204;	break;
		case "+25%": case "+25.0%": trigger =  512;	break;
		case "-25%": case "-25.0%": trigger = -512;	break;
		case "+75%": case "+75.0%":	trigger = 1536;	break;
		case "-75%": case "-75.0%":	trigger = -1536;break;
		default:					trigger = 0;
	}

	return trigger;
}


function getRowOfModesList(Index, Mode, File, isVario, ModeControl, ModeTrigger, ModeControlObj){
	var htmlInnerContainer = '' +
							'<div id="VoiceSounds__' + Index + '_Mode" class="list_voicesounds_mode" onClick=\'showKeypad("VoiceSounds__' + Index + '_Mode");\'>' + Mode + '</div>' +
							'<div id="VoiceSounds__' + Index + '_AudioFile" class="list_voicesounds_file">' + File + '</div>' +
							'<div id="VoiceSounds__' + Index + '_IsLinkVarioActive" class="list_voicesounds_vario">' + isVario +
								'<!-- <div id="VoiceSounds_General_Vario_Enable" class="background" style="width: 40px; height: 40px; border: 2px solid #fff; border-radius: 4px; padding:0px; margin: 12px 0px 0px 10px;">' +
									'<img id="VoiceSounds_General_Vario_Enable_Img" width="42" height="35" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAjCAYAAADizJiTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQUIxRDZCQTlCMEExMUUyQTcxMEEzNzJDMzE5ODFDMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQUIxRDZCOTlCMEExMUUyQTcxMEEzNzJDMzE5ODFDMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQkE3RDFEQUYyOUFFMjExQkY4NkRDQzBDNkQwODQ3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psw8DHIAAADdSURBVHja7NjrCoMwDAXg6fbcGWcv3lHYj9GbaTpPMvBAQaHgh61NcEsp3f4heyCLfEYzj0BIfN2/qhl56Z2HpDpSzouIbGKjIivsHmRP9nL33KOaN5kDz6U3IdlQM5IJXUKyoMtIBvQnyCOotCqEB3IElVE5YyN7UFXtZSJbUHXtZSJL6FTtZSJLKJQPEjaytfQW7OnI3sc0g6UgR8eTFktBHh34iILUlFBEQGprPbyRM00JPJGz3RO8kJY2Dx5Iaz8KNnKlcQYTmYf139Ozc31atuu34wUNnrcAAwCJ1ARaCuqr5QAAAABJRU5ErkJggg==" style="margin: 4px 0px 0px -1px; display: none;" draggable="false" />' +
								'</div>	-->' +
							'</div>' +

							'<div class="list_voicesounds_switch">' +
							'<div id="VoiceSounds_Trigger_' + Index + '" style="margin-top: 8px;"></div>' +
								'<a onClick=\'gotoControlAssignment("' + Index + '", "' + ModeControl + '", "' + ModeTrigger + '","' + ModeControlObj + '");\' draggable="false">' +
									'<img width="85" height="61" id="VoiceSounds_Control_' + Index + '" src="" draggable="false" alt=""/>' +
								'</a>' +
							'</div>' +

							'<div id="VoiceSounds_General_Setup_Sound" class="list_voicesounds_setup">' +
								'<a href="1.7.1__VoiceAndSoundsSpeech.html?SetupModeIndex=' + Index + '" draggable="false">' +
									'<img width="52" height="52" style="margin-left: 9px;" src="data:image/png;base64,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" alt="" draggable="false"/>' +
								'</a>' +
							'</div>' +
							'<div id="VoiceSounds_General_Setup_Alerts" class="list_voicesounds_setup">' +
								'<a href="1.7.2__VoiceAndSoundsAlerts.html?SetupModeIndex=' + Index +'" draggable="false">' +
									'<img width="52" height="52" src="data:image/png;base64,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" alt="" draggable="false"/>' +
								'</a>' +
							'</div>';

	return htmlInnerContainer;
}


function getAttrObj(tagId, value, index){
	Attribute = new Object();

	if(tagId == "Mode"){
		Attribute["Name"] = value;

		return Attribute;
	}

	if(tagId == "Vario"){
		Attribute["Vario"] = value;

		return Attribute;
	}

	if(tagId == "AudioFile"){
		if(value == 1){
			temp = getSavePath(index);
			window.location.href = "9.4.0__FileManager.html?IsManager=0&ManagementType=soundManagement&SavePathObj=" + temp + "&SearchKeyNode=AudioFile&LastURL=1.7.0__VoiceAndSounds.html?VoiceAndSoundIndex=" + index;
		}
		else{
			Attribute["AudioFile"] = "";
		}
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
	tagIdArray = tagId.split("__");
	cmd = "set";
	ModelName = "model-settings";
	ListType = tagIdArray[0];
	tagIdArray = tagIdArray[1].split("_");
	Index = parseInt(tagIdArray[0]);
	tagId = tagIdArray[1];
	ListType = "SoundMode";

	Attr = new Object();
	Attr = getAttrObj(tagId, value, Index);

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType] = Attr;
	xmlObj[cmd][ModelName][ListType]["Index"] = Index;
	xmlObj[cmd][ModelName][ListType][tagId] = value;

	GetTd(xmlObj, g_SetEvent, cmd);
}


function submitARD(cmd, num){
	ModelName = "model-settings";
	ListType = "SoundMode";

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = num;

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
	
	submitARD("remove", index);

	newIndices = [];
	var j = 0;
	var isDeleteIndexFound = false;

	for(var i = 0; i < g_List_Count; i++){
		
		if(isDeleteIndexFound){
			$('#ContainerOuter_' + i).attr('id', 'ContainerOuter_' + j);
		}
		
		if(g_List_Indices[i] != index){
			newIndices[j] = g_List_Indices[i];
			j++;
		}
		else{
			$("#ContainerOuter_" + i).remove();
			isDeleteIndexFound = true;
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

	for(var i = 0; i < g_List_Count; i++){
		if(i != 0){
			showHTML("Reorder_Button_Up_" + g_List_Indices[i]);
		}

		if(i != g_List_Count-1){
			showHTML("Reorder_Button_Down_" + g_List_Indices[i]);

			if(i == 0){
				setCSS("Reorder_Button_Down_" + g_List_Indices[i], "margin-left", "46px");
			}
		}
	}

	toggleStateARD = "reorder";
}


function moveElement(currentTag, isMoveUp){
	var Index = parseInt(currentTag.split('_')[1]);
	var currentId = g_List_Indices[Index];
	var currentContainer = $('#ContainerOuter_' + Index);

	if(isMoveUp){
		
		var targetIdPrev = currentContainer.prev().attr('id');
		currentContainer.insertBefore('#' + targetIdPrev);

		
		$('#' + targetIdPrev).attr('id', 'ContainerOuter_' + Index);
		currentContainer.attr('id', targetIdPrev);

		
		if(targetIdPrev == "ContainerOuter_0"){
			hideHTML("Reorder_Button_Up_" + g_List_Indices[Index]);
			showHTML("Reorder_Button_Up_" + g_List_Indices[Index - 1]);

			setCSS("Reorder_Button_Down_" + g_List_Indices[Index],     "margin-left", "46px");
			setCSS("Reorder_Button_Down_" + g_List_Indices[Index - 1], "margin-left",  "1px");
		}

		if(currentTag == "ContainerOuter_" + (g_List_Count - 1)){
			showHTML("Reorder_Button_Down_" + g_List_Indices[Index]);
			hideHTML("Reorder_Button_Down_" + g_List_Indices[Index - 1]);
		}

		
		g_List_Indices[Index] = g_List_Indices[Index - 1];
		g_List_Indices[Index - 1] = currentId;

		
	}
	else{
		var targetIdNext = currentContainer.next().attr('id');
		currentContainer.insertAfter('#' + targetIdNext);

		$('#' + targetIdNext).attr('id', 'ContainerOuter_' + Index);
		currentContainer.attr('id', targetIdNext);

		if(targetIdNext == "ContainerOuter_" + (g_List_Count - 1)){
			hideHTML("Reorder_Button_Down_" + g_List_Indices[Index]);
			showHTML("Reorder_Button_Down_" + g_List_Indices[Index + 1]);
		}

		if(currentTag == "ContainerOuter_0"){
			showHTML("Reorder_Button_Up_" + g_List_Indices[Index]);
			hideHTML("Reorder_Button_Up_" + g_List_Indices[Index + 1]);

			setCSS("Reorder_Button_Down_" + g_List_Indices[Index],     "margin-left",  "1px");
			setCSS("Reorder_Button_Down_" + g_List_Indices[Index + 1], "margin-left", "46px");
		}

		g_List_Indices[Index] = g_List_Indices[Index + 1];
		g_List_Indices[Index + 1] = currentId;

		
	}
	

	cmd = "set";
	ModelName = "model-settings";
	ListType = "SoundModes";

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName]["SortIndeces"] = {};
	xmlObj[cmd][ModelName]["SortIndeces"][ListType] = {};
	xmlObj[cmd][ModelName]["SortIndeces"][ListType] = g_List_Indices;
	GetTd(xmlObj, g_SetEvent, cmd);
}


function toggleARD(link){
	if(toggleStateARD == "normal"){
		window.location.href = link;
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
		for(var i = 0; i < g_List_Count; i++){
			hideHTML("Reorder_Button_Up_" + g_List_Indices[i]);
			hideHTML("Reorder_Button_Down_" + g_List_Indices[i]);
		}

		setCSS("List_Container", "width", "674px");
		setCSS("scrollContainerInnerVertical", "width", "674px");
		showHTML("ARD_Buttons");
		toggleStateARD = "normal";
	}
}


function createAddItem(TdJson){
	log(2, "success ADD: " + JSON.stringify(TdJson));

	Index       = TdJson.add.SoundMode.Index;
	Mode		= TdJson.add.SoundMode.Name;
	File        = TdJson.add.SoundMode.AudioFile.Name;
	ModeControl	= parseInt(TdJson.add.SoundMode.Switch.Control);
	ModeTrigger	= triggerPercent2Uint8(TdJson.add.SoundMode.Switch.Trigger);
	isVario     = TdJson.add.SoundMode.IsLinkVarioActive.Name;

	g_List_Indices.push(Index);
	g_List_Count = g_List_Indices.length;

	var newChild = getRowRD(Index, Mode, 'Modus', (g_List_Count-1));
	$("#scrollContainerInnerVertical").append(newChild);

	
	setHTML('Container_' + Index, getRowOfModesList(Index, Mode, File, isVario, ModeControl, ModeTrigger, getControlAssignmentPath(ModeControl, ModeTrigger, Index)));

	control2image("VoiceSounds_Control_" + Index, ModeControl);
	setTriggerState("VoiceSounds_Trigger_" + Index, ModeTrigger);
	trigger2image("VoiceSounds_Trigger_" + Index, 0);

	
	g_popupList_Indices["VoiceSounds__" + Index + "_IsLinkVarioActive"] = TdJson.add.SoundMode.IsLinkVarioActive.Index;
	$('#VoiceSounds__' + Index + '_IsLinkVarioActive').bind("click", function(){showPopupList(this, g_List_PopupListObj["SoundModeLVarioActivity"], false, true, g_popupList_Indices);});

	g_popupList_Indices["VoiceSounds__" + Index + "_AudioFile"] = TdJson.add.SoundMode.AudioFile.Index;
	$('#VoiceSounds__' + Index + '_AudioFile').bind("click", function(){showPopupList(this, g_List_PopupListObj["AudioFileChoice"], false, true, g_popupList_Indices);});
	
	ScrollDownRefresh();
}
