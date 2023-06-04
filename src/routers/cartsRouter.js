import { Router } from 'express'
import { manager } from '../helpers/cartManager.js'
const router = Router()

router.post('/', async (req, res) => {
    manager.addCart()
    res.status(200).json({ message: 'Carrito creado con éxito!' })
})
router.get('/:cid', async (req, res) => {
    const id = req.params.cid
    const Cart = await manager.getElementById(parseInt(id))
    if (Cart == null) return res.status(400).json({ error: 'El carrito no existe' })
    res.status(200).json(Cart.products)
})
router.post('/:cid/product/:pid', async (req, res) => {
    const carritoId = req.params.cid
    const productId = req.params.pid
    const Cart = await manager.getElementById(parseInt(carritoId))
    if (Cart == null) return res.status(400).json({ error: 'El carrito no existe' })
    await manager.addProductCart(parseInt(carritoId), parseInt(productId))
    res.status(200).json({ message: "Producto agregado al carrito con exito" })
})
export default router