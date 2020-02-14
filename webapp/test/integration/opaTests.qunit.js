/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"sapmarco/control_playground/test/integration/AllJourneys"
	], function() {
		QUnit.start();
	});
});
