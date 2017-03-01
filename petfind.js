/**
 * Created by cjdhein on 2/28/2017.
 */

var results;
var favorite_ids = new Map();
var usable_info = {
    "name"  : "",
    "age"   : "",
    "size"  : "",
    "gender": "",
    "breeds" : [],
    "notes" : [],
	"photo" : "",
	"id"	:"",
}

console.log(usable_info.breeds);
console.log(usable_info.notes);

var pet_format =  '<div class="panel panel-primary pet_name">'+
' <div class="panel-heading"><button class="btn btn-xs btn-warning fav-btn"><span class="glyphicon glyphicon-star-empty"</span></button><span class="api_input"></span></div>'+
' <div class="panel-body container">'+
'	<div class="row pet-info-row">'+
'		<img class="pet_image col-lg-2" src=""></img>'+
'		<div class="row">'+
'			<p class="col-lg-2">Age: <span class="api_input"></span></p>'+
'			<p class="col-lg-2">Size:    <span class="api_input"></span></p>'+
'			<p class="col-lg-2">Gender:  <span class="api_input"></span></p>'+
'			<div class="row pet-info-row">'+
'				<div class="col-lg-4"><div class="api_input">Breed(s): </div></div>'+
'				<div class="col-lg-4">Notes: <span class="api_input"></span></div>'+
'			</div>   '+
'		</div>'+
'	</div>'+
' </div>'+
'</div>';
	
function logFav(info, favbtn){
	if(favorite_ids.has(info)){
		favbtn.target.firstChild.className = "glyphicon glyphicon-star-empty";
		favorite_ids.delete(info);
	}else{
		favbtn.target.firstChild.className = "glyphicon glyphicon-star";
		favorite_ids.set(info, info);
	}
}

$(document).ready(function(){
    firstCall();
	$("#getFavs").click(function(event){
		event.preventDefault();
		favorite_ids.forEach(function(value, key, map){
			favCall(value);
			
		});
	});
});

function favCall(id){
	var params = id;
	var endbit = "&output=basic&format=json&callback=?";
    var favURL = "https://api.petfinder.com/pet.get?key=dcc5be07eeae2e3fed49e529ed8cf73b&id=";
    console.log("1");
    $.ajax({
        dataType: "jsonp",
        url: favURL+params+endbit,
        success:(function(data){
            var favResult = [data.petfinder.pet];
            grabInfo(favResult, ($("#favorite-pets")));
        })
    });	
}

function firstCall(){
    var sampleURL = "https://api.petfinder.com/pet.find?animal=dog&key=dcc5be07eeae2e3fed49e529ed8cf73b&location=53217&count=4&output=basic&format=json&callback=?";
    console.log("1");
    $.ajax({
        dataType: "jsonp",
        url: sampleURL,
        success:(function(data){
            results = data.petfinder.pets.pet;
            grabInfo(results, ($("#example")));
        })
    });
}

function grabInfo(res, whereToDisplay){

    for(var q = 0; q < res.length; q++){
        usable_info.name = res[q].name.$t;
        usable_info.age = res[q].age.$t;
        usable_info.size = res[q].size.$t;
        usable_info.gender = res[q].sex.$t;
		usable_info.photo = res[q].media.photos.photo[2].$t;
		usable_info.id = res[q].id.$t;

        var breeds = res[q].breeds.breed;
        for(var i = 0; i < breeds.length; i++){
            usable_info.breeds[i] = breeds[i].$t;
        }


        var notes = res[0].options.option;
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
		
		var thisInfo = usable_info;
		
		displayInfo(thisInfo, whereToDisplay);


    }

}

function displayInfo(infoToDisplay, whereToDisplay){
        var new_pet = $(pet_format);
		var favbtn = new_pet.find('.fav-btn');
		favbtn.on('click',function(favbtn){
			var fav_id =favbtn.delegateTarget.id; 
			logFav(fav_id, favbtn);
			
		});
		
        var inputs = new_pet.find('.api_input');
        $(inputs[0]).text(infoToDisplay.name);
        $(inputs[1]).text(infoToDisplay.age);
        $(inputs[2]).text(infoToDisplay.size);
        $(inputs[3]).text(infoToDisplay.gender);
        $(inputs[6]).text(infoToDisplay.description);
		new_pet.find('.fav-btn').attr("id", infoToDisplay.id);
		new_pet.find('.pet_image').attr("src", infoToDisplay.photo);
		
        for(var i = 0; i < infoToDisplay.breeds.length; i++){
            var breed_line = $("<li style='margin-left:20px' class='breed_line'></li>");
            breed_line.text(infoToDisplay.breeds[i]);
            $(inputs[4]).append(breed_line);
        }

        for(var f = 0; f < infoToDisplay.notes.length; f++){
            var notes_line = $("<li style='margin-left:20px' class='notes_line'></li>");
            notes_line.text(infoToDisplay.notes[f]);
            $(inputs[5]).append(notes_line);
            console.log(infoToDisplay.notes[f]);
        }
        whereToDisplay.append(new_pet);
}






console.log("word");

