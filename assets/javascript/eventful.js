// Initialize Firebase
 //var config = {
 //  apiKey: "AIzaSyDYKJVKrHI4Vb9oexmK8oMEPmRClVLPap4",
 //  authDomain: "kiss-d14dd.firebaseapp.com",
 //  databaseURL: "https://kiss-d14dd.firebaseio.com",
 //  projectId: "kiss-d14dd",
 //  storageBucket: "kiss-d14dd.appspot.com",
 //  messagingSenderId: "439034791894"
 //};
 //firebase.initializeApp(config);


//var database= firebase.database();



  // Initialize Firebase
  //var config = {
  //  apiKey: "AIzaSyAf0lRp4Nr3e3PJ3sRqiVrtmMvvvZlAbBc",
  //  authDomain: "myfirstproject-7366f.firebaseapp.com",
  //  databaseURL: "https://myfirstproject-7366f.firebaseio.com",
  //  projectId: "myfirstproject-7366f",
  //  storageBucket: "myfirstproject-7366f.appspot.com",
  //  messagingSenderId: "661248309956"
  //};
  //firebase.initializeApp(config);


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


function search_events()

{
var type=$('#type').val()
var location=$('#location').val()
var date_from=moment().format('YYYYMMDD')
var date_to=moment().add(2, 'days').format('YYYYMMDD')
var date_range= date_from+"00-"+date_to+"00"


   var oArgs = {
      app_key: "fsFR2HZf4xg6gc9Z",
      //q: "music",
      keywords: type,
      where: location, 
      "date": date_range,
      page_size: 20,
      sort_order: "popularity",
   };

   EVDB.API.call("/events/search", oArgs, function(oData) {
    console.log(oData)
object=oData
database.ref('Events').set({eventful: object})
//firebase.database().ref('eventful').update(object)


   
    var city_name
    var venue_address
    var venue_name
    var title
    var category
    var url
    var image


for (i=0;i<oData.events.event.length;i++){
   
    city_name=oData.events.event[i].city_name
    venue_address=oData.events.event[i].venue_address
    venue_name=oData.events.event[i].venue_name
    title=oData.events.event[i].title
    url=oData.events.event[i].url
    image=oData.events.event[i].image.small.url
       

    $('.info').prepend("<tr id='request_row'>  <td>" + city_name +"</td> <td>" + venue_address +"</td> <td>" + venue_name +"</td> <td>" + title +"</td> <td> <img href='"+url+"' src='"+image+"'> </td>    </tr>" )


}

});

}