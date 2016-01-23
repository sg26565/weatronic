


initPage();

function initPage(){

	GetTd(getFirmwareObject(InitDataPostArgs), g_InitEvent, "get");


	setInterval(JsonFunction, 250);
}



function getFirmwareObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined")
		InitDataPostArgs = new Object();

	firmware = new Object();
	firmware.Charge = "";
	firmware.Housekeeper = "";
	firmware.Stick = "";
	firmware.Switch = "";
	firmware.Transceiver = "";

	software = new Object();
	software.GuiD = "";
	software.TrxD = "";
	software.WebGUI = "";
	software.WtchdgD = "";

	versions = new Object();
	versions.Firmware = firmware;
	versions.Software = software;

	constants = new Object();
	constants.Versions = versions;

	cmd = new Object();
	cmd.constants = constants;

	InitDataPostArgs.get = cmd;
	log(3, JSON.stringify(InitDataPostArgs));

	return InitDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		setHTML("Firmware_Charge_Value", getFirmwareString(e.EventData.get.Versions.Firmware.Charge));
		setHTML("Firmware_Housekeeper_Value", getFirmwareString(e.EventData.get.Versions.Firmware.Housekeeper));
		setHTML("Firmware_Stick_Value", getFirmwareString(e.EventData.get.Versions.Firmware.Stick));
		setHTML("Firmware_Switch_Value", getFirmwareString(e.EventData.get.Versions.Firmware.Switch));
		setHTML("Firmware_Transceiver_Value", getFirmwareString(e.EventData.get.Versions.Firmware.Transceiver));

		setHTML("Software_GuiD_Value", getFirmwareString(e.EventData.get.Versions.Software.GuiD));
		setHTML("Software_TrxD_Value", getFirmwareString(e.EventData.get.Versions.Software.TrxD));
		setHTML("Software_WebGui_Value", getFirmwareString(e.EventData.get.Versions.Software.WebGUI));
		setHTML("Software_WtchdgD_Value", getFirmwareString(e.EventData.get.Versions.Software.WtchdgD));
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function getFirmwareString(hexValue){
	lsbVal = (hexValue%256);

	if(lsbVal < 10){
		lsbVal = "0" + lsbVal;
	}

	return "V" + parseInt(hexValue/256) + "." + lsbVal;
}
