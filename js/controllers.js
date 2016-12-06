var appCon = angular.module('appCon', []);

appCon.controller('cubeCon', ['$scope', '$timeout', '$window', '$document','$stateParams','$state','$interval', function($scope,$timeout,$window,$document,$stateParams,$state,$interval){
	//necessary varibles
	$scope.animation_process_time = 200;//250
	$scope.isProcessing = false;
	$scope.faceNum = 6;	
	$scope.disableAimation = false;
	$scope.innerFacesNum = $scope.cubeDimension * $scope.cubeDimension;




	$timeout(function () {
		var dimension = $stateParams.dim;		
		if (dimension !== undefined) {
			$scope.transformTo(parseInt(dimension));
		} else {
			var dim = Math.floor(Math.random() * 3) + 2;
			$scope.transformTo(dim);
		}		
	}, 0);


	//check browser
	var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
	var is_safari = navigator.userAgent.indexOf("Safari") > -1;
	if ((is_chrome) && (is_safari)) {
		$scope.isSafari = false;
	} else {
		$scope.isSafari = true;
	}

	$scope.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

	$scope.ResetCube = function() {
		$scope.facesMaping = [];
		var cubeDimension = $scope.cubeDimension;
		for (var i = 0; i < $scope.faceNum; i++) {
			$scope.facesMaping[i] = [];
			for (var j = 0; j < cubeDimension * cubeDimension; j++) {
				var facevalue = 'face' + i;
				var faceid = i + '-' + j;
				$scope.facesMaping[i][j] = {value: facevalue, id: faceid, spin: ''};
			}
		}

		$scope.cubeButtonMaping = [];
		for (var i = 0; i < $scope.faceNum; i++) {
			var axis, direction, layer;
			var dimension = $scope.cubeDimension;
			$scope.cubeButtonMaping[i] = [];
			for (var j = 0; j < dimension; j++) {
				layer = j;				
				
				if (i % 2 == 0) {
					direction = 'n';
				} else {
					direction = 'p'
				}

				if (i == 0 || i == 1) {
					axis = 'y';
				} else if (i == 2 || i == 3) {
					axis = 'x';
				} else {
					axis = 'z';
				}

				var controlValue = {axis: axis, direction: direction, layer: layer};

				$scope.cubeButtonMaping[i][j] = {buttonPosition: i, row: j, value: controlValue, cubeDimension: dimension};
			}

		}

		$scope.pannelButtonMaping0 = [];
		var faceNotations = ['U', 'L', 'F', 'R', 'B', 'D'];
		var buttonRows = Math.floor($scope.cubeDimension / 2);
		for (var i = 0; i < buttonRows; i++) {
			$scope.pannelButtonMaping0[i] = [];
			for (var j = 0; j < faceNotations.length; j++) {
				var buttonIndex = i + 1;
				var buttonvalue = faceNotations[j] + buttonIndex;
				$scope.pannelButtonMaping0[i][j] = {value: buttonvalue};
			}
		}

		$scope.pannelButtonMaping1 = [];
		for (var i = 0; i < buttonRows; i++) {
			$scope.pannelButtonMaping1[i] = [];
			for (var j = 0; j < faceNotations.length; j++) {
				var buttonIndex = i + 1;
				var buttonvalue = faceNotations[j] + buttonIndex + '`';
				$scope.pannelButtonMaping1[i][j] = {value: buttonvalue};
			}
		}

		if ($scope.cubeDimension % 2 !== 0) {
			$scope.pannelButtonMaping2 = [];
			$scope.pannelButtonMaping2[1] = [];
			var faceNotations = ['M', 'E', 'S'];		
			for (var i = 0; i < faceNotations.length * 2; i++) {
				if (i < faceNotations.length) {
					var buttonvalue = faceNotations[i];				
				} else {
					var sign = '`';
					var buttonvalue = faceNotations[i - faceNotations.length] + sign;	
				}			
				$scope.pannelButtonMaping2[1][i] = {value: buttonvalue};
			}
		}	

		$scope.pannelButtonMaping3 = [];
		$scope.pannelButtonMaping3[1] = [];
		var faceNotations = ['X', 'Y', 'Z'];		
		for (var i = 0; i < faceNotations.length * 2; i++) {
			if (i < faceNotations.length) {
				var buttonvalue = faceNotations[i];				
			} else {
				var sign = '`';
				var buttonvalue = faceNotations[i - faceNotations.length] + sign;	
			}			
			$scope.pannelButtonMaping3[1][i] = {value: buttonvalue};
		}
	}
	$scope.ResetCube();

	//Notation convert
	$scope.Notation = function(notation) {		
		var axis, direction, layer, firstParam, secondParam, thirdParam;
		firstParam = notation.charAt(0);
		secondParam = notation.charAt(1);
		thirdParam = notation.charAt(2);
		
		if (firstParam == 'U' || firstParam == 'E' || firstParam == 'D') {
			axis = 'y';
		}
		if (firstParam == 'R' || firstParam == 'M' || firstParam == 'L') {
			axis = 'x';
		}
		if (firstParam == 'F' || firstParam == 'S' || firstParam == 'B') {
			axis = 'z';
		}

		if (firstParam == 'U' || firstParam == 'R' || firstParam == 'F') {			
			layer = secondParam - 1;
			if (thirdParam == '`') {
				direction = 'p';
			} else {
				direction = 'n';
			}
		}
		if (firstParam == 'E' || firstParam == 'M' || firstParam == 'S') {
			layer = ($scope.cubeDimension - 1) / 2;	
			if (secondParam == '`') {
				direction = 'n';
			} else {
				direction = 'p';
			}
		}
		if (firstParam == 'D' || firstParam == 'L' || firstParam == 'B') {
			layer = $scope.cubeDimension - secondParam;	
			if (thirdParam == '`') {
				direction = 'n';
			} else {
				direction = 'p';
			}
		}

		if (firstParam == 'X' || firstParam == 'Y' || firstParam == 'Z') {
			if (secondParam == '`') {
				direction = 'p';
			} else {
				direction = 'n';
			}
			if (firstParam == 'X') {
				axis = 'x';
			} else if (firstParam == 'Y') {
				axis = 'y';
			} else {
				axis = 'z';
			}
		}

		if (notation !== notation.toUpperCase()) {
			$scope.DoulbeRotate(axis, direction, layer);
		} else if (notation == 'X' || notation == 'X`' || notation == 'Y' || notation == 'Y`' || notation == 'Z' || notation == 'Z`') {
			$scope.WholeRotate(axis, direction);
		} else {
			$scope.Rotate(axis, direction, layer);
		}

	}

	/* rotate notation: (xyz rotate axis)(p/n rotation direction)(t/m/b layer) */
	$scope.Rotate = function(axis, rotatedirection, layer) {
		//indentify the affected faces and data flow
		$scope.isProcessing = true;
		if (axis == 'y') {
			$scope.sidefaces = [0, 5, 1, 4];
			affectedFaces =[];	   

		    //side faces
			for (var i = 0; i < $scope.cubeDimension; i++) {
				affectedFaces[i] = [];
				for (var j = 0; j < $scope.sidefaces.length; j++) {
					var faceIndex = $scope.sidefaces[j];
					if (j == 0 || j == $scope.sidefaces.length - 1) {
						var innerFaceIndex = i + layer * $scope.cubeDimension;
					} else {
						var innerFaceIndex = $scope.cubeDimension -1 - i + layer * $scope.cubeDimension;
					}
					
					affectedFaces[i][j] = {face: faceIndex, innerface: innerFaceIndex};

				}
			}
			//top innerfaces needed to move
			if (layer == 0 || layer == ($scope.cubeDimension - 1) ) {
				var topLayerNum = Math.floor($scope.cubeDimension / 2);
				if (layer == 0) {topFaceIndex = 2;} //top face
				if (layer == $scope.cubeDimension - 1) {topFaceIndex = 3;} //buttom face
				totalTopMove = $scope.cubeDimension;
				for (var i = 0; i < topLayerNum; i++) {
					for (var j = 0; j < $scope.cubeDimension - 1 - 2 * i; j++) {
						var index = totalTopMove++;
						
						affectedFaces[index] = [];

							
						for (var k = 0; k < $scope.sidefaces.length; k++) {
							switch (k) {
						    case 0:
								var innerFaceIndex = j + $scope.cubeDimension * i + i;
						        break;
						    case 1:
						        var innerFaceIndex = (j + 1) * $scope.cubeDimension - 1 + $scope.cubeDimension * i - i;
						        break;
						    case 2:
						        var innerFaceIndex = $scope.cubeDimension *  $scope.cubeDimension - 1 - j - $scope.cubeDimension * i - i;
						        break;
						    case 3:
						        var innerFaceIndex = $scope.cubeDimension *  $scope.cubeDimension - (j + 1) * $scope.cubeDimension - $scope.cubeDimension * i + i;
						        break;   
							}
							affectedFaces[index][k] = {face: topFaceIndex, innerface:innerFaceIndex};
						}
					}
				}

				//top center face
				if ($scope.cubeDimension % 2 !== 0) {
					affectedFaces[totalTopMove] = [];
					var innerFaceIndex = ($scope.cubeDimension * $scope.cubeDimension - 1)/ 2;
					affectedFaces[totalTopMove][0] = {face: topFaceIndex, innerface:innerFaceIndex};
				}
			}
			
		}


		if (axis == 'x') {

			$scope.sidefaces = [0, 2, 1, 3];
			affectedFaces = [];
		   

		    //side faces
			for (var i = 0; i < $scope.cubeDimension; i++) {
				affectedFaces[i] = [];
				for (var j = 0; j < $scope.sidefaces.length; j++) {
					var faceIndex = $scope.sidefaces[j];
					if (j == 0 || j == 1) {
						var innerFaceIndex = $scope.cubeDimension -1 - layer + i * $scope.cubeDimension;
					} else {
						var innerFaceIndex = $scope.cubeDimension * $scope.cubeDimension -1  - layer - i * $scope.cubeDimension;
					}

					
					affectedFaces[i][j] = {face: faceIndex, innerface: innerFaceIndex};

				}
			}
			//top innerfaces needed to move
			if (layer == 0 || layer == ($scope.cubeDimension - 1) ) {
				var topLayerNum = Math.floor($scope.cubeDimension / 2);
				if (layer == 0) {topFaceIndex = 4;} //top face
				if (layer == $scope.cubeDimension - 1) {topFaceIndex = 5;} //buttom face
				totalTopMove = $scope.cubeDimension;
				for (var i = 0; i < topLayerNum; i++) {
					for (var j = 0; j < $scope.cubeDimension - 1 - 2 * i; j++) {
						var index = totalTopMove++;						
						affectedFaces[index] = [];
							
						for (var k = 0; k < $scope.sidefaces.length; k++) {
							switch (k) {
						    case 0:
								var innerFaceIndex = j + $scope.cubeDimension * i + i;
						        break;
						    case 1:
						        var innerFaceIndex = (j + 1) * $scope.cubeDimension - 1 + $scope.cubeDimension * i - i;
						        break;
						    case 2:
						        var innerFaceIndex = $scope.cubeDimension *  $scope.cubeDimension - 1 - j - $scope.cubeDimension * i - i;
						        break;
						    case 3:
						        var innerFaceIndex = $scope.cubeDimension *  $scope.cubeDimension - (j + 1) * $scope.cubeDimension - $scope.cubeDimension * i + i;
						        break;   
							}
							affectedFaces[index][k] = {face: topFaceIndex, innerface:innerFaceIndex};
						}
					}
				}

				//top center face
				if ($scope.cubeDimension % 2 !== 0) {
					affectedFaces[totalTopMove] = [];
					var innerFaceIndex = ($scope.cubeDimension * $scope.cubeDimension - 1)/ 2;
					affectedFaces[totalTopMove][0] = {face: topFaceIndex, innerface:innerFaceIndex};
				}
			}			
		}

		if (axis == 'z') {
			$scope.sidefaces = [2, 4, 3, 5];
			affectedFaces = [];

		    //side faces
			for (var i = 0; i < $scope.cubeDimension; i++) {
				affectedFaces[i] = [];
				for (var j = 0; j < $scope.sidefaces.length; j++) {
					var faceIndex = $scope.sidefaces[j];
					if (j == 0) {
						var innerFaceIndex = ($scope.cubeDimension - 1) * $scope.cubeDimension + i - layer * $scope.cubeDimension;
					} 
					if (j == 1) {
						var innerFaceIndex = layer + i * $scope.cubeDimension;
					} 
					if (j == 2) {
						var innerFaceIndex = $scope.cubeDimension * $scope.cubeDimension -1 - i - layer * $scope.cubeDimension;
					} 
					if (j == 3) {
						var innerFaceIndex = ($scope.cubeDimension - 1) * $scope.cubeDimension - i * $scope.cubeDimension + layer;
					}
				
					affectedFaces[i][j] = {face: faceIndex, innerface: innerFaceIndex};
				}
			}
			//top innerfaces needed to move
			if (layer == 0 || layer == ($scope.cubeDimension - 1) ) {
				var topLayerNum = Math.floor($scope.cubeDimension / 2);
				if (layer == 0) {topFaceIndex = 0;} //top face
				if (layer == $scope.cubeDimension - 1) {topFaceIndex = 1;} //buttom face
				totalTopMove = $scope.cubeDimension;
				for (var i = 0; i < topLayerNum; i++) {
					for (var j = 0; j < $scope.cubeDimension - 1 - 2 * i; j++) {
						var index = totalTopMove++;						
						affectedFaces[index] = [];
							
						for (var k = 0; k < $scope.sidefaces.length; k++) {
							switch (k) {
						    case 0:
								var innerFaceIndex = j + $scope.cubeDimension * i + i;
						        break;
						    case 1:
						        var innerFaceIndex = (j + 1) * $scope.cubeDimension - 1 + $scope.cubeDimension * i - i;
						        break;
						    case 2:
						        var innerFaceIndex = $scope.cubeDimension *  $scope.cubeDimension - 1 - j - $scope.cubeDimension * i - i;
						        break;
						    case 3:
						        var innerFaceIndex = $scope.cubeDimension *  $scope.cubeDimension - (j + 1) * $scope.cubeDimension - $scope.cubeDimension * i + i;
						        break;   
							}
							affectedFaces[index][k] = {face: topFaceIndex, innerface:innerFaceIndex};
						}
					}
				}

				//top center face
				if ($scope.cubeDimension % 2 !== 0) {
					affectedFaces[totalTopMove] = [];
					var innerFaceIndex = ($scope.cubeDimension * $scope.cubeDimension - 1)/ 2;
					affectedFaces[totalTopMove][0] = {face: topFaceIndex, innerface:innerFaceIndex};
				}
			}			
		}
		$scope.RotateSetData(affectedFaces, rotatedirection);
		if (!$scope.disableAimation) {
			$scope.RotateMovement(affectedFaces, axis, rotatedirection, layer);
		}
		
		
		$timeout(function () {			
      		$scope.CompleteMovement();
  		}, $scope.animation_process_time + 500);
		
	}

	$scope.WholeRotate = function(axis, rotatedirection){
		
		for (var i = 0; i < $scope.cubeDimension; i++) {
			var layer = i;
			$scope.Rotate(axis, rotatedirection, layer);
		}
	}

	$scope.RotateSetData = function(affectedFaces, rotatedirection) {		
		if (rotatedirection == 'p') {
			$scope.RotateDataPositive(affectedFaces)
		}
		if (rotatedirection == 'n') {
			$scope.RotateDataNegative(affectedFaces)
		}
		
	}

	$scope.RotateMovement = function(affectedFaces, axis, rotatedirection, layer) {
		var spin_faces_side = [], spin_faces_top = [];
		for (var i = 0; i < affectedFaces.length; i++) {
			if (i < $scope.cubeDimension) { //side faces
				for (var j = 0; j < affectedFaces[i].length; j++) {
					spin_faces_side.push(affectedFaces[i][j]);
				}
			} else { //top faces
				for (var j = 0; j < affectedFaces[i].length; j++) {
					spin_faces_top.push(affectedFaces[i][j]);
				}
			}

			//Set special spin axis for safari
			for (var j = 0; j < affectedFaces[i].length; j++) {
				var faceIndex = affectedFaces[i][j].face, innerFaceIdex = affectedFaces[i][j].innerface;
				if ($scope.isSafari) {
					var spinaxis = 'spinaxis_d' + $scope.cubeDimension + '_' + faceIndex;
					$scope.facesMaping[faceIndex][innerFaceIdex].spinaxis = spinaxis;
				}
			}
		}		
		
		if (axis == 'x' ||axis == 'y') {
			var spin_effect_side = 'spin_effect_' + axis + rotatedirection +'_s';
			var spin_effect_top = 'spin_effect_' + axis + rotatedirection +'_t'
		}

		if (axis == 'z') {
			var spin_effect_side = 'spin_effect_' + axis + rotatedirection +'_s_0';
			var spin_effect_side_1 = 'spin_effect_' + axis + rotatedirection +'_s_1';
			var spin_effect_top = 'spin_effect_' + axis + rotatedirection +'_t'
		}

		for (var i = 0; i < spin_faces_side.length; i++) {
			if (axis == 'z') { //special arrangement for z axis rotation since side faces have different rotate axis
				var x = spin_faces_side[i].face, y = spin_faces_side[i].innerface;
				if (x == 2 || x == 3) {
					$scope.facesMaping[x][y].spin = spin_effect_side_1;
				} else {
					$scope.facesMaping[x][y].spin = spin_effect_side;
				}
				
			} else {
				var x = spin_faces_side[i].face, y = spin_faces_side[i].innerface;
				$scope.facesMaping[x][y].spin = spin_effect_side;
			}
		}
		
		for (var i = 0; i < spin_faces_top.length; i++) {
			var x = spin_faces_top[i].face, y = spin_faces_top[i].innerface;
			$scope.facesMaping[x][y].spin = spin_effect_top;
		}
	}


/*---------------------- rotate gestures -------------------------------------*/
	$scope.rotateGesture = function(start,faceIndex,innerFaceIndex){
		if (start) {
			$scope.rotateDragPosition = [faceIndex, innerFaceIndex]
		} else {
			if ($scope.rotateDragPosition !== undefined) {

				if ($scope.rotateDragPosition[0] == faceIndex) {
					//rotate when gesture on the same face
					//locate the target inner face
					var row = Math.floor($scope.rotateDragPosition[1] / $scope.cubeDimension);
					var col = $scope.rotateDragPosition[1] % $scope.cubeDimension;

					var move = innerFaceIndex - $scope.rotateDragPosition[1],
						dragDirection, axis, direction, layer;					
					//move 1:right -1:left +dimension:down -dimension:up
					switch (move) {
					    case 1:
					    	dragDirection = "right";
					        break; 
					    case -1:
					    	dragDirection = "left";					        
					        break; 
					    case $scope.cubeDimension:
					    	dragDirection = "down";
					        break; 
					    case -$scope.cubeDimension:
					    	dragDirection = "up";
					        break; 				        					        
					    default: 
					    	dragDirection = null;
					        console.log("rotateGesture 1 error");
					}
					if (dragDirection != null) {
						//start rotate if gesture is correct
						var selectIndex;
						var rotateCombo = {};
						if (faceIndex == 0 || faceIndex == 1) {
							rotateCombo[1] = {axis:'x', direction:'n', layer:$scope.cubeDimension - col - 1};
							rotateCombo[-1] = {axis:'x', direction:'p', layer:$scope.cubeDimension - col - 1};
							rotateCombo[2] = {axis:'y', direction:'n', layer:row};
							rotateCombo[-2] = {axis:'y', direction:'p', layer:row};

						}

						if (faceIndex == 2 || faceIndex == 3) {
							rotateCombo[1] = {axis:'x', direction:'n', layer:$scope.cubeDimension - col - 1};
							rotateCombo[-1] = {axis:'x', direction:'p', layer:$scope.cubeDimension - col - 1};
							rotateCombo[2] = {axis:'z', direction:'p', layer:$scope.cubeDimension - row - 1};
							rotateCombo[-2] = {axis:'z', direction:'n', layer:$scope.cubeDimension - row - 1};

						}

						if (faceIndex == 4 || faceIndex == 5) {
							rotateCombo[1] = {axis:'z', direction:'p', layer:col};
							rotateCombo[-1] = {axis:'z', direction:'n', layer:col};
							rotateCombo[2] = {axis:'y', direction:'n', layer:row};
							rotateCombo[-2] = {axis:'y', direction:'p', layer:row};

						}

						switch (dragDirection) {
						    case "up":
						    	selectIndex = 1
						        break; 
						    case "down":
						    	selectIndex = -1
						        break; 
						    case "left":
						    	selectIndex = 2
						        break; 
						    case "right":
						    	selectIndex = -2
						        break;        					        
						    default: 							    	
						        console.log("rotateGesture 2 error");
						}

						if (faceIndex == 1 || faceIndex == 3 || faceIndex == 5) {
							selectIndex = -1 * selectIndex;
						}
						if (rotateCombo !== undefined) {
							//console.log(rotateCombo[selectIndex]);
							axis = rotateCombo[selectIndex].axis;
							direction = rotateCombo[selectIndex].direction;
							layer =  rotateCombo[selectIndex].layer;
							$timeout(function () {			
					      		$scope.Rotate(axis, direction, layer);

					  		}, 0);

							
						}

					}
				}			

			}
			$scope.rotateDragPosition = undefined;
		}
		
	}

	$scope.rotateGestureVer2 = function(start,faceIndex,innerFaceIndex){
		var dragDirection = start;
		if (dragDirection != null) {

			var row = Math.floor(innerFaceIndex / $scope.cubeDimension);
			var col = innerFaceIndex % $scope.cubeDimension;
			var selectIndex;
			var rotateCombo = {};
			if (faceIndex == 0 || faceIndex == 1) {
				rotateCombo[1] = {axis:'x', direction:'n', layer:$scope.cubeDimension - col - 1};
				rotateCombo[-1] = {axis:'x', direction:'p', layer:$scope.cubeDimension - col - 1};
				rotateCombo[2] = {axis:'y', direction:'n', layer:row};
				rotateCombo[-2] = {axis:'y', direction:'p', layer:row};

			}

			if (faceIndex == 2 || faceIndex == 3) {
				rotateCombo[1] = {axis:'x', direction:'n', layer:$scope.cubeDimension - col - 1};
				rotateCombo[-1] = {axis:'x', direction:'p', layer:$scope.cubeDimension - col - 1};
				rotateCombo[2] = {axis:'z', direction:'p', layer:$scope.cubeDimension - row - 1};
				rotateCombo[-2] = {axis:'z', direction:'n', layer:$scope.cubeDimension - row - 1};

			}

			if (faceIndex == 4 || faceIndex == 5) {
				rotateCombo[1] = {axis:'z', direction:'p', layer:col};
				rotateCombo[-1] = {axis:'z', direction:'n', layer:col};
				rotateCombo[2] = {axis:'y', direction:'n', layer:row};
				rotateCombo[-2] = {axis:'y', direction:'p', layer:row};

			}

			switch (dragDirection) {
			    case "up":
			    	selectIndex = 1
			        break; 
			    case "down":
			    	selectIndex = -1
			        break; 
			    case "left":
			    	selectIndex = 2
			        break; 
			    case "right":
			    	selectIndex = -2
			        break;        					        
			    default: 							    	
			        console.log("rotateGesture 2 error");
			}

			if (faceIndex == 1 || faceIndex == 3 || faceIndex == 5) {
				selectIndex = -1 * selectIndex;
			}
			if (rotateCombo !== undefined) {
				//console.log(rotateCombo[selectIndex]);
				axis = rotateCombo[selectIndex].axis;
				direction = rotateCombo[selectIndex].direction;
				layer =  rotateCombo[selectIndex].layer;
				$timeout(function () {			
		      		$scope.Rotate(axis, direction, layer);

		  		}, 0);

				
			}

		}
	}
/*----------------------  public function -------------------------------------*/
	$scope.RotateDataPositive = function(RotateData) {
		var faceIndex, innerFaceIndex, faceindex1, innerFaceIndex1, store, store1;
		for (var i = 0; i < RotateData.length; i++) {

			for (var j = 0; j < RotateData[i].length; j++) {
				faceIndex = RotateData[i][j].face;
				innerFaceIndex = RotateData[i][j].innerface;				
				
				if (j == 0) {
					store = $scope.facesMaping[faceIndex][innerFaceIndex].value;
					store1 = $scope.facesMaping[faceIndex][innerFaceIndex].id;

				} 
				if (j < RotateData[i].length - 1) {
					faceIndex1 = RotateData[i][j + 1].face;
					innerFaceIndex1 = RotateData[i][j + 1].innerface;

					$scope.facesMaping[faceIndex][innerFaceIndex].value = $scope.facesMaping[faceIndex1][innerFaceIndex1].value;
					$scope.facesMaping[faceIndex][innerFaceIndex].id = $scope.facesMaping[faceIndex1][innerFaceIndex1].id;
				} else {
					$scope.facesMaping[faceIndex][innerFaceIndex].value = store;
					$scope.facesMaping[faceIndex][innerFaceIndex].id = store1;
				}				
			}
		}
	}

	$scope.RotateDataNegative = function(RotateData) {
		var faceIndex, innerFaceIndex, faceIndex1, innerFaceIndex1, store, store1;
		for (var i = 0; i < RotateData.length; i++) {

			for (var j = RotateData[i].length - 1; j >= 0; j--) {
				faceIndex = RotateData[i][j].face;
				innerFaceIndex = RotateData[i][j].innerface;				
				
				if (j == RotateData[i].length - 1) {
					store = $scope.facesMaping[faceIndex][innerFaceIndex].value;
					store1 = $scope.facesMaping[faceIndex][innerFaceIndex].id;
				} 
				if (j > 0) {
					faceIndex1 = RotateData[i][j - 1].face;
					innerFaceIndex1 = RotateData[i][j - 1].innerface;

					$scope.facesMaping[faceIndex][innerFaceIndex].value = $scope.facesMaping[faceIndex1][innerFaceIndex1].value;
					$scope.facesMaping[faceIndex][innerFaceIndex].id = $scope.facesMaping[faceIndex1][innerFaceIndex1].id;
				} else {
					$scope.facesMaping[faceIndex][innerFaceIndex].value = store;
					$scope.facesMaping[faceIndex][innerFaceIndex].id = store1;
				}				
			}
		}
	}

	$scope.CompleteMovement = function() {
		
		var complete = true, cubeDimension = $scope.cubeDimension;
		for (var i = 0; i < $scope.faceNum; i++) {
			for (var j = 0; j < cubeDimension * cubeDimension; j++) {
				$scope.facesMaping[i][j].spin = '';				
				if ($scope.isSafari) {
					var spinaxis = 'spinaxis_d' + $scope.cubeDimension + '_' + i + '_safari';
					$scope.facesMaping[i][j].spinaxis = spinaxis;
				} 

				//check whether complete
				if (j != 0) {
					if ($scope.facesMaping[i][j].value != $scope.facesMaping[i][j - 1].value) {
						complete = false;
					}					
				}
			}
		}
		if (complete) {
			console.log(complete);
			$scope.$broadcast('checkCubeComplete', true);
		}
		$timeout(function () {			
      		$scope.isProcessing = false;
  		}, 20);
		
	}

	$scope.RandomMovement = function() {
		//Select random movement
		var randomAxis = [
			'x', 'y', 'z'
		];
		var randomDirection = [
			'p', 'n'
		];		
		var axis = randomAxis[Math.floor(Math.random() * randomAxis.length)];
		var direction = randomDirection[Math.floor(Math.random() * randomDirection.length)];
		var layer = Math.floor(Math.random() * $scope.cubeDimension);
		$scope.Rotate(axis, direction, layer);
	}

	$scope.RandomInitialization = function() {
		var randommovement = [];
		var movementstep = 30;
		for (var i = 0; i < movementstep; i++) {
			$scope.RandomMovement();
		}

	}

	$scope.transformTo = function(dimension) {
		if ($scope.cubeDimension !== dimension) {
			var transform = true;
			//confirm("Transform to different dimension will reset the cube. Do you want to transform?");
			if (transform) {
			    $scope.cubeDimension = dimension;
				$scope.ResetCube();
			}			
		}
	}
	//Solution
	$scope.countStep = 0;

	$scope.Solution = function() {


		switch ($scope.countStep) {
			case 0:
				$scope.SetInitialPosition();
		    	break;	
			case 1:
		    	$scope.Step_1_Cross();;		
		    	break;
		    			    	
		}
		
		

		/*frontColor = $scope.facesMaping[0][4].id.charAt(0);
		backColor = $scope.facesMaping[1][4].id.charAt(0);
		leftColor = $scope.facesMaping[5][4].id.charAt(0);
		rightColor = $scope.facesMaping[4][4].id.charAt(0);
		topColor = $scope.facesMaping[2][4].id.charAt(0);*/

		/*
		buttomColor = $scope.facesMaping[3][4].id.charAt(0);
		for (var i = 0; i < $scope.faceNum; i++) {
			for (var j = 0; j < 9; j++) {

				if ($scope.facesMaping[i][j].id.charAt(0) == buttomColor && $scope.facesMaping[i][j].id.charAt(2) == 1) {
					buttomEdge_Position[0] = i + '-' + j;
				}
				if ($scope.facesMaping[i][j].id.charAt(0) == buttomColor && $scope.facesMaping[i][j].id.charAt(2) == 3) {
					buttomEdge_Position[1] = i + '-' + j;
				}
				if ($scope.facesMaping[i][j].id.charAt(0) == buttomColor && $scope.facesMaping[i][j].id.charAt(2) == 5) {
					buttomEdge_Position[2] = i + '-' + j;
				}
				if ($scope.facesMaping[i][j].id.charAt(0) == buttomColor && $scope.facesMaping[i][j].id.charAt(2) == 7) {
					buttomEdge_Position[3] = i + '-' + j;
				}								

			}
		}
		console.log('front', frontColor, 'back', backColor, 'left', leftColor, 'right', rightColor, 'top', topColor, 'buttom', buttomColor, 'P1', buttomEdge_Position[0], 'P2', buttomEdge_Position[1], 'P3', buttomEdge_Position[2], 'P4', buttomEdge_Position[3])
		*/
	}

	$scope.SetInitialPosition = function() {
		var findFrontFace, findButtomFace;
		var movement =[];
		for (var i = 0; i < $scope.faceNum; i++) {
						
			if ($scope.facesMaping[i][4].id.charAt(0) == 0 ) {
				findFrontFace = i;

			}

			if ($scope.facesMaping[i][4].id.charAt(0) == 3 ) {
				findButtomFace = i ;
			}

		}

		if (findFrontFace == 0) {
	    	switch (findButtomFace) {
			case 2:
		    	movement[0] = 'Z';
				movement[1] = 'Z';
		    	break;	
			case 4:
		    	movement[0] = 'Z';		
		    	break;	
			case 5:
		    	movement[0] = 'Z`';		
		    	break;			    			    	
		    }
		}

		if (findFrontFace == 1) {
	    	movement[0] = 'X';
	    	movement[1] = 'X';

	    	switch (findButtomFace) {
			case 3:
		    	movement[2] = 'Z';
		    	movement[3] = 'Z';		
		    	break;	
			case 4:
		    	movement[2] = 'Z';		
		    	break;	
			case 5:
		    	movement[2] = 'Z`';		
		    	break;			    			    	
		    }
		}

		if (findFrontFace == 2) {
			movement[0] = 'X`';

			switch (findButtomFace) {
			case 1:
				movement[1] = 'Z';
				movement[2] = 'Z';
		    	break;	
			case 4:
				movement[1] = 'Z';
		    	break;
			case 5:
				movement[1] = 'Z`';
		    	break;			    				    			    	
		    }


		}

		if (findFrontFace == 3) {
			movement[0] = 'X';

			switch (findButtomFace) {
			case 0:
				movement[1] = 'Z';
				movement[2] = 'Z';
	
		    	break;	
			case 4:
				movement[1] = 'Z';
		    	break;
			case 5:
				movement[1] = 'Z`';
		    	break;			    				    			    	
		    }


		}

		if (findFrontFace == 4) {
			movement[0] = 'Y';

			switch (findButtomFace) {
			case 0:
				movement[1] = 'Z`';		
	
		    	break;	
			case 1:
				movement[1] = 'Z';
		    	break;
			case 2:
				movement[1] = 'Z';
				movement[2] = 'Z';
		    	break;			    				    			    	
		    }


		}

		if (findFrontFace == 5) {
			movement[0] = 'Y`';

			switch (findButtomFace) {
			case 0:
				movement[1] = 'Z';		
		    	break;	
			case 1:
				movement[1] = 'Z`';
		    	break;
			case 2:
				movement[1] = 'Z';
				movement[2] = 'Z';
		    	break;			    				    			    	
		    }


		}

	    if (movement) {
			$scope.RotateSequence(movement);	    	
	    }

	}



	//call when 
	$scope.Step_1_Cross = function() {
		console.log(123)
	}



	$scope.RotateSequence = function(movement) {

    	for(var i = 0; i < movement.length; i++){
			
			$timeout(function (movement, isLast) {
	      		$scope.Notation(movement);
	      		if (isLast) { 
	      			//call Solution() to run next step if it is the last movement sequence
	      			$timeout(function(){
	      				//run next step after previous step is finished
	      				$scope.countStep++;
	      				$scope.Solution();
	      			}, animation_process_time*2)
	      			
	      		}
	  		}, animation_process_time * i * 1.5, true, movement[i], i == movement.length-1);

    	}

	}


	/*---------------------------------*/
	$scope.$on('rotate', function(event,notation){
		$scope.Notation(notation);
	});

	$scope.$on('submitSolution', function(event,solution){
		if (solution.length > 0) {
			for (var i = 0; i < solution.length; i++) {
				$scope.Notation(solution[i]);
			}
		}
	});
	/*-----------------------Main page demo only------------------*/
	if ($state.current.name == 'main') {
		$interval(function() {
			$scope.RandomMovement();
        }, 3000);

	}
	/*----------------------UI tools-------------------------*/
	$scope.returnToMain = function(){
		var isReturn = confirm("Return to menu. All process will be lost.");
		if (isReturn) {
			history.back();
		}
	}

	$scope.$on('startPlayCube', function(){
		$scope.RandomInitialization();
	});
}])



