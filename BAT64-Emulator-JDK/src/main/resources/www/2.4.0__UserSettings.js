



var	g_PwState = "";

var timeDateFormat = {};
timeDateFormat.Time = new Array("24h", "12h");
timeDateFormat.Date = new Array("DD.MM.YYYY", "YYYY.MM.DD", "MM.DD.YYYY");

var g_timeFormat = -1;
var g_dateFormat = -1;
var g_amPmStr = "";

initPage();

function initPage(){

	InitDataPostArgs = getPopupObj(InitDataPostArgs, "Languages");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "TimeZones");
	GetTd(InitDataPostArgs, g_InitEvent);

	InitDataPostArgsExtended = new Object();
	GetTd(getGeneralSettingsObject(InitDataPostArgsExtended), g_InitEvent, "get");


	setInterval(JsonFunction, 250);

	GetTd({"authentication":{"get":{"isPasswordUsed":-1, "isPasswordChecked":-1}}}, g_SetEvent, "service");
}



function getGeneralSettingsObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	var cmd = "get";
	var ModelName = "general-settings";
	
	InitDataPostArgsExtended[cmd] = {};
	InitDataPostArgsExtended[cmd][ModelName] = {};
	InitDataPostArgsExtended[cmd][ModelName]["UserSettings"] = {};
	InitDataPostArgsExtended[cmd][ModelName]["UserSettings"]["Name"] = "";
	InitDataPostArgsExtended[cmd][ModelName]["UserSettings"]["Picture"] = "";
	InitDataPostArgsExtended[cmd][ModelName]["UserSettings"]["Language"] = {};
	InitDataPostArgsExtended[cmd][ModelName]["UserSettings"]["Language"]["Index"] = 0;
	InitDataPostArgsExtended[cmd][ModelName]["UserSettings"]["Language"]["Name"] = "";
	InitDataPostArgsExtended[cmd][ModelName]["TimeSetup"] = {};
	InitDataPostArgsExtended[cmd][ModelName]["TimeSetup"]["TimeZone"] = {};
	InitDataPostArgsExtended[cmd][ModelName]["TimeSetup"]["TimeZone"]["Index"] = -1;
	InitDataPostArgsExtended[cmd][ModelName]["TimeSetup"]["TimeZone"]["Name"] = "";
	InitDataPostArgsExtended[cmd][ModelName]["TimeSetup"]["FormatTime"] = -1;
	InitDataPostArgsExtended[cmd][ModelName]["TimeSetup"]["FormatDate"] = -1;

	return InitDataPostArgsExtended;
}



