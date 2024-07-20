import Order from './../../../database/models/order.model.js';

// ! getOrders controller
const getOrders = async (req, res, next) => {
    const orders = await Order.find();
    res.status(200).json({ status: "success", count: orders.length, orders });
}

// ! getOrder controller
const getOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    res.status(200).json({ status: "success", order });
}

// ! addOrder controller
const addOrder = async (req, res, next) => {
    const order = await Order.create(req.body);
    res.status(200).json({ status: "order added successfully", order });
}

// ! updateOrder controller
const updateOrder = async (req, res, next) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ status: "order updated successfully", order });
}

// ! deleteOrder controller
const deleteOrder = async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "order deleted successfully", order });
}

// ! exporting controllers
export {
    getOrders,
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder
}