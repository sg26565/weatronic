


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
var g_popupList = {};

initPage();

function initPage(){
	initScrollbars('List_Container');
	$('#Soft_Shutdown').bind('click', function(){shutDown();});
	

	InitDataPostArgs = getPopupObj(InitDataPostArgs, "YesNo");
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);
	
	InitDataPostArgsExtended = new Object();
	GetTd(getteacherStudentObject(InitDataPostArgsExtended), g_InitEvent, "get");


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


function getteacherStudentObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}
	
	cmd = "get";
	ModelName = "model-settings";
	ListType = "ConfigTeacherStudent";

	configTeacherStudents = new Object();
	
		replaces = new Object();
		replaces.Control = [];
		replaces.MaskIsInverted  = [];
	configTeacherStudents.Replace = replaces;
	
		remotes = new Object();
		remotes.Control = [];
	configTeacherStudents.Remote = remotes;
	
		role = new Object();
		role.Index = -1;
		role.Name = "";
	configTeacherStudents.Role = role;
	
	InitDataPostArgsExtended[cmd] = {};
	InitDataPostArgsExtended[cmd][ModelName] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType] = configTeacherStudents;
	
	return InitDataPostArgsExtended;
}


function onEVENT_INIT(e){
	try{
		if(typeof e.EventData.get == "undefined"){
			$('#Start_Calibration_Label').bind("click", function(){GetTd({"cmd":0x031C}, "noEvent", "command");calibrate(0);});
			$('#Confirm_Calibration_Label').bind("click", function(){calibrate(1);});
			$('#SetCenter_Calibration_Label').bind("click", function(){GetTd({"cmd":0x031D}, "noEvent", "command"); calibrate(2);});
			$('#Teacher_Student_Calibration_View_Button').bind('click', function(){gotoSettings();});
			checkHTMLHeader('Model_Name');
			setHTML('Model_Name', e.EventData.ModelName);
			g_popupList["Servo__YesNo"]    = e.EventData.PopUp.YesNo;
		}
		else{
			var classHiddenControl = 'style="display: none;"';
			var classHiddenInverse = 'style="display: none;"';
			var listlengthArray = new Array ("500px", "478px", "479px", "457px", "405px", "383px");
			var valueWidthIndex = 0;
			var isTeacher = false;
			var fromName = "";
			
			classHiddenControl = "";
			
			
			if (g_ModeIndex < 5){ 
				valueWidthIndex = 2;
				showHTML('Teacher_Control_Label');
				if(g_ModeIndex == 2){
					classHiddenInverse = "";
					valueWidthIndex = 4;
					showHTML('Teacher_Inverse_Label');

					showHTML('Teacher_Value_Short');
					isTeacher = true;
					fromName = 'Ersetzter Geber' + " ";
					setHTML('TeacherStudentSettings_Label', 'Lehrer Setup');
				}
				else{
					showHTML('Teacher_Value_Mid');

					fromName = 'Geber(Ausgabe)' + " ";
					if(g_ModeIndex == 1){
						setHTML('TeacherStudentSettings_Label', 'PPM AN - Setup');
					}
					else if(g_ModeIndex == 3){
						setHTML('TeacherStudentSettings_Label', 'Schüler - Setup');
					}
					else{
						setHTML('TeacherStudentSettings_Label', 'Operator - Setup');
					}
				}
			}
			else{
				showHTML('Teacher_Backup_Label');
				classHiddenInverse = "";
				valueWidthIndex = 4;
				showHTML('Teacher_Inverse_Label');

				showHTML('Teacher_Value_Short1');
				
				isTeacher = true;
				fromName = 'Backup Geber' + " ";
				setHTML('TeacherStudentSettings_Label', 'Pilot - Setup');
			}
			
			var inverse = "";
			var controlId = 65535;
			
			for(var i = 0; i < 12; i++){
				if((g_ModeIndex == 2) || (g_ModeIndex == 5)){
					inverse = e.EventData.get.ConfigTeacherStudent.Replace.MaskIsInverted[i].Name;
					g_popupList_Indices["Teacher_Inverse_" + i] = controlId = e.EventData.get.ConfigTeacherStudent.Replace.MaskIsInverted[i].Index;
					

						controlId = e.EventData.get.ConfigTeacherStudent.Replace.Control[i];

				}
				else if(g_ModeIndex != 5){
					controlId = e.EventData.get.ConfigTeacherStudent.Remote.Control[i];
				}
				
				setHTML('ContainerOuter_' + i, getRowOfTeacherStudentList(i, controlId,  getControlAssignmentPathRate(i, "Control", controlId, isTeacher), (fromName + (i + 1)), inverse, classHiddenControl, classHiddenInverse, listlengthArray, valueWidthIndex));
				control2image("Teacher_Control_" + i, controlId);
				$('#Teacher_Inverse_' + i).bind("click", function(){showPopupList(this, g_popupList["Servo__YesNo"], false, true, g_popupList_Indices);});
				
				controlRemote = new Object();
				controlRemote.ID = CONST_CTRL_CONTROLID_RemoteBegin + i;
				controlRemote.Value = 0;
				controlRemote.ValueStr = "";

				controlIds.push(controlRemote);
				
			}
		
			ScrollRefresh();
		}
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


function onEVENT_SET(e){
	try{
		
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}	
}


function getRowOfTeacherStudentList(Index, controlId, controlObj, fromName, inverse, classHiddenControl, classHiddenInverse, listlengthArray, valueWidthIndex){
	
	var htmlContainer = '' +
							'<div id="Container_' + Index + '" class="list_content_row" style="width: 674px;">' +
								'<div class="list_student_io no_edit">' + (Index + 1) + '</div>' +
								'<div id="Container_Teacher_Control_' + Index + '" class="list_student_control" ' + classHiddenControl + '>' +
									'<a onClick=\'gotoControlAssignment("' + Index + '", "' + controlId + '", "' + controlObj + '","' + fromName + '");\' draggable="false">' +
										'<img width="85" height="61" id="Teacher_Control_' + Index + '" src="" draggable="false" alt=""/>' +
									'</a>' +
								'</div>' +
								'<div id="Teacher_Inverse_' + Index + '" class="list_student_inverse" ' + classHiddenInverse + '>' + inverse + '</div>' +
								
								'<div id="Teacher_Value_Outer_' + Index + '" class="no_edit" style="position:relative; width:' + listlengthArray[valueWidthIndex] + ';">' +
									'<span id="Teacher_Value_Inner_' + Index + '" style="position: absolute; width:' + listlengthArray[valueWidthIndex + 1] + '; height:49px; margin:10px 10px 10px 10px;">' +
										'<span class="value_lcr" style="height:inherit; width:0%;   position:absolute;"></span>' +
										'<span class="value_lcr" style="height:inherit; width:50%;  position:absolute;"></span>' +
										'<span class="value_lcr" style="height:inherit; width:100%; position:absolute;"></span>' +
										
										'<span class="value_x_axis" style="height:49%; width:100%; position:absolute;"></span>' +
										
									 	'<span id="Teacher_Student_Graphic_' + (CONST_CTRL_CONTROLID_RemoteBegin + Index) + '" class="value_graph" style="height:inherit; width:0%; position:absolute; margin-left:0%;"></span>' +
										

										'<span id="Teacher_Student_Value_' + (CONST_CTRL_CONTROLID_RemoteBegin + Index) + '" class="" style="height:49%; width:49%; position:absolute; text-align:right; line-height:29px; font-size:16px;">0%</span>' +

									'</span>' +
								'</div>' +
							'</div>';

		
	return htmlContainer;
}

function gotoSettings(){
	window.location.href = "1.15.2__TeacherStudentCalibration.html?mode=" + g_ModeIndex + "&CalibrationState=" + g_CalibrationState;
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


function gotoControlAssignment(Index, controlId, controlObj, fromName){
	var pageId = 0;
	if(g_ModeIndex == 2){
		pageId = 7;
	}

	window.location.href = "9.1.0__ControlAssignment.html?PageId=" + pageId + "&FromName=" + fromName + "&ControlId=" + controlId + "&ControlNode=Object&ControlPath=" + controlObj  + "&LastURL=" + location.href;
}

function getControlAssignmentPathRate(Index, controlNode, value, isTeacher){
	cmd = "set";
	ModelName = "model-settings";
	ListType = "ConfigTeacherStudent";
	if(isTeacher){
		str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"' + ListType + '":{"Replace":{"' + controlNode + '":{"Object":"' + value + '","Index":' + Index + '}}}}}}');	
	}
	else{
		str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"' + ListType + '":{"Remote":{"' + controlNode + '":{"Object":"' + value + '","Index":' + Index + '}}}}}}');	
	}
	
	return str;
}

function submitSET(tagId, value){
	var xmlObj = new Object();
	
	ModelName = "model-settings";
	cmd = "set";
	ListType = "ConfigTeacherStudent";
	
	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};
	xmlObj[cmd][ModelName][ListType] = {};
	
	var tagIdArray = tagId.split("_");

	if(tagIdArray[1] == "Inverse"){
		xmlObj[cmd][ModelName][ListType]["Replace"] = {};
		xmlObj[cmd][ModelName][ListType]["Replace"]["MaskIsInverted"] = {};
		xmlObj[cmd][ModelName][ListType]["Replace"]["MaskIsInverted"]["Object"] = value;
		xmlObj[cmd][ModelName][ListType]["Replace"]["MaskIsInverted"]["Index"] = parseInt(tagIdArray[2],10);
	}
	
	
	

	GetTd(xmlObj, g_SetEvent, cmd);
}
