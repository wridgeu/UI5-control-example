sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/Text"
],
	/**
	 * @param {sap.ui.core.Control} Control 
	 * @param {sap.m.Text} Text 
	 * @returns {com.mrb.customcontrol.controls.CCModelReactive}
	 */
	(Control, Text) => {
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

			init() {
				this._textControl = new Text()
				// alternatively you can create & bind an internal default model here
				// and manage it from the outside → `customControl.getModel().setData({<somedata>})`
			},

			onBeforeRendering() {
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
