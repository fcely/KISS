$(document).ready(function() {
    alert(success);
});
var app = (function() {
    var key = '9aa27bbec84b1e153103023c31889741';
    var params = $.param({
        "q": "san diego"
    });
    var url = "https://developers.zomato.com/api/v2.1/cities?q=San%20Diego?" + params;
    
    function onSuccess(data) {
        console.log("API request success");
        console.log(data);
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
                xhr.setRequestHeader('user-key', key);
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