const arrayBasketProducts =
  JSON.parse(localStorage.getItem('basketProducts')) != null &&
  JSON.parse(localStorage.getItem('basketProducts')) != undefined
    ? JSON.parse(localStorage.getItem('basketProducts'))
    : [];

// Définition de la variable sous forme de tableau qui contiendra toutes les données récupérées de l'API
let datasProductsApi = [];
/****/

//Contrôle si le localStorage est non vide
if (arrayBasketProducts.length > 0) {
  getDatasFromAPI();
}
/****/

// Récupération des données de tous les produits de l'API pour les mettre dans le tableau 'datasProductsApi'
async function getDatasFromAPI() {
  const urlApi = await fetch(`http://192.168.1.182:3000/api/products`);
  datasProductsApi = await urlApi.json();
  init(datasProductsApi);
  showCart(datasProductsApi); // Fonction qui affiche le panier
  /****/

  function init(datas) {
    datasProductsApi = datas;
  }

  // Affichage des articles dans cart.html
  function showCart() {
    // boucle for pour parcourir le panier
    for (datas of arrayBasketProducts) {
      let index = datasProductsApi.findIndex((p) => p.name == datas.name); //Récupération des index dans le tableau 'datasProductApi' lorsque le nom des produits du tableau correspondent au nom des produits dans le lS
      let priceProduct = datasProductsApi[index].price; //Prix de chaque produit dans le tableau 'datasProductApi'
      let quantityProduct = datas.quantity; //Quantité de chaque produit dans le localStorage

      //Implémentation de l'élément article et ses enfants pour chaque produit dans la page cart.html
      const elemArticle = document.createElement('article'); //Création de l'élément "article"
      elemArticle.className = 'cart__item'; //Classe de l'élément "article"
      elemArticle.setAttribute('data-id', `${datas.id}`); //Attribut donnée : "data-id" ajouté dans l'élément "article"
      elemArticle.setAttribute('data-color', `${datas.color}`); //Attribut donnée : "data-color" ajouté dans l'élément "article"
      const elemDiv1 = document.createElement('div'); //Crétation du 1er élément "div"
      elemDiv1.className = 'cart__item__img'; //Classe du 1er élément "div"
      const div1content = document.createElement('img'); //Image du produit dans le 1er élément "div"
      div1content.src = datasProductsApi[index].imageUrl; //Récupération de l'attribut "src" de l'image dans le tableau issu de l'API
      div1content.alt = datasProductsApi[index].altTxt; //Récupération de l'attribut "alt" de l'image dans le tableau issu de l'API
      elemDiv1.appendChild(div1content); //Rattachement de l'image du produit au 1er élément parent "div"
      elemArticle.appendChild(elemDiv1); //Rattachement du 1er élément "div" à l'élément parent "article"

      const elemDiv2 = document.createElement('div'); //Crétation du 2ème élément "div"
      elemDiv2.className = 'cart__item__content'; //Classe du 2ème élément "div"
      const elemDiv3 = document.createElement('div'); //Création du 3ème élément "div"
      elemDiv3.className = 'cart__item__content__description'; //Classe du 3ème élément "div"
      const elemH2 = document.createElement('h2'); //Création de l'élément titre "h2"
      const titleH2 = document.createTextNode(`${datas.name}`); //Ajout du nom du produit dans l'élément titre "h2"
      elemH2.appendChild(titleH2); //Rattachement du nom du produit à l'élément titre "h2"
      elemDiv3.appendChild(elemH2); //Rattachement de l'élément titre "h2" à l'élément parent 3ème "div"

      const elemP1 = document.createElement('p'); //Création du 1er élément paragraphe "p"
      const contentP1 = document.createTextNode(`${datas.color}`); //Ajout de la couleur du produit dans le 1er élément paragraphe "p"
      elemP1.appendChild(contentP1); //Rattachement de la couleur du produit au 1er élément paragraphe "p"
      elemDiv3.appendChild(elemP1); //Rattachement du 1er élément paragraphe "p" à l'élément parent 3ème "div"

      const elemP2 = document.createElement('p'); //Création du 2ème élément paragraphe "p"
      const contentP2 = document.createTextNode(`${priceProduct}` + ' €'); //Ajout du prix du produit dans le 2ème élément paragraphe "p"
      elemP2.appendChild(contentP2); //Rattachement du prix du produit au 2ème élément paragraphe "p"
      elemDiv3.appendChild(elemP2); //Rattachement du 2ème élément paragraphe "p" à l'élément parent 3ème "div"
      elemDiv2.appendChild(elemDiv3); //Rattachement du 3ème élément "div" au 2ème élément "div" parent

      const elemDiv4 = document.createElement('div'); //Création du 4ème élément "div"
      elemDiv4.className = 'cart__item__content__settings'; //Classe du 4ème élément "div"
      const elemDiv5 = document.createElement('div'); //Crétation du 5ème élément "div"
      elemDiv5.className = 'cart__item__content__settings__quantity'; //Classe du 5ème élément "div"
      const elemP3 = document.createElement('p'); //Création du 3ème élément paragraphe "p"
      const contentP3 = document.createTextNode('Qté : '); //Ajout du texte "Qté :" dans le 3ème élément paragraphe "p"
      elemP3.appendChild(contentP3); //Rattachement du texte "Qté :" au 3ème élément paragraphe "p"
      elemDiv5.appendChild(elemP3); //Rattachement du 3ème élément paragraphe "p" au 5ème élément "div"
      const elemInput = document.createElement('input'); //Création de l'élément "input"
      elemInput.type = 'number'; //Type de l'élément "input"
      elemInput.className = 'itemQuantity'; //Classe de l'élément "input"
      elemInput.name = 'itemQuantity'; //Attribut "name" de l'élément "input"
      elemInput.min = '1'; //Valeur mini de l'élément "input"
      elemInput.max = '100'; //Valeur maxi de l'élément "input"
      elemInput.value = `${quantityProduct}`; //Valeur de la quantité de produit issue de LS inséré de l'élément "input"
      elemDiv5.appendChild(elemInput); //Rattachement de l'élément "input" au 5ème élément "div" parent
      elemDiv4.appendChild(elemDiv5); //rattachement du 5ème élément "div" au 4ème élément "div" parent

      const elemDiv6 = document.createElement('div'); //Crétation du 6ème élément "div"
      elemDiv6.className = 'cart__item__content__settings__delete'; //Classe du 6ème élément "div"
      const elemP4 = document.createElement('p'); //Création du 4ème élément paragraphe "p"
      elemP4.className = 'deleteItem'; //Classe du 4ème élément paragraphe "p"
      const contentP4 = document.createTextNode('Supprimer'); //Ajout du texte "supprimer" dans le 4ème élément paragraphe "p"
      elemP4.appendChild(contentP4); //Rattachement du texte "supprimer" au 4ème élément paragraphe "p"
      elemDiv6.appendChild(elemP4); //Rattachement du 4ème élément paragraphe "p" au 6ème élément "div" parent
      elemDiv4.appendChild(elemDiv6); //Rattachement du 6ème élément "div" au 4ème élément "div" parent
      elemDiv2.appendChild(elemDiv4); //Rattachement du 4ème élément "div" au 2ème élément "div" parent
      elemArticle.appendChild(elemDiv2); //Rattachement du 2ème élément "div" à l'élément "article" parent
      document.querySelector('#cart__items').appendChild(elemArticle); //implémentation de l'élément "article" dans la "section" d'Id "cart__items"
    }
    /****/
    totalOrder();
  }
  /****/

  // Modification de la quantité d'un produit
  let baliseQuantityProduct = document.querySelectorAll('.itemQuantity'); //Rescencement des inputs "itemQuantity"
  let articleProduct = document.querySelectorAll('.cart__item'); //Rescencement des balises article "cart__item"

  for (baliseQuantityProduct of articleProduct) {
    baliseQuantityProduct.addEventListener('change', changeQuantity); //Observation si changement de l'input "itemQuantity" sur l'un des produits de la page
  }

  function changeQuantity() {
    let idProduct = this.dataset.id; //Détermination de l'Id produit pour lequel la quantité a été modifiée
    let colorProduct = this.dataset.color; //Détermination de la couleur du produit pour lequel la quantité a été modifiée
    let quantityProduct = parseInt(this.querySelector('.itemQuantity').value); //Conversion de la nouvelle quantité de texte en nombre

    if (quantityProduct > 0 && quantityProduct <= 100) {
      for (let i = 0; i < arrayBasketProducts.length; i++) {
        //Boucle pour séléctionner le bon Id produit avec la bonne couleur dans le lS
        if (
          arrayBasketProducts[i].id == idProduct &&
          arrayBasketProducts[i].color == colorProduct
        ) {
          //Vérification du bon Id produit et de la bonne couleur
          arrayBasketProducts[i].quantity = quantityProduct; //Modification de la quantité dans le lS
          localStorage.setItem(
            'basketProducts',
            JSON.stringify(arrayBasketProducts)
          ); //Injection dans le lS du produit avec la nouvelle quantité
          alert('Quantité modifiée');
        }
      }
    } else {
      alert(
        'La quantité pour ce produit doit être comprise entre 1 et 100 maximum'
      );
    }
    totalOrder();
  }
  /****/

  // Suppression d'un produit
  const nbreDeleteItem = document.querySelectorAll('.deleteItem');
  nbreDeleteItem.forEach((item) => {
    //Sur chacun des éléments, ajout d'un eventlistener
    item.addEventListener('click', (el) => {
      // Suppression de l'élément en fonction de son dataset

      // Récupération de l'id et la couleur
      const id = el.target.closest('article').getAttribute('data-id');
      const color = el.target.closest('article').getAttribute('data-color');

      // Recherche de l'élément dans le lS
      const index = arrayBasketProducts.findIndex(
        (product) => product.id === id && product.color === color
      );

      // Suppression de l'élément dans le lS
      arrayBasketProducts.splice(index, 1);

      // Suppression l'élément du DOM
      el.target.closest('article').remove();

      // Mise à jour du lS
      localStorage.setItem(
        'basketProducts',
        JSON.stringify(arrayBasketProducts)
      );
      alert('Article(s) supprimé(s)');

      if (arrayBasketProducts.length == 0) {
        //Si le lS est vide
        localStorage.clear();
        document.querySelector('#totalPrice').innerText = 0;
        document.querySelector('#totalQuantity').innerText = 0;
      } else {
        totalOrder(); // Mise à jour du calcul du tarif et nombre d'articles
      }
    });
  });
  /****/
}

