import { createSelector } from "reselect";
import { product } from "../models/product";

import { State } from "../store";

export const productStateSelector=(state:State)=>{
  return state.products;
}
export const productLoadingSelector = createSelector(productStateSelector,(productstate)=>{
  return productstate.loading;
})

export const productsMapSelector = createSelector(productStateSelector,(productState)=>{
  return productState.products;
})

export const productsSelector = createSelector(productsMapSelector,(noramalizedProducts)=>{
  const products = Object.keys(noramalizedProducts).reduce((previous:product[],current:string)=>{
    return [...previous,noramalizedProducts[+current]]
  },[])
  return products;
})
