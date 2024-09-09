
import { Route, Routes } from 'react-router-dom'
import OrderListPage from './components/OrderListPage'
import OrdersDetailPage from './components/OrdersDetailPage'
import ProductListPage from './components/ProductListPage'

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<ProductListPage/>} />
        <Route path='/orders'  element={<OrderListPage/>} />
        <Route path='/orders/:id'  element={<OrdersDetailPage/>} />
      </Routes>
    </div>
  )
}

export default App