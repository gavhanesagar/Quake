var dataset = Array();
var portName = Array();
var portStatus = Array();
var portfolioDate = Array();
var quakeStatus = Array();
var floodStatus = Array();
var initLoadPort;
var tab;
var quakePeril = 1;
var floodPeril = 1;
var chosenCountry;

// Section variables
const countryCards = document.querySelector("#CountryList");
const countrySearchVal = document.getElementById("countrySearch");

//let fileBtn = document.getElementById("fileBtn");
let fileBtn = document.getElementById("fileToUpload1");
let templateDownload = document.getElementById("templateDownload");

let countryCardHtml = ``;
let countries = [];

// Section error variables

// apiKey = document.getElementById("apiKey").innerHTML;
let UserID = document.getElementById("UserID").innerHTML;
let userName = document.getElementById("Username").innerHTML;

// Welcome user message
document.getElementById("second_navbar").innerHTML +=
  "<a id='viewName' class='nav-link float-md-start' href='#' style='font-size: 3vh;color: #333333;text-decoration: none;text-align: center; display: flex; justify-content: center;'>Welcome,&nbsp;<span style='color: #1E84BF;text-decoration: none;text-align: center; font-weight: bolder;'>" +
  userName +
  "</span></a>";

// Country list left panel
function countryDetails() {
  countryCardHtml = ``;
  fetch("countries.php", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      for (let key in result) {
        countries.push(result[key]);
        countryCardHtml =
          countryCardHtml +
          `
          <div class="card" id="country-card" onclick="display('${result[key]}', this)">
          <div class="row g-0">

            </div>
            <div class="row g-1">
              <div class="col-sm-12">
                <div class="container-fluid"> 
                  <p class="card-title">${result[key]}</p>
                </div>                         
              </div>
            </div>
          </div>`;
      }
      countryCards.innerHTML = countryCardHtml;
    })
    .catch((e) => {
      console.log(
        "Country list cannot be loaded at this time. Please try again later.",
        e
      );
    });
}
// Loads Country left panel
countryDetails();

// Show data of clicked country
function display(country, current) {
    
  document.getElementById("datacontenttables").setAttribute("hidden", true);
  // Sidebar button active
  let countryCards = document.querySelectorAll("#country-card");
  for (let i = 0; i < countryCards.length; i++) {
    countryCards[i].classList.remove("current");
  }
  current.classList.add("current");

  // Scroll to top on country click
  document.getElementById("alldata").scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  // Enable import csv and export template buttons
  fileToUpload.disabled = false;
  templateDownload.disabled = false;

  // Show country polygon
  getPolygon(country);

  // Show all datasets
  getDatasets(country);
  loadThis(chosenCountry);

  getinsurancesets(country);

}

// Country boundary and details polygon on map
function getPolygon(country = "") {
    console.log("Cuntry: "+country);
    chosenCountry = country;
    
    $.post("setSession.php", {
            country: chosenCountry
        },
        function(data, status) {
            console.log("data from checkPeril: "+data);
    });
//    fileToUpload1.disabled = false;
    document.getElementById("setCountry").href = "/quake/quakeModelManasa/resources/data/templates/"+chosenCountry+"Template.csv";
    console.log("country template: "+document.getElementById("setCountry").href);
    
     
  // Remove previous instance of map
  if (document.getElementById("map").innerHTML !== "") {
    document.getElementById("map").innerHTML = "";
  }

  let name = document.getElementById("Country-Name");
  if (country !== "") {
    name.innerText = country;
  }
  // create osm layer
  var raster = new ol.layer.Tile({
    source: new ol.source.OSM(),
    projection: "EPSG:3857",
  });

  // vector layer
  var vector = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: "https://raw.githubusercontent.com/openlayers/ol3/6838fdd4c94fe80f1a3c98ca92f84cf1454e232a/examples/data/geojson/countries.geojson",
    }),
    style: function (feature, res) {
      if (feature.get("name") === country) {
        return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: "#1e84bf",
            width: 3,
          }),
        });
      }
    },
  });

  // create first map
  var map1 = new ol.Map({
    target: "map",
    layers: [raster, vector],
    view: new ol.View({
      center: ol.proj.transform([0, 0], "EPSG:4326", "EPSG:3857"),
      zoom: 2,
    }),
  });
}

