import { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ordersMapSelector, ordersProductsSelector } from '../Selectors/ordres';
import axios from 'axios';
import { State } from '../store';
import withRouter, { WithRouterProps } from '../Hoc/withRouter copy';
import { orderDetailLoadedAction } from '../Actions/orders';
import { Link } from 'react-router-dom';

type OrdersDetailPageProps = {} & reduxProps & WithRouterProps;

const OrdersDetailPage: FC<OrdersDetailPageProps> = ({ order, products, params, orderDetailLoaded }) => {
  let idParameter = +params.id;

  useEffect(() => {
    if (!order) {
      axios.get('https://dummyjson.com/carts/' + idParameter).then((response) => {
        orderDetailLoaded(response.data);
      });
    }
  }, [idParameter, orderDetailLoaded]);

  if (!order) return <div className="text-center py-10 text-xl">Loading...</div>;

  return (
    <div className="container mx-auto px-4 flex flex-col gap-10 p-10">
      
      <div className="my-4">
        <Link
          to="/orders"
          className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md shadow"
        >
          ← Back to Orders
        </Link>
      </div>

      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Order Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Order Information</h3>
            <p className="text-lg">
              <strong>Order ID:</strong> {order.id}
            </p>
            <p className="text-lg">
              <strong>Total Price:</strong> ${order.total}
            </p>
          </div>

        
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Products Summary</h3>
            <p className="text-lg">
              <strong>Total Products:</strong> {products.length}
            </p>
          </div>
        </div>
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h4 className="text-lg font-bold mb-2 text-indigo-700">{product.title}</h4>
            <p className="text-gray-700 mb-1">
              <strong>Price:</strong> ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

OrdersDetailPage.defaultProps = {};

const mapStateToProps = (state: State, ownProps: WithRouterProps) => {
  const id = ownProps.params.id;
  return {
    order: ordersMapSelector(state)[+id],
    products: ordersProductsSelector(state)[+id],
  };
};

const mapDispatchToProps = {
  orderDetailLoaded: orderDetailLoadedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;
export default withRouter(connector(OrdersDetailPage));
