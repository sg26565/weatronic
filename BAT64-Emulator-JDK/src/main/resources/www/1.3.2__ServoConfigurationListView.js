

		
var g_GET_Parameter = get_GET_Parameter();
var g_lastURL = g_GET_Parameter.LastURL;
var g_Wizard = g_GET_Parameter.Wizard;
var g_GroupTagObj = {};
var g_VoltageTagObj = {};
var g_List4TravelSettingsInit = {};
var g_List4TravelSettings = {};
var g_isGraphicViewButton = false;
var g_isServoSyncButton = false;
	
initPage();
	
function initPage(){
	if(g_Wizard){
		showDialogbox("wizard", "wizardStep6", "", 5);
		hideHTML('Navi_Box');
		hideHTML('Option_Box');
		showHTML('Wizard_Box');
		$('#Forward_Button').bind("click", function(){g_isListViewButton = false; setTravel2Limits();});
	}

	$('#Additional_Button').bind("click", function(){gotoServoSync(false);});

	
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Control");
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Servo");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "ServoFrameRate");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "ServoGroupsUser");
	
	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	InitDataPostArgs = getModelConfigObject(InitDataPostArgs);
	GetTd(getServoConfigObject(InitDataPostArgs), g_InitEvent);

		
	setInterval(JsonFunction, 250);
}



function getModelConfigObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

  	ModelConfig = new Object();

  		type = new Object();
  		type.Index = -1;
  		type.Name = "";
  	ModelConfig.Type = type;

 	InitDataPostArgs.ModelConfig = ModelConfig;

	return InitDataPostArgs;
}


function getServoConfigObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	Item = new Object();
	Item.Index = 0;
	Item.Plug = "";
	Item.NormalName = "";
	Item.IsCreatedAuto = -1;

		group = new Object();
		group.Index = -1;
		group.Name = "";
	Item.Group = group;

	Item.MaxValueStr = "";
	Item.MinValueStr = "";
	Item.CenterStr = "";
	Item.IsGizmo = -1;

		voltage = new Object();
		voltage.Index = -1;
		voltage.Name = "";
	Item.Voltage = voltage;

		frameRate = new Object();
		frameRate.Index = -1;
		frameRate.Name = "";
	Item.FrameRate = frameRate;

		isSlave = new Object();
		isSlave.Index = -1;
		isSlave.Name = "";
	Item.IsSlave = isSlave;

		isReverse = new Object();
		isReverse.Index = -1;
		isReverse.Name = "";	
	Item.IsReverse = isReverse;

	servoItems = new Array(Item);

	Servos = new Object();
	Servos.Item = servoItems;

	Servos.ItemCount = 0;
	Servos.Items = "ALL_USED";

	InitDataPostArgs.Servos = Servos;

	return InitDataPostArgs;	
}


function getServoGroupPopupObj(ServoIdx){
	if(typeof ServogroupDataPostArgs == 'undefined'){
		ServogroupDataPostArgs = new Object();
	}

	if(typeof ServogroupDataPostArgs.PopUp == 'undefined'){
		ServogroupDataPostArgs["PopUp"] = {};
	}

	ServogroupDataPostArgs["PopUp"]["ServoGroupsUser"] = {}
	ServogroupDataPostArgs["PopUp"]["ServoGroupsUser"]["ServoIdx"] = ServoIdx;
	ServogroupDataPostArgs["PopUp"]["ServoGroupsUser"]["Items"] = [];

	return ServogroupDataPostArgs;
}


