


var g_GET_Parameter = get_GET_Parameter();

var g_TelemetryPage = parseInt(g_GET_Parameter.TelemetryPage, 10);
var TelePage = g_TelemetryPage;

var g_TelemetryTemplateID = -1;

var g_TimerValue = parseInt(g_GET_Parameter.TimerValue, 10);
var g_isLocked = parseInt(g_GET_Parameter.isLocked, 10);

if(isNaN(g_isLocked)){
	g_isLocked = 0;
}
else if(g_isLocked){
	showHTML('Footer_Blocker');
	setCSS('Page_Lock', 'visibility', 'visible');
}

if(isNaN(g_TimerValue)){
	g_TimerValue = 0;
}

var g_TimeToLock = -1;
var g_isLockSet = false;
var g_AutoDimm = 0;


	
var g_isInitTelemetryPage = false;
var g_isInitModel = false;
var g_ModelType = "";
var g_ModelTail = 0;

var g_Kompass   = 0;
var g_Direction = 0;
var g_Distance  = 0;
var g_Height    = 0;
var g_Speed     = 0;
var g_Heading   = 0;

var MEASValue_GPSGroundDistance  =	11552; 
var MEASValue_GPSDistance = 		11553; 
var MEASValue_Rx_GPSRelAltitude = 	 9506; 
var MEASValue_Rx_GPS_Speed = 		 7427; 
var MEASValue_Rx_GPS_Course = 		 7429; 
var MEASValue_Rx_GPSDirection =		 7460; 
var MEASValue_Tx_Magnet_Course =	 7369; 


initPage();

function initPage(){ 
	$('#Soft_Shutdown').bind('click', function(){shutDown();});
	

	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	GetTd(getModelConfigObject(InitDataPostArgs), g_InitEvent); 	
	GetTd(getScreenAdjustObject(InitDataPostArgs, false), g_SetEvent, "get");
	GetTd(getGeneralSettingsObject(), g_SetEvent, "get");



	TdPostArgs = getCurrentFlightMode(TdPostArgs);

		
	setInterval(JsonFunction, 250);
}

function getModelConfigObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

  	ModelConfig = new Object();
  	ModelConfig.ModelName = "Default Model";

  		type = new Object();
  		type.Index = -1;
  		type.Name = "";
  	ModelConfig.Type = type;

  	modelTypeDependent = new Object();
  		tailType = new Object();
  		tailType.Index = -1;
  		tailType.Name = "";
  	modelTypeDependent.TailType = tailType;

  	ModelConfig.ModelTypeDependent = modelTypeDependent;
 	





	InitDataPostArgs.ModelConfig = ModelConfig;

	return InitDataPostArgs;
}


