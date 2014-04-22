function requestInterface(aInterface,aFunction,aData,aSuccess,aFail) {
	var params = {					
					intf: aInterface,
					func: aFunction,
					data: aData};
	
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