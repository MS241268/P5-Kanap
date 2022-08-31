const currentPageProduct = window.location.href;
const urlProduct = new URL(currentPageProduct);

const idCurrentPageProduct = urlProduct.searchParams.get("id");
console.log(idCurrentPageProduct);

const urlApi = `http://localhost:3000/api/products/${idCurrentPageProduct}`; 
console.log(urlApi);

// Get datas from one product
fetch(urlApi)
    .then((response) =>
        response.json().then((dataProduct) => {

        document.title = dataProduct.name;
        document.querySelector(".item__img").innerHTML = `<img src=${dataProduct.imageUrl} alt="${dataProduct.altTxt}">`;//Implémentation de l'image du produit dans la page produit.html
        document.querySelector("#title").innerHTML = dataProduct.name;//Implémentation du nom du produit dans la page produit.html
        document.querySelector("#price").innerHTML = dataProduct.price;//Implémentation du prix du produit dans la page produit.html
        document.querySelector("#description").innerHTML = dataProduct.description;//Implémentation de la description du produit dans la page produit.html*/

        //Gestion des options de couleurs du produit sélectionné
        for(let colorsProduct of dataProduct.colors){ // Boucle pour connaître les couleurs du produit sélectionné
            console.log(colorsProduct);
            let listColorProduct = document.getElementById("colors")//Liste des couleurs dispos selon le produit
            listColorProduct.insertAdjacentHTML("beforeend", `<option value="${colorsProduct}">${colorsProduct}</option>`)};//Implémentation des couleurs dans le menu déroulant        
        })
        ).catch((error) => alert("Erreur Serveur : "+ error)); // Alerte erreur serveur


// Ajouter un eventlistener sur le bouton
        /* let toto ="toto";
         console.log(toto);
         localStorage.setItem('tata','rthgh');
         localStorage.setItem('tato','rthy');
        console.log(localStorage.length + 1);*/

/* ATTENTION!!!!!!: quand click sur ajouter au panier faire ce qui suit*/
                        /*let quantityProduct= parseInt(document.getElementById('quantity').value);//Transfomation Txt en Nombre
                        
                        let recapProduct = new Array(
                            `${lineProductOfArray._id}`,
                            `${lineProductOfArray.name}`,
                            `${lineProductOfArray.price}`,
                            //`${choiceColorProduct}`,
                            `${quantityProduct}`,
                        );console.log(recapProduct);*/