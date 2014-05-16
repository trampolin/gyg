<?php
	define("ROOT_DIR", ".");
	// checking for minimum PHP version
	if (version_compare(PHP_VERSION, '5.3.7', '<')) {
			exit("Sorry, Simple PHP Login does not run on a PHP version smaller than 5.3.7 !");
	} else if (version_compare(PHP_VERSION, '5.5.0', '<')) {
			require_once(ROOT_DIR."/libraries/password_compatibility_library.php");
	}
	require_once(ROOT_DIR."/config/db.php");
	require_once(ROOT_DIR."/classes/login/Login.php");
	
	$login = new Login();
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
<link rel="shortcut icon" type="image/x-icon" href="images/guitar.ico">
<link rel="stylesheet" type="text/css" href="style.css">
<link rel="stylesheet" type="text/css" href="jquery.jgrowl.css">
<title>Get Your Gig</title>
<script src="scripts/jquery-2.1.0.js" type="text/javascript"></script> 
<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js"></script>
<script src="scripts/jquery.blockUI.js" type="text/javascript"></script>
<script src="scripts/jquery.jgrowl.js" type="text/javascript"></script>
<script src="scripts/controller.js" type="text/javascript"></script>
<script src="scripts/functions.js" type="text/javascript"></script>
<script src="scripts/classes/ContentItem.js" type="text/javascript"></script>
<script src="scripts/classes/Gig.js" type="text/javascript"></script>
<script src="scripts/classes/Venue.js" type="text/javascript"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
<script src="scripts/jquery.ui.map.full.min.js" type="text/javascript"></script>
</head>
<body>
	<div id="everything" class="round fullwidth">
		<div id="header" class="round innerfull"></div>
		<?php 
			if ($login->isUserLoggedIn() == true) { ?>
				<div id="navigation" class="round innerfull bigfont">
					<div class="navigationitem round" id="navigetbands" onClick="requestBandList('content','contentitem round')">Bands</div>
					<div class="navigationitem round" id="navigetvenues" onClick="requestVenueList('content','contentitem round',null)">Venues</div>
					<div class="navigationitem round" id="navigetgigs" onClick="requestGigList('content','contentitem round')">Gigs</div>
					<div class="navigationitem round" id="navigetmap" onClick="createMap('content','contentitem round')">Map</div>
				</div>
		<?php } ?>
		<div id="content" class="innerfull round">
			<?php		
				if ($login->isUserLoggedIn() == true) { ?>
						<script type="text/javascript">
							showNotification('Logged in','good');
						</script>
						
						<div class="contentitem round" id="gig-3">
							<div class="contentitemheader bigfont round">2014-06-05 Club1</div>
							<div class="contentsectioncontainer">
								<div class="contentsectionheader">Bands: 2 / 4</div>
								<div class="contentsection">
									<div class="contentitemitem round" id="gig-3-band-6">Broilers</div>
									<div class="contentitemitem round" id="gig-3-band-5">Rogers</div>
									<div class="contentitemline">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et do</div>
								</div>
								
							</div>
							<div class="contentsectioncontainer">
								<div class="contentsectionheader">Freie Slots: 2</div>
								<div class="contentsection">
									<div class="contentitemitem round" id="">TBA</div>
									<div class="contentitemitem round" id="">TBA</div>
								</div>
							</div>
						</div>
						
						
				<?php } else {
						include("views/login.php");
				}
			?>
		</div>
		
		<div id="footer" class="round innerfull">
			<a href="index.php?logout">logout</a>
		</div>
	</div>
</body>
</html>