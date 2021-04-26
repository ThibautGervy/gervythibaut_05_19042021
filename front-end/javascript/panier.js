let produitStorage = JSON.parse(localStorage.getItem("produit"));

const positionElementPanier = document.querySelector(".container-page-panier");

if (produitStorage === null) {
    const panierVide = `
<div class = "container-panier-vide">
   <div> Le panier est vide </div>
</div>`;
    positionElementPanier.innerHTML = panierVide;
} else {
    let structureProduitPanier = [];

    for (k = 0; k < produitStorage.length; k++) {

        structureProduitPanier = structureProduitPanier + 
        `
        <div class = "container-recapitulatif">
           <div> Quantité 1 - ${produitStorage[k].name}</div>
           <div> ${produitStorage[k].price}€ - supprimer l'article</div>
        </div>
        `;
    }
    if (k == produitStorage.length) {
        positionElementPanier.innerHTML = structureProduitPanier;
    }
}