const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authorizer = async (req, res, next) => {
	const { authorization } = req.headers;

	if (authorization) {
		const decodeToken = jwt.decode(authorization);
		let data = null;

		data = await User.findOne({
			deleted: false,
			_id: decodeToken.id,
		});
		if (data) {
			req.headers.user = { decodeToken, authorization, user: data };
			next();
		} else {
			res
				.header({
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				})
				.status(404)
				.send({
					statusCode: 404,
					data: null,
					message: "User not found",
					err: {
						message: "User not found",
					},
				});
		}
	} else {
		res
			.header({
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			})
			.status(401)
			.send({
				statusCode: 401,
				data: null,
				message: "Token is in-valid",
				err: {
					message: "Token is required",
				},
			});
	}
};

module.exports = authorizer;
