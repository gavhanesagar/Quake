var fileName;
var globalVariable = { fileNames: '' };
var globalVariable = { portfolioName: '' };
var globalVariable = { countryName: '' };
var globalVariable = {chosenPeril: ''};
chosenPeril = '';
fileNames = new Array();
portfolioName = '';
countryName = '';
var tab;
var initLoadPort;
var selectedRow = 0;
var portName = Array();
var fullFileName = Array();
var creationDate = Array();
var portfolioDate = Array();
var chosenPortfolio;
var sample;
var portStatus = Array();
var quakeStatus = Array();
var floodStatus = Array();
var dataset = Array();
var col;
var resultOption;
var quakePeril = 1;
var floodPeril = 1;

function loadThis() {
    console.log("Loading");
    initLoadPort = 0;
    document.getElementById("savePort").disabled = true;
    countryName = document.getElementById("country").innerHTML;
    
    $.post("checkPeril.php", {
            country: "countryName"
        },
        function(data, status) {
            console.log("data from checkPeril: "+data);
            if(!data.includes("quake")){
                quakePeril = 0;
            }
            else if(!data.includes("flood")){
                floodPeril = 0;
            }        
    });
           
    
    /*var homeDir = Titanium.Filesystem.getUserDirectory();
    console.log("homeDir: "+homeDir);*/
    
    
    $.ajax({
        url:'/home/satyukt/Projects/1056/catModel/data/Input/'+countryName+'/quake/cat_1_low_rise_residential.csv',
        type:'HEAD',
        error: function()
        {
            console.log("Flood !exist");
        },
        success: function()
        {
            //file exists
            console.log("Flood exist");
        }
    });
    
    
    
    /*var floodFiles = new File("/home/satyukt/Projects/1056/catModel/data/Input/" + countryName + "/flood/commercial.csv");
    console.log("floodFiles: "+floodFiles);
    
    // See if the file exists
    if(floodFiles.exists()){
        console.log("Flood exist");
    }
    else
        console.log("Flood !exist");*/
    
    
//    countryName = "1";
    console.log("countryName: " + countryName);
    $("#savePort").css({ "background": "#c5c5c5", "color": "#e2e2e2", "border": "#e2e2e2" });

    $.post("readTableNew.php", {
            demo: "here"
        },
        function(data, status) {
            console.log("data:" + data);
            for (j = 0; j < data.split("]")[0].split(",").length; j++) {
                if (j == 0)
                    fullFileName.push(data.split("]")[0].split("]")[0].split(",")[j].substring(2).slice(0, -1));
                else
                    fullFileName.push(data.split("]")[0].split("]")[0].split(",")[j].substring(1).slice(0, -1));
            }
            console.log("fullFileName: " + fullFileName);

            for (j = 0; j < data.split("]")[0].split(",").length; j++) {
                if (j == 0)
                    creationDate.push(data.split("]")[1].split("]")[0].split(",")[j].substring(2).slice(0, -1));
                else
                    creationDate.push(data.split("]")[1].split("]")[0].split(",")[j].substring(1).slice(0, -1));
            }
            console.log("creationDate: " + creationDate);

            addParagraphs();
        });
    availPortfolioTable();
}

function addParagraphs() {
    console.log("addParagraphs");
    for (i = 0; i < fullFileName.length; i++) {
        /*t = fileNames[i].split("_")[fileNames[i].split("_").length-1].substr(0,8);
        var fileCreationDate = [t.slice(0, 4), "-", t.slice(4,6), "-", t.slice(6)].join('');*/
        $("#dragBox").append("<p class = 'fetch' draggable='true' onmousedown = 'showDragDetails()' onmouseup='hideDragDetails()' id='dragtarget" + i + "'>" + fullFileName[i].split(".")[0] + " &emsp;&ensp;&ensp;&ensp; " + creationDate[i] + "</p>");
    }
}

function showDragDetails() {
    console.log("in dragDetails()");
    document.getElementById("dragDetails").style.visibility = "visible";
}

