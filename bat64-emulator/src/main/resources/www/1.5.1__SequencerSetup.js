




var g_GET_Parameter = get_GET_Parameter();
var g_SequencerIndex = parseInt((g_GET_Parameter.SequencerIndex), 10);

var g_List_Count = 0;			
var g_List_Indices = [];		
var toggleStateARD = "normal";	
var g_List_PopupListObj = {};
var g_pathObj = {};
var g_telemetry_MEASValue_ActiveSequencer = 11406;
var g_telemetry_MEASValue_Sequencer = 2688 + parseInt(g_SequencerIndex, 10);



initPage();

function initPage(){
	
	initScrollbars('List_Container');


	
	$('#Add_Button').bind("click", function(){AddItem(1);});
	$('#Delete_Button').bind("click", function(){toggleDelete();});
	$('#Navi_Button').removeAttr("href");
	$('#Navi_Button').bind("click", function(){toggleARD('1.5.0__Sequencers.html?SequencerIndex=' + g_SequencerIndex);});
	$('#Sequencer_Block').bind("click", function(){toggleListView();});
	$('#Sequencer_Full').bind("click", function(){toggleListView();});



	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "SequencerTime");
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Servo");
	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	InitDataPostArgs = getServoPopListObject(InitDataPostArgs, g_SequencerIndex);
	GetTd(getSequencerObject(InitDataPostArgs, g_SequencerIndex), g_InitEvent);



	telemtryActiveSequencer = new Object();
 	telemtryActiveSequencer.ID = g_telemetry_MEASValue_ActiveSequencer;
 	telemtryActiveSequencer.Value = 0;
 	telemtryActiveSequencer.ValueStr = "";

	telemtryMEASValue_Sequencer = new Object();
 	telemtryMEASValue_Sequencer.ID = g_telemetry_MEASValue_Sequencer;
 	telemtryMEASValue_Sequencer.Value = 0;
 	telemtryMEASValue_Sequencer.ValueStr = "";
 	telemetryIds.push(telemtryActiveSequencer, telemtryMEASValue_Sequencer);




	TdPostArgs = getCurrentFlightMode(TdPostArgs);


	setInterval(JsonFunction, 250);
}



function getSequencerObject(InitDataPostArgs, Index){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	sequencer = new Object();

	sequencer.Items = "" + Index;
	sequencer.ItemCount = -1;

		Item = new Object();
		Item.Index = -1;
		Item.Name = "";

			failSafe = new Object();
				mode = new Object();
				mode.Index = 1;
				mode.Name = "";
			failSafe.Mode = mode;
			failSafe.Value = 0;
			failSafe.ValueStr = "";
		Item.FailSafe = failSafe;

	sequencerItems = new Array(Item);

	sequencer.Item = sequencerItems;

		current = new Object();
			servos = new Object();
			servos.Index = -1;
			servos.ServoIndex = -1;
			servos.Plug = "";
			servos.Name = "";
			servos.MaxValueStr = "";
			servos.MinValueStr = "";

					pairs = new Object();
					pairs.Index = -1;
					pairs.Start = "";
					pairs.StartValue = "";
					pairs.End = "";
					pairs.EndValue = "";
				pairsItems = new Array(pairs);
			servos.Pairs = pairsItems;

				path = new Object();
				path.Time = -1;
				path.Value= -1;
				pathItems= new Array(path);
			servos.Path = pathItems;

		servosItems = new Array(servos);

	current.Servos = servosItems;

	sequencer.Current = current;

	InitDataPostArgs.Sequencer = sequencer;

	return InitDataPostArgs;
}


