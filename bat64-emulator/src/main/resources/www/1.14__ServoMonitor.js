


var g_lastURL = getLastURL();
var g_isRxServo = {};

initPage();

function initPage(){

	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	GetTd(getServoObject(InitDataPostArgs), g_InitEvent);



	TdPostArgs = getCurrentFlightMode(TdPostArgs);


	setInterval(JsonFunction, 250);
}



function getServoObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined")
		InitDataPostArgs = new Object();

	Item = new Object();
	Item.Index = 0;
	Item.Plug = "";
	Item.Role = -1;
	Item.NormalName = "";
	Item.Functions = "";
	Item.Sequencers = "";

		group = new Object();
		group.Index = -1;
		group.Name = "";
	Item.Group = group;

	Item.MaxValue = 0;
	Item.MinValue = 0;
	Item.Center = 0;

	servoItems = new Array(Item);

	Servos = new Object();
	Servos.Items = "ALL_USED";

	Servos.Item = servoItems;

	InitDataPostArgs.Servos = Servos;

	return InitDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		setHeaderMaxWidth('Model_Name', 'Flight_Mode');

		if(typeof g_lastURL != "undefined"){
			$('#Navi_Button').removeAttr("href");
			$('#Navi_Button').bind("click", function(){window.location.href = g_lastURL;});
		}
		else{
			showHTML('Toggle_Buttons');
		}

		setHTML('Model_Name', e.EventData.ModelName);
		var htmlOuterContainer = "";
		
		for(i in e.EventData.Servos.Item){
			Index = CONST_TELEMETRY_MEASValue_Tx_Servo__0 + e.EventData.Servos.Item[i].Index;
			Plug = e.EventData.Servos.Item[i].Plug;
			Name = e.EventData.Servos.Item[i].NormalName;
			Functions = e.EventData.Servos.Item[i].Functions;
			Sequencers = e.EventData.Servos.Item[i].Sequencers;
			Group = e.EventData.Servos.Item[i].Group.Name;
			MaxValue = ((Value12Bit2Percent(e.EventData.Servos.Item[i].MaxValue))+100)/2;
			MinValue = ((Value12Bit2Percent(e.EventData.Servos.Item[i].MinValue))+100)/2;
			Center = e.EventData.Servos.Item[i].Center;

			htmlOuterContainer += getOfServoBlock(Index, Plug, Name, Group, Functions, Sequencers, MinValue, MaxValue, Center, i);

			telemetryServoTx = new Object();
			telemetryServoTx.ID = Index;
			telemetryServoTx.Value = 0;
			telemetryServoTx.ValueStr = "";

			telemetryIds.push(telemetryServoTx);
			
			if(!e.EventData.Servos.Item[i].Role){
				telemetryServoRx = new Object();
				telemetryServoRx.ID = CONST_TELEMETRY_MEASValue_Rx_Servo__0 + e.EventData.Servos.Item[i].Index;
				telemetryServoRx.Value = 0;
				telemetryServoRx.ValueStr = "";

				telemetryIds.push(telemetryServoRx);
			}
			
			

			g_isRxServo[Index] = {};
			g_isRxServo[Index]["Status"] = false;
			g_isRxServo[Index]["Value"] = 0;
			g_isRxServo[Index]["ValueStr"] = "";
		}

		TdPostArgs.Telemetry_Val = telemetryIds;

		
		setHTML("scrollContainerInnerVertical", htmlOuterContainer);

		initScrollbars('List_Container');
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	if(cmd == "telemetry"){
		if((CONST_TELEMETRY_MEASValue_Rx_Servo__0 <= key) && (key <= CONST_TELEMETRY_MEASValue_Rx_Servo__63)){
			var indexKey = (key - CONST_TELEMETRY_MEASValue_Rx_Servo__0) + CONST_TELEMETRY_MEASValue_Tx_Servo__0;
			if(!isNaN(value)){
				g_isRxServo[indexKey]["Status"] = true;
				g_isRxServo[indexKey]["Value"] = value;
				g_isRxServo[indexKey]["ValueStr"] = valueStr;
			}
			else{
				g_isRxServo[indexKey]["Status"] = false;
			}
		}
		else{
			if(g_isRxServo[key]["Status"]){
				value = g_isRxServo[key]["Value"];
				valueStr = g_isRxServo[key]["ValueStr"];
				showHTML('Servo_Status_' + key);
			}
			else{
				hideHTML('Servo_Status_' + key);
			}

			value = Value12Bit2Percent(value);
			graficWidth = (Math.abs(value)/2);
			graficMargin = 50 - graficWidth;
			value *= 2;

			if(!(value < 0)){
				graficMargin = 50;

			}


			setCSS(('Servo_Grafic_' + key), 'width', (graficWidth + "%"));
			setCSS(('Servo_Grafic_' + key), 'marginLeft', (graficMargin + "%"));
			setHTML(('Servo_Value_' + key), (valueStr));
		}
	}

		
	if(cmd == "flightmode"){
		if(typeof jquery_FlightMode == "undefined"){
			jquery_FlightMode = $('#Flight_Mode');
		}

		jquery_FlightMode.html(e.EventData.Current_FM.Name);
	}
}



function getOfServoBlock(Index, Plug, Name, Group, Functions, Sequencers, MinValue, MaxValue, Center, Count){
	var htmlInnerContainer = '';
	if(Count < 3){
	    htmlInnerContainer += '<div class="monitor_block" style="margin-top: 0px;">';
	}
	else{
	    htmlInnerContainer += '<div class="monitor_block">';
	}

	htmlInnerContainer +=
		'<div class="monitor_block_row_top">' +
			'<div id="Servo_Plug">' + Plug + '</div>' +
			'<div id="Servo_Name">' + Name + '</div>' +
			'<div id="Servo_Group">' + Group + '</div>' +
		'</div>' +
		'<div id="Servo_Functions" class="monitor_block_row_center">' + Functions + Sequencers + '</div>' +
		'<div class="monitor_block_row_bottom">' +
			'<div id="Servo_Limit_Min" class="servo_min" style="width: ' + MinValue + '%;"></div>' +
			'<div class="servo_center"></div>' +
			'<div id="Servo_Limit_Max" class="servo_max" style="width: ' + MaxValue + '%;"></div>' +
			'<div id="Servo_Grafic_' + Index + '" class="servo_graph" style="margin-left: 0%; width: 0%;"></div>' +
			'<div id="Servo_Value_' + Index + '" class="servo_value">--%</div>' +
			'<div id="Servo_Status_' + Index + '" class="servo_status">Rx</div>' +
		'</div>' +
	'</div>';

	return htmlInnerContainer;
}




function getLastURL(){
	var uriGET = undefined;

	try{
		uriGET = window.location.search.substring(1).split("LastURLMonitor=")[1];
		if(typeof uriGET == 'undefined') return;
	}catch(err){
		onError(err, "Error getLastURL() at Servomonitor : ", false);
	}

    return uriGET;
}
