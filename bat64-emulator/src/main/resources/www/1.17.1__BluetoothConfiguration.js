


var g_List_PopupListObj = [];
var g_showPin = 0;
var g_BluetoothActive = 0;
var g_isActiveConnection = -1;

initPage();

function initPage(){

	InitDataPostArgs = getPopupObj(InitDataPostArgs, "BTProtocol");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "BTTxPower");
	InitDataPostArgs = getPopupObj(InitDataPostArgs, "BTTxRate");
	InitDataPostArgs = getFunctionListObject(InitDataPostArgs);
	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);

	InitDataPostArgsExtended = new Object();
	GetTd(getBluetoothObject(InitDataPostArgsExtended), g_InitEvent, "get");



	$('#Bluetooth_Status').bind('click', function(){toggleBluetoothStatus();});
	$('#Bluetooth_Show_PW').bind('click', function(){toggleShowPin();});

	setInterval(JsonFunction, 250);
}



function getBluetoothObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	bTConfig = new Object();
		bTConfig.BTName = "";
		txPower = new Object();
			txPower.Index = -1;
			txPower.Name = "";
		bTConfig.TxPower = txPower;
		bTConfig.PIN = "";
			protocol = Object();
				protocol.Index = -1;
				protocol.Name = "";
		bTConfig.Protocol =  protocol;
			isActive =  new Object();
				isActive.Index = 0;
				isActive.Name = "";
		bTConfig.IsActive = isActive;
			protocolDetail = new Object();
				skyNavigator = new Object();
					item = new Object();
						item.Index = -1;
						item.Name = "";
						item.Pos = -1;
					functions = new Array (item);
				skyNavigator.Functions = functions;
					txRate = new Object();
						txRate.Index = -1;
						txRate.Name = "";
				skyNavigator.TxRate = txRate;		
			protocolDetail.SkyNavigator = skyNavigator;
		bTConfig.ProtocolDetail = protocolDetail;


	cmd = "get";
	ModelName = "model-settings";
	ListType = "BTConfig";

	InitDataPostArgsExtended[cmd] = {};
	InitDataPostArgsExtended[cmd][ModelName] = {};
	InitDataPostArgsExtended[cmd][ModelName][ListType] = bTConfig;

	return InitDataPostArgsExtended;
}


function getFunctionListObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

	
	ItemFunc = new Object();
	ItemFunc.Index = 0;
	ItemFunc.Name = "";

	funcItems = new Array(ItemFunc);

	Function = new Object();
	Function.Items = "ALL_USED";

	Function.Item = funcItems;

	InitDataPostArgs.Function = Function;

	return InitDataPostArgs;
}


