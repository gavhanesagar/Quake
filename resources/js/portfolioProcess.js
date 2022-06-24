var globalVariable = {fileNames : ''};
/*var globalVariable = {country: ''};
country = '';*/
var selectedRow = 0;
var dataset = new Array();
var tab;
var initPortLoad = 0;


fileNames = new Array();





function readFiles()
{
/*    console.log("Here: country: "+selectedCountry.country);*/
    var fileSize = new Array();
    var fileModified = new Array();

    /*console.log("reading files");*/
    
    /*$.post("readTable.php",{
        demo: "Here"
    },function(data, status){
       console.log("data readTable: "+data);
    });
*/    
    $.post("readTableNew.php",{
        demo: "here"
    },function(data, status){
        console.log("data: "+data);
        t = data.split("]")[0];
        console.log("len: "+t.split(",").length);
        for(i = 0; i < t.split(",").length; i++)
        {            
            /*fileNames.push(t.split(']')[0].split(",")[i]);
            console.log("t: "+t.split(']')[0].split(",")[i]);*/
            
            if(i == 0)
                fileNames.push(t.split(']')[0].split(",")[i].substring(2).slice(0,-1));
            else
                fileNames.push(t.split(']')[0].split(",")[i].substring(1).slice(0,-1));
            
        }
        console.log("t: "+data.split("]")[1].split("]")[0].split(","));
        
        for(j = 0; j < t.split(",").length; j++)
        {
            /*console.log("t: "+data.split("]")[1].split("]")[0].split(","));*/
            if(j == 0)
                fileModified.push(data.split("]")[1].split("]")[0].split(",")[j].substring(2).slice(0,-1));
            else
                fileModified.push(data.split("]")[1].split("]")[0].split(",")[j].substring(1).slice(0,-1));
            
        }
        console.log("fileNAme: "+fileNames+"\nfileModified: "+fileModified  );
        
        
        /*for(i= 0; i < )*/
        
        
        

        /*for(i = 2; i < fileCount; i++)
        {
            fileNames[i] = data.split(",")[i].substr(1, data.split(",")[i].length-2);
            if(i == fileCount-1)
                fileNames[i] = fileNames[i].split("\"")[0];
        }

        for(i = 0; i < fileCount-2; i++)
        {
            fileSize.push(data.split("[")[2].split(",")[i]);
            fileSize[i];
            if(i == fileCount-3)
                fileSize[i] = fileSize[i].split("]")[0];
        }       
        
        fileNames.splice(0,2);
        for(i = 0; i < fileCount-2; i++)
            fileModified.push(data.split("[")[3].split(",")[i]);

        console.log("fileModified: "+fileModified);*/
        /*fileModified[0];*/
        
    
        disTab(fileNames, fileModified, fileNames.length);
    });
    
    
    /*$.ajax({
        type:'POST',
        url:'readFiles.php',
        success:function(data){
            console.log("Data in portProcess: "+data);
        }
    });    */
    
    
    
}


function disTab(files, size, count)
{
    document.getElementById("table").style.visibility = "visible"; 
    t = new Array(2);
    for(i = 0; i < count; i++)
    {
        dataset[i] = new Array(2);
        dataset[i][0] = files[i];
        dataset[i][1] = size[i];
    }
    /*dataset.shift();*/
    console.log("dataset: "+dataset);
    
    /*var dataSet = [
        [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
        [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
        [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
        ];*/

    /*console.log("dataset: "+dataset);*/

    /*var editor;
    $('#fileTable').on( 'click', 'tbody td:not(:first-child)', function (e) {
        editor.inline( this );
    } );*/
    /*console.log("dataset: "+dataset);*/

    var tab;
    tab = $('#fileDetailsTable').DataTable({
        data: dataset,
        columns: [
            { title: "File"},
            { title: "Uploaded on"},
            /*{
                title: "Operations",
                data: null,
                className: "center",
                defaultContent: '<button id = "run" onclick = "setTimeout(run, 100)">Run</button>'                
            }*/
        ],
        lengthMenu: [[10, 25, -1], [10, 25, "All"]],
         columnDefs: [
              {
                  "targets": 1, // your case first column
                  className: 'dt-body-right'
             }],
    });

    $('#fileDetailsTable tbody').on('click', 'tr', function () {
        var data = tab.row( this ).data();
        /*alert( 'You clicked on '+data[0]+'\'s file' );*/
        disSecTable(data[0]);
    });	
}


