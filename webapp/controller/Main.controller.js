sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "com/mrb/customcontrol/controls/CCModelReactive",
  "sap/ui/model/json/JSONModel",
  "sap/m/Button",
  "com/mrb/customcontrol/controls/BinVis/BinVis",
  "com/mrb/customcontrol/controls/BinVis/Segment"
], function (Controller,
  MessageToast,
  CCModelReactive,
  JSONModel,
  Button,
  BinVis,
  Segment) {
  "use strict";

  return Controller.extend("com.mrb.customcontrol.controller.Main", {

    onInit: function () {
      this._setupCustomControlWithReactiveModelUsage()
      this._setupCustomControlBoxVis()
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
    },
    _setupCustomControlBoxVis() {
      // variant 1
      // const binFrame = new BinVis({ width: "650px", height: "250px" })
      // variant 2
      // const binFrame = this.byId("customBinVis")
      // variant 3
      // <insert some third entity here to interact (manager)>

      // binFrame.insertSegment(new Segment({
      //   huident: "1902076858547",
      //   hutype: "BINU",
      //   logpos: 1,
      //   product: "8064967",
      //   batch: "DENN000001",
      //   stockQuantity: "40",
      //   stockUom: "PC",
      //   sled: "01.02.2023",
      //   state: "A",
      // }),1)
      // binFrame.insertSegment(new Segment({
      //   huident: "1902076858547",
      //   hutype: "BINU",
      //   logpos: 1,
      //   product: "8064967",
      //   batch: "DENN000002",
      //   stockQuantity: "40",
      //   stockUom: "PC",
      //   sled: "01.02.2023",
      //   state: "A",
      // }),2)
      // binFrame.insertSegment(new Segment({
      //   huident: "1902076858547",
      //   hutype: "BINU",
      //   logpos: 1,
      //   product: "8064967",
      //   batch: "DENN000003",
      //   stockQuantity: "40",
      //   stockUom: "PC",
      //   sled: "01.02.2023",
      //   state: "A",
      // }),3)
      // binFrame.insertSegment(new Segment({
      //   huident: "1902076858547",
      //   hutype: "BINU",
      //   logpos: 1,
      //   product: "8064967",
      //   batch: "DENN000000",
      //   stockQuantity: "40",
      //   stockUom: "PC",
      //   sled: "01.02.2023",
      //   state: "A",
      // }),0)

      // this.byId("container2").addItem(binFrame)

      // -------------------
      // variant 4
      this.byId("customBinVis").setModel(new JSONModel(this._getDemoModel()), "dmo")
    },

    _getDemoModel() {
      return {
        items: [
          {
            huident: "1902076858547",
            hutype: "BINU",
            logpos: "1",
            product: "8064967",
            batch: "DENN000000",
            state: "A",
          },
          {
            huident: "1902076858547",
            huType: "BINU",
            logpos: "1",
            product: "8064967",
            batch: "DENN000000",
            state: "A",
          },
          {
            huident: "1902076858547",
            huType: "BINU",
            logpos: "1",
            product: "8064967",
            batch: "DENN000000",
            state: "A",
          },
          {
            huident: "1902076858547",
            huType: "BINU",
            logpos: "1",
            product: "8064967",
            batch: "DENN000000",
            state: "A",
          }
        ]
      }
    }
  });
});
