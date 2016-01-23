



var g_content = "Mux1";

initPage();

function initPage(){
	initScrollbars('List_Container');
	$('#Soft_Shutdown').bind('click', function(){shutDown();});

	$('#Mux_Setup_Mux1_Label').bind('click', function(){toggleContent("Mux1");});
	$('#Mux_Setup_Mux2_Label').bind('click', function(){toggleContent("Mux2");});
	$('#Mux_Setup_Mux3_Label').bind('click', function(){toggleContent("Mux3");});
	$('#Mux_Setup_Mux4_Label').bind('click', function(){toggleContent("Mux4");});



	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);


	setInterval(JsonFunction, 250);

}



function onEVENT_INIT(e){
	try{

		setHTML('Model_Name', e.EventData.ModelName);


		var sensor = new Array();
		for(var i = 1; i < sensor.length; i++){

		}

		toggleContent(g_content);
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}

	
function toggleContent(content){

	$('#Button_' + g_content).removeClass("button_white").addClass("button_blue");
	$('#Button_' + content).removeClass("button_blue").addClass("button_white");

	g_content = content;
	ScrollRefresh();

}
