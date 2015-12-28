


var g_GET_Parameter = get_GET_Parameter();
var g_SequencerIndex = g_GET_Parameter.SequencerIndex;
var g_scrollIndex = 0;


var g_List_Count = 0;			
var g_List_Indices = [];		
var toggleStateARD = "normal";	

var g_TriggerState = [];


initPage();

function initPage(){
	initScrollbars('List_Container');
	

	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "SequencerTime");
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "SequencerDuration");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "FailsafeModeSequencer");
	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	GetTd(getSequencerObject(InitDataPostArgs), g_InitEvent);


	setInterval(JsonFunction, 250);
}



function getSequencerObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	InitDataPostArgs.SortIndeces = {};
	InitDataPostArgs.SortIndeces.Sequencers = [];

	Item = new Object();
	Item.Index = -1;
	Item.IsUsed = -1;
	Item.Name = "Mega Sequenz";
		switchControl = new Object();
		switchControl.Control = 768;
		switchControl.Trigger = -512;
	Item.Switch = switchControl;

	Item.DelayUpStr = "20s";
	Item.DelayDnStr = "30s";

		failSafe = new Object();
			mode = new Object();
			mode.Index = 1;
			mode.Name = "Hold";
		failSafe.Mode = mode;
		failSafe.Value = 20;
		failSafe.ValueStr = "20%";
	Item.FailSafe = failSafe;

	sequencerItems = new Array(Item);

	sequencer = new Object();
	sequencer.Items = "ALL_USED";
	
	sequencer.ItemCount = 1;

	sequencer.Item = sequencerItems;

	InitDataPostArgs.Sequencer = sequencer;

	return InitDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		
		
		$('#Add_Button').bind("click", function(){AddItem(1);});
		$('#Reorder_Button').bind("click", function(){toggleReorder();});
		$('#Delete_Button').bind("click", function(){toggleDelete();});
		$('#Navi_Button').removeAttr("href");
		$('#Navi_Button').bind("click", function(){toggleARD('1.0.0__ModelSettings.html');});
		

		g_numpadLimitObj = e.EventData.NumPadLimits;

		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);

		var i = 0;
		var htmlOuterContainer = "";

		g_List_Indices = e.EventData.SortIndeces.Sequencers;
		g_List_Count = g_List_Indices.length;

		for(i = 0; i < g_List_Count; i++){
			var Name = "";
			var Index = g_List_Indices[i];
			for(var j = 0; j < g_List_Count; j++){
				if(Index == e.EventData.Sequencer.Item[j].Index){
					Name = e.EventData.Sequencer.Item[j].Name;
					break;
				}
			}
			htmlOuterContainer += getRowRD(Index, Name, 'Sequenzer', i);
			
			if(Index == g_SequencerIndex){
				g_scrollIndex = i;
			}
		}

		
		setHTML("scrollContainerInnerVertical", htmlOuterContainer);

		for(i = 0; i < g_List_Count; i++){
			Index            = e.EventData.Sequencer.Item[i].Index;
			SequencerName    = e.EventData.Sequencer.Item[i].Name;
			DelayUp			 = e.EventData.Sequencer.Item[i].DelayUpStr;
			DelayDn			 = e.EventData.Sequencer.Item[i].DelayDnStr;
			SequencerControl = e.EventData.Sequencer.Item[i].Switch.Control;
			SequencerTrigger = e.EventData.Sequencer.Item[i].Switch.Trigger;
			FailSafe 		 = e.EventData.Sequencer.Item[i].FailSafe.Mode.Name;
			FailSafeIndex	 = e.EventData.Sequencer.Item[i].FailSafe.Mode.Index;
			FailSafeValue 	 = e.EventData.Sequencer.Item[i].FailSafe.ValueStr;

			
			setHTML("Container_" + Index, getRowOfSequencersList(Index, SequencerName, DelayUp, DelayDn, SequencerControl, SequencerTrigger, FailSafe, FailSafeValue, FailSafeIndex, getControlAssignmentPath(SequencerControl, SequencerTrigger, Index)));

			control2image("Sequencer_Control_" + Index, SequencerControl);
			setTriggerState("Sequencer_Trigger_" + Index, SequencerTrigger);
			trigger2image("Sequencer_Trigger_" + Index, 0);

			

			g_popupList_Indices["Sequencer__" + Index + "_FailSafe"] = FailSafeIndex;
			$('#Sequencer__' + Index + '_FailSafe').bind("click", function(){showPopupList(this, e.EventData.PopUp.FailsafeModeSequencer, false, true, g_popupList_Indices);});
		}

		
		if(typeof g_SequencerIndex != "undefined"){
			 ScrollToRefresh(70, g_scrollIndex);
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){

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



function getRowOfSequencersList(Index, SequencerName, DelayUp, DelayDn, SequencerControl, SequencerTrigger, FailSafe, FailSafeValue, FailSafeIndex, controlObj){

	var FailSafeContent;
	if(FailSafeIndex == 2){
		FailSafeContent = FailSafeValue;
	}
	else{
		FailSafeContent = FailSafe;
	}

	var htmlInnerContainer = '' +
		'<!-- Sequencer Name -->' +
		'<div id="Sequencer__' + Index + '_Name" class="list_sequencer_name Name keypad-tag" onClick=\'showKeypad("Sequencer__' + Index + '_Name");\'>' + SequencerName + '</div>' +

		'<!-- Sequencer Switch -->' +
		'<div class="list_sequencer_switch">' +
			'<div id="Sequencer_Trigger_' + Index + '" style="margin-top: 8px;"></div>' +
			'<a onClick=\'gotoControlAssignment("' + Index + '", "' + SequencerControl + '", "' + SequencerTrigger + '", "' + controlObj + '");\' draggable="false">' +
				'<img id="Sequencer_Control_' + Index + '" width="85" height="61" src="" draggable="false" alt=""/>' +
			'</a>' +
		'</div>' +

		'<!-- Sequencer ToMax -->' +
		'<div id="Sequencer__' + Index + '_ToMax" class="list_sequencer_max" onClick=\'showNumpad("Sequencer__' + Index + '_ToMax", "SequencerDuration");\'>' + DelayUp + '</div>' +

		'<!-- Sequencer ToMin -->' +
		'<div id="Sequencer__' + Index + '_ToMin" class="list_sequencer_min" onClick=\'showNumpad("Sequencer__' + Index + '_ToMin", "SequencerDuration");\'>' + DelayDn + '</div>' +

		'<!-- Sequencer FailSafe -->' +
		'<div id="Sequencer__' + Index + '_FailSafe" class="list_sequencer_failsafe">' + FailSafeContent + '</div>' +
		'<div id="Sequencer__' + Index + '_FailSafeValue" class="list_sequencer_failsafe" style="display: none;">' + FailSafeValue + '</div>' +

		'<!-- Sequencer Options -->' +
		'<div class="list_sequencer_setup">' +
			'<a href="1.5.1__SequencerSetup.html?SequencerIndex=' + Index + '" draggable="false">' +
				'<img width="55" height="50" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAyCAYAAAD4FkP1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk5ODdDOUEwMTBDMjExRTJCOEZFRjg1RERBQjE5MTAyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk5ODdDOUExMTBDMjExRTJCOEZFRjg1RERBQjE5MTAyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTk4N0M5OUUxMEMyMTFFMkI4RkVGODVEREFCMTkxMDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4N0M5OUYxMEMyMTFFMkI4RkVGODVEREFCMTkxMDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6JCBspAAALeklEQVR42sxaCVCT2R0n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" alt="" draggable="false"/>' +
			'</a>' +
		'</div>';

	return htmlInnerContainer;
}



function gotoControlAssignment(Index,SequencerControl, SequencerTrigger, controlObj){
	window.location.href="9.1.0__ControlAssignment.html?PageId=12&FromName=" + document.getElementById("Sequencer__" + Index + "_Name").innerHTML + "&ControlId=" + SequencerControl + "&ControlNode=Control&ControlTrigger=" + SequencerTrigger + "&ControlNodeTrigger=Trigger&ControlPath=" + controlObj  + "&LastURL=1.5.0__Sequencers.html?SequencerIndex=" + Index;
}

function getControlAssignmentPath(control, trigger, Index){
	cmd = "set";
	ModelName = "model-settings";
	ListType = "Sequencer";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"' + ListType + '":{"Switch":{"Control":"' + control + '","Trigger":"' + trigger +  '"},"Index":' + Index + '}}}}');

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
















