/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"bp/bp99/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