function getServoVoltagePopupObj(ServoIdx){
	if(typeof ServovoltageDataPostArgs == 'undefined'){
		ServovoltageDataPostArgs = new Object();
	}

	if(typeof ServovoltageDataPostArgs.PopUp == 'undefined'){
		ServovoltageDataPostArgs["PopUp"] = {};
	}

	ServovoltageDataPostArgs["PopUp"]["ServoVoltage"] = {}
	ServovoltageDataPostArgs["PopUp"]["ServoVoltage"]["ServoIdx"] = ServoIdx;
	ServovoltageDataPostArgs["PopUp"]["ServoVoltage"]["Items"] = [];

	return ServovoltageDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		
		if(typeof g_lastURL != "undefined"){
			$('#Graphic_View_Button').removeAttr("href");
			$('#Graphic_View_Button').bind("click", function(){
				g_isGraphicViewButton = true;
				setTravel2Limits();
				
			});
			$('#Navi_Button').removeAttr("href");
			$('#Navi_Button').bind("click", function(){
				g_isGraphicViewButton = false;
				setTravel2Limits();
				
			});
		}

		if(!(e.EventData.ModelConfig.Type.Index == 0) && !(g_Wizard)){
			showHTML('Toggle_Buttons');
		}

		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);
		
		g_ModelType = e.EventData.ModelConfig.Type.Name;

		if(g_ModelType == "Helicopter"){
			setCSS('Graphic_View_Button', 'background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANiSURBVHja3JpdSBRRFMdd3YLUEqLEp4woLMLI1NrVVpck6SFri957KiIIopcKgoheqpfIvv0oLTHqJcIHkwgj+qLIICK0AqMvsW21WhF9qOl/4SycLjO7M+Pd8a4Hfrgze+6957/3zp05Z/QZhpHlkRWBCOgAY14MmJ3lnZ0HF8Epz0YUM+cBO43/bbMX47qduRXgBKi26b9XOt5ns91scAhs93LmjtIMxEFNCt9V4K80c5NgqY1x2si/202cbsXlggs08G8QSuK7yzC3bSnGuEJ+P0CZl+ISXKIAfoH1Fj6tFuLOJem3hXxioNxtfCou3CYK5CeoMvn+iYW4Lov+mpmwiqnEpmpnamYCg+z8LPDBQtxLqY9s9kONgLVTjUvl1tvCrsE6OldIS9bMRsEC8vODW0zYOhUxqb63JDaBMRCgZWVlYgctoXY3meCgqnhUi/MxgUPgrJHc6tmMR1UKS4e4BKcNezZIf4fdbvfTIU5w0qbAz3Sj1+bxK5X5QMym7x3wOi1BKEx5FoEasBEEwTIHbT+CB+AeeAi+6JIVlIL7YNxQY6KfHrBch2W5CWwAcxStANFPPWjQIVktSNN1u1gHcY/BiGJhMdpotNhQ8kAJqKQlFQILHbT/Bp6BHvACDIBxnXZLuRj01MHSiqiYKa8KRIdJmFheQxY+w6CXPjeBMt0LRDngBssOVoM9Flv+EWpzlWXctbo+fol8rJPVVsJ0foeFuAhr285+kLBu4oSwDpa28AArLcQFpGziOhNYq4s4Hth3k5pHAZUM5OpXcYqaTEgHce0sH6uwuA77JXED9KOY9XeZlSyqp1NcG9sMktU8Hkniem3WZEYtik5pFZfPMu6YjZpHoySu08YYraymEvBS3DGHA++XxB20OU7iNnHXTZx+l7fHa1THvw2e2/CX87N3NsfZDfrBW50ev2QTTx997LiKHs9mxPu5QZY5TICvM+nlYxxEmdBPmSyuiH3OB+Ugh40paixzpYTXp3OBiFsjiSqlwlGhiU+UZvANLdkDmSKuz2EKI5LTleBPJizLXIf+8120SWn+NImboNLBe7CGlii/pgzaZF6BYvKPZ8qG0k01kDrKyMWSO0PfHafjJSAMJkFXJv2rhnhnvkU6Nw9spXdx/HwDyEtHHP8EGAByU7mnCBHs7wAAAABJRU5ErkJggg==)');
		}
		else{
			setCSS('Graphic_View_Button', 'background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGiSURBVHjaYvz//z/DcAVMdLaPf7h6ThqIHwKx3HD0nB805ryHo+cs0ehh5Tl1NHrY5Tlkelh5TgiNpjlgpGM9h2wR43Cs54Z1JU5XwEKkOh6kUk4UqSJWRMpDEmiFhTRUjFASfQHET5H4T6FiIPAaiB9B2Y+gfBC4BsTfSc1zWkAcBcSuQMwMxMZDIILOAvFfIN4NxMugHsfwXAIQzwRitiGcEn8BcToQL0D2HKhJtGUYZTcfIN4K8hwoz9yA5qXhAkB5UwNUWuYMM4/BCr0cUGn5BZpOL0BLpBdDuBJXgZbQoIKRn54tlG9AzAktwrmGWyX+FI0eVp57gUaPem40WY7GHO0rVmR6WHnuIxo96rlRzw0Cz70bzp77BaW/jybLIeY5ugN6eu4LvZMlI50nH/8z0GlAdjRZkgFAveDVQPwBGlPImAGL2Aeoeq3BnixB450boT1uUgEoL/ozQMYfB53nQKNoVxlwjzIT23PQRqrwB02yrCPgsSZoYdKER40E1BwqFV/AmKMSfv4fN2hEU9uIR+1zarmJcXQdyhAFAAEGAHK7JJHVCQf5AAAAAElFTkSuQmCC)');
		}

		g_numpadLimitObj = e.EventData.NumPadLimits;

		var ItemCount = e.EventData.Servos.ItemCount;

		var htmlOuterContainer = "";

		for(i = 0; i < ItemCount; i++){
			htmlOuterContainer += '<div id="Container_' + i + '" style="width: 803px;"></div>';
		}

		setHTML('scrollContainerInnerVertical', htmlOuterContainer);

		
		for(i = 0; i < ItemCount; i++){
			Index         = e.EventData.Servos.Item[i].Index;
			Plug          = e.EventData.Servos.Item[i].Plug;
			Name          = e.EventData.Servos.Item[i].NormalName;
			Group         = e.EventData.Servos.Item[i].Group.Name;
			MaxValue      = e.EventData.Servos.Item[i].MaxValueStr;
			MinValue      = e.EventData.Servos.Item[i].MinValueStr;
			Voltage       = e.EventData.Servos.Item[i].Voltage.Name;
			FrameRate     = e.EventData.Servos.Item[i].FrameRate.Name;
			IsCreatedAuto = e.EventData.Servos.Item[i].IsCreatedAuto;
			isSlave       = e.EventData.Servos.Item[i].IsSlave.Index;
			isGizmo		  = e.EventData.Servos.Item[i].IsGizmo;
			




				CenterReverse = e.EventData.Servos.Item[i].CenterStr;


			setHTML('Container_' + i, getRowOfServoConfigsList(Index, Plug, Name, Group, MinValue, MaxValue, CenterReverse, Voltage, FrameRate, IsCreatedAuto, isSlave, isGizmo));	

			g_popupList_Indices["Servo__" + Index + "_Group"] = e.EventData.Servos.Item[i].Group.Index;
			$("#Servo__" + Index + "_Group").bind("click", function(){getServoGroupPopupList(this);});

			g_popupList_Indices["Servo__" + Index + "_Voltage"] = e.EventData.Servos.Item[i].Voltage.Index;
			$("#Servo__" + Index + "_Voltage").bind("click", function(){getServoVoltagePopupList(this);});

			g_popupList_Indices["Servo__" + Index + "_FrameRate"] = e.EventData.Servos.Item[i].FrameRate.Index;
			$("#Servo__" + Index + "_FrameRate").bind("click", function(){showPopupList(this, e.EventData.PopUp.ServoFrameRate, false, true, g_popupList_Indices);});





		}

		if(typeof init == "undefined"){
			init = true;
		}

		if(init){
			initScrollbarsSCL();
			init = false;
		}
		else{
			ScrollRefresh();
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "4"){
			if(g_Wizard){
				window.location.href = "1.4.0__Functions.html?Wizard=true";
			}
			else{
				if(g_isGraphicViewButton){
					window.location.href = "1.3.1__ServoConfigurationGraphicView.html?LastURL=" + g_lastURL;
				}
				else if(g_isServoSyncButton){
					 gotoServoSync(true);
				}
				else{
					window.location.href = g_lastURL;
				}		
			}
		}
		if(typeof e.EventData.PopUp != "undefined"){
			if(typeof e.EventData.PopUp.ServoGroupsUser != "undefined"){
				showPopupList(g_GroupTagObj["Servo__" + e.EventData.PopUp.ServoGroupsUser.ServoIdx + "_Group"], e.EventData.PopUp.ServoGroupsUser.Items, false, true, g_popupList_Indices);
			}
			else if(typeof e.EventData.PopUp.ServoVoltage != "undefined"){
				showPopupList(g_VoltageTagObj["Servo__" + e.EventData.PopUp.ServoVoltage.ServoIdx + "_Voltage"], e.EventData.PopUp.ServoVoltage.Items, false, true, g_popupList_Indices);
			}
		}
		else if(typeof e.EventData.set.ServoConfig.Group != "undefined" || typeof e.EventData.set.ServoConfig.Voltage != "undefined"){
			GetTd(InitDataPostArgs, g_InitEvent);
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}	
}



