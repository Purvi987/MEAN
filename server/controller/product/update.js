const express = require("express");
const authorizer = require("../../middleware/authorizer");
const Product = require("../../models/product");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json({ limit: "100mb" }));
router.use(bodyParser.urlencoded({ extended: false, limit: "100mb" }));
router.put("/:id", authorizer, async function (req, res) {
	try {
		const handleProductUpdate = async () => {
			let l = await Product.findByIdAndUpdate(
				id,
				{ ...req.body, updateOn: new Date() },
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
						message: "Product updated successfully",
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
		};

		const checkPrice = () => {
			if (
				req?.body?.price <= ol.price - ol.price / 10 ||
				req?.body?.price <= ol.price + ol.price / 10
			) {
				handleProductUpdate();
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
						message: `Price should be in the range of ${
							ol.price - ol.price / 10
						} - ${ol.price + ol.price / 10}`,
					});
			}
		};

		const { id } = req.params;
		const { user } = req.headers;

		let ol = await Product.findById(id);
		if (user?.user?._id.toString() === ol.owner._id.toString()) {
			if (Object.keys(req?.body).includes("price")) {
				if (!ol?.updateOn) {
					checkPrice();
				} else {
					let c = new Date().getTime();
					let y = new Date(ol?.updateOn).getTime();

					if ((c - y) / 1000 > 60 * 60 * 24) {
						checkPrice();
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
								message: "You can update the price only once in a day",
							});
					}
				}
			} else {
				handleProductUpdate();
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
