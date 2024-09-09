import { AnyAction } from "redux";
import { order } from "../models/order";
import { LOAD_ORDERS, ORDER_DETAIL_LOADED, ORDERS_LOADED } from "../Actions/orders";
import { produce } from "immer";
import { normalize, schema } from "normalizr";

export type NormalizedOrder ={[x:number]:order};
export type State = {
  loading:boolean;
  orders:NormalizedOrder;
}

export const initialState: State ={
  loading:false,
  orders:{}
}

function orderReducer (state = initialState,action :AnyAction):State{
  switch(action.type){
    case LOAD_ORDERS:
      return produce(state, (draft)=>{
        draft.loading =true;
      });
    case ORDERS_LOADED:
      return produce(state,(draft)=>{
        draft.loading= false;
        const orderArr = action.payload;
        const productEntity = new schema.Entity("products");
        const orderEntity = new schema.Entity("orders",{
          products:[productEntity]
        });

        const data = normalize(orderArr,[orderEntity]);
        
        // const normalizedOrders = orderArr.reduce((previous:NormalizedOrder,current:order)=>{
        //   return {...previous,[current.id]:current};
        // },{})
        draft.orders=data.entities.orders!;
      })
    case ORDER_DETAIL_LOADED:
      console.log("order reducer called")
      return produce(state,(draft)=>{
        const order  = action.payload;
        const productEntity = new schema.Entity("products");
        const orderEntity = new schema.Entity("orders",{
          products:[productEntity]
        });

        const data = normalize(order,orderEntity);
        draft.orders[order.id]= data.entities.orders![order.id];
      })
    //  
    default:
      return state; 
  }
}

export default orderReducer;