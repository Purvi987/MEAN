const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
const auth = require("./controller/auth");
const product = require("./controller/product");
const { db } = require("./endpoints");
const mongoose = require("mongoose");
const nodeCron = require("node-cron");
const Product = require("./models/product");
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "100mb" }));
app.use("/auth", auth);
app.use("/product", product);

app.use((req, res, next) => {
	return res.status(404).json({
		error: "Api Not Found",
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
	mongoose.connect(
		db,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		(err) => {
			if (err) throw err;
			console.log("Connected to MongoDB!!!");

			const job = nodeCron.schedule(
				"0 0 0 * * *",
				async function jobYouNeedToExecute() {
					console.warn(new Date().toISOString());
					const l = await Product.find({
						expiryDate: new Date().toISOString(),
					});

					await Promice.all(
						l.map(
							async (ele) =>
								await Product.findByIdAndUpdate(ele._id.toISOString(), {
									delete: true,
								})
						)
					);
				}
			);

			job.start();
		}
	);
});