function getRowOfServoConfigsList(Index, Plug, Name, Group, MinValue, MaxValue, CenterReverse, Voltage, FrameRate, IsCreatedAuto, isSlave, isGizmo){
	if(IsCreatedAuto){
		classGraphicViewEdit = "no_edit";
	}
	else{
		classGraphicViewEdit = "";
	}

	if(isSlave){
		styleCenterReverse = 'no_edit';
		htmlCenterReverse = '<div id="Servo__' + Index + '_Reverse" class="list_servo_cr ' + styleCenterReverse + '">' + CenterReverse + '</div>';
	}
	else{
		styleCenterReverse = "";
		
		htmlCenterReverse = '<div id="Servo__' + Index + '_Center" class="list_servo_cr" onClick=\'showNumpad("Servo__' + Index + '_Center", "Servo", false, true);\'>' + CenterReverse + '</div>';
		g_List4TravelSettingsInit['Servo__' + Index + '_MinValue'] = splitUnitFromValue(MinValue).value;
		g_List4TravelSettingsInit['Servo__' + Index + '_MaxValue'] = splitUnitFromValue(MaxValue).value;
		g_List4TravelSettingsInit['Servo__' + Index + '_Name'] = Name; 
		if(!IsCreatedAuto){
			g_List4TravelSettingsInit['Servo__' + Index + '_Center'] = splitUnitFromValue(CenterReverse).value; 
		}	
	}

	if(isGizmo){
		classVoltage = "";
	}
	else{
		classVoltage = "no_edit";
		Voltage= "--";
	}

	var htmlInnerContainer = '' +
		'<div class="list_content_row">' +
			'<div id="Servo__' + Index + '_Plug"  class="list_servo_plug">' + Plug + '</div>' +
			'<div id="Servo__' + Index + '_Name"  class="list_servo_name ' + classGraphicViewEdit + '" onClick=\'showKeypad("Servo__' + Index + '_Name");\'>' + Name + '</div>' +
			'<div id="Servo__' + Index + '_Group" class="list_servo_group ' + classGraphicViewEdit + '">' + Group + '</div>' +






			htmlCenterReverse +
			'<div id="Servo__' + Index + '_MinValue" class="list_servo_limit ' + classGraphicViewEdit + ' ' + styleCenterReverse + '" onClick=\'showNumpad("Servo__' + Index + '_MinValue", "Servo", true, true);\'>' + MinValue + '</div>' +
			'<div id="Servo__' + Index + '_MaxValue" class="list_servo_limit ' + classGraphicViewEdit + ' ' + styleCenterReverse + '" onClick=\'showNumpad("Servo__' + Index + '_MaxValue", "Servo", true, true);\'>' + MaxValue + '</div>' +
			'<div id="Servo__' + Index + '_FrameRate" class="list_servo_info ' + classGraphicViewEdit + '">' + FrameRate + '</div>' +
			'<div id="Servo__' + Index + '_Voltage" class="list_servo_info ' + classGraphicViewEdit + ' ' + classVoltage + '">' + Voltage + '</div>' +
		'</div>';

	return htmlInnerContainer;
}

		
function getControlAssignmentPath(value, Index){
	cmd = "set";
	ModelName = "DefaultModel";
	ListType = "Function";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"' + ListType + '":{"Control":"' + value + '","Index":' + Index + '}}}}');

	return str;
}


