
import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productsRouter from "./routers/productsRouter.js";
import cartsRouter from "./routers/cartsRouter.js"
const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
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


app.use('/carts', cartsRouter)


const serverHttp = app.listen(8080, () => console.log('Server Up'))
const io = new Server(serverHttp)
io.on('connection', () => {
    console.log('Se ha conectado')
})