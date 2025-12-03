
import express, { json } from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js'
import db from './config.js';
import profileRouter from './src/routes/profileRoutes.js';
dotenv.config();
import cors from 'cors'
import RolesRouter from './src/routes/rolesroutes.js';
import authMiddleware from './src/middleware/authMiddleware.js';
import categoryRouter from './src/routes/categoryRoutes.js';
import productRouter from './src/routes/productRoutes.js';
import orderRouter from './src/routes/orderRoutes.js';
import adminRouter from './src/routes/adminRoutes.js';
import seedAdmin from './seedAdmin.js';

const app = express();

app.use(json())
app.use(cors());

// Task 
// make api for categories of plants 

app.get('/health', (req, res) => {
    res.send("Server is Running correctly ...");
})

db();
// seedAdmin();
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/roles', RolesRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server run ho raha es ${process.env.PORT} PORT per `)
})