/*
 *Amazon Affiliate Link
 *http://amaflink.blogspot.com
 *Copyright (c) 2012-2013 Vincent Perta
 *http://www.linkedin.com/pub/vincent-perta/23/720/4b0
 *
 *This program is free software; you can redistribute it and/or
 *modify it under the terms of the GNU General Public License
 *as published by the Free Software Foundation; either version 2
 *of the License, or (at your option) any later version.
 *
 *This program is distributed in the hope that it will be useful,
 *but WITHOUT ANY WARRANTY; without even the implied warranty of
 *MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *GNU General Public License for more details.
 *
 *http://www.gnu.org/licenses/gpl-3.0.txt
 */

var _trackIdKey = "trackId";
var _trackIdKeyDefault = "trackIdDefault";
var _trackIdKey = "trackId";
var _trackIdKeyDefault = "trackIdDefault";
var _trackIdKeyCa = "trackId.ca";
var _trackIdKeyDefaultCa = "trackIdDefault.ca";
var _trackIdKeyUk = "trackId.co.uk";
var _trackIdKeyDefaultUk = "trackIdDefault.co.uk";
var _trackIdKeyDe = "trackId.de";
var _trackIdKeyDefaultDe = "trackIdDefault.de";
var _trackIdKeyEs = "trackId.es";
var _trackIdKeyDefaultEs = "trackIdDefault.es";
var _trackIdKeyFr = "trackId.fr";
var _trackIdKeyDefaultFr = "trackIdDefault.fr";
var _trackIdKeyIt = "trackId.it";
var _trackIdKeyDefaultIt = "trackIdDefault.it";
var _trackIdKeyJp = "trackId.co.jp";
var _trackIdKeyDefaultJp = "trackIdDefault.co.jp";
var _trackIdKeyCn = "trackId.cn";
var _trackIdKeyDefaultCn = "trackIdDefault.cn";

// Saves value to localStorage.
function save_options() {
    localStorage[_trackIdKey]   = document.getElementById(_trackIdKey).value;
    localStorage[_trackIdKeyCa] = document.getElementById(_trackIdKeyCa).value;
    localStorage[_trackIdKeyUk] = document.getElementById(_trackIdKeyUk).value;
    localStorage[_trackIdKeyDe] = document.getElementById(_trackIdKeyDe).value;
    localStorage[_trackIdKeyEs] = document.getElementById(_trackIdKeyEs).value;
    localStorage[_trackIdKeyFr] = document.getElementById(_trackIdKeyFr).value;
    localStorage[_trackIdKeyIt] = document.getElementById(_trackIdKeyIt).value;
    localStorage[_trackIdKeyJp] = document.getElementById(_trackIdKeyJp).value;
    localStorage[_trackIdKeyCn] = document.getElementById(_trackIdKeyCn).value;

    // Update status to let user know options were saved.
    document.querySelector('button').innerHTML = "Saved.";
    // Close tab/popup
    setTimeout(
        function() {
            window.close();
        }, 750);
}

// Restores saved value from localStorage.
function restore_options() {
    var trackId   = localStorage[_trackIdKey];
	var trackIdCa = localStorage[_trackIdKeyCa];
	var trackIdUk = localStorage[_trackIdKeyUk];
	var trackIdDe = localStorage[_trackIdKeyDe];
	var trackIdEs = localStorage[_trackIdKeyEs];
	var trackIdFr = localStorage[_trackIdKeyFr];
	var trackIdIt = localStorage[_trackIdKeyIt];
	var trackIdJp = localStorage[_trackIdKeyJp];
	var trackIdCn = localStorage[_trackIdKeyCn];

    if (!trackId)   { trackId   = localStorage[_trackIdKeyDefault]; }
    if (!trackIdCa) { trackIdCa = localStorage[_trackIdKeyDefaultCa]; }
    if (!trackIdUk) { trackIdUk = localStorage[_trackIdKeyDefaultUk]; }
    if (!trackIdDe) { trackIdDe = localStorage[_trackIdKeyDefaultDe]; }
    if (!trackIdEs) { trackIdEs = localStorage[_trackIdKeyDefaultEs]; }
    if (!trackIdFr) { trackIdFr = localStorage[_trackIdKeyDefaultFr]; }
    if (!trackIdIt) { trackIdIt = localStorage[_trackIdKeyDefaultIt]; }
    if (!trackIdJp) { trackIdJp = localStorage[_trackIdKeyDefaultJp]; }
    if (!trackIdCn) { trackIdCn = localStorage[_trackIdKeyDefaultCn]; }

    var inputbox = document.getElementById(_trackIdKey);
    inputbox.value = trackId;

	document.getElementById(_trackIdKeyCa).value = trackIdCa;
	document.getElementById(_trackIdKeyUk).value = trackIdUk;
	document.getElementById(_trackIdKeyDe).value = trackIdDe;
	document.getElementById(_trackIdKeyEs).value = trackIdEs;
	document.getElementById(_trackIdKeyFr).value = trackIdFr;
	document.getElementById(_trackIdKeyIt).value = trackIdIt;
	document.getElementById(_trackIdKeyJp).value = trackIdJp;
	document.getElementById(_trackIdKeyCn).value = trackIdCn;

    inputbox.focus();
}

// pass Save button clicks to save_options with a small delay
function clickHandler(e) {
    setTimeout(save_options, 100);
}

// if the user pressed enter, imitate the user clicking the Save button.
function keydownHandler(e) {
    var keyCode = e.keyCode;

    // enter key code = 13
    if (keyCode == 13) {
        clickHandler();
    }
}

// Add listeners after the DOM has loaded
document.addEventListener('DOMContentLoaded',
    function() {
        // listen for clicks on the Save button
        document.querySelector('button').addEventListener('click', clickHandler);
        // listen for keypresses
        document.addEventListener('keydown', keydownHandler);
        // Run restore options to load saved values.
        restore_options();
    }
);
