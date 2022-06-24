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
var dataset = Array();
var col;
var resultOption;

function loadThis() {
    console.log("Loading");
    initLoadPort = 0;
    document.getElementById("savePort").disabled = true;
    countryName = document.getElementById("country").innerHTML;
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
        if (result.value != "") {
            console.log("result.value: " + result.value);
            const answers = JSON.stringify(result.value)
            t = result.value;
            /*fileList.push(t);*/
            console.log("\n\nfielList: " + fileList);
            var param = "";
            for (i = 0; i < fileList.length; i++)
                param = param + "|" + fileList[i];
            console.log("param: " + param + "t: " + t);

            $.post("saveCheckPortfolio.php", {
                param: param,
                portfolio: t
            }, function(data, status) {
                console.log("data: " + data);
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
//        console.log("Portfolio data: " + data);
        dataset.length = 0;
        portName.length = 0;
        portfolioDate.length = 0;
        portStatus.length = 0;
        //alert(portName);
        for (j = 0; j < data.split("]")[0].split(",").length; j++) {
            if (j == 0)
                portName.push(data.split("]")[0].split("]")[0].split(",")[j].substring(2).slice(0, -1));
            else
                portName.push(data.split("]")[0].split("]")[0].split(",")[j].substring(1).slice(0, -1));
        }
//        console.log("portName: " + portName);

        for (j = 0; j < data.split("]")[1].split(",").length; j++) {
            if (j == 0)
                portfolioDate.push(data.split("]")[1].split("]")[0].split(",")[j].substring(2).slice(0, -1));
            else
                portfolioDate.push(data.split("]")[1].split("]")[0].split(",")[j].substring(1).slice(0, -1));
        }
//        console.log("portfolioDate: " + portfolioDate);

        for (j = 0; j < data.split("]")[2].split(",").length; j++) {
            if (j == 0)
                portStatus.push(data.split("]")[2].split("]")[0].split(",")[j].substring(2).slice(0, -1));
            else
                portStatus.push(data.split("]")[2].split("]")[0].split(",")[j].substring(1).slice(0, -1));
        }
//        console.log("portfolioStatus: " + portStatus);

        /*portName = data.split("[")[1].split(",");
        for(i = 0; i < portName.length; i++)
        {            
            if(i == portName.length-1)
                portName[i] = portName[i].substring(1, portName[i].length-6);
            else
                portName[i] = portName[i].substring(1, portName[i].length-5);
            console.log("portName[i]: "+portName[i]);
        }
        
        console.log("portName: "+portName.length);
        var createDate = data.split("[")[2].split(",");        
        for(i = 0; i < createDate.length; i++)
        {            
            createDate[i] = createDate[i].substring(1, createDate[i].length-2);
        }
        createDate.pop();
        createDate.pop();

        console.log("date: "+createDate);*/

        /*var dataset = Array();        
        for(i = 0; i < t.length; i++)
        {
            dataset[i] = new Array(2);
            dataset[i][0] = t[i];
        }
        console.log("dataset: "+dataset);

        var col = [{ title: "Portfolio Name" }];
        console.log("col: "+col[0].title);
        console.log("t: "+t);
        tab = $('#fileTable').DataTable({
            fixedHeader: true,
            data: dataset,
            columns: col,
            lengthMenu: [[10, 25, -1], [10, 25, "All"]],
            dom: 'lBfrtip<"actions">'
        });*/

        disPortfolio(portName, portfolioDate, portStatus);
    });
}

function disPortfolio(t, date, status) {
    //alert("CREATE");
    console.log("date: " + date.length);
    if (initLoadPort != 0) {
        console.log("initLoadPort: " + initLoadPort);
        tab.destroy();
    }

    for (i = 0; i < t.length; i++) {
        dataset[i] = new Array(2);
        dataset[i][0] = t[i];
        dataset[i][1] = date[i];
        dataset[i][2] = status[i];
        dataset[i][3] = "";
    }
//    console.log("dataset: " + dataset);

    col = [{ title: "Portfolio Name" },
        { title: "Created on" },
        {
            title: "status",

        },
//        { title: "Options" }
        /* {
             title: "Operations",
             data: null,
             className: "center",
             defaultContent: '<button id = "run" onclick = "setTimeout(run, 100)">Run</button>'
         },*/

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
                'createdCell': function(td, cellData, rowData, row, col) {
                    console.log("cellData in managePort1.js: "+cellData);
                    if (cellData == "DONE") {
                        td.id = "done";
                        $(td).html("<button id='portView' onclick = 'setTimeout(resultsView, 100)'>VIEW</button>");
                    }
                    if (cellData == "RUNNING") {
                        td.id = "running";
                        $(td).html("<button id='portCount' onclick = 'setTimeout(filesCount, 100)'>CHECK STATUS</button>");
                    }
                    if (cellData == "") {
                        td.id = "none";
                        $(td).html("<button id='portRun' onclick = 'setTimeout(run, 100)'>RUN</button>");
                    }
                }
            },
            /*{
                'targets': [3],
                'createdCell': function(td, cellData, rowData, row, col) {
                    if (cellData == "") {
                        td.id = "options";
                        $(td).html("<select name='resultsOption' id='resultsOption'><option value=' '>Choose a option</option><option value='quake'>Quake</option><option value='flood'>Flood</option><option value='cyclone'>Cyclone</option>");
                    }
                }
            }*/
        ],
        dom: 'lBfrtip<"actions">'
    });


    $('#fileTable tbody').on('click', 'button', function() {
        var data = tab.row($(this).parents('tr')).data();
        console.log("In getting row")
        chosenPortfolio = data[0];
        localStorage.setItem("Portfolio", chosenPortfolio);
        //var rowData = tab.row(0).data();
        //alert(rowData)
    });
    $('select').on('change', function() {
        alert(this.value);
        resultOption = this.value;
    });
    
    if (initLoadPort == 0);
    initLoadPort = 1;
}

