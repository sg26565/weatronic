




var g_GET_Parameter = get_GET_Parameter();

var g_FunctionIndex = g_GET_Parameter.FunctionIndex;
var g_scrollIndex = 0;

var g_IsCreatedAuto = [];
var g_preFlightMode = -1;
var g_currentFlightMode = -1;
var g_controlOBj = {};
var g_outputResolutionFlex = 0;
var g_isSignedFlex = 1;

var g_List_Count = 0;			
var g_List_Indices = [];		
var toggleStateARD = "normal";	


initPage();

function initPage(){
	initScrollbars('List_Container');
	




	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Control_Positiv");
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Control");
	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	GetTd(getFunctionObject(InitDataPostArgs), g_InitEvent);




	TdPostArgs = getCurrentFlightMode(TdPostArgs);


	g_isAdditionalControlObjectUsed = true;

	setInterval(JsonFunction, 250);
}



function getFunctionObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	InitDataPostArgs.SortIndeces = {};
	InitDataPostArgs.SortIndeces.Functions = [];

	Item = new Object();
	Item.Index = -1;

	Item.Name = "";
	Item.IsCreatedAuto = -1;
	Item.ControlRateID = -1;
	Item.ControlExpoID = -1;
	Item.ControlDifferentialID = -1;

	
		Setup = new Object();
			
			FlexRate = new Object();
			FlexRate.Hi = "";
			FlexRate.Center = "";
			FlexRate.Lo = "";
		Setup.FlexRateStr = FlexRate;

			
			FlexExpo = new Object();
			FlexExpo.Hi = "";
			FlexExpo.Center = "";
			FlexExpo.Lo = "";
		Setup.FlexExpoStr = FlexExpo;

			
			FlexDiff = new Object();
			FlexDiff.Hi = "";
			FlexDiff.Center = "";
			FlexDiff.Lo = "";
		Setup.FlexDifferentialStr = FlexDiff;
		Setup.FMOStr = "";
	Item.Setup = Setup;

	Item.UsedServoString = "";

	functionItems = new Array(Item);

	Function = new Object();
	Function.Items = "ALL_USED";

	Function.Item = functionItems;

	InitDataPostArgs.Function = Function;

	return InitDataPostArgs;
}

function getCurrentFunctionsObject(TdPostArgs, FunctionIndex){
	Current = new Object();
	Current.FlexRateStr = "";
	Current.FlexExpoStr = "";
	Current.FlexDifferentialStr = "";

	Function = new Object();
	Function.Current = Current;
	Function.Items = "" + FunctionIndex;

	TdPostArgs.Function = Function;

	return TdPostArgs;
}


function getFunctionFlightModeObject(FmDataPostArgs){
	if(typeof FmDataPostArgs == "undefined"){
		FmDataPostArgs = new Object();
	}

	

	Item = new Object();
	Item.Index = 0;

	
		Setup = new Object();

		
		FlexRate = new Object();
		FlexRate.Hi = "";
		FlexRate.Center = "";
		FlexRate.Lo = "";
	Setup.FlexRateStr = FlexRate;

		
		FlexExpo = new Object();
		FlexExpo.Hi = "";
		FlexExpo.Center = "";
		FlexExpo.Lo = "";
	Setup.FlexExpoStr = FlexExpo;

		
		FlexDiff = new Object();
		FlexDiff.Hi = "";
		FlexDiff.Center = "";
		FlexDiff.Lo = "";
	Setup.FlexDifferentialStr = FlexDiff;
		Setup.FMOStr = "";
	Item.Setup = Setup;

	functionItems = new Array(Item);

	Function = new Object();
	Function.Items = "ALL_USED";

	Function.Item = functionItems;

	FmDataPostArgs.Function = Function;

	return FmDataPostArgs;
}


