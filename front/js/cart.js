const arrayBasketProducts = JSON.parse(localStorage.getItem("basketProducts")) != null &&  JSON.parse(localStorage.getItem("basketProducts")) != undefined ? JSON.parse(localStorage.getItem("basketProducts")) : []

// Définition de la variable qui contiendra toutes les données récupérées de l'API
let datasProductsApi = []
/****/

if(arrayBasketProducts.length > 0){
    getDatasFromAPI()
}

async function getDatasFromAPI(){
    const urlApi = await fetch(`http://localhost:3000/api/products`)
    const datasProductsApi = await urlApi.json()

// initialiser les données sur la variable datas
    init(datasProductsApi)
/****/

// Fonction qui affiche le panier
    showCart(datasProductsApi)
/****/

// Suppression d'un produit
const nbreDeleteItem = document.querySelectorAll(".deleteItem")
nbreDeleteItem.forEach((item) => {
    // Sur chacun des éléments, ajouter un eventlistener
    item.addEventListener('click', (el) => {
        // Suppression de l'élément en fonction de son dataset

        // Récupération de l'id et la couleur
        const id = el.target.closest('article').getAttribute('data-id')
        const color = el.target.closest('article').getAttribute('data-color')

        // Recherche de l'élément dans le lS
        const index = arrayBasketProducts.findIndex(product => product.id === id && product.color === color)

        // Suppression de l'élément dans le lS
        arrayBasketProducts.splice(index, 1)

        // Suppression l'élément du DOM
        el.target.closest("article").remove()

        // Mise à jour du lS
        localStorage.setItem("basketProducts", JSON.stringify(arrayBasketProducts))
        alert("Article(s) supprimé(s)")

        if(arrayBasketProducts.length == 0){//Si le lS est vide
            localStorage.clear()
            document.querySelector("#totalPrice").innerText = 0
            document.querySelector("#totalQuantity").innerText = 0
        }else{
            totalOrder()// Mise à jour du calcul du tarif et nombre d'articles
        }
    })
})
/****/

// Modification de la quantité d'un produit
let baliseQuantityProduct = document.querySelectorAll(".itemQuantity")//Rescencement des inputs "itemQuantity"
let articleProduct = document.querySelectorAll(".cart__item")//Rescencement des balises article "cart__item"

for (baliseQuantityProduct of articleProduct){
    baliseQuantityProduct.addEventListener("change",changeQuantity)
}

function changeQuantity(){
    let idProduct = this.dataset.id
    let colorProduct = this.dataset.color
    let quantityProduct = parseInt(this.querySelector(".itemQuantity").value)

    if (quantityProduct > 0 && quantityProduct <= 100){
        for(let i = 0; i < arrayBasketProducts.length; i++){//Boucle pour séléctionner le bon Id produit avec la bonne couleur
            if (arrayBasketProducts[i].id == idProduct && arrayBasketProducts[i].color == colorProduct){//Vérification du bon Id produit et de la bonne couleur
                arrayBasketProducts[i].quantity = quantityProduct//Modification de la quantité dans le lS
                localStorage.setItem("basketProducts",JSON.stringify(arrayBasketProducts))//Injection dans le lS du produit avec la nouvelle quantité
                alert("Quantité modifiée")
            }
        }
    }else{
        alert("La quantité pour ce produit doit être comprise entre 1 et 100 maximum")
    }
totalOrder()
}
/****/
}

function init(datas){
    datasProductsApi = datas//Jean Louis => datas
    //console.log(datasProductsApi)
}

//Calcul du total commande
function totalOrder (){
    let arrayTotalPriceByProduct = []
    let arrayQuantityProduct = []
    for ( datas of arrayBasketProducts) {
        index = datasProductsApi.findIndex(p => p.name == datas.name)
        priceProduct = datasProductsApi[index].price//Quantité de chaque produit dans le lS
        let totalPriceByProduct = datas.quantity*priceProduct//Calcul du total par produit
        arrayTotalPriceByProduct.push(totalPriceByProduct)//Mise dans un tableau du total de chaque produit
        arrayQuantityProduct.push(datas.quantity)//Mise dans un tableau de la quantité de chaque produit
    }

//Calcul du prix total
    let reducer = (accumulator, currentValue) => accumulator + currentValue
    const totalOrder = arrayTotalPriceByProduct.reduce(reducer)
/****/
    
    document.querySelector("#totalPrice").innerText = totalOrder//Implémentation du montant révisé de la  commande  dans la page cart.html

//Calcul de la quantité totale
    reducer = (accumulator, currentValue) => accumulator + currentValue
    const totalQuantityProducts = arrayQuantityProduct.reduce(reducer)
/****/

    document.querySelector("#totalQuantity").innerText = totalQuantityProducts//Implémentation de la quantité révisée de la  commande  dans la page
}
/****/

