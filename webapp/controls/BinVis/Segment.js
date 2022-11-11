sap.ui.define(
	["sap/ui/core/Control", "sap/m/VBox", "sap/m/HBox", "sap/m/Text"],
	/**
	 * @param {typeof sap.ui.core.Control} Control
	 * @param {typeof sap.m.VBox} VBox
	 * @param {typeof sap.m.HBox} HBox
	 * @param {typeof sap.m.Text} Text
	 */
	(Control, VBox, HBox, Text) => {
		"use strict";
		return Control.extend("com.mrb.customcontrol.controls.BinVis.Segment", {
			metadata: {
				properties: {
					segmentId: {
						type: "string",
						defaultValue: "",
					},

					huident: {
						type: "string",
						defaultValue: "empty",
					},

					hutype: {
						type: "string",
						defaultValue: "BINU",
					},

					product: {
						type: "string",
						defaultValue: "",
					},

					batch: {
						type: "string",
						defaultValue: "",
					},

					quantity: {
						type: "string",
						defaultValue: "",
					},

					stockUnit: {
						type: "string",
						defaultValue: "",
					},

					sled: {
						type: "string",
						defaultValue: "",
					},

					state: {
						type: "string",
						defaultValue: "E",
					},

					logpos: {
						type: "int",
						defaultValue: -1,
					},

					selected: {
						type: "string",
						defaultValue: "U",
					},
				},

				aggregations: {
					boxLayout: {
						type: "sap.m.VBox",
						multiple: false,
						visibility: "public",
					},
				},

				events: {
					click: {
						enablePreventDefault: true,
					},
				},
			},

			_getBoxLayout() {
				// States: A: Active, L: Loaded, E: Empty
				const resourceBundle = this.getModel("i18n").getResourceBundle();
				const items = [];

				// In case of an empty HU, we only render the Huident
				if (this.getState() === "E") {
					// VBox with Huident
					items.push(
						new VBox({
							renderType: "Bare",
							width: "100%",
							height: "100%",
							justifyContent: "End",
							alignItems: "End",
							items: [
								new Text({
									text: this.getHuident(),
								}).addStyleClass("smallText sapUiTinyMargin"),
							],
						})
					);

					// create box
					return new VBox({
						renderType: "Bare",
						fitContainer: true,
						alignContent: "Center",
						alignItems: "Center",
						items: items,
					}).addStyleClass("huContainer");
				}

				// For the remaining HU States, all Data should be rendered

				// Product
				items.push(
					new Text({
						text: `${resourceBundle.getText(
							"picking.txtProduct"
						)}: ${this.getProduct()}`,
					}).addStyleClass("sapUiTinyMarginTop")
				);

				// Charge
				items.push(
					new Text({
						text: `${resourceBundle.getText("picking.txtBatch")}: ${this.getBatch()}`,
					}).addStyleClass("sapUiTinyMarginTop")
				);

				// Quantity
				const itemQuantity = new HBox({
					renderType: "Bare",
					width: "100%",
					justifyContent: "Start",
					items: [
						new Text({
							text: `${resourceBundle.getText(
								"picking.txtStockQuantity"
							)}: ${this.getQuantity()} ${this.getStockUnit()}`,
						}).addStyleClass("smallText sapUiTinyMargin"),
					],
				});

				// SLED and Huident
				const itemsBottom = new HBox({
					width: "100%",
					justifyContent: "SpaceBetween",
					renderType: "Bare",
					items: [
						new Text({
							text: `${resourceBundle.getText("picking.txtSled")}: ${this.getSled()}`,
						}).addStyleClass("smallText sapUiTinyMargin"),
						new Text({
							text: this.getHuident(),
						}).addStyleClass("smallText sapUiTinyMargin"),
					],
				});

				// Add SLED and Huident as Item
				items.push(
					new VBox({
						width: "100%",
						height: "100%",
						justifyContent: "End",
						renderType: "Bare",
						items: [itemQuantity, itemsBottom],
					})
				);

				// create box
				return new VBox({
					fitContainer: true,
					alignContent: "Center",
					alignItems: "Center",
					items: items,
					renderType: "Bare",
				}).addStyleClass("huContainer");
			},

			renderer: {
				apiVersion: 2,
				render(oRM, oControl) {
					oRM.openStart("div", oControl);
					oRM.style("width", "100%");
					oRM.style("flex", "1 1 49%");

					// Set Class based on HU State
					switch (oControl.getState()) {
						case "A":
							oRM.class("greenContainer");
							break;
						case "L":
							oRM.class("yellowContainer");
							break;
						case "E":
							oRM.class("grayContainer");
							break;
						default:
							oRM.class("grayContainer");
							break;
					}

					if (oControl.getSelected() === "S") {
						oRM.class("selected");
					}

					oRM.openEnd();
					oRM.renderControl(oControl._getBoxLayout());
					oRM.close("div");
				},
			},
		});
	}
);
