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
						multiple: false,
						visibility: "hidden" // we make use of it internally only (no generation of getter/setter)
					}
				},
			},

			init() {
				// The aggregation could also be created within the XML, declaratively.
				this.setAggregation('text', new Text());
				// alternatively you can create & bind an internal default model here
				// and manage it from the outside → `customControl.getModel().setData({<somedata>})`
			},

			onBeforeRendering() {
				// If you can prevent setting the aggreagtion in a Render hook, you should. Otherwhise (in case it does not need to re-execute), make sure it runs only once.
				// this.setAggregation("text", this._textControl.setText(JSON.stringify(this.getValue()) || 'nothing to display - initial'))
			},

			renderer: {
				apiVersion: 2,
				render(rm, control) {
					rm.openStart("div", control).openEnd();
					rm.renderControl(control.getAggregation("text").setText(JSON.stringify(control.getValue()) || 'nothing to display - initial'));
					rm.close("div");
				}
			}
		});
	});
