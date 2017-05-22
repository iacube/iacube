sap.ui.define([
       "sap/suite/ui/commons/Timeline",
       "sap/suite/ui/commons/TimelineItem",
       "iacube/ui/common/formatterCom"
], function(Timeline, TimelineItem, oFormatterCom) {
	"use strict";

	return Timeline.extend("iacube.ui.common.Comments", {
		
		init: function() {
			Timeline.prototype.init.apply(this, arguments);
			this.setProperty("enableDoubleSided", true);
			this._createContent();
		},

		_createContent: function() {
			
			var oTemplateItem = new TimelineItem({
				dateTime: "{ui>CommCreatedAt}",
				text: "{ui>Text}",
				userName: "{ui>CommCreatedBy}",
				title: "{ui>CommTitle}",
				filterValue: {	parts: [{path: "ui>CommentTypeId"},
				              	        {path: "i18nCom>commIdCall"},
				              	        {path: "i18nCom>commIdNote"}],
					formatter: function(sCommId, sCommCall, sCommNote) {
						return oFormatterCom.getCommentType(sCommId, sCommCall, sCommNote);
					}
				},						
				userNameClickable: true,
				icon: {	path: "ui>CommentTypeId",
						formatter: function(sCommId) {
							return oFormatterCom.getCommentIcon(sCommId);
						}
				}							
			});
			
			this.setEnableScroll(false);
			this.bindAggregation("content", "ui>comments", oTemplateItem);
		},

		renderer: {}
	});
});