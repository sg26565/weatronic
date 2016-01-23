


var g_ModelName = "Default Model";
var g_ModelIMGURL = "";
var g_FlightmodeItemCount = 1;


var g_GET_Parameter = get_GET_Parameter();

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

var g_wifiActive = 0;



initPage();

function initPage(){
	$('#Soft_Shutdown').bind('click', function(){shutDown();});
	$('#Telemetry_Arrow_Right').bind('click', function(){increaseTelemetryPage();});
	$('#Telemetry_Arrow_Left').bind('click', function(){decreaseTelemetryPage();});
	$('#Footer_Blocker').bind('click', function(){showLockDialogbox();});


	InitDataPostArgs = getModelConfigObject(InitDataPostArgs);
	InitDataPostArgs = getRoteryEncoderObject(InitDataPostArgs);
	InitDataPostArgs = getFlightModeObject(InitDataPostArgs);
	GetTd(getCurrentModelName(InitDataPostArgs),g_InitEvent);
	InitDataPostArgsExtended = new Object();
	GetTd(getScreenAdjustObject(InitDataPostArgsExtended), g_SetEvent, "get");
	GetTd(getGeneralSettingsObject(), g_SetEvent, "get");
	GetTd({"wlan":{"cmd":0x0414}}, g_InitEvent, "service");



	










	TdPostArgs = getCurrentFlightMode(TdPostArgs);



	controlTrimmerLeftTop = new Object();
	controlTrimmerLeftTop.ID = CONST_CTRL_RotaryLeftUp;
	controlTrimmerLeftTop.Value = 0;

	controlTrimmerLeftCenter = new Object();
	controlTrimmerLeftCenter.ID = CONST_CTRL_RotaryLeftMiddle;
	controlTrimmerLeftCenter.Value = 0;

	controlTrimmerLeftBottom = new Object();
	controlTrimmerLeftBottom.ID = CONST_CTRL_RotaryLeftBottom;
	controlTrimmerLeftBottom.Value = 0;

	controlTrimmerRightTop = new Object();
	controlTrimmerRightTop.ID = CONST_CTRL_RotaryRightUp;
	controlTrimmerRightTop.Value = 0;

	controlTrimmerRightCenter = new Object();
	controlTrimmerRightCenter.ID = CONST_CTRL_RotaryRightMiddle;
	controlTrimmerRightCenter.Value = 0;

	controlTrimmerRightBottom = new Object();
	controlTrimmerRightBottom.ID = CONST_CTRL_RotaryRightBottom;
	controlTrimmerRightBottom.Value = 0;

	
	controlTrimmerLeftBottomBottom = new Object();
	controlTrimmerLeftBottomBottom.ID = CONST_CTRL_RotaryLeftBottomBottom;
	controlTrimmerLeftBottomBottom.Value = 0;

	controlTrimmerRightBottomBottom = new Object();
	controlTrimmerRightBottomBottom.ID = CONST_CTRL_RotaryRightBottomBottom;
	controlTrimmerRightBottomBottom.Value = 0;

	controlIds.push(controlTrimmerLeftTop, controlTrimmerLeftCenter, controlTrimmerLeftBottom, controlTrimmerRightTop, controlTrimmerRightCenter, controlTrimmerRightBottom, controlTrimmerLeftBottomBottom, controlTrimmerRightBottomBottom);
	
	
	telemtry_Control_Value = new Object();
	telemtry_Control_Value.ID = CONST_CTRL_TeleScreenSlider;
	telemtry_Control_Value.Value = 0;

	controlIds.push(telemtry_Control_Value);
	


	setInterval(JsonFunction, 250);
}



function getScreenAdjustObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	item1 = new Object();
	item1.Index = -1;
	item1.Template = -1;
	item1.TelemetryIds = [];

	InitDataPostArgsExtended["get"] = {};
	InitDataPostArgsExtended["get"]["model-settings"] = {};

	InitDataPostArgsExtended["get"]["model-settings"]["HomeScreenAdjustment"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["HomeScreenAdjustment"] = item1;

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


function getModelConfigObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

  	ModelConfig = new Object();

  	ModelConfig.Image = "";

	InitDataPostArgs.ModelConfig = ModelConfig;

	return InitDataPostArgs;
}


function getRoteryEncoderObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

	RotarySetup = new Object();
	RotarySetup.Items = "ALL";
		isFlightModeDependent = new Object();
		isFlightModeDependent.Index = -1;

	RotarySetup.IsFlightModeDependent = isFlightModeDependent;

	InitDataPostArgs.RotarySetup = RotarySetup;

	return InitDataPostArgs;
}


function getFlightModeObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	Item = new Object();
	Item.Index = 0;
	Item.Name = "";

	flightModeItems = new Array(Item);

	FlightMode = new Object();
	FlightMode.Items = "ALL_USED";
	FlightMode.ItemCount = 0;

	FlightMode.Item = flightModeItems;

	InitDataPostArgs.FlightMode = FlightMode;

	return InitDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		if(typeof e.EventData.wlan != "undefined"){
			if(e.EventData.wlan.request.cmd == 1044){
				if(e.EventData.error.code == 0){
					if(e.EventData.wlan.result.IsWLAN_On == 1){
						$('#Connection_Canvas').show();
						g_wifiActive = 1;

						if(typeof e.EventData.wlan.result.CurrentNetwork.ID != "undefined"){
							GetTd({"wlan":{"cmd":0x0407}}, g_InitEvent, "service");
							setInterval(function(){GetTd({"wlan":{"cmd":0x0407}}, g_InitEvent, "service");}, 10000);
						}
					}
					else{
						$('#Connection_Canvas').hide();
						g_wifiActive = 0;
					}
				}
			}

			if(e.EventData.wlan.request.cmd == 1031){
				if(e.EventData.error.code == 0){
					var networkCount = e.EventData.wlan.result.Networks.length;

					for(var i = 0; i < networkCount; i++){
						if(e.EventData.wlan.result.Networks[i].IsCurrent == 1){
							updateConnectionCanvas(e.EventData.wlan.result.Networks[i].Level);
							break;
						}
					}
				}
			}
		}
		else{
			g_ModelName = e.EventData.ModelName;
			
			if($('#Model_Name_Label').length){
				setHTML("Model_Name_Label", g_ModelName);
			}

			g_ModelIMGURL = e.EventData.ModelConfig.Image;

			if(($('#Model_Name_Label').length) && (g_ModelIMGURL != "")){
				document.getElementById("Image_URL").src = "../user-space/image/" + g_ModelIMGURL;
			}

			g_FlightmodeItemCount = e.EventData.FlightMode.ItemCount;

			for(var i = 0; i < e.EventData.RotarySetup.Item.length; i++){
				if(e.EventData.RotarySetup.Item[i].IsFlightModeDependent.Index == 1){
					setRotaryToFMDependent(e.EventData.RotarySetup.Item[i].Control);
				}
			}
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "control"){
		
		if(key == CONST_CTRL_TeleScreenSlider){
			telemetrySwitchControl(value)
		}
		else{
			value = checkNumber(Value12Bit2Percent(value));


			if(key == CONST_CTRL_RotaryLeftUp){
				if(typeof jquery_Trim_Value_LT == "undefined"){
					jquery_Trim_Value_LT = $('#Trim_Value_LT');
				}

				setHTML('Trim_Value_LT', value);
	
	
				if(typeof jquery_Trim_IMG_LT == "undefined"){
					jquery_Trim_IMG_LT = $('#Trim_IMG_LT');
				}
		
				setCSS('Trim_IMG_LT', 'top', (value * -0.5 + 50) + '%');
	
			}
			else if(key == CONST_CTRL_RotaryLeftMiddle){
				if(typeof jquery_Trim_Value_LC == "undefined"){
					jquery_Trim_Value_LC = $('#Trim_Value_LC');
				}

				setHTML('Trim_Value_LC', value);
	
	
				if(typeof jquery_Trim_IMG_LC == "undefined"){
					jquery_Trim_IMG_LC = $('#Trim_IMG_LC');
				}
	
				
				setCSS('Trim_IMG_LC', 'left', (value * 0.5 + 50) + '%');
	
				
			}
			else if(key == CONST_CTRL_RotaryLeftBottom){
				if(typeof jquery_Trim_Value_LB == "undefined"){
					jquery_Trim_Value_LB = $('#Trim_Value_LB');
				}

				setHTML('Trim_Value_LB', value);
		
		
				if(typeof jquery_Trim_IMG_LB == "undefined"){
					jquery_Trim_IMG_LB = $('#Trim_IMG_LB');
				}
	
				
				setCSS('Trim_IMG_LB', 'top', (value * -0.5 + 50) + '%');
	
				
			}
			else if(key == CONST_CTRL_RotaryRightUp){
				if(typeof jquery_Trim_Value_RT == "undefined"){
					jquery_Trim_Value_RT = $('#Trim_Value_RT');
				}
		
				setHTML('Trim_Value_RT', value);
	
	
				if(typeof jquery_Trim_IMG_RT == "undefined"){
					jquery_Trim_IMG_RT = $('#Trim_IMG_RT');
				}
		
				setCSS('Trim_IMG_RT', 'top', (value * -0.5 + 50) + '%');
	
			}
			else if(key == CONST_CTRL_RotaryRightMiddle){
				if(typeof jquery_Trim_Value_RC == "undefined"){
					jquery_Trim_Value_RC = $('#Trim_Value_RC');
				}
		
				setHTML('Trim_Value_RC', value);
	
	
				if(typeof jquery_Trim_IMG_RC == "undefined"){
					jquery_Trim_IMG_RC = $('#Trim_IMG_RC');
				}
	
				
				setCSS('Trim_IMG_RC', 'left', (value * 0.5 + 50) + '%');
				jquery_Trim_IMG_RC.css({'left': (value * 0.5 + 50) + '%'});
				
			}
			else if(key == CONST_CTRL_RotaryRightBottom){
				if(typeof jquery_Trim_Value_RB == "undefined"){
					jquery_Trim_Value_RB = $('#Trim_Value_RB');
				}
		
				setHTML('Trim_Value_RB', value);
	
	
				if(typeof jquery_Trim_IMG_RB == "undefined"){
					jquery_Trim_IMG_RB = $('#Trim_IMG_RB');
				}
	
				setCSS('Trim_IMG_RB', 'top', (value * -0.5 + 50) + '%');
	
			}
			
			else if(key == CONST_CTRL_RotaryLeftBottomBottom){
				if(typeof jquery_Trim_Value_LBB == "undefined"){
					jquery_Trim_Value_LBB = $('#Trim_Value_LBB');
				}
	
				setHTML('Trim_Value_LBB', value);
	
		
				if(typeof jquery_Trim_IMG_LBB == "undefined"){
					jquery_Trim_IMG_LBB = $('#Trim_IMG_LBB');
				}
		
				setCSS('Trim_IMG_LBB', 'left', (value * 0.5 + 50) + '%');
	
			}
			else if(key == CONST_CTRL_RotaryRightBottomBottom){
				if(typeof jquery_Trim_Value_RBB == "undefined"){
					jquery_Trim_Value_RBB = $('#Trim_Value_RBB');
				}
		
				setHTML('Trim_Value_RBB', value);
		
		
				if(typeof jquery_Trim_IMG_RBB == "undefined"){
					jquery_Trim_IMG_RBB = $('#Trim_IMG_RBB');
				}
		
				setCSS('Trim_IMG_RBB', 'left', (value * 0.5 + 50) + '%');
		
			}
			
		}	
	}

	
	if(cmd == "telemetry"){






		if(key != 65535){
			$("div[id^='" + key + "__']" ).html(valueStr);
		}
	}

	
	if(cmd == "flightmode"){
		if(typeof jquery_FlightMode == "undefined"){
			jquery_FlightMode = $('#Flight_Mode');
		}

		if(g_FlightmodeItemCount > 1){
			jquery_FlightMode.html(e.EventData.Current_FM.Name);
		}
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "get"){
			if(typeof e.EventData.get.HomeScreenAdjustment != "undefined"){
				handleGET(e.EventData.get);
			}
			else{
				g_AutoDimm = e.EventData.get.UserSettings.AutoDimm.Index;
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



function getHomeBlock3(IndexStart, telemetryIds){
	










	var htmlContainer = '' +
		'<div style=" border: #000 solid 0px 0px 1px 0px;">' +
			'<div class="home_block_3">' +
				'<div id="' + telemetryIds[IndexStart].Name + '_Label" class="home_block_template_name">' + telemetryIds[IndexStart].Name + '</div>' +
				'<div id="' + telemetryIds[IndexStart].Index + '__' + IndexStart + '" class="home_block_template_value_3">-.-</div>' +
			'</div>' +
			'<div class="home_block_3">' +
				'<div id="' + telemetryIds[IndexStart + 1].Name + '_Label" class="home_block_template_name">' + telemetryIds[IndexStart+1].Name + '</div>' +
				'<div id="' + telemetryIds[IndexStart + 1].Index + '__' + (IndexStart + 1) + '" class="home_block_template_value_3">-.-</div>' +
			'</div>' +
			'<div class="home_block_3">' +
				'<div id="' + telemetryIds[IndexStart + 2].Name + '_Label" class="home_block_template_name">' + telemetryIds[IndexStart+2].Name + '</div>' +
				'<div id="' + telemetryIds[IndexStart + 2].Index + '__' + (IndexStart + 2) + '" class="home_block_template_value_3">-.-</div>' +
			'</div>' +
		'</div>';

	return htmlContainer;
}


function getHomeBlock1(){
	if(g_ModelIMGURL == ""){
		ImageURL = "data:image/png;base64,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";
	}
	else{
		ImageURL = "../user-space/image/" + g_ModelIMGURL;
	}

	
	

	var htmlContainer = '' +
		'<div class="home_block_top">' +
			'<div id="Model_Name_Label" class="home_block_template_name">' + g_ModelName + '</div>' +
			'<div id="Image_URL_Label" class="home_block_template_value_1">' +
				'<div class="home_model_image"><img id="Image_URL" align="center" width="auto" height="auto" style="max-width: 285px; max-height: 220px" src="' + ImageURL + '"  draggable="false" alt=""/></div>' +
			'</div>' +
		'</div>';

	return htmlContainer;
}


function handleGET(TdJson){
	TemplateIndex = TdJson.HomeScreenAdjustment.Template;
	TelemetryIds = TdJson.HomeScreenAdjustment.TelemetryIds;
	length = 0;
	startOffset = 0;

	switch(TemplateIndex){
		case 0: setHTML('Home_Block_Top_Left', getHomeBlock1(0, TelemetryIds));
				setHTML('Home_Block_Top_Right', getHomeBlock3(1, TelemetryIds));
				length = 4;
				startOffset = 1;
				break;
		case 1: setHTML('Home_Block_Top_Left', getHomeBlock3(0, TelemetryIds));
				setHTML('Home_Block_Top_Right', getHomeBlock1(3, TelemetryIds));
				length = 3;
				break;
		case 2: setHTML('Home_Block_Top_Left', getHomeBlock3(0, TelemetryIds));
				setHTML('Home_Block_Top_Right', getHomeBlock3(3, TelemetryIds));
				length = 6;
				break;
	}

	for(var i = 0 + startOffset; i < length; i++){
		var telemtryObj = new Object();
		telemtryObj.ID = TelemetryIds[i].Index;
		telemtryObj.Value = 0;
		telemtryObj.ValueStr = "";

		telemetryIds.push(telemtryObj);
	}

}

function setRotaryToFMDependent(control){
	switch(control){
		case CONST_CTRL_RotaryLeftUp:				rotaryClass = "Trim_Value_LT"; break;
		case CONST_CTRL_RotaryLeftMiddle:			rotaryClass = "Trim_Value_LC"; break;
		case CONST_CTRL_RotaryLeftBottom:			rotaryClass = "Trim_Value_LB"; break;
		case CONST_CTRL_RotaryRightUp:				rotaryClass = "Trim_Value_RT"; break;
		case CONST_CTRL_RotaryRightMiddle:			rotaryClass = "Trim_Value_RC"; break;
		case CONST_CTRL_RotaryRightBottom:			rotaryClass = "Trim_Value_RB"; break;
		
		case CONST_CTRL_RotaryLeftBottomBottom:		rotaryClass = "Trim_Value_LBB"; break;
		case CONST_CTRL_RotaryRightBottomBottom:	rotaryClass = "Trim_Value_RBB"; break;
		
		default: 									rotaryClass = "";
	}

	$('#' + rotaryClass).addClass('underlined');
}

function checkNumber(val){
	if(isNaN(val)){
		val = "--";
	}

	return val;
}


function Value12Bit2Percent(x){
	return Math.round(x*100/2048);
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
	hideHTML('Footer_Blocker');
	setCSS('Page_Lock', 'visibility', 'hidden');
	g_isLocked = 0;

	if(g_AutoDimm){
		GetTd({"cmd":0x0428, "param": {"Dimmed": 0}}, "noEvent", "command");
	}
}

function LockScreen(){
	showHTML('Footer_Blocker');
	setCSS('Page_Lock', 'visibility', 'visible');
	g_isLocked = 1;
	showLockDialogbox();

	if(g_AutoDimm){
		GetTd({"cmd":0x0428, "param": {"Dimmed": 1}}, "noEvent", "command");
	}
}

function showLockDialogbox(){
	showDialogbox("info", '<img id="Image_URL" width="154" height="196" style="margin-left: 135px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAADECAMAAABQpciiAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHvUExURf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xNPVikAAACkdFJOUwABAgMEBQYHCAoLDQ4PEBITFBUWFxgZGh0eHyAiIyQmJygqKy0uLzAyNTk6Ozw9QEFDRkhKS0xNUFFSU1RXWFpcXWFiY2RlZmdrbG5vcXJzdHV2d3h9foCDhomKkJGSk5SVlpianJ2en6Ciqqytrq+0tba6vcHExcbHyMnKzs/Q0dLU1tna3N3e4OHi4+Tl5ufp6+zu7/Dx8/T19vf4+fr7/P3+WeKt4gAABGRJREFUeNrt3WlXEzEUBmCggCiLgoALCoKiuAGCIOKC+25FAUFcilrFHSmCglQBN9SqLC0IqEXID/Wb59jcmU6TTDOe897PzTvP0IZM0pk0IUG2klLLG5va34T+1purTY07U5MSNNeS/acHv4YZV+Gvg6f3pehzZez3jTKT+tC9L0MLrML7nkWt997KeLtceweYxRqod8XzE3awn8VQ/QeXxEtWHROMMcb6q+MCW3WbCdTtVfbLjnxhQvXliM2w3E4mXJ25dspKh5hEDZXaJ3PPMKmacdslu8Sk65I9slamoFrt+P9/iympW+rHhptMUd1ULWuxcNDw3FzYwsta1Moumh9t3ufxuKuK8/KKq9wejy8KsFGl7JzZkfrubC/49+UF2+/0mbU4q0628ZfhUT55t5Cfa9cW72fDRnMbVMlWvDY6xlu3yeCT535r1O7VckW0+wYHCLWkmzdMbwkZNL2nRnZowWC4Lo7ettjgcmDhsApZzjcyfPyEteYnxsnmYzkKaPQoMFJitX3JCD0qyMvKyd75NN96Qv5TKuFXuaws7QWVeyOmgdB1g8p4kSZJq6NSPbGmeKiUOslp3Usiszvm9YykbiJmMFWKVkNEvlsZe87Kd0RQjYws5TnR7YtEkorGiMFXZr1mG3Gux8SijhNR2yRo1/m4B6JZD4iOLi5L/8ilTRSKhhVOcGEf04Vpexa5tGbxE23mwhb3CId18b1zqThtKd9Lu0SzkgNc1nmZ/n6eiwski76f3DV+IFuGls2dalj0HT3DnWWH3NjSwQWeEZwU93JJmyRXc7jAXrEJcwp3Efh8mRxtGTe4jIsNCFvnIoOuyV5iXePmVlvFlqy4C/odsrQd3DRDbFmLW7P6mS1Ly/6pZlWrLTLGlyxLS/ZFZrYJXUX6I2OuyM80rkRm+kW+Usjkprft8rR2bpqdKZCSFbJhFeUsR8tSQVvYJU/btWALbbZQnlY4awttSsHyzvIpW2hCn9hofUsRLUuelgUaaKCBBhpooIEGGmiggQaaVporGJESVHCjkoLQNbtrD0TeRzdzoFa6qNDdq627Nh/tG2NxrLG+o9ZuVVx39zeLe83fXRdddiHItFTwQhRY7kOmrR6a3hy7doRprJG1Jqtfw0xrDRuv4HUwzdVhJGtg2quBlmWM6qeN0k+cNDMHFP3dfsAJtAAlq/zhBNqPCoJ2mTmiLhO0l86gDRC0kDNoIYI25Qza1P/1VwMNNNBAAw000EADDTTQQAMNNNBAAw000EADDTTQQAMNNNBAAw000EADDTTQQAMNNNBAAw000EADDTTQQAMNNNDwHFXMRT1HNeEM2iRBe+QM2mOC5nYGjdpvdf13J8i+r6eeXfU7geYnH/itcwLN4JcFnumXPTPaLCOoWxbcbPRM/jHdNONfAUjs1CvrTDTe/yHRq1PmTTTd0OPkrC7Y7Klou6CU9eiR9ZRZ2Dym3j8db9e0v97ajjtJRU1PJkNxq8knTUXUz638AcwE4HrjjWvmAAAAAElFTkSuQmCC" draggable="false" alt=""/>');
	setTimeout(function(){closeDialogbox(false, "info"); }, 3000);
}

function checkLockState(){
	if(g_isLocked){
		ResetLockTimer();
	}
	else{
		LockScreen();
	}
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
				increaseTelemetryPage();
			}
			else if(telemetrySwitchCalculatedValue < 0){
				decreaseTelemetryPage();
			}
			
			preControlTelemetrySwitchValue = value;

		}	
	}
}

