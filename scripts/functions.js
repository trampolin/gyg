function showNotification(aMessage,aTheme) {
	$.jGrowl(aMessage, {theme: aTheme});
}

function showDebugNotification(aMessage) {
	$.jGrowl(aMessage, {theme: 'debug'});
}

function checkResult(response) {
	if (response != undefined)
	{
		if (debug && response.debugInfo != null)
		{
			showDebugNotification(response.debugInfo);
		}
		return (response.result != undefined) && (response.result == "ok")
	}
	else
	{
		return false;
	}

}

// ---------------------------------------
// CONTENTITEM


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
	
	var newHeader = createHeader(venue.name);
	$(newVenue).append(newHeader);
	
	// ####################
	
	var mapContainer = document.createElement( "div" );
	$(mapContainer).attr({
			'id':'venue-'+venue.id+'-map',
			'class': 'venuemap round'
	});
	$(newVenue).append(mapContainer);
	$(mapContainer).gmap().bind('init', function(ev, map) {
		//requestVenueMapMarkers(mapContainer);
	});
	
	// ####################
	
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
	$(newBand).click( function() { requestBand("content","contentitem round",band.id); } );
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
		requestVenueMapMarkers(mapContainer);
	});
	
}

// --- CLASS STUFF

Function.prototype.inheritsFrom = function( parentClassOrObject ){ 
	if ( parentClassOrObject.constructor == Function ) 
	{ 
		//Normal Inheritance 
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
	} 
	else 
	{ 
		//Pure Virtual Inheritance 
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject;
	} 
	return this;
} 