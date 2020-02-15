sap.ui.define([
    "sap/ui/core/Control"
], function(Control) {
	"use strict";

	return Control.extend("com.mrb.customcontrol.controls.CustomControl", {

		metadata: {
			properties: {
                value: 	{type : "string", defaultValue : "Your text here ..."}
			},
			aggregations: {
                //hidden means the aggregation is 'private':
                //getter/setter won't be generated
                _label : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
			},
			events: {
			},
		},

		init: function() {
            Control.prototype.init.call(this);
            this.setAggregation("_label", new sap.m.Label({
                text: this.getValue()
            }));
		},
        setValue: function (iValue) {
			this.setProperty("value", iValue, true);
			this.getAggregation("_label").setText(iValue);
		},
        renderer: function(oRM, oCustomControl){

            // oRM.openStart("div", oCustomControl);
            //the optimized way:
            oRM.openStart("div", oCustomControl.getId()+"-suffix")
            oRM.class("someCSSClassHere");
            oRM.openEnd();
            oRM.renderControl(oCustomControl.getAggregation("_label", oCustomControl)); 
            oRM.close("div")

            // The old way:
            // oRM.write("<div");
			// oRM.writeControlData(oCustomControl);
			// oRM.addClass("someCSSClass");
			// oRM.writeClasses();
			// oRM.write(">");
            // oRM.renderControl(oCustomControl.getAggregation("_label", oCustomControl));
            // oRM.write("</div>");
		} 
	});
});