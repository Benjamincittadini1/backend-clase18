const knexProductos = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'ecommerce'
    },
    pool: { min: 0, max: 7 }
});

const knexMensajes = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './db/msj.sqlite'
    },
    useNullAsDefault: true
});

module.exports = {
    knexProductos,
    knexMensajes
};