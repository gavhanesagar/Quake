var initFlag = 0;
var page2Flag = 0;
var portName;
var country;
var userID;

function initLoad() {

    console.log("In initLoad(), userID: "+userID);

    userID = document.getElementById("country").innerHTML.toString();
    
    console.log("localStorage: "+localStorage);
    portName = localStorage.getItem("Portfolio");
    peril = localStorage.getItem("peril");
    country = localStorage.getItem("country");
    
    document.getElementById("portfolio").innerHTML = portName;
    document.getElementById("country").innerHTML = country;
    console.log("portName: " + portName + "\n country: " + country);

    console.log("peril: "+peril);
    document.getElementById("disPeril").innerHTML = peril.toUpperCase();

    page1Table();
    page2Table();
    page3Table();
    page4Table();
    page5Table();
}



function page1Table() {
    console.log("In table 1 country: " + country + "\n portName: " + portName+ " \n userID: "+userID);
    var dataSet1 = new Array();
    var dataSetc = new Array();
    path = "https://vati.satyukt.com/quake/quakeModelManasa/resources/data/UserUploads/"+userID+"/Results/"+peril+"/" + country + "/" + portName + "/page1_table1.csv";
    console.log("In table, path: " + path);

    d3.csv(path, function(data) {
        //Read header
        var headerNames = d3.keys(data[0]);
        console.log("values: " + d3.values(data[0]))
        d = d3.values(data);

        if (d == "") {
            swal({
                title: "No data in CSV!",
                type: "warning",
                width: 400,
                padding: "3em",
                showConfirmButton: false,
                timer: 2000
            });
            return 0;
        } else {

            for (i = 0; i < 5; i++) {
                /*This would create an array for t[i]*/
                dataSet1[i] = [];
                dataSetc[i] = [];
                for (j = 0; j < d3.keys(data[0]).length; j++) {

                    dataSetc[i][j] = d3.values(data[i])[j];
                    var x = d3.values(data[i])[j].replace(/,/g, "");
                    var val = x;
                    dataSet1[i][j] = val;
                }
            }

            console.log("dataSet1: " + dataSet1);

            var col = [
                { title: "Zone Number" },
                { title: "Zone Name" },
                { title: "Residential Low Rise" },
                { title: "Residential High Rise" },
                { title: "Commercial Low Rise" },
                { title: "Commercial High Rise" },
                { title: "Industrial" },
                { title: "Engineering" }
            ];

            console.log("col: " + col[0].title);



            $("#table1").DataTable({
                "aaData": dataSet1,
                "order": [[ 1, 'desc' ]],

                "aoColumnDefs": [{
                    "aTargets": [1, 2, 3, 4, 5, 6,7],
                    "sClass": "aligner"
                }, ],
                aLengthMenu: [
                    [5, 10, -1],
                    [5, 10, "All"]
                ],
                iDisplayLength: 5
            });
            console.log("dataset1: " + dataSet1);
            chartDispPage1(dataSetc);
        }
    });



}


