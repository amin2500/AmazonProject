import {products} from "../data/products.js";
import {cart,addToCart,updateCartQuantity} from "../scripts/cart.js"
import {formatCurrency} from "../scripts/money.js"

let productsHtml = ''

products.forEach((product)=>{
    productsHtml+= `
     <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="quantitySelector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
           ${product.extraInfoHtml()}
          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <button class="add-to-cart-button js-add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `
    document.querySelector(`.js-products-grid`).innerHTML = productsHtml
})

function displayCartQuantity(){
    let cartQuantity = updateCartQuantity()
    document.querySelector(`.js-cart-quantity`).innerHTML = cartQuantity
}
displayCartQuantity()

document.querySelectorAll(`.js-add-to-cart-button`).
forEach((button)=>{
    let timeoutmessage
 button.addEventListener(`click`,()=>{
  let productId = button.dataset.productId
  
  addToCart(productId)
  displayCartQuantity()
  


  let addmessage = document.querySelector(`.js-added-to-cart-${productId}`)
   addmessage.classList.add(`visible-add-to-cart`)

   if(timeoutmessage){
      clearTimeout(timeoutmessage)
   }

   let timeout = setTimeout(()=>{
    addmessage.classList.remove(`visible-add-to-cart`)
   },2000)

   timeoutmessage = timeout
 })
})