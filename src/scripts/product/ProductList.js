const DataManager = require("../data/DataManager")

function renderProductList (productTypeId) {
    DataManager.getProducts()
        .then((products) => {
            const container = document.querySelector("#container")
            container.textContent = ""

            // Filter all products to the ones that have the correct type
            const filteredProducts = products.filter(product => {
                return product.type === productTypeId
            })

            // Display only the products that are of the correct type
            filteredProducts.forEach(product => {
                container.innerHTML += `<p>${product.name} $${product.price}</p>`
            })
        })
}

module.exports = renderProductList
