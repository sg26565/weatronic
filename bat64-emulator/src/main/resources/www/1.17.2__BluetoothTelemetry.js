

		


var g_GET_Parameter = get_GET_Parameter();

var g_isScrollbarInit = false;

var g_List_Count = 0;			
var g_List_Indices = [];		
var toggleStateARD = "normal";	


initPage();
 
function initPage(){

	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);


	setInterval(JsonFunction, 250);
}





function onEVENT_INIT(e){
	try{
		
		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);

		
		initScrollbars('List_Container');
		g_isScrollbarInit = true;
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}



function getRowOfTelemetryList(Index, TelemetryName, Interval, LiveData){
	var UebergabeParameter = '';
	var htmlInnerContainer = '' +
		'<!-- Telemetry Name -->' +
		'<div id="Telemetry__' + Index + '_Name" class="telemetry_name">' +
		'	<a href="1.16.1__TelemetryDataAssignment.html?' + UebergabeParameter + '" draggable="false">' + TelemetryName + '</a>' + 
		'</div>' +

		'<!-- Telemetry Interval -->' +
		'<div id="Telemetry__' + Index + '_Interval" class="telemetry_interval numpad" onClick=\'showNumpad("Telemetry__' + Index + '_Interval", "FadeDuration");\'>10s</div>' +
		
		'<!-- Telemetry Live Data -->' +
		'<div id="Telemetry__' + Index + '_Live" class="telemetry_live no_edit"></div>';
		
	return htmlInnerContainer;
}