function hideDragDetails() {
    console.log("in hideDragDetails()");
    document.getElementById("dragDetails").style.visibility = "hidden";
}

console.log("In script:" + document.getElementById("togSwitch").value);
console.log("value: " + $("#togSwitch").prop("checked"));

$("#togSwitch").change(function() {
    if ($(this).prop("checked") == true) {
        console.log("true");
        document.getElementById("createPort").style.display = "none"
    } else {
        console.log("false");
        document.getElementById("createPort").style.display = "block";
    }
});

$("#clear").on("click", function() {
    console.log("CLicked");
    $("#resizable").empty();
});

$("#savePort").on("click", function() {
    var portfolioName;
    console.log("Clicked");


    var fileList = new Array();
    var t = $("#createPort > div")[1].childElementCount;
    var x = document.getElementById("box2").querySelectorAll(".fetch");
    console.log("fetch: " + x[0].innerHTML);

    for (i = 0; i < x.length; i++)
        fileList.push(x[i].innerHTML);
    console.log("fileLsit: " + fileList[0].split(" ")[0]);
    for (i = 0; i < fileList.length; i++) {
        console.log("reName: " + fileList[i].replace(/\s/g, '_'));
        fileList[i] = fileList[i].split(" ")[0];
    }
    console.log("fileList: " + fileList);

    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
    }).queue([{
        title: 'Portfolio Name',
        text: 'Provide a name for the created portfolio'
    }]).then((result) => {
        if (result.value != undefined || result.value != "") {
            console.log("result.value: " + result.value);
            const answers = JSON.stringify(result.value)
            t = result.value;
            /*fileList.push(t);*/
            console.log("+\n\nfielList: " + fileList);
            var param = "";
            for (i = 0; i < fileList.length; i++)
                param = param + "|" + fileList[i];
            console.log("param: " + param + "t: " + t);

            $.post("saveCheckPortfolio1.php", {
                param: param,
                portfolio: t
            }, function(data, status) {
                console.log("data from SaveCheckPortfolio : " + data);
                if (data == 0) {
                    Swal.fire({
                        type: 'success',
                        title: 'Successfully saved!',
                        html: `<pre><code>Protfolio name: <i>` + result.value + `</i></code></pre>`,
                        confirmButtonText: 'Okay!'
                    });
                    availPortfolioTable();
                } else {
                    Swal.fire({
                        type: 'warning',
                        title: 'Portfolio name already exist',
                        confirmButtonText: 'Okay!'
                    });
                }
            });
        } else {
            Swal.fire({
                type: 'warning',
                title: 'Invalid Portfolio name',
                html: `Invalid Portfolio name`,
                confirmButtonText: 'Okay!'
            });
        }
    })
});


function createDoc(docName) {
    var fileLsit = new Array();
    var t = $("#createPort > div")[1].childElementCount;
    var x = document.getElementById("box2").querySelectorAll(".fetch");
    console.log("fetch: " + x[0].innerHTML);

    for (i = 0; i < x.length; i++)
        fileLsit.push(x[i].innerHTML);
    console.log("fileLsit: " + fileLsit);
    for (i = 0; i < fileLsit.length; i++) {
        console.log("reName: " + fileLsit[i].replace(/\s/g, '_'));
    }



    $.post("writeFile.php", {
        demo: docName,
        fileList: fileLsit
    }, function(data, status) {
        console.log("data: " + data);
        availPortfolioTable();
    });
}


