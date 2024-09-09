import { FC, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productLoadingSelector, productsSelector } from '../Selectors/products';
import { loadProductsAction, productsLoadedAction } from '../Actions/products';
import axios from 'axios';
import { Link } from 'react-router-dom';

type ProductListPageProps = {};

const ProductListPage: FC<ProductListPageProps> = () => {
  const loading = useSelector(productLoadingSelector);
  const products = useSelector(productsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsAction());
    axios.get('https://dummyjson.com/products').then((response) => {
      const data = response.data.products;
      dispatch(productsLoadedAction(data));
    });
  }, [dispatch]);

  if (loading) return <div className="text-center py-10 text-2xl font-semibold text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      
      <div className="w-full max-w-5xl mb-8">
        <Link
          to="/orders"
          className="bg-rose-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-rose-700 transition duration-300 inline-block"
        >
          ← Go to Orders
        </Link>
      </div>

     
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Available Products</h2>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-full h-48 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold">
                <img src="https://th.bing.com/th/id/OIP.WaxXL0TkannBB-DRsFxXDgHaEV?w=299&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-2">Product ID: {product.id}</p>
            </div>
            <p className="text-lg font-bold text-green-600">Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

ProductListPage.defaultProps = {};

export default memo(ProductListPage);
