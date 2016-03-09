	var animals = ["Cat", "Dog", "Bird", "Mouse", "Tiger", "Bear", "Elephant", "Horse"];

			function appendNewButton(animal) { 
	    		var a = $('<button>')
	   	    	a.addClass('animal');
	    		a.attr('data-name', animal);
	    		a.text(animal);
	    	$('#animalButtons').append(a);
			}
		
			function renderButtons(){ 
				for (var i = 0; i < animals.length; i++){
		    		appendNewButton(animals[i])
				}
			}
					renderButtons();


			$('#animalButtons').on('click', function(){

				var animal = $('#animalInput').val().trim();
					animals.push(animal);
		
					appendNewButton(animal);
			$('#animalInput').val("");

				return false;

			});
		
		$('.animal').on('click', function() {
			$('#animals').empty();
        	var animal = $(this).data('name');
        	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
      

                console.log(queryURL);

                console.log(response)

                
                var results = response.data;
            

                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $('<div>');

                    var p = $('<p>').text("Rating: " + results[i].rating);

                    var animalImage = $('<img>');
                    animalImage.attr('src', results[i].images.fixed_height.url);
					animalImage.attr('data-still', results[i].images.fixed_height_still.url);
					animalImage.attr('data-animate', results[i].images.fixed_height.url);
					animalImage.attr('data-state', 'animate');


                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                    $('#animals').prepend(animalDiv);
                   
                }

            $('#animals').on('click', 'gif', function() {			
            	var state = $(this).attr('data-state');

				if (state == 'still') {
					$(this).attr('src', $(this).data('animate'));
					$(this).attr('data-state', 'animate');
				}else{
					$(this).attr('src', $(this).data('still'));
					$(this).attr('data-state', 'still');
				}
	
	
           
			});
		
		});
	});
