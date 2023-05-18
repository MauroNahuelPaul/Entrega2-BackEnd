
import express from 'express'
import { manager } from "./productManager.js";
const app = express()

app.get('/', (request, response) => {
    //html onwire! (vistas)
    response.send('<h1>Bienvenido</h1>')
})

app.get('/products', async (request, response) => {
    const limit = request.query.limit
    if (!limit) {
        response.send(await manager.getProducts())
    } else {
        const data = await manager.getProducts()
        let res = []
        for (let i = 0; i < limit; i++) {
            res.push(data[i])
        }
        response.send(res)
    }
})

app.get('/products/:id', async (request, response) => {
    const products = await manager.getProducts()
    const id = request.params.id
    const product = products.find(item => item.id == id)
    if (!id) return response.send({ error: 'El curso no existe' })
    response.send(product)
})

app.listen(8080, () => console.log('Server Up'))