sap.ui.define([
	"sap/ui/core/UIComponent",
	"com/mrb/customcontrol/model/models"
],
	/**
	 * @param {sap.ui.core.UIComponent} UIComponent 
	 * @param {com.mrb.customcontrol.model.models} models 
	 * @returns {com.mrb.customcontrol.Component}
	 */
	(UIComponent, models) => {
		"use strict";

		return UIComponent.extend("com.mrb.customcontrol.Component", {

			metadata: {
				manifest: "json"
			},

			/**
			 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
			 * @public
			 * @override
			 */
			init() {
				// call the base component's init function
				UIComponent.prototype.init.apply(this, arguments);

				// enable routing
				this.getRouter().initialize();

				// set the device model
				this.setModel(models.createDeviceModel(), "device");
			}
		});
	});