function availPortfolioTable() {
    console.log("In availPortfolioTable");
    var t = new Array();
    $.post("getPortfolios.php", {
        demo: 'Here',
    }, function(data, status) {
        console.log("data from getPortolio:" +data);
//        console.log("Portfolio data: " + data.split("]")[2].split("]")[0].split(",")[1].substring(2).slice(0,-1)+"\n\n");
        dataset.length = 0;
        portName.length = 0;
        portfolioDate.length = 0;
        portStatus.length = 0;
        quakeStatus.length = 0;
        floodStatus.length = 0;
        
        for (j = 0; j < data.split("]")[0].split(",").length; j++) {
            if (j == 0){
                portName.push(data.split("]")[0].split("]")[0].split(",")[j].substring(2).slice(0, -1));
                console.log(portName);
            }
            else
                portName.push(data.split("]")[0].split("]")[0].split(",")[j].substring(1).slice(0, -1));
        }

        for (j = 0; j < data.split("]")[1].split(",").length; j++) {
            if (j == 0){
                portfolioDate.push(data.split("]")[1].split("]")[0].split(",")[j].substring(2).slice(0, -1));
                console.log(portfolioDate)
            }
            else
                portfolioDate.push(data.split("]")[1].split("]")[0].split(",")[j].substring(1).slice(0, -1));
        }

        for (j = 0; j < data.split("]")[2].split(",").length; j++) {
            if (j == 0){
                quakeStatus.push(data.split("]")[2].split("]")[0].split(",")[j].substring(2).slice(0, -1));
                console.log("quake",quakeStatus)
            }
            else
                quakeStatus.push(data.split("]")[2].split("]")[0].split(",")[j].substring(1).slice(0, -1));
        }
        
        for (j = 0; j < data.split("]")[3].split(",").length; j++) {
            if (j == 0){
                floodStatus.push(data.split("]")[3].split("]")[0].split(",")[j].substring(2).slice(0, -1));
                console.log(floodStatus)
            }
            else
                floodStatus.push(data.split("]")[3].split("]")[0].split(",")[j].substring(1).slice(0, -1));
        }
        
//        disPortfolio(portName, portfolioDate, portStatus, quakeStatus, floodStatus);
        disPortfolio(portName, portfolioDate, quakeStatus, floodStatus);
        
    });
}

