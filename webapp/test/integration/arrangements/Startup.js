sap.ui.define([
	"sap/ui/test/Opa5"
], function(Opa5) {
	"use strict";

	return Opa5.extend("sapmarco.control_playground.test.integration.arrangements.Startup", {

		iStartMyApp: function () {
			this.iStartMyUIComponent({
				componentConfig: {
					name: "sapmarco.control_playground",
					async: true,
					manifest: true
				}
			});
		}

	});
});
