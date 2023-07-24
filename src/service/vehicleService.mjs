import Vehicle from '../model/vehicle.mjs';

export default class VehicleService {
  constructor() {
    this.vehicle = null;
  }

  create = ({
    name,
    make,
    year,
    color,
    stock,
    price,
    sold,
    description,
    category,
    buyer,
  }) => {
    this.vehicle = new Vehicle({
      name,
      make,
      year,
      color,
      stock,
      price,
      sold,
      description,
      category,
      buyer,
    });

    return this.vehicle.create();
  };

  findAll = () => {
    this.vehicle = new Vehicle({});
    return this.vehicle.findAll();
  };

  findAllBySold = ({ sold }) => {
    this.vehicle = new Vehicle({});

    return this.vehicle.findBy({
      field: 'sold',
      value: sold,
    });
  };

  findById = ({ id }) => {
    this.vehicle = new Vehicle({});
    return this.vehicle.findBy({
      field: '_id',
      value: id,
    });
  };

  update = ({
    id,
    name,
    make,
    year,
    color,
    stock,
    price,
    sold,
    description,
    category,
    buyer,
  }) => {
    this.vehicle = new Vehicle({
      name,
      make,
      year,
      color,
      stock,
      price,
      sold,
      description,
      category,
      buyer,
    });

    return this.vehicle.update({ id });
  };

  delete = ({ id }) => {
    this.vehicle = new Vehicle({});
    return this.vehicle.delete({ id });
  };
}