function onEVENT_INIT(e){
	try{
		setHeaderMaxWidth('Model_Name', 'Flight_Mode');
		
		
		$('#Add_Button').bind("click", function(){AddItem(1);});
		$('#Reorder_Button').bind("click", function(){toggleReorder();});
		$('#Delete_Button').bind("click", function(){toggleDelete();});
		$('#Navi_Button').removeAttr("href");
		$('#Navi_Button').bind("click", function(){toggleARD('1.0.0__ModelSettings.html');});
		

		g_numpadLimitObj = e.EventData.NumPadLimits;
		g_outputResolution = g_numpadLimitObj["Control"]["OutputResolution"];

		setHTML('Model_Name', e.EventData.ModelName);

		var i = 0;
		var htmlOuterContainer = "";

		g_List_Indices = e.EventData.SortIndeces.Functions;
		g_List_Count = g_List_Indices.length;

		for(i = 0; i < g_List_Count; i++){
			var Name = "";
			var Index = g_List_Indices[i];
			for(var j = 0; j < g_List_Count; j++){
				if(Index == e.EventData.Function.Item[j].Index){
					Name = e.EventData.Function.Item[j].Name;
					break;
				}
			}
			htmlOuterContainer += getRowRD(Index, Name, 'Funktion',i);
			
			if(Index == g_FunctionIndex){
				g_scrollIndex = i;
			}
		}

		$("#scrollContainerInnerVertical").html(htmlOuterContainer);

		for(i = 0; i < g_List_Count; i++){
			Index           = e.EventData.Function.Item[i].Index;
			FunctionName    = e.EventData.Function.Item[i].Name;
			FMO             = e.EventData.Function.Item[i].Setup.FMOStr;
			FlexRateHi 		= e.EventData.Function.Item[i].Setup.FlexRateStr.Hi;
			FlexRateCenter 	= e.EventData.Function.Item[i].Setup.FlexRateStr.Center;
			FlexRateLow 	= e.EventData.Function.Item[i].Setup.FlexRateStr.Lo;
			FlexExpoHi 		= e.EventData.Function.Item[i].Setup.FlexExpoStr.Hi;
			FlexExpoCenter 	= e.EventData.Function.Item[i].Setup.FlexExpoStr.Center;
			FlexExpoLow 	= e.EventData.Function.Item[i].Setup.FlexExpoStr.Lo;
			FlexDiffHi 		= e.EventData.Function.Item[i].Setup.FlexDifferentialStr.Hi;
			FlexDiffCenter 	= e.EventData.Function.Item[i].Setup.FlexDifferentialStr.Center;
			FlexDiffLow 	= e.EventData.Function.Item[i].Setup.FlexDifferentialStr.Lo;

			

			
			


			
			FlexRateContol		= e.EventData.Function.Item[i].ControlRateID;

			var tagIdControlObj = new Object();
			tagIdControlObj.Name = "Flex_Rate__" + Index + "_";
			tagIdControlObj.State = "Invalid";

			var controlFlexRate = new Object();
			controlFlexRate.ID = FlexRateContol;
			controlFlexRate.Value = 0;

			if(typeof g_controlOBj[FlexRateContol] == "undefined"){
				var tagIdsControlArray = new Array(tagIdControlObj);
				g_controlOBj[FlexRateContol] = tagIdsControlArray;
				controlIds.push(controlFlexRate);
			}
			else{
				g_controlOBj[FlexRateContol].push(tagIdControlObj);
			}



			
			FlexExpoContol		= e.EventData.Function.Item[i].ControlExpoID;

			var tagIdControlObj = new Object();
			tagIdControlObj.Name = "Flex_Expo__" + Index + "_";
			tagIdControlObj.State = "Invalid";

			var controlFlexExpo = new Object();
			controlFlexExpo.ID = FlexExpoContol;
			controlFlexExpo.Value = 0;

			if(typeof g_controlOBj[FlexExpoContol] == "undefined"){
				var tagIdsControlArray = new Array(tagIdControlObj);
				g_controlOBj[FlexExpoContol] = tagIdsControlArray;
				controlIds.push(controlFlexExpo);
			}
			else{
				g_controlOBj[FlexExpoContol].push(tagIdControlObj);
			}



			
			FlexDiffContol		= e.EventData.Function.Item[i].ControlDifferentialID;

			var tagIdControlObj = new Object();
			tagIdControlObj.Name = "Flex_Diff__" + Index + "_";
			tagIdControlObj.State = "Invalid";

			var controlFlexDiff = new Object();
			controlFlexDiff.ID = FlexDiffContol;
			controlFlexDiff.Value = 0;

			if(typeof g_controlOBj[FlexDiffContol] == "undefined"){
				var tagIdsControlArray = new Array(tagIdControlObj);
				g_controlOBj[FlexDiffContol] = tagIdsControlArray;
				controlIds.push(controlFlexDiff);
			}
			else{
				g_controlOBj[FlexDiffContol].push(tagIdControlObj);
			}


			




			if(e.EventData.Function.Item[i].IsCreatedAuto){
				g_IsCreatedAuto.push(Index);
			}



			$("#Container_" + Index).html(getRowOfFunctionsSetupViewList(Index, FunctionName, FMO, FlexRateHi, FlexRateCenter, FlexRateLow, FlexExpoHi, FlexExpoCenter, FlexExpoLow, FlexDiffHi, FlexDiffCenter, FlexDiffLow));
		}

		TdPostArgs.Control_Val = controlIds;

		
		if(typeof g_FunctionIndex != "undefined"){
			 ScrollToRefresh(70, g_scrollIndex);
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "control"){
		if(typeof g_controlOBj[key] != "undefined"){
			
			var val = (value * 100) / 2047;
			for(var i = 0; i < g_controlOBj[key].length; i++){
				g_controlOBj[key][i].State = setControlAssignments(g_controlOBj[key][i].Name, val, g_controlOBj[key][i].State);
				
				if(g_controlOBj[key][i].State == "Empty"){
					if(g_controlOBj[key][i].Name.indexOf("Rate") != -1){
						var g_outputResolutionFlex = g_numpadLimitObj["Control_Positiv"]["OutputResolution"];
						var g_isSignedFlex = g_numpadLimitObj["Control_Positiv"]["IsSigned"];
					}
					else{
						var g_outputResolutionFlex = g_numpadLimitObj["Control"]["OutputResolution"];
						var g_isSignedFlex = g_numpadLimitObj["Control"]["IsSigned"];
					}
					var computedValue;
					var computedUnit;
					var Center = $('#' + g_controlOBj[key][i].Name + 'Center_Value').html();
					
					Center = splitUnitFromValue(Center);
					computedUnit = Center.unit;
					Center = parseFloat(Center.value);
					
					if((val >= CONST_LoThreshold) && (val <= CONST_CenterLowerThreshold)){
						var Lo = $('#' + g_controlOBj[key][i].Name + 'Low_Value').html();
						
						Lo = parseFloat(splitUnitFromValue(Lo).value);
						computedValue = ((Center - Lo) * val / 100) + Center;
					}
					
					if((val >= CONST_CenterUpperThreshold) && (val <= CONST_HiThreshold)){
						var Hi = $('#' + g_controlOBj[key][i].Name + 'High_Value').html();
						
						Hi = parseFloat(splitUnitFromValue(Hi).value);
						computedValue = ((Hi - Center) * val / 100) + Center;
					}
					
					switch(g_outputResolutionFlex){
						case 3: computedValue = parseFloat(computedValue).toFixed(0); break;
						case 2: computedValue = ((Math.round(parseFloat(computedValue) * 2))/2).toFixed(1); break;
						case 1:
						case 0:
						default: computedValue = parseFloat(computedValue).toFixed(1);
					}

					if(g_isSignedFlex && (computedValue.substr(0, 1) != "-")){
						computedValue = "+" + computedValue;
					}

					$('#' + g_controlOBj[key][i].Name + 'Empty_Value').html(computedValue + computedUnit);
				}
			}

		}
	}
	
	if(cmd == "flightmode"){
		if(typeof htmlObj_FlightMode == "undefined"){
			htmlObj_FlightMode = document.getElementById('Flight_Mode');
		}

		if(typeof preFlightMode == "undefined"){
			g_currentFlightMode = e.EventData.Current_FM.Index;
			preFlightMode = g_currentFlightMode;
			g_preFlightMode = preFlightMode;
			htmlObj_FlightMode.innerHTML = e.EventData.Current_FM.Name;
		}

		if(preFlightMode != e.EventData.Current_FM.Index){
			htmlObj_FlightMode.innerHTML = e.EventData.Current_FM.Name;
			g_currentFlightMode = e.EventData.Current_FM.Index;
			preFlightMode = g_currentFlightMode;
			GetTd(getFunctionFlightModeObject(FmDataPostArgs), g_FmEvent);
		}
	}
}


function onEVENT_FM_CHANGED(e){
	try{
		if(numpadOpen){
			handleNoneClosedNumpad();
		}

		g_preFlightMode = g_currentFlightMode;

		for(var i = 0; i < g_List_Count; i++){
			setHTML("Function__"+ e.EventData.Function.Item[i].Index + "_FMO", e.EventData.Function.Item[i].Setup.FMOStr);

			setHTML('Flex_Rate__' + e.EventData.Function.Item[i].Index + '_High_Value', e.EventData.Function.Item[i].Setup.FlexRateStr.Hi);
			setHTML('Flex_Rate__' + e.EventData.Function.Item[i].Index + '_Center_Value', e.EventData.Function.Item[i].Setup.FlexRateStr.Center);
			setHTML('Flex_Rate__' + e.EventData.Function.Item[i].Index + '_Low_Value', e.EventData.Function.Item[i].Setup.FlexRateStr.Lo);

			setHTML('Flex_Expo__' + e.EventData.Function.Item[i].Index + '_High_Value', e.EventData.Function.Item[i].Setup.FlexExpoStr.Hi);
			setHTML('Flex_Expo__' + e.EventData.Function.Item[i].Index + '_Center_Value', e.EventData.Function.Item[i].Setup.FlexExpoStr.Center);
			setHTML('Flex_Expo__' + e.EventData.Function.Item[i].Index + '_Low_Value', e.EventData.Function.Item[i].Setup.FlexExpoStr.Lo);

			setHTML('Flex_Diff__' + e.EventData.Function.Item[i].Index + '_High_Value', e.EventData.Function.Item[i].Setup.FlexDifferentialStr.Hi);
			setHTML('Flex_Diff__' + e.EventData.Function.Item[i].Index + '_Center_Value', e.EventData.Function.Item[i].Setup.FlexDifferentialStr.Center);
			setHTML('Flex_Diff__' + e.EventData.Function.Item[i].Index + '_Low_Value', e.EventData.Function.Item[i].Setup.FlexDifferentialStr.Lo);

		}
	}catch(err){
		onError(err, "Error Flight Mode-data: ", false);
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



function getRowOfFunctionsSetupViewList(Index, FunctionName, FMO, FlexRateHi, FlexRateCenter, FlexRateLow, FlexExpoHi, FlexExpoCenter, FlexExpoLow, FlexDiffHi, FlexDiffCenter, FlexDiffLow){
	var htmlInnerContainer = '' +
		'<!-- Function Name -->' +
		'<div id="Function__' + Index + '_Name" class="list_function_name Name keypad-tag" onClick=\'showKeypad("Function__' + Index + '_Name");\'>' + FunctionName + '</div>' +

		'<!-- Function Setup -->' +
		'<div id="Function__' + Index + '_Setup" class="list_function_setup"><a href="1.4.1__FunctionSetup.html?FunctionIndex=' + Index + '&FunctionView=ListSetup" draggable="false">' +
			'<img width="54" height="54" src="data:image/png;base64,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" draggable="false" alt=""/>' +
		'</a></div>' +

		'<!-- Felx Rate-->'+
		'<div id="Flex_Rate__' + Index + '_Empty_Value"  class="underlined list_function_rate_content no_edit" style="display: inline;">--%</div>' +
		'<div id="Flex_Rate__' + Index + '_High_Value"   class="underlined list_function_rate_content" onClick=\'showNumpad("Flex_Rate__' + Index + '_High_Value", "Control_Positiv");\'>' + FlexRateHi + '</div>' +
		'<div id="Flex_Rate__' + Index + '_Center_Value" class="underlined list_function_rate_content" onClick=\'showNumpad("Flex_Rate__' + Index + '_Center_Value", "Control_Positiv");\'>' + FlexRateCenter + '</div>' +
		'<div id="Flex_Rate__' + Index + '_Low_Value"    class="underlined list_function_rate_content" onClick=\'showNumpad("Flex_Rate__' + Index + '_Low_Value", "Control_Positiv");\'>' + FlexRateLow + '</div>' +
		'<div id="Flex_Rate__' + Index + '_Empty_IMG" class="no_edit" style="border-left: none;">' +
			'<span class="icon_fs-img_empty"  	style="margin-top: 7px; display:block;"></span>' +
		'</div>' +
		'<div id="Flex_Rate__' + Index + '_High_IMG" style="border-left: none; display: none;">' +
			'<span class="icon_fs-img_high"   	style="margin-top: 7px; display:block;"></span>' +
		'</div>' +
		'<div id="Flex_Rate__' + Index + '_Center_IMG" style="border-left: none; display: none;">' +
			'<span class="icon_fs-img_center" 	style="margin-top: 7px; display: block;"></span>' +
		'</div>' +
		'<div id="Flex_Rate__' + Index + '_Low_IMG" style="border-left: none; display: none;">' +
			'<span class="icon_fs-img_low"  	style="margin-top: 7px; display: block;"></span>' +
		'</div>' +

		'<!-- Felx Expo-->'+
		'<div id="Flex_Expo__' + Index + '_Empty_Value"  class="underlined list_function_rate_content no_edit" style="display: inline;">--%</div>' +
		'<div id="Flex_Expo__' + Index + '_High_Value"   class="underlined list_function_rate_content" onClick=\'showNumpad("Flex_Expo__' + Index + '_High_Value", "Control");\'>' + FlexExpoHi + '</div>' +
		'<div id="Flex_Expo__' + Index + '_Center_Value" class="underlined list_function_rate_content" onClick=\'showNumpad("Flex_Expo__' + Index + '_Center_Value", "Control");\'>' + FlexExpoCenter + '</div>' +
		'<div id="Flex_Expo__' + Index + '_Low_Value"    class="underlined list_function_rate_content" onClick=\'showNumpad("Flex_Expo__' + Index + '_Low_Value", "Control");\'>' + FlexExpoLow + '</div>' +
		'<div id="Flex_Expo__' + Index + '_Empty_IMG" class="no_edit" style="border-left: none;">' +
			'<span class="icon_fs-img_empty"  	style="margin-top: 7px; display:block;"></span>' +
		'</div>' +
		'<div id="Flex_Expo__' + Index + '_High_IMG" style="border-left: none; display: none;">' +
			'<span class="icon_fs-img_high"   	style="margin-top: 7px; display:block;"></span>' +
		'</div>' +
		'<div id="Flex_Expo__' + Index + '_Center_IMG" style="border-left: none; display: none;">' +
			'<span class="icon_fs-img_center" 	style="margin-top: 7px; display: block;"></span>' +
		'</div>' +
		'<div id="Flex_Expo__' + Index + '_Low_IMG" style="border-left: none; display: none;">' +
			'<span class="icon_fs-img_low"  	style="margin-top: 7px; display: block;"></span>' +
		'</div>' +

		'<!-- Felx Diff-->'+
		'<div id="Flex_Diff__' + Index + '_Empty_Value"  class="underlined list_function_rate_content no_edit" style="display: inline;">--%</div>' +
		'<div id="Flex_Diff__' + Index + '_High_Value"   class="underlined list_function_rate_content" onClick=\'showNumpad("Flex_Diff__' + Index + '_High_Value", "Control");\'>' + FlexDiffHi + '</div>' +
		'<div id="Flex_Diff__' + Index + '_Center_Value" class="underlined list_function_rate_content" onClick=\'showNumpad("Flex_Diff__' + Index + '_Center_Value", "Control");\'>' + FlexDiffCenter + '</div>' +
		'<div id="Flex_Diff__' + Index + '_Low_Value"    class="underlined list_function_rate_content" onClick=\'showNumpad("Flex_Diff__' + Index + '_Low_Value", "Control");\'>' + FlexDiffLow + '</div>' +
		'<div id="Flex_Diff__' + Index + '_Empty_IMG" class="no_edit" style="border-left: none;">' +
			'<span class="icon_fs-img_empty"  	style="margin-top: 7px; display:block;"></span>' +
		'</div>' +
		'<div id="Flex_Diff__' + Index + '_High_IMG" style="border-left: none; display: none;">' +
			'<span class="icon_fs-img_high"   	style="margin-top: 7px; display:block;"></span>' +
		'</div>' +
		'<div id="Flex_Diff__' + Index + '_Center_IMG" style="border-left: none; display: none;">' +
			'<span class="icon_fs-img_center" 	style="margin-top: 7px; display: block;"></span>' +
		'</div>' +
		'<div id="Flex_Diff__' + Index + '_Low_IMG" style="border-left: none; display: none;">' +
			'<span class="icon_fs-img_low"  	style="margin-top: 7px; display: block;"></span>' +
		'</div>' +

		'<!-- Function FMO -->' +
		'<div id="Function__' + Index + '_FMO" class="list_function_fmo FMO num-ipt-tag underlined" onClick=\'showNumpad("Function__' + Index + '_FMO","Control");\'>' + FMO + '</div>';

	return htmlInnerContainer;
}


function checkNumber (val){
	if(isNaN(val)){
		val = "--";
	}
	return val;
}


function getControlAssignmentPath(value, Index){
	cmd = "set";
	ModelName = "model-settings";
	ListType = "Function";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"' + ListType + '":{"Control":"' + value + '","Index":' + Index + '}}}}');

	return str;
}


