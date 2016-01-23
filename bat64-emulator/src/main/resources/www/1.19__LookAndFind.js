


var g_Kompass   = 0;
var g_Direction = 0;
var g_Distance  = 0;
var g_Height    = 0;
var g_Speed     = 0;
var g_Heading   = 0;

var g_ModelType = "";
var g_ModelTail = "";

var white = "#ffffff";
var red   = "#cc0000";

var MEASValue_GPSGroundDistance  =	11552; 
var MEASValue_GPSDistance = 		11553; 
var MEASValue_Rx_GPSRelAltitude = 	 9506; 
var MEASValue_Rx_GPS_Speed = 		 7427; 
var MEASValue_Rx_GPS_Course = 		 7429; 
var MEASValue_Rx_GPSDirection =		 7460; 
var MEASValue_Tx_Magnet_Course =	 7369; 

var g_CalibrationState = 0;

initPage();

function initPage(){
	$('#Soft_Shutdown').bind('click', function(){shutDown();});


	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	GetTd(getModelConfigObject(InitDataPostArgs), g_InitEvent);



	var MEASValue_Array = [MEASValue_GPSGroundDistance, MEASValue_Rx_GPSRelAltitude, MEASValue_Rx_GPS_Speed, MEASValue_Rx_GPS_Course, MEASValue_Rx_GPSDirection, MEASValue_Tx_Magnet_Course];

	for(var i = 0; i < MEASValue_Array.length; i++){
		telemetryObj = new Object();
		telemetryObj.ID = MEASValue_Array[i];
		telemetryObj.Value = 0;
		telemetryObj.ValueStr = "";
		 	
		telemetryIds.push(telemetryObj);
	}

	setInterval(JsonFunction, 250);

	setInterval(updateLAF, 500);
}


function getModelConfigObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == 'undefined'){
		InitDataPostArgs = new Object();
	}

  	ModelConfig = new Object();
  	ModelConfig.ModelName = "Default Model";

  		type = new Object();
  		type.Index = -1;
  		type.Name = "";
  	ModelConfig.Type = type;

  	modelTypeDependent = new Object();
  		tailType = new Object();
  		tailType.Index = -1;
  		tailType.Name = "";
  	modelTypeDependent.TailType = tailType;

  	ModelConfig.ModelTypeDependent = modelTypeDependent;
 	





	InitDataPostArgs.ModelConfig = ModelConfig;

	return InitDataPostArgs;
}



function onEVENT_INIT(e){
	try{
		$('#Additional_Button').bind("click", function(){toggleCalibration();});
		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);

		g_ModelType = e.EventData.ModelConfig.Type.Name;
		g_ModelTail = e.EventData.ModelConfig.ModelTypeDependent.TailType.Index;

		drawFOVs();
		canvasInit(g_ModelType, g_ModelTail, g_Kompass, g_Direction, g_Distance, g_Heading);
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "telemetry"){
		if(key == MEASValue_GPSGroundDistance){
			setHTML('Distance_Value', valueStr);
			g_Distance = value / 10;
		}
		else if(key == MEASValue_Rx_GPSRelAltitude){
			setHTML('Height_Value', valueStr);

			if(value > 32767){
				g_Height = (value - 65536) / 10;
			}
			else{
				g_Height = value / 10;
			}
		}
		else if(key == MEASValue_Rx_GPS_Speed){
			setHTML('Speed_Value', valueStr);
			g_Speed = value * 0.1852;
		}
		else if(key == MEASValue_Rx_GPS_Course){
			setHTML('Heading_Value', valueStr);
			g_Heading = value / 100;
		}
		else if(key == MEASValue_Rx_GPSDirection){
			setHTML('Direction_Value', valueStr);
			g_Direction = value / 100;
		}
		else if(key == MEASValue_Tx_Magnet_Course){
			g_Kompass = value / 100;
		}
	}
}


function toggleCalibration(){
	g_CalibrationState^= 1;
	if(g_CalibrationState == 0){
		GetTd({"cmd":0x031D}, "noEvent", "command");
		$('#Additional_Button').addClass("button_blue").removeClass("button_white");
		$('#Calibrate_Compass_Button').addClass("compass_icon").removeClass("blue_compass_icon");
	}
	else{
		GetTd({"cmd":0x031C}, "noEvent", "command");
		$('#Additional_Button').removeClass("button_blue").addClass("button_white");
		$('#Calibrate_Compass_Button').removeClass("compass_icon").addClass("blue_compass_icon");
	}
}

