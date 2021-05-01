// Récupération de l'ID de la commande
const orderID = localStorage.getItem("orderID");

// structure HTML de la page confirmation 
const positionElementConfirmation = document.querySelector(".container-recapitulatif-commande");

// sélection élement du DOM pour le positionnement 
const structureConfirmation = `
<div class="recapCommande text-center">
        <p>Votre commande n°<span class="gras">${orderID}</span> a bien été enregistrée. </p>
        <p>Merci pour votre commande sur notre site et à bientôt !</p>
    </div>

`;

// injection HTML 
positionElementConfirmation.insertAdjacentHTML("afterbegin", structureConfirmation);


