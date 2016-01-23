


var g_GET_Parameter = get_GET_Parameter();
var g_GyroIndex = g_GET_Parameter.GyroIndex;
var g_scrollIndex = 0;


var g_List_Count = 0;		
var g_List_Indices = [];	
var toggleStateARD = "normal";	
var g_List_PopupListObj = {};


initPage();

function initPage(){
	initScrollbars('List_Container');
			

	InitDataPostArgs = getPopupObj(InitDataPostArgs, "GyroMode");
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);
	InitDataPostArgsExtended = {};
	GetTd(getGyroObject(InitDataPostArgsExtended), g_InitEvent, "get");

		
	setInterval(JsonFunction, 250);
}



function getGyroObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	cmd = "get";
	ModelName = "model-settings";
	ListType = "GyroSetup";
	
	Item = new Object();
	Item.Index = -1;
	Item.Name = "";
	
		gyroAxis = new Object();
		gyroAxis.Index = -1;
		gyroAxis.Name = "";
	Item.GyroAxis = gyroAxis;
	
		gyroMode = new Object();
		gyroMode.Index = -1;
		gyroMode.Name = "";
	Item.GyroMode = gyroMode;
		
	Item.Control = -1;

		functionObj = new Object();
		functionObj.Index = -1;
		functionObj.Name = "";
	Item.Function = functionObj;
	
	modeItem = new Array(Item);

	InitDataPostArgsExtended[cmd] = {};
	InitDataPostArgsExtended[cmd][ModelName] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType]["Items"] = "ALL";
	InitDataPostArgsExtended[cmd][ModelName][ListType]["Item"] = modeItem;
	InitDataPostArgsExtended[cmd][ModelName]["SortIndeces"] = {};
	InitDataPostArgsExtended[cmd][ModelName]["SortIndeces"]["GyroSetups"] = [];


	return InitDataPostArgsExtended;	
}



