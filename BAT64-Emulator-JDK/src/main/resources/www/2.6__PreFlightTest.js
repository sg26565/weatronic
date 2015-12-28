


var timerRangeInterval = "";
var timerFailSafeInterval = "";

var g_isRageTestActive = false;
var g_isFailSaveTestActive = false;
var g_isBackPage = false;
var g_lastURL = "2.0__GeneralSettings.html";


var MEASValue_Tx_LQI_0  =	3201;
var MEASValue_Tx_LQI_1  =	3202;
var MEASValue_Tx_RSSI_0 =	1155;
var MEASValue_Tx_RSSI_1 =	1156;

var MEASValue_Rx_LQI_0  =	3073;
var MEASValue_Rx_LQI_1  =	3074;
var MEASValue_Rx_RSSI_0 =	1027;
var MEASValue_Rx_RSSI_1 =	1028;

var MEASValue_RxSub1_LQI_0  = 3089;
var MEASValue_RxSub1_LQI_1  = 3090;
var MEASValue_RxSub1_RSSI_0 = 1043;
var MEASValue_RxSub1_RSSI_1 = 1044;

var MEASValue_RxSub2_LQI_0  = 3105;
var MEASValue_RxSub2_LQI_1  = 3106;
var MEASValue_RxSub2_RSSI_0 = 1059;
var MEASValue_RxSub2_RSSI_1 = 1060;

var MEASValue_Array = [MEASValue_Tx_RSSI_0, MEASValue_Rx_RSSI_0, MEASValue_RxSub1_RSSI_0, MEASValue_RxSub2_RSSI_0,
                       MEASValue_Tx_RSSI_1, MEASValue_Rx_RSSI_1, MEASValue_RxSub1_RSSI_1, MEASValue_RxSub2_RSSI_1,
                       MEASValue_Tx_LQI_0, MEASValue_Rx_LQI_0, MEASValue_RxSub1_LQI_0, MEASValue_RxSub2_LQI_0,
                       MEASValue_Tx_LQI_1, MEASValue_Rx_LQI_1, MEASValue_RxSub1_LQI_1, MEASValue_RxSub2_LQI_1];

initPage();

function initPage(){



	$('#Navi_Button').removeAttr("href");
	$('#Navi_Button').bind("click", function(){
		g_isBackPage = true;
		stoptestOnbackpage();
	});


	for(var i = 0; i < MEASValue_Array.length; i++){
		telemetryObj = new Object();
		telemetryObj.ID = MEASValue_Array[i];
		telemetryObj.Value = 0;
		telemetryObj.ValueStr = "";

		telemetryIds.push(telemetryObj);
	}


	DeviceChannel = ["Tx", "Rx", "Rx Sub 1", "Rx Sub 2"];
	htmlOuterContainer = '';

	for(var i = 0; i < 4; i++){
		htmlOuterContainer += getRowOfPreFlightTelemetry(DeviceChannel[i], MEASValue_Array[i], MEASValue_Array[i + 4], MEASValue_Array[i + 8], MEASValue_Array[i + 12]);
	}

	$("#scrollContainerInnerVertical").html(htmlOuterContainer);

	initScrollbars('List_Container');

	$('#Pre_Flight_Button_Range_Start').bind("click", function(){preFlighttestTest(true, "Range");});
	$('#Pre_Flight_Button_Range_Stop').bind("click", function(){preFlighttestTest(false, "Range");});
	$('#Pre_Flight_Button_Fail_Safe_Start').bind("click", function(){preFlighttestTest(true, "Fail_Safe");});
	$('#Pre_Flight_Button_Fail_Safe_Stop').bind("click", function(){preFlighttestTest(false, "Fail_Safe");});

	setInterval(JsonFunction, 250);
}



function onEVENT_INIT(e){
	try{

	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "telemetry"){
		log(3, key);
		setHTML('Telemetry_' + key, valueStr);
	}
}


function getRowOfPreFlightTelemetry(DeviceChannel, TelemetryID_RSSI0, TelemetryID_RSSI1, TelemetryID_LQI0, TelemetryID_LQI1){
	htmlPreFlighttelemetryRow = '' +
		'<div class="list_content_row" style="width: 757px;">' +
			'<div class="pre_flight_list no_edit" style="width: 139px;">' +
				DeviceChannel +
			'</div>' +
			'<div id="Telemetry_' + TelemetryID_RSSI0 + '" class="pre_flight_list no_edit"></div>' +
			'<div id="Telemetry_' + TelemetryID_RSSI1 + '" class="pre_flight_list no_edit"></div>' +
			'<div id="Telemetry_' + TelemetryID_LQI0  + '" class="pre_flight_list no_edit"></div>' +
			'<div id="Telemetry_' + TelemetryID_LQI1  + '" class="pre_flight_list no_edit"></div>' +
		'</div>';

	return htmlPreFlighttelemetryRow;
}


