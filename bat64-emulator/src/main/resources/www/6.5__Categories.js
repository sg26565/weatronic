




var g_List_Count = 0;		
var g_List_Indices = {};	
var toggleStateARD = "normal";	


initPage();


function initPage(){

	GetTd(getCategoriesObject(InitDataPostArgs), g_InitEvent);


	setInterval(JsonFunction, 250);
}



function getCategoriesObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined")
		InitDataPostArgs = new Object();

	InitDataPostArgs.UsedCategories = [0,1,2,3,4];

	Item = new Object();
	Item.Index = 0;
	Item.Name = "Fun";

	Item1 = new Object();
	Item1.Index = 1;
	Item1.Name = "Sport";

	Item2 = new Object();
	Item2.Index = 2;
	Item2.Name = "Test";

	Item3 = new Object();
	Item3.Index = 3;
	Item3.Name = "Competition";

	Item4 = new Object();
	Item4.Index = 4;
	Item4.Name = "Dogfighter";


	categoryItems = new Array(Item, Item1, Item2, Item3, Item4);

	category = new Object();
	category.Item = categoryItems;

	InitDataPostArgs.Category = category;

	return InitDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		

		
		$('#Add_Button').bind("click", function(){AddItem(1);});
		
		$('#Delete_Button').bind("click", function(){toggleDelete();});
		$('#Navi_Button').removeAttr("href");
		$('#Navi_Button').bind("click", function(){toggleARD('6.0__ModelManagement.html');});
		


		var i = 0;
		var htmlOuterContainer = "";
		g_List_Indices = e.EventData.UsedCategories;
		g_List_Count = g_List_Indices.length;

		for(i = 0; i < g_List_Count; i++){
		
			htmlOuterContainer+= getRowRD(g_List_Indices[i],e.EventData.Category.Item[i].Name, "Category");
		}

		$("#scrollContainerInnerVertical").html(htmlOuterContainer);

		for(i = 0; i < g_List_Count; i++){
		
			Index = e.EventData.Category.Item[i].Index;
			CategoryName = e.EventData.Category.Item[i].Name;


			$("#Container_" + Index).html(getRowOfLimitersList(Index, CategoryName));
		}

		initScrollbars('List_Container');
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function onEVENT_SET(e){
	try{
		if (e.cmd == "add"){
			createAddItem(e.EventData);
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}



function getRowOfLimitersList(Index, CategoryName){
	var htmlInnerContainer = '' +
		'<!-- Limiter Name -->' +
		'<div id="Category__' + Index + '_Name" class="list_limiter_name Name keypad-tag" onClick=\'showKeypad("Category__' + Index + '_Name");\'>' + CategoryName + '</div>';

	return 	htmlInnerContainer;
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

	
}


function submitARD(cmd, num){
	ModelName = "model-settings";
	ListType = "Category";

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = num;

	GetTd(xmlObj, g_SetEvent, cmd);
}



function AddItem(count){
	
}


function toggleDelete(){
	hideHTML("ARD_Buttons");
	setCSS("List_Container", "width", "778px");
	setCSS("scrollContainerInnerVertical", "width", "778px");

	for(var i = 0; i < g_List_Count; i++)
		showHTML("Delete_Button_" + g_List_Indices[i]);

	toggleStateARD = "delete";
}


function deleteItem(index){
	$("#ContainerOuter_" + index).remove();

	

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
	













}
