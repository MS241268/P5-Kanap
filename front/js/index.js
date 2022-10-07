const urlApi = `http://localhost:3000/api/products` 

// Get product data from API
fetch(urlApi)
    .then((response) =>
        response.json().then((dataProducts) => {

// Collecte des infos de chaque produit et création des balises html
        for(let product of dataProducts){ // Boucle pour connaître le nombre d'items dans le tableau
            const displayProducts = `
                            <a href="./product.html?id=${product._id}">
                                <article>
                                    <img src=${product.imageUrl} alt="${product.altTxt}">
                                    <h3 class="productName">${product.name}</h3>
                                    <p class="productDescription">${product.description}</p>
                                </article>
                            </a>`
            // Implémentation dans la section #items de la page index.html
            document.querySelector("#items").insertAdjacentHTML("beforeend", displayProducts)
        }
        })
    ).catch((error) => alert('Erreur Serveur : '+ error)) // Alerte erreur serveur

