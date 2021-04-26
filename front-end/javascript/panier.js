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
           <div> Nom de l'article : ${produitStorage[k].name}</div>
           <div> Quantité : 1 </div>
           <div> Prix : ${produitStorage[k].price / 100} € - <button class="btn-supprimer">Supprimer l'article</button></div>
        </div>
        `;
    }
    if (k == produitStorage.length) {
        positionElementPanier.innerHTML = structureProduitPanier;
    }
}

//-------- gestion du boutton supprimer article-------------

let buttonSupprimer = document.querySelectorAll(".btn-supprimer");

for (let n = 0; n < buttonSupprimer.length; n++) {
    buttonSupprimer[n].addEventListener('click', (event) => {
        event.preventDefault();
        let idSuppression = produitStorage[n]._id;
        console.log("idSupression");
        console.log(idSupression);

        // méthode filter
        


    })
}