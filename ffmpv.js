/*
Just draw a border round the document.body.
*/

document.body.style.border = "5px solid red";

var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var ui = require("sdk/ui");
var { env } = require('sdk/system/environment');
const {Cc,Ci} = require("chrome");
var { Hotkey } = require("sdk/hotkeys");
var contextMenu = require("sdk/context-menu");
var querystring = require("sdk/querystring");

function play_video(url) {
    var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsIFile);
    file.initWithPath("/usr/bin/mpv");

    // create an nsIProcess
    var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
    process.init(file);

    args.push(url);

    // process.run(false, args, args.length);
    process.runAsync([url], 1);
}

tabs.on("ready", function(tab) {
    var worker = tab.attach({
        contentScriptFile: data.url("modified-click.js")
    });
    worker.port.on("altClick", function(url) {
        console.log(url);
        play_video(url);
    });
});
