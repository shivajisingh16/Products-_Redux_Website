import { createSelector } from "reselect";
import { product } from "../models/product";
import { State } from "../store";
import { productsMapSelector } from "./products";

export function orderStateSelector(state:State){
  return state.orders;
}

export const ordersLoadingSelector = createSelector(orderStateSelector,(orderstate)=>{
  return orderstate.loading;
})

export const ordersMapSelector = createSelector(orderStateSelector,(orderstate)=>{
  console.log("map selec called")
  return orderstate.orders;
})

export const ordersSelector = createSelector(ordersMapSelector,(normalizedorder)=>{
  const orderArr = Object.keys(normalizedorder).map((orderid)=>normalizedorder[+orderid]);

  return orderArr;
})

export const ordersProductsSelector = createSelector(ordersMapSelector,productsMapSelector,(ordermap,productmap)=>{
  return Object.keys(ordermap).reduce<{[orderId:number]:product[]}>((previous,currentOrderId)=>{
    const order = ordermap[+currentOrderId];
    const products = order.products.map((pid)=>productmap[pid]);
    return {...previous,[currentOrderId]:products};
  },{})
})

