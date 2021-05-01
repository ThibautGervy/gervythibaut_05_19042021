let produitStorage = JSON.parse(localStorage.getItem("produit"));

const positionElementPanier = document.querySelector(".container-page-panier");

if (produitStorage === null) {
    const panierVide = `
<div class = "container-panier-vide col-xs-12">
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
    if (k === produitStorage.length) {
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
    const positionFormulaire = document.querySelector(".container_formulaire")

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
            <button type="submit" class="btn btn-outline-success">Je passe ma commande</button>
        </div>
    `
    positionFormulaire.insertAdjacentHTML("afterbegin", structureFormulaire);
}

afficherFormulaireHtml();

// Tableau products à envoyer 
const products = [];
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

    // Tout dans un objet à envoyer vers le serveur
    const objetEnvoyer = {
        contact,
        products
    }
    console.log(objetEnvoyer);

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



})