function disSecTable(chosenFile)
{
    console.log("In disSec:" +chosenFile);
    if(initPortLoad != 0)
        tab.destroy();
    document.getElementById("fileName").innerHTML = "Displaying data for: "+chosenFile;
    t = document.getElementById("country").innerHTML;
    path = "resources/data/UserUploads/U1/UserUpload/"+t+"/"+chosenFile+".csv";
    console.log("alert: "+path);
    
    d3.csv(path, function(data){
        //Read header
        var headerNames = d3.keys(data[0]);
        /*console.log("columns: "+d3.keys(data[0]).length);
        console.log("rows: "+d3.values(data).length);

        console.log("Head: "+headerNames);
        console.log("row1: "+d3.values(data[0]));*/
        d = d3.values(data);

        if(d == "")
        {
            //console.log("Its empty");
            swal({
                title:"No data in CSV!",
                type: "warning",
                width: 400,
                padding: "3em",
                showConfirmButton: false,
                timer: 2000
            });
            return 0;
        }
        else
        {
            /*var dataSet = [
                [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800", "5421"],
                [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750", "5421"],
                [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000", "5421"],
                [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000", "5421"]
            ];*/

            var dataSet = new Array();
            for(i = 0; i < d3.values(data).length; i++)
            {
                /*This would create an array for t[i]*/
                dataSet[i] = [];
                for(j = 0; j < d3.keys(data[0]).length; j ++)
                {
                    dataSet[i][j] = d3.values(data[i])[j];
                }
            }
            
            
            
            /*console.log("t: "+dataSet+" value: "+dataSet[2][3]);*/

            /*var dataSet = [
                [1,2,3,4,5,6,7],
                [d3.values(data[0])],
                [d3.values(data[1])],
                [d3.values(data[2])],
                [d3.values(data[3])],
            ];*/

            document.getElementById("table").style.display = "block";
            var col = [
                { title: "Zone Name" },
                { title: "Residential Low Rise" },
                { title: "Residential High Rise" },
                { title: "Commercial Low Rise" },
                { title: "Commercial High Rise" },
                { title: "Industrial" },
                { title: "Engineering"}
            ];

            console.log("col: "+col[0].title);
            tab = $('#fileTable').DataTable({
                
                fixedHeader: true,
                data: dataSet,
                columns: col,
                lengthMenu: [[10, 25, -1], [10, 25, "All"]],
                dom: 'lBfrtip<"actions">',
                buttons: [
                    {
                        extend: 'copy',
                        title: 'Quake-model',
                        messageTop: chosenFile,
                        messageBottom: chosenFile
                    },
                    {
                        extend: 'csv',
                        title: 'Quake-model',
                        messageTop: chosenFile,
                        messageBottom: chosenFile
                    },            
                    {
                        extend: 'pdf',
                        title: 'Quake-model',
                        messageTop: chosenFile,
                        messageBottom: chosenFile
                    },
                    {
                        extend: 'print',
                        title: 'Quake-model',
                        messageTop:chosenFile,
                        messageBottom: chosenFile
                    }
                ],
            });
        }
    });
    if(initPortLoad == 0)
        initPortLoad = 1;
}


function run()
{
    var t = dataset[selectedRow][0]; 
    $.post("runRscript.php",{
        demo: t
    },function(data, status){
        console.log("data: "+data);
    });
}