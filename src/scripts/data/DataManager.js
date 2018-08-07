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
