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


$(document).on('click','#submit', function(){

var app = (function() {
   var key = '745eed796c8d41a9b6d30552bb20b4b5';

   var corsProxy = "https://cors-anywhere.herokuapp.com/";
   var params = $.param({
       "apiKey": key
   });

   
   object={}

   //var url =corsProxy + "https://addb.absolutdrinks.com/drinks/with/lemon-juice/"+params;

var drink=$('#drink').val()
if (drink=''){drink='vodka'}

   var url = corsProxy + "https://addb.absolutdrinks.com/quickSearch/drinks/vodka?" + params;
   
   function onSuccess(data) {
       object=data
       database.ref('Drinks').set({absolut: object})
       console.log("API request success");
       console.log(data);


for(i=0;i<object.result.length;i++){


var video_url=data.result[i].videos[0].video
var video_url='https://www.youtube.com/embed/'+video_url

var name=object.result[i].name
var desc=object.result[i].descriptionplain


$('#card_container').append('  <div class="col-12 col-sm-6 col-md-4 col-lg-3"> <div class="card" style="width: 18rem;"> <iframe width=100% height="150" src="'+video_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> <div class="card-body"> <h5 class="card-title">'+ name +'</h5> <p class="card-text"> '+name+'</p>  </div> </div> </div>')
      
   }
}

   function onFailure(data) {
       console.log("API request failed");
       console.log(data);
   }

   function fetchData() {
       $.ajax({
           url: url,
           type: 'GET',
           beforeSend: function (xhr) {
               xhr.setRequestHeader('Authorization', 'Bearer ' + key);
           }
       }).then(
           onSuccess,
           onFailure
       );
   }

   return {
       fetchData: fetchData,
       url: url
   };
})();

app.fetchData();

})