import express from 'express';
import userFactory from './factory/userFactory.mjs';

const user = express.Router();

const uFactory = userFactory();

user.put('/:googleId', (req, res) => uFactory.updateByGoogleId(req, res));
user.delete('/:googleId', (req, res) => uFactory.deleteByGoogleId(req, res));

export default user;
