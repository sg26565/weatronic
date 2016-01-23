



initPage();

function initPage(){
	$('#Soft_Shutdown').bind('click', function(){shutDown();});
	

	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);


	setInterval(JsonFunction, 250);
}



function onEVENT_INIT(e){
	try{
		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}
