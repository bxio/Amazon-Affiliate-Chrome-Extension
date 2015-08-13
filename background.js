// analytics

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    //Show the link icon for any page with ASIN number
      //if(getAMZN(tab.url,'ASIN')) {
      chrome.pageAction.show(tabId);
      chrome.pageAction.setIcon({tabId : tab.id, path : '/images/link.png'});
      //Redirect to correct url if url doesn't contain link
      //chrome.tabs.update(tab.id, {url: "http://billxiong.com"});
      var code = localStorage['affiliate_code'] || 'bxio-20';
      if(getAMZN(tab.url,'AFFILIATE')!=code){
        //chrome.tabs.update(tab.id, {url: 'http://' + getCountry(tab.url) + '/dp/' + getASIN(tab.url) + (code ? '/?tag=' + code : '')});
      }
    //}
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  // use bitly api to shorten link?

  // put shortlink on clipboard
  var code = localStorage['affiliate_code'] || 'bxio-20';

  //TODO: change this according to country
  // copyToClipboard(getCountry(tab.url) + '/dp/' + getASIN(tab.url) + (code ? '/?tag=' + code : ''));
  copyToClipboard(getAMZN(tab.url,'COUNTRY') + '/dp/' + getAMZN(tab.url,'ASIN') + (code ? '/?tag=' + code : ''));

  // change page action icon
  chrome.pageAction.setIcon({tabId : tab.id, path : '/images/link_clicked.png'});
  // change the icon back after a delay
  setTimeout(function() { chrome.pageAction.setIcon({tabId : tab.id, path : '/images/link.png'}) }, 750);

});

// http://stackoverflow.com/questions/1764605/scrape-asin-from-amazon-url-using-javascript
// http://en.wikipedia.org/wiki/Amazon_Standard_Identification_Number
// Country = 2
// ASIN = 7
// Affiliate = 9
function getAMZN(url, target){
  var regex = RegExp('^(http[s]?://)?([\\w.-]+)(:[0-9]+)?/([\\w-%]+/)?(exec/obidos/tg/detail/-|gp/product|o/ASIN|dp|dp/product|exec/obidos/asin)/(\\w+/)?(\\w{10})(.*)?$');
  m = url.match(regex);
  if (m) {
    //return m[id];
    if(target=='ASIN'){
      return m[7];
    }else if(target=='COUNTRY'){
      return m[2];
    }else if(target=='AFFILIATE'){
      return m[9];
    }
  }
}

//Newegg: http://www.newegg.ca/Product/Product.aspx?Item=N82E16823816023&AID=10657534&PID=3938566&SID=&nm_mc=AFC-C8JunctionCA&cm_mmc=AFC-C8JunctionCA-_-na-_-na-_-na&utm_medium=affiliates&utm_source=afc-%zn
// http://www.newegg.ca/Product/Product.aspx?Item=N82E16823816023
function getNewegg(url, target){
  var regex = RegExp('^(http[s]?://)?([\\w.-]+)(.*)?$');
  m = url.match(regex);
  if (m) {
    //return m[id];
    if(target=='ASIN'){
      return m[7];
    }else if(target=='COUNTRY'){
      return m[2];
    }else if(target=='AFFILIATE'){
      return m[9];
    }
  }
}
//NCIX: http://www.ncix.com/detail/<ProductName>?affiliateid=<AffilTag>
function getNCIX(url, target){

}

function checkSite(url, target){

}
//System functions follow
function copyToClipboard(str) {
  var temp = document.getElementById('temp');
  temp.value = str;
  temp.select();
  temp.focus();
  document.execCommand('copy');
}
