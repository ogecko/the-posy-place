import { Nightmare } from './nightmare.js';
import { jobQueue } from '/imports/api/jobQueue';
import { orders } from '/imports/api/orders';

Meteor.methods({
	'fetch list': () => {
		jobQueue.dispatch('fetch list', { }, { retries: 3, wait: 10*1000 })
	},
	'fetch order': (orderNo) => {
		jobQueue.dispatch('fetch order', { orderNo: orderNo }, { retries: 3, wait: 10*1000 })
	},
	'ship order': (orderNo) => {
		jobQueue.dispatch('ship order', { orderNo: orderNo }, { retries: 3, wait: 10*1000 })
	},
	'locate order': (orderNo) => {
		jobQueue.dispatch('locate order', { orderNo: orderNo }, { retries: 3, wait: 10*1000 })
	},
	'locate all': () => {
		orders.orderCollection.find({}).forEach(doc => {
			jobQueue.dispatch('locate order', { orderNo: doc.orderNo }, { retries: 3, wait: 10*1000 })
		});
	},
})
