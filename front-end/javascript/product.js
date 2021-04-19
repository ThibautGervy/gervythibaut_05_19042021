"use strict";
// extraction de l'id

const queryString_url_id = window.location.search;

const id = new URLSearchParams(queryString_url_id).get("id");
console.log(id);

const getProduct = async () => {
    const response = await fetch(`http://localhost:3000/api/cameras/${id}`)
    const camera = await response.json();
    return camera;
}

const displayProduct = async () => {
    // destructuration de l'objet 
    const {name, description, price, urlImage, colors} = await getProduct();
    console.log(description);
    // création de variables pour chaque élément de la fiche produit
    // inner.html 
}

displayProduct();



// let response =  fetch (`${url}/${id}`)





const containerProduct = document.querySelector(".container-page-produit")

const textProduct = `   
<div class="container">
<div class="row">
    <div class="col-md-6">
        <div class="card">
            <div class="card_content">
                <img src="images/vcam_4.jpg" alt="appareil photo" class="picture_card">
                <p class="name"></p>
                <p class="description"></p>
                <p class="price"></p>
                <div class="selecteur">
                    <div class="selecteur_element_1">
                        <label for="Objectifs">Choisissez un objectif :</label>
                        <select name="Objectifs" id="Objectifs">
                            <option id="1"></option>
                            <option id="2"></option>
                        </select>
                    </div>
                    <div class="selecteur_element_2">
                        <label for="Quantité">Choisissez une quantité :</label>
                        <select name="Quantité" id="Quantité">
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                </div>
                <div class="button_card">
                    <div class="button_back">
                        <a href="../index.html">
                            <input type="button" value="Retourner à l'accueil" class="button_home">
                        </a>
                    </div>
                    <div class="button_shop add-cart">
                        <input type="button" value="Ajouter au panier" class="button_panier">
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
</div>
`

containerProduct.innerHTML = textProduct;