// Load default map
getPolygon();

// Country search bar
countrySearchVal.addEventListener("keyup", function (e) {
  let searchStr = e.target.value;
  let filtered = countries.filter(function (str) {
    return str.toLowerCase().includes(searchStr.toLowerCase());
  });

  countryCardHtml = ``;
  for (let key in filtered) {
    countryCardHtml =
      countryCardHtml +
      `
          <div class="card" id="country-card" onclick="display('${filtered[key]}', this)">
          <div class="row g-0">
              <div class="col-sm-12 p-3 pe-1" id="farm_image">
              </div>
            </div>
            <div class="row g-1">
              <div class="col-sm-12">
                <div class="container-fluid"> 
                  <p class="card-title">${filtered[key]}</p>
                </div>                         
              </div>
            </div>
          </div>`;
  }
  countryCards.innerHTML = countryCardHtml;
});

// Import csv
/*
fileBtn.addEventListener("click", function () {
    console.log("In onclick");
  // Uploading datasets according to country
  let fileid = document.getElementById("fileid");
  fileid.addEventListener("change", function (e) {
    let file = e.target.files[0];
    let countryName = document.getElementById("Country-Name").innerText;

    const formData = new FormData();
    formData.append("csvFile", file);
    formData.append("countryName", countryName);

    const requestOptions = {
      method: "POST",
      redirect: "follow",
      body: formData,
    };

    fetch("uploadDataSet.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          if (result.message === "File already exists") {
            Swal.fire({
              type: "error",
              title: "File already exists",
            });
          } else if (result.message === "File cannot be uploaded") {
            Swal.fire({
              type: "error",
              title: "File cannot be uploaded",
            });
          }
        } else {
          Swal.fire({
            type: "success",
            title: "File added successfully",
          });
        }
      })
      .catch((e) => {});
  });
});
*/

// get datasets
function getDatasets(country) {
  const formData = new FormData();
  formData.append("countryName", country);
  const requestOptions = {
    method: "POST",
    redirect: "follow",
    body: formData,
  };

  fetch("getDataSet.php", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      $("#dataSetsTable").DataTable({
        data: result,
        columns: [{ title: "File" }, { title: "Uploaded On" }],
        columnDefs: [
          {
            className: "dt-center cell-border",
            targets: "_all",
          },
        ],
        bDestroy: true,
      });

      let tableHtml = ``;
      
      result.forEach((element) => {
        tableHtml += `<p class = 'fetch' id="${element[0]}" draggable="true"   ondragstart="drag(event)">${element[0]}</p>`;
      });
      
      document.getElementById("datasetFiles").innerHTML = tableHtml;
    })
    .catch((e) => {});
    document.getElementById("savePort").disabled = false;
}

function getinsurancesets(country){
  document.getElementById("insurancesetsTable").innerHTML="";
  const tableHead = 
  
    ["Program Name",
    "Ductible Layer1",
    "Max Limit1",
    "Ductible Layer2",
    "Max Limit2",
    "Ductible Layer3",
    "Max Limit3",
    "Ductible Layer4",
   "Max Limit4",
    "Currency",
    "Country",
    "UserID",
    "Date and Time"];
  
  const formData = new FormData();
  formData.append("countryName", country);
  const requestOptions = {
    method: "POST",
    redirect: "follow",
    body: formData,
  };
 fetch("Insurance.php",requestOptions)
 .then((response)=>response.json())
 .then((result)=>{
  $('#insurancesetsTable').DataTable( {
    data: result,
    bDestroy: true,
} );
  // document.getElementById("insurancesetsTable").innerHTML=tableHead + result;
 })
 .catch((e=>{
   console.log(e);
 }))


}




