import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { fetchBasketDevices } from './api/basketApi'
import { check } from './api/userApi'
import { Loader } from './components/ui/loader'
import { Context } from './main'
import { router } from './router/index'

const App = observer(() => {
  const { user, basket, order } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check()
      .then((data) => {
        user.setIsAuth(true)
        user.setUser(data)
        fetchBasketDevices(user.user.id).then((data) => {
          basket.setBasketDevices(data)
        })
        const allOrders = JSON.parse(localStorage.getItem('orders'))
        if (allOrders) {
          const userOrders = allOrders.find(
            (order) => order.userId === user.user.id,
          )
          if (userOrders) {
            order.setOrders(userOrders.userOrders)
          }
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
})

export { App }
