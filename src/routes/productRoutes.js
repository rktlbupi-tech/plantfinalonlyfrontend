import express from 'express';
import { addProducts, deleteItembyId, editItems, getAllItems } from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const productRouter = express.Router();


productRouter.post('/add', addProducts);
productRouter.post('/get-items', getAllItems);
productRouter.post('/edit/:id', editItems);
productRouter.post('/delete/:id', deleteItembyId);



export default productRouter;