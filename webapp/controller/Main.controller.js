sap.ui.define([
  "sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
  "use strict";

  return Controller.extend("com.mrb.customcontrol.controller.Main", {

      onSelectEventFired: function(oEvt){
        console.log(oEvt.getParameters());
      },
      onAggregationPressed: function(oEvt){
        console.log(oEvt);
      },
      onPress: function(oEvt){
        MessageToast.show("Event from compositeControl got handled in Main.controller");
        console.log("Event from composite control got delegated.")
        console.log(oEvt)
      }
  });
});
