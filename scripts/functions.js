function showNotification(aMessage,aTheme) {
	$.jGrowl(aMessage, {theme: aTheme});
}

function checkResult(response) {
	return (response != undefined) && (response.result != undefined) && (response.result == "ok");
}

// ---------------------------------------
// HTML for GIGLIST

function getGigSectionHeaderHTML(label) {
	return "<div class='contentsectionheader'>"+label+"</div>\n"
}

function getBandInGigHTML(band) {
  return "<a href='#'><div class='contentitemitem round' id='band-"+band.id+"'>"+band.name+"</div></a>\n";
}

function getTbaBandInGigHTML(tbaId) {
	return "<div class='contentitemitem round' id='band-"+tbaId+"'>TBA</div>\n";
}

function getGigHeaderHTML(aRootItemId, aItemClass,gig) {
	var innerHTML = "<div class='contentitemheader bigfont round'>"+gig.gigdate;
	if (gig.venue != null)
	{
		innerHTML +=" "+gig.venue.name;
	}
	innerHTML +="</div>\n";
	return innerHTML;
}

function getGigHTML(aRootItemId, aItemClass,gig) {

	clickText = '';//'requestGigDetails(\"gig-'+response.data[gig].id+'\",\"\",'+response.data[gig].id+')';
	var innerHTML = "<div class='"+aItemClass+"' id='gig-"+gig.id+"'>";

	innerHTML += getGigHeaderHTML(aRootItemId, aItemClass,gig);
	var slots = gig.slots;
	innerHTML+=getGigSectionHeaderHTML("Bands");
	innerHTML+="<div class='contentsection'>";
	for (var band in gig.bands)
	{
		innerHTML += getBandInGigHTML(gig.bands[band]);
		slots--;
	}
	innerHTML+="</div>";
	if (slots > 0) 
	{
		innerHTML+=getGigSectionHeaderHTML("Freie Slots");
		innerHTML+="<div class='contentsection'>";
		for (var i = 0; i < slots; i++)
		{
			innerHTML += getTbaBandInGigHTML(i);
		}
		innerHTML+="</div>";
	}
	innerHTML +="</div>\n";
	return innerHTML;
}