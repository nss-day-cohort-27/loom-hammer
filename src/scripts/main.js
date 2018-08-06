const renderProductList = require("./product/ProductList")
const renderNavBar = require("./nav/NavBar")

renderNavBar().then(html => {
    document.querySelector("#navigation").innerHTML = html
    document.querySelector("#navbar").addEventListener("click", event => {
        const typeClickedOn = parseInt(event.target.id.split("--")[1])
        renderProductList(typeClickedOn)
    })


})
renderProductList()



