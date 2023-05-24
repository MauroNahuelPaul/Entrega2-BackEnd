
import express from 'express'
import { manager } from "./productManager.js";
const app = express()

app.get('/', (req, res) => res.status(200).json({ mensaje: 'server ok' }))

app.get('/products', async (req, res) => {
    const limit = req.query.limit
    if (!limit) return res.status(200).json(await manager.getProducts())

    const data = await manager.getProducts()
    res.status(200).json(data.slice(0, limit))

})

app.get('/products/:id', async (req, res) => {
    const product = await manager.getElementById(parseInt(req.params.id))
    if (product == null) return res.status(400).json({ error: 'El producto no existe' })

    res.status(200).json(product)
})

app.listen(8080, () => console.log('Server Up'))