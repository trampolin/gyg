function showNotification(aMessage,aTheme) {
	$.jGrowl(aMessage, {theme: aTheme});
}

function checkResult(response) {
	return (response != undefined) && (response.result != undefined) && (response.result == "ok");
}

function getBandInGigHTML(band) {
  return "<div class='round contentitemitem' id='band-"+band.id+"'>"+band.name+"</div>\n";
}

function getGigHeaderHTML(aRootItemId, aItemClass,gig) {
	var innerHTML = "";
	clickText = '';//'requestGigDetails(\"gig-'+response.data[gig].id+'\",\"\",'+response.data[gig].id+')';
	innerHTML = innerHTML+"<div class='"+aItemClass+"' id='gig-"+gig.id+"' onClick='"+clickText+"'>"+
		"<div class='bigfont round contentitemheader'>"+gig.gigdate;
	
	if (gig.venue != null)
	{
		innerHTML = innerHTML+" "+gig.venue.name;
	}
	innerHTML = innerHTML+"</div>\n";
	return innerHTML;
}