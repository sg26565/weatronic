


	
initPage();

function initPage(){
	$('#Unlock_Button').bind("click", function(){showDialogbox("unlockPassword", 'Geben Sie den Freigabecode ein.', "", "")});
	
	GetTd({"authentication":{"get":{"recoveryKey":""}}}, g_InitEvent, "service");
	
	setInterval(JsonFunction, 250);
	
	
}


function onEVENT_INIT(e){
	try{
		$('#RecoveryKeyInput').val(e.EventData.authentication.get.recoveryKey);
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "service"){
			if(e.EventData.authentication.check.recoveryCode == 0){
				showDialogbox("unlockPassword", 'Falscher Freigabecode! Eingabe wiederholen.', "", "");
			}
			else{
				showDialogbox("info", 'Ihr Passwortschutz wurde aufgehoben.');
			}
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}


function handleUnlock(name){
	GetTd({"authentication":{"check":{"recoveryCode":"" + name + ""}}}, g_SetEvent, "service");
}
