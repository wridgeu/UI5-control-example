sap.ui.define(
	["sap/ui/core/Control", "com/mrb/customcontrol/controls/BoxVis/BoxState", "sap/m/VBox", "sap/m/HBox", "sap/m/Text"],
	/**
	 * @param {sap.ui.core.Control} Control
	 * @param {com.mrb.customcontrol.controls.BoxVis.BoxState} BoxState
	 * @param {sap.m.VBox} VBox
	 * @param {sap.m.HBox} HBox
	 * @param {sap.m.Text} Text
	 * @returns {com.mrb.customcontrol.controls.BoxVis.Box}
	 */
	(Control, BoxState, VBox, HBox, Text) => {
		"use strict";
		return Control.extend("com.mrb.customcontrol.controls.BoxVis.Box", {
			metadata: {
				properties: {
					boxid: {
						type: "string",
						defaultValue: "",
					},
					boxtype: {
						type: "string",
						defaultValue: "BINU",
					},
					logpos: {
						type: "int",
						defaultValue: -1
					},
					state: {
						type: "string",
						defaultValue: BoxState.DEFAULT,
					},
				},
				aggregations: {
					_layout: {
						type: "sap.m.VBox",
						multiple: false,
						visibility: "hidden", // does not generate setter/getter
					},
				},
				events: {
					boxPressed: {
						enablePreventDefault: true,
					},
				},
			},

			init() {
				this._resourceBundle = null;
			},

			/**
			 * Click-Event forwarding
			 * @param {sap.ui.base.Event} event
			 */
			onclick(event) {
				this.fireBoxPressed(event);
			},

			/**
			 * Adds the i18n model of the surrounding application to the internals
			 * of the Control. Depending on the scenario a direct property binding (`{18n>...}`) 
			 * can also be used.
			 * Tech: resolves upwards i.e.: cc → .. → view → component
			 */
			onBeforeRendering() {
				if (!this._resourceBundle) {
					/** @type {sap.base.i18n.ResourceBundle} */
					this._resourceBundle = this.getModel("i18n").getResourceBundle();
				}
			},

			_buildLayout() {
				const layout = [];
				const itemsBottom = new HBox({
					width: "100%",
					justifyContent: "SpaceBetween",
					renderType: "Bare",
					items: [
						new Text({
							text: this._resourceBundle.getText("box.demoText"),
						}).addStyleClass("smallText sapUiTinyMargin"),
						new Text({
							text: `${this.getBoxid()}`,
						}).addStyleClass("smallText sapUiTinyMargin"),
					],
				});

				layout.push(
					new VBox({
						width: "100%",
						height: "100%",
						justifyContent: "End",
						renderType: "Bare",
						items: [itemsBottom],
					})
				);

				const layoutContainer = new VBox({
					fitContainer: true,
					alignContent: "Center",
					alignItems: "Center",
					items: layout,
					renderType: "Bare",
				}).addStyleClass("boxLayout");

				this.setAggregation("_layout", layoutContainer)
				return this.getAggregation("_layout")
			},

			/**
			 * Usually this would be a seperate file "BoxRenderer"
			 */
			renderer: {
				apiVersion: 2,
				/**
				 * @param {sap.ui.core.RenderManager} RM 
				 * @param {com.mrb.customcontrol.controls.BoxVis.Box} Box 
				 */
				render(RM, Box) {
					RM.openStart("div", Box);
					RM.style("width", "100%");
					RM.style("flex", "1 1 49%");

					// Set style based on state
					switch (Box.getState()) {
						case BoxState.ACTIVE:
							RM.class("greenContainer");
							break;
						case BoxState.INACTIVE:
							RM.class("grayContainer");
							break;
						case BoxState.DEFAULT:
							RM.class("grayContainer");
							break;
						default:
							throw new Error("Inconsistent Box state given!");
					}
					RM.openEnd();
					// Retrieve the layout within the renderer to receive binding information
					// completely internally managed aggregations (without binding information)
					// could be handled within the init, depending on the use-case however,
					// we make use of our private aggregation to manage the layout.
					// Always think about against which use-case you develop: 
					// Binding? Internally Managed? Managed by user interaction with default state? Event handling? 
					RM.renderControl(Box._buildLayout());

					RM.close("div");
				},
			},
		});
	}
);
