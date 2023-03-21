import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import authorRoutes from './routes/Author';
import bookRoutes from './routes/Book';

const router = express();

mongoose
.connect(config.mongo.url, {retryWrites: true, w: 'majority'})
.then(() => {
    console.log('Connected to MongoDB');
    StartServer();
})
.catch((error) => {
    console.log(error);
})

const StartServer = () => {
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    router.use('/authors', authorRoutes);
    router.use('/books', bookRoutes);

    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong'}))

    http.createServer(router).listen(config.server.port, () => {
        console.log(`Server is running on port ${config.server.port}`);
    })
}