import { Router } from 'express'
import { manager } from '../helpers/productManager.js'
const router = Router()

router.get('/', async (req, res) => {
    const limit = req.query.limit
    const view = req.view_config
    let products = await manager.getProducts()
    if (!limit) return res.render(view,{products})

    products = products.slice(0, limit)
    res.render(view,{products})
    /* res.status(200).json(data.slice(0, limit)) */

})

router.get('/:pid', async (req, res) => {
    const product = await manager.getElementById(parseInt(req.params.pid))
    if (product == null) return res.status(400).json({ error: 'El producto no existe' })

    res.status(200).json(product)
})

router.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    const error = await manager.addProduct(title, description, code, price, status, stock, category, thumbnails)
    if (error) {
        return res.status(400).json({ message: error })
    }

    res.status(200).json({ message: 'Producto registrado con éxito!' })
})

router.put('/:pid', async (req, res) => {
    const id = req.params.pid
    const product = await manager.getElementById(parseInt(id))
    if (product == null) {
        res.status(400).json({ menssage: `El producto ${id} no egfgfdxiste` })
    }
    else {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body
        const error = await manager.updateProduct(parseInt(id), title, description, code, price, status, stock, category, thumbnails)
        if (error) {
            return res.status(400).json({ message: error })
        }
        res.status(200).json({ message: `Actualización exitosa de usuario con id = ${id}` })
    }
})

router.delete('/:pid', async (req, res) => {
    const id = req.params.pid
    if (await manager.getElementById(parseInt(id)) !== undefined) {
        await manager.deleteProduct(parseInt(id))
        return res.status(200).json({ message: `Eliminacion del producto ${id} con exito` })
    }
    res.status(400).json({ message: `Producto ${id} no encontrado` })

})
export default router