function drawFOVs(){
	var fovc = document.getElementById('FOV_Canvas');
    var fov = fovc.getContext('2d');
    var sfov = fovc.getContext('2d');

    var lineColor = "rgba(0, 0, 0, 0.2)";

  
    fov.strokeStyle = lineColor;
	fov.lineWidth = 1;

	fov.beginPath();
	fov.moveTo(272, 188);
	fov.lineTo( -1, 179);
	fov.lineTo( -1,  -1);
	fov.lineTo(544,  -1);
	fov.lineTo(544, 179);
	fov.lineTo(272, 188);
	fov.closePath();
	fov.stroke();

    var grd = fov.createRadialGradient(272, 188, 1, 272, 188, 272);
    grd.addColorStop(1.00, 'rgba(255, 255, 255, 0.00)');
    grd.addColorStop(0.00, 'rgba(255, 255, 255, 0.08)');

    fov.fillStyle = grd;
    fov.fill();
  
    
  
    sfov.strokeStyle = lineColor;
	sfov.lineWidth = 1;

	sfov.beginPath();
	sfov.moveTo(272, 188);
	sfov.lineTo( 80, -4);
	sfov.lineTo(464, -4);
	sfov.lineTo(272, 188);
	sfov.closePath();
	sfov.stroke();

    var sgrd = sfov.createRadialGradient(272, 188, 1, 272, 188, 272);
    sgrd.addColorStop(1.00, 'rgba(255, 255, 255, 0.00)');
    sgrd.addColorStop(0.25, 'rgba(255, 255, 255, 0.05)');
    sgrd.addColorStop(0.00, 'rgba(255, 255, 255, 0.20)');

    sfov.fillStyle = sgrd;
    sfov.fill();
  
}


