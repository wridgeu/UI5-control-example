sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
],
	/**
	 * @param {sap.ui.model.json.JSONModel} JSONModel 
	 * @param {sap.ui.Device} Device 
	 * @returns {Object}
	 */
	(JSONModel, Device) => {
		"use strict";

		return {
			createDeviceModel: function () {
				const oModel = new JSONModel(Device);
				oModel.setDefaultBindingMode("OneWay");
				return oModel;
			}
		};
	});