function getAttrObj(tagId, value, completeTagId){
	Attribute = new Object();

	if(tagId == "Name"){
		Attribute["Name"] = value;

		return Attribute;
	}
	
	if(tagId == "Group"){
		Attribute["Group"] = value;

		return Attribute;
	}
	
	if(tagId == "Center"){
		Attribute["Centre"] = value;

		
		if(typeof g_List4TravelSettingsInit[completeTagId] != "undefined"){
			if(g_List4TravelSettingsInit[completeTagId] != value){ 
				g_List4TravelSettings[completeTagId] = value;
			}
			else{
				delete g_List4TravelSettings[completeTagId];
			}
		}

		return Attribute;
	}

	if(tagId == "Reverse"){
		Attribute["IsReverse"] = value;

		return Attribute;
	}

	if(tagId == "MinValue"){
		Attribute["MinValue"] = value;

		if(numpadIsTestActive){
			handleTest(completeTagId, value);

			return false;
		}

		if(g_List4TravelSettingsInit[completeTagId] != value){
			g_List4TravelSettings[completeTagId] = value;
		}
		else{
			delete g_List4TravelSettings[completeTagId];
		}

		return Attribute;
	}
	
	if(tagId == "MaxValue"){
		Attribute["MaxValue"] = value;

		if(numpadIsTestActive){
			handleTest(completeTagId, value);

			return false;
		}
		
		if(g_List4TravelSettingsInit[completeTagId] != value){
			g_List4TravelSettings[completeTagId] = value;
		}
		else{
			delete g_List4TravelSettings[completeTagId];
		}

		return Attribute;
	}
	
	if(tagId == "FrameRate"){
		Attribute["FrameRate"] = value;

		return Attribute;
	}

	if(tagId == "Voltage"){
		Attribute["Voltage"] = value;

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
	ModelName = "model-settings";
	ListType = "ServoConfig";

	completeTagId = tagId;
	tagIdArray = tagId.split("__");
	cmd = "set";
	tagIdArray = tagIdArray[1].split("_");
	Index = parseInt(tagIdArray[0]);
	tagId = tagIdArray[1];

	Attr = new Object();
	Attr = getAttrObj(tagId, value, completeTagId);

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType] = Attr;
	xmlObj[cmd][ModelName][ListType]["Index"] = Index;

	if(Attr != false){
		GetTd(xmlObj, g_SetEvent, cmd);
	}
}


