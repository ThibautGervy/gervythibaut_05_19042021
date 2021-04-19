const url = "http://localhost:3000/api/cameras"



main()

async function main() {
    const cameras = await generateCameras()

    for (camera of cameras) {
        displayCamera(camera)
    }
}




function generateCameras() {

    

    return fetch(url)
        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function (cameras) {
            return cameras
        })
        .catch(function (error) {
            alert(error)
        })
}

function displayCamera(camera) {
    const templateElt = document.getElementById("templateCamera")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.querySelector(".image").src = camera.imageUrl
    cloneElt.querySelector(".nom").textContent = camera.name
    cloneElt.querySelector(".prix").textContent = camera.price / 100 + " €"
    cloneElt.querySelector("#lienProduit").href = `./html/product.html?id=${camera._id}`
    
    document.getElementById("main").appendChild(cloneElt)
}






