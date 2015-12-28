



var g_FunctionIndex = parseInt((get_GET_Parameter().FunctionIndex), 10);


var g_List_Count = 0;			
var g_List_Indices = [];		
var g_List_PopupListObj = {};
var toggleStateARD = "normal";	
var g_popupList_LR_Short = {};
var g_popupList_LR = {};
var g_servoTravelState = {};
var g_travelNotEditable = -1;


initPage();

function initPage(){
	
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Control");
	InitDataPostArgs = getNumPadLimitObj(InitDataPostArgs, "Servo");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "ServoTypeShort");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "ServoType");
	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	InitDataPostArgs = getModelConfigObject(InitDataPostArgs);
	InitDataPostArgs = getFunctionObject(InitDataPostArgs, g_FunctionIndex);
	GetTd(getServoObject(InitDataPostArgs, g_FunctionIndex), g_InitEvent);
	GetTd(getServoPopListObject(InitDataPostArgs, g_FunctionIndex), g_InitEvent);
	

	
	TdPostArgs = getCurrentFunctionObject(TdPostArgs, g_FunctionIndex);
	

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


function getFunctionObject(InitDataPostArgs, FunctionIndex){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

	Item = new Object();
	Item.Index = -1;
	Item.IsCreatedAuto = -1;
	Item.ServosNotEditable = -1;
	functionItems = new Array(Item);

	Function = new Object();
	Function.Items = "" + FunctionIndex;

	Function.Item = functionItems;

	InitDataPostArgs.Function = Function;

	return InitDataPostArgs;
}


function getCurrentFunctionObject(TdPostArgs, FunctionIndex){
	Current = new Object();
	Current.FunctionValue = 0;

	Function = new Object();
	Function.Current = Current;
	Function.Items = "" + FunctionIndex;

	TdPostArgs.Function = Function;

	return TdPostArgs;
}


function getServoObject(InitDataPostArgs, FunctionIndex){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	Item = new Object();
	Item.Index = -1;
	Item.Plug = "";
	Item.NormalName = "";
	Item.IsCreatedAuto = -1;

		group = new Object();
		group.Index = -1;
		group.Name = "";
	Item.Group = group;

		servoType = new Object();
		servoType.Index = -1;
		servoType.Name = "";
	Item.ServoType = servoType;
		isSlave = new Object();
		isSlave.Index = -1;
		isSlave.Name = "";
	Item.IsSlave = isSlave;
	Item.TravelPlusStr = "";
	Item.TravelMinusStr = "";
	Item.UseCurveInsteadOfTravel = 0;
	Item.SVG = 0;

	servoItems = new Array(Item);

	ServoAssignment = new Object();
	ServoAssignment.Items = "AllUsedInFunction " + FunctionIndex;
	ServoAssignment.FunctionName = "";
	ServoAssignment.ItemCount = 0;
	ServoAssignment.Item = servoItems;

	InitDataPostArgs.Servos = ServoAssignment;

	return InitDataPostArgs;
}


