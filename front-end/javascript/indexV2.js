/* generateCamera()

function generateCamera() {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    const divElement = document.querySelector(".list_camera")

    fetch('http://localhost:3000/api/cameras', config)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            for (const camera of data) {
                divElement.innerHTML += `
                <div class="col-md-6">
                <div class="cart_one">
                    <img src="${camera.imageUrl}" alt="Appareil photo vintage" class="image_1" id="img">
                    <div class="element_cart">
                        <p class="nom" id="nom">${camera.name}</p>
                        <p class="prix" id="prix">${camera.price / 100}  €</p>
                        <a href="Katatone.html?id=${camera._id}">
                            <input type="button" value="Voir le produit" class="btn_product">
                        </a>
                    </div>
                </div>
            </div>   
                `
            }

        })
}

*/ 