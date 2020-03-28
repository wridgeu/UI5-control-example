sap.ui.define([
	"sap/m/Input",
	"sap/m/Button",
	"sap/m/MessageToast"
], function(Input, Button, MessageToast) {
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
					multiple: false
				}
			},
			events: {
				onSelect: {
					allowPreventDefault: true,
					parameters: {
						"parameterOne" : {type: "string"}
					}
				},
				press: {}
			},
		},

		init: function() {
			var that = this;
			Input.prototype.init.call(this);
			//tell attach us to the event and call our method
			this.attachValueHelpRequest(this.onValueHelpRequest);
			//no need for onChange to be attached here, idk why~
			this.attachChange(this.onChange);
			this.oButton = new Button({
				text: "This is an aggregation",
				press: function(oEvt){
					that.firePress(oEvt)
				}
			});
			this.setAggregation("button", this.oButton)
		},

		onValueHelpRequest: function(){
			MessageToast.show("onValueHelpRequest has been fired");
			this.fireEvent("onSelect", {
				parameterOne: "someText" 
			})
		},
		//onChange is being inherited from sap.m.InputBase
		onChange: function() {
			MessageToast.show("onChange has been fired in extended control");
		},
		//use standard renderer
		renderer: function(oRm, oCustomControl){
			sap.m.InputRenderer.render(oRm, oCustomControl);
			oRm.renderControl(oCustomControl.getAggregation("button"))
		} 
	});
});