import {cart,removeFromCart,updateCartQuantity,Quantity} from "../scripts/cart.js"
import {products} from "../data/products.js"

let checkoutHtml = ''

cart.forEach((item)=>{
    let productId = item.productId

    let matchingItem
    products.forEach((product)=>{
        if(productId === product.id){
          matchingItem = product
        }
    })
    checkoutHtml+= `
     <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  ${(matchingItem.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${item.quantity}</span>
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingItem.id}">
                  <span class="save-quantity-link js-save-quantity-link link-primary"data-product-id="${matchingItem.id}">Save</span>
                  <span class="update-quantity-link js-update-quantity-link link-primary"data-product-id="${matchingItem.id}">
                    Update
                  </span>
                  <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `
    document.querySelector(`.js-order-summary`).innerHTML = checkoutHtml
})

function UpdateCartQuantity(){
  let cartQuantity = updateCartQuantity()
  document.querySelector(`.js-return-to-home-link`).innerHTML = `${cartQuantity} items`
}
UpdateCartQuantity()


document.querySelectorAll(`.js-delete-quantity-link`).
forEach((link)=>{
 link.addEventListener(`click`,()=>{

   let productId = link.dataset.productId
    removeFromCart(productId)

    let container = document.querySelector(`.js-cart-item-container-${productId}`)
    container.remove()
    UpdateCartQuantity()
 })
})

document.querySelectorAll(`.js-update-quantity-link`).
forEach((link)=>{
 link.addEventListener(`click`,()=>{
  let productId = link.dataset.productId
  let container = document.querySelector(`.js-cart-item-container-${productId}`)
  container.classList.add(`show`)
  UpdateCartQuantity()
 })
})

document.querySelectorAll(`.js-save-quantity-link`).
forEach((link)=>{
 link.addEventListener(`click`,()=>{
  let productId = link.dataset.productId
  let container = document.querySelector(`.js-cart-item-container-${productId}`)
  container.classList.remove(`show`)
  let quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
  let newQuantity = Number(quantityInput.value)
  Quantity(productId,newQuantity)
  let quantityLabel = document.querySelector(`.js-quantity-label-${productId}`)
  quantityLabel.innerHTML = newQuantity
  UpdateCartQuantity()
 })
})