function handleError(message) {
	$('#errorMessage').text(message);
}

function hideMessage(id) {
	$(id).text('');
}

function handleSuccess(message) {
	$('#successMessage').text(message);
}

function redirect(response) {
	window.location = response.redirect;
}

function sendAjax(type, action, data, success) {
	$.ajax({
		cache: false,
		type: type,
		url: action,
		data: data,
		dataType: 'json',
		success: success,
		error: function(xhr, status, error) {
			var messageObj = JSON.parse(xhr.responseText);
			handleError(messageObj.error);
		}
	});
}

function sendAjax(type, action, data, success, error) {
	$.ajax({
		cache: false,
		type: type,
		url: action,
		data: data,
		dataType: 'json',
		success: success,
		error: error
  });
}
