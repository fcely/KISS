

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
    alert(oData.events.event.length)
   
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

