export let deliveryOptions = [{
    id:`1`,
    deliveryDate:7,
    deliveryPriceCents:0
},{
    id:`2`,
    deliveryDate:3,
    deliveryPriceCents:499
},{
    id:`3`,
    deliveryDate:1,
    deliveryPriceCents:999
}]

export function getdeliveryOption(deliveryOptionId){
    let deliveryOption
    deliveryOptions.forEach((option)=>{
      if(deliveryOptionId === option.id){
        deliveryOption = option
      }
    })
    return deliveryOption
}