//Calcul du total commande
function totalOrder() {
  let arrayTotalPriceByProduct = [];
  let arrayQuantityProduct = [];
  for (datas of arrayBasketProducts) {
    index = datasProductsApi.findIndex((p) => p.name == datas.name);
    priceProduct = datasProductsApi[index].price; //Prix de chaque produit qui se trouve dans le lS
    let totalPriceByProduct = datas.quantity * priceProduct; //Calcul du total par produit
    arrayTotalPriceByProduct.push(totalPriceByProduct); //Mise dans un tableau du prix total de chaque produit
    arrayQuantityProduct.push(datas.quantity); //Mise dans un tableau de la quantité de chaque produit
  }

  //Calcul du prix total
  let reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalOrder = arrayTotalPriceByProduct.reduce(reducer);
  /****/

  document.querySelector('#totalPrice').innerText = totalOrder; //Implémentation du montant révisé de la commande dans la page cart.html

  //Calcul de la quantité totale
  reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalQuantityProducts = arrayQuantityProduct.reduce(reducer);
  /****/

  document.querySelector('#totalQuantity').innerText = totalQuantityProducts; //Implémentation de la quantité révisée de la  commande  dans la page
}
/****/

//Gestion du formulaire contact
const maskNameAndCity = /^[a-zA-Z^\àâäéèêëïîôöùûüç\-\s]{2,}$/g; // comporte des lettres maj ou min ou "-" ou " " et 2 caractères min
const maskAddress = /^[a-zA-Z0-9àâäéèêëïîôöùûüç\s-]{5,}$/g; //comporte au minimum 5 lettres, chiffres ou "-" (sans compter les espaces qui sont acceptés)
const maskMail =
  /^[a-zA-Z0-9àâäéèêëïîôöùûüç\._\-]{2,}[@][a-zA-Z0-9]{2,}[\.][a-zA-Z]{2,}$/g; // 2 caractères min (".","-"" et "_" acceptés) avant le "@" puis 2 lettres ou chiffres min après le @ puis 2 lettres min uniquement après le "."

