sap.ui.define(
	["sap/ui/core/Control", "sap/ui/dom/includeStylesheet"],
	/**
	 * @param {sap.ui.core.Control} Control
	 * @param {sap.ui.dom.includeStylesheet} includeStylesheet
	 */
	(Control, includeStylesheet) => {
		"use strict";

		return Control.extend("com.mrb.customcontrol.controls.BinVis.BinVis", {
			metadata: {
				properties: {
					width: {
						type: "sap.ui.core.CSSSize",
					},

					height: {
						type: "sap.ui.core.CSSSize",
					},
				},
				aggregations: {
					segments: { type: "com.mrb.customcontrol.controls.BinVis.Segment", multiple: true, singularName: "segment" },
				},
				defaultAggregation: "segments",
			},

			init() {
				includeStylesheet(sap.ui.require.toUrl("com/mrb/customcontrol/controls/BinVis/style.css"))
			},

			renderer: {
				apiVersion: 2,
				render(oRM, oControl) {
					oRM.openStart("div", oControl)
						.style("height", oControl.getHeight())
						.style("width", oControl.getWidth())
						.openEnd();
					oRM.openStart("div", oControl)
						.style("height", "100%")
						.style("width", "100%")
						.style("display", "flex")
						.style("flex-wrap", "wrap")
						.openEnd();
					oControl.getSegments().forEach((segment) => {
						oRM.renderControl(segment);
					})
					oRM.close("div");
					oRM.close("div");
				},
			}
		})
	}
);