function chartDispPage1(dataSet) {

    var ctx = document.getElementById('bar-chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [dataSet[0][0], dataSet[1][0], dataSet[2][0], dataSet[3][0], dataSet[4][0]],
            datasets: [{
                    label: 'Residential Low Rise',
                    backgroundColor: ["#2980b9", "#2980b9", "#2980b9", "#2980b9", "#2980b9", "#2980b9", "#2980b9"],
                    data: [dataSet[0][1], dataSet[1][1], dataSet[2][1], dataSet[3][1], dataSet[4][1]],
                }, {
                    label: '"Residential High Rise',
                    backgroundColor: ["#16a085", "#16a085", "#16a085", "#16a085", "#16a085", "#16a085", "#16a085"],
                    data: [dataSet[0][2], dataSet[1][2], dataSet[2][2], dataSet[3][2], dataSet[4][2]],
                }, {
                    label: 'Commercial Low Rise',
                    backgroundColor: ["#0abde3", "#0abde3", "#0abde3", "#0abde3", "#0abde3", "#0abde3", ],
                    data: [dataSet[0][3], dataSet[1][3], dataSet[2][3], dataSet[3][3], dataSet[4][3]],
                }, {
                    label: 'Commercial High Rise',
                    backgroundColor: ["#33FFBD", "#33FFBD", "#33FFBD", "#33FFBD", "#33FFBD", "#33FFBD", ],
                    data: [dataSet[0][4], dataSet[1][4], dataSet[2][4], dataSet[3][4], dataSet[4][4]],
                }, {
                    label: 'Industrial',
                    backgroundColor: ["#DBFF33", "#DBFF33", "#DBFF33", "#DBFF33", "#DBFF33", "#DBFF33", ],
                    data: [dataSet[0][5], dataSet[1][5], dataSet[2][5], dataSet[3][5], dataSet[4][5]],
                }, {
                    label: 'Engineering',
                    backgroundColor: ["#99ff66", "#99ff66", "#99ff66", "#99ff66", "#99ff66", "#99ff66", ],
                    data: [dataSet[0][6], dataSet[1][6], dataSet[2][6], dataSet[3][6], dataSet[4][6]],
                }

            ]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true,
                    barThickness: 50,
                }],
                yAxes: [{
                    stacked: true,
                }]
            }
        }
    });

    var ctx1 = document.getElementById('bar-chart2').getContext('2d');
    console.log("\n\ndataset: " + dataSet + "\n\n");
    console.log("dataSet[0][1]*100:" + dataSet[0][1] * 100);
    var rlrSum = 0;
    rlrSum = parseInt(dataSet[0][1]) + parseInt(dataSet[1][1]) + parseInt(dataSet[2][1]) + parseInt(dataSet[3][1]) + parseInt(dataSet[4][1]);
    var rhrSum = parseInt(dataSet[0][2]) + parseInt(dataSet[1][2]) + parseInt(dataSet[2][2]) + parseInt(dataSet[3][2]) + parseInt(dataSet[4][2]);
    var clrSum = parseInt(dataSet[0][3]) + parseInt(dataSet[1][3]) + parseInt(dataSet[2][3]) + parseInt(dataSet[3][3]) + parseInt(dataSet[4][3]);
    var chrSum = parseInt(dataSet[0][4]) + parseInt(dataSet[1][4]) + parseInt(dataSet[2][4]) + parseInt(dataSet[3][4]) + parseInt(dataSet[4][4]);
    var iSum = parseInt(dataSet[0][5]) + parseInt(dataSet[1][5]) + parseInt(dataSet[2][5]) + parseInt(dataSet[3][5]) + parseInt(dataSet[4][5]);
    /*console.log("rlrSum:"+rlrSum);
    t = (parseInt(dataSet[0][1])*100)/parseInt(rlrSum);
    console.log("%: "+t+ " \n round:"+t.toFixed(2));
    
    console.log("tab: \n " + dataSet[0][1]+", "+ dataSet[1][1]+ ", "+dataSet[2][1]+", "+dataSet[3][1]+", "+dataSet[4][1]+
                "\n "+dataSet[0][2]+ ", "+dataSet[1][2]+ ", "+dataSet[2][2]+ ", "+dataSet[3][2]+", "+dataSet[4][2]+
                "\n "+dataSet[0][3] + ", "+ dataSet[1][3]+ ", "+dataSet[2][3]+ ", "+dataSet[3][3]+", "+dataSet[4][3]+
                "\n "+dataSet[0][4] + ", "+ dataSet[1][4]+ ", "+dataSet[2][4]+ ", "+dataSet[3][4]+", "+dataSet[4][4]+
                "\n "+dataSet[0][5] + ", "+ dataSet[1][5]+ ", "+dataSet[2][5]+ ", "+dataSet[3][5]+", "+dataSet[4][3]);
    
    console.log("rlr: "+dataSet[0][6]+"\n 01: "+((parseInt(dataSet[0][1])*100)/parseInt(dataSet[0][6])).toFixed(2)+"\n 11: "+ ((parseInt(dataSet[1][1])*100)/parseInt(dataSet[0][6])).toFixed(2) + "\n 21: "+ ((parseInt(dataSet[2][1])*100)/parseInt(dataSet[0][6])).toFixed(2) + "\n 31: "+ ((parseInt(dataSet[3][1])*100)/parseInt(dataSet[0][6])).toFixed(2)+ "\n 41: "+ ((parseInt(dataSet[4][1])*100)/parseInt(dataSet[0][6])).toFixed(2));
    
    console.log("rhr: "+dataSet[1][6]+"\n 02:"+dataSet[0][2]+", \n02 Val: "+((parseInt(dataSet[0][2])*100)/parseInt(dataSet[1][6])).toFixed(2)+"\n 12: "+ ((parseInt(dataSet[1][2])*100)/parseInt(dataSet[1][6])).toFixed(2) + "\n 22: "+ ((parseInt(dataSet[2][2])*100)/parseInt(dataSet[1][6])).toFixed(2) + "\n 32: "+ ((parseInt(dataSet[3][2])*100)/parseInt(dataSet[1][6])).toFixed(2)+ "\n 42: "+ ((parseInt(dataSet[4][2])*100)/parseInt(dataSet[1][6])).toFixed(2));*/

    console.log("parseInt(dataSet[1][1]):" + (parseInt(dataSet[3][1])) + " \n dataset[1][6]: " + (dataSet[3][6]));
    console.log("%: "+((parseInt(dataSet[0][1])*100)/parseInt(dataSet[0][7])).toFixed(2));
    var myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: [dataSet[0][0], dataSet[1][0], dataSet[2][0], dataSet[3][0], dataSet[4][0]],
            datasets: [{
                label: 'Residential Low Rise',
                backgroundColor: ["#2980b9", "#2980b9", "#2980b9", "#2980b9", "#2980b9", "#2980b9", "#2980b9"],
                data: [((parseInt(dataSet[0][1]) * 100) / parseInt(dataSet[0][7])).toFixed(2), ((parseInt(dataSet[1][1]) * 100) / parseInt(dataSet[1][7])).toFixed(2), ((parseInt(dataSet[2][1]) * 100) / parseInt(dataSet[2][7])).toFixed(2), ((parseInt(dataSet[3][1]) * 100) / parseInt(dataSet[3][7])).toFixed(2), ((parseInt(dataSet[4][1]) * 100) / parseInt(dataSet[4][7])).toFixed(2)],
            }, {
                label: '"Residential High Rise',
                backgroundColor: ["#16a085", "#16a085", "#16a085", "#16a085", "#16a085", "#16a085", "#16a085"],
                data: [((parseInt(dataSet[0][2]) * 100) / parseInt(dataSet[0][7])).toFixed(2), ((parseInt(dataSet[1][2]) * 100) / parseInt(dataSet[1][7])).toFixed(2), ((parseInt(dataSet[2][2]) * 100) / parseInt(dataSet[2][7])).toFixed(2), ((parseInt(dataSet[3][2]) * 100) / parseInt(dataSet[3][7])).toFixed(2), ((parseInt(dataSet[4][2]) * 100) / parseInt(dataSet[4][7])).toFixed(2)],
            }, {
                label: 'Commercial Low Rise',
                backgroundColor: ["#0abde3", "#0abde3", "#0abde3", "#0abde3", "#0abde3", "#0abde3", ],
                data: [((parseInt(dataSet[0][3]) * 100) / parseInt(dataSet[0][7])).toFixed(2), ((parseInt(dataSet[1][3]) * 100) / parseInt(dataSet[1][7])).toFixed(2), ((parseInt(dataSet[2][3]) * 100) / parseInt(dataSet[2][7])).toFixed(2), ((parseInt(dataSet[3][3]) * 100) / parseInt(dataSet[3][7])).toFixed(2), ((parseInt(dataSet[4][3]) * 100) / parseInt(dataSet[4][7])).toFixed(2)],
            }, {
                label: 'Commercial High Rise',
                backgroundColor: ["#33FFBD", "#33FFBD", "#33FFBD", "#33FFBD", "#33FFBD", "#33FFBD", ],
                data: [((parseInt(dataSet[0][4]) * 100) / parseInt(dataSet[0][7])).toFixed(2), ((parseInt(dataSet[1][4]) * 100) / parseInt(dataSet[1][7])).toFixed(2), ((parseInt(dataSet[2][4]) * 100) / parseInt(dataSet[2][7])).toFixed(2), ((parseInt(dataSet[3][4]) * 100) / parseInt(dataSet[3][7])).toFixed(2), ((parseInt(dataSet[4][4]) * 100) / parseInt(dataSet[4][7])).toFixed(2)],
            }, {
                label: 'Industrial',
                backgroundColor: ["#DBFF33", "#DBFF33", "#DBFF33", "#DBFF33", "#DBFF33", "#DBFF33", ],
                data: [((parseInt(dataSet[0][5]) * 100) / parseInt(dataSet[0][7])).toFixed(2), ((parseInt(dataSet[1][5]) * 100) / parseInt(dataSet[1][7])).toFixed(2), ((parseInt(dataSet[2][5]) * 100) / parseInt(dataSet[2][7])).toFixed(2), ((parseInt(dataSet[3][5]) * 100) / parseInt(dataSet[3][7])).toFixed(2), ((parseInt(dataSet[4][5]) * 100) / parseInt(dataSet[4][7])).toFixed(2)],
            }, {
                label: 'Engineering',
                backgroundColor: ["#99ff66", "#99ff66", "#99ff66", "#99ff66", "#99ff66", "#99ff66", ],
                data: [((parseInt(dataSet[0][6]) * 100) / parseInt(dataSet[0][7])).toFixed(2), ((parseInt(dataSet[1][6]) * 100) / parseInt(dataSet[1][7])).toFixed(2), ((parseInt(dataSet[2][6]) * 100) / parseInt(dataSet[2][7])).toFixed(2), ((parseInt(dataSet[3][6]) * 100) / parseInt(dataSet[3][7])).toFixed(2), ((parseInt(dataSet[4][6]) * 100) / parseInt(dataSet[4][7])).toFixed(2)],
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true,
                    barThickness: 50,
                }],
                yAxes: [{
                    stacked: true,

                }]
            }
        }
    });
}

