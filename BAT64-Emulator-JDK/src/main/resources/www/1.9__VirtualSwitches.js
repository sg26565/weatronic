




var g_GET_Parameter = get_GET_Parameter();
var g_VirtualSwitchIndex = g_GET_Parameter.VirtualSwitchIndex;
var g_scrollIndex = 0;

var g_GET_Parameter = get_GET_Parameter();
var g_ReturnValue	= g_GET_Parameter.ReturnValue;

var g_List_Count = 0;		
var g_List_Indices = {};	
var toggleStateARD = "normal";	

var g_List_PopupListObj = {};
var g_controlId_Virtual = 1280; 


initPage();

function initPage(){
	initScrollbars('List_Container');
	

	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Control");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "YesNo");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "AndOr");
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);
	GetTd(getVirtualSwitchObject(), g_SetEvent, "get");


	setInterval(JsonFunction, 250);
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
	control1.Value = "";
		isInverted = new Object();
		isInverted.Index = 1;
		isInverted.Name =  "";
	control1.IsInverted = isInverted;

	Item.Control__1 = control1;

	control2 = new Object();
	control2.Control = -1;
	control2.Value = "";
		isInverted = new Object();
		isInverted.Index = 1;
		isInverted.Name =  "";
	control2.IsInverted = isInverted;

	Item.Control__2 = control2;

	vSwitchItems = new Array(Item);

	InitDataPostArgsExtended["get"] = {};
	InitDataPostArgsExtended["get"]["model-settings"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["VSwitch"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["VSwitch"]["Item"] = vSwitchItems;
	InitDataPostArgsExtended["get"]["model-settings"]["VSwitch"]["Items"] = "ALL";
	InitDataPostArgsExtended["get"]["model-settings"]["SortIndeces"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["SortIndeces"]["VSwitchs"] = [];

	return InitDataPostArgsExtended;
}



function onEVENT_INIT(e){
	try{
		
		
		$('#Add_Button').bind("click", function(){AddItem(1);});
		$('#Reorder_Button').bind("click", function(){toggleReorder();});
		$('#Delete_Button').bind("click", function(){toggleDelete();});
		$('#Navi_Button').removeAttr("href");
		$('#Navi_Button').bind("click", function(){toggleARD('1.0.0__ModelSettings.html');});
		

		g_numpadLimitObj = e.EventData.NumPadLimits;
		g_List_PopupListObj["YesNo"] = e.EventData.PopUp.YesNo;
		g_List_PopupListObj["AndOr"] = e.EventData.PopUp.AndOr;

		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "control"){
		state2image(key, value);
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "add"){
			createAddItem(e.EventData.add);
		}

		if(e.cmd == "get"){
			handleGET(e.EventData.get);
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}



function getRowRDextended(Index, Name, ListType, sortIndex){
	htmlRDrow = '' +
		'<div id="ContainerOuter_' + sortIndex + '">' +
			'<div id="Container_' + Index + '" class="list_content_row" style="width: 674px; height: 139px;"></div>' +
			'<div id="Delete_Button_' + Index + '" class="button_red round_all" style="display: none; margin: 38px 0px 0px 21px; width: 52px; height: 60px;"><a href="#" onClick=\' showDialogbox("delete", "' + ListType + '","' + Name + '",' + Index + ');\' class="delete_button" draggable="false"></a></div>' +





			
			'<div id="Reorder_Button_Up_' + Index + '"   class="button_blue round_all reorder_up"   style="display: none; margin-top: 38px;"><a href="#" onClick="moveElement(this.parentNode.parentNode.id, 1);" class="raise_button" draggable="false"></a></div>' +
			'<div id="Reorder_Button_Down_' + Index + '" class="button_blue round_all reorder_down" style="display: none; margin-top: 38px;"><a href="#" onClick="moveElement(this.parentNode.parentNode.id, 0);" class="lower_button" draggable="false"></a></div>' +
		'</div>';

	return htmlRDrow;
}


function getRowOfVirtualSwitchList(Index, VirtualSwitchName, VirtualSwitchControl, Logic, ControlID1, controlObj1, ControlValue1, ControlInv1, ControlID2, controlObj2, ControlValue2, ControlInv2){
	var htmlInnerContainer = '' +
		'<!-- Virtual Switch Name -->' +
		'<div id="VSwitch__' + Index + '_Name" class="list_virtual_switch_name" onClick=\'showKeypad("VSwitch__' + Index + '_Name");\' style="height:139px; line-height: 139px;">' + VirtualSwitchName + '</div>' +

		'<!-- State -->' +
		'<div class="list_virtual_switch_state no_edit" style="height:139px; line-height: 177px;">' +
			'<img id="VSwitch__' + VirtualSwitchControl + '_State" width="71" height="55" src="" draggable="false" alt=""/>' +
		'</div>' +

		'<!-- Logic -->' +
		'<div id="VSwitch__' + Index + '_Logic" class="list_virtual_switch_logic" style="height:139px; line-height: 139px;">' + Logic + '</div>' +

		'<div style="height:139px; line-height: 139px; padding-right: 0px; border-right: none; padding-left:0px; border-left: none;">' +
			'<!-- Control1 Control -->' +
			'<div class="list_virtual_switch_control"><a onClick=\'gotoControlAssignment("' + Index + '", "' + ControlID1 + '", "' + controlObj1 + '");\'  draggable="false">' +
				'<img width="85" height="61" id="VSwitch__Control1_' + Index + '" src="" draggable="false" alt=""/>' +
				
			'</a></div>' +

			'<!-- Control1 Value -->' +
			'<div id=\"VSwitch__' + Index + '_ValueC1" class="list_virtual_switch_value" onClick=\'showNumpad("VSwitch__' + Index + '_ValueC1","Control");\'>' + ControlValue1 + '</div>' +

			'<!-- Control1 Inv -->' +
			'<div id="VSwitch__' + Index + '_InvC1" class="list_virtual_switch_inv">' + ControlInv1 + '</div>' +

			'<!-- Control2 Control -->' +
			'<div class="list_virtual_switch_control" style="clear: both;"><a onClick=\'gotoControlAssignment("' + Index + '", "' + ControlID2 + '", "' + controlObj2 + '");\' draggable="false" style="clear: both;">' +
				'<img width="85" height="61" id="VSwitch__Control2_' + Index + '" src="" draggable="false" alt=""/>' +
				
			'</a></div>' +

			'<!-- Control2 Value -->' +
			'<div id=\"VSwitch__' + Index + '_ValueC2" class="list_virtual_switch_value" onClick=\'showNumpad("VSwitch__' + Index + '_ValueC2","Control");\'>' + ControlValue2 + '</div>' +

			'<!-- Control2 Inv -->' +
			'<div id="VSwitch__' + Index + '_InvC2" class="list_virtual_switch_inv">' + ControlInv2 + '</div>' +
		'</div>';

	return 	htmlInnerContainer;
}




function state2image(id, state){
	id = 'VSwitch__' + id + '_State';

	if(state == 2047){
		
		setHTML_Attribute(id, "src", "data:image/png;base64,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");
	}
	else{
		
		setHTML_Attribute(id, "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAA3CAYAAABeklfeAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAT3SURBVHja7Fp7iFRVHD6ji5qo62pbaT62EltUtDQfoZYPFAtRsxTEB2r/REbkY8UXqRFWZqv4flG0QSUqFYiS70wtfIGWsZAlRroqqZurLprb9P3Yb+js5c7cc+/MnTtw7w8+5sy9vzPn3O+c83vdicXjcaVLeXm5CkAeBYYCBcAfwD7gRrYnUVxcXOd7ngpWGgAfAq9b5nILeBtYHuTkgibnS+Alm+tNgFKgObAwqMnVC5CYF5IQo8t8oCiM5Ewx0KkPTAgjOU8Y6nUMIzlVhnq3wkjO94Z6R8NIziEDnQvA1jCSs8Dh/nVgLHA3bOSMAZ5Lcq8CWA10A46FLQhsxKjYKveBHsAZlSMSxM4pAdrbXF+XS8QEQY4kmHNsrl8DFqsck2yTsxRobHN9IQkKLTl9gHE2138GNqgclHpZHGcVELO5N53GOLTkTASesbn+NbBX5ahk0pX3Akbz+OQDA4FKoCnwvo2+BHezPIzTkOUO+X0p3bUEqoHfmWp8BVzNFXIkNlkB9LMclUq25wGP2PSTKt9vLsaR8sU0/t7DNvdl/EnASmANsAT4K50Hi6VZQ55OD6STfBroCfwDPA78wtXW5TLwJHDTcBwhYzvQ13K9khF1PnXqW8aQYtqPpg9jrSGnY3MkXinViNnCyXcnMSIf2RCT6GtKTCGT1L5aCWORqq3zSEG+E+MnIWcq8Cv1ZLce4BHM6s4ZBuyk97kNjAe+segMTmJsTwC9gX8Nj9JB7cgeZjJa4WAq3tPsWRUX7JzbnePF5jRgXBKjCx4B7Oe9B4BXgAGq9lWLVWQl3tSI6e9Q15E0YwdxD1hP45tK7jNFkZ35Dh3CBi6W7wZZjF47tks1YrrRUzyWou8XwA9sv0zjWaQdQ6uIB/rA46l4F3iepAxiFeCQmx/wYnPG87Nam/hDwG4HYkR/tiUzb82J+yFxbTyRyZnYOdcd+uTzc7em+xYJcrIfieNUpBEpR/Bbnwg6xUy/KwPRUQ76LZzIKTAcWLfcow1t1XBgE/tW0R508jnQPUly8lw8W9quXHdzbQz7tNPaN1wuhle5EnRudclQ77LWbqzFLX5K0yDI0V+27TDQF3uzS9tpD7J9zmdyOmQytxrr0Edym6cYxzRjPLFM1b62LUzR71O6ZsVYKCFHfCSmufq/kH9c2deuXZHj9J5IvJK8HWjC3Goxj5UEg9sYytuVJt5gW/rNYPtvw13nVUoYmIpsVi7fgXk5Vh9rRm4uUwHFBE+8wnw+sKzU5/RQkgDeoZ5k8G3ZXs30I1V5ooBo5nKevbl4CaP8WTYi5Grugq2c/C4+/HeMe5akGEuIeZXfzyep8+giduknklPD1GOtwRy7MlpP7JoZBmlHxgzyNj5owhXvZ/7SOUnw9yITzmnacRpp4KkuMrKt4e+s4aK0T6IvR3YBU5RWvLaOOzir9ZwYV75E1a0NSz3nLI9La1YICy1ufwSDM1MRJ1GmlT9quFPP8MgIKV2AIaru2w2xM69R33U9J5aBP0wO4VZ3cpk1TDxnKm9lTElsPwGeNtCtYM2ozM0Afvxhco+qreUOp4t+lts+jynCWeqUpRnTyI7swfxIKgMDtTwvUao4yQXY6MXGZPJYmRy7uI9uOsawoQVt15+s+XgWx2MVSeZzq4iciJxIInIiciJyInIiciJyInIiciJyInIiichxK/8JMAD5YBAkJJ3urwAAAABJRU5ErkJggg==");
	}
}



function handleGET(TdJson){
	var i = 0;
	var htmlOuterContainer = "";

	g_List_Indices = TdJson.SortIndeces.VSwitchs;
	g_List_Count = g_List_Indices.length;

	for(i = 0; i < g_List_Count; i++){
		var Name = "";
		var Index = g_List_Indices[i];
		for(var j = 0; j < g_List_Count; j++){
			if(Index == TdJson.VSwitch.Item[j].Index){
				Name = TdJson.VSwitch.Item[j].Name;
				break;
			}
		}
		htmlOuterContainer += getRowRDextended(Index, Name, 'Virtueller Schalter', i);
		
		if(Index == g_VirtualSwitchIndex){
			g_scrollIndex = i;
		}
	}

	
	setHTML("scrollContainerInnerVertical", htmlOuterContainer);

	for(i = 0; i < g_List_Count; i++){
		Index = TdJson.VSwitch.Item[i].Index;
		VirtualSwitchName = TdJson.VSwitch.Item[i].Name;

		Logic = TdJson.VSwitch.Item[i].IsLogicalOperationOR.Name;

		VirtualSwitchControl =  g_controlId_Virtual + Index;
		controlObj = new Object();
		controlObj.ID = VirtualSwitchControl;
		controlObj.Value = 0;
		controlIds.push(controlObj);

		ControlID1 = TdJson.VSwitch.Item[i].Control__1.Control;
		ControlValue1 = TdJson.VSwitch.Item[i].Control__1.Value;
		ControlInv1 = TdJson.VSwitch.Item[i].Control__1.IsInverted.Name;

		ControlID2 =TdJson.VSwitch.Item[i].Control__2.Control;
		ControlValue2 = TdJson.VSwitch.Item[i].Control__2.Value;
		ControlInv2 = TdJson.VSwitch.Item[i].Control__2.IsInverted.Name;













		
		setHTML("Container_" + Index, getRowOfVirtualSwitchList(Index,
				VirtualSwitchName,
				VirtualSwitchControl,
				Logic,
				ControlID1,
				getControlAssignmentPath(ControlID1, Index, "Control__1", parseFloat(ControlValue1)),
				ControlValue1,
				ControlInv1,
				ControlID2,
				getControlAssignmentPath(ControlID2, Index, "Control__2", parseFloat(ControlValue2)),
				ControlValue2,
				ControlInv2));
		
		control2image("VSwitch__Control1_" + Index, ControlID1);
		control2image("VSwitch__Control2_" + Index, ControlID2);

		g_popupList_Indices["VSwitch__" + Index + "_Logic"] =  TdJson.VSwitch.Item[i].IsLogicalOperationOR.Index;
		$('#VSwitch__' + Index + '_Logic').bind("click", function(){showPopupList(this, g_List_PopupListObj["AndOr"], false, true, g_popupList_Indices);});

		g_popupList_Indices["VSwitch__" + Index + "_InvC1"] = TdJson.VSwitch.Item[i].Control__1.IsInverted.Index;
		$('#VSwitch__' + Index + '_InvC1').bind("click", function(){showPopupList(this, g_List_PopupListObj["YesNo"], false, true, g_popupList_Indices);});

		g_popupList_Indices["VSwitch__" + Index + "_InvC2"] =  TdJson.VSwitch.Item[i].Control__2.IsInverted.Index;
		$('#VSwitch__' + Index + '_InvC2').bind("click", function(){showPopupList(this, g_List_PopupListObj["YesNo"], false, true, g_popupList_Indices);});
	}

	if(typeof g_VirtualSwitchIndex != "undefined"){
		 ScrollToRefresh(140, g_scrollIndex);
	}
}

function gotoControlAssignment(Index, ControlID, controlObj){
	window.location.href="9.1.0__ControlAssignment.html?PageId=0&FromName=" + document.getElementById("VSwitch__" + Index + "_Name").innerHTML + "&ControlId=" + ControlID + "&ControlNode=Control&ControlPath=" + controlObj  + "&isAdditionalValue=true&AdditionalNode=Value&LastURL=1.9__VirtualSwitches.html?VirtualSwitchIndex=" + Index;
}

function getControlAssignmentPath(value, Index, control, threshold){
	cmd = "set";
	ModelName = "model-settings";
	ListType = "VSwitch";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"' + ListType + '":{"' + control + '":{"Control":' + value + ',"Value":' + threshold + '},"Index":' + Index + '}}}}');


	return str;
}











