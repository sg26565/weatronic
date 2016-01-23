

		
	

var g_GET_Parameter 		= get_GET_Parameter();
var g_IsStartupEdit  		= g_GET_Parameter.IsStartupEdit;
var g_lastURL        		= g_GET_Parameter.LastURL;
var g_savePathObj    		= g_GET_Parameter.SavePathObj;
var g_searchKeyNode  		= g_GET_Parameter.SearchKeyNode;
var g_PreFlightCheckIndex 	= g_GET_Parameter.PreFlightCheckIndex;
var g_scrollIndex = 0;

var g_toggleStatus = [];

var g_majorSelected = "";
var g_tagObj = new Object();

var g_HTML = "";
var g_markupText = "";

var markupTagObj = {};
markupTagObj.searchKeyOpen  = new Array("[$b]", "[$i]", "[$u]", "[$t]", "[$o]", "[$s]", "[$g]", "[$c", "[$f");
markupTagObj.searchKeyClose = new Array("[\\b]", "[\\i]", "[\\u]", "[\\t]", "[\\o]", "[\\s]", "[\\g]", "[\\c]", "[\\f]", "[\\l]");
markupTagObj.HTMLKeyOpen    = new Array('<b>', '<i>', '<u>', '<span class="pf_line_through">', '<span class="pf_outline">', '<span class="pf_shadow">', '<span class="blink">', '<span style="color:', '<span style="font-size:', ';">');
markupTagObj.HTMLKeyClose   = new Array("</b>", "</i>", "</u>", "</span>", "</br>");

var g_List_Count = 0;			
var g_List_Indices = [];		
var toggleStateARD = "normal";	


initPage();
 	
function initPage(){
	initScrollbars('List_Container');


	InitDataPostArgsExtended = new Object();
	GetTd(getChecklistObject(InitDataPostArgsExtended), g_InitEvent, "service");


	setInterval(JsonFunction, 250);
}



function getChecklistObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}
	
	preflightChecklist = new Object();
		tempGet = new Object();
		tempGet.title = "";
		tempGet.text = "";
		tempGet.ID = -1;
		tempGet.isChecked = -1;
		tempGet.isActive = -1;
		tempGet.HTML = "";
	items =  new Array(tempGet);
	preflightChecklist.get = new Object();
	preflightChecklist.get.items = items;

	preflightChecklist.checkFinish = 1;
	
	InitDataPostArgsExtended.preflightChecklist = preflightChecklist;
	
	return InitDataPostArgsExtended;	
}



