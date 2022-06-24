var globalVariable = {layerStyle : 0};
var companyName = new Array();
var propertyName = new Array();
var staType = new Array();
var sidebar = 0;
var initLoad = 0;

layerStyle = "";

function load()
{
    console.log("load()");
    console.log(window.location.href);
}

function getOptions(avSt, cNam, bTy)
{
    var stat = "";
    var cmp = "";
    var buil = "";
    var cas = new Array();
    t = window.location.href;

    for(i = 0; i < avSt.length; i++){
        if(avSt[i] == "median")
            avSt[i] = "Median";
        else
            avSt[i] = avSt[i].toUpperCase();
        stat += "<option>"+avSt[i]+"</option>";
    }    
    document.getElementById("stat").innerHTML = stat;
    document.getElementById("statTab").innerHTML = stat;

    /*if(t.split(".")[3].split("/")[2] != "resMorocco")
    {
        for(i = 0; i < cNam.length; i++){
            cmp += "<option>"+cNam[i]+"</option>";
        }
        document.getElementById("Company").innerHTML = cmp;
        document.getElementById("CompanyTab").innerHTML = cmp;
    }*/
    for(i = 0; i < bTy.length; i++){
        buil += "<option>"+bTy[i]+"</option>";
    }
    document.getElementById("prop").innerHTML = buil;
    document.getElementById("propTab").innerHTML = buil;
}


function displayLayer()
{
    s = document.getElementById('stat').value;
    c = document.getElementById('Company').value;
    p = document.getElementById('prop').value;

    $.post("legend.php", { stat: s, cmp: c, prop: p},
           function(maxValue) {
        if(maxValue <= 100)
        {
            document.getElementById("lege").src = "resources/imgs/legends/legend_100.png";
            layerStyle = "sql_view_statistics_100";
        }
        else if(maxValue <= 500)
        {
            document.getElementById("lege").src = "resources/imgs/legends/legend_500.png";
            layerStyle = "sql_view_statistics_500";
        }
        else if(maxValue <= 1000)
        {
            document.getElementById("lege").src = "resources/imgs/legends/legend_1000.png";
            layerStyle = "sql_view_statistics_1000";
        }
        else if(maxValue <= 5000)
        {
            document.getElementById("lege").src = "resources/imgs/legends/legend_5000.png";
            layerStyle = "sql_view_statistics_5000";
        }
        removeTheLayers();
        dis(c,p,s,layerStyle);
        map.addLayer(algeriaLayer);

    });
}


function toggle()
{
    if(sidebar == 0)
    {
        document.getElementById("sideBAr").style.width = "0vh";
        document.getElementById("sideBAr").style.visibility = "hidden";
        sidebar = 1;
    }
    else
    {
        document.getElementById("sideBAr").style.width = "25vh";
        document.getElementById("sideBAr").style.visibility = "visible";
        sidebar = 0;
    }
}




/*Drop Down*/
/*function drop(x)
{
    console.log("In Algeria");
}
function drop1(x)
{
    console.log("In Egypt");
}

function Click() 
{
    var lastElemText = document.querySelector('.select__element-last');
    var buttonAlready;
    var innerListbuttonAlready;

    function onClick() {
        document.addEventListener('click', onClicking );
    };

    function onClicking(e) {
        var target = e.target;

        if (target.closest('.selected__element-current')) {
            onMainButton(target);
        } else if (target.closest('button')) {
            onListButtons(target);
        } else {
            remove();
        }
    };

    function onMainButton(target) {
        remove();

        var button = target.closest('.selected__element-current');
        buttonAlready = button;

        onMainButtonToggle(button);
    };

    function onMainButtonToggle(button) {
        remove();

        var innerList = button.nextElementSibling;
        innerListbuttonAlready = innerList;

        if (innerList.classList.contains('button-row')) {
            innerList.classList.toggle('open-blue'); 
            button.classList.toggle('open-blue'); 
        }
    };

    function onListButtons(target) {
        var option = target.closest('button');
        var parentPreviousElement = option.parentNode.previousElementSibling;

        onListButtonsToggle(parentPreviousElement, option);
    };

    function onListButtonsToggle(parentPreviousElement, option) {
        var parentPreviousElementFirstChild = parentPreviousElement.querySelector('span');
        parentPreviousElementFirstChild.innerHTML = option.innerHTML;

        option.parentNode.classList.toggle('open-blue'); 
        lastElemText.innerHTML = option.value;
    };

    function remove() {
        if (buttonAlready) {
            buttonAlready.classList.remove('open-blue');
        }

        if (innerListbuttonAlready) {
            innerListbuttonAlready.classList.remove('open-blue'); 
        }
    };

    this.onClick = onClick;
}

var click = new Click();
click.onClick();*/