function getLeadZero(value){
	if(value <= 9){
		value = "0" + value;
	}

	return value;
}


dark_grey = "#555";
white     = "#fff";

connectionW = 32;
connectionH = 32;

connectionCanvas = Raphael("Connection_Canvas", connectionW, connectionH);

connection_center = [4, 28];

connection_100_path = arc(connection_center, 26, -90, 0);
connection_80_path  = arc(connection_center, 20, -90, 0);
connection_60_path  = arc(connection_center, 14, -90, 0);
connection_40_path  = arc(connection_center,  8, -90, 0);

con_100_percent = connectionCanvas.path(connection_100_path).attr({stroke: dark_grey, "stroke-width": "4px", "opacity": 1});
con_80_percent  = connectionCanvas.path(connection_80_path).attr({stroke: dark_grey, "stroke-width": "4px", "opacity": 1});
con_60_percent  = connectionCanvas.path(connection_60_path).attr({stroke: dark_grey, "stroke-width": "4px", "opacity": 1});
con_40_percent  = connectionCanvas.path(connection_40_path).attr({stroke: dark_grey, "stroke-width": "4px", "opacity": 1});
con_20_percent  = connectionCanvas.circle(connection_center[0], connection_center[1], 4).attr({fill: dark_grey, "stroke-width": "none", "fill-opacity": 1});

