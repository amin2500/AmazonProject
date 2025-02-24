import {render} from "./checkout/orderSummary.js"
import {renderPaymentSummary} from "./checkout/paymentSummary.js"
// import "../data/cart-class.js"
import "../data/backend-practice.js"
import {loadProducts} from "../data/products.js"
import {loadCarts} from "../scripts/cart.js"

Promise.all([

    new Promise ((resolve)=>{
        loadProducts(()=>{
          resolve()
        })
    }),

    new Promise((resolve)=>{
        loadCarts(()=>{
          resolve()
        })
      })
]).then(()=>{
    render()
    renderPaymentSummary()
})



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

