const ProductForm = require("./product/ProductForm")

ProductForm().then(formTemplate => {
    document.querySelector("#container").innerHTML = formTemplate
})




