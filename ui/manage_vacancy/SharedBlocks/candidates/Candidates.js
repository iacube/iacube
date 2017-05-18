sap.ui.define(["sap/uxap/BlockBase"], function (BlockBase) {
	"use strict";
	var Candidates = BlockBase.extend("manage_vacancy.SharedBlocks.candidates.Candidates", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "manage_vacancy.SharedBlocks.candidates.Candidates",
					type: "XML"
				},
				Expanded: {
					viewName: "manage_vacancy.SharedBlocks.candidates.Candidates",
					type: "XML"
				}
			}
		}
	});
	return Candidates;
}, true);