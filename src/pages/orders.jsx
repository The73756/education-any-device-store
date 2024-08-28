import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { OrderItem } from '@/components/order-item'
import { EmptyBasketIcon } from '@/components/shared/empty-basket-icon'
import { Loader } from '@/components/ui/loader'
import { Context } from '@/main'

export const Orders = observer(() => {
  const { order, user } = useContext(Context)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const allOrders = JSON.parse(localStorage.getItem('orders'))
    if (allOrders) {
      const userOrders = allOrders.find(
        (order) => order.userId === user.user.id,
      )
      if (userOrders) {
        order.setOrders(userOrders.userOrders)
      }
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <Header />
      <h2 className="mt-8 font-semibold text-3xl container">Заказы</h2>
      <div className="my-8 container">
        {order.orderTotalCount === 0 && (
          <div className="flex flex-col justify-center items-center gap-4 mt-20">
            <EmptyBasketIcon />
            <p>Вы еще не совершали заказы</p>
          </div>
        )}
        <div className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] max-[440px]:grid-cols-1">
          {order.orders?.map((order) => (
            <div key={order.createdAt}>
              <OrderItem order={order} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
