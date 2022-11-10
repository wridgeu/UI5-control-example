sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/Text"
], function (Control, Text) {
	"use strict";

	return Control.extend("com.mrb.customcontrol.controls.CCModelReactive", {

		metadata: {
			properties: {
				value: { type: "object" }
			},
			aggregations: {
				text: {
					type: "sap.m.Text",
					multiple: false
				}
			},
		},

		init: function () {
			this._textControl = new Text()
			// alternatively you can create & bind an internal default model here
			// and manage it from the outside → `customControl.getModel().setData({<somedata>})`
		},

		onBeforeRendering: function () {
			this.setAggregation("text", this._textControl.setText(JSON.stringify(this.getValue()) || 'nothing to display - initial'))
		},

		renderer: {
			apiVersion: 2,
			render(rm, control) {
				rm.openStart("div", control).openEnd();
				rm.renderControl(control.getAggregation("text", control));
				rm.close("div")
			}
		}
	});
});