const nbreInput = document.querySelectorAll('.cart__order__form__question'); //Rescencement des Inputs dans le formulaire

nbreInput.forEach((item) => {
  item.addEventListener('input', (el) => {
    //Surveillance évènement sur chaque input
    const valueInput = el.target.closest('input').value; //Valeur du champ input
    const idInput = el.target.closest('input').getAttribute('id'); //Recherche de l'attribut de l'input modifié
    //Controle champs Prénom, Nom ou Ville
    if (
      idInput === 'firstName' ||
      idInput === 'lastName' ||
      idInput === 'city'
    ) {
      if (valueInput.match(maskNameAndCity)) {
        //Vérication du formatage du champ
        document.getElementById(`${idInput}ErrorMsg`).innerText = '';
      } else {
        document.getElementById(
          `${idInput}ErrorMsg`
        ).innerText = `Seules les lettres minuscules ou majuscules, "-" et espace sont acceptés`;
        document.getElementById(idInput).focus(); //Remise du focus sur le champ
      }
    }
    /****/

    //Controle champ Adresse
    if (idInput === 'address') {
      if (valueInput.match(maskAddress)) {
        //Vérication du formatage du champ
        document.getElementById('addressErrorMsg').innerText = '';
      } else {
        document.getElementById(
          'addressErrorMsg'
        ).innerText = `Seules les lettres minuscules ou majuscules, "-" et espace sont acceptés`;
        document.getElementById(idInput).focus(); //Remise du focus sur le champ
      }
    }
    /****/

    //Controle champ Email
    if (idInput === 'email') {
      if (valueInput.match(maskMail)) {
        //Vérication du formatage du champ
        document.getElementById('emailErrorMsg').innerText = '';
      } else {
        document.getElementById(
          'emailErrorMsg'
        ).innerText = `Adresse mail invalide`;
        document.getElementById(idInput).focus(); //Remise du focus sur le champ
      }
    }
    /****/
  });
});
/****/

