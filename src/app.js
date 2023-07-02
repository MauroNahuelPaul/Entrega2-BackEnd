
import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

import productsRouter from "./routers/productsRouter.js";
import { manager } from "./helpers/productManager.js"
const productManager = manager
const app = express()


app.use(express.json())

app.get('/', (req, res) => res.status(200).json({ mensaje: 'server ok' }))
app.use('/conteiner', express.static('./src/public'))


app.use('/products', function (req, res, next) {
    req.view_config = 'home',
        next();
},
    productsRouter)

app.use('/realtimeproducts', function (req, res, next) {
    req.view_config = 'realtimeproducts', next();
},
    productsRouter)

const serverHttp = app.listen(8080, () => console.log('Server Up'))
const io = new Server(serverHttp)
io.on('connection', async socket => {
    console.log('Se ha conectado')
    socket.emit('products', await productManager.getProducts())

    socket.on('product', async data => {
        const { title, description, code, price, status, stock, category, thumbnails } = data
        await productManager.addProduct(title, description, code, price, status, stock, category, thumbnails)
        io.emit('products', await productManager.getProducts())
    })

    socket.on('idBorrar', async i => {
        console.log(i)
        await productManager.deleteProduct(parseInt(i))
        io.emit('products', await productManager.getProducts())
        await console.log(i)
    })

})
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
