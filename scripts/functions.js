function showNotification(aMessage,aTheme) {
	$.jGrowl(aMessage, {theme: aTheme});
}

function checkResult(response) {
	return (response != undefined) && (response.result != undefined) && (response.result == "ok");
}

// ---------------------------------------
// HTML for GIGLIST

function getBandInGigHTML(band) {
  return "<div class='round contentitemitem' id='band-"+band.id+"'>"+band.name+"</div>\n";
}

function getTbaBandInGigHTML(tbaId) {
	return "<div class='round contentitemitem' id='band-"+tbaId+"'>TBA</div>\n";
}

function getGigHeaderHTML(aRootItemId, aItemClass,gig) {
	var innerHTML = "<div class='bigfont round contentitemheader'>"+gig.gigdate;
	if (gig.venue != null)
	{
		innerHTML = innerHTML+" "+gig.venue.name;
	}
	innerHTML = innerHTML+"</div>\n";
	return innerHTML;
}

function getGigHTML(aRootItemId, aItemClass,gig) {

	clickText = '';//'requestGigDetails(\"gig-'+response.data[gig].id+'\",\"\",'+response.data[gig].id+')';
	var innerHTML = "<div class='"+aItemClass+"' id='gig-"+gig.id+"'>";

	innerHTML = innerHTML+getGigHeaderHTML(aRootItemId, aItemClass,gig);
	var slots = gig.slots;
	for (var band in gig.bands)
	{
		innerHTML = innerHTML+getBandInGigHTML(gig.bands[band]);
		slots--;
	}
	if (slots > 0) 
	{
		for (var i = 0; i < slots; i++)
		{
			innerHTML = innerHTML+getTbaBandInGigHTML(i);
		}
	}
	innerHTML = innerHTML+"</div>\n";
	return innerHTML;
}