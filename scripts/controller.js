function requestInterfaceCustomBlock(aInterface,aFunction,aData,aSuccess,aFail,aBlock,aUnblock) {
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
			beforeSend: aBlock,
			complete: aUnblock,
			success: aSuccess,
			error: aFail
		}
	)
} 

function requestInterface(aInterface,aFunction,aData,aSuccess,aFail) {
	requestInterfaceCustomBlock(
		aInterface,
		aFunction,
		aData,
		aSuccess,
		aFail,
			function() 
			{ 
				$.blockUI(
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
			}
		,
		function() { $.unblockUI(); }
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
			$("#"+aRootItemId).html("");
			for (var venue in response.data)
			{
				var newVenue = new Venue(response.data[venue]);
				$("#"+aRootItemId).append(newVenue.getDomObject());
				newVenue.afterAppend();
			}
		}
		else
		{
			showNotification(response.message,'bad');
		}		
	};
	requestInterface("VenueInterface","getVenues",{venueid: aVenueId},requestVenueListCallback,undefined);
}

function requestVenueMapMarkers(mapContainer) {
	var requestVenueMapMarkersCallback = function(response) {
		if (checkResult(response)) 
		{
			for (var venue in response.data)
			{
				if (response.data[venue].latitude != "" && response.data[venue].longitude != "" && response.data[venue].latitude != null && response.data[venue].longitude != null)
				{
					$(mapContainer).gmap('addMarker', {'position': response.data[venue].latitude+','+response.data[venue].longitude/*, 'bounds': true*/}).click(function() {
						$(mapContainer).gmap('openInfoWindow', {'content': response.data[venue].name}, this);
					});
				}
				/*else
				{
					$(mapContainer).gmap('search', { 'address': response.data[venue].street+' '+response.data[venue].number+', '+response.data[venue].zip+', '+response.data[venue].city }, function(results, status) {
							if ( status === 'OK' ) 
							{
								$(mapContainer).gmap('addMarker', {'position': results[0].geometry.location, 'bounds': true}).click(function() {
									$(mapContainer).gmap('openInfoWindow', {'content': response.data[venue].name}, this);
								});
							}
					});
				}*/
			}
		}
		else
		{
			showNotification(response.message,'bad');
		}		
	};
	requestInterfaceCustomBlock("VenueInterface","getVenues",null,requestVenueMapMarkersCallback,undefined,undefined,undefined);
}

function requestGigList(aRootItemId, aItemClass) {
	var requestGigListCallback = function(response) {
		if (checkResult(response)) 
		{
			$("#"+aRootItemId).html("");
			for (var gig in response.data)
			{
				//$("#"+aRootItemId).append(createGigNew(response.data[gig]).getDomObject());
				var newGig = new Gig(response.data[gig]);
				$("#"+aRootItemId).append(newGig.getDomObject());
				newGig.afterAppend();
					/*$('#gig-2-map').gmap().bind('init', function(ev, map) {
						$('#gig-2-map').gmap('addMarker', {'position': 50+','+6, 'bounds': true}).click(function() {
							$('#gig-2-map').gmap('openInfoWindow', {'content': response.data[venue].name}, this);
						});
					});*/
				
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