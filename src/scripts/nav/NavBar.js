const DataManager = require("../data/DataManager")

function renderNavBar () {
    return DataManager.getTypes().then(types => {
        let navHTML = "<nav id=\"navbar\">"

        types.forEach(type => {
            navHTML += `<a class="navLink" id="type--${type.id}" href="#">${type.description}</a>`
        })

        navHTML += "<a class=\"navLink\" href=\"#\">Create Product</a>"
        navHTML += "</nav>"

        return navHTML
    })
}

module.exports = renderNavBar