function preFlighttestTest(isStart, tag){
	var cmdr = new C_Commander();
	var par = {};

	if(isStart){
		if(tag == "Range"){
			par[PN_WEA_CMD] = WEA_CMD_LONG_RANGETESTSTART;
			timerRange(tag);
			g_isRageTestActive = true;

		}

		if(tag == "Fail_Safe"){
			par[PN_WEA_CMD] = WEA_CMD_LONG_FAILSAFETESTSTART;
			timerFailSafe(tag);
			g_isFailSaveTestActive = true;
		}

		preFlightStatus = $('#Pre_Flight_Status_' + tag);
		preFlightStatus.removeClass('background_inactive');
		preFlightStatus.addClass('background_active');
		preFlightStatus.html('Active');
		showHTML('Pre_Flight_Button_' + tag + '_Stop');
		hideHTML('Pre_Flight_Button_' + tag + '_Start');
	}
	else{
		if(tag == "Range"){
			par[PN_WEA_CMD] = WEA_CMD_LONG_RANGETESTCANCEL;
			clearInterval(timerRangeInterval);
		}

		if(tag == "Fail_Safe"){
			par[PN_WEA_CMD] = WEA_CMD_LONG_FAILSAFETESTCANCEL;
			clearInterval(timerFailSafeInterval);
		}

		setHTML('Pre_Flight_Duration_' + tag, '60s');
		preFlightStatus = $('#Pre_Flight_Status_' + tag);
		preFlightStatus.addClass('background_inactive');
		preFlightStatus.removeClass('background_active');
		preFlightStatus.html('Inactive');
		hideHTML('Pre_Flight_Button_' + tag + '_Stop');
		showHTML('Pre_Flight_Button_' + tag + '_Start');
	}

	cmdr.SendCmd(par);
}


function timerRange(tag){
	var timerStartValue = 60;
	timerRangeInterval = setInterval(function(){
		timerStartValue--;
		setHTML('Pre_Flight_Duration_' + tag,  timerStartValue + 's');

		if(timerStartValue == 0){
			preFlighttestTest(false, tag);
		}
	}, 1000);
}

function timerFailSafe(tag){
	var timerStartValue = 60;
	timerFailSafeInterval = setInterval(function(){
		timerStartValue--;
		setHTML('Pre_Flight_Duration_' + tag,  timerStartValue + 's');

		if(timerStartValue == 0){
			preFlighttestTest(false, tag);
		}
	}, 1000);
}

function stoptestOnbackpage(){
	if(g_isRageTestActive || g_isFailSaveTestActive){
		if(g_isRageTestActive){
			preFlighttestTest(false, "Range");
		}
		if(g_isFailSaveTestActive){
			preFlighttestTest(false, "Fail_Safe");
		}

	}
	else{
		window.location.href = g_lastURL;
	}
}

var COMMANDER_URL_SERVERSIDE = "cgi/command";

var WEA_CMD_LONG_RANGETESTSTART		= 0x0228;		
var WEA_CMD_LONG_RANGETESTCANCEL	= 0x0229;		
var WEA_CMD_LONG_FAILSAFETESTSTART	= 0x0230;		
var WEA_CMD_LONG_FAILSAFETESTCANCEL	= 0x0231;		
var PN_WEA_CMD = 'cmd';
var PN_CMD_PARAM = 'param';
var PN_CALLB = 'Callback_param';
var AJAX_RQ_TYPE = 'POST';














C_Commander.prototype.SendCmd = function(args)
{
	if(typeof args[PN_WEA_CMD] == 'undefined')
		throw {message: 'No command given', code: 0x702};


	this.SendRq(args);
};




function C_Commander(args)
{
	this.RqUrl = COMMANDER_URL_SERVERSIDE;
	this.LastResult = '';
}













C_Commander.prototype.SendRq = function(args)
{
	var tmp =
	{
		"cmd" : 0,
		"param" : {}
	};
	try
	{
		var self = this;
		log(2, args);

		var AjaxParam = {
			'type': AJAX_RQ_TYPE,
			'data': JSON.stringify(args),
			'async': true,
			'datatype': 'json',
			'url': this.RqUrl,
			'success': function(data)
			{
				log(2, data);
				dataObj = JSON.parse(data);
				if(g_isBackPage){
					if(dataObj.Request.cmd ==  553){
						g_isRageTestActive = false;
						stoptestOnbackpage();
					}
					else if(dataObj.Request.cmd ==  561){
						g_isFailSaveTestActive = false;
						stoptestOnbackpage();
					}
				}


				










			},
			'error': function(jqXHR , str, exc)
			{
				try
				{



				}
				catch(exc)
				{
					alert('' + exc);
					onError(err, "in C_Commander.SendRq: ", false);
				}
			}
		};

		$.ajax(AjaxParam);
	}
	catch(exc)
	{
		onError(err, "in C_Commander.SendRq: ", false);
	}
};




C_Commander.prototype.GetResult = function()
{
	return this.LastResult;
};