function onEVENT_INIT(e){
	try{
		if(typeof e.EventData.get == "undefined"){
			checkHTMLHeader('Model_Name');
			setHTML('Model_Name', e.EventData.ModelName);
			g_List_PopupListObj["BTProtocol"] = e.EventData.PopUp.BTProtocol;
			g_List_PopupListObj["BTTxPower"] = e.EventData.PopUp.BTTxPower;
			g_List_PopupListObj["BTTxRate"] = e.EventData.PopUp.BTTxRate;
			g_List_PopupListObj["FunctionList"] = e.EventData.Function.Item;
		}
		else{
			g_BluetoothActive = e.EventData.get.BTConfig.IsActive.Index;
			if(g_BluetoothActive == 1){
				$('#Bluetooth_Status_Img').show();
			}
			else{
				$('#Bluetooth_Status_Img').hide();
			}

			setHTML("Bluetooth_Name", e.EventData.get.BTConfig.BTName);
			setHTML("Bluetooth_Max_Power", e.EventData.get.BTConfig.TxPower.Name);
			$('#Bluetooth_Pin').val(e.EventData.get.BTConfig.PIN);
			setHTML("Bluetooth_Protocol", e.EventData.get.BTConfig.Protocol.Name);
			setHTML('Bluetooth_TxRate',  e.EventData.get.BTConfig.ProtocolDetail.SkyNavigator.TxRate.Name);

			setProtocolDetail(e.EventData.get.BTConfig.Protocol.Index);

			if((typeof e.EventData.get.BTConfig.ProtocolDetail.SkyNavigator.Functions[0] != "undefined") && (e.EventData.get.BTConfig.ProtocolDetail.SkyNavigator.Functions[0] != null)){
				g_popupList_Indices["Bluetooth_Channel" + (e.EventData.get.BTConfig.ProtocolDetail.SkyNavigator.Functions[0].Pos + 1)] = e.EventData.get.BTConfig.ProtocolDetail.SkyNavigator.Functions[0].Index;
				setHTML("Bluetooth_Channel" + (e.EventData.get.BTConfig.ProtocolDetail.SkyNavigator.Functions[0].Pos + 1), e.EventData.get.BTConfig.ProtocolDetail.SkyNavigator.Functions[0].Name);
			}
			else{
				g_popupList_Indices["Bluetooth_Channel1"] = -1;
			}
			if((typeof e.EventData.get.BTConfig.ProtocolDetail.SkyNavigator.Functions[1] != "undefined") && (e.EventData.get.BTConfig.ProtocolDetail.SkyNavigator.Functions[1] != null)){
				g_popupList_Indices["Bluetooth_Channel" + (e.EventData.get.BTConfig.ProtocolDetail.SkyNavigator.Functions[1].Pos + 1)] = e.EventData.get.BTConfig.ProtocolDetail.SkyNavigator.Functions[1].Index;
				setHTML("Bluetooth_Channel" + (e.EventData.get.BTConfig.ProtocolDetail.SkyNavigator.Functions[1].Pos + 1), e.EventData.get.BTConfig.ProtocolDetail.SkyNavigator.Functions[1].Name);
			}
			else{
				g_popupList_Indices["Bluetooth_Channel2"] = -1;
			}

			g_popupList_Indices["Bluetooth_Max_Power"] = e.EventData.get.BTConfig.TxPower.Index;
			$('#Bluetooth_Max_Power').bind('click', function(){showPopupList(this, g_List_PopupListObj["BTTxPower"], false, true, g_popupList_Indices);});

			$('#Bluetooth_Channel1').bind("click", function(){showPopupList(this, g_List_PopupListObj["FunctionList"], false, true, g_popupList_Indices);});
			$('#Bluetooth_Channel2').bind("click", function(){showPopupList(this, g_List_PopupListObj["FunctionList"], false, true, g_popupList_Indices);});
			$('#Bluetooth_Telemetrie').bind('click', function(){window.location.href = '1.17.2__BluetoothTelemetry.html';});

			$('#Bluetooth_Name').bind('click', function(){showKeypad("Bluetooth_Name");});
			$('#Bluetooth_Pin').bind('click', function(){showKeypad("Bluetooth_Pin", g_showPin);});

			g_popupList_Indices["Bluetooth_Protocol"] = e.EventData.get.BTConfig.Protocol.Index;
			$('#Bluetooth_Protocol').bind("click", function(){showPopupList(this, g_List_PopupListObj["BTProtocol"], false, true, g_popupList_Indices);});

			g_popupList_Indices["Bluetooth_TxRate"] = e.EventData.get.BTConfig.ProtocolDetail.SkyNavigator.TxRate.Index;
			$('#Bluetooth_TxRate').bind("click", function(){showPopupList(this, g_List_PopupListObj["BTTxRate"], false, true, g_popupList_Indices);});
			
			initScrollbars('List_Container');
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
		if(e.cmd == "set"){
			if(e.EventData.set.BTConfig.IsActive != "undefined"){
				$('#Dialog_Outter').remove();
			}
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}


function handleGET(TdJson){

}




function getAttrObj(tagId, value){
	Attribute = new Object();

	if(tagId == "Bluetooth_Name"){
		Attribute["BTName"] = value;

		return Attribute;
	}

	if(tagId == "Bluetooth_Max_Power"){
		Attribute["TxPower"] = value;

		return Attribute;
	}

	if(tagId == "Bluetooth_Pin"){
		Attribute["PIN"] = value;

		return Attribute;
	}

	if(tagId == "Bluetooth_Protocol"){
		Attribute["Protocol"] = value;
		setProtocolDetail(value);

		return Attribute;
	}
	
	if(tagId == "Bluetooth_TxRate"){
		Attribute["ProtocolDetail"] = {};
		Attribute["ProtocolDetail"]["SkyNavigator"] = {};
		Attribute["ProtocolDetail"]["SkyNavigator"]["TxRate"] = value;

		return Attribute;
	}

	if(tagId == "Bluetooth_Channel1"){
		Attribute["ProtocolDetail"] = {};
		Attribute["ProtocolDetail"]["SkyNavigator"] = {};
		Attribute["ProtocolDetail"]["SkyNavigator"]["Functions"] = {};
		Attribute["ProtocolDetail"]["SkyNavigator"]["Functions"]["Index"] = 0;
		Attribute["ProtocolDetail"]["SkyNavigator"]["Functions"]["Object"] = value;

		return Attribute;
	}

	if(tagId == "Bluetooth_Channel2"){
		Attribute["ProtocolDetail"] = {};
		Attribute["ProtocolDetail"]["SkyNavigator"] = {};
		Attribute["ProtocolDetail"]["SkyNavigator"]["Functions"] = {};
		Attribute["ProtocolDetail"]["SkyNavigator"]["Functions"]["Index"] = 1;
		Attribute["ProtocolDetail"]["SkyNavigator"]["Functions"]["Object"] = value;

		return Attribute;
	}

	if(tagId == "Bluetooth_IsActive"){
		Attribute["IsActive"] = value;

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

	cmd = "set";
	ModelName = "model-settings";
	ListType = "BTConfig";

	Attr = new Object();
	Attr = getAttrObj(tagId, value);

	xmlObj = getPathObj(cmd, ModelName);
	xmlObj[cmd][ModelName][ListType] = Attr;

	GetTd(xmlObj, g_SetEvent, cmd);
}


function setProtocolDetail(protocol){

	if((protocol == 0) || (protocol == 2)){
		hideHTML('Bluetooth_Channel1_Row');
		hideHTML('Bluetooth_Channel2_Row');
		hideHTML('Bluetooth_Telemetrie_Row');
		if(protocol == 2){
			showHTML('Bluetooth_TxRate_Row');
		}
		else{
			hideHTML('Bluetooth_TxRate_Row');
		}
	}
	else if(protocol == 1){
		showHTML('Bluetooth_Channel1_Row');
		showHTML('Bluetooth_Channel2_Row');
		hideHTML('Bluetooth_Telemetrie_Row');
		showHTML('Bluetooth_TxRate_Row');
	}
	else if(protocol == 3){
		hideHTML('Bluetooth_Channel1_Row');
		hideHTML('Bluetooth_Channel2_Row');
		showHTML('Bluetooth_Telemetrie_Row');
		hideHTML('Bluetooth_TxRate_Row');
	}
	ScrollRefresh();
}

function toggleShowPin(){
	$('#Bluetooth_Show_PW_Img').toggle();

	if(g_showPin == 0){
		$('#Bluetooth_Pin').attr('type', "text");
	}
	else{
		$('#Bluetooth_Pin').attr('type', "password");
	}

	g_showPin ^= 1;
}


function toggleBluetoothStatus(){
	$('#Bluetooth_Status_Img').toggle();

	g_BluetoothActive ^= 1;

	if(g_BluetoothActive == 1){
		showDialogbox("actionWait", 'Bluetooth wird gestartet...');
	}
	else{
		showDialogbox("actionWait", 'Bluetooth wird beendet...');
	}

	submitSET("Bluetooth_IsActive", g_BluetoothActive);
}


function BluetoothConnect(){













 //TODO
}


function BluetoothDisconnect(){










	//TODO
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


function goToTelemetry(){

}
