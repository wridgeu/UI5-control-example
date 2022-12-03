sap.ui.define(
	["sap/ui/core/Control", "sap/ui/dom/includeStylesheet", "com/mrb/customcontrol/controls/BoxVis/BoxOrientation"],
	/**
	 * @param {sap.ui.core.Control} Control
	 * @param {sap.ui.dom.includeStylesheet} includeStylesheet
	 * @param {com.mrb.customcontrol.controls.BoxVis.BoxOrientation} BoxOrientation
	 * @returns {com.mrb.customcontrol.controls.BoxVis.Box}
	 */
	(Control, includeStylesheet, BoxOrientation) => {
		"use strict";

		return Control.extend("com.mrb.customcontrol.controls.BoxVis.BoxVis", {
			metadata: {
				properties: {
					orientation: {
						type: "string",
						defaultValue: BoxOrientation.RIGHT
					},
					width: {
						type: "sap.ui.core.CSSSize",
					},

					height: {
						type: "sap.ui.core.CSSSize",
					},
				},
				aggregations: {
					boxes: {
						type: "com.mrb.customcontrol.controls.BoxVis.Box",
						multiple: true,
						singularName: "box",
						bindable: "bindable",
						visibility: "public"
					},
				},
				defaultAggregation: "boxes",
			},

			init() {
				includeStylesheet(sap.ui.require.toUrl("com/mrb/customcontrol/controls/BoxVis/style.css"))
			},

			/**
			 * Usually this would be a seperate file "BoxVisRenderer"
			 */
			renderer: {
				apiVersion: 2,
				/**
				 * @param {sap.ui.core.RenderManager} RM 
				 * @param {com.mrb.customcontrol.controls.BoxVis.BoxVis} BoxVis 
				 */
				render(RM, BoxVis) {
					// Optional: extend this section and add 
					// controls to display parent information 
					// like orientation or outer id
					RM.openStart("div", `${BoxVis}-OuterFrame`)
						.style("height", BoxVis.getHeight())
						.style("width", BoxVis.getWidth())
						.openEnd();
					// alternative to this InnerFrame: 
					// render UI5 native Flex Control
					RM.openStart("div", `${BoxVis}-InnerFrame`)
						.style("height", "100%")
						.style("width", "100%")
						.style("display", "flex")
						.style("flex-wrap", "wrap")
						.openEnd();
					if (BoxVis.getOrientation() === BoxOrientation.RIGHT) {
						BoxVis.getBoxes().forEach((box) => {
							RM.renderControl(box);
						})
					} else {
						BoxVis.getBoxes().reverse().forEach((box) => {
							RM.renderControl(box);
						})
					}
					RM.close("div");
					RM.close("div");
				},
			}
		})
	}
);
