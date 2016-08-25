sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast"
], function (Controller, MessageToast) {
   "use strict";
   return Controller.extend("sap.ui.demo.wt.controller.InputOutputPanel", {
      onPredict : function () {
         // read msg from i18n model
         var oBundle = this.getView().getModel("i18n").getResourceBundle();
         var sTemperature = this.getView().getModel("test").getProperty("/foo");
         var sResult = sTemperature;
         var sMsg = oBundle.getText("resultMsg", [sResult]);
         

var resultPanel = this.getView().byId("Result");
         resultPanel.setBusy(true);

         //this.getView().getModel().setProperty("/output/result", "Calculating...");

// simulate delayed end of operation
         jQuery.sap.delayedCall(1000, this, function () {
            resultPanel.setBusy(false)
            this.getView().getModel().setProperty("/result/message", sMsg);
            MessageToast.show(sMsg);
         });
         // show message
         MessageToast.show(sMsg);
      }
   });
});