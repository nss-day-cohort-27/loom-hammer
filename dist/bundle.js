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




},{"./nav/NavBar":3,"./product/ProductList":4}],3:[function(require,module,exports){
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

},{"../data/DataManager":1}],4:[function(require,module,exports){
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

},{"../data/DataManager":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEvRGF0YU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25hdi9OYXZCYXIuanMiLCIuLi9zY3JpcHRzL3Byb2R1Y3QvUHJvZHVjdExpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKlxuICAgIFB1cnBvc2U6IFN0b3JlIGFuZCByZXRyaWV2ZSBkYXRhIGZyb20gcmVtb3RlIEFQSVxuKi9cblxuY29uc3QgQVBJT2JqZWN0ID0ge1xuXG59XG5cbi8qXG4gICAgUHVycG9zZTogTWFrZSBHRVQgcmVxdWVzdCB0byBBUEkgdG8gcmV0cmlldmUgZGF0YVxuKi9cbkFQSU9iamVjdC5nZXRUeXBlcyA9ICgpID0+IHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdHlwZXNcIilcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbn1cblxuLypcbiAgICBQdXJwb3NlOiBSZXRyaWV2ZXMgYWxsIHByb2R1Y3Qgb2JqZWN0cyBmcm9tIEFQSVxuKi9cbkFQSU9iamVjdC5nZXRQcm9kdWN0cyA9ICgpID0+IHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvaW52ZW50b3J5XCIpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbn1cblxuLypcbiAgICBQdXJwb3NlOiBQT1NUcyAoY3JlYXRlcykgYSBuZXcgcHJvZHVjdCBpbiB0aGUgQVBJXG4qL1xuQVBJT2JqZWN0LnNhdmVQcm9kdWN0ID0gKHByb2R1Y3QpID0+IHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvaW52ZW50b3J5XCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocHJvZHVjdClcbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBUElPYmplY3RcblxuXG4iLCJjb25zdCByZW5kZXJQcm9kdWN0TGlzdCA9IHJlcXVpcmUoXCIuL3Byb2R1Y3QvUHJvZHVjdExpc3RcIilcbmNvbnN0IHJlbmRlck5hdkJhciA9IHJlcXVpcmUoXCIuL25hdi9OYXZCYXJcIilcblxucmVuZGVyTmF2QmFyKCkudGhlbihodG1sID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hdmlnYXRpb25cIikuaW5uZXJIVE1MID0gaHRtbFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2YmFyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IHR5cGVDbGlja2VkT24gPSBwYXJzZUludChldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXSlcbiAgICAgICAgcmVuZGVyUHJvZHVjdExpc3QodHlwZUNsaWNrZWRPbilcbiAgICB9KVxuXG5cbn0pXG5yZW5kZXJQcm9kdWN0TGlzdCgpXG5cblxuXG4iLCJjb25zdCBEYXRhTWFuYWdlciA9IHJlcXVpcmUoXCIuLi9kYXRhL0RhdGFNYW5hZ2VyXCIpXG5cbmZ1bmN0aW9uIHJlbmRlck5hdkJhciAoKSB7XG4gICAgcmV0dXJuIERhdGFNYW5hZ2VyLmdldFR5cGVzKCkudGhlbih0eXBlcyA9PiB7XG4gICAgICAgIGxldCBuYXZIVE1MID0gXCI8bmF2IGlkPVxcXCJuYXZiYXJcXFwiPlwiXG5cbiAgICAgICAgdHlwZXMuZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgICAgICAgIG5hdkhUTUwgKz0gYDxhIGlkPVwidHlwZS0tJHt0eXBlLmlkfVwiIGhyZWY9XCIjXCI+JHt0eXBlLmRlc2NyaXB0aW9ufTwvYT5gXG4gICAgICAgIH0pXG5cbiAgICAgICAgbmF2SFRNTCArPSBcIjxhIGhyZWY9XFxcIiNcXFwiPkNyZWF0ZSBQcm9kdWN0PC9hPlwiXG4gICAgICAgIG5hdkhUTUwgKz0gXCI8L25hdj5cIlxuXG4gICAgICAgIHJldHVybiBuYXZIVE1MXG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJOYXZCYXJcbiIsImNvbnN0IERhdGFNYW5hZ2VyID0gcmVxdWlyZShcIi4uL2RhdGEvRGF0YU1hbmFnZXJcIilcblxuZnVuY3Rpb24gcmVuZGVyUHJvZHVjdExpc3QgKHByb2R1Y3RUeXBlSWQpIHtcbiAgICBEYXRhTWFuYWdlci5nZXRQcm9kdWN0cygpXG4gICAgICAgIC50aGVuKChwcm9kdWN0cykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWluZXJcIilcbiAgICAgICAgICAgIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCJcblxuICAgICAgICAgICAgLy8gRmlsdGVyIGFsbCBwcm9kdWN0cyB0byB0aGUgb25lcyB0aGF0IGhhdmUgdGhlIGNvcnJlY3QgdHlwZVxuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRQcm9kdWN0cyA9IHByb2R1Y3RzLmZpbHRlcihwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvZHVjdC50eXBlID09PSBwcm9kdWN0VHlwZUlkXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvLyBEaXNwbGF5IG9ubHkgdGhlIHByb2R1Y3RzIHRoYXQgYXJlIG9mIHRoZSBjb3JyZWN0IHR5cGVcbiAgICAgICAgICAgIGZpbHRlcmVkUHJvZHVjdHMuZm9yRWFjaChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MICs9IGA8cD4ke3Byb2R1Y3QubmFtZX0gJCR7cHJvZHVjdC5wcmljZX08L3A+YFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJQcm9kdWN0TGlzdFxuIl19
