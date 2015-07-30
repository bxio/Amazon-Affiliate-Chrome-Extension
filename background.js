// analytics

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status === 'complete') {
		// show page action for all Amazon pages
		//var pattern = /(.+:\/\/)?([^\/]+)(\/.*)*/i;
		//var arr = pattern.exec(tab.url);

		//if(arr[2] == 'www.amazon.com') {
		//	chrome.pageAction.show(tabId);
		//}

		// show page action for Amazon pages with an ASIN
		if(getASIN(tab.url)) {
			chrome.pageAction.show(tabId);
      chrome.pageAction.setIcon({tabId : tab.id, path : '/images/link.png'});
		}
	}
});

chrome.pageAction.onClicked.addListener(function(tab) {
	// if the options include an affiliate code then remove any existing codes and set the one from the options

	// use bitly api to shorten link

	// put shortlink on clipboard
	var code = localStorage['affiliate_code'] || '';

  //change this according to country
	//copyToClipboard('http://amzn.com/' + getASIN(tab.url) + (code ? '/?tag=' + code : '/?tag=bxio-20'));

  copyToClipboard(getCountry(tab.url) + '/dp/' + getASIN(tab.url) + (code ? '/?tag=' + code : '/?tag=bxio-20'));

	// show message on page using content script

	// change page action icon
	chrome.pageAction.setIcon({tabId : tab.id, path : '/images/link_clicked.png'});
});


function getASIN(url) {
	// http://stackoverflow.com/questions/1764605/scrape-asin-from-amazon-url-using-javascript
	// http://en.wikipedia.org/wiki/Amazon_Standard_Identification_Number
	var regex = RegExp('^(http[s]?://)?([\\w.-]+)(:[0-9]+)?/([\\w-%]+/)?(exec/obidos/tg/detail/-|gp/product|o/ASIN|dp|dp/product|exec/obidos/asin)/(\\w+/)?(\\w{10})(.*)?$');
	m = url.match(regex);
	if (m) {
		return m[7];
	}
}

function getCountry(url) {
  var regex = RegExp('^(http[s]?://)?([\\w.-]+)(:[0-9]+)?/([\\w-%]+/)?(exec/obidos/tg/detail/-|gp/product|o/ASIN|dp|dp/product|exec/obidos/asin)/(\\w+/)?(\\w{10})(.*)?$');
  m = url.match(regex);
  if (m) {
    return m[2];
  }
}

function copyToClipboard(str) {
	var temp = document.getElementById('temp');
	temp.value = str;
	temp.select();
	temp.focus();
	document.execCommand('copy');
}

// returns the url with key-value pair added to the parameter string.
function insertParam(url, key, value) {
  if (url.indexOf('?') != -1) {//url contains '?'
    var pairset = url.split('&');
    console.log("HELLO WORLD");
    var i = pairset.length;
    var pair;
    //always escape your values!
    key = escape(key);
    value = escape(value);

    while (i--) {
      pair = pairset[i].split('=');
      if (pair[0] == key) {
        pair[1] = value;
        pairset[i] = pair.join('=');
        break;
      }
    }

    if (i < 0) {
      pairset[pairset.length] = [key, value].join('=');
    }
    return pairset.join('&');
  }
  else {
    return url + '?' + [key, value].join('=');
  }
}