function getServoPopListObject(InitDataPostArgs, FunctionIndex){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	Item = new Object();
	Item.Index = -1;
	Item.Name = "";

	servoItems = new Array(Item);

	ServoAssignment = new Object();
	ServoAssignment.Items = "AllValidForFunction " + FunctionIndex;

	ServoAssignment.Item = servoItems;
	ServoAssignment.ItemCount = 0;

	InitDataPostArgs.Servos = ServoAssignment;

	return InitDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		if(e.EventData.Servos.Items == ("AllValidForFunction " + g_FunctionIndex)){
			if(e.EventData.Servos.ItemCount > 0){
				g_List_PopupListObj = e.EventData.Servos.Item;
			}
			else{
				emptyItem = new Array();
				g_List_PopupListObj = emptyItem;
			}
		}
		else{
			
			
			if(e.EventData.Function.Item[0].IsCreatedAuto == 0){
				showHTML("ARD_Buttons_List");
				$('#Add_Button').bind("click", function(){AddItem();});
			}
			else{
				g_ModelType = e.EventData.ModelConfig.Type.Name;

				if(g_ModelType == "Helicopter"){
					setCSS('Graphic_View_Button', 'background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANiSURBVHja3JpdSBRRFMdd3YLUEqLEp4woLMLI1NrVVpck6SFri957KiIIopcKgoheqpfIvv0oLTHqJcIHkwgj+qLIICK0AqMvsW21WhF9qOl/4SycLjO7M+Pd8a4Hfrgze+6957/3zp05Z/QZhpHlkRWBCOgAY14MmJ3lnZ0HF8Epz0YUM+cBO43/bbMX47qduRXgBKi26b9XOt5ns91scAhs93LmjtIMxEFNCt9V4K80c5NgqY1x2si/202cbsXlggs08G8QSuK7yzC3bSnGuEJ+P0CZl+ISXKIAfoH1Fj6tFuLOJem3hXxioNxtfCou3CYK5CeoMvn+iYW4Lov+mpmwiqnEpmpnamYCg+z8LPDBQtxLqY9s9kONgLVTjUvl1tvCrsE6OldIS9bMRsEC8vODW0zYOhUxqb63JDaBMRCgZWVlYgctoXY3meCgqnhUi/MxgUPgrJHc6tmMR1UKS4e4BKcNezZIf4fdbvfTIU5w0qbAz3Sj1+bxK5X5QMym7x3wOi1BKEx5FoEasBEEwTIHbT+CB+AeeAi+6JIVlIL7YNxQY6KfHrBch2W5CWwAcxStANFPPWjQIVktSNN1u1gHcY/BiGJhMdpotNhQ8kAJqKQlFQILHbT/Bp6BHvACDIBxnXZLuRj01MHSiqiYKa8KRIdJmFheQxY+w6CXPjeBMt0LRDngBssOVoM9Flv+EWpzlWXctbo+fol8rJPVVsJ0foeFuAhr285+kLBu4oSwDpa28AArLcQFpGziOhNYq4s4Hth3k5pHAZUM5OpXcYqaTEgHce0sH6uwuA77JXED9KOY9XeZlSyqp1NcG9sMktU8Hkniem3WZEYtik5pFZfPMu6YjZpHoySu08YYraymEvBS3DGHA++XxB20OU7iNnHXTZx+l7fHa1THvw2e2/CX87N3NsfZDfrBW50ev2QTTx997LiKHs9mxPu5QZY5TICvM+nlYxxEmdBPmSyuiH3OB+Ugh40paixzpYTXp3OBiFsjiSqlwlGhiU+UZvANLdkDmSKuz2EKI5LTleBPJizLXIf+8120SWn+NImboNLBe7CGlii/pgzaZF6BYvKPZ8qG0k01kDrKyMWSO0PfHafjJSAMJkFXJv2rhnhnvkU6Nw9spXdx/HwDyEtHHP8EGAByU7mnCBHs7wAAAABJRU5ErkJggg==)');
				}
				else{
					setCSS('Graphic_View_Button', 'background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGiSURBVHjaYvz//z/DcAVMdLaPf7h6ThqIHwKx3HD0nB805ryHo+cs0ehh5Tl1NHrY5Tlkelh5TgiNpjlgpGM9h2wR43Cs54Z1JU5XwEKkOh6kUk4UqSJWRMpDEmiFhTRUjFASfQHET5H4T6FiIPAaiB9B2Y+gfBC4BsTfSc1zWkAcBcSuQMwMxMZDIILOAvFfIN4NxMugHsfwXAIQzwRitiGcEn8BcToQL0D2HKhJtGUYZTcfIN4K8hwoz9yA5qXhAkB5UwNUWuYMM4/BCr0cUGn5BZpOL0BLpBdDuBJXgZbQoIKRn54tlG9AzAktwrmGWyX+FI0eVp57gUaPem40WY7GHO0rVmR6WHnuIxo96rlRzw0Cz70bzp77BaW/jybLIeY5ugN6eu4LvZMlI50nH/8z0GlAdjRZkgFAveDVQPwBGlPImAGL2Aeoeq3BnixB450boT1uUgEoL/ozQMYfB53nQKNoVxlwjzIT23PQRqrwB02yrCPgsSZoYdKER40E1BwqFV/AmKMSfv4fN2hEU9uIR+1zarmJcXQdyhAFAAEGAHK7JJHVCQf5AAAAAElFTkSuQmCC)');
				}

				showHTML("ARD_Buttons_Graphic");
				$('#Graphic_View_Button').bind("click", function(){window.location.href = '1.3.1__ServoConfigurationGraphicView.html?LastURL=' + location.href;});
			}

			$('#Delete_Button').bind("click", function(){toggleDelete();});
			
			$('#Navi_Button').removeAttr("href");
			$('#Navi_Button').bind("click", function(){toggleARD("1.4.0__Functions.html?FunctionIndex=" + g_FunctionIndex);});
			

			g_numpadLimitObj = e.EventData.NumPadLimits;

			setHeaderMaxWidth('Model_Name', 'Function_Name');
			setHTML('Model_Name', e.EventData.ModelName);

			var i = 0;

			g_List_Count = e.EventData.Servos.ItemCount;

			FunctionName = e.EventData.Servos.FunctionName;
			setHTML('Function_Name', FunctionName);

			g_popupList_LR_Short = e.EventData.PopUp.ServoTypeShort;
			g_popupList_LR = e.EventData.PopUp.ServoType;

			g_travelNotEditable = e.EventData.Function.Item[0].ServosNotEditable;
			
			for(i = 0; i < g_List_Count; i++){
				Index = e.EventData.Servos.Item[i].Index;
				Plug = e.EventData.Servos.Item[i].Plug;
				Name = e.EventData.Servos.Item[i].NormalName;
				Group = e.EventData.Servos.Item[i].Group.Name;
				ServoType = e.EventData.Servos.Item[i].ServoType.Index;
				IsSlave = e.EventData.Servos.Item[i].IsSlave.Index;
				TravelStrPlus = e.EventData.Servos.Item[i].TravelPlusStr;
				TravelStrMinus = e.EventData.Servos.Item[i].TravelMinusStr;
				UseCurveInsteadOfTravel = e.EventData.Servos.Item[i].UseCurveInsteadOfTravel;
				SVG = e.EventData.Servos.Item[i].SVG;

				g_List_Indices[i] = Index;

				$("#scrollContainerInnerVertical").append(getRowRD(Index, Name, 'Servo', Index));

				$("#Container_" + Index).html(getRowOfServoList(Index, Plug, Name, ServoType, Group, TravelStrPlus, TravelStrMinus, UseCurveInsteadOfTravel, SVG, IsSlave, g_travelNotEditable));

				g_popupList_Indices["Servo__" + Index + "_ServoType"] = ServoType;
				$("#Servo__" + Index + "_ServoType").bind("click", function(){showPopupList(this, g_popupList_LR, false, true, g_popupList_Indices);});

				telemetryServo = new Object();
				telemetryServo.ID = Index + CONST_TELEMETRY_MEASValue_Tx_Servo__0;
				telemetryServo.Value = 0;
				telemetryServo.ValueStr = "";

				telemetryIds.push(telemetryServo);
			}

			initScrollbars('List_Container');
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "telemetry"){
		functionValue = e.EventData.Function.Current.FunctionValue;

		if(functionValue > 0){
			state = +1;
		}
		else if(functionValue < 0){
			state = -1;
		}
		else{
			state = 0;
		}

		if(typeof g_servoTravelState[key] == "undefined"){
			g_servoTravelState[key] = 0;
		}

		if(g_servoTravelState[key] != state){
			if(state == 1){
				$('#Servo__' + (key - CONST_TELEMETRY_MEASValue_Tx_Servo__0) + '_TravelMin').removeClass('active_travel');
				$('#Servo__' + (key - CONST_TELEMETRY_MEASValue_Tx_Servo__0) + '_TravelMax').addClass('active_travel');
			}
			else if(state == -1){
				$('#Servo__' + (key - CONST_TELEMETRY_MEASValue_Tx_Servo__0) + '_TravelMax').removeClass('active_travel');
				$('#Servo__' + (key - CONST_TELEMETRY_MEASValue_Tx_Servo__0) + '_TravelMin').addClass('active_travel');
			}
			else{
				$('#Servo__' + (key - CONST_TELEMETRY_MEASValue_Tx_Servo__0) + '_TravelMax').removeClass('active_travel');
				$('#Servo__' + (key - CONST_TELEMETRY_MEASValue_Tx_Servo__0) + '_TravelMin').removeClass('active_travel');
			}

			g_servoTravelState[key] = state;
		}
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "add"){
			createAddItem(e.EventData);
		}

		if(e.cmd == "remove"){
			GetTd(getServoPopListObject(InitDataPostArgs, g_FunctionIndex), g_InitEvent);
		}

		if(e.cmd == "set"){
			sourceType = e.EventData.set.Function.Servo.SourceType;

			if(typeof sourceType != "undefined"){
				tagIndex = e.EventData.set.Function.Servo.Index;

				switch(sourceType){
					case 2: 	hideHTML("Servo__" + tagIndex + "_CurveReset");
								setHTML("Servo__" + tagIndex + "_TravelMin", e.EventData.set.Function.Servo.MinTravel);
								setHTML("Servo__" + tagIndex + "_TravelMax", e.EventData.set.Function.Servo.MaxTravel);
								showHTML("Servo__" + tagIndex + "_Reverse");
								showHTML("Servo__" + tagIndex + "_TravelMin");
								showHTML("Servo__" + tagIndex + "_TravelMax");
								break;
					case 3:		window.location.href = "9.2.0__CurveEdit.html?Index=" + g_FunctionIndex + "&LastURL="+ location.href + "&PageType=ServoIndex&ServoIndex=" + tagIndex;
								break;
				}
			}
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}



function getRowOfServoList(Index, Plug, Name, ServoType, Group, TravelStrPlus, TravelStrMinus, UseCurveInsteadOfTravel, SVG, IsSlave, travelNotEditable){
	var slave_no_edit;
	if(IsSlave || travelNotEditable){


		SVG = "--";
		UseCurveInsteadOfTravel = 0;
		slave_no_edit = " no_edit";
	}
	else{
		SVG = '<a onClick=\'submitSET("Servo__' + Index + '_Curve", 3);\' draggable=\"false\">' +
			      '<img width=\"54\" height=\"54\" src=\"data:image/png;base64,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\" alt=\"\" draggable=\"false\" />' +
			  '</a>';
		slave_no_edit = "";
	}

	if(ServoType > 2 || IsSlave){
		classServoType = " no_edit";
	}
	else{
		classServoType = "";
	}

	for(var j = 0; j < g_popupList_LR_Short.length; j++){
		if(g_popupList_LR_Short[j].Index == ServoType){
			ServoTypeShort = g_popupList_LR_Short[j].Name;
		}
	}

	var htmlInnerContainer = '' +
		'<!-- Plug Number -->' +
		'<div id="Servo__' + Index + '_Plug" class="list_servo_plug no_edit"> ' + Plug + '</div>' +

		'<!-- Servo Name -->' +
		'<div id="Servo__' + Index + '_Name" class="list_servo_name no_edit">' + Name + '</div>' +

		'<!-- Servo Group -->' +
		'<div id="Servo__' + Index + '_Group" class="list_servo_group no_edit">' + Group + '</div>' +

		'<!-- Servo Position -->' +
		'<div id="Servo__' + Index + '_ServoType" class="list_servo_lr' + classServoType + '">' + ServoTypeShort + '</div>' +

		'<!-- Servo Reverse -->' +
		'<div id="Servo__' + Index + '_Reverse" class="list_servo_rev" onClick=\'switchTravelValues("' + Index + '");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAApcSURBVHja7FprbBxXFb4zu/Pch71+xK7lJE5KmzQtUgmgoqQPaAhBQBrKKxQEqvKjFZRQKBUgJJ6VKBGqEEilUn6AAgiq9AG1GlJKhISaQgATiKBOoWmiJvHW9W7W9j5md2d2Z/nO7IyzHs/OztibCEGvdXzncWfuOffc853HLNdoNNj/YuP+LwWbnZ1ddF6r1ZlpmkyURBbhI8yo1VhfqpeVy2UmCAKLRqPWcTQqMF2v2jNwTBRExjCP2TCt53k8W6vXGM/xLJ+fZ/19fZzNxQIzMzNZpqgqxmJew2DEZzLZY907c+Y06+npYaVSyZpz3bp1S3iPXsJF2wTaDLoW1AcirmSQBjoPehn0F9ALdbNRjUQirFAsQljGJEla8eTdFmwj6DOgt6qqupnneZ/3S6SFejQa+ZdpNn6NC+OgYyCjG4x0S7Ax0H0cx+2BQLHAdsBxEVEUSbObIOT9iiIfrVYq38f54ytliPe6aJp1iwK0FOibiqIch43txXFs2cYOW1Rk+cZkMvkYTp8AvaHrggVsV8mSdBQMfQ2U6jSYjN8Cqg4ojO3LsFAfGBpa9Xuc7rzcW3FrLKaOw+D72g0wDGMe3Z91XZ+om+ZLZr0+j/FGJBqNYyHWQMM34doN6AdIW+4mCNGRVG9yfD6fvwenP7wcgm1JJhLPgMl4m/v/BqTvy2SyvxkcHJjyec8+TSuPyLK5BeBxF+xru1tA0l6qt/fhTCZTw+n+S7kVxwYG+p/wEgrbLEMAAroe9CNQW6EiYBjaosO0DRTvKpW0O6Dds17jBwcHH0H3zkslGI/t9xMINey+oRvGi7nc7Dtw+D1Q2XeLwF85eKGqSuutR2cy2a2zc3PjXnP39vY+iX6t6/p1oPeGFsyxdSIIdA+g/Cb3mGq1OpHNXqDrL4TUvheKnM/lch8sFooH3DfgFhJw3F8pFPJ0Sov7wJq1a49JsnzFSmxsGEI9uERTun4mm83u4vhItotOnuzpzmKxNByPx3Ysdgnsk+gqa9euuQ3ucqxeNwuVSvVXoQXTjZrVJ+KxLyAmi7lsSse2+bhtJytq5bJm9YosYQdU2Nw8ASr7KAT7A/prWobKsLfPOieappFLyC7XxuKKqnzMfRGI9gN0f1ypUBTIuvd/DLaHIHoOQfjXOzz7jKooweEe8GvDrQW/H8b/EZe2sAOz3714pc4MXWdFBLHYJoGFKhQKfrcJFD7V7iZcSgWZxLOh/FjdguIGOUkKdT7k9i9YqacpswirHdikRT5NIOgH3Ts2Nrad/Fjb7VupHEf30jIctCUMF1PVfrfQerX6C9id51O5Cxe8OUa+RtShSaOrR7dJorTeRk3ObxvG4rFwiSYgvGlHSBoRZQxj5W7F9nx3JMJvg/qTEI6i+QtBg9sAArX4AIopOVEUom+0tfcezE95ndq6uIViaSsOCVxYb08ymGCI86y+CMOGYFZoY9kdx/rKmrYRCEl5kxnIq/OhghvSUIOmgmDI2GtWhoxE9Co49rfj1vuwULdAWxlsRRK8Qg8N9PcHEywPo+bwR+m7SzAGwazJAocrfPgEgqZq4lZTUPhJO2JpkLZWA6QStXp90hkfWDDbj0DFPW0nr0Noql80n+c8BOKg+Zql/Ug0wgQsBi2OX41FaQPdLbnfXaC/go7QhVOnXrYWbv36dcEEswNUi4lIG+3QNgla4aJxXqmJ1zg7fPK6TUHwb+0o/24LC/RmkUeWxIB+zJ7ASg4hABVaqEJF8O9mwg0UyxXKEYjcQQXgRVWwZhbPMUkSvccDlGjXBIZ7h+kmP40FMKFexyrRNiMmnKyYGKd7VHrzYpZQMYh2Ce0c0yKhqFrV9H0G3iMsCcOozGelQRE+HCqCIUf9C61SqXCWL8OE1PcAajmOt1wERRJu7Vi1DNiOsxBB3MOCU5OkL6H7js/w0+D1Si93EhqyBAuGDTb92msk5CLYIKbcZAer1mIF3ZLdaLzfysFfHLEhz6LJyZMcaYYWntColflOWggjnPNeBMH7pqamuHQ6TQ9tt2/vx7uID460FUqwRqMJ44R8i0q7m65hVDZENss2XH21NYaYJQPuxDCNpe3r59foHc6CWQAARCY7GxkZcbmj/BLeQsSKDas+7tdGR0cXgQRF90G0QbX7ToqjcQkEB0TuNnLF8CIsCCwYTUoPCYIYuujpGf3ZW7fVPzlj/QClycMCMJBj/rLjnJ13tHveExUJGFrzogjPb0Qa/ktZlk4TEpYrZdifxvoRymjFEhPAsBuO/RptZ8PQF/K+To2y6igErFZ1yubh53QrGaVtSmbghYrRtlWcBSbULyaTyZthH9+A0Z7AJfqAcBhEsVr1MoHcLiubZex50OzivDFE2jI9Pe0croZW/okVSbrCqRqg/iQihGehsUPQ2AloLG8XYrqtMR5bbrInmdhQNYzzyAV/B40dhsYOga+Ck+sFEmxmJuMc7l61avBR30gcWwFRwClNK9+B04lOXCYSSRtNdav3W3W7bQCAnADz0kXbq7GiVroyrsinLcFEKVxIJUriLt86Wa1mItz5OYY/BGg+0YlDWV4avZPrgK9C7/1dA+HSR1qFsrPnv+l69RVOVZZVu0+oinJr+5JZ+Si09XmEUxOdiq7xWMz6TLuMz91xCLXHA7Uft20uXORhe/4bAc9DPg63jDETFFZ525HK+Ivl7M5VUoRpVMMoIULRtJLtHoS9EGzMPS/e+1N6P8WoRIEFo3gQW2uHXzSBF1OI84kFfwPIlyTZEkYQxW4g4WYI9dWl9UztILpzzWQ2YlGYWFFWFHmnHQadzM3OfjqfL/zDo/L0sF1w6Xaj72cHobVFRlQ3zSLs+gFKhM0OoNNOsBvw0hiQ7nMINt+M80ewRegDnOESLIG05WctAWo32gYAyiFswyUBbrFQeIg1f22wvOgetkV5zptwSB+6nezxOd2o/djtHpBdDyKmfAqHe7sg1La+VOoQIorrPLbgc1jIB536ZKeSXjuN0R5+dcGwqSCDrHluNnc/NHjYoxKlxFSVavn05eP6ZQj0FtCT8MRHvDQFX3euWNJ2h4l0wiaahdzc/B7EbH/yQlJVVXYl43G6Rx/v6BPQgE81dxXoZtCBoaGhY6lU6vY25YIMAobbWxc6UEDuFXnQF5BmLYO3ag+ttYwawqAoth983GPxeOyWDg58GlHCFILoF+HHsvQhBQsg4d1roJmNOB7yy89gDqeQbO5GAH6cqmXxmLq4XGc7fI7nuiYYfV2JpVK935ZleS/P813P+TH/U1Pp9H2iICCjMFlYwVbyOw/6sHVvSSvfBsH/3q1f0QEkMtPTM3fi8P1UrPHdbhCIa7OmfBd4ebpQLG3BtrkbwHK8XZ2vU8Pzk+n0q986+8r5t5HdrZSpbv2WqgyB9udyswdgNzv6+/t2wui3ApKH6EcuTqbbmjWDKngmDW0/L0niEfjMg85Hhm60FQlGhk+2LyTizgeEqo2I44j6pVqt3gcxroWN9CNES0HISFWvFgEmaTx7FmPORaMR7VJkptzrP519XbD/jvYfAQYAPvbuJnDMkX0AAAAASUVORK5CYII=" width="54" height="54" alt="" draggable="false"/></div>' +

		'<!-- Servo Travel -->' +
		'<div id="Servo__' + Index + '_TravelMin" class="list_servo_travel_short ' + slave_no_edit + '" onClick=\'showNumpad("Servo__' + Index + '_TravelMin", "Servo");\'>' + TravelStrMinus + '</div>' +
		'<div id="Servo__' + Index + '_CurveReset" style="display: none;" class="list_reset_curve ' + slave_no_edit + '" onClick=\'showDialogbox("deleteTravelCurve", "' + 'Servo Kurve' + '","' + Name + '","' + Index + '");\'><a  draggable="false">Curve Reset</a></div>' +
		'<div id="Servo__' + Index + '_TravelMax" class="list_servo_travel_short ' + slave_no_edit + '" onClick=\'showNumpad("Servo__' + Index + '_TravelMax", "Servo");\'>' + TravelStrPlus + '</div>' +

		'<script type="text/javascript">' +
			'if(' + UseCurveInsteadOfTravel + '){' +
				'$("#Servo__' + Index + '_TravelMin").hide();' +
				'$("#Servo__' + Index + '_TravelMax").hide();' +
				'$("#Servo__' + Index + '_CurveReset").show();' +
				'$("#Servo__' + Index + '_Reverse").hide();' +
			'}' +
		'<\/script>' +
		'<!-- Servo Curve -->' +
		'<div id="Servo__' + Index + '_Curve" class="list_servo_curve ' + slave_no_edit + '">' +
		
			SVG +
		'</div>';

	return htmlInnerContainer;
}


function resetServoCurve(tagIndex){
	submitSET("Servo__" + tagIndex + "_Curve", 2);
}


function switchTravelValues(index){
	tempMaxtravelValue = getHTML("Servo__" + index + "_TravelMax");
	tempMintravelValue = getHTML("Servo__" + index + "_TravelMin");
	setHTML("Servo__" + index + "_TravelMax", tempMintravelValue);
	setHTML("Servo__" + index + "_TravelMin", tempMaxtravelValue);





	ModelName = "model-settings";
	cmd = "set";

	xmlObj = getPathObj(cmd, ModelName);

	ListType = "Function";
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType]["Servo"] = {};
	xmlObj[cmd][ModelName][ListType]["Servo"]["Index"] = parseInt(index);
	xmlObj[cmd][ModelName][ListType]["Servo"]["MinTravel"] = parseInt(splitUnitFromValue(tempMaxtravelValue).value);
	xmlObj[cmd][ModelName][ListType]["Servo"]["MaxTravel"] = parseInt(splitUnitFromValue(tempMintravelValue).value);
	xmlObj[cmd][ModelName][ListType]["Index"] = g_FunctionIndex;

	GetTd(xmlObj, g_SetEvent, cmd);
}


