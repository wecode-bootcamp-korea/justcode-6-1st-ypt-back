const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log('order Data Source has been initialized!');
  })
  .catch(() => {
    console.log('Database initiate fail');
  });

const order = async (user_id,product_id,num,price,total_price,message) => {
    console.log("order in")
    const order = await myDataSource.query(
        `INSERT INTO orders(user_id, product_id, num, price, total_price,message)
        VALUES(?,?,?,?,?,?)`,
        [user_id, product_id, num, price, total_price,message]
    )
    return order
}
module.exports = {
    order
}