function getAttrObj(tagId, value, Index, ListType){
	Attribute = new Object();

	if(tagId == "Name"){
		Attribute["Name"] = value;

		return Attribute;
	}

	if(tagId == "ToMax"){
		Attribute["DelayUp"] = value;

		return Attribute;
	}

	if(tagId == "ToMin"){
		Attribute["DelayDown"] = value;

		return Attribute;
	}

	if(tagId == "FailSafe"){
		if(value == 2){
			hideHTML(ListType + '__' + Index + '_FailSafe');
			showHTML(ListType + '__' + Index + '_FailSafeValue');
			setHTML(ListType + "__" + Index + "_" + "FailSafe", getHTML(ListType + "__" + Index + "_" + "FailSafeValue"));
			showNumpad(ListType + '__' + Index + '_FailSafeValue', 'SequencerTime');
			hideHTML(ListType + "__" + Index + "_" + "FailSafeValue");
			showHTML(ListType + "__" + Index + "_" + "FailSafe");
		}



		Attribute["Failsafe"] = {};
		Attribute["Failsafe"]["Mode"] = value;

		return Attribute;
	}

	if(tagId == "FailSafeValue"){
		setHTML(ListType + "__" + Index + "_" + "FailSafe", getHTML(ListType + "__" + Index + "_" + "FailSafeValue"));
		Attribute["Failsafe"] = {};
		Attribute["Failsafe"]["Position"] = value;

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
	tagIdArray = tagId.split("__");
	cmd = "set";
	ModelName = "model-settings";
	ListType = tagIdArray[0];
	tagIdArray = tagIdArray[1].split("_");
	Index = tagIdArray[0];
	tagId = tagIdArray[1];

	Attr = new Object();
	Attr = getAttrObj(tagId, value, Index, ListType);

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType] = Attr;
	xmlObj[cmd][ModelName][ListType]["Index"] = parseInt(Index);

	GetTd(xmlObj, g_SetEvent, cmd);
}


