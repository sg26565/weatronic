


var g_GET_Parameter = get_GET_Parameter();
var g_lastURL = g_GET_Parameter.LastURL;
var g_groupIndex = g_GET_Parameter.GroupIndex;
var g_Wizard = g_GET_Parameter.Wizard;


var g_popupList = {};
var g_isGizmo = true;
var g_masterServoLimitMax = "invalid";
var g_masterServoLimitMin = "invalid";
var g_masterIndex = -1;

var g_currentGroupName = "";
var g_currentGroupIndex = -1;
var g_isCurrentlyAutoSync = 0;
var g_isWizzardPop = false;
var g_isDirCheck = 0;


initPage();

function initPage(){
	if(g_Wizard){
		
		hideHTML('Navi_Box');
		hideHTML('Option_Box');
		showHTML('Wizard_Box');

		$('#Backward_Button').removeAttr("href");
		$('#Backward_Button').bind("click", function(){
			window.location.href = g_lastURL;
		});

		

		
	}
	else{
		$('#Navi_Button').removeAttr("href");
		$('#Navi_Button').bind("click", function(){
			window.location.href = g_lastURL + "?LastURL=1.0.0__ModelSettings.html";
		});
	}

	$('#Button_Dir_Check').bind("click", function(){dirCheck();});
	$('#Button_Automatic_Sync').bind("click", function(){autoSync();});
	$('#Button_Slave_Reset').bind("click", function(){showDialogbox("delete", 'Slave Kurve von', 'Gruppe' + " " + g_currentGroupName, g_currentGroupIndex);});




	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "AutoSyncMaxCurrent");
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "AutoSyncMaxTravel");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "ServoSyncAccuracy");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "YesNo");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "ServoRealGroupUserUsed");
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);


	g_telemetry_MEASValue_Rx_AutoSyncProgress = 3085;
	telemetryRxAutoSyncProgress = new Object();
	telemetryRxAutoSyncProgress.ID = g_telemetry_MEASValue_Rx_AutoSyncProgress;
	telemetryRxAutoSyncProgress.Value = 0;
	telemetryRxAutoSyncProgress.ValueStr = "";

	g_telemetry_MEASValue_Rx_StatusWord = 11273;
	telemetryRxStatusWord = new Object();
	telemetryRxStatusWord.ID = g_telemetry_MEASValue_Rx_StatusWord;
	telemetryRxStatusWord.Value = 0;
	telemetryRxStatusWord.ValueStr = "";

	telemetryIds.push(telemetryRxAutoSyncProgress, telemetryRxStatusWord);


	setInterval(JsonFunction, 250);
}



