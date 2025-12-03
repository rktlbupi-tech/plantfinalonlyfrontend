import express from 'express';
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const orderRouter = express.Router();

// User routes
orderRouter.post('/create', authMiddleware, createOrder);
orderRouter.get('/my-orders', authMiddleware, getMyOrders);

// Admin/Vendor routes
orderRouter.get('/all-orders', authMiddleware, roleMiddleware(['admin', 'vendor']), getAllOrders);
orderRouter.put('/update-status/:id', authMiddleware, roleMiddleware(['admin', 'vendor']), updateOrderStatus);

export default orderRouter;
