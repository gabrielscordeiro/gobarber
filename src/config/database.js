require('dotenv/config')

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,//criado em outra porta pois já tenho outro serviço rodando na 5432
  omitNull: true,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  },
};
