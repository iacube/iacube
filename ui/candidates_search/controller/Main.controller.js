sap.ui.define([
	"candidates_search/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(Controller,JSONModel) {
	"use strict";

	return Controller.extend("candidates_search.controller.Main", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Used to instantiate a special view model and handle busy state of whole app
		 * @memberOf com.gs.sls.bpo.ui.mod.chg_lang.view.Main
		 * @public
		 */
		onInit: function() {


		}
	});
});