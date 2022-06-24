<!doctype html>
<html lang="en">

<head>
	<title></title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet">

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

	<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.29.2/sweetalert2.all.js"></script>

	<link rel="stylesheet" href="./login/css/style.css">

</head>

<body>
	<?php
	session_start();
	if (isset($_SESSION['UserID'])) {
		header("Location: user.php");
		exit;
	}

	if (isset($_SESSION["err"])) {
		if ($_SESSION["err"] === "notfound") {
			$err = "Invalid phone or password";
			echo "<script>Swal.fire({
			type: 'error',
			title: ' $err ',
		  });</script>";
			unset($_SESSION["err"]);
		}
	}
	?>
	<section class="ftco-section" style="height: 100vh;">
		<div class="container">
			<div class="row justify-content-center container-fluid img-fluid" style="height: 71.3vh; border:1px solid white; box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25); background: url('./img/photos/background.svg'); background-repeat: no-repeat;background-size: cover; background-position: center;">
				<div class="col-md-6">
					<!-- here is the carousel	 -->
					<div id="carouselExampleIndicators" class="carousel slide mx-auto 	" data-ride="carousel" style="width:350px;height:250px; background:none;margin-top: 120px;">
						<ol class="carousel-indicators">
							<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
							<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
							<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
						</ol>
						<div class="carousel-inner">
							<div class="carousel-item active" style="background:none;">
								<img class="d-block w-100 img-fluid" src="./login/images/agriloss.svg" alt="First slide"><br><br>

								<h3 style="color:white;" class="center">Agricultural loss</h3>
								<p style="color:white;" class="center">Using multi-satellite data, crop health can be monitored and crop loss can be predicted.</p>
							</div>
							<div class="carousel-item">
								<img class="d-block w-100 img-fluid" src="./login/images/flood.svg" alt="Second slide"><br><br>
								<h3 style="color:white;" class="center">Flood</h3>
								<p style="color:white;" class="center">The destruction caused by a flood depends essentially on its severity, extent, and its location. Even after the water has receded, devastation usually lasts.</p>
							</div>
							<div class="carousel-item">
								<img class="d-block w-100 img-fluid" src="./login/images/quake.svg" alt="Third slide"><br><br>

								<h3 style="color:white;" class="center">Earth Quake</h3>
								<p style="color:white;" class="center"> At the Earth's surface, earthquakes manifest themselves by shaking and displacing or disrupting the ground resulting from the unexpected release of energy in the Earth's lithosphere that generates seismic waves.</p>
							</div>
						</div>

					</div>

				</div>
				<div class="col-md-6">
					<div class="login-wrap p-4 p-md-5">
						<div class="">
							<div class="w-100">
								<h2 class="mb-4  d-flex justify-content-end">Welcome!</h2>
							</div>
							<div class="w-100">

								<p class="social-media d-flex justify-content-end">
									<!-- <a href="#" class="social-icon d-flex align-items-center justify-content-center"><span class="fa fa-facebook"></span></a> -->
									<!-- <a href="#" class="social-icon d-flex align-items-center justify-content-center"><span class="fa fa-twitter"></span></a> -->
								</p>
							</div>
						</div>

						<!-- <p class="text-center">Not a member? <a data-toggle="tab" href="#signup">Sign Up</a></p> -->
					</div>
					<form action="loginVerify.php" method="post" class="signin-form">
						<div class="form-group mb-3 d-flex align-items-center flex-column">
							<label class="label" for="name">UserName</label>
							<input type="text" class="form-control" placeholder="Username" oninvalid="this.setCustomValidity('Please enter your user name.')" oninput="this.setCustomValidity('')" maxlength="11" name="username" required>
						</div>
						<div class="form-group mb-3 d-flex align-items-center flex-column">
							<label class="label" for="password">Password</label>
							<input type="password" class="form-control" placeholder="Password" name="password" oninvalid="this.setCustomValidity('Please enter your password.')" oninput="this.setCustomValidity('')" maxlength="20" onkeypress="return /[A-Za-z0-9@_]/i.test(event.key)" required>
						</div>
						<div class="form-group">
							<div class="button-div d-flex justify-content-center"> <button type="submit" class="login-button">Login</button>
							</div>
						</div>
						<div class="form-group d-md-flex">
							<div class="w-50 text-left">
								<!-- <label class="checkbox-wrap checkbox-primary mb-0">Remember Me -->
								<!-- <input type="checkbox" checked> -->
								<!-- <span class="checkmark"></span> -->
								</label>
							</div>
							<!-- <div class="w-50 text-md-right"> -->
							<!-- <a href="#">Forgot Password</a> -->
						</div>
				</div>
				</form>

			</div>
		</div>
		</div>
		</div>
	</section>

	<script src="./login/js/jquery.min.js"></script>
	<script src="./login/js/popper.js"></script>
	<script src="./login/js/bootstrap.min.js"></script>
	<script src="./login/js/main.js"></script>

</body>

</html