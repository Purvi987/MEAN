const express = require("express");
const authorizer = require("../../middleware/authorizer");
const Product = require("../../models/product");

const router = express.Router();

router.delete("/:id", authorizer, async function (req, res) {
	try {
		const { id } = req.params;
		const { user } = req.headers;

		let ol = await Product.findById(id);
		console.warn(ol);
		if (user?.user?._id.toString() === ol.owner?._id?.toString()) {
			let l = await Product.findByIdAndUpdate(
				id,
				{ delete: true },
				{
					new: true,
				}
			);
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
						message: "Product deleted successfully",
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
		} else {
			res
				.header({
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				})
				.status(403)
				.json({
					statsCode: 403,
					data: null,
					error: {
						message: "Unauthorized",
					},
					message: "You are not authorized for delete product",
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
