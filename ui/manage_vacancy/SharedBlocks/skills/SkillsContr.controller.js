sap.ui.define([
	"manage_vacancy/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("manage_vacancy.SharedBlocks.skills.SkillsContr", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf vacancymngt.view.DetailVacancy
		 */
			onInit: function() {

			},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf vacancymngt.view.DetailVacancy
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf vacancymngt.view.DetailVacancy
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf vacancymngt.view.DetailVacancy
		 */
		//	onExit: function() {
		//
		//	}
		
			onSkillDelete: function(oEvent) {
// delete skill from table	
				var path = oEvent.getParameter('listItem').getBindingContext("ui").getPath();
	            var index = parseInt(path.substring(path.lastIndexOf('/') +1));
	            var dataPath = path.substring(0, path.lastIndexOf('/'));
	            var oModel = this.getModel("ui");
	            var skills = oModel.getProperty(dataPath);
	            skills.splice(index, 1);
	            oModel.setData(skills, true);
			}
		
	});
 

	});