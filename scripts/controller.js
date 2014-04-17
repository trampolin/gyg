function doServerRequest(aData,aSuccessCallback,aErrorCallback) {
	var val = $.toJSON(aData);
	$.ajax(
		{
			url: "./classes/requesthandler/requesthandler.php",
			data: val,
			dataType : "json",
			contentType: 'application/json; charset=UTF-8',
			type: "POST",
			success: aSuccessCallback,
			error: aErrorCallback
		}
	)
}