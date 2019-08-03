var displayResources = $("#display-resources");
var massdata;

function unique(data) {
    let temp = [] // object definition
    for (let i=0; i < data.length; i++) {
        let row = data[i];
        let year = new Date(row.Date).getFullYear();
        let idx = temp.findIndex(o=> o.Year === year);
        if (idx != -1) {
            temp[idx].attacks++;
        } else {
            let Year = {Year: year, attacks: 1};
            let Attack = {Date: row.Date, Country: row.Country, State: row.State, City: row.City,  Killed: row.Killed,
                          Perpetrator: row.Perpetrator, Type: row.Type, Infomation: row.InfomationOnAttack};
            temp.push(Year);
        }
    }
    return temp;
}//unique()

function getMaxValue(darray, ele) {
    let values = [];
    for(let i=0; i < darray.length; i++) {
        values.push(Math.ceil(parseFloat(darray[i][""+ele])));
    }
    values.sort(function (a,b) {return a-b})
    return values[values.length-1]
}//getMaxValue()

function getJSON(url) {
    return get(url).then(JSON.parse(response));
}//getJSON()

function getData() {
    let usmsajax = $.ajax({type: "GET", url: "https://john3-16.github.io/CS498DataVis/USMassShooting.json"});
    let worldmsajax = $.ajax({type: "GET", url: "https://john3-16.github.io/CS498DataVis/WorldMassShooting.json"});
    
    function success(resp1, resp2) {
        let usms = resp1[0];
        let worldms = resp2[0];
        displayResources.text("Data loaded successfully...");
        
        massdata = unique(worldms.Appendix_restOfTheWorld);
    };//success()
    
    function failure(response1, response2) {
        displayResources.text("Something is wrong with loading the data ");
    };//failure()
    
    $.when( usmsajax, worldmsajax )
        .then( success, failure );
}//getData()

$(document).ready(function() {
    displayResources.text("Loading data from JSON sources...");
    var data = getData();
    console.log(data);
    
    var logScale = d3.scaleLog()
        .domain([10, 150])
        .range([0,200]);
    var svg = d3.select("svg");
    
    $("#retrieve-resources").click(function() {
    });//click function
});//document ready function