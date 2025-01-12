export let cart = []

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
        quantity:quantity
      })
  }

}

export function updateCartQuantity(){
    let cartQuantity = 0
  cart.forEach((item)=>{
   cartQuantity += item.quantity
  })
  return cartQuantity
  
}