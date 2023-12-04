// apiRoutes.js
import express from 'express';
import barangRoute from './routes/barang.routes.js';
import booksRoute from './routes/booksRoute.js';
import transaksiRoute from './routes/transaksi.routes.js';
import seededRoute from './routes/seeded.routes.js';
import authRoute from './routes/user.routes.js';

const router = express.Router();

router.use('/books', booksRoute);
router.use('/barang', barangRoute);
router.use('/transaksi', transaksiRoute);
router.use('/seeder', seededRoute);
router.use('/auth',authRoute);

export default router;