function canvasInit(ModelType, ModelTail, kompass, direction, distance, heading){
	W = 543;																								
	H = 375;																								

	canvas = Raphael("Radar_Canvas", W, H);

	var modelImage = "";

	var PATH_RADIUS = 100;
	PATH_RADIUS_UFO = 100;

	center = [272, 188];

	r1 = canvas.circle(center[0], center[1], PATH_RADIUS).attr({stroke: white, "stroke-width": "1px", opacity: 0});
	r2 = canvas.circle(center[0], center[1], PATH_RADIUS).attr({stroke: white, "stroke-width": "1px", opacity: 0});
	r3 = canvas.circle(center[0], center[1], PATH_RADIUS).attr({stroke: white, "stroke-width": "1px", opacity: 0});
	r4 = canvas.circle(center[0], center[1], PATH_RADIUS).attr({stroke: white, "stroke-width": "1px", opacity: 0});
	t1 = canvas.text(center[0], center[1],   "1m").attr({stroke: white, "stroke-width": "1px", x: 271, opacity: 0});
	t2 = canvas.text(center[0], center[1],  "10m").attr({stroke: white, "stroke-width": "1px", x: 271, opacity: 0});
	t3 = canvas.text(center[0], center[1], "100m").attr({stroke: white, "stroke-width": "1px", x: 271, opacity: 0});
	
	

	
	if(ModelTail == "Delta"){
		
		modelImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALmSURBVHja7Ji9TxpxGMc57gCJikMroKZxaNDJdKBuHShDpw5I61YbWknp4lINIe4diP9AB8LSgfgXmBQZunQghJiQELGgQAELRsLxIm8Hv34v6SU2NcEcF3tJ7zvxXLiHzz2vv4MihKjkLLVK5lIAFUAF8C61tbX1bnt7e0eWcJOTk/pcLpcpFAoXBoPhvuwA19fXX5Df2tjYeC+7GnwJCZ/X1tacsoqeTqfTptPp70IE8/n8BVI+KxvAxcXFB+12+0oA7Pf7xGKxPJZNio1Go2liYkIv2AzD8NfmZAO4sLDwF4zJZJr7p2k1m82zm5ubrw8PDw+Ojo7SvV6PE1LMcdwwHo9nI5HIF7fb/XZ+ft58J1CYb1MOh+N5KBT6XKvVqgLQ8fFxpdVqdQUb9dhPpVIVwWZZtra/vx9yOp2OmZkZg6RQWq1WY7PZngQCgU+lUukHuUEA/Fmv1zuC3Wg0uplM5vKm756fn5eCwWDAbrc/5btfFBRFUSqr1frI7/d/RCSSZIROT08voea1iHVwrTrqvpOTk9Te3p5/dXXVSvE/OkpLS0sPvV7vh2g0+g111Ce3FKLCIrqsYJfL5WaxWGRve/9gMOBisVjU5/N5l5eXLX9AYTzoXC7Xq3A4fNDtdttEhBC9FvZw9dqgZiuVSlOMLzB00XhhNOAbPaTa3d11kzHFNwjSVRbsZDJ5cb0mxcrj8eyoMcPuSbDqmE6nwwk2UjZEZphx/aLj5yQZ1DRNqyGKB+NfY7FJaI1GQ0vgmjConzaKnCACjXEAMRd72MEDgJJqtXqFmtQOh0PRL93TED8NKMy5KTwxf8AU7QxgHErFmEgkviJy0ysrK8/Ozs4S8K0T6xNTR43tVJNsoCOKNGZfGpGr44ElO2oxUjlC/Q0Al0PD8Lv4UnaAvHhAjC6+OYayBETd5XCSltSnpM7wRldAY9BS+pTUGU4x/Ww2W8Toykvlk1L+H1QAFUAF8D8H/CXAAL+MV2wsur5tAAAAAElFTkSuQmCC";
	}
	else if(ModelType == "Plane"){
		if(ModelTail == 1){
			
			modelImage = "data:image/png;base64,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";
		}
		else{
			
			modelImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAARgSURBVHja7JhLSGtXFIZXTo6P+Lr2qjemJte3JlbEKgVtVerEgl4VdFZwKrQXdNKAA6HgtHQkRcEOxKkOpKITBQfFV0tRcWAK1qL1qk3qIw9jNI/Tf50mktsmYG6OEoobFmefnOM+397rX2uvrUqSJErkJlCCtyfA/z2guLCwQO3t7RQIBP7zkANIpVL9MxNBoJ2dHWpsbJT7kdrQ0NCny8vLZ0tLSzvRPlhZWUldXV10dnZGmZmZJIoieTwe0ul0tL29TYWFhWSz2WRjNvG+M2HY4uJi6uvro83NTUpKSnrrOU+wtbX1C5fL9QcAv4o0RnJyMpWVlZHP51PexQyYkZFBIyMjlJubK6+Aw+G4M7/fn1JTU/MJWmukcRmOPZWVlRXRW4pokAfOy8uj8fFxeQX39vbo8PBQNrVabUhPT3+/qKjIgP6L8L9jmXR0dFB9fT3d3Nw8bJAwpF6vp5mZGaqoqKCrqyu6vb2lgoKCl8wCLb2Hpg+9zxPp7Owkg8Ega+1Ropghy8vLaXZ2lurq6uTfAFjAVwhfhAS0oXe7u7vliXi93sdNMwzJETc/P0+1tbXs4uehFUtNTX3GmuNohctjdutbaSaeHMWQOTk5mrm5OZ3FYqkIBVNDQ4MJEW3A7Snc6mUJsDEoGwKK7lsD3BcwFaaDFUPwJlzZGIhdqX2OVlpaKgsMrgwMDAx8aTKZzJeXlzZo9E+73X5itVot5+fnuxqN5lfk0d8BagW0j1PO9fW1LAHu86TD4cWwGzVLCJYPiDKGwNXIhn4R7EW0CfHAnmAEcMTiY350U7Kzs/VsLM+qqqpX/Lynp4dX0APoUwDvIyFbjo+PdwG8i9S1n5aW9hfGcN4F1OLi4meAXIbtwS6kd2gMdHBwYOc+PuTf2tqyvcs4APe53W7bycmJZWNj44fq6mqTWFJS8i04P1Bq7+QVDG2PMUesIKghgVy2/Pz8ysHBQUnAYGoFoFRSUCt8jbZXxxzBopgtKDEYUowK4paCepRwLyjkDUmEz+Uoirf0dzqdvIpyFANSiHdMlgkCRVRptdpGzPglazQOPm9bW9uHk5OTXwM00NTUZEZ07seTZ1l6WDyrYoVlS0vLR6w/RKAPqaI24SpqlFxujhEkZzcS8HXCAV5cXJxjAW8ZEBp0JBwgwJwIDCykw4Vbl2JnEqUGgqDdWEU7Sn52tSfhAOHWAFaRARnOm3AuxlklAyt4Axf7SMEWNyA2eCOC4/Xw8PDG0dFRMqqUZ6urqz/29/d/jhJM9+gH6d7eXjWA2mHfByuguzYxMbEO0J/Cf0Mhuzk2NvYN58lHAZyamnodrVwaHR392Ww2/xLtudFo/PjBgwQnNm20ZysrK8fYNlOiPce5mgvh1QcFXFtb43L9t1B1Fdw3hfX19TfT09PDXLM2Nzd/h5Ndafj+znsrKmhnzHtyrBUHPqTBRR8h2Dg5vwne8wkvj89V/3rnFN+zPyjg07/fngCfABOs/S3AAGHo+UOziN3dAAAAAElFTkSuQmCC";
		}
	}
	else if(ModelType == "Glider"){
		if(ModelTail == 1){
			
			modelImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI/SURBVHja7Ji9axphHMc9jZ5nK31LpVgko0NA3dThoDRKhS4dOluHGwQRB/8DF+nSpfofSCDQQRy6diiouDQEdG9wCAbN3ZnEe/Ou30daSCFL7dPwFO4DD/eGD5/7PS+/38k5juNhGa+HcVxBV9AV/N8FqSJJ0jtRFF8yG8FSqSQVCoW3NPvcofamXi8XjUafoS2YjGAwGBQegIeAScEACIVCAlqIScErYBjGWtM0m6Ygd/MiEonsPgb3AIkEOYbD4fvkUhA2wSH3BQKGNIig8Tj4Mf/8Pp/Pn06nX8myvJpMJl/Q3dqyLBPSBqR1tBXQrm9AXuoS4LA5J8xms3NFUdTfLJPJ5H632/00n8/PSX8owWznjrFtm0T/ejqdnrZarY+I05ONXCqV2scDxWGMbwDr7dFONpt93el0js+AaZr6XxSwdi6XEzFEygnYdn5zADOIj8VizxOJxAHVvbDX632u1+sfKK6RAHlLi1ZvmNwXWAiXFAUNqqlusVhcqKoqM5uLIaeSrYJZweVyeUX2N2YF4bbSdV1jVhALRMdWZTIriNRmkPTGsqC1BswKIo+THG4zKwg2eZR1Qaodctv+MJ/PvyiXy2/i8fjTnzne02w2ZdSOfLVa5ck9TEm73+9/b7fbh+PxeHJnn5eVSkW6rURCZdSs1WqHtz3LZDLiVl912wxJsVgMNxqNI1I1/5oqo9HoeDAYvB8OhwFE7hTV+R4pwUj/iK6X5/k9nH/94yF2/8B0BV1BV/Df8kOAAQBv4k46eX13lQAAAABJRU5ErkJggg==";
		}
		else{
			
			modelImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJHSURBVHja7Jg/ixpRFMVndF0dE01MogQXYyssqJ0IsUmMCmnTR4JltPFjCGniR7CSFGKxrZAu1boLMViYQLAIrrrOuLvOP2dyrixhs1UwD/MCc+AyjsKb37tz37vnKdq2LfAsl8C5HEAH0AH83wGZqlKpvM7lcs+4zWC5XK6USqVXLMfcYzZTl0uMRqOPEXMuM+jz+aR70H2IS8B9yO/3Swg/l4CXkK7ra1VVLZaA4s2bSCTy6AF0B6JM0DUQCNylW0naJIe+l0h4pT4kzYuLB/XncbvdnkwmU1wsFqvBYNDDcGvTNA1A64DWECtIvbohmtQFhMvmM2kymZzJsqz8RplKpQ47nc6H2Wx2RuPBgln2jmVZFmX/ajwef282m++Rp4cbuHQ6fYgfZJszHUNYb6G9bDb7stVq9X9AhmFof2FgrXw+n8Mrkk+hbetbhFBB3lgsdpBMJp8z3Qu73e5RvV5/x3CN7NMsTVajobjPsRAuGALqTFvdfD4/VxRlwW0vBpxCWwW3gMvl8pL2N24BwbbSNE3lFhALRMNWZXALiNamU3vjGdBcQ9wCoo9TD7e4BYQ2fZQbwFqt9nY0Gn1GGx/BYh3Dfj0tFotvhsPhKXry136//6lQKLz4Jyc4PDh/24FUq9WPjUbj5LaTgp1L7fzQFI/HD9rtdnc6neowqSJFr9f7EgwGBfjKb3Q0CYVCQjgc9iYSiScn0FbuZtuSgSv65TgQHrJbtE7ISSMkhPvaiKjXxSnsFND568MBdAAdwD/TTwEGAGFcTr7A2jqpAAAAAElFTkSuQmCC";
		}
	}
	else if(ModelType == "Helicopter"){
		
		modelImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIoUExURQAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwcHBwoKCg0NDRAQEBMTExYWFhkZGRwcHB4eHiEhISQkJCcnJykpKSwsLDExMTMzMzY2Njg4ODo6Oj09PT8/P0FBQUZGRkhISExMTE5OTlJSUlZWVlhYWFpaWl1dXWBgYGFhYWNjY2ZmZmpqam5ubnJycnV1dXt7e3x8fIKCgoSEhIiIiI2NjY6OjpWVlZmZmZmZmZycnKCgoKGhoaSkpKioqKurq6ysrK2trbCwsLGxsbOzs7S0tLW1tba2tra2tri4uLm5ubm5ubu7u76+vr6+vsDAwMPDw8XFxcXFxcjIyMjIyMnJycrKysrKysvLy8zMzMzMzM3Nzc7Ozs7OztDQ0NDQ0NLS0tLS0tXV1dfX19jY2Nra2tzc3N3d3ePj4+Tk5OTk5OXl5eXl5efn5+jo6Ojo6Ojo6Onp6erq6uvr6+zs7Ozs7O7u7u/v7+/v7/Dw8PLy8vPz8/Pz8/Pz8/Pz8/X19fX19fX19fb29vb29vj4+Pj4+Pj4+Pn5+fn5+fr6+vr6+vv7+/v7+/v7+/z8/Pz8/Pz8/P39/f39/f39/f39/f7+/v7+/v7+/v///////8HzoBYAAAC3dFJOUwAAAQIDBAUGBwgJCgsMDQ4PEBESExQYGRoeISQnKCkqKy0xMzg6Tk5PUFBRUlNTVFVVVldXWVpaW1xcXV5fYGFiY2VlZmhoaWprbG9wcXR1eHh6fX6ChIWGiYqMj5GRkpSWl5iYmZqbnJ2doKGipaanqqurrK2trq+vsLGys7W2uLu9v8LDy8zNzc7S0tPU1NbX2tvc3d/h5OTl5ufp6uvs7u7v8PHy9PX19vf3+Pn5+vv8/P3+/uGHNn0AAAINSURBVDjLY2AkEjAMIoUMaIAaCjlkxJjwK2RnBgmwmRSEa4JVMrNjVyhirsMCFJCM2zzDkw+kTttcGKtC5dYsHWZGZp227dtTgEYyaSY1K2FVqFi/KkWHWcBn+vbtTaZsTJpxKysVsCrk1ygFqpSIXLJ9+yQHLo34tWUKPNg9w61ZsTJdNn7N9u3zHdUS1pTLc+MKHh6tquXReRu2b1/tHbu+WoEbdzjyaBXNnLdp+/Y1zYvKNXjwBDibgFzJdiDYtr1InpcFt0JeM5/QxjUgleuKQzz0WHAp5HaqnbZ2OxQsmZipz4JDoVjYdmQw144Th0Jet+q+hZshqtbMas81YsXpRh3n4EkQhT1+tmpsuH3NrBAztWvB9u1TmmZHyzHh9jWTfMb6fPcJ27fXmBWtTJbHqZBZPmVtnaFK5/bteWp6pauT5HAoZJVLW1NlzKfWsn17gga3fuGqRJDtWBRKZ6+qNeZhkC/ftiVCnIFTv3hFqhRWhaq99Sa8jAxSaRsX+wsxMHAZVHepYFUo4WXKDxSQiFw5wxWUIHiMvMSwe4afDeghdn7vBR0WHGxA57Hy486uzLrmVlFL+wNtTNSZ8OZr4YD2Ocu2blw8s8maA69CiajlkCic58KDV6F4RHdR6dLJOQ1d9lx4FbJb+lpoBjlrOProMOMve9gF2ZlEeZi4BZipWJoRqZB+ZTgAAV2go5ANdR0AAAAASUVORK5CYII=";
	}
	else{
		
		modelImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA2UExURQAAAP///wAAAAAAAAAAAB1EHWsAAJKSkn+Vf6tvbylfKZYAAMzMzDN3M7sAAMzdzO6/v////2neDKQAAAANdFJOUwAAECZAcHBwlJSgoKAjeDUrAAAAxklEQVQ4y+XU0RKCIBCF4eOuQIlgvP/LhpSKsIxcNF3UXuo3P+IoGDoHPw1RzEcgUQ8cBjaGezZDJgRDHZDnEGa+hmtQSkIKSkmIQSEJMSgkIQfrJORgnUQjWCXRCFZJtIJl8gT5nsMbtyBp/zjc4hQ1IFt/yMW5iWXI2vtdRuecYglScm+ZnMsXx2nhNFar6eXyxVEGrWYi3uiRxO5sUiOnW8RjstMukQXXWPayUlaAcYoPhlQcqp4xTvlfb9e+dFL8xYn7BGG+Eprk0xg5AAAAAElFTkSuQmCC";
	}

	ufo = canvas.image(modelImage, (center[0] - 20), (center[1] - PATH_RADIUS_UFO - 20), 40, 40);
	

	updateBATKompass(0);
	updateUFOPosition(0, 0);
	updateUFOHeading(0, 0);
	updateUFODistance(0);
}


