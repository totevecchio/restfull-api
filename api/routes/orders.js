const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const controllerOrders = require("../controllers/orders");

router.get("/", checkAuth, controllerOrders.get_all);

router.post("/", checkAuth, controllerOrders.post_order);

router.get("/:orderId", checkAuth, controllerOrders.get_order_byId)

router.delete("/:orderId", checkAuth, controllerOrders.delete_order_byId)

module.exports = router;