function page2Table() {
    path = "https://vati.satyukt.com/quake/quakeModelManasa/resources/data/UserUploads/"+userID+"/Results/"+peril+"/" + country + "/" + portName + "/page2_table.csv";
    /*console.log("In table, path: " + path);*/
    d3.csv(path, function(data) {
        //Read header
        var headerNames = d3.keys(data[0]);
        d = d3.values(data);

        if (d == "") {
            swal({
                title: "No data in CSV!",
                type: "warning",
                width: 400,
                padding: "3em",
                showConfirmButton: false,
                timer: 2000
            });
            return 0;
        } else {
            var dataSet = new Array();
            var dataSetc = new Array();
            for (i = 0; i < d3.values(data).length; i++) {
                /*This would create an array for t[i]*/
                dataSet[i] = [];
                dataSetc[i] = [];
                for (j = 0; j < d3.keys(data[0]).length; j++) {
                    /*console.log("data 213: "+d3.values(data[i])[j]);*/
                    dataSetc[i][j] = d3.values(data[i])[j];
                    var x = d3.values(data[i])[j].replace(/,/g, "");
                    var val = x;
                    /*console.log("val: "+val);*/
                    dataSet[i][j] = val;
                }
                /*console.log("dataset in loop: "+dataSet);*/
            }
            /*console.log("dataset outside: " + dataSet);*/

            $("#table2").DataTable({
                "aaData": dataSet,
                "aaSorting": [[1, 'desc']],
                "order":  [ 1, 'desc' ],
                "aoColumnDefs": [{
                    "aTargets": [0, 1, 2, 3, 4, 5, 6],
                    "sClass": "aligner",
                    'orderable': true
                }],
                aLengthMenu: [
                    [5, 10, -1],
                    [5, 10, "All"]
                ],
                iDisplayLength: -1
            });

        }
    });
}

