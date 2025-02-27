import {render} from "./checkout/orderSummary.js"
import {renderPaymentSummary} from "./checkout/paymentSummary.js"
// import "../data/cart-class.js"
import "../data/backend-practice.js"
import {loadProductsFetch} from "../data/products.js"


async function loadpage(){
    await loadProductsFetch()
 
    
    render()
     renderPaymentSummary()
 }
 loadpage()



// new Promise ((resolve)=>{

//     loadProducts(()=>{
//       resolve()
//     })

// }).then(()=>{
//     return new Promise((resolve)=>{
//       loadCarts(()=>{
//         resolve()
//       })
//     })

// }).then(()=>{
//     render()
//     renderPaymentSummary()
// })


// loadProducts(()=>{
//     render()
//     renderPaymentSummary()
// })

