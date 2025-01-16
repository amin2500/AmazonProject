import {products,getproduct} from "../../data/products.js"
import {cart,updateCartQuantity} from "../../scripts/cart.js"
import {deliveryOptions,getdeliveryOption} from "../../scripts/deliveryOptions.js"
 
export function renderPaymentSummary(){

    let productPriceCents = 0
    let shippingPriceCents = 0

     cart.forEach((item)=>{
        let productId = item.productId
        
        
        let matchingItem = getproduct(productId)
        
    
    let deliveryOptionId = item.deliveryOptionId
    let deliveryOption = getdeliveryOption(deliveryOptionId)

    productPriceCents += matchingItem.priceCents * item.quantity
    shippingPriceCents += deliveryOption.deliveryPriceCents
})
let totalBeforeTaxCents = productPriceCents + shippingPriceCents
let taxCents = totalBeforeTaxCents * 0.1  
let toalCents = totalBeforeTaxCents + taxCents


    
    let paymentHtml = `
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${updateCartQuantity()}):</div>
            <div class="payment-summary-money">$${(productPriceCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingPriceCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTaxCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(taxCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(toalCents/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `
    document.querySelector(`.js-payment-summary`).innerHTML = paymentHtml
}