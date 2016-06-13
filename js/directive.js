var appDirtive = angular.module('appDirtive', ['ngTouch']);

appDirtive.directive('cube', ['$document', function($document) {
	return {
	    template: 
	    '<div>' + 
	    	'<control-pannel pannel-button-maping = "cubeButtonMaping"></control-pannel>' +
	    	'<cube-faces ng-repeat = "(faceIndex,innerFaceMaping) in facesMaping" faces-position = "faceIndex" is-safari = isSafari face-dimension = "cubeDimension">' + 
	    		'<div cube-inner-container ng-repeat = "(innerFaceIndex, innerFaceData) in innerFaceMaping" face-index = "faceIndex" face-dimension = "cubeDimension" is-safari = "isSafari" spin-effect = "innerFaceData.spin">' + 
	    			'<cube-inner-faces face-index = "faceIndex" inner-face-index = "innerFaceIndex" inner-face-data = "innerFaceData" face-dimension = "cubeDimension" class = "{{innerFaceData.value}}">' +
					'</cube-inner-faces>' +
				'</div>' +
			'</cube-faces>' + 
		'</div>' + 
		'<rotate-view-pannel></rotate-view-pannel>' +
		'<timer></timer>',
	    restrict: 'E',
		controller: function($scope) {
			this.passRotateData = function(x,y) {
				$scope.rotateViewX = x;
				$scope.rotateViewY = y;
			};
		},
	    link: function(scope, element, attrs) {
	    	var startX = 0, startY = 0;
			//Cube rotate effect
			var cube = element.find('div');
			var rotateDegX = -25;
			var rotateDegY = -25;
			var rotatePreDegX, rotatePreDegY;
			var cubeAdjustPosition = scope.cubeDimension;

			function SetCubeView (rotateDegX, rotateDegY, scaleView){
				var transformation = 'rotatex(' + rotateDegX + 'deg) rotatey(' + rotateDegY + 'deg) scale3d(' + scaleView + ',' + scaleView + ',' + scaleView +')';

				cube.css({
					position: 'relative',		
					'transform-style':' preserve-3d',
					'-webkit-transform-style': 'preserve-3d',
					'-moz-transform-style': 'preserve-3d',

			    	'-moz-transform': transformation,

	                '-webkit-transform': transformation,

				    '-o-transform': transformation,

	                transform: transformation,

	                top: (-scope.cubeDimension * 50 + 120) + 'px',

	                left: (-scope.cubeDimension * 50 + 120) + 'px',

					//width: scope.cubeDimension * 100 + 'px',
					//height: scope.cubeDimension * 100 + 'px',
	                'transform-origin': scope.cubeDimension * 50 + 'px ' + scope.cubeDimension * 50 + 'px ' + '0',
					'-webkit-transform-origin': scope.cubeDimension * 50 + 'px ' + scope.cubeDimension * 50 + 'px ' + '0',

				});
			}
			
			scope.$watch('cubeDimension', function(newValue, oldValue) {
				scaleView = 2.6 / newValue;
	      		SetCubeView(rotateDegX, rotateDegY, scaleView);
	      	});

			cube.on('mousedown', function(event) {
		        // Prevent default dragging of selected content
		        event.preventDefault();
		        startX = event.pageX;
		        startY = event.pageY;
		        $document.on('mousemove', mousemove);
		        $document.on('mouseup', mouseup);
		        rotatePreDegX = rotateDegX;
		        rotatePreDegY = rotateDegY;	
	      	});


	      	function mousemove(event) {
		        rotateDegX = -(event.pageY - startY) + rotatePreDegX;
		        rotateDegY =  (event.pageX - startX) + rotatePreDegY;
        		SetCubeView(rotateDegX, rotateDegY, scaleView);
	      	};

	      	function mouseup() {
		        $document.off('mousemove', mousemove);
		        $document.off('mouseup', mouseup);
	      	};

	      	scope.$watchGroup(['rotateViewX', 'rotateViewY'], function() {
	      		var rotateSensitiveLvl = 4;
	      		rotateViewDegX = -scope.rotateViewY * rotateSensitiveLvl;
	      		rotateViewDegY = scope.rotateViewX * rotateSensitiveLvl;
        		SetCubeView(rotateViewDegX, rotateViewDegY, scaleView);
	      	});
		        	


	    }
	}

}])

