import Order from '../model/order.mjs';
import Vehicle from '../model/vehicle.mjs';
import User from '../model/user.mjs';

export default class OrderService {
  constructor() {
    this.order = null;
    this.vehicle = null;
    this.user = null;
  }

  create = async ({ vehicleId, userId, sellPrice, taxRate, totalAmount }) => {
    this.vehicle = new Vehicle({});

    const vehicle = await this.vehicle.findBy({
      field: '_id',
      value: vehicleId,
    });

    if (!vehicle) {
      throw new Error('vehicle_not_found');
    }

    if (vehicle.stock === 0) {
      throw new Error('vehicle_out_of_stock');
    }

    this.user = new User({});

    const user = await this.user.findBy({
      field: '_id',
      value: userId,
    });

    if (!user) {
      throw new Error('user_not_found');
    }

    this.order = new Order({
      vehicleId,
      userId,
      sellPrice,
      taxRate,
      totalAmount,
      createdAt: new Date(),
    });

    return this.order.create();
  };

  findById = ({ id }) => {
    this.order = new Order({});
    return this.order.findBy({
      field: '_id',
      value: id,
    });
  };
}
