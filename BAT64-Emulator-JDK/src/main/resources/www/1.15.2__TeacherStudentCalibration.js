


var g_GET_Parameter = get_GET_Parameter();
var g_ModeIndex = parseInt((g_GET_Parameter.mode), 10);
var g_CalibrationState = g_GET_Parameter.CalibrationState;
var g_isCalibrationActive = 0;

if(typeof g_CalibrationState == "undefined"){
	g_CalibrationState = 0;
}
else{
	g_CalibrationState = parseInt(g_CalibrationState, 10);
}

if(g_CalibrationState > 0){
	hideHTML('Button_Box');
	calibrate(g_CalibrationState-1);
	showHTML('Additional_Button_Box');
}

var g_MEASValue_TeacherStudentStatusByte = 3276;


initPage();

function initPage(){
	initScrollbars('List_Container');
	$('#Soft_Shutdown').bind('click', function(){shutDown();});
	

	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);



	telemetryteacherStatus = new Object();
	telemetryteacherStatus.ID = g_MEASValue_TeacherStudentStatusByte;
	telemetryteacherStatus.Value = 0;
	telemetryteacherStatus.ValueStr = "";
	
	telemetryTxHKStatusWord = new Object();
	telemetryTxHKStatusWord.ID = CONST_TELEMETRY_Tx_HKStatusWord;
	telemetryTxHKStatusWord.Value = 0;
	

	telemetryIds.push(telemetryteacherStatus, telemetryTxHKStatusWord);

	
	setInterval(JsonFunction, 250);
}







function onEVENT_INIT(e){
	try{
		$('#Start_Calibration_Label').bind("click", function(){GetTd({"cmd":0x031C}, "noEvent", "command");calibrate(0);});
		$('#Confirm_Calibration_Label').bind("click", function(){calibrate(1);});
		$('#SetCenter_Calibration_Label').bind("click", function(){GetTd({"cmd":0x031D}, "noEvent", "command"); calibrate(2);});
		$('#Teacher_Student_Settings_View_Button').bind('click', function(){gotoSettings(0);});
		
		if(g_ModeIndex == 2){
			setHTML('Teacher_Student_Calibration_View_Label', 'Lehrer Setup');
		}
		else if (g_ModeIndex == 3){
			setHTML('Teacher_Student_Calibration_View_Label', 'Schüler - Setup');
		}
		else if (g_ModeIndex == 4){
			setHTML('Teacher_Student_Calibration_View_Label', 'Lehrer Setup');
		}
		else if (g_ModeIndex == 5){
			setHTML('Teacher_Student_Calibration_View_Label', 'Pilot - Setup');
		}
		
		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);

		
		var htmlOuterContainer = "";
		
		for(var i = 0; i < 12; i++){
			
			htmlOuterContainer += getOfServoBlock(i);

			controlRemote = new Object();
			controlRemote.ID = CONST_CTRL_CONTROLID_RemoteBegin + i;
			controlRemote.Value = 0;
			controlRemote.ValueStr = "";

			controlIds.push(controlRemote);
		}

		

		
		setHTML("scrollContainerInnerVertical", htmlOuterContainer);

		initScrollbars('List_Container');
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	if(cmd == "telemetry"){
		if(key == g_MEASValue_TeacherStudentStatusByte){
			
			

			signalStatus = 1&value;
			signalType = 12&value; 
		
			if(typeof preTeacherStatus == "undefined"){
				preTeacherStatus = -1;
			}
			if(typeof preTeacherType == "undefined"){
				preTeacherType = -1;
			}
			
			if((preTeacherType != signalType) || (preTeacherStatus != signalStatus)){
				if((signalType == 4) && (g_ModeIndex == 2) && (signalStatus == 1)){
					showHTML('Additional_Button_Box');
				}
				else if(!g_CalibrationState){
					hideHTML('Additional_Button_Box');
				}
				preTeacherStatus = signalStatus;
				preTeacherType = signalType;
			}
		}
		else if(key == CONST_TELEMETRY_Tx_HKStatusWord){
			g_isCalibrationActive = 131072&value;

			if(typeof onStart == "undefined"){
				onStart = 1;
			}

			if(onStart){
				if(g_isCalibrationActive){
					hideHTML('Button_Box');
					calibrate(1);
					showHTML('Additional_Button_Box');
				}
				onStart = 0;
			}
		}
	}	
	if(cmd == "control"){
		valueStr = checkNumber(Value12Bit2Percent(value));
		if(valueStr != "--"){
			value = valueStr;
		}
		else{
			value = 0;
		}
		graficWidth = (Math.abs(value)/2);
		graficMargin = 50 - graficWidth;
		value *= 2;

		if(!(value < 0)){
			graficMargin = 50;

		}


		setCSS(('Teacher_Student_Graphic_' + key), 'width', (graficWidth + "%"));
		setCSS(('Teacher_Student_Graphic_' + key), 'marginLeft', (graficMargin + "%"));
		setHTML(('Teacher_Student_Value_' + key), (valueStr + "%"));
	}
}



function getOfServoBlock(Index){
	var htmlInnerContainer = '';
	if(Index < 3){
	    htmlInnerContainer += '<div class="monitor_block" style="margin-top: 0px;">';
	}
	else{
	    htmlInnerContainer += '<div class="monitor_block">';
	}

	htmlInnerContainer +=
		'<div class="monitor_block_row_top">' +
			'<div>' + (Index + 1) + '</div>' +
			'<div id="Teacher_Student_Value_' + (CONST_CTRL_CONTROLID_RemoteBegin + Index) + '" style="float: right;">0%</div>' +
		'</div>' +
		'<div class="monitor_block_row_bottom">' +
			'<div class="servo_center"></div>' +
			'<div id="Teacher_Student_Graphic_' + (CONST_CTRL_CONTROLID_RemoteBegin + Index) + '" class="servo_graph" style="margin-left: 0%; width: 0%;"></div>' +
		'</div>' +
	'</div>';

	return htmlInnerContainer;
}


function gotoSettings(){
	window.location.href = "1.15.1__TeacherStudentSettings.html?mode=" + g_ModeIndex + "&CalibrationState=" + g_CalibrationState;
}

function calibrate(isCalibrationStart){

	switch(isCalibrationStart){
		case 0:	g_CalibrationState = 1;
				showDialogbox("info", 'Bewegen Sie alle Geber zu beiden Endstellungen, drücken Sie danach "Bestätigen".');
				hideHTML('Button_Box');
				hideHTML('Start_Calibration_Label');
				document.getElementById('Confirm_Calibration_Label').style.display = "table-cell";
				break;
		case 1: g_CalibrationState = 2; 
				showDialogbox("info", 'Stellen Sie alle Geber in ihre Mittelposition und drücken Sie danach "Mitte speichern"');
				hideHTML('Start_Calibration_Label');
				hideHTML('Confirm_Calibration_Label');
				document.getElementById('SetCenter_Calibration_Label').style.display = "table-cell";
				break;
		case 2:	g_CalibrationState = 0;
				showDialogbox("info",  'Drücken Sie "Start Kalibrierung" um mit der Kalibrierung zu beginnen.');
				hideHTML('SetCenter_Calibration_Label');
				document.getElementById('Start_Calibration_Label').style.display = "table-cell";
				showHTML('Button_Box');
				break;
	}	
}

function checkNumber(val){
	if(isNaN(val)){
		val = "--";
	}

	return val;
}
