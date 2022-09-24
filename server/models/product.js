//Name, image, product code, price, category, manufacture date, expiry date, owner, status
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	productCode: {
		type: String,
		require: true,
	},
	category: {
		type: String,
		require: true,
	},
	owner: {
		type: Object,
	},
	status: {
		type: String,
	},
	price: {
		type: Number,
		require: true,
	},
	manufactureDate: {
		type: Date,
		require: true,
	},
	expiryDate: {
		type: Date,
		require: true,
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
	delete: {
		type: Boolean,
		default: false,
	},
	updateOn: {
		type: Date,
		default: null,
	},
});

module.exports = mongoose.model("product", productSchema);
