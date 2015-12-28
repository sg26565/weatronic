



var StickControls = new Array();
StickControls["CTRL_StickPotiLeft"]		= CONST_CTRL_PotiLeftSide;
StickControls["CTRL_StickPotiRight"]	= CONST_CTRL_PotiStickRight;
StickControls["CTRL_StickRotaryLeft"]	= CONST_CTRL_RotaryStickLeft;
StickControls["CTRL_StickRotaryRight"]	= CONST_CTRL_RotaryStickRight;
StickControls["CTRL_StickSwitchLeft"]	= CONST_CTRL_SWStickLeft;
StickControls["CTRL_StickSwitchRight"]	= CONST_CTRL_SWStickRight;

StickControls["CTRL_StickButtonLeft"]	= CONST_CTRL_StickLeftButton;
StickControls["CTRL_StickButtonRight"]	= CONST_CTRL_StickRightButton;








StickControls["CTRL_StickButtonSwitchLeft"] 	   = CONST_CTRL_StickLeftButton + CONST_CTRL_SWStickLeft;
StickControls["CTRL_StickButtonSwitchRight"] 	   = CONST_CTRL_StickRightButton +  CONST_CTRL_SWStickRight;




initPage();

function initPage(){
	$('#Navi_Button').removeAttr("href");
	$('#Navi_Button').bind("click", function(){
		showDialogbox('StrickControlInfo', 'Die Änderungen werden erst nach Neustart des Senders wirksam.');
	});
	

	GetTd({"cmd":0x0425, "param": {"Left": 0, "Right": 0}}, g_InitEvent, "command");


	$('#Drop_Down_Content_Left').bind('click', function(){toggleDropDown('Left');});
	$('#Drop_Down_Arrow_Left').bind('click', function(){toggleDropDown('Left');});
	$('#Drop_Down_Content_Right').bind('click', function(){toggleDropDown('Right');});
	$('#Drop_Down_Arrow_Right').bind('click', function(){toggleDropDown('Right');});
	
	$('#Option_0_Left').bind('click', function(){setOption(0, "Left", false);});
	$('#Option_1_Left').bind('click', function(){setOption(1, "Left", false);});
	$('#Option_2_Left').bind('click', function(){setOption(2, "Left", false);});
	$('#Option_3_Left').bind('click', function(){setOption(3, "Left", false);});
	$('#Option_4_Left').bind('click', function(){setOption(4, "Left", false);});
	
	$('#Option_0_Right').bind('click', function(){setOption(0, "Right", false);});
	$('#Option_1_Right').bind('click', function(){setOption(1, "Right", false);});
	$('#Option_2_Right').bind('click', function(){setOption(2, "Right", false);});
	$('#Option_3_Right').bind('click', function(){setOption(3, "Right", false);});
	$('#Option_4_Right').bind('click', function(){setOption(4, "Right", false);});

	setInterval(JsonFunction, 250);
}



function getStickControlObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined")
		InitDataPostArgs = new Object();

	return InitDataPostArgs;	
}



