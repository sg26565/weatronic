


	var g_lastURL = getLastURL();
	var g_GET_Parameter = get_GET_Parameter();	
	var g_FromName = g_GET_Parameter.FromName2Help;
	var g_FromName2Show = g_GET_Parameter.FromName2Help2Show;
	
initPage();

function initPage(){
	
	
	if( (g_FromName == "1.7.0__VoiceAndSounds") || (g_FromName == "1.7.0__VoiceAndSounds_Help") || 
		(g_FromName == "1.7.1__VoiceAndSoundsSpeech") || (g_FromName == "1.7.1__VoiceAndSoundsSpeech_Help") || 
		(g_FromName == "1.7.2__VoiceAndSoundsAlerts") || (g_FromName == "1.7.2__VoiceAndSoundsAlerts_Help") || 
		(g_FromName == "1.7.1.1__VoiceAndSoundsSpeechSetup") || (g_FromName == "1.7.1.1__VoiceAndSoundsSpeechSetup_Help") || 
		(g_FromName == "1.7.2.1__VoiceAndSoundsAlertsSetup") || (g_FromName == "1.7.2.1__VoiceAndSoundsAlertsSetup_Help")){
		g_FromName2Show =  g_FromName2Show.replace(/%26/g, "&");
	}






	
	setHTML('Help_Page', g_FromName2Show);
	
	if(typeof g_lastURL != "undefined"){
		$('#Navi_Button').removeAttr("href");
		$('#Navi_Button').bind("click", function()  {window.location.href = g_lastURL;});
	}
		
	setInterval(JsonFunction, 250);
	
	if(g_FromName == "9.1.0__ControlAssignment"){
		hideHTML('Content_SwitchAssignment');
	}
	if(g_FromName == "9.1.0__SwitchAssignment"){
		hideHTML('Content_ControlAssignment');
	}
	
	if(g_FromName == "9.2.0__CurveEdit"){
		if(g_GET_Parameter.PageType == "SyncIndex"){
			hideHTML('Curve_Edit');
		}
		else{
			hideHTML('Curve_Edit_ServoSync');
		}
	}
	
	initScrollbars('List_Container');
}

























function getLastURL(){
	var uriGET = undefined;

	try{
		uriGET = window.location.search.substring(1).split("LastURLHelp=")[1];
		if(typeof uriGET == 'undefined') return;
	}catch(err){
		onError(err, "Error getLastURL() at Help : ", false);
	}	

  return uriGET;
}
