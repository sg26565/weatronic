


var g_GET_Parameter  = get_GET_Parameter();
var g_isManager      = parseInt((g_GET_Parameter.IsManager), 10); 
var g_managementType = g_GET_Parameter.ManagementType;
var g_lastURL        = g_GET_Parameter.LastURL;
var g_savePathObj    = g_GET_Parameter.SavePathObj;
var g_searchKeyNode  = g_GET_Parameter.SearchKeyNode;



var g_isDbClickFinished = true;
var g_ScrollbarIsInit = false;
var g_PageRefreshed = false;
var g_isPageFocusLeft = true;
var g_currentDeviceID = {"Right": -1, "Left": -1};
var g_rootDirectory = "/";
var g_currentPath = {"Left": g_rootDirectory, "Right": g_rootDirectory};
var g_deviceArray = {};
	g_deviceArray["Left"] = {};
	g_deviceArray["Right"] = {};
var g_tagObj = new Object(); 
	g_tagObj["Left"] = {};
	g_tagObj["Right"] = {};
var g_CopyRemoveStack = new Array(); 
var g_CopyRemoveStackCount = 0; 
var g_majorSelected = "";	
var g_fromPage = "undefined";
var g_RxType = -1;
var g_isInProgress = false;


initPage();

function initPage(){
	if(typeof g_managementType == "undefined"){
		g_managementType = "fileManagement";
		$('#Add_Button').bind("click", function(){AddItem();});
		$('#Delete_Button').bind("click", function(e){
			
			setCopyRemoveStackArray("del");
			var FileDir = "";

			for(var i = 0; i < g_CopyRemoveStack.length; i++){
				FileDir += getHTML(g_CopyRemoveStack[i]);

				if(i != g_CopyRemoveStack.length - 1){
					FileDir += ", ";
				}
			}

			showDialogbox("deleteFileDir", 'Datei oder Verzeichnis', FileDir);
		});
		
		
	}
	else{
		$('#Navi_Button').removeAttr("href");
		$('#Navi_Button').bind("click", function(){
			window.location.href = g_lastURL;
		});
		hideHTML('ARD_Buttons');

		if(g_managementType == "soundManagement"){
			g_managementType = "FilemanagerAudio"; 		
			g_savePathObj = JSON.parse(g_savePathObj); 	
												 	
		}
		else if(g_managementType == "imageManagement"){
			g_managementType = "FilemanagerImage";
			g_savePathObj = JSON.parse(g_savePathObj);
		}
		else if(g_managementType == "updatRxManagement"){
			g_managementType = "fileManagement";
			g_fromPage = "updateRx";
			g_RxType = g_GET_Parameter.RxType;
		}
		else if(g_managementType == "startupWarnings"){
			g_managementType = "FolderPreflightCheckList";
			g_savePathObj = JSON.parse(g_savePathObj);
		}
		else if(g_managementType == "CustomTelemetryScreens"){
			g_savePathObj = JSON.parse(g_savePathObj);
		}
	}

	if(g_isManager){
		$('#File_Browser').remove();
		

		hideHTML('File_Browser_Label');
		showHTML('File_Manager_Label');
	}
	else{
		$('#File_Manager').remove();
		

		hideHTML('File_Manager_Label');
		showHTML('File_Browser_Label');
		document.title = "9.1.0__File_Browser";
		setHTML('Page_Name_Tag', 'File_Browser_Label');
	}

	$('#Path_Left').bind("click", function(e){setPageFocus('Path__Device_Left');});
	$('#Path_Right').bind("click", function(e){setPageFocus('Path__Device_Right');});
	$('#Copy_Button').bind("click", function(e){setCopyRemoveStackArray("copy");CopyItem();});


	GetTd(getDeviceListObject(InitDataPostArgs), g_SetEvent, g_managementType + "__init_device");


	initScrollbarsFM();
	
	g_telemetry_MEASValue_GeneralProgress = 3215;
	telemetryGeneralProgress = new Object();
	telemetryGeneralProgress.ID = g_telemetry_MEASValue_GeneralProgress;
	telemetryGeneralProgress.Value = 0;
	telemetryGeneralProgress.ValueStr = "";
	
	telemetryIds.push(telemetryGeneralProgress);
	
	setInterval(JsonFunction, 250);
}



function getDeviceListObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	deviceList = new Object();

	device = new Object();
	device.Index = -1;
	device.Name = "";

	deviceItems = new Array (device);

	deviceList.Devices = deviceItems;
	deviceList.DeviceListGroup = 0;

	if(g_managementType == "ModelManagement"){
		modelManagement = new Object();
		modelManagement.DeviceList = deviceList;
		InitDataPostArgs.ModelManagement = modelManagement;
	}
	else if(g_managementType == "FilemanagerAudio"){
		filemanagerAudio = new Object();
		filemanagerAudio.DeviceList = deviceList;
		InitDataPostArgs.FilemanagerAudio = filemanagerAudio;
	}
	else if(g_managementType == "FilemanagerImage"){
		filemanagerImage = new Object();
		filemanagerImage.DeviceList = deviceList;
		InitDataPostArgs.FilemanagerImage = filemanagerImage;
	}
	else if(g_managementType == "FolderPreflightCheckList"){
		filemanagerPreFlight = new Object();
		filemanagerPreFlight.DeviceList = deviceList;
		InitDataPostArgs.FolderPreflightCheckList = filemanagerPreFlight;
	}
	else if(g_managementType == "CustomTelemetryScreens"){
		filemanagerTeleScreen = new Object();
		filemanagerTeleScreen.DeviceList = deviceList;
		InitDataPostArgs.CustomTelemetryScreens = filemanagerTeleScreen;
	}
	else{
		InitDataPostArgs.DeviceList = deviceList;
	}

	return InitDataPostArgs;
}


