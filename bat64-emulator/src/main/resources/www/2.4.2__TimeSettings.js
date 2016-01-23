


var Limits = new Object();

Limits.Hour   = 23;
Limits.Minute = 59;
Limits.Second = 59;
Limits.Day    = 31;
Limits.Month  = 12;
Limits.Year   = 9999;

var currentTimeFunction;
var timeDateFormat = {};
timeDateFormat.Time = new Array("24h", "12h");
timeDateFormat.Date = new Array("DD.MM.YYYY", "YYYY.MM.DD", "MM.DD.YYYY");

var isAM_PM = false;
var g_isSync =  0;

initPage();

function initPage(){

	


	$('#Save_Button').bind("click", function(){setChanges(true);});
	$('#Cancel_Button').bind("click", function(){setChanges(false);});

	$('#Drop_Down_Content_Left').bind('click', function(){	('Left');});
	$('#Drop_Down_Arrow_Left').bind('click', function(){toggleDropDown('Left');});
	$('#Drop_Down_Content_Right').bind('click', function(){toggleDropDown('Right');});
	$('#Drop_Down_Arrow_Right').bind('click', function(){toggleDropDown('Right');});

	$('#Option_0_Left').bind('click', function(){setOption(0, "Left", timeDateFormat.Time[0], false);});
	$('#Option_1_Left').bind('click', function(){setOption(1, "Left", timeDateFormat.Time[1], false);});

	$('#Option_0_Right').bind('click', function(){setOption(0, "Right", timeDateFormat.Date[0], false);});
	$('#Option_1_Right').bind('click', function(){setOption(1, "Right", timeDateFormat.Date[1], false);});
	$('#Option_2_Right').bind('click', function(){setOption(2, "Right", timeDateFormat.Date[2], false);});

	$('#Date_Time').bind('click', function(e){
												clearInterval(currentTimeFunction);
												setDateTime(e);
												hideHTML('Navi_Box');
												showHTML('Save_Cancel_Box');
											});

	$('#Time_Sync').bind('click', function(){toggleSync(false);});

	InitDataPostArgsExtended = {};
	GetTd(getTimeObject(InitDataPostArgsExtended), g_SetEvent, "get");
	
	setInterval(JsonFunction, 250);
}



function getTimeObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	var xmlObj = new Object();

	ModelName = "general-settings";
	cmd = "get";
	ListType = "TimeSetup";


	InitDataPostArgsExtended[cmd] = {};
	InitDataPostArgsExtended[cmd][ModelName] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType]["SyncGPS"] = -1;
	InitDataPostArgsExtended[cmd][ModelName][ListType]["FormatTime"] = -1;
	InitDataPostArgsExtended[cmd][ModelName][ListType]["FormatDate"] = -1;
	
	return InitDataPostArgsExtended;	
}



