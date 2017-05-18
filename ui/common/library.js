sap.ui.define([
	"jquery.sap.global"
], function(jQuery) {

	"use strict";

	/**
	 * Library to define and preload controls from common. Also contains
	 * enums and globally used methods.
	 */
	 
	jQuery.sap.declare("iacube.ui.common.library");
    jQuery.sap.require("sap.ui.core.Core");
    // library dependencies
    jQuery.sap.require("sap.ui.core.library");
/**
	 *
	 * @namespace
	 * @name com.gs.sls.bpo.ui.common
	 * @public
	 */
	sap.ui.getCore().initLibrary({
		name: "iacube.ui.common",
		version: "0.1",
		dependencies: ["sap.m", "sap.ui.core"],
		types: [],
		interfaces: [],
		controls: [
			"iacube.ui.common.InfoForm",
			"iacube.ui.common.SkillsTable"
		],
		elements: []
	});

	/**
	 * Generalized init of components which would normally be in index.html of each UI.
	 * Designed to prevent layout jumping through late binding of the UI.
	 * 
	 * Asynchronously loads the component while showing a busy dialog. After that a delay
	 * is added before closing the busy dialog to prevent that layout jumping is visible.
	 * 
	 * @param {string} sNamespace - Namespace of component
	 * @param {int} iDelay - Delay to add after load to ensure that there is no layout jumping 
	 */
	iacube.ui.common.initHTML = function(sNamespace, iDelay) {

		// make sure a namespace is provided
		if (!(typeof sNamespace === "string" && sNamespace.length > 0)) {
			throw new Error("Pleace provide a namespace");
		}

		// if not provided set iDelay to 1000
		if (!(typeof iDelay === "number")) {
			iDelay = 1000;
		}

		sap.ui.require([
			"sap/m/BusyDialog",
			"sap/ui/core/ComponentContainer"
		], function(BusyDialog, ComponentContainer) {

			var oDialog = new BusyDialog();
			oDialog.open();

			// register component namespace with default path ./
			// no other path is allowed!
			jQuery.sap.registerModulePath(sNamespace, "./");

			// start loading the component
			sap.ui.component({
				async: true,
				name: sNamespace
			}).then(function(oComponent) {
				new ComponentContainer({
					height: "100%",
					component: oComponent
				}).placeAt("content");

				// adjust this if ui needs more/less time to settle
				setTimeout(function() {
					oDialog.close();
				}, iDelay);
			});
		});
	};

	return iacube.ui.common;

}, false);