function loadThis(countryName) {
    console.log("Loading");
    initLoadPort = 0;
    document.getElementById("savePort").disabled = true;
//    countryName = chosenCountry;
    
    $.post("checkPeril.php", {
            country: chosenCountry,
            userID: UserID
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

    /*$.post("readTableNew.php", {
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
        });*/
    
    availPortfolioTable();
}




function test(){
    console.log("\n\nIn test\n\n");
    fileList = [];
    console.log("Im test");
    console.log(document.getElementById("port-data-row").innerHTML);
    x = document.getElementById("port-data-row").querySelectorAll(".fetch");
//    console.log("t leng: "+t.length);
    for (i = 0; i < x.length; i++){
//        console.log("val: "+x[i].innerHTML.split(".")[0]);   
        fileList.push(x[i].innerHTML.split(".")[0]);
    }
    console.log("fileLsit: " + fileList);
    
    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
    }).queue([{
        title: 'Portfolio Name',
        text: 'Provide a name for the created portfolio'
    }]).then((result) => {
        if (result.value != undefined || result.value != "") {
            var param = "";
            for (i = 0; i < fileList.length; i++)
                param = param + "|" + fileList[i];
            console.log("param: " + param);
            
            console.log("result.value: " + result.value);
            const answers = JSON.stringify(result.value)
            t = result.value;
            console.log("t: "+t);
            console.log("+\n\nfielList: " + fileList);
            
            
            $.post("saveCheckPortfolio1.php", {
                param: param,
                portfolio: t,
                country: chosenCountry,
                userID : UserID
            }, function(data, status) {
                console.log("data from SaveCheckPortfolio : " + data);
                if (data == 0) {
                    Swal.fire({
                        type: 'success',
                        title: 'Successfully saved!',
                        html: `<pre><code>Protfolio name: <i>` + result.value + `</i></code></pre>`,
                        confirmButtonText: 'Okay!',
                        
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
        availPortfolioTable();
    })   

}


function availPortfolioTable() {
    console.log("In availPortfolioTable");
    var t = new Array();
    $.post("getPortfolios.php", {
        userID: UserID,
        country: chosenCountry
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
//        console.log(i)
        dataset[i] = new Array(4);
        dataset[i][0] = t[i];
        dataset[i][1] = date[i];
//        console.log("\n\n portfolio dataset[i][1]: "+dataset[i][0]);
        dataset[i][2] = quakeStatus[i];
//        console.log("dataset[i][2]: "+dataset[i][2]);
        dataset[i][3] = floodStatus[i];
//        dataset[i][4] = "";
//        console.log("dataset[i][0]: "+dataset);
        
    }
//    console.log("dataset: " + dataset);

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
//                    console.log("Here in row 2,  td: "+td+ " cellDAta: "+cellData+" rowData: "+rowData+ " row: "+row+ " col: "+col);
                    if (cellData == "3") {
//                        console.log("cell Data for 2: "+cellData);
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
                            $(td).html("<button id='quakeRun' disabled>Damage file not available</button>");
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
//                    console.log("Col 3, Here td: "+td+ " cellDAta: "+cellData+" rowData: "+rowData+ " row: "+row+ " col: "+col);
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
        dom: 'lBfrtip<"actions">',
        bDestroy: true,
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
//        alert("In td click");
//        var data = tab.row($(this).parents('tr')).data();
        var id = $(this).attr('id');
        console.log("rpw: "+id)
        
//        alert(data[Object.keys(data)[0]]+' s phone: '+data[Object.keys(data)[1]]);
        
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
//                                location.reload(true); 
//                                window.location.reload();
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
//            location.reload(true); 
//            window.location.reload();
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
//            filesCount();
//            window.location = "resultsNew1.php";
        }
    });
}










// get content of dataset
$("#dataSetsTable tbody").on("click", "tr", function () {
  let rowData = $("#dataSetsTable").DataTable().row(this).data();
  let countryName = document.getElementById("Country-Name").innerText;

  const formData = new FormData();
  formData.append("fileName", rowData[0]);
  formData.append("countryName", countryName);

  const requestOptions = {
    method: "POST",
    redirect: "follow",
    body: formData,
  };
  fetch("getFileContent.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      let resultArray = parseCsv(result);
      let titleArray = [];
      let contentArray = [];
      for (let i = 0; i < resultArray.length; i++) {
        if (i === 0) {
          resultArray[i].forEach((element) => {
            titleArray.push({ title: element });
          });
        } else {
          if (resultArray[i].length !== 0) {
            contentArray.push(resultArray[i]);
          }
        }
      }

      document.getElementById("datacontenttables").removeAttribute("hidden");

      $("#dataContentTable").DataTable({
        data: contentArray,
        columns: titleArray,
        columnDefs: [
          {
            className: "dt-center cell-border",
            targets: "_all",
          },
        ],
        bDestroy: true,
      });
    })
    .catch((e) => {});
});



/*$('#savePort').on('click',function(){
    !$(this).hasClass('ButtonClicked') ? addClass('ButtonClicked') : '';
});


document.addEventListener("dragleave", function(event) {
    console.log("In dragleave");
    if (event.target.className == "port-data-row") {
        event.target.style.border = "";
    }
    document.getElementById("savePort").disabled = false;
});*/


/* On drop - Prevent the browser default handling of the data (default is open as link on drop)
   Reset the color of the output text and DIV's border color
   Get the dragged data with the dataTransfer.getData() method
   The dragged data is the id of the dragged element ("drag1")
   Append the dragged element into the drop element
*/
document.addEventListener("drop", function(event) {
    console.log("In drop");
    event.preventDefault();
    console.log("event.target.className: "+event.target.className);
    if (event.target.className == "datasetFiles row row-2") {
        console.log("In that class");
        /*document.getElementById("demo").style.color = "";
        event.target.style.border = "";
        var data = event.dataTransfer.getData("Text");
        event.target.appendChild(document.getElementById(data));*/
        document.getElementById("savePort").disabled = false;
        $("#savePort").css({ "background": "white", "color": "#4CAF50", "border": "2px solid #4CAF50" });
        $("#savePort").hover(function() {
            $(this).css({ "background-color": "#4CAF50", "color": "whitesmoke" });
        });

        console.log("Is disabled: "+document.getElementById("savePort").disabled);
        
    }
});


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

function submitinsurance(){
  event.preventDefault();
  let insuranceform = document.getElementById("insuranceform").elements;
  let formdata = new FormData();
  formdata.append("deductible_layer1", insuranceform.deductible_layer1.value);
  formdata.append("max_limit_layer1",insuranceform.max_limit_layer1.value);
  formdata.append("deductible_layer2",insuranceform.deductible_layer2.value);
  formdata.append("max_limit_layer2",insuranceform.max_limit_layer2.value);
  formdata.append("deductible_layer3",insuranceform.deductible_layer3.value);
  formdata.append("max_limit_layer3",insuranceform.max_limit_layer3.value);
  formdata.append("deductible_layer4",insuranceform.deductible_layer4.value);
  formdata.append("max_limit_layer4",insuranceform.max_limit_layer4.value)
  formdata.append("programName",insuranceform.programName.value);;
  formdata.append("currency",insuranceform.currency.value);
  console.log([...formdata]);
  fetch("value1.php",{
    method:"post",
    body : formdata
  })
  .then((response)=>response.json())
  .then((result)=>{
    document.getElementById("insuranceform").reset();
    if(result.error==false){
      Swal.fire({
        type: "success",
        title: result.message

      });

    }
    else{
      Swal.fire({
        type: "error",
        title: result.message

      });
    }

  })
  .catch((e)=>{
    console.log(e);
  })
}




// Parse csv
function parseCsv(csv) {
  let resp = Papa.parse(csv);
  console.log(resp.data);
  return resp.data;
}

document.allowDrop = function(ev) {
  ev.preventDefault();
}

document.drag = function(ev) {
  ev.dataTransfer.setData("Text", ev.target.id);
}

document.drop = function(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("Text");
  ev.target.appendChild(document.getElementById(data));
}