// Affichage des articles dans cart.html
function showCart(){
    // boucle for pour parcourir le panier
    for ( datas of arrayBasketProducts) {
        let index = datasProductsApi.findIndex(p => p.name == datas.name)//Recherche dans l'API les index des produits dans le lS
        let priceProduct = datasProductsApi[index].price//Prix de chaque produit dans l'API
        let quantityProduct = datas.quantity//Quantité de chaque produit dans le lS

//Implémentation de l'élément article et ses enfants pour chaque produit dans la page cart.html
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
                        </article>`
        document.querySelector("#cart__items").insertAdjacentHTML("beforeend", displayProducts)
    }
/****/
    totalOrder ()
        // dans la boucle for : utilisation de findIndex pour afficher le prix
        
    // APRES la boucle, lancer la fonction qui va mettre à jour le prixTotal et le nombre total D'article
}
/****/

//Gestion du formulaire contact
const maskNameAndCity = /^[a-zA-Z^\-\s]{2,}$/g // comporte des lettres maj ou min ou "-" ou " " et 2 caractères min
const maskAddress = /^[a-zA-Z0-9àâäéèêëïîôöùûüç\s-]{5,}$/g //comporte au minimum 5 lettres, chiffres ou "-" (sans compter les espaces qui sont acceptés)
const maskMail = /^[a-zA-Z0-9àâäéèêëïîôöùûüç\.\-\s-]{2,}[@][\w]{2,}[\.][a-zA-Z]{2,}$/g // 2 caractères min avant le "@" puis 2 lettres ou chiffres min après le @ puis 2 lettres min uniquement après le "."

const nbreInput = document.querySelectorAll(".cart__order__form__question")//Rescencement des Inputs dans le formulaire

nbreInput.forEach((item) =>{
    item.addEventListener("change",el => {//Surveillance évènement sur chaque input
        const valueInput = el.target.closest("input").value//Valeur du champ input
        const idInput = el.target.closest("input").getAttribute("id")//Recherche de l'attribut de l'input modifié

//Controle champs Prénom, Nom ou Ville
        if (idInput === "firstName" || idInput === "lastName" || idInput === "city"){
            if (valueInput.match(maskNameAndCity)){//Vérication du formatage du champ
                document.getElementById(`${idInput}ErrorMsg`).innerText = ""
            }else{
                document.getElementById(`${idInput}ErrorMsg`).innerText = `Seules les lettres minuscules ou majuscules, "-" et espace sont acceptés`
                document.getElementById(idInput).focus()//Remise du focus sur le champ
            }
        }
/****/

//Controle champ Adresse
        if (idInput === "address"){
            if (valueInput.match(maskAddress)){//Vérication du formatage du champ
                document.getElementById("addressErrorMsg").innerText = ""

            }else{
                document.getElementById("addressErrorMsg").innerText = `Seules les lettres minuscules ou majuscules, "-" et espace sont acceptés`
                document.getElementById(idInput).focus()//Remise du focus sur le champ
            }
        }
/****/

//Controle champ Email
        if (idInput === "email"){
            if (valueInput.match(maskMail)){//Vérication du formatage du champ
                document.getElementById("emailErrorMsg").innerText = ""

            }else{
                document.getElementById("emailErrorMsg").innerText = `Adresse mail invalide`
                document.getElementById(idInput).focus()//Remise du focus sur le champ
            }
        }
/****/
    })
})
/****/

//Gestion envoi datas au backEnd
const formContact = document.querySelector(".cart__order__form")
formContact.addEventListener("submit",(e) =>{
    let arrayBackEndProducts = []
    for (let i = 0; i < arrayBasketProducts.length; i++){
        arrayBackEndProducts.push(arrayBasketProducts[i].id)
    }

    const orderForm = {
        contact : {
        "firstName" : document.getElementById("firstName").value,
        "lastName" : document.getElementById("lastName").value,
        "address" : document.getElementById("address").value,
        "city" : document.getElementById("city").value,
        "email" : document.getElementById("email").value,
           },
        "products" : arrayBackEndProducts,
    }
    console.log(orderForm)
    e.preventDefault()
    
    const optionsRequest = {
        method: 'POST', 
        body: JSON.stringify(orderForm),
        headers: {
            "Accept": "application/json", 
            "Content-Type": "application/json"},
    }

    console.log(orderForm)
    if (arrayBasketProducts.length > 0){
        fetch("http://localhost:3000/api/products/order", optionsRequest)
            .then(response => response.json())
            .then(data => {
                console.log(data.orderId)
                localStorage.clear()
                document.location = `./confirmation.html?orderId=${data.orderId}`

            })
            .catch((error) => alert('Erreur Serveur : '+ error)) // Alerte erreur serveur
    }else{
        alert("Vous devez commander minimum 1 produit")
    }

})
