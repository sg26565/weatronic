




var g_List_Count = 0;			
var g_List_Indices = [];		
var g_FunctionList = [];		
var toggleStateARD = "normal";	
var g_isInit = false;


initPage();

function initPage(){

	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "FadeDuration");
	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	GetTd(getFlightModeObject(InitDataPostArgs), g_InitEvent);



	TdPostArgs = getCurrentFlightMode(TdPostArgs);


	setInterval(JsonFunction, 250);
}



function getFlightModeObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	InitDataPostArgs.SortIndeces = {};
	InitDataPostArgs.SortIndeces.FlightModes = [];

	Item = new Object();
	Item.Index = 0;
	Item.Name = "";
	Item.FadeIn = "";
		NoFadeInFuncIdxs = new Object();
		NoFadeInFuncIdxs.Index = 0;
		NoFadeInFuncIdxs.Name = "";
		noFadeInFuncIdxs = new Array(NoFadeInFuncIdxs);
	Item.NoFadeInFuncIdxs = noFadeInFuncIdxs;
	Item.NoFadeInFunctionsStr = "";

	flightModeItems = new Array(Item);

	FlightMode = new Object();
	FlightMode.Items = "ALL_USED";

	FlightMode.Item = flightModeItems;
	FlightMode.ItemCount = 0;

	InitDataPostArgs.FlightMode = FlightMode;

	
	ItemFunc = new Object();
	ItemFunc.Index = 0;
	ItemFunc.Name = "";

	funcItems = new Array(ItemFunc);

	Function = new Object();
	Function.Items =  "ALL_USED";

	Function.Item = funcItems;

	InitDataPostArgs.Function = Function;

	return InitDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		
		
		$('#Add_Button').bind("click", function(){AddItem(1);});
		$('#Reorder_Button').bind("click", function(){toggleReorder();});
		$('#Delete_Button').bind("click", function(){toggleDelete();});
		$('#Copy_Button').bind("click", function(){toggleCopy();});
		$('#Navi_Button').removeAttr("href");
		$('#Navi_Button').bind("click", function(){toggleARD('1.0.0__ModelSettings.html');});
		

		g_numpadLimitObj = e.EventData.NumPadLimits;

		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);

		var i = 0;
		var htmlOuterContainer = "";

		g_List_Indices = e.EventData.SortIndeces.FlightModes;
		g_List_Count = g_List_Indices.length;

		for(i = 0; i < g_List_Count; i++){
			var Name = "";
			var Index = g_List_Indices[i];

			for(var j = 0; j < g_List_Count; j++){
				if(Index == e.EventData.FlightMode.Item[j].Index){
					Name = e.EventData.FlightMode.Item[j].Name;
					break;
				}
			}

			htmlOuterContainer += getRowRD(Index, Name, 'Flugphase', i);
		}

		
		setHTML("scrollContainerInnerVertical", htmlOuterContainer);

		for(i = 0; i < g_List_Count; i++){
		
			Index  = e.EventData.FlightMode.Item[i].Index;
			Name   = e.EventData.FlightMode.Item[i].Name;
			FadeIn = e.EventData.FlightMode.Item[i].FadeIn;
			NoFadeInFunctionsStr = e.EventData.FlightMode.Item[i].NoFadeInFunctionsStr;
			NoFadeInFuncIdxs     = e.EventData.FlightMode.Item[i].NoFadeInFuncIdxs;
			g_FunctionList       = e.EventData.Function.Item;

			
			setHTML("Container_" + Index, getRowOfFlightModeList(Index, Name, FadeIn, NoFadeInFunctionsStr));

			
			g_popupList_Indices["FlightMode__" + Index + "_Functions"] = NoFadeInFuncIdxs;
			$("#FlightMode__" + Index + "_Functions").bind("click", function(){showPopupList(this, g_FunctionList, true, true, g_popupList_Indices);});
		}
		
		$('#FlightMode__0_Name').addClass('no_edit');

		initScrollbars('List_Container');
		g_isInit = true;
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "flightmode"){
		if((g_CurrentFlightMode != e.EventData.Current_FM.Index) && g_isInit){
			$('#Container_' + g_CurrentFlightMode).removeClass('active_fm');

			if((toggleStateARD == "delete") && (g_CurrentFlightMode != 0)){
				showHTML("Delete_Button_" + g_CurrentFlightMode);
			}

			g_CurrentFlightMode = e.EventData.Current_FM.Index;
			$('#Container_' + g_CurrentFlightMode).addClass('active_fm');

			if((toggleStateARD == "delete") && (g_CurrentFlightMode != 0)){
				hideHTML("Delete_Button_" + g_CurrentFlightMode);
			}
		}
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "add" || e.cmd == "copy"){
			createAddItem(e["EventData"][e.cmd]);
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}


