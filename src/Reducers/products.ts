import { AnyAction } from "redux";
import { product } from "../models/product"
import { LOAD_PRODUCTS, PRODUCTS_LOADED } from "../Actions/products";
import { produce } from "immer";
import { ORDER_DETAIL_LOADED, ORDERS_LOADED } from "../Actions/orders";
import { normalize, schema } from "normalizr";


export type State={
  products:product[];
  loading:boolean;
}

export type NormalizeProducts = {[x:number]:product};
export const initialState:State={
  products:[],
  loading:false,
}

function productReducer(state=initialState,action:AnyAction):State{
  switch(action.type){
    case LOAD_PRODUCTS:
      return produce(state,(draft)=>{
        draft.loading=true;
      })
    case PRODUCTS_LOADED:
      return produce(state,(draft)=>{
        const products = action.payload;
        const normalizedProducts = products.reduce((previous:NormalizeProducts,current:product)=>{
          return {...previous,[current.id]:current};
        },{})
        draft.products=normalizedProducts;
        draft.loading =false;
      })
    case ORDERS_LOADED:
      return produce(state,(draft)=>{
        const orders = action.payload;
        const products = orders.reduce((previous:product[],current:any)=>{
          return [...previous,...current.products];
        },[])
        const normalizedProducts = products.reduce((previous:NormalizeProducts,current:product)=>{
          return {...previous,[current.id]:current};
        },{})
        draft.products=normalizedProducts;
      })
    case ORDER_DETAIL_LOADED:
      return produce(state,(draft)=>{
        const order = action.payload;
        const productEntity = new schema.Entity("products");
        const data = normalize(order.products,[productEntity]);
        draft.products = {...draft.products,...data.entities.products};
      })
    default:
      return state;
  }
}

export default productReducer;