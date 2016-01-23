


var g_GET_Parameter = get_GET_Parameter();
var g_GET_pageState = g_GET_Parameter.PageState;
var g_GET_TelemetryPageState = g_GET_Parameter.TelemetryPageState;

var g_maxTemplateCount = 8;		
var g_List_Count = 0;			
var g_List_Indices = [];		
var toggleStateARD = "normal";	
var g_pageState = "homescreen"; 
var g_popupListCmd = "add";

var g_initTelObj = {};
var g_TelemetryPageState = -1;
var g_TemplateIndexTele = [];
var g_TemplateIndexTeleCurrent = -1;
var g_TemplateIndexHome = -1;
var g_template2Add = -1;
var g_List_PopupListObj = {};



















var telemetry_IMG_src = new Array();
	telemetry_IMG_src['0'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyBAMAAACZnCkhAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURf///////////////////////////2dIgdEAAAAHdFJOUwAPFlpieYC3NIu4AAAAP0lEQVRIx2NgIBswuaWRAVINGRhY0sgCyQwMbAlkOTV1VOeozlGdozpHdY7qHNU5qnNU59DSSX6LkfxWKtkAALC+eedYk3RVAAAAAElFTkSuQmCC";
	telemetry_IMG_src['1'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyBAMAAACZnCkhAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURf///////////////////////////2dIgdEAAAAHdFJOUwAPFlpieYC3NIu4AAAARUlEQVRIx2NgIBswuaWRAVINGRhY0sgCyQwMbAlEOAxTTeqozlGdozpHdQ4CneSVfaNhO6pzVOeozhGqk/wWI/mtVLIBAJoXnyv4wemyAAAAAElFTkSuQmCC";
	telemetry_IMG_src['2'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyBAMAAACZnCkhAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURf///////////////////////////2dIgdEAAAAHdFJOUwAPFlpieYC3NIu4AAAATElEQVRIx2NgIBswuaWRAVINGRhY0sgCyQwMbAlEOAxTTeqozlGdozqxACwZdDSEaKqTmJJuNGxHc9lo2I7qHNUJ1Ul+i5H8VirZAADcfKX337SQtAAAAABJRU5ErkJggg==";
	telemetry_IMG_src['3'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyBAMAAACZnCkhAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURf///////////////////////////2dIgdEAAAAHdFJOUwAPFlpieYC3NIu4AAAARUlEQVRIx2NgIBswuaWRAVINGRhY0sgCyQwMbAlEOAxTTeqozlGdI04neblsNGxHdY7qHM1lozpHdQ4aneS3GMlvpZINAOjKs++Q7Vh1AAAAAElFTkSuQmCC";
	telemetry_IMG_src['4'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyBAMAAACZnCkhAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURf///////////////////////////2dIgdEAAAAHdFJOUwAPFlpieYC3NIu4AAAAQ0lEQVRIx2NgIBswuaWRAVINGRhY0sgCyQwMbAlkOTV1VOeozlGdozoHgU7yyr7RsB3VOapzVOcI1Ul+i5H8VirZAADbgo8LMmSywQAAAABJRU5ErkJggg==";
	telemetry_IMG_src['5'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyBAMAAACZnCkhAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURf///////////////////////////2dIgdEAAAAHdFJOUwAPFlpieYC3NIu4AAAARklEQVRIx2NgIBswuaWRAVINGRhY0sgCyQwMbAm43cOGWyp1VOeozlGdozoHgU7yyr7RsB3VOapzVOcI1Ul+i5H8VirZAACQgpANtdm75QAAAABJRU5ErkJggg==";
	telemetry_IMG_src['6'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyBAMAAACZnCkhAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURf///////////////////////////2dIgdEAAAAHdFJOUwAPFlpieYC3NIu4AAAASUlEQVRIx2NgIBswuaWRAVINGRhY0sgCyQwMbAlEOAxTTeqozlGdI04nMXlqNGwHo04sxeZoCI3mslGdozpHpk7yW4zkt1LJBgCmZa0jdIMv+gAAAABJRU5ErkJggg==";
	telemetry_IMG_src['7'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyBAMAAACZnCkhAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURf///////////////////////////2dIgdEAAAAHdFJOUwAPFlpieYC3NIu4AAAARklEQVRIx2NgIBswuaWRAVINGRhY0sgCyQwMbAm43cOGWyp1VOeozhGnk7xcNhq2ozpHdY7mslGdozoHjU7yW4zkt1LJBgDPhaUrF318hQAAAABJRU5ErkJggg==";
	telemetry_IMG_src['14'] = "data:image/png;base64,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";
	telemetry_IMG_src['15'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyCAMAAABcbMQgAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACHUExURQAAAP///////////////wAAAP///wAAAP///wAAAAAAAP///////wAAAAAAAP///////////+bm5kFBQf///wAAAAAAAAAAAP///wAAACsrK0BAQP///6ioqHh4eImJif///+rq6qqqquDg4N3d3f////7+/tfX1+jo6Obm5vX19fLy8v///9VIALMAAAAsdFJOUwAADxEWGSImM0xZWmJmc3d5gISGiJmmsru/yMzMz9nd3d7l6Ovu7/Lz9fj7AywcYAAAALxJREFUWMPt2FsSgjAMheGDCCqoUBVBRcD7hex/fQZ0A74cH8y/gW+mM206gccO3nDqaKXxQEUiqMUqOkc8UpeaaKKJJpr4AxHaqhStSEASw0benSKSWMq93vRlHDGR53YdoY8jFnLMAzDFi1RzMEVfZDehiqGKI6o4/gORf6o+XcRVKrKoLwD3dugr1y65Ig7yWHDF8PyZViVLRLC/dWBbZywRmGXdeMw5E9n+ciaaaKKJ34j8TSB/28nuBXk9SRA/I5LrAAAAAElFTkSuQmCC";

var homescreen_IMG_src = new Array("data:image/png;base64,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",
								   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyBAMAAACZnCkhAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAYUExURf///////////////////////////////ykrwMgAAAAIdFJOUwAPFlpieYCNhAYfJQAAAE9JREFUSMdjYCAbMLmlkQFSDRkYWNLIAskMDGwJ2FzCjpWJBFJHdY7qHHE6sWai9NEQGtU5qpN6OtPLsYHREBrVOaqTajrJbzGS30olGwAAzSuOcBi0fWgAAAAASUVORK5CYII=",
 								   "data:image/png;base64,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");

initPage();

function initPage(){

	InitDataPostArgs = getPopupObj(InitDataPostArgs, "YesNo");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "ScreenTimeUntilLock");
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);
	InitDataPostArgsExtended = new Object();
	GetTd(getScreenAdjustObject(InitDataPostArgsExtended), g_SetEvent, "get");


	setInterval(JsonFunction, 250);
}


function getScreenAdjustObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	item1 = new Object();
	item1.Index = -1;
	item1.Template = -1;
	item1.TemplateFile = "";
	item1.TelemetryIds = [];

	itemlist = new Array(item1);

	InitDataPostArgsExtended["get"] = {};
	InitDataPostArgsExtended["get"]["model-settings"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["TelemetryScreenAdjustment"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["TelemetryScreenAdjustment"]["Items"] = "ALL";
	InitDataPostArgsExtended["get"]["model-settings"]["TelemetryScreenAdjustment"]["Item"] = itemlist;

	InitDataPostArgsExtended["get"]["model-settings"]["HomeScreenAdjustment"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["HomeScreenAdjustment"] = item1;





	return InitDataPostArgsExtended;
}


function getGeneralSettingsObject(){
	var InitDataPostArgsGeneral = {};
	InitDataPostArgsGeneral["get"] = {};
	InitDataPostArgsGeneral["get"]["general-settings"] = {};
	InitDataPostArgsGeneral["get"]["general-settings"]["UserSettings"] = {};
	InitDataPostArgsGeneral["get"]["general-settings"]["UserSettings"]["TimeToLock"] = {};
	InitDataPostArgsGeneral["get"]["general-settings"]["UserSettings"]["TimeToLock"]["Index"] = {};
	InitDataPostArgsGeneral["get"]["general-settings"]["UserSettings"]["TimeToLock"]["Name"] = {};
	InitDataPostArgsGeneral["get"]["general-settings"]["UserSettings"]["AutoDimm"] = {};
	InitDataPostArgsGeneral["get"]["general-settings"]["UserSettings"]["AutoDimm"]["Index"] = {};
	InitDataPostArgsGeneral["get"]["general-settings"]["UserSettings"]["AutoDimm"]["Name"] = {};

	return InitDataPostArgsGeneral;
}



function onEVENT_INIT(e){
	try{
		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);

		
		
		$('#Add_Button').bind("click", function(){showPopupTemplateList(this, "add");});
		$('#Reorder_Button').bind("click", function(){toggleReorder();});
		$('#Delete_Button').bind("click", function(){toggleDelete();});

		$('#Navi_Button').removeAttr("href");
		$('#Navi_Button').bind("click", function(){toggleARD('1.0.0__ModelSettings.html');});
		
		$('#Telemetry_Arrow_Left').bind("click", function(){scrollTemplates('Right', '1');});
		$('#Telemetry_Arrow_Right').bind("click", function(){scrollTemplates('Left', '1');});
		
		g_List_PopupListObj["YesNo"] = e.EventData.PopUp.YesNo;
		g_List_PopupListObj["ScreenTimeUntilLock"] = e.EventData.PopUp.ScreenTimeUntilLock;
		

	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "add"){
			createAddItem(e.EventData.add);
		}

		if(e.cmd == "get"){
			if(typeof e.EventData.get.HomeScreenAdjustment != "undefined"){
				handleGET(e.EventData.get);
				GetTd(getGeneralSettingsObject(), g_SetEvent, "get");
			}
			else{
				setHTML('Home_Screen_Auto_Dimm_Button', e.EventData.get.UserSettings.AutoDimm.Name);
				setHTML('Home_Screen_Time_Lock_Button', e.EventData.get.UserSettings.TimeToLock.Name);

				g_popupList_Indices["Home_Screen_Auto_Dimm_Button"] = e.EventData.get.UserSettings.AutoDimm.Index;
				$('#Home_Screen_Auto_Dimm_Button').bind("click", function(){showPopupList(this, g_List_PopupListObj["YesNo"], false, true, g_popupList_Indices);});

				g_popupList_Indices["Home_Screen_Time_Lock_Button"] = e.EventData.get.UserSettings.TimeToLock.Index;
				$('#Home_Screen_Time_Lock_Button').bind("click", function(){showPopupList(this, g_List_PopupListObj["ScreenTimeUntilLock"], false, true, g_popupList_Indices);});
			}
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}



function getRowRDextended(Index, Name, ListType){
	htmlRDrow = '' +
		'<div id="ContainerOuter_' + Index + '" style="display: none;">' +
			'<div id="Container_' + Index + '" class="list_content_row" style="width: 548px; height: 232px;"></div>' +
			'<div id="Delete_Button_' + Index + '" class="button_red round_all" style="display: none; margin: 87px 0px 0px 21px; width: 52px; height: 60px;"><a href="#" onClick=\'showDialogbox("delete", "' + ListType + '","' + Name + '",' + Index + ');\' class="delete_button" draggable="false"></a></div>' +
			'<script type="text/javascript">' +
				'if(toggleStateARD != "delete")' +
					'$("#Delete_Button_' + Index + '").hide();' +
			'</script>' +
			'<div id="Reorder_Button_' + Index + '" class="button_blue round_all" style="display: none; margin: 38px 0px 0px 21px; width: 52px; height: 60px;"><a href="#" onClick="raiseElement(' + Index + ');" class="raise_button" draggable="false"></a></div>' +
			'<script id="Reorder_Button_Script_' + Index + '" type="text/javascript">' +
				'if((toggleStateARD != "reorder") || (Index == 0))' +
					'$("#Reorder_Button_' + Index + '").hide();' +
			'<\/script>' +
		'</div>';

	return htmlRDrow;
}


function switchScreenSetup(setup){
	$('#Pop_Up_Outer').remove();

	if(setup == 0){
		if(toggleStateARD != "normal"){
			toggleARD("normal");
		}

		hideHTML('Screen_Switch_Button_Row');
		showHTML('Home_Screen_Setup_Row');
		hideHTML('List_Container_Telemetry');
		showHTML('List_Container_HomeScreen');
		hideHTML('ARD_Buttons');

		$('#Telemetry_Screen_Setup_Button').removeClass('button_blue').addClass('button_white');
		$('#Home_Screen_Setup_Button').removeClass('button_white').addClass('button_blue');
		g_pageState = "homescreen";

		setCSS('Telemetry_Arrow_Left', 'visibility', 'hidden');
		setCSS('Telemetry_Arrow_Right', 'visibility', 'hidden');
	}
	else{
		showHTML('Screen_Switch_Button_Row');
		hideHTML('Home_Screen_Setup_Row');
		showHTML('List_Container_Telemetry');
		hideHTML('List_Container_HomeScreen');
		showHTML('ARD_Buttons');

		$('#Telemetry_Screen_Setup_Button').removeClass('button_white').addClass('button_blue');
		$('#Home_Screen_Setup_Button').removeClass('button_blue').addClass('button_white');
		g_pageState = "telemetry";

		if(g_List_Count > 6){
			var scrollMargin_min = -127 * (g_List_Count - 6);
			var scrollMargin_max = 0;

			var currentMargin = document.getElementById('ScrollContainer').style.marginLeft;
			currentMargin = parseInt(currentMargin.slice(0, -2));

			if(currentMargin == scrollMargin_max){
				setCSS('Telemetry_Arrow_Left', 'visibility', 'hidden');
				setCSS('Telemetry_Arrow_Right', 'visibility', 'visible');
			}
			else if(currentMargin == scrollMargin_min){
				setCSS('Telemetry_Arrow_Left', 'visibility', 'visible');
				setCSS('Telemetry_Arrow_Right', 'visibility', 'hidden');
			}
			else{
				setCSS('Telemetry_Arrow_Left', 'visibility', 'visible');
				setCSS('Telemetry_Arrow_Right', 'visibility', 'visible');
			}
		}
	}
}


function showTelemetryConfigPage(page){
	g_TelemetryPageState = page;

	
	for(var i = 0; i < g_maxTemplateCount; i++){
		$('#ContainerOuter_' + i).hide();
		$('#Screen_Switch_Button_' + (i)).removeClass('button_white').addClass('button_blue');
	}

	$('#Screen_Switch_Button_' + (page)).removeClass('button_blue').addClass('button_white');
	$('#ContainerOuter_' + (page)).show();

	$('#Screen_Switch_Button_Main_Telemetry_Background').css("background-image", "url(" + telemetry_IMG_src[g_TemplateIndexTele[page]] + ")");

	g_TemplateIndexTeleCurrent = g_TemplateIndexTele[page];

	if((g_List_Count > 0) && (toggleStateARD == "normal")){
		showHTML("Screen_Switch_Button_Main_Telemetry");
	}
}



function getTemplateTelemetry(template, page){
	htmlTemplate = '';

	switch(template){
		case 0: htmlTemplate += '<div id="TemplateTeleOuter__0_0_' + page + '" class="telemetry_points30x30"><span id="TemplateTele__0_0_' + page + '" class="span_inner"></span></div>'; break;
		case 1: htmlTemplate += '<div id="TemplateTeleOuter__1_0_' + page + '" class="telemetry_points20x15"><span id="TemplateTele__1_0_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__1_2_' + page + '" class="telemetry_points10x15"><span id="TemplateTele__1_2_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__1_1_' + page + '" class="telemetry_points20x15"><span id="TemplateTele__1_1_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__1_3_' + page + '" class="telemetry_points10x15"><span id="TemplateTele__1_3_' + page + '" class="span_inner"></span></div>'; break;
		case 2: htmlTemplate += '<div id="TemplateTeleOuter__2_0_' + page + '" class="telemetry_points20x15"><span id="TemplateTele__2_0_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__2_2_' + page + '" class="telemetry_points10x10"><span id="TemplateTele__2_2_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__2_3_' + page + '" class="telemetry_points10x10"><span id="TemplateTele__2_3_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__2_1_' + page + '" class="telemetry_points20x15"><span id="TemplateTele__2_1_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__2_4_' + page + '" class="telemetry_points10x10"><span id="TemplateTele__2_4_' + page + '" class="span_inner"></span></div></div>'; break;
		case 3: htmlTemplate += '<div id="TemplateTeleOuter__3_0_' + page + '" class="telemetry_points20x10"><span id="TemplateTele__3_0_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__3_3_' + page + '" class="telemetry_points10x10"><span id="TemplateTele__3_3_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__3_1_' + page + '" class="telemetry_points20x10"><span id="TemplateTele__3_1_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__3_4_' + page + '" class="telemetry_points10x10"><span id="TemplateTele__3_4_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__3_2_' + page + '" class="telemetry_points20x10"><span id="TemplateTele__3_2_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__3_5_' + page + '" class="telemetry_points10x10"><span id="TemplateTele__3_5_' + page + '" class="span_inner"></span></div>'; break;
		case 4: htmlTemplate += '<div id="TemplateTeleOuter__4_0_' + page + '" class="telemetry_points30x15"><span id="TemplateTele__4_0_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__4_1_' + page + '" class="telemetry_points30x15"><span id="TemplateTele__4_1_' + page + '" class="span_inner"></span></div>'; break;
		case 5: htmlTemplate += '<div id="TemplateTeleOuter__5_0_' + page + '" class="telemetry_points15x15"><span id="TemplateTele__5_0_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__5_2_' + page + '" class="telemetry_points15x15"><span id="TemplateTele__5_2_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__5_1_' + page + '" class="telemetry_points15x15"><span id="TemplateTele__5_1_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__5_3_' + page + '" class="telemetry_points15x15"><span id="TemplateTele__5_3_' + page + '" class="span_inner"></span></div>'; break;
		case 6: htmlTemplate += '<div id="TemplateTeleOuter__6_0_' + page + '" class="telemetry_points20x10"><span id="TemplateTele__6_0_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__6_3_' + page + '" class="telemetry_points10x15"><span id="TemplateTele__6_3_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__6_1_' + page + '" class="telemetry_points20x10"><span id="TemplateTele__6_1_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__6_4_' + page + '" class="telemetry_points10x15"><span id="TemplateTele__6_4_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__6_2_' + page + '" class="telemetry_points20x10"><span id="TemplateTele__6_2_' + page + '" class="span_inner"></span></div>'; break;
		case 7: htmlTemplate += '<div id="TemplateTeleOuter__7_0_' + page + '" class="telemetry_points15x10"><span id="TemplateTele__7_0_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__7_3_' + page + '" class="telemetry_points15x10"><span id="TemplateTele__7_3_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__7_1_' + page + '" class="telemetry_points15x10"><span id="TemplateTele__7_1_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__7_4_' + page + '" class="telemetry_points15x10"><span id="TemplateTele__7_4_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__7_2_' + page + '" class="telemetry_points15x10"><span id="TemplateTele__7_2_' + page + '" class="span_inner"></span></div><div id="TemplateTeleOuter__7_5_' + page + '" class="telemetry_points15x10"><span id="TemplateTele__7_5_' + page + '" class="span_inner"></span></div>'; break;
		case 14: htmlTemplate += '<div id="TemplateTeleOuter__14_0_' + page + '" class="telemetry_points30x30"><span id="TemplateTele__14_0_' + page + '" class="span_inner"></span></div>'; break;
		case 15: htmlTemplate += '<div id="TemplateTeleOuter__15_0_' + page + '" class="telemetry_points30x30"><span id="TemplateTele__15_0_' + page + '" class="span_inner"></span></div>'; break;
	}

	return htmlTemplate;
}


function getTemplateHomeScreen(template){
	htmlTemplate = '';

	switch(template){
		case 0: htmlTemplate += '<div id="TemplateHomeOuter__0_Image" class="home_screen_column_lr"><span id="TemplateHome__0_Image" class="span_inner">Modelname </br> Modelimage</span></div><div class="home_screen_column_c no_edit"></div><div id="TemplateHomeOuter__0_1" class="home_screen_points10x10"><span id="TemplateHome__0_1" class="span_inner"></span></div><div id="TemplateHomeOuter__0_2" class="home_screen_points10x10"><span id="TemplateHome__0_2" class="span_inner"></span></div><div id="TemplateHomeOuter__0_3" class="home_screen_points10x10"><span id="TemplateHome__0_3" class="span_inner"></span></div>'; break;
		case 1: htmlTemplate += '<div class="home_screen_column_l_outer"><div id="TemplateHomeOuter__1_0" class="home_screen_points10x10"><span id="TemplateHome__1_0" class="span_inner"></span></div><div id="TemplateHomeOuter__1_1" class="home_screen_points10x10"><span id="TemplateHome__1_1" class="span_inner"></span></div><div id="TemplateHomeOuter__1_2" class="home_screen_points10x10"><span id="TemplateHome__1_2" class="span_inner"></span></div></div><div class="home_screen_column_c no_edit"></div><div id="TemplateHomeOuter__1_Image" class="home_screen_column_lr"><span id="TemplateHomeOuter__1_Image" class="span_inner">Modelname </br> Modelimage</span></div>'; break;
		case 2: htmlTemplate += '<div class="home_screen_column_l_outer"><div id="TemplateHomeOuter__2_0" class="home_screen_points10x10"><span id="TemplateHome__2_0" class="span_inner"></span></div><div id="TemplateHomeOuter__2_1" class="home_screen_points10x10"><span id="TemplateHome__2_1" class="span_inner"></span></div><div id="TemplateHomeOuter__2_2" class="home_screen_points10x10"><span id="TemplateHome__2_2" class="span_inner"></span></div></div><div class="home_screen_column_c no_edit"></div><div id="TemplateHomeouter__2_3" class="home_screen_points10x10"><span id="TemplateHome__2_3" class="span_inner"></span></div><div id="TemplateHomeOuter__2_4" class="home_screen_points10x10"><span id="TemplateHome__2_4" class="span_inner"></span></div><div id="TemplateHomeOuter__2_5" class="home_screen_points10x10"><span id="TemplateHome__2_5" class="span_inner"></span></div>'; break;
	}

	return htmlTemplate;
}


function handleGET(TdJson){
	g_initTelObj = TdJson;
	
	for(var i = 0; i < TdJson.TelemetryScreenAdjustment.Item.length; i++){
		screenTelemetryId = TdJson.TelemetryScreenAdjustment.Item[i].TelemetryIds;
		TemplateIndex     = TdJson.TelemetryScreenAdjustment.Item[i].Template;
		g_List_Indices[i] = TdJson.TelemetryScreenAdjustment.Item[i].Index;
		TemplateFile 	  = TdJson.TelemetryScreenAdjustment.Item[i].TemplateFile;

		showHTML('Screen_Switch_Button_' + g_List_Indices[i]);
		var newChild = getRowRDextended(g_List_Indices[i], "Page " + (g_List_Indices[i] + 1), 'Telemetrie');
		$("#List_Container_Telemetry").append(newChild);

		$("#Container_" + g_List_Indices[i]).html(getTemplateTelemetry(TemplateIndex, g_List_Indices[i]));
		g_TemplateIndexTele[g_List_Indices[i]] = TemplateIndex;
		$('#Screen_Switch_Button_' + g_List_Indices[i] + '_Background').css("background-image", "url(" + telemetry_IMG_src[g_TemplateIndexTele[g_List_Indices[i]]] + ")");

		$("#Container_" + g_List_Indices[i]).bind("click", function(e){gotoTelemetryDataAssignment(e);});

		for(var j = 0; j < screenTelemetryId.length; j++){
			if(TemplateIndex == 14){
				$('#TemplateTele__' + TemplateIndex + '_' + screenTelemetryId[j].Pos + '_' + g_List_Indices[i]).html('Look and Find');
			}
			else if(TemplateIndex == 15){
				if(TemplateFile == ''){
					TemplateFile = 'Custom Telemetry Page<br/>(Link to File Manager)';
				}
				$('#TemplateTele__' + TemplateIndex + '_' + screenTelemetryId[j].Pos + '_' + g_List_Indices[i]).html(TemplateFile);
			}
			else{
				$('#TemplateTele__' + TemplateIndex + '_' + screenTelemetryId[j].Pos + '_' + g_List_Indices[i]).html(screenTelemetryId[j].Name);
			}
		}
	}

	g_List_Count = g_List_Indices.length;

	if(g_List_Count > 0){
		showTelemetryConfigPage(g_List_Indices[0]);
	}

	if(g_List_Count == g_maxTemplateCount){
		$('#Add_Button_Box').addClass('inactive');
	}

	
	$('#List_Container_HomeScreen').append(getRowRDextended("HomeScreen", "Name", "Home Screen"));
	screenTelemetryId = TdJson.HomeScreenAdjustment.TelemetryIds;
	g_TemplateIndexHome = TdJson.HomeScreenAdjustment.Template;
	$('#Container_HomeScreen').html(getTemplateHomeScreen(g_TemplateIndexHome));
	$('#ContainerOuter_HomeScreen').show();
	$('#Screen_Switch_Button_Main_HomeScreen_Background').css("background-image", "url(" + homescreen_IMG_src[g_TemplateIndexHome] + ")");

	$('#Container_HomeScreen').bind("click", function(e){gotoTelemetryDataAssignment(e);});
	$('#Home_Screen_Setup_Label').bind("click", function(){switchScreenSetup(1);});

	length = 0;
	startOffset = 0;

	switch(g_TemplateIndexHome){
		case 0: length = 4; startOffset = 1; break;
		case 1: length = 3; break;
		case 2: length = 6; break;
	}

	TemplateIndex = TdJson.HomeScreenAdjustment.Template;

	for(var j = 0 + startOffset; j < length; j++){
		$('#TemplateHome__' + TemplateIndex + '_' + screenTelemetryId[j].Pos).html(screenTelemetryId[j].Name);
	}

	if(typeof g_GET_pageState != "undefined"){
		if(g_GET_pageState == "homescreen"){
			switchScreenSetup(0);
		}
		else{
			switchScreenSetup(1);

			if(typeof g_GET_TelemetryPageState != "undefined"){
				showTelemetryConfigPage(parseInt(g_GET_TelemetryPageState));
			}
		}
	}
}

function getSavePath(index){
	cmd = "set";
	ModelName = "model-settings";
	path = "www";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"TelemetryScreenAdjustment":{"Index":' + index + ', "TemplateFile":""}}}}');
	
	return str;
}

function gotoTelemetryDataAssignment(e){
	
	tagId = e.target.id;
	tagIdArray = tagId.split("__");
	PageState = tagIdArray[0];
	tagIdArray = tagIdArray[1].split("_");
	templateIndex = tagIdArray[0];
	templateFieldIndex = tagIdArray[1];

	if(templateIndex == 15){
		var lastURL = '1.16.0__ScreenAdjustment.html' +
						'?PageType=ScreenAdjustment' +
			  			'&PageState=' + g_pageState +
			  			'&TelemetryPageState=' + g_TelemetryPageState;
			
		url = '9.4.0__FileManager.html' +
			  '?ManagementType=CustomTelemetryScreens' +
			  '&IsManager=0' +
			  '&LastURL=' + lastURL.replace(/&/g, "%26").replace(/=/g, "%3D") +
			  '&SavePathObj=' + getSavePath(g_TelemetryPageState) +
			  '&SearchKeyNode=TemplateFile';
		window.location.href = url;
	}
	else if((templateFieldIndex != "Image") && (templateIndex != 14)){
		url = '1.16.1__TelemetryDataAssignment.html' +
			  '?PageType=ScreenAdjustment' +
			  '&PageState=' + g_pageState +
			  '&TelemetryPageState=' + g_TelemetryPageState +
			  '&TemplateIndex=' + templateIndex +
			  '&FieldIndex=' + templateFieldIndex;

		window.location.href = url;
	}
}


function getPathObj(cmd, ModelName){
	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};

	return xmlObj;
}


function submitSET_Screen(Index, ListType, template){
	cmd = "set";
	ModelName = "model-settings";

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType]["Index"] = parseInt(Index);
	xmlObj[cmd][ModelName][ListType]["Template"] = template;

	GetTd(xmlObj, g_SetEvent, cmd);
}


function submitSET(tagId, value){
	cmd = "set";
	ModelName = "general-settings";

	if(tagId == "Home_Screen_Auto_Dimm_Button"){
		ListType = "AutoDimm";
	}
	else if(tagId == "Home_Screen_Time_Lock_Button"){
		ListType = "TimeToLock";
	}

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName]["UserSettings"] ={};
	xmlObj[cmd][ModelName]["UserSettings"][ListType] = value;

	GetTd(xmlObj, g_SetEvent, cmd);
}


function submitARD(cmd, num){
	ModelName = "model-settings";
	ListType = "TelemetryScreenAdjustment";

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = num;

	GetTd(xmlObj, g_SetEvent, cmd);
}








function toggleDelete(){
	hideHTML("ARD_Buttons");
	setCSS("List_Container", "width", "778px");

	hideHTML("Screen_Switch_Button_Main_Telemetry");				

	for(var i = 0; i < g_List_Count; i++){
		showHTML("Delete_Button_" + g_List_Indices[i]);
	}

	toggleStateARD = "delete";
}


function deleteItem(index){
	$("#ContainerOuter_" + index).remove();
	$('#Screen_Switch_Button_' + (index)).hide();
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
		hideHTML("Screen_Switch_Button_Main_Telemetry");
	}
	else{
		showTelemetryConfigPage(g_List_Indices[0]);
	}
	
	if(g_List_Count == 6){
		setCSS('Telemetry_Arrow_Left', 'visibility', 'hidden');
		setCSS('Telemetry_Arrow_Right', 'visibility', 'hidden');
		scrollTemplates('Start', '1');
	}
	else if(g_List_Count > 6 && g_List_Count < g_maxTemplateCount){
		setCSS('Telemetry_Arrow_Left', 'visibility', 'hidden');
		setCSS('Telemetry_Arrow_Right', 'visibility', 'visible');
		scrollTemplates('Start', '1');
	}

	$('#Add_Button_Box').removeClass('inactive');
	
}


function toggleReorder(){
	hideHTML("ARD_Buttons");
	setCSS("List_Container", "width", "778px");

	hideHTML("Screen_Switch_Button_Main_Telemetry");				

	for(var i = 1; i < g_List_Count; i++){
		showHTML("Reorder_Button_" + g_List_Indices[i]);
	}

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
		for(var i = 0; i < g_List_Count; i++){
			hideHTML("Delete_Button_" + g_List_Indices[i]);
		}

		setCSS("List_Container", "width", "685px");					

		showHTML("ARD_Buttons");
		showHTML("Screen_Switch_Button_Main_Telemetry");			
		toggleStateARD = "normal";
	}
	else if(toggleStateARD == "reorder"){
		for(var i = 1; i < g_List_Count; i++){
			$("#Reorder_Button_" + g_List_Indices[i]).hide();
		}

		setCSS("List_Container", "width", "685px");					

		showHTML("ARD_Buttons");
		showHTML("Screen_Switch_Button_Main_Telemetry");			
		toggleStateARD = "normal";
	}
}


function createAddItem(TdJson){
	log(2, "success ADD: " + JSON.stringify(TdJson));

	index = TdJson.TelemetryScreenAdjustment.Index;
	submitSET_Screen(index, "TelemetryScreenAdjustment", g_template2Add);
	TemplateIndex = g_template2Add;

	g_List_Indices.push(index);
	g_List_Indices.sort();
	showHTML('Screen_Switch_Button_' + g_List_Indices[index]);
	var newChild = getRowRDextended(g_List_Indices[index], "Page " + (g_List_Indices[index] + 1), 'Telemetrie');
	$("#List_Container_Telemetry").append(newChild);

	$("#Container_" + g_List_Indices[index]).html(getTemplateTelemetry(TemplateIndex, index));
	g_TemplateIndexTele[g_List_Indices[index]] = TemplateIndex;
	$('#Screen_Switch_Button_' + g_List_Indices[index] + '_Background').css("background-image", "url(" + telemetry_IMG_src[g_TemplateIndexTele[g_List_Indices[index]]] + ")");

	g_List_Count = g_List_Indices.length;

	$("#Container_" + g_List_Indices[index]).bind("click", function(e){gotoTelemetryDataAssignment(e);});

	showTelemetryConfigPage(g_List_Indices[index]);
}


function refreshText(TdJson){
	if(g_pageState == "homescreen"){
		length = 0;
		startOffset = 0;

		switch (g_TemplateIndexHome){
			case 0: length = 4; startOffset = 1; break;
			case 1: length = 3; break;
			case 2: length = 6; break;
		}

		screenTelemetryId = TdJson.HomeScreenAdjustment.TelemetryIds;

		for(var j = 0 + startOffset; j < length; j++){
			$('#TemplateHome__' + TemplateIndex + '_' + screenTelemetryId[j].Pos).html(screenTelemetryId[j].Name);
		}
	}
	else{
		screenTelemetryId = TdJson.TelemetryScreenAdjustment.Item[g_TelemetryPageState].TelemetryIds;

		for(var j = 0; j < screenTelemetryId.length; j++){
			if(TemplateIndex == 14){
				$('#TemplateTele__' + TemplateIndex + '_' + screenTelemetryId[j].Pos + '_' + g_TelemetryPageState).html('Look and Find');
			}
			else if(TemplateIndex == 15){
				$('#TemplateTele__' + TemplateIndex + '_' + screenTelemetryId[j].Pos + '_' + g_TelemetryPageState).html('Custom Telemetry Page<br/>(Link to File Manager)');
			}
			else{
				$('#TemplateTele__' + TemplateIndex + '_' + screenTelemetryId[j].Pos + '_' + g_TelemetryPageState).html(screenTelemetryId[j].Name);
			}
		}
	}
}


function showPopupTemplateList(tagObj, cmd){
	g_popupListCmd = cmd;
	tagId = $(tagObj).attr('id');
	$('#Pop_Up').css({'padding-left': '500px', 'top': '53px'});




	var IMG_src;
	var column;
	var row;
	var height;
	var width;
	var TemplateIndex;

	if(g_pageState == "telemetry"){
		IMG_src = telemetry_IMG_src;
		column = 2;
		row = 5;
		
		

		if(cmd == "add"){
			TemplateIndex = -1;
		}
		else{
			TemplateIndex = g_TemplateIndexTeleCurrent;
		}
	}
	else{
		IMG_src = homescreen_IMG_src;
		column = 1;
		row = 3;
		
		
		TemplateIndex = g_TemplateIndexHome;
	}

	height = (row * 69) + 'px';
	width = (column * 129) + 'px';

	htmlPopupListContent = '';
	count = 0;

	for(var i = 0; i < column; i++){
		htmlPopupListColumn = '';

		for(var j = 0; j < row; j++){
			if(TemplateIndex == count){
				clickedClass = 'popup-list-clicked';
			}
			else{
				clickedClass = '';
			}
			
			
			if(count == 14){
				htmlPopupListColumn += '<li id="Template__' + count + '" class="function-list-name ' + clickedClass + '" style="width: 120px; height: 60px; padding: 7px 0 0 7px; display: none;" onclick=\'closePopupPresetList("Template__' + count + '");\'><img src="' + IMG_src[count] + '" alt="" draggable="false"/></li>';
			}
			else{
				htmlPopupListColumn += '<li id="Template__' + count + '" class="function-list-name ' + clickedClass + '" style="width: 120px; height: 60px; padding: 7px 0 0 7px;" onclick=\'closePopupPresetList("Template__' + count + '");\'><img src="' + IMG_src[count] + '" alt="" draggable="false"/></li>';
			}
			
			
			if(count == 3){
				count = 14;
			}
			else if(count == 14){
				count = 4;
			}
			else if(count == 7){
				count = 15;
			}
			else{
				count++;
			}
		}

		htmlPopupListContent += '<div><ul>' + htmlPopupListColumn + '</ul></div>';
	}

	var htmlPopupList = '' +
		'<div id="popup-wrapper">' +
			'<div id="popup-outer">' +
				'<div id="PopUp_List_Container" class="popup-list-outer" style="height: ' + height + '; width: ' + width + '; overflow: hidden;">' +
					'<div id="scrollContainerPopUpInnerVertical" style="position: relative; top: 0px;">' +
						'<div id="PopupList" class="popup-list-inner">' +
							htmlPopupListContent +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div id="PopupArrowLeft"  style="margin-top: 0px; margin-left: 0px; display: none;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAZAgMAAABFkkY6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNzlCQzA1MUREMTExMUUyQjQ0REVGOUExMUE1NUJBMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNzlCQzA1MkREMTExMUUyQjQ0REVGOUExMUE1NUJBMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM3OUJDMDRGREQxMTExRTJCNDRERUY5QTExQTU1QkEzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM3OUJDMDUwREQxMTExRTJCNDRERUY5QTExQTU1QkEzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+H9VfTQAAAAlQTFRFfqTJ////fqTJSpnuuwAAAAJ0Uk5TAAB2k804AAAAOklEQVQI1z3NsQ0AQAzCwNOXGSX7sgRTfpcOybKB4AUTbNDwGqZhG9p4bUwb20ZvzVE9Y66iV557kw8nPCHAGyl4pAAAAABJRU5ErkJggg==" alt="" draggable="false"/></div>' +
			'<div id="PopupArrowRight" style="margin-top: 0px; margin-left: 0px; display: none;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAZAgMAAABFkkY6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDFDNEE3ODRERDI2MTFFMkI2OEI4QUIyMUFDRjFEMDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDFDNEE3ODVERDI2MTFFMkI2OEI4QUIyMUFDRjFEMDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MUM0QTc4MkREMjYxMUUyQjY4QjhBQjIxQUNGMUQwOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MUM0QTc4M0REMjYxMUUyQjY4QjhBQjIxQUNGMUQwOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnH/20IAAAAJUExURX6kyf///36kyUqZ7rsAAAACdFJOUwAAdpPNOAAAADZJREFUCNc9zcENAAAEQ1FTmscoPYop+Q6VeJGIioyrLBA0zFMgaJinQNAwnuStL+QUJ8vfrhcTaCUFOIUmoAAAAABJRU5ErkJggg==" alt="" draggable="false"/></div>' +
		'</div>';

	var htmlPopupOuter = "<div id=\"Pop_Up_Outer\"></div>";
	$('#Pop_Up').append(htmlPopupOuter);
	$('#Pop_Up_Outer').html(htmlPopupList);

	setPositionPopupList(tagObj);
}


function setPositionPopupList(tagObj){
	var containerWidth = $(tagObj).outerWidth();
	var containerHeight = $(tagObj).outerHeight();
	var containerOffset = $(tagObj).offset();
	var popupListWidth = $('#popup-outer').outerWidth();
	var popupListHeight = $('#popup-outer').outerHeight();
	
	var popupListLeft = 0;
	var popupListMaxHeight = 320 + 90;
	var documentOffsetWidth = $('body').offset().left;
	var documentWidth = $('body').outerWidth();
	var arrowTop = 0;
	var offsetContainerHeight = 8; 

	
	if((containerOffset.top + (containerHeight / 2)) < 240){
		popupListTop = 53;
		arrowTop = popupListHeight + 63;
		
		if((containerOffset.top + (containerHeight / 2)) > (popupListHeight + popupListTop - offsetContainerHeight)){
			
			arrowTop += ((containerOffset.top + containerHeight/2) - (popupListHeight/2 + popupListTop));
			popupListTop += ((containerOffset.top + containerHeight/2) - (popupListHeight/2 + popupListTop));
		}
	}
	else{
		popupListTop = 53 + popupListMaxHeight - popupListHeight;
		arrowTop = popupListMaxHeight + 63;
		
		if((containerOffset.top + (containerHeight / 2) - offsetContainerHeight) < (popupListTop)){
			
			arrowTop -= (popupListTop - containerOffset.top - containerHeight/2 + popupListHeight/2);
			popupListTop -= (popupListTop - containerOffset.top - containerHeight/2 + popupListHeight/2);
		}
	}
	
	popupListTop += 4;
	arrowTop += 4;

	
	if((containerOffset.left - documentOffsetWidth + (containerWidth/2)) > 400){
		popupListLeft = containerOffset.left - popupListWidth - documentOffsetWidth;

		if((documentOffsetWidth) > (containerOffset.left - popupListWidth)){
			
			popupListLeft += documentOffsetWidth - containerOffset.left - popupListWidth;
		}

		$('#PopupArrowRight').show();
		$('#PopupArrowRight').css({'margin-left': (popupListWidth-5) + 'px', 'margin-top': (containerOffset.top + (containerHeight / 2) - arrowTop) + 'px'});
	}
	else{
		popupListLeft = containerOffset.left + containerWidth - documentOffsetWidth;

		if((documentOffsetWidth + documentWidth) < (containerOffset.left + containerWidth + popupListWidth)){
			
			popupListLeft-= (containerOffset.left + containerWidth + popupListWidth) - (documentOffsetWidth + documentWidth);
		}

		$('#PopupArrowLeft').show();
		$('#PopupArrowLeft').css({'margin-left': '-11px', 'margin-top': (containerOffset.top + (containerHeight / 2) - arrowTop) + 'px'});
	}

	$('#Pop_Up').css({'padding-left': popupListLeft + 'px', 'top': popupListTop + 'px'});
}


function closePopupPresetList(tagId){
	TemplateIndex = parseInt((tagId.split("__"))[1]);

	if(g_pageState == "homescreen"){
		submitSET_Screen(0, "HomeScreenAdjustment", TemplateIndex);
		$("#Container_HomeScreen").html(getTemplateHomeScreen(TemplateIndex));
		$('#Screen_Switch_Button_Main_HomeScreen_Background').css("background-image", "url(" + homescreen_IMG_src[TemplateIndex] + ")");
		g_TemplateIndexHome = TemplateIndex;
		refreshText(g_initTelObj);
	}
	else{
		if(g_popupListCmd == "add"){
			submitARD("add", 1);
			g_template2Add = TemplateIndex;
			
			g_List_Count++;
			
			if(g_List_Count > 6){
				if(g_List_Count == 7){
					setCSS('Telemetry_Arrow_Left', 'visibility', 'visible');
					setCSS('Telemetry_Arrow_Right', 'visibility', 'visible');
				}

				scrollTemplates('End', '1');

				if(g_List_Count == g_maxTemplateCount){
					setCSS('Telemetry_Arrow_Right', 'visibility', 'hidden');
				}
			}
			
			if(g_List_Count == g_maxTemplateCount){
				$('#Add_Button_Box').addClass('inactive');
			}
		}
		else{
			submitSET_Screen(g_TelemetryPageState, "TelemetryScreenAdjustment", TemplateIndex);
			$("#Container_" + g_TelemetryPageState).html(getTemplateTelemetry(TemplateIndex, g_TelemetryPageState));
			g_TemplateIndexTeleCurrent = TemplateIndex;
			g_TemplateIndexTele[g_TelemetryPageState] = g_TemplateIndexTeleCurrent;

			$('#Screen_Switch_Button_' + g_TelemetryPageState + '_Background').css("background-image", "url(" + telemetry_IMG_src[TemplateIndex] + ")");
			$('#Screen_Switch_Button_Main_Telemetry_Background').css("background-image", "url(" + telemetry_IMG_src[TemplateIndex] + ")");
			refreshText(g_initTelObj);
		}
	}

	$('#Pop_Up_Outer').remove();
}



if(isBAT){
	$(window).keypress(function (e){
		if(g_List_Count > 6){
			var c = e.charCode;

			if((c == CONST_SCROLLING_Key_e) || (c == CONST_SCROLLING_Key_d) || (c == CONST_SCROLLING_Key_c) || (c == CONST_SCROLLING_Key_w) || (c == CONST_SCROLLING_Key_s)|| (c == CONST_SCROLLING_Key_x)){			
				switch(c){
					case CONST_SCROLLING_Key_e:	scrollTemplates('Left', '1');	break;
					case CONST_SCROLLING_Key_d:	scrollTemplates('Left', '2');	break;
					case CONST_SCROLLING_Key_c:	scrollTemplates('Left', '3');	break;
					case CONST_SCROLLING_Key_w:	scrollTemplates('Right', '1');	break;
					case CONST_SCROLLING_Key_s:	scrollTemplates('Right', '2');	break;
					case CONST_SCROLLING_Key_x:	scrollTemplates('Right', '3');	break;
				}
			}
		}
	});
}


function scrollTemplates(direction, steps){
	var scrollMargin_min = -127 * (g_List_Count - 6);
	var scrollMargin_max = 0;

	var currentMargin = document.getElementById('ScrollContainer').style.marginLeft;
	currentMargin = parseInt(currentMargin.slice(0, -2));

	if(direction == 'Left'){
		currentMargin = currentMargin - (steps * 127);
	}
	else if(direction == 'Right'){
		currentMargin = currentMargin + (steps * 127);
	}
	else if(direction == 'Start'){
		currentMargin = scrollMargin_max;
	}
	else if(direction == 'End'){
		currentMargin = scrollMargin_min;
	}

	if(currentMargin > 0){
		currentMargin = scrollMargin_max;
	}
	else if(currentMargin < scrollMargin_min){
		currentMargin = scrollMargin_min;
	}

	document.getElementById('ScrollContainer').style.marginLeft = currentMargin + 'px';

	if(currentMargin == scrollMargin_max){
		if(g_List_Count > 6){
			
			
			setCSS('Telemetry_Arrow_Left', 'visibility', 'hidden');
			setCSS('Telemetry_Arrow_Right', 'visibility', 'visible');
		}
		else{
			
			
			setCSS('Telemetry_Arrow_Left', 'visibility', 'hidden');
			setCSS('Telemetry_Arrow_Right', 'visibility', 'hidden');
		}
	}
	else if(currentMargin == scrollMargin_min){
		setCSS('Telemetry_Arrow_Left', 'visibility', 'visible');
		setCSS('Telemetry_Arrow_Right', 'visibility', 'hidden');
	}
	else{
		setCSS('Telemetry_Arrow_Left', 'visibility', 'visible');
		setCSS('Telemetry_Arrow_Right', 'visibility', 'visible');
	}
}
