import Order from './../../../database/models/order.model.js';
import apiFeatures from '../../../utils/apiFeatures.js';
import catchError from '../../../utils/catchError.js';

// ! getOrders controller
const getOrders = catchError(async (req, res, next) => {
    const features = apiFeatures(Order.find(), req.query)
    let orders = await features.query;
    res.status(200).json({
        status: "success", meta: {
            page: features.page,
            count: orders.length,
        }, orders
    });
})

// ! getOrder controller
const getOrder = catchError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    res.status(200).json({ status: "success", order });
}
)

// ! addOrder controller
const addOrder = catchError(async (req, res, next) => {
    const order = await Order.create(req.body);
    res.status(200).json({ status: "order added successfully", order });
})

// ! updateOrder controller
const updateOrder = catchError(async (req, res, next) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ status: "order updated successfully", order });
})

// ! deleteOrder controller
const deleteOrder = catchError(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "order deleted successfully", order });
})

// ! exporting controllers
export {
    getOrders,
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder
}