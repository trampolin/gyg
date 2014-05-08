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
<script src="scripts/ContentItem.js" type="text/javascript"></script>
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
							CreateTestContent();
						</script>
						
						<!--div class='contentitem round' id="test-content">
							<div class="contentitemcontent">
								<div class="contentitemheader bigfont round">Test Content</div>
								<div class="contentsectionheader">Test Section Header</div>
								<div class="contentsection">
									<div class="contentitemitem round">Test 1</div>
									<div class="contentitemitem round">Test 2</div>
									<div class="contentitemitem round">Test 3</div>
								</div>
							</div>
							<div class="contentitemsidebar">
								Sidebar
							</div>
						</div-->
						
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