appDirtive.directive('cubeFaces', function() {
	return {
	    restrict: 'E',
	    scope: {
	    	faceDimension : '=',
            facesPosition: '=',
            isSafari: '='
	    },	    
	    link: function(scope, element, attributes) {


			if (!scope.isSafari) {
				//offset faces to form 3d cube
				offsetDistance = scope.faceDimension * 50;

			    switch (scope.facesPosition) {
				    case 0:
				        posotion = 'translateZ(' + offsetDistance + 'px)';
				        break;
				    case 1:
				        posotion = 'translateZ(-' + offsetDistance + 'px)';
				        break;
				    case 2:
				        posotion = 'rotateX(90deg) translateZ(' + offsetDistance + 'px)';
				        break;
				    case 3:
				        posotion = 'rotateX(90deg) translateZ(-' + offsetDistance + 'px)';
				        break;
				    case 4:
				        posotion = 'rotateY(90deg) translateZ(' + offsetDistance + 'px)';
				        break;
				    case 5:
				        posotion = 'rotateY(90deg) translateZ(-' + offsetDistance + 'px)';
				        break;			        
				    default:
				    	console.log('directive cubeface positoin error');
				};

			} else {
				//Special faces postion for safari
				switch (scope.facesPosition) {
			    case 0:
			        posotion = '';
			        break;
			    case 1:
			        posotion = '';
			        break;
			    case 2:
			        posotion = 'rotateX(90deg)';
			        break;
			    case 3:
			        posotion = 'rotateX(90deg)';
			        break;
			    case 4:
			        posotion = 'rotateY(90deg)';
			        break;
			    case 5:
			        posotion = 'rotateY(90deg)';
			        break;			        
			    default:
			    	console.log('directive cubeface positoin error');
				};

			}
			
	    	element.css({
	    		width:  scope.faceDimension * 100 + 'px',
				height: scope.faceDimension * 100 + 'px',
	        	'-moz-transform': posotion,
                '-webkit-transform': posotion,
                '-o-transform': posotion,
                transform: posotion,			

	    	}); 
		}
	}
})

appDirtive.directive('cubeInnerContainer', function() {
	return {
	    restrict: 'A',
	    scope: {
	    	faceIndex : '=',
	    	faceDimension: '=',
	    	spinEffect: '=',
	    	isSafari: '='
	    },
	    link: function(scope, element, attributes) {
	    	scope.$watch('spinEffect', function() {
	    		var adjustAxis = 50 * scope.faceDimension;
    			if (scope.faceIndex % 2 == 0) {
	    			var sign = -1;
	    		} else {
	    			var sign = 1;
	    		}
	    		if (scope.isSafari) {

	    			if (scope.spinEffect == '') {
	    				element.css({
			    			'-moz-transform': 'translateZ(' + -sign * adjustAxis + 'px)',
						    '-webkit-transform': 'translateZ(' + -sign * adjustAxis + 'px)',
						    '-o-transform': 'translateZ(' + -sign * adjustAxis + 'px)',
						    transform: 'translateZ(' + -sign * adjustAxis + 'px)',
		    				'transform-origin': '50% 50% 0',
							'-webkit-transform-origin': '50% 50% 0'
				    	});	  

	    			} else {
						element.css({

			    			'-moz-transform': 'translateZ(0px)',
						    '-webkit-transform': 'translateZ(0px)',
						    '-o-transform': 'translateZ(0px)',
						    transform: 'translateZ(0px)',
							'transform-origin': adjustAxis + 'px ' + adjustAxis + 'px ' + sign *adjustAxis + 'px ',
							'-webkit-transform-origin': adjustAxis + 'px ' + adjustAxis + 'px ' + sign *adjustAxis + 'px '
				    	});	    				
	    			}

	    		} else {	
					element.css({
						'transform-origin': adjustAxis + 'px ' + adjustAxis + 'px ' + sign *adjustAxis + 'px ',
						'-webkit-transform-origin': adjustAxis + 'px ' + adjustAxis + 'px ' + sign *adjustAxis + 'px '
			    	});
	    		}

	    		if (scope.spinEffect == "") {
	    			element.removeClass('spin_effect_yp_s spin_effect_yp_t spin_effect_yn_s spin_effect_yn_t spin_effect_xp_s spin_effect_xp_t spin_effect_xn_s spin_effect_xn_t spin_effect_zp_s_0 spin_effect_zp_s_1 spin_effect_zp_t spin_effect_zn_s_0 spin_effect_zn_s_1 spin_effect_zn_t');
	    		} else {
	    			element.addClass(scope.spinEffect);
	    		}
	    		

	    		
	    	});
	    	
		}
	}
})

