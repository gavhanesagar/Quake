<?php
session_start();
if(!isset($_SESSION['UserID'])) {
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
	<meta name="description" content="Responsive Admin &amp; Dashboard Template based on Bootstrap 5">
	<meta name="keywords"
		content="adminkit, bootstrap, bootstrap 5, admin, dashboard, template, responsive, css, sass, html, theme, front-end, ui kit, web">

	<link rel="preconnect" href="https://fonts.gstatic.com">
	<!-- <link rel="shortcut icon" href="img/icons/icon-48x48.png" /> -->

	<link rel="canonical" href="https://demo-basic.adminkit.io/" />

	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>

	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

	<title>Sat2farm</title>

	<link href="css/app.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;400;600&display=swap" rel="stylesheet">

	<script src="https://code.jquery.com/jquery-3.6.0.js"
		integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/js/bootstrap-datepicker.js"></script>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker.css"
		rel="stylesheet" />


	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
	<style>
		.accordion-button:focus {
			box-shadow: none;
		}

		.accordion-body {
			border-radius: 10px;
		}

		.accordion-button:not(.collapsed)::after {
			background-image: url("https://cdn-icons-png.flaticon.com/512/57/57055.png");
			transform: rotate(-180deg);
			filter: invert(1);
		}

		.accordion-button::after {
			background-image: url("https://cdn-icons-png.flaticon.com/512/57/57055.png");
			filter: invert(1);
		}

		.weather {
			background-image: url("https://images.pexels.com/photos/3227984/pexels-photo-3227984.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
			background-size: cover;
			background-position: center;
			border-radius: 20px;
			color: white;
			/* box-shadow: 0px 8px 16px 4px #9E9E9E; */

		}

		.card-footer {
			background-color: #ffffff;
			color: #000;
			width: fit-content;
			border-radius: 20px;
		}

		.time-font {
			font-size: 50px
		}

		.sm-font {
			font-size: 18px
		}

		.med-font {
			font-size: 28px
		}

		.large-font {
			font-size: 60px
		}

		#weekdays {
			/* position: relative; */
			width: 110%;
			height: 450px;
			margin: auto;
			background-color: none;
			display: grid;
			grid-auto-rows: 140px;
			grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
			grid-gap: 10px;
			padding: 10px 20px 10px 0px;
			margin: 10px auto 0px;
			overflow-y: scroll;
			z-index: 9999;
		}

		article {
			border-radius: 10px;
			padding: 20px 10px;
			color: #fff;
			height: auto;
			display: block;
			text-align: center;

		}

		article:nth-child(odd) {
			background-color: #DCE4EA;
			color: #10101e;
			font-size: 18px;
			font-weight: 400;
		}

		article:nth-child(even) {
			background-color: #DCE4EA;
			color: #00203fff;
			font-size: 18px;
			font-weight: 400;
		}

		#scroll-text {
			-moz-transform: translateX(100%);
			-webkit-transform: translateX(100%);
			transform: translateX(100%);
			-moz-animation: my-animation 15s linear infinite;
			-webkit-animation: my-animation 15s linear infinite;
			animation: my-animation 15s linear infinite;
		}

		#chartContainer_sm,
		#chartContainer_ndvi,
		#chartContainer_rvi {
			height: 280px;
			/* border: 1px solid #000; */
			background-color: #a8a7a7;
			padding: 10px;
			width: 480px;
			border-radius: 20px;

		}

		.canvasjs-chart-canvas {
			width: 460px;
			height: 260px;
			border-radius: 15px;
		}

		.canvasjs-chart-credit {
			display: none;
		}