function getBrowseObject(InitDataPostArgs, cmd, isLeft, deviceId, path){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	browse = new Object();
	action = new Object();
	action.Cmd = cmd;

	locationLR = new Object();
	locationLR.Path = path;
	locationLR.DeviceId = deviceId;

	if(isLeft){
		action.LocationLeft = locationLR;
	}
	else{
		action.LocationRight = locationLR;
	}

	browse.Action = action;

	if(g_managementType == "ModelManagement"){
		modelManagement = new Object();
		modelManagement.Browse = browse;
		InitDataPostArgs.ModelManagement = modelManagement;
	}
	else if(g_managementType == "FilemanagerAudio"){
		filemanagerAudio = new Object();
		filemanagerAudio.Browse = browse;
		InitDataPostArgs.FilemanagerAudio = filemanagerAudio;
	}
	else if(g_managementType == "FilemanagerImage"){
		filemanagerImage = new Object();
		filemanagerImage.Browse = browse;
		InitDataPostArgs.FilemanagerImage = filemanagerImage;
	}
	else if(g_managementType == "FolderPreflightCheckList"){
		filemanagerPreFlight = new Object();
		filemanagerPreFlight.Browse = browse;
		InitDataPostArgs.FolderPreflightCheckList = filemanagerPreFlight;
	}
	else if(g_managementType == "CustomTelemetryScreens"){
		filemanagerTeleScreen = new Object();
		filemanagerTeleScreen.Browse = browse;
		InitDataPostArgs.CustomTelemetryScreens = filemanagerTeleScreen;
	}
	else{
		InitDataPostArgs.Browse = browse;
	}

	return InitDataPostArgs;
}


function getBrowseCopyMoveObject(InitDataPostArgs, cmd, direction, deviceIdLeft, deviceIdRight, pathLeft, pathRight){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	browse = new Object();
	action = new Object();
	action.Cmd = cmd;
	action.Direction = direction;

	locationL = new Object();
	locationL.Path = pathLeft;
	locationL.DeviceId = deviceIdLeft;
	action.LocationLeft = locationL;

	locationR = new Object();
	locationR.Path = pathRight;
	locationR.DeviceId = deviceIdRight;
	action.LocationRight = locationR;

	browse.Action = action;

	if(g_managementType == "ModelManagement"){
		modelManagement = new Object();
		modelManagement.Browse = browse;
		InitDataPostArgs.ModelManagement = modelManagement;
	}
	else if(g_managementType == "FilemanagerAudio"){
		filemanagerAudio = new Object();
		filemanagerAudio.Browse = browse;
		InitDataPostArgs.FilemanagerAudio = filemanagerAudio;
	}
	else if(g_managementType == "FilemanagerImage"){
		filemanagerImage = new Object();
		filemanagerImage.Browse = browse;
		InitDataPostArgs.FilemanagerImage = filemanagerImage;
	}
	else if(g_managementType == "FolderPreflightCheckList"){
		filemanagerPreFlight = new Object();
		filemanagerPreFlight.Browse = browse;
		InitDataPostArgs.FolderPreflightCheckList = filemanagerPreFlight;
	}
	else if(g_managementType == "CustomTelemetryScreens"){
		filemanagerTeleScreen = new Object();
		filemanagerTeleScreen.Browse = browse;
		InitDataPostArgs.CustomTelemetryScreens = filemanagerTeleScreen;
	}
	else{
		InitDataPostArgs.Browse = browse;
	}

	return InitDataPostArgs;
}