function chartDispPage2() {



    /*path = "resources/data/UserUploads/U1/Results/Algeria/output/page2_graph.csv";
        console.log("In table, path: " + path);
        
    d3.csv(path, function(data) {
        //Read header
        var headerNames = d3.keys(data[0]);
        d = d3.values(data);
            
        if (d == "") {
            swal({
                title: "No data in CSV!",
                type: "warning",
                width: 400,
                padding: "3em",
                showConfirmButton: false,
                timer: 2000
            });
            return 0;
        } else {
            var dataSet = new Array();
            for (i = 0; i < d3.values(data).length; i++) {
              
                dataSet[i] = [];
                for (j = 0; j < d3.keys(data[0]).length; j++) {
                    dataSet[i][j] = d3.values(data[i])[j];
                }
            }


            console.log("dataset 123: " + dataSet[0][0]);

            var x = new Array();
            for (i = 0; i < d3.values(data).length; i++) {
                x[i] = dataSet[i][0];

            }
            console.log("x:" + x);

            var y = new Array();
            for (i = 0; i < d3.values(data).length; i++) {
                y[i] = dataSet[i][1];

            }
            console.log("y:" + y);


            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: x,
                    datasets: [{

                        fill: false,
                        backgroundColor: "rgba(140, 193, 82, 0.2)",
                        borderColor: "rgb(140, 193, 82)",
                        data: y,
                        lineTension: 0,
                        fill: "origin"
                    }]
                },

                // Configuration options go here
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                userCallback: function(value, index, values) {
                                    value = value.toString();
                                    value = value.split(/(?=(?:...)*$)/);
                                    value = value.join(",");
                                    return "$" + value;
                                }
                            }

                        }]
                    }
                }
            });






        }
    });*/
    page2Flag++;
    console.log("page2Flag: " + page2Flag);
    if (document.getElementById("multiLine") == null) {
        // basic SVG setup
        var margin = { top: 20, right: 100, bottom: 40, left: 100 };
        var height = 300 - margin.top - margin.bottom;
        var width = 1800 - margin.left - margin.right;

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "multiLine")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // setup scales - the domain is specified inside of the function called when we load the data
        var xScale = d3.scale.linear().range([0, width]);
        var yScale = d3.scale.linear().range([height, 0]);
        var color = d3.scale.category10();

        // setup the axes
        var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
        var yAxis = d3.svg.axis().scale(yScale).orient("left");

        // create function to parse dates into date objects
        var parseDate = d3.time.format("%Y-%m-%d").parse;
        var formatDate = d3.time.format("%Y-%m-%d");
        var bisectDate = d3.bisector(function(d) { return d.date; }).left;

        // set the line attributes
        var line = d3.svg.line()
            .interpolate("basis")
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale(d.close); });

        var focus = svg.append("g").style("display", "none");

        /* // gridlines in x axis function
         function make_x_gridlines() {		
             return d3.axisBottom(xAxis)
                 .ticks(5)
         }

         // gridlines in y axis function
         function make_y_gridlines() {		
             return d3.axisLeft(yAxis)
                 .ticks(5)
         }*/

        // import data and create chart
        d3.csv("https://vati.satyukt.com/quake/quakeModelManasa/resources/data/UserUploads/"+userID+"/Results/"+peril+"/" + country + "/" + portName + "/page2_graph.csv", function(d) {
                return {
                    date: +d.x,
                    AEP: +d.AEP,
                    OEP: +d.OEP,

                };
            },

            function(error, data) {
                // color domain
                color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

                // create stocks array with object for each company containing all data
                var stocks = color.domain().map(function(name) {
                    return {
                        name: name,
                        values: data.map(function(d) {
                            /*console.log("d.date:"+d.date);*/
                            return { date: d[name], close: d.date };
                        })
                    };
                });

                // add domain ranges to the x and y scales
                xScale.domain([

                    d3.min(stocks, function(c) { console.log("min: " + d3.min(c.values, function(v) { return v.date; })); return d3.min(c.values, function(v) { return v.date; }); }),
                    d3.max(stocks, function(c) { return d3.max(c.values, function(v) { return v.date; }); })


                ]);
                yScale.domain([
                    0,
                    // d3.min(stocks, function(c) { return d3.min(c.values, function(v) { return v.close; }); }),
                    d3.max(stocks, function(c) { return d3.max(c.values, function(v) { return v.close; }); })
                ]);

                /*// add the X gridlines
                 svg.append("g")			
                     .attr("class", "grid")
                     .attr("transform", "translate(0," + height + ")")
                     .call(make_x_gridlines()
                         .tickSize(-height)
                         .tickFormat("")
                     )

                 // add the Y gridlines
                 svg.append("g")			
                     .attr("class", "grid")
                     .call(make_y_gridlines()
                         .tickSize(-width)
                         .tickFormat("")
                     )*/

                // add the x axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .append("text")
                    .attr("transform", "rotate(0)")
                    .attr("x", 1650)
                    .attr("dx", ".80em")
                    .style("text-anchor", "end")
                    .text("Price ($)");

                // add the y axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);


                // add circle at intersection
                focus.append("circle")
                    .attr("class", "y")
                    .attr("fill", "none")
                    .attr("stroke", "black")
                    .style("opacity", 0.5)
                    .attr("r", 8);

                // add horizontal line at intersection
                focus.append("line")
                    .attr("class", "x")
                    .attr("stroke", "black")
                    .attr("stroke-dasharray", "3,3")
                    .style("opacity", 0.5)
                    .attr("x1", 0)
                    .attr("x2", width);


                // add the line groups
                var stock = svg.selectAll(".stockXYZ")
                    .data(stocks)
                    .enter().append("g")
                    .attr("class", "stockXYZ");

                // add the stock price paths
                stock.append("path")
                    .attr("class", "line")
                    .attr("id", function(d, i) { return "id" + i; })
                    .attr("d", function(d) {
                        return line(d.values);
                    })
                    .style("stroke", function(d) { return color(d.name); });


                // add the stock labels at the right edge of chart
                var maxLen = data.length;
                stock.append("text")
                    .datum(function(d) {
                        return { name: d.name, value: d.values[maxLen - 1] };
                    })
                    .attr("transform", function(d) {
                        return "translate(" + xScale(d.value.date) + "," + yScale(d.value.close) + ")";
                    })
                    .attr("id", function(d, i) { return "text_id" + i; })
                    .attr("x", 3)
                    .attr("dy", ".35em")
                    .text(function(d) { return d.name; })
                    .on("mouseover", function(d, i) {
                        for (j = 0; j < 6; j++) {
                            if (i !== j) {
                                d3.select("#id" + j).style("opacity", 0.1);
                                d3.select("#text_id" + j).style("opacity", 0.2);
                            }
                        };
                    })

                // mousemove function
                function mousemove() {
                    var x0 = xScale.invert(d3.mouse(this)[0]);
                };
            });
    } else {        
        if (document.getElementById("multiLine").style.display == "none") {
            document.getElementById("multiLine").style.display = "inline-block";
        }
    }
}