function getServoSyncObject(InitDataPostArgsExtended, GroupIndex){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	group = new Object();
		group.Index = GroupIndex;
		group.Name = "";

	master = new Object();
		master.Index = 0;
		master.Plug = "";
		master.NormalName = "";

	slaves = new Object ();
		slaves.Index = 0;
		slaves.Plug = "";
		slaves.NormalName = "";

	slaveItems = new Array(slaves);

	mode = new Object();
		mode.Index = 0;
		mode.Name = "";

	accuracy = new Object();
		accuracy.Index = 0;
		accuracy.Name = 0;

	InitDataPostArgsExtended["get"] = {};
	InitDataPostArgsExtended["get"]["model-settings"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["ServoSync"] = {};
	InitDataPostArgsExtended["get"]["model-settings"]["ServoSync"]["Group"] = group;
	InitDataPostArgsExtended["get"]["model-settings"]["ServoSync"]["Master"] = master;
	InitDataPostArgsExtended["get"]["model-settings"]["ServoSync"]["Slaves"] = slaveItems;
	InitDataPostArgsExtended["get"]["model-settings"]["ServoSync"]["Accuracy"] = accuracy;
	InitDataPostArgsExtended["get"]["model-settings"]["ServoSync"]["MaxCurrent"] = "";
	InitDataPostArgsExtended["get"]["model-settings"]["ServoSync"]["TravelLimit"] = "";
	InitDataPostArgsExtended["get"]["model-settings"]["ServoSync"]["IsGizmo"] = -1;

	return InitDataPostArgsExtended;
}



function onEVENT_INIT(e){
	try{
		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);

		if(e.EventData.PopUp.ServoRealGroupUserUsed.length > 0){
			InitDataPostArgsExtended = new Object();

			g_popupList_Indices["Servo__Group"] = e.EventData.PopUp.ServoRealGroupUserUsed[0].Index;
			g_popupList["Servo__Group"] = e.EventData.PopUp.ServoRealGroupUserUsed;

			if(typeof g_groupIndex == "undefined"){
				GetTd(getServoSyncObject(InitDataPostArgsExtended, e.EventData.PopUp.ServoRealGroupUserUsed[0].Index), g_SetEvent, "get");
				g_currentGroupName = e.EventData.PopUp.ServoRealGroupUserUsed[0].Name;
				setHTML("Servo__Group", g_currentGroupName);
			}
			else{
				g_currentGroupIndex = parseInt(g_groupIndex) & 31;
				GetTd(getServoSyncObject(InitDataPostArgsExtended, g_currentGroupIndex), g_SetEvent, "get");

				for(var i = 0; i< g_popupList["Servo__Group"].length; i++){
					if(g_popupList["Servo__Group"][i].Index == g_currentGroupIndex){
						g_currentGroupName = g_popupList["Servo__Group"][i].Name;
						setHTML("Servo__Group", g_currentGroupName);
					}
				}
			}

			g_numpadLimitObj = e.EventData.NumPadLimits;

			g_popupList["Servo__Accuracy"] = e.EventData.PopUp.ServoSyncAccuracy;
			g_popupList["Servo__YesNo"]    = e.EventData.PopUp.YesNo;
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "telemetry"){
		if(key == g_telemetry_MEASValue_Rx_AutoSyncProgress){
			if(g_isCurrentlyAutoSync){
				setCSS('Dialog_Box_Progressbar', 'width', (value + "%"));
			}
		}

		if(key == g_telemetry_MEASValue_Rx_StatusWord){
			g_isCurrentlyAutoSync = value & (1 << 14);

			if(typeof preIsAutoSync == "undefined"){
				preIsAutoSync = -1;
			}

			if((g_isCurrentlyAutoSync != preIsAutoSync) && !g_isWizzardPop){
				if(g_isCurrentlyAutoSync){
					showDialogbox("progress", 'Die automatische Synchronisation wird durchgeführt');
				}
				else{
					$('#Dialog_Outter').remove();
				}

				preIsAutoSync = g_isCurrentlyAutoSync;
			}
		}



	}
}


function onEVENT_SET(e){
	try{
		if(e.EventData.error.code == 0){
			if(e.cmd == "get"){
				handleGET(e.EventData.get);
			}

			if(e.cmd == "set"){
				if(typeof e.EventData.set.ServoSync.Accuracy != "undefined"){
					$('#Dialog_Outter').remove();
				}
			}
		}
		else{
			onError(e, e.EventData.error.text, true);
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}


function getRowOfMasterServo(Index, ServoPlug, ServoName, isReverse){
	var htmlInnerContainer = '' +
		'<div class="content_blocklist_row">' +
			'<div class="servo_plug">' + ServoPlug + '</div>' +
			'<div class="servo_name">' + ServoName + '</div>' +
			'<div class="servo_rev no_edit">' + isReverse + '</div>' +
			'<div class="servo_edit no_edit"></div>' +
		'</div>';

	return htmlInnerContainer;
}


function getRowOfSlaveServos(Index, ServoPlug, ServoName, isReverse, masterIndex){
	var htmlInnerContainer = '' +
		'<div class="content_blocklist_row">' +
			'<div class="servo_plug">' + ServoPlug + '</div>' +
			'<div class="servo_name">' + ServoName + '</div>' +
			'<div id="Servo__' + Index + '_Reverse" class="servo_rev">' + isReverse + '</div>' +
			
			'<div class="servo_edit"><a href="9.2.0__CurveEdit.html?Index=' + masterIndex + '&PageType=SyncIndex&ServoIndex=' + Index + '&GroupIndex=' + g_currentGroupIndex + '&Wizard=' + g_Wizard + '&LastSyncURL=' + location.href  + '"  draggable="false"><img width="62" height="63" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA/CAYAAAC4nXvhAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIGSURBVHja7Nk9S8NAAMbxtlgRRBzFQed+AQelUhF0cBFEqCD4Mulgq6iLn0EnX76Cgji4COriG65uOog62MlBoeqiVOMTvEAMrba9u+Rin4M/hTam+ZHEJpeoZVmRWhyxSI0OwgknnHDCCSeccMIJJ5xwwgn/HtPoCd2jEd++1Z6ICLAF6+cooDE/vtsktK9409Bu/Ph/g/+F9gVvKtqNnwg7vFK0VrzpaDd+MmxwWbQWfFjQyvFhQjvjA6Vlty+q6RHSIlrWeMGZQ+2mXavPa0Yr2W7V8AG0ovv2Ai3JrkTlod6ArlGbZnQGbZi0x0fDglYNH0Z5dKMJnVWFVgmPo260h5LoSgN63cQZmA7UiI7RA+pVhNeCVglPidcj8aoCb6NndaBVTj3to1yR91vQZRVXZ58oo/NyOqbo/E6Kw9w7qtnzzp5eM32W1Tm/T0t8XgneRs/pRquC93jO72rxDno1LNPLB+ixzGVLnfP2OZ31cxpMdgVx9Co2fKgC/K3nNnPG70lP2RV0uQBvaPCXZRNoCm2ivPibO9QfxBR3naLz2x71aBul0S5KiN/3lFiuVSz3gk7QDtpC70E8t5K9OztEfUX+ST2jZhf0TPzc2eALVAj6gZ0s3AY2ed4zEuodsof6OeoUr0ZDdU5E8Pk44YQTTjjhhBNOOOGEE0444YSXN74EGADapi08BGrb8gAAAABJRU5ErkJggg==" alt="" draggable="false" /></a></div>' +
		'</div>';

	return htmlInnerContainer;
}


function handleGET(TdJson){
	setHTML("Servo__Accuracy", TdJson.ServoSync.Accuracy.Name);

	g_currentGroupIndex = TdJson.ServoSync.Group;

	for(var i = 0; i< g_popupList["Servo__Group"].length; i++){
		if(g_popupList["Servo__Group"][i].Index == g_currentGroupIndex){
			g_currentGroupName = g_popupList["Servo__Group"][i].Name;
		}
	}

	g_isGizmo = TdJson.ServoSync.IsGizmo;

	if(g_isGizmo == 1){
		showHTML("Servo__Current");
		setHTML("Servo__MaxCurrent", TdJson.ServoSync.MaxCurrent);
		showHTML("Servo__Travel");
		setHTML("Servo__TravelLimit", TdJson.ServoSync.TravelLimit);
		showHTML('Button_Automatic_Sync');

		$('#Button_Dir_Check').removeClass('round_all').addClass('round_left');
	}

	showServoList(TdJson);

	if(typeof onStart == "undefined"){
		onStart = true;
	}

	if(onStart){
		g_popupList_Indices["Servo__Accuracy"] = TdJson.ServoSync.Accuracy.Index;

		$('#Servo__Group').bind("click", function(){showPopupList(this, g_popupList["Servo__Group"], false, true, g_popupList_Indices);});
		$('#Servo__Accuracy').bind("click", function(){showPopupList(this, g_popupList["Servo__Accuracy"], false, true, g_popupList_Indices);});
		$('#Servo__MaxCurrent').bind("click", function(){showNumpad("Servo__MaxCurrent", "AutoSyncMaxCurrent");});
		$('#Servo__TravelLimit').bind("click", function(){showNumpad("Servo__TravelLimit", "AutoSyncMaxTravel");});

		initScrollbars('List_Container');
		onStart = false;
	}
	else{
		ScrollRefresh();
	}
}


function showServoList(TdJson){
	htmlOuterList = '<div id="Container__List_Outer"></div>';

	setHTML('scrollContainerInnerVertical', htmlOuterList);

	if(typeof TdJson.ServoSync.Master != "undefined"){
		g_masterServoLimitMax = TdJson.ServoSync.Master.MaxValue;
		g_masterServoLimitMin = TdJson.ServoSync.Master.MinValue;
		g_masterIndex = TdJson.ServoSync.Master.Index;









		$('#Container__List_Outer').append(getRowOfMasterServo(TdJson.ServoSync.Master.Index, TdJson.ServoSync.Master.Plug, TdJson.ServoSync.Master.NormalName, "Master"));
	}

	if(typeof TdJson.ServoSync.Slaves != "undefined"){
		for(var i = 0; i < TdJson.ServoSync.Slaves.length; i++){
			$('#Container__List_Outer').append(getRowOfSlaveServos(TdJson.ServoSync.Slaves[i].Index, TdJson.ServoSync.Slaves[i].Plug, TdJson.ServoSync.Slaves[i].NormalName, TdJson.ServoSync.Slaves[i].IsSlaveReverse.Name, TdJson.ServoSync.Master.Index));

			g_popupList_Indices["Servo__" + TdJson.ServoSync.Slaves[i].Index + "_Reverse"] = TdJson.ServoSync.Slaves[i].IsSlaveReverse.Index;
			$('#Servo__' + TdJson.ServoSync.Slaves[i].Index + '_Reverse').bind("click", function(){showPopupList(this, g_popupList["Servo__YesNo"], false, true, g_popupList_Indices);});
		}
	}
}


function deleteItem(Index){
	submitSET("Servo__ResetSlaveCurve", 1);
}


function submitSET(tagId, value){
	if(tagId == "Servo__Group"){
		GetTd(getServoSyncObject(InitDataPostArgsExtended, value), g_SetEvent, "get");
	}
	else{
		
		var xmlObj = new Object();
		cmd = "set";
		ModelName = "model-settings";
		ListType = "ServoSync";
		xmlObj = {};
		xmlObj[cmd] = {};
		xmlObj[cmd][ModelName] = {};
		xmlObj[cmd][ModelName][ListType] = {};
		xmlObj[cmd][ModelName][ListType]["Group"] = {};
		xmlObj[cmd][ModelName][ListType]["Group"]["Index"] = parseInt(g_currentGroupIndex);

		if(tagId == "Servo__ResetSlaveCurve"){
			xmlObj[cmd][ModelName][ListType]["ResetSlaveCurve"] = value;
		}
		else if(tagId == "Servo__Accuracy"){
			xmlObj[cmd][ModelName][ListType]["Accuracy"] = value;
			showDialogbox("actionWait", 'Genauigkeit wird übernommen...');
		}
		else if(tagId == "Servo__MaxCurrent"){
			xmlObj[cmd][ModelName][ListType]["MaxCurrent"] = value;
		}
		else if(tagId == "Servo__TravelLimit"){
			xmlObj[cmd][ModelName][ListType]["TravelLimit"] = value;
		}
		else{
			tagIdArray = tagId.split("__");
			ListType = "ServoConfig";
			tagIdArray = tagIdArray[1].split("_");
			Index = tagIdArray[0];

			xmlObj[cmd][ModelName] = {};
			xmlObj[cmd][ModelName][ListType] = {};
			xmlObj[cmd][ModelName][ListType]["IsSlaveReverse"] = value;
			xmlObj[cmd][ModelName][ListType]["Index"] = parseInt(Index);
		}

		GetTd(xmlObj, g_SetEvent, cmd);
	}
}


function autoSync(){
	g_isCurrentlyAutoSync ^= 1;

	if(g_isCurrentlyAutoSync){
		showDialogbox("progress", "AutoSync is active");
		GetTd({"cmd":0x0315, "param": {"Group": parseInt(g_currentGroupIndex)}}, g_SetEvent, "command");
	}
	else{
		
	}
}

function dirCheck(){
	

		
		
	
	
		if((g_masterServoLimitMax == "invalid") && (g_masterServoLimitMin == "invalid")){
			return;
		}
		else{
			
			showDialogboxDirCheck("dirCheck", "right", g_masterServoLimitMin, g_masterServoLimitMax);
			

			
		}
	
	g_isDirCheck ^= 1;
}


function showDialogboxDirCheck(type, listType, name, index){
	if(numpadOpen && !($('#meindiv').is(':empty'))){
		handleNoneClosedNumpad();
	}
	else{
		hideHTML('Pop_Up_Blocker');
		$('#Pop_Up_Outer').remove();
		$('#Dialog_Outter').remove();
	}

	setCSS("Pop_Up", "paddingLeft", "0px");
	setCSS("Pop_Up", "top", "0px");

	
	htmlDialogText = '<div id="Dialogbox_Text" class="dialogbox-text" style="min-width: 430px;">' +
						'<div style="width: 100%; text-align: center;">' +
							'Master Servo bewegt sich zum Limit:' +
						'</div>' +
						'<div style="width: 98.5%; height: 50px; margin-top: 25px;">'+
							'<div style="width: 50%; height: 100%; border-right: solid 4px #fff;">' +
								'<div id="Dialog_Box_Progressbar" style="width: 50%; height: 100%; line-height:45px; margin-left:50%; background: rgba(96, 153, 240, .7); font-weight: bold; font-size: 30px;">-</div>' +
							'</div>' +
						 '</div>' +
					 '</div>';

	header = 2;
	footer = 0;

	
	htmlDialogHeader = 	'<div class="dialogbox-header">' +
							'<div class="icon_info"></div>' +
							'<div>' + 'Info' + '</div>' +
						'</div>';

	
	htmlDialogFooter = 	'<div style="background: #000; border-radius: 10px 10px 0px 0px; padding: 4px; clear: left; float: right;">' +
							'<div class="dialogbox-footer round_top" onClick=\'closeDialogboxDirCheck(true, "' + type + '");\'>' +
								'<div style="width: 100%; text-align: center; line-height: 70px;">' + 'Abbrechen' + '</div>' +
							'</div>' +
						'<div>';

	var htmlDialog = '' +
		'<div id="Dialog_Inner" class="dialogbox">' +
			htmlDialogHeader +
			htmlDialogText +
			htmlDialogFooter +
		'</div>';

	var htmlDialogOutter = document.createElement('div');
	htmlDialogOutter.setAttribute("id", "Dialog_Outter");
	Pop_Up.appendChild(htmlDialogOutter);
	setHTML("Dialog_Outter", htmlDialog);

	var widthContainer  = $('#Dialog_Outter').outerWidth();
	var heightContainer = $('#Dialog_Outter').outerHeight();

	setCSS("Dialog_Inner", "marginLeft", 796/2 - widthContainer/2 + "px");
	setCSS("Dialog_Inner", "top", 476/2 - heightContainer/2 + "px");

	$('#Dialog_Outter').addClass("dialogbox-outter");

	dirChecking();
	checkDirInterval = setInterval(function(){dirChecking();}, 15000);
}


function closeDialogboxDirCheck(isConfirm, type, Index, name){
	$('#Dialog_Outter').remove();

	if(isConfirm){
		clearTimeout(checkDirTimeout);
		clearInterval(checkDirInterval);
		GetTd({"cmd":0x0257, "param": {"ServoIdx": g_masterIndex}}, "noEvent", "command");
	}
	else{

	}
}


function dirChecking(){
		setCSS('Dialog_Box_Progressbar', 'margin-left', '50%');
		setCSS('Dialog_Box_Progressbar', 'line-height', '44px');
		setHTML('Dialog_Box_Progressbar', '-');
		GetTd({"cmd":0x0256, "param": {"ServoIdx": g_masterIndex, "Pos": parseFloat(g_masterServoLimitMin)}}, "noEvent", "command");
		checkDirTimeout = setTimeout(function(){
			setCSS('Dialog_Box_Progressbar', 'margin-left', '102%%');
			setCSS('Dialog_Box_Progressbar', 'line-height', '50px');
			setHTML('Dialog_Box_Progressbar', '+');
			GetTd({"cmd":0x0256, "param": {"ServoIdx": g_masterIndex, "Pos": parseFloat(g_masterServoLimitMax)}}, "noEvent", "command");
		}, 7500);
}