function getRowOfFlightModeList(Index, Name, FadeIn, NoFadeInFunctionsStr){
	var htmlInnerContainer = '' +
		'<!-- FlightMode Name -->' +
		'<div id="FlightMode__' + Index + '_Name" class="list_flightmode_name Name keypad-tag" onClick=\'showKeypad("FlightMode__' + Index + '_Name");\'>' + Name + '</div>' +

		'<!-- FlightMode FadeIn -->' +
		'<div id="FlightMode__' + Index + '_FadeIn" class="list_flightmode_fadein" onClick=\'showNumpad("FlightMode__' + Index + '_FadeIn", "FadeDuration");\'>' + FadeIn + '</div>' +

		'<!-- FlightMode Functions with no FadeIn -->' +
		'<div id="FlightMode__' + Index + '_Functions" class="list_flightmode_functions">' + NoFadeInFunctionsStr + '</div>';

	return htmlInnerContainer;
}



function getAttrObj(tagId, value){
	Attribute = new Object();

	if(tagId == "Name"){
		Attribute["Name"] = value;
		return Attribute;
	}

	if(tagId == "FadeIn"){
		Attribute["FadeIn"] = value;
		return Attribute;
	}

	if(tagId == "Functions"){
		Attribute["NoFadeInFuncIdxs"] = value;
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
	Attr = getAttrObj(tagId, value);

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType] = Attr;
	xmlObj[cmd][ModelName][ListType]["Index"] = parseInt(Index);

	GetTd(xmlObj, g_SetEvent, cmd);
}


function submitARD(cmd, num){
	ModelName = "model-settings";
	ListType = "FlightMode";

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
		if((g_List_Indices[i] != g_CurrentFlightMode) && (g_List_Indices[i] != 0)){
			showHTML("Delete_Button_" + g_List_Indices[i]);
		}
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
	ListType = "FlightModes";

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName]["SortIndeces"] = {};
	xmlObj[cmd][ModelName]["SortIndeces"][ListType] = {};
	xmlObj[cmd][ModelName]["SortIndeces"][ListType] = g_List_Indices;
	GetTd(xmlObj, g_SetEvent, cmd);
}

function toggleCopy(){
	hideHTML("ARD_Buttons");
	setCSS("List_Container", "width", "778px");
	setCSS("scrollContainerInnerVertical", "width", "778px");

	for(var i = 0; i < g_List_Count; i++){
		showHTML("Copy_Button_" + g_List_Indices[i]);
	}

	toggleStateARD = "copy";
}

function copyItem(index){
	submitARD("copy", index);
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
	else if(toggleStateARD == "copy"){
		for(var i = 0; i < g_List_Count; i++){
			hideHTML("Copy_Button_" + g_List_Indices[i]);
		}
		
		setCSS("List_Container", "width", "674px");
		setCSS("scrollContainerInnerVertical", "width", "674px");
		showHTML("ARD_Buttons");
		toggleStateARD = "normal";
	}
}


function createAddItem(TdJson){
	log(2, "success ADD/ COPY: " + JSON.stringify(TdJson));

	Index = TdJson.FlightMode.Index;
	Name = TdJson.FlightMode.Name;
	FadeIn = TdJson.FlightMode.FadeIn;


	NoFadeInFunctionsStr = TdJson.FlightMode.NoFadeInFunctionsStr;
	NoFadeInFunctionsStr = "";

	NoFadeInFuncIdxs = TdJson.FlightMode.NoFadeInFuncIdxs;
	
	newObj = new Object();
	newObj.Index = 65536;
	newObj.Name = "";
	newArray = new Array(newObj);
	NoFadeInFuncIdxs = newArray;


	FunctionList = g_FunctionList;

	g_List_Indices.push(Index);
	g_List_Count = g_List_Indices.length;

	var newChild = getRowRD(Index, Name, 'Flugphase', (g_List_Count - 1));
	$("#scrollContainerInnerVertical").append(newChild);

	
	setHTML("Container_" + Index, getRowOfFlightModeList(Index, Name, FadeIn, NoFadeInFunctionsStr));

	
	g_popupList_Indices["FlightMode__" + Index + "_Functions"] = NoFadeInFuncIdxs;
	$("#FlightMode__" + Index + "_Functions").bind("click", function(){showPopupList(this, g_FunctionList, true, true, g_popupList_Indices);});

	ScrollDownRefresh();
}
