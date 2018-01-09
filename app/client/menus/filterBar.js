import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { jobQueue } from '/imports/api/jobQueue';
import icon from 'uikit/dist/js/uikit-icons.js';

Template.filterBar.onCreated(function helloOnCreated() {
	// counter starts at 0
	this.counter = new ReactiveVar(0);
});


Template.filterBar.helpers({
	counter() {
		return Template.instance().counter.get();
	},
	isSelected: () => ((FlowRouter.getQueryParam('selected')==='1') ? 'uk-button-primary' : 'uk-button-default'),
	isNotShipped: () => ((FlowRouter.getQueryParam('shipped')==='0') ? 'uk-button-primary' : 'uk-button-default'),
	isAll: () => ((!FlowRouter.getQueryParam('shipped')&&!FlowRouter.getQueryParam('selected')) ? 'uk-button-primary' : 'uk-button-default'),
});

Template.filterBar.events({
	'click .js-refresh'(event, instance) {
		// action
	},
});