function page3Table() {

    path = "https://vati.satyukt.com/quake/quakeModelManasa/resources/data/UserUploads/"+userID+"/Results/"+peril+"/" + country + "/" + portName + "/page3_table1.csv";

    d3.csv(path, function(data) {
        //Read header
        var headerNames = d3.keys(data[0]);
        d = d3.values(data);

        if (d == "") {
            swal({
                title: "No data in CSV!",
                type: "warning",
                width: 400,
                padding: "3em",
                showConfirmButton: false,
                timer: 2000
            });
            return 0;
        } else {
            var dataSet = new Array();
            var dataSetc = new Array();
            for (i = 0; i < d3.values(data).length; i++) {
                /*This would create an array for t[i]*/
                dataSet[i] = [];
                dataSetc[i] = [];
                for (j = 0; j < d3.keys(data[0]).length; j++) {
                    dataSetc[i][j] = d3.values(data[i])[j];
                    var x = d3.values(data[i])[j].replace(/,/g, "");
                    var val = x;
                    dataSet[i][j] = val;
                }
            }

            var col = [

                { title: "Zone Name" },
                { title: "Residential Low Rise" },
                { title: "Residential High Rise" },
                { title: "Commercial Low Rise" },
                { title: "Commercial High Rise" },
                { title: "Industrial" },
                { title: "Engineering" }
            ];

            /*console.log("col: " + col[0].title);
            console.log("dataset: " + dataSet);*/

            $("#table3").DataTable({
                "aaData": dataSet,
                "aoColumnDefs": [{
                    "sTitle": "Zone Numbers",
                    "aTargets": ["site_name"]
                }, {
                    "aTargets": [0, 2, 3],
                    "sClass": "aligner",
                }],
                aLengthMenu: [
                    [5, -1],
                    [5, "All"]
                ],
                iDisplayLength: 5
            });
            chartDispPage3(dataSetc);
        }
    });
}

