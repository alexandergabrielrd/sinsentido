﻿$(function(){
	
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

	var audioTransition = function(outa,ina) {
		var vol = 0.2;
		var step = 0.05;
		var  oldvol = audio[outa].volume;
		while (vol>0) {
			audio[outa].volume = vol;
			vol=vol-step;
		}
		audio[outa].pause();
		audio[outa].volume = oldvol;
		audio[outa].pause();
		if (ina!="normal") {
			audio[ina].currentTime=0;
		}
		audio[ina].volume=0;
		audio[ina].play();
		vol = 0;
		while (vol<=0.4) {
			audio[ina].volume = vol;
			vol=vol+step;
		}
	}
	
	var audioUpVolume = function(aud,maxvol) {
		var vol = 0;
		var step = 0.05;
		while (vol<=maxvol) {
			audio[aud].volume = vol;
			vol=vol+step;
		}
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
			$('#o1').text(options[0]);
			$('#o2').text(options[1]);
			$('#o3').text(options[2]);
			$('#o4').text(options[3]);
			audioTransition("spin","qa");
			audio["normal"].pause();
			// Deshabilitar el boton de cerrar el modal hasta responder
			// Habilitar el boton del modal al responder
			$('#qaModal').modal('show');
		}

	}
	
	var rouletter1 = $('div.roulette1');
	var rouletter2 = $('div.roulette2');
	
	rouletter1.roulette(p1);	
	rouletter2.roulette(p2);
	
	var audio = {};
	audio["normal"] = new Audio();
    audio["normal"].src = "audio/normal.mp3";
	audio["normal"].volume = 0.5;
    audio["normal"].addEventListener('load', function () {
        audio["normal"].play();
    });
	audio["normal"].addEventListener("ended", function() {
		audio["normal"].play();
	});
    audio["spin"] = new Audio();
    audio["spin"].src = "audio/slot.mp3";
	audio["spin"].volume = 0.5;
    audio["spin"].addEventListener('load', function () {
        audio["spin"].play();
    });
    audio["qa"] = new Audio();
    audio["qa"].src = "audio/jeopardy.mp3";
	audio["qa"].volume = 0.4;
    audio["qa"].addEventListener('load', function () {
        audio["qa"].play();
    });		
	audio["correct"] = new Audio();
    audio["correct"].src = "audio/correct.mp3";
	audio["correct"].volume = 0.6;
    audio["correct"].addEventListener('load', function () {
        audio["correct"].play();
    });	
	audio["correct"].addEventListener("ended", function() {
		audio["normal"].volume=0.3;
		audio["normal"].play();
	});
	audio["error"] = new Audio();
    audio["error"].src = "audio/error.mp3";
	audio["error"].volume = 0.6;
    audio["error"].addEventListener('load', function () {
        audio["error"].play();
    });	
	audio["error"].addEventListener("ended", function() {
		audio["normal"].volume=0.3;
		audio["normal"].play();
	});
	audio["gover"] = new Audio();
    audio["gover"].src = "audio/gover.mp3";
	audio["gover"].volume = 0.8;
    audio["gover"].addEventListener('load', function () {
        audio["gover"].play();
    });	
	audio["help"] = new Audio();
    audio["help"].src = "audio/jeopardy.mp3";
	audio["help"].volume = 0.4;
    audio["help"].addEventListener('load', function () {
        audio["help"].play();
    });
	audio["help"].addEventListener('ended', function () {
        audio["help"].play();
    });
	
	$('.start').click(function(){
		p1.stopImageNumber = randomIntFromInterval(0,QandAObj.qa.length-1);
		p2.stopImageNumber = randomIntFromInterval(0,QandAObj.qa[0].list.length-1);
		
		rouletter1.roulette('option', p1);
		rouletter2.roulette('option', p2);
		
		audioTransition("normal","spin");
		
		rouletter1.roulette('start');	
		rouletter2.roulette('start');	
	});
	
	var checkAnswer = function() {
		audio["qa"].pause();
		// Verificar que la respuesta es correctati
		condition=$('input[name=optradio]:checked').val()==answer;
		console.log("seleccionado "+$('input[name=optradio]:checked').val());
		console.log("answer "+answer);
		$('input[name=optradio]:checked').prop('checked', false);
		if (condition) {
			audio["correct"].currentTime=0
			audio["correct"].play();
			$("#"+p1.stopImageNumber).css('opacity' , 1);
			$("#"+p1.stopImageNumber).css('filter' , "none");
			estatus[p1.stopImageNumber] = true;
			// Revisar si todas están ok para terminar
			if (allTrue(estatus)) {
				audio["gover"].currentTime=0
				audio["gover"].play();
				$('#goverModal').modal('show');
			}
		} else {
			audio["error"].currentTime=0
			audio["error"].play();
			$("#"+p1.stopImageNumber).css('opacity' , opacity);
			$("#"+p1.stopImageNumber).css('filter' , "grayscale(100%)");
			estatus[p1.stopImageNumber] = false;
		}
	}
	
	var restartGame = function() {
		//Inicializar todas las imágenes opacas
		$('.categorias').children().css('filter' , "grayscale(100%)");
		$('.categorias').children().css('opacity' , opacity);
		for (var i = 0; i < estatus.length; ++i) { estatus[i] = false; }
	}
	
	$('#qaModal').on('hide', function () {
		if (!normalflow){
			checkAnswer();
		} else {
			normalflow = false;
		}
	})
	
	$('#qaModal').on('hidden.bs.modal', function (e) {
		if (!normalflow){
			checkAnswer();
		} else {
			normalflow = false;
		}
	})

	$('#abtn').click(function(){
		normalflow = true;
		checkAnswer();
	});
	
	$('#goverModal').on('hide', function () {
		audio["gover"].pause();
		restartGame();
	})
	
	$('#goverModal').on('hidden.bs.modal', function (e) {
		audio["gover"].pause();
		restartGame();
	})
	
	$('#gobtn').click(function(){
		audio["gover"].pause();
		restartGame();
	});
	
	$('#help').click(function(){	
		audioTransition("normal","help");
		$("#helpModal").modal("show");
	});
	$('#helpModal').on('hide', function () {
		audioTransition("help","normal");
	})
	
	$('#helpModal').on('hidden.bs.modal', function (e) {
		audioTransition("help","normal");
	})
	$('#hbtn').click(function(){
		audioTransition("help","normal");
	});

	//Inicializar todas las imágenes opacas
	$('.categorias').children().css('filter' , "grayscale(100%)");
	$('.categorias').children().css('opacity' , opacity);
	var estatus = new Array(6);
	for (var i = 0; i < estatus.length; ++i) { estatus[i] = false; }
	audio["normal"].play();
	var normalflow = false;

});