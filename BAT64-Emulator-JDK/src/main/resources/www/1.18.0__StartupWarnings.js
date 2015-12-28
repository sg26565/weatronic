


var g_GET_Parameter = get_GET_Parameter();
var g_StartupWarningsIndex = g_GET_Parameter.StartupWarningsIndex;
var g_scrollIndex = 0;

var g_toggleStatus = [];
var g_List_PopupListObj = {};
var g_operatorPopup = "";
var g_numpadLimitObj = {};
var toggleStateARD = "normal";	
var g_isPreFlightListSet = false;
var g_checkListFileName = "";














initPage();

function initPage(){
	initScrollbars('List_Container');
	

	InitDataPostArgs = getPopupObj(InitDataPostArgs, "LinkChoice");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "CompareOperation");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "CompareOperation_LGT");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "CompareOperation_Eq");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "CompareOperation_LGT_Eq");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "CompareOperation_Eq_Log");
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);
	
	InitDataPostArgsExtended = new Object();
	GetTd(getStartupWarningObject(InitDataPostArgsExtended), g_InitEvent, "get");


	setInterval(JsonFunction, 250);
}



function getStartupWarningObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	warnings = new Object();
		warnings.ID = -1;
		warnings.Name = "";
		warnings.Category = "";
		
			thresholds = new Object();
			thresholds.Value = -1;
			 numpadLimit = new Object();
			 	numpadLimit.ClassTag = "";
			 	numpadLimit.Min = -1;
			 	numpadLimit.Max = -1;
			 	numpadLimit.IsSigned = -1;
			 	numpadLimit.OutputResolution = -1;
			 	numpadLimit.OperatorType = -1;
			 thresholds.NumpadLimits = numpadLimit;
			
		warnings.Threshold = thresholds;
	
			checkListLinks = new Object();
			checkListLinks.Index = -1;
			checkListLinks.Name = "";
		warnings.CheckListLink = checkListLinks;
			
			operators = new Object();
			operators.Index = -1;
			operators.Name = "";
		warnings.Operator = operators;
		
			isChecked = new Object();
			isChecked.Index = -1; 
			isChecked.Name = "";
		warnings.IsChecked = isChecked;

	startupWarning = new Object();
	startupWarning.Warnings = new Array (warnings);
	

	modelConfig = new Object();
		filePath = new Object();
		filePath.Index = -1;
		filePath.Name = "";
	
	modelConfig.FilePath_PreflightCheckList = filePath;
	
	InitDataPostArgsExtended["get"] = {};
	InitDataPostArgsExtended["get"]["model-settings"] = {};
	InitDataPostArgsExtended["get"]["model-settings"].StartupWarnings = startupWarning;
	InitDataPostArgsExtended["get"]["model-settings"].ModelConfig = modelConfig;
	
	return InitDataPostArgsExtended;	
}


function getChecklistObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}
	preflightChecklist = new Object();	
	preflightChecklist.get = new Object();

	preflightChecklist.isChecklistSet = -1;
	preflightChecklist.checkFinish = 1;
	
	InitDataPostArgsExtended.preflightChecklist = preflightChecklist;
	
	return InitDataPostArgsExtended;	
}


