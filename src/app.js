
import express from 'express'
import productsRouter from "./routers/productsRouter.js";
import cartsRouter from "./routers/cartsRouter.js"
const app = express()
app.use(express.json())

app.get('/', (req, res) => res.status(200).json({ mensaje: 'server ok' }))

app.use('/products', productsRouter)
app.use('/carts', cartsRouter)


app.listen(8080, () => console.log('Server Up'))