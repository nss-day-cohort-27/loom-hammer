(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
    Purpose: Store and retrieve data from remote API
*/

const APIObject = {
    /*
        Purpose: Make GET request to API to retrieve product types
    */
    getTypes () {
        return fetch("http://localhost:8088/types")
            .then(response => response.json());
    },

    /*
        Purpose: Retrieves all product objects from API
    */
    getProducts () {
        return fetch("http://localhost:8088/inventory")
        .then(response => response.json());
    },

    /*
        Purpose: POSTs (creates) a new product in the API
    */
    saveProduct (product) {
        return fetch("http://localhost:8088/inventory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
    }

}

module.exports = APIObject

},{}],2:[function(require,module,exports){
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
        const typeClickedOn = parseInt(event.target.id.split("--")[1])
        renderProductList("#container", typeClickedOn)
    })
})
// renderProductList()
renderForm("#container", saveProduct)




},{"./data/DataManager":1,"./nav/NavBar":3,"./product/ProductForm":4,"./product/ProductList":5}],3:[function(require,module,exports){
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

},{"../data/DataManager":1}],4:[function(require,module,exports){
const DataManager = require("../data/DataManager")
const renderProductList = require("./ProductList")

let instructions = null

/*
    Purpose: Adds the event listener to the Save Product button
        and construct the object to be saved to the API when the
        button is clicked
*/
const addListener = () => {
    document.querySelector(".btn--saveProduct")
        .addEventListener("click", () => {
            const product = {}
            product.name = document.querySelector("#productName").value
            product.description = document.querySelector("#productDescription").value
            product.price = parseFloat(document.querySelector("#productPrice").value)
            product.quantity = parseInt(document.querySelector("#productQuantity").value)
            product.type = parseInt(document.querySelector("#productType").value)

            instructions(product)
        })
}

/*
    Purpose: Build the product form component
    Arguments: types (string) - The option strings to put in the select
*/
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
            ${types.join("")}
            </select>
        </fieldset>
        <button class="btn btn--saveProduct">Save Product</button>
    `
}

/*
    Purpose: Renders the form component to the target element
    Arguments: targetElement (string) - Query selector string for HTML element
*/
const renderForm = (targetElement, saveInstructions) => {
    instructions = saveInstructions
    return DataManager.getTypes()
        .then(types => {
            // Build options from the product types
            const options = types.map(type => {
                return `<option value="${type.id}">${type.description}</option>`
            })

            // Render the form to the DOM
            document.querySelector(targetElement).innerHTML = buildFormTemplate(options)

            // Now that it's on the DOM, add the event listener
            addListener()
        })
}

module.exports = renderForm

},{"../data/DataManager":1,"./ProductList":5}],5:[function(require,module,exports){
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

},{"../data/DataManager":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEvRGF0YU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25hdi9OYXZCYXIuanMiLCIuLi9zY3JpcHRzL3Byb2R1Y3QvUHJvZHVjdEZvcm0uanMiLCIuLi9zY3JpcHRzL3Byb2R1Y3QvUHJvZHVjdExpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qXG4gICAgUHVycG9zZTogU3RvcmUgYW5kIHJldHJpZXZlIGRhdGEgZnJvbSByZW1vdGUgQVBJXG4qL1xuXG5jb25zdCBBUElPYmplY3QgPSB7XG4gICAgLypcbiAgICAgICAgUHVycG9zZTogTWFrZSBHRVQgcmVxdWVzdCB0byBBUEkgdG8gcmV0cmlldmUgcHJvZHVjdCB0eXBlc1xuICAgICovXG4gICAgZ2V0VHlwZXMgKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdHlwZXNcIilcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIFB1cnBvc2U6IFJldHJpZXZlcyBhbGwgcHJvZHVjdCBvYmplY3RzIGZyb20gQVBJXG4gICAgKi9cbiAgICBnZXRQcm9kdWN0cyAoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9pbnZlbnRvcnlcIilcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgUHVycG9zZTogUE9TVHMgKGNyZWF0ZXMpIGEgbmV3IHByb2R1Y3QgaW4gdGhlIEFQSVxuICAgICovXG4gICAgc2F2ZVByb2R1Y3QgKHByb2R1Y3QpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ludmVudG9yeVwiLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocHJvZHVjdClcbiAgICAgICAgfSlcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBUElPYmplY3RcbiIsImNvbnN0IERhdGFNYW5hZ2VyID0gcmVxdWlyZShcIi4vZGF0YS9EYXRhTWFuYWdlclwiKVxuY29uc3QgcmVuZGVyUHJvZHVjdExpc3QgPSByZXF1aXJlKFwiLi9wcm9kdWN0L1Byb2R1Y3RMaXN0XCIpXG5jb25zdCByZW5kZXJOYXZCYXIgPSByZXF1aXJlKFwiLi9uYXYvTmF2QmFyXCIpXG5jb25zdCByZW5kZXJGb3JtID0gcmVxdWlyZShcIi4vcHJvZHVjdC9Qcm9kdWN0Rm9ybVwiKVxuXG5cbmNvbnN0IHNhdmVQcm9kdWN0ID0gKHByb2R1Y3QpID0+IHtcbiAgICAvLyBTYXZlIHRoZSBwcm9kdWN0IHRvIHRoZSBBUElcbiAgICBEYXRhTWFuYWdlci5zYXZlUHJvZHVjdChwcm9kdWN0KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcmVuZGVyUHJvZHVjdExpc3QoXCIjY29udGFpbmVyXCIsIHByb2R1Y3QudHlwZSlcbiAgICB9KVxufVxuXG5yZW5kZXJOYXZCYXIoKS50aGVuKGh0bWwgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2aWdhdGlvblwiKS5pbm5lckhUTUwgPSBodG1sXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYXZiYXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgdHlwZUNsaWNrZWRPbiA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdKVxuICAgICAgICByZW5kZXJQcm9kdWN0TGlzdChcIiNjb250YWluZXJcIiwgdHlwZUNsaWNrZWRPbilcbiAgICB9KVxufSlcbi8vIHJlbmRlclByb2R1Y3RMaXN0KClcbnJlbmRlckZvcm0oXCIjY29udGFpbmVyXCIsIHNhdmVQcm9kdWN0KVxuXG5cblxuIiwiY29uc3QgRGF0YU1hbmFnZXIgPSByZXF1aXJlKFwiLi4vZGF0YS9EYXRhTWFuYWdlclwiKVxuXG5mdW5jdGlvbiByZW5kZXJOYXZCYXIgKCkge1xuICAgIHJldHVybiBEYXRhTWFuYWdlci5nZXRUeXBlcygpLnRoZW4odHlwZXMgPT4ge1xuICAgICAgICBsZXQgbmF2SFRNTCA9IFwiPG5hdiBpZD1cXFwibmF2YmFyXFxcIj5cIlxuXG4gICAgICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiB7XG4gICAgICAgICAgICBuYXZIVE1MICs9IGA8YSBjbGFzcz1cIm5hdkxpbmtcIiBpZD1cInR5cGUtLSR7dHlwZS5pZH1cIiBocmVmPVwiI1wiPiR7dHlwZS5kZXNjcmlwdGlvbn08L2E+YFxuICAgICAgICB9KVxuXG4gICAgICAgIG5hdkhUTUwgKz0gXCI8YSBjbGFzcz1cXFwibmF2TGlua1xcXCIgaHJlZj1cXFwiI1xcXCI+Q3JlYXRlIFByb2R1Y3Q8L2E+XCJcbiAgICAgICAgbmF2SFRNTCArPSBcIjwvbmF2PlwiXG5cbiAgICAgICAgcmV0dXJuIG5hdkhUTUxcbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlck5hdkJhclxuIiwiY29uc3QgRGF0YU1hbmFnZXIgPSByZXF1aXJlKFwiLi4vZGF0YS9EYXRhTWFuYWdlclwiKVxuY29uc3QgcmVuZGVyUHJvZHVjdExpc3QgPSByZXF1aXJlKFwiLi9Qcm9kdWN0TGlzdFwiKVxuXG5sZXQgaW5zdHJ1Y3Rpb25zID0gbnVsbFxuXG4vKlxuICAgIFB1cnBvc2U6IEFkZHMgdGhlIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBTYXZlIFByb2R1Y3QgYnV0dG9uXG4gICAgICAgIGFuZCBjb25zdHJ1Y3QgdGhlIG9iamVjdCB0byBiZSBzYXZlZCB0byB0aGUgQVBJIHdoZW4gdGhlXG4gICAgICAgIGJ1dHRvbiBpcyBjbGlja2VkXG4qL1xuY29uc3QgYWRkTGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tLXNhdmVQcm9kdWN0XCIpXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdCA9IHt9XG4gICAgICAgICAgICBwcm9kdWN0Lm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2R1Y3ROYW1lXCIpLnZhbHVlXG4gICAgICAgICAgICBwcm9kdWN0LmRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9kdWN0RGVzY3JpcHRpb25cIikudmFsdWVcbiAgICAgICAgICAgIHByb2R1Y3QucHJpY2UgPSBwYXJzZUZsb2F0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZHVjdFByaWNlXCIpLnZhbHVlKVxuICAgICAgICAgICAgcHJvZHVjdC5xdWFudGl0eSA9IHBhcnNlSW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZHVjdFF1YW50aXR5XCIpLnZhbHVlKVxuICAgICAgICAgICAgcHJvZHVjdC50eXBlID0gcGFyc2VJbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9kdWN0VHlwZVwiKS52YWx1ZSlcblxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zKHByb2R1Y3QpXG4gICAgICAgIH0pXG59XG5cbi8qXG4gICAgUHVycG9zZTogQnVpbGQgdGhlIHByb2R1Y3QgZm9ybSBjb21wb25lbnRcbiAgICBBcmd1bWVudHM6IHR5cGVzIChzdHJpbmcpIC0gVGhlIG9wdGlvbiBzdHJpbmdzIHRvIHB1dCBpbiB0aGUgc2VsZWN0XG4qL1xuY29uc3QgYnVpbGRGb3JtVGVtcGxhdGUgPSAodHlwZXMpID0+IHtcbiAgICByZXR1cm4gYFxuICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwicHJvZHVjdE5hbWVcIj5Qcm9kdWN0IG5hbWU6PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCByZXF1aXJlZCB0eXBlPVwidGV4dFwiIG5hbWU9XCJwcm9kdWN0TmFtZVwiIGlkPVwicHJvZHVjdE5hbWVcIj5cbiAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInByb2R1Y3REZXNjcmlwdGlvblwiPkRlc2NyaXB0aW9uOjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgcmVxdWlyZWQgdHlwZT1cInRleHRcIiBuYW1lPVwicHJvZHVjdERlc2NyaXB0aW9uXCIgaWQ9XCJwcm9kdWN0RGVzY3JpcHRpb25cIj5cbiAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInByb2R1Y3RQcmljZVwiPlByaWNlOjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgcmVxdWlyZWQgdHlwZT1cIm51bWJlclwiIG5hbWU9XCJwcm9kdWN0UHJpY2VcIiBpZD1cInByb2R1Y3RQcmljZVwiPlxuICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwicHJvZHVjdFF1YW50aXR5XCI+UXVhbnRpdHk6PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCByZXF1aXJlZCB0eXBlPVwibnVtYmVyXCIgbmFtZT1cInByb2R1Y3RRdWFudGl0eVwiIGlkPVwicHJvZHVjdFF1YW50aXR5XCI+XG4gICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcm9kdWN0VHlwZVwiPkNhdGVnb3J5OjwvbGFiZWw+XG4gICAgICAgICAgICA8c2VsZWN0IHJlcXVpcmVkIG5hbWU9XCJwcm9kdWN0VHlwZVwiIGlkPVwicHJvZHVjdFR5cGVcIj5cbiAgICAgICAgICAgICR7dHlwZXMuam9pbihcIlwiKX1cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi0tc2F2ZVByb2R1Y3RcIj5TYXZlIFByb2R1Y3Q8L2J1dHRvbj5cbiAgICBgXG59XG5cbi8qXG4gICAgUHVycG9zZTogUmVuZGVycyB0aGUgZm9ybSBjb21wb25lbnQgdG8gdGhlIHRhcmdldCBlbGVtZW50XG4gICAgQXJndW1lbnRzOiB0YXJnZXRFbGVtZW50IChzdHJpbmcpIC0gUXVlcnkgc2VsZWN0b3Igc3RyaW5nIGZvciBIVE1MIGVsZW1lbnRcbiovXG5jb25zdCByZW5kZXJGb3JtID0gKHRhcmdldEVsZW1lbnQsIHNhdmVJbnN0cnVjdGlvbnMpID0+IHtcbiAgICBpbnN0cnVjdGlvbnMgPSBzYXZlSW5zdHJ1Y3Rpb25zXG4gICAgcmV0dXJuIERhdGFNYW5hZ2VyLmdldFR5cGVzKClcbiAgICAgICAgLnRoZW4odHlwZXMgPT4ge1xuICAgICAgICAgICAgLy8gQnVpbGQgb3B0aW9ucyBmcm9tIHRoZSBwcm9kdWN0IHR5cGVzXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdHlwZXMubWFwKHR5cGUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBgPG9wdGlvbiB2YWx1ZT1cIiR7dHlwZS5pZH1cIj4ke3R5cGUuZGVzY3JpcHRpb259PC9vcHRpb24+YFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLy8gUmVuZGVyIHRoZSBmb3JtIHRvIHRoZSBET01cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0RWxlbWVudCkuaW5uZXJIVE1MID0gYnVpbGRGb3JtVGVtcGxhdGUob3B0aW9ucylcblxuICAgICAgICAgICAgLy8gTm93IHRoYXQgaXQncyBvbiB0aGUgRE9NLCBhZGQgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgICAgICBhZGRMaXN0ZW5lcigpXG4gICAgICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyRm9ybVxuIiwiY29uc3QgRGF0YU1hbmFnZXIgPSByZXF1aXJlKFwiLi4vZGF0YS9EYXRhTWFuYWdlclwiKVxuXG5mdW5jdGlvbiByZW5kZXJQcm9kdWN0TGlzdCAodGFyZ2V0LCB0eXBlSWQpIHtcbiAgICBEYXRhTWFuYWdlci5nZXRQcm9kdWN0cygpXG4gICAgICAgIC50aGVuKHByb2R1Y3RzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxuICAgICAgICAgICAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIlxuXG4gICAgICAgICAgICAvLyBGaWx0ZXIgYWxsIHByb2R1Y3RzIHRvIHRoZSBvbmVzIHRoYXQgaGF2ZSB0aGUgY29ycmVjdCB0eXBlXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZFByb2R1Y3RzID0gcHJvZHVjdHMuZmlsdGVyKHByb2QgPT4gcHJvZC50eXBlID09PSB0eXBlSWQpXG5cbiAgICAgICAgICAgIC8vIERpc3BsYXkgb25seSB0aGUgcHJvZHVjdHMgdGhhdCBhcmUgb2YgdGhlIGNvcnJlY3QgdHlwZVxuICAgICAgICAgICAgZmlsdGVyZWRQcm9kdWN0cy5mb3JFYWNoKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgKz0gYDxwPiR7cHJvZHVjdC5uYW1lfSAkJHtwcm9kdWN0LnByaWNlfTwvcD5gXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlclByb2R1Y3RMaXN0XG4iXX0=
