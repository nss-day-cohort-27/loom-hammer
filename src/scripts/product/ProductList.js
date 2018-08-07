const DataManager = require("../data/DataManager")

function renderProductList (target, typeId) {
    DataManager.getProducts()
        .then(products => {
            const container = document.querySelector(target)
            container.textContent = ""

            // Filter all products to the ones that have the correct type
            const filteredProducts = products.filter(prod => prod.type === typeId)

            // Display only the products that are of the correct type
            filteredProducts.forEach(product => {
                container.innerHTML += `<p>${product.name} $${product.price}</p>`
            })
        })
}

module.exports = renderProductList
