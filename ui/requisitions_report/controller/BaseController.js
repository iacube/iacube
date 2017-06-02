sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";

	return Controller.extend("requisitions_report.controller.BaseController", {

		onNavBack : function() {
			window.history.go(-1);
		},
		
		onCandidatePress: function(oEvent){
			var sPath = oEvent.getSource().getBindingContext("ui").getPath();
			var ind	= sPath.split("/")[2];
			var ind2	= sPath.split("/")[4];
			this.getRouter().navTo("candidate", {
				ind: parseInt(ind),
				ind2: parseInt(ind2)
			});
			var bAssignAllow = this.getView().getBindingContext("ui").getObject().StatusCodeId === "OPEN";
			this.getModel("ui").setProperty(sPath+"/assignAllowed", bAssignAllow);

		},
		
		onProfilesPopover: function(oEvent){
			if( !this._oProfPopover ) {
				this._oProfPopover = sap.ui.xmlfragment("requisitions_report.view.fragment.ProfListPopover", this);
				this.getView().addDependent(this._oProfPopover);
			}
			var oBinding = oEvent.getSource().getBindingContext("ui");			
			this._oProfPopover.setBindingContext(oBinding, "ui");
			this._oProfPopover.openBy(oEvent.getSource());
		},

		/**
		 * Convenience method for accessing the router in every controller of
		 * the application.
		 * 
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter : function() {
			return this.getOwnerComponent().getRouter();
		},

		/**
		 * Convenience method for getting the view model by name in every
		 * controller of the application.
		 * 
		 * @public
		 * @param {string}
		 *            sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel : function(sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model in every controller of
		 * the application.
		 * 
		 * @public
		 * @param {sap.ui.model.Model}
		 *            oModel the model instance
		 * @param {string}
		 *            sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel : function(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Convenience method for getting the resource bundle.
		 * 
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of
		 *          the component
		 */
		getResourceBundle : function() {
			return this.getOwnerComponent().getModel("i18n")
					.getResourceBundle();
		}
	});
});