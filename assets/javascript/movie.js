var config = {
	apiKey: "AIzaSyDYKJVKrHI4Vb9oexmK8oMEPmRClVLPap4",
	authDomain: "kiss-d14dd.firebaseapp.com",
	databaseURL: "https://kiss-d14dd.firebaseio.com",
	projectId: "kiss-d14dd",
	storageBucket: "kiss-d14dd.appspot.com",
	messagingSenderId: "439034791894"
};

firebase.initializeApp(config);
var database = firebase.database();

src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"

$(document).ready(function() {
	 var movieNowPlaying = [];
	 var moviePoster = [];
	 var movieOverview = [];
	 movieNames = {};
	 moviePosters = {};
	 movieOverviews = {};
	 dranks = {};
	 events = {};
	 food = {};
	 gifts = {};
	 tunes = {};

			
		var queryURL = "https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=a7aefb5a297d28431ad978b5500ec5a5";

object= {};

	$.ajax({
					url: queryURL,
					method: "GET"
				}).done(function(response) {
					var results = response.data;

					object = response;
					for (var i = 0; i < response.results.length; i++) {
					
					var movie = object.results[i].original_title;

					var poster = response.results[i].poster_path;

					var overview = response.results[i].overview;

					var release = response.results[i].release_date;

					movieNowPlaying[i]  = response.results[i].original_title;
					moviePoster[i] = "<img src ='http://image.tmdb.org/t/p/w185//" + response.results[i].poster_path + "'>";
					movieOverview[i] = response.results[i].overview;
					response.results[i].overview + "<img src ='http://image.tmdb.org/t/p/w185//" + response.results[i].poster_path;

					var x = $('#userContent').closest("tr");
					$("#userContent").append("<tr><td> " + movie + "</td><td><img src = 'http://image.tmdb.org/t/p/w185//" + poster + "'</td><td>" + overview + "</td></tr>");
					}
					var choiceIndex = Math.floor(Math.random() * object.results.length)
					var randomMovie = response.results[choiceIndex].poster_path;
					$("#randomMovie").append("<p><img src ='http://image.tmdb.org/t/p/w185//" + randomMovie + "'></p>");

				database.ref('Movies').set({

				movieNowPlaying: movieNowPlaying,
				moviePoster: moviePoster,
				movieOverview: movieOverview,
					});

					database.ref('Movies/movieNowPlaying').on("value",function(snapshot){
						movieNames=snapshot.val();
						console.log(movieNames)
					});
					database.ref('Movies/movieOverview').on("value",function(snapshot){
						movieOverviews=snapshot.val();
						console.log(movieOverviews)
					});
					database.ref('Movies/moviePoster').on("value",function(snapshot){
						moviePosters=snapshot.val();
						console.log(moviePosters)
					});
					database.ref('Events/eventful/events/event').on("value",function(snapshot){
						events=snapshot.val();
						console.log(events)
					});
					database.ref('Drinks/absolut/result/').on("value",function(snapshot){
						dranks=snapshot.val();
						console.log(dranks)
					});
					database.ref('Restaurant/businesses/').on("value",function(snapshot){
						food=snapshot.val();
						console.log(food)
					});
					
	
		// Get a random symbol class
		function getRand(arr) {
			return $.rand(arr);
		}
	//	function getRandomDrinkIndex() {
	//		return $.rand(dranks);
	//	}

		
		(function($) {
			$.rand = function(arg) {
			if ($.isArray(arg)) {
				return arg[$.rand(arg.length)];
			} else if (typeof arg === "number") {
				return Math.floor(Math.random() * arg);
			} else {
				return 4; // chosen by fair dice roll
			}
			};
		})($);
	
		// Listen for "hold"-button clicks
		$(document).on("click", ".wheel button", function() {
			var button = $(this);
			button.toggleClass("active");
			button.parent().toggleClass("hold");
			button.blur(); // get rid of the focus
		});
	
		$(document).on("click", "#spin", function() {
			// get a plain array of symbol elements
			var symbolsFilm = $(".film").not(".hold").get();
			var symbolsChow = $(".chow").not(".hold").get();
			var symbolsGift = $(".bling").not(".hold").get();
			var symbolsTune = $(".tune").not(".hold").get();
			var symbolsDrink = $(".drink").not(".hold").get();
			var symbolsEvent =  $(".event").not(".hold").get();
	
			if (symbolsFilm.length === 0 && symbolsDrink.length === 0 && symbolsEvent.length === 0) {
			alert("All wheels are held; there's nothing to spin");
			return; // stop here
			}
	
			var button = $(this);
	
			// get rid of the focus, and disable the button
			button.prop("disabled", true).blur();
	
			// counter for the number of spins
			var spins = 0;
	
			// inner function to do the spinning
			function update() {
			for (var i = 0, l = symbolsFilm.length && symbolsDrink.length && symbolsEvent.length; i < l; i++) {
				$('.film').html();
				//Switched append to prepend
				$('.film').prepend('<div style="display: none;" class="new-link" name="link[]"><input type="text" class="stuff" value="' + getRand(movieNames) + '" /></div>');
				//Using "first-of-type" rather than "last"
				$('.film').find(".new-link:first-of-type").slideDown("fast");

				$('.drink').html();
				//Switched append to prepend
				$('.drink').prepend('<div style="display: none;" class="new-link" name="link[]"><input type="text" class="stuff" value="' + getRand(dranks).name + '" /></div>');
				//Using "first-of-type" rather than "last"
				$('.drink').find(".new-link:first-of-type").slideDown("fast");
				
				$('.event').html();
				//Switched append to prepend
				$('.event').prepend('<div style="display: none;" class="new-link" name="link[]"><input type="text" class="stuff" value="' + getRand(events).title + '" /></div>');
				//Using "first-of-type" rather than "last"
				$('.event').find(".new-link:first-of-type").slideDown("fast");
				
				$('.chow').html();
				//Switched append to prepend
				$('.chow').prepend('<div style="display: none;" class="new-link" name="link[]"><input type="text" class="stuff" value="' + getRand(food).name + '" /></div>');
				//Using "first-of-type" rather than "last"
				$('.chow').find(".new-link:first-of-type").slideDown("fast");

	
			}
	
			if (++spins < 50) {
				// set a new, slightly longer interval for the next update. Makes it seem like the wheels are slowing down
				setTimeout(update, 10 + spins * 2);
			} else {
				// re-enable the button
				button.prop("disabled", false);
			}
			}
	
			// Start spinning
			setTimeout(update, 1);
		});
	
		// set the wheels to random symbols when the page loads
		$(function() {
			$(".wheel i").each(function() {
			this.className = getRandomMovieIndex(); // not using jQuery for this, since we don't need to
			});
		});
		
	});

});