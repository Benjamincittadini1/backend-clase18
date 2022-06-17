const socket = io().connect()

const productTable = async (producto) => {
  const res = await fetch('./views/productos.hbs')
  const view = await res.text()
  const template = Handlebars.compile(view)
  const html = template({ product: producto })
  return html
}
socket.on('productos', (productos) => {
  productTable(productos).then((html) => {
    document.getElementById('productos').innerHTML = html
  })
})

const ingresoProducto = document.querySelector('#ingresarProducto')

ingresoProducto.addEventListener('submit', (e) => {
  e.preventDefault()
  const producto = {
    nombre: ingresoProducto.children.nombre.value,
    precio: ingresoProducto.children.precio.value,
    foto: ingresoProducto.children.foto.value
  }
  socket.emit('agregarProducto', producto)
  ingresoProducto.reset()
})



const chat = document.querySelector('#enviarMensaje')

chat.addEventListener('submit', (e) => {
  e.preventDefault()
  const mensaje = {
    usuario: document.querySelector('#usuario').value,
    fecha: new Date().toLocaleString(),
    mensaje: document.querySelector('#mensaje').value
  }
  socket.emit('nuevoMensaje', mensaje);
  document.querySelector('#mensaje').value = ''
})

const render = (data) => {
  if (data) {
    const html = data
      .map((msj) => {
        return `<p>
                  <span class="usuario">${msj.usuario}</span> <span class="fecha">[${msj.fecha}]</span><span class="mensaje">: ${msj.mensaje}</span>
                </p>`
      })
      .join(' ')
    document.querySelector('#mensajes').innerHTML = html
  } else {
    document.querySelector('#mensajes').innerHTML = `<h4>No hay mensajes</h4>`
  }

}


socket.on('mensajes', (data) => render(data))

