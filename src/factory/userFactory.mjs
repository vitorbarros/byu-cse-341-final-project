import UserService from '../service/userService.mjs';
import UserController from '../controller/userController.mjs';

const userFactory = () => {
  const userService = new UserService();
  return new UserController({ userService });
};

export default userFactory;
