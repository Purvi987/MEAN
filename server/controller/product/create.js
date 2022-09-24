const express = require("express");
const authorizer = require("../../middleware/authorizer");
const router = express.Router();
const Product = require("../../models/product");
const bodyParser = require("body-parser");
router.use(bodyParser.json({ limit: "100mb" }));
router.use(bodyParser.urlencoded({ extended: false, limit: "100mb" }));
router.post("/", authorizer, async function (req, res) {
	try {
		const { user } = req.headers;
		const product = new Product({ ...req.body, owner: user?.user });
		let d = await product.save();

		res
			.header({
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			})
			.status(200)
			.json({
				statsCode: 200,
				data: d,
				error: {
					message: "",
				},
				message: "Product created successfully",
			});
	} catch (error) {
		console.log(err);
		res
			.header({
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			})
			.status(500)
			.json({
				statsCode: 500,
				data: null,
				error: {
					message: err,
				},
				message: "Something went wrong",
			});
	}
});

module.exports = router;
