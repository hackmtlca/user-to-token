import "reflect-metadata"

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRoute from './api';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

async function bootstrap() {
    console.log(`\nUser to Token`);
    console.log(`Developed by Alexandre Lavoie\n`);

    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
    }
    
    fs.copyFileSync('./models/user-to-token.db', './data/user-to-token.db');

    console.log('Cleared database');

    const app = express();

    app.use(cors());

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/", apiRoute);

    app.listen({ port: 1337 }, () =>
        console.log(`Server started on: http://localhost:${1337}/`)
    );
}

bootstrap();