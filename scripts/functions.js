function showNotification(aMessage,aTheme) {
	$.jGrowl(aMessage, {theme: aTheme});
}

function checkResult(response) {
	return (response != undefined) && (response.result != undefined) && (response.result == "ok");
}