


initPage();

function initPage(){

	InitDataPostArgs = getCurrentModelName(InitDataPostArgs);
	GetTd(getControlMapObject(InitDataPostArgs), g_InitEvent);


	setInterval(JsonFunction, 250);
}



function getControlMapObject(InitDataPostArgs){
	if(typeof InitDataPostArgs == "undefined"){
		InitDataPostArgs = new Object();
	}

	Item = new Object();
	Item.Control = 0;
	Item.Name = "";
	servos = new Array();
	Item.Servos = servos;

	servoItems = new Array(Item);

	ControlMap = new Object();
	ControlMap.FunctionUsedCount = 0;
	ControlMap.ServoUsedCount = 0;

	ControlMap.Item = servoItems;

	InitDataPostArgs.ControlMap = ControlMap;

	return InitDataPostArgs;	
}



function onEVENT_INIT(e){
	try{
		checkHTMLHeader('Model_Name');
		setHTML('Model_Name', e.EventData.ModelName);

		
		var ServoUsedCount    = e.EventData.ControlMap.ServoUsedCount;
		var FunctionUsedCount = e.EventData.ControlMap.FunctionUsedCount;
		var borderBottomClass = "";
		var borderRightClass  = "";

		var htmlHeaderContainer = '<div class="list_header" style="width: ' + (298 + (ServoUsedCount * 47)) + 'px;"><div id="Control_Map_Control_Label" class="cm_control">' + 'Geber' + '</div><div id="Control_Map_Function_Label" class="cm_function">' + 'Funktion' + '</div>';

		for(var i = 0; i < ServoUsedCount; i++){
			if(((i + 1) % 3) == 0){
				borderRightClass = "thick_border_right";
			}	
			else{
				borderRightClass = "";
			}

			htmlHeaderContainer += '<div class="cm_servo ' + borderRightClass + '">S' + (i + 1) + '</div>';
		}

		htmlHeaderContainer += '</div>';

		setHTML('List_Header', htmlHeaderContainer);

		var htmlOuterContainer = "";

		for(var i = 0; i < FunctionUsedCount; i++){
			Control = e.EventData.ControlMap.Item[i].Control;
			Name    = e.EventData.ControlMap.Item[i].Name;
			Servos  = e.EventData.ControlMap.Item[i].Servos;

			if(((i + 1) % 3) == 0){
				borderBottomClass = "thick_border_bottom";
			}
			else{
				borderBottomClass = "";
			}

			htmlOuterContainer += getOfControlMapRow(i, Control, Name, Servos, ServoUsedCount, borderBottomClass, borderRightClass);
		}

		setCSS('scrollContainerInnerHorizontal', 'width', (298 + (ServoUsedCount * 47)) + 'px');

		if(isBAT){
			setCSS('scrollContainerInnerVertical', 'width', (296 + (ServoUsedCount * 47)) + 'px');
		}

		$('#scrollContainerInnerVertical').html(htmlOuterContainer);

		if(typeof init == "undefined"){
			init = true;
		}

		if(init){
			initScrollbarsControlMap();	
			init = false;
		}
		else{
			ScrollRefresh();
		}
	}catch(err){
		onError(err, "Error Init: ", false);
	}
}



function getOfControlMapRow(Index, Control, Name, Servos, ServoUsedCount, borderBottomClass, borderRightClass){
	var htmlServos    = "",
		servoSetClass = ""; 
	
	for(var i = 0; i < ServoUsedCount; i++){
		if(((i + 1) % 3) == 0){
			borderRightClass = "thick_border_right";
		}	
		else{
			borderRightClass = "";
		}	
		
		for(var j = 0; j < Servos.length; j++){
			if(i == Servos[j]){
				servoSetClass = "servo_set";
				break;
			}
			else{
				servoSetClass = "";
			}
		}
		
		htmlServos += '<div class="cm_servo ' + borderRightClass + ' ' + servoSetClass + '"></div>';
	}	

	var htmlInnerContainer = '' +
		'<div class="list_content_row ' + borderBottomClass + '" style="width: ' + (298 + (ServoUsedCount * 47)) + 'px;">' +
			'<div class="cm_control no_edit">' +
				'<img id="Function_' + Index + '_Control" src="" width="85" height="61" alt="" draggable="false" />' +
				'<script type="text/javascript">control2image("Function_' + Index + '_Control", ' + Control + ');</script>' +
			'</div>' +
			'<div class="cm_function thick_border_right no_edit">' + Name + '</div>' +
			htmlServos +
		'</div>';
	
	return htmlInnerContainer;
}