function getAttrObj(tagId, value, ListType){
	Attribute = new Object();

	if(tagId == "Name"){
		Attribute["Name"] = value;

		return Attribute;
	}

	Attribute["Setup"] = {};
	if(tagId == "FMO"){
		Attribute["Setup"]["FMO"] = value;

		return Attribute;
	}

	if(ListType == "Flex_Rate"){
		Attribute["Setup"]["FlexRate"] = {};

		if(tagId == "Center"){
			Attribute["Setup"]["FlexRate"]["Center"] = value;
		}
		else if(tagId == "High"){
			Attribute["Setup"]["FlexRate"]["Hi"] = value;
		}
		else if(tagId == "Low"){
			Attribute["Setup"]["FlexRate"]["Lo"] = value;
		}

		return Attribute;
	}

	if(ListType == "Flex_Expo"){
		Attribute["Setup"]["FlexExpo"] = {};

		if(tagId == "Center"){
			Attribute["Setup"]["FlexExpo"]["Center"] = value;
		}
		else if(tagId == "High"){
			Attribute["Setup"]["FlexExpo"]["Hi"] = value;
		}
		else if(tagId == "Low"){
			Attribute["Setup"]["FlexExpo"]["Lo"] = value;
		}

		return Attribute;
	}

	if(ListType == "Flex_Diff"){
		Attribute["Setup"]["FlexDifferential"] = {};

		if(tagId == "Center"){
			Attribute["Setup"]["FlexDifferential"]["Center"] = value;
		}
		else if(tagId == "High"){
			Attribute["Setup"]["FlexDifferential"]["Hi"] = value;
		}
		else if(tagId == "Low"){
			Attribute["Setup"]["FlexDifferential"]["Lo"] = value;
		}

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
	Attr = getAttrObj(tagId, value, ListType);

	ListType = "Function";

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType] = Attr;
	xmlObj[cmd][ModelName][ListType]["Index"] = parseInt(Index);

	if (g_preFlightMode != g_currentFlightMode){
		xmlObj[cmd][ModelName][ListType]["FMI"] = g_preFlightMode;
	}
	else{
		xmlObj[cmd][ModelName][ListType]["FMI"] = g_currentFlightMode;
	}

	GetTd(xmlObj, g_SetEvent, cmd);
}