function resultsView() {
    //alert(chosenPortfolio);
//    document.getElementById("peril").innerHTML = chosenPeril;
    localStorage.setItem("peril", chosenPeril);
    window.location.href = "resultsNew1.php";
}

function run() {
    //alert(chosenPortfolio);
    var pNames = new Array();
    var size;

    $.ajax({
        type: 'get',
        url: 'select_program.php',
        success: function(data) {
            console.log("data: " + data);
            if(data == "")
                alert("Please add Reinsurance Program");
            pNames = JSON.parse(data);
            size = pNames.length;
            pNames.unshift("Select a Reinsurance");
            (async() => {
                const {value: peril} = await Swal.fire({
                    title: 'Choose a peril',
                    input: 'radio',
                    inputOptions:{
                        flood:'Flood',
                        quake:'Quake'
                    },
                    showCancelButton: true,
                    inputValidator:(value) =>{
                        return new Promise((resolve) =>{
                            if(value === 'quake'){
                                resolve()
                            }else{
                                resolve()
                            }
                        })
                    } 
                })
                chosenPeril = peril;
                console.log("chosenPeril: "+chosenPeril);
//                localStorage.setItem("peril", chosenPeril);
                localStorage.setItem("peril", chosenPeril);
                if(peril === 'quake'){                    
                    Swal.fire(`You have chosen: ${peril}`)
                
                    const reinOptions = new Promise((resolve) =>{
                        setTimeout(() => {
                            resolve({ pNames })
                        }, 500)
                    })

                    const{value: reinsurance} = await Swal.fire({
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
                                alert("Will run the script: "+peril+ "progrAM: "+programSelected);
                                status(chosenPortfolio, "RUNNING", peril);
                                runTheResults(chosenPortfolio, programSelected, peril);
                            }
                        }
                    })
                    /*if(reinsurance){
                        Swal.fire({html: `You selected" ${reinsurance}`})
                    }*/
                }
                else{
                    alert("Will take 3hours to generate the results");
                    status(chosenPortfolio, "RUNNING");
                    runTheResults(chosenPortfolio, "", peril);
//                    runTheResults(chosenPortfolio, programSelected);
                }
            })()
            
            /*(async() => {

                const { value: formValues } = await Swal.fire({
                    title: 'Select a Program',
                    input: 'select',
                    inputOptions: pNames,
                    inputPlaceholder: 'Select from dropdown',
                    showCancelButton: true,

                }).then(function(result) {
                    if (result.value == undefined) {
                        alert("Please add a reinsurance program");
                    } else {
                        console.log("countryName: "+countryName);
                        programSelected = pNames[result.value];
                        var time = "3hrs";
                        if (countryName == "Morocco")
                            time = "1hr 30mins";
                        else if (countryName == "SaudiArabia")
                            time = "15 mins";
                        else if (countryName == "Algeria")
                            time = "7 mins";
                        else
                            time = "3 hrs";
                        
                        const { value: formValues } = await Swal.fire({
                            title: 'Select a Program',
                            input: 'select',
                            inputOptions: {Flood, Quake},
                            inputPlaceholder: 'Select from dropdown',
                            showCancelButton: true,

                        }).then(function(result) {
                            console.log("Results of 2nd pop up");
                            
                            alert("This will take " + time + " to run, then will be automaticcally redirected to the results page.");
                            status(chosenPortfolio, "RUNNING");
                            runTheResults(chosenPortfolio, programSelected);
                        })
                    }
                })
            })()*/
        }
    });
    /*var t = chosenPortfolio; 
    console.log("t: "+t);
    
    $.post("runRscript.php",{
        portfolio: chosenPortfolio
    },function(data, status){
        console.log("data: "+data);
        if(data == 0)
        {
            console.log("File run successfully");
            
            Swal.fire({
              title: 'Portflio run successfull',
              text: "Wish to see results",
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#498dce',
              confirmButtonText: 'Yes',
              cancelButtonText: 'No'
            }).then((result) => {
              if (result.value) {
                    window.location.href = "results1.php";
              }
            })
            
        }
        else
            console.log("!file dun sucess");
    });*/
}


function runTheResults(protfolio, reinsurance, peril) {
    console.log("In runTheResults, protfolio: " + protfolio + "reinsurance: " + reinsurance+ " peril: "+peril);

    portfolioName = protfolio;
    //window.location = "resultsNew1.php";
    $.post("runResults1.php", {
        protfolio: protfolio,
        reinsurance: reinsurance,
        peril: peril
    }, function(data, status) {
        console.log("data: " + (data));
        if (data != "") {
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
