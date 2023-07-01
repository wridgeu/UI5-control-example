sap.ui.define([
	"sap/m/Input",
	"sap/m/InputRenderer",
	"sap/m/Button",
	"sap/m/MessageToast"
],
	/**
	 * @param {sap.m.Input} Input 
	 * @param {sap.m.InputRenderer} InputRenderer 
	 * @param {sap.m.Button} Button 
	 * @param {sap.m.MessageToast} MessageToast 
	 * @returns 
	 */
	(Input, InputRenderer, Button, MessageToast) => {
		"use strict";

		return Input.extend("com.mrb.customcontrol.controls.ExtendedInput", {

			metadata: {
				properties: {
					testProperty: {
						type: "string",
						defaultValue: "someTestProperty"
					}
				},
				aggregations: {
					button: {
						type: "sap.m.Button",
						multiple: false,
						visibility: "public"
					}
				},
				events: {
					onSelect: {
						allowPreventDefault: true,
						parameters: {
							"parameterOne": { type: "string" }
						}
					},
					press: {}
				},
			},

			init() {
				Input.prototype.init.call(this);
				//tell attach us to the event and call our method
				this.attachValueHelpRequest(this.onValueHelpRequest);
				//no need for onChange to be attached here, idk why~
				this.attachChange(this.onChange);
				this.setButton(new Button({
					text: "This is an aggregation",
					press: (evt) => {
						this.firePress(evt)
						MessageToast.show("fired Press event, check console");
					}
				}));
			},

			onValueHelpRequest() {
				MessageToast.show("onValueHelpRequest has been fired");
				this.fireEvent("onSelect", {
					parameterOne: "someText"
				})
			},
			//onChange is being inherited from sap.m.InputBase
			onChange() {
				MessageToast.show("onChange has been fired in extended control");
			},

			/**
			 * 
			 * @param {sap.ui.core.RenderManager} RM 
			 * @param {com.mrb.customcontrol.controls.ExtendedInput} ExtendedInput 
			 */
			renderer(RM, ExtendedInput) {
				InputRenderer.render(RM, ExtendedInput); // use standard renderer
				RM.renderControl(ExtendedInput.getButton()) // renderer custom button aggregation
			}
		});
	});