﻿/*	In order to make the helloWorld() function available client-side, you have to add a reference to the 'Localization' module in the GUI Designer.	The helloWorld() function can be executed from your JS file as follows:	alert(Localization.helloWorld());		For more information, refer to http://doc.wakanda.org/Wakanda0.Beta/help/Title/en/page1516.html*/exports.getTranslation = function helloWorld (language, debug) {	if (debug) {		debugger;	}		var t = loadText('Localization/language + '.js');};