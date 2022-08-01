const cartButton = document.querySelector(".cart-btn");
const closeCartButton = document.querySelector(".close-cart");
const clearCartButton = document.querySelector(".clear-cart");
//const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
//const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// cart array
let cart = [];

//to get the products from json
class Products{
async getProducts() {
    try{
        let result = await fetch("./products.json");        
        let data = await result.json();        
        let products = data.items;
        products = products.map( item => {
            const { title, price } = item.fields;
            const { id } =  item.sys ;
            const image  = item.fields.image.fields.file.url;
            return {title,price,id,image};
        });        
        return products;
    }
    catch(error){
        console.error(`error caught ${error}`);
    }
}
}

//to display the products
class UI{
    
    showProducts(products){
        let result = '';
        products.forEach(product => {
            result += 
            `<!-- Single product -->
            <article class="product">
            <div class="img-container">
                <img src=${product.image} class="product-img" alt="product">
                <button class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>
                    Add to bag
                </button>
            </div>
            <h3>${product.title}</h3>
            <h4>$${product.price}</h4>
        </article>`
        });
    productsDOM.innerHTML = result;        
    }
    
}

//local storage 
class Storage{
    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    const ui = new UI();
    const products = new Products();

    products.getProducts().then( products => {
        ui.showProducts(products);
        Storage.saveProducts(products);
    });

});
