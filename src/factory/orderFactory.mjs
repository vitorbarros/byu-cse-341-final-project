import OrderService from '../service/order.mjs';
import OrderController from '../controller/orderController.mjs';

const orderFactory = () => {
  const orderService = new OrderService();
  return new OrderController({ orderService });
};

export default orderFactory;
