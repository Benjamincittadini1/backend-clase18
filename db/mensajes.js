class Mensajes {
  constructor(knex, table) {
    this.knex = knex;
    this.table = table;
    this.knex.schema.hasTable(this.table).then(exists => {
      if (!exists) {
        this.knex.schema.createTable(this.table, table => {
          table.string('usuario');
          table.string('fecha');
          table.string('mensaje');
        })
          .then(() => console.log('Tabla productos creada'))
          .catch(err => { console.log(err); throw err })
      }
    })
  }

  async save(msj) {
    this.knex(this.table).insert(msj)
      .then(art => art)
      .catch(err => { console.log(err); throw err });

  }

  async getAll() {
    try {
      let arrMsj = await this.knex.from(this.table).select("*")
      return arrMsj
    }
    catch (err) {
      console.log(err);
      throw err
    }
  }
}

module.exports = Mensajes;