function getScreenAdjustObject(InitDataPostArgsExtended, isFull){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}
	
	item1 = new Object();
	item1.Index = -1;
	item1.Template = -1;
	item1.TelemetryIds = [];
	if(isFull){
		item1.style = "";
		item1.HTML = "";
		item1.customerUsedIDs = [];
	}
	
	itemlist = new Array (item1);
	
	InitDataPostArgsExtended["get"] = {};
	InitDataPostArgsExtended["get"]["model-settings"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["TelemetryScreenAdjustment"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["TelemetryScreenAdjustment"]["Items"] = "ALL";
	InitDataPostArgsExtended["get"]["model-settings"]["TelemetryScreenAdjustment"]["Item"]= itemlist;
	
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
		setHeaderMaxWidth2();
		setHTML('Model_Name', e.EventData.ModelName);
		
		telemtry_Control_Value = new Object();
		telemtry_Control_Value.ID = CONST_CTRL_TeleScreenSlider;
		telemtry_Control_Value.Value = 0;

		controlIds.push(telemtry_Control_Value);

		
		
		g_ModelType = e.EventData.ModelConfig.Type.Name;
		g_ModelTail = e.EventData.ModelConfig.ModelTypeDependent.TailType.Index;
		g_isInitModel = true;
		
		if(g_isInitTelemetryPage){
			if(g_TelemetryTemplateID == 14){
				initLAF();
			}
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr, j){
	
	if(cmd == "telemetry"){
		
		if(g_TelemetryTemplateID == 14){
			
			if(key == MEASValue_GPSGroundDistance){
				setHTML('Distance_Value', valueStr);
				g_Distance = value / 10;
			}
			else if(key == MEASValue_Rx_GPSRelAltitude){
				setHTML('Height_Value', valueStr);

				if(value > 32767){
					g_Height = (value - 65536) / 10;
				}
				else{
					g_Height = value / 10;
				}
			}
			else if(key == MEASValue_Rx_GPS_Speed){
				setHTML('Speed_Value', valueStr);
				g_Speed = value * 0.1852;
			}
			else if(key == MEASValue_Rx_GPS_Course){
				setHTML('Heading_Value', valueStr);
				g_Heading = value / 100;
			}
			else if(key == MEASValue_Rx_GPSDirection){
				setHTML('Direction_Value', valueStr);
				g_Direction = value / 100;
			}
			else if(key == MEASValue_Tx_Magnet_Course){
				g_Kompass = value / 100;
			}
		}
		else{
			$("div[id^='" + key + "']" ).html(valueStr);
			$("div[id^='" + key + "_min']" ).html(e.EventData.Telemetry_Val[j].MinStr);
			$("div[id^='" + key + "_max']" ).html(e.EventData.Telemetry_Val[j].MaxStr);



		}
	}
	
	
	if(cmd == "control"){
		if(key == CONST_CTRL_TeleScreenSlider){
			telemetrySwitchControl(value)
		}	
	}
	
	
	if(cmd == "flightmode"){
		if(typeof htmlObj_FlightMode == "undefined"){
			htmlObj_FlightMode = document.getElementById('Flight_Mode');
		}

		if(typeof preFlightMode == "undefined"){
			preFlightMode = e.EventData.Current_FM.Index;
			htmlObj_FlightMode.innerHTML = e.EventData.Current_FM.Name;
		}

		if(preFlightMode != e.EventData.Current_FM.Index){
			htmlObj_FlightMode.innerHTML = e.EventData.Current_FM.Name;
			preFlightMode = e.EventData.Current_FM.Index;
		}	
	}

	if(cmd == "AdditionalControlObject"){
		if(typeof e.EventData.Telemetry_Val_Customer_Full != "undefined"){
			if(typeof e.EventData.Telemetry_Val_Customer_Full.String != "undefined"){
				try{
					var customerObj = JSON.parse(e.EventData.Telemetry_Val_Customer_Full.String);
					for(var i = 0; i < customerObj.CUST_CONTENT_FULL.length; i++){
						var contentIDObj = document.getElementById(customerObj.CUST_CONTENT_FULL[i].ID);
						if(contentIDObj != null){
							contentIDObj.innerHTML = customerObj.CUST_CONTENT_FULL[i].Value;
							if(typeof customerObj.CUST_CONTENT_FULL[i].Class != "undefined"){
								if(typeof customerObj.CUST_CONTENT_FULL[i].Class != "undefined"){
									contentIDObj.className+= " C_Dynamic__" + customerObj.CUST_CONTENT_FULL[i].Class;
								}
							}
						}
						
					}
					
					TdPostArgs.Telemetry_Val_Customer = {};
					TdPostArgs.Telemetry_Val_Customer.String = "";
					TdPostArgs.Telemetry_Val_Customer.SequenceNum = -1;
					delete TdPostArgs.Telemetry_Val_Customer_Full;
						
				}catch(err){
					onError(err, "Error on pasing customer full telemetry: ", false);
				}
			}	
		}
		if(typeof e.EventData.Telemetry_Val_Customer != "undefined"){
			if(typeof e.EventData.Telemetry_Val_Customer.String != "undefined"){
				try{
					var customerObj = JSON.parse(e.EventData.Telemetry_Val_Customer.String);
					for(var i = 0; i < customerObj.CUST_CONTENT.length; i++){
						var contentIDObj = document.getElementById(customerObj.CUST_CONTENT[i].ID);
						if(contentIDObj != null){
							contentIDObj.innerHTML = customerObj.CUST_CONTENT[i].Value;
							if(typeof customerObj.CUST_CONTENT[i].Class != "undefined"){
								for(var j = 0; j < customerObj.CUST_CONTENT[i].Class.length; j++){
									if(typeof customerObj.CUST_CONTENT[i].Class[j].r != "undefined"){
										contentIDObj.className= contentIDObj.className.replace(" C_Dynamic__" + customerObj.CUST_CONTENT[i].Class[j].r, '' );
									}
									else if(typeof customerObj.CUST_CONTENT[i].Class[j].a != "undefined"){
										contentIDObj.className+= " C_Dynamic__" + customerObj.CUST_CONTENT[i].Class[j].a;
									}
								}
							}
						}	
					}
				}catch(err){
					onError(err, "Error on pasing customer telemetry: ", false);
				}
			}	
		}
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "get"){
			if(typeof e.EventData.get.TelemetryScreenAdjustment != "undefined"){
				handleGET(e.EventData.get);
			}
			else{
				g_AutoDimm   = e.EventData.get.UserSettings.AutoDimm.Index;
				g_TimeToLock = e.EventData.get.UserSettings.TimeToLock.Index;

				if(g_TimeToLock > 0){
					g_isLockSet = true;
				}
			}
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}	
}


function handleGET(TdJson){
	
	numberOfTelepages = TdJson.TelemetryScreenAdjustment.Item.length;
	
	if(numberOfTelepages > 0){
		if(TelePage == 0){
			currentTelePage = numberOfTelepages;
		}
		else{
			currentTelePage = TelePage;
		}






	}
	else{
		currentTelePage = -1;
	}
	
	
	
	$('#Telemetry_Arrow_Left').click(function(e){decreaseTelemetryPage(currentTelePage, numberOfTelepages);});						
	
	$('#Telemetry_Arrow_Right').click(function(e){increaseTelemetryPage(currentTelePage, numberOfTelepages);});						

	initChangeToTelemetryPage(currentTelePage, numberOfTelepages);
	
	

	
	
	
	
	
	





























































	





























	
	var TelemetryCSS = {"left": "telemetry_left", "right": "telemetry_right", "midleft": "telemetry_mid_left", "midright": "telemetry_mid_right"};

	htmlTelemetryPage = '';

	if(currentTelePage == -1){
		
		htmlTelemetryPage += '<div style="width: 754px; height: 400px;"><div style="text-align: center; font-size: 40px; color: #fff; width: 754px; padding-top: 120px;">' + 'Keine Telemetrieseite angelegt' + '</div></div>';
	}
	else{
		g_TelemetryTemplateID = TdJson.TelemetryScreenAdjustment.Item[currentTelePage - 1].Template;
		g_isInitTelemetryPage = true;
	
		if(g_TelemetryTemplateID == 14){
			if(g_isInitModel){
				initLAF();
			}
			
			return;
		}
		else if(g_TelemetryTemplateID == 15){
			if(typeof TdJson.TelemetryScreenAdjustment.Item[currentTelePage - 1].HTML == "undefined"){
				GetTd(getScreenAdjustObject(InitDataPostArgs, true), g_SetEvent, "get");
				
				return;
			}
			
			var cssStyle = TdJson.TelemetryScreenAdjustment.Item[currentTelePage - 1].style;
			$('style').append(cssStyle);
			var contentHTML = TdJson.TelemetryScreenAdjustment.Item[currentTelePage - 1].HTML;
			htmlTelemetryPage+= contentHTML;
			 
			for(var i = 0 ; i < TdJson.TelemetryScreenAdjustment.Item[currentTelePage - 1].customerUsedIDs.length; i++){
				telemetryObj = new Object();
					telemetryObj.ID = TdJson.TelemetryScreenAdjustment.Item[currentTelePage - 1].customerUsedIDs[i];
					telemetryObj.Value = 0;
					telemetryObj.ValueStr = "";
					telemetryObj.Min = -1;
					telemetryObj.Max = -1;
					telemetryObj.MinStr = "";
					telemetryObj.MaxStr = "";

					telemetryIds.push(telemetryObj);
			}
			
			TdPostArgs.Telemetry_Val_Customer_Full = {};
			TdPostArgs.Telemetry_Val_Customer_Full.String = "";
					
			g_isAdditionalControlObjectUsed = true;
		}
		else if((g_TelemetryTemplateID != 14) && (g_TelemetryTemplateID != 15)){
			TelemetryArray = getTemplateTelemetry(TdJson.TelemetryScreenAdjustment.Item[currentTelePage - 1]);
		
			htmlTelemetryPage += '<div style="width: 754px; border-top: 1px; border-top-style: solid;">';
			var widthcount = 0;
			var	currentHeight = 0;
			var prevHeight = 0;
			var	nextRight = false;
			var	doubleRight = false;
			var	telemetryClass = "";

			for(var i = 0; i < TelemetryArray.length; i++){
				currentHeight = TelemetryArray[i]["point_height"];

				if((widthcount == 0) && (TelemetryArray[i]["point_width"] != 30)){
					telemetryClass= TelemetryCSS["left"];
				}

				if(widthcount > 0){
					telemetryClass = TelemetryCSS["midleft"];
				}

				if(((widthcount + TelemetryArray[i]["point_width"]) == 30) && widthcount != 0){
					telemetryClass = TelemetryCSS["right"];	
				}

				if(nextRight){
					telemetryClass = TelemetryCSS["right"];
					nextRight = false;
					doubleRight = true;
				}

				telemetryObj = new Object();
				telemetryObj.ID = TelemetryArray[i]["ID"];
				telemetryObj.Value = 0;
				telemetryObj.ValueStr = "";
				telemetryObj.Min = -1;
				telemetryObj.Max = -1;
				telemetryObj.MinStr = "";
				telemetryObj.MaxStr = "";

				telemetryIds.push(telemetryObj);

				htmlTelemetryPage += '<div class="' + telemetryClass + '" onClick=\'resetMinMax("' + TelemetryArray[i]["ID"] + '","' + TelemetryArray[i]["name"] + '");\'>' +
										  '<div class="telemetry_points' + TelemetryArray[i]["point_width"] + 'x' + TelemetryArray[i]["point_height"] + '">' +
										 	  '<div class="telemetry_name">' +
										 	 	  '<span  id="pilot_timer_name1">' + TelemetryArray[i]["name"] + '</span>' +
										 	  '</div>' +
										 	  '<div class="telemetry_value" id="' + TelemetryArray[i]["ID"] + '__' + i + '">-.-</div>' +
										 	  '<!--<div class="telemetry_unit">' + TelemetryArray[i]["unit"] + '</div>-->' +
										 	 '<div class="telemetry_min_max_outer">' +
											 	 '<div class="telemetry_min_max_inner" id="' + TelemetryArray[i]["ID"] + '_min__' + i + '">0</div>' +
											 	 '<div class="telemetry_min_max_inner" style="text-align:right; border-left: 1px #fff solid;" id="' + TelemetryArray[i]["ID"] + '_max__' + i + '">12</div>' +
											 '</div>' +	 
										 '</div>' +
									 '</div>';

				widthcount += TelemetryArray[i]["point_width"];

				if((widthcount >= 30) || doubleRight){
					widthcount = 0;
					doubleRight = false;
				}

				if((prevHeight > currentHeight) && (widthcount == 0)){
					nextRight = true;
				}

				prevHeight = currentHeight;
			}

			htmlTelemetryPage += '</div>';
		}
	}
	
	setHTML('Mode_Content', htmlTelemetryPage);
}


function getTemplateTelemetry(telemetryObj){
	template = telemetryObj.Template;	

	var Telemetry_Array = new Array();

	htmlTemplate = '';

	switch(template){
		case 0: templateBuildOrder = new Array({"Index":0, "width":30, "height": 30}); break; 
		case 1: templateBuildOrder = new Array({"Index":0, "width":20, "height": 15}, {"Index":2, "width":10, "height": 15}, {"Index":1, "width":20, "height": 15}, {"Index":3, "width":10, "height": 15}); break; 
		case 2: templateBuildOrder = new Array({"Index":0, "width":20, "height": 15}, {"Index":2, "width":10, "height": 10}, {"Index":3, "width":10, "height": 10}, {"Index":1, "width":20, "height": 15}, {"Index":4, "width":10, "height": 10}); break;  
		case 3: templateBuildOrder = new Array({"Index":0, "width":20, "height": 10}, {"Index":3, "width":10, "height": 10}, {"Index":1, "width":20, "height": 10}, {"Index":4, "width":10, "height": 10}, {"Index":2, "width":20, "height": 10}, {"Index":5, "width":10, "height": 10}); break;
		case 4: templateBuildOrder = new Array({"Index":0, "width":30, "height": 15}, {"Index":1, "width":30, "height": 15}); break; 
		case 5: templateBuildOrder = new Array({"Index":0, "width":15, "height": 15}, {"Index":2, "width":15, "height": 15}, {"Index":1, "width":15, "height": 15}, {"Index":3, "width":15, "height": 15}); break;
		case 6: templateBuildOrder = new Array({"Index":0, "width":20, "height": 10}, {"Index":3, "width":10, "height": 15}, {"Index":1, "width":20, "height": 10}, {"Index":4, "width":10, "height": 15}, {"Index":2, "width":20, "height": 10}); break;
		case 7: templateBuildOrder = new Array({"Index":0, "width":15, "height": 10}, {"Index":3, "width":15, "height": 10}, {"Index":1, "width":15, "height": 10}, {"Index":4, "width":15, "height": 10}, {"Index":2, "width":15, "height": 10}, {"Index":5, "width":15, "height": 10} ); break;
	}

	for(var i = 0; i < templateBuildOrder.length; i++){
		var Telemetry_Obj = new Object();
		telIndex = templateBuildOrder[i].Index;

		for(var j = 0; j < telemetryObj.TelemetryIds.length; j++){
			if(telIndex == telemetryObj.TelemetryIds[j].Pos){
				Telemetry_Obj["ID"]   = telemetryObj.TelemetryIds[j].Index;
				Telemetry_Obj["name"] = telemetryObj.TelemetryIds[j].Name;
				Telemetry_Obj["unit"] = "unit"; 
				Telemetry_Obj["point_width"]  = templateBuildOrder[i].width; 
				Telemetry_Obj["point_height"] = templateBuildOrder[i].height;
				break;
			}
		}

		Telemetry_Array[i] = Telemetry_Obj;
	}

	return Telemetry_Array;
}


function resetMinMax(tagId, telemetryName){
	if((!g_isLocked) && (tagId != "65535")){
		showDialogbox("delete", "min-, max-value from", telemetryName, tagId)
	}
	
}

function deleteItem(tagId){


	$("div[id^='" + tagId + "_min']" ).html("");
	$("div[id^='" + tagId + "_max']" ).html("");
	
	GetTd({"Telemetry_Val":[{"ID": tagId, "Reset": 1}]}, "noEvent");
}

if(isBAT){
	currentTimeFunction = setInterval(function(){
		LockTimer();
		
	}, 1000);
}


function LockTimer(){
	if(g_isLockSet && !g_isLocked){
		g_TimerValue++;

		if(g_TimerValue >= g_TimeToLock){
			LockScreen();
		}
	}
}


function ResetLockTimer(){
	g_TimerValue = 0;
	setCSS('Page_Lock', 'visibility', 'hidden');
	hideHTML('Footer_Blocker');
	g_isLocked = 0;

	if(g_AutoDimm){
		GetTd({"cmd":0x0428, "param": {"Dimmed": 0}}, "noEvent", "command");
	}
}


function LockScreen(){
	showHTML('Footer_Blocker');
	setCSS('Page_Lock', 'visibility', 'visible');
	g_isLocked = 1;
	showDialogbox("info", '<img id="Image_URL" width="154" height="196" style="margin-left: 135px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAADECAMAAABQpciiAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHvUExURf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xNPVikAAACkdFJOUwABAgMEBQYHCAoLDQ4PEBITFBUWFxgZGh0eHyAiIyQmJygqKy0uLzAyNTk6Ozw9QEFDRkhKS0xNUFFSU1RXWFpcXWFiY2RlZmdrbG5vcXJzdHV2d3h9foCDhomKkJGSk5SVlpianJ2en6Ciqqytrq+0tba6vcHExcbHyMnKzs/Q0dLU1tna3N3e4OHi4+Tl5ufp6+zu7/Dx8/T19vf4+fr7/P3+WeKt4gAABGRJREFUeNrt3WlXEzEUBmCggCiLgoALCoKiuAGCIOKC+25FAUFcilrFHSmCglQBN9SqLC0IqEXID/Wb59jcmU6TTDOe897PzTvP0IZM0pk0IUG2klLLG5va34T+1purTY07U5MSNNeS/acHv4YZV+Gvg6f3pehzZez3jTKT+tC9L0MLrML7nkWt997KeLtceweYxRqod8XzE3awn8VQ/QeXxEtWHROMMcb6q+MCW3WbCdTtVfbLjnxhQvXliM2w3E4mXJ25dspKh5hEDZXaJ3PPMKmacdslu8Sk65I9slamoFrt+P9/iympW+rHhptMUd1ULWuxcNDw3FzYwsta1Moumh9t3ufxuKuK8/KKq9wejy8KsFGl7JzZkfrubC/49+UF2+/0mbU4q0628ZfhUT55t5Cfa9cW72fDRnMbVMlWvDY6xlu3yeCT535r1O7VckW0+wYHCLWkmzdMbwkZNL2nRnZowWC4Lo7ettjgcmDhsApZzjcyfPyEteYnxsnmYzkKaPQoMFJitX3JCD0qyMvKyd75NN96Qv5TKuFXuaws7QWVeyOmgdB1g8p4kSZJq6NSPbGmeKiUOslp3Usiszvm9YykbiJmMFWKVkNEvlsZe87Kd0RQjYws5TnR7YtEkorGiMFXZr1mG3Gux8SijhNR2yRo1/m4B6JZD4iOLi5L/8ilTRSKhhVOcGEf04Vpexa5tGbxE23mwhb3CId18b1zqThtKd9Lu0SzkgNc1nmZ/n6eiwski76f3DV+IFuGls2dalj0HT3DnWWH3NjSwQWeEZwU93JJmyRXc7jAXrEJcwp3Efh8mRxtGTe4jIsNCFvnIoOuyV5iXePmVlvFlqy4C/odsrQd3DRDbFmLW7P6mS1Ly/6pZlWrLTLGlyxLS/ZFZrYJXUX6I2OuyM80rkRm+kW+Usjkprft8rR2bpqdKZCSFbJhFeUsR8tSQVvYJU/btWALbbZQnlY4awttSsHyzvIpW2hCn9hofUsRLUuelgUaaKCBBhpooIEGGmiggQaaVporGJESVHCjkoLQNbtrD0TeRzdzoFa6qNDdq627Nh/tG2NxrLG+o9ZuVVx39zeLe83fXRdddiHItFTwQhRY7kOmrR6a3hy7doRprJG1Jqtfw0xrDRuv4HUwzdVhJGtg2quBlmWM6qeN0k+cNDMHFP3dfsAJtAAlq/zhBNqPCoJ2mTmiLhO0l86gDRC0kDNoIYI25Qza1P/1VwMNNNBAAw000EADDTTQQAMNNNBAAw000EADDTTQQAMNNNBAAw000EADDTTQQAMNNNBAAw000EADDTTQQAMNNNDwHFXMRT1HNeEM2iRBe+QM2mOC5nYGjdpvdf13J8i+r6eeXfU7geYnH/itcwLN4JcFnumXPTPaLCOoWxbcbPRM/jHdNONfAUjs1CvrTDTe/yHRq1PmTTTd0OPkrC7Y7Klou6CU9eiR9ZRZ2Dym3j8db9e0v97ajjtJRU1PJkNxq8knTUXUz638AcwE4HrjjWvmAAAAAElFTkSuQmCC" draggable="false" alt=""/>');
	setTimeout(function(){closeDialogbox(false, "info"); }, 3000);

	if(g_AutoDimm){
		GetTd({"cmd":0x0428, "param": {"Dimmed": 1}}, "noEvent", "command");
	}
}


function checkLockState(){






	 window.location.href = "0.1__HomeScreen.html?TimerValue=" + g_TimerValue + "&isLocked=" + g_isLocked;
}


function telemetrySwitchControl(value){
	
	if(typeof preControlTelemetrySwitchValue == 'undefined'){
		preControlTelemetrySwitchValue = value;
	}
	else{
		if(preControlTelemetrySwitchValue != value){
			telemetrySwitchCalculatedValue = Math.abs(value - preControlTelemetrySwitchValue);

			if(telemetrySwitchCalculatedValue != (Math.abs(Math.abs(value) - Math.abs(preControlTelemetrySwitchValue)))){
				if((Math.abs(preControlTelemetrySwitchValue) + Math.abs(value)) > 2048){
					log(3, "telemetry overflow detected at 2048");
					telemetrySwitchCalculatedValue -= 4096;
				}
				else{
					log(3, "telemetry overflow detected at 0");
				}
			}

			if(preControlTelemetrySwitchValue > value){
				telemetrySwitchCalculatedValue *= -1;
			}
			
			if(telemetrySwitchCalculatedValue > 0){
				increaseTelemetryPage(currentTelePage, numberOfTelepages);
			}
			else if(telemetrySwitchCalculatedValue < 0){
				decreaseTelemetryPage(currentTelePage, numberOfTelepages);
			}
			
			preControlTelemetrySwitchValue = value;
		}	
	}
}


function increaseTelemetryPage(currentTelePage, numberOfTelepages){
	if((currentTelePage == numberOfTelepages) || (currentTelePage == -1)){
		 window.location.href = "0.1__HomeScreen.html?TimerValue=" + g_TimerValue + "&isLocked=" + g_isLocked;
	}
	else{
		 window.location.href = "0.2__Telemetry.html?TelemetryPage=" + (currentTelePage + 1) + "TimerValue=" + g_TimerValue + "&isLocked=" + g_isLocked;
	}
}


function decreaseTelemetryPage(currentTelePage, numberOfTelepages){
	GetTd({"cmd":0x801}, "noEvent", "command"); 
	if((currentTelePage == 1) || (currentTelePage == -1)){
		 window.location.href = "0.1__HomeScreen.html?TimerValue=" + g_TimerValue + "&isLocked=" + g_isLocked;
	}
	else{
		 window.location.href = "0.2__Telemetry.html?TelemetryPage=" + (currentTelePage - 1) + "TimerValue=" + g_TimerValue + "&isLocked=" + g_isLocked;
	}
}


function initChangeToTelemetryPage(currentTelePage, numberOfTelepages){
	if(isBAT){
		$(window).keypress(function (e){
			var c = e.charCode;
			
			if((c == CONST_SCROLLING_Key_e) || (c == CONST_SCROLLING_Key_d) || (c == CONST_SCROLLING_Key_c)){
				increaseTelemetryPage(currentTelePage, numberOfTelepages);
			}

			
			if((c == CONST_SCROLLING_Key_w) || (c == CONST_SCROLLING_Key_s)|| (c == CONST_SCROLLING_Key_x)){
				decreaseTelemetryPage(currentTelePage, numberOfTelepages);
			}
		});
	}
}


function setHeaderMaxWidth2(){
	var pageNameWidth = document.getElementById('Telemetry_Label').offsetWidth;
	var subDivWidth = (480 - pageNameWidth)/2;
	setCSS('Model_Name', 'maxWidth', subDivWidth + 'px');
	setCSS('Flight_Mode', 'maxWidth', subDivWidth + 'px');
}


function initLAF(){
	
	var htmlTelemetryPage = '<div>' +
		'<div class="panorama_rose_layer">' +
			'<div id="slider">' +
				'<img width="1618" height="37" src="data:image/png;base64,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" alt="" draggable="false"/>' +
			'</div>' +
			'<div id="needle">' +
				'<img width="541"  height="37" src="data:image/png;base64,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" alt="" draggable="false"/>' +
			'</div>' +
			'<div id="needle_bat">' +
				'<img width="11"   height="37" src="data:image/png;base64,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" alt="" draggable="false"/>' +
			'</div>' +
		'</div>' +
		'<div id="Radar_Canvas" class="radar_layer">' +
			'<div id="UFO_Layer" class="ufo_layer"></div>' +
		'</div>' +
		'<div class="bat_layer"></div>' +
		'<canvas id="FOV_Canvas" width="543" height="188" class="fov_layer"></canvas>' +
	'</div>' +
	'<aside class="additional_info">' +
		'<div class="additional_info_row">' +
			'<div id="Direction_Label">Direction:</div>' +
			'<div id="Direction_Value"></div>' +
		'</div>' +
		'<div class="additional_info_row">' +
			'<div id="Distance_Label">Distance:</div>' +
			'<div id="Distance_Value"></div>' +
		'</div>' +
		'<div class="additional_info_row">' +
			'<div id="Height_Label">Height:</div>' +
			'<div id="Height_Value"></div>' +
		'</div>' +
		'<div class="additional_info_row">' +
			'<div id="Speed_Label">Speed:</div>' +
			'<div id="Speed_Value"></div>' +
		'</div>' +
		'<div class="additional_info_row">' +
			'<div id="Heading_Label">Heading:</div>' +
			'<div id="Heading_Value"></div>' +
		'</div>' +
	'</aside>';

	setHTML('Mode_Content', htmlTelemetryPage);

	var MEASValue_Array = [MEASValue_GPSGroundDistance, MEASValue_Rx_GPSRelAltitude, MEASValue_Rx_GPS_Speed, MEASValue_Rx_GPS_Course, MEASValue_Rx_GPSDirection, MEASValue_Tx_Magnet_Course];

	for(var i = 0; i < MEASValue_Array.length; i++){
		telemetryObj = new Object();
		telemetryObj.ID = MEASValue_Array[i];
		telemetryObj.Value = 0;
		telemetryObj.ValueStr = "";
		 	
		telemetryIds.push(telemetryObj);
	}

	drawFOVs();
	canvasInit(g_ModelType, g_ModelTail, g_Kompass, g_Direction, g_Distance, g_Heading);

	setInterval(updateLAF, 500);
}


function drawFOVs(){
	var fovc = document.getElementById('FOV_Canvas');
    var fov = fovc.getContext('2d');
    var sfov = fovc.getContext('2d');

    var lineColor = "rgba(0, 0, 0, 0.2)";

  
    fov.strokeStyle = lineColor;
	fov.lineWidth = 1;

	fov.beginPath();
	fov.moveTo(272, 188);
	fov.lineTo( -1, 179);
	fov.lineTo( -1,  -1);
	fov.lineTo(544,  -1);
	fov.lineTo(544, 179);
	fov.lineTo(272, 188);
	fov.closePath();
	fov.stroke();

    var grd = fov.createRadialGradient(272, 188, 1, 272, 188, 272);
    grd.addColorStop(1.00, 'rgba(255, 255, 255, 0.00)');
    grd.addColorStop(0.00, 'rgba(255, 255, 255, 0.08)');

    fov.fillStyle = grd;
    fov.fill();
  
    
  
    sfov.strokeStyle = lineColor;
	sfov.lineWidth = 1;

	sfov.beginPath();
	sfov.moveTo(272, 188);
	sfov.lineTo( 80, -4);
	sfov.lineTo(464, -4);
	sfov.lineTo(272, 188);
	sfov.closePath();
	sfov.stroke();

    var sgrd = sfov.createRadialGradient(272, 188, 1, 272, 188, 272);
    sgrd.addColorStop(1.00, 'rgba(255, 255, 255, 0.00)');
    sgrd.addColorStop(0.25, 'rgba(255, 255, 255, 0.05)');
    sgrd.addColorStop(0.00, 'rgba(255, 255, 255, 0.20)');

    sfov.fillStyle = sgrd;
    sfov.fill();
  
}


function canvasInit(ModelType, ModelTail, kompass, direction, distance, heading){
	var white = "#ffffff";
	var red   = "#cc0000";
	
	W = 543;																								
	H = 375;																								
	
	canvas = Raphael("Radar_Canvas", W, H);

	var modelImage = "";

	var PATH_RADIUS = 100;
	PATH_RADIUS_UFO = 100;

	center = [272, 188];

	r1 = canvas.circle(center[0], center[1], PATH_RADIUS).attr({stroke: white, "stroke-width": "1px", opacity: 0});
	r2 = canvas.circle(center[0], center[1], PATH_RADIUS).attr({stroke: white, "stroke-width": "1px", opacity: 0});
	r3 = canvas.circle(center[0], center[1], PATH_RADIUS).attr({stroke: white, "stroke-width": "1px", opacity: 0});
	r4 = canvas.circle(center[0], center[1], PATH_RADIUS).attr({stroke: white, "stroke-width": "1px", opacity: 0});
	t1 = canvas.text(center[0], center[1],   "1m").attr({stroke: white, "stroke-width": "1px", x: 271, opacity: 0});
	t2 = canvas.text(center[0], center[1],  "10m").attr({stroke: white, "stroke-width": "1px", x: 271, opacity: 0});
	t3 = canvas.text(center[0], center[1], "100m").attr({stroke: white, "stroke-width": "1px", x: 271, opacity: 0});
	
	

	
	if(ModelTail == "Delta"){
		
		modelImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALmSURBVHja7Ji9TxpxGMc57gCJikMroKZxaNDJdKBuHShDpw5I61YbWknp4lINIe4diP9AB8LSgfgXmBQZunQghJiQELGgQAELRsLxIm8Hv34v6SU2NcEcF3tJ7zvxXLiHzz2vv4MihKjkLLVK5lIAFUAF8C61tbX1bnt7e0eWcJOTk/pcLpcpFAoXBoPhvuwA19fXX5Df2tjYeC+7GnwJCZ/X1tacsoqeTqfTptPp70IE8/n8BVI+KxvAxcXFB+12+0oA7Pf7xGKxPJZNio1Go2liYkIv2AzD8NfmZAO4sLDwF4zJZJr7p2k1m82zm5ubrw8PDw+Ojo7SvV6PE1LMcdwwHo9nI5HIF7fb/XZ+ft58J1CYb1MOh+N5KBT6XKvVqgLQ8fFxpdVqdQUb9dhPpVIVwWZZtra/vx9yOp2OmZkZg6RQWq1WY7PZngQCgU+lUukHuUEA/Fmv1zuC3Wg0uplM5vKm756fn5eCwWDAbrc/5btfFBRFUSqr1frI7/d/RCSSZIROT08voea1iHVwrTrqvpOTk9Te3p5/dXXVSvE/OkpLS0sPvV7vh2g0+g111Ce3FKLCIrqsYJfL5WaxWGRve/9gMOBisVjU5/N5l5eXLX9AYTzoXC7Xq3A4fNDtdttEhBC9FvZw9dqgZiuVSlOMLzB00XhhNOAbPaTa3d11kzHFNwjSVRbsZDJ5cb0mxcrj8eyoMcPuSbDqmE6nwwk2UjZEZphx/aLj5yQZ1DRNqyGKB+NfY7FJaI1GQ0vgmjConzaKnCACjXEAMRd72MEDgJJqtXqFmtQOh0PRL93TED8NKMy5KTwxf8AU7QxgHErFmEgkviJy0ysrK8/Ozs4S8K0T6xNTR43tVJNsoCOKNGZfGpGr44ElO2oxUjlC/Q0Al0PD8Lv4UnaAvHhAjC6+OYayBETd5XCSltSnpM7wRldAY9BS+pTUGU4x/Ww2W8Toykvlk1L+H1QAFUAF8D8H/CXAAL+MV2wsur5tAAAAAElFTkSuQmCC";
	}
	else if(ModelType == "Plane"){
		if(ModelTail == 1){
			
			modelImage = "data:image/png;base64,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";
		}
		else{
			
			modelImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAARgSURBVHja7JhLSGtXFIZXTo6P+Lr2qjemJte3JlbEKgVtVerEgl4VdFZwKrQXdNKAA6HgtHQkRcEOxKkOpKITBQfFV0tRcWAK1qL1qk3qIw9jNI/Tf50mktsmYG6OEoobFmefnOM+397rX2uvrUqSJErkJlCCtyfA/z2guLCwQO3t7RQIBP7zkANIpVL9MxNBoJ2dHWpsbJT7kdrQ0NCny8vLZ0tLSzvRPlhZWUldXV10dnZGmZmZJIoieTwe0ul0tL29TYWFhWSz2WRjNvG+M2HY4uJi6uvro83NTUpKSnrrOU+wtbX1C5fL9QcAv4o0RnJyMpWVlZHP51PexQyYkZFBIyMjlJubK6+Aw+G4M7/fn1JTU/MJWmukcRmOPZWVlRXRW4pokAfOy8uj8fFxeQX39vbo8PBQNrVabUhPT3+/qKjIgP6L8L9jmXR0dFB9fT3d3Nw8bJAwpF6vp5mZGaqoqKCrqyu6vb2lgoKCl8wCLb2Hpg+9zxPp7Owkg8Ega+1Ropghy8vLaXZ2lurq6uTfAFjAVwhfhAS0oXe7u7vliXi93sdNMwzJETc/P0+1tbXs4uehFUtNTX3GmuNohctjdutbaSaeHMWQOTk5mrm5OZ3FYqkIBVNDQ4MJEW3A7Snc6mUJsDEoGwKK7lsD3BcwFaaDFUPwJlzZGIhdqX2OVlpaKgsMrgwMDAx8aTKZzJeXlzZo9E+73X5itVot5+fnuxqN5lfk0d8BagW0j1PO9fW1LAHu86TD4cWwGzVLCJYPiDKGwNXIhn4R7EW0CfHAnmAEcMTiY350U7Kzs/VsLM+qqqpX/Lynp4dX0APoUwDvIyFbjo+PdwG8i9S1n5aW9hfGcN4F1OLi4meAXIbtwS6kd2gMdHBwYOc+PuTf2tqyvcs4APe53W7bycmJZWNj44fq6mqTWFJS8i04P1Bq7+QVDG2PMUesIKghgVy2/Pz8ysHBQUnAYGoFoFRSUCt8jbZXxxzBopgtKDEYUowK4paCepRwLyjkDUmEz+Uoirf0dzqdvIpyFANSiHdMlgkCRVRptdpGzPglazQOPm9bW9uHk5OTXwM00NTUZEZ07seTZ1l6WDyrYoVlS0vLR6w/RKAPqaI24SpqlFxujhEkZzcS8HXCAV5cXJxjAW8ZEBp0JBwgwJwIDCykw4Vbl2JnEqUGgqDdWEU7Sn52tSfhAOHWAFaRARnOm3AuxlklAyt4Axf7SMEWNyA2eCOC4/Xw8PDG0dFRMqqUZ6urqz/29/d/jhJM9+gH6d7eXjWA2mHfByuguzYxMbEO0J/Cf0Mhuzk2NvYN58lHAZyamnodrVwaHR392Ww2/xLtudFo/PjBgwQnNm20ZysrK8fYNlOiPce5mgvh1QcFXFtb43L9t1B1Fdw3hfX19TfT09PDXLM2Nzd/h5Ndafj+znsrKmhnzHtyrBUHPqTBRR8h2Dg5vwne8wkvj89V/3rnFN+zPyjg07/fngCfABOs/S3AAGHo+UOziN3dAAAAAElFTkSuQmCC";
		}
	}
	else if(ModelType == "Glider"){
		if(ModelTail == 1){
			
			modelImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI/SURBVHja7Ji9axphHMc9jZ5nK31LpVgko0NA3dThoDRKhS4dOluHGwQRB/8DF+nSpfofSCDQQRy6diiouDQEdG9wCAbN3ZnEe/Ou30daSCFL7dPwFO4DD/eGD5/7PS+/38k5juNhGa+HcVxBV9AV/N8FqSJJ0jtRFF8yG8FSqSQVCoW3NPvcofamXi8XjUafoS2YjGAwGBQegIeAScEACIVCAlqIScErYBjGWtM0m6Ygd/MiEonsPgb3AIkEOYbD4fvkUhA2wSH3BQKGNIig8Tj4Mf/8Pp/Pn06nX8myvJpMJl/Q3dqyLBPSBqR1tBXQrm9AXuoS4LA5J8xms3NFUdTfLJPJ5H632/00n8/PSX8owWznjrFtm0T/ejqdnrZarY+I05ONXCqV2scDxWGMbwDr7dFONpt93el0js+AaZr6XxSwdi6XEzFEygnYdn5zADOIj8VizxOJxAHVvbDX632u1+sfKK6RAHlLi1ZvmNwXWAiXFAUNqqlusVhcqKoqM5uLIaeSrYJZweVyeUX2N2YF4bbSdV1jVhALRMdWZTIriNRmkPTGsqC1BswKIo+THG4zKwg2eZR1Qaodctv+MJ/PvyiXy2/i8fjTnzne02w2ZdSOfLVa5ck9TEm73+9/b7fbh+PxeHJnn5eVSkW6rURCZdSs1WqHtz3LZDLiVl912wxJsVgMNxqNI1I1/5oqo9HoeDAYvB8OhwFE7hTV+R4pwUj/iK6X5/k9nH/94yF2/8B0BV1BV/Df8kOAAQBv4k46eX13lQAAAABJRU5ErkJggg==";
		}
		else{
			
			modelImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJHSURBVHja7Jg/ixpRFMVndF0dE01MogQXYyssqJ0IsUmMCmnTR4JltPFjCGniR7CSFGKxrZAu1boLMViYQLAIrrrOuLvOP2dyrixhs1UwD/MCc+AyjsKb37tz37vnKdq2LfAsl8C5HEAH0AH83wGZqlKpvM7lcs+4zWC5XK6USqVXLMfcYzZTl0uMRqOPEXMuM+jz+aR70H2IS8B9yO/3Swg/l4CXkK7ra1VVLZaA4s2bSCTy6AF0B6JM0DUQCNylW0naJIe+l0h4pT4kzYuLB/XncbvdnkwmU1wsFqvBYNDDcGvTNA1A64DWECtIvbohmtQFhMvmM2kymZzJsqz8RplKpQ47nc6H2Wx2RuPBgln2jmVZFmX/ajwef282m++Rp4cbuHQ6fYgfZJszHUNYb6G9bDb7stVq9X9AhmFof2FgrXw+n8Mrkk+hbetbhFBB3lgsdpBMJp8z3Qu73e5RvV5/x3CN7NMsTVajobjPsRAuGALqTFvdfD4/VxRlwW0vBpxCWwW3gMvl8pL2N24BwbbSNE3lFhALRMNWZXALiNamU3vjGdBcQ9wCoo9TD7e4BYQ2fZQbwFqt9nY0Gn1GGx/BYh3Dfj0tFotvhsPhKXry136//6lQKLz4Jyc4PDh/24FUq9WPjUbj5LaTgp1L7fzQFI/HD9rtdnc6neowqSJFr9f7EgwGBfjKb3Q0CYVCQjgc9iYSiScn0FbuZtuSgSv65TgQHrJbtE7ISSMkhPvaiKjXxSnsFND568MBdAAdwD/TTwEGAGFcTr7A2jqpAAAAAElFTkSuQmCC";
		}
	}
	else if(ModelType == "Helicopter"){
		
		modelImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIoUExURQAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwcHBwoKCg0NDRAQEBMTExYWFhkZGRwcHB4eHiEhISQkJCcnJykpKSwsLDExMTMzMzY2Njg4ODo6Oj09PT8/P0FBQUZGRkhISExMTE5OTlJSUlZWVlhYWFpaWl1dXWBgYGFhYWNjY2ZmZmpqam5ubnJycnV1dXt7e3x8fIKCgoSEhIiIiI2NjY6OjpWVlZmZmZmZmZycnKCgoKGhoaSkpKioqKurq6ysrK2trbCwsLGxsbOzs7S0tLW1tba2tra2tri4uLm5ubm5ubu7u76+vr6+vsDAwMPDw8XFxcXFxcjIyMjIyMnJycrKysrKysvLy8zMzMzMzM3Nzc7Ozs7OztDQ0NDQ0NLS0tLS0tXV1dfX19jY2Nra2tzc3N3d3ePj4+Tk5OTk5OXl5eXl5efn5+jo6Ojo6Ojo6Onp6erq6uvr6+zs7Ozs7O7u7u/v7+/v7/Dw8PLy8vPz8/Pz8/Pz8/Pz8/X19fX19fX19fb29vb29vj4+Pj4+Pj4+Pn5+fn5+fr6+vr6+vv7+/v7+/v7+/z8/Pz8/Pz8/P39/f39/f39/f39/f7+/v7+/v7+/v///////8HzoBYAAAC3dFJOUwAAAQIDBAUGBwgJCgsMDQ4PEBESExQYGRoeISQnKCkqKy0xMzg6Tk5PUFBRUlNTVFVVVldXWVpaW1xcXV5fYGFiY2VlZmhoaWprbG9wcXR1eHh6fX6ChIWGiYqMj5GRkpSWl5iYmZqbnJ2doKGipaanqqurrK2trq+vsLGys7W2uLu9v8LDy8zNzc7S0tPU1NbX2tvc3d/h5OTl5ufp6uvs7u7v8PHy9PX19vf3+Pn5+vv8/P3+/uGHNn0AAAINSURBVDjLY2AkEjAMIoUMaIAaCjlkxJjwK2RnBgmwmRSEa4JVMrNjVyhirsMCFJCM2zzDkw+kTttcGKtC5dYsHWZGZp227dtTgEYyaSY1K2FVqFi/KkWHWcBn+vbtTaZsTJpxKysVsCrk1ygFqpSIXLJ9+yQHLo34tWUKPNg9w61ZsTJdNn7N9u3zHdUS1pTLc+MKHh6tquXReRu2b1/tHbu+WoEbdzjyaBXNnLdp+/Y1zYvKNXjwBDibgFzJdiDYtr1InpcFt0JeM5/QxjUgleuKQzz0WHAp5HaqnbZ2OxQsmZipz4JDoVjYdmQw144Th0Jet+q+hZshqtbMas81YsXpRh3n4EkQhT1+tmpsuH3NrBAztWvB9u1TmmZHyzHh9jWTfMb6fPcJ27fXmBWtTJbHqZBZPmVtnaFK5/bteWp6pauT5HAoZJVLW1NlzKfWsn17gga3fuGqRJDtWBRKZ6+qNeZhkC/ftiVCnIFTv3hFqhRWhaq99Sa8jAxSaRsX+wsxMHAZVHepYFUo4WXKDxSQiFw5wxWUIHiMvMSwe4afDeghdn7vBR0WHGxA57Hy486uzLrmVlFL+wNtTNSZ8OZr4YD2Ocu2blw8s8maA69CiajlkCic58KDV6F4RHdR6dLJOQ1d9lx4FbJb+lpoBjlrOProMOMve9gF2ZlEeZi4BZipWJoRqZB+ZTgAAV2go5ANdR0AAAAASUVORK5CYII=";
	}
	else{
		
		modelImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA2UExURQAAAP///wAAAAAAAAAAAB1EHWsAAJKSkn+Vf6tvbylfKZYAAMzMzDN3M7sAAMzdzO6/v////2neDKQAAAANdFJOUwAAECZAcHBwlJSgoKAjeDUrAAAAxklEQVQ4y+XU0RKCIBCF4eOuQIlgvP/LhpSKsIxcNF3UXuo3P+IoGDoHPw1RzEcgUQ8cBjaGezZDJgRDHZDnEGa+hmtQSkIKSkmIQSEJMSgkIQfrJORgnUQjWCXRCFZJtIJl8gT5nsMbtyBp/zjc4hQ1IFt/yMW5iWXI2vtdRuecYglScm+ZnMsXx2nhNFar6eXyxVEGrWYi3uiRxO5sUiOnW8RjstMukQXXWPayUlaAcYoPhlQcqp4xTvlfb9e+dFL8xYn7BGG+Eprk0xg5AAAAAElFTkSuQmCC";
	}

	setCSS('UFO_Layer', 'background-image', 'url(' + modelImage + ')');
	setCSS('UFO_Layer', 'left', (center[0] - 20) + 'px');
	setCSS('UFO_Layer', 'top', (center[1] - PATH_RADIUS_UFO - 20) + 'px');
	
	

	updateBATKompass(0);
	updateUFOPosition(0, 0);
	updateUFOHeading(0, 0);
	updateUFODistance(0);
}


function updateLAF(){
	if(!isNaN(g_Kompass)){
		updateBATKompass(g_Kompass);
	
		if(!isNaN(g_Direction)){
			updateUFOPosition(g_Kompass, g_Direction);
		}
		else{
			updateUFOPosition(g_Kompass, 0);
		}
		
		if(!isNaN(g_Heading)){
			updateUFOHeading(g_Kompass, g_Heading);
		}
		else{
			updateUFOHeading(g_Kompass, 0);
		}
	}
	else{
		updateBATKompass(0);
	}

	if(!isNaN(g_Distance)){
		updateUFODistance(g_Distance);
	}
	else{
		updateUFODistance(1);
	}
}







function updateBATKompass(kompassAngle){
	if(kompassAngle > 359){
		kompassAngle -= 360;
	}

	var newValue = kompassAngle * (-3);
	setCSS('slider', 'margin-left', newValue + 'px');
}


function updateUFOPosition(kompassAngle, directionAngle){
	var batKompassAngle = directionAngle;

	directionAngle += 270;
	var directionRad = directionAngle * (Math.atan(1) / 45);

	var newX = Math.round((Math.cos(directionRad) * PATH_RADIUS_UFO) + center[0] - 20);
	var newY = Math.round((Math.sin(directionRad) * PATH_RADIUS_UFO) + center[1] - 20);

	setCSS('UFO_Layer', 'left', newX + 'px');
	setCSS('UFO_Layer', 'top', newY + 'px');
	

	if(batKompassAngle < 0){
		batKompassAngle += 360;
	}

	if(batKompassAngle > 180){
		batKompassAngle -= 360;
	}

	var batKompassValue = (batKompassAngle * 3) + 266;

	if(batKompassValue < -5){
		batKompassValue = -5;
	}
	else if(batKompassValue > 535){
		batKompassValue = 535;
	}

	setCSS('needle_bat', 'left', batKompassValue + 'px');
}


function updateUFOHeading(kompassAngle, headingAngle){
	headingAngle -= kompassAngle;

	setCSS('UFO_Layer', '-moz-transform', 'rotate(' + headingAngle + 'deg)');
	setCSS('UFO_Layer', '-ms-transform', 'rotate(' + headingAngle + 'deg)');
	setCSS('UFO_Layer', '-o-transform', 'rotate(' + headingAngle + 'deg)');
	setCSS('UFO_Layer', '-webkit-transform', 'rotate(' + headingAngle + 'deg)');
	setCSS('UFO_Layer', 'transform', 'rotate(' + headingAngle + 'deg)');
	
}


function updateUFODistance(distance){
	if(distance < 1){
		r4.attr({opacity: 0});
		r3.attr({opacity: 0});
		r2.attr({opacity: 0});
		r1.attr({opacity: 0});
		t3.attr({opacity: 0});
		t2.attr({opacity: 0});
		t1.attr({opacity: 0});
	}
	else{
		r4.attr({opacity: 1});
		r3.attr({opacity: 1});
		r2.attr({opacity: 1});
		r1.attr({opacity: 1});
		t3.attr({opacity: 1});
		t2.attr({opacity: 1});
		t1.attr({opacity: 1});

		if(distance <= 10){
			r4.attr({r: (2500/distance)});
			r3.attr({r: (1000/distance)});
			r2.attr({r: (500/distance)});
			r1.attr({r: (100/distance)});
			
			t3.attr({text: "10m", y: 195 + (1000/distance)});
			t2.attr({text:  "5m", y: 195 + (500/distance)});
			t1.attr({text:  "1m", y: 195 + (100/distance)});
		}
		else if(distance <= 50){
			r4.attr({r: (10000/distance)});
			r3.attr({r: (5000/distance)});
			r2.attr({r: (2500/distance)});
			r1.attr({r: (1000/distance)});
			
			t3.attr({text: "50m", y: 195 + (5000/distance)});
			t2.attr({text: "25m", y: 195 + (2500/distance)});
			t1.attr({text: "10m", y: 195 + (1000/distance)});
		}
		else if(distance <= 100){
			r4.attr({r: (25000/distance)});
			r3.attr({r: (10000/distance)});
			r2.attr({r: (5000/distance)});
			r1.attr({r: (1000/distance)});
			
			t3.attr({text: "100m", y: 195 + (10000/distance)});
			t2.attr({text:  "50m", y: 195 + (5000/distance)});
			t1.attr({text:  "10m", y: 195 + (1000/distance)});
		}
		else if(distance <= 500){
			r4.attr({r: (100000/distance)});
			r3.attr({r: (50000/distance)});
			r2.attr({r: (25000/distance)});
			r1.attr({r: (10000/distance)});
			
			t3.attr({text: "500m", y: 195 + (50000/distance)});
			t2.attr({text: "250m", y: 195 + (25000/distance)});
			t1.attr({text: "100m", y: 195 + (10000/distance)});
		}
		else if(distance <= 1000){
			r4.attr({r: (250000/distance)});
			r3.attr({r: (100000/distance)});
			r2.attr({r: (50000/distance)});
			r1.attr({r: (10000/distance)});
			
			t3.attr({text: "1km",  y: 195 + (100000/distance)});
			t2.attr({text: "500m", y: 195 + (50000/distance)});
			t1.attr({text: "100m", y: 195 + (10000/distance)});
		}
		else if(distance <= 5000){
			r4.attr({r: (1000000/distance)});
			r3.attr({r: (500000/distance)});
			r2.attr({r: (250000/distance)});
			r1.attr({r: (100000/distance)});
			
			t3.attr({text: "5km",   y: 195 + (500000/distance)});
			t2.attr({text: "2.5km", y: 195 + (250000/distance)});
			t1.attr({text: "1km",   y: 195 + (100000/distance)});
		}
		else if(distance <= 10000){
			r4.attr({r: (2500000/distance)});
			r3.attr({r: (1000000/distance)});
			r2.attr({r: (500000/distance)});
			r1.attr({r: (100000/distance)});
			
			t3.attr({text: "10km", y: 195 + (1000000/distance)});
			t2.attr({text:  "5km", y: 195 + (500000/distance)});
			t1.attr({text:  "1km", y: 195 + (100000/distance)});
		}
		else if(distance <= 5000){
			r4.attr({r: (10000000/distance)});
			r3.attr({r: (5000000/distance)});
			r2.attr({r: (2500000/distance)});
			r1.attr({r: (1000000/distance)});
			
			t3.attr({text: "50km", y: 195 + (5000000/distance)});
			t2.attr({text: "25km", y: 195 + (2500000/distance)});
			t1.attr({text: "10km", y: 195 + (1000000/distance)});
		}
		else if(distance <= 100000){
			r4.attr({r: (25000000/distance)});
			r3.attr({r: (10000000/distance)});
			r2.attr({r: (5000000/distance)});
			r1.attr({r: (1000000/distance)});
			
			t3.attr({text: "100km", y: 195 + (10000000/distance)});
			t2.attr({text:  "50km", y: 195 + (5000000/distance)});
			t1.attr({text:  "10km", y: 195 + (1000000/distance)});
		}
	}
}