function gotoServoSync(isTravelSet){
	if(isTravelSet){
		location.href = "9.3__ServoSynchronization.html?LastURL=1.3.2__ServoConfigurationListView.html";
	}
	else{
		if(g_Wizard){
			location.href = "9.3__ServoSynchronization.html?Wizard=" + g_Wizard + "&LastURL=1.3.2__ServoConfigurationListView.html?Wizard=true";
		}
		else{
			g_isServoSyncButton = true;
			setTravel2Limits();
		}	
	}
}


function handleTest(completeTagId, value){
	tagIdArray = completeTagId.split("__");
	tagIdArray = tagIdArray[1].split("_");
	Index = parseInt(tagIdArray[0]);

	if(numpadIsTestActive){
		GetTd({"cmd":0x0256, "param": {"ServoIdx": Index, "Pos": parseFloat(value)}}, "noEvent", "command");
		
	}
	else{
		
	}
}


function setDependingLimits(tagId){
	tagIdArray = tagId.split("__");
	tagIdArray = tagIdArray[1].split("_");
	Index = parseInt(tagIdArray[0]);
	tagId = tagIdArray[1];

	if(tagId == "MaxValue"){
		numpadMinValue = parseFloat(splitUnitFromValue(getHTML("Servo__" + Index + "_Center")).value);
	}
	else if (tagId == "MinValue"){
		numpadMaxValue = parseFloat(splitUnitFromValue(getHTML("Servo__" + Index + "_Center")).value);
	}
	else if (tagId == "Center"){
		numpadMaxValue = parseFloat(splitUnitFromValue(getHTML("Servo__" + Index + "_MaxValue")).value);
		numpadMinValue = parseFloat(splitUnitFromValue(getHTML("Servo__" + Index + "_MinValue")).value);
	}
}


