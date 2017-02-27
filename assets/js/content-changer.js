/**
 * Created by cjdhein on 2/26/2017.
 */

var well2head;
var well2body;
var well2_1body;
var well2_2body;
var well2_3body;
var active;


console.log("frog");

$(document).ready(function(){
    assignText();
    initPage();
});

function initPage(){
    active = $("#well2-1");
    well2head = $("#well2-panel-heading");
    well2body = $("#well2-panel-body");
    $("#well2-1").click(function(){
        var newHead = $("#well2-1").text();
        var newBody = well2_1body;
        $("#well2-panel-heading").text(newHead);
        $("#well2-panel-body").html(newBody);

        switchActive(active, $("#well2-1"));

    });
    $("#well2-2").click(function(){
        var newHead = $("#well2-2").text();
        var newBody = well2_2body;
        $("#well2-panel-heading").text(newHead);
        $("#well2-panel-body").html(newBody);

        switchActive(active, $("#well2-2"));
    });
    $("#well2-3").click(function(){
        var newHead = $("#well2-3").text();
        var newBody = well2_3body;
        $("#well2-panel-heading").text(newHead);
        $("#well2-panel-body").html(newBody);

        switchActive(active, $("#well2-3"));
    });
}

function switchActive(prev, next){
    var inactiveClass = "list-group-item clickable";
    var activeClass = "list-group-item clickable active";

    prev.prop("class", inactiveClass);
    next.prop("class", activeClass);
    active = next;
}

function assignText(){
    well2_1body = "<p> The API provides nine different methods, each of which can be used to obtain different kinds of information. </p><p>Of those 9, one used to obtain a security token <strong>(auth.getToken)</strong> and one for obtaining info on a specific shelter <strong>(shelter.get)</strong> are not covered in this guide.</p>";
    well2_2body = "<p>All requests to the API will be made using JSONP. If you are curious what this is, and why we have to use it, check out <a href=\"https://blog.algolia.com/jsonp-still-mandatory/\">this article</a>.</p> <p>TL;DR we need to use it or otherwise the browser will block our requests.</p>";
    well2_3body = "<p>The API offers up its information in either XML or JSON format." +
        " As their docs mention, XML is the default and JSON can be specified by adding the <code>&format=JSON</code> specifier to our requests.</p>" +
        "<small><i> Note:  For this guide I will be using JSON, because I like it more and XML makes me feel dirty." +
        "(This is likely only due to the amount of horrendously designed and formatted XML docs that I have been exposed to." +
        "If you are lucky enough to have not undergone this trauma, feel free to use XML!)</i></small>";
}