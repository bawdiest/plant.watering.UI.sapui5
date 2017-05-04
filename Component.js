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

// create the views based on the url/hash
this.getRouter().initialize();


// set data model
var oData = {
   input : {
    temperature : 25,
    irrigationTime: 0
 },
 result : {
    message : "",
    time : 0,
    startIrrigationLinkText: "",
    quantitiy : 0,
    state : "Loaded"
 }
};
var oModel = new JSONModel(oData);
this.setModel(oModel);

/*
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

      var oModel = new sap.ui.model.json.JSONModel();
      oModel.loadData("data/predictiveModel.json");

      this.setModel(oModel, "model");
*/

      // set i18n model
      var i18nModel = new ResourceModel({
         bundleName : "sap.ui.demo.wt.i18n.i18n"
      });
      this.setModel(i18nModel, "i18n");

      var sPath = jQuery.sap.getModulePath("sap.ui.demo.wt", "/data/homeData.json");
      var oModel = new JSONModel(sPath);
      this.setModel(oModel, "tiles");

      var oData = {
         data : {
            irrigationTime: 0,
            irrigationPerc: 0,
            pumpStoped: 0
         }
      };
      var oModel = new JSONModel(oData);
      this.setModel(oModel, "irrigationProcess");
   }
});
   });