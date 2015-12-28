



var g_currentModel = "";
var g_ModelNameIndex = -1;
var g_ModelNameRemoveIndex = -1;
var g_listCount = 0;


initPage();

function initPage(){

	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);
	GetTd(getModelListObject(InitDataPostArgs, 1), g_InitEvent, "get");


	setInterval(JsonFunction, 250);
}



function getModelListObject(InitDataPostArgs, number){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	modelManagement = new Object();
	list = new Object();
	item = new Array();
	list.Items = item;
	list.New = number;

	modelManagement.List = list;

	InitDataPostArgs["ModelManagement"] = modelManagement;

	return InitDataPostArgs;
}


function onEVENT_INIT(e){
	try{
		if(typeof e.EventData.ModelName != "undefined"){
			g_currentModel = e.EventData.ModelName;
		}
		else{
			temp = 1;

			modelList = e.EventData.ModelManagement.List.Items;

			if( modelList.length != 0){

				for(var i = 0; i < modelList.length; i++){
					ModelIsValid = modelList[i].IsValid;
					ModelName = modelList[i].ModelName;

					if(ModelIsValid == 1){
						ModelIMG      = modelList[i].Image;
						ModelInfo     = modelList[i].InfoText;
						ModelType     = modelList[i].Type;
						ModelCategory = modelList[i].Category.Name;

						if(ModelIMG == ""){
							switch(ModelType){
								
								
								
								
								default:			ModelIMG = CONST_MODELICON_DEFAULT_small;
							}
						}
						else{
							ModelIMG = "user-space/image/" + ModelIMG;
						}
					}
					else{
						
						ModelIMG = "data:image/png;base64,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";
						ModelInfo = 'Modelldatei beschädigt!';
						ModelType = "--";
						ModelCategory = "--";
					}

					if(ModelName == g_currentModel){
						currentModelClass = "current_model";
						g_ModelNameIndex = i;
					}
					else{
						currentModelClass = "";
					}

					$('#scrollContainerInnerVertical').append(getRowOfModelList(g_listCount, ModelIMG, ModelName, ModelInfo, currentModelClass, ModelIsValid));
					g_listCount++;
				}

				if(e.EventData.ModelManagement.List.New == 1){
					initScrollbars('List_Container');
				}
				else{
					ScrollRefresh();
				}
				GetTd(getModelListObject(InitDataPostArgs, 0), g_InitEvent, "get");
			}
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function onEVENT_SET(e){
	try{
		if(e.cmd == "Remove"){
			removeTree(e.EventData);
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}



function getRowOfModelList(i, ModelIMG, ModelName, ModelInfo, currentModelClass){
	if(i != g_ModelNameIndex)
		htmlDeleteButton = '<div id="Delete_Button_' + i + '" class="button_red round_all" style="margin: 4px 0px 0px 21px; width: 52px; height: 60px;"><a href="#" onClick=\'showDialogbox("deleteModel", "' + 'Modell' + '", "' + ModelName + '", "' + i + '");\' class="delete_button"></a></div>';
	else
		htmlDeleteButton = '';

	var htmlInnerContainer = '' +
		'<div id="Container_' + i + '" style="width: 760px;">' +
			'<div class="list_content_row ' + currentModelClass + '" style="width: 677px;">' +
				'<div class="model_pic"><img id="Model__0_Pic" src="' + ModelIMG + '" width="54" height="54" alt="" draggable="false"/></div>' +
				'<div class="model_name">' + ModelName + '</div>' +
				'<div class="model_info">' + ModelInfo + '</div>' +
			'</div>' +
			htmlDeleteButton +
		'</div>';

	return htmlInnerContainer;
}


function removeTree(TdJson){
	$('#Container_' + g_ModelNameRemoveIndex).remove();
}


function submitSET(i, tagId){
	g_ModelNameRemoveIndex = i;
	cmd = "Remove";
	ModelName = "Name";

	xmlObj = {};
	xmlObj["ModelManagement"] = {};
	xmlObj["ModelManagement"][cmd] = {};
	xmlObj["ModelManagement"][cmd][ModelName] = tagId;

	GetTd(xmlObj, g_SetEvent, cmd);
}
