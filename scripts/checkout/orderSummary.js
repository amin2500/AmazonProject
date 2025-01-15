import {cart,removeFromCart,updateCartQuantity,Quantity,updateDeliveryOption} from "../../scripts/cart.js"
import {products} from "../../data/products.js"
import {deliveryOptions} from "../../scripts/deliveryOptions.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import {renderPaymentSummary} from "../checkout/paymentSummary.js"

export function render(){
let checkoutHtml = ''

cart.forEach((item)=>{
    let productId = item.productId

    
    let matchingItem
    products.forEach((product)=>{
      if(productId === product.id){
        matchingItem = product
      }
    })

    let deliveryOptionId = item.deliveryOptionId

    let deliveryOption
    deliveryOptions.forEach((option)=>{
      if(deliveryOptionId === option.id){
        deliveryOption = option
      }
    })
  
    let today = dayjs()
    let deliveryDate = today.add(deliveryOption.deliveryDate, `days`)
    let datestring = deliveryDate.format(`dddd MMMM D`)

    checkoutHtml+= `
     <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${datestring}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${(matchingItem.priceCents/100).toFixed(2)}
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
                ${deliveryOptionHtml(matchingItem,item)}
              </div>
            </div>
          </div>
    `
    document.querySelector(`.js-order-summary`).innerHTML = checkoutHtml
})

function deliveryOptionHtml(matchingItem,item){
  let html = ''

  deliveryOptions.forEach((deliveryOption)=>{
   
    let today = dayjs()
    let deliveryDate = today.add(deliveryOption.deliveryDate, `days`)
    let datestring = deliveryDate.format(`dddd MMMM D`)
    let priceCents = deliveryOption.deliveryPriceCents === 0 ? `Free` : `$${(deliveryOption.deliveryPriceCents/100).toFixed(2)} -`
    let isChecked = deliveryOption.id === item.deliveryOptionId

    html+= `
     <div class="delivery-option js-delivery-option" data-product-id="${matchingItem.id}" data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio"
                  ${isChecked ? `checked` : ``}
                    class="delivery-option-input"
                    name="${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${datestring}
                    </div>
                    <div class="delivery-option-price">
                      ${priceCents} Shipping
                    </div>
                  </div>
                </div>
    `
  })
  return html
}

document.querySelectorAll(`.js-delivery-option`).
forEach((link)=>{
 link.addEventListener(`click`,()=>{

 let {productId,deliveryOptionId} = link.dataset
  updateDeliveryOption(productId,deliveryOptionId)
  render()
  renderPaymentSummary()
 })
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
    renderPaymentSummary()
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
  if (newQuantity < 1 || newQuantity >= 1000) {
    alert('Quantity must be at least 1 and less than 1000');
    return;
  }
  Quantity(productId,newQuantity)
  let quantityLabel = document.querySelector(`.js-quantity-label-${productId}`)
  quantityLabel.innerHTML = newQuantity
  UpdateCartQuantity()
  renderPaymentSummary()
 })
})
}
