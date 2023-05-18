import fs  from 'fs'
class ProductManager {
    #format
    #path
    #error
    constructor(path) {
        this.#path = path
        if (!fs.existsSync(this.#path)) {
            fs.writeFileSync(this.#path, '[]')
        }
        this.#error
        this.#format = 'utf-8'
    }

    getProducts = async () => {
        return JSON.parse(await fs.promises.readFile(this.#path, this.#format))
    }
    getElementById = async (id) => {
        const products = await this.getProducts()
        return products.find(item => item.id === id)


    }
    updateProduct = async (id, title, description, price, thumbnail, code, stock) => {
        const products = await this.getProducts()
        const objeto = products.find(item => item.id === id)
        const indice = products.indexOf(objeto)
        if (indice == -1) {
            console.log("No se encontro del objeto")
        }
        else {
            id = objeto.id
            this.#isValid(products, title, description, price, thumbnail, code, stock)
            if (this.#error === undefined) {
                products[indice] = ({ id, title, description, price, thumbnail, stock, code })
                await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))
            }
            else {
                console.log(this.#error)
                this.#error = undefined
            }
        }

    }
    deleteProduct = async (id) => {
        const products = await this.getProducts()
        const objeto = products.find(item => item.id === id)
        const indice = products.indexOf(objeto)

        if (indice == -1) {
            console.log("No se encontro del objeto")
        }
        else {
            products.splice(indice, 1)
            await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))

        }
    }

    #isValid = (products, title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !stock || !code) {
            this.#error = `[${title}]: campos incompletos`
        } else {
            const found = products.find(item => item.code === code)
            if (found) this.#error = `[${title}]: el code ya existe`
        }

    }
    #generateCode = (products) => {

        return (products.length === 0) ? 1 : products[products.length - 1].id + 1
    }
    async addProduct(title, description, price, thumbnail, code, stock) {
        const products = await this.getProducts()
        this.#isValid(products, title, description, price, thumbnail, code, stock)

        if (this.#error === undefined) { products.push({ id: this.#generateCode(products), title, description, price, thumbnail, stock, code }) }
        else {
            console.log(this.#error)
            this.#error = undefined
        }
        await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))
    }
}

const manager = new ProductManager('./products.json')
export {manager}

/* manager.addProduct("dsfdsf", "dfsdf negro", 13, "xxxxxxx", 40, 10) */
/* manager.deleteProduct(3)*/
/* manager.updateProduct(1,"sdsdsd", "sdsdsd", 15, "sdsdsd", 5, 6) */
/* manager.getProducts().then(console.log); */
