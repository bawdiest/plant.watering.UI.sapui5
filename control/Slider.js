sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/Slider",
	"sap/m/Label",
	"sap/m/Input"

	], function (Control, Slider, Label, Input) {
		"use strict";
		return Control.extend("sap.ui.demo.wt.control.Slider", {
			metadata : {
				properties : {
					min: 	{type : "float", defaultValue : 0},
					max: 	{type : "float", defaultValue : 100},
					value: 	{type : "float", defaultValue : 75},
					smallStepWidth: {type : "float", defaultValue : 1},
					desc: {type : "string", defaultValue : "Label"},
					tooltip: {type : "string", defaultValue : "Tooltip"}
				},
				aggregations : {
					_slider : {type : "sap.m.Slider", multiple: false, visibility : "hidden"},
					_label : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				},
				events : {
					change : {
						parameters : {
							value : {type : "float"}
						}
					}
				}
			},
			init : function () {
				this.setAggregation("_slider", new Slider({
					min: this.getMin(),
					max: this.getMax(),
					tooltip: this.getTooltip(),
					smallStepWidth: this.getSmallStepWidth(),
					width: "100%",
					liveChange: this._onChange.bind(this)
				}));
				this.setAggregation("_label", new Label({
					text: this.getDesc(),
					design: "Bold",
					width: "100%"
				}));
				this.setProperty("value", this.getValue(), true);
				this.getAggregation("_slider").setValue(this.getValue());
			},

			onBeforeRendering: function() {
				this.setProperty("min", this.getMin(), true);
				this.getAggregation("_slider").setMin(this.getMin());
				this.setProperty("max", this.getMax(), true);
				this.getAggregation("_slider").setMax(this.getMax());
				this.setProperty("value", this.getValue(), true);
				this.getAggregation("_slider").setValue(this.getValue());

				this.setProperty("desc", this.getDesc(), true);
				this.getAggregation("_label").setText(this.getDesc());
			},

			setValue: function (iValue) {
				this.setProperty("value", iValue, true);
				this.getAggregation("_slider").setValue(iValue);


			},

			_onChange : function (oEvent) {
			// var oRessourceBundle = this.getModel("i18n").getResourceBundle();
			var fValue = oEvent.getParameter("value");

			this.setValue(fValue);

			// this.getAggregation("_label").setText(oRessourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]));
			// this.getAggregation("_label").setDesign("Bold");
		},

		_onSubmit : function (oEvent) {
			// var oResourceBundle = this.getModel("i18n").getResourceBundle();

			// this.getAggregation("_rating").setEnabled(false);
			// this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelFinal"));
			// this.getAggregation("_button").setEnabled(false);
			// this.fireEvent("change", {
			// 	value: this.getValue()
			// });
		},
		renderer : function (oRM, oControl) {
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("mySlider");
			oRM.writeClasses();
			oRM.write(">");
			oRM.renderControl(oControl.getAggregation("_label"));
			//oRM.renderControl(oControl.getAggregation("_value"));
			oRM.renderControl(oControl.getAggregation("_slider"));

			oRM.write("</div>");
		}
	});
	});