function onEVENT_INIT(e){
	try{
		setOption(e.EventData.result.Left,  "Left",  true);
		setOption(e.EventData.result.Right, "Right", true);
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function toggleDropDown(side){
	$('#Drop_Down_Options_' + side).toggle();
}


function setOption(index, side, isInit){
	showHTML('Option_0_' + side);
	showHTML('Option_1_' + side);
	showHTML('Option_2_' + side);
	showHTML('Option_3_' + side);
	showHTML('Option_4_' + side);
	hideHTML('Option_' + index + '_' + side);

	switch(index){
		case 0: setHTML('Drop_Down_Content_' + side, 'kein');				ShowControlOverlayIcon("0", side); break;
		case 1: setHTML('Drop_Down_Content_' + side, 'Drehgeber');			ShowControlOverlayIcon(StickControls["CTRL_StickRotary" + side], side); break;
		case 2: setHTML('Drop_Down_Content_' + side, 'Taster');			ShowControlOverlayIcon(StickControls["CTRL_StickButton" + side], side); break;
		case 3: setHTML('Drop_Down_Content_' + side, 'Schalter');			ShowControlOverlayIcon(StickControls["CTRL_StickSwitch" + side], side); break;
		case 4: setHTML('Drop_Down_Content_' + side, 'Schalter + Taster');	ShowControlOverlayIcon(StickControls["CTRL_StickButtonSwitch" + side], side); break;
	}

	if(!isInit){
		toggleDropDown(side);
		if(side == "Left"){
			GetTd({"cmd":0x0424, "param": {"Left": index}}, "noEvent", "command");
		}
		else{
			GetTd({"cmd":0x0424, "param": {"Right": index}}, "noEvent", "command");
		}
	}	
}


function ShowControlOverlayIcon(ControlID, side){
	var CONST_CONTROL_ICON_Poti = "data:image/png;base64,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";
	var CONST_CONTROL_ICON_StickSwitch = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAA6CAYAAADcKStOAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAN0SURBVHja7NpdSBRRFADgM+P6h7v+rD8UIWEQPUmgFEYqZf8QREEQSFDoixAE4T70EvScRBFkD0FQ9BArimVoliXpSxRED0EQPaRvooL4L8R0znqPzC4zO/fu3Fl92ANHubPs7rdnZmfuuTsA/qMY8xZmv/gfVnmyZVmOafhEHcJ8ibk/ZXvMqq3tkXqFqSnHzaZP1KADiuKeMT3d7ecTmz5QQ5i7E/vSMKC/qgrOFhVpw5kZokYxaxg1iKiLxcVacaqwJoEqZ9QQYk4JjM7KqcCOpqJGq6uhLRmhDWcqoIYxIzQIC1RzYaHz+UMDTgbWijnGqDLThNGaGleULpwpgaLdV8ioYazUkYICuTOvD1w62HFRqQQqiqgxBZRfnOGBMhhFx1SjIsoeq3iZuTQ7CyNra8lXCMvqka3YScyPjKqmSuEx5QeVtnKG0S1TMUK95wGj6vPzQVfIVs5esTN21K68PBjXjFKpnGFDjaSiDoRCEFR4Vc4U175efmRPFlAylaOKfcNsZNQEouoCRklULkIwiz/B82hUGhXGL4auqjrgziVVTCXokkTVdYvJ9XVomZnJ1BqhY6wL8xfsnKAvwBLti6+YBwWwGbPO44mNQRxqVGT6EiJqgDbwQbKB+VBk2j2IOZHBG09ic9KSrWYk0MjBcrAcLAfLwXKwHRL2mR71Z/U7CdYg5vyHA3yfZuy8LeeW2+DZDU97+nhXBo2SCdpbbZhxbkZCjCpAuUoPGWAXRZ3SE6rjF8bdLSuDO6WlWS/XBjYjF1KakTz88xfzKo3GsYEowsp5rX0FjKLoMsWyQD9vub2wAPcXF7cTlWhG7IsqbzDP8+BBeTncjES2A9XjtNrzDvM0Dx5VVMCNcDjrKCcYxQfMEzx4jLgujTgZlBuM4hPmMR48jUaho6Qka6h0MIrPmFu94DPEXfOBU0F5XcRbxTkuEZ3z8/BieVkvKs0vdF6ziyax6AL/MK9ngMsEJTvt6cT8bse9WlkJFCUL+0EeO659bg76PHB+UCoTRcb93MJh5QZWVwNBqc5gCdcOYi2N3vwKVu51Ck4HKpOpNeN+M+Iy4t4KnC6U13ksXdCsN465j+dy8cpK6F1aUke5rI/5uYugQcxK9ro8LlcpF5jfINwf2Fz5tqf0D6Zu913oCLrCx2DzVocYaLoh5L8AAwANJuoidFYl6AAAAABJRU5ErkJggg==";
	
	if((ControlID != "INVALID") && (ControlID != "0")){
		switch(ControlID){
			case StickControls["CTRL_StickPotiLeft"]:			width="100";	height="62";   left_img = "206"; top_img = "45";  control_overlay_img = CONST_CONTROL_ICON_Poti; break;			
			case StickControls["CTRL_StickPotiRight"]:			width="100";	height="62";   left_img = "454"; top_img = "45";  control_overlay_img = CONST_CONTROL_ICON_Poti; break;			
			case StickControls["CTRL_StickRotaryLeft"]:			width="100";	height="62";   left_img = "206"; top_img = "45";  control_overlay_img = CONST_CONTROL_ICON_Poti; break;			
			case StickControls["CTRL_StickRotaryRight"]:		width="100";	height="62";   left_img = "454"; top_img = "45";  control_overlay_img = CONST_CONTROL_ICON_Poti; break;			
			case StickControls["CTRL_StickSwitchLeft"]:			width="38";		height="58";   left_img = "237"; top_img = "65";  control_overlay_img = CONST_CONTROL_ICON_StickSwitch; break;	
			case StickControls["CTRL_StickSwitchRight"]:		width="38";		height="58";   left_img = "485"; top_img = "65";  control_overlay_img = CONST_CONTROL_ICON_StickSwitch; break;	
			case StickControls["CTRL_StickButtonLeft"]:			width="100"; 	height="62";   left_img = "206"; top_img = "44";  control_overlay_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAvCAMAAACc9ceUAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEFUExURQAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAYBAQkBAQ8CAhICAhUCAhgDAxsDAx4DAyEEBCQEBC0FBTMGBjkGBkIICEsJCU4JCVcKCloKCmYMDGkMDGwMDG8NDXgODoQPD4cPD5YREaUTE6gTE7oVFb0VFcYXF8kXF9IYGNsZGeEaGuQaGucaGuobG/AbG/YcHPkcHPwdHf8dHd0IkuIAAAAqdFJOUwAACA4QERMUFhcZHR4hIyYtMDM8SEtaaWyZnJ+lqKuusbS3usPP2OHk8Ltat84AAAFTSURBVEjH7dbbVoJAFAbg3cEsyaTzychyKv0rooNUmlnZOcsy5f0fpQsYEEJbM9Ad/+WG9a0Fs/deQyNDQxvwskV/vDz88QSOrnlOMS1jEY8K0+KpYtGtJ1bAyszZ8Vt2LStmbbqN0G/xbItYGRyfO7lyrVteOkNWwJqE8WENSseEKvKNGszOAKp7CSb0v8YYqr1wq45dRewclT3chFJ3KOdE+2sWeAihHoF58V5dwv7zL+rlAMsyfb8KvRWgWjrW5GYoj8qXj2qfIC87j0VcdPuobxMF6dme2kHdo3o1sJT8nsiV0XStBkozUXbOAvDkUPeAGml/0QoO33hjeetLzqJ1GG3Lsl6dxopk2WP+bjiNFc1KMdQ+K9AoBouUEnQUR2OxKK1BS1M8FtF4sCB6ByBSGfxhKpHUfYIoSAFM2gICOwdIrMRKrMT6NyvO/SW4V38AZ17t/XBA7wMAAAAASUVORK5CYII="; break;
			case StickControls["CTRL_StickButtonRight"]:		width="100"; 	height="62";   left_img = "454"; top_img = "44";  control_overlay_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAvCAMAAACc9ceUAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEFUExURQAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAYBAQkBAQ8CAhICAhUCAhgDAxsDAx4DAyEEBCQEBC0FBTMGBjkGBkIICEsJCU4JCVcKCloKCmYMDGkMDGwMDG8NDXgODoQPD4cPD5YREaUTE6gTE7oVFb0VFcYXF8kXF9IYGNsZGeEaGuQaGucaGuobG/AbG/YcHPkcHPwdHf8dHd0IkuIAAAAqdFJOUwAACA4QERMUFhcZHR4hIyYtMDM8SEtaaWyZnJ+lqKuusbS3usPP2OHk8Ltat84AAAFTSURBVEjH7dbbVoJAFAbg3cEsyaTzychyKv0rooNUmlnZOcsy5f0fpQsYEEJbM9Ad/+WG9a0Fs/deQyNDQxvwskV/vDz88QSOrnlOMS1jEY8K0+KpYtGtJ1bAyszZ8Vt2LStmbbqN0G/xbItYGRyfO7lyrVteOkNWwJqE8WENSseEKvKNGszOAKp7CSb0v8YYqr1wq45dRewclT3chFJ3KOdE+2sWeAihHoF58V5dwv7zL+rlAMsyfb8KvRWgWjrW5GYoj8qXj2qfIC87j0VcdPuobxMF6dme2kHdo3o1sJT8nsiV0XStBkozUXbOAvDkUPeAGml/0QoO33hjeetLzqJ1GG3Lsl6dxopk2WP+bjiNFc1KMdQ+K9AoBouUEnQUR2OxKK1BS1M8FtF4sCB6ByBSGfxhKpHUfYIoSAFM2gICOwdIrMRKrMT6NyvO/SW4V38AZ17t/XBA7wMAAAAASUVORK5CYII="; break;
			case StickControls["CTRL_StickButtonSwitchLeft"]:	width="100";    height="62";   left_img = "206"; top_img = "63";  control_overlay_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAvCAYAAACrKzemAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAWfSURBVGje7Vt7aBxFHN4kl+TyvtxdXpfntbVUyYmlf9iKShsoiIEiPhAq1D800mBB0D/UWlpBsaJiFWyIUCiiwUJBKr5KoFIs1sYopT4LarDQaqNoU9SamNbx+25n3HWzd7e7d/YuezfwcSG3M7vz7fy++eY3c5oQQivBGbyUamA5sAZo9NJAsZDVAOxifyXGgStKZC0sUWAv+3pjdbUYqq8X5TphJ4DVJbKM0gW8xX7eUlMjznZ2CtHTI54JhURtWRlbOQ3cViJL0xLABPs4VFcnznd1JYlSGItEREtFBVs6D2wvZrLWA1MBjJ4dTU3ij+5unSR+qr+B91tbxYrKSrb2N/BCMZL1EPBrQ3m5GAmHxbwaTYooM/D/kx0d4jpoGepcAvYATdriKa1Ah5eKlcBWYLYdRB2IRlOTZMHZWEzcHAyqmfJdoLvASaL12W+a3d9wU7kWeAq4uDwQEEfb2hyRZMaf0LR7oG0V+s0npOYVYuGLPEKSWjAo2nXdFU5HWLMMH7G6qioZVk5HlB22NTaKGn2mPONmprxM5RrgFPuagNaeQkSsQp8lWaucWIMDvHgQYfQDrUFvr2eilI6NNjeLKN4aRyrwYIEQtVGF3SBs0Az7iud1StZVwEe8kOHzi7IG2RClZkoQ/g40b4k+xP8CtgFVeSTqZUXUFpjqi6bndUrWDs54u2Awk6Opr0//tMIhOQsQj4sphPRaQ/j780TUGO9PLR3BiLc+v1OyNgVw0QoI+kpU6EcMWzEASzBJsU814kDKE/BhdnWpCXyQiB6OXwHrlLBmgSMuJo42uYYVTXiG8ZYW2z44JYtW4W7ga+CcBTPUG3aUxjMdWfcihOXNfrdp51vgNWBZDogyE5apMDtynNcvw2D4rL09ZWS4EfhUpQ74PAbNOZyBrGFogLzZrZkMfNLEZ6GHJsLSlZvkyxZrQMRPUsgdkpWwIOKELIrxbpdkJQqArC3qmo21tWKOk1aGNk1kpcI+P5K1V33/JHTUaZt3gtSE1FgrwrreCj+R1ayWLjTD+yKR7O2PxH1G33xB1n+WLhMelmnFQlZUJh+TIXMaS5dcEuU3spKht8G0dCmRZU9WSJnNH/+HEeXbkUXT+Q0zJSWyMmrWuBL3ozkWdz/OhkE1wqpgG8ZyaBv8SJYqe9R3O10Y0mIli2VYfT9syVmlwwMNDclkoB16jJSzL9eGg+oaWooLuVkbvu1kp+cll2T1FwBZanPYsVk1kTVogx7zqZjbgdeBY3LZoPAB8GXUQT5rSCdrDpiU9VQbHwKHgRGg7zLns5aq+3Xihecin7UJw0csgU+hV+mzwbVo6FiGTCl3c3rxQNa6ceBKY+Wej0wpF9hvKvN6KMtM6fYQGnkuFEouF34GuFmqQGfMxNlchvw7z0CcgSk01yV+Q90TeKM36LvVec/Bp7IWTslayYwiWd/NTQvzNn26LftUmxZmYMR9BwLXGUQ9nufdnX+txSOIBK9p5Q3AFwxHhtMltySlIO4ThO7V+oER4ukC2Tcctsuius3BMzw+LkOFzRDr2SyJOghtoA7KDdZH5cxaKOV6lZ8fCAaT8uNlwyKmDq3dAdbPeUx5vApNkFtfs/I0TkUBnnXgzs9JZS3i+osl4m4aCUkbIdZDa6ZdpD4Yvs9D9+r1Mw7TMrzLC/gUTbdlZn7PSyM1wChDiIdEpkhYOg3DdxfwuRV6F9CJ+l7TTzMvlpJwO6KshaGzE5inSB+nobPbxgdRMxDJzcYm66TcTE1t4X18pvQxOvOliOlDysWbrMU0dI36ZjrAFsvUoN9PK1Ok57lG3E9DxxEGohieA4aHekUm4rRiJ4vlLoo2ly2j4bD4FB7KNN2+qOk/KNBKZBllLVfyPPveZeR4npUTglYia2GhaXtY0w+r3u9l+bJoySr92ss5/gGWeaMYKjJWdQAAAABJRU5ErkJggg=="; break;
			case StickControls["CTRL_StickButtonSwitchRight"]:	width="100";    height="62";   left_img = "454"; top_img = "63";  control_overlay_img = "data:image/png;base64,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"; break;
			default:											width="";		height="";	   left_img = "";    top_img = "";	  control_overlay_img = "";
		}

		setHTML('Control_Overlay_' + side, '<div style=\"width: ' + width + 'px; height: ' + height + 'px; left: ' + left_img + 'px; top: ' + top_img + 'px; position: absolute;\"><img src=\"' + control_overlay_img + '\" width=\"' + width + '\" height=\"' + height + '\" alt=\"\" draggable=\"false\" /></div>');
	}
	else{
		setHTML('Control_Overlay_' + side, '');
	}
}

