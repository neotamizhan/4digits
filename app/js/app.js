'use strict';


// Declare app level module which depends on filters, and services
var FourDigits = angular.module('FourDigits', []);

FourDigits.controller( 'GameController', function GameController ($scope) {

	$scope.setConstants = function () {
		$scope.max_tries = 8;
		$scope.digits = 4;		
	}

	$scope.init = function () {		
		$scope.panel_class = "default";
		$scope.game = {thought: '0000', tries: []};		
		$scope.counter = $scope.max_tries;
    $scope.successStatus = $scope.digits + "A0B"; 
		$scope.guessed = '';
		$scope.game_on = false;		
		$scope.message = "";
	}

	$scope.startGame = function  () {
		$scope.init();		
		$scope.game.thought = $scope.thinkNumber();	
		$scope.game_on = true;
		$('#guessed').focus();
	};

	$scope.endGame = function  () {
		$scope.init();		
		$scope.game_on = false;
	};

	$scope.processGuess = function () {

		if ($scope.counter <= 0) {return;};

		$scope.counter--;

		var distance = $scope.getDistance($scope.game.thought, $scope.guessed);
		var round = {serial : $scope.max_tries - $scope.counter, guess: $scope.guessed, result: distance}; 
		$scope.game.tries.push(round);
		$scope.guessed = '';
		
		if (round.result == $scope.successStatus){
			$scope.game_on = false;
			$scope.message = "Successful!!!";
			$scope.panel_class = "success";
		} else
		{
			if ($scope.counter == 0) {
				$scope.game_on = false;
				$scope.message = "Better Luck Next Time. The Number was " + $scope.game.thought;
				$scope.panel_class = "danger";
			} else {
				$scope.message = "Try a little harder. :)";
				$scope.panel_class = "warning";
			}

		}


	}

	$scope.thinkNumber = function () {
	    var thought = "0000";
	    //var numsize = 4;
	    do {
	      thought = Math.floor(Math.random() * Math.pow(10,$scope.digits)).toString();
	    } while (!isNumberValid(thought, $scope.digits));

	    return thought;
  	};
  
  	$scope.getDistance = function(original, guessed) {
	    original = asArray(original);
	    guessed = asArray(guessed);

	    var b = 0;
	    var a = 0;
	    var arrA = [];
	    var arrB = [];

	    for (var i = 0; i < original.length; i++) {      
	      if (original[i] == guessed[i]) {
	      	a++;
	      	arrA.push(original[i]);
	      }	        	    
	    };

	    //arrB = arrayCommon(original, guessed);
	    // Remove arrA elements from arrB. 
	    arrB = _.intersection(original, guessed);

	    arrB = _.difference(arrB, arrA);
	    
	    b = arrB.length;

    	return a + "A" + b + "B";
  	};

  	$scope.CompletedPercentage = function () {
  		return ($scope.counter/$scope.max_tries) * 100	
  	};

  	$scope.GetState = function () {
  		if ($scope.CompletedPercentage() <= 100 && $scope.CompletedPercentage() > 60)
  			return "success";

  		if ($scope.CompletedPercentage() <= 60 && $scope.CompletedPercentage() > 30)
  			return "warning";

  		if ($scope.CompletedPercentage() <= 30)
  			return "danger";
  		
  		return "success";  		
  	};

  	$scope.setConstants();
  	
});
