(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
    Purpose: Store and retrieve data from remote API
*/

const APIObject = {

}

/*
    Purpose: Make GET request to API to retrieve data
*/
APIObject.getTypes = () => {
    return fetch("http://localhost:8088/types")
        .then(response => response.json());
}

/*
    Purpose: Retrieves all product objects from API
*/
APIObject.getProducts = () => {
    return fetch("http://localhost:8088/inventory")
    .then(response => response.json());
}

/*
    Purpose: POSTs (creates) a new product in the API
*/
APIObject.saveProduct = (product) => {
    return fetch("http://localhost:8088/inventory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });
}

module.exports = APIObject



},{}],2:[function(require,module,exports){
const RenderProductForm = require("./product/ProductForm")

RenderProductForm("#container")





},{"./product/ProductForm":3}],3:[function(require,module,exports){
const DataManager = require("../data/DataManager")

/*
    Purpose: Adds the event listener to the Save Product button
        and construct the object to be saved to the API when the
        button is clicked
*/
const addListener = () => {
    document.querySelector(".btn--saveProduct").addEventListener("click", () => {
        const product = {}
        product.name = document.querySelector("#productName").value
        product.description = document.querySelector("#productDescription").value
        product.price = parseFloat(document.querySelector("#productPrice").value)
        product.quantity = parseInt(document.querySelector("#productQuantity").value)
        product.type = parseInt(document.querySelector("#productType").value)

        console.log(product)
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
const renderForm = (targetElement) => {
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

},{"../data/DataManager":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEvRGF0YU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3Byb2R1Y3QvUHJvZHVjdEZvcm0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKlxuICAgIFB1cnBvc2U6IFN0b3JlIGFuZCByZXRyaWV2ZSBkYXRhIGZyb20gcmVtb3RlIEFQSVxuKi9cblxuY29uc3QgQVBJT2JqZWN0ID0ge1xuXG59XG5cbi8qXG4gICAgUHVycG9zZTogTWFrZSBHRVQgcmVxdWVzdCB0byBBUEkgdG8gcmV0cmlldmUgZGF0YVxuKi9cbkFQSU9iamVjdC5nZXRUeXBlcyA9ICgpID0+IHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdHlwZXNcIilcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbn1cblxuLypcbiAgICBQdXJwb3NlOiBSZXRyaWV2ZXMgYWxsIHByb2R1Y3Qgb2JqZWN0cyBmcm9tIEFQSVxuKi9cbkFQSU9iamVjdC5nZXRQcm9kdWN0cyA9ICgpID0+IHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvaW52ZW50b3J5XCIpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbn1cblxuLypcbiAgICBQdXJwb3NlOiBQT1NUcyAoY3JlYXRlcykgYSBuZXcgcHJvZHVjdCBpbiB0aGUgQVBJXG4qL1xuQVBJT2JqZWN0LnNhdmVQcm9kdWN0ID0gKHByb2R1Y3QpID0+IHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvaW52ZW50b3J5XCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocHJvZHVjdClcbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBUElPYmplY3RcblxuXG4iLCJjb25zdCBSZW5kZXJQcm9kdWN0Rm9ybSA9IHJlcXVpcmUoXCIuL3Byb2R1Y3QvUHJvZHVjdEZvcm1cIilcblxuUmVuZGVyUHJvZHVjdEZvcm0oXCIjY29udGFpbmVyXCIpXG5cblxuXG5cbiIsImNvbnN0IERhdGFNYW5hZ2VyID0gcmVxdWlyZShcIi4uL2RhdGEvRGF0YU1hbmFnZXJcIilcblxuLypcbiAgICBQdXJwb3NlOiBBZGRzIHRoZSBldmVudCBsaXN0ZW5lciB0byB0aGUgU2F2ZSBQcm9kdWN0IGJ1dHRvblxuICAgICAgICBhbmQgY29uc3RydWN0IHRoZSBvYmplY3QgdG8gYmUgc2F2ZWQgdG8gdGhlIEFQSSB3aGVuIHRoZVxuICAgICAgICBidXR0b24gaXMgY2xpY2tlZFxuKi9cbmNvbnN0IGFkZExpc3RlbmVyID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLS1zYXZlUHJvZHVjdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9kdWN0ID0ge31cbiAgICAgICAgcHJvZHVjdC5uYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9kdWN0TmFtZVwiKS52YWx1ZVxuICAgICAgICBwcm9kdWN0LmRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9kdWN0RGVzY3JpcHRpb25cIikudmFsdWVcbiAgICAgICAgcHJvZHVjdC5wcmljZSA9IHBhcnNlRmxvYXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9kdWN0UHJpY2VcIikudmFsdWUpXG4gICAgICAgIHByb2R1Y3QucXVhbnRpdHkgPSBwYXJzZUludChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2R1Y3RRdWFudGl0eVwiKS52YWx1ZSlcbiAgICAgICAgcHJvZHVjdC50eXBlID0gcGFyc2VJbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9kdWN0VHlwZVwiKS52YWx1ZSlcblxuICAgICAgICBjb25zb2xlLmxvZyhwcm9kdWN0KVxuICAgIH0pXG59XG5cbi8qXG4gICAgUHVycG9zZTogQnVpbGQgdGhlIHByb2R1Y3QgZm9ybSBjb21wb25lbnRcbiAgICBBcmd1bWVudHM6IHR5cGVzIChzdHJpbmcpIC0gVGhlIG9wdGlvbiBzdHJpbmdzIHRvIHB1dCBpbiB0aGUgc2VsZWN0XG4qL1xuY29uc3QgYnVpbGRGb3JtVGVtcGxhdGUgPSAodHlwZXMpID0+IHtcbiAgICByZXR1cm4gYFxuICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwicHJvZHVjdE5hbWVcIj5Qcm9kdWN0IG5hbWU6PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCByZXF1aXJlZCB0eXBlPVwidGV4dFwiIG5hbWU9XCJwcm9kdWN0TmFtZVwiIGlkPVwicHJvZHVjdE5hbWVcIj5cbiAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInByb2R1Y3REZXNjcmlwdGlvblwiPkRlc2NyaXB0aW9uOjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgcmVxdWlyZWQgdHlwZT1cInRleHRcIiBuYW1lPVwicHJvZHVjdERlc2NyaXB0aW9uXCIgaWQ9XCJwcm9kdWN0RGVzY3JpcHRpb25cIj5cbiAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInByb2R1Y3RQcmljZVwiPlByaWNlOjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgcmVxdWlyZWQgdHlwZT1cIm51bWJlclwiIG5hbWU9XCJwcm9kdWN0UHJpY2VcIiBpZD1cInByb2R1Y3RQcmljZVwiPlxuICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwicHJvZHVjdFF1YW50aXR5XCI+UXVhbnRpdHk6PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCByZXF1aXJlZCB0eXBlPVwibnVtYmVyXCIgbmFtZT1cInByb2R1Y3RRdWFudGl0eVwiIGlkPVwicHJvZHVjdFF1YW50aXR5XCI+XG4gICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcm9kdWN0VHlwZVwiPkNhdGVnb3J5OjwvbGFiZWw+XG4gICAgICAgICAgICA8c2VsZWN0IHJlcXVpcmVkIG5hbWU9XCJwcm9kdWN0VHlwZVwiIGlkPVwicHJvZHVjdFR5cGVcIj5cbiAgICAgICAgICAgICR7dHlwZXMuam9pbihcIlwiKX1cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi0tc2F2ZVByb2R1Y3RcIj5TYXZlIFByb2R1Y3Q8L2J1dHRvbj5cbiAgICBgXG59XG5cbi8qXG4gICAgUHVycG9zZTogUmVuZGVycyB0aGUgZm9ybSBjb21wb25lbnQgdG8gdGhlIHRhcmdldCBlbGVtZW50XG4gICAgQXJndW1lbnRzOiB0YXJnZXRFbGVtZW50IChzdHJpbmcpIC0gUXVlcnkgc2VsZWN0b3Igc3RyaW5nIGZvciBIVE1MIGVsZW1lbnRcbiovXG5jb25zdCByZW5kZXJGb3JtID0gKHRhcmdldEVsZW1lbnQpID0+IHtcbiAgICByZXR1cm4gRGF0YU1hbmFnZXIuZ2V0VHlwZXMoKVxuICAgICAgICAudGhlbih0eXBlcyA9PiB7XG4gICAgICAgICAgICAvLyBCdWlsZCBvcHRpb25zIGZyb20gdGhlIHByb2R1Y3QgdHlwZXNcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0eXBlcy5tYXAodHlwZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGA8b3B0aW9uIHZhbHVlPVwiJHt0eXBlLmlkfVwiPiR7dHlwZS5kZXNjcmlwdGlvbn08L29wdGlvbj5gXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvLyBSZW5kZXIgdGhlIGZvcm0gdG8gdGhlIERPTVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRFbGVtZW50KS5pbm5lckhUTUwgPSBidWlsZEZvcm1UZW1wbGF0ZShvcHRpb25zKVxuXG4gICAgICAgICAgICAvLyBOb3cgdGhhdCBpdCdzIG9uIHRoZSBET00sIGFkZCB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgIGFkZExpc3RlbmVyKClcbiAgICAgICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJGb3JtXG4iXX0=