function getAttrObj(tagId, value, Index){
	Attribute = new Object();

	Attribute["Servo"] = {};
	Attribute["Servo"]["Index"] = parseInt(Index);

	if(tagId == "TravelMin"){
		Attribute["Servo"]["MinTravel"] = value;

		return Attribute;
	}

	if(tagId == "TravelMax"){
		Attribute["Servo"]["MaxTravel"] = value;

		return Attribute;
	}

	if(tagId == "Curve"){
		Attribute["Servo"]["SourceType"] = value;

		return Attribute;
	}

	return Attribute;
}


function getPathObj(cmd, ModelName){
	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};

	return xmlObj;
}


function submitSET(tagId, value){
	ModelName = "model-settings";
	ListType = "Function";
	htmlTagId = tagId;

	if(tagId == "Hidden_Info_Box"){
		if(!isNaN(value)){
			cmd = "add";
			xmlObj = getPathObj(cmd, ModelName);
			xmlObj[cmd][ModelName][ListType] = {};
			xmlObj[cmd][ModelName][ListType]["Servo"] = parseInt(value);
			xmlObj[cmd][ModelName][ListType]["Index"] = g_FunctionIndex;

			GetTd(xmlObj, g_SetEvent, cmd);
		}
	}
	else{
		tagIdArray = tagId.split("__");
		cmd = "set";
		tagIdArray = tagIdArray[1].split("_");
		Index = tagIdArray[0];
		tagId = tagIdArray[1];

		xmlObj = getPathObj(cmd, ModelName);

		if(tagId == "ServoType"){
			for(var j = 0; j < g_popupList_LR_Short.length; j++){
				if(g_popupList_LR_Short[j].Index == value){
					setHTML(htmlTagId, g_popupList_LR_Short[j].Name);
				}
			}

			ListType = "ServoConfig";

			xmlObj[cmd][ModelName][ListType] = {};
			xmlObj[cmd][ModelName][ListType]["ServoType"] = value;
			xmlObj[cmd][ModelName][ListType]["Index"] = parseInt(Index);
		}
		else{
			Attr = new Object();
			Attr = getAttrObj(tagId, value, Index);

			xmlObj[cmd][ModelName][ListType] = {};
			xmlObj[cmd][ModelName][ListType] = Attr;
			xmlObj[cmd][ModelName][ListType]["Index"] = g_FunctionIndex;
		}

		GetTd(xmlObj, g_SetEvent, cmd);
	}
}


