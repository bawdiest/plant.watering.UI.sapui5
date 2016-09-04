sap.ui.define([
	"sap/ui/demo/wt/controller/BaseController"
	], function (BaseController) {
		"use strict";
		return BaseController.extend("sap.ui.demo.wt.controller.Irrigation", {
			onInit: function () {
				var oRouter, oTarget;
				oRouter = this.getRouter();
				oTarget = oRouter.getTarget("irrigation");
				oTarget.attachDisplay(function (oEvent) {
				this._oData = oEvent.getParameter("data"); //store the data
			}, this);
			},

			onAfterRendering : function () {

				var that = this;
			},

			onStart : function () {

				var that = this;

				that.getView().getModel("irrigationProcess").setProperty("/data/pumpStoped", 0);

				var url = "http://mikmak.cc:1880/LowPowerSwitch/setOn";
				$
				.ajax({
					url : url,
					async: true,
					jsonpCallback: 'processJSON', 
					contentType : "application/json",
					dataType : 'jsonp',
					success: function (result) {
					},
					error: function (e) {  
						console.log(e.message);  
					}  
				});

				that.irrigate();
			},

			onStop : function () {

				var that = this;

				that.getView().getModel("irrigationProcess").setProperty("/data/pumpStoped", 1);


				var url = "http://mikmak.cc:1880/LowPowerSwitch/setOff";
				$
				.ajax({
					url : url,
					async: true,
					jsonpCallback: 'processJSON', 
					contentType : "application/json",
					dataType : 'jsonp',
					success: function (result) {
						alert("OK")
					},
					error: function (e) {  
						alert("Not OK")
						console.log(e.message);  
					}  
				});
			},

			irrigate : function () {
				var that = this;
				var predictedTime = that.getView().getModel().getProperty("/result/time");
				var irrigationTime = that.getView().getModel("irrigationProcess").getProperty("/data/irrigationTime");
				var irrigationPerc = that.getView().getModel("irrigationProcess").getProperty("/data/irrigationPerc");
				var pumpStoped = that.getView().getModel("irrigationProcess").getProperty("/data/pumpStoped");
				console.log(predictedTime); 
				console.log(irrigationTime); 
				console.log(pumpStoped); 
				if(irrigationTime <= predictedTime & pumpStoped != 1) {
					setTimeout(function()
					{
						irrigationTime = irrigationTime  + 1;
						that.getView().getModel("irrigationProcess").setProperty("/data/irrigationTime", irrigationTime);

						irrigationPerc = (irrigationTime / predictedTime) * 100;
						if(irrigationPerc > 100) {irrigationPerc = 100}
							that.getView().getModel("irrigationProcess").setProperty("/data/irrigationPerc", irrigationPerc);

						that.irrigate();

					},1000);

				}
				else {
					that.onStop();
				}
			},

		// override the parent's onNavBack (inherited from BaseController)
		onNavBack : function (oEvent){
			var oHistory, sPreviousHash, oRouter;
			// in some cases we could display a certain target when the back button is pressed
			if (this._oData && this._oData.fromTarget) {
				this.getRouter().getTargets().display(this._oData.fromTarget);
				delete this._oData.fromTarget;
				return;
			}
			// call the parent's onNavBack
			BaseController.prototype.onNavBack.apply(this, arguments);
		}
	});
	});