function onEVENT_INIT(e){
	try{

	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "get"){
			handleGET(e.EventData.get);
		}
		if(e.cmd == "set"){

		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}


function getDateTemplate(index){
	if(g_isSync){
		styledisplay = 'style="display: none;"';
	}
	else{
		styledisplay = '';
	}

	htmlDay =	'<div class="time_block">' +
					'<div class="arrow_box"><img id="Date_Day_Up" width="50" height="55" ' + styledisplay + ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA3CAYAAABO8hkCAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIeSURBVHja7Nm/TsJAHAfwK6JGDYlOakwMPgOJ/17CN/AV4AUc3IyTg0EYGVyNf0ajLoRAYGCBQBhYXWhSVDSN5fyduZKjoRTaKxX8XfINpTTHfXqQ8PuhUErJLIwQmZGBEIQgBCEIQQhCEIIQhDiOsPhEURSZc7PJ5njYMHik1g1mGRL26QYxxCJkBbLMF/8JeYfosjFSPlrsjogREGuQnUqlclUsFs/heJufW2DXCNfL2xovk9ogNiGHhULhmfKRyWTu4NweZINfo8iA9N5bFsSKyOfzL1QYjUaDptPpByvmT0EsiINcLvckIgzDoK1Wi9brdekYaRAnBBvdbpfquu4LRhbEEeE3RgZkZISfGK+QsRFDMPdeMF4grhF2mFQqdesW4xbiGSEb4wbSh8hms4/U45CBGRciHSELMw7EN4QMzKgQ3xFeMaNAJobwgnGCTBzhFjMMEhjCAbMLWbdi7CAiYj8IxCBMrVajyWTyZhDGXHtfcQM1e4iXp1ulUuksFosdsfPtdpuoqkrg5/jEmwoAIp1Oh2iaRsrl8nU8Hj+F06+QD/ayuX4rhNXwkWazeRGNRo+r1SphYZMEgRAxsDu/j7DGy0QiccLr/287CNuRJcgqr68jZo0dcLeny5sWbxAVokG+hu2IwjsrbPHz/DhoRO97zXaAg3SztWQHmbrG3MC+1jT/5469X4QgBCEIQQhCEIIQhPwfyI8AAwDpecKKsnOsxgAAAABJRU5ErkJggg==" alt="" draggable="false" /></div>' +
					'<div id="Today_Date_Day" class="time">01</div>' +
					'<div class="arrow_box"><img id="Date_Day_Down" width="50" height="55" ' + styledisplay + ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA3CAYAAABO8hkCAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIHSURBVHja7NpLTsJgEAdwCsRHovGxUQ9g4tbE+DoOEG7AGjgBC7eExMS4YGFQTHhqN5yABQu4ASyUGE3UwjjVr6a0FWiZlqozyT/0ow2ZH20IHZAAIPAXKhj4I8UQhjCEIQxhCEMYwhCG/B9IWL+QsPAhhFkQUfdLPulVvXFSMO+YN7EN2v1U2HCwJABrmE3MqlgHfYBQm3/CPGAeMQPxvDgCRVoEbL3T6ZyBD6vVakE+nz/HHje0k/DduwESFGdht9FoXPgF0G63IZvNQjweL2Bve6LH4DiIemktYrYwh+Vy+WpezSuKAt1uF6rVKiSTSYhEIjXs6RizI3qUxkFMGHyhgk8QJ0bEJIges4058hJjBzENxISpVCoFvyGmhXiKcYKwA/EE4xRhF+IqZhaEE4grGD0ilUrZRjiFkH6aaYharfaJiEajd3YRs0BIMFSIWSEmTL1ev5kHggJiwmBjRa8RVBCry6zoJYISMhVGRfR6PXIEKcTwrdkS4xaCHPITZjgcQr/fB1mWIZ1OQywWk3HfKRXCFYgVplQqXTebTchkMiri3oig+P3SFYgFZj+Xy10mEolb3D4QiCUNQQkZeVe+higkpQ0xVjDLYv2Ceca8jgwNCCAB4+klhGiYkEhATD0GlAg9JOzBHErxfED3m/88wLNfhjCEIQxhCEMYwhCGTKwPAQYA6cyodLbMj7sAAAAASUVORK5CYII=" alt="" draggable="false" /></div>' +
				'</div>';

	htmlMonth = '<div class="time_block">' +
					'<div class="arrow_box"><img id="Date_Month_Up" width="50" height="55" ' + styledisplay + ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA3CAYAAABO8hkCAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIeSURBVHja7Nm/TsJAHAfwK6JGDYlOakwMPgOJ/17CN/AV4AUc3IyTg0EYGVyNf0ajLoRAYGCBQBhYXWhSVDSN5fyduZKjoRTaKxX8XfINpTTHfXqQ8PuhUErJLIwQmZGBEIQgBCEIQQhCEIIQhDiOsPhEURSZc7PJ5njYMHik1g1mGRL26QYxxCJkBbLMF/8JeYfosjFSPlrsjogREGuQnUqlclUsFs/heJufW2DXCNfL2xovk9ogNiGHhULhmfKRyWTu4NweZINfo8iA9N5bFsSKyOfzL1QYjUaDptPpByvmT0EsiINcLvckIgzDoK1Wi9brdekYaRAnBBvdbpfquu4LRhbEEeE3RgZkZISfGK+QsRFDMPdeMF4grhF2mFQqdesW4xbiGSEb4wbSh8hms4/U45CBGRciHSELMw7EN4QMzKgQ3xFeMaNAJobwgnGCTBzhFjMMEhjCAbMLWbdi7CAiYj8IxCBMrVajyWTyZhDGXHtfcQM1e4iXp1ulUuksFosdsfPtdpuoqkrg5/jEmwoAIp1Oh2iaRsrl8nU8Hj+F06+QD/ayuX4rhNXwkWazeRGNRo+r1SphYZMEgRAxsDu/j7DGy0QiccLr/287CNuRJcgqr68jZo0dcLeny5sWbxAVokG+hu2IwjsrbPHz/DhoRO97zXaAg3SztWQHmbrG3MC+1jT/5469X4QgBCEIQQhCEIIQhPwfyI8AAwDpecKKsnOsxgAAAABJRU5ErkJggg==" alt="" draggable="false" /></div>' +
					'<div id="Today_Date_Month" class="time">01</div>' +
					'<div class="arrow_box"><img id="Date_Month_Down" width="50" height="55" ' + styledisplay + ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA3CAYAAABO8hkCAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIHSURBVHja7NpLTsJgEAdwCsRHovGxUQ9g4tbE+DoOEG7AGjgBC7eExMS4YGFQTHhqN5yABQu4ASyUGE3UwjjVr6a0FWiZlqozyT/0ow2ZH20IHZAAIPAXKhj4I8UQhjCEIQxhCEMYwhCG/B9IWL+QsPAhhFkQUfdLPulVvXFSMO+YN7EN2v1U2HCwJABrmE3MqlgHfYBQm3/CPGAeMQPxvDgCRVoEbL3T6ZyBD6vVakE+nz/HHje0k/DduwESFGdht9FoXPgF0G63IZvNQjweL2Bve6LH4DiIemktYrYwh+Vy+WpezSuKAt1uF6rVKiSTSYhEIjXs6RizI3qUxkFMGHyhgk8QJ0bEJIges4058hJjBzENxISpVCoFvyGmhXiKcYKwA/EE4xRhF+IqZhaEE4grGD0ilUrZRjiFkH6aaYharfaJiEajd3YRs0BIMFSIWSEmTL1ev5kHggJiwmBjRa8RVBCry6zoJYISMhVGRfR6PXIEKcTwrdkS4xaCHPITZjgcQr/fB1mWIZ1OQywWk3HfKRXCFYgVplQqXTebTchkMiri3oig+P3SFYgFZj+Xy10mEolb3D4QiCUNQQkZeVe+higkpQ0xVjDLYv2Ceca8jgwNCCAB4+klhGiYkEhATD0GlAg9JOzBHErxfED3m/88wLNfhjCEIQxhCEMYwhCGTKwPAQYA6cyodLbMj7sAAAAASUVORK5CYII=" alt="" draggable="false" /></div>' +
				'</div>';


	htmlYear = 	'<div class="year">' +
					'<div class="arrow_box year"><img id="Date_Year_Up" width="50" height="55" ' + styledisplay + ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA3CAYAAABO8hkCAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIeSURBVHja7Nm/TsJAHAfwK6JGDYlOakwMPgOJ/17CN/AV4AUc3IyTg0EYGVyNf0ajLoRAYGCBQBhYXWhSVDSN5fyduZKjoRTaKxX8XfINpTTHfXqQ8PuhUErJLIwQmZGBEIQgBCEIQQhCEIIQhDiOsPhEURSZc7PJ5njYMHik1g1mGRL26QYxxCJkBbLMF/8JeYfosjFSPlrsjogREGuQnUqlclUsFs/heJufW2DXCNfL2xovk9ogNiGHhULhmfKRyWTu4NweZINfo8iA9N5bFsSKyOfzL1QYjUaDptPpByvmT0EsiINcLvckIgzDoK1Wi9brdekYaRAnBBvdbpfquu4LRhbEEeE3RgZkZISfGK+QsRFDMPdeMF4grhF2mFQqdesW4xbiGSEb4wbSh8hms4/U45CBGRciHSELMw7EN4QMzKgQ3xFeMaNAJobwgnGCTBzhFjMMEhjCAbMLWbdi7CAiYj8IxCBMrVajyWTyZhDGXHtfcQM1e4iXp1ulUuksFosdsfPtdpuoqkrg5/jEmwoAIp1Oh2iaRsrl8nU8Hj+F06+QD/ayuX4rhNXwkWazeRGNRo+r1SphYZMEgRAxsDu/j7DGy0QiccLr/287CNuRJcgqr68jZo0dcLeny5sWbxAVokG+hu2IwjsrbPHz/DhoRO97zXaAg3SztWQHmbrG3MC+1jT/5469X4QgBCEIQQhCEIIQhPwfyI8AAwDpecKKsnOsxgAAAABJRU5ErkJggg==" alt="" draggable="false" /></div>' +
					'<div id="Today_Date_Year" class="time">2000</div>' +
					'<div class="arrow_box year"><img id="Date_Year_Down" width="50" height="55" ' + styledisplay + ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA3CAYAAABO8hkCAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIHSURBVHja7NpLTsJgEAdwCsRHovGxUQ9g4tbE+DoOEG7AGjgBC7eExMS4YGFQTHhqN5yABQu4ASyUGE3UwjjVr6a0FWiZlqozyT/0ow2ZH20IHZAAIPAXKhj4I8UQhjCEIQxhCEMYwhCG/B9IWL+QsPAhhFkQUfdLPulVvXFSMO+YN7EN2v1U2HCwJABrmE3MqlgHfYBQm3/CPGAeMQPxvDgCRVoEbL3T6ZyBD6vVakE+nz/HHje0k/DduwESFGdht9FoXPgF0G63IZvNQjweL2Bve6LH4DiIemktYrYwh+Vy+WpezSuKAt1uF6rVKiSTSYhEIjXs6RizI3qUxkFMGHyhgk8QJ0bEJIges4058hJjBzENxISpVCoFvyGmhXiKcYKwA/EE4xRhF+IqZhaEE4grGD0ilUrZRjiFkH6aaYharfaJiEajd3YRs0BIMFSIWSEmTL1ev5kHggJiwmBjRa8RVBCry6zoJYISMhVGRfR6PXIEKcTwrdkS4xaCHPITZjgcQr/fB1mWIZ1OQywWk3HfKRXCFYgVplQqXTebTchkMiri3oig+P3SFYgFZj+Xy10mEolb3D4QiCUNQQkZeVe+higkpQ0xVjDLYv2Ceca8jgwNCCAB4+klhGiYkEhATD0GlAg9JOzBHErxfED3m/88wLNfhjCEIQxhCEMYwhCGTKwPAQYA6cyodLbMj7sAAAAASUVORK5CYII=" alt="" draggable="false" /></div>' +
				'</div>';

	htmlSeperator = '<div class="seperater">.</div>';

	switch(index){
		case 0: htmlDate = htmlDay + htmlSeperator + htmlMonth + htmlSeperator + htmlYear; break;
		case 1: htmlDate = htmlYear + htmlSeperator + htmlMonth + htmlSeperator + htmlDay; break;
		case 2: htmlDate = htmlMonth + htmlSeperator + htmlDay + htmlSeperator + htmlYear; break;
		default: htmlDate = htmlDay + htmlSeperator + htmlMonth + htmlSeperator + htmlYear; break;
	}

	return htmlDate;
}


function setChanges(isSave){
	if(isSave){


		submitSET(true);
	}
	else{
		currentTimeFunction = setInterval(function(){
			DateTime();
		}, 1000);








	}
	showHTML('Navi_Box');
	hideHTML('Save_Cancel_Box');
}

function getAttrObj(tagId, value){
	Attribute = new Object();

	if(tagId[1] == "High"){
		Attribute["Hi"] = value;

		return Attribute;
	}

	if(tagId[1] == "Center"){
		Attribute["Center"] = value;

		return Attribute;
	}

	if(tagId[1] == "Low"){
		Attribute["Lo"] = value;

		return Attribute;
	}

	return Attribute;
}


function submitSET(isFull, node, value){
	var xmlObj = new Object();

	ModelName = "general-settings";
	cmd = "set";
	ListType = "TimeSetup";

	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType]["Time"] = {};

	if(isFull){
		xmlObj[cmd][ModelName][ListType]["Time"]["Year"] = parseInt(getHTML("Today_Date_Year"),10);
		xmlObj[cmd][ModelName][ListType]["Time"]["Month"] = parseInt(getHTML("Today_Date_Month"),10);
		xmlObj[cmd][ModelName][ListType]["Time"]["Day"] = parseInt(getHTML("Today_Date_Day"),10);
		xmlObj[cmd][ModelName][ListType]["Time"]["Hour"] = convertTo24_PM(parseInt(getHTML("Today_Time_Hour"),10));
		xmlObj[cmd][ModelName][ListType]["Time"]["Minute"] = parseInt(getHTML("Today_Time_Minute"),10);
		xmlObj[cmd][ModelName][ListType]["Time"]["Second"] = parseInt(getHTML("Today_Time_Second"),10);
	}
	else{
		if(node == "Hour"){
			value = convertTo24_PM(value);
			xmlObj[cmd][ModelName][ListType]["Time"][node] = value;
		}
		else if((node == "SyncGPS") || (node == "FormatTime") || (node == "FormatDate")){
			xmlObj[cmd][ModelName][ListType][node] = value;
		}
	}




	GetTd(xmlObj, g_SetEvent, cmd);
}