appDirtive.directive('cubeInnerFaces', function() {
	return {
		template: '<div>{{faceIndex}}-{{innerFaceIndex}}</div>',//{{faceIndex}}-{{innerFaceIndex}}-{{innerFaceData.value}}-id:{{innerFaceData.id}}
	    restrict: 'E',
	    scope: {
	    	faceDimension : '=',
	    	faceIndex: '=',
	        innerFaceIndex: '=',
	        innerFaceData: '='
	    },	    
	    link: function(scope, element, attributes) {

	    	var borderWidth = 3, width = 100, height = 100;
	    	//calculate inner face position	    	
	    	var row = Math.floor(scope.innerFaceIndex / scope.faceDimension);
	    	var column = scope.innerFaceIndex % scope.faceDimension;
	    	var offtop = 100 * row;
	    	var offleft = 100 * column;

			var innerface = element.children();
			

	    	element.css({
				position: 'absolute',
				width: width + 'px',
				height: height + 'px',
				background: '#000',
				left: offleft + 'px',
				top: offtop + 'px',

	    	});  	

	    	
	    	innerface.css({
	    		margin: borderWidth + 'px',
	    		'border-radius': '8px',
	    		//border: borderWidth +'#000 solid',
	    		width: width - borderWidth * 2 + 'px',
				height: height - borderWidth * 2 + 'px',
	    	})	    	
		}
	}
})


appDirtive.directive('controlPannel', function() {
	return {
		template: 
			'<control-pannel-button-group ng-repeat="buttongroup in cubeButtonMaping" button-position = "buttongroup[0].buttonPosition" button-number = "buttongroup[0].cubeDimension" face-dimension = "cubeDimension">' + 
				'<control-pannel-button ng-repeat="values in buttongroup" button-function = "Rotate(values.value.axis, values.value.direction, values.value.layer)"></control-pannel-button>' + 
			'</control-pannel-button-group>',
	    restrict: 'E'
	}
})

appDirtive.directive('controlPannelButtonGroup', function() {
	return {
	    restrict: 'E',  
	    scope: {
	    	buttonPosition : '=',
	    	buttonNumber: '=',
	    	faceDimension: '='
	    },	
	    link: function(scope, element, attributes) {
	    	var buttonAdjustPosition = scope.faceDimension * 100, test = 0;
	    	switch (scope.buttonPosition) {
				case 0:
					position = 'translateX(-' + 105 + 'px) translateY(-100px) translateZ(' + buttonAdjustPosition / 2 + 'px)'
			        break;
			    case 1:
					position = 'rotateZ(180deg) rotateX(180deg) translateX(-' + (buttonAdjustPosition - 45) + 'px) translateY(-100px) translateZ(-' + buttonAdjustPosition / 2 +'px)'
			        break;
			    case 2:
			    	position = 'rotateZ(90deg) translateX(-' + (buttonAdjustPosition / 2  + 80) +'px) translateY(-' + (buttonAdjustPosition / 2 - 25) +'px) translateZ(' + buttonAdjustPosition / 2 +'px)'
			        break;
			    case 3:
			    	position = 'rotateZ(270deg) rotateX(180deg) translateX(-' + (buttonAdjustPosition / 2 - 20) +'px) translateY(-' + (buttonAdjustPosition / 2 - 20) +'px) translateZ(-' + buttonAdjustPosition / 2 +'px)'
			        break;
			    case 4:
			    	position = 'rotateX(90deg) rotateZ(180deg) translateX(-' + (buttonAdjustPosition - 45) +'px) translateY(-50px) translateZ(' + (buttonAdjustPosition / 2 + 50) +'px)'
			        break;
			    case 5:
			    	position = 'rotateX(270deg) translateX(-105px) translateY(-50px) translateZ(-' + (buttonAdjustPosition / 2 + 50) + 'px)'
			        break;			    		        			      	        
			    default:
			    	console.log('controlPannelButtonGroup directive error')
			}

			element.css({
				position: 'absolute',
				'z-index': 50,
				'-moz-transform': position,
			    '-webkit-transform': position,
			    '-o-transform': position,
			    transform: position,
			})


		}

	}
})


appDirtive.directive('controlPannelButton', function() {
	return {
		template: '<span class="glyphicon glyphicon-triangle-left" ng-click = "buttonFunction()"></span>',
	    restrict: 'E',
	    scope: {
	    	buttonFunction : '&'
	    },	
	    link: function(scope, element, attributes) {
	    	//element.on('touchstart', scope.buttonFunction);

			element.css({
				'z-index': 20
			})

			element.on('mouseenter', function() {
                element.addClass('control-pannel-button-hover');
            });
            element.on('mouseleave', function() {
                element.removeClass('control-pannel-button-hover');
            });

	    }
	}
})


