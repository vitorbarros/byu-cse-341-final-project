export default class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  findByGoogleId = async (req, res) => {
    const order = await this.userService.findByGoogleId({
      findByGoogleId: req.params.findByGoogleId,
    });

    if (!order) {
      return res.status(404).json({ message: 'order not found' });
    }

    return res.status(200).json(order);
  };

  updateByGoogleId = async (req, res) => {
    if (!req.params.googleId) {
      return res.status(400).json({ message: 'Invalid googleId' });
    }

    const { displayName, firstName, lastName, image } = req.body;

    try {
      await this.userService.update({
        googleId: req.params.googleId,
        displayName,
        firstName,
        lastName,
        image,
      });

      return res.status(204).json({});
    } catch (e) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  deleteByGoogleId = async (req, res) => {
    if (!req.params.googleId) {
      return res.status(400).json({ message: 'Invalid googleId' });
    }

    try {
      await this.userService.delete({ googleId: req.params.googleId });

      return res.status(200).json({ message: 'user deleted' });
    } catch (e) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}