function submitARD(cmd, num){
	ModelName = "model-settings";
	ListType = "Sequencer";

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
	ListType = "Sequencers";

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

	Index            = TdJson.add.Sequencer.Index;
	SequencerName    = TdJson.add.Sequencer.Name;
	DelayUp			 = TdJson.add.Sequencer.DelayUp;
	DelayDn			 = TdJson.add.Sequencer.DelayDown;
	SequencerControl = TdJson.add.Sequencer.Switch.Control;
	SequencerTrigger = TdJson.add.Sequencer.Trigger;
	FailSafe 		 = TdJson.add.Sequencer.Failsafe.Mode.Name; 	
	FailSafeIndex	 = TdJson.add.Sequencer.Failsafe.Mode.Index;	
	FailSafeValue 	 = TdJson.add.Sequencer.Failsafe.ValueStr;  	

	g_List_Indices.push(Index);
	g_List_Count = g_List_Indices.length;

	var newChild = getRowRD(Index, SequencerName, 'Sequenzer', (g_List_Count-1));
	$("#scrollContainerInnerVertical").append(newChild);

	
	setHTML("Container_" + Index, getRowOfSequencersList(Index, SequencerName, DelayUp, DelayDn, SequencerControl, SequencerTrigger, FailSafe, FailSafeValue, FailSafeIndex, getControlAssignmentPath(SequencerControl, SequencerTrigger, Index)));

	control2image("Sequencer_Control_" + Index, SequencerControl);
	setTriggerState("Sequencer_Trigger_" + Index, SequencerTrigger);
	trigger2image("Sequencer_Trigger_" + Index, 0);

	

	g_popupList_Indices["Sequencer__" + Index + "_FailSafe"] = TdJson.add.Sequencer.Failsafe.Mode.Index; 
	$('#Sequencer__' + Index + '_FailSafe').bind("click", function(){showPopupList(this, e.EventData.PopUp.FailsafeModeSequencer, false, true, g_popupList_Indices);});

	ScrollDownRefresh();
}
