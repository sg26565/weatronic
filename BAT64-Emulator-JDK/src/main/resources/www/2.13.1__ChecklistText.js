

		
	

var g_GET_Parameter 		= get_GET_Parameter();
var g_pfId         			= g_GET_Parameter.PFID;
var g_lastURL       		= g_GET_Parameter.LastURL;
var g_PreFlightCheckIndex 	= g_GET_Parameter.PreFlightCheckIndex;

var g_HTML = "";
var g_markupText = "";
var g_Title = "";

var markupTagObj = {};
markupTagObj.searchKeyOpen  = new Array("[$b]", "[$i]", "[$u]", "[$t]", "[$o]", "[$s]", "[$g]", "[$c", "[$f");
markupTagObj.searchKeyClose = new Array("[\\b]", "[\\i]", "[\\u]", "[\\t]", "[\\o]", "[\\s]", "[\\g]", "[\\c]", "[\\f]", "[\\l]");
markupTagObj.HTMLKeyOpen    = new Array('<b>', '<i>', '<u>', '<span class="pf_line_through">', '<span class="pf_outline">', '<span class="pf_shadow">', '<span class="blink">', '<span style="color:', '<span style="font-size:', ';">');
markupTagObj.HTMLKeyClose   = new Array("</b>", "</i>", "</u>", "</span>", "</br>");





















initPage();
	
function initPage(){
	
	InitDataPostArgsExtended = new Object();
	GetTd(getChecklistObject(InitDataPostArgsExtended), g_InitEvent, "service");
	

	setInterval(JsonFunction, 250);
}



function getChecklistObject(InitDataPostArgsExtended){
	if(typeof InitDataPostArgsExtended == "undefined"){
		InitDataPostArgsExtended = new Object();
	}

	preflightChecklist = new Object();
		tempGet = new Object();
		tempGet.title = "";
		tempGet.text = "";
		tempGet.ID = -1;
		tempGet.isChecked = -1;
		tempGet.isActive = -1;
		tempGet.HTML = "";
	items = new Array(tempGet);
	preflightChecklist.get = new Object();
	preflightChecklist.get.items = items;
	preflightChecklist.checkFinish = 1;

	InitDataPostArgsExtended.preflightChecklist = preflightChecklist;

	return InitDataPostArgsExtended;	
}



