sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast"
], function (Controller, MessageToast) {
   "use strict";
   return Controller.extend("sap.ui.demo.wt.controller.InputPanel", {
      onPredict : function () {
         // read msg from i18n model
         var oBundle = this.getView().getModel("i18n").getResourceBundle();
         var sResult = this.getView().getModel().getProperty("/input/result");
         var sMsg = oBundle.getText("resultMsg", [sResult]);
         // show message
         MessageToast.show(sMsg);
      }
   });
});