import User from '../model/user.mjs';

export default class UserService {
  constructor() {
    this.user = null;
  }

  async findOrCreate(profile) {
    this.user = new User({});

    const user = await this.user.findBy({
      field: 'googleId',
      value: profile.id,
    });
    if (user) {
      return user;
    }
    this.user = new User({
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value,
    });
    return this.user.create();
  }

  async findByGoogleId({ googleId }) {
    this.user = new User({});
    return this.user.findBy({
      field: 'googleId',
      value: googleId,
    });
  }

  update = ({ googleId, displayName, firstName, lastName, image }) => {
    this.vehicle = new User({
      googleId,
      displayName,
      firstName,
      lastName,
      image,
    });

    const user = this.user.findBy({
      field: 'googleId',
      value: googleId,
    });

    return this.vehicle.update({ id: user._id });
  };

  delete = ({ googleId }) => {
    this.user = new User({});

    const user = this.user.findBy({
      field: 'googleId',
      value: googleId,
    });

    return this.vehicle.delete({ id: user._id });
  };
}
