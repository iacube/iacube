sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";
	var Skills = BlockBase.extend("manage_vacancy.SharedBlocks.skills.Skills", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "manage_vacancy.SharedBlocks.skills.Skills",
					type: "XML"
				},
				Expanded: {
					viewName: "manage_vacancy.SharedBlocks.skills.Skills",
					type: "XML"
				}
			}
		}
	});
	return Skills;
}, true);