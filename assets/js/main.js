/**
 * Created by cjdhein on 2/26/2017.
 */
var topnav = " <div class=\"container-fluid\"> <div class=\"navbar-header\"> <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\"> <span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> </button> <a class=\"navbar-brand\" href=\"#\">Petfinder API HowTo Guide</a> </div><div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\"> <ul class=\"nav navbar-nav navbar-right\"> <li><a href=\"index.html\">About<span class=\"sr-only\">(current)</span></a></li><li><a href=\"getting-started.html\">Getting Started</a></li><li class=\"dropdown\"> <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">Methods<span class=\"caret\"></span></a> <ul class=\"dropdown-menu\" role=\"menu\"> <li><a href=\"method1.html\">breed.list</a></li><li><a href=\"method2.html\">pet.get</a></li><li><a href=\"method3.html\">pet.getRandom</a></li><li><a href=\"method4.html\">pet.find</a></li><li><a href=\"method5.html\">shelter.find</a></li><li><a href=\"method6.html\">shelter.getPets</a></li><li><a href=\"method7.html\">shelter.listByBreed</a></li></ul> </li></ul> </div></div>";

$(document).ready(function(){
    insertNav();
    $("#subQuery").click(function(event){
        runQuery();
        event.preventDefault();
    });
});


function insertNav() {
    $("#insert-nav").html(topnav);
}

function runQuery(){
    var selection = $("#mySelector");
    var animalType = selection[0].options[selection[0].selectedIndex].value;

    var baseURL = "https://api.petfinder.com/";
    var reqType = "breed.list?";
    var params = "animal=" + animalType +"&";
    var yourKey = "key=dcc5be07eeae2e3fed49e529ed8cf73b&";
    var format = "format=json";
    var callback = "&callback=?";
    var dataSpot = $("#insertData");
    var fullURL = baseURL+reqType+params+yourKey+format+callback;
    $(document).ready(function(){
        $.ajax({
            dataType: "jsonp",
            url: fullURL,
            success:(function(data){
                var breeds = data.petfinder.breeds.breed;
                dataSpot.html('<ul id="animalName"><h4>' + animalType + '</h4></ul>');
                $.each(breeds, function(value){
                    var li = $('<li/>')
                        .text(breeds[value].$t)
                        .appendTo($("#animalName"));
                });
            })
        });

    });
}