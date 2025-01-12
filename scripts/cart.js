export let cart = [{
    productId:`e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
    quantity:1
},{
    productId:`15b6fc6f-327a-4ec4-896f-486349e85a3d`,
    quantity:2
}]

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