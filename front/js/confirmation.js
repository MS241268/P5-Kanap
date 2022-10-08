const parameter = (new URL(document.location)).searchParams//Chargement des paramètres de l'URL
const currentPageIdOrder = parameter.get("orderId")//Recherche du parametre "orderId" dans l'URL
document.getElementById("orderId").innerHTML = currentPageIdOrder//Implémentation de l'"orderId" dans la page "confirmation?html"