function getServoGroupPopupList(tagObj){
	tagId = $(tagObj).attr('id');
	ServoIdx = parseInt(tagId.split("__")[1].split("_")[0]);
	g_GroupTagObj["Servo__" + ServoIdx + "_Group"] = tagObj;

	GetTd(getServoGroupPopupObj(ServoIdx), g_SetEvent);

	
	
}


function getServoVoltagePopupList(tagObj){
	tagId = $(tagObj).attr('id');
	ServoIdx = parseInt(tagId.split("__")[1].split("_")[0]);
	g_VoltageTagObj["Servo__" + ServoIdx + "_Voltage"] = tagObj;

	GetTd(getServoVoltagePopupObj(ServoIdx), g_SetEvent);
}


function setTravel2Limits(){
	if(g_Wizard){
		showDialogbox("actionWait", 'Der Servoweg wird entsprechend der Limits und der Mitte angepasst.'); GetTd({"ModelWizard":{"cmd":4, "Servos":"ALL"}}, g_SetEvent, "4");
	}
	else{
		servoString = "";
		servoIdxArray = [];
		servoIdxObj = {};
		var countArray = 0;

		for(var key in g_List4TravelSettings){
			servoIdx4Travel = key.split("__");
			servoIdx4Travel = servoIdx4Travel[1].split("_");
			servoIdx4Travel = parseInt(servoIdx4Travel[0]);
			servoIdxObj[servoIdx4Travel] = g_List4TravelSettingsInit['Servo__' + servoIdx4Travel + '_Name']; 
		}

		for(var key in servoIdxObj){
			servoString += servoIdxObj[key] + ", ";
			servoIdxArray[countArray] = parseInt(key);
			countArray++;
		}

		if(countArray != 0){	
			servoString = servoString.substring(0, servoString.length - 2);
			showDialogbox("setTravel", servoString);
		}
		else{
			setTravelGoto(false);	
		}
	}
}


function setTravelGoto(isConfirm){
	if(g_isGraphicViewButton){
		window.location.href = "1.3.1__ServoConfigurationGraphicView.html?LastURL=" + g_lastURL;
	}
	else if(g_isServoSyncButton){
		 gotoServoSync(true);
	}
	else{
		window.location.href = g_lastURL;
	}
}