function chartDispPage3(dataSet) {
    var datas = [4500, 5500, 8945, 342, 6780, 2345];
    /*console.log("BAR " + datas);*/
    var ctx = document.getElementById('pie-chart').getContext('2d');
    /*var myChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: [dataSet[1][1], dataSet[2][1], dataSet[3][1], dataSet[4][1], dataSet[5][1], dataSet[6][1]],
            datasets: [{
                label: "Cash",
                fill: false,
                backgroundColor: "rgba(140, 193, 82, 0.2)",
                borderColor: "rgb(140, 193, 82)",
                data: [dataSet[1][2], dataSet[2][2], dataSet[3][2], dataSet[4][2], dataSet[5][2], dataSet[6][2]],
                lineTension: 0,
                fill: "origin"
            }]
        },

        // Configuration options go here
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        userCallback: function(value, index, values) {
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(",");
                            return "$" + value;
                        }
                    }
                }]
            }
        }
    });*/
    
    // And for a doughnut chart
/*var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: [dataSet[1][2], dataSet[2][2], dataSet[3][2], dataSet[4][2], dataSet[5][2], dataSet[6][2]],
    options: options
});*/
    
    var ctx = document.getElementById("pie-chart").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [dataSet[0][1], dataSet[1][1], dataSet[2][1], dataSet[3][1]],//, dataSet[5][1], dataSet[6][1]],
        datasets: [{
          backgroundColor: [
            /*"#2ecc71",
            "#3498db",
            "#95a5a6",*/
            "#99ff66",
            "#DBFF33",
            "#0abde3",
            "#33FFBD"
            /*"#9b59b6",
            "#f1c40f",
            "#e74c3c",
            "#34495e"*/
          ],
          data: [dataSet[0][2], dataSet[1][2], dataSet[2][2], dataSet[3][2]]//, dataSet[5][2], dataSet[6][2]],
        }]
      }
    });
}

