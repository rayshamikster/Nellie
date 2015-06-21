$(document).ready(function(){
	$( "#user-input").on('focus',function(){
	console.log('Focussed');
	$('#user-input').on('keyup',function(event){
		var userInput = $(this).val();
		console.log(userInput);
		var lastChar = userInput.slice(-1);
		console.log(lastChar);
		if(lastChar==='\n' || lastChar==='.'){
			console.log("Call API");
			fetchSentiment(userInput);
			}
		});
	});


	function fetchSentiment(sampleText){
	    var color;
	    var sampleText = $('#user-input').val();
	    console.log(sampleText);
	    $.ajax({
	        url: "https://api.idolondemand.com/1/api/sync/analyzesentiment/v1?text="+sampleText+"&language=eng&apikey=a5b4542b-c34b-454a-b0d4-f22bc73383a8"
	    }).then(function(data) {

	       $('#sentiment').html(data.aggregate.sentiment.toUpperCase());
	       var percent = data.aggregate.score*100;
	       percent=Math.round(percent);
	       $('#score').html(percent+"%");
	       if(data.aggregate.sentiment ==="positive"){
		    	color = "#99FF99";
			    }
			    else if(data.aggregate.sentiment ==="negative"){
					color = "#FF9999";	
			    }
			    else
					color = "#FFFF99";

				$('body').css('background-color', color);
				$('#user-input').css('background-color', color);
	    });
	}

});