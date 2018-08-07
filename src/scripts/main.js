const DataManager = require("./data/DataManager")
const renderProductList = require("./product/ProductList")
const renderNavBar = require("./nav/NavBar")
const renderForm = require("./product/ProductForm")


const saveProduct = (product) => {
    // Save the product to the API
    DataManager.saveProduct(product)
    .then(() => {
        renderProductList("#container", product.type)
    })
}

renderNavBar().then(html => {
    document.querySelector("#navigation").innerHTML = html
    document.querySelector("#navbar").addEventListener("click", event => {
        const linkId = event.target.id.split("--")[1]
        if (!linkId) {
            renderForm("#container", saveProduct)
        } else {
            const typeClickedOn = parseInt(linkId)
            renderProductList("#container", typeClickedOn)
        }

    })
})
renderProductList("#container")



