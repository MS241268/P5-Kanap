const currentPageProduct = window.location.href;
const urlProduct = new URL(currentPageProduct);
const idCurrentPageProduct = urlProduct.searchParams.get("id");
const urlApi = `http://localhost:3000/api/products/${idCurrentPageProduct}`; 

// Get datas from one product
fetch(urlApi)
    .then((response) =>
        response.json()
        
    .then((dataProduct) => {
        document.title = dataProduct.name;
        document.querySelector(".item__img").innerHTML = `<img src=${dataProduct.imageUrl} alt="${dataProduct.altTxt}">`;//Implémentation de l'image du produit dans la page produit.html
        document.querySelector("#title").innerText = dataProduct.name;//Implémentation du nom du produit dans la page produit.html
        document.querySelector("#price").innerText = dataProduct.price;//Implémentation du prix du produit dans la page produit.html
        document.querySelector("#description").innerText = dataProduct.description;//Implémentation de la description du produit dans la page produit.html
        
        //Gestion des options de couleurs du produit sélectionné
        for(let colorsProduct of dataProduct.colors){ // Boucle pour connaître les couleurs du produit sélectionné
            const listColorProduct = document.getElementById("colors")//Liste des couleurs dispos selon le produit
            listColorProduct.insertAdjacentHTML("beforeend", `<option value="${colorsProduct}">${colorsProduct}</option>`)};//Implémentation des couleurs dans le menu déroulant      
        })
        ).catch((error) => alert("Erreur Serveur : " + error)); // Alerte erreur serveur
        
// Ajouter un eventlistener sur le bouton
const addBasket = document.getElementById("addToCart");
addBasket.addEventListener('click',() => {

    const nameProduct = document.getElementById("title").innerText;
    const listColorProduct = document.getElementById("colors");
    const selectedColorProduct = listColorProduct.options[listColorProduct.selectedIndex].text;

    if (selectedColorProduct == "--SVP, choisissez une couleur --"){
        alert("Veuillez choisir une couleur pour ce produit");
    };

    const quantityProduct = parseInt(document.getElementById('quantity').value);//Transfomation Txt en Nombre
    if (quantityProduct > 100){
        alert("Vous pouvez choisir jusqu'à 100 articles maximum");
    };

    if (selectedColorProduct != "--SVP, choisissez une couleur --" && quantityProduct <= 100){
//Création du produit à ajouter au panier
    const recapProduct = {
        id : idCurrentPageProduct,
        name : nameProduct,
        color : selectedColorProduct,
        quantity : quantityProduct,
    };
    let arrayBasketProducts = [];
    if (localStorage.getItem("basketProducts") == null){//Vérification si le local storage est vide
        arrayBasketProducts.push(recapProduct)
        localStorage.setItem("basketProducts", JSON.stringify(arrayBasketProducts));//Ajout du 1er produit dans le local storage
    }else{
        let arrayBasketProducts = JSON.parse(localStorage.getItem("basketProducts"));
        let foundIdProduct = arrayBasketProducts.find(p => p.id == recapProduct.id);//Vérification si l'Id produit existe dans le local storage
        let foundColorProduct = arrayBasketProducts.find(c => c.color == recapProduct.color);//Vérification si la couleur produit existe dans le local storage
     
        if (foundIdProduct != undefined && foundColorProduct != undefined){//Condition si l'Id et la couleur du produit existe dans le local storage
            for(let i = 0; i < arrayBasketProducts.length; i++){//Boucle pour séléctionner le bon Id produit avec la bonne couleur
                if (arrayBasketProducts[i].id == recapProduct.id && arrayBasketProducts[i].color == recapProduct.color){//Vérification du bon Id produit et de la bonne couleur
                    arrayBasketProducts[i].quantity = arrayBasketProducts[i].quantity + recapProduct.quantity;
                    localStorage.setItem("basketProducts",JSON.stringify(arrayBasketProducts));//Injection du produit avec la nouvelle quantité
                    
                };console.log(arrayBasketProducts.length,arrayBasketProducts[i].id,arrayBasketProducts[i].color);
            };
        }else{//Condition si l'Id ou la couleur du produit n'existent pas dans le local storage
            arrayBasketProducts.push(recapProduct);
            localStorage.setItem("basketProducts",JSON.stringify(arrayBasketProducts));
        };
    };
    };
});



