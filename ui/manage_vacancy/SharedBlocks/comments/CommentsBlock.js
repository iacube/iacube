sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";
	var CommentsBlock = BlockBase.extend("manage_vacancy.SharedBlocks.comments.CommentsBlock", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "manage_vacancy.SharedBlocks.comments.CommentsBlock",
					type: "XML"
				},
				Expanded: {
					viewName: "manage_vacancy.SharedBlocks.comments.CommentsBlock",
					type: "XML"
				}
			}
		}
	});
	return CommentsBlock;
}, true);