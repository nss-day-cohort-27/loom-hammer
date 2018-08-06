const DataManager = require("../data/DataManager")

function renderNavBar () {
    return DataManager.getTypes().then(types => {
        let navHTML = "<nav id=\"navbar\">"

        types.forEach(type => {
            navHTML += `<a id="type--${type.id}" href="#">${type.description}</a>`
        })

        navHTML += "<a href=\"#\">Create Product</a>"
        navHTML += "</nav>"

        return navHTML
    })
}

module.exports = renderNavBar
