sap.ui.define([
	"sap/m/Input",
	"sap/m/MessageToast"
], function(Input, MessageToast) {
	"use strict";

	return Input.extend("com.mrb.customcontrol.controls.ExtendedInput", {

		metadata: {
			properties: {
				testProperty: {
					type: "string",
					defaultValue: "someTestProperty"
				}
			},
			events: {
				onSelect: {
					allowPreventDefault: true,
					parameters: {
						"parameterOne" : {type: "string"}
					}
				}
			},
		},

		init: function() {
			Input.prototype.init.call(this);
			//tell attach us to the event and call our method
			this.attachValueHelpRequest(this.onValueHelpRequest);
			//no need for onChange to be attached here, idk why~
			this.attachChange(this.onChange);
		},

		onValueHelpRequest: function(){
			MessageToast.show("onValueHelpRequest has been fired");
			this.fireEvent("onSelect", {
				parameterOne: "someText" 
			})
		},
		//onChange is being inherited from sap.m.InputBase
		onChange: function() {
			MessageToast.show("onChange has been fired");
		},
		//use standard renderer
		renderer: "sap.m.InputRenderer"
	});
});