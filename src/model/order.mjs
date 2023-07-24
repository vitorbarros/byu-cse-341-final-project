import { ObjectId } from 'mongodb';
import client from '../infra/database.mjs';
import envs from '../config/envs.mjs';

export default class Order {
  constructor({
    vehicleId,
    userId,
    sellPrice,
    taxRate,
    totalAmount,
    createdAt,
  }) {
    this.collection = 'orders';
    this.vehicleId = vehicleId;
    this.userId = userId;
    this.sellPrice = sellPrice;
    this.taxRate = taxRate;
    this.totalAmount = totalAmount;
    this.createdAt = createdAt;
  }

  create = () =>
    client.db(envs.MONGO_DB_NAME).collection(this.collection).insertOne({
      vehicle_id: this.vehicleId,
      user_id: this.userId,
      sell_price: this.sellPrice,
      tax_rate: this.taxRate,
      total_amount: this.totalAmount,
      created_at: this.createdAt,
    });

  findBy = ({ field, value }) => {
    let parsedValue = value;
    if (field === '_id') {
      parsedValue = new ObjectId(value);
    }

    return client
      .db(envs.MONGO_DB_NAME)
      .collection(this.collection)
      .findOne({ [field]: parsedValue });
  };
}
