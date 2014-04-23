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
			var innerHTML = "";
			for (var band in response.data)
			{
				clickText = 'requestBand(\"band-'+response.data[band].id+'\",\"\",'+response.data[band].id+')';
				innerHTML = innerHTML+"<div class='"+aItemClass+"' id='band-"+response.data[band].id+"' onClick='"+clickText+"'><div class='bigfont round contentitemheader'>"+response.data[band].name+"</div></div>\n";
				//$('#band-'+response.data[band].id).click(function() { requestBand('#band-'+response.data[band].id,'',response.data[band].id); });
			}
			$("#"+aRootItemId).html(innerHTML);
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
			var innerHTML = "";
			for (var band in response.data)
			{
				//innerHTML = innerHTML+"<div class='"+aItemClass+"'>"+response.data[band].name+"</div>\n";
				innerHTML = "<div class='bigfont round contentitemheader'>"+response.data[band].name+' success'+"</div>";
			}
			$("#"+aRootItemId).html(innerHTML);
		}
		else
		{
			showNotification(response.message,'bad');
		}
	};
	requestInterface("BandInterface","getBand",aBandId,requestBandListCallback,undefined);
}

function requestVenueList(aRootItemId, aItemClass) {

	var requestVenueListCallback = function(response) {
		if (checkResult(response)) 
		{
			var innerHTML = "";
			for (var venue in response.data)
			{
				innerHTML = innerHTML+"<div class='"+aItemClass+"'><div class='bigfont round contentitemheader'>"+response.data[venue].name+"</div></div>\n";
			}
		
			$("#"+aRootItemId).html(innerHTML);
		}
		else
		{
			showNotification(response.message,'bad');
		}		
	};
	requestInterface("VenueInterface","getVenues",undefined,requestVenueListCallback,undefined);
}

function requestGigList(aRootItemId, aItemClass, aGetVenues, aGetBands) {
	var requestGigListCallback = function(response) {
		if (checkResult(response)) 
		{
			var innerHTML = "";
			for (var gig in response.data)
			{
				innerHTML = innerHTML+getGigHTML(aRootItemId, aItemClass,response.data[gig]);
			}
		
			$("#"+aRootItemId).html(innerHTML);
		}
		else
		{
			showNotification(response.message,'bad');
		}		
	};
	requestInterface("GigInterface","getGigs",{getVenues: aGetVenues, getBands: aGetBands},requestGigListCallback,undefined);
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