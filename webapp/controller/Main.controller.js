sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "com/mrb/customcontrol/controls/CCModelReactive",
  "sap/ui/model/json/JSONModel",
  "sap/m/Button",
  "com/mrb/customcontrol/controls/BoxVis/BoxVis",
  "com/mrb/customcontrol/controls/BoxVis/Box"
],
  /**
   * 
   * @param {sap.ui.core.mvc.Controller} Controller 
   * @param {sap.m.MessageToast} MessageToast 
   * @param {com.mrb.customcontrol.controls.CCModelReactive} CCModelReactive 
   * @param {sap.ui.model.json.JSONModel} JSONModel 
   * @param {sap.m.Button} Button 
   * @param {com.mrb.customcontrol.controls.BoxVis.BoxVis} BoxVis 
   * @param {com.mrb.customcontrol.controls.BoxVis.Box} Box 
   * @returns 
   */
  function (Controller,
    MessageToast,
    CCModelReactive,
    JSONModel,
    Button,
    BoxVis,
    Box) {
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

      /**
       * Variants of retrieving/managing the BoxVis
       */
      _setupCustomControlBoxVis() {
        // variant 1
        // const binFrame = new BoxVis({ width: "650px", height: "250px" })
        // variant 2
        // const binFrame = this.byId("customBoxVis")
        // variant 3
        // <insert some third entity here to interact (manager)>

        // Inserting with specific order
        // binFrame.insertBox(new Box({
        //   boxid: "1902076858547",
        //   boxtype: "BINU",
        //   logpos: 1,
        //   state: "A",
        // }), 1)
        // binFrame.insertBox(new Box({
        //   boxid: "1902076858548",
        //   boxtype: "BINU",
        //   logpos: 2,
        //   state: "A",
        // }), 2)
        // binFrame.insertBox(new Box({
        //   boxid: "1902076858549",
        //   boxtype: "BINU",
        //   logpos: 3,
        //   state: "A",
        // }), 3)
        // binFrame.insertBox(new Box({
        //   boxid: "1902076858550",
        //   boxtype: "BINU",
        //   logpos: 4,
        //   state: "A",
        // }), 0)
        // Manuall adding in the container ATF
        // this.byId("container2").addItem(binFrame)

        // ------------------------------------------------- // 
        // variant 4
        this.byId("customBoxVis").setModel(new JSONModel(this._getDemoModel()), "dmo")
      },

      onBoxPressed(event) {
        MessageToast.show(`Pressed on: ${event.getParameter('id')}`)
      },

      /**
       * Returns demo data for testing the BoxVis control
       * @returns {Object}
       */
      _getDemoModel() {
        return {
          boxid: "1902076858546",
          boxtype: "BIN4",
          orientation: "RE",
          items: [
            {
              boxid: "1902076858547",
              boxtype: "BINU",
              logpos: 1,
              state: "A",
            },
            {
              boxid: "1902076858548",
              boxtype: "BINU",
              logpos: 2,
              state: "I",
            },
            {
              boxid: "1902076858549",
              boxtype: "BINU",
              logpos: 3,
              state: "I",
            },
            {
              boxid: "1902076858550",
              boxtype: "BINU",
              logpos: 4,
              state: "I",
            }
          ]
        }
      }
    });
  });
