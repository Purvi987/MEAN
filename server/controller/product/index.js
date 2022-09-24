const express = require("express");
const router = express.Router();

const create = require("./create");
const update = require("./update");
const deleteProduct = require("./delete");
const get = require("./get");
const list = require("./list");

router.use("/create", create);
router.use("/update", update);
router.use("/delete", deleteProduct);
router.use("/list", list);
router.use("/get", get);

module.exports = router;