function handleGET(TdJson){
	g_isSync = TdJson.TimeSetup.SyncGPS;
	if(g_isSync){
		toggleSync(true);
	}
	var timeFormat = TdJson.TimeSetup.FormatTime;
	var dateFormat = TdJson.TimeSetup.FormatDate;
	toggleDropDown("Left");
	setOption(timeFormat, "Left", timeDateFormat.Time[timeFormat], true);
	toggleDropDown("Right");
	setOption(dateFormat, "Right", timeDateFormat.Date[dateFormat], true);
}


function toggleDropDown(side){
	$('#Drop_Down_Options_' + side).toggle();
}


function setOption(index, side, content, isInit){
	showHTML('Option_0_' + side);
	showHTML('Option_1_' + side);

	if(side == "Right"){
		showHTML('Option_2_' + side);
	}

	hideHTML('Option_' + index + '_' + side);

	switch(index){
		case 0: setHTML('Drop_Down_Content_' + side, content);

				if(side == "Left"){
					Limits.Hour = 23;
					hideHTML("Time_Format");
					isAM_PM = false;
					
					timeFormat = getHTML('Today_Time_Format');
					hour = parseInt(getHTML('Today_Time_Hour'),10);

					if((timeFormat == "PM") && (hour != 12)){
						hour += 12;
						setHTML("Today_Time_Hour", getLeadZero(hour));
					}

					if((timeFormat == "AM") && (hour == 12)){
						hour -= 12;
						setHTML("Today_Time_Hour", getLeadZero(hour));
					}
				}
				else{
					setHTML('Date', getDateTemplate(index));
				}
				break;
		case 1: setHTML('Drop_Down_Content_' + side, content);

				if(side == "Left"){
					Limits.Hour = 12;
					showHTML("Time_Format");
					isAM_PM = true;

					
					hour = parseInt(getHTML('Today_Time_Hour'),10);

					if(hour > 12){
						hour -= 12;
						setHTML("Today_Time_Hour", getLeadZero(hour));
						setHTML("Today_Time_Format", 'PM');
					}
					else if(hour == 12){
						setHTML("Today_Time_Format", 'PM');
					}
					else if(hour == 0){
						hour += 12;
						setHTML("Today_Time_Hour", getLeadZero(hour));
						setHTML("Today_Time_Format", 'AM');
					}
					else{
						setHTML("Today_Time_Format", 'AM');
					}
				}
				else{
					setHTML('Date', getDateTemplate(index));
				}
				break;
		case 2: setHTML('Drop_Down_Content_' + side, content);
				setHTML('Date', getDateTemplate(index));
				break;
		}

	toggleDropDown(side);
	
	if(!isInit){
		if(side == "Left"){
			submitSET(false, "FormatTime", index);
		}
		else{
			submitSET(false, "FormatDate", index);
		}
	}

}


