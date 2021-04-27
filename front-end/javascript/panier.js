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
           <div> Prix : ${produitStorage[k].price / 100} €
        </div>
        `;
    }
    if (k == produitStorage.length) {
        positionElementPanier.innerHTML = structureProduitPanier;
    }
}


//-------- Montal total du panier -------------

let prixTotal = [];

for (let m = 0; m < produitStorage.length; m++) {
    let prixProduitPanier = produitStorage[m].price;

    prixTotal.push(prixProduitPanier);

}

// additionner les prix avec la méthode reduce

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixFinal = prixTotal.reduce(reducer, 0) / 100 + "€";

const affichageTotalPrix = `
<div class="affichage_prix_total">Le prix total de votre panier est de : ${prixFinal}</div>
`

positionElementPanier.insertAdjacentHTML("beforeend", affichageTotalPrix);


//-------- Formulaire de commande -------------

const afficherFormulaireHtml = () => {
    const positionFormulaire = document.querySelector(".container_produit_panier")

    const structureFormulaire = `
    <h3 class="title_coordonnees">Vos coordonnées</h3>
        <p><em>Tous les champs sont obligatoires</em></p>
        <form class="formulaire_paiement">
            <p>
                <label for="firstname">Prénom</label>
                <input type="text" name="firstname" id="firstname" required>
            </p>
            <p>
                <label for="lastname">Nom</label>
                <input type="text" name="lastname" id="lastname" required>
            </p>
            <p>
                <label for="address">Adresse</label>
                <input type="text" name="address" id="address" required>
            </p>
            <p>
                <label for="city">Ville</label>
                <input type="text" name="city" id="city" required>
            </p>
            <p>
                <label for="email">E-mail</label>
                <input type="email" name="email" id="email" required>
            </p>
            <input type="hidden" name="products" id="products" value="#">
        </form>
        <div class="btn_panier">
            <button type="submit" class="button_passer_commande">Passer la commande</button>
            <button class="button_cancel">Annuler et vider le panier</button>
        </div>
    `
    positionFormulaire.insertAdjacentHTML("afterend", structureFormulaire);
}

afficherFormulaireHtml();


// Récupération des valeurs du formulaire 

const buttonFormulaire = document.querySelector(".button_passer_commande");

buttonFormulaire.addEventListener('click', (e) => {
    e.preventDefault();

    // récupération des valeurs du formulaire
    const formulaireValues = {
        prenom: document.querySelector("#firstname").value,
        nom: document.querySelector("#lastname").value,
        adresse: document.querySelector("#address").value,
        ville: document.querySelector("#city").value,
        email: document.querySelector("#email").value
    }

    //-------- Gestion validation formulaire -------------
    const textAlert = (value) => {
        return `${value} : cette case est mal remplie !`

    }

    // fonction regEx pour prenom, nom & ville
    function controlPrenom() {
        const lePrenom = formulaireValues.prenom;
        if (/^[A-Za-z]{3,20}$/.test(lePrenom)) {
            return true;
        } else {
            alert(textAlert("Prénom"))
            return false;
        };
    }

    function controlNom() {
        const leNom = formulaireValues.nom;
        if (/^[A-Za-z]{3,20}$/.test(leNom)) {
            return true;
        } else {
            alert(textAlert("Nom"))
            return false;
        };
    }

    function controlVille() {
        const laVille = formulaireValues.ville;
        if (/^[A-Za-z]{3,20}$/.test(laVille)) {
            return true;
        } else {
            alert(textAlert("Ville"))
            return false;
        };
    }

    // fonction regEx pour adresse

    const regExAdresse = (value) => {
        return /^[A-Za-z0-9\s]{5,50}$/.test(value);
    }

    function controlAdresse () {
        const leAdresse = formulaireValues.adresse;
        if (regExAdresse(leAdresse)) {
            return true;
        } else {
            alert(textAlert("Adresse"))
            return false;
        };
    }

    if (controlPrenom() && controlNom() && controlVille() && controlAdresse()) {
        // Mise en place de l'objet dans le local storage 
        localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
    } else {
        alert("Veuillez corriger vos erreurs !");
    }


    // Tout dans un objet à envoyer vers le serveur
    const objetEnvoyer = {
        produitStorage,
        formulaireValues
    }

    // Envoie de l'objet "ObjetEnvoyer" vers le serveur

})















//-------- gestion du boutton supprimer article-------------
/*
let buttonSupprimer = document.querySelectorAll(".btn-supprimer");

for (let n = 0; n < buttonSupprimer.length; n++) {
    buttonSupprimer[n].addEventListener('click', (event) => {
        event.preventDefault();
        let idSuppression = produitStorage[n]._id;
        console.log("idSupression");
        console.log(idSupression);
    })
}
*/