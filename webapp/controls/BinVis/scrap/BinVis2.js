sap.ui.define(
	["sap/ui/core/Control", "sap/ui/dom/includeStylesheet"],
	/**
	 * @param {typeof sap.ui.core.Control} Control
	 * @param {typeof sap.ui.dom.includeStylesheet} includeStylesheet
	 */
	(Control, includeStylesheet) => {
		"use strict";
		return Control.extend("com.mrb.customcontrol.controls.BinVis.BinVis2", {
			metadata: {
				properties: {
					height: { type: "sap.ui.core.CSSSize", defaultValue: "100%" },
					width: { type: "sap.ui.core.CSSSize", defaultValue: "100%" },
					dataModel: { type: "object" },
				},
				aggregations: {
					boxes: { type: "sap.ui.core.Control", multiple: true, singularName: "box" },
				},
				defaultAggregation: "boxes",
			},

			init() {
				includeStylesheet(sap.ui.require.toUrl("com/mrb/customcontrol/controls/BinVis/style/css"))
			},

			/**
			 * Add Box Aggregation for each Handling Unit
			 * @todo Deep Equal might be needed to prevent unnecessary rerendering
			 */
			onBeforeRendering() {
				const boxes = this._createTrayBoxes();
				if (boxes.length > 0) {
					this._cleanupPreviousBoxes();
					boxes.forEach((element, index) => {
						this.insertBox(element, index, true);
					});
				} else {
					this._createDefaultState();
				}
			},

			/**
			 * Uses low-level api `removeAllAggregations` to clean up aggregations.
			 *
			 * It does not remove the resources though!
			 * @see {@link https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.base.ManagedObject%23methods/removeAllAggregation|UI5Docs}
			 *
			 * Might need `true` in `destroy` to suppress invalidation.
			 */
			_cleanupPreviousBoxes() {
				const removedElements = this.removeAllBoxes();
				removedElements.forEach((controlsToBeDeleted) => {
					controlsToBeDeleted.destroy();
				});
			},

			/**
			 * Always initialize a new Tray with a default state
			 * i.e. one or zero boxes, big square in UI, grayed out
			 */
			_createDefaultState() {
				// according to internal feedback, nothing should be shown
			},

			/**
			 * Create Tray Boxes based on data coming via:
			 * setDataModel or Constructor
			 * @returns {typeof com.bmw.kts.d1241.controls.trayvis.box.TrayBoxBH1[] | [] }
			 */
			_createTrayBoxes() {
				const binHu = this.getDataModel();
				if (binHu?.items || binHu?.items?.length) {
					return binHu.items.map((itemData) => {
						return new TrayBoxFactory(itemData)._createBoxObject();
					});
				} else if (!binHu) {
					/** @todo Refactor TrayBoxFactory */
					return [new TrayBoxFactory(binHu)._createBoxObject()];
				}
				return [];
			},
			renderer: {
				apiVersion: 2,
				render(oRM, oControl) {
					oRM.openStart("div", oControl)
						.style("height", oControl.getHeight())
						.style("width", oControl.getWidth())
						.style("display", "flex")
						.style("flex-wrap", "wrap")
						.openEnd();
					if (
						oControl.getAggregation("boxes") &&
						oControl.getAggregation("boxes").length !== 0
					) {
						oControl.getAggregation("boxes").forEach((box) => {
							oRM.renderControl(box);
						});
					}
					oRM.close("div");
				},
			},
		});
	}
);
