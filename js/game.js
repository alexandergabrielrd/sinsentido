$(function(){
	var appendLogMsg = function(msg) {
		console.log(msg);
	}
	
	function randomIntFromInterval(min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	var p1 = {
		speed : 80, 
		stopImageNumber : 1, 
		duration : 2, 
		startCallback : function() {
			//appendLogMsg('start1');
			$('.start').attr('disabled', 'true');
		},
		slowDownCallback : function() {
			//appendLogMsg('slowdown1');
			//$('.stop').attr('disabled', 'true');
		},
		stopCallback : function($stopElm) {
			//appendLogMsg('stop1');
			$('.start').removeAttr('disabled');
		}
	}
	
	var p2 = {
		speed : 20, 
		stopImageNumber : 2, 
		duration : 1, 
		startCallback : function() {
			//appendLogMsg('start2');
			$('.start').attr('disabled', 'true');
		},
		slowDownCallback : function() {
			//appendLogMsg('slowdown2');
		},
		stopCallback : function($stopElm) {
			//appendLogMsg('stop2');
			$('.start').removeAttr('disabled');
			console.log(p1.stopImageNumber);
			console.log(p2.stopImageNumber);
			console.log(QandAObj.qa[p1.stopImageNumber].list[p2.stopImageNumber].q);
			question = QandAObj.qa[p1.stopImageNumber].list[p2.stopImageNumber].q;
			options = QandAObj.qa[p1.stopImageNumber].list[p2.stopImageNumber].o;
			answer = QandAObj.qa[p1.stopImageNumber].list[p2.stopImageNumber].a;
			// Colocar la informacion en los campos del modal
			 $('#pregunta').text(question);
			// Deshabilitar el boton de cerrar el modal hasta responder
			// Habilitar el boton del modal al responder
			$('#myModal').modal('show');
		}

	}
	
	var rouletter1 = $('div.roulette1');
	var rouletter2 = $('div.roulette2');
	
	rouletter1.roulette(p1);	
	rouletter2.roulette(p2);	
	
	$('.start').click(function(){
		p1.stopImageNumber = randomIntFromInterval(0,5);
		p2.stopImageNumber = randomIntFromInterval(0,9);
		
		rouletter1.roulette('option', p1);
		rouletter2.roulette('option', p2);

		rouletter1.roulette('start');	
		rouletter2.roulette('start');	
	});
	
	$('#abtn').click(function(){
		// Verificar que la respuesta es correcta
		// Cambiar la imagen del sentido en la parte superior
		// A buena si la respuesta es buena a mala sino
		console.log("modal closed");
	});
	
});