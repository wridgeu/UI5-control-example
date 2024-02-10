sap.ui.define([
    "sap/ui/core/Control"
],
    /**
     * @param {sap.ui.core.Control} Control 
     * @returns {com.mrb.customcontrol.controls.CustomControl}
     */
    (Control) => {
        "use strict";

        return Control.extend("com.mrb.customcontrol.controls.CustomControl", {
            metadata: {
                properties: {
                    value: { type: "string", defaultValue: "Your text here ..." }
                },
                aggregations: {
                    //hidden means the aggregation is 'private' and thus managed internally:
                    //getter/setter won't be generated
                    _label: { type: "sap.m.Label", multiple: false, visibility: "hidden" },
                },
                events: {
                },
            },

            init() {
                Control.prototype.init.call(this);
                this.setAggregation("_label", new sap.m.Label({
                    text: this.getValue()
                }));
            },
            setValue(sValue) {
                this.setProperty("value", sValue, true);
                this.getAggregation("_label").setText(sValue);
            },
            // The new way:
            renderer: {
                apiVersion: 2,
                render(oRM, oCustomControl) {
                    oRM.openStart("div", oCustomControl);
                    oRM.class("someCSSClassHere");
                    oRM.openEnd();
                    oRM.renderControl(oCustomControl.getAggregation("_label", oCustomControl));
                    oRM.close("div");
                }
            }

            // The old way:
            // renderer: {
            //     render: function (oRM, oCustomControl){
            //     oRM.write("<div");
            // 	   oRM.writeControlData(oCustomControl);
            // 	   oRM.addClass("someCSSClass");
            // 	   oRM.writeClasses();
            // 	   oRM.write(">");
            //     oRM.renderControl(oCustomControl.getAggregation("_label", oCustomControl));
            //     oRM.write("</div>");
            //     }
            // }
        });
    });