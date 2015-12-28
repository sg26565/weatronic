


var g_GET_Parameter = get_GET_Parameter();
var g_lastURL = g_GET_Parameter.LastURL;
var g_Wizard = g_GET_Parameter.Wizard;
var g_StickMode = 0;
var g_ModelType = "";

initPage();

function initPage(){
	if(g_Wizard){
		showDialogbox("wizard", "wizardStep3", "", 2);
		hideHTML('Navi_Box');
		hideHTML('Option_Box');
		showHTML('Wizard_Box');
		$('#Forward_Button').bind("click", function(){showDialogbox("actionWait", 'Ihr Mode wird angelegt.'); GetTd({"ModelWizard":{"cmd":3, "Mode": g_StickMode}}, g_SetEvent, "3");});
	}

	$('#StickMode_1').bind('click', function(){selectMode(1);});
	$('#StickMode_2').bind('click', function(){selectMode(2);});
	$('#StickMode_3').bind('click', function(){selectMode(3);});
	$('#StickMode_4').bind('click', function(){selectMode(4);});


	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	GetTd(getModelConfigObject(InitDataPostArgs), g_InitEvent);


	setInterval(JsonFunction, 250);
}


function getModelConfigObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

  	ModelConfig = new Object(); 	
  		type = new Object();
  		type.Index = -1;
  		type.Name = "";
  	ModelConfig.Type = type;

	InitDataPostArgs.ModelConfig = ModelConfig;

	return InitDataPostArgs;
}


function onEVENT_INIT(e){
	try{
		setHTML('Model_Name', e.EventData.ModelName);

		g_ModelType = e.EventData.ModelConfig.Type.Name;

		var function_1;
		var function_2;
		var function_3;
		var function_4;

		switch(g_ModelType){
			case "Plane":		function_1 = 'Seitenruder';
								function_2 = 'Höhenruder';
								function_3 = 'Motor';
								function_4 = 'Querruder';	break;
							
			case "Glider":		function_1 = 'Seitenruder';
								function_2 = 'Höhenruder';
								function_3 = 'Butterfly';
								function_4 = 'Querruder';	break;
							
			case "Helicopter":	function_1 = 'Gier';
								function_2 = 'Nick';
								function_3 = 'Kollektiv Pitch';
								function_4 = 'Roll';	break;
			
			default:			function_1 = 'Seitenruder';
								function_2 = 'Höhenruder';
								function_3 = 'Motor';
								function_4 = 'Querruder';
		}

		setHTML("Left_Stick_LR_1",  function_1);
		setHTML("Left_Stick_UD_1",  function_2);
		setHTML("Right_Stick_UD_1", function_3);
		setHTML("Right_Stick_LR_1", function_4);

		setHTML("Left_Stick_LR_2",  function_1);
		setHTML("Left_Stick_UD_2",  function_3);
		setHTML("Right_Stick_UD_2", function_2);
		setHTML("Right_Stick_LR_2", function_4);

		setHTML("Left_Stick_LR_3",  function_4);
		setHTML("Left_Stick_UD_3",  function_2);
		setHTML("Right_Stick_UD_3", function_3);
		setHTML("Right_Stick_LR_3", function_1);

		setHTML("Left_Stick_LR_4",  function_4);
		setHTML("Left_Stick_UD_4",  function_3);
		setHTML("Right_Stick_UD_4", function_2);
		setHTML("Right_Stick_LR_4", function_1);
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "3"){
			if(g_Wizard){
				window.location.href = "1.2__ReceiverConfiguration.html?Wizard=true";
			}			
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}	
}


function selectMode(mode_number){
	for(var i = 1; i < 5; i++){
		if(i != mode_number){
			deactivate("StickMode_" + i);
		}
		else{
			activate("StickMode_" + i);
		}
	}

	g_StickMode = mode_number - 1;
}


function activate(ele){
	ele = document.getElementById('' + ele + '');
	
    if(!this.hasClass(ele)){
    	ele.className += " active";
    }
}


function deactivate(ele){
	ele = document.getElementById('' + ele + '');

    if(hasClass(ele)){
        var reg = new RegExp('(\\s|^)active(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}


function hasClass(ele){
    return ele.className.match(new RegExp('(\\s|^)active(\\s|$)'));
}
