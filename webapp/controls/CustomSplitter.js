sap.ui.define([
    "sap/ui/layout/Splitter"
],(SuperControl) => {

    // control based on: https://community.sap.com/t5/technology-blogs-by-sap/implementing-a-quick-collapse-for-the-ui5-splitter-control/bc-p/13927421
    // added to check out the `onAfterRendering` behaviour mentioned here: https://community.sap.com/t5/technology-blogs-by-sap/implementing-a-quick-collapse-for-the-ui5-splitter-control/bc-p/13923349/highlight/true#M176657
    return SuperControl.extend("com.mrb.customcontrol.controls.CustomSplitter", {
        metadata: {
            properties: {
                quickCollapseIndex: { type: "string", defaultValue: "" }
            }
        },

        renderer: {},

        // seems not to be required, create breakpoint in sap.ui.layout.Splitter.js and find out!
        // onAfterRendering: function() {
        //     // if (sap.ui.layout.Splitter.prototype.onAfterRendering) {
        //     //     sap.ui.layout.Splitter.prototype.onAfterRendering.apply(this, arguments) //run the super class's method first
        //     // }
        // },
	    ondblclick: function(e) {
	        if (e.target.id === this.getId()) {
	            const allContentAreas = this.getContentAreas()
		        if (this.getQuickCollapseIndex()) {
		            const contentAreaToCollapse = allContentAreas[this.getQuickCollapseIndex()]
		            contentAreaToCollapse.getLayoutData().setSize("0px")
		        }
	        }
	    }
    })
})
