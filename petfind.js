/**
 * Created by cjdhein on 2/28/2017.
 */

var results;
var usable_info = {
    "name"  : "",
    "age"   : "",
    "size"  : "",
    "gender": "",
    "breeds" : [],
    "notes" : [],
    "description" : ""
}

console.log(usable_info.breeds);
console.log(usable_info.notes);

var pet_format = '<div class="panel panel-primary">'+
    '      <div class="panel-heading"><span class="api_input"></span></div>'+
    '      <div class="panel-body container">'+
    '        <div class="row pet-info-row">'+
    '          <p class="col-lg-2">Age: <span class="api_input"></span></p>'+
    '          <p class="col-lg-2">Size:    <span class="api_input"></span></p>'+
    '          <p class="col-lg-2">Gender:  <span class="api_input"></span></p>'+
    '        </div>'+
    '        <div class="row pet-info-row">'+
    '          <div class="col-lg-4"><div class="api_input">Breed(s): </div></div>'+
    '          <div class="col-lg-4">Notes: <span class="api_input"></span></div>'+
    '        </div>'+
    '      </div>'+
    '    </div>';

$(document).ready(function(){
    sampleCall();
});

function sampleCall(){
    var sampleURL = "https://api.petfinder.com/pet.find?animal=dog&key=dcc5be07eeae2e3fed49e529ed8cf73b&location=53217&count=4&output=basic&format=json&callback=?";
    console.log("1");

    $.ajax({
        dataType: "jsonp",
        url: sampleURL,
        success:(function(data){
            results = data.petfinder.pets;
            grabInfo(results);
        })
    });
}

function grabInfo(res){

    usable_info.name = res.pet[0].name.$t;
    usable_info.age = res.pet[0].age.$t;
    usable_info.size = res.pet[0].size.$t;
    usable_info.gender = res.pet[0].sex.$t;
    usable_info.notes = res.pet[0].options;

    var breeds = res.pet[0].breeds.breed;
    for(var i = 0; i < breeds.length; i++){
        usable_info.breeds[i] = breeds[i].$t;
    }


    var notes = res.pet[0].options.option;
    for(var i = 0; i < notes.length; i++){
        console.log(notes[i].$t);
        usable_info.notes[i] = notes[i].$t;
    }



    switch (usable_info.size){
        case "S":
            usable_info.size = "Small";
            break;
        case "M":
            usable_info.size = "Medium";
            break;
        case "L":
            usable_info.size = "Large";
            break;
        case "XL":
            usable_info.size = "Extra Large";
            break;
        default:
            usable_info.size = usable_info.size;
    }

    switch (usable_info.gender){
        case "F":
            usable_info.gender = "Female";
            break;
        case "M":
            usable_info.gender = "Male";
            break;
        default:
            usable_info.gender = usable_info.gender;
    }

    console.log(JSON.stringify(usable_info));
    displayInfo();
}

function displayInfo(){
    var new_pet = $(pet_format);

    var inputs = new_pet.find('.api_input');
    $(inputs[0]).text(usable_info.name);
    $(inputs[1]).text(usable_info.age);
    $(inputs[2]).text(usable_info.size);
    $(inputs[3]).text(usable_info.gender);
    $(inputs[6]).text(usable_info.description);
    usable_info.breeds.forEach(function(data){
        var breed_line = $("<li style='margin-left:20px' class='breed_line'></li>");
        breed_line.text(data);
        $(inputs[4]).append(breed_line);
    });
    usable_info.notes.forEach(function(data){
        var notes_line = $("<li style='margin-left:20px' class='notes_line'></li>");
        notes_line.text(data);
        $(inputs[5]).append(notes_line);
    });
    $("#example").append(new_pet);
}






console.log("word");