function disPortfolio(t, date, quakeStatus, floodStatus) {
    console.log("date in disPort: " + t);
    
    if (initLoadPort != 0) {
        console.log("initLoadPort: " + initLoadPort);
        tab.destroy();
    }

    for (i = 0; i < t.length; i++) {
        console.log(i)
        dataset[i] = new Array(4);
        dataset[i][0] = t[i];
        dataset[i][1] = date[i];
        console.log("dataset[i][1]: "+dataset[i][1]);
        dataset[i][2] = quakeStatus[i];
        console.log("dataset[i][2]: "+dataset[i][2]);
        dataset[i][3] = floodStatus[i];
//        dataset[i][4] = "";
        
    }
    console.log("dataset: " + dataset);

    col = [
            { title: "Portfolio Name" },
            { title: "Created on" },
            { title: "Quake" },
            { title: "Flood" },
        ];
    var i = 0;
    console.log("col: " + col[0].title);
//    console.log("t: " + t);
    //alert(dataset);
    tab = $('#fileTable').DataTable({
        fixedHeader: true,
        data: dataset,
        columns: col,
        lengthMenu: [
            [10, 25, -1],
            [10, 25, "All"]
        ],
        "columnDefs": [{
                'targets': [2],
                'createdCell': function(td, cellData,  rowData, row, col) {
//                    console.log("cellData in managePort1.js: "+cellData);
                    console.log("Here in row 2,  td: "+td+ " cellDAta: "+cellData+" rowData: "+rowData+ " row: "+row+ " col: "+col);
                    if (cellData == "3") {
                        console.log("cell Data for 2: "+cellData);
                        td.id = "done";
                        $(td).html("<button id='quakeView' onclick = 'viewResults(\"quake\")'>VIEW</button>");
                    }
                    if (cellData == "1") {
                        /*window.location.reload(true);
                        this.location.reload();*/
                        td.id = "running";
                        $(td).html("<p>QUEUE</p>");
//                        $(td).html("<button id='quakeCount' >Queue</button>");
//                        document.getElementById("portCount1").disabled = true;
                    }
                    if (cellData == "2") {
                        td.id = "running";
                        $(td).html("<p>RUNNING</p>");
//                        document.getElementById("portCount").disabled = true; 
                        
                    }
                    if (cellData == "0") {
                        td.id = "none";
                        if(quakePeril != 0)
                            $(td).html("<button id='quakeRun' onclick = 'run(\"quake\")'>RUN</button>");
                        else
                            $(td).html("<button id='quakeRun' onclick = 'run(\"quake\")' disabled>Damage file not available </button>");
//                        document.getElementById("portRun").disabled = false;
                    }
                    if (cellData == "-1") {
                        td.id = "none";
                        $(td).html("<p>ERROR!</p>");
//                        document.getElementById("portRun").disabled = false;
                    }
                },
            },
            {
                'targets': [3],
                'createdCell': function(td, cellData, rowData, row, col) {
                //                    console.log("cellData in managePort1.js: "+cellData);
                    console.log("Col 3, Here td: "+td+ " cellDAta: "+cellData+" rowData: "+rowData+ " row: "+row+ " col: "+col);
                    if (cellData == "3") {
                        td.id = "done";
                        $(td).html("<button id='portView' onclick = 'viewResults(\"flood\")'>VIEW</button>");
                //                        document.getElementById("portView").disabled = false;
                    }
                    if (cellData == "1") {
                        /*window.location.reload(true);
                        this.location.reload();*/
                        td.id = "running";
                        $(td).html("<p>QUEUE</p>");
//                        $(td).html("<p>Running");
                //                        document.getElementById("portCount1").disabled = true;

                    }
                    if (cellData == "2") {
                        td.id = "running";
                        $(td).html("<p>RUNNING</p>");
                //                        document.getElementById("portCount").disabled = true; 

                    }
                    if (cellData == "0") {
                        td.id = "none";
                        if(floodPeril != 0)
                            $(td).html("<button id='portRun' onclick = 'run(\"flood\")'>RUN</button>");
                        else
                            $(td).html("<button id='portRun' onclick = 'run(\"flood\")' disabled>Not Available</button>");
                //                        document.getElementById("portRun").disabled = false;
                    }
                    if (cellData == "-1") {
                        td.id = "none";
                        $(td).html("<p>ERROR!</p>");
//                        document.getElementById("portRun").disabled = false;
                    }
                }
            },
        ],
        "orderable": true,
        dom: 'lBfrtip<"actions">'
    });

    
    $('#fileTable tbody').on('click', 'td', function() {
//        alert("In td click");   
        var data = tab.row($(this).parents('tr')).data();
        var id = $(this).attr('id');
//        console.log("rpw: "+id)
        
//       alert(data[Object.keys(data)[0]]+' s phone: '+data[Object.keys(data)[1]]);
        
        var val = $(this).closest('tr').find('td:eq(0)').text(); // amend the index as needed
//        console.log("ROW val: "+val);
        
         chosenPortfolio = val;
//        console.log("Col clicked: "+tab.cell( this ).index().columnVisible+ " \n chosenPortfolio: "+chosenPortfolio);    
    
        localStorage.setItem("Portfolio", chosenPortfolio);
        
    });
    $('select').on('change', function() {
//        alert(this.value);
        resultOption = this.value;
    });
    
    if (initLoadPort == 0);
        initLoadPort = 1;  
    
    
    
    
    
    
   /* var table = $('#fileTable').DataTable();

    $.post("checkPeril.php", {
            country: "countryName"
        },
        function(data, status) {
            console.log("data from checkPeril: "+data.includes("qua"));
            if(data.includes("quake")){
                console.log("In quake Run")
                document.getElementById("quakeRun").disabled = false;
                console.log("quake disabled? "+document.getElementById("quakeRun").disabled);
                table.buttons( '#quakeRun' ).disable();
            }
            else if(data.includes("flood")){
                document.getElementById("portRun").disabled = false;
                table.buttons( '#portRun' ).disable();
            }        
    });*/
    
    
    
}

