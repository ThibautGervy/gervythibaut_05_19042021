"use strict";
// Récupération de l'ID de la commande
const orderID = localStorage.getItem("orderID");

// Récupération du prix total de la commande 
const prixFinal = localStorage.getItem("prixFinal");

// structure HTML de la page confirmation 
const positionElementConfirmation = document.querySelector(".container-recapitulatif-commande");

// sélection élement du DOM pour le positionnement 
//localStorage.clear();
const structureConfirmation = `
<div class="recapCommande text-center">
        <p>Votre commande n°<span class="gras">${orderID}</span> a bien été enregistrée. </p>
        <p>Le prix total de votre commande est de : ${prixFinal}.</p>
        <p>Merci pour votre commande sur notre site et à bientôt !</p>
    </div>
`;

// injection HTML 
positionElementConfirmation.insertAdjacentHTML("afterbegin", structureConfirmation);





