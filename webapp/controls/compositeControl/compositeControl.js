sap.ui.define([
    "sap/ui/core/XMLComposite"
], function(XMLComposite) {
	"use strict";

	var compositeControl = XMLComposite.extend("com.mrb.customcontrol.controls.compositeControl.compositeControl", {

		metadata: {
			properties: {
               label: "string",
               value: "string"
            },
            events: {
                compositeControlEvent: {}
            }
        },
        handlePress: function(oEvt){
            this.fireEvent("compositeControlEvent", oEvt);
        }
    });

    return compositeControl;
    
});