function onEVENT_INIT(e){
	try{
		if(typeof e.EventData.get != "undefined"){
			$('#Date_Time').bind('click', function(){window.location.href = '2.4.2__TimeSettings.html';});
			$('#User_IMG').bind("click", function(){window.location.href = "9.4.0__FileManager.html?ManagementType=imageManagement&IsManager=0&LastURL=2.4.0__UserSettings.html&SavePathObj=" + getSavePath() + "&SearchKeyNode=Picture";});
			$('#User_Password').bind("click", function(){										
															g_PwState = "changePW";
															checkPassword(false ,"");
														});	
			$('#User_Password_Active').bind("click", function(){	
																	if(g_isPwChecked){
																		if(g_isPwActive){
																			g_PwState = "";
																			togglePwActive(false);
																		}
																		else{
																			g_PwState = "changePW_Active";
																			showDialogbox("changePassword","init","","");
																		}
																	}
																	else{
																		g_PwState = "setActive";
																		checkPassword(false ,"");
																	}
																});
			
			

			$('#User_Name').bind('click', function(){showKeypad("User_Name");});

			setHTML('User_Name', e.EventData.get.UserSettings.Name);

			var ImageURL = e.EventData.get.UserSettings.Picture;
				setHTML('User_Image_URL', ImageURL);
			if(ImageURL != ""){
				setHTML('User_Image','<img width="54px" height="54px" style="margin-top: 7px;" src="../user-space/image/' + ImageURL + '" draggable="false"></img>');
			}


			setHTML('User_Language', e.EventData.get.UserSettings.Language.Name);
			g_popupList_Indices["User_Language"] = e.EventData.get.UserSettings.Language.Index;
			
			setHTML('User_Timezone', e.EventData.get.TimeSetup.TimeZone.Name);
			g_popupList_Indices["User_Timezone"] = e.EventData.get.TimeSetup.TimeZone.Index;
			
			g_timeFormat = e.EventData.get.TimeSetup.FormatTime;
			g_dateFormat = e.EventData.get.TimeSetup.FormatDate;
			
			initScrollbars('List_Container');
		}
		else{

			$('#User_Language').bind("click", function(){showPopupList(this, e.EventData.PopUp.Languages, false, true, g_popupList_Indices);});
			$('#User_Timezone').bind("click", function(){showPopupList(this, e.EventData.PopUp.TimeZones, false, true, g_popupList_Indices);});
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "get"){
			handleGET(e);
		}
		else if(e.cmd == "set"){
			handleSET(e);
		}
		else if(e.cmd == "service"){
			handleService(e);
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}

function handleGET(TdJson){

}

function handleSET(TdJson){
	if(typeof TdJson.EventData.set.UserSettings != "undefined"){
		if(typeof TdJson.EventData.set.UserSettings.Language != "undefined"){
			location.reload();
		}
	}
}

function handleService(TdJson){
	if(typeof TdJson.EventData.authentication != "undefined"){
		if(typeof TdJson.EventData.authentication.get != "undefined"){
			if((typeof TdJson.EventData.authentication.get.isPasswordUsed != "undefined" && (typeof TdJson.EventData.authentication.get.isPasswordChecked != "undefined"))){
				g_isPwActive = TdJson.EventData.authentication.get.isPasswordUsed;
				g_isPwChecked = TdJson.EventData.authentication.get.isPasswordChecked;
				if(g_isPwActive == 1){
					togglePwActive(true);
				}
			}
		}
		else if(typeof TdJson.EventData.authentication.check != "undefined"){
			if(typeof TdJson.EventData.authentication.check.password != "undefined"){
				if(TdJson.EventData.authentication.check.password == 1){
					if(g_PwState == "setActive"){
						if(g_isPwActive){
							g_PwState = "";
							togglePwActive(false);
						}
						else{
							g_PwState = "changePW_Active";
							showDialogbox("changePassword","init","","");
						}
					}
					else if(g_PwState == "changePW"){
						g_PwState = "";
						showDialogbox("changePassword","init","","");
					}
				}
				else{
					checkPassword(true);
				}
			}
		}
		else if(typeof TdJson.EventData.authentication.set != "undefined"){
			if(TdJson.EventData.authentication.set == null){
				if(g_PwState == "changePW_Active"){
					g_PwState = "";
					togglePwActive(false);
				}
			}	
		}
	}
}

function submitSET(tagId, value){
	ListType = "UserSettings";
	
	if(tagId == "User_Name"){
		nodeName = "Name";
	}
	if(tagId == "User_Language"){
		nodeName = "Language";
		value = parseInt(value);
	}
	if(tagId == "User_Timezone"){
		ListType = "TimeSetup";
		nodeName = "TimeZone";
		value = parseInt(value);
	}
	
	
	

	var xmlObj = new Object();

	TreeName = "general-settings";
	cmd = "set";
	

	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][TreeName] = {};
	xmlObj[cmd][TreeName][ListType] = {};
	xmlObj[cmd][TreeName][ListType][nodeName] = value;

	GetTd(xmlObj, g_SetEvent, cmd);
}


function togglePwActive(isInit){
	$('#User_Password_Active_IMG').toggle();
	$('#User_Password').toggleClass('no_edit');
	if(!isInit){
		g_isPwActive^=1;
		GetTd({"authentication":{"set":{"usePassword":g_isPwActive}}}, g_SetEvent, "service");
	}
}

function getSavePath(){
	cmd = "set";
	ModelName = "general-settings";
	path = "www";
	str = encodeURI('{"' + cmd + '":{"' + ModelName + '":{"UserSettings":{"Picture":"' + path + '"}}}}');

	return str;
}

setInterval(function(){
	var today = new Date();

	var day = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();

	month = getLeadZero(month);
	day = getLeadZero(day);

	var date = "";
	
	switch(g_dateFormat){
		case 2:  date = month + "." + day + "." + year; break;
		case 1:  date = year + "." + month + "." + day; break;
		default: date = day + "." + month + "." + year;
	}
	

	var hours = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();

	minutes = getLeadZero(minutes);
	seconds = getLeadZero(seconds);

	hours = convertToAM_PM(hours);
	var time = hours + ":" + minutes + ":" + seconds + g_amPmStr;



	$("#Today_Time").text(time);
	$("#Today_Date").text(date);
}, 1000);


function getLeadZero(value){
	if(value <= 9)
		value = "0" + value;

	return value;
}

function convertToAM_PM(hour){
	
	if(g_timeFormat == 1){
		if(hour > 12){
			hour -= 12;
			g_amPmStr = " " + 'PM';
		}
		else if(hour == 12){
			g_amPmStr = " " + 'PM';
		}
		else if(hour == 0){
			hour += 12;
			g_amPmStr = " " + 'AM';
		}
		else{
			g_amPmStr = " " + 'AM';
		}
	}

	return getLeadZero(hour);
}
