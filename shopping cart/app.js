const cartButton = document.querySelector(".cart-btn");
const closeCartButton = document.querySelector(".close-cart");
const clearCartButton = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// cart array
let cart = [];

let buttonsDOM = [];

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

    getBagButtons(){
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttonsDOM = buttons;
        buttons.forEach(button =>{
            let id = button.dataset.id;
            let inCart = cart.find( item => item === id);
            
            if(inCart){
                button.innerText = "In cart";
                button.disabled = true;
            }
            
            button.addEventListener("click", (event) =>{
                event.target.innerText = "In cart";
                event.target.disabled = true;
                //event.target returns HTML 
                //get product from products
                //console.log(typeof(Storage.getProduct(event.target.dataset.id)));     object
                let cartItem = {...Storage.getProduct(event.target.dataset.id),amount:1};
                //add to cart[]
                //cart.push(cartItem);
                cart = [...cart, cartItem];
                //save cart in localStorage
                Storage.saveCart(cart);                
                //set cart values
                this.setCartValues(cart);
                //display cart item
                this.addCartItem(cartItem);
                //show the cart
                this.showCart();
            })
            
        })
    }

    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map( item => {
            tempTotal += item.price * item.amount ;
            itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }

    addCartItem(item){
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
                    <img src=${item.image} alt="cart-product">
                    <div>
                        <h4>${item.title}</h4>
                        <h5>$${item.price}9</h5>                        
                        <span class="remove-item" data-id=${item.id}>remove </span>
                    </div>
                    <div>
                    <i class="fas fa-chevron-up" data-id=${item.id}></i>
                    <p class="item amount">${item.amount}</p>
                    <i class="fas fa-chevron-down" data-id=${item.id}></i>
                    </div>
        `;
        cartContent.appendChild(div);
    }

    showCart(){
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }

    setApp(){
        cart = Storage.getCart();       
        //why use this?
        //to access this class's function
        this.setCartValues(cart);
        this.populateCart(cart);
    }

    populateCart(cart){
        cart.forEach(item => {
            this.addCartItem(item);            
        });
    }
    
}

//local storage 
class Storage{
    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart(cart){
        localStorage.setItem('cart',JSON.stringify(cart));
    }
    static getCart(){        
        //return (localStorage.getItem('cart'));    //this will return null
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }

}

document.addEventListener("DOMContentLoaded",()=>{
    const ui = new UI();
    const products = new Products();

    ui.setApp();

    products.getProducts().then( products => {
        ui.showProducts(products);
        Storage.saveProducts(products);
    }).then( ()=>{
        ui.getBagButtons();
    });

});