function onEVENT_INIT(e){
	try{
		
		if(typeof e.EventData.get != "undefined"){
			g_checkListFileName = e.EventData.get.ModelConfig.FilePath_PreflightCheckList.Name;
			setHTML("PreFlight_Checklist_FileName", g_checkListFileName);
			
			InitDataPostArgsExtended1 = new Object();
			GetTd(getChecklistObject(InitDataPostArgsExtended1), g_InitEvent, "service");
			
			var i = 0;
			var htmlOuterContainer = "";

			g_List_Indices = new Array();
			g_List_Count = e.EventData.get.StartupWarnings.Warnings.length;
			
			for(i = 0; i < g_List_Count; i++){
				g_List_Indices[i] = e.EventData.get.StartupWarnings.Warnings[i].Index;
				







				htmlOuterContainer += getRowRD(g_List_Indices[i], e.EventData.get.StartupWarnings.Warnings[i].Name, 'Startup Warning', g_List_Indices[i]);

				if(i == g_StartupWarningsIndex){
					g_scrollIndex = i;
				}
			}
			
			setHTML("scrollContainerInnerVertical", htmlOuterContainer);
			

			for(i = 0; i < g_List_Count; i++){
				Index          		= e.EventData.get.StartupWarnings.Warnings[i].Index;
				Name    			= e.EventData.get.StartupWarnings.Warnings[i].Name;
				Operator			= e.EventData.get.StartupWarnings.Warnings[i].Operator.Name;
				Category			= e.EventData.get.StartupWarnings.Warnings[i].Category;
				CheckListLink		= e.EventData.get.StartupWarnings.Warnings[i].CheckListLink.Name;
				CheckListLinkIndex	= e.EventData.get.StartupWarnings.Warnings[i].CheckListLink.Index;
				
				if(Category == 15){
					ThresholdValue	= checkTimeFormat(e.EventData.get.StartupWarnings.Warnings[i].Threshold.Value);
				}
				else{
					ThresholdValue = e.EventData.get.StartupWarnings.Warnings[i].Threshold.Value;
				}
				
				
				isChecked = e.EventData.get.StartupWarnings.Warnings[i].IsChecked.Index;
				
				setHTML("Container_" + Index, getRowOfWarningsList(Index, Name, Operator, ThresholdValue, Category, e.EventData.get.StartupWarnings.Warnings[i].Threshold.NumpadLimits.ClassTag, CheckListLink, CheckListLinkIndex));
				
				g_toggleStatus[Index] = isChecked;
				if(isChecked){
					toggleActiveStatus(true, Index, "Startup__" + Index + "_Active");
				}	

				
				if(typeof e.EventData.get.StartupWarnings.Warnings[i].Threshold.NumpadLimits != "undefined"){
					g_numpadLimitObj[e.EventData.get.StartupWarnings.Warnings[i].Threshold.NumpadLimits.ClassTag] = e.EventData.get.StartupWarnings.Warnings[i].Threshold.NumpadLimits;
				}
				
				g_popupList_Indices["Startup__" + Index + "_Operator"] = e.EventData.get.StartupWarnings.Warnings[i].Operator.Index;
				switch (e.EventData.get.StartupWarnings.Warnings[i].Threshold.NumpadLimits.OperatorType){
					case 0: $('#Startup__' + Index + '_Operator').bind("click", function(){showPopupList(this, g_List_PopupListObj["CompareOperation"], false, true, g_popupList_Indices);}); break;
					case 1: $('#Startup__' + Index + '_Operator').bind("click", function(){showPopupList(this, g_List_PopupListObj["CompareOperation_LGT"], false, true, g_popupList_Indices);}); break;
					case 2: $('#Startup__' + Index + '_Operator').bind("click", function(){showPopupList(this, g_List_PopupListObj["CompareOperation_Eq"], false, true, g_popupList_Indices);}); break;
					case 3: $('#Startup__' + Index + '_Operator').bind("click", function(){showPopupList(this, g_List_PopupListObj["CompareOperation_LGT_Eq"], false, true, g_popupList_Indices);}); break;
					case 4: $('#Startup__' + Index + '_Operator').bind("click", function(){showPopupList(this, g_List_PopupListObj["CompareOperation_Eq_Log"], false, true, g_popupList_Indices);}); break;
					default: $('#Startup__' + Index + '_Operator').bind("click", function(){showPopupList(this, g_List_PopupListObj["CompareOperation_LGT"], false, true, g_popupList_Indices);}); break;
				}
				
				var popUpCheckListLinkIndex = 0
				if(CheckListLinkIndex != 0){
					popUpCheckListLinkIndex = 1;
				}
				
				g_popupList_Indices["Startup__" + Index + "_PreFlight"] = popUpCheckListLinkIndex;
				$('#Startup__' + Index + '_PreFlight').bind("click", function(){showPopupList(this, g_List_PopupListObj["LinkChoice"], false, true, g_popupList_Indices);});
			}
			
			
			if(typeof g_StartupWarningsIndex != "undefined"){
				 ScrollToRefresh(70, g_scrollIndex);
			}
		}
		else if(typeof e.EventData.preflightChecklist != "undefined"){
			if(e.EventData.preflightChecklist.isChecklistSet){
				$('#Edit_Checklist_Outer').removeClass('inactive');
				$('#Remove_Checklist_Outer').removeClass('inactive');
				g_isPreFlightListSet = true;
				for(var i = 0; i < g_List_Indices.length; i++){
					$('#Startup__' + i + '_PreFlight').removeClass('no_edit');
				}





			}
		}	
		else{
			setHTML('Model_Name', e.EventData.ModelName);
			
			checkHTMLHeader('Model_Name');
			setHTML('Model_Name', e.EventData.ModelName);
			
			
			$('#Add_Button').bind("click", function(){AddItem(1);});
			
			$('#Delete_Button').bind("click", function(){toggleDelete();});
			$('#Navi_Button').removeAttr("href");
			$('#Navi_Button').bind("click", function(){toggleARD('1.0.0__ModelSettings.html');});
			$('#Preview_Button').bind("click", function(){window.location.href="0.4__StartupChecklist.html?isPreview=2&LastURL=" + location.href});
			
			$('#Browse_Checklist').bind("click", function(){window.location.href = "9.4.0__FileManager.html?IsManager=0&ManagementType=startupWarnings&SavePathObj=" + getSavePath(-1, true) + "&SearchKeyNode=FilePath_PreflightCheckList&LastURL=" + location.href;});
			$('#New_Checklist').bind("click", function(){showDialogbox("newPreFlightList", 'A new List will be set as current list and ignore all Startup Warning Links to old Checklist. Do you want to continue with type in filename?', "PreFlight_Checklist_FileName")});
			g_popupList_Indices["Remove_Checklist"] = -1;
			$('#Remove_Checklist').bind("click", function(){showDialogbox("removePreFlightLink", 'Are you sure you want to unlink the PreFlight Checklist' + " <b>" + g_checkListFileName + "</b> " + 'from this model?', "Startup Warnings","preFlightCheckListFile");});
			$('#Edit_Checklist').bind("click", function(){window.location.href="2.13.0__PreFlightChecklists.html?IsStartupEdit=1&LastURL=" + location.href;});
			
			g_List_PopupListObj["CompareOperation"] = e.EventData.PopUp.CompareOperation;
			g_List_PopupListObj["CompareOperation_LGT"] = e.EventData.PopUp.CompareOperation_LGT;
			g_List_PopupListObj["CompareOperation_Eq"] = e.EventData.PopUp.CompareOperation_Eq;
			g_List_PopupListObj["CompareOperation_LGT_Eq"] = e.EventData.PopUp.CompareOperation_LGT_Eq;
			g_List_PopupListObj["CompareOperation_Eq_Log"] = e.EventData.PopUp.CompareOperation_Eq_Log;
			g_List_PopupListObj["LinkChoice"] = e.EventData.PopUp.LinkChoice;
			
		}

	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function onEVENT_SET(e){
	try{
		if(e.EventData.error.code == 0){
			if(e.cmd == "add"){
				createAddItem(e.EventData);
			}
			else if(e.cmd == "service"){
				if(typeof e.EventData["preflightChecklist"]["new"] != "undefined"){
					if(e.EventData["preflightChecklist"]["new"] != null){
						$('#Edit_Checklist_Outer').removeClass('inactive');
						$('#Remove_Checklist_Outer').removeClass('inactive');
						if(!g_isPreFlightListSet){
							for(var i = 0; i < g_List_Indices.length; i++){
								$('#Startup__' + i + '_PreFlight').removeClass('no_edit');
							}
							g_isPreFlightListSet = true;
						}
					}	
				}
			}
		}
		else{
			onError(e, e.EventData.error.text, true);
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}	
}


function getRowOfWarningsList(Index, Name, Operator, Threshold, Category, ClassTag, CheckListLink){
	
	var thresholdEventParam =  '"Startup__' + Index + '_Threshold","' + ClassTag + '"';
	
	if(Category == 15){
		thresholdEventParam = '"Startup__' + Index + '_Threshold"';
	}



	
	var checkListLinkClass = "";
	if(!g_isPreFlightListSet){
		checkListLinkClass = "no_edit";
	}
	
	var htmlInnerContainer = '' +
									'<div id="Startup__' + Index + '_Name"     class="list_warning_name Name" onClick=\'window.location.href="1.16.1__TelemetryDataAssignment.html?PageType=StartupWarnings&ModeIndex=' + Index + "&Item=" + Index + '"\'>' + Name + '</div>' +
									'<div id="Startup__' + Index + '_Operator" class="list_warning_operator">' + Operator + '</div>';
	if(Category == 15){
				htmlInnerContainer+= '<div id="Startup__' + Index + '_Threshold"    class="list_warning_value" onClick=\'showNumpadTimer("Startup__' + Index + '_Threshold");\'>' + Threshold + '</div>';;
	}
	else{
				htmlInnerContainer+= '<div id="Startup__' + Index + '_Threshold"    class="list_warning_value" onClick=\'showNumpad("Startup__' + Index + '_Threshold","' + ClassTag + '");\'>' + Threshold + '</div>';
	}
								
	htmlInnerContainer+=			'<div id="Startup__' + Index + '_PreFlight" class="list_warning_preflight ' + checkListLinkClass + '">' + CheckListLink + '</div>' ;





		
	return htmlInnerContainer;
}

function getSavePath(Index, isFile){
	cmd = "set";
	ModelName = "model-settings";
	path = "www";
	
	if(isFile){
		str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"ModelConfig":{"FilePath_PreflightCheckList":"' + path + '"}}}}');
	}
	else{
		str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"StartupWarnings":{"Warnings":{"Object":{"CheckListLink":"' + path + '"},"Index":' + Index + '}}}}}');
	}
	
	return str;
}