/*  --- Datatables --- */
function chooseRes(res)
{ 
    var resType = res.value;
    switch(resType)
    {
        case 'Table View': document.getElementById("map").style.display = "none";
            document.getElementById("table").style.display = "block";
            getTabVal();
            break;
        case 'Map View': document.getElementById("map").style.display = "block";
            document.getElementById("table").style.display = "none";
            break;
    }
}


function getTabVal(){    
    c = document.getElementById("CompanyTab").value;
    p = document.getElementById("propTab").value;
    s = document.getElementById("statTab").value;
    $.post("tableDis.php",
           {
        cmp: c,
        prop: p,
        stat: s
    },

           function(data, status){

        var stNum = new Array();
        var stRig = new Array();
        var cmp = new Array();
        var bild = new Array();
        var pml100 = new Array();
        var pml200 = new Array();
        var aal = new Array();
        var t1 = new Array();

        rearEle = data[data.length-2]+data[data.length-1];
        /*alert("Data: " + data + "\nStatus: " + status);*/
        for(i = 0; i < rearEle; i++)
        {
            stNum.push(data.split("]",1)[0].split(",")[i].split("\"\"")[0].split("\"")[1].split(",")[0]);
            cmp.push(data.split("]",2)[1].split(",")[i].split("\"\"")[0].split("\"")[1].split(",")[0]);
            bild.push(data.split("]",3)[2].split(",")[i].split("\"\"")[0].split("\"")[1].split(",")[0]);
            pml100.push(data.split("]",4)[3].split(",")[i].split("\"\"")[0].split("\"")[1].split(",")[0]);
            pml200.push(data.split("]",5)[4].split(",")[i].split("\"\"")[0].split("\"")[1].split(",")[0]);
            aal.push(data.split("]",6)[5].split(",")[i].split("\"\"")[0].split("\"")[1].split(",")[0]);
        }
        tabVal(stNum, cmp, bild, pml100, pml200, aal)
    });
}

var tabFlag = 0;

function tabVal(state, cmp, build, pml150, pml200, aal)
{
    if(tabFlag != 0)
        $("#example").dataTable().fnDestroy();    
    var finalInput = new Array(state.length);
    for(i = 0; i < state.length; i++)
        finalInput[i] = new Array(6);

    for(i = 0; i < state.length; i++)
    {
        for(j = 0; j < 6; j++)
        {
            switch(j)
            {
                case 0: finalInput[i][j] = state[i];
                    break;
                case 1: finalInput[i][j] = cmp[i];
                    break;
                case 2: finalInput[i][j] = build[i];
                    break;
                case 3: finalInput[i][j] = pml150[i];
                    break;
                case 4: finalInput[i][j] = pml200[i];
                    break;
                case 5: finalInput[i][j] = aal[i];
                    break;
            }
        }
    }

    /*var dataSet = [
        [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
        [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
        [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
        [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
        [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
        [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],      
    ];*/

    var tab = $('#example').DataTable({         
        data: finalInput,
        columns: [
            { title: "State" },
            { title: "Company" },
            { title: "Build" },
            { title: "PML_1_IN_150" },
            { title: "PML_1_IN_200 " },
            { title: "AAL"}
        ],
        lengthMenu: [[10, 25, -1], [10, 25, "All"]],
        dom: 'lBfrtip<"actions">',
        buttons: [
            {
                extend: 'copy',
                title: 'Quake-model',
                messageTop:'quake data',
                messageBottom: 'quake data'
            },
            {
                extend: 'csv',
                title: 'Quake-model',
                messageTop:'quake data',
                messageBottom: 'quake data'
            },            
            {
                extend: 'pdf',
                title: 'Quake-model',
                messageTop:'quake data',
                messageBottom: 'quake data'
            },
            {
                extend: 'print',
                title: 'Quake-model',
                messageTop:'quake data',
                messageBottom: 'quake data'
            }
        ],
        fixedHeader: true
        /*scrollX: true*/
    });    
    tabFlag = 1;
    document.querySelector("#example_length").style.marginRight = "5%";
}