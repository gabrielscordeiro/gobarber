module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 123456,
  database: 'gobarber',
  port: 5433,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  },
};