function initScrollbarsSCL(id){
	(function($){


		if(isBAT){
			if(id != "PopUp_List_Container"){
				var getHeight_visible  = 312;
				var getHeight_dragrail = 312;
				var getHeight_total    = $('#scrollContainerInnerVertical').height();
				var getHeight_ratio    = getHeight_dragrail/getHeight_total;

				var getWidth_visible   = 674;
				var getWidth_dragrail  = 674;
				var getWidth_total     = $('#scrollContainerInnerHorizontal').width();
				var getWidth_ratio     = getWidth_dragrail/getWidth_total;


					$('.scrollContainerOuterHorizontal').mCustomScrollbar({horizontalScroll:true});
					$('.scrollContainerOuterVertical').mCustomScrollbar();
					
					$('#Dragger_1').css({'width': Math.floor(getWidth_visible * getWidth_ratio) + 'px !important'});
					$('#scrollTool_1').css({'top': '338px !important', 'overflow': 'visible'});


				
				var topValue  = 0,
					leftValue = 0;

				var fixedContainerHeight  = $('.scrollContainerOuterVertical').innerHeight();
				var fixedContainerWidth   = $('.scrollContainerOuterHorizontal').innerWidth();
				var scrollContainerHeight = $('#scrollContainerInnerVertical').innerHeight();
				var scrollContainerWidth  = $('#scrollContainerInnerHorizontal').innerWidth();

				var maxPadding     = (scrollContainerHeight - fixedContainerHeight) * (-1),
					maxPaddingLeft = (scrollContainerWidth - fixedContainerWidth) * (-1),
					max = false,
					min = false,
					maxLeft = false,
					minLeft = false;
			}

			$(window).keypress(function (e){				
				var c = e.charCode;
				
				if((c == CONST_SCROLLING_Key_g) || (c == CONST_SCROLLING_Key_h) || (c == CONST_SCROLLING_Key_j)){
					popupfinished = $('#popup-wrapper').find("div.scrollContainerPopUpOuterVertical");

					if(typeof popupfinished != undefined && g_isPopUp){
						popupfinished.toggleClass("scrollContainerPopUpOuterVertical_active");
						$('#popup-wrapper').find("div#scrollContainerPopUpInnerVertical").attr("id", "scrollContainerPopUpInnerVertical_active");
						var fixedContainerPopUpHeight  = 320;
						var	scrollContainerPopUpHeight = $('#scrollContainerPopUpInnerVertical_active').innerHeight();
						maxPadding = (scrollContainerPopUpHeight - fixedContainerPopUpHeight) * (-1);
						isInit = false;
					}

					min = false;

					switch(c){
						case CONST_SCROLLING_Key_g : 	topValue += CONST_SCROLLING_StepSmall;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepSmall;		break;
						case CONST_SCROLLING_Key_h : 	topValue += CONST_SCROLLING_StepMiddle; CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepMiddle;	break;
						case CONST_SCROLLING_Key_j : 	topValue += CONST_SCROLLING_StepBig;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepBig;		break;
					}

					if(topValue > 0){
						topValue = 0;
					}
					else{
						max = false;
					}

					if(!max){
						if(g_isPopUp){
							$('#scrollContainerPopUpInnerVertical_active').animate({'top': topValue + 'px'}, CONST_SCROLLING_AnimationSpeed);
							$('#scrollContainerPopUpInnerVertical_active').find('.mCSB_dragger').animate({'top': Math.floor(topValue * getHeight_ratio * (-1)) + 'px'}, CONST_SCROLLING_AnimationSpeed);
						}
						else{
							$('#scrollContainerInnerVertical').animate({'top': topValue + 'px'}, CONST_SCROLLING_AnimationSpeed);
							$('#scrollTool_2').animate({'top': Math.floor(topValue * getHeight_ratio * (-1/120)) + 'px'}, CONST_SCROLLING_AnimationSpeed);
							$('#scrollTool_1').animate({'top': (338 + Math.floor(topValue/140)) + 'px !important'}, CONST_SCROLLING_AnimationSpeed);
						}

						if(topValue == 0){
							max = true;
						}
					}
				}

				if((c == CONST_SCROLLING_Key_b) || (c == CONST_SCROLLING_Key_n) || (c == CONST_SCROLLING_Key_m)){
					popupfinished = $('#popup-wrapper').find("div.scrollContainerPopUpOuterVertical");

					if(typeof popupfinished != undefined && g_isPopUp){
						popupfinished.toggleClass("scrollContainerPopUpOuterVertical_active");
						$('#popup-wrapper').find("div#scrollContainerPopUpInnerVertical").attr("id", "scrollContainerPopUpInnerVertical_active");
						var fixedContainerPopUpHeight  = 320;
						var scrollContainerPopUpHeight = $('#scrollContainerPopUpInnerVertical_active').innerHeight();
						maxPadding = (scrollContainerPopUpHeight - fixedContainerPopUpHeight) * (-1);
						isInit = false;
					}

					max = false;

					switch(c){
						case CONST_SCROLLING_Key_b : 	topValue -= CONST_SCROLLING_StepSmall;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepSmall;		break;
						case CONST_SCROLLING_Key_n : 	topValue -= CONST_SCROLLING_StepMiddle;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepMiddle;	break;
						case CONST_SCROLLING_Key_m : 	topValue -= CONST_SCROLLING_StepBig;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepBig;		break;
					}

					if(topValue < maxPadding){
						topValue = maxPadding;
					}
					else{
						min = false;
					}

					if(!min){
						if(g_isPopUp){
							$('#scrollContainerPopUpInnerVertical_active').animate({'top': topValue + 'px'}, CONST_SCROLLING_AnimationSpeed);
							$('#scrollContainerPopUpInnerVertical_active').find('.mCSB_dragger').animate({'top': Math.floor(topValue * getHeight_ratio * (-1)) + 'px'}, CONST_SCROLLING_AnimationSpeed);
						}
						else{
							$('#scrollContainerInnerVertical').animate({'top': topValue + 'px'}, CONST_SCROLLING_AnimationSpeed);
							$('#scrollTool_2').animate({'top': Math.floor(topValue * getHeight_ratio * (-1/120)) + 'px'}, CONST_SCROLLING_AnimationSpeed);
							$('#scrollTool_1').animate({'top': (338 + Math.floor(topValue/140)) + 'px !important'}, CONST_SCROLLING_AnimationSpeed);
						}

						if(topValue == maxPadding){
							min = true;
						}
					}	
				}
				

				
				if((c == CONST_SCROLLING_Key_w) || (c == CONST_SCROLLING_Key_s) || (c == CONST_SCROLLING_Key_x)){
					minLeft = false;

					switch(c){
						case CONST_SCROLLING_Key_w : 	leftValue += CONST_SCROLLING_StepSmall;		CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepSmall;		break; 
						case CONST_SCROLLING_Key_s : 	leftValue += CONST_SCROLLING_StepMiddle;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepMiddle;	break; 
						case CONST_SCROLLING_Key_x : 	leftValue += CONST_SCROLLING_StepBig;		CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepBig;		break; 
					}

					if(leftValue > 0){
						leftValue = 0;
					}
					else{
						maxLeft = false;
					}

					if(!maxLeft && !g_isPopUp){
						$('#scrollContainerInnerHorizontal').animate({'left': leftValue + 'px'}, CONST_SCROLLING_AnimationSpeed);
						$('#scrollContainerInnerVertical').animate({'width': (803 - leftValue) + 'px'}, CONST_SCROLLING_AnimationSpeed);
						$('#Dragger_1').animate({'left': (leftValue * getWidth_ratio * (-1)) + 'px'}, CONST_SCROLLING_AnimationSpeed);
						$('#scrollTool_2').animate({'left': (Math.abs(leftValue) + 662) + 'px'}, CONST_SCROLLING_AnimationSpeed);

						if(leftValue == 0){
							maxLeft = true;
						}
					}
				}

				if((c == CONST_SCROLLING_Key_e) || (c == CONST_SCROLLING_Key_d)|| (c == CONST_SCROLLING_Key_c)){
					maxLeft = false;

					switch(c){
						case CONST_SCROLLING_Key_e :	leftValue -= CONST_SCROLLING_StepSmall;		CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepSmall;		break; 
						case CONST_SCROLLING_Key_d : 	leftValue -= CONST_SCROLLING_StepMiddle;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepMiddle;	break; 
						case CONST_SCROLLING_Key_c : 	leftValue -= CONST_SCROLLING_StepBig;		CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepBig;		break; 
					}

					if(leftValue < maxPaddingLeft){
						leftValue = maxPaddingLeft;
					}
					else{
						minLeft = false;
					}

					if(!minLeft && !g_isPopUp){
						$('#scrollContainerInnerHorizontal').animate({'left': leftValue + 'px'}, CONST_SCROLLING_AnimationSpeed);
						$('#scrollContainerInnerVertical').animate({'width': (803 - leftValue) + 'px'}, CONST_SCROLLING_AnimationSpeed);
						$('#Dragger_1').animate({'left': (leftValue * getWidth_ratio * (-1)) + 'px'}, CONST_SCROLLING_AnimationSpeed);
						$('#scrollTool_2').animate({'left': (Math.abs(leftValue) + 662) + 'px'}, CONST_SCROLLING_AnimationSpeed);

						if(leftValue == maxPaddingLeft){
							minLeft = true;
						}
					}
				}
			});
		}
		else{
			if(id != "PopUp_List_Container"){

					$(".scrollContainerOuterHorizontal").mCustomScrollbar({
					 	horizontalScroll:true,
					 	callbacks:{
					 		whileScrolling:function(){
					        	pixel = 674 - mcs.left;
					        	setCSS('scrollContainerInnerVertical', 'width', pixel + 'px');
					        }
					    }
					});
	
					$(".scrollContainerOuterVertical").mCustomScrollbar({callbacks:{whileScrolling:function(){}}});

			}
			else{
				$('#' + id).mCustomScrollbar();
				$('#' + id).find('.mCSB_scrollTools').css({'height': '319px'});
			}
		}
	})(jQuery);
}

