import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { fetchBasketDevices } from '@/api/basketApi'
import { Context } from '@/main'
import { DeviceItem } from './device-item'
import { EmptyBasketIcon } from './shared/empty-basket-icon'
import { Loader } from './ui/loader'

export const BasketList = observer(() => {
  const { user, basket } = useContext(Context)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchBasketDevices(user.user.id)
      .then((data) => {
        console.log(data)
        basket.setBasketDevices(data)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loader />
  }

  if (basket.basketDevices.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 mt-20">
        <EmptyBasketIcon />
        <p>Ваша корзина пока пуста</p>
      </div>
    )
  }

  return (
    <div className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      {basket.basketDevices.map((device) => (
        <DeviceItem key={device.id} device={device.device} />
      ))}
    </div>
  )
})
