import { createBrowserRouter } from 'react-router-dom'
import { RequireAuth } from '@/components/require-auth'
import { Admin } from '@/pages/admin'
import { Basket } from '@/pages/basket'
import { ErrorPage } from '@/pages/error-page'
import { Home } from '@/pages/home'
import { Login } from '@/pages/login'
import { Orders } from '@/pages/orders'
import { Product } from '@/pages/product'
import { Purchase } from '@/pages/purchase'
import { RatedProducts } from '@/pages/rated-products'
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  PRODUCT_ROUTE,
  PURCHASE_ROUTE,
  RATED_PRODUCTS_ROUTE,
} from '@/utils/consts'

export const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: LOGIN_ROUTE,
    element: <Login />,
  },
  {
    path: PRODUCT_ROUTE + '/:id',
    element: <Product />,
  },
  {
    path: BASKET_ROUTE,
    element: (
      <RequireAuth>
        <Basket />
      </RequireAuth>
    ),
  },
  {
    path: RATED_PRODUCTS_ROUTE,
    element: (
      <RequireAuth>
        <RatedProducts />
      </RequireAuth>
    ),
  },
  {
    path: PURCHASE_ROUTE,
    element: (
      <RequireAuth>
        <Purchase />
      </RequireAuth>
    ),
  },
  {
    path: ORDERS_ROUTE,
    element: (
      <RequireAuth>
        <Orders />
      </RequireAuth>
    ),
  },
  {
    path: ADMIN_ROUTE,
    element: (
      <RequireAuth admin>
        <Admin />
      </RequireAuth>
    ),
  },
])
