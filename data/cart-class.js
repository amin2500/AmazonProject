class Cart {
    cartItem = undefined
    #localStorageKey = undefined


    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey
        this.#LoadFromStorage()
    }
    #LoadFromStorage(){
        this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
          productId:`e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
          quantity:1,
          deliveryOptionId:`1`
      },{
          productId:`15b6fc6f-327a-4ec4-896f-486349e85a3d`,
          quantity:2,
          deliveryOptionId:`2`
      }]
      }
      SaveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItem))
      }

      addToCart(productId){
        let matchingItem
      this.cartItem.forEach((item)=>{
        if(productId === item.productId){
            matchingItem = item
        }
      })
    
      let quantitySelector = document.querySelector(`.quantitySelector-${productId}`)
      let quantity = Number(quantitySelector.value)
    
      if(matchingItem){
         matchingItem.quantity+= quantity
      }
      else{
        this.cartItem.push({
            productId:productId,
            quantity:quantity,
            deliveryOptionId:`1`
          })
      }
      this.SaveToStorage()
    }

    removeFromCart(productId){
        let newCart = []
        this.cartItem.forEach((item)=>{
         if(item.productId !== productId){
           newCart.push(item)
         }
        })
        this.cartItem = newCart
        this.SaveToStorage()
      }


      updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem
        this.cartItem.forEach((item)=>{
          if(productId === item.productId){
             matchingItem = item
          }
        })
        matchingItem.deliveryOptionId  = deliveryOptionId
        this.SaveToStorage()
      }
       updateCartQuantity(){ 
        let cartQuantity = 0
      this.cartItem.forEach((item)=>{
       cartQuantity += item.quantity
      })
      return cartQuantity
      
    }


    Quantity(productId,newQuantity){
        let matchingItem
        this.cartItem.forEach((item)=>{
          if(productId === item.productId){
              matchingItem = item
          }
        })
        matchingItem.quantity = newQuantity
        this.SaveToStorage()
      }
}
let cart = new Cart(`cart-oop`)
let bussinessCart = new Cart(`cart-business`)





console.log(cart)
console.log(bussinessCart)


// function Cart(localStorageKey){
//     let cart = {
        // cartItem: undefined,
    
    
        // LoadFromStorage(){
        //     this.cartItem = JSON.parse(localStorage.getItem(localStorageKey)) || [{
        //       productId:`e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
        //       quantity:1,
        //       deliveryOptionId:`1`
        //   },{
        //       productId:`15b6fc6f-327a-4ec4-896f-486349e85a3d`,
        //       quantity:2,
        //       deliveryOptionId:`2`
        //   }]
        //   },
    
        //    SaveToStorage(){
        //     localStorage.setItem(localStorageKey,JSON.stringify(this.cartItem))
        //   },
    
        //    addToCart(productId){
        //     let matchingItem
        //   this.cartItem.forEach((item)=>{
        //     if(productId === item.productId){
        //         matchingItem = item
        //     }
        //   })
        
        //   let quantitySelector = document.querySelector(`.quantitySelector-${productId}`)
        //   let quantity = Number(quantitySelector.value)
        
        //   if(matchingItem){
        //      matchingItem.quantity+= quantity
        //   }
        //   else{
        //     this.cartItem.push({
        //         productId:productId,
        //         quantity:quantity,
        //         deliveryOptionId:`1`
        //       })
        //   }
        //   this.SaveToStorage()
        // },
    
        //  removeFromCart(productId){
        //     let newCart = []
        //     this.cartItem.forEach((item)=>{
        //      if(item.productId !== productId){
        //        newCart.push(item)
        //      }
        //     })
        //     this.cartItem = newCart
        //     this.SaveToStorage()
        //   },
    
        //  updateDeliveryOption(productId,deliveryOptionId){
        //     let matchingItem
        //     this.cartItem.forEach((item)=>{
        //       if(productId === item.productId){
        //          matchingItem = item
        //       }
        //     })
        //     matchingItem.deliveryOptionId  = deliveryOptionId
        //     this.SaveToStorage()
        //   },
        //    updateCartQuantity(){ 
        //     let cartQuantity = 0
        //   this.cartItem.forEach((item)=>{
        //    cartQuantity += item.quantity
        //   })
        //   return cartQuantity
          
        // },
    //    Quantity(productId,newQuantity){
    //         let matchingItem
    //         this.cartItem.forEach((item)=>{
    //           if(productId === item.productId){
    //               matchingItem = item
    //           }
    //         })
    //         matchingItem.quantity = newQuantity
    //         this.SaveToStorage()
    //       }
          
          
//     }
//     return cart
// }

// let cart = Cart(`cart-oop`)
// let bussinessCart = Cart(`cart-business`)

// cart.LoadFromStorage()
// bussinessCart.LoadFromStorage()

// console.log(cart)
// console.log(bussinessCart)