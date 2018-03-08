sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function(JSONModel, Controller) {
	"use strict";

	return Controller.extend("airigare-app.controller.Launchpad", {

		onInit: function() {
			var that = this;

		},
		goToWeatherl24h: function() {
			this.getOwnerComponent().getRouter().navTo("Weather");
		}
	});
});