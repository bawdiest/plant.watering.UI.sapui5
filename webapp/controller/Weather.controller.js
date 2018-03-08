sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function(JSONModel, Controller) {
	"use strict";

	return Controller.extend("airigare-app.controller.Weather", {

		onInit: function() {
			var that = this;

			var url = "/mikmakAPI/airigare/weatherDW/last24hours/";
			$
				.ajax({
					url: url,
					async: false,
					//jsonpCallback: 'processJSON', 
					//					contentType: "application/json",
					//					dataType: 'jsonp',
					success: function(result) {
						var oModel = new sap.ui.model.json.JSONModel(result);
						that.getView().setModel(oModel, "weatherData");
					},
					error: function(jqXHR, textStatus, errorThrown) {
						//MessageToast.show("Auftrag konnte nicht angelegt werden");
					},
					complete: function(jqHXR, textStatus) {
						//MessageToast.show("Auftrag angelegt");

					}
				});
		}
	});
});