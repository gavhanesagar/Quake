<?php
session_start();
if (!isset($_SESSION['UserID'])) {
	header("Location: index.php");
	exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />

	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link rel="canonical" href="" />
	<link rel="icon" type="image/x-icon" href="./img/icons/logoHD.png" />
	<title>QUAKE</title>

	<!-- Bootstrap -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/css/bootstrap.min.css" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/js/bootstrap.bundle.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.4.4/d3.min.js"></script>




	<!-- Custom css -->
	<link href="css/app.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">

	<!-- Openlayers -->
	<link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
	<script src="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v4.6.5/build/ol.js"></script>

	<!-- Jquery & Jquery UI -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>

	<!-- Datatables -->
	<link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css" />
	<script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>

	<!-- Papaparse -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js" integrity="sha512-SGWgwwRA8xZgEoKiex3UubkSkV1zSE1BS6O4pXcaxcNtUlQsOmOmhVnDwIvqGRfEmuz83tIGL13cXMZn6upPyg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

</head>

<body>
	<?php
	if (!isset($_SESSION['UserID'])) {
		// header("Location: index.php");
	} else {
		echo '<script>console.log("Is loggedin as: ' . $_SESSION["UserID"] . '");</script>';
		echo '
						<p id ="UserID" style = "display: none">' . $_SESSION['UserID'] . '</p>
						<p id ="Username" style = "display: none">' . $_SESSION['UserName'] . '</p>
					<div class="wrapper">';
	?>

		<div class="main">
			<!-- Main Navigation Bar -->
			<nav class="navbar navbar-expand-lg navbar-dark bg-custom" style="padding:0;background-color: #E5E5E5;">
				<div class="container-fluid">
					<a href="#" class="navbar-brand">
						<h1 class="title" style="color: #333333;">QUAKE</h1>
					</a>
					<button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
						<span class="navbar-toggler-icon" style="color: white;opacity: 1;"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarCollapse">
						<div class="navbar-nav ms-auto">
						</div>
						<div class="navbar-nav ms-auto text-light">
							<a href="logout.php" class="nav-item nav-link Logout"><i class="bi bi-box-arrow-right"></i> Logout</a>
						</div>
					</div>
				</div>
			</nav>

			<main class="content p-0 mt-0">
				<div class="container-fluid pt-0 m-0">

					<!-- Second Nav Bar -->
					<nav id="second_navbar" class="navbar navbar-expand-lg">
						<div class="container-fluid">
							<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
							<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
								<div id="navbar-nav2" class="navbar-nav ml-auto">
									<a id="navbar2" class="nav-link active" aria-current="page">Explore</a>
									<a id="navbar2" class="nav-link">Portfolio</a>
									<a id="navbar2" class="nav-link">Insurance</a>
								</div>
							</div>
						</div>
					</nav>
					<div class="row" id="MyFarm">
						<div class="col-md-4 grid-margin stretch-card" id="farm-sidebar">
							<div class="card-header">
							</div>
							<div class="input-group mb-3" id="countrySearchDiv">
								<span class="input-group-text searchIcon" id="basic-addon1"><i class="bi bi-search"></i></span>
								<input type="text" class="form-control" id="countrySearch" placeholder="Search Country" aria-label="Username" aria-describedby="basic-addon1">
							</div>
							<div class="Country-list" id="CountryList">
								<!-- Country list side bar integrated here -->
							</div>
						</div>

						<!-- Explore section -->
						<div class="col-md-8 grid-margin stretch-card" id="individual_explore_details">
							<div class="topnav data-nav position-static">
								<div class="card-header">
								</div>

								<!-- Third Nav Bar -->
								<nav id="third_navbar" class="navbar navbar-expand-lg">
									<div id="third_navbar" class="container-fluid">
										<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup2" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
										<div class="collapse navbar-collapse" id="navbarNavAltMarkup2">
											<div id="navbar-nav3" class="navbar-nav ml-auto">
												<a id="navbar3" class="nav-link nav-link3 active" aria-current="page" href="#map">Map</a>
												<a id="navbar3" class="nav-link nav-link3" href="#datasets_section">Manage Datasets</a>
												<a id="navbar3" class="nav-link nav-link3" href="#Major_events">Major Events</a>
												<a id="navbar3" class="nav-link nav-link3" href="#perils">Major Perils</a>
											</div>
										</div>
									</div>
								</nav>

							</div>

							<div class="container" id="alldata">
								<div id="Quake_Detail" class="position-relative" style="height:400px;margin:20px 0px;">
									<h1 class="title" id="Country-Name">Country Name</h1>
									<!-- Loads map here -->
									<div class="map " id="map" align="center" style="height:400px;">
									</div>
									<!-- Datasets section -->
									<div id="datasets" class="" style="height:auto;margin:20px 0px">
										<div class="col-md-12" id="datasets_section">
											<h1 class="title">Manage Datasets</h1>
											<div class="row" id="dataSetsBtn-row">
												<div class="col-md-12 dataSetsBtnGroup">
													<form id="formUp" method="POST" action="readCSV.php" enctype="multipart/form-data" style="display:inline-block">
														<input type="file" name="fileToUpload[]" id="fileToUpload1" style="display: none;" accept=".csv" multiple />
														<input type="button" class="dataSetsBtn" value="Import CSV" id="fileToUpload" onclick="document.getElementById('fileToUpload1').click();" disabled />
													</form>

													<!--<input type="button" class="dataSetsBtn" id="fileBtn" value="Import CSV" disabled>
													<input type="file" id="fileid" accept=".csv" hidden>-->
													<!--<a href="../assets/template/template.csv" download><input type="button" class="dataSetsBtn" id="templateDownload" value="Export Template" disabled></a>-->

													<a href="" download id="setCountry"><input type="button" class="dataSetsBtn" id="templateDownload" value="Export Template" disabled></a>

													<!--<a  href="/var/www/html/quake/quakeModelManasa/resources/data/templates/AfghanistanTemplate.csv" download id = "templateDownload" style="text-decoration: none; color: #333">Export template</a>-->

												</div>
											</div>
											<div class="col-md-12 " id="datatables">
												<div class="row" id="datatables-row">
													<div class="col-md-12" id="datasets_section">
														<div class="table-responsive">
															<table class="dataSetsTable hover" id="dataSetsTable" style="width:100%">
																<thead>
																	<tr>
																		<th>File</th>
																		<th>Uploaded On</th>
																	</tr>
																</thead>
																<tbody>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-12 " id="datacontenttables" hidden>
												<div class="row" id="datatables-row">
													<div class="col-md-12" id="datasets_section">
														<div class="table-responsive">
															<table class="dataSetsTable hover" id="dataContentTable" style="width:100%">
																<!-- Parse table will appear here -->
															</table>
														</div>
													</div>
												</div>
											</div>

										</div>
									</div>
									<hr id="bottom_line">

									<!-- Major events Section  -->
									<div class="col-md-12 " id="Major_events">
										<h1 class="title">Major Events</h1>
										<!-- Quake -->
										<div class="row" id="datatables-row">
											<h4 class="title">Quake</h4>
											<div class="col-md-12" id="events_table">
												<div class="table-responsive">
													<table class="majorEventsQuakeTable" id="majorEventsQuakeTable">
														<thead>
															<tr>
																<th>Date & Time</th>
																<th>Fatalities</th>
																<th>Magnitude</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>08-09-2021</td>
																<td>54</td>
																<td>23-25</td>
															</tr>
															<tr>
																<td>08-09-2021</td>
																<td>54</td>
																<td>23-25</td>
															</tr>
															<tr>
																<td>08-09-2021</td>
																<td>54</td>
																<td>23-25</td>
															</tr>
															<tr>
																<td>08-09-2021</td>
																<td>54</td>
																<td>23-25</td>
															</tr>
															<tr>
																<td>08-09-2021</td>
																<td>54</td>
																<td>23-25</td>
															</tr>
														</tbody>
													</table>
												</div>

											</div>

										</div>
										<br>
										<!-- Flood -->
										<div class="row" id="datatables-row">
											<h4 class="title">Flood</h4>
											<div class="col-md-12" id="events_table">
												<div class="table-responsive">
													<table class="majorEventsFloodTable" id="majorEventsFloodTable">
														<thead>
															<tr>
																<th>Date & Time</th>
																<th>Fatalities</th>
																<th>Rainfall(mm)</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>08-09-2021</td>
																<td>54</td>
																<td>23-25</td>
															</tr>
															<tr>
																<td>08-09-2021</td>
																<td>54</td>
																<td>23-25</td>
															</tr>
															<tr>
																<td>08-09-2021</td>
																<td>54</td>
																<td>23-25</td>
															</tr>
															<tr>
																<td>08-09-2021</td>
																<td>54</td>
																<td>23-25</td>
															</tr>
															<tr>
																<td>08-09-2021</td>
																<td>54</td>
																<td>23-25</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
									<hr id="bottom_line">

									<!-- Major perils section  -->
									<div class="col-md-12 " id="perils">
										<h1 class="title">Major Perils</h1>
										<div class="row" id="datatables-row">
											<div class="col-md-12" id="perils_table">
												<div class="table-responsive">
													<table class="majorPerilsTable" id="majorPerilsTable">
														<thead>
															<tr>
																<th>Perils</th>
																<th>Intensity</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>Flood</td>
																<td>High</td>
																</ console.log("result is - ",result);tr>
															<tr>
																<td>Quake</td>
																<td>Moderate</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Portfolio section -->
						<div class=" col-md-8 grid-margin stretch-card" id="individual_portfolio_details" style="display: none;">
																<div class="topnav data-nav position-static">
																	<div class="card-header">
																	</div>

																	<!-- Third Nav Bar -->
																	<nav id="third_navbar" class="navbar navbar-expand-lg">
																		<div id="third_navbar" class="container-fluid">
																			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup2" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
																			<div class="collapse navbar-collapse" id="navbarNavAltMarkup2">
																				<div id="navbar-nav3" class="navbar-nav ml-auto">
																					<a id="navbar3" class="nav-link" aria-current="page" href="#">Select Portfolio</a>
																				</div>
																			</div>
																		</div>
																	</nav>
																</div>

																<div class="container" id="portfolioData">
																	<div id="Quake_Detail" class="position-relative" style="height:400px;margin:20px 0px;">
																		<h1 class="title" id="Country-Name" hidden>Country Name</h1>

																		<!-- Portfolio section -->
																		<div id="portfoliosets" class="" style="height:auto;margin:20px 0px">
																			<div class="col-md-12" id="portfoliosets_section">
																				<h1 class="title">Select Portfolio</h1>
																				<div class="row" id="portfoliosets-row">
																					<!-- Drag section -->
																					<div class="col-md-4 portfoliosetsGroup">
																						<div class="col-md-12" id="datatables">
																							<div class="row" id="datatables-row">
																								<div class="col-md-12" id="datasets_port_section">
																									<div class="table-responsive">
																										<div class="dataSetsTable hover" id="portfoliosetsDrag" style="width:100%">
																											<div class="row row-1">
																												<span>File</span>
																											</div>
																											<div id="datasetFiles" class="datasetFiles row row-2">
																											</div>
																										</div>
																									</div>
																								</div>
																							</div>
																						</div>
																					</div>
																					<!-- <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div> -->
																					<div class="col-md-4 portfoliosetsGroup">
																						<!-- Arrow logo -->
																						<div id="swap-arrow">
																							<img src="img/icons/swap.svg" alt="">
																							<p>Drag file into the side box</p>
																						</div>
																					</div>
																					<!-- Drop section -->
																					<div class="col-md-4 portfoliosetsGroup">
																						<div class="col-md-12" id="datatables">
																							<div class="row" id="datatables-row">
																								<div class="col-md-12" id="datasets_port_section">
																									<div class="table-responsive">
																										<div class="dataSetsTable hover" id="portfoliosetsDrop" style="width:100%">
																											<div class="row row-1">
																												<span>File</span>
																											</div>
																											<div class="datasetFiles row row-2" id="port-data-row" ondrop="drop(event)" ondragover="allowDrop(event)">
																											</div>
																										</div>
																									</div>
																								</div>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div class="text-center">
																					<button type="button" id="savePort" class="btn btn-primary" onclick="test()">Save portfolio</button>
																				</div>
																				<hr id="bottom_line">
																				<div class="row">
																					<!-- Portfolio table in portfolio secction -->
																					<div class="col-md-12 " id="datatables">
																						<div class="row" id="datatables-row">
																							<div class="col-md-12" id="portfoliosets_section">
																								<div class="table-responsive">
																									<table id="fileTable" class="display" width="100%"></table>
																									<!--<table class="portfoliosetsTable hover" id="portfoliosetsTable" style="width:100%">
																	                                 <thead>
																		                                 <tr>
																			                                 <th>Portfolio Name</th>
																			                                 <th>Created On</th>
																			                                 <th>Quake</th>
																			                                 <th>Flood</th>
																		                                 </tr>
																	                                 </thead>
																	                                 <tbody>
																	                                 </tbody>
																                                 </table>-->
																								</div>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
												</div>

												<!-- Insurance section -->
												<div class="col-md-8 grid-margin stretch-card" id="individual_insurance_details" style="display: none;">
													<div class="topnav data-nav position-static">
														<div class="card-header">
														</div>

														<!-- Third Nav Bar -->
														<nav id="third_navbar" class="navbar navbar-expand-lg">
															<div id="third_navbar" class="container-fluid">
																<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup2" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
																<div class="collapse navbar-collapse" id="navbarNavAltMarkup2">
																	<div id="navbar-nav3" class="navbar-nav ml-auto">
																		<a id="navbar3" class="nav-link" aria-current="page" href="#">Reinsurance</a>
																	</div>
																</div>
															</div>
														</nav>
													</div>
													<div class="container" id="insuranceData">
														<div id="Quake_Detail" class="position-relative" style="height:400px;margin:20px 0px;">
															<h1 class="title">Create New Program</h1><br><br>
															<hr id="bottom_line"><br>
															<form id="insuranceform" method="post" onsubmit="submitinsurance();">
																<div align="start" id="reinsuranceForm">
																	<div class="row">
																		<div class="col-sm-12">
																			<label>Name</label>
																			<input type="text" name="programName" id="email" class="form-control" required>
																		</div>
																		<div class="col-sm-12">
																			<label>Currency</label>
																			<input type="text" name="currency" id="currency" class="form-control" required>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col-sm-6">
																			<label>Ductible Layer1</label>
																			<input type="text" name="deductible_layer1" class="form-control" id="deductible_layer1" required>
																		</div>
																		<div class="col-sm-6">
																			<label>Max Limit Layer1</label>
																			<input type="text" name="max_limit_layer1" class="form-control" id="max_limit_layer1" required>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col-sm-6">
																			<label>Ductible Layer2</label>
																			<input type="text" name="deductible_layer2" class="form-control" id="deductible_layer2" required>
																		</div>
																		<div class="col-sm-6">
																			<label>Max Limit Layer2</label>
																			<input type="text" name="max_limit_layer2" class="form-control" id="max_limit_layer2" required>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col-sm-6">
																			<label>Ductible Layer3</label>
																			<input type="text" name="deductible_layer3" class="form-control" id="deductible_layer3" required>
																		</div>
																		<div class="col-sm-6">
																			<label>Max Limit Layer3</label>
																			<input type="text" name="max_limit_layer3" class="form-control" id="max_limit_layer3" required>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col-sm-6">
																			<label>Ductible Layer4</label>
																			<input type="text" name="deductible_layer4" class="form-control" id="deductible_layer4" required>
																		</div>
																		<div class="col-sm-6">
																			<label>Max Limit Layer4</label>
																			<input type="text" name="max_limit_layer4" class="form-control" id="max_limit_layer4" required>
																		</div>
																	</div>
																	<br>

																	<br><br>
																	<div class="text-center">
																		<button type="submit" class="btn btn-primary">Create</button>
																	</div>
																</div>
															</form>


															<hr id="bottom_line"><br>
															<!-- insurance table in insurance secction -->
															<div class="col-md-12 " id="datatables">
																<div class="row" id="datatables-row">
																	<div class="col-md-12" id="portfoliosets_section">
																		<div class="table-responsive">
																			<table class="insurancesetsTable hover" id="insurancesetsTable" style="width:100%">
																				<thead>
																					<tr>
																						<th>Program Name</th>
																						<th>Ductible Layer1</th>
																						<th>Max Limit1 </th>
																						<th>Ductible Layer2</th>
																						<th>Max Limit2</th>
																						<th>Ductible Layer3</th>
																						<th>Max Limit3</th>
																						<th>Ductible Layer4</th>
																						<th>Max Limit4</th>
																						<th>Currency</th>
																						<th>Country</th>
																						<th>UserID</th>
																						<th>Date and Time</th>
																					</tr>
																				</thead>

																			</table>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
			</main>
		</div>
	<?php } ?>
	<script type="text/javascript">
		$(document).ready(function() {
			$("#navbar-nav2  > a").click(
				function(e) {
					$("#navbar-nav2 > a").removeClass(
						"active");
					$("#navbar-nav2 > a").css(
						"color", "");

					$(this).addClass("active");
					$(this).css("color", "#A77E48");
					let current = $(this).text();
					if (current === "Portfolio") {
						document.getElementById("individual_explore_details").style.display = "none";
						document.getElementById("individual_insurance_details").style.display = "none";
						document.getElementById("individual_portfolio_details").style.display = "block";
					} else if (current === "Explore") {
						document.getElementById("individual_portfolio_details").style.display = "none";
						document.getElementById("individual_insurance_details").style.display = "none";
						document.getElementById("individual_explore_details").style.display = "block";

					} else if (current === "Insurance") {
						document.getElementById("individual_explore_details").style.display = "none";
						document.getElementById("individual_portfolio_details").style.display = "none";
						document.getElementById("individual_insurance_details").style.display = "block";
					}
				});
		});
	</script>
	<script>
		// Click the hidden fileupload field
		$(document).ready(function() {
			$("#fileBtn").click(function() {
				$("#fileid").click();
			});
		});
	</script>
	<script type="text/javascript">
		// Scroll spy for navigation
		$(document).ready(function() {
			let divIds = $('a.nav-link3');

			$("#alldata").scroll(function() {
				divIds.each(function() {
					let container = $(this).attr('href');
					let containerOffset = $(container).offset().top;
					let containerHeight = $(container).outerHeight();
					let containerBottom = containerOffset + containerHeight;
					let scrollPosition = $("#alldata").offset().top + 250;

					if (scrollPosition < containerBottom - 20 && scrollPosition >= containerOffset - 20) {
						$(this).addClass('active');
					} else {
						$(this).removeClass('active');
					}
				});
			});
		});
	</script>
	<script>
		function allowDrop(ev) {
			ev.preventDefault();
		}

		function drag(ev) {
			ev.dataTransfer.setData("text", ev.target.id);
		}

		function drop(ev) {
			ev.preventDefault();
			var data = ev.dataTransfer.getData("text");
			ev.target.appendChild(document.getElementById(data));
		}
	</script>
	<link rel="stylesheet" href="https://openlayers.org/en/latest/css/ol.css" />
	<script type="text/javascript" src="https://cdn.rawgit.com/Viglino/ol-ext/master/dist/ol-ext.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
	<script src="https://unpkg.com/chart.js@2.8.0/dist/Chart.bundle.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.29.2/sweetalert2.all.js"></script>

	<script type="text/javascript" src="Main.js"></script>
</body>

</html>
<script>
</script>
<script>
	$(document).ready(function() {
		$('#dataSetsTable').DataTable({
			columnDefs: [{
				className: "dt-center cell-border",
				"targets": "_all"
			}]
		});

		$('#majorEventsQuakeTable').DataTable({
			columnDefs: [{
				className: "dt-center",
				"targets": "_all"
			}]
		})

		$('#majorEventsFloodTable').DataTable({
			columnDefs: [{
				className: "dt-center",
				"targets": "_all"
			}]
		})

		$('#majorPerilsTable').DataTable({
			searching: false,
			paging: false,
			info: false,
			columnDefs: [{
				className: "dt-center",
				"targets": "_all"
			}]
		})

		$('#portfoliosetsTable').DataTable({
			columnDefs: [{
				className: "dt-center",
				"targets": "_all"
			}]
		})
		$('#insurancesetsTable').DataTable({
			columnDefs: [{
				className: "dt-center",
				"targets": "_all"
			}]
		})
	
	});

	document.getElementById("fileToUpload1").onchange = function() {
		myFunction()
	};

	function myFunction() {
		file = document.getElementById("fileToUpload1").value;
		console.log("file: " + file);

		if (file.split(".")[1] != "csv") {
			swal({
				title: "CSV file expected",
				type: "warning",
				width: 400,
				padding: "3em",
				showConfirmButton: false,
				timer: 2000
			});
			return 0;
		}
		$("#formUp").submit();

		/*$('#formUp').submit(function(e){
		    console.log("submitted");
		    e.preventDefault();
		});*/

	}
</script>