function onEVENT_INIT(e){
	try{

	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){
	
	if(cmd == "telemetry"){
		if(key == g_telemetry_MEASValue_GeneralProgress){
			if(g_isInProgress){
				setHTML('Dialog_Box_Progressbar_Value', valueStr);
				setCSS('Dialog_Box_Progressbar', 'width', valueStr);
			}
		}
	}
}


function onEVENT_SET(e){
	try{
		if(e.EventData.error.code == 0){
			if(g_managementType == "ModelManagement"){
				eventObj = e.EventData.ModelManagement;
				
				
			}
			else if(g_managementType == "FilemanagerAudio"){
				eventObj = e.EventData.FilemanagerAudio;
			}
			else if(g_managementType == "FilemanagerImage"){
				eventObj = e.EventData.FilemanagerImage;
			}
			else if(g_managementType == "FolderPreflightCheckList"){
				eventObj = e.EventData.FolderPreflightCheckList;
			}
			else if(g_managementType == "CustomTelemetryScreens"){
				eventObj = e.EventData.CustomTelemetryScreens;
			}
			else{
				eventObj = e.EventData;
				
				
			}
	
			if(e.cmd == (g_managementType + "__init_device")){
				if(g_managementType == "ModelManagement"){
					list = new Array ({"Index": -1, "Name":"BAT Model"});
					setDeviveList(list, true);
				}
				else if(g_managementType == "FilemanagerAudio"){
					list = new Array ({"Index": -1, "Name":"BAT Audio"});
					setDeviveList(list, true);
				}
				else if(g_managementType == "FilemanagerImage"){
					list = new Array ({"Index": -1, "Name":"BAT Image"});
					setDeviveList(list, true);
				}
				else if(g_managementType == "FolderPreflightCheckList"){
					list = new Array ({"Index": -1, "Name":"BAT Preflight CheckList"});
					setDeviveList(list, true);
				}
				else if(g_managementType == "CustomTelemetryScreens"){
					list = new Array ({"Index": -1, "Name":"BAT Custom Telemetry Screens"});
					setDeviveList(list, true);
				}
				else{
					setDeviveList(e.EventData.DeviceList.Devices, true);
				}
	
				if(g_isManager){
					setDeviveList(eventObj.DeviceList.Devices, false);
				}
	
				GetTd(getBrowseObject(InitDataPostArgs, 1, true, g_currentDeviceID["Left"], g_currentPath["Left"]), g_SetEvent, g_managementType + "__init_left");
			}
			else if(e.cmd == (g_managementType + "__init_left")){
				getList(eventObj.Browse, true);
	
				if(g_isManager){
					GetTd(getBrowseObject(InitDataPostArgs, 1, false, g_currentDeviceID["Right"], g_currentPath["Right"]), g_SetEvent, g_managementType + "__init_right");
				}
			}
			else if(e.cmd == (g_managementType + "__init_right")){
				getList(eventObj.Browse, false);
			}
			else if((e.cmd == (g_managementType + "__goto")) || (e.cmd == (g_managementType + "__remove")) || (e.cmd == (g_managementType + "__change_device")) || (e.cmd == (g_managementType + "__add"))){
				if(e.cmd == g_managementType + "__remove"){
					if(g_CopyRemoveStack.length > 0){
						deleteItem();
					}
					else{
						getList(eventObj.Browse, g_isPageFocusLeft);

						if((g_currentDeviceID["Left"] ==  g_currentDeviceID["Right"]) && (g_currentPath["Left"] == g_currentPath["Right"])){
							var oppositeObj = {};
							if(g_isPageFocusLeft){
								oppositeObj["LocationRight"] = eventObj.Browse.LocationLeft;
							}
							else{
								oppositeObj["LocationLeft"] = eventObj.Browse.LocationRight;
							}
							getList(oppositeObj, !g_isPageFocusLeft);
						}
						g_isInProgress = false;
						$('#Dialog_Outter').remove();
					}
				}
				else if(e.cmd == g_managementType + "__change_device"){
					var side = "Right";
					if(g_isPageFocusLeft){
						side = "Left";
					}
					g_currentPath[side] = g_rootDirectory;
					getList(eventObj.Browse, g_isPageFocusLeft);
				}	
				else{
					getList(eventObj.Browse, g_isPageFocusLeft);
				}

				g_isDbClickFinished = true;
			}
			else if(e.cmd == (g_managementType + "__copyMove")){
				if(g_CopyRemoveStack.length > 0){
						CopyItem();
				}
				else{
					getList(eventObj.Browse, true);
					getList(eventObj.Browse, false);
					g_isInProgress = false;
					$('#Dialog_Outter').remove();
				}
			}
			else if(e.cmd == "set"){
				window.location.href = g_lastURL;
			}
		}
		else{
			g_isInProgress = false;
			onError(e, e.EventData.error.text, true);
		}
	}catch(err){
		g_isInProgress = false;
		onError(err, "Error Setdata: ", false);
	}
}


function setDeviveList(devices, isLeft){
	if(isLeft){
		side = "Left";
	}
	else{
		side = "Right";
	}

	g_deviceArray[side] = devices;

	htmlDeviceRowPath = '';
	htmlDeviceRowOption = '';

	if(g_isManager){
		classFolderHeader = "";
	}
	else{
		classFolderHeader = "folder_header_browser";
	}

	if(devices.length > 0){
		g_currentDeviceID[side] = devices[0].Index;
		htmlDeviceRowPath = '<a id="PathURL__' + devices[0].Index + '_Left" class="' + classFolderHeader + '" draggable="false">' + devices[0].Name + '</a>' +
							'<div id="Drop_Down_Arrow" class="drop_down_arrow" onClick=\' toggleDropdown("' + side + '");\'>' +
								'<div class="icon_drop_down_arrow_down"></div>' +
							'</div>';

		if(devices.length > 1){
			for(var i = 1; i < devices.length; i++){                     
				htmlDeviceRowOption += '<div id="Option__' + devices[i].Index + ' _Left" onClick=\' changeDevice("Option__' + devices[i].Index + '_' + side + '");\'>' + devices[i].Name + '</div>';
			}
		}
	}

	setHTML('Path_' + side, htmlDeviceRowPath);
	setHTML('Path_' + side + '_DropDown', htmlDeviceRowOption);
}

function getList(obj, isLeft){
	htmlDirectoryUpArrow = '';
	htmlDirectoryRow = '';
	htmlFileRow = '';
	locationSide = '';
	
	if(isLeft){
		dirs = obj.LocationLeft.Struct.Dirs;
		files = obj.LocationLeft.Struct.Files;
		locationSide = "Left";
	}
	else{
		dirs = obj.LocationRight.Struct.Dirs;
		files = obj.LocationRight.Struct.Files;
		locationSide = "Right";
	}

	g_tagObj[locationSide] = {};
	
	if(g_isManager){
		classFileName = "";
	}
	else{
		classFileName = "file_name_browser";
	}

	if(!isLeft || (g_managementType != "ModelManagement"))
		htmlDirectoryUpArrow += '<div class="list_content_row" onClick=\' setPageFocus("PathUp__Arrow_' + locationSide +'");\'>' +
								'<div id="PathUp__Arrow_' + locationSide +'" class="file_icon">' +
									'<img width="29" height="29" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADrSURBVHja7JfRDYQgDIahuVdfGMRNvGHvZnABB/GFAbAkkHhIQVqiD16TJhCQz1b8Kdo5p642UDfYKza01rW5A/qIbkJ/RV/Qre+0ZOxspClQhfYYxrqn9weIEX28S8DQCowDKRg/z9ADSgKlYOACJWCQALlgkAI5YOgBbAXvoSIgBa5BxUACTMtgkDWDKXkXFsla7pndmsVIF2oS06I2FyP1wj0n41NjWr9Np0wPwzRPVMT4QvbK8/Swi7tEWtpoYZOZ2yuHP/R50LUic7z/OZaORAmaqwJZkoic+WyktoMmHzRYP+ZasQkwAASDe4U4DjDrAAAAAElFTkSuQmCC" alt="" draggable="false"/>' +
								'</div>' +
								'<div id="PathUp__Name_' + locationSide +'" class="file_name ' + classFileName + '">' +
									'..'  + g_currentPath[locationSide] +
								'</div>' +
							'</div>';

	setHTML('scrollContainerInnerVertical_' + locationSide, htmlDirectoryUpArrow);

	if(typeof dirs == "undefined"){
		dirs = 0;
	}

	if(dirs.length > 0){
		for(var i = 0; i < dirs.length; i++){
			htmlDirectoryRow += '<div id="Directory__' + i + '_' + locationSide + '_row" class="list_content_row" onClick=\' setPageFocus("Directory__' + i + '_' + locationSide + '");\'>' +
									'<div id="Left_File_X_Icon" class="file_icon">' +
										'<img width="29" height="29" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC1SURBVHjaYvz//z8DvQETwwCAAbGUBUQwMjIii/ECsR4QC+HQ8w6ILwHxZ5gAqVGE7lNCFjJA5fSgaskCjCBXQn2KYmFM1cxN2DQsaUv3Q/cxqT6FWUqUhVgsJhaAHQi06zNy8BJtIbFqsEUJ1HNwn/qSaRhRADlKgPYdpUuWQfKM0MgqHEYtHbV01NJRS0cthVey5FTOJFdtOFsONALw1gPMp5+h7Z13tLYQ7tPR1EsrABBgAKADUMGaZG2qAAAAAElFTkSuQmCC" alt="" draggable="false"/>' +
									'</div>' +
									'<div id="Directory__' + i + '_' + locationSide + '" class="file_name ' + classFileName +'">' +
										dirs[i] +
									'</div>' +
								'</div>';
			g_tagObj[locationSide]['Directory__' + i + '_' + locationSide] = {};
			g_tagObj[locationSide]['Directory__' + i + '_' + locationSide].selected = false;
			g_tagObj[locationSide]['Directory__' + i + '_' + locationSide].timer = 0;
		}
	}

	$('#scrollContainerInnerVertical_' + locationSide).append(htmlDirectoryRow);

	if(typeof files == "undefined"){
		files = 0;
	}
	else{
		if(files == null){
			files = 0;
		}
	}

	if(files.length > 0){
		for(var i = 0; i < files.length; i++){
			imageType = extension2Image(i, files);

			htmlFileRow += '<div id="File__' + i + '_' + locationSide + '_row" class="list_content_row" onClick=\' setPageFocus("File__' + i + '_' + locationSide + '");\'>' +
								'<div id="Left_File_X_Icon" class="file_icon">' +
									'<img width="29" height="29" src="' + imageType + '" alt="" draggable="false"/>' +
								'</div>' +
								'<div id="File__' + i + '_' + locationSide + '" class="file_name ' + classFileName + '">' +
									files[i] +
								'</div>' +
							'</div>';
			g_tagObj[locationSide]['File__'+ i + '_' + locationSide] = {};
			g_tagObj[locationSide]['File__'+ i + '_' + locationSide].selected = false;
		}
	}

	$('#scrollContainerInnerVertical_' + locationSide).append(htmlFileRow);

	ScrollFMRefresh(locationSide);
}


function submitSET(tagId, value){
	if(g_isPageFocusLeft){
		side = "Left";
	}
	else{
		side = "Right";
	}

	setHTML(tagId, "");
	addPath = g_currentPath[side] + value;
	GetTd(getBrowseObject(InitDataPostArgs, 4, g_isPageFocusLeft, g_currentDeviceID[side], addPath), g_SetEvent, g_managementType + "__add");
}

function toggleDropdown(side){
	setPageFocus("Path__Device_" + side);

	
	if(g_isPageFocusLeft){
		$('#Path_Left_DropDown').toggle();
	}
	else{
		$('#Path_Right_DropDown').toggle();
	}
}


function extension2Image(i, files){
	indexOfExtension = files[i].lastIndexOf(".");

	if(indexOfExtension != -1){
		extension = files[i].substring(indexOfExtension+1, files[i].length);

		for(key in g_FileType){
			for(var j = 0; j < g_FileType[key].length; j++){
				if(extension == g_FileType[key][j]){
					
					switch (key){
						case "Music": 		imageType =  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIaSURBVHjavJZJi+pAFIVPNDiPUVwJIrgTsxb8Aa6e+E+FB4K4detKEV044LQRjUNEcH65RUfy7NBt0mUfKMRo6qtzp0S43+/QJQhCUPuQtSXhNSnaamlLpS/Gvb6S8AQtWAAawZJ+AG0/1Sr0z8eJ/750YkEomTn/DuwABxkOSY7ljzS9F2oVzA1qBcwVagb+FagJ+JNEHhCTKn5UM4X4uZrf4tQg0xCLPMJ4uVyw3W4RiUTgdDqfIyBxzenxeMRisUC73Ua1WsVqtXrpPtGGO+z3e+x2O4xGI3Q6HfR6PRwOB+TzeSQSCb5QVVUxmUwYjNyNx+OXh7wtKG0+m81QqVQwnU4f18mZLMvodrvwer38odfrleVNFEWk02nkcjmkUikEg0H0+304HA7+OSWwy+VCsVhk7sLhMHw+H+bzOfvt1VBbLiRqiWg0ing8zg5gR7b69Ha7PZxTf2r9+Fhvg5Iov4PBgFWxoihYr9c4nU58oeTOOG2odWq1GutRXefzmQ+UYOSEIDQUKKQEp2FgBHLN6XK5RL1eR7PZZGOP2oVy5/F4kEwmWe+SMpkMAoEAH+hms0Gj0fgvhJRPApbLZZZXt9vN+pZa6C2FFIvFmCO/349sNsuGA4Wb+pVb9dLjigb5cDhk/VkoFJhLffqEQiH+OZUkCaVSiRURDQN9Cv1Eotnb+hevH3akfPcQb5n96YfA1vPFfwIMAIeqBdIhxGVMAAAAAElFTkSuQmCC"; break;
						case "Image":		imageType =  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG0SURBVHja7JfNqoJAFMePcrdu2rvoBS7hA/QG967a+1rhPqJNC6UXSKQgkJhaW9CihSCRtCrqzhmcbthcdUZrdf9w0FPqb86XTdrtdgMuTdMMevik1oJqSqgRaik6j88q0kfOlwFCdi2/J6GLJhScykJb2YrdKkQK+X5YJFtAFbAODehhkRxsvBwqC24MKgNuFCoCvwUqAJd2r5KyLhbOMaY4380viVQwx81FWjbPuTl+W6Twtkb6h5Y20mazgel0CsvlEjqdDnS7XWi326+FInA2m7FzfsxDV6sVnM9nsCyrmfRihEX+9XqF8XgMw+EQTqdTM1BMaZHv+z7s93tI0xQGgwFMJhPY7Xb10os15BHymnJhZK77+14Iw5AZfm6apjoU64dm2/bTdwgUpXSxWECv1wNd1+uPTBAELH2oOI6ZLxKmmhCiHilXFEWsWS6XC/O32+39XKT5fP5Ufyno8XgEx3HuEM/zSqNYr9csYsMw5NOLoH6/D4fDQWoc8D6srVJNR6MRS62K+Mvkz5+83A7/S2bfW3VHQZ/nFdUU/ya0CrYfKkrK0ktEF9UEPs3QjwADAL9a2N+mlVd9AAAAAElFTkSuQmCC"; break;
						case "Model": 		imageType =  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHcSURBVHjavJe7isJAFIb/xIigRFEQrMQnCNhYCXZ2uwiWPoGND+FL6HNsWjsLW4l21haiqLioeN85gxGZjZfESQ4cYmLMd/5zyYzK5XKBbYqi6OxgME/hPZszt5j/0sn9s56ZJpy7AeJ6r/2bOQvaYuBft9DUNeKfd4gM8n0XJA/gHbAKCXYXpA3WfYe6BUuDugFLhTqBA4E6gF92rye7drHjHFOKxW72RanDHMtT+mqehTkOTCk+rmm9Xr+9X+0jU4N2u+0ftNVqSVHqOr2j0YgrbjQaWK1WwUAnkwnO5zP2+z3G47HcmjabTcxmM7EbcTqdbjWldNM1cR0tlUqoVqvuoZS63W73NOJH32+3W29KK5UKT990OsViscByucR6vf6nKhQKIRaLIZlMck+n0zAMwxu0WCzePh+PR2w2Gw62LAumaXJYrVZDLpdDIpFANBqFqqryRkbTNMTjce7ZbJZDdV1HoVBAOBz2v3vtIEgZNVEgI0NGNSSlBA8MSnY4HHiNPS2Fwr7369HqQW+iTqeD4XDIG4uMUpzP51Eul5HJZB6us+x5piel3W4Xg8EAkUiEp5acrNfrod/v+6P0kx2FqFRz+JuQerL98GLzV41kOd30IdASL/4JMAA+ps6/IXTsHAAAAABJRU5ErkJggg=="; break;
						case "Log": 		imageType =  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADqSURBVHjaYvz//z8DDDAyMvICKT0gFmIgDrwD4ktA/BnEQTYLH2BEs9SaBAuRLRaCOQBo3mdSLfWFungTUS5mZPTD5nNCFjMxUAEgORLkYz1oNNHWUlItppqlpFhMVUuxWUwXS7FYjAFYqGEJllQMT82gIEZPzTTxKRLAGsQsVApGfCEgRJc4JQTw+rStrY3h4cOHYLa8vDxDVVUVVSwdEJ8OvuCFJgaMIH/06BGYLScnR1aQjwYvSYDUIB85wTtq6ailVAEUtXuJbVEAzduMr3AAt9bxND/IAe8IBe8lbIootPASuiBAgAEAoSZgN4+qjkMAAAAASUVORK5CYII="; break;
						case "Setting": 	imageType =  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALfSURBVHjavJZNS2pRFIbfYxpJSGFS2scgocJAwQYRCYFgFOV1kJNG/YYm0g9o0CyQfkneQhxG2KBBxIk0/AoSjD60D0XDQd2zFhVmmkc93Rc2evY57Gevtd+19xbe3t7wIUEQdNKPTWp6yFNOaqLU8vRQOdZPEqqgjiaAlWD9xwSk8fLNQv+8zzgga8aC4KkVeSOwCgqoYpIUse19mX4X2ixYMWgzYEWhtcD/BVoD/E1qJSA1XPzpZkpxtZt/JdIK1Uxxw0jD4TD0ej0ikQhWVlbw+vqKjo4OyKnn9wzoZUPv7+9xcnLC0JubG3R1deHq6gpLS0uYmJhoK/y60JeXFwSDQRSLRVgsFp7ExcUF+vv70d3djeHh4Zahddd0f3+fwQsLC1hfX8fGxgbDRFFEZ2dnW5HWhY6OjvL6aTQafiYQNerLZrOf2Ugmk9ynSHolE2BwcBB7e3u4vb3F3d0dHh4e4HK5eG0JSJPY2dnB5uYmTk9PYTAYYLfbW4fOz88jk8lApVLh+PiY+2ZmZjgDiUQCgUAAOp2Oz1C/38+TWltba+k8/XK0UTQEJghFEY1GUSqVkMvlOK3Vstls/N7j8WB8fPxz05DG+yu7TqlMzGYzN5LJZML29jaen5+hVqu5fChyKq3Dw0M2GX1L37WU3mpRBKlUClqtlqFOpxPLy8v8bnJykqM/Pz/ndY7H45iammr/PH16esLu7i6bijQ0NPTl/cDAAP/GYjGEQqHWSqZaNCi5lNJJonTSxkG6vr5m95IcDgd8Pp8y6aUSOjo6wuXlJf8nI21tbcFoNHLaC4UC95PTp6en2UiKXMzS6TQeHx9xdnaGg4ODb+9XV1fR09PDZurt7a3r3qaOtpGREVitVuTzeYyNjWFubo773W43+vr6UC6X2UAEVCS9lfJ6vexiMhftTouLi5idnZW9J7d175V7o2i0OfBt/YfrRyvKNSoZsdZHbQLF6s5/AgwASCVYiXMci9QAAAAASUVORK5CYII="; break;
					}

					return imageType;
				}
			}
		}
	}

	imageType = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACtSURBVHja7NdRCoAgDADQGf7240E6SoftKB6knw5gCxRijNZM7WcDicJ6W2xQLqUEJZxzMx4WXAHexY4r4jMOUIQn5xoQ8t4Fkw2aBDzzEMAbtzciYustyZKACE/QIG5JFnjujmrhZqgGbopy8BCUgcXurYrcxewcX6+YdnOXSukcN61Ummcyx8MqhWGNZKihhhpqqKH/oZ75TQgPnx81sUuVRm7TRzDSi6cAAwAJGzusTNCawgAAAABJRU5ErkJggg==";

	return imageType;
}


function setPageFocus(tagId){
	tagArray = tagId.split('__');
	itemType = tagArray[0];
	side = tagArray[1].split('_')[1];

	currentDevice = g_currentDeviceID[side];
	currentPath = g_currentPath[side];

	
	switch(side){
		case "Left":	g_isPageFocusLeft = true;
						$('#Path_Right').removeClass('button_white').addClass('button_blue');
						$('#Path_Left').removeClass('button_blue').addClass('button_white');
						$('#Copy_Button').removeClass('arrow_left').addClass('arrow_right');
						break;
		case "Right":	g_isPageFocusLeft = false;
						$('#Path_Left').removeClass('button_white').addClass('button_blue');
						$('#Path_Right').removeClass('button_blue').addClass('button_white');
						$('#Copy_Button').removeClass('arrow_right').addClass('arrow_left');
						break;
		default:		g_isPageFocusLeft = true;
						$('#Path_Right').removeClass('button_white').addClass('button_blue');
						$('#Path_Left').removeClass('button_blue').addClass('button_white');
						$('#Copy_Button').removeClass('arrow_left').addClass('arrow_right');
	}

	
	if(itemType == "PathUp"){
		if(currentPath != g_rootDirectory){
			currentPath = currentPath.substring(0, currentPath.length-1);
			currentPath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
			GetTd(getBrowseObject(InitDataPostArgs, 1, g_isPageFocusLeft, currentDevice, currentPath), g_SetEvent, g_managementType + "__goto");
		}
	}

	var timerCurrent = new Date();
	var ms = timerCurrent.getMilliseconds();

	
	if(itemType == "Directory"){



		if(((timerCurrent - g_tagObj[side][tagId].timer) < 3000) && ($('#' + tagId + '_row').hasClass('selected')) && g_isDbClickFinished){
			g_isDbClickFinished = false;
			currentPath+=getHTML(tagId) +"/";
			GetTd(getBrowseObject(InitDataPostArgs, 1, g_isPageFocusLeft, currentDevice, currentPath), g_SetEvent, g_managementType + "__goto");
			g_tagObj[side][tagId].timer = timerCurrent;
			g_majorSelected = "";
		}
		else{
			g_tagObj[side][tagId].timer = timerCurrent;
			









	
			
			
				for(tagIdkey in g_tagObj[side]){
					if(g_tagObj[side][tagIdkey].selected){
						$('#' + tagIdkey + '_row').removeClass('selected');
						g_tagObj[side][tagIdkey].selected = false;
					}	
				}
			

			selectSingle(tagId, side);
		
			g_majorSelected = tagId;
		}
	}

	
	if(itemType == "File"){
		if(!g_isManager && ((timerCurrent - g_tagObj[side][tagId].timer) < 3000) && ($('#' + tagId + '_row').hasClass('selected'))){


			g_tagObj[side][tagId].timer = timerCurrent;
			g_majorSelected = "";


			if(g_fromPage == "updateRx"){
				window.location.href = g_lastURL + "?fileName=" + getHTML(tagId) + "&deviceId=" + g_currentDeviceID.Left + "&filePath=" + g_currentPath.Left + "&RxType=" + g_RxType;
			}
			else{
				xmlObj = setSavePathObj(g_savePathObj, g_searchKeyNode, getHTML(tagId));
				GetTd(xmlObj, g_SetEvent, "set");
			}
		}
		else{
			g_tagObj[side][tagId].timer = timerCurrent;

			if(g_isManager){
		
				
				if(g_majorSelected.split('__')[0] == "Directory"){
					selectSingle(tagId, side);
				}
				else{
					if(g_tagObj[side][tagId].selected){
						$('#' + tagId + '_row').removeClass('selected');
						g_tagObj[side][tagId].selected = false;
					}
					else{
						$('#' + tagId + '_row').addClass('selected');
						g_tagObj[side][tagId].selected = true;
					}
				}	
			}
			else{
		
				selectSingle(tagId, side);
			}

			g_majorSelected = tagId;
		}
	}

	g_currentPath[side] = currentPath;
}

function selectSingle(tagId, side){
	if(g_majorSelected == tagId){
		if($('#' + tagId + '_row').hasClass('selected')){
			$('#' + tagId + '_row').removeClass('selected');
			g_tagObj[side][tagId].selected = false;
		}
		else{
			$('#' + tagId + '_row').addClass('selected');
			g_tagObj[side][tagId].selected = true;
		}
	}
	else{
		if(g_majorSelected != ""){
			var majorSelectedArray = g_majorSelected.split('__');
			var majorSelectedType = majorSelectedArray[0];
			var majorSelectedSide = majorSelectedArray[1].split('_')[1];
			if((majorSelectedSide == side) || (majorSelectedType == "Directory")){
				$('#' + g_majorSelected + '_row').removeClass('selected');
				g_tagObj[majorSelectedSide][g_majorSelected].selected = false;
			}
		}
		$('#' + tagId + '_row').addClass('selected');
		g_tagObj[side][tagId].selected = true;
	}
}


function changeDevice(tagId){
	tagArray = tagId.split('__');
	deviceId = parseInt(tagArray[1].split('_')[0]);
	side = tagArray[1].split('_')[1];

	
	GetTd(getBrowseObject(InitDataPostArgs, 1, g_isPageFocusLeft, deviceId, "/"), g_SetEvent, g_managementType + "__change_device");

	
	newDeviceList = new Array();
	var j = 1;

	for(var i = 0; i < g_deviceArray[side].length; i++){
		if(g_deviceArray[side][i].Index == deviceId){
			newDeviceList[0] = g_deviceArray[side].slice(i)[0];
		}
		else{
			newDeviceList[j] = g_deviceArray[side][i];
			j++;
		}
	}

	g_deviceArray[side] = newDeviceList;
	setDeviveList(g_deviceArray[side], g_isPageFocusLeft);

	
	$('#Path_' + side + '_DropDown').hide();
}


function setCopyRemoveStackArray(cmd){
	g_CopyRemoveStackCount = 0;
	g_CopyRemoveStack = [];
	
	
	if(g_isPageFocusLeft){
		side == "Left";
	}
	else{
		side == "Right";
	}
	for(tagIdkey in g_tagObj[side]){
		if(g_tagObj[side][tagIdkey].selected){
			if((tagIdkey.split('__')[0] == "File") || (cmd == "del")){
				g_CopyRemoveStack[g_CopyRemoveStackCount] = tagIdkey;
				g_CopyRemoveStackCount++;
			}
		}
	}
}


function CopyItem(){
	
	
	if(g_CopyRemoveStack.length > 0){
		
		
		
		
		itemType = g_CopyRemoveStack[g_CopyRemoveStack.length - 1].split('__')[0];
		var selectedItem = getHTML(g_CopyRemoveStack[g_CopyRemoveStack.length - 1]);

		var copyPathFrom = "";
		var copyPathTo = "";

		if(g_isPageFocusLeft){
			direction = 0;
			copyPathFrom = getHTML('PathURL__' + g_currentDeviceID["Left"] + '_Left') + g_currentPath["Left"];
			copyPathTo = getHTML('PathURL__' + g_currentDeviceID["Right"] + '_Left') + g_currentPath["Right"];
			copyMovePathLeft = g_currentPath["Left"] + selectedItem;
			copyMovePathRight = g_currentPath["Right"];
		}
		else{
			direction = 1;
			copyPathTo = getHTML('PathURL__' + g_currentDeviceID["Left"] + '_Left') + g_currentPath["Left"];
			copyPathFrom = getHTML('PathURL__' + g_currentDeviceID["Right"] + '_Left') + g_currentPath["Right"];
			copyMovePathLeft = g_currentPath["Left"];
			copyMovePathRight = g_currentPath["Right"] + selectedItem;
		}

		if(itemType != "Directory"){






			var htmlCopyDialog = 	'<div id="Dialogbox_Text" class="dialogbox-text" style="min-width: 430px;">' +
										'<div style="width: 100%; text-align: left; max-height: 114px; overflow: hidden; text-overflow: ellipsis;">Copying ' + g_CopyRemoveStackCount + ' items from <span style="color:#7ea4c9;">' + copyPathFrom + '</span> to <span style="color:#7ea4c9;">' + copyPathTo + '</span> in progress...' +
										'</div>' +	
										'<div style="width: 98.5%; height: 50px; margin-top: 25px; border: solid 4px #fff; border-radius: 5px;">'+
											'<div id="Dialog_Box_Progressbar" style="width: 0%; height: 100%; background: rgba(96, 153, 240, .7);"></div>' +
										 '</div>' +
										 '<div id="Dialog_Box_Progressbar_Value" style="font-weight: bold; width: 100%; text-align: center; margin-top: -43px;">0%</div>' +
										 '<div style=" width: 100%; text-align: left; margin-top: 10px;  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Name: ' + selectedItem + '</div>' +
										 '<div style=" width: 100%; text-align: left; margin-top: 10px;">Items remaining: ' + g_CopyRemoveStack.length + '</div>' +
									 '</div>';
			showDialogbox("actionWait", htmlCopyDialog);
			g_isInProgress = true;
			g_CopyRemoveStack.pop();
			GetTd(getBrowseCopyMoveObject(InitDataPostArgs, 3, direction, g_currentDeviceID["Left"], g_currentDeviceID["Right"], copyMovePathLeft, copyMovePathRight), g_SetEvent, g_managementType + "__copyMove");
		}
	}
}


function AddItem(count){
	
	showKeypad('KeyPad_Temp');
}


function deleteItem(){
	
	
	if(g_CopyRemoveStack.length > 0){
		if(g_isPageFocusLeft){
			side = "Left";
		}
		else{
			side = "Right";
		}
		
		
		var selectedItem =  getHTML(g_CopyRemoveStack[g_CopyRemoveStack.length - 1]);
		removePath = g_currentPath[side] + selectedItem;

		var htmlDeleteDialog = 	'<p style="text-align: left">' + 'Entfernen' + ' ' + selectedItem + ' ' + 'wird durchgeführt...' + '</p>' + 
								'<p style="text-align: left">' + 'Von:' + ' '  + getHTML('PathURL__' + g_currentDeviceID[side] + '_Left') + g_currentPath[side]; + '</p>';
		showDialogbox("actionWait", htmlDeleteDialog);
		g_isInProgress = true;
		delete g_tagObj[side][g_CopyRemoveStack[g_CopyRemoveStack.length - 1]];
		g_CopyRemoveStack.pop();
		GetTd(getBrowseObject(InitDataPostArgs, 5, g_isPageFocusLeft, g_currentDeviceID[side], removePath), g_SetEvent, g_managementType + "__remove");
	}
}


function setSavePathObj(jsonObj, searchKey, value){
	for(var key in jsonObj){
		if(key == searchKey){
			jsonObj[key] = value;

			return jsonObj;
		}

		if(key == 0){
			return;
		}

		setSavePathObj(jsonObj[key], searchKey, value);
	}

	return jsonObj;
}


function initScrollbarsFM(){
	(function($){
		if(isBAT){

			$('#List_Container_Left').mCustomScrollbar();
			$('#List_Container_Right').mCustomScrollbar();

			
			
			isInit  = true;
			maxPaddingPopUp = 0;

			var topValue  = 0,
				leftValue = 0;

			$(window).keypress(function (e){
				if(g_isPageFocusLeft){
					
					fixedContainerHeight  = $('.scrollContainerLeft').innerHeight();
					scrollContainerHeight = $('#scrollContainerInnerVertical_Left').innerHeight();
				}
				else{
					
					fixedContainerHeight  = $('.scrollContainerRight').innerHeight();
					scrollContainerHeight = $('#scrollContainerInnerVertical_Right').innerHeight();
				}

				maxPaddingNoPopUp = (scrollContainerHeight - fixedContainerHeight) * (-1);
				
				max = false;
				min = false;
				maxLeft = false;
				minLeft = false;

				if(!g_isPopUp){
					maxPadding = maxPaddingNoPopUp;
				}

				var char = e.charCode;

				
				if((char == CONST_SCROLLING_Key_g) || (char == CONST_SCROLLING_Key_h) || (char == CONST_SCROLLING_Key_j)){
					
					min = false;

					switch(char){
						case CONST_SCROLLING_Key_g : 	topValue += CONST_SCROLLING_StepSmall;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepSmall;		break; 
						case CONST_SCROLLING_Key_h : 	topValue += CONST_SCROLLING_StepMiddle; CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepMiddle;	break; 
						case CONST_SCROLLING_Key_j : 	topValue += CONST_SCROLLING_StepBig;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepBig;		break; 
					}

					if(topValue > 0){
						topValue = 0;
					}
					else{
						max = false;
					}

					if(!max){
						if(g_isPageFocusLeft){
							animateScrollbar(topValue, CONST_SCROLLING_AnimationSpeed, 'Left');
						}
						else{
							animateScrollbar(topValue, CONST_SCROLLING_AnimationSpeed, 'Right');
						}


						if(topValue == 0){
							max = true;
						}
					}
				}

				if((char == CONST_SCROLLING_Key_b) || (char == CONST_SCROLLING_Key_n)|| (char == CONST_SCROLLING_Key_m)){
					
					max = false;

					switch(char){
						case CONST_SCROLLING_Key_b : 	topValue -= CONST_SCROLLING_StepSmall;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepSmall;		break; 
						case CONST_SCROLLING_Key_n : 	topValue -= CONST_SCROLLING_StepMiddle;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepMiddle;	break; 
						case CONST_SCROLLING_Key_m : 	topValue -= CONST_SCROLLING_StepBig;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepBig;		break; 
					}

					if(topValue < maxPadding){
						topValue = maxPadding;
					}
					else{
						min = false;
					}

					if(!min){
						if(g_isPageFocusLeft){
							animateScrollbar(topValue, CONST_SCROLLING_AnimationSpeed, 'Left');
						}
						else{
							animateScrollbar(topValue, CONST_SCROLLING_AnimationSpeed, 'Right');
						}

						if(topValue == maxPadding){
							min = true;
						}
					}
				}
				
			});
		}
		else{
			
			


				$('#List_Container_Left').mCustomScrollbar();
				$('#List_Container_Right').mCustomScrollbar();





		}
	})(jQuery);
}


function animateScrollbar(topValue, animationSpeed, side){
	var dragrailHeight;

	if(side == "Left"){
		dragrailHeight = $('#scrollTool_1').height();
	}
	else if(side == "Right"){
		dragrailHeight = $('#scrollTool_2').height();
	}

	var totalHeight = $('#scrollContainerInnerVertical_' + side).height();
	var getHeight_ratio = dragrailHeight/totalHeight;

	$('#scrollContainerInnerVertical_' + side).animate({'top': topValue + 'px'}, animationSpeed);
	$('.scrollContainer' + side).find('.mCSB_dragger').animate({'top': (topValue * getHeight_ratio * (-1)) + 'px'}, animationSpeed);
}


function ScrollFMRefresh(side){
	$('#List_Container_' + locationSide).mCustomScrollbar("update");
	$('#scrollContainerInnerVertical_' + side).css({'top': '0px'});

	g_PageRefreshed = true;
}