function submitARD(cmd, num){
	ModelName = "model-settings";
	ListType = "Function";

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = {};
	xmlObj[cmd][ModelName][ListType]["Servo"] = num;
	xmlObj[cmd][ModelName][ListType]["Index"] = g_FunctionIndex;

	GetTd(xmlObj, g_SetEvent, cmd);
}



function AddItem(count){
	
	showPopupList($('#Hidden_Info_Box'), g_List_PopupListObj, false, true, g_popupList_Indices);
}


function toggleDelete(){
	hideHTML("ARD_Buttons");
	setCSS("List_Container", "width", "778px");
	setCSS("scrollContainerInnerVertical", "width", "778px");

	for(var i = 0; i < g_List_Count; i++){
		showHTML("Delete_Button_" + g_List_Indices[i]);
	}

	toggleStateARD = "delete";
}


function deleteItem(index){
	$("#ContainerOuter_" + index).remove();

	submitARD("remove", index);

	newIndices = [];
	var j = 0;

	for(var i = 0; i < g_List_Count; i++){
		if(g_List_Indices[i] != index){
			newIndices[j] = g_List_Indices[i];
			j++;
		}
	}

	g_List_Count--;
	g_List_Indices = newIndices;

	if(g_List_Count == 0){
		toggleARD("normal");
	}

	ScrollDownRefresh();
}

















