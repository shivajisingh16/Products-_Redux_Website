import { product } from "../models/product";
import { ActionCreator } from "./ActionsCreator";

export const  LOAD_PRODUCTS="LOAD_PRODUCTS";

export const loadProductsAction:ActionCreator= () =>({
  type:LOAD_PRODUCTS,
  payload:undefined
});



export const  PRODUCTS_LOADED="PRODUCTS_LOADED";

export const productsLoadedAction:ActionCreator<product[]> = (products:product[]) =>({
  type:PRODUCTS_LOADED,
  payload: products,
});