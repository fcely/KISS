var string=location.href
// This avoids the page to loop...

//if (string=== "https://fcely.github.io/KISS/spotify.html"){

//document.location.href="https://accounts.spotify.com/authorize/?client_id=4bfc50b0cfd8462c80ed1240b4bdd6a7&response_type=token&redirect_uri=https://fcely.github.io/KISS/spotify.html&scope=user-read-private%20user-read-email&state=34fFs29kd09"

//}

string=window.location.href
 
var start=string.search("#access_token=") +14
var end= string.search("&token_type=")
var token = ''
token = string.substring(start,end)

if (token=== ''){

document.location.href="https://accounts.spotify.com/authorize/?client_id=4bfc50b0cfd8462c80ed1240b4bdd6a7&response_type=token&redirect_uri=https://fcely.github.io/KISS/spotify.html&scope=user-read-private%20user-read-email&state=34fFs29kd09"

}



if (token==='') {
    alert('Spotify Log in Failed')
}


    
    $(document).on('click','#submit', function(){
    
    var id=''
    var artist=$('#artist').val()
    
    if (artist==''){artist='planetshakers'}
    
    $.ajax({
        url: "https://api.spotify.com/v1/search?q="+artist+"&type=artist",
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer " + token)
        }, success: function(data){
            id=data.artists.items[0].id
            $('#spotify_player').html("<iframe id='spotify_player' src='https://open.spotify.com/embed/artist/"+id+"' width='300' height='380' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>")
        }
    })
    
    })
