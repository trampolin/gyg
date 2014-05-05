function showNotification(aMessage,aTheme) {
	$.jGrowl(aMessage, {theme: aTheme});
}

function checkResult(response) {
	return (response != undefined) && (response.result != undefined) && (response.result == "ok");
}

// ---------------------------------------
// ALLGEMEIN

function createSectionHeader(label) {
	var newSectionHeader = document.createElement("div");
	$(newSectionHeader).attr({
			'class': 'contentsectionheader'
	});
	$(newSectionHeader).text(label);
	return newSectionHeader;
}

function createSection() {
	var newSection = document.createElement("div");
	$(newSection).attr({
			'class': 'contentsection'
	});
	return newSection;
}

function createHeader(label) {
	var newHeader = document.createElement( "div" );
	$(newHeader).attr({
			'class': 'contentitemheader bigfont round'
	});
	$(newHeader).text(label);
	return newHeader;
}

// ---------------------------------------
// GIGS

function createBandInGig(gig,band) {
	var newBand = document.createElement('div');
	$(newBand).attr({
			'class': 'contentitemitem round',
			'id':'gig-'+gig.id+'-band-'+band.id
	});
	$(newBand).text(band.name);
	$(newBand).click( function() { requestBand("content","contentitem round",band.id); } );

	return newBand;
}

function createTbaBandInGig(gig,tbaId) {
	var newBand = document.createElement('div');
	$(newBand).attr({
			'class': 'contentitemitem round',
			'id':'gig-'+gig.id+'-tba-'+tbaId
	});
	$(newBand).text("TBA");
	return newBand;
}

function createGig(aItemClass,gig) {
	var newGig = document.createElement( "div" );
	$(newGig).attr({
			'id':'gig-'+gig.id,
			'class': aItemClass
	});

	var newHeaderText = gig.gigdate;
	if (gig.venue != null)
	{
		newHeaderText +=" "+gig.venue.name;
	}

	$(newGig).append(createHeader(newHeaderText));
	$(newGig).append(createSectionHeader("Bands"));
	var newSection = createSection();
	var slots = gig.slots;
	for (var band in gig.bands)
	{
		$(newSection).append(createBandInGig(gig,gig.bands[band]));
		slots--;
	}
	
	$(newGig).append(newSection);
	if (slots > 0 ) 
	{
		$(newGig).append(createSectionHeader("Freie Slots: "+slots));
		var newSection = createSection();
		for (var i = 0; i < slots; i++)
		{
			$(newSection).append(createTbaBandInGig(gig,i));
		}
		$(newGig).append(newSection);
	}
	
	return newGig;
}

// ---------------------------------------
// VENUES

function createVenue(aItemClass,venue) {
	var newVenue = document.createElement( "div" );
	$(newVenue).attr({
			'id':'venue-'+venue.id,
			'class': aItemClass
	});
	$(newVenue).append(createHeader(venue.name));
	return newVenue;
}

// ---------------------------------------
// BANDS

function createBand(aItemClass,band) {
	var newBand = document.createElement( "div" );
	$(newBand).attr({
			'id':'band-'+band.id,
			'class': aItemClass
	});
	$(newBand).append(createHeader(band.name));
	return newBand;
}


// ---------------------------------------
// MAP

function createMap(aRootItemId,aItemClass) {
	$("#"+aRootItemId).html("");
	var mapContainer = document.createElement( "div" );
	$(mapContainer).attr({
			'id':'map',
			'class': aItemClass
	});
	$('#'+aRootItemId).append(mapContainer);
	$(mapContainer).gmap().bind('init', function(ev, map) {
		$(mapContainer).gmap('addMarker', {'position': '51.210622,6.830333', 'bounds': true}).click(function() {
			$(mapContainer).gmap('openInfoWindow', {'content': 'Proberaum'}, this);
		});
	});
	//$('#map_canvas').gmap('refresh');
	
}