    sap.ui.define([
      'jquery.sap.global',
      'sap/ui/core/mvc/Controller',
      'sap/m/MessageToast',
      'sap/ui/model/json/JSONModel'
      ], function(jQuery, Controller, MessageToast, JSONModel) {
         "use strict";

         var PageController = Controller.extend("sap.ui.demo.wt.controller.Home", {

            // Init is done in Componet.js
         /* onInit : function (evt) {
    			// set mock model
    			var sPath = jQuery.sap.getModulePath("sap.ui.demo.wt", "/data/homeData.json");
    			var oModel = new JSONModel(sPath);
    			this.getView().setModel(oModel, "tiles");

                //var agr = this.getView().getModel("tiles").setProperty("/TileCollection/0/number", 17);
            }, */

            onAfterRendering : function () {
                var that = this;
                that.predict();
            },



            handleTilePressed : function(evt) {
                var oTile = evt.getSource();
                MessageToast.show("The GenericTile \"" + oTile.getHeader() + "\" was pressed.");
            },

            handleIrrigationTilePressed : function(evt) {
                this.getOwnerComponent().getRouter().getTargets().display("irrigation", {
               fromTarget : "home"
            });
            },

            predict : function () {
                var that = this;
                var url = "http://mikmak.cc:1880/predictIrrigation";
                that.getView().getModel().setProperty("/result/state", "Loading");

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
                        that.getView().getModel().setProperty("/result/state", "Loaded");

                        that.getView().getModel().setProperty("/result/time", sTime);
                        that.getView().getModel().setProperty("/result/quantity", sQuantity);
                    }, 
                    error: function (e) {  
                        alert("Not OK")
                        console.log(e.message);  
                    }  
                })
            }


        })
         return PageController;
     }) 