function getServoPopListObject(InitDataPostArgs, SequencerIndex){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	Item = new Object();
	Item.Index = -1;
	Item.Name = "";

	servoItems = new Array(Item);

	ServoAssignment = new Object();
	ServoAssignment.Items = "AllValidForSequencer " + SequencerIndex;

	ServoAssignment.Item = servoItems;
	ServoAssignment.ItemCount = 0;

	InitDataPostArgs.Servos = ServoAssignment;

	return InitDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		g_List_Count = 0;
		setHTML("scrollContainerInnerVertical", "");
		g_numpadLimitObj = e.EventData.NumPadLimits;

		if(e.EventData.Servos.ItemCount > 0){
			g_List_PopupListObj = e.EventData.Servos.Item;
		}
		else{
			emptyItem = new Array();
			g_List_PopupListObj = emptyItem;
		}

		setHeaderMaxWidth('Model_Name', 'Sequencer_Name');
		setHTML('Model_Name', e.EventData.ModelName);
		setHTML("Sequencer_Name", e.EventData.Sequencer.Item[0].Name);

		FailSafeMode  = e.EventData.Sequencer.Item[0].FailSafe.Mode.Index;
		FailSafeValue = e.EventData.Sequencer.Item[0].FailSafe.Value;

		if(FailSafeMode == 2){
			FailSafeMode = true;
			drawFailSafeLine(FailSafeValue);
			drawBigFailSafeLine(FailSafeValue);
		}

		if(e.EventData.Sequencer.Current.Servos.Index != -1){
			for(var i = 0; i < e.EventData.Sequencer.Current.Servos.length; i++){
				ServoIndex = e.EventData.Sequencer.Current.Servos[i].ServoIndex;

				ServoPlug = e.EventData.Sequencer.Current.Servos[i].Plug;
				ServoName = e.EventData.Sequencer.Current.Servos[i].Name;
				ServoPath = e.EventData.Sequencer.Current.Servos[i].Path;
				ServoMax =  parseFloat(splitUnitFromValue("199.5%").value); 
				ServoMin =  parseFloat(splitUnitFromValue("-200.0%").value); 

				g_numpadLimitObj[ServoName] = {};
				g_numpadLimitObj[ServoName]["Min"] = ServoMin;
				g_numpadLimitObj[ServoName]["Max"] = ServoMax;
				g_numpadLimitObj[ServoName]["IsSigned"] = 1;
				g_numpadLimitObj[ServoName]["OutputResolution"] = g_numpadLimitObj["Servo"]["OutputResolution"];

				for(var j = 0; j < e.EventData.Sequencer.Current.Servos[i].Pairs.length; j++){
					PairIndex       = e.EventData.Sequencer.Current.Servos[i].Pairs[j].Index;
					PairStart    	= e.EventData.Sequencer.Current.Servos[i].Pairs[j].Start;
					PairStartvalue  = e.EventData.Sequencer.Current.Servos[i].Pairs[j].StartValue;
					PairEnd 		= e.EventData.Sequencer.Current.Servos[i].Pairs[j].End;
					PairEndValue    = e.EventData.Sequencer.Current.Servos[i].Pairs[j].EndValue;

					var newChild = getRowRD(ServoIndex + "_" + PairIndex, ServoName, 'Servo', ServoIndex + "_" + PairIndex);
					$("#scrollContainerInnerVertical").append(newChild);

					$("#Container_" + ServoIndex + "_" + PairIndex).html(getRowOfSequencerServoList(ServoIndex, ServoPlug, ServoName, PairIndex, PairStart, PairStartvalue, PairEnd, PairEndValue));

					g_List_Indices[g_List_Count] = ServoIndex + "_" + PairIndex;
					g_List_Count++;
				}

				g_pathObj[ServoIndex] = {};
				g_pathObj[ServoIndex]["Path"] = Array2Opject(ServoPath);
				g_pathObj[ServoIndex]["lfd"] = i;

				setHTML('Sequencer_ServoName_' + i, ServoName);
				showHTML('Sequencer_Servo_' + i);

				setHTML('Sequencer_FServoName_' + i, ServoName);
				showHTML('Sequencer_FServo_' + i);

				drawSequenceLine(ServoIndex, g_pathObj[ServoIndex]);
				drawBigSequenceLine(ServoIndex, g_pathObj[ServoIndex]);
			}
		}

		ScrollRefresh();
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "telemetry"){
		if(key == g_telemetry_MEASValue_ActiveSequencer){
			value = value&(0x1 << g_SequencerIndex);

			if(typeof MEASValue_ActiveSequencer_preValue ==  "undefined"){
				MEASValue_ActiveSequencer_preValue = 0;
			}

			if(MEASValue_ActiveSequencer_preValue != value){
				if(value){
					setCSS('EndpositionBar', 'marginLeft', '100%');
					setCSS('FEndpositionBar', 'marginLeft', '100%');
				}
				else{
					setCSS('EndpositionBar', 'marginLeft', ("0%"));
					setCSS('FEndpositionBar', 'marginLeft', ("0%"));
				}

				MEASValue_ActiveSequencer_preValue = value;
			}
		}
		else if(key == g_telemetry_MEASValue_Sequencer){
			if(typeof MEASValue_Sequencer_preValue == "undefined"){
				MEASValue_Sequencer_preValue = 0;
			}

			if(MEASValue_Sequencer_preValue != value){
			 	if(g_isRfConnected == 0){
			 		hideHTML('ReceiverBar');
			 		hideHTML('FReceiverBar');
			 	}
			 	else{
			 		showHTML('ReceiverBar');
			 		showHTML('FReceiverBar');
					setCSS(('ReceiverBar'), 'marginLeft', (value + "%"));
					setCSS(('FReceiverBar'), 'marginLeft', (value + "%"));
					MEASValue_Sequencer_preValue = value;
			 	}
			}
		}
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




function getRowOfSequencerServoList(ServoIndex, ServoPlug, ServoName, PairIndex, PairStart, PairStartvalue, PairEnd, PairEndValue){
	var htmlInnerContainer = '' +
		'<div id="Sequencer__' + ServoIndex + '_' + PairIndex + '_Plug" 	  class="list_sequencer_plug no_edit">' + ServoPlug + '</div>' +
		'<div id="Sequencer__' + ServoIndex + '_' + PairIndex + '_Name" 	  class="list_sequencer_name no_edit">' + ServoName + '</div>' +
		'<div id="Sequencer__' + ServoIndex + '_' + PairIndex + '_Start"      class="list_sequencer_start_at"    onClick=\'showNumpad("Sequencer__' + ServoIndex + '_' + PairIndex + '_Start", "SequencerTime", false, true);\'>' + PairStart + '</div>' +
		'<div id="Sequencer__' + ServoIndex + '_' + PairIndex + '_StartValue" class="list_sequencer_start_value" onClick=\'showNumpad("Sequencer__' + ServoIndex + '_' + PairIndex + '_StartValue", "' + ServoName + '");\'>' + PairStartvalue + '</div>' +
		'<div id="Sequencer__' + ServoIndex + '_' + PairIndex + '_End"     	  class="list_sequencer_stop_at"     onClick=\'showNumpad("Sequencer__' + ServoIndex + '_' + PairIndex + '_End", "SequencerTime", false, true);\'>' + PairEnd + '</div>' +
		'<div id="Sequencer__' + ServoIndex + '_' + PairIndex + '_EndValue"   class="list_sequencer_stop_value"  onClick=\'showNumpad("Sequencer__' + ServoIndex + '_' + PairIndex + '_EndValue", "' + ServoName + '");\'>' + PairEndValue + '</div>';

	return htmlInnerContainer;
}


function setDependingLimits(tagId){
	tagIdArray = tagId.split("__");
	tagIdArray = tagIdArray[1].split("_");
	ServoIndex = parseInt(tagIdArray[0]);
	PairIndex  = parseInt(tagIdArray[1]);
	tagId      = tagIdArray[2];

	var numpadMinValueTemp = "";
	var numpadMaxValueTemp = "";

	if(tagId == "Start"){
		numpadMinValueTemp = getHTML("Sequencer__" + ServoIndex + "_" + (PairIndex-1) + "_End");
		numpadMaxValueTemp = getHTML("Sequencer__" + ServoIndex + "_" + PairIndex + "_End");
	}
	else if(tagId == "End"){
		numpadMinValueTemp = getHTML("Sequencer__" + ServoIndex + "_" + PairIndex + "_Start");
		numpadMaxValueTemp = getHTML("Sequencer__" + ServoIndex + "_" + (PairIndex+1) + "_Start");
	}

	if(typeof numpadMinValueTemp != "undefined"){
		numpadMinValueTemp = parseFloat(splitUnitFromValue(numpadMinValueTemp).value);

		if(!isNaN(numpadMinValueTemp)){
			numpadMinValue = numpadMinValueTemp;
		}
	}

	if(typeof numpadMaxValueTemp != "undefined"){
		numpadMaxValueTemp = parseFloat(splitUnitFromValue(numpadMaxValueTemp).value);

		if(!isNaN(numpadMaxValueTemp)){
			numpadMaxValue = numpadMaxValueTemp;
		}
	}
}

function Array2Opject(array){
	var object = new Object();

	for(var i = 0; i < array.length; i++){
		object[i] = array[i];
	}

	return object;
}


function getAttrObj(tagId, value, ServoIndex, PairIndex){
	Attribute = new Object();
	servoObject = new Object();
	Attribute["Servos"] = new Array(servoObject);
	servoObject["ServoIndex"] = ServoIndex;
	servoObject["Pairs"] = {};
	servoObject["Pairs"]["Index"] = PairIndex;
	servoObject["Pairs"]["Object"] = {};

	if(tagId == "Start"){
		servoObject["Pairs"]["Object"]["Start"] = value;
		g_pathObj[ServoIndex]["Path"][PairIndex*2].Time = value;
		updateSequenceLine(ServoIndex, g_pathObj[ServoIndex]);
		updateBigSequenceLine(ServoIndex, g_pathObj[ServoIndex]);

		return Attribute;
	}

	if(tagId == "StartValue"){
		servoObject["Pairs"]["Object"]["StartValue"] = value;
		g_pathObj[ServoIndex]["Path"][PairIndex*2].Value = value;
		updateSequenceLine(ServoIndex, g_pathObj[ServoIndex]);
		updateBigSequenceLine(ServoIndex, g_pathObj[ServoIndex]);

		return Attribute;
	}

	if(tagId == "End"){
		servoObject["Pairs"]["Object"]["End"] = value;
		g_pathObj[ServoIndex]["Path"][(PairIndex*2)+1].Time = value;
		updateSequenceLine(ServoIndex, g_pathObj[ServoIndex]);
		updateBigSequenceLine(ServoIndex, g_pathObj[ServoIndex]);

		return Attribute;
	}

	if(tagId == "EndValue"){
		servoObject["Pairs"]["Object"]["EndValue"] = value;
		g_pathObj[ServoIndex]["Path"][(PairIndex*2)+1].Value = value;
		updateSequenceLine(ServoIndex, g_pathObj[ServoIndex]);
		updateBigSequenceLine(ServoIndex, g_pathObj[ServoIndex]);

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
	cmd = "set";
	ModelName = "model-settings";

	if(tagId == "Hidden_Info_Box"){
		if(!isNaN(value)){
			cmd = "add";
			ListType ="Sequencer";
			xmlObj = getPathObj(cmd, ModelName);
			xmlObj[cmd][ModelName][ListType] = {};
			xmlObj[cmd][ModelName][ListType]["Servo"] = parseInt(value);
			xmlObj[cmd][ModelName][ListType]["Index"] = g_SequencerIndex;

			GetTd(xmlObj, g_SetEvent, cmd);
		}
	}
	else{
		tagIdArray = tagId.split("__");
		ListType   = tagIdArray[0];
		tagIdArray = tagIdArray[1].split("_");
		ServoIndex = parseInt(tagIdArray[0]);
		PairIndex  = parseInt(tagIdArray[1]);
		tagId      = tagIdArray[2];

		Attr = new Object();
		Attr = getAttrObj(tagId, value, ServoIndex, PairIndex);

		xmlObj = getPathObj(cmd, ModelName);
		xmlObj[cmd][ModelName][ListType] = {};
		xmlObj[cmd][ModelName][ListType] = Attr;
		xmlObj[cmd][ModelName][ListType]["Index"] = parseInt(g_SequencerIndex);

		GetTd(xmlObj, g_SetEvent, cmd);
	}
}


function submitARD(cmd, num){
	var PairIndexCount = 0;







	ModelName = "model-settings";
	ListType = "Sequencer";
	num = num.split("_");
	var ServoIndex = parseInt(num[0], 10);
	var PairIndex  = parseInt(num[1], 10);

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType]["Servo"] = {};
	xmlObj[cmd][ModelName][ListType]["Servo"]["ServoIndex"] = ServoIndex;
	xmlObj[cmd][ModelName][ListType]["Servo"]["Pair"] = PairIndex;
	xmlObj[cmd][ModelName][ListType]["Index"] = g_SequencerIndex;

	delete g_pathObj[ServoIndex]["Path"][PairIndex * 2];
	delete g_pathObj[ServoIndex]["Path"][(PairIndex * 2) + 1];

	updateSequenceLine(ServoIndex, g_pathObj[ServoIndex]);
	updateBigSequenceLine(ServoIndex, g_pathObj[ServoIndex]);

	GetTd(xmlObj, g_SetEvent, cmd);
}



function AddItem(count){
	showPopupList($('#Hidden_Info_Box'), g_List_PopupListObj, false, true, g_popupList_Indices);
	
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
		for(var i = 0; i < g_List_Count; i++){
			hideHTML("Delete_Button_" + g_List_Indices[i]);
		}

		setCSS("List_Container", "width", "674px");
		setCSS("scrollContainerInnerVertical", "width", "674px");
		showHTML("ARD_Buttons");
		toggleStateARD = "normal";
	}
	else if(toggleStateARD == "reorder"){
		for(var i = 1; i < g_List_Count; i++){
			$("#Reorder_Button_" + g_List_Indices[i]).hide();
		}

		setCSS("List_Container", "width", "674px");
		setCSS("scrollContainerInnerVertical", "width", "674px");
		showHTML("ARD_Buttons");
		toggleStateARD = "normal";
	}
}


