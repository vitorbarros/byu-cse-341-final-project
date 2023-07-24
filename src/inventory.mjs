import express from 'express';
import vehicleFactory from './factory/vehicleFactory.mjs';

const inventory = express.Router();

const vFactory = vehicleFactory();

inventory.post('/', (req, res) => vFactory.create(req, res));
inventory.get('/', (req, res) => vFactory.findAll(req, res));
inventory.get('/:id', (req, res) => vFactory.findById(req, res));
inventory.put('/:id', (req, res) => vFactory.update(req, res));
inventory.delete('/:id', (req, res) => vFactory.delete(req, res));

export default inventory;
