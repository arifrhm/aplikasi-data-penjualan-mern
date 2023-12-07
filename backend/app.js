import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import apiRoutes from './apiRoutes.js';
import cors from 'cors';
import { jenisBarangSeeder, barangSeeder, transaksiSeeder } from './utils/seeder.js'; // Replace with the actual path


const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/api', apiRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    async () => {
      try {
        // Run seeders
        await jenisBarangSeeder();
        await barangSeeder();
        await transaksiSeeder();

        console.log('All seeders executed successfully!');
      } catch (error) {
        console.error('Error running seeders:', error);
      }
    }
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;