function runResults(peril){
    console.log("Chosen Pril")
    chosenPeril = peril;
    if(chooseRes == 'quake'){
        
    }
}

function viewResults(peril){
    console.log("in quake res: "+peril);
    
//    window.location.href = "resultsNew1.php";
//    chosenPeril = "flood";
    chosenPeril = peril ;
    localStorage.setItem("peril", chosenPeril);
    
    if(chosenPeril == "flood")
        window.location.href = "floodResults.php";
    else
        window.location.href = "resultsNew1.php";
}

function refresh() {
 location.reload();
}

function resultsView() {
//    alert(chosenPortfolio);
//    document.getElementById("peril").innerHTML = chosenPeril;
    chosenPeril = "flood";
    localStorage.setItem("peril", chosenPeril);
    if(chosenPeril == "flood")
        window.location.href = "floodResults.php";
    else
        window.location.href = "resultsNew1.php";
}

function run(peril) {
//    alert("In run: "+peril);
    portChosen = "";
    var val;
    
     $('#fileTable tbody').on('click', 'td', function() {
        //alert("In td click");   
//        var data = tab.row($(this).parents('tr')).data();
        var id = $(this).attr('id');
        console.log("rpw: "+id)
        
        //alert(data[Object.keys(data)[0]]+' s phone: '+data[Object.keys(data)[1]]);
        
        val = $(this).closest('tr').find('td:eq(0)').text(); // amend the index as needed
    
        localStorage.setItem("Portfolio", val);
         chosenPortfolio = val;
        console.log("In run: "+peril+ ", chosenPortfolio: "+val+ ", portChosen: "+portChosen);
        var pNames = new Array();
        var size;
        var programSelected="";   
        chosenPeril = peril;
	console.log("Peril in run(): "+ peril);
        if(peril == 'quake'){
                $.ajax({
                    type: 'get',
                    url: 'select_program.php',
                    success: function(data) {
                        console.log("datais: " + data);
                        if(data == "")
                            alert("Please add Reinsurance Program");
                        pNames = JSON.parse(data);
                        size = pNames.length;
                        pNames.unshift("Select a Reinsurance");

                        Swal.fire(`You have chosen: ${peril}`)

                    const reinOptions = new Promise((resolve) =>{
                        setTimeout(() => {
                            resolve({ pNames })
                        }, 500)
                    })
                    Swal.fire({
                        title: 'Reinsurance programme for Quake',
                        input: 'select',
                        inputOptions: pNames,
                        inputValidator: (value) =>{
                            console.log("value in rein: "+value);
                            if(pNames[value] === 'Select a Reinsurance'){
                                return 'Please select a program!'
                            }
                            else{
                                programSelected = pNames[value];
                                console.log("chosenPortfolio:" +chosenPortfolio+ ", programSelected: "+ programSelected +", peril: "+peril);
                                location.reload(true); 
                                window.location.reload();
                                runTheResults(chosenPortfolio, programSelected, chosenPeril);
                            }
                        }
                    })
                }
            });
        }
        else{
    //        if(!alert("Will take 3hours to generate the results")){window.location.reload();}
    //        status(chosenPortfolio, chosenPeril);
    //        location.reload(true);
            location.reload(true); 
            window.location.reload();
            console.log("In run(), else: chosenPortfolio:" +chosenPortfolio+ ", programSelected: "+ programSelected +", peril: "+peril);
            runTheResults(chosenPortfolio, programSelected, chosenPeril);
        }
         
    });
}

 
function runTheResults(protfolio, reinsurance, peril) {
    console.log("In runTheResults, protfolio: " + protfolio + "reinsurance: " + reinsurance+ " peril: "+peril);
//    document.getElementById("portRun").innerHTML = "Queue";
    
    portfolioName = protfolio;
    //window.location = "resultsNew1.php";
    $.post("runResultsNew.php", {
        protfolio: protfolio,
        reinsurance: reinsurance,
        peril: peril
    }, function(data, status) {
        console.log("datais: " + (data));
        if (data == 0) {
            console.log("portfolioName in runTheResults: "+portfolioName);
            chosenPortfolio = portfolioName;
            filesCount();
            window.location = "resultsNew1.php";
        }
    });

}