function onEVENT_INIT(e){
	try{
		if(typeof e.EventData.get == "undefined"){
			
			
			$('#Add_Button').bind("click", function(){AddItem(1);});
			$('#Reorder_Button').bind("click", function(){toggleReorder();});
			$('#Delete_Button').bind("click", function(){toggleDelete();});
			$('#Navi_Button').removeAttr("href");
			$('#Navi_Button').bind("click", function(){toggleARD('1.0.0__ModelSettings.html');});
			
	
			checkHTMLHeader('Model_Name');
			setHTML('Model_Name', e.EventData.ModelName);
			
			g_List_PopupListObj["GyroMode"] = e.EventData.PopUp.GyroMode;
		}	
		else{
			var i = 0;
			var htmlOuterContainer = "";
			
			g_List_Indices = e.EventData.get.SortIndeces.GyroSetups;
			g_List_Count = g_List_Indices.length;
									
			for(i = 0; i < g_List_Count; i++){
				var Name = "";
				var Index = g_List_Indices[i];
				
				for(var j = 0; j < g_List_Count; j++){
					if(Index == e.EventData.get.GyroSetup.Item[j].Index){
						Name = e.EventData.get.GyroSetup.Item[j].Function.Name + " " + e.EventData.get.GyroSetup.Item[j].GyroAxis.Name;
						break;
					}
				}
				htmlOuterContainer += getRowRD(Index, Name, 'Kreisel', i);
				
				if(g_List_Indices[i] == g_GyroIndex){
					g_scrollIndex = i;
				}
			}	
			
			
			setHTML("scrollContainerInnerVertical", htmlOuterContainer);
	
			
			
			for(i = 0; i < g_List_Count; i++){
				Index        	= e.EventData.get.GyroSetup.Item[i].Index;
				FunctionName 	= e.EventData.get.GyroSetup.Item[i].Function.Name;
				Control 		= e.EventData.get.GyroSetup.Item[i].Control;
				GyroMode 		= e.EventData.get.GyroSetup.Item[i].GyroMode.Name;
				GyroAxis		= e.EventData.get.GyroSetup.Item[i].GyroAxis.Name;
	

				setHTML("Container_" + Index, getRowOfGyrosList(Index, Control, getControlAssignmentPath(Control, Index), FunctionName, GyroAxis, GyroMode, false));
				
				control2image("Gyros_Control_" + Index, Control);
			}


			if(typeof g_LimiterIndex != "undefined"){
				 ScrollToRefresh(70, g_scrollIndex);
			}
		}
	}catch(err){
		onError(err, "Error Init: ", false);
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




function getRowOfGyrosList(Index, gyroControl, controlObj, functionName, gyroAxis, gyroMode, isWarning){

	
	var htmlInnerContainer =	'<!-- Gyro Number/ Warning -->' +
								'<div class="list_gyro_function_name no_edit">';
	if(isWarning){
		htmlInnerContainer+= 	'<span style="float:left; margin:14px 8px 0px 4px;" class="icon_warning"></span>';
	}
	
	htmlInnerContainer+=		'<span id="Gyro_Function_Name__' + Index + '">' + functionName + '</span>' +
								'</div>' +
								
								'<!-- Gyro Control -->' +
								'<div class="list_gyro_control"><a onClick=\'gotoControlAssignment("' + Index + '", "' + gyroControl + '", "' + controlObj + '");\' draggable="false">' +
									'<img width="85" height="61" id="Gyros_Control_' + Index + '" src="" draggable="false" alt=""/>' +
								'</a></div>' +
						
								'<!-- Gyro Axis -->' +
								'<div class="list_gyro_axis no_edit">' + gyroAxis + '</div>' +
								
								'<!-- Gyro Mode -->' +
								'<div class="list_gyro_mode no_edit">' + gyroMode + '</div>' +
													
								'<!-- Gyro Setup -->' +
								'<div id="" class="list_gyro_setup"><a href="1.4.6.1__GyroSetup.html?GyroIndex=' + Index + '" draggable="false">' +
									'<img width="54" height="54" src="data:image/png;base64,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" draggable="false" alt=""/>' +
								'</a></div>';
	
	return htmlInnerContainer;
}



function gotoControlAssignment(Index, Control, ControlObj){
	window.location.href="9.1.0__ControlAssignment.html?PageId=0&FromName=" + encodeURIComponent('Sensitivität') + "&FromNameSub=" + document.getElementById("Gyro_Function_Name__" + Index).innerHTML + "&ControlId=" + Control + "&ControlNode=Control&ControlPath=" + ControlObj + "&LastURL=1.4.6.0__Gyros.html?GyroIndex=" + Index;
}

function getControlAssignmentPath(control, Index){
	cmd = "set";
	ModelName = "model-settings";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"GyroSetup":{"Control":' + control + ',"Index":' + Index + '}}}}');

	return str;
}

		

function getAttrObj(tagId, value){
	Attribute = new Object();

	if(tagId == "Name"){
		Attribute["Name"] = value;
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
	if(tagId == "Hidden_Info_Box"){
		if(!isNaN(value)){
			cmd = "add";
			submitARD(cmd, value);
		}
	}
}


function submitARD(cmd, num){
	ModelName = "model-settings";
	ListType = "GyroSetup";

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = {};
	if(cmd == "add"){
		xmlObj[cmd][ModelName][ListType]["Count"] = 1;
		xmlObj[cmd][ModelName][ListType]["GyroMode"] = num;
	}
	else{
		xmlObj[cmd][ModelName][ListType] = num;
	}
	

	GetTd(xmlObj, g_SetEvent, cmd);
}



function AddItem(count){
	
	showPopupList($('#Hidden_Info_Box'), g_List_PopupListObj["GyroMode"], false, true, g_popupList_Indices);
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
	ListType = "Limiters";

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

	Index        	= TdJson.add.GyroSetup.Index;
	Control 		= TdJson.add.GyroSetup.Control;
	GyroMode 		= TdJson.add.GyroSetup.GyroMode.Name;
	GyroAxis		= TdJson.add.GyroSetup.GyroAxis.Name;
	
	g_List_Indices.push(Index);
	g_List_Count = g_List_Indices.length;

	var newChild = getRowRD(Index, FunctionName + GyroAxis, 'Kreisel', g_List_Count - 1); 
	$("#scrollContainerInnerVertical").append(newChild);

	
	setHTML("Container_" + Index, getRowOfGyrosList(Index, Control, getControlAssignmentPath(Control, Index), FunctionName, GyroAxis, GyroMode, false));

	control2image("Gyros_Control_" + Index, Control);
	
	ScrollDownRefresh();
}
