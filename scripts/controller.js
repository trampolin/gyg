function requestInterface(aInterface,aFunction,aData,aSuccess,aFail) {
	var requestInterfaceFail = function(xhr,status,error) {
		showNotification(xhr.responseText,'bad');
	};

	var params = {					
					intf: aInterface,
					func: aFunction,
					data: (aData == undefined ? null : aData)};
	
	if (aFail==undefined) {
		aFail = requestInterfaceFail;
	};
	
	$.ajax(
		{
			url: "./classes/requesthandler/requesthandler.php",
			data: JSON.stringify(params),
			dataType : "json",
			contentType: 'application/json; charset=UTF-8',
			type: "POST",
			beforeSend: function() { $.blockUI(
															{ 
																css: 
																{ 
																	border: 'none', 
																	padding: '15px', 
																	backgroundColor: '#000', 
																	'-webkit-border-radius': '10px', 
																	'-moz-border-radius': '10px',
																	'border-radius': '10px',
																	opacity: .5, 
																	color: '#fff' 
																}, 
																overlayCSS: 
																{ 
																	backgroundColor: '#888' 
																},
																message: null //$('#loading')
															});
															setTimeout("$('#throbber').attr('src', 'images/throbber.png');",100);	},
			complete: function() { $.unblockUI(); },
			success: aSuccess,
			error: aFail
		}
	)
}

function requestBandList(aRootItemId, aItemClass) {
	var requestBandListCallback = function(response) {
		if (checkResult(response)) 
		{
			$("#"+aRootItemId).html("");
			for (var band in response.data)
			{
				$("#"+aRootItemId).append(createBand("round contentitem",response.data[band]));
			}
		}
		else
		{
			showNotification(response.message,'bad');
		}
	};
	requestInterface("BandInterface","getBands",undefined,requestBandListCallback,undefined);
}

function requestBand(aRootItemId, aItemClass, aBandId) {
	var requestBandListCallback = function(response) {
		if (checkResult(response)) 
		{
			$("#"+aRootItemId).html("");
			for (var band in response.data)
			{
				$("#"+aRootItemId).append(createBand("round contentitem",response.data[band]));
			}
		}
		else
		{
			showNotification(response.message,'bad');
		}
	};
	requestInterface("BandInterface","getBand",aBandId,requestBandListCallback,undefined);
}

function requestVenueList(aRootItemId, aItemClass, aVenueId) {

	var requestVenueListCallback = function(response) {
		if (checkResult(response)) 
		{
			var innerHTML = "";
			$("#"+aRootItemId).html("");
			for (var venue in response.data)
			{
				$("#"+aRootItemId).append(createVenue('round contentitem',response.data[venue]));
			}
		}
		else
		{
			showNotification(response.message,'bad');
		}		
	};
	requestInterface("VenueInterface","getVenues",{venueid: aVenueId},requestVenueListCallback,undefined);
}

function requestGigList(aRootItemId, aItemClass) {
	var requestGigListCallback = function(response) {
		if (checkResult(response)) 
		{
			$("#"+aRootItemId).html("");
			for (var gig in response.data)
			{
				$("#"+aRootItemId).append(createGig(aItemClass,response.data[gig]));
			}
		}
		else
		{
			showNotification(response.message,'bad');
		}		
	};
	requestInterface("GigInterface","getGigs",undefined,requestGigListCallback,undefined);
}

function requestGigDetails(aRootItemId, aItemClass, aId) {
	var requestGigListCallback = function(response) {
		if (checkResult(response)) 
		{
			var innerHTML = "";
			for (var gig in response.data)
			{
				innerHTML = "details"
			}
		
			$("#"+aRootItemId).html(innerHTML);
		}
		else
		{
			showNotification(response.message,'bad');
		}		
	};
	requestInterface("GigInterface","getGigDetails",aId,requestGigListCallback,undefined);
}