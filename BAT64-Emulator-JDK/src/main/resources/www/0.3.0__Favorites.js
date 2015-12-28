


var g_List_Count = 0;		
var g_List_Indices = [];	
var toggleStateARD = "normal";	

initPage();

function initPage(){
	

	GetTd(getCurrentModelName(InitDataPostArgs), g_InitEvent);


	setInterval(JsonFunction, 250);
	
}



function onEVENT_INIT(e){
	try{
		$('#Reorder_Button').bind("click", function(){toggleReorder();});
		$('#Delete_Button').bind("click", function(){toggleDelete();});
		$('#Navi_Button').removeAttr("href");
		$('#Navi_Button').bind("click", function(){toggleARD();});
		htmlFavContent = '';
		
		for(var i = 0; i < 12; i++){
			htmlFavContent+= getFavoriteRow(i);
			g_List_Indices[i] = i;
		}
		g_List_Count = g_List_Indices.length;
		$("#Mode_Content").html(htmlFavContent);
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}



function getFavoriteRow(Index){
	var ListType = "watwerbistdudenn";
	var Name = "guehnther";
	htmlFav = '' +
					'<div id="ContainerOuter_' + Index + '" style="width: auto; margin-bottom: 15px;">' +
						'<div id="Container_' + Index + '" class="list_content_row" style="width: auto; border: none;">' +
							'<div id="Favorite__' + Index + '" class="button_blue button_blue_extend"><a draggable="false">Fav 1</a></div>' +
							'<div id="Favorite__' + Index + '_Delete" class="button_blue button_blue_delete" style="display: none;"><a draggable="false">Fav 1</a></div>' +
						'</div>' +
						'<div id="Delete_Button_' + Index + '" class="button_red button_red_delete" style="display: none; margin: 4px 0px 0px 21px; width: 52px; height: 60px;"><a href="#" onClick=\'showDialogbox("delete", "' + ListType + '","' + Name + '",' + Index + ');\' class="delete_button" draggable="false"></a></div>' +
						'<script type="text/javascript">' +
							'if(toggleStateARD != "delete"){' +
								'$("#Delete_Button_' + Index + '").hide();' +
								'$("#Favorite__' + Index + '").show();' +
								'$("#Favorite__' + Index + '_Delete").hide();' +
							'}' +	
						'<\/script>' +
						'<div id="Reorder_Button_' + Index + '" class="button_blue round_all" style="display: none; margin: 4px 0px 0px 21px; width: 52px; height: 60px;"><a href="#" onClick="raiseElement(' + Index + ');" class="raise_button" draggable="false"></a></div>' + 
						'<script id="Reorder_Button_Script_' + Index + '" type="text/javascript">' +
							'if((toggleStateARD != "reorder") || (Index == 0))' +
								'$("#Reorder_Button_' + Index + '").hide();' +
						'<\/script>' +
					'</div>';
	return htmlFav;
}



function AddItem(count){
	submitARD("add", count);
}


function toggleDelete(){
	hideHTML("ARD_Buttons");


	
	for(var i = 0; i < g_List_Count; i++){
		showHTML("Delete_Button_" + g_List_Indices[i]);
		showHTML("Favorite__" + g_List_Indices[i] + "_Delete");
		hideHTML("Favorite__" + g_List_Indices[i]);
		hideHTML("Main_Footer");
		showHTML("Back_Footer");
	}	

	toggleStateARD = "delete";
}


function deleteItem(index){
	$("#ContainerOuter_" + index).remove();
		
	submitARD("remove", index);
	
	newIndices = [];
	var j = 0;
	
	for(var i = 0; i < g_List_Count; i++){
		if(g_List_Indices[i] != index){
			newIndices[j] = g_List_Indices[i];
			j++;
		}
	}
	
	g_List_Count--;
	g_List_Indices = newIndices;
	
	if(g_List_Count == 0){
		toggleARD("normal");
	}
	
	ScrollDownRefresh();
}


function toggleReorder(){
	hideHTML("ARD_Buttons");



	for(var i = 1; i < g_List_Count; i++)
		showHTML("Reorder_Button_" + g_List_Indices[i]);

	toggleStateARD = "reorder";
}


function raiseElement(Index){
	location.reload();
}


function toggleARD(){
	if(toggleStateARD == "delete"){
		for(var i = 0; i < g_List_Count; i++){
			hideHTML("Delete_Button_" + g_List_Indices[i]);
			hideHTML("Favorite__" + g_List_Indices[i] + "_Delete");
			showHTML("Favorite__" + g_List_Indices[i]);
			showHTML("Main_Footer");
			hideHTML("Back_Footer");
		}	


		showHTML("ARD_Buttons");
		toggleStateARD = "normal";	
	}
	else if(toggleStateARD == "reorder"){
		for(var i = 1; i < g_List_Count; i++){
			$("#Reorder_Button_" + g_List_Indices[i]).hide();
		}


		showHTML("ARD_Buttons");
		toggleStateARD = "normal";		
	}
}
