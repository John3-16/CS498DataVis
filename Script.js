function unique(data) {
    temp = {}
    for (var i=0; i < data.length; i++) {
        temp[data[i].Year] = 1;
    }
    return Object.keys(temp);
}

$(document).ready(function() {
    $("#retrieve-resources").click(function() {
        var displayResources = $("#display-resources");
        var ms = new Object();
        displayResources.text("Loading data from JSON sources...");
        
        $.ajax({
            type: "GET",
            url: "https://john3-16.github.io/CS498DataVis/USMassShooting.json",
            success: function(data) {
                ms.us = data;
                displayResources.text("Loading Mass Shooting data from JSON source 1 of 2 is completed!");
            }//success function()
        });//ajax call
        $.ajax({
            type: "GET",
            url: "https://john3-16.github.io/CS498DataVis/WorldMassShooting.json",
            success: function(data) {
                ms.world = data;
                displayResources.text("Loading ass Shooting data from JSON source 2 of 2 is completed!");
            }//success function()
        });//ajax call
    
        var logScale = d3.scaleLog()
            .domain([10, 150])
            .range([0,200]);
        var svg = d3.select("svg");
        var raw = ms.us.RawDataByCase;
        var years = unique(raw);
        console.log(years);
        
    });//click function
});//document ready function