function unique(data) {
    temp = {}
    for (var i=0; i < data.length; i++) {
        temp[data[i].Year] = 1;
    }
    return Object.keys(temp);
}//unique()

$(document).ready(function() {
    $("#retrieve-resources").click(function() {
        var displayResources = $("#display-resources");
        displayResources.text("Loading data from JSON sources...");
    
        function success(resp1, resp2) {
            var usms = resp1[0];
            var worldms = resp2[0];
            displayResources.text("Data loaded successfully...");

            var logScale = d3.scaleLog()
                .domain([10, 150])
                .range([0,200]);
            var svg = d3.select("svg");
            var raw = worldms.Appendix_restOfTheWorld;
            var years = unique(raw);
            console.log(years);
        
        };//success()
    
        function failure(response1, response2) {
            displayResources.text("Something is wrong with loading the data ");
        };//failure()

        let usmsajax = $.ajax({type: "GET", url: "https://john3-16.github.io/CS498DataVis/USMassShooting.json"});
        let worldmsajax = $.ajax({type: "GET", url: "https://john3-16.github.io/CS498DataVis/WorldMassShooting.json"});
    
        $.when( usmsajax, worldmsajax )
            .then( success, failure );
    });//click function
});//document ready function