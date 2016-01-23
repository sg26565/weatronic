


var g_isCalibrationActive = false;
var g_calibrationThreshold = [];
g_calibrationThreshold[0] = {};
g_calibrationThreshold[0]["max"] = new Array (500, 1100, 1700);
g_calibrationThreshold[0]["min"] = new Array (-500, -1100, -1700);
g_calibrationThreshold[1] = {};
g_calibrationThreshold[1]["max"] = new Array (200, 500, 800);
g_calibrationThreshold[1]["min"] = new Array (-300, -600, -900);
initPage();

function initPage(){

	telemetryTxHKStatusWord = new Object();
	telemetryTxHKStatusWord.ID = CONST_TELEMETRY_Tx_HKStatusWord;
	telemetryTxHKStatusWord.Value = 0;
	
	telemetryIds.push(telemetryTxHKStatusWord);



	controlStickVertLeft = new Object();
	controlStickVertLeft.ID = CONST_CTRL_StickLeftVert;
	controlStickVertLeft.Value = 0;
	
	controlStickVertRight = new Object();
	controlStickVertRight.ID = CONST_CTRL_StickRightVert;
	controlStickVertRight.Value = 0;
	
	controlStickHoriLeft = new Object();
	controlStickHoriLeft.ID = CONST_CTRL_StickLeftHori;
	controlStickHoriLeft.Value = 0;
	
	controlStickHoriRight = new Object();
	controlStickHoriRight.ID = CONST_CTRL_StickRightHori;
	controlStickHoriRight.Value = 0;
	
	controlPotiTopLeft = new Object();
	controlPotiTopLeft.ID = CONST_CTRL_PotiLeftTop;
	controlPotiTopLeft.Value = 0;
	
	controlPotiTopRight = new Object();
	controlPotiTopRight.ID = CONST_CTRL_PotiRightTop;
	controlPotiTopRight.Value = 0;
	
	controlPotiSideLeft = new Object();
	controlPotiSideLeft.ID = CONST_CTRL_PotiLeftSide;
	controlPotiSideLeft.Value = 0;
	
	controlPotiSideRight = new Object();
	controlPotiSideRight.ID = CONST_CTRL_PotiRightSide;
	controlPotiSideRight.Value = 0;


	controlSliderCenter = new Object();
	controlSliderCenter.ID = CONST_CTRL_SliderCenter;
	controlSliderCenter.Value = 0;

	controlIds.push(
		controlStickVertLeft,
		controlStickVertRight,
		controlStickHoriLeft,
		controlStickHoriRight,
		controlPotiTopLeft,
		controlPotiTopRight,
		controlPotiSideLeft,
		controlPotiSideRight,
		
		controlSliderCenter
		
	);


	$('#Start_Calibration_Label').bind("click", function(){calibrate(0);});
	$('#Confirm_Calibration_Label').bind("click", function(){calibrate(1);});
	$('#SetCenter_Calibration_Label').bind("click", function(){calibrate(2);});
	
	$('#Navi_Button').removeAttr("href");
	$('#Navi_Button').bind("click", function(){
		if(g_isCalibrationActive){
			calibrate(2);
		}

		window.location.href = "2.0__GeneralSettings.html";
	});

	setInterval(JsonFunction, 250);
}


var start = new Array();
var controlValue = new Array();
var onStartup = true;
var controlValueThreshold = 682; 


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "telemetry"){
		if(key == CONST_TELEMETRY_Tx_HKStatusWord){
			isCalibrationActive = 2&value;

			if(typeof preCalibration == "undefined"){
				preCalibration = -1;
			}

			if(isCalibrationActive != preCalibration){
				if(isCalibrationActive){
					g_isCalibrationActive = true;
					setHTML('Calibration_Text_Label', 'Bewegen Sie alle Geber zu beiden Endstellungen, drücken Sie danach "Bestätigen".');
					hideHTML('Start_Button');
					hideHTML('SetCenter_Button');
					showHTML('Confirm_Button');
					onStartup = true;
				}
				else{
					g_isCalibrationActive = false;
					setHTML('Calibration_Text_Label', 'Drücken Sie "Start Kalibrierung" um mit der Kalibrierung zu beginnen.');
					hideHTML('SetCenter_Button');
					showHTML('Start_Button');
					ShowControlOverlayIcon(g_isCalibrationActive);
				}

				preCalibration = isCalibrationActive;
			}
		}
	}

	if(cmd == "control"){
		if(onStartup){
			for(var j = 0; j < controlIds.length; j++){
				start[j] = true;
				onStartup = false;
			}
		}

		for(var i = 0; i < controlIds.length; i++){
			if(key == controlIds[i].ID){
				checkForNew_CONTROL_ASSIGNMENT(i, key, value);

				break;
			}
		}
	}
}


