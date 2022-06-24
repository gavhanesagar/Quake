<?php
session_start();
if (!isset($_SESSION['Phone'])) {
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

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/css/bootstrap.min.css" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/js/bootstrap.bundle.min.js"></script>

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

	<title>Sat2Credit</title>
	<link href="css/app.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<!-- <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;400;600&display=swap" rel="stylesheet"> -->

	<link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
	<script src="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v4.6.5/build/ol.js"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/js/bootstrap-datepicker.js"></script>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker.css" rel="stylesheet" />

	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<!-- <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> -->

</head>

<body>
	<?php
	if (!isset($_SESSION['Phone'])) {
		// header("Location: index.php");
	} else {
		echo '<script>console.log("Is loggedin as: ' . $_SESSION["UserID"] . '");</script>';
		echo '
						<p id ="apiKey" style = "display: none">' . $_SESSION['ApiKey'] . '</p>
						<p id ="UserID" style = "display: none">' . $_SESSION['UserID'] . '</p>
						<p id ="Username" style = "display: none">' . $_SESSION['Phone'] . '</p>
					<div class="wrapper">';
	?>

		<div class="main">

			<!-- Main Navigation Bar -->
			<nav class="navbar navbar-expand-lg navbar-dark bg-custom" style="padding:0;background-color: #01345B;">
				<div class="container-fluid">
					<a href="#" class="navbar-brand">
						<img src="https://satyukt.com/web/assets/img/logoHD.png" height="40px" alt="Sat2farm" loading="eager">
					</a>
					<button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
						<span class="navbar-toggler-icon" style="color: white;opacity: 1;"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarCollapse">
						<div class="navbar-nav ms-auto">
							<form class="d-flex">
								<input class="form-control me-2 icon" type="text" placeholder="What you are looking for today?" style="border-radius: 20px;width: 346px;height: 38px;">
								<!-- <button class="btn btn-primary" type="button">Search</button> -->
							</form>
						</div>
						<div class="navbar-nav ms-auto text-light">
							<a href="#" class="nav-item nav-link"><i class="bi bi-cart-fill"></i></a>
							<a href="#" class="nav-item nav-link"><i class="bi bi-bell-fill"></i></a>
							<a href="#" class="nav-item nav-link"><i class="bi bi-person-circle"></i></a>
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
									<a id="navbar2" class="nav-link" aria-current="page" href="user.php">Portfolio</a>
									<a id="navbar2" class="nav-link active" aria-current="page" href="Explore.php">Explore</a>
								</div>
							</div>
							<a id="viewName" class="nav-link float-md-end" href="#" style="font-size: 2.5vh;color: #01A560;text-decoration: none;text-align: center;font-weight: bolder;display: flex; justify-content: center;"></a>
						</div>
						<!-- <div class="upload_farm" id="upload_farm">
							<button onclick="switchVisible();" id="upload_btn" class="btn">Upload KML <span style="font-size: 25px;">&nbsp;+</span></button>
						</div> -->
					</nav>
					<style>
						.filter {
							width: 152px;
							height: 40px;
							background: #DCE4EA;
							border: 1px solid rgba(184, 185, 187, 0.5);
							box-sizing: border-box;
							border-radius: 10px;
							text-align: center;
							margin: 10px;
							color: #184876;
						}

						.filter option {
							width: 152px;
							height: 40px;
							background: #DCE4EA;
							border: 1px solid rgba(184, 185, 187, 0.5);
							box-sizing: border-box;
							border-radius: 10px;
							text-align: center;
							color: #184876;
						}

						#table_details {
							margin-top: 0px;
							padding: 100px;
							padding-top: 20px;

						}
					</style>
					<hr style="margin:-15px">
					<div class="container">
						<div class="row" id="MyFarm" style="overflow: auto !important;">
							<div class="col-12" style="display: flex;justify-content:center">
								<select class="filter">
									<option>Country</option>
								</select>

								<select class="filter">
									<option>State</option>
								</select>

								<select class="filter">
									<option>District</option>
								</select>

								<select class="filter">
									<option>Sub-District</option>
								</select>

								<select class="filter">
									<option>Village</option>
								</select>
							</div>
							<div class="col-12" id="table_details">
								<div class="table-responsive">
									<table id="Farmer_data" class="table table-striped table-bordered" data-show-refresh="true" style="border-radius: 15px !important;text-align:center !important">
										<thead>
											<tr style="background-color: #01A560;border-radius: 10px 10px 0px 0px;  font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;align-items: center;color: #FFFFFF;">
												<th>Farm_Area(Ha)</th>
												<th>Risk</th>
												<th>Major Crop</th>
												<th>Average_yield(kg/Ha)</th>
												<th>Average_income(INR) 2022</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>a</td>
												<td>b</td>
												<td>a</td>
												<td>a</td>
												<td>a</td>
											</tr>
											<tr>
												<td>a</td>
												<td>b</td>
												<td>a</td>
												<td>a</td>
												<td>a</td>
											</tr>
											<tr>
												<td>a</td>
												<td>b</td>
												<td>a</td>
												<td>a</td>
												<td>a</td>
											</tr>
											<tr>
												<td>a</td>
												<td>b</td>
												<td>a</td>
												<td>a</td>
												<td>a</td>
											</tr>
											<tr>
												<td>a</td>
												<td>b</td>
												<td>a</td>
												<td>a</td>
												<td>a</td>
											</tr>
										</tbody>

									</table>
								</div>
							</div>
						</div>

					</div>
				</div>
			</main>

			<!-- Footer Starts -->
			<footer id="final_footer" class="footer py-3">
				<div class="container">
					<span>All Rights Reserved @ Satyukt Analytics Private Limited</span>
				</div>
			</footer>
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
					$(this).css("color", "#01A560");
				});
		});
	</script>

	<script type="text/javascript">
		$(document).ready(function() {
			$("#navbar-nav3  > a").click(
				function(e) {
					$("#navbar-nav3 > a").removeClass(
						"active");
					$("#navbar-nav3 > a").css(
						"color", "");

					$(this).addClass("active");
					$(this).css("color", "#01A560");
				});
		});
	</script>

	<link rel="stylesheet" href="https://openlayers.org/en/latest/css/ol.css" />
	<script type="text/javascript" src="https://cdn.rawgit.com/Viglino/ol-ext/master/dist/ol-ext.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
	<script src="https://unpkg.com/chart.js@2.8.0/dist/Chart.bundle.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.29.2/sweetalert2.all.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.3.1-rc.1/echarts.min.js"></script>

	<script type="text/javascript" src="resources/js/mapDisplay.js"></script>

	<script type="text/javascript" src="kmlUpload.js"></script>
	<script type="text/javascript" src="Main.js"></script>
	<!-- <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script> -->
</body>

</html>


<script>
	function switchVisible() {
		if (document.getElementById('individual_farm_details')) {

			if (document.getElementById('individual_farm_details').style.display == 'none') {
				document.getElementById('individual_farm_details').style.display = 'block';
				document.getElementById('upload_section').style.display = 'none';
			} else {
				document.getElementById('individual_farm_details').style.display = 'none';
				document.getElementById('upload_section').style.display = 'block';
			}
		}
	}

	function switchVisible2() {
		if (document.getElementById('upload_section')) {

			if (document.getElementById('upload_section').style.display == 'none') {
				document.getElementById('upload_section').style.display = 'block';
				document.getElementById('individual_farm_details').style.display = 'none';
			} else {
				document.getElementById('upload_section').style.display = 'none';
				document.getElementById('individual_farm_details').style.display = 'block';
			}
		}
	}
</script>