appDirtive.directive('rotateViewPannel', function() {
	return {
		template: '<p>Drag to rotate</p><span></span>',
	    restrict: 'E',
	    require: '^cube',
	    link: function(scope, element, attributes, cubeCtrl) {
	    	var pannalSize = 200, padSize = 80;
			var padInitialPosition = (pannalSize - padSize) / 2;
			var startX = 0, startY = 0, x = padInitialPosition, y = padInitialPosition;

			var pad = element.find('span');
			var innertext = element.find('p')

			element.css({
				position: 'absolute',
				display:'block',
				width: pannalSize + 'px',
				height: pannalSize + 'px',
				background: '#999',
				'border-radius': '20%',
				border: '1px #555 solid',
				left:'360px',
				top: '25px',
				'z-index':50,
			})

			pad.css({
				position: 'relative',
				display:'block',
				width: padSize + 'px',
				height: padSize + 'px',
				'border-radius': '50%',
				top: padInitialPosition + 'px',
				left: padInitialPosition + 'px',
				background:'url("css/buttons/pad.png") 35% 50% / 96px 90px no-repeat rgb(0, 0, 0)',

			})


			innertext.css({
				position: 'absolute',
				'font-size': '22px',
				'font-weight':600,
				left: padInitialPosition / 2 + 'px'

			})

			pad.on('touchstart mousedown', onRotateViewStart);

            function onRotateViewStart(event) {
                event.preventDefault();
                if (event.type == 'touchstart') {
                	startX = event.touches[0].pageX - x;
                	startY = event.touches[0].pageY - y;
                }
                if (event.type == 'mousedown') {
	 		        startX = event.pageX - x;
			        startY = event.pageY - y;               	
                }                
                pad.on('touchmove mousemove', onRotateViewMove);
                pad.on('touchend touchcancel mouseup mouseout', onRotateViewEnd);


            }

            function onRotateViewMove(event) {
                event.preventDefault();
                if (event.type == 'touchmove') {
                	coordsX = event.changedTouches[0].pageX;
                	coordsY = event.changedTouches[0].pageY;
                }
                if (event.type == 'mousemove') {
	 		        coordsX = event.pageX;
			        coordsY = event.pageY;               	
                }   
  
 		        y = (coordsY - startY);
		        x = (coordsX - startX);

		        //Restrict pad moving
		        if (x < 0) {
		        	x = 0;
		        }
		        if (y < 0) {
		        	y = 0;
		        }
		        if (x > pannalSize - padSize) {
		        	x = pannalSize - padSize;
		        }
		        if (y > pannalSize - padSize) {
		        	y = pannalSize - padSize;
		        }
		        
                pad.css({
		          top: y + 'px',
		          left:  x + 'px'
        		});

                cubeCtrl.passRotateData(x - padInitialPosition,y - padInitialPosition);
                scope.$digest()

            }

            // Unbinds methods when touch interaction ends
            function onRotateViewEnd(event) {
                pad.off('touchmove mousemove', onRotateViewMove);
                pad.off('touchend mouseup', onRotateViewEnd);
            }

	    }
	}
})

appDirtive.directive('timer', function($interval) {
	return {
		template: '<button type="button" class="btn btn-default" ng-click = "StartTimer()" ng-disabled="start">start</button><button type="button" class="btn btn-default" ng-click = "EndTimer()" ng-disabled="!start">stop</button></br><span>Timer: {{time | number: 2}} s</span>',
	    restrict: 'E',
	    scope: true,
	    link: function(scope, element, attributes) {

			var num = element.find('span');

			element.css({
				position: 'absolute',
				display:'block',
				width: '200px',
				left:'405px',
				top: '230px',
				'z-index':50,
			})

			var buttons = element.find('button');

			num.css({
				'font-size': '20px',
				'font-weight': 600
			})

			buttons.css({
				'margin-right': '5px',
			})

	    	scope.time = 0;
	    	scope.start = false;
	    	scope.paused = false;

	    	scope.StartTimer = function() {
	    		scope.time = 0;
	    		scope.start = true;
				timerId = $interval(function() {
					scope.time += 0.01; 
			    }, 10);
	    	}

	    	scope.PauseTimer = function() {
	    		if (scope.paused) {
	    			scope.paused = !scope.paused;
					timerId = $interval(function() {
						scope.time += 0.01; 
				    }, 10);
	    		} else {
	    			scope.paused = !scope.paused;
	    			$interval.cancel(timerId);
	    		}
	    		
	    	}

	    	scope.EndTimer = function() {
	    		scope.start = false;
	    		$interval.cancel(timerId);
	    	}

	    }
	}
})