/* Events fired on the drag target */
document.addEventListener("dragstart", function(event) {
    // The dataTransfer.setData() method sets the data type and the value of the dragged data
    event.dataTransfer.setData("Text", event.target.id);

    // Output some text when starting to drag the p element
    /*document.getElementById("demo").innerHTML = "Drop to the next box.";*/

    // Change the opacity of the draggable element
    event.target.style.opacity = "0.4";
});

// While dragging the p element, change the color of the output text
document.addEventListener("drag", function(event) {
    document.getElementById("demo").style.color = "red";
});

// Output some text when finished dragging the p element and reset the opacity
document.addEventListener("dragend", function(event) {
    /*document.getElementById("demo").innerHTML = "Finished dragging.";*/

    if ($('#resizable').is(':empty')) {
        console.log("Is empty, will disable");
        document.getElementById("savePort").disabled = true;
        $("#savePort").css({ "background": "#c5c5c5", "color": "#e2e2e2", "border": "#e2e2e2" });
    } else {
        console.log("Is !empty, will !disable");
        document.getElementById("savePort").disabled = false;
        $("#savePort").css({ "background": "white", "color": "#4CAF50", "border": "2px solid #4CAF50" });
        $("#savePort").hover(function() {
            $(this).css({ "background-color": "#4CAF50", "color": "whitesmoke" });
        });
    }
    event.target.style.opacity = "1";
});

/* Events fired on the drop target */

// When the draggable p element enters the droptarget, change the DIVS's border style
document.addEventListener("dragenter", function(event) {
    if (event.target.className == "droptarget") {
        event.target.style.border = "3px dotted red";
    }
});

// By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

// When the draggable p element leaves the droptarget, reset the DIVS's border style
document.addEventListener("dragleave", function(event) {
    if (event.target.className == "droptarget") {
        event.target.style.border = "";
    }
});

/* On drop - Prevent the browser default handling of the data (default is open as link on drop)
   Reset the color of the output text and DIV's border color
   Get the dragged data with the dataTransfer.getData() method
   The dragged data is the id of the dragged element ("drag1")
   Append the dragged element into the drop element
*/
document.addEventListener("drop", function(event) {
    event.preventDefault();
    if (event.target.className == "droptarget") {
        document.getElementById("demo").style.color = "";
        event.target.style.border = "";
        var data = event.dataTransfer.getData("Text");
        event.target.appendChild(document.getElementById(data));
    }
});

function status(portName, message) {

    console.log("Peril in status: "+chosenPeril+ "message: "+message);
    
    $.ajax({
        method: "post",
        url: "updateStatus.php",
        data: { message: message, port: portName, peril: chosenPeril},
        success: function(data) {
            console.log("data afer updateStatus: "+data);
            tab.destroy();
            initLoadPort = 0;
            availPortfolioTable();
        }
    });
}

function filesCount() {
    $.ajax({
        type: 'post',
        url: 'countFiles.php',
        data: { portfolio: chosenPortfolio, peril: chosenPeril},
        success: function(data) {
            //alert(data);
            if (data >= 14) {
                status(chosenPortfolio, "DONE");
                alert("DONE");
                resultsView();
            } else {
                //alert(data + "files done out of 17");
                let timerInterval
                Swal.fire({
                    title: 'STATUS',
                    html: data + "files computed in your portfolio " + chosenPortfolio,
                    timer: 3000,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                            const content = Swal.getContent()
                            if (content) {
                                const b = content.querySelector('b')
                                if (b) {
                                    b.textContent = Swal.getTimerLeft()
                                }
                            }
                        }, 100)
                    },
                    onClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                    }
                })

            }
        }
    });
}