function getAttrObj(tagId, value){
	Attribute = new Object();

	if(tagId == "Name"){
		Attribute["Name"] = value;

		return Attribute;
	}
	else if(tagId == "Logic"){
		Attribute["IsLogicalOperationOR"] = value;

		return Attribute;
	}
	else{
		tagIdControl = tagId.substr(tagId.length-2, 2);
		tagId = tagId.substring(0, tagId.length-2);

		if(tagIdControl == "C1"){
			tagIdControl = "Control__1";
		}
		else{
			tagIdControl = "Control__2";
		}

		Attribute[tagIdControl] = {};

		if(tagId == "Value"){
			Attribute[tagIdControl]["Value"] = value;
		}
		else{
			Attribute[tagIdControl]["IsInverted"] = value;
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
	Index = tagIdArray[0];
	tagId = tagIdArray[1];

	Attr = new Object();
	Attr = getAttrObj(tagId, value);

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType] = Attr;
	xmlObj[cmd][ModelName][ListType]["Index"] = parseInt(Index);

	GetTd(xmlObj, g_SetEvent, cmd);
}


function submitARD(cmd, num){
	ModelName = "model-settings";
	ListType = "VSwitch";

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
	ListType = "VSwitchs";

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

	Index = TdJson.VSwitch.Index;
	VirtualSwitchName = TdJson.VSwitch.Name;
	Logic = TdJson.VSwitch.IsLogicalOperationOR.Name;

	VirtualSwitchControl =  g_controlId_Virtual + Index;
	controlObj = new Object();
	controlObj.ID = VirtualSwitchControl;
	controlObj.Value = 0;
	controlIds.push(controlObj);

	ControlID1 = TdJson.VSwitch.Control__1.Control;
	ControlValue1 = TdJson.VSwitch.Control__1.Value;

	ControlInv1 = TdJson.VSwitch.Control__1.IsInverted.Name;

	ControlID2 =TdJson.VSwitch.Control__2.Control;
	ControlValue2 = TdJson.VSwitch.Control__2.Value;

	ControlInv2 = TdJson.VSwitch.Control__2.IsInverted.Name;

	g_List_Indices.push(Index);
	g_List_Count = g_List_Indices.length;

	var newChild = getRowRDextended(Index, VirtualSwitchName, 'Virtueller Schalter', (g_List_Count-1));
	$("#scrollContainerInnerVertical").append(newChild);













	
	setHTML("Container_" + Index, getRowOfVirtualSwitchList(Index,
			VirtualSwitchName,
			VirtualSwitchControl,
			Logic,
			ControlID1,
			getControlAssignmentPath(ControlID1, Index, "Control__1", parseFloat(ControlValue1)),
			ControlValue1,
			ControlInv1,
			ControlID2,
			getControlAssignmentPath(ControlID2, Index, "Control__2", parseFloat(ControlValue2)),
			ControlValue2,
			ControlInv2));
	
	control2image("VSwitch__Control1_" + Index, ControlID1);
	control2image("VSwitch__Control2_" + Index, ControlID2);

	g_popupList_Indices["VSwitch__" + Index + "_Logic"] =  TdJson.VSwitch.IsLogicalOperationOR.Index;
	$('#VSwitch__' + Index + '_Logic').bind("click", function(){showPopupList(this,g_List_PopupListObj["AndOr"],false,true, g_popupList_Indices);});

	g_popupList_Indices["VirtualSwitch__" + Index + "_InvC1"] = TdJson.VSwitch.Control__1.IsInverted.Index;
	$('#VirtualSwitch__' + Index + '_Inv_C1').bind("click", function(){showPopupList(this,g_List_PopupListObj["YesNo"],false,true, g_popupList_Indices);});

	g_popupList_Indices["VirtualSwitch__" + Index + "_InvC2"] =  TdJson.VSwitch.Control__2.IsInverted.Index;
	$('#VirtualSwitch__' + Index + '_Inv_C2').bind("click", function(){showPopupList(this,g_List_PopupListObj["YesNo"],false,true, g_popupList_Indices);});

	ScrollDownRefresh();
}
