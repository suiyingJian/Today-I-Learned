const { Sequelize, DataTypes, Model, Op } = require('sequelize');

const sequelize = new Sequelize("coderhub", 'root', 'Coderwhy888.', {
  host: 'localhost',
  dialect: 'mysql'
});

class Brand extends Model {};
Brand.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNotNull: false
  },
  website: DataTypes.STRING,
  phoneRank: DataTypes.INTEGER
}, {
  tableName: 'brand',
  createdAt: false,
  updatedAt: false,
  sequelize
});

class Product extends Model {}
Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNotNull: false
  },
  price: DataTypes.DOUBLE,
  score: DataTypes.DOUBLE,
  brandId: {
    field: 'brand_id',
    type: DataTypes.INTEGER,
    references: {
      model: Brand,
      key: 'id'
    }
  }
}, {
  tableName: 'products',
  createdAt: false,
  updatedAt: false,
  sequelize
});

// 将两张表联系在一起
Product.belongsTo(Brand, {
  foreignKey: 'brandId'
});

async function queryProducts() {
  const result = await Product.findAll({
    include: {
      model: Brand
    }
  });
  console.log(result);
}

queryProducts();

