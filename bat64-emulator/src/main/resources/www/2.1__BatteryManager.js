


initPage();

function initPage(){

	


	setInterval(JsonFunction, 250);
}




function setPowerSupply(telemetryIds){
	telemetryPowerSupply = new Object();
	telemetryPowerSupply.ID = CONST_TELEMETRY_MEASValue_Tx_PowerSupply;
	
	value = new Object();
		value.RemPowerTime = "";
		value.IsRunOnDC = -1;
			cell = new Object();
			cell.Status = "";
			cell.Voltage = "";
			cell.Capacity = "";
			cell.Temperature = "";
		cells = new Array (cell);
		value.Cells = cells;
		
	telemetryPowerSupply.Value = value;

	telemetryIds.push(telemetryPowerSupply);
	
	return telemetryIds;
}
