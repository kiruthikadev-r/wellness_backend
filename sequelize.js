const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('wellnesszdb', 'wellnesszdb_owner', 'yBtT64fhvXOP', {
  host: 'ep-holy-glitter-a5m4zl6n.us-east-2.aws.neon.tech',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