function updateLAF(){
	if(!isNaN(g_Kompass)){
		updateBATKompass(g_Kompass);
	
		if(!isNaN(g_Direction)){
			updateUFOPosition(g_Kompass, g_Direction);
		}
		else{
			updateUFOPosition(g_Kompass, 0);
		}
		
		if(!isNaN(g_Heading)){
			updateUFOHeading(g_Kompass, g_Heading);
		}
		else{
			updateUFOHeading(g_Kompass, 0);
		}
	}
	else{
		updateBATKompass(0);
	}

	if(!isNaN(g_Distance)){
		updateUFODistance(g_Distance);
	}
	else{
		updateUFODistance(1);
	}
}







function updateBATKompass(kompassAngle){
	if(kompassAngle > 359){
		kompassAngle -= 360;
	}

	var newValue = kompassAngle * (-3);
	setCSS('slider', 'margin-left', newValue + 'px');
}


function updateUFOPosition(kompassAngle, directionAngle){
	var batKompassAngle = directionAngle;

	directionAngle += 270;
	var directionRad = directionAngle * (Math.atan(1) / 45);

	var newX = Math.round((Math.cos(directionRad) * PATH_RADIUS_UFO) + center[0] - 20);
	var newY = Math.round((Math.sin(directionRad) * PATH_RADIUS_UFO) + center[1] - 20);

	ufo.attr({x: newX, y: newY});

	if(batKompassAngle < 0){
		batKompassAngle += 360;
	}

	if(batKompassAngle > 180){
		batKompassAngle -= 360;
	}

	var batKompassValue = (batKompassAngle * 3) + 266;

	if(batKompassValue < -5){
		batKompassValue = -5;
	}
	else if(batKompassValue > 535){
		batKompassValue = 535;
	}

	setCSS('needle_bat', 'left', batKompassValue + 'px');
}


