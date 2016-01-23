


var g_wifiActive = 0;
var g_isActiveConnection = -1;
var g_is_Selected = -1;

var g_List_Count = 0;			
var g_List_Indices = [];		
var toggleStateARD = "normal";	

var g_connectionCanvasObj = {};
var g_connectionCanvasUpdateObj = {};
var g_RSSI_Level = {};

initPage();

function initPage(){
	initScrollbars('List_Container');

	GetTd({"wlan":{"cmd":0x0414}}, g_InitEvent, "service");
	


	$('#WiFi_Status').bind('click', function(){toggleWiFiStatus();});
	$('#Scan_Button_Label').bind('click', function(){wlanScan();});
	$('#Connect_Button_Label').bind('click', function(){wlanConnect();});

	$('#Add_Button').bind("click", function(){AddItem(-1, "", 0);});
	$('#Reorder_Button').bind("click", function(){toggleReorder();});
	$('#Delete_Button').bind("click", function(){toggleDelete();});
	$('#Navi_Button').removeAttr("href");
	$('#Navi_Button').bind("click", function(){toggleARD('2.0__GeneralSettings.html');});



	setInterval(JsonFunction, 250);

}






function onEVENT_INIT(e){
	try{
		if(e.EventData.wlan.request.cmd == 1044){
			if(e.EventData.error.code == 0){
				if(e.EventData.wlan.result.IsWLAN_On == 1){
					$('#WiFi_Status_Img').show();
					g_wifiActive = 1;
					wlanScan();
					setHTML("WiFi_IP", e.EventData.wlan.result.IP);
				}
				else{
					$('#WiFi_Status_Img').hide();
					g_wifiActive = 0;
				}

			}
		}
		if(e.EventData.wlan.request.cmd == 1031){
			$('#Scan_Div').removeClass('inactive');
			if(e.EventData.error.code == 0){
				var networkCount = e.EventData.wlan.result.Networks.length;
				var htmlOuterContainer = "";
				for(var i = 0; i < networkCount; i++){
					htmlOuterContainer+= getRowRD(i, e.EventData.wlan.result.Networks[i].SSID, 'Netzwerk', i);
				}

				$("#scrollContainerInnerVertical").html(htmlOuterContainer);

				for(var i = 0; i < networkCount; i++){
					if(e.EventData.wlan.result.Networks[i].Configured == 0){
						ID = -1;
					}
					else{
						ID = e.EventData.wlan.result.Networks[i].ID;
					}
					$("#Container_" + i).html(getRowOfWiFiList(i, e.EventData.wlan.result.Networks[i].SSID, e.EventData.wlan.result.Networks[i].Configured, ID));
					g_RSSI_Level[i] = e.EventData.wlan.result.Networks[i].Level;
					if((e.EventData.wlan.result.Networks[i].Configured == 0) || (e.EventData.wlan.result.Networks[i].IsCurrent == 1)){
						initConnectionCanvas(i, g_RSSI_Level[i]);
						if(e.EventData.wlan.result.Networks[i].IsCurrent == 1){
							$('#Container_' + i).addClass('active');
							setHTML("Connect_Button_Label", 'Trennen');
							g_isActiveConnection = i;
						}
					}
					g_List_Indices[i] = i;
				}
				g_List_Count = g_List_Indices.length;















			}

			ScrollRefresh();
			}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function onEVENT_SET(e){
	try{
		if(e.EventData.wlan.request.cmd == 1029){
			if(e.EventData.error.code == 0){
				$('#Container_' + g_is_Selected).removeClass('selected').addClass('active');
				setHTML("Connect_Button_Label", 'Trennen');
				g_isActiveConnection = g_is_Selected;
				g_is_Selected = -1;
				if(toggleStateARD == 'delete'){
					hideHTML("Delete_Button_" + g_isActiveConnection);
				}
				initConnectionCanvas(g_isActiveConnection, g_RSSI_Level[g_isActiveConnection]);
				setHTML("WiFi_IP", e.EventData.wlan.result.IP);
			}
			$('#Dialog_Outter').remove();
		}
		if(e.EventData.wlan.request.cmd == 1030){
			if(e.EventData.error.code == 0){

			}
		}
	}catch(err){
		onError(err, "Error Setdata: ", false);
	}
}



function getRowOfWiFiList(Index, SSID, isConfigured, ID){

	var htmlInnerContainer = '' +
		'<!-- WiFi SSID -->' +
		'<div id="WiFi__' + Index + '_SSID" class="list_wifi_ssid" onClick=\'selectRow("' + Index + '");\'>' + SSID + '</div>' +
		'<!-- WiFi Level -->' +
		'<div id="WiFi__' + Index + '_Level" class="list_wifi_level" onClick=\'selectRow("' + Index + '");\'>' +

		'</div>' +
		'<!-- WiFi Setup -->' +
		'<div id="WiFi__' + Index +'_Setup" class="list_wifi_setup" onClick=\'AddItem("' + ID + '", "'+ SSID + '", "0");\'>' +
			'<a  draggable="false">'+
				'<img width="55" height="50" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAyCAYAAAD4FkP1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk5ODdDOUEwMTBDMjExRTJCOEZFRjg1RERBQjE5MTAyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk5ODdDOUExMTBDMjExRTJCOEZFRjg1RERBQjE5MTAyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTk4N0M5OUUxMEMyMTFFMkI4RkVGODVEREFCMTkxMDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4N0M5OUYxMEMyMTFFMkI4RkVGODVEREFCMTkxMDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6JCBspAAALeklEQVR42sxaCVCT2R0nIeFcATlkAZECXl0FnQ5esG491mvsekwdte5W2q1dZqwz6EzV1mrr4jVa6qo7WNcCo0Xpiqi4gIKILniAERY51HAISLiCXOEwJOTo7++8zHwbkxACLL6Z3+T73vfe973/+9//F55Wq7XSNR6PZ2WoYYwAP1OBSUAKxqFL64Lr48Ar4DJQYDUKzcSarfhmvsNfo9FsUKlUn0ZHR3vgXqBQKDzwghVqtXpdbW3th/iII8C3eoeawJxBIOxTPp+/F7AKDQ19jK5vcD0fxLxvbW1tVVFRMRN9fkAt4Mi4OerN6E6DK866a6lUmod7NV1Pnz59R2Nj41kQtVv3HMR5E3GlpaWL8PsQm/F1V1eX66hTR7KpA6cvGHgCkdtbWVlpW1dX9ztcK7RGWnd3t/zp06c5GNOo6yspKYnAq+xILbjfGG6Youutgfi1A/J0i4RuFYMTPdpBtLKysuKAgIDPmQESjhZxb4nls2fPNO3t7ZdBkJLubWxsgslYmCsJmKc5ePBga3V1dSBuyfgI3yWxJNs6Pj09/YoxzvT19amhU/0QQ42h5w8ePGg8cODAeYlEcgGc//s7IZaANxY+Beb+A7FYfEd/0W1tbYqoqKjKWbNmPfL397+/atWqwuvXrzeZElES6YSEhBkkBKNN3EWgBQuqI+vIXWRnZ6dy+fLlhZh3A0gE/g2cAmLj4+PFxojDhki2bNnyBcZ5jYRxMZs4RpTBFhMTU4M537Go5PfAYuBD4Fdubm67YVE7uOPlcnn/oUOHHru6uv4PY/YC5AsFo2ZQampqYhBtFGFhffoDoYNSXFYD3wNZQB5ADj0X3EkDcUXcOa9fv9acPHlSBuOkwK0MUDJ9Hh0nHhgYeBm6dB6tQn8gQq8uMqZAMdBE6wfI91F/lYeHRz13vIuLizA1NXXKmTNntBs3bixFVwOgHk1r6Y5FrsjKyrqnL5bHjx/PJxEEnPTn3717VwBOFRgT6fr6+oMYajuqOocFblAqlSVk5PQXiBCsa+XKlZ9h3hgDm/MbQ3N07fTp04cxdCIRaGCB24EUgFxPLGUbI0Jcf3//EVNmHQTWikSi9dAxJ9zyAVfgD2QUuePwHs3OnTvFsK6izZs359nb2381efLktXAbwfqLgxHL4M69cOHCXKzNnsNlZ2DqkIkrKioKhXOuKiwsfHL16tVyOGC1IdcF7lJIdpsiLUOb0Nzc3Ofp6ZmNb5CljIuMjLwIwyKG038JwxPIWTgPfvWubh6eq7EpeyjFAqzZmDjaPGzYl9hcT5pjaWzp5uvruwG/McCVzMxMidaCRiFYXl5e3aRJk3Zeu3bta+6znp6exzt27PBhBLpgA6u4z/fs2XMNz+YyEd6m514eHzlyZCxXdwdDnAMwC/giLCwsChxoHgxRvb29/Vxup6SkxEACloNWOXcc3M1NEEkqIAJU3Getra3d5eXlN5Fp7KWEg/vs3r17N7G2YOA9HYGDIY5cgzOaP8QohWPtehoaGl6bIgzi1rtw4cLHCMl+ePnyZQ9Snhbkfn/D+2Zj/gPtEBvURTF79mwqZ2ym2NcS4nSBM+/Vq1ebIOddSExfBQUF3fXz8/se8aaMiZ0WDr8HOVwXXVMrKChox7zrQDxEO9Hd3T0F1/8EVsCN7BkqccnJyY0s7AvnhnKDJU7XPLZu3boLQXISrpOQeceAuAb6EEUdIPghOJyFLPwNwXDymhkzZsTfunXrMtKmnPDw8K8w749w5jMh3alDJQ4ZRs+aNWsS8M752dnZgaSewC3AwxLiXFj8SNZr57Rp036NRT6jNAfWtBV9pPgnkbtltrS09J47d+7F9u3bE0Hka8ZdFfozYQ1TtMPUoI9tEPn/4t0STt9JZit4+sTxTJT2qHjkBlB9RDlmzJjm9evXT7O1tQ0HtwJu375NIVW2k5OTEtz5JXTOD5ydM2XKFP+fMsICoerY2NjNERERV3HbxyXOVPVLxapYHTQW1ksTFxf3Etf3WT9lCWVQ9G5AKxQKp0IPHSdOnOgLERaYuzj4LgUMjhwc1nh7e9tCXx0EAoHZAXZZWZk0LS3NF5fjAIpvNSYLRMbqnyz0+jnJPRDE7oXsxeScQ+CnTkN0OnWGxliDoZJTFANDRZuVCaRDOm6sXbtWlJub2zqQiCJUVJ04caLa0dExA3Mpdg1h8atZOmeMQCGTcXoRn83jMTdCRK5ZunTpBXBaaWxh4HBvSEgIBeLpwHlmVclt/IUWCtH/T2JiYpUp4k6dOkWSQ4SdA/7ENt3GXLE0aISAfgYu96lfC53txG/RokWLPnBwcLA29AI4bxUy82dwHZQ2lQMlLE/sYCLliEDABzFpVUBAwLY5c+aMN/QeiDCtndQkn+WV9frrEgyTXhMXvcgsQ1y88TuPT+VpAw1RSzNMOeV2ZJByWI7YzpJZarQpNbC6krNnz7rAvfzZzs7urXXOnz/f9dixYw4+Pj7qefPm8d3c3IRwTdoBi7IW5IO/pSCCypymUh9q69ato10m872CWWO+kWjfFlZ4BoyNZIA4lsI3OTbjGmMWb7AHISYbxMiZGRcbU6UEjNPA2LQxcRSTKNL6jGyaorOzsxp+tWaAUx7itB0s9s/wO4GlS6bPCgbTEDDbmTOODk2gi1SekJAoGiOMW4qBBTVLpDo6OjzxM4cFH8Oncwiqq2AdC4Hx8FEOEyZMsAcRb70bz/ihoaHv5eTkdHN0zJTIOyB39DPyTAspkIO7bzIRGCiq5fhyOTcsOodGJzproPjfjB079mZ0dHS5MR0pLi6uA5EfkzsZqIQAPfpMv37KOWiReXl55WITb0E0yaV8C2wHAoZV50idSNQQZYggHrlZWVk5uFYZGoiAe/ylS5c2/GiHDTc/GNwvjakOHH1bU1OTFNa5lA5u6OgMeA50DzfnrFlVjMRi8o0bN/ZBVOTGuIdUSikSifaZOAGaBjwyZSXxjfpx48aR81/KjrQppnXXOXJLIhSTpUFWuToOKM2pRshksgyquLECEKUxHwHRFOybkyVA5yogBZ8w7vIGk/IMljg66LhpYc1FDsgsmQsp6Ib+fawvvsOpc9TIar2w8B8JdoCTJXPBfcW+fftcWEBgPRIRyps17t+/fyZixzc1zOfPn3dGRkY+3717t5iy9OFIVjMyMqTIxotSU1ObqRhFfUiQH+Hbf2UHLbYjIpZM5t8/evTov3bt2nUfbiGbnQolIlsvHCphlAYhdryD91FSenHZsmV3oqKixMgg0tgpUjD3FNeSrMAUkZQVyMCpJBYIe7EDE4m7uztF678YatKNIKGJHcQ0ZGZmugL+LKkuZd9SjYhYcrhH5ngesITc2qZNmwLkcnm53rGzCuLbb4xLVKeBv1Tq90VERFCBKJTljeSsPwIWsv/ACEbSWureIWB/tKFAWgB9C9df5LZt256GhYWJDh8+XKVPZHp6ejOy8SdIdfLEYnEX91lFRcULGxubIPYNPkuax3CT1BElTh+wZivBuVrdAhMSEurZ0XMC9DK2urq6g+MStDAYBUyv4lavXn2duKzjdlJSUhFEfBUVji36H8pwE0c7u2DBgnXJyck/PHz4sBWLI6NwBvgcEf8nNTU1FdzTocWLF9PzfwBrCXFxcZn5+fnNS5YsIaIvUanf3Iozz5x/7ZkRfpnyYSSi00k3hELhdBCgYKUBOn5ukUql3yGMIt2xQgagCQkJuVJaWvotixXVzBCRk/ZhRuMBQwszYkbXJbAa+Ua1xCpaKAiTsL5SltMp6urq0iorK+1B5Li2tjYe0icZq6fIWEBexky8B6uTUKLbqTWnXDdUzpkbhDAH68wMAS1czgpOE1jJYS4zROXszKGE5XxCFpST0eih3PhHtUkTEvVTcE5XNevjVoQ5rZsViRRsA+jAQ8rxWeQj2yz56P8FGAD8N6eK1OE3WwAAAABJRU5ErkJggg==" alt="" draggable="false">' +
			'</a>' +
			'<span id="WiFi__' + Index + '_Configured" style="display: none;">' + isConfigured + '</span>'	+
			'<span id="WiFi__' + Index + '_ID" style="display: none;">' + ID + '</span>'	+
		'</div>';

	return 	htmlInnerContainer;
}



function handleGET(TdJson){

}

function submitSET(tagId, value){




















}



function toggleWiFiStatus(){
	$('#WiFi_Status_Img').toggle();

	g_wifiActive ^= 1;

	if(g_wifiActive == 1){
		GetTd({"wlan":{"cmd":0x0408}}, g_SetEvent, "service");
		wlanConnect();
	}
	else{
		GetTd({"wlan":{"cmd":0x0409}}, g_SetEvent, "service");
		wlanDisconnect();
	}


}

function selectRow(index){
	$('#Container_' + g_is_Selected).removeClass('selected');
	$('#Container_' + index).addClass('selected');
	g_is_Selected = index;
}

function wlanScan(){
	$('#Scan_Div').addClass('inactive');
	$("#scrollContainerInnerVertical").html("");
	GetTd({"wlan":{"cmd":0x0407}}, g_InitEvent, "service");
}

function wlanConnect(){
	if(g_wifiActive){
		if(g_isActiveConnection != -1){
			wlanDisconnect();
		}
		else if(g_is_Selected != -1){
			if(getHTML('WiFi__' + g_is_Selected + '_Configured') == 0){
				AddItem(getHTML('WiFi__' + g_is_Selected + '_ID'), getHTML('WiFi__' + g_is_Selected + '_SSID'), 1);
			}
			else{
				showDialogbox("actionWait", 'Netzwerkverbindung wird hergestellt...');
				GetTd({"wlan":{"cmd":0x0405, "param":{"ID":parseInt(getHTML('WiFi__' + g_is_Selected + '_ID'))}}}, g_SetEvent, "service");
			}
		}
	}
}

function wlanDisconnect(){
	if(g_isActiveConnection != -1){
		GetTd({"wlan":{"cmd":0x0406}}, g_SetEvent, "service");
		$('#Container_' + g_isActiveConnection).removeClass('active');
		setHTML("Connect_Button_Label", 'Verbinden');

		if(toggleStateARD == 'delete'){
			showHTML("Delete_Button_" + g_isActiveConnection);
		}
		setHTML("WiFi__" + g_isActiveConnection + "_Level", "");
		g_isActiveConnection = -1;
	}
}



function AddItem(id, ssid, autoConnect){
	
	location.href = "2.2.1__WiFiSetup.html?SetupModeIndex=" + id + "&SSID=" + ssid + "&autoConnect=" + autoConnect + "&isCurrent=" + g_isActiveConnection;
}


function toggleDelete(){
	hideHTML("ARD_Buttons");
	setCSS("List_Container", "width", "778px");
	setCSS("scrollContainerInnerVertical", "width", "778px");

	for(var i = 0; i < g_List_Count; i++){
		if((g_isActiveConnection != g_List_Indices[i]) && (getHTML('WiFi__' + i + '_Configured') == 1)){
			showHTML("Delete_Button_" + g_List_Indices[i]);
		}
	}

	toggleStateARD = "delete";
}


function deleteItem(index){

	GetTd({"wlan":{"cmd":0x0411, "param":{"ID":parseInt(getHTML('WiFi__' + index + '_ID'))}}}, g_SetEvent, "service");

	$("#ContainerOuter_" + index).remove();

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
	setCSS("List_Container", "width", "778px");
	setCSS("scrollContainerInnerVertical", "width", "778px");

	for(var i = 1; i < g_List_Count; i++){
		showHTML("Reorder_Button_" + g_List_Indices[i]);
	}
	toggleStateARD = "reorder";
}


function raiseElement(Index){
	location.reload();
}


function toggleARD(link){
	if(toggleStateARD == "normal"){
		window.location.href = link;
	}
	else if(toggleStateARD == "delete"){
		for(var i = 0; i < g_List_Count; i++){
			hideHTML("Delete_Button_" + g_List_Indices[i]);
		}
		setCSS("List_Container", "width", "674px");
		setCSS("scrollContainerInnerVertical", "width", "674px");
		showHTML("ARD_Buttons");
		toggleStateARD = "normal";
	}
	else if(toggleStateARD == "reorder"){
		for(var i = 1; i < g_List_Count; i++){
			$("#Reorder_Button_" + g_List_Indices[i]).hide();
		}
		setCSS("List_Container", "width", "674px");
			setCSS("scrollContainerInnerVertical", "width", "674px");



		showHTML("ARD_Buttons");
		toggleStateARD = "normal";
	}
}






























dark_grey   = "#333";
white       = "#fff";

connectionW = 32;
connectionH = 32;

function initConnectionCanvas(connectionCanvasTag, level){

	g_connectionCanvasObj[connectionCanvasTag] = Raphael("WiFi__" + connectionCanvasTag + "_Level", connectionW, connectionH);

	connection_center = [4, 28];

	connection_100_path = arc(connection_center, 26, -90, 0);
	connection_80_path  = arc(connection_center, 20, -90, 0);
	connection_60_path  = arc(connection_center, 14, -90, 0);
	connection_40_path  = arc(connection_center,  8, -90, 0);

	g_connectionCanvasUpdateObj["con_100_percent"] = {};
	g_connectionCanvasUpdateObj["con_80_percent"] = {};
	g_connectionCanvasUpdateObj["con_60_percent"] = {};
	g_connectionCanvasUpdateObj["con_40_percent"] = {};
	g_connectionCanvasUpdateObj["con_20_percent"] = {};

	g_connectionCanvasUpdateObj["con_100_percent"][connectionCanvasTag] = g_connectionCanvasObj[connectionCanvasTag].path(connection_100_path).attr({stroke: dark_grey, "stroke-width": "4px", "opacity": 1});
	g_connectionCanvasUpdateObj["con_80_percent"][connectionCanvasTag]  = g_connectionCanvasObj[connectionCanvasTag].path(connection_80_path).attr({stroke: dark_grey, "stroke-width": "4px", "opacity": 1});
	g_connectionCanvasUpdateObj["con_60_percent"][connectionCanvasTag]  = g_connectionCanvasObj[connectionCanvasTag].path(connection_60_path).attr({stroke: dark_grey, "stroke-width": "4px", "opacity": 1});
	g_connectionCanvasUpdateObj["con_40_percent"][connectionCanvasTag]  = g_connectionCanvasObj[connectionCanvasTag].path(connection_40_path).attr({stroke: dark_grey, "stroke-width": "4px", "opacity": 1});
	g_connectionCanvasUpdateObj["con_20_percent"][connectionCanvasTag]  = g_connectionCanvasObj[connectionCanvasTag].circle(connection_center[0], connection_center[1], 4).attr({fill: dark_grey, "stroke-width": "none", "fill-opacity": 1});

	updateConnectionCanvas(connectionCanvasTag, level);
}



function updateConnectionCanvas(connectionCanvasTag, connectionRSSI){
	
	if(connectionRSSI > -55){
		g_connectionCanvasUpdateObj["con_100_percent"][connectionCanvasTag].attr({stroke: white});
		g_connectionCanvasUpdateObj["con_80_percent"][connectionCanvasTag].attr({stroke: white});
		g_connectionCanvasUpdateObj["con_60_percent"][connectionCanvasTag].attr({stroke: white});
		g_connectionCanvasUpdateObj["con_40_percent"][connectionCanvasTag].attr({stroke: white});
		g_connectionCanvasUpdateObj["con_20_percent"][connectionCanvasTag].attr({fill: white, stroke: 'none'});
	}
	else if(connectionRSSI > -67){
		g_connectionCanvasUpdateObj["con_100_percent"][connectionCanvasTag].attr({stroke: dark_grey});
		g_connectionCanvasUpdateObj["con_80_percent"][connectionCanvasTag].attr({stroke: white});
		g_connectionCanvasUpdateObj["con_60_percent"][connectionCanvasTag].attr({stroke: white});
		g_connectionCanvasUpdateObj["con_40_percent"][connectionCanvasTag].attr({stroke: white});
		g_connectionCanvasUpdateObj["con_20_percent"][connectionCanvasTag].attr({fill: white, stroke: 'none'});
	}
	else if(connectionRSSI > -78){
		g_connectionCanvasUpdateObj["con_100_percent"][connectionCanvasTag].attr({stroke: dark_grey});
		g_connectionCanvasUpdateObj["con_80_percent"][connectionCanvasTag].attr({stroke: dark_grey});
		g_connectionCanvasUpdateObj["con_60_percent"][connectionCanvasTag].attr({stroke: white});
		g_connectionCanvasUpdateObj["con_40_percent"][connectionCanvasTag].attr({stroke: white});
		g_connectionCanvasUpdateObj["con_20_percent"][connectionCanvasTag].attr({fill: white, stroke: 'none'});
	}
	else if(connectionRSSI > -89){
		g_connectionCanvasUpdateObj["con_100_percent"][connectionCanvasTag].attr({stroke: dark_grey});
		g_connectionCanvasUpdateObj["con_80_percent"][connectionCanvasTag].attr({stroke: dark_grey});
		g_connectionCanvasUpdateObj["con_60_percent"][connectionCanvasTag].attr({stroke: dark_grey});
		g_connectionCanvasUpdateObj["con_40_percent"][connectionCanvasTag].attr({stroke: white});
		g_connectionCanvasUpdateObj["con_20_percent"][connectionCanvasTag].attr({fill: white, stroke: 'none'});
	}
	else if(connectionRSSI > -100){
		g_connectionCanvasUpdateObj["con_100_percent"][connectionCanvasTag].attr({stroke: dark_grey});
		g_connectionCanvasUpdateObj["con_80_percent"][connectionCanvasTag].attr({stroke: dark_grey});
		g_connectionCanvasUpdateObj["con_60_percent"][connectionCanvasTag].attr({stroke: dark_grey});
		g_connectionCanvasUpdateObj["con_40_percent"][connectionCanvasTag].attr({stroke: dark_grey});
		g_connectionCanvasUpdateObj["con_20_percent"][connectionCanvasTag].attr({fill: white, stroke: 'none'});
	}
	else{
		g_connectionCanvasUpdateObj["con_100_percent"][connectionCanvasTag].attr({stroke: dark_grey});
		g_connectionCanvasUpdateObj["con_80_percent"][connectionCanvasTag].attr({stroke: dark_grey});
		g_connectionCanvasUpdateObj["con_60_percent"][connectionCanvasTag].attr({stroke: dark_grey});
		g_connectionCanvasUpdateObj["con_40_percent"][connectionCanvasTag].attr({stroke: dark_grey});
		g_connectionCanvasUpdateObj["con_20_percent"][connectionCanvasTag].attr({fill: dark_grey, stroke: 'none'});
	}
}


function arc(center, radius, startAngle, endAngle){
	angle = startAngle;
	coords = toCoords(center, radius, angle);
	path = "M " + coords[0] + " " + coords[1];

	while(angle <= endAngle){
		coords = toCoords(center, radius, angle);
		path += " L " + coords[0] + " " + coords[1];
		angle += 1;
	}

	return path;
}


function toCoords(center, radius, angle){
	var radians = (angle / 180) * Math.PI;
	var x = center[0] + Math.cos(radians) * radius;
	var y = center[1] + Math.sin(radians) * radius;

	return [x, y];
}
