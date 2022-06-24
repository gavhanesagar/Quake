<html>
    <head>
        <!--<link rel="stylesheet" type="text/css" href="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/css/jquery.dataTables.css">-->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="resources/css/style1.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
        
        
        <link href="css/colors/blue-dark.css" id="theme" rel="stylesheet">
        
        <link href="https://fonts.googleapis.com/css?family=Noto+Serif:400,400italic,700|Open+Sans:300,400,600,700" rel="stylesheet">
        <link href = "css/navBar.css" rel = "stylesheet"/>
        <link href = "resources/css/resultsNew.css" rel = "stylesheet">
        <script src = "resources/js/form.js"></script>  
        
        <link href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.5.1.js" ></script>
        <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js" ></script>
        <script src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
    </head>
<?php
        session_start();
        if($_SESSION["UserID"] != "")
        {
            $country= $_SESSION['country'];
            echo'<script>console.log("country: '.$_SESSION["country"].'");</script>';
            echo'<script>console.log("Logged in: '.$_SESSION["UserID"].'");</script>';?>
            <script>
            var c = '<?php echo $country; ?>';
            localStorage.setItem("country",c );
            </script>
            <?php
            echo'
            <p id = "country" style = "display:none">'.$_SESSION["UserID"].'</p>
            <p id = "peril" style = "display:none"></p>
<body onload="initLoad()">
    
   
    <div id="main" style = "margin-left: 0px;">
        <div class = "col-md-12" style = "margin-top: 0px; margin-left: 0px;">
            
            <div style = "display: inline-block;">
                <b style = "font-size: 25px; font-weight: 200; padding:10px">Results</b>
            </div>
            <hr style = "margin-top:10px; margin-bottom: 0px; border-top: 2px solid #eee;">
        </div>
            <div class="row">
                <div class="col-md-12" id="icon_bar">
                    <div class="icon-bar">
                        <div>
                            <a href="floodResults.php"><i class="fa fa-refresh" title = "Reload" style="color:rgb(82, 80, 80);" aria-hidden="true"></i></a>
                            <!--<a href="#" onclick="show()"><i class="fa fa-save" style="color:rgb(56, 56, 56);"></i></a>
                            <a href="#" value = "Print" onclick = "window.print()"><i class="fa fa-print" style="color:rgb(75, 75, 75);"></i></a>-->
                        </div>
                        <div class="pagin">
                            <div class="pagination">
                               
                                <a class = "select" id="pagin1" onclick="content_replace();">1</a>
                                <a  id="pagin2" onclick="content_replace();">2</a>
                                <a  id="pagin3" onclick="content_replace();">3</a>
                                <a  id="pagin4" onclick="content_replace();">4</a>
                                <a  id="pagin5" onclick="content_replace();">5</a>
                                                            
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>    
            <hr>
            <div class="row" id="userInfo">
                <div class="col-md-6">
                    <table>
                        <tr>
                            <td id="title1">Selected Portfolio</td>
                            <td id = "portfolio"></td>
                        </tr>
                        <tr>
                            <td id="title2">Selected Country</td>
                            <td id = "country"> '.$_SESSION["country"].'</td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-6">
                    <table>
                        <tr>
                            <td id="title3">Logged In user</td>
                            <td>'.$_SESSION["UserID"].'</td>
                        </tr>
                        <tr>
                            <td id="title4">Peril</td>
                            <td id = "disPeril"></td>
                        </tr>
                    </table>
                </div>
            </div>
            <br>
            <!-- First table & bar chart -->
            <div class="page1" id="pg1" style="display: block;">
                <div class="row">
                    <div class="col-md-12" id="dataTable">
                        <table id="table1">

                            <thead>
                                <h4 style="text-align: center;padding-top: 7px;">Table 1: Exposure by Zone - Top 5</h4>
                                <tr>
                                    <!--<th class="site_name"></th>-->
                                    <th>Zone Names</th>
                                    <th>Residential Low Rise</th>
                                    <th>Residential High Rise</th>
                                    <th>Commercial Low Rise</th>
                                    <th>Commercial High Rise</th>
                                    <th>Industrial</th>
                                    <th>Agriculture</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6" id="chart1">
                        <h4 style="text-align: center;">Exposure by Zone - Top 5</h4>
                        <canvas id="bar-chart" width="400" height="200"></canvas>
                    </div>
                    <div class="col-md-6" id="chart2">
                        <h4 style="text-align: center;">Exposure by Zone - Top 5</h4>
                        <canvas id="bar-chart2" width="400" height="200"></canvas>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6" id="footer1" align = "right" style = "padding-left: 3%!important">
                        Page No:
                    </div>
                    <div class="col-md-6" id="footer2">
                        1
                    </div>
                    <!--<div class="col-md-8" id="footer3" style="text-align: end;font-size: 15px;">
                            Copyright &copy; 2020 QUAKE All Rights Reserved
                    </div>-->
                </div>
            </div>

            <!-- Second table & line chart -->
            <div class="page2" id="pg2" style="display: none;">
                <div class="row">
                    <div class="col-md-12" id="dataTable">
                        <table id="table2">
                            <thead>
                                <h4 style="text-align: center;padding-top: 7px;">Table 2: Probability distribution</h4>
                                <tr>
                                    <th>Probability</th>
                                    <th>Gross</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-12">
                        <h4 style="text-align: center;">Gross AEP</h4>
                        <canvas id="myChart" width="1920" height="500"></canvas>
                    </div>
                </div>
            </div>
            <!-- Third table and pie chart -->
            <div class="page3" id="pg3" style="display: none;">
                <div class="row">
                    <div class="col-md-12" id="dataTable">
                        <table id="table3">
                            <thead>
                                <h4 style="text-align: center;padding-top: 7px;">Table 3: Top 5 by Total Annual Average Loss</h4>
                                <tr>
                                    <th class="site_name"></th>
                                    <th>Zones</th>
                                    <th>Annual Average Loss</th>
                                    <th>PML</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-12">
                        <h4 style="text-align: center;">Annual Average Loss</h4>
                        <canvas id="pie-chart" width="1920" height="500"></canvas>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2" id="footer1">
                        Page No:
                    </div>
                    <div class="col-md-2" id="footer2">
                        3
                    </div>
                    <!--<div class="col-md-8" id="footer3" style="text-align: end;font-size: 15px;">
                            Copyright &copy; 2020 QUAKE All Rights Reserved
                    </div>-->
                </div>
            </div>

            <!-- Fourth table and bar chart -->
            <div class="page4" id="pg4" style="display: none;">
                <div class="row">
                    <div class="col-md-12" id="dataTable">
                        <table id="table4">
                            <thead>
                                <h4 style="text-align: center;padding-top: 7px;">Table 4: Top 5 by Zone by 1 in 200</h4>
                                <tr>
                                    <th class="site_name"></th>
                                    <th>Gross</th>
                                    <th>Annual Average Loss</th>
                                    <th>1 in 200 Loss</th>
                                    <th>1 in 200 PML</th>                        
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-12">
                        <h4 style="text-align: center;">Top 5 Zone by 1 in 200</h4>
                        <canvas id="bar-chart4" width="1920" height="500"></canvas>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2" id="footer1">
                        Page No:
                    </div>
                    <div class="col-md-2" id="footer2">
                        4
                    </div>
                    <!--<div class="col-md-8" id="footer3" style="text-align: end;font-size: 15px;">
                            Copyright &copy; 2020 QUAKE All Rights Reserved
                    </div>-->
                </div>
            </div>

            <!-- Fifth table and bar chart -->
            <div class=" page5" id="pg5" style="display: none;">
                <div class="row">
                    <div class="col-md-12" id="dataTable">
                        <table id="table5">
                            <thead>
                                <h4 style="text-align: center;padding-top: 7px;">Table 5: Results by Type</h4>
                                <tr>
                                    <th>Name</th>
                                    <th>Annual Average Loss</th>
                                    <th>1 in 200 Loss</th>
                                    <th>Average PML</th>
                                    <th>1 in 200 PML</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-12">
                        <h4 style="text-align: center;">Results by Type</h4>
                        <canvas id="bar-chart5" width="1920" height="500"></canvas>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2" id="footer1">
                        Page No:
                    </div>
                    <div class="col-md-2" id="footer2">
                        5
                    </div>
                    <!--<div class="col-md-8" id="footer3" style="text-align: end;font-size: 15px;">
                            Copyright &copy; 2020 QUAKE All Rights Reserved
                    </div>-->
                </div>  
            </div>
        </div>';
    }
    else
    {
        echo'<script>console.log("Logged in: '.$_SESSION["UserID"].'");</script>';
        header("Location: index.php");
    }
    ?>
    <script src="https://kendo.cdn.telerik.com/2017.2.621/js/jquery.min.js"></script> 
    <script src="https://kendo.cdn.telerik.com/2017.2.621/js/jszip.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2017.2.621/js/kendo.all.min.js"></script>
    
    <!--<script src="//d3js.org/d3.v3.min.js"></script>-->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.2.2/d3.v3.min.js"></script>
    
    <script type="text/javascript" charset="utf8" src="https://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.min.js"></script>
    <script src="resources/js/floodResults.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    
    <script>
         var toggleFlag = 0;
            function openNav()
            {
                if(toggleFlag == 0) 
                {
                    document.getElementById("mySidenav").style.width = "15%";
                    document.getElementById("main").style.marginLeft = "15%";
                    document.getElementById("sideToggle").innerHTML ="&#171;";
                    toggleFlag = 1;
                }
                else
                {
                    document.getElementById("sideToggle").innerHTML = "&#187;";
                    document.getElementById("mySidenav").style.width = "0px";
                    document.getElementById("main").style.marginLeft = "0px";
                    toggleFlag = 0;
                }
            }

            function closeNav()
            {
                document.getElementById("mySidenav").style.width = "0";
                document.getElementById("main").style.marginLeft= "0";
            }
    </script>
</body>

</html>