function toggleSync(isInit){
	
	$('#Time_Hour_Up').toggle();
	$('#Time_Hour_Down').toggle();
	$('#Time_Minute_Up').toggle();
	$('#Time_Minute_Down').toggle();
	$('#Time_Second_Up').toggle();
	$('#Time_Second_Down').toggle();
	$('#Time_Format_Up').toggle();
	$('#Time_Format_Down').toggle();

	$('#Date_Day_Up').toggle();
	$('#Date_Day_Down').toggle();
	$('#Date_Month_Up').toggle();
	$('#Date_Month_Down').toggle();
	$('#Date_Year_Up').toggle();
	$('#Date_Year_Down').toggle();

	$('#Time_Sync_Img').toggle();







	if(!isInit){
		g_isSync^= 1;
		
		submitSET(false, "SyncGPS", g_isSync);
	}	
}


function setDateTime(e){
	if((e.target.id != "") && (e.target.id != "Date_Time")){
		tagId = e.target.id.split("_");

		if(tagId[1] == "Format"){
			toggleAM_PM();
			
		}
		else if(tagId[2] == "Up"){
			value = parseInt(getHTML('Today_' + tagId[0] + '_' + tagId[1]),10);
			value++;

			if((tagId[1] == "Hour") && (Limits["Hour"] == 12)){
				if(value == 12)
					toggleAM_PM();
			}

			setHTML('Today_' + tagId[0] + '_' + tagId[1], checkLimits(tagId, value));
		}
		else{
			value = parseInt(getHTML('Today_' + tagId[0] + '_' + tagId[1]),10);
			value--;

			if((tagId[1] == "Hour") && (Limits["Hour"] == 12)){
				if(value == 11)
					toggleAM_PM();
			}

			setHTML('Today_' + tagId[0] + '_' + tagId[1], checkLimits(tagId, value));
		}
	}
}