/* Datepicker */
#ui-datepicker-div {
				background: #fff;
				color: #000000;
				width: 230px;
				padding: 15px;
				border-radius: 4px;
				box-shadow: 0px 4px 10px 0px #ABABAB;
			}

			.input_div input {
				float: right;
				margin: 15px 20px 15px 15px;
				color: #FFFFFF;
				background-color: #01A560;
				padding: 5px;
				height: 40px;
				border-radius: 4px;
				border: none;
				text-align: center;
				width: 110px;
			}

			.ui-datepicker-calendar th {
				padding: 5px;
			}

			.input_div .focus-visible {
				border: none !important;
			}

			.ui-datepicker-title {
				text-align: center;
				padding-bottom: 10px;
				font-weight: 700;
			}
			

			a.ui-datepicker-prev.ui-corner-all {
				float: left;
			}

			a.ui-datepicker-next.ui-corner-all {
				float: right;
			}

			.ui-datepicker-calendar td {
				padding: 7px;
			}
			.ui-datepicker.ui-widget.ui-widget-content.ui-helper-clearfix.ui-corner-all {
    			display: none;
			}
		/* #image_div_rvi{
			width:95%;
			height:320px;	
		} */
		/* for Firefox */
		@-moz-keyframes my-animation {
			from {
				-moz-transform: translateX(100%);
			}

			to {
				-moz-transform: translateX(-100%);
			}
		}

		/* for Chrome */
		@-webkit-keyframes my-animation {
			from {
				-webkit-transform: translateX(100%);
			}

			to {
				-webkit-transform: translateX(-100%);
			}
		}

		@keyframes my-animation {
			from {
				-moz-transform: translateX(100%);
				-webkit-transform: translateX(100%);
				transform: translateX(100%);
			}

			to {
				-moz-transform: translateX(-100%);
				-webkit-transform: translateX(-100%);
				transform: translateX(-100%);
			}


			
	</style>
</head>

<body>
	<?php
			if(!isset($_SESSION['UserID'])) {
				// header("Location: index.php");
				} else {
					echo '<script>console.log("Is loggedin as: ' . $_SESSION["UserID"] . '");</script>';
					echo '
						<p id ="apiKey" style = "display: none">' . $_SESSION['ApiKey'] . '</p>
						<p id ="UserID" style = "display: none">' . $_SESSION['UserID'] . '</p>
						<p id ="Username" style = "display: none">' . $_SESSION['UserName'] . '</p>
					<div class="wrapper">
						

						<div class="main">
							
							<nav class="navbar navbar-expand-lg navbar-dark bg-custom" style="padding:0;background-color: #01345B;">
								<div class="container-fluid">
									<a href="#" class="navbar-brand">
										<img src="https://satyukt.com/web/assets/img/logoHD.png" height="40px" alt="Sat2farm">
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
											<a href="#" class="nav-item nav-link Logout"><i class="bi bi-box-arrow-right"></i> Logout</a>
						
										</div>
									</div>
								</div>
							</nav>

							<main class="content p-0 mt-2">
								<div class="container-fluid pt-3 m-0">

									<div class="topnav" style="margin-bottom: 25px;position:static;">
										<a href="Farmers.php">Farmers</a>
										<a href="user.php">My Farms</a>
										<a href="#">Communities</a>
										<a href="#">Market</a>
									</div>
									<!-- <div class="accordion" id="faqlist">
										<div class="accordion-item my-3 shadow">
											<h2 class="accordion-header">
												<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#content-accordion-1" style="background-color: #01A560;color: white;font-weight: 600;font-size: 18px;">Add New&nbsp;<i class="bi bi-plus-lg"></i></button>
											</h2>
											<div id="content-accordion-1" class="accordion-collapse collapse show" data-bs-parent="#faqlist">
												<div class="accordion-body row">
													<div class="container pl-5 pt-4 pb-0">
														<div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
															<div class="col">
																<div class="card shadow-sm">
																	<div class="text-center">
														
												
																		<div class="img-hover-zoom img-hover-zoom--colorize">
																			<div class="centered">Farm</div>
																			<img class="shadow" src="https://images.pexels.com/photos/259280/pexels-photo-259280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650"
																				alt="Another Image zoom-on-hover effect">
																		</div>
												
																	</div>
														
																	
																</div>
															</div>
															<div class="col">
																<div class="card shadow-sm">
																	<div class="text-center">
															
												
																		<div class="img-hover-zoom img-hover-zoom--colorize">
																			<div class="centered">Poly House</div>
																			<img class="shadow" src="https://images.pexels.com/photos/2423412/pexels-photo-2423412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650"
																				alt="Another Image zoom-on-hover effect">
																		</div>
												
																	</div>
															
																	
																</div>
															</div>
															<div class="col">
																<div class="card shadow-sm">
																	<div class="text-center">
																
												
																		<div class="img-hover-zoom img-hover-zoom--colorize">
																			<div class="centered">Water Body</div>
																			<img class="shadow" src="https://images.pexels.com/photos/990016/pexels-photo-990016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
																				alt="Another Image zoom-on-hover effect">
																		</div>
												
																	</div>
															
																	
																</div>
															</div>
															<div class="col">
																<div class="card shadow-sm">
																	<div class="text-center">
																
												
																		<div class="img-hover-zoom img-hover-zoom--colorize">
																			<div class="centered">Terrace Garden</div>
																			<img class="shadow" src="https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
																				alt="Another Image zoom-on-hover effect">
																		</div>
												
																	</div>
																
																	
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									
									</div> -->
									
									<div class="row" id="MyFarm">
										<div class="col-md-4 grid-margin stretch-card">
											<div class="card-header">

												<h5 class="card-title mb-0">My Farm</h5>
											</div>
											<div class="Farm-list" id="Farm-list" style="height:800px">
												
												<div class="card">
													<div class="row g-0">
														<div class="col-sm-5 p-3 pe-1" style="background: none;border-radius: 10px;">
															<img src="https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
																class="card-img h-100" alt="">
														</div>
														<div class="col-sm-7">
															<div class="card-body pt-3 mt-0">
																<p class="card-text float-end"><i class="bi bi-pencil-square"></i></p>
																<p class="card-text float-end"><i class="bi bi-trash-fill"></i></p>
																<p class="card-title">Farm abc (Opean Farm)</p>
																<p class="card-text">Crop Type: Paddy Field</p>
																<p class="card-text float-end mt-0">17 Jan 2021</p><br>
																<p class="card-text float-end mt-0">48 Days till today</p>
																<div class="pt-2 d-block">
																	<span class="text">Crop should be XYZ</span><br>
																	<span class="text">Weather is sunny. Row your harvest.</span>
																</div>
																<p class="float0-end">2 Acre</p>

															</div>
														</div>
													</div>
												</div> 
												<!-- <div id="showFarms" align="center" style="overflow: auto;height: auto;font-size:16px;">
														<div class="loadFarms"></div>
												</div> -->
											</div>
										</div>
										
									</div>

									

								</div>
							</main>

					
						</div>
					</div> ';
			}?>


	<link rel="stylesheet" href="https://openlayers.org/en/latest/css/ol.css" />
	<script type="text/javascript" src="https://cdn.rawgit.com/Viglino/ol-ext/master/dist/ol-ext.min.js"></script>
	<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.29.2/sweetalert2.all.js"></script>
	<!-- <script type="text/javascript" src="resources/js/mapDisplay.js"></script> -->
	/* <script type="text/javascript" src="Main.js"></script> */
	<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</body>

</html>