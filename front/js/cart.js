const arrayBasketProducts = JSON.parse(localStorage.getItem("basketProducts"))
let arrayTotalPriceByProduct = [];

//Somme quantité de produit
let totalQuantityProducts = 0;
        for ( let q = 0; q < arrayBasketProducts.length; q++){;
        totalQuantityProducts += arrayBasketProducts[q].quantity;
        document.querySelector("#totalQuantity").innerText = totalQuantityProducts;
        };


for(let i = 0 ; i < arrayBasketProducts.length ; i++){
    const urlApi = `http://localhost:3000/api/products/${arrayBasketProducts[i].id}`;
    fetch(urlApi)
    .then((response) => 
        response.json()
    .then((dataProduct) => {

//Intégration HTML des produits choisis
        const displayProducts =`
                            <article class="cart__item" data-id="${arrayBasketProducts[i].id}" data-color="${arrayBasketProducts[i].color}">
                            <div class="cart__item__img">
                            ${arrayBasketProducts[i].image}
                            </div>
                            <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${arrayBasketProducts[i].name}</h2>
                                <p>${arrayBasketProducts[i].color}</p>
                                <p>${dataProduct.price} €</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${arrayBasketProducts[i].quantity}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                                </div>
                            </div>
                            </div>
                        </article>`;
        document.querySelector("#cart__items").insertAdjacentHTML("beforeend", displayProducts); 

        //Calcul du prix total par ligne de produit
        let totalPriceByProduct = arrayBasketProducts[i].quantity * dataProduct.price;
        if(i == 0){//Intégration du 1er produit dans le tableau
            arrayTotalPriceByProduct.push(totalPriceByProduct);
            console.log (arrayTotalPriceByProduct,typeof arrayTotalPriceByProduct[0]);
        }else{//Intégration des autres produits dans le tableau & calcul du prix total
            arrayTotalPriceByProduct.push(totalPriceByProduct);
            //Calcul du prix total
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const totalOrder = arrayTotalPriceByProduct.reduce(reducer);
            console.log(totalOrder);
            document.querySelector("#totalPrice").innerText = totalOrder;
        }
        })
    ).catch((error) => alert("Erreur Serveur : " + error)); // Alerte erreur serveur
}