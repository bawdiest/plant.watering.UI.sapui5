sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel"
   ], function (UIComponent, JSONModel, ResourceModel) {
      "use strict";
      return UIComponent.extend("sap.ui.demo.wt.Component", {
         metadata : {
            manifest: "json"
         },
         init : function () {
         // call the init function of the parent
         UIComponent.prototype.init.apply(this, arguments);
         // set data model
         var oData = {
            input : {
               temperature : 25
            }
         };
         var oModel = new JSONModel(oData);
         this.setModel(oModel);

         var weatherData = {
            weather : {
               temperature : 25,
               pressure: 960,
               wind: 5,
               rain: 0,
               humidity: 85
            }
         };
         var weatherModel = new JSONModel(weatherData);
         this.setModel(weatherModel, "wd");

         // set i18n model
         var i18nModel = new ResourceModel({
            bundleName : "sap.ui.demo.wt.i18n.i18n"
         });
         this.setModel(i18nModel, "i18n");
      }
   });
   });