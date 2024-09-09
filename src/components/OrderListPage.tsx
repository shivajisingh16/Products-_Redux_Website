import { FC, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders, ordersLoaded } from '../Actions/orders';
import axios from 'axios';
import { ordersLoadingSelector, ordersSelector } from '../Selectors/ordres';
import { Link } from 'react-router-dom';

type OrderListPageProps = {};

const OrderListPage: FC<OrderListPageProps> = () => {
  const dispatch = useDispatch();
  const loading = useSelector(ordersLoadingSelector);
  const orders = useSelector(ordersSelector);

  useEffect(() => {
    dispatch(loadOrders());
    axios.get('https://dummyjson.com/carts').then((response) => {
      dispatch(ordersLoaded(response.data.carts));
    });
  }, []);

  if (loading) return <div className="text-center py-10 text-2xl font-semibold text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <div className="w-full max-w-4xl">
   
        <Link
          to="/"
          className="inline-block bg-gray-700 text-white px-6 py-2 rounded-full mb-6 hover:bg-gray-800 transition-all duration-300 shadow-md"
        >
          &larr; Back to Home
        </Link>

     
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Orders List</h3>

       
        <div className="bg-white p-8 rounded-xl shadow-lg grid grid-cols-1 gap-6 md:grid-cols-2">
          {orders.map((order, idx) => (
            <Link
              key={idx}
              to={`/orders/${order.id}`}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold p-6 rounded-lg hover:from-red-500 hover:to-red-600 transition-all ease-in-out duration-300 shadow-lg flex flex-col gap-2"
            >
              <p className="text-lg">Order No: <span className="font-bold">#{order.id}</span></p>
              <p>Total Price: <span className="font-semibold">${order.total}</span></p>
              <p>Products: <span className="font-semibold">{order.totalProducts}</span></p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

OrderListPage.defaultProps = {};

export default memo(OrderListPage);
