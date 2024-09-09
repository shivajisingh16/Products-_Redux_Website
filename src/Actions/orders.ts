import { order } from "../models/order";
import { ActionCreator } from "./ActionsCreator";

export const LOAD_ORDERS = "LOAD_ORDERS";
export const ORDERS_LOADED = "ORDERS_LOADED";

export const loadOrders:ActionCreator = ()=>({
  type:LOAD_ORDERS
})

export const ordersLoaded: ActionCreator<any> = (orders)=>({
  type:ORDERS_LOADED,
  payload: orders
})


export const  ORDER_DETAIL_LOADED="ORDER_DETAIL_LOADED";

export const orderDetailLoadedAction:ActionCreator<order> = (order:order) =>({
  type:ORDER_DETAIL_LOADED,
  payload:order,
});