updateConnectionCanvas(-100);


function updateConnectionCanvas(level){
	
	if(level > -55){
		con_100_percent.attr({stroke: white});
		con_80_percent.attr({stroke: white});
		con_60_percent.attr({stroke: white});
		con_40_percent.attr({stroke: white});
		con_20_percent.attr({fill: white, stroke: 'none'});
	}
	else if(level > -67){
		con_100_percent.attr({stroke: dark_grey});
		con_80_percent.attr({stroke: white});
		con_60_percent.attr({stroke: white});
		con_40_percent.attr({stroke: white});
		con_20_percent.attr({fill: white, stroke: 'none'});
	}
	else if(level > -78){
		con_100_percent.attr({stroke: dark_grey});
		con_80_percent.attr({stroke: dark_grey});
		con_60_percent.attr({stroke: white});
		con_40_percent.attr({stroke: white});
		con_20_percent.attr({fill: white, stroke: 'none'});
	}
	else if(level > -89){
		con_100_percent.attr({stroke: dark_grey});
		con_80_percent.attr({stroke: dark_grey});
		con_60_percent.attr({stroke: dark_grey});
		con_40_percent.attr({stroke: white});
		con_20_percent.attr({fill: white, stroke: 'none'});
	}
	else if(level > -100){
		con_100_percent.attr({stroke: dark_grey});
		con_80_percent.attr({stroke: dark_grey});
		con_60_percent.attr({stroke: dark_grey});
		con_40_percent.attr({stroke: dark_grey});
		con_20_percent.attr({fill: white, stroke: 'none'});
	}
	else{
		con_100_percent.attr({stroke: dark_grey});
		con_80_percent.attr({stroke: dark_grey});
		con_60_percent.attr({stroke: dark_grey});
		con_40_percent.attr({stroke: dark_grey});
		con_20_percent.attr({fill: dark_grey, stroke: 'none'});
	}
}


