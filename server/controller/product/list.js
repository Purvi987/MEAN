const express = require("express");
const authorizer = require("../../middleware/authorizer");
const Product = require("../../models/product");
const router = express.Router();

router.post("/", authorizer, async function (req, res) {
	try {
		let l = await Product.find({ ...req.body, delete: false });

		if (l && l.length > 0) {
			res
				.header({
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				})
				.status(200)
				.json({
					statsCode: 200,
					data: l,
					error: {
						message: "",
					},
					message: "Product listed successfully",
				});
		} else {
			res
				.header({
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				})
				.status(404)
				.json({
					statsCode: 404,
					data: null,
					error: {
						message: "Product Not Found",
					},
					message: "Requested Product is not found",
				});
		}
	} catch (err) {
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