function page4Table() {
    path = "https://vati.satyukt.com/quake/quakeModelManasa/resources/data/UserUploads/"+userID+"/Results/"+peril+"/" + country + "/" + portName + "/page4_table.csv";
    console.log("In table, path: " + path);

    d3.csv(path, function(data) {
        //Read header
        var headerNames = d3.keys(data[0]);
        d = d3.values(data);

        if (d == "") {
            swal({
                title: "No data in CSV!",
                type: "warning",
                width: 400,
                padding: "3em",
                showConfirmButton: false,
                timer: 2000
            });
            return 0;
        } else {
            var dataSet = new Array();
            var dataSetc = new Array();
            for (i = 0; i < d3.values(data).length; i++) {
                /*This would create an array for t[i]*/
                dataSet[i] = [];
                dataSetc[i] = [];
                for (j = 0; j < d3.keys(data[0]).length; j++) {
                    dataSetc[i][j] = d3.values(data[i])[j];
                    var x = d3.values(data[i])[j].replace(/,/g, "");
                    var val = x;
                    dataSet[i][j] = val;
                }
            }

            var col = [

                { title: "Zone Name" },
                { title: "Residential Low Rise" },
                { title: "Residential High Rise" },
                { title: "Commercial Low Rise" },
                { title: "Commercial High Rise" },
                { title: "Industrial" },
                { title: "Engineering" }
            ];

            /*console.log("col: " + col[0].title);
            console.log("dataset: " + dataSet);*/

            $("#table4").DataTable({
                "aaData": dataSet,
                "aoColumnDefs": [{
                    "sTitle": "Zone Numbers",
                    "aTargets": ["site_name"]
                }, {
                    "aTargets": [0, 2, 3, 4],
                    "sClass": "aligner",
                }],
                aLengthMenu: [
                    [5, 10, -1],
                    [5, 10, "All"]
                ],
                iDisplayLength: 5
            });
            chartDispPage4(dataSetc);
        }
    });
}

function chartDispPage4(dataSet) {

    /*console.log("dataSet page4: "+dataSet+"\nvalue:"+dataSet[1][3]);*/

    var ctx = document.getElementById('bar-chart4').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [dataSet[0][1], dataSet[1][1], dataSet[2][1], dataSet[3][1], dataSet[4][1]],
            datasets: [{
                label: '1 in 200 PML',

                backgroundColor: ["#2980b9", "#16a085", "#0abde3", "#33FFBD", "#DBFF33"],
                data: [dataSet[0][3], dataSet[1][3], dataSet[2][3], dataSet[3][3], dataSet[4][3], dataSet[5][3]],

            }]
        },
        options: {
            scales: {
                xAxes: [{

                    barThickness: 50,

                }],
                yAxes: [{



                }]
            }
        }
    });

}

function page5Table() {

    path = "https://vati.satyukt.com/quake/quakeModelManasa/resources/data/UserUploads/"+userID+"/Results/"+peril+"/" + country + "/" + portName + "/page5_table.csv";
    console.log("In table, path: " + path);

    d3.csv(path, function(data) {
        //Read header
        var headerNames = d3.keys(data[0]);
        d = d3.values(data);

        if (d == "") {
            swal({
                title: "No data in CSV!",
                type: "warning",
                width: 400,
                padding: "3em",
                showConfirmButton: false,
                timer: 2000
            });
            return 0;
        } else {
            var dataSet = new Array();
            var dataSetc = new Array();
            for (i = 0; i < d3.values(data).length; i++) {
                /*This would create an array for t[i]*/
                dataSet[i] = [];
                dataSetc[i] = [];
                for (j = 0; j < d3.keys(data[0]).length; j++) {
                    dataSetc[i][j] = d3.values(data[i])[j];
                    var x = d3.values(data[i])[j].replace(/,/g, "");
                    var val = x;
                    dataSet[i][j] = val;
                }
            }

            var col = [

                { title: "Zone Name" },
                { title: "Residential Low Rise" },
                { title: "Residential High Rise" },
                { title: "Commercial Low Rise" },
                { title: "Commercial High Rise" },
                { title: "Industrial" }
            ];

            /*console.log("col: " + col[0].title);

            console.log("dataset: " + dataSet);
*/
            $("#table5").DataTable({
                "aaData": dataSet,
                "aoColumnDefs": [{
                    "aTargets": [1, 2, 3, 4],
                    "sClass": "aligner",
                }],
                aLengthMenu: [
                    [5],
                    [5]
                ],
            });
            chartDispPage5(dataSetc);
        }
    });
}