function toggleListView(){
	var isListView = isShown('Sequencer_List');

	if(isListView == true){
		hideHTML('Sequencer_List');
		hideHTML('Sequencer_Block');
		hideHTML('ARD_Buttons');
		showHTML('Sequencer_Full');
	}
	else{
		hideHTML('Sequencer_Full');
		showHTML('Sequencer_List');
		showHTML('Sequencer_Block');
		showHTML('ARD_Buttons');
	}
}


function isShown(id){
	var state = document.getElementById(id).style.display;
	var state_bool;

	if(state == "" || state == "inline"){
		state_bool = true;
	}
	else{
		state_bool = false;
	}

	return state_bool;
}


function createAddItem(TdJson){	
	log(2, "success ADD: " + JSON.stringify(TdJson));
	GetTd(getSequencerObject(InitDataPostArgs, g_SequencerIndex), g_InitEvent);
}


function drawSequenceLine(index, path){
	var lineIndex = path.lfd;

	var sq = document.getElementById("Sequence_Canvas_" + lineIndex);
	var sl = sq.getContext("2d");

	var lineColor = "#000000";

	switch(lineIndex){
		case 0:		lineColor = "#ff7800";	break;	
		case 1:		lineColor = "#28d228";	break;	
		case 2:		lineColor = "#f3f000";	break;	
		case 3:		lineColor = "#ff7cfa";	break;	
		case 4:		lineColor = "#7000a0";	break;	
		default:	lineColor = "#000000";
	}

	sl.strokeStyle = lineColor;
	sl.lineWidth = 2;

	sl.beginPath();

	var i = 0;
	var key = [];

	for(key in path.Path){
		if(i == 0){
			sl.moveTo(p2x(0), p2y(path.Path[key].Value));
		}

		i++;
		sl.lineTo(p2x(path.Path[key].Time), p2y(path.Path[key].Value));
	}

	if(i != 0){
		sl.lineTo(p2x(100), p2y(path.Path[key].Value));
		sl.stroke();
	}
	else{
		hideHTML('Sequencer_Servo_' + lineIndex);
	}
}