function checkForNew_CONTROL_ASSIGNMENT(controlID, key, val){
	if(start[controlID]){
		controlValue[controlID] = {};
		controlValue[controlID]["val"] = val;
		controlValue[controlID]["max"] = 0;
		controlValue[controlID]["min"] = 0;
		controlValue[controlID]["status"] = 0;
		controlValue[controlID]["lastImg"] = "";
		start[controlID] = false;
	}
	else{
		if(Math.abs(val - controlValue[controlID]["val"]) > controlValueThreshold){
			log(3, "Wert von " + key + " mehr als 30% geaendert");
			controlValue[controlID]["status"] = 1;
			controlValue[controlID]["val"] = val;
		}
		if(controlValue[controlID]["status"] == 1){
			var directionA = 0;
			var directionB = 0;
			var threshold = 0;
			



			
			if(val > controlValue[controlID]["max"]){
				controlValue[controlID]["max"] = val;
			}
			if(val < controlValue[controlID]["min"]){
				controlValue[controlID]["min"] = val;
			}
			
			if (controlValue[controlID]["max"] > g_calibrationThreshold[threshold]["max"][2]){
				directionA = 3;
			}
			else if (controlValue[controlID]["max"] > g_calibrationThreshold[threshold]["max"][1]){
				directionA = 2;
			}
			else if (controlValue[controlID]["max"] > g_calibrationThreshold[threshold]["max"][0]){
				directionA = 1;
			}
			
			if (controlValue[controlID]["min"] < g_calibrationThreshold[threshold]["min"][2]){
				directionB = 3;
			}
			else if (controlValue[controlID]["min"] < g_calibrationThreshold[threshold]["min"][1]){
				directionB = 2;
			}
			else if (controlValue[controlID]["min"] < g_calibrationThreshold[threshold]["min"][0]){
				directionB = 1;
			}
			
			ShowControlOverlayIcon(g_isCalibrationActive, key, directionA, directionB, controlID);
		}
	}
}


function calibrate(isCalibrationStart){
	var cmdr = new C_Commander();
	var par = {};

	switch(isCalibrationStart){
		case 0:	par[PN_WEA_CMD] = WEA_CMD_CALIBRATION_START;
				
				hideHTML('Button_Box');
				cmdr.SendCmd(par);
				break;
		case 1: setHTML('Calibration_Text_Label', 'Stellen Sie alle Geber in ihre Mittelposition und drücken Sie danach "Mitte speichern"');
				hideHTML('Confirm_Button');
				showHTML('SetCenter_Button');
				break;
		case 2:	par[PN_WEA_CMD] = WEA_CMD_CALIBRATION_STOP;
				
				cmdr.SendCmd(par);
				break;
	}	
}


function ShowControlOverlayIcon(isCalibrationActive, ControlID, directionA, directionB, id){
	if(isCalibrationActive){
		switch(ControlID){
			case CONST_CTRL_SliderCenter:		controlImg = ('CTRL_SliderCenter_' + directionB + '_' + directionA);	break;
			case CONST_CTRL_PotiLeftSide:		controlImg = ('CTRL_SliderLeft_' + directionA + '_' + directionB);		break;
			case CONST_CTRL_PotiRightSide:		controlImg = ('CTRL_SliderRight_' + directionA + '_' + directionB);		break;
			case CONST_CTRL_PotiLeftTop:		controlImg = ('CTRL_PotiLeftTop_' + directionB + '_' + directionA);		break;
			case CONST_CTRL_PotiRightTop:		controlImg = ('CTRL_PotiRightTop_' + directionB + '_' + directionA);	break;
			case CONST_CTRL_StickLeftHori:		controlImg = ('CTRL_StickLeftHori_' + directionB + '_' + directionA);	break;
			case CONST_CTRL_StickLeftVert:		controlImg = ('CTRL_StickLeftVert_' + directionA + '_' + directionB);	break;
			case CONST_CTRL_StickRightHori:		controlImg = ('CTRL_StickRightHori_' + directionB + '_' + directionA);	break;
			case CONST_CTRL_StickRightVert:		controlImg = ('CTRL_StickRightVert_' + directionA + '_' + directionB);	break;
			default:							controlImg = "";
		}

		if(controlValue[id]["lastImg"] != ""){
			hideHTML(controlValue[id]["lastImg"]);
		}
		if(controlImg != ""){
			showHTML(controlImg);
		}
		controlValue[id]["lastImg"] = controlImg;
	}
	else{
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				hideHTML('CTRL_SliderCenter_' + i + '_' + j);	
				hideHTML('CTRL_SliderLeft_' + i + '_' + j);
				hideHTML('CTRL_SliderRight_' + i + '_' + j);
				hideHTML('CTRL_PotiLeftTop_' + i + '_' + j);
				hideHTML('CTRL_PotiRightTop_' + i + '_' + j);
				hideHTML('CTRL_StickLeftHori_' + i + '_' + j);
				hideHTML('CTRL_StickLeftVert_' + i + '_' + j);
				hideHTML('CTRL_StickRightHori_' + i + '_' + j);
				hideHTML('CTRL_StickRightVert_' + i + '_' + j);
			}
		}
	}
}


var COMMANDER_URL_SERVERSIDE = "cgi/command"; 

var WEA_CMD_BINDING_START = 0x220;
var WEA_CMD_CALIBRATION_START = 0x312;
var WEA_CMD_CALIBRATION_STOP = 0x313;
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
				var jsonObj = $.parseJSON(data);
				if(jsonObj.Request.cmd == WEA_CMD_CALIBRATION_STOP){
					showHTML('Button_Box');
				}
				
				









			},
			'error': function(jqXHR , str, exc) 
			{ 
				try
				{



				}
				catch(exc)
				{
					onError(exc, "in C_Commander.SendRq: ", false);
				}
			}
		};
		
		$.ajax(AjaxParam);
	}
	catch(exc)
	{
		onError(exc, "in C_Commander.SendRq: ", false);
	}
};




C_Commander.prototype.GetResult = function()
{
	return this.LastResult;
};