function checkLimits(tagId, value){
	if((tagId[1] == "Day") || (tagId[1] == "Month") || Limits.Hour == 12){
		limitMin = 1;
	}
	else{
		limitMin = 0;
	}

	if(value < limitMin){
		value = Limits[tagId[1]];
	}

	if(value > Limits[tagId[1]]){
		value = limitMin;
	}

	
	if(tagId[1] == "Month"){
		if((value == 2) || (value == 4) || (value == 6) || (value == 9) || (value == 11)){
			Limits.Day = 30;

			if(value == 2){
				Limits.Day = 28;
				year = parseInt(getHTML('Today_Date_Year'), 10);

				if((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))){
					Limits.Day = 29;
				}
			}

			day = parseInt(getHTML('Today_Date_Day'), 10);

			if(day > Limits.Day){
				setHTML('Today_Date_Day', Limits.Day);
				
			}
		}
		else{
			Limits.Day = 31;
		}
	}

	
	if(tagId[1] == "Year"){
		month = parseInt(getHTML('Today_Date_Month'), 10);

		if(month == 2){
			if((value % 4 == 0) && ((value % 100 != 0) || (value % 400 == 0))){
				Limits.Day = 29;
			}
			else{
				Limits.Day = 28;
				day = parseInt(getHTML('Today_Date_Day'), 10);

				if(day > Limits.Day){
					setHTML('Today_Date_Day', Limits.Day);
					
				}
			}
		}
	}

	

	return getLeadZero(value);
}