function drawBigSequenceLine(index, path){
	var lineIndex = path.lfd;

	var bsq = document.getElementById("Sequence_FCanvas_" + lineIndex);
	var bsl = bsq.getContext("2d");

	var lineColor = "#000000";

	switch(lineIndex){
		case 0:		lineColor = "#ff7800";	break;	
		case 1:		lineColor = "#28d228";	break;	
		case 2:		lineColor = "#f3f000";	break;	
		case 3:		lineColor = "#ff7cfa";	break;	
		case 4:		lineColor = "#7000a0";	break;	
		default:	lineColor = "#000000";
	}

	bsl.strokeStyle = lineColor;
	bsl.lineWidth = 2;

	bsl.beginPath();

	var i = 0;
	var key = [];

	for(key in path.Path){
		if(i == 0){
			bsl.moveTo(bp2x(0), bp2y(path.Path[key].Value));
		}

		i++;
		bsl.lineTo(bp2x(path.Path[key].Time), bp2y(path.Path[key].Value));
	}

	if(i != 0){
		bsl.lineTo(bp2x(100), bp2y(path.Path[key].Value));
		bsl.stroke();
	}
	else{
		hideHTML('Sequencer_FServo_' + lineIndex);
	}
}


function updateSequenceLine(index, path){
	var sq = document.getElementById("Sequence_Canvas_" + path.lfd);
	var sl = sq.getContext("2d");
	sl.clearRect(0, 0, 589, 84);

	drawSequenceLine(index, path);
}


