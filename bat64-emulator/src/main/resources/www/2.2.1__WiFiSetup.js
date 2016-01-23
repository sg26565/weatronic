


var g_GET_Parameter = get_GET_Parameter();
var g_ID = parseInt((g_GET_Parameter.SetupModeIndex), 10);
var g_ssid = g_GET_Parameter.SSID;
var g_isActiveConnection = g_GET_Parameter.isCurrent;
var g_autoConnection = g_GET_Parameter.autoConnection;
var g_showPassword = 0;

initPage();

function initPage(){

	if(g_ID == -1){
		GetTd({"wlan":{"cmd":0x0410}}, g_InitEvent, "service");
	}
	else{
		GetTd({"wlan":{"cmd":0x0413, "param":{"ID": g_ID}}}, g_InitEvent, "service");
	}
	

	$('#WiFi_Show_PW').bind('click', function(){toggleShowPassword();});
	$('#WiFi_Status').bind('click', function(){toggleWiFiStatus();});
	$('#WiFi_Password').bind('click', function(){showKeypad("WiFi_Password", g_showPassword);});
	$('#WiFi_SSID').bind('click', function(){showKeypad("WiFi_SSID");});

	setHTML('WiFi_SSID', g_ssid);
	$("#WiFi_Password").val('Passwort ist bereits hinterlegt.');
	
	initScrollbars('List_Container');
	
	setInterval(JsonFunction, 250);	
}






function onEVENT_INIT(e){
	try{
		if(e.EventData.wlan.request.cmd == 1040){
			if(e.EventData.error.code == 0){
				g_ID = e.EventData.wlan.result.ID;
				if(g_ssid != ""){
					GetTd({"wlan":{"cmd":0x0412, "param":{"ID": g_ID, "SSID": g_ssid}}}, g_InitEvent, "service");
				}
			}
		}	
		if(e.EventData.wlan.request.cmd == 1043){
			if(e.EventData.error.code == 0){
				setHTML("WiFi_IP", e.EventData.wlan.result.IP);
			}
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
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}	
}


function handleGET(TdJson){
	
}


function submitSET(tagId, value){
	if(tagId == "WiFi_SSID"){
		GetTd({"wlan":{"cmd":0x0412, "param":{"ID": g_ID, "SSID": value}}}, g_SetEvent, "service");
	}
	if(tagId == "WiFi_Password"){
		GetTd({"wlan":{"cmd":0x0412, "param":{"ID": g_ID, "Passphrase": value}}}, g_SetEvent, "service");
	}
	
}


























function toggleShowPassword(){

	$('#WiFi_Show_PW_Img').toggle();
	if(g_showPassword == 0){
		$('#WiFi_Password').attr('type', "text");
	}
	else{
		$('#WiFi_Password').attr('type', "password");
	}
	g_showPassword^= 1;
}






















































































































































































































