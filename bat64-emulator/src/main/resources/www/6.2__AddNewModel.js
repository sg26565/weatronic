
var g_modelType = "";


initPage();

function initPage(){
	showDialogbox("wizard", "wizardStep1", "", 0);
	
	$('#Add_Motor_Plane').bind("click", function(){addModel("Plane");});
	$('#Add_Helicopter').bind("click", function(){addModel("Helicopter");});
	$('#Add_Glider').bind("click", function(){addModel("Glider");});
	$('#Add_Free_Model').bind("click", function(){addModel("Free");});
	
	setInterval(JsonFunction, 250);
}



function onEVENT_INIT(e){
	try{

	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "tree-new"){
			
			$('#Dialog_Outter').remove();
			createNewTree(e.EventData);
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}	
}


function addModel(modelType){
	g_modelType = modelType;

	if(g_isRfConnected){
		showDialogbox("addModelRfConnected", "rfConnected");
	}
	else{
		showKeypad('KeyPad_Temp');
	}
}


function createNewTree(TdJson){
	
	if(TdJson.error.code == 0){
		if(g_modelType != "Free"){
			window.location.href = "1.1.0__ModelConfiguration.html?LastURL=" + location.href + "&Wizard=true";
		}
		else{
			window.location.href = "1.1.0__ModelConfiguration.html?LastURL=" + location.href + ";";
		}
	}
	
	if(TdJson.error.code == 1860){
		showDialogbox("modelNameExistsAdd");
	}
	else if(TdJson.error.code == 10){
		showDialogbox("error", 'Leere Modelnamen sind nicht erlaubt.');
	}
}



function submitSET(tagId, value){
	var xmlObj = new Object();
	
	ModelName = "ModelName";
	Type = "Type";
	cmd = "tree-new";

	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][Type] = g_modelType;
	xmlObj[cmd][ModelName] = value;

	
	showDialogbox("actionWait", 'Ihr neues Modell wird jetzt angelegt...');
	GetTd(xmlObj, g_SetEvent, cmd);
}
