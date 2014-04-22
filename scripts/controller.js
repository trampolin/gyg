function requestInterface(aInterface,aFunction,aData,aSuccess,aFail) {
	var params = {					
					intf: aInterface,
					func: aFunction,
					data: (aData == undefined ? null : aData)};
	
	$.ajax(
		{
			url: "./classes/requesthandler/requesthandler.php",
			data: JSON.stringify(params),
			dataType : "json",
			contentType: 'application/json; charset=UTF-8',
			type: "POST",
			success: aSuccess,
			error: aFail
		}
	)
}

function checkResult(response) {
	return (response != undefined) && (response.result != undefined) && (response.result == "ok");
}

function writeErrorMessage(aRootItemId, aItemClass, message) {
	$("#"+aRootItemId).html("<div class='"+aItemClass+" errormessage'>"+message+"</div>\n");
}

function requestBandList(aRootItemId, aItemClass) {

	var requestBandListCallback = function(response) {
		if (checkResult(response)) 
		{
			var innerHTML = "";
			for (var band in response.data)
			{
				innerHTML = innerHTML+"<div class='"+aItemClass+"'>"+response.data[band].name+"</div>\n";
			}
		
			$("#"+aRootItemId).html(innerHTML);
		}
		else
		{
			writeErrorMessage(aRootItemId, aItemClass, response.message);
		}
	};
	
	requestInterface("BandInterface","getBands",undefined,requestBandListCallback,undefined);

}

function requestVenueList(aRootItemId, aItemClass) {

	var requestVenueListCallback = function(response) {
		if (checkResult(response)) 
		{
			var innerHTML = "";
			for (var venue in response.data)
			{
				innerHTML = innerHTML+"<div class='"+aItemClass+"'>"+response.data[venue].name+"</div>\n";
			}
		
			$("#"+aRootItemId).html(innerHTML);
		}
		else
		{
			writeErrorMessage(aRootItemId, aItemClass, response.message);
		}		
	};
	
	requestInterface("VenueInterface","getVenues",undefined,requestVenueListCallback,undefined);
}