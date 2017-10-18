sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel", "sap/ui/model/resource/ResourceModel"], function(UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("sap.ui.demo.wt.Component", {
        metadata: {
            manifest: "json"
        },
        init: function() {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            // create the views based on the url/hash
            this.getRouter().initialize();
            // set data model
            var oData = {
                input: {
                    temperature: 25,
                    irrigationTime: 0
                },
                result: {
                    message: "",
                    time: 0,
                    startIrrigationLinkText: "",
                    quantitiy: 0,
                    state: "Loaded"
                }
            };
            var oModel = new JSONModel(oData);
            this.setModel(oModel);
            
            // Get Current Weather
            var url = "http://mikmak.cc:3000";
            var parameters = {};
            var headers = {};
            var weatherModel = new JSONModel();
            weatherModel.loadData(url, parameters, true, "GET", false, false, headers); //false: wait until data is loaded
            this.setModel(weatherModel, "currentWeather");

            var oData = {
                data: {
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