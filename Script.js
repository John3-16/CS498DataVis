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
        
        displayResources.text("Loading data from JSON source...");
        
        $.ajax({
            type: "GET",
            url: "https://john3-16.github.io/CS498DataVis/USMassShooting.json",
            success: function(data) {
                displayResources.text("Loading data from JSON source is completed!");
                var logScale = d3.scaleLog()
                    .domain([10, 150])
                    .range([0,200]);
                var svg = d3.select("svg");
                var raw = data.RawDataByCase;
                var years = unique(raw);
                console.log(years);
    
            }
        });
    });
});