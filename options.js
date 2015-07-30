document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('code').value = localStorage['affiliate_code'] || '';

	document.getElementById('save').addEventListener('click', function() {
		localStorage['affiliate_code'] = document.getElementById('code').value;

		var status = document.getElementById('status');
		status.innerText = 'Options Saved.';
		setTimeout(function() {
			status.innerText = '';
		}, 750);
	});
});