function submitARD(cmd, num){
	ModelName = "model-settings";
	ListType = "Function";

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
		showDel = g_IsCreatedAuto.indexOf(g_List_Indices[i]);

		if(showDel == -1){
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
	ListType = "Functions";

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
		for(var i = 0; i < g_List_Count; i++)
			hideHTML("Delete_Button_" + g_List_Indices[i]);

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


	Index           = TdJson.add.Function.Index;
	FunctionName    = TdJson.add.Function.Name;
	FMO             = TdJson.add.Function.Setup.FMO;
	FlexRateHi 		= TdJson.add.Function.Setup.FlexRate.Hi;
	FlexRateCenter 	= TdJson.add.Function.Setup.FlexRate.Center;
	FlexRateLow 	= TdJson.add.Function.Setup.FlexRate.Lo;
	FlexExpoHi 		= TdJson.add.Function.Setup.FlexExpo.Hi;
	FlexExpoCenter 	= TdJson.add.Function.Setup.FlexExpo.Center;
	FlexExpoLow 	= TdJson.add.Function.Setup.FlexExpo.Lo;
	FlexDiffHi 		= TdJson.add.Function.Setup.FlexDifferential.Hi;
	FlexDiffCenter 	= TdJson.add.Function.Setup.FlexDifferential.Center;
	FlexDiffLow 	= TdJson.add.Function.Setup.FlexDifferential.Lo;

	
	FlexRateContol		= TdJson.add.Function.ControlRateID;

	var tagIdControlObj = new Object();
	tagIdControlObj.Name = "Flex_Rate__" + Index + "_";
	tagIdControlObj.State = "Invalid";

	var controlFlexRate = new Object();
	controlFlexRate.ID = FlexRateContol;
	controlFlexRate.Value = 0;

	if(typeof g_controlOBj[FlexRateContol] == "undefined"){
		var tagIdsControlArray = new Array(tagIdControlObj);
		g_controlOBj[FlexRateContol] = tagIdsControlArray;
		controlIds.push(controlFlexRate);
	}
	else{
		g_controlOBj[FlexRateContol].push(tagIdControlObj);
	}



	
	FlexExpoContol		= TdJson.add.Function.ControlExpoID;

	var tagIdControlObj = new Object();
	tagIdControlObj.Name = "Flex_Expo__" + Index + "_";
	tagIdControlObj.State = "Invalid";

	var controlFlexExpo = new Object();
	controlFlexExpo.ID = FlexExpoContol;
	controlFlexExpo.Value = 0;

	if(typeof g_controlOBj[FlexExpoContol] == "undefined"){
		var tagIdsControlArray = new Array(tagIdControlObj);
		g_controlOBj[FlexExpoContol] = tagIdsControlArray;
		controlIds.push(controlFlexExpo);
	}
	else{
		g_controlOBj[FlexExpoContol].push(tagIdControlObj);
	}



	
	FlexDiffContol		= TdJson.add.Function.ControlDifferentialID;

	var tagIdControlObj = new Object();
	tagIdControlObj.Name = "Flex_Diff__" + Index + "_";
	tagIdControlObj.State = "Invalid";

	var controlFlexDiff = new Object();
	controlFlexDiff.ID = FlexDiffContol;
	controlFlexDiff.Value = 0;

	if(typeof g_controlOBj[FlexDiffContol] == "undefined"){
		var tagIdsControlArray = new Array(tagIdControlObj);
		g_controlOBj[FlexDiffContol] = tagIdsControlArray;
		controlIds.push(controlFlexDiff);
	}
	else{
		g_controlOBj[FlexDiffContol].push(tagIdControlObj);
	}

	g_List_Indices.push(Index);
	g_List_Count = g_List_Indices.length;

	var newChild = getRowRD(Index, FunctionName, 'Funktion', (g_List_Count-1));
	$("#scrollContainerInnerVertical").append(newChild);

	$('#Container_' + Index).html(getRowOfFunctionsSetupViewList(Index, FunctionName, FMO, FlexRateHi, FlexRateCenter, FlexRateLow, FlexExpoHi, FlexExpoCenter, FlexExpoLow, FlexDiffHi, FlexDiffCenter, FlexDiffLow));

	ScrollDownRefresh();
}
