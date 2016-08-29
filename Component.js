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
            },
            result : {
               message : "",
               time : 0,
               quantitiy : 0
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


         var url = "https://cors-anywhere.herokuapp.com/http://mikmak.cc:1880/weatherData?temperature=21";
         url += "&pressure=966";
         url += "&wind=1";
         url += "&rain=0";
         url += "&humidity=85";
         var parameters = {};
         var headers ={};
         var testModel = new JSONModel();
         testModel.loadData(url, parameters, false, "GET", false, false, headers); //false: wait until data is loaded
         this.setModel(testModel, "currentWeather");

         // var url = "https://cors-anywhere.herokuapp.com/http://mikmak.cc:1880/weatherData?foo=21"; //https://cors-anywhere.herokuapp.com/
         // var parameters = {};
         // var headers ={};
         // var testModel = new JSONModel();
         // testModel.loadData(url, parameters, true, "GET", false, false, headers); //false: wait until data is loaded
         // this.setModel(testModel, "currentWeather";

         var oModel = new sap.ui.model.json.JSONModel();
         oModel.loadData("data/predictiveModel.json");

         this.setModel(oModel, "model");


         // set i18n model
         var i18nModel = new ResourceModel({
            bundleName : "sap.ui.demo.wt.i18n.i18n"
         });
         this.setModel(i18nModel, "i18n");
      }
   });
   });