document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('amzncode').value = localStorage['amzn_code'] || '';
  document.getElementById('ncixcode').value = localStorage['ncix_code'] || '';
  document.getElementById('neweggcode').value = localStorage['newegg_code'] || '';

	document.getElementById('save').addEventListener('click', function() {
		localStorage['amzn_code'] = document.getElementById('amzncode').value;
    localStorage['ncix_code'] = document.getElementById('ncixcode').value;
    localStorage['newegg_code'] = document.getElementById('neweggcode').value;

		var status = document.getElementById('status');
		status.innerText = 'Options Saved.';
		setTimeout(function() {
			status.innerText = '';
		}, 750);
	});
});
