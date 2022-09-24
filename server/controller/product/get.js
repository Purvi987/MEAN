const express = require("express");
const authorizer = require("../../middleware/authorizer");
const Product = require("../../models/product");
const router = express.Router();

router.get("/:id", authorizer, async (req, res) => {
	try {
		const { id } = req.params;
		let l = await Product.findById(id);

		if (l) {
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
					message: "Product get successfully",
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
