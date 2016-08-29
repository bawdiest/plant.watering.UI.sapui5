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
               jsonpCallback: 'processJSON', 
               contentType : "application/json",
               dataType : 'jsonp',
               success: function (result) {  
                  sResult = result.amount;
                  var sMsg = oBundle.getText("resultMsg", [sResult]);
                  var dMsg = oBundle.getText("doneMsg");
                  resultPanel.setBusy(false)
                  that.getView().getModel().setProperty("/result/message", sMsg);
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