function updateBigSequenceLine(index, path){
	var bsq = document.getElementById("Sequence_FCanvas_" + path.lfd);
	var bsl = bsq.getContext("2d");
	bsl.clearRect(0, 0, 740, 289);

	drawSequenceLine(index, path);
	drawBigSequenceLine(index, path);
}


function drawFailSafeLine(value){
	var fq = document.getElementById("FailSafe_Canvas");
	var fl = fq.getContext("2d");

	fl.strokeStyle = "#ff0000";
	fl.lineWidth = 2;

	fl.beginPath();

	fl.moveTo(p2x(value), p2y(200));
	fl.lineTo(p2x(value), p2y(-200));

	fl.stroke();
}


function drawBigFailSafeLine(value){
	var bfq = document.getElementById("FailSafe_FCanvas");
	var bfl = bfq.getContext("2d");

	bfl.strokeStyle = "#ff0000";
	bfl.lineWidth = 2;

	bfl.beginPath();

	bfl.moveTo(bp2x(value), bp2y(200));
	bfl.lineTo(bp2x(value), bp2y(-200));

	bfl.stroke();
}


function p2x(percent){
	var xValue = 589 * (percent/100);

	return xValue;
}


function bp2x(percent){
	var xValue = 740 * (percent/100);

	return xValue;
}


function p2y(percent){
	var yValue = 42 - ((percent/200) * 41);

	return yValue;
}


function bp2y(percent){
	var yValue = 149 - ((percent/200) * 148);

	return yValue;
}
