const currentPageProduct = window.location.href;
const urlProduct = new URL(currentPageProduct);

const idCurrentPageProduct = urlProduct.searchParams.get("id");
console.log(idCurrentPageProduct);

const urlApi=`http://localhost:3000/api/products`; 
// Requête API
fetch(urlApi)
    .then((response) =>
        response.json().then((dataProducts) => {
        console.log(dataProducts);

        let numberOfProducts = dataProducts.length;//Longueur du tableau : nombre d'items dans le tableau
        console.log(numberOfProducts);

        for(let i = 0; i < numberOfProducts ;i +=1){//Boucle vérification Id produit tableau vs Id produit page courante
            console.log('boucle : '+i);
            let lineProductOfArray = dataProducts[i];//N° de ligne du tableau
            console.log(lineProductOfArray);
            let idProductOfArray=lineProductOfArray._id;//Récupération de l'Id produit du tableau
            console.log(idProductOfArray);

                if (idProductOfArray==idCurrentPageProduct){//Condition qui vérifie si l'Id produit du tableau est égale à l'Id produit de la page courante

                    displayProduct = `<img src=${lineProductOfArray.imageUrl} alt="${lineProductOfArray.altTxt}">`;//Affichage de l'image du produit
                    console.log(displayProduct);
                    document.querySelector(".item__img").innerHTML = displayProduct;//Implémentation de l'image du produit dans la page produit.html

                    displayProduct = `${lineProductOfArray.name}`;//Affichage du nom du produit
                    console.log(displayProduct);
                    document.querySelector("#title").innerHTML = displayProduct;//Implémentation du nom du produit dans la page produit.html
                    
                    displayProduct = `${lineProductOfArray.price}`;//Affichage du prix du produit
                    console.log(displayProduct);
                    document.querySelector("#price").innerHTML = displayProduct;//Implémentation du prix du produit dans la page produit.html

                    displayProduct = `${lineProductOfArray.description}`;//Affichage de la description du produit
                    console.log(displayProduct);
                    document.querySelector("#description").innerHTML = displayProduct;//Implémentation de la description du produit dans la page produit.html

                    /*!!!!!!-------------Couleurs à intégrer----------------!!!!!!*/
                    /*-------*/
                    break;
                };
        }
    })
).catch((error) => alert('Erreur Serveur : '+ error)); // Alerte erreur serveur