function updateUFOHeading(kompassAngle, headingAngle){
	headingAngle -= kompassAngle;

	ufo.transform("r" + headingAngle);
}


function updateUFODistance(distance){
	if(distance < 1){
		r4.attr({opacity: 0});
		r3.attr({opacity: 0});
		r2.attr({opacity: 0});
		r1.attr({opacity: 0});
		t3.attr({opacity: 0});
		t2.attr({opacity: 0});
		t1.attr({opacity: 0});
	}
	else{
		r4.attr({opacity: 1});
		r3.attr({opacity: 1});
		r2.attr({opacity: 1});
		r1.attr({opacity: 1});
		t3.attr({opacity: 1});
		t2.attr({opacity: 1});
		t1.attr({opacity: 1});

		if(distance <= 10){
			r4.attr({r: (2500/distance)});
			r3.attr({r: (1000/distance)});
			r2.attr({r: (500/distance)});
			r1.attr({r: (100/distance)});
			
			t3.attr({text: "10m", y: 195 + (1000/distance)});
			t2.attr({text:  "5m", y: 195 + (500/distance)});
			t1.attr({text:  "1m", y: 195 + (100/distance)});
		}
		else if(distance <= 50){
			r4.attr({r: (10000/distance)});
			r3.attr({r: (5000/distance)});
			r2.attr({r: (2500/distance)});
			r1.attr({r: (1000/distance)});
			
			t3.attr({text: "50m", y: 195 + (5000/distance)});
			t2.attr({text: "25m", y: 195 + (2500/distance)});
			t1.attr({text: "10m", y: 195 + (1000/distance)});
		}
		else if(distance <= 100){
			r4.attr({r: (25000/distance)});
			r3.attr({r: (10000/distance)});
			r2.attr({r: (5000/distance)});
			r1.attr({r: (1000/distance)});
			
			t3.attr({text: "100m", y: 195 + (10000/distance)});
			t2.attr({text:  "50m", y: 195 + (5000/distance)});
			t1.attr({text:  "10m", y: 195 + (1000/distance)});
		}
		else if(distance <= 500){
			r4.attr({r: (100000/distance)});
			r3.attr({r: (50000/distance)});
			r2.attr({r: (25000/distance)});
			r1.attr({r: (10000/distance)});
			
			t3.attr({text: "500m", y: 195 + (50000/distance)});
			t2.attr({text: "250m", y: 195 + (25000/distance)});
			t1.attr({text: "100m", y: 195 + (10000/distance)});
		}
		else if(distance <= 1000){
			r4.attr({r: (250000/distance)});
			r3.attr({r: (100000/distance)});
			r2.attr({r: (50000/distance)});
			r1.attr({r: (10000/distance)});
			
			t3.attr({text: "1km",  y: 195 + (100000/distance)});
			t2.attr({text: "500m", y: 195 + (50000/distance)});
			t1.attr({text: "100m", y: 195 + (10000/distance)});
		}
		else if(distance <= 5000){
			r4.attr({r: (1000000/distance)});
			r3.attr({r: (500000/distance)});
			r2.attr({r: (250000/distance)});
			r1.attr({r: (100000/distance)});
			
			t3.attr({text: "5km",   y: 195 + (500000/distance)});
			t2.attr({text: "2.5km", y: 195 + (250000/distance)});
			t1.attr({text: "1km",   y: 195 + (100000/distance)});
		}
		else if(distance <= 10000){
			r4.attr({r: (2500000/distance)});
			r3.attr({r: (1000000/distance)});
			r2.attr({r: (500000/distance)});
			r1.attr({r: (100000/distance)});
			
			t3.attr({text: "10km", y: 195 + (1000000/distance)});
			t2.attr({text:  "5km", y: 195 + (500000/distance)});
			t1.attr({text:  "1km", y: 195 + (100000/distance)});
		}
		else if(distance <= 5000){
			r4.attr({r: (10000000/distance)});
			r3.attr({r: (5000000/distance)});
			r2.attr({r: (2500000/distance)});
			r1.attr({r: (1000000/distance)});
			
			t3.attr({text: "50km", y: 195 + (5000000/distance)});
			t2.attr({text: "25km", y: 195 + (2500000/distance)});
			t1.attr({text: "10km", y: 195 + (1000000/distance)});
		}
		else if(distance <= 100000){
			r4.attr({r: (25000000/distance)});
			r3.attr({r: (10000000/distance)});
			r2.attr({r: (5000000/distance)});
			r1.attr({r: (1000000/distance)});
			
			t3.attr({text: "100km", y: 195 + (10000000/distance)});
			t2.attr({text:  "50km", y: 195 + (5000000/distance)});
			t1.attr({text:  "10km", y: 195 + (1000000/distance)});
		}
	}
}
