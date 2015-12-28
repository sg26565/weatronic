


var g_GET_Parameter = get_GET_Parameter();
var g_lastURL       = g_GET_Parameter.LastURL;
var g_isPreview		= parseInt(g_GET_Parameter.isPreview, 10);

var CONST_TELEMETRY_MEASValue_StartupWarnChecked = 7373;

var g_initObj = {};
	g_initObj.StartupWarning = {};
	g_initObj.StartupWarning.IsInit = false;
	g_initObj.StartupWarning.EventData = {};
	
	g_initObj.PreFlightCheckList = {};
	g_initObj.PreFlightCheckList.IsInit = false;
	g_initObj.PreFlightCheckList.EventData = {};

var g_startupWarningsInUse = {};
	g_startupWarningsInUse.NoPreFlight = {};
	g_startupWarningsInUse.PreFlight = {};

var g_CheckedStatus = 0;
var g_preFlightIsChecked = {};
var g_preFlightIsNotCheckedCount = -1;
var g_StartupWarnIsNotCheckedCount = -1;
var g_isPreFlightCheckListUsed = false;

var g_HTML = "";
var g_markupText = "";

var markupTagObj = {};
markupTagObj.searchKeyOpen  = new Array("[$b]", "[$i]", "[$u]", "[$t]", "[$o]", "[$s]", "[$g]", "[$c", "[$f");
markupTagObj.searchKeyClose = new Array("[\\b]", "[\\i]", "[\\u]", "[\\t]", "[\\o]", "[\\s]", "[\\g]", "[\\c]", "[\\f]", "[\\l]");
markupTagObj.HTMLKeyOpen    = new Array('<b>', '<i>', '<u>', '<span class="pf_line_through">', '<span class="pf_outline">', '<span class="pf_shadow">', '<span class="blink">', '<span style="color:', '<span style="font-size:', ';">');
markupTagObj.HTMLKeyClose   = new Array("</b>", "</i>", "</u>", "</span>", "</br>");

initPage();

function initPage(){




	initScrollbars('List_Container');

	$('#Navi_Button').removeAttr("href");
	$('#Navi_Button').bind("click", function(){
												if((g_CheckedStatus == 0) && !g_isPreview){
													
													showDialogbox("exitPreFlightListCheck", 'Sie verlassen die Seite mit bestehenden Warnungen oder Listeneinträgen.');
												}
												else{
													gotoLastPage(0);
												}
											});


	InitDataPostArgsExtended1 = new Object();
	GetTd(getStartupWarningObject(InitDataPostArgsExtended1), g_InitEvent, "get");
	InitDataPostArgsExtended2 = new Object();
	GetTd(getChecklistObject(InitDataPostArgsExtended2), g_InitEvent, "service");


	var telemetryObj = new Object();
	telemetryObj.ID = CONST_TELEMETRY_MEASValue_StartupWarnChecked;
	telemetryObj.Value = 0;
	telemetryObj.ValueStr = "";

	telemetryIds.push(telemetryObj);

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
		warnings.Threshold = thresholds;

			checkListLinks = new Object();
			checkListLinks.Index = -1;
		warnings.CheckListLink = checkListLinks;

			operators = new Object();
			operators.Index = -1;
			operators.Name = "";
		warnings.Operator = operators;

			isChecked = new Object();
			isChecked.Index = -1; 
		warnings.IsChecked = isChecked;

	startupWarning = new Object();
	startupWarning.Warnings = new Array (warnings);







	
	InitDataPostArgsExtended["get"] = {};
	InitDataPostArgsExtended["get"]["model-settings"] = {};
	InitDataPostArgsExtended["get"]["model-settings"].StartupWarnings = startupWarning;


	return InitDataPostArgsExtended;	
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

	InitDataPostArgsExtended.preflightChecklist = preflightChecklist;

	return InitDataPostArgsExtended;	
}


