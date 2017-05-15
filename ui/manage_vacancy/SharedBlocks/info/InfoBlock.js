sap.ui.define(["sap/uxap/BlockBase"], function (BlockBase) {
	"use strict";
	var InfoBlock = BlockBase.extend("manage_vacancy.SharedBlocks.info.InfoBlock", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "manage_vacancy.SharedBlocks.info.InfoBlock",
					type: "XML"
				},
				Expanded: {
					viewName: "manage_vacancy.SharedBlocks.info.InfoBlock",
					type: "XML"
				}
			}
		}
	});
	return InfoBlock;
}, true);