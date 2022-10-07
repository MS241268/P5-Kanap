const parameter = (new URL(document.location)).searchParams;//Chargement des paramètres de l'URL
const idCurrentPageProduct = parameter.get("id");//Recherche du parametre "id" dans l'URL
const urlApi = `http://localhost:3000/api/products/${idCurrentPageProduct}`;//Chargement des caractéristiques du produit depuis l'API
let arrayProductsLs = [];//Initialisation du tableau dans le localStorage

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
    const imageProduct = document.querySelector(".item__img").innerHTML;

    if (selectedColorProduct == "--SVP, choisissez une couleur --"){
        alert("Veuillez choisir une couleur pour ce produit");
    };

    const quantityProduct = parseInt(document.getElementById('quantity').value);//Transfomation Txt en Nombre
    
    if (quantityProduct > 100 || quantityProduct < 1){
        alert("La quantité pour ce produit doit être comprise entre 1 et 100 maximum");
    };

    if (selectedColorProduct != "--SVP, choisissez une couleur --" && quantityProduct > 0 && quantityProduct <= 100){

//Création du produit à ajouter au panier
    const recapProduct = {
        id : idCurrentPageProduct,
        name : nameProduct,
        color : selectedColorProduct,
        quantity : quantityProduct,
        image : imageProduct,
    };

   /* productInLocalStorage = () => {
        
    } */

    if (localStorage.getItem("basketProducts") == null){//Vérification si le localStorage est vide
        if (recapProduct.quantity > 0 && recapProduct.quantity <= 100 ){;
            arrayProductsLs.push(recapProduct);
            localStorage.setItem("basketProducts", JSON.stringify(arrayProductsLs));//Ajout du 1er produit dans le localStorage
            alert("Produit(s) ajouté(s) dans votre panier");
        }
    }else{
        let arrayProductsLs = JSON.parse(localStorage.getItem("basketProducts"));
        let foundIdProduct = arrayProductsLs.find(p => p.id == recapProduct.id);//Vérification si l'Id produit existe dans le localStorage
        let foundColorProduct = arrayProductsLs.find(c => c.color == recapProduct.color);//Vérification si la couleur produit existe dans le localStorage
     
        if (foundIdProduct != undefined && foundColorProduct != undefined){//Condition si le produit de la même couleur existe dans le localStorage
            for(let i = 0; i < arrayProductsLs.length; i++){//Boucle pour séléctionner le bon Id produit avec la bonne couleur
                if (arrayProductsLs[i].id == recapProduct.id && arrayProductsLs[i].color == recapProduct.color){//Vérification du bon Id produit et de la bonne couleur
                    arrayProductsLs[i].quantity = arrayProductsLs[i].quantity + recapProduct.quantity;
                    if (arrayProductsLs[i].quantity > 100){
                        alert("La quantité pour ce produit ne doit pas dépasser 100");
                        break;
                    }
                localStorage.setItem("basketProducts",JSON.stringify(arrayProductsLs));//Injection du produit avec la nouvelle quantité
                alert("Produit(s) ajouté(s) dans votre panier")
                };
            };
        }else{//Condition si nouveau produit
            (recapProduct.quantity > 0 && recapProduct.quantity <= 100);
            arrayProductsLs.push(recapProduct);
            localStorage.setItem("basketProducts", JSON.stringify(arrayProductsLs));//Ajout du nouveau produit dans le localStorage
            alert("Produit(s) ajouté(s) dans votre panier");
        };
    };
    };
});



