const DataManager = require("../data/DataManager")

const buildFormTemplate = (types) => {
    return `
        <fieldset>
            <label for="productName">Product name:</label>
            <input required type="text" name="productName" id="productName">
        </fieldset>
        <fieldset>
            <label for="productDescription">Description:</label>
            <input required type="text" name="productDescription" id="productDescription">
        </fieldset>
        <fieldset>
            <label for="productPrice">Price:</label>
            <input required type="number" name="productPrice" id="productPrice">
        </fieldset>
        <fieldset>
            <label for="productQuantity">Quantity:</label>
            <input required type="number" name="productQuantity" id="productQuantity">
        </fieldset>
        <fieldset>
            <label for="productType">Category:</label>
            <select required name="productType" id="productType">
            ${types}
            </select>
        </fieldset>
        <button class="btn btn--save">Save Product</button>
    `
}

const renderForm = () => {
    return DataManager.getTypes()
        .then(types => {
            const options = types.map(type => {
                return `<option id="${type.id}">${type.description}</option>`
            }).join("")
            return buildFormTemplate(options)
        })
}

module.exports = renderForm
