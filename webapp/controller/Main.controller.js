sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "com/mrb/customcontrol/controls/CCModelReactive",
  "sap/ui/model/json/JSONModel",
  "sap/m/Button"
], function (Controller,
  MessageToast,
  CCModelReactive,
  JSONModel,
  Button) {
  "use strict";

  return Controller.extend("com.mrb.customcontrol.controller.Main", {

    onInit: function () {
      this._setupCustomControlWithReactiveModelUsage()
    },

    onSelectEventFired: function (oEvt) {
      console.log(oEvt.getParameters());
    },
    onAggregationPressed: function (oEvt) {
      console.log(oEvt);
    },
    onPress: function (oEvt) {
      MessageToast.show("Event from compositeControl got handled in Main.controller");
      console.log("Event from composite control got delegated.")
      console.log(oEvt)
    },
    _setupCustomControlWithReactiveModelUsage() {
      // create initial model
      this.customViewModel = new JSONModel({
        rootNode: {
          demoData1: "initialValue1",
          demoData2: "initialValue2",
          demoData3: "initialValue3",
        }
      })

      // create custom control and bind against rootNode of model
      // https://jsbin.com/fosiya/edit?html,css,js,output → https://youtu.be/W3Qkev2yk9w
      const customControlWithModel = new CCModelReactive({ value: "{/rootNode}" })

      // this would be the way in case the model has a name
      // const customControlWithModel = new CCModelReactive({ value: "{someName>/rootNode}" })
      // customControlWithModel.setModel(this.customViewModel, someName)

      // here the model is put "inside" the custom control, alternatively
      // you can put it into the view or anywhere above within the tree 
      // the managedmodel will traverse and look for a match
      customControlWithModel.setModel(this.customViewModel)
      // this.getView().setModel(this.customViewModel)

      // insert the custom control into the flexbox (within the view)
      this.byId("container").addItem(customControlWithModel)

      // dynamically create a custom button to alter the demo data at runtime
      this.byId("container").addItem(new Button("changeDataButton", {
        text: "adjust model at runtime",
        icon: "sap-icon://incident",
        press: () => {
          // setProperty won't work as the value comparison between old/new fails → references are directly adjusted
          // updateBinding/refresh have the same "issue", no diff can be created thus nothing will be adjusted
          // this.customViewModel.setProperty("/rootNode/demoData1", Math.random()) // does update the model, doesn't retrigger rendering
          this.customViewModel.setData({
            rootNode: {
              demoData1: Math.random(),
              demoData2: Math.random(),
              demoData3: Math.random(),
              newlyAddedData: Math.random(),
            }
          }, true)
        }
      }))
    }
  });
});
