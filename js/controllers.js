var appCon = angular.module('appCon', []);

appCon.controller('cubeCon', ['$scope', '$timeout', function($scope,$timeout){
	//necessary varibles
	$scope.animation_process_time = 200;
	$scope.cubeDimension = 3;
	$scope.innerFacesNum = $scope.cubeDimension * $scope.cubeDimension;



	var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
	var is_safari = navigator.userAgent.indexOf("Safari") > -1;
	if ((is_chrome)&&(is_safari)) {
		$scope.isSafari = false;
	} else {
		$scope.isSafari = true;
	}

	$scope.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;


	$scope.ResetCube = function() {
		$scope.facesMaping = [];
		var cubeDimension = $scope.cubeDimension;
		for (var i = 0; i < 6; i++) {
			$scope.facesMaping[i] = [];
			for (var j = 0; j < cubeDimension * cubeDimension; j++) {
				var facevalue = 'face' + i;
				if ($scope.isSafari) {
					var spinaxis = 'spinaxis_d' + cubeDimension + '_' + i + '_safari';
				} else {
					var spinaxis = 'spinaxis_d' + cubeDimension + '_' + i;
				}
				var faceid = i + '-' + j;
				$scope.facesMaping[i][j] = {value: facevalue, id: faceid, spin: '', spinaxis: spinaxis};

			}
		}

		$scope.pannelButtonMaping = [];
		for (var i = 0; i < 6; i++) {
			var axis, direction, layer;
			var dimension = $scope.cubeDimension;
			$scope.pannelButtonMaping[i] = [];
			for (var j = 0; j < dimension; j++) {
				if (dimension == 2) {
					switch (j) {
				    case 0:
						layer = 't'
				        break;
				    case 1:
						layer = 'b'
				        break;
				    }
				}

				if (dimension == 3) {
					switch (j) {
				    case 0:
						layer = 't'
				        break;
				    case 1:
						layer = 'm'
				        break;   
				    case 2:
						layer = 'b'
				        break;
				    }				

				}	
				
				switch (i) {
				case 0:
					axis = 'y';
					direction = 'n';
				    break;
				case 1:
					axis = 'y';
					direction = 'p'
				    break;   
				case 2:
					axis = 'x';
					direction = 'n'
					break;
				case 3:
					axis = 'x';
					direction = 'p'
				    break;
				case 4:
					axis = 'z';
					direction = 'n'
				    break;   
				case 5:
					axis = 'z';
					direction = 'p'
				    break;
				default:
					console.log('pannelButtonMaping error');
				}


				var controlValue = {axis: axis, direction: direction, layer: layer};

				$scope.pannelButtonMaping[i][j] = {buttonPosition: i, row: j, value: controlValue, cubeDimension: dimension};
			}

		}

	}
	$scope.ResetCube();

	


	//Notation convert
	$scope.Notation = function(notation) {
		var axis, direction, layer;
		if ($scope.cubeDimension  == 2) {
			switch (notation) {
			//single turn
			case 'U`':
		        axis = 'y';
				direction = 'p';
				layer = 't';			
		        break;
		    case 'U':
		        axis = 'y';
				direction = 'n';
				layer = 't'
		        break;
		    case 'D':
		        axis = 'y';
				direction = 'p';
				layer = 'b'
		        break;
		    case 'D`':
		        axis = 'y';
				direction = 'n';
				layer = 'b'
		        break;
		    case 'R`':
		        axis = 'x';
				direction = 'p';
				layer = 't'
		        break;
		    case 'R':
		        axis = 'x';
				direction = 'n';
				layer = 't'
		        break;
			case 'L':
		        axis = 'x';
				direction = 'p';
				layer = 'b'
				break;
			case 'L`':
		        axis = 'x';
				direction = 'n';
				layer = 'b'
				break;
			case 'F`':
		        axis = 'z';
				direction = 'p';
				layer = 't'
				break;
			case 'F':
		        axis = 'z';
				direction = 'n';
				layer = 't'
				break;
			case 'B':
		        axis = 'z';
				direction = 'p';
				layer = 'b'
				break;
			case 'B`':
		        axis = 'z';
				direction = 'n';
				layer = 'b'
				break;
			//whole rotate
		    case 'X':
		        axis = 'x';
				direction = 'n';
				break;	
			case 'X`':
		        axis = 'x';
				direction = 'p';
				break;	
			case 'Y':
		        axis = 'y';
				direction = 'n';
				break;	
			case 'Y`':
		        axis = 'y';
				direction = 'p';
				break;	
			case 'Z':
		        axis = 'z';
				direction = 'n';
				break;
			case 'Z`':
		        axis = 'z';
				direction = 'p';
				break;
			default:
				console.log('Notation() error');			
			}

		}


		if ($scope.cubeDimension  == 3) {
			switch (notation) {
			//single turn
		    case 'U`':
		        axis = 'y';
				direction = 'p';
				layer = 't';			
		        break;

		    case 'U':
		        axis = 'y';
				direction = 'n';
				layer = 't'
		        break;

		    case 'E':
		        axis = 'y';
				direction = 'p';
				layer = 'm'
		        break;

		    case 'E`':
		        axis = 'y';
				direction = 'n';
				layer = 'm'
		        break;

		    case 'D':
		        axis = 'y';
				direction = 'p';
				layer = 'b'
		        break;

		    case 'D`':
		        axis = 'y';
				direction = 'n';
				layer = 'b'
		        break;

		    case 'R`':
		        axis = 'x';
				direction = 'p';
				layer = 't'
		        break;

		    case 'R':
		        axis = 'x';
				direction = 'n';
				layer = 't'
		        break;

		    case 'M':
		        axis = 'x';
				direction = 'p';
				layer = 'm'
				break;	
			case 'M`':
		        axis = 'x';
				direction = 'n';
				layer = 'm'
				break;
			case 'L':
		        axis = 'x';
				direction = 'p';
				layer = 'b'
				break;
			case 'L`':
		        axis = 'x';
				direction = 'n';
				layer = 'b'
				break;

			case 'F`':
		        axis = 'z';
				direction = 'p';
				layer = 't'
				break;
			case 'F':
		        axis = 'z';
				direction = 'n';
				layer = 't'
				break;
			case 'S':
		        axis = 'z';
				direction = 'p';
				layer = 'm'
				break;
			case 'S`':
		        axis = 'z';
				direction = 'n';
				layer = 'm'
				break;
			case 'B':
		        axis = 'z';
				direction = 'p';
				layer = 'b'
				break;
			case 'B`':
		        axis = 'z';
				direction = 'n';
				layer = 'b'
				break;
			//double turn
			case 'u':
		        axis = 'y';
				direction = 'n';
				layer = 't'
				break;		
			case 'u`':
		        axis = 'y';
				direction = 'p';
				layer = 't'
				break;	
			case 'i':
		        axis = 'x';
				direction = 'p';
				layer = 'b'
				break;	
			case 'i`':
		        axis = 'x';
				direction = 'n';
				layer = 'b'
				break;	
			case 'f':
		        axis = 'z';
				direction = 'n';
				layer = 't'
				break;	
			case 'f`':
		        axis = 'z';
				direction = 'p';
				layer = 't'
				break;	
			case 'r':
		        axis = 'x';
				direction = 'n';
				layer = 't'
				break;	
			case 'r`':
		        axis = 'x';
				direction = 'p';
				layer = 't'
				break;	
			case 'b':
		        axis = 'z';
				direction = 'p';
				layer = 'b'
				break;	
			case 'b`':
		        axis = 'z';
				direction = 'n';
				layer = 'b'
				break;	
			case 'd':
		        axis = 'y';
				direction = 'p';
				layer = 'b'
				break;	
			case 'd`':
		        axis = 'y';
				direction = 'n';
				layer = 'b'
				break;	

			//whole rotate
		    case 'X':
		        axis = 'x';
				direction = 'n';
				break;	
			case 'X`':
		        axis = 'x';
				direction = 'p';
				break;	
			case 'Y':
		        axis = 'y';
				direction = 'n';
				break;	
			case 'Y`':
		        axis = 'y';
				direction = 'p';
				break;	
			case 'Z':
		        axis = 'z';
				direction = 'n';
				break;
			case 'Z`':
		        axis = 'z';
				direction = 'p';
				break;
			default:
				console.log('Notation() error');
			};


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
		
		if ($scope.cubeDimension  == 2) {	
			if (axis == 'y' && layer == 't') {
				affectedFaces = [
					//side faces
					[
						{face: 0, innerface: 0}, 
						{face: 5, innerface: 1},
						{face: 1, innerface: 1},
						{face: 4, innerface: 0}, 

					],

					[
						{face: 0, innerface: 1}, 
						{face: 5, innerface: 0}, 
						{face: 1, innerface: 0}, 
						{face: 4, innerface: 1}, 

					],

					//top faces
					[
						{face: 2, innerface: 0}, 
						{face: 2, innerface: 1}, 
						{face: 2, innerface: 3}, 
						{face: 2, innerface: 2}, 

					],

				];
			}

			if (axis == 'y' && layer == 'b') {
				affectedFaces = [
					//side faces
					[
						{face: 0, innerface: 2}, 
						{face: 5, innerface: 3}, 
						{face: 1, innerface: 3}, 
						{face: 4, innerface: 2}, 

					],

					[
						{face: 0, innerface: 3}, 
						{face: 5, innerface: 2}, 
						{face: 1, innerface: 2}, 
						{face: 4, innerface: 3}, 

					],

					//top faces
					[
						{face: 3, innerface: 0}, 
						{face: 3, innerface: 1}, 
						{face: 3, innerface: 3}, 
						{face: 3, innerface: 2}, 

					],

				];
			}

			if (axis == 'x' && layer == 't') {
				affectedFaces = [
					//side faces
					[
						{face: 0, innerface: 1}, 
						{face: 2, innerface: 1}, 
						{face: 1, innerface: 3}, 
						{face: 3, innerface: 3}, 

					],


					[
						{face: 0, innerface: 3}, 
						{face: 2, innerface: 3}, 
						{face: 1, innerface: 1}, 
						{face: 3, innerface: 1}, 

					],
					//top faces
					[
						{face: 4, innerface: 0}, 
						{face: 4, innerface: 1},
						{face: 4, innerface: 3}, 
						{face: 4, innerface: 2}, 
					],

				];
			}


			if (axis == 'x' && layer == 'b') {
				affectedFaces = [
					//side faces
					[
						{face: 0, innerface: 0}, 
						{face: 2, innerface: 0}, 
						{face: 1, innerface: 2}, 
						{face: 3, innerface: 2}, 

					],


					[
						{face: 0, innerface: 2}, 
						{face: 2, innerface: 2}, 
						{face: 1, innerface: 0}, 
						{face: 3, innerface: 0}, 

					],
					//top faces
					[
						{face: 5, innerface: 0}, 
						{face: 5, innerface: 1}, 
						{face: 5, innerface: 3}, 
						{face: 5, innerface: 2}, 
					],


				];
			}




			//z axis rotation
			if (axis == 'z' && layer == 't') {
				affectedFaces = [
					//side faces
					[
						{face: 2, innerface: 2}, 
						{face: 4, innerface: 0}, 
						{face: 3, innerface: 3}, 
						{face: 5, innerface: 2}, 

					],


					[
						{face: 2, innerface: 3}, 
						{face: 4, innerface: 2}, 
						{face: 3, innerface: 2}, 
						{face: 5, innerface: 0}, 

					],
					//top faces
					[
						{face: 0, innerface: 0}, 
						{face: 0, innerface: 1}, 
						{face: 0, innerface: 3}, 
						{face: 0, innerface: 2}, 
					],

				];

			}
			

			if (axis == 'z' && layer == 'b') {
				affectedFaces = [
					//side faces
					[
						{face: 2, innerface: 0}, 
						{face: 4, innerface: 1}, 
						{face: 3, innerface: 1}, 
						{face: 5, innerface: 3}, 

					],

					[
						{face: 2, innerface: 1}, 
						{face: 4, innerface: 3}, 
						{face: 3, innerface: 0}, 
						{face: 5, innerface: 1}, 

					],

					//top faces
					[
						{face: 1, innerface: 0}, 
						{face: 1, innerface: 1},
						{face: 1, innerface: 3}, 
						{face: 1, innerface: 2}, 
					],


				];
			}


		}

		if ($scope.cubeDimension  == 3) {
			//y axis rotation
			if (axis == 'y' && layer == 't') {
				affectedFaces = [
					//side faces
					[
						{face: 0, innerface: 0}, 
						{face: 5, innerface: 2}, 
						{face: 1, innerface: 2}, 
						{face: 4, innerface: 0}, 

					],

					[
						{face: 0, innerface: 1}, 
						{face: 5, innerface: 1}, 
						{face: 1, innerface: 1}, 
						{face: 4, innerface: 1}, 

					],

					[
						{face: 0, innerface: 2}, 
						{face: 5, innerface: 0}, 
						{face: 1, innerface: 0}, 
						{face: 4, innerface: 2}, 

					],
					//top faces
					[
						{face: 2, innerface: 0}, 
						{face: 2, innerface: 2}, 
						{face: 2, innerface: 8}, 
						{face: 2, innerface: 6}, 

					],

					[
						{face: 2, innerface: 1}, 
						{face: 2, innerface: 5}, 
						{face: 2, innerface: 7}, 
						{face: 2, innerface: 3}, 

					],
					//top central inner face
					[
						{face: 2, innerface: 4}
					]
				];
			}
			
			if (axis == 'y' && layer == 'm') {
				affectedFaces = [
					//side faces
					[
						{face: 0, innerface: 3}, 
						{face: 5, innerface: 5}, 
						{face: 1, innerface: 5}, 
						{face: 4, innerface: 3}, 

					],

					[
						{face: 0, innerface: 4}, 
						{face: 5, innerface: 4}, 
						{face: 1, innerface: 4}, 
						{face: 4, innerface: 4}, 

					],

					[
						{face: 0, innerface: 5}, 
						{face: 5, innerface: 3}, 
						{face: 1, innerface: 3}, 
						{face: 4, innerface: 5}, 

					],
					
				];
			}

			if (axis == 'y' && layer == 'b') {
				affectedFaces = [
					//side faces
					[
						{face: 0, innerface: 6}, 
						{face: 5, innerface: 8}, 
						{face: 1, innerface: 8}, 
						{face: 4, innerface: 6}, 

					],

					[
						{face: 0, innerface: 7}, 
						{face: 5, innerface: 7}, 
						{face: 1, innerface: 7}, 
						{face: 4, innerface: 7}, 

					],

					[
						{face: 0, innerface: 8}, 
						{face: 5, innerface: 6}, 
						{face: 1, innerface: 6}, 
						{face: 4, innerface: 8}, 

					],
					//top faces
					[
						{face: 3, innerface: 0}, 
						{face: 3, innerface: 2}, 
						{face: 3, innerface: 8}, 
						{face: 3, innerface: 6}, 

					],

					[
						{face: 3, innerface: 1}, 
						{face: 3, innerface: 5}, 
						{face: 3, innerface: 7}, 
						{face: 3, innerface: 3}, 

					],
					//top central inner face
					[
						{face: 3, innerface: 4}
					]
					
				];
			}

			//x axis rotation
			if (axis == 'x' && layer == 't') {
				affectedFaces = [
					//side faces
					[
						{face: 0, innerface: 2}, 
						{face: 2, innerface: 2}, 
						{face: 1, innerface: 8}, 
						{face: 3, innerface: 8}, 

					],

					[
						{face: 0, innerface: 5}, 
						{face: 2, innerface: 5}, 
						{face: 1, innerface: 5}, 
						{face: 3, innerface: 5}, 

					],

					[
						{face: 0, innerface: 8}, 
						{face: 2, innerface: 8}, 
						{face: 1, innerface: 2}, 
						{face: 3, innerface: 2}, 

					],
					//top faces
					[
						{face: 4, innerface: 0}, 
						{face: 4, innerface: 2}, 
						{face: 4, innerface: 8}, 
						{face: 4, innerface: 6}, 

					],

					[
						{face: 4, innerface: 1}, 
						{face: 4, innerface: 5}, 
						{face: 4, innerface: 7}, 
						{face: 4, innerface: 3}, 

					],
					//top central inner face
					[
						{face: 4, innerface: 4}
					]
				];
			}

			if (axis == 'x' && layer == 'm') {
				affectedFaces = [
					//side faces
					[
						{face: 0, innerface: 1}, 
						{face: 2, innerface: 1}, 
						{face: 1, innerface: 7}, 
						{face: 3, innerface: 7}, 

					],

					[
						{face: 0, innerface: 4}, 
						{face: 2, innerface: 4}, 
						{face: 1, innerface: 4}, 
						{face: 3, innerface: 4}, 

					],

					[
						{face: 0, innerface: 7}, 
						{face: 2, innerface: 7}, 
						{face: 1, innerface: 1}, 
						{face: 3, innerface: 1}, 

					],
					
				];
			}

			if (axis == 'x' && layer == 'b') {
				affectedFaces = [
					//side faces
					[
						{face: 0, innerface: 0}, 
						{face: 2, innerface: 0}, 
						{face: 1, innerface: 6}, 
						{face: 3, innerface: 6}, 

					],

					[
						{face: 0, innerface: 3}, 
						{face: 2, innerface: 3}, 
						{face: 1, innerface: 3}, 
						{face: 3, innerface: 3}, 

					],

					[
						{face: 0, innerface: 6}, 
						{face: 2, innerface: 6}, 
						{face: 1, innerface: 0}, 
						{face: 3, innerface: 0}, 

					],
					//top faces
					[
						{face: 5, innerface: 0}, 
						{face: 5, innerface: 2}, 
						{face: 5, innerface: 8}, 
						{face: 5, innerface: 6}, 

					],

					[
						{face: 5, innerface: 1}, 
						{face: 5, innerface: 5}, 
						{face: 5, innerface: 7}, 
						{face: 5, innerface: 3}, 

					],
					//top central inner face
					[
						{face: 5, innerface: 4}
					]
				];
			}

			//z axis rotation
			if (axis == 'z' && layer == 't') {
				affectedFaces = [
					//side faces
					[
						{face: 2, innerface: 6}, 
						{face: 4, innerface: 0}, 
						{face: 3, innerface: 8}, 
						{face: 5, innerface: 6}, 

					],

					[
						{face: 2, innerface: 7}, 
						{face: 4, innerface: 3}, 
						{face: 3, innerface: 7}, 
						{face: 5, innerface: 3}, 

					],

					[
						{face: 2, innerface: 8}, 
						{face: 4, innerface: 6}, 
						{face: 3, innerface: 6}, 
						{face: 5, innerface: 0}, 

					],
					//top faces
					[
						{face: 0, innerface: 0}, 
						{face: 0, innerface: 2}, 
						{face: 0, innerface: 8}, 
						{face: 0, innerface: 6}, 

					],

					[
						{face: 0, innerface: 1}, 
						{face: 0, innerface: 5}, 
						{face: 0, innerface: 7}, 
						{face: 0, innerface: 3}, 

					],
					//top central inner face
					[
						{face: 0, innerface: 4}
					]
				];

			}


			if (axis == 'z' && layer == 'm') {
				affectedFaces = [
					//side faces
					[
						{face: 2, innerface: 3}, 
						{face: 4, innerface: 1}, 
						{face: 3, innerface: 5}, 
						{face: 5, innerface: 7}, 

					],

					[
						{face: 2, innerface: 4}, 
						{face: 4, innerface: 4}, 
						{face: 3, innerface: 4}, 
						{face: 5, innerface: 4}, 

					],

					[
						{face: 2, innerface: 5}, 
						{face: 4, innerface: 7}, 
						{face: 3, innerface: 3}, 
						{face: 5, innerface: 1}, 

					]
				
				];
			}

			if (axis == 'z' && layer == 'b') {
				affectedFaces = [
					//side faces
					[
						{face: 2, innerface: 0}, 
						{face: 4, innerface: 2}, 
						{face: 3, innerface: 2}, 
						{face: 5, innerface: 8}, 

					],

					[
						{face: 2, innerface: 1}, 
						{face: 4, innerface: 5}, 
						{face: 3, innerface: 1}, 
						{face: 5, innerface: 5}, 

					],

					[
						{face: 2, innerface: 2}, 
						{face: 4, innerface: 8}, 
						{face: 3, innerface: 0}, 
						{face: 5, innerface: 2}, 

					],
					//top faces
					[
						{face: 1, innerface: 0}, 
						{face: 1, innerface: 2}, 
						{face: 1, innerface: 8}, 
						{face: 1, innerface: 6}, 

					],

					[
						{face: 1, innerface: 1}, 
						{face: 1, innerface: 5}, 
						{face: 1, innerface: 7}, 
						{face: 1, innerface: 3}, 

					],
					//top central inner face
					[
						{face: 1, innerface: 4}
					]
				];
			}
		}
		






		$scope.RotateSetData(affectedFaces, rotatedirection);
		$scope.RotateMovement(affectedFaces, axis, rotatedirection, layer);
		
		

		$timeout(function () {
      		$scope.CompleteMovement();
  		}, $scope.animation_process_time);
		

	}


	$scope.DoulbeRotate = function(axis, rotatedirection, layer){
		var layer1 ='m';
		$scope.Rotate(axis, rotatedirection, layer);
		$scope.Rotate(axis, rotatedirection, layer1);
	}

	$scope.WholeRotate = function(axis, rotatedirection){
		if ($scope.cubeDimension  == 2) {
			var layer = 't', layer1 = 'b';
			$scope.Rotate(axis, rotatedirection, layer);
			$scope.Rotate(axis, rotatedirection, layer1);
		}

		if ($scope.cubeDimension  == 3) {
			var layer = 't', layer1 = 'm', layer2 ='b';
			$scope.Rotate(axis, rotatedirection, layer);
			$scope.Rotate(axis, rotatedirection, layer1);
			$scope.Rotate(axis, rotatedirection, layer2);
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
				var facenum = affectedFaces[i][j].face, innerfacenum = affectedFaces[i][j].innerface;
				if ($scope.isSafari) {
					var spinaxis = 'spinaxis_d' + $scope.cubeDimension + '_' + facenum;
					$scope.facesMaping[facenum][innerfacenum].spinaxis = spinaxis;
				}
				

			}



		}		
		
		if (axis == 'y' && rotatedirection == 'p') {
			var spin_effect_side = 'spin_effect_yp_s';
			var spin_effect_top = 'spin_effect_yp_t'
		}
		if (axis == 'y' && rotatedirection == 'n') {
			var spin_effect_side = 'spin_effect_yn_s';
			var spin_effect_top = 'spin_effect_yn_t'
		}

		if (axis == 'x' && rotatedirection == 'p') {
			var spin_effect_side = 'spin_effect_xp_s';
			var spin_effect_top = 'spin_effect_xp_t'
		}
		if (axis == 'x' && rotatedirection == 'n') {
			var spin_effect_side = 'spin_effect_xn_s';
			var spin_effect_top = 'spin_effect_xn_t'
		}

		if (axis == 'z' && rotatedirection == 'p') {
			var spin_effect_side = 'spin_effect_zp_s_0';
			var spin_effect_side_1 = 'spin_effect_zp_s_1';
			var spin_effect_top = 'spin_effect_zp_t'
		}
		if (axis == 'z' && rotatedirection == 'n') {
			var spin_effect_side = 'spin_effect_zn_s_0';
			var spin_effect_side_1 = 'spin_effect_zn_s_1';
			var spin_effect_top = 'spin_effect_zn_t'
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



/*----------------------  public function -------------------------------------*/
	$scope.RotateDataPositive = function(RotateData) {
		var facenum, innerfacenum, facenum1, innerfacenum1, store, store1;
		for (var i = 0; i < RotateData.length; i++) {

			for (var j = 0; j < RotateData[i].length; j++) {
				facenum = RotateData[i][j].face;
				innerfacenum = RotateData[i][j].innerface;
				
				
				if (j == 0) {
					store = $scope.facesMaping[facenum][innerfacenum].value;
					store1 = $scope.facesMaping[facenum][innerfacenum].id;

				} 
				if (j < RotateData[i].length - 1) {
					facenum1 = RotateData[i][j + 1].face;
					innerfacenum1 = RotateData[i][j + 1].innerface;

					$scope.facesMaping[facenum][innerfacenum].value = $scope.facesMaping[facenum1][innerfacenum1].value;
					$scope.facesMaping[facenum][innerfacenum].id = $scope.facesMaping[facenum1][innerfacenum1].id;
				} else {
					$scope.facesMaping[facenum][innerfacenum].value = store;
					$scope.facesMaping[facenum][innerfacenum].id = store1;
				}				
			}
		}
	}

	$scope.RotateDataNegative = function(RotateData) {
		var facenum, innerfacenum, facenum1, innerfacenum1, store, store1;
		for (var i = 0; i < RotateData.length; i++) {

			for (var j = RotateData[i].length - 1; j >= 0; j--) {
				facenum = RotateData[i][j].face;
				innerfacenum = RotateData[i][j].innerface;				
				
				if (j == RotateData[i].length - 1) {
					store = $scope.facesMaping[facenum][innerfacenum].value;
					store1 = $scope.facesMaping[facenum][innerfacenum].id;
				} 
				if (j > 0) {
					facenum1 = RotateData[i][j - 1].face;
					innerfacenum1 = RotateData[i][j - 1].innerface;

					$scope.facesMaping[facenum][innerfacenum].value = $scope.facesMaping[facenum1][innerfacenum1].value;
					$scope.facesMaping[facenum][innerfacenum].id = $scope.facesMaping[facenum1][innerfacenum1].id;
				} else {
					$scope.facesMaping[facenum][innerfacenum].value = store;
					$scope.facesMaping[facenum][innerfacenum].id = store1;
				}				
			}
		}
	}


	$scope.CompleteMovement = function() {
		var complete = true, cubeDimension = $scope.cubeDimension;
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < cubeDimension * cubeDimension; j++) {
				$scope.facesMaping[i][j].spin = '';				
				if ($scope.isSafari) {
					var spinaxis = 'spinaxis_d' + $scope.cubeDimension + '_' + i + '_safari';
					$scope.facesMaping[i][j].spinaxis = spinaxis;
				} 

				//check whether complete
				if (j != 0) {
					if ($scope.facesMaping[i][j].value != $scope.facesMaping[i][j - 1].value) {
						complete = false
					}
					
				}
			}
		}
		if (complete) {
			console.log(complete);
		}
		
	}






	$scope.RandomMovement = function() {
		//Select random movement
		if ($scope.cubeDimension  == 2) {
			var movement = [
				'U', 'L', 'F', 'R', 'B', 'D',
				'U`', 'L`', 'F`', 'R`', 'B`', 'D`',
			]			
		}


		if ($scope.cubeDimension  == 3) {
			var movement = [
				'U', 'L', 'F', 'R', 'B', 'D',
				'U`', 'L`', 'F`', 'R`', 'B`', 'D`',
				'M', 'M`', 'E', 'E`', 'S', 'S`',
				'u', 'i', 'f', 'r', 'b', 'd',
				'u`', 'i`', 'f`', 'r`', 'b`', 'd`'
			]			
		} 

		var rand = movement[Math.floor(Math.random() * movement.length)];
		$scope.Notation(rand);
	}

	$scope.RandomInitialization = function() {
		var randommovement = [];
		var movementstep = 20;
		for (var i = 0; i < movementstep; i++) {
			$scope.RandomMovement();
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
		for (var i = 0; i < 6; i++) {
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
		for (var i = 0; i < 6; i++) {
						
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




	$scope.transformTo2x2 = function() {
		if ($scope.cubeDimension !== 2) {
			var transform = confirm("Transform to different dimension will reset the cube. Do you want to transform?");
			if (transform) {
			    $scope.cubeDimension = 2;
				$scope.ResetCube();
			}			
		}

	}
	$scope.transformTo3x3 = function() {
		if ($scope.cubeDimension !== 3) {
			var transform = confirm("Transform to different dimension will reset the cube. Do you want to transform?");
			if (transform) {
			    $scope.cubeDimension = 3;
				$scope.ResetCube();
			}			
		}
	}





}])





