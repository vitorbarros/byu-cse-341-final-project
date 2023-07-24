export default class OrderController {
  constructor({ orderService }) {
    this.orderService = orderService;
  }

  create = async (req, res) => {
    if (!req.body) {
      return res.status(400).json({ message: 'Invalid body' });
    }

    const requiredProperties = [
      'vehicleId',
      'userId',
      'sellPrice',
      'taxRate',
      'totalAmount',
    ];

    let invalidProperty = null;

    requiredProperties.forEach((property) => {
      if (req.body[property] === undefined) {
        invalidProperty = property;
      }
    });

    if (invalidProperty) {
      return res.status(400).json({ message: `Invalid ${invalidProperty}` });
    }

    const { vehicleId, userId, sellPrice, taxRate, totalAmount } = req.body;

    const order = await this.orderService.create({
      vehicleId,
      userId,
      sellPrice,
      taxRate,
      totalAmount,
    });

    return res.status(201).json({ id: order.insertedId });
  };

  findById = async (req, res) => {
    const order = await this.orderService.findById({ id: req.params.id });

    if (!order) {
      return res.status(404).json({ message: 'order not found' });
    }

    return res.status(200).json(order);
  };
}