function toggleAM_PM(){
	timeFormat = getHTML("Today_Time_Format");

	if(timeFormat == "AM"){
		setHTML("Today_Time_Format", 'PM');
	}
	else{
		setHTML("Today_Time_Format", 'AM');
	}
}


currentTimeFunction = setInterval(function(){
	DateTime();
}, 1000);

function DateTime(){
	var today = new Date();

	var day   = today.getDate();
	var month = today.getMonth() + 1;
	var year  = today.getFullYear();

	setHTML('Today_Date_Year', getLeadZero(year));
	setHTML('Today_Date_Month', getLeadZero(month));
	setHTML('Today_Date_Day', getLeadZero(day));

	var hours   = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();

	convertToAM_PM(hours);
	setHTML('Today_Time_Minute', getLeadZero(minutes));
	setHTML('Today_Time_Second', getLeadZero(seconds));
}

function getLeadZero(value){
	if(value <= 9)
		value = "0" + value;

	return value;
}


function convertToAM_PM(hour){
	if(isAM_PM){
		if(hour > 12){
			hour -= 12;
			setHTML("Today_Time_Format", 'PM');
		}
		else if(hour == 12){
			setHTML("Today_Time_Format", 'PM');
		}
		else if(hour == 0){
			hour += 12;
			setHTML("Today_Time_Format", 'AM');
		}
		else{
			setHTML("Today_Time_Format", 'AM');
		}
	}

	setHTML("Today_Time_Hour", getLeadZero(hour));
}


function convertTo24_PM(hour){
	if(isAM_PM){
		timeFormat = getHTML('Today_Time_Format');

		if((timeFormat == "PM") && (hour != 12)){
			hour += 12;
		}

		if((timeFormat == "AM") && (hour == 12)){
			hour -= 12;
		}
	}

	return hour;
}
