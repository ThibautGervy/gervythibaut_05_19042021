"use strict";
// Création de la clé produit dans le local storage
let produitStorage = JSON.parse(localStorage.getItem("produit"));

// Container de la page panier
const positionElementPanier = document.querySelector(".container-page-panier");

// Condition de l'affichage du panier (vide ou plein)
if (produitStorage === null) {
    const panierVide = `
<div class="container-panier-vide col-xs-12">
   <div> Le panier est vide </div>
</div>`;
    positionElementPanier.innerHTML = panierVide;
} else {
    let structureProduitPanier = [];
    let k;
    for (let k = 0; k < produitStorage.length; k++) {
        positionElementPanier.innerHTML += 
            `
        <div class = "container-recapitulatif">
           <div> Nom de l'article : ${produitStorage[k].name}</div>
           <div> Quantité : 1 </div>
           <div> Prix : ${produitStorage[k].price / 100} €
        </div>
        `;
    }
}


// Montant total du panier
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

// affichage du formulaire 
const displayFormHtml = () => {
    const positionFormulaire = document.querySelector(".container_formulaire");
    const structureFormulaire = document.querySelector(".container_formulaire");
}

positionFormulaire.innerHTML(structureFormulaire);
displayFormHtml();

// Tableau "products" à envoyer dans l'objet "objetEnvoyer"
const products = [];
let x;
for (x = 0; x < produitStorage.length; x++) {
    produitStorage[x]._id;
    products.push(produitStorage[x]._id);
}

// Récupération des valeurs du formulaire 
const buttonFormulaire = document.querySelector(".btn-outline-success");

buttonFormulaire.addEventListener('click', (e) => {
    e.preventDefault();

    // récupération des valeurs du formulaire
    const contact = {
        firstName: document.querySelector("#firstname").value,
        lastName: document.querySelector("#lastname").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value
    }


    // Mise en place de l'objet dans le local storage 
    localStorage.setItem("contact", JSON.stringify(contact));

    //-------- Gestion validation formulaire -------------
    const textAlert = (value) => {
        return `${value} : cette case est mal remplie !`

    }

    // fonction regEx pour prenom, nom & ville
    function controlPrenom() {
        const lePrenom = contact.firstName;
        if (/^[A-Za-z]{3,20}$/.test(lePrenom)) {
            return true;
        } else {
            alert(textAlert("Prénom"))
            return false;
        };
    }

    function controlNom() {
        const leNom = contact.lastName;
        if (/^[A-Za-z]{3,20}$/.test(leNom)) {
            return true;
        } else {
            alert(textAlert("Nom"))
            return false;
        };
    }

    function controlVille() {
        const laVille = contact.city;
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

    function controlAdresse() {
        const leAdresse = contact.address;
        if (regExAdresse(leAdresse)) {
            return true;
        } else {
            alert(textAlert("Adresse"))
            return false;
        };
    }

    // fonction regEx pour e-mail 

    function controlEmail() {
        const Lemail = contact.email;
        if (/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i.test(Lemail)) {
            return true;
        } else {
            alert(textAlert("Email"))
            return false;
        }
    }

    // Tout dans un objet à envoyer vers le serveur
    const objetEnvoyer = {
        contact,
        products
    }
    console.log(objetEnvoyer);

    if (controlPrenom() && controlNom() && controlVille() && controlAdresse() && controlEmail()) {

        // Mise en place de l'objet dans le local storage 
        localStorage.setItem("contact", JSON.stringify(contact));

        // Envoie de l'objet "ObjetEnvoyer" vers le serveur
        const promesse = fetch("http://localhost:3000/api/cameras/order", {
            method: "POST",
            body: JSON.stringify(objetEnvoyer),
            headers: {
                "Content-Type": "application/json",
            },
            
        });

        promesse.then(async (response) => {
            try {
                const contenu = await response.json();
                if (response.ok) {

                    // récupération de l'id de la response du server;
                    console.log(contenu.orderId);

                    // mettre l'id dans le local storage
                    localStorage.setItem("orderID", contenu.orderId);

                    //renvoie vers la page confirmation commande 
                    window.location = "../html/confirmation.html"
                } else {
                    alert("Il y a un problème")
                }

            } catch (e) {
                console.log(e);
            }
        })
    } else {
        alert("Veuillez corriger vos erreurs !");
    }
})