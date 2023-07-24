import express from 'express';
import orderFactory from './factory/orderFactory.mjs';

const store = express.Router();

const oFactory = orderFactory();

store.post('/order', (req, res) => oFactory.create(req, res));
store.get('/order/:id', (req, res) => oFactory.findById(req, res));

export default store;
