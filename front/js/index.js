const urlApi = `http://192.168.1.182:3000/api/products`;

// Get product data from API
fetch(urlApi)
  .then((response) =>
    response.json().then((dataProducts) => {
      // Collecte des infos de chaque produit et création des balises html
      for (let product of dataProducts) {
        // Boucle pour implémenter chaque produit dans la page index.html
        // Implémentation dans la section #items de la page index.html
        const elemA = document.createElement('a'); //Création de l'élément "a"
        elemA.href = `./product.html?id=${product._id}`; //"href" du lien "a"
        const elemArticle = document.createElement('article'); //Création de l'élément "article"
        const elemImg = document.createElement('img'); //Création de l'élément "img"
        elemImg.src = `${product.imageUrl}`; //Source de l'élément "img"
        elemImg.alt = `${product.altTxt}`; //Attribut "alt" de l'élément "img"
        elemArticle.appendChild(elemImg); //Rattachement de l'élément "img" à l'élément parent "article"

        const elemH3 = document.createElement('h3'); //Création de l'élément titre "h3"
        elemH3.className = 'productName'; //Classe de l'élément "h3"
        const titleH3 = document.createTextNode(`${product.name}`); //Nom du produit
        elemH3.appendChild(titleH3); //Ajout du nom du produit dans l'élément titre "h3"
        elemArticle.appendChild(elemH3); //Rattachement de l'élément titre "h3" à l'élément parent "article"

        const elemP = document.createElement('p'); //Création de l'élément paragraphe "p"
        elemP.className = 'productDescription'; //Classe de l'élément paragraphe "p"
        const contentP = document.createTextNode(`${product.description}`); //Ajout du nom du produit dans l'élément titre "h3"
        elemP.appendChild(contentP); //Ajout de la description du produit dans l'élément paragraphe "p"

        elemArticle.appendChild(elemP); //Rattachement de l'élément "p" à l'élément parent "article"

        elemA.appendChild(elemArticle); //Rattachement de l'élément "article" à l'élément parent "a"

        document.querySelector('#items').appendChild(elemA); //Sélection de l'élément "section" avec l'id "items" et ajout de l'élément "a" à cet élément "section"
      }
    })
  )
  .catch((error) => alert('Erreur Serveur : ' + error)); // Alerte erreur serveur