function arc(center, radius, startAngle, endAngle){
	angle = startAngle;
	coords = toCoords(center, radius, angle);
	path = "M " + coords[0] + " " + coords[1];

	while(angle <= endAngle){
		coords = toCoords(center, radius, angle);
		path += " L " + coords[0] + " " + coords[1];
		angle += 1;
	}

	return path;
}


function toCoords(center, radius, angle){
	var radians = (angle / 180) * Math.PI;
	var x = center[0] + Math.cos(radians) * radius;
	var y = center[1] + Math.sin(radians) * radius;

	return [x, y];
}



if(isBAT){
	$(window).keypress(function (e){
		var c = e.charCode;
		
		if((c == CONST_SCROLLING_Key_e) || (c == CONST_SCROLLING_Key_d) || (c == CONST_SCROLLING_Key_c)){
			increaseTelemetryPage();

		}
		
		if((c == CONST_SCROLLING_Key_w) || (c == CONST_SCROLLING_Key_s)|| (c == CONST_SCROLLING_Key_x)){
			 decreaseTelemetryPage();
		}
	});
}

function increaseTelemetryPage(){
	window.location.href = "0.2__Telemetry.html?TelemetryPage=1&TimerValue=" + g_TimerValue + "&isLocked=" + g_isLocked;
}

function decreaseTelemetryPage(){
	window.location.href = "0.2__Telemetry.html?TelemetryPage=0&TimerValue=" + g_TimerValue + "&isLocked=" + g_isLocked;
}