function initScrollbarsControlMap(){
	(function($){
		if(isBAT){
			var getHeight_visible  = 351;
			var getHeight_dragrail = 318;
			var getHeight_total    = $('#scrollContainerInnerVertical').height();
			var getHeight_ratio    = getHeight_dragrail/getHeight_total;

			var getWidth_visible   = 674;
			var getWidth_dragrail  = 504;
			var getWidth_total     = $('#scrollContainerInnerHorizontal').width();
			var getWidth_ratio     = getWidth_dragrail/getWidth_total;



				$('.scrollContainerOuterHorizontal').mCustomScrollbar({horizontalScroll:true});
				$('.scrollContainerOuterVertical').mCustomScrollbar({});
				
				$('#Dragger_1').css({'width': Math.floor(getWidth_visible * getWidth_ratio) + 'px !important'});
				$('#scrollTool_1').css({'top': '373px !important', 'overflow': 'visible'});
				
				$('#Dragger_2').css({'height': Math.floor(getHeight_visible * getHeight_ratio) + 'px !important'});
				$('#Dragger_2').children().css({'line-height': Math.floor(getHeight_visible * getHeight_ratio) + 'px !important'});
				$('#scrollTool_2').css({'left': '662px !important'});


			
			var topValue  = 0,
				leftValue = 0;

			var fixedContainerHeight  = $('.scrollContainerOuterVertical').innerHeight();
			var fixedContainerWidth   = $('.scrollContainerOuterHorizontal').innerWidth();
			var scrollContainerHeight = $('#scrollContainerInnerVertical').innerHeight();
			var scrollContainerWidth  = $('#scrollContainerInnerHorizontal').innerWidth();
				
			var maxPadding     = (scrollContainerHeight - fixedContainerHeight) * (-1),
				maxPaddingLeft = (scrollContainerWidth - fixedContainerWidth) * (-1),
				max = false,
				min = false,
				maxLeft = false,
				minLeft = false;

			$(window).keypress(function (e){				
				var c = e.charCode;
				
				if((c == CONST_SCROLLING_Key_g) || (c == CONST_SCROLLING_Key_h) || (c == CONST_SCROLLING_Key_j)){
					min = false;

					switch(c){
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
						$('#scrollContainerInnerVertical').animate({'top': topValue + 'px'}, CONST_SCROLLING_AnimationSpeed);
						$('#scrollTool_2').animate({'top': Math.floor(topValue * getHeight_ratio * (-1)) + 'px'}, CONST_SCROLLING_AnimationSpeed);
						$('#scrollTool_1').css({'top': (373 + Math.floor(topValue/140)) + 'px !important'});

						if(topValue == 0){
							max = true;
						}
					}
				}

				if((c == CONST_SCROLLING_Key_b) || (c == CONST_SCROLLING_Key_n)|| (c == CONST_SCROLLING_Key_m)){
					max = false;

					switch(c){
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
						$('#scrollContainerInnerVertical').animate({'top': topValue + 'px'}, CONST_SCROLLING_AnimationSpeed);
						$('#scrollTool_2').animate({'top': Math.floor(topValue * getHeight_ratio * (-1) * (-1/120)) + 'px'}, CONST_SCROLLING_AnimationSpeed);
						$('#scrollTool_1').css({'top': (373 + Math.floor(topValue/140)) + 'px !important'});

						if(topValue == maxPadding){
							min = true;
						}
					}	
				}
				

				
				if((c == CONST_SCROLLING_Key_w) || (c == CONST_SCROLLING_Key_s) || (c == CONST_SCROLLING_Key_x)){
					minLeft = false;

					switch(c){
						case CONST_SCROLLING_Key_w : 	leftValue += CONST_SCROLLING_StepSmall;		CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepSmall;		break; 
						case CONST_SCROLLING_Key_s : 	leftValue += CONST_SCROLLING_StepMiddle;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepMiddle;	break; 
						case CONST_SCROLLING_Key_x : 	leftValue += CONST_SCROLLING_StepBig;		CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepBig;		break; 
					}

					if(leftValue > 0){
						leftValue = 0;
					}
					else{
						maxLeft = false;
					}

					if(!maxLeft){
						$('#scrollContainerInnerHorizontal').animate({'left': leftValue + 'px'}, CONST_SCROLLING_AnimationSpeed);
						$('#Dragger_1').animate({'left': (leftValue * getWidth_ratio * (-1)) + 'px'}, CONST_SCROLLING_AnimationSpeed);
						$('#scrollTool_2').animate({'left': (Math.abs(leftValue) + 662) + 'px'}, CONST_SCROLLING_AnimationSpeed);

						if(leftValue == 0){
							maxLeft = true;
						}
					}
				}

				if((c == CONST_SCROLLING_Key_e) || (c == CONST_SCROLLING_Key_d)|| (c == CONST_SCROLLING_Key_c)){
					maxLeft = false;

					switch(c){
						case CONST_SCROLLING_Key_e :	leftValue -= CONST_SCROLLING_StepSmall;		CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepSmall;		break; 
						case CONST_SCROLLING_Key_d : 	leftValue -= CONST_SCROLLING_StepMiddle;	CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepMiddle;	break; 
						case CONST_SCROLLING_Key_c : 	leftValue -= CONST_SCROLLING_StepBig;		CONST_SCROLLING_AnimationSpeed = CONST_SCROLLING_StepBig;		break; 
					}

					if(leftValue < maxPaddingLeft){
						leftValue = maxPaddingLeft;
					}
					else{
						minLeft = false;
					}

					if(!minLeft){
						$('#scrollContainerInnerHorizontal').animate({'left': leftValue + 'px'}, CONST_SCROLLING_AnimationSpeed);
						$('#Dragger_1').animate({'left': (leftValue * getWidth_ratio * (-1)) + 'px'}, CONST_SCROLLING_AnimationSpeed);
						$('#scrollTool_2').animate({'left': (Math.abs(leftValue) + 662) + 'px'}, CONST_SCROLLING_AnimationSpeed);

						if(leftValue == maxPaddingLeft){
							minLeft = true;
						}
					}
				}
			});
		}
		else{
			$(".scrollContainerOuterHorizontal").mCustomScrollbar({
				 horizontalScroll:true,
				 callbacks:{
				 	whileScrolling:function(){
				        pixel = 674 - mcs.left;
				        setCSS('scrollContainerInnerVertical', 'width', pixel + 'px');
				       }
				   }
			});
			$(".scrollContainerOuterVertical").mCustomScrollbar({callbacks:{whileScrolling:function(){}}});
		}
	})(jQuery);
}

