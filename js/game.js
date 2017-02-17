$(function(){
	var appendLogMsg = function(msg) {
		console.log(msg);
	}
	
	function randomIntFromInterval(min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	var p1 = {
		speed : 30, 
		stopImageNumber : 1, 
		duration : 2, 
		startCallback : function() {
			appendLogMsg('start1');
			$('.start').attr('disabled', 'true');
		},
		slowDownCallback : function() {
			appendLogMsg('slowdown1');
			//$('.stop').attr('disabled', 'true');
		},
		stopCallback : function($stopElm) {
			appendLogMsg('stop1');
			$('.start').removeAttr('disabled');
		}

	}
	var p2 = {
		speed : 30, 
		stopImageNumber : 2, 
		duration : 2, 
		startCallback : function() {
			appendLogMsg('start2');
			$('.start').attr('disabled', 'true');
		},
		slowDownCallback : function() {
			appendLogMsg('slowdown2');
		},
		stopCallback : function($stopElm) {
			appendLogMsg('stop2');
			$('.start').removeAttr('disabled');
		}

	}
	var rouletter1 = $('div.roulette1');
	var rouletter2 = $('div.roulette2');
	
	
	rouletter1.roulette(p1);	
	rouletter2.roulette(p2);	
	
	$('.start').click(function(){
		p1.stopImageNumber = randomIntFromInterval(1,6)-1;
		console.log(p1.stopImageNumber);
		p2.stopImageNumber = randomIntFromInterval(1,10)-1;
		console.log(p2.stopImageNumber);
		
		rouletter1.roulette('option', p1);
		rouletter2.roulette('option', p2);

		rouletter1.roulette('start');	
		rouletter2.roulette('start');	
	});
	
});