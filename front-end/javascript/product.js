"use strict";

// extraction de l'id
const queryString_url_id = window.location.search;
const id = new URLSearchParams(queryString_url_id).get("id");


const getProduct = async () => {
    const response = await fetch(`http://localhost:3000/api/cameras/${id}`)
    const camera = await response.json();
    return camera;
}


const displayProduct = async () => {
    // destructuration de l'objet 
    const {
        name,
        description,
        price,
        imageUrl,
        lenses,
        _id
    } = await getProduct();

    // création de variables pour chaque élément de la fiche produit
    const nomElement = document.querySelector(".nom");
    const descriptElement = document.querySelector(".description");
    const prixElement = document.querySelector(".prix");
    const imgUrlElement = document.querySelector("#img");
    const lensesElement = document.querySelector("#lentilles");
    const idElement = document.querySelector(".id")


    // innerHtml pour chaque variables
    nomElement.innerHTML = name;
    descriptElement.innerHTML = description;
    prixElement.innerHTML = `Tarif : ${price / 100 + " €"}` ;
    imgUrlElement.src = imageUrl;
    idElement.innerHTML = `Référence produit : ${_id}`;

    for (const lentille of lenses) {
        lensesElement.innerHTML += `<option>${lentille}</option>`
    }


    // LOCAL STORAGE 

    const envoyerPanier = document.querySelector(".button_panier");
    const optionsProduit = {
        name,
        description,
        price,
        imageUrl,
        lenses,
        _id
    }
    console.log(optionsProduit._id);

    envoyerPanier.addEventListener('click', (event) => {
        let produitStorage = JSON.parse(localStorage.getItem("produit"));

        const messageConfirmation = () => {
            if (window.confirm(`${name} a bien été ajouté au panier
Pour consulter votre panier cliquez sur OK`)) {
                window.location.href = "panier.html";
            } else {
                window.location.href = "../index.html";
            }
        }

        if (produitStorage) {
            produitStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitStorage));
            messageConfirmation();


        } else {
            produitStorage = [];
            produitStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitStorage));
            messageConfirmation();
        }

        event.preventDefault();

    })

}

displayProduct()