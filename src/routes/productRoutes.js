import express from 'express';
import { addProducts, deleteItembyId, editItems, getAllItems } from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const productRouter = express.Router();

// Public routes
productRouter.get('/get-items', getAllItems); // Anyone can view items

// Protected routes (Vendor only)
productRouter.post('/add', authMiddleware, roleMiddleware(['vendor', 'admin']), addProducts);
productRouter.post('/edit/:id', authMiddleware, roleMiddleware(['vendor', 'admin']), editItems);
productRouter.post('/delete/:id', authMiddleware, roleMiddleware(['vendor', 'admin']), deleteItembyId);

export default productRouter;