// Déclaration constante url API
const urlApi = `http://localhost:3000/api/products`; 

// Requête API
fetch(urlApi)
    .then((response) =>
        response.json().then((dataProducts) => {
        console.log(dataProducts);

// Collecte des infos de chaque produit et création des balises html
        let displayProduct ='';
        for(let product of dataProducts){ // Boucle pour connaître le nombre d'items dans le tableau
            displayProduct += `<a href="./product.html?id=${product._id}">`
            displayProduct += '<article>';
            displayProduct += `<img src=${product.imageUrl} alt="${product.altTxt}">`;
            displayProduct += `<h3 class="productName">${product.name}</h3>`;
            displayProduct += `<p class="productDescription">${product.description}</p>`;
            displayProduct += '</article>';
            displayProduct += '</a>';
        }

// Implémentation dans la section #items de la page index.html
        document.querySelector("#items").innerHTML = displayProduct;
        })
    ).catch((error) => alert('Erreur Serveur : '+ error)); // Alerte erreur serveur
