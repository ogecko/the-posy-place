import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { parse } from '/imports/lib/parse';

export const orderHistoryRowSpec = new SimpleSchema({
	dom: {
		type: Object, optional: true, blackbox: true,
		autoValue: function(doc) { return parse.domCheck(this); }
	},
	orderNo: {
		type: String, 
		autoValue: function(doc) { 
			if (this.isSet) return undefined;
			return parse.domSelect(this, String, '.customer-name').split(' - ')[0]; 
		}
	},
	customerName: {
		type: String, optional: true,
		autoValue: function(doc) { 
			if (this.isSet) return undefined;
			return parse.domSelect(this, String, '.customer-name').split(' - ')[1]; 
		}
	},
	orderDate: {
		type: String, optional: true,
		autoValue: function(doc) { 
			if (this.isSet) return undefined;
			return parse.domSelect(this, String, '.order-date').replace(/.(\d\d)$/, '$1'); 
		}
	},
	// detailsUrl: {
	// 	type: String, optional: true,
	// 	autoValue: function(doc) { return parse.domSelect(this, String, '.options > a','href'); }
	// },
	// gateway: {
	// 	type: String, optional: true,
	// 	autoValue: function(doc) { return parse.domSelect(this, String, '.history-gateway'); }
	// },
	amount: {
		type: String, optional: true,
		autoValue: function(doc) { return parse.domSelect(this, String, '.amount'); }
	},
	// isPaid: {
	// 	type: String, optional: true,
	// 	autoValue: function(doc) { 
	// 		if (this.isSet) return undefined;
	// 		return parse.domSelect(this, String, '.paid > input', 'checked') ? "1" : "0";
	// 	}
	// },
	isShipped: {
		type: String, optional: true,
		autoValue: function(doc) { 
			if (this.isSet) return undefined;
			return (parse.domSelect(this, String, '.shipped > div > a > span')==="Shipped") ? "1" : "0";
		}
	},

});


export const orderHistorySpec = new SimpleSchema({
	dom: {
		type: Object, optional: true, blackbox: true,
		autoValue: function(doc) { return parse.domCheck(this); }
	},
	orders: {
		type: [orderHistoryRowSpec], 
		autoValue: function(doc) { 
			return parse.domSelect(this, ['dom'], '#orders-vue > div > table > tbody > tr:nth-child(n+2)'); 
		}
	},
});

