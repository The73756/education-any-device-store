import 'dayjs/locale/ru'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchOneDevice } from '@/api/deviceApi'
import { formatPrice } from '@/lib/price-format'
import { PRODUCT_ROUTE } from '@/utils/consts'
import { DeleteIcon } from './shared/delete-icon'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

dayjs.extend(localizedFormat)
dayjs.locale('ru')

export const OrderItem = ({ order }) => {
  const [devices, setDevices] = useState([])

  useEffect(() => {
    const fetchDevices = async () => {
      const fetchedData = await Promise.all(
        order.devices?.map(async (device) => {
          const data = await fetchOneDevice(device.id)
          return data
            ? { device: data, count: device.count }
            : { device: device.id, count: device.count }
        }) || [],
      )
      setDevices(fetchedData)
    }
    fetchDevices()
  }, [])

  return (
    <Card className="flex flex-col h-full">
      <div>
        <CardHeader>
          <div className="flex max-[440px]:flex-wrap justify-between items-start gap-4 max-[440px]:gap-2">
            <CardTitle>
              Заказ от {dayjs(order?.createdAt).format('DD MMMM YYYY')}
            </CardTitle>
            <div className="bg-accent px-2 py-1 rounded-md w-max font-semibold">
              {order?.status}
            </div>
          </div>
          <CardDescription>
            Создан в {dayjs(order?.createdAt).format('HH:mm')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex max-[440px]:flex-wrap gap-2">
            <p>Сумма заказа:</p>
            <p className="font-semibold">{formatPrice(order?.totalPrice)}</p>
          </div>
          <div className="flex max-[440px]:flex-wrap gap-2">
            <p>Адрес получения:</p>
            <p className="font-semibold">{order?.address}</p>
          </div>
          <div className="flex max-[440px]:flex-wrap gap-2">
            <p>Получатель:</p>
            <p className="font-semibold">{order?.name}</p>
          </div>
          <div className="flex max-[440px]:flex-wrap gap-2">
            <p>E-mail получателя:</p>
            <p className="font-semibold">{order?.email}</p>
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex flex-wrap gap-4 gap-y-6">
        {devices?.map((device) =>
          typeof device.device === 'number' ? (
            <div key={device.device} className="relative">
              <div className="flex flex-col justify-between items-center rounded-sm w-full min-w-16 max-w-24 text-muted-foreground overflow-hidden aspect-square">
                <div className="w-1/2 max-[440px]:w-1/3 h-1/2 object-contain">
                  <DeleteIcon size="full" />
                </div>
                <span className="text-center text-xs">Товар был удален</span>
                {device.count > 1 && (
                  <div className="-top-2 -right-2 absolute flex justify-center items-center bg-muted-foreground p-1 rounded-full w-5 h-5 text-14 text-background">
                    {device.count}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div key={device.device?.id} className="relative">
              <div className="rounded-sm min-w-16 max-w-24 overflow-hidden aspect-square">
                <Link to={`${PRODUCT_ROUTE}/${device.device?.id}`}>
                  <img
                    className="w-full h-full object-contain"
                    src={`${import.meta.env.VITE_API_URL}/${device.device?.photos[0].url}`}
                    alt={device?.name}
                  />
                </Link>
                {device.count > 1 && (
                  <div className="-top-2 -right-2 absolute flex justify-center items-center bg-destructive p-1 rounded-full w-5 h-5 text-14 text-background">
                    {device.count}
                  </div>
                )}
              </div>
            </div>
          ),
        )}
      </CardFooter>
    </Card>
  )
}