function chartDispPage5(dataSet) {
    var ctx = document.getElementById('bar-chart5').getContext('2d');
    console.log
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Residential Low Rise", "Residential High Rise", "Commercial Low Rise", "Commercial High Rise", "Industrial", "Engineering"],
            datasets: [{
                label: '1 in 200 Loss',
                backgroundColor: ["#2980b9", "#16a085", "#0abde3", "#33FFBD", "#DBFF33", "#99ff66"],
                data: [dataSet[0][2], dataSet[1][2], dataSet[2][2], dataSet[3][2], dataSet[4][2], dataSet[5][2]],
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true,
                    barThickness: 50,

                }],
                yAxes: [{
                    stacked: true,


                }]
            }
        }
    });

}







//All div tags acquired
var div1 = document.getElementById('pg1');
var div2 = document.getElementById('pg2');
var div3 = document.getElementById('pg3');
var div4 = document.getElementById('pg4');
var div5 = document.getElementById('pg5');

//All pagination li a acquired
var pagin1 = document.getElementById('pagin1');
var pagin2 = document.getElementById('pagin2');
var pagin3 = document.getElementById('pagin3');
var pagin4 = document.getElementById('pagin4');
var pagin5 = document.getElementById('pagin5');

//Page content replace
function content_replace() {
    //Situations
    pagin1.addEventListener('click', function() {
        initFlag = 1;
        selectPage("pagin1");
        div1.style.display = 'block';
        div2.style.display = 'none';
        div3.style.display = 'none';
        div4.style.display = 'none';
        div5.style.display = 'none';
        document.getElementById("multiLine").style.display = "none";
    })
    pagin2.addEventListener('click', function() {
        /*console.log(`enter page 2: ${page2Flag++}`);
        console.log("enter page 2: "+page2Flag++);*/
        initFlag = 1;
        selectPage("pagin2");
        div2.style.display = 'block';
        div1.style.display = 'none';
        div3.style.display = 'none';
        div4.style.display = 'none';
        div5.style.display = 'none';
        chartDispPage2();
    })
    pagin3.addEventListener('click', function() {
        initFlag = 1;
        selectPage("pagin3");
        div3.style.display = 'block';
        div1.style.display = 'none';
        div2.style.display = 'none';
        div4.style.display = 'none';
        div5.style.display = 'none';
        document.getElementById("multiLine").style.display = "none";
    })
    pagin4.addEventListener('click', function() {
        initFlag = 1;
        selectPage("pagin4");
        div4.style.display = 'block';
        div1.style.display = 'none';
        div2.style.display = 'none';
        div3.style.display = 'none';
        div5.style.display = 'none';
        document.getElementById("multiLine").style.display = "none";
    })
    pagin5.addEventListener('click', function() {
        initFlag = 1;
        selectPage("pagin5");
        div5.style.display = 'block';
        div1.style.display = 'none';
        div2.style.display = 'none';
        div3.style.display = 'none';
        div4.style.display = 'none';
        document.getElementById("multiLine").style.display = "none";
    })
}

function commaSeparateNumber(data) {
    alert("IN");
    return 3;
}



function selectPage(page) {
    /*console.log("prage:"+page);*/
    if (initFlag != 0) {
        for (i = 1; i < 6; i++) {
            var t = "pagin" + eval(i);
            /*console.log("page Number: "+t);*/
            if (t != page)
                document.getElementById(t).classList.remove("select");
        }
        document.getElementById(page).classList.add("select");
    }
}


function show() {
    console.log("in show");
    var b = document.getElementById('pagin2');
    var c = document.getElementById('pagin3');
    var d = document.getElementById('pagin4');
    var e = document.getElementById('pagin5');
    b.style.display = 'block';
    console.log("b.style.display: " + b.style.display);
    c.style.display = 'block';
    console.log("c.style.display: " + c.style.display);
    d.style.display = 'block';
    console.log("d.style.display: " + d.style.display);
    e.style.display = 'block';
    console.log("e.style.display: " + e.style.display);
    generate();


}

function generate() {
    console.log("in generatge");
    kendo.drawing.drawDOM("#pdf", {
            paperSize: "A1",
            margin: { top: "1cm", bottom: "1cm" },
            scale: 0.8,
            height:500
        })
        .then(function(group) {
            kendo.drawing.pdf.saveAs(group, "results.pdf")
            hide();
        });

}

function hide() {
    console.log("hide");
    var b = document.getElementById('pagin2');
    var c = document.getElementById('pagin3');
    var d = document.getElementById('pagin4');
    var e = document.getElementById('pagin5');
    b.style.display = 'none';
    c.style.display = 'none';
    d.style.display = 'none';
    e.style.display = 'none';
}

function show1() {
    console.log("its in show1");
}
