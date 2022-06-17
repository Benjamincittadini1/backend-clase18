
const express = require('express')
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Productos = require('./db/productos.js')
const Mensajes = require('./db/mensajes.js')
const { knexProductos, knexMensajes } = require('./db/config.js')


const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const productos = new Productos(knexProductos, 'productos')
const mensajes = new Mensajes(knexMensajes, 'mensajes')

io.on('connection', async socket => {
  console.log('Usuario conectado')

  socket.emit('productos', await productos.getAll())

  socket.on('agregarProducto', async (producto) => {
    await productos.save(producto)
    io.sockets.emit('productos', await productos.getAll())
  })

  socket.emit('mensajes', await mensajes.getAll())

  socket.on('nuevoMensaje', async (data) => {
    await mensajes.save(data)
    io.sockets.emit('mensajes', await mensajes.getAll())
  })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const PORT = 8080
const server = httpServer.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`))
server.on('error', (error) => console.log(`Error en servidor ${error}`))
