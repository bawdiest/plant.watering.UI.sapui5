sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast"
   ], function (Controller, MessageToast) {
      "use strict";
      return Controller.extend("sap.ui.demo.wt.controller.InputOutputPanel", {
         onAfterRendering : function () {
            var that = this;
            that.predict();
         },
         onPredict : function () {
            this.predict()
         },

         onDisplayNotFound : function (oEvent) {

            this.getOwnerComponent().getRouter().getTargets().display("notFound", {
               fromTarget : "home"
            });
         },

         onStartIrrigation : function (oEvent) {

            this.getOwnerComponent().getRouter().getTargets().display("irrigation", {
               fromTarget : "home"
            });
         },

         predict : function () {
            var that = this;
            var oBundle = that.getView().getModel("i18n").getResourceBundle();
            var sTemperature = that.getView().getModel("currentWeather").getProperty("/temperature");
            var sPressure = that.getView().getModel("currentWeather").getProperty("/pressure");
            var sWind = that.getView().getModel("currentWeather").getProperty("/wind");
            var sRain = that.getView().getModel("currentWeather").getProperty("/rain");
            var sHumidity = that.getView().getModel("currentWeather").getProperty("/humidity");
            sTemperature = parseInt(sTemperature);
            var sResult = 0;

            var resultPanel = that.getView().byId("Result");
            resultPanel.setBusy(true);


            var url = "http://mikmak.cc:1880/predictIrrigation";
            url += "?temperature=" + sTemperature;
            url += "&pressure=" + sPressure;
            url += "&wind=" + sWind;
            url += "&rain=" + sRain;
            url += "&humidity=" + sHumidity;
            url += "&amount=0";

            $
            .ajax({
               url : url,
               async: true,
               jsonpCallback: 'processJSON', 
               contentType : "application/json",
               dataType : 'jsonp',
               success: function (result) {  
                  var sQuantity = result.Quantity;
                  var sTime = result.Time;
                  
                  var dMsg = oBundle.getText("doneMsg");
                  resultPanel.setBusy(false);

                  that.getView().getModel().setProperty("/result/time", sTime);
                  that.getView().getModel().setProperty("/result/quantity", sQuantity);

                  var sMsg = oBundle.getText("resultMsg", [sQuantity]);
                  that.getView().getModel().setProperty("/result/message", sMsg);

                  var sLinkText = oBundle.getText("showStartIrrigationLinkText", [sTime]);
                  that.getView().getModel().setProperty("/result/startIrrigationLinkText", sLinkText);

                  MessageToast.show(dMsg);
               },
               error: function (e) {  
                  alert("Not OK")
                  console.log(e.message);  
               }  
            });


         }
      });
   });