function toggleActiveStatus(isInit, Index, tagId){
	$('#Startup__' + Index + '_Lock_IMG').toggle();

	if(!isInit){
		g_toggleStatus[Index] ^= 1;
		submitSET(tagId, g_toggleStatus[Index]);
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
		


function getAttrObj(tagId, value, index){
	Attribute = new Object();

	if(tagId == "Operator"){
		Attribute["Operator"] = {};
		Attribute["Operator"] = value;

		return Attribute;
	}

	if(tagId == "Threshold"){
		Attribute["Threshold"] = {};
		Attribute["Threshold"]["Value"] = {}; 
		Attribute["Threshold"]["Value"] = value;

		return Attribute;
	}
	
	if(tagId == "Active"){
		Attribute["IsChecked"] = {};
		Attribute["IsChecked"] = value;

		return Attribute;
	}
	
	if(tagId == "PreFlight"){
		if(value == 1){
			temp = getSavePath(index, false);
			window.location.href = "2.13.0__PreFlightChecklists.html?IsStartupEdit=0&SavePathObj=" + temp + "&SearchKeyNode=CheckListLink&LastURL=1.18.0__StartupWarnings.html?StartupWarningsIndex=" + index;
		}
		else{
			Attribute["CheckListLink"] = {};
			Attribute["CheckListLink"] = "";
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
	if(tagId == "flags"){





	}
	else if(tagId == "PreFlight_Checklist_FileName"){
		cmd = "service";
		
		xmlObj = {};
		xmlObj["preflightChecklist"] = {};
		xmlObj["preflightChecklist"]["new"] = value;
		
		g_isPreFlightListSet = false;
		g_checkListFileName = value;
		setHTML("PreFlight_Checklist_FileName", g_checkListFileName);
		GetTd(xmlObj, g_SetEvent, cmd);


	}
	else{
		tagIdArray = tagId.split("__");
		cmd = "set";
		ModelName = "model-settings";
		ListType = "StartupWarnings";
		ListType2 = "Warnings";
		tagIdArray = tagIdArray[1].split("_");
		Index = parseInt(tagIdArray[0]);
		tagId = tagIdArray[1];
		
		
		Attr = new Object();
		Attr = getAttrObj(tagId, value, Index);

		xmlObj = getPathObj(cmd, ModelName);
		xmlObj[cmd][ModelName][ListType] = {};
		xmlObj[cmd][ModelName][ListType][ListType2] = {};
		xmlObj[cmd][ModelName][ListType][ListType2]["Index"] = Index;
		xmlObj[cmd][ModelName][ListType][ListType2]["Object"] = Attr;
		GetTd(xmlObj, g_SetEvent, cmd);
	}
}


function submitARD(cmd, num){
	ModelName = "model-settings";
	
	if(num == "preFlightCheckListFile"){










		submitSET("PreFlight_Checklist_FileName", "");
	}
	else{
		ListType = "StartupWarnings";

		xmlObj = getPathObj(cmd, ModelName);
		xmlObj[cmd][ModelName][ListType] = {};
		xmlObj[cmd][ModelName][ListType]["Warning"] = num;
		GetTd(xmlObj, g_SetEvent, cmd);
	}
	
	
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
	
	if(index == "preFlightCheckListFile"){
		g_isPreFlightListSet = false;
		g_checkListFileName = "--";
		setHTML("PreFlight_Checklist_FileName", g_checkListFileName);
		
		$('#Edit_Checklist_Outer').addClass('inactive');
		$('#Remove_Checklist_Outer').addClass('inactive');
		
		for(var i = 0; i < g_List_Indices.length; i++){
			$('#Startup__' + i + '_PreFlight').addClass('no_edit');
		}
	}	
	else{
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
	
	var Index          	= TdJson.add.Warning.Index;




















	window.location.href="1.16.1__TelemetryDataAssignment.html?PageType=StartupWarnings&ModeIndex=" + Index + "&Item=" + Index;
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
	while(numpadTimerValue.length < 8){
		changenumpadTimerValue("0");
	}

	hideHTML('Pop_Up_Blocker');

	$('#'+ numpadTimerTargetTagId).html(numpadTimerValue);
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
