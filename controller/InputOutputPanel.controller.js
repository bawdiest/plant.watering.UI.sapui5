sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast"
   ], function (Controller, MessageToast) {
      "use strict";
      return Controller.extend("sap.ui.demo.wt.controller.InputOutputPanel", {
         onAfterRendering : function () {
            var that = this;
            that.predict();
            //jQuery.sap.delayedCall(0, that, function() {
            //   that.predict()
            //})
            },
            onPredict : function () {
               this.predict()
            },
            predict : function () {
               var that = this;
         // read msg from i18n model
         var oBundle = that.getView().getModel("i18n").getResourceBundle();
         var sTemperature = that.getView().getModel("test").getProperty("/foo");
         var sResult = sTemperature;
         var sMsg = oBundle.getText("resultMsg", [sResult]);
         var dMsg = oBundle.getText("doneMsg");

         var resultPanel = that.getView().byId("Result");
         resultPanel.setBusy(true);

         //this.getView().getModel().setProperty("/output/result", "Calculating...");

// simulate delayed end of operation
jQuery.sap.delayedCall(1000, that, function () {
   resultPanel.setBusy(false)
   that.getView().getModel().setProperty("/result/message", sMsg);
   MessageToast.show(dMsg);
});
}
});
   });