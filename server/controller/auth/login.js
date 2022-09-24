const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.use(express.json());

const User = require("../../models/user");

router.post("/", async function (req, res) {
	try {
		const { username, password } = req.body;

		let user = await User.findOne({
			deleted: false,
			$or: [
				{
					username: username,
				},
				{
					email: username,
				},
			],
		});

		if (!user) {
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
						message: "User not found",
					},
					message: "Check the credentials carefully",
				});
		} else if (password !== user.password) {
			res
				.header({
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				})
				.status(401)
				.json({
					statsCode: 401,
					data: null,
					error: {
						message: "Un-authorized",
					},
					message: "please check the username and password",
				});
		} else {
			const token = jwt.sign(
				{
					username: user.username,
					id: user._id.toString(),
				},
				"mean",
				{ expiresIn: "6h" }
			);
			res
				.header({
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				})
				.status(200)
				.json({
					statsCode: 200,
					data: { token, userId: user._id.toString() },
					error: { message: null },
					message: "User validate successfully",
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
				error: { message: err },
				message: "Something went wrong",
			});
	}
});

module.exports = router;