//Gestion envoi datas au backEnd
const formContact = document.querySelector('.cart__order__form');
formContact.addEventListener('submit', (e) => {
  //Ecoute du clic de l'input "commander"
  let arrayBackEndProducts = [];
  for (let i = 0; i < arrayBasketProducts.length; i++) {
    arrayBackEndProducts.push(arrayBasketProducts[i].id); //Intégration de tous les Id product des produits choisis lors de la cde dans le tableau 'arrayBackEndProducts'
  }

  //Formatage de l'objet à envoyer au backEnd
  const orderForm = {
    contact: {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value,
    },
    products: arrayBackEndProducts,
  };
  /****/

  e.preventDefault(); //Evite que la page cart.html ne se rafraîchisse

  //Options de la requête fetch
  const optionsRequest = {
    method: 'POST',
    body: JSON.stringify(orderForm),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  /****/

  //Requête Fetch pour obtention de l'"idOrder" si le LS n'est pas vide
  //Déclaration constantes pour obtenir les valeurs de chaque champs du formulaire
  const firstNameFormValue = document.getElementById('firstName').value;
  const lastNameFormValue = document.getElementById('lastName').value;
  const addressFormValue = document.getElementById('address').value;
  const cityFormValue = document.getElementById('city').value;
  const emailFormValue = document.getElementById('email').value;
  /****/

  if (
    firstNameFormValue == '' ||
    lastNameFormValue == '' ||
    addressFormValue == '' ||
    cityFormValue == '' ||
    emailFormValue == ''
  ) {
    //Vérification qu'aucun champ du formulaire n'est vide
    alert(
      'Le formulaire est incomplet. Veuillez remplir tous les champs du formulaire'
    );
  } else {
    if (
      arrayBasketProducts.length > 0 &&
      firstNameFormValue != '' &&
      lastNameFormValue != '' &&
      addressFormValue != '' &&
      cityFormValue != '' &&
      emailFormValue != ''
    ) {
      //Condition pour l'envoi au backEnd : localStorage et champs du formulaire non vides
      fetch('http://192.168.1.182:3000/api/products/order', optionsRequest)
        .then((response) => response.json())
        .then((data) => {
          localStorage.clear(); //Suppression de produits dans le LS
          document.location = `./confirmation.html?orderId=${data.orderId}`; //Ouverture la page confirmation avec l'"idOrder" dans l'URL
        })
        .catch((error) => alert('Erreur Serveur : ' + error)); // Alerte erreur serveur
    } else {
      alert('Votre panier est vide. Vous devez commander minimum 1 produit');
    }
  }
  /****/
});
/****/
