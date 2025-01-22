export let cart;

LoadFromStorage()
export function LoadFromStorage(){
  cart = JSON.parse(localStorage.getItem(`cart`)) || [{
    productId:`e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
    quantity:1,
    deliveryOptionId:`1`
},{
    productId:`15b6fc6f-327a-4ec4-896f-486349e85a3d`,
    quantity:2,
    deliveryOptionId:`2`
}]
}

function SaveToStorage(){
  localStorage.setItem(`cart`,JSON.stringify(cart))
}


export function addToCart(productId){
    let matchingItem
  cart.forEach((item)=>{
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
    cart.push({
        productId:productId,
        quantity:quantity,
        deliveryOptionId:`1`
      })
  }
  SaveToStorage()
}

export function updateCartQuantity(){
    let cartQuantity = 0
  cart.forEach((item)=>{
   cartQuantity += item.quantity
  })
  return cartQuantity
  
}


export function removeFromCart(productId){
  let newCart = []
  cart.forEach((item)=>{
   if(item.productId !== productId){
     newCart.push(item)
   }
  })
  cart = newCart
  SaveToStorage()
}

export function Quantity(productId,newQuantity){
  let matchingItem
  cart.forEach((item)=>{
    if(productId === item.productId){
        matchingItem = item
    }
  })
  matchingItem.quantity = newQuantity
  SaveToStorage()
}

export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem
  cart.forEach((item)=>{
    if(productId === item.productId){
       matchingItem = item
    }
  })
  matchingItem.deliveryOptionId  = deliveryOptionId
  SaveToStorage()
}

