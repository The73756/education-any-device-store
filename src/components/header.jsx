import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '@/assets/img/Logo.svg'
import { Context } from '@/main'
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  RATED_PRODUCTS_ROUTE,
} from '@/utils/consts'
import { AdminIcon } from './shared/admin-icon'
import { BagIcon } from './shared/bag-icon'
import { CartIcon } from './shared/cart-icon'
import { StarIcon } from './shared/star-icon'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'

export const Header = observer(() => {
  const { user, device, basket, rating, order } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token')
    basket.setBasketDevices([])
    rating.setRatedDevices([])
    order.setOrders([])
    navigate(LOGIN_ROUTE)
  }

  return (
    <div className="">
      <div className="flex max-sm:flex-wrap justify-between max-sm:justify-end items-center gap-4 py-2 container">
        <div className="flex items-center gap-8 max-lg:gap-4 w-2/3 max-sm:w-full max-lg:w-3/5">
          <Link to={HOME_ROUTE}>
            <img src={logo} alt="Логотип Any Device" />
          </Link>
          <Input
            disabled={location.pathname !== HOME_ROUTE}
            placeholder="Поиск..."
            onChange={(e) => device.setSearch(e.target.value)}
          />
        </div>
        {user.isAuth ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                className="relative"
                size="icon"
                onClick={() => navigate(BASKET_ROUTE)}
              >
                <CartIcon />
                {basket.basketTotalCount > 0 && (
                  <div className="-top-2 -right-2 absolute flex justify-center items-center bg-destructive p-1 rounded-full w-5 h-5">
                    {basket.basketDevices.length}
                  </div>
                )}
              </Button>
              <Button
                className="relative"
                size="icon"
                onClick={() => navigate(ORDERS_ROUTE)}
              >
                <BagIcon />
                {order.orders.length > 0 && (
                  <div className="-top-2 -right-2 absolute flex justify-center items-center bg-destructive p-1 rounded-full w-5 h-5">
                    {order.orders.length}
                  </div>
                )}
              </Button>
              <Button
                className="relative"
                size="icon"
                onClick={() => navigate(RATED_PRODUCTS_ROUTE)}
              >
                <StarIcon />
              </Button>
              {user.user?.role === 'ADMIN' && (
                <Button
                  className="flex gap-2 max-md:p-0 max-md:w-10 whitespace-nowrap"
                  onClick={() => navigate(ADMIN_ROUTE)}
                >
                  <span className="max-md:hidden">Админ-панель</span>
                  <AdminIcon />
                </Button>
              )}
            </div>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="destructive">Выйти</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Вы хотите выйти из аккаунта?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction onClick={logout}>Выйти</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <Button onClick={() => navigate(LOGIN_ROUTE)}>Войти</Button>
        )}
      </div>
    </div>
  )
})
