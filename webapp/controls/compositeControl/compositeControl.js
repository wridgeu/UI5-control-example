sap.ui.define([
    "sap/ui/core/XMLComposite"
],
    /**
     * DEPRECATED → https://github.com/SAP/openui5/issues/3429#issuecomment-1314994428
     * @param {sap.ui.core.XMLComposite} XMLComposite 
     * @returns {com.mrb.customcontrol.controls.compositeControl.compositeControl}
     */
    (XMLComposite) => {
        "use strict";

        const compositeControl = XMLComposite.extend("com.mrb.customcontrol.controls.compositeControl.compositeControl", {

            metadata: {
                properties: {
                    label: "string",
                    value: "string"
                },
                events: {
                    compositeControlEvent: {}
                }
            },
            handlePress(oEvt) {
                this.fireEvent("compositeControlEvent", oEvt);
                // or this.fireCompositeControlEvent(oEvt)
            }
        });

        return compositeControl;
    });