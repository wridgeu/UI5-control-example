sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(Controller) {
  "use strict";

  return Controller.extend("com.mrb.customcontrol.controller.Main", {

      onSelectEventFired: function(oEvt){
        console.log(oEvt.getParameters());
      },
      onAggregationPressed: function(oEvt){
        console.log(oEvt);
      },
      onPress: function(oEvt){
        console.log("Event from composite control got delegated.")
        console.log(oEvt)
      }
  });
});
