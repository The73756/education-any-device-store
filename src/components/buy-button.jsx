import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import {
  createBasketDevice,
  deleteBasketDevice,
  fetchBasketDevices,
  updateBasketDevice,
} from '@/api/basketApi'
import { Context } from '@/main'
import { MinusIcon } from './shared/minus-icon'
import { PlusIcon } from './shared/plus-icon'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'

export const BuyButton = observer(({ deviceId }) => {
  const { user, basket } = useContext(Context)
  const { toast } = useToast()
  const thisDevice = basket.basketDevices.find(
    (device) => device.deviceId === deviceId,
  )

  const updateBasket = async () => {
    try {
      const updatedBasketDevices = await fetchBasketDevices(user.user.id)
      basket.setBasketDevices(updatedBasketDevices)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка авторизации',
        description: error.response.data.message,
      })
    }
  }

  const addBasketDevice = async () => {
    try {
      await createBasketDevice(deviceId, user.user.id)
      await updateBasket()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка авторизации',
        description: error.response.data.message,
      })
    }
  }

  const incrementBasket = async () => {
    try {
      await updateBasketDevice({
        id: thisDevice.id,
        count: thisDevice.count + 1,
      })
      await updateBasket()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка авторизации',
        description: error.response.data.message,
      })
    }
  }

  const decrementBasket = async () => {
    try {
      if (thisDevice.count === 1) {
        await deleteBasketDevice({ id: thisDevice.id })
      } else {
        await updateBasketDevice({
          id: thisDevice.id,
          count: thisDevice.count - 1,
        })
      }
      await updateBasket()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка авторизации',
        description: error.response.data.message,
      })
    }
  }

  if (
    basket.basketDevices.filter((device) => device.deviceId === deviceId)
      .length > 0
  ) {
    return (
      <Button className="flex justify-between items-center hover:bg-primary w-full">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          onClick={decrementBasket}
        >
          <MinusIcon />
        </Button>
        <span>{thisDevice.count}</span>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          onClick={incrementBasket}
        >
          <PlusIcon />
        </Button>
      </Button>
    )
  }

  return (
    <Button className="w-full" onClick={addBasketDevice}>
      Купить
    </Button>
  )
})
