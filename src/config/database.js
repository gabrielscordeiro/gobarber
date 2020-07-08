module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 123456,
  database: 'gobarber',
  port: 5433,//criado em outra porta pois já tenho outro serviço rodando na 5432
  omitNull: true,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  },
};
