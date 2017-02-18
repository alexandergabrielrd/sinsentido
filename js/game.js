$(function(){
	
	var question;
	var	options;
	var	answer;
	var opacity = 0.35;
	
	var appendLogMsg = function(msg) {
		console.log(msg);
	}
	
	function randomIntFromInterval(min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	var allTrue = function(boolarray) {
		for (var i = 0; i < boolarray.length; ++i) { 
			if (boolarray[i]) {
				continue;
			} else {
				return(false);
			}
		}
		return(true);
	}

	var p1 = {
		speed : 85, 
		stopImageNumber : 1, 
		duration : 3, 
		startCallback : function() {
			//$('.start').attr('disabled', 'true');
		},
		slowDownCallback : function() {
			//$('.stop').attr('disabled', 'true');
		},
		stopCallback : function($stopElm) {
			//$('.start').removeAttr('disabled');
		}
	}
	
	var p2 = {
		speed : 65, 
		stopImageNumber : 2, 
		duration : 2, 
		startCallback : function() {
			$('.start').attr('disabled', 'true');
		},
		slowDownCallback : function() {
		},
		stopCallback : function($stopElm) {
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
			$('#qaModal').modal('show');
		}

	}
	
	var rouletter1 = $('div.roulette1');
	var rouletter2 = $('div.roulette2');
	
	rouletter1.roulette(p1);	
	rouletter2.roulette(p2);	
	
	$('.start').click(function(){
		p1.stopImageNumber = randomIntFromInterval(0,QandAObj.qa.length-1);
		p2.stopImageNumber = randomIntFromInterval(0,QandAObj.qa[0].list.length-1);
		
		rouletter1.roulette('option', p1);
		rouletter2.roulette('option', p2);
        var audio = {};
        audio["walk"] = new Audio();
        audio["walk"].src = "http://alexandergabrielrd.github.io/sinsentido/audio/slot.mp3"
        audio["walk"].addEventListener('load', function () {
            audio["walk"].play();
        });
		rouletter1.roulette('start');	
		rouletter2.roulette('start');	
	});
	
	var condition=true;
	
	var checkAnswer = function() {
		// Verificar que la respuesta es correcta
		if (condition) {
			$("#"+p1.stopImageNumber).css('opacity' , 1);
			$("#"+p1.stopImageNumber).css('filter' , "none");
			estatus[p1.stopImageNumber] = true;
			// Revisar si todas están ok para terminar
			if (allTrue(estatus)) {
				// Termina el juego
				console.log("GAME OVER!!!")
				$('#goverModal').modal('show');
			} else {
				console.log(JSON.stringify(estatus));
				console.log("GAME not OVER!!!")
			}
			condition=true;
			console.log(JSON.stringify(estatus));
		} else {
			$("#"+p1.stopImageNumber).css('opacity' , opacity);
			$("#"+p1.stopImageNumber).css('filter' , "grayscale(100%)");
			
			estatus[p1.stopImageNumber] = false;
			condition=true;
	
			console.log(JSON.stringify(estatus));
		}
		// Cambiar la imagen del sentido en la parte superior
		// A buena si la respuesta es buena a mala sino
		console.log("qa modal closed");
	}
	
	var restartGame = function() {
		//Inicializar todas las imágenes opacas
		$('.categorias').children().css('filter' , "grayscale(100%)");
		$('.categorias').children().css('opacity' , opacity);
		for (var i = 0; i < estatus.length; ++i) { estatus[i] = false; }
	}
	
	$('#qaModal').on('hide', function () {
		checkAnswer();
	})
	
	$('#qaModal').on('hidden.bs.modal', function (e) {
		checkAnswer();
	})

	$('#abtn').click(function(){
		checkAnswer();
	});
	
	$('#goverModal').on('hide', function () {
		restartGame();
	})
	
	$('#goverModal').on('hidden.bs.modal', function (e) {
		restartGame();
	})
	
	$('#gobtn').click(function(){
		restartGame();
	});

	//Inicializar todas las imágenes opacas
	$('.categorias').children().css('filter' , "grayscale(100%)");
	$('.categorias').children().css('opacity' , opacity);
	var estatus = new Array(6);
	for (var i = 0; i < estatus.length; ++i) { estatus[i] = false; }


});