function onEVENT_INIT(e){
	try{
		
		$('#Navi_Button').removeAttr("href");
		$('#Navi_Button').bind("click", function(){window.location.href = "2.13.0__PreFlightChecklists.html?PreFlightCheckIndex=" + g_PreFlightCheckIndex + "&LastURL=" + g_lastURL + "&IsStartupEdit=1";});
		$('#Preview_Text').bind("click", function(){initKeypad();});
		

		var i = 0;

		g_List_Count = e.EventData.preflightChecklist.get.items.length;

		for(i = 0; i < e.EventData.preflightChecklist.get.items.length; i++){
			Index = e.EventData.preflightChecklist.get.items[i].ID;

			if(Index == g_pfId){
				setHTML('CheckList_Titel', e.EventData.preflightChecklist.get.items[i].title);
				g_HTML       = e.EventData.preflightChecklist.get.items[i].HTML;
				g_markupText = e.EventData.preflightChecklist.get.items[i].text;

				if(g_HTML == ""){
					parseMarkup2HTML();
					submitSET("HTML", g_HTML);
				}
				break;
			}
		}

		setHTML('List_Content', g_HTML);
		initScrollbars('List_Container');
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}


function handleEventControl(cmd, e, key, value, valueStr){

}


function onEVENT_SET(e){
	try{

	}catch(err){
		onError(err, "Error Setdata: ", false);
	}	
}







function parseMarkup2HTML(){
	g_markupText = "<span>" + g_markupText + "</span>";
	g_markupText = $(g_markupText).text();
	g_HTML = g_markupText.replace(/\[\\l\]/g, markupTagObj.HTMLKeyClose[4]);

	var openTagsStack = [];
	var indexOfStartTag = g_HTML.indexOf("[$");
	var indexOfEndTag   = g_HTML.indexOf("[\\");

	
	
	while(indexOfEndTag < indexOfStartTag){
		if(indexOfEndTag == -1){
			break;
		}
		log(3, "failed " + " wrong endtag at char index of " + indexOfEndTag);
		
		indexOfEndTag = g_HTML.indexOf("[\\", indexOfEndTag + 2);
	}
	
	

	
	while(indexOfStartTag != -1){
		
		while(indexOfEndTag < indexOfStartTag){
			if(indexOfEndTag == -1){
				break;
			}
			
			if((searchMarkupTag(indexOfEndTag, 0)) == openTagsStack[openTagsStack.length - 1]){
				replaceMarkupTag(openTagsStack[openTagsStack.length-1], indexOfEndTag, false, true);
				indexOfStartTag = g_HTML.indexOf("[$", indexOfEndTag);
				log(3, "pass" + markupTagObj.searchKeyClose[openTagsStack[openTagsStack.length - 1]]);
				openTagsStack.pop();
			}
			else{
				log(3, "failed - found " + (markupTagObj.searchKeyClose[searchMarkupTag(indexOfEndTag, 0)]) + " but need " + markupTagObj.searchKeyClose[openTagsStack[openTagsStack.length - 1]]);
				
				
			}
			indexOfEndTag = g_HTML.indexOf("[\\", indexOfEndTag + 2);
		}
		
		openTagsStack.push(searchMarkupTag(indexOfStartTag, 1));
		
		replaceMarkupTag(openTagsStack[openTagsStack.length-1], indexOfStartTag, true, true);
		
		indexOfEndTag = g_HTML.indexOf("[\\", indexOfStartTag);
		
		indexOfStartTag = g_HTML.indexOf("[$", indexOfStartTag + 2);
	}
	
	var missingTagStack = [];

	while(openTagsStack.length > 0){
		if((searchMarkupTag(indexOfEndTag, 0)) == openTagsStack[openTagsStack.length - 1]){
			replaceMarkupTag(openTagsStack[openTagsStack.length-1], indexOfEndTag, false, true);
			log(3, "pass" + markupTagObj.searchKeyClose[openTagsStack[openTagsStack.length - 1]]);
		}
		else{
			log(3, "failed - found " + (markupTagObj.searchKeyClose[searchMarkupTag(indexOfEndTag, 0)]) + " but need " + markupTagObj.searchKeyClose[openTagsStack[openTagsStack.length - 1]]);
			missingTagStack.push(openTagsStack[openTagsStack.length - 1]);
			
			
		}

		openTagsStack.pop();
		indexOfEndTag = g_HTML.indexOf("[\\", indexOfEndTag + 2);
	}	
	
	while(missingTagStack.length > 0){
		var missingTag = missingTagStack.pop();
		log(3, "missing endtags" + markupTagObj.searchKeyClose[missingTag]);
		replaceMarkupTag(missingTag, g_HTML.length, false, false);
	}






	
}


function searchMarkupTag(pos, isStartTag){
	if(pos == -1){
		return pos;
	}
	
	var serachArray = [];

	if(isStartTag){
		serachArray = markupTagObj.searchKeyOpen;
	}
	else{
		serachArray = markupTagObj.searchKeyClose;
	}

	for(var i = 0; i < serachArray.length; i++){
		if(pos == g_HTML.indexOf(serachArray[i], pos)){
			return i;
		}
	}
}


function replaceMarkupTag(tag, pos, isStarttag, isReplace){
	var insertHTMLTag = "";

	if(isStarttag){
		if(tag < 7){
			insertHTMLTag = markupTagObj.HTMLKeyOpen[tag];
		}
		else{
			var insertHTMLValue = "";
			insertHTMLValue =  g_HTML.substring((pos + 3), (g_HTML.indexOf("]", pos)));

			if(tag == 8){
				insertHTMLValue += "px";
			}
			
				
			
			
				
			
			insertHTMLTag = markupTagObj.HTMLKeyOpen[tag] + insertHTMLValue + markupTagObj.HTMLKeyOpen[9];
		}
	}
	else{
		if(tag < 3){
			insertHTMLTag = markupTagObj.HTMLKeyClose[tag];
		}
		else{
			insertHTMLTag = markupTagObj.HTMLKeyClose[3];
		}
	}

	if(isReplace){
		g_HTML = g_HTML.substring(0, pos) + insertHTMLTag + g_HTML.substring((g_HTML.indexOf("]", pos) + 1), g_HTML.length);
	}
	else{
		g_HTML = g_HTML.substring(0, pos) + insertHTMLTag + g_HTML.substring(pos, g_HTML.length);
	}
}


function getPathObj(cmd, ModelName){
	xmlObj = {};
	xmlObj[cmd] = {};
	xmlObj[cmd][ModelName] = {};

	return xmlObj;
}


function getAttrObj(tagId, value){
	Attribute = new Array();
	Attribute[0] = {};
	Attribute[0]["ID"] = parseInt(g_pfId);

	if(tagId == "Text"){
		Attribute[0]["text"] = value;

		return Attribute;
	}

	if(tagId == "HTML"){
		Attribute[0]["HTML"] = value;

		return Attribute;
	}

	return Attribute;
}


function submitSET(tagId, value){
	Attr = new Array();
	Attr = getAttrObj(tagId, value);

	xmlObj = {};
	xmlObj["preflightChecklist"] = {};
	xmlObj["preflightChecklist"]["set"] = {};
	xmlObj["preflightChecklist"]["set"]["items"] = [];
	xmlObj["preflightChecklist"]["set"]["items"] = Attr;

	GetTd(xmlObj, g_SetEvent, "service");
}


function submitARD(cmd, num){

}




var newKeypad_selectionStart = 0;
var newKeypad_selectionEnd = 0;
var newKeypad_cursorposition = keypad_selectionStart;
var newKeypad_inputString = "";

var g_BBCodeBoxState = 0;	

function initKeypad(){
	var htmlBBCodeKeys1 = '' +
							'<li id="bbcode__0__a"   	style="width: 83px !important;"><b>B</b></li>' +
							'<li id="bbcode__0__b"   	style="display: none; width: 83px !important;">/<b>B</b></li>' +
							'<li id="bbcode__1__a"   	style="width: 83px !important;"><i>I</i></li>' +
							'<li id="bbcode__1__b"   	style="display: none; width: 83px !important;">/<i>I</i></li>' +
							'<li id="bbcode__2__a"   	style="width: 82px !important;"><u>U</u></li>' +
							'<li id="bbcode__2__b"   	style="display: none; width: 82px !important;">/<u>U</u></li>' +
							'<li id="bbcode__3__a"   	style="width: 82px !important;"><span class="pf_line_through">T</span></li>' +
							'<li id="bbcode__3__b"   	style="display: none; width: 82px !important;">/<span class="pf_line_through">T</span></li>' +
							'<li id="bbcode__4__a"   	style="width: 82px !important;"><span class="pf_outline">O</span></li>' +
							'<li id="bbcode__4__b"   	style="display: none; width: 82px !important;">/<span class="pf_outline">O</span></li>' +
							'<li id="bbcode__5__a"   	style="width: 82px !important;"><span class="pf_shadow">S</span></li>' +
							'<li id="bbcode__5__b"   	style="display: none; width: 82px !important;">/<span class="pf_shadow">S</span></li>' +
							'<li id="bbcode__6__a"  	style="width: 82px !important;"><img width="82" height="60" style="margin-top: -16px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAAA8CAYAAAD10u2xAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALkSURBVHja7JtPSFRRFMbnzoyaUZa2KYkWWbSMqEUELiKl/xmJLl2FtmqZQtDaqF2bmqUtlFwI1iqLitpOLUrclBCRRqADBU056vM7dQZej3ffvBxHm/e+Ax/3eu+d9+b+5px7zptB4zhOgla+JYmAIAmSIGkESZAESZA0giRIgqQRZDRAOosztVAvtJUg7ZAOQsmA+UY0o1DepJu/E6TdGqD7AHbR7XHo10Ed6L6CDkEjUQntdCUuCi97CWDb0B2HPqE/hbYA7YcO6LLbWFcgyNIwHwHgNXRvQXt8lrxjsglvd6D3lrkUQYb3yl9onlumj1Ygye2McvnzxTJ+CRtvXuN7HcM1m6IKckfA+L01vtckNBRVkK3aSt3YbZINfSbV9AwtYr/mnLP8zUFQyk+ZRc1D/VCX5XpdrrWiCdfcHHQWXnlDQ33dHjjSlbw4NnJCPe8CzsuHOiwbP54w4JjYgkV5aAF/1BVfJsX6oPazAh+adl22MeCWNdBP6DrufR7tMFr5YLZDH/EexqoOJDZQj+YUdBIbeGvPSPXqWL52WMO/PcT9ZC+XoU06dEQlH8JV6E21eqQc+ncB8UOI/B402aZAsxaExlmc3YXOFajHM/lUjgm8h2zVnpF485/DQfztbcYlCeWcZ81eC0Rxxc3onIY6NITzrgUPoNeR/vYnwEZViVCebJIF9bwz+ODk/NwHvdAFjzHmxBVkm0/GDgjN1AJgSSKZ0UiQthP6Cu2ORNYOaRMl5m96snaYY2VOs/aPOIEMsifQwCpfK15cG6WCvNwwH1xlsluC8nECWSpr99uzdky+/Skja2d8HgsJMg72P4IU7+v1jOUs/eJj5IaHfjWUP9460lsKSRHu9wQl61oY2n+fmVkP1GmG9r/XkX0+490E+edJJRMwn9MivF2Vs4R6S4liPbOemzL8PxuWPwRJkDSCJEiCJEgaQRIkQdIIkiAJkiBpBEmQBEmQNILccFsRYABYgMlxQd1vEgAAAABJRU5ErkJggg==" alt="" draggable="false"/></li>' +
							'<li id="bbcode__6__b"  	style="display: none; width: 82px !important;"><img width="82" height="60" style="margin-top: -16px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAAA8CAYAAAD10u2xAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMjSURBVHja7JtPaBNBFMZ3k/SPotVUEC3iwSoeRdaDeBOSg38ryvYoHqT15MGDFQTPLXrzZLzpQTEHQT0ZRUWv0YviRQsiVBFqUMHYpnX8BiawHWaz22RTnfV78GUmM7OT7G/emzcbiCuEcGidW4YICJIgCZJGkARJkARJI0iCJEgaQaYDpFiY6YXGoLUEGQ5pF5Rp0Z9HUYbqbm7oB0GG2wB0E8COBT0O9T5oBNUX0G7odlpCO9eNSeFlzwFsHar3oI+ov0XZgHZAO9WwKxjXIMhomA8A8Dyql6GthiGvmWzi21XoXUhfliDje+Uciqch3Xu7kOQ2pfn48zmk/ThufCjhz9qHOQfTCnJDi/ZrCX/WG+hGWkDKM6Joys1uPKXa5blx1M0MjLvZwScoEfs9h8Xv7xgnROCar9AE5IfM7wfnhyqBvlnoELzykgr1FXvg6EbWXgpAzC3i9Sj2y/uqRd74fscFR2cN+uvQPN70BRdiUtWrEj40rS1UmPVAv6CLgHgE5S2UcmHWQx/wHe7aBLKwNONkzwUgGjLSKuVYRvNU+BdjJBp5L6ehftW0R0kuwlnolW0eGQT5zXH7r8fI71Hzeco7TQhdsfBpMypnoJNa52O5TWAhq7btkb4Weg9jXFNUJJuSoVzTxmwLgShdcTUqB6ARFcL1wIA70Esbk42nvX/UxhxlJSeWJ7uZhvK8g/A8uYjboWfNhUSbsBGkb4DSztagz9MiNLPzgCUTyYx6CJDlCegLtMXGrO1pIVg1hKjJKhH9U1rWjvNENauy9k8bQRYS8EbHsDVcaPNauZC9Nh7I/QT2R9PiTLb5nL8I1W0DmdcSzXTrfW1ZWXsiPGun79cfP8GwlteWIuZPLchC/CybTusGyFqHHim9b0xrq4XUTaeFv2K5hMI630GSqcQYU9X2X31/fm+4Ro4btskjvS6HdVmbs7rcc6UtIPX9sZTg95PePW5oH00bSE/zyDhPM1MRsGvqEF5UqoWE+nDEYb20kiBd/s/m3/zRgiBpBEmQBEkjSIIkSIKkESRBEiRB0giSIAmSRpAESZD/lf0RYABfZ9pDR0PW3QAAAABJRU5ErkJggg==" alt="" draggable="false"/></li>' +
							'<li id="bbcode__8_18__a"	style="width: 83px !important;"><img width="83" height="60" style="margin-top: -16px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAA8CAMAAAAtzna9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABUUExURf8AAP////8AAP////8AAP////8AAP8AAP8AAP////////8AAP////8AAP////8AAP////8AAP////////8AAP////8AAP////8AAP////8AAP////rdqQgAAAAadFJOUwAAEREiIjNEVVVmd3eIiJmZqqq7zMzd3e7uZcrAcAAAAMhJREFUWMPt1cESgiAQBmCtzBIqy4jC93/PVoQxg9Mu06X/v3hhvoHdBau6fCqYMGHChAnzL81G25FidReXL2GaeoyxpcyFjGYlNbev8qbfZr9aLDZvRA4puT85yl2xzIFMnZitm/NgmYbM7tvcPEWmDWZDXxNNRVzLr+enaaNJxbwKemRy5sU5RRVQStajjLnj1rMPs1TS7KaZP2fryTaTuzmZB993tlkfM6ZwPsPp16bwHvk32Z/fhDdZft/x34QJEyZMmD8z3wiHKdbxbUTCAAAAAElFTkSuQmCC" alt="" draggable="false"/></li>' +
							'<li id="bbcode__8_18__b"	style="display: none; width: 83px !important;"><img width="83" height="60" style="margin-top: -16px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAA8CAMAAAAtzna9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABaUExURf8AAP////8AAP////8AAP////8AAP////8AAP////8AAP////////8AAP////8AAP////8AAP////8AAP////////8AAP////8AAP////8AAP////8AAP///9eg708AAAAcdFJOUwAAEREiIjMzRERVVWZ3d4iImZmqqrvMzN3d7u5jp4eqAAABBUlEQVRYw+3VSxKCMAwAUBQVFFoR0Vqh97+maU1ApJtUx43Jhi6YR8gHstX3IxNTTDHFFFPMPzJz55wJp622cHZW13T7FDyzBqbxB+0o7KdmB8h+RpKZJZu9c70vQf89swKjozTb2c3JZgNUjSW4LMndcYC4KpbpW53D9QJXvTDL4Rk3jlnQJBnMd2au7ymmpvQsmlt6iDcVcCW7nj694t20ZEIxz+we5ePkmJh5GgYFFVCK06NxicYeRcwNr55+gqpwanGWPjdxiTBjn3KknjyTlii2m948hL7zzOZl0KuImTKfBpdoevu5mbBH4xKt8Jsc3t/gNzl93+W/KaaYYoop5s/NBwKIM55Y/AuqAAAAAElFTkSuQmCC" alt="" draggable="false"/></li>' +
							'<li id="bbcode__8_22__a"	style="width: 83px !important;"><img width="83" height="60" style="margin-top: -16px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAA8CAMAAAAtzna9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABdUExURf8AAP////8AAP////8AAP////8AAP////8AAP////8AAP////8AAP////8AAP////8AAP////8AAP////8AAP////8AAP8AAP////8AAP////8AAP////8AAP////RHR4oAAAAddFJOUwAAEREiIjMzRERVVWZmd3eIiJmZqqq7zMzd3e7uIh0ongAAAQJJREFUWMPt1kkSgyAQBVDAOEc0msQR73/MiEgp6IbBRar6r1y9QulBhP0HgQkmmGD+p4n2ZLRlaypKiRcz6dkhXx/mkzHfZsa8m2T0aQqUCql+bMcmkbspLpweisDQLJqZpylDaZKVHImtGXazTCHNaDXfyNIMhvlsJuJr2prl7N+cFmtItTtSTMqTGJgxP59OqqZ4NjDThZywXzPnr36qTzezkCav0fwG87o+7d9dMZU+sr8jxVT63dgMZS2p5jaRKysT89YcYt0kvTY/a6fexJdz3sjE3aWp7yMzM9BmnUST1t5cavSzii8xk/fVmW0bhFHH/Q7/YGCCCSaYYN5q/gDaakIY4xYARwAAAABJRU5ErkJggg==" alt="" draggable="false"/></li>' +
							'<li id="bbcode__8_22__b"		style="display: none; width: 83px !important;"><img width="83" height="60" style="margin-top: -16px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAA8CAMAAAAtzna9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABdUExURf8AAP////8AAP////8AAP////8AAP////8AAP////8AAP////8AAP////8AAP////8AAP////8AAP////8AAP////8AAP8AAP////8AAP////8AAP////8AAP////RHR4oAAAAddFJOUwAAEREiIjMzRERVVWZmd3eIiJmZqqq7zMzd3e7uIh0ongAAAUhJREFUWMPt1tuSgyAMBmDFWjysWLdra63k/R+zQKAWdEZc2YudITd69Y0T/gSTNHwl0YxmNKP5P81krorduaoLYySIWTz4R91CmF+chzYrHtwkz5Amogyl75P+bHI+buKBs48QeJkZAAzqrbmCrGubG5Mo8kn2mo1gOvHMBzDVGPOszJ9kr9kLpBSfO8LSLLCbu80JYBKPFsKZtTB6pGEsnTOyTCar8DE7/C4K2AL72C0T331M2cYsTUvAFoQwqU6SbMG4yOfvTHk0rU6UMmVG62OmDCV1zfV8+pqZoepV05ojX9MM0XxGlmnNu6/Zm+7lJku2qTfyZY85vRMkMzVS1yQPZ39um2aI1mYzXd3z22ank2QSsDTd+2jbHHCIMALOrjNocd9l0vc6xhD0SuxwJ89XZ6VvEM4O3u/xHyya0YxmNKP5p+YLev5KK+GWINkAAAAASUVORK5CYII=" alt="" draggable="false"/></li>' +
							'<li id="bbcode__7_000000__a"	><div class="color_button" style="background: black;"></div></li>' +
							'<li id="bbcode__7_000000__b" 	style="display: none;"><div class="color_button" style="background: black;">/</div></li>' +
							'<li id="bbcode__7_FF00FF__a"	><div class="color_button" style="background: magenta;"></div></li>' +
							'<li id="bbcode__7_FF00FF__b"  	style="display: none;"><div class="color_button" style="background: magenta;">/</div></li>' +
							'<li id="bbcode__7_8A2BE2__a"  	><div class="color_button" style="background: blueviolet;"></div></li>' +
							'<li id="bbcode__7_8A2BE2__b"  	style="display: none;"><div class="color_button" style="background: blueviolet;">/</div></li>';
	
	if(!isBAT){				
		htmlBBCodeKeys1 +=	'<li id="bbcode__7_191970__a" ><div class="color_button" style="background: midnightblue;"></div></li>' +
							'<li id="bbcode__7_191970__b" style="display: none;"><div class="color_button" style="background: midnightblue;">/</div></li>';
	}	

	htmlBBCodeKeys1 +=		'<li id="bbcode__7_0000FF__a"  	><div class="color_button" style="background: blue;"></div></li>' +
							'<li id="bbcode__7_0000FF__b"  	style="display: none;"><div class="color_button" style="background: blue;">/</div></li>' +
							'<li id="bbcode__7_6495ED__a"   ><div class="color_button" style="background: cornflowerblue;"></div></li>' +
							'<li id="bbcode__7_6495ED__b"   style="display: none;"><div class="color_button" style="background: cornflowerblue;">/</div></li>' +
							'<li id="bbcode__7_87CEFA__a"  	><div class="color_button" style="background: lightskyblue;"></div></li>' +
							'<li id="bbcode__7_87CEFA__b"  	style="display: none;"><div class="color_button" style="background: lightskyblue;">/</div></li>' +
							'<li id="bbcode__7_00FFFF__a"   ><div class="color_button" style="background: cyan;"></div></li>' +
							'<li id="bbcode__7_00FFFF__b"   style="display: none;"><div class="color_button" style="background: cyan;">/</div></li>' +
							'<li id="bbcode__7_90EE90__a"   ><div class="color_button" style="background: lightgreen;"></div></li>' +
							'<li id="bbcode__7_90EE90__b"  	style="display: none;"><div class="color_button" style="background: lightgreen;">/</div></li>' +
							'<li id="bbcode__7_008000__a"  	><div class="color_button" style="background: green;"></div></li>' +
							'<li id="bbcode__7_008000__b"  	style="display: none;"><div class="color_button" style="background: green;">/</div></li>';
	
	if(isBAT){				
		htmlBBCodeKeys1 +=	'<li id="bbcode__7_556B2F__a" 	><div class="color_button" style="background: darkolivegreen;"></div></li>' +
							'<li id="bbcode__7_556B2F__b" 	style="display: none;"><div class="color_button" style="background: darkolivegreen;">/</div></li>';
	}

	var htmlBBCodeKeys2 = '';

	if(!isBAT){				
		htmlBBCodeKeys2 +=	'<li id="bbcode__7_556B2F__a" 	><div class="color_button" style="background: darkolivegreen;"></div></li>' +
							'<li id="bbcode__7_556B2F__b" 	style="display: none;"><div class="color_button" style="background: darkolivegreen;">/</div></li>';
	}

	htmlBBCodeKeys2 +=		'<li id="bbcode__7_BDB76B__a" ><div class="color_button" style="background: darkkhaki;"></div></li>' +
							'<li id="bbcode__7_BDB76B__b" style="display: none;"><div class="color_button" style="background: darkkhaki;">/</div></li>' +
							'<li id="bbcode__7_9ACD32__a" ><div class="color_button" style="background: yellowgreen;"></div></li>' +
							'<li id="bbcode__7_9ACD32__b" style="display: none;"><div class="color_button" style="background: yellowgreen;">/</div></li>' +
							'<li id="bbcode__7_FFFF00__a" "><div class="color_button" style="background: yellow;"></div></li>' +
							'<li id="bbcode__7_FFFF00__b" style="display: none;"><div class="color_button" style="background: yellow;">/</div></li>' +
							'<li id="bbcode__7_FFC0CB__a" ><div class="color_button" style="background: pink;"></div></li>' +
							'<li id="bbcode__7_FFC0CB__b" style="display: none;"><div class="color_button" style="background: pink;">/</div></li>';

	if(!isBAT){				
		htmlBBCodeKeys2 +=	'<li id="bbcode__7_F4A460__a" ><div class="color_button" style="background: sandybrown;"></div></li>' +
							'<li id="bbcode__7_F4A460__b" style="display: none;"><div class="color_button" style="background: sandybrown;">/</div></li>';
	}

	htmlBBCodeKeys2 +=		'<li id="bbcode__7_FFA500__a" ><div class="color_button" style="background: orange;"></div></li>' +
							'<li id="bbcode__7_FFA500__b" style="display: none;"><div class="color_button" style="background: orange;">/</div></li>' +
							'<li id="bbcode__7_FF0000__a" ><div class="color_button" style="background: red;"></div></li>' +
							'<li id="bbcode__7_FF0000__b" style="display: none;"><div class="color_button" style="background: red;">/</div></li>';

	if(!isBAT){				
		htmlBBCodeKeys2 +=	'<li id="bbcode__7_8B0000__a" ><div class="color_button" style="background: darkred;"></div></li>' +
							'<li id="bbcode__7_8B0000__b" onClick="insertBBCode(\'/C\', this.id);" style="display: none;"><div class="color_button" style="background: darkred;">/</div></li>';
	}				

	htmlBBCodeKeys2 +=		'<li id="bbcode__7_8B4513__a" ><div class="color_button" style="background: saddlebrown;"></div></li>' +
							'<li id="bbcode__7_8B4513__b" style="display: none;"><div class="color_button" style="background: saddlebrown;">/</div></li>';

	if(isBAT){
		var htmlKeypad = '' +
			'<div id="flat-keyboard" style="border-radius: 0px 0px 6px 6px; margin-top: -94px;">' +
				'<div id="keyboard" style="height: 310px; margin-top: 0px;">' +
					'<div id="gray">' +
						'<ul id="Normal_Keys1" onClick=\'keyPressedPfKeyboard(event);\'>'+
							'<li id="key_Q">Q</li>' +
							'<li id="key_W">W</li>' +
							'<li id="key_E">E</li>' +
							'<li id="key_R">R</li>' +
							'<li id="key_T">T</li>' +
							'<li id="key_Y">Y</li>' +
							'<li id="key_U">U</li>' +
							'<li id="key_I">I</li>' +
							'<li id="key_O">O</li>' +
							'<li id="key_P">P</li>' +
							'<li style="margin-left: 38px;" id="key_A">A</li>' +
							'<li id="key_S">S</li>' +
							'<li id="key_D">D</li>' +
							'<li id="key_F">F</li>' +
							'<li id="key_G">G</li>' +
							'<li id="key_H">H</li>' +
							'<li id="key_J">J</li>' +
							'<li id="key_K">K</li>' +
							'<li style="margin-right: 36px;" id="key_L">L</li>' +
						'</ul>' +
						'<ul id="BBCode_Keys1" style="display: none;" onClick=\'insertBBCode(event);\'>'+
							htmlBBCodeKeys1 +
						'</ul>' +
					'</div>' +
					'<div id="blue">' +
						'<ul>' +
							'<li id="key_case" onClick=\'keyCase();\'><img id="capsLockIndicator" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAESSURBVHjaYvr//z8DETgciO8B8W0gdiNGDzGG+gDx9/8I8B6IrQjpY2LAD9yBeDUQcyCJCQDxJiC2wKcRn8GOQLwKzVAYEIYabkSqwWZQQ/nwWCwKxGuBWJ1Yg02hrhFhIAwUgHgrNsPRDdaChqk4A/FAGepyeVwGq0INlWcgHWgD8QoglkA3WB5qqBYD+QCUSlZCwx5ssBgQLwdifQbKgR0QLwJifkZgYj4AZNgzUBesB7n4FQP1wWuQi1mBDGk0iSlA7E2MAUBsCcR/0cQfsQCJ30D8AE3iM5Eu+wPEd0nJeUxEGswIxCyUGEAyGDV41OBRg8kwmJGELE2SwX9pZXAxEF8iYOgXII6ClnAYACDAAAhwsFV1lW3cAAAAAElFTkSuQmCC" alt="" draggable="false" /></li>' +
						'</ul>' +
					'</div>' +
					'<div id="gray">' +
						'<ul id="Normal_Keys2" onClick=\'keyPressedPfKeyboard(event);\'>' +
							'<li id="key_Z">Z</li>' +
							'<li id="key_X">X</li>' +
							'<li id="key_C">C</li>' +
							'<li id="key_V">V</li>' +
							'<li id="key_B">B</li>' +
							'<li id="key_N">N</li>' +
							'<li id="key_M">M</li>' +
						'</ul>' +
						'<ul id="BBCode_Keys2" style="display: none;" onClick=\'insertBBCode(event);\'>'+
							htmlBBCodeKeys2 +
						'</ul>' +
					'</div>' +
					'<div id="blue" style="float: none;">' +
						'<ul>' +
							'<li id="key_delete" onClick=\'keyPressedPfKeyboardDelete();\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAjAgMAAACbV6A9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAMUExURf////////////////WlDnMAAAADdFJOUwB/gL9pIscAAAB0SURBVBjTtc4xFcAgDEVRyMKACCRgAWfgLJWABEQwsED7k6Ex0Ga6w+cdnPvt/K13gcGYjPUlpocPCzFdeWUhpjOOJMR0U6ugVouXZ1rtQRiFIwpJ2Ei7jK4v2s3ohq5dzGaa2sVs1131O2w/y8ZoJON39wB3xYdbuOyKvQAAAABJRU5ErkJggg==" alt="" draggable="false" style="margin-top: -4px;" /></li>' +
							'<li id="key_toggle" onClick=\'ToggleBBCode("0"); toggleLetters2Numbers();\'>?123</li>' +
						'</ul>' +
					'</div>' +
					'<div id="gray">' +
						'<ul>' +
							'<li id="key_space"     onClick=\'keyPressedPfKeyboard(event);\' style="width: 226px;"><img id="key_space_img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAbCAYAAAApvkyGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZDRTI1QTkzNjU5MzExRTJCODBFRTI3MzI4NTFCNTAzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZDRTI1QTk0NjU5MzExRTJCODBFRTI3MzI4NTFCNTAzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkNFMjVBOTE2NTkzMTFFMkI4MEVFMjczMjg1MUI1MDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkNFMjVBOTI2NTkzMTFFMkI4MEVFMjczMjg1MUI1MDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6x5ePLAAAAXUlEQVR42uzWMQ6AIBAEQE78/4/1bKkoTBTE2YqG5CbcJkRmlpWzlcUDCAgICAjYyX7jTvsziJfmPJpzfRr4qU3TwT92cETOUcC0ooDzdTC8ICAgICAgIOAUuQQYAJ/JBz0OY7VCAAAAAElFTkSuQmCC" alt="" draggable="false" style="margin-top: 1px;" /></li>' +
							'<li id="key_up"        onClick=\'changeCursorPosition("up");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAESSURBVHjaYvr//z8DETgciO8B8W0gdiNGDzGG+gDx9/8I8B6IrQjpY2LAD9yBeDUQcyCJCQDxJiC2wKcRn8GOQLwKzVAYEIYabkSqwWZQQ/nwWCwKxGuBWJ1Yg02hrhFhIAwUgHgrNsPRDdaChqk4A/FAGepyeVwGq0INlWcgHWgD8QoglkA3WB5qqBYD+QCUSlZCwx5ssBgQLwdifQbKgR0QLwJifkZgYj4AZNgzUBesB7n4FQP1wWuQi1mBDGk0iSlA7E2MAUBsCcR/0cQfsQCJ30D8AE3iM5Eu+wPEd0nJeUxEGswIxCyUGEAyGDV41OBRg8kwmJGELE2SwX9pZXAxEF8iYOgXII6ClnAYACDAAAhwsFV1lW3cAAAAAElFTkSuQmCC" alt="" draggable="false" /></li>' +  
							'<li id="key_dot"       onClick=\'keyPressedPfKeyboard(event);\'>.</li>' +
							'<li id="key_dbldot"    onClick=\'keyPressedPfKeyboard(event);\'>:</li>' +
							'<li id="key_semicolon" onClick=\'keyPressedPfKeyboard(event);\'>;</li>' +
						'</ul>' +
					'</div>' +
					'<div id="blue">' +
						'<ul>' +
							'<li id="key_enter" onClick=\'sendEnter();\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHgSURBVHja7Jq7S8RAEIeT84UPUBQVC1Gw1FZBtLGwExTstLG0sbEQ8ToR0eZAsBPkKgtFFMQ/RLBU1MIHvkB8o178DU4RgmLCJexmdwY+uMsld/dld2dn9871PM+xKTKOZSHCIizCIizCIizC6qI04vkjYAZ0gQ/F370MnIAVkAeFMBe5EUpLkt3RtOGmwGrcXXpS4546EfbEKC18B+o1Fb4HDZK0RFimJS3iFFyCEn5O000N6KScY5rwExgER4Hj1eAAdJjWpZ/BzS/HX/lmWDWGXduEJUuLsAgXJ/xgm/CebcI5XnBbU1qegT4wxKWef4fhEzSBWVBuUi1NNe7aH6+1gukIwh6T0bVLxx1zYNgJuReV9tVSFiyBdvAGqnzlo2ua8AJY5Me083nIqyESvQZfJglnfbIUF6A3cE7BFOGgrD9xGTeGabpatqmWPrZt8ZAHA0W+h5emLk1ZeB+MgV3f8RbQ/09mpiquEbSlLWlVckuPszxFD9g0udKqBdvOz86kk/Scq0tpWcGtOgq6dV88xBV1YCsNq6U4w1XxobKnJcLRuqhrk/ALeFTkca5C+BasKxLeUJWl58E7V1PNCRcW9PvxFd/kXOhxJ/+IF2ERFmERFmERFmERTii+BRgAtzVSx0DTvH0AAAAASUVORK5CYII=" alt="" draggable="false" style="margin-top: -16px;" /></li>' +
						'</ul>' +
					'</div>' +
					'<div id="blue">' +
						'<ul>' +
							'<li id="key_bbcode" style="width: 264px;" class="" onClick=\'ToggleBBCode("1");\'><img id="BBCode_Img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8BAMAAADI0sRBAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAqUExURf///////////////////////////////////////////////////////2r7TS0AAAANdFJOUwARIjNEVWZ3iJnM3e7td3ONAAAAq0lEQVQ4y2NgGAUjCjDevXu3AZsEB1BCgIEJn7QCUHoCLoM5iZVmqgEadb0AiYEiDbIICAIQDBRpTojoVQQDm/RtBANdmoEhCugTOANTmhUmzUqOtNXdWwgGNqddRjCwSScgGCTqZmCwhvgbwsDqcgM4A1MaGPUOcAZW3Q5wBqZ0NMzwaCyGg8AtBIMUj0FSwR0HBAM1MVXDElM1tsREfkrFmw0IZKJRMKIAALQmETKHdNnYAAAAAElFTkSuQmCC" alt="" draggable="false" style="margin-top: -16px;"/></li>' +
						'</ul>' +
					'</div>' +
					'<div id="gray">' +
						'<ul>' +
							'<li id="key_left"  onClick=\'changeCursorPosition("left");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAYAAADTlvzyAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEgSURBVHjaYvz//z8DEYAfiOcD8WsgzgTifwzkApCFBLAoEG//jwAKROjBiVkIuEcCiFcCsR0DlQATHjl5IF5PTctAAJcP1YF4LRBrM1AZsOCwbCsQK+PQw0zAsfjAH0a0VGoE9ZkCHk2glPoHiBlJsIgRiqOQLbQA4k1ALMpAO/AFZqEV1DJhBhoDUCp1g8YZzS0Dhy3Qh7eBtAoDnQATUqqjm4WVQPyDXhbCEo0PEK8GYg56+BAEtgBxABB/opeFILATaukbGtp3iRFLfWgGzZPiODSBstBnAgU/tpLmLxAX46q3TIH4wX/sgKL6EJcrTwOxFxBfo2UcooNr0Di9SC8LQQBUCvkD8XFq50NCQAyIVwHxKyCOBuLf5FoIEGAATPvs7LQdJNoAAAAASUVORK5CYII=" alt="" draggable="false" /></li>' +
							'<li id="key_down"  onClick=\'changeCursorPosition("down");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADzSURBVHja7JVNCwFRFIZvzFZWM8kCGylLRbKTYmPvt/kFyh+wtmFLsSJslK+SLGzkeE+xme69c68Zu3nr2Zw6z5xuzTmCiISCFriTPnOQlfWrpA44klkGMkdCqEPCLElZMQox2YpDJRbH4lj8g/hp8Uu/ZEXnI89JFotjKE6Bgq+25xXXp+gz5GndPzyxxxOnwSjCaSfA+258F4wjkM5A3n+aMmAaQroERdXN468tfpDuQDnomJbA2kJ6AFXTK83yrYH0DGo255+pgJNGegNNVb9OzNTBRSJ9gI6uN0jMNMDVJ+0G9ZmImTZYgQ3omfS8BRgAbI31wV3qepoAAAAASUVORK5CYII=" alt="" draggable="false" /></li>' +
							'<li id="key_right" onClick=\'changeCursorPosition("right");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAYAAADTlvzyAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEjSURBVHjaYvz//z8DBYAViJcCsRgQhwHxK4I6QBZSgBX+I8AxIJYnpIeJgXrAEog3ArEqPkXUtBAE9IF4AxBr0ctCBqhl24DYFJskIzBcpYB0LxAzg6KUBIP/ATEvEHvjkH8JxH5AfAo90Vz8TzvwGogdkRMNyIf/GWgLPkGzzE5axSE64IMmJB9YHP5noA/4AcQJ9LQQBO4zMdAX/KWnDz8AcTgLnSx7C82Tx0BB+oXGlr2GptBjsFTqDKSXQUsZUoIXpBYUQqJ41DwA4mAgPodctDFANZIK/gCxMhDfwSF/F1rs3UQWZEHSTFaqwyF+Feqzm/SoLU5g8xm6D6kFDoGSPhC/oEd9uAOIQ/BZhpxoyAUgB0+HptREIP5ISANAgAEAHEEN2CYfd8YAAAAASUVORK5CYII=" alt="" draggable="false" /></li>' +
						'</ul>' +
					'</div>' +
					'<div id="blue">' +
						'<ul>' +
							'<li id="key_cancel"  style="width: 133px;" class="" onClick=\'closePfKeyboard(false, "List_Content");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAjCAYAAADizJiTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5MzZGRjRERTlCMEExMUUyODk1Njg0NkIwNjI4NjhFQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MzZGRjRERDlCMEExMUUyODk1Njg0NkIwNjI4NjhFQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQkE3RDFEQUYyOUFFMjExQkY4NkRDQzBDNkQwODQ3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgP6w2kAAAEOSURBVHjazNjhCoMwDATgOn3uSvbekiEIG0PW3OXaLiDbD3d+DNKmLu5eGlWvz2fRFpZ7Qn9c1d9VG/ciF5wbDVNiqVwkTIGlc9GwDDaVy4Qx2HTu46u3VqBr7aNzW91tQO4a7XpzrKron/Tr2VAzKbAyZGt5ymClyBaUxcqRESiDlSOj0F5YQ9ZhZMG2WUgUqsIasasVZr+20UgWymJp5N0WGq1j0G/Cg7NiW5SMiCORKexoJI2dgaSws5AwVo008TxLn0Kj66Qc23Myl2K7Hh+U2K7HByU2cwo93xntgft28L2V9BTKDBipXCY0MwXRuWhoalTL5CKhCiSduwUa4e57tuDcJfDG+S/qJcAAD2lfl8d7hcoAAAAASUVORK5CYII=" alt="" draggable="false" style="margin-top: -3px;" /></li>' +
							'<li id="key_confirm" style="width: 129px;" class="" onClick=\'closePfKeyboard(true, "List_Content");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAjCAYAAADizJiTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQUIxRDZCQTlCMEExMUUyQTcxMEEzNzJDMzE5ODFDMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQUIxRDZCOTlCMEExMUUyQTcxMEEzNzJDMzE5ODFDMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQkE3RDFEQUYyOUFFMjExQkY4NkRDQzBDNkQwODQ3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psw8DHIAAADdSURBVHja7NjrCoMwDAXg6fbcGWcv3lHYj9GbaTpPMvBAQaHgh61NcEsp3f4heyCLfEYzj0BIfN2/qhl56Z2HpDpSzouIbGKjIivsHmRP9nL33KOaN5kDz6U3IdlQM5IJXUKyoMtIBvQnyCOotCqEB3IElVE5YyN7UFXtZSJbUHXtZSJL6FTtZSJLKJQPEjaytfQW7OnI3sc0g6UgR8eTFktBHh34iILUlFBEQGprPbyRM00JPJGz3RO8kJY2Dx5Iaz8KNnKlcQYTmYf139Ozc31atuu34wUNnrcAAwCJ1ARaCuqr5QAAAABJRU5ErkJggg==" alt="" draggable="false" style="margin-top: -2px;" /></li>' +
						'</ul>' +
					'</div>' +
				'</div>' +
			'</div>';
	}
	else{
		var htmlKeypad = '' +
		'<div id="flat-keyboard">' +
			'<div id="keyboard" style="height: 248px;">' +
				'<div id="gray">' +
					'<ul id="BBCode_Keys1" onClick=\'insertBBCode(event);\'>'+
						htmlBBCodeKeys1 +
					'</ul>' +
				'</div>' +
				'<div id="gray">' +
					'<ul id="BBCode_Keys2" onClick=\'insertBBCode(event);\'>'+
						htmlBBCodeKeys2 +
					'</ul>' +
				'</div>' +
				'<div id="blue" style="clear: both;">' +
					'<ul>' +
						'<li id="key_cancel"  style="width: 378px;" class="" onClick=\'closePfKeyboard(false, "List_Content");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAjCAYAAADizJiTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5MzZGRjRERTlCMEExMUUyODk1Njg0NkIwNjI4NjhFQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MzZGRjRERDlCMEExMUUyODk1Njg0NkIwNjI4NjhFQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQkE3RDFEQUYyOUFFMjExQkY4NkRDQzBDNkQwODQ3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgP6w2kAAAEOSURBVHjazNjhCoMwDATgOn3uSvbekiEIG0PW3OXaLiDbD3d+DNKmLu5eGlWvz2fRFpZ7Qn9c1d9VG/ciF5wbDVNiqVwkTIGlc9GwDDaVy4Qx2HTu46u3VqBr7aNzW91tQO4a7XpzrKron/Tr2VAzKbAyZGt5ymClyBaUxcqRESiDlSOj0F5YQ9ZhZMG2WUgUqsIasasVZr+20UgWymJp5N0WGq1j0G/Cg7NiW5SMiCORKexoJI2dgaSws5AwVo008TxLn0Kj66Qc23Myl2K7Hh+U2K7HByU2cwo93xntgft28L2V9BTKDBipXCY0MwXRuWhoalTL5CKhCiSduwUa4e57tuDcJfDG+S/qJcAAD2lfl8d7hcoAAAAASUVORK5CYII=" alt="" draggable="false" /></li>' +
						'<li id="key_confirm" style="width: 377px;" class="" onClick=\'closePfKeyboard(true, "List_Content");\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAjCAYAAADizJiTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQUIxRDZCQTlCMEExMUUyQTcxMEEzNzJDMzE5ODFDMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQUIxRDZCOTlCMEExMUUyQTcxMEEzNzJDMzE5ODFDMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQkE3RDFEQUYyOUFFMjExQkY4NkRDQzBDNkQwODQ3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU1Nzg4RUM3NDRFMjExQTNCREVFNkMxQjk4MkM0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psw8DHIAAADdSURBVHja7NjrCoMwDAXg6fbcGWcv3lHYj9GbaTpPMvBAQaHgh61NcEsp3f4heyCLfEYzj0BIfN2/qhl56Z2HpDpSzouIbGKjIivsHmRP9nL33KOaN5kDz6U3IdlQM5IJXUKyoMtIBvQnyCOotCqEB3IElVE5YyN7UFXtZSJbUHXtZSJL6FTtZSJLKJQPEjaytfQW7OnI3sc0g6UgR8eTFktBHh34iILUlFBEQGprPbyRM00JPJGz3RO8kJY2Dx5Iaz8KNnKlcQYTmYf139Ozc31atuu34wUNnrcAAwCJ1ARaCuqr5QAAAABJRU5ErkJggg==" alt="" draggable="false" /></li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
		'</div>';

		setCSS('Keypad_Box', 'margin-top', '-5px');
		setCSS('Input_Area', 'height', '137px');
	}

	newKeypad_inputString = g_markupText
	var inputfieldArea = $('#Input_Area');
	inputfieldArea.val(newKeypad_inputString);

	setHTML('Keypad_Box', htmlKeypad);
	toggleLayers(0);

	changeCursorPosition("set2End");

	if(!isBAT){
		if(typeof isFirstInit == "undefined"){
			isFirstInit = false;	
		}
		if(!isFirstInit){
			inputfieldArea.bind("click", function(e){
				getFocusPosisionNewKeyboard(e);
			});
			inputfieldArea.bind("keypress", function(e){
				getFocusPosisionNewKeyboard(e);
			});
			inputfieldArea.bind("keyup", function(e){
				getFocusPosisionNewKeyboard(e);
			});
			inputfieldArea.bind("input", function(e){
				getFocusPosisionNewKeyboard(e);
			});
			isFirstInit = true;
		}
	}
}


function closePfKeyboard(isConfirm, tagId){
	if(isConfirm){
		g_markupText = newKeypad_inputString;
		parseMarkup2HTML();




			$('#' + tagId).html(g_HTML);
			submitSET("Text", g_markupText);
			submitSET("HTML", g_HTML);









	}




	newKeypad_inputString = "";





	toggleLayers(1);
}


function ToggleBBCode(isBBCode){
	if(isBBCode == 1){
		g_BBCodeBoxState ^= 1;
	}

	var BBCode_Img = "";

	

	if(isBBCode == 1 && g_BBCodeBoxState == 1){
		
		BBCode_Img = "data:image/png;base64,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";

		hideHTML('Normal_Keys1');
		hideHTML('Normal_Keys2');
		showHTML('BBCode_Keys1');
		showHTML('BBCode_Keys2');

		$('#key_case').addClass('inactive');
	}
	else{
		g_BBCodeBoxState = 0;
		
		BBCode_Img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8BAMAAADI0sRBAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAqUExURf///////////////////////////////////////////////////////2r7TS0AAAANdFJOUwARIjNEVWZ3iJnM3e7td3ONAAAAq0lEQVQ4y2NgGAUjCjDevXu3AZsEB1BCgIEJn7QCUHoCLoM5iZVmqgEadb0AiYEiDbIICAIQDBRpTojoVQQDm/RtBANdmoEhCugTOANTmhUmzUqOtNXdWwgGNqddRjCwSScgGCTqZmCwhvgbwsDqcgM4A1MaGPUOcAZW3Q5wBqZ0NMzwaCyGg8AtBIMUj0FSwR0HBAM1MVXDElM1tsREfkrFmw0IZKJRMKIAALQmETKHdNnYAAAAAElFTkSuQmCC";

		hideHTML('BBCode_Keys1');
		hideHTML('BBCode_Keys2');
		showHTML('Normal_Keys1');
		showHTML('Normal_Keys2');

		$('#key_case').removeClass('inactive');
	}

	$('#BBCode_Img').attr('src', BBCode_Img);
}

function keyPressedPfKeyboard(e){
	var inputChar = "";

	if(newKeypad_inputString.length <= 1000){
		if((e.target.id == 'key_space') || (e.target.id == 'key_space_img')){
			inputChar = " ";
		}	
		else{
			inputChar = e.target.innerHTML;
		}

		newKeypad_inputString = [newKeypad_inputString.slice(0, newKeypad_cursorposition), inputChar, newKeypad_inputString.slice(newKeypad_cursorposition)].join('');
		newKeypad_cursorposition++;
	}

	


	if(!capsLock && !keyState){
		toogleLettersUpperlower();
	}

	changeCursorPosition("set2Current");
}


function keyPressedPfKeyboardDelete(){
	if(newKeypad_cursorposition > 0){
		
		newKeypad_inputString = [newKeypad_inputString.slice(0, newKeypad_cursorposition-1), newKeypad_inputString.slice(newKeypad_cursorposition)].join('');
		
		
		newKeypad_cursorposition--;
	}

	changeCursorPosition("set2Current");
}


function sendEnter(){
	var inputBBCode = markupTagObj.searchKeyClose[9];

	if(isBAT){
		inputBBCode += "\n";
	}

	newKeypad_inputString = [newKeypad_inputString.slice(0, newKeypad_cursorposition), inputBBCode, newKeypad_inputString.slice(newKeypad_cursorposition)].join('');
	newKeypad_cursorposition += inputBBCode.length;

	changeCursorPosition("set2Current");
}


function toggleLayers(isShown){
	if(isShown){
		hideHTML('Input_Box');
		showHTML('Preview_Text');
	}
	else{
		hideHTML('Preview_Text');
		showHTML('Input_Box');
	}
}


function insertBBCode(e){
	var inputBBCode = "";
	var tagId = e.target.id;

	if(tagId == ""){
		tagId = e.target.parentNode.id;
	}

	var tag = tagId.split("__");
	var tagValue = tag[1].split("_");

	
	if(tag[2] == "a"){
		hideHTML(tag[0] + '__' + tag[1] + '__' + 'a');
		showHTML(tag[0] + '__' + tag[1] + '__' + 'b');

		inputBBCode = markupTagObj.searchKeyOpen[tagValue[0]];

		if(tagValue[0] == 7){
			inputBBCode += "#" + tagValue[1] + "]";
		}
		else if(tagValue[0] == 8){
			inputBBCode += tagValue[1] + "]";
		}
	}
	else{
		hideHTML(tag[0] + '__' + tag[1] + '__' + 'b');
		showHTML(tag[0] + '__' + tag[1] + '__' + 'a');
		inputBBCode = markupTagObj.searchKeyClose[tagValue[0]];
	}

	newKeypad_inputString = [newKeypad_inputString.slice(0, newKeypad_cursorposition), inputBBCode, newKeypad_inputString.slice(newKeypad_cursorposition)].join('');
	newKeypad_cursorposition += inputBBCode.length;

	changeCursorPosition("set2Current");
}


function getFocusPosisionNewKeyboard(e){
	var inputfield = document.getElementById('Input_Area');






	
		newKeypad_cursorposition = inputfield.selectionEnd;
	

	if(e.type == "click"){
		changeCursorPosition("set2current");
	}
	else if(e.type == "keyup"){
		changeCursorPosition("set2current");
	}
	else if(e.type == "input"){
		newKeypad_inputString = inputfield.value;
	}
	else{
		var char = e.keyCode;

		if((char == 10) ||(char == 13)){
			sendEnter();
		}
	}
}


function changeCursorPosition(cmd){
	var inputfield = $('#Input_Area');
	var strLength = inputfield.val().length;

	if(isBAT){
		if(cmd == "set2End"){
			newKeypad_cursorposition = strLength;
		}

		if(cmd == "left"){
			if(newKeypad_cursorposition != 0){
				newKeypad_cursorposition--;
			}
		}

		if(cmd == "right"){
			if(newKeypad_cursorposition < strLength){
				newKeypad_cursorposition++;
			}
		}

		if((cmd == "up") || (cmd == "down")){
			var rowArray = [];
			var rowcount = 0;
			var cursorRow = 0;
			var cursorCol = 0;
			var charCount = 0;
			var preCharCount = 0;
			var preCharRowCount = 0;
			var currentCharRowCount = 0;
			var nextCharRowCount = 0;
			var isNotCursorfound = true;
			var isNextCharRowfound = false;
			
			rowString = newKeypad_inputString.replace('\r', '\n');
			rowArray = rowString.split('\n');
			
			for(var i = 0; i < rowArray.length; i++){
				var subRowArray = [];
				rowArray[i] = getSubRows(rowArray[i], subRowArray, 0);

				for(var j = 0; j < rowArray[i].length; j++){
					rowcount += 1;
					charCount += rowArray[i][j];

					if(!isNotCursorfound && !isNextCharRowfound){
						nextCharRowCount = rowArray[i][j];
						isNextCharRowfound = true;
					}

					if((charCount > newKeypad_cursorposition) && isNotCursorfound){
						isNotCursorfound = false;
						cursorRow = rowcount;
						cursorCol = newKeypad_cursorposition - preCharCount;
						currentCharRowCount = rowArray[i][j];
					}

					if(isNotCursorfound){
						preCharRowCount = rowArray[i][j];
					}

					preCharCount = charCount;
				}
			}
			
				log(3, "chars prev line: " + preCharRowCount);
				log(3, "chars current line: " + currentCharRowCount);
				log(3, "chars next line: " + nextCharRowCount);
				log(3, "cursor row pos: " + cursorRow);
				log(3, "curor col pos: " + cursorCol);

			if(cmd == "down"){
				if(cursorCol > nextCharRowCount){
					newKeypad_cursorposition = newKeypad_cursorposition + nextCharRowCount + (currentCharRowCount - cursorCol) - 1;
				}
				else{
					newKeypad_cursorposition = newKeypad_cursorposition + cursorCol + (currentCharRowCount - cursorCol);
				}

				if(newKeypad_cursorposition > strLength){
					newKeypad_cursorposition = strLength;
				}
			}
			else if(cmd == "up"){
				if(cursorCol > preCharRowCount){
					newKeypad_cursorposition = newKeypad_cursorposition - cursorCol - 1;	
				}
				else{
					newKeypad_cursorposition = newKeypad_cursorposition - cursorCol - (preCharRowCount - cursorCol);
				}

				if(newKeypad_cursorposition  < 0){
					newKeypad_cursorposition = 0;
				}
			}
		}

		inputfield.focus();
		inputfield.val(newKeypad_inputString);
		inputfield[0].setSelectionRange(newKeypad_cursorposition, newKeypad_cursorposition);
		
		log(3, "cursor char pos:" + newKeypad_cursorposition);

		





	}
	else{
		if(cmd == "set2End"){
			newKeypad_inputString = inputfield.val();
			inputfield.focus();
			newKeypad_cursorposition = strLength;
			inputfield[0].setSelectionRange(newKeypad_cursorposition, newKeypad_cursorposition);
		}
		else{
			inputfield.focus();
			inputfield.val(newKeypad_inputString);
			inputfield[0].setSelectionRange(newKeypad_cursorposition, newKeypad_cursorposition);
		}
	}
}


function getSubRows(newKeypad_inputString, subRowArray, i){
	if(newKeypad_inputString.length < 51){
		subRowArray[i] = newKeypad_inputString.length + 1;
	}
	else{
		pos = newKeypad_inputString.lastIndexOf(" ", 69);

		if(pos != -1){
			subRowArray[i] = pos + 1;
			subRowArray = getSubRows(newKeypad_inputString.substring(pos + 1, newKeypad_inputString.length), subRowArray, i + 1);
		}
	}

	return subRowArray;
}
