// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.post("/products", (req, res) => {
    res.send("Server is ready");
});

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log('Server started on http://localhost:5000 ');
});

// XORdnDnm7amKJFOj