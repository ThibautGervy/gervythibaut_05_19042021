let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Zurss 50S',
        tag: 'Zurss50s',
        price: 599,
        inCart: 0
    }
]

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers ();
    })
}

function onLoadCartNumbers () {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.nav_element span').textContent = productNumbers;
    }
}


function cartNumbers () {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.nav_element span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.nav_element span').textContent = 1;
    }
}

onLoadCartNumbers ();