function onEVENT_INIT(e){
	try{
		
		
		$('#Add_Button').bind("click", function(){AddItem(1);});
		$('#Reorder_Button').bind("click", function(){toggleReorder();});
		$('#Delete_Button').bind("click", function(){toggleDelete();});
		$('#Navi_Button').removeAttr("href");
		$('#Navi_Button').bind("click", function(){toggleARD();});
		$('#Preview_Button').bind("click", function(){window.location.href="0.4__StartupChecklist.html?isPreview=1&LastURL=" + g_lastURL});
		

		if(g_IsStartupEdit == 1){
			showHTML('ARD_Buttons');
			
		}
		else{
			g_savePathObj = JSON.parse(g_savePathObj);
		}
		







		var i = 0;
		var htmlOuterContainer = "";

		g_List_Indices = [];
		g_List_Count = e.EventData.preflightChecklist.get.items.length;

		for(i = 0; i < g_List_Count; i++){
			var Name = "";
			var Index = e.EventData.preflightChecklist.get.items[i].ID;
			g_List_Indices[i] = Index;

			for(var j = 0; j < g_List_Count; j++){
				if(Index == e.EventData.preflightChecklist.get.items[j].ID){
					Name = e.EventData.preflightChecklist.get.items[j].title;
					break;
				}
			}

			g_tagObj["Container_" + Index] = {};
			g_tagObj["Container_" + Index].timer = 0;
			htmlOuterContainer += getRowRD(Index, Name, 'PreFlight Check', i);
			
			if(Index == g_PreFlightCheckIndex){
				g_scrollIndex = i;
			}
		}

		setHTML("scrollContainerInnerVertical", htmlOuterContainer);

		for(i = 0; i < g_List_Count; i++){
			Index     = e.EventData.preflightChecklist.get.items[i].ID;
			Title     = e.EventData.preflightChecklist.get.items[i].title;
			Text      = e.EventData.preflightChecklist.get.items[i].text;
			HTML      = e.EventData.preflightChecklist.get.items[i].HTML;
			isActive  = e.EventData.preflightChecklist.get.items[i].isActive;

			if(HTML == ""){
				g_markupText = Text;
				parseMarkup2HTML();
				HTML = g_HTML;
				submitSET("PF__1_HTML", HTML);
			}

			setHTML("Container_" + Index, getRowOfPreFlightList(Index, Title, HTML));

			g_toggleStatus[Index] = isActive;

			if(isActive){
				toggleActiveStatus(true, Index, "PF__" + Index + "_Active");
			}

			if(g_IsStartupEdit == 0){
				$('#Container_' + Index).bind("click", function(){setFocus(this);});
			}	
		}

		
		if(typeof g_PreFlightCheckIndex != "undefined"){
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
		if(e.cmd == "service"){
			if(typeof e.EventData.preflightChecklist.add != "undefined"){
				createAddItem(e.EventData.preflightChecklist.add);
			}
		}

		if(e.cmd == "set"){
			if(typeof e.EventData.set.StartupWarnings != "undefined"){
				exitSite(true);
			}
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}	
}



function getRowOfPreFlightList(Index, Title, HTML){
	var pfEditClass = "";

	if(g_IsStartupEdit == 0){
		pfEditClass = "no_edit";
	}

	var htmlInnerContainer = '' +
		'<div id="PF__' + Index + '_Title"  class="pf_title ' + pfEditClass + '" onClick=\'showKeypad("PF__' + Index + '_Title");\'>' + Title + '</div>' +
		'<div id="PF__' + Index + '_HTML"   class="pf_text ' + pfEditClass + '" onClick=\'window.location.href="2.13.1__ChecklistText.html?PFID=' + Index + '&PreFlightCheckIndex=' + Index + '&LastURL=' + g_lastURL + '";\'>' + HTML + '</div>' +
		'<div id="PF__' + Index + '_Active" class="pf_active ' + pfEditClass + '" onClick=\'toggleActiveStatus(false,' + Index + ', "PF__' + Index + '_Active");\'>' +
			'<div class="background checkbox">' +
				'<img id="PF_Active__' + Index + '_IMG" width="42" height="35" style="display: none;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAjCAYAAADizJiTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQUIxRDZCQTlCMEExMUUyQTcxMEEzNzJDMzE5ODFDMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQUIxRDZCOTlCMEExMUUyQTcxMEEzNzJDMzE5ODFDMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQkE3RDFEQUYyOUFFMjExQkY4NkRDQzBDNkQwODQ3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psw8DHIAAADdSURBVHja7NjrCoMwDAXg6fbcGWcv3lHYj9GbaTpPMvBAQaHgh61NcEsp3f4heyCLfEYzj0BIfN2/qhl56Z2HpDpSzouIbGKjIivsHmRP9nL33KOaN5kDz6U3IdlQM5IJXUKyoMtIBvQnyCOotCqEB3IElVE5YyN7UFXtZSJbUHXtZSJL6FTtZSJLKJQPEjaytfQW7OnI3sc0g6UgR8eTFktBHh34iILUlFBEQGprPbyRM00JPJGz3RO8kJY2Dx5Iaz8KNnKlcQYTmYf139Ozc31atuu34wUNnrcAAwCJ1ARaCuqr5QAAAABJRU5ErkJggg==" alt="" draggable="false"/>' +
			'</div>' +
		'</div>';

	return htmlInnerContainer;
}


function toggleActiveStatus(isInit, Index, tagId){
	$('#PF_Active__' + Index + '_IMG').toggle();

	if(!isInit){
		g_toggleStatus[Index]^= 1;
		submitSET(tagId, g_toggleStatus[Index]);
	}
}












function setSavePathObj(jsonObj, searchKey, value){
	for(var key in jsonObj){
		if(key == searchKey){
			jsonObj[key] = value;

			return jsonObj;
		}

		if(key == 0){
			return;
		}

		setSavePathObj(jsonObj[key], searchKey, value);
	}

	return jsonObj;
}


function setFocus(pfTagObj){
	var pfTagId = $(pfTagObj).attr('id');

	var timerCurrent = new Date();
	var ms = timerCurrent.getMilliseconds();

	if(((timerCurrent - g_tagObj[pfTagId].timer) < 3000) && ($('#' + pfTagId).hasClass('selected'))){
		
		exitSite(false);
	}
	else{
		g_tagObj[pfTagId].timer = timerCurrent;
		selectSingle(pfTagId);
	}

	g_majorSelected = pfTagId;
}


function selectSingle(pfTagId){
	if(g_majorSelected == pfTagId){
		if($('#' + pfTagId).hasClass('selected')){
			$('#' + pfTagId).removeClass('selected');
		}
		else{
			$('#' + pfTagId).addClass('selected');
		}
	}
	else{
		$('#' + g_majorSelected).removeClass('selected');
		$('#' + pfTagId).addClass('selected');
	}
}


function exitSite(isExit){
	if((g_IsStartupEdit == 1) || isExit){
		window.location.href = g_lastURL;
	}
	else{
		
		temp =  parseInt(g_majorSelected.split("_")[1]);
		xmlObj = setSavePathObj(g_savePathObj, g_searchKeyNode, parseInt(g_majorSelected.split("_")[1]));
		GetTd(xmlObj, g_SetEvent, "set");
	}
}


function parseMarkup2HTML(){
	g_markupText = "<span>" + g_markupText + "</span>";
	g_markupText = $(g_markupText).text();
	g_HTML = g_markupText.replace(/\[\\l\]/g, markupTagObj.HTMLKeyClose[4]);

	var openTagsStack = [];
	var indexOfStartTag = g_HTML.indexOf("[$");
	var indexOfEndTag   = g_HTML.indexOf("[\\");

	
	while(indexOfEndTag < indexOfStartTag){
		if(indexOfEndTag == -1){
			break;
		}
		log(3, "failed " + " wrong endtag at char index of " + indexOfEndTag);
		
		indexOfEndTag = g_HTML.indexOf("[\\", indexOfEndTag + 2);
	}

	
	while(indexOfStartTag != -1){
		
		while(indexOfEndTag < indexOfStartTag){
			if(indexOfEndTag == -1){
				break;
			}
			
			if((searchMarkupTag(indexOfEndTag, 0)) == openTagsStack[openTagsStack.length - 1]){
				replaceMarkupTag(openTagsStack[openTagsStack.length-1], indexOfEndTag, false, true);
				indexOfStartTag = g_HTML.indexOf("[$", indexOfEndTag);
				log(3, "pass" + markupTagObj.searchKeyClose[openTagsStack[openTagsStack.length - 1]]);
				openTagsStack.pop();
			}
			else{
				log(3, "failed - found " + (markupTagObj.searchKeyClose[searchMarkupTag(indexOfEndTag, 0)]) + " but need " + markupTagObj.searchKeyClose[openTagsStack[openTagsStack.length - 1]]);
				
				
			}

			indexOfEndTag = g_HTML.indexOf("[\\", indexOfEndTag + 2);
		}
		
		openTagsStack.push(searchMarkupTag(indexOfStartTag, 1));
		
		replaceMarkupTag(openTagsStack[openTagsStack.length-1], indexOfStartTag, true, true);
		
		indexOfEndTag = g_HTML.indexOf("[\\", indexOfStartTag);
		
		indexOfStartTag = g_HTML.indexOf("[$", indexOfStartTag + 2);
	}
	
	var missingTagStack = [];

	while(openTagsStack.length > 0){
		if((searchMarkupTag(indexOfEndTag, 0)) == openTagsStack[openTagsStack.length - 1]){
			replaceMarkupTag(openTagsStack[openTagsStack.length-1], indexOfEndTag, false, true);
			log(3, "pass" + markupTagObj.searchKeyClose[openTagsStack[openTagsStack.length - 1]]);
		}
		else{
			log(3, "failed - found " + (markupTagObj.searchKeyClose[searchMarkupTag(indexOfEndTag, 0)]) + " but need " + markupTagObj.searchKeyClose[openTagsStack[openTagsStack.length - 1]]);
			missingTagStack.push(openTagsStack[openTagsStack.length - 1]);
			
			
		}
		openTagsStack.pop();
		indexOfEndTag = g_HTML.indexOf("[\\", indexOfEndTag + 2);
	}	
	
	while(missingTagStack.length > 0){
		var missingTag = missingTagStack.pop();
		log(3, "missing endtags" + markupTagObj.searchKeyClose[missingTag]);
		replaceMarkupTag(missingTag, g_HTML.length, false, false);
	}







	
}


function searchMarkupTag(pos, isStartTag){
	if(pos == -1){
		return pos;
	}
	
	var serachArray = [];

	if(isStartTag){
		serachArray = markupTagObj.searchKeyOpen;
	}
	else{
		serachArray = markupTagObj.searchKeyClose;
	}

	for(var i = 0; i < serachArray.length; i++){
		if(pos == g_HTML.indexOf(serachArray[i], pos)){
			return i;
		}
	}
}


function replaceMarkupTag(tag, pos, isStarttag, isReplace){
	var insertHTMLTag = "";

	if(isStarttag){
		if(tag < 7){
			insertHTMLTag = markupTagObj.HTMLKeyOpen[tag];
		}
		else{
			var insertHTMLValue = "";
			insertHTMLValue =  g_HTML.substring((pos + 3), (g_HTML.indexOf("]", pos)));

			if(tag == 8){
				insertHTMLValue += "px";
			}
			
				
			
			
				
			
			insertHTMLTag = markupTagObj.HTMLKeyOpen[tag] + insertHTMLValue + markupTagObj.HTMLKeyOpen[9];
		}
	}
	else{
		if(tag < 3){
			insertHTMLTag = markupTagObj.HTMLKeyClose[tag];
		}
		else{
			insertHTMLTag = markupTagObj.HTMLKeyClose[3];
		}
	}

	if(isReplace){
		g_HTML = g_HTML.substring(0, pos) + insertHTMLTag + g_HTML.substring((g_HTML.indexOf("]", pos) + 1), g_HTML.length);
	}
	else{
		g_HTML = g_HTML.substring(0, pos) + insertHTMLTag + g_HTML.substring(pos, g_HTML.length);
	}
}


function getAttrObj(tagId, value, Index){
	Attribute = new Array();
	Attribute[0] = {};
	Attribute[0]["ID"] = parseInt(Index);

	if(tagId == "Title"){
		Attribute[0]["title"] = value;

		return Attribute;
	}

	if(tagId == "HTML"){
		Attribute[0]["HTML"] = value;

		return Attribute;
	}

	if(tagId == "Active"){
		Attribute[0]["active"] = value;

		return Attribute;
	}

	return Attribute;
}


function submitSET(tagId, value){
	xmlObj = {};
	xmlObj["preflightChecklist"] = {};
	xmlObj["preflightChecklist"]["set"] = {};

	if(tagId == "flags"){

	}
	else{
		tagIdArray = tagId.split("__");

		ListType = tagIdArray[0];
		tagIdArray = tagIdArray[1].split("_");
		Index = tagIdArray[0];
		tagId = tagIdArray[1];

		Attr = new Array();
		Attr = getAttrObj(tagId, value, Index);

		xmlObj["preflightChecklist"]["set"]["items"] = [];
		xmlObj["preflightChecklist"]["set"]["items"] = Attr;
	}

	GetTd(xmlObj, g_SetEvent, "service");
}


function submitARD(cmd, num){
	xmlObj = {};
	xmlObj["preflightChecklist"] = {};
	xmlObj["preflightChecklist"][cmd] = [];
	xmlObj["preflightChecklist"][cmd][0] = {};

	if(cmd == "add"){
		xmlObj["preflightChecklist"][cmd][0]["title"] = "";
		xmlObj["preflightChecklist"][cmd][0]["text"] = "";
	}
	else if(cmd == "remove"){
		xmlObj["preflightChecklist"][cmd][0]["ID"] = num;
	}

	GetTd(xmlObj, g_SetEvent, "service");
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
	

	xmlObj = {};
	xmlObj["preflightChecklist"] = {};
	xmlObj["preflightChecklist"]["swap"] = {};
	xmlObj["preflightChecklist"]["swap"]["ID1"] = currentId;
	xmlObj["preflightChecklist"]["swap"]["ID2"] = g_List_Indices[Index];

	GetTd(xmlObj, g_SetEvent, "service");
}


function toggleARD(){
	if(toggleStateARD == "normal"){
		exitSite(false);
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

	Index = TdJson[0].ID;
	Title = TdJson[0].title;
	HTML  = "";

	g_List_Indices.push(Index);
	g_List_Count = g_List_Indices.length;

	var newChild = getRowRD(Index, Title, 'PreFlight Check', (g_List_Count - 1)); 
	$("#scrollContainerInnerVertical").append(newChild);

	setHTML('Container_' + Index, getRowOfPreFlightList(Index, Title, HTML));

	g_toggleStatus[Index] = 0;

	ScrollDownRefresh();
}
