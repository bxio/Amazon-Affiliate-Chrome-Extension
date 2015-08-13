// analytics

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    //Show the link icon for any page with ASIN number
    if(getASIN(tab.url)) {
      chrome.pageAction.show(tabId);
      chrome.pageAction.setIcon({tabId : tab.id, path : '/images/link.png'});
      //Redirect to correct url if url doesn't contain link
      //chrome.tabs.update(tab.id, {url: "http://billxiong.com"});
      var code = localStorage['affiliate_code'] || 'bxio-20';
      if(getAffiliate(tab.url)!=code){
        //chrome.tabs.update(tab.id, {url: 'http://' + getCountry(tab.url) + '/dp/' + getASIN(tab.url) + (code ? '/?tag=' + code : '')});
      }
    }
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  // use bitly api to shorten link?

  // put shortlink on clipboard
  var code = localStorage['affiliate_code'] || 'bxio-20';

  //TODO: change this according to country
  copyToClipboard(getCountry(tab.url) + '/dp/' + getASIN(tab.url) + (code ? '/?tag=' + code : ''));

  // change page action icon
  chrome.pageAction.setIcon({tabId : tab.id, path : '/images/link_clicked.png'});
  // change the icon back after a delay
  setTimeout(function() { chrome.pageAction.setIcon({tabId : tab.id, path : '/images/link.png'}) }, 750);

});


// http://stackoverflow.com/questions/1764605/scrape-asin-from-amazon-url-using-javascript
// http://en.wikipedia.org/wiki/Amazon_Standard_Identification_Number
function getAffiliate(url){
  var regex = RegExp('^(http[s]?://)?([\\w.-]+)(:[0-9]+)?/([\\w-%]+/)?(exec/obidos/tg/detail/-|gp/product|o/ASIN|dp|dp/product|exec/obidos/asin)/(\\w+/)?(\\w{10})(.*)?$');
  m = url.match(regex);
  if (m) {
    return m[9];
  }
}


function getASIN(url) {
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

function getShortenedURL(url){
  var code = localStorage['affiliate_code'] || 'bxio-20';
  return getCountry(tab.url) + '/dp/' + getASIN(tab.url) + (code ? '/?tag=' + code : '');
}