appCon.controller('mainCon', ['$scope', '$state', function($scope,$state){
	$scope.selectCube = function(dim){
		$state.go('cube', {dim:dim}, {reload: true});		
	}

}])

appCon.controller('viewCon', ['$scope', '$anchorScroll', '$location', '$stateParams',function($scope,$anchorScroll,$location,$stateParams){

	$scope.$broadcast('initialize', {dim:$stateParams.dim})

	$scope.hideBar = false;
	$scope.inputSolution = false;
	$scope.storeSolution = [];
	$scope.selectedItem = null;
	$scope.scrollSolutionItemIndex = 123;
	
	var cube = document.getElementsByTagName('cube')[0];
	$scope.viewScale = window.innerHeight / 520 * 100;
	$scope.viewX = 0;
	$scope.viewY = 0;

	$scope.$watchGroup(['viewScale', 'viewX', 'viewY'], function(newValue, oldValue){
		cube.style.transform = 'scale(' + $scope.viewScale / 100 + ')' + 'translateX(' + $scope.viewX + 'px)' + 'translateY(' + $scope.viewY + 'px)';	
		cube.style.webkitTransform = 'scale(' + $scope.viewScale / 100 + ')' + 'translateX(' + $scope.viewX + 'px)' + 'translateY(' + $scope.viewY + 'px)';
	});

	$scope.$on('screenOrientation', function(event,screenHeight){
		$scope.viewScale = screenHeight / 520 * 100;
		$scope.$digest();
	});

	$scope.panelInput = function(button){
		if (!$scope.inputSolution) {
			//solution panel is not actived
			$scope.$emit('rotate', button)
		} else {
			if ($scope.selectedItem === null) {
				//item is not selected
				$scope.storeSolution.push(button);
				$scope.scrollSolutionItemIndex = $scope.storeSolution.length - 2;
			} else {				
				$scope.storeSolution.splice($scope.selectedItem, 0, button);
				$scope.selectedItem++;
				$scope.scrollSolutionItemIndex = $scope.selectedItem - 2;
			}
			
			
		}
	}

	$scope.submitSolution = function(){		
		$scope.$emit('submitSolution', $scope.storeSolution)
		$scope.storeSolution = [];
		$scope.storeSolution.length = 0;
		$scope.inputSolution = false;
	}
	
	$scope.selectSolutionItem = function(index){
		if ($scope.selectedItem !== index) {
			$scope.selectedItem = index;
		} else {
			$scope.selectedItem = null;
		}
	}

	$scope.deleteSolutionItem = function(){
		if ($scope.selectedItem !== null) {
			$scope.storeSolution.splice($scope.selectedItem, 1);
			$scope.selectedItem = null;
		}
	}

	$scope.clearSolutionItem = function(){
		$scope.storeSolution = [];
		
	}	

}])


