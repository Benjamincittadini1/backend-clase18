class Productos {
    constructor(knex, table) {
        this.knex = knex;
        this.table = table;
        this.knex.schema.hasTable(this.table).then(exists => {
            if (!exists) {
                this.knex.schema.createTable(this.table, table => {
                    table.string('nombre');
                    table.string('descripcion');
                    table.string('precio');
                    table.string('foto');
                })
                    .then(() => console.log('Tabla productos creada'))
                    .catch(err => { console.log(err); throw err })
            }
        })
    }

    async save(product) {
        this.knex(this.table).insert(product)
            .then(art => art)
            .catch(err => { console.log(err); throw err });

    }

    async getAll() {
        try {
            let arrProd = await this.knex.from(this.table).select("*")
            return arrProd
        }
        catch (err) {
            console.log(err);
            throw err
        }
    }
}

module.exports = Productos;
