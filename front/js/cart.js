const arrayBasketProducts = JSON.parse(localStorage.getItem("basketProducts")) != null &&  JSON.parse(localStorage.getItem("basketProducts")) != undefined ? JSON.parse(localStorage.getItem("basketProducts")) : []

// Définition de la variable qui contiendra toutes les données récupérées de l'API
let datasProductsApi = [];// Jean Louis => datas
/****/

/*
SI (le localStorage n'est pas vide)
    Récupérer le contenu du localStorage
SINON
    Créer un tableau vide


Une ternaire = Une condition condensaée
Un if/else qui à pour but d'attribuer une valeur à une variable

maVariable = condition à tester ? valeur définie si la condition est remplie : valeur définie si la condition n'est PAS remplie

// Pour faire une correlation utiliser findIndex
*/
 
if(arrayBasketProducts.length > 0){;
    getDatasFromAPI();
};

async function getDatasFromAPI(){;
    const urlApi = await fetch(`http://localhost:3000/api/products`);
    const datasProductsApi = await urlApi.json();// Jean Louis => response

// initialiser les données sur la variable datas
    init(datasProductsApi);// Jean Louis => response
/****/

// Fonction qui afficher le panier
    showCart(datasProductsApi);// Jean Louis => response
/****/

// Suppression d'un produit
const nbreDeleteItem = document.querySelectorAll(".deleteItem");

for (let i = 0; i < nbreDeleteItem.length; i++){;
    nbreDeleteItem[i].addEventListener("click",() =>{;
        let indexDeletedProduct = arrayBasketProducts.indexOf(arrayBasketProducts[i]);//Détermination de l'index du produit qui a été supprimé
        arrayBasketProducts.splice(indexDeletedProduct,1);//Retrait du  produit supprimé dans le localStorage
        localStorage.setItem("basketProducts",JSON.stringify(arrayBasketProducts));//Injection dans le localStorage
        
        const elementParent = nbreDeleteItem[i].closest("article");//Recherche du parent "article" pour le produit supprimé

        elementParent.remove();//Suppresion html du parent et des enfants
        alert("Article(s) supprimé(s)");
        
//Si le lS est vide
    if(arrayBasketProducts.length == 0){
        localStorage.clear();
        document.querySelector("#totalPrice").innerText = 0;
        document.querySelector("#totalQuantity").innerText = 0;
    }else{
        totalOrder();
    }
    });
};
/****/

// Modification de la quantité d'un produit
let baliseQuantityProduct = document.querySelectorAll(".itemQuantity");
let articleProduct = document.querySelectorAll(".cart__item");

for (baliseQuantityProduct of articleProduct){;
    baliseQuantityProduct.addEventListener("change",changeQuantity);
}

function changeQuantity(){;
    let idProduct = this.dataset.id;
    let colorProduct = this.dataset.color;
    let quantityProduct = parseInt(this.querySelector(".itemQuantity").value);

    if (quantityProduct > 0 && quantityProduct <= 100){;
        for(let i = 0; i < arrayBasketProducts.length; i++){;//Boucle pour séléctionner le bon Id produit avec la bonne couleur
            if (arrayBasketProducts[i].id == idProduct && arrayBasketProducts[i].color == colorProduct){;//Vérification du bon Id produit et de la bonne couleur
                arrayBasketProducts[i].quantity = quantityProduct;
                localStorage.setItem("basketProducts",JSON.stringify(arrayBasketProducts));//Injection du produit avec la nouvelle quantité
                alert("Quantité modifiée");
            };
        };
    }else{;
        alert("La quantité pour ce produit doit être comprise entre 1 et 100 maximum");
    }
totalOrder();
}
/****/
}

//************************* ???? A quoi sert cette fonction ???? **************************
function init(d){
    datasProductsApi = d;//Jean Louis => datas
    //console.log(datasProductsApi)
}
//*****************************************************************************************

//Calcul du total commande
function totalOrder (){
    let arrayTotalPriceByProduct = [];
    let arrayQuantityProduct = [];
    for ( datas of arrayBasketProducts) {
        index = datasProductsApi.findIndex(p => p.name == datas.name);
        priceProduct = datasProductsApi[index].price//Quantité de chaque produit dans le lS
        let totalPriceByProduct = datas.quantity*priceProduct;//Calcul du total par produit
        arrayTotalPriceByProduct.push(totalPriceByProduct)//Mise dans un tableau du total de chaque produit
        arrayQuantityProduct.push(datas.quantity);//Mise dans un tableau de la quantité de chaque produit
    }

//Calcul du prix total
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalOrder = arrayTotalPriceByProduct.reduce(reducer);
/****/
    
    document.querySelector("#totalPrice").innerText = totalOrder;//Implémentation du montant révisé de la  commande  dans la page cart.html

//Calcul de la quantité totale
    reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalQuantityProducts = arrayQuantityProduct.reduce(reducer);
/****/

    document.querySelector("#totalQuantity").innerText = totalQuantityProducts;//Implémentation de la quantité révisée de la  commande  dans la page
}
/****/
// Fonction qui permet d'afficher le panier
// Parcourir la variable récupérée du localStorage
// Effectuer un findIndex pour trouver une correlation
// Afficher les données
function showCart(){//Jean Louis => datas
    // boucle for pour parcourir le panier
    for ( datas of arrayBasketProducts) {
        let index = datasProductsApi.findIndex(p => p.name == datas.name);//Recherche dans l'API les index des produits dans le lS
        let priceProduct = datasProductsApi[index].price//Prix de chaque produit dans l'API
        let quantityProduct = datas.quantity//Quantité de chaque produit dans le lS

//Implémentation de l'élément article et ses enfants pour chaque produit dans la page panier.html
        const displayProducts =`
                            <article class="cart__item" data-id="${datas.id}" data-color="${datas.color}">
                            <div class="cart__item__img">
                            ${datas.image}
                            </div>
                            <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${datas.name}</h2>
                                <p>${datas.color}</p>
                                <p>${priceProduct} €</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantityProduct}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                                </div>
                            </div>
                            </div>
                        </article>`;
        document.querySelector("#cart__items").insertAdjacentHTML("beforeend", displayProducts);
    }
/****/
    totalOrder ()
        // dans la boucle for : utilisation de findIndex pour afficher le prix
        
    // APRES la boucle, lancer la fonction qui va mettre à jour le prixTotal et le nombre total D'article
}