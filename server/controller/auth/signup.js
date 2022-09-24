const express = require("express");
const User = require("../../models/user");
const router = express.Router();
router.use(express.json());

router.post("/", async function (req, res) {
	try {
		let l = await User.find({
			$or: [
				{
					username: req.body?.username,
				},
				{
					email: req.body?.username,
				},
				{
					username: req.body?.email,
				},
				{
					email: req.body?.email,
				},
			],
		});

		if (l && l.length > 0) {
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
						message: "User exist",
					},
					message: "User is already exists",
				});
		} else {
			let user = new User(req.body);

			let d = await user.save();

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
					message: "User registered succssfully",
				});
		}
	} catch (err) {
		console.log(err);
		res
			.header({
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			})
			.status(200)
			.json({
				statsCode: 200,
				data: null,
				error: {
					message: err,
				},
				message: "Something went wrong",
			});
	}
});

module.exports = router;