function onEVENT_INIT(e){
	try{
		if(e.cmd == "get"){
			if(e.EventData.get.StartupWarnings != "undefined"){
				g_initObj.StartupWarning.IsInit = true;
				g_initObj.StartupWarning.EventData = e.EventData.get.StartupWarnings;

				var startupLength = e.EventData.get.StartupWarnings.Warnings.length;
				
				for(var i = 0; i < startupLength; i++){
					
					if(e.EventData.get.StartupWarnings.Warnings[i].IsChecked.Index){
						telemetryObj = new Object();
						telemetryObj.ID = e.EventData.get.StartupWarnings.Warnings[i].ID;
						telemetryObj.Value = 0;
						telemetryObj.ValueStr = "";
		
						telemetryIds.push(telemetryObj);
						
						g_startupWarningsInUse.NoPreFlight[i] = {}
						g_startupWarningsInUse.NoPreFlight[i]["ID"] 		   = telemetryObj.ID + "__" + i;
						g_startupWarningsInUse.NoPreFlight[i]["Operator"]  	   = e.EventData.get.StartupWarnings.Warnings[i].Operator.Name;
						g_startupWarningsInUse.NoPreFlight[i]["Threshold"]	   = e.EventData.get.StartupWarnings.Warnings[i].Threshold.Value;
						g_startupWarningsInUse.NoPreFlight[i]["Name"]      	   = e.EventData.get.StartupWarnings.Warnings[i].Name;
						g_startupWarningsInUse.NoPreFlight[i]["CheckListLink"] = e.EventData.get.StartupWarnings.Warnings[i].CheckListLink.Index;
					}
				}	
			}
		}
		else if(e.cmd == "service"){
			if(e.EventData.preflightChecklist != "undefined"){
				g_initObj.PreFlightCheckList.IsInit = true;
				g_initObj.PreFlightCheckList.EventData = e.EventData.preflightChecklist;
			}
		}

		if(g_initObj.StartupWarning.IsInit && g_initObj.PreFlightCheckList.IsInit){
			var preFlightCheckListLength = 0;
			
			if(g_initObj.PreFlightCheckList.EventData != null){
				if(g_initObj.PreFlightCheckList.EventData.get.items != null){
					preFlightCheckListLength = g_initObj.PreFlightCheckList.EventData.get.items.length;
				}	
			}
			
			var htmlCheckListPreFlight = '';
			var htmlCheckListStartUp = '';	
			
			g_preFlightIsNotCheckedCount = 0;

			for(var i = 0; i < preFlightCheckListLength; i++){
				
				if(g_initObj.PreFlightCheckList.EventData.get.items[i].isActive){
					
					
					g_HTML =  g_initObj.PreFlightCheckList.EventData.get.items[i].HTML;
					
					if(g_HTML == ""){
						g_markupText = g_initObj.PreFlightCheckList.EventData.get.items[i].text;
						parseMarkup2HTML();
						submitSET("HTML", g_HTML, g_initObj.PreFlightCheckList.EventData.get.items[i].ID);
					}
					
					g_isPreFlightCheckListUsed = true;
					g_preFlightIsChecked[g_initObj.PreFlightCheckList.EventData.get.items[i].ID] = g_initObj.PreFlightCheckList.EventData.get.items[i].isChecked;
					var isPreflightOnly = true;
					var telemetryIdAsIndex = "";
					
					for(index in g_startupWarningsInUse.NoPreFlight){
						
						if(g_initObj.PreFlightCheckList.EventData.get.items[i].ID == g_startupWarningsInUse.NoPreFlight[index].CheckListLink){
							isPreflightOnly = false;
							g_startupWarningsInUse.PreFlight[index] = {};
							g_startupWarningsInUse.PreFlight[index] = g_startupWarningsInUse.NoPreFlight[index];
							delete g_startupWarningsInUse.NoPreFlight[index];
							telemetryIdAsIndex = index;
							
							
							
							
							
							
							htmlCheckListPreFlight += getItemOfPreFlightCheckList(true,  g_initObj.PreFlightCheckList.EventData.get.items[i].ID, g_initObj.PreFlightCheckList.EventData.get.items[i].title, g_HTML, g_startupWarningsInUse.PreFlight[telemetryIdAsIndex]["Name"], g_startupWarningsInUse.PreFlight[telemetryIdAsIndex]["ID"], g_startupWarningsInUse.PreFlight[telemetryIdAsIndex]["Operator"], g_startupWarningsInUse.PreFlight[telemetryIdAsIndex]["Threshold"]);
							
						}
					}
					
					
					if(isPreflightOnly){	
						htmlCheckListPreFlight += getItemOfPreFlightCheckList(false, g_initObj.PreFlightCheckList.EventData.get.items[i].ID, g_initObj.PreFlightCheckList.EventData.get.items[i].title, g_HTML);
					}
					
				}
			}

			
			for(key in g_startupWarningsInUse.NoPreFlight){
				var Index =  "Start__" +  key;
				htmlCheckListStartUp+= getItemOfPreFlightCheckList(true, Index, "Startup Warning", "", g_startupWarningsInUse.NoPreFlight[key]["Name"], g_startupWarningsInUse.NoPreFlight[key]["ID"], g_startupWarningsInUse.NoPreFlight[key]["Operator"], g_startupWarningsInUse.NoPreFlight[key]["Threshold"]);
			}

			setHTML('scrollContainerInnerVertical', htmlCheckListStartUp + htmlCheckListPreFlight);
			ScrollRefresh();

			checkFinished();
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function onEVENT_SET(e){
	try{




		if(e.cmd == "service"){
			if(typeof e.EventData.preflightChecklist.set.runtimeFlags != "undefined"){
				gotoLastPage(0);
			}
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}

function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "telemetry"){
		if(key == CONST_TELEMETRY_MEASValue_StartupWarnChecked){
			
			g_StartupWarnIsNotCheckedCount = value;
			for(var i = 0; i < 15; i++){
				var  StartupWarnChecked = value;
				StartupWarnChecked = (StartupWarnChecked >> i) & 1;
				
				if(StartupWarnChecked == 0){
					if(typeof g_startupWarningsInUse.NoPreFlight[i] != "undefined"){
						if(!g_isPreview){
							showHTML('List_Element_Start__' + i);
							setCSS(g_startupWarningsInUse.NoPreFlight[i].ID, "color", "#f00");
						}
						else{
							setCSS(g_startupWarningsInUse.NoPreFlight[i].ID, "color", "#FF64FF");
						}
						
					}
					else if(typeof g_startupWarningsInUse.PreFlight[i] != "undefined"){
						if(!g_isPreview){
							setCSS(g_startupWarningsInUse.PreFlight[i].ID, "color", "#f00");
						}	
						else{
							setCSS(g_startupWarningsInUse.PreFlight[i].ID, "color", "#FF64FF");
						}
					}
				}
				else{
					if(typeof g_startupWarningsInUse.NoPreFlight[i] != "undefined"){
						if(!g_isPreview){
							hideHTML('List_Element_Start__' + i);
							setCSS(g_startupWarningsInUse.NoPreFlight[i].ID, "color", "#090");
						}
						else{
							setCSS(g_startupWarningsInUse.NoPreFlight[i].ID, "color", "#FF64FF");
						}
					}
					else if(typeof g_startupWarningsInUse.PreFlight[i] != "undefined"){
						if(!g_isPreview){
							setCSS(g_startupWarningsInUse.PreFlight[i].ID, "color", "#090");
						}	
						else{
							setCSS(g_startupWarningsInUse.PreFlight[i].ID, "color", "#FF64FF");
						}	
					}
				}
			}

			checkFinished();
		}
		else{
			$("div[id^='" + key + "__']" ).html(valueStr);
		}
	}
}


function getItemOfPreFlightCheckList(isStartup, Index, preflightTitle, html, startupTitle, telemetryId, operator, threshold){
	var htmlPreFlightItem = '' +
							'<div id="List_Element_' + Index + '" class="element_spacer">' +
								'<div class="list_header">' +
									'<div id="MinMax_' + Index + '" class="minmax" onClick=\'toggleContent("' + Index + '");\'>-</div><div class="inner_list_titel">' + preflightTitle + '</div>' +
								'</div>' +
								'<div id="List_Content_' + Index + '" class="inner_list_content">' + html + '</div>';
	
	if(isStartup){
		htmlPreFlightItem += '<div class="inner_list_footer">'+
								'<div class="startup_row">'+
									'<div class="startup_item_name">'+
										'<div class="startup_name">' + startupTitle + '</div>'+
										'<div class="startup_dblpoint">:</div>'+
									'</div>'+
									'<div class="startup_live_value" id="' + telemetryId + '">-.-</div>'+
									'<div class="startup_operator">' + operator + '</div>'+
									'<div class="startup_comparative_value">' + threshold + '</div>'+
								'</div>'+
							'</div>';
	}
	else{
		var checkedStatus = 'none';

		if(g_preFlightIsChecked[Index]){
			checkedStatus = 'inline';
		}
		else{
			g_preFlightIsNotCheckedCount++;
		}

		htmlPreFlightItem += '<div class="inner_list_footer">' +
								'<div id="List_Checkbox_' + Index + '" class="background" onClick=\'toggleCheckedStatus("' + Index + '");\'>' +
									'<img id="List_Checkbox_' + Index + '_Img" width="42" height="35" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAjCAYAAADizJiTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQUIxRDZCQTlCMEExMUUyQTcxMEEzNzJDMzE5ODFDMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQUIxRDZCOTlCMEExMUUyQTcxMEEzNzJDMzE5ODFDMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQkE3RDFEQUYyOUFFMjExQkY4NkRDQzBDNkQwODQ3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psw8DHIAAADdSURBVHja7NjrCoMwDAXg6fbcGWcv3lHYj9GbaTpPMvBAQaHgh61NcEsp3f4heyCLfEYzj0BIfN2/qhl56Z2HpDpSzouIbGKjIivsHmRP9nL33KOaN5kDz6U3IdlQM5IJXUKyoMtIBvQnyCOotCqEB3IElVE5YyN7UFXtZSJbUHXtZSJL6FTtZSJLKJQPEjaytfQW7OnI3sc0g6UgR8eTFktBHh34iILUlFBEQGprPbyRM00JPJGz3RO8kJY2Dx5Iaz8KNnKlcQYTmYf139Ozc31atuu34wUNnrcAAwCJ1ARaCuqr5QAAAABJRU5ErkJggg==" style="margin: 4px 0px 0px -1px; display: ' + checkedStatus + ';" draggable="false" />' +
								'</div>' +
							'</div>';
	}
	
	htmlPreFlightItem += '</div>';
	
	return htmlPreFlightItem;
}

function gotoLastPage(exitWithWarnings){
	if(exitWithWarnings){
		GetTd({"preflightChecklist":{"set":{"runtimeFlags": 1}}}, g_SetEvent, "service");
	}
	else{
		if(g_isPreview == 1){
			window.location.href = "2.13.0__PreFlightChecklists.html?IsStartupEdit=1&LastURL=" + g_lastURL;
		}
		else{
			window.location.href = g_lastURL;
		}
	}	
}

function toggleContent(id){
	var content_state = getHTML('MinMax_' + id);
	
	if(content_state == "-"){
		setContent(id, 1);
	}
	else{
		setContent(id, 0);
	}
}


function setContent(id, value){
	var content_state = getHTML('MinMax_' + id);
	
	if(value){
		setHTML('MinMax_' + id, '+');
		setCSS('List_Content_' + id, 'display', 'none');
	}
	else{
		setHTML('MinMax_' + id, '-');
		setCSS('List_Content_' + id, 'display', 'inline');
	}
}


function toggleCheckedStatus(index){
	g_preFlightIsChecked[index] ^= 1;
	
	if(g_preFlightIsChecked[index]){
		showHTML('List_Checkbox_' + index + '_Img');
		g_preFlightIsNotCheckedCount--;
	}
	else{
		hideHTML('List_Checkbox_' + index + '_Img');
		g_preFlightIsNotCheckedCount++;
	}

	setContent(index, g_preFlightIsChecked[index]);
	
	if(!g_isPreview){
		submitSET("checkItem", g_preFlightIsChecked[index], index);
	}
}






















function checkFinished(){
	if(!g_isPreview){
		if((g_StartupWarnIsNotCheckedCount == 32767) && (g_preFlightIsNotCheckedCount == 0) && (g_CheckedStatus == 0)){
			g_CheckedStatus = 1;
			
			if(g_isPreFlightCheckListUsed){
				submitSET("allChecked", g_CheckedStatus, -1);
			}
			else{
				gotoLastPage(0);
			}
		}
		else if(((g_StartupWarnIsNotCheckedCount != 32767) || (g_preFlightIsNotCheckedCount != 0)) && (g_CheckedStatus == 1)){
			g_CheckedStatus = 0;
			
			submitSET("allChecked", g_CheckedStatus, -1);
		}
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
			insertHTMLValue = g_HTML.substring((pos + 3), (g_HTML.indexOf("]", pos)));

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

	if(tagId == "HTML"){
		Attribute[0]["HTML"] = value;

		return Attribute;
	}

	return Attribute;
}


function submitSET(tagId, value, Index){
	xmlObj = {};
	xmlObj["preflightChecklist"] = {};

	if(tagId == "checkItem"){
		xmlObj["preflightChecklist"]["check"] = [];
		xmlObj["preflightChecklist"]["check"][0] = {};
		xmlObj["preflightChecklist"]["check"][0]["ID"] = parseInt(Index);
		xmlObj["preflightChecklist"]["check"][0]["checked"] = value;

		checkFinished();
	}
	else if(tagId == "allChecked"){
		xmlObj["preflightChecklist"]["checkFinish"] = value;
	}
	else{
		Attr = new Array();
		Attr = getAttrObj(tagId, value, Index);
		xmlObj["preflightChecklist"]["set"] = {};
		xmlObj["preflightChecklist"]["set"]["items"] = [];
		xmlObj["preflightChecklist"]["set"]["items"] = Attr;
	}

	GetTd(xmlObj, g_SetEvent, "service");
}