function toggleARD(link){
	if(toggleStateARD == "normal"){
		window.location.href = link;
	}
	else if(toggleStateARD == "delete"){

		for(var i = 0; i < g_List_Count; i++)
			hideHTML("Delete_Button_" + g_List_Indices[i]);

		setCSS("List_Container", "width", "674px");
		setCSS("scrollContainerInnerVertical", "width", "674px");
		showHTML("ARD_Buttons");
		toggleStateARD = "normal";
	}










}


function createAddItem(TdJson){
	log(2, "success ADD: " + JSON.stringify(TdJson));

	Index = TdJson.add.Servo.Index;
	Plug = TdJson.add.Servo.Plug;
	Name = TdJson.add.Servo.Name;
	Group = TdJson.add.Servo.Group.Name;
	ServoType = TdJson.add.Servo.ServoType;
	IsSlave = TdJson.add.Servo.Flags; IsSlave=0; 
	TravelStrPlus = TdJson.add.Servo.MaxTravel;
	TravelStrMinus = TdJson.add.Servo.MinTravel;
	UseCurveInsteadOfTravel = TdJson.add.Servo.UseCurve;
	SVG = TdJson.add.Servo.SVG;

	g_List_Indices.push(Index);
	g_List_Count = g_List_Indices.length;

	for(var i = 0; i < g_List_PopupListObj.length; i++){
		if(Index == g_List_PopupListObj[i].Index){
			g_List_PopupListObj.splice(i, 1);
			break;
		}
	}

	telemetryServo = new Object();
	telemetryServo.ID = Index + CONST_TELEMETRY_MEASValue_Tx_Servo__0;
	telemetryServo.Value = 0;
	telemetryServo.ValueStr = "";

	telemetryIds.push(telemetryServo);

	$("#scrollContainerInnerVertical").append(getRowRD(Index, Name, 'Servo', Index));

	$("#Container_" + Index).html(getRowOfServoList(Index, Plug, Name, ServoType, Group, TravelStrPlus, TravelStrMinus, UseCurveInsteadOfTravel, SVG, IsSlave, g_travelNotEditable));

	g_popupList_Indices["Servo__" + Index + "_ServoType"] = ServoType;
	$("#Servo__" + Index + "_ServoType").bind("click", function(){showPopupList(this, g_popupList_LR, false, true, g